# Stripe Integration Setup Guide

This document explains how to complete the Stripe backend integration for ACH deposits and payouts.

## Current Status

**Frontend (✅ Ready):**
- Stripe public key configured via `VITE_STRIPE_PUBLIC_KEY` environment variable
- ACH deposit UI built and connected
- Cash out (payout) UI built and connected
- Error handling and user feedback implemented

**Backend (⏳ Needs Implementation):**
- Backend endpoints to create Payment Intents
- Backend endpoints to create Payouts
- Webhook handlers for Stripe events
- Bank account token storage

## Setup Steps

### 1. Configure Environment Variable

Add your Stripe public key to `.env.local` (or your deployment secrets):

```bash
VITE_STRIPE_PUBLIC_KEY=pk_live_51RB5QaApqhpIytp4ccEq4nAXjLcZXZRHAm5w8Ado2TUPZtbonLINnf3fQyClV3DjCvyji5ruSgik98RfCe8OiLVs005rL6s2y7
```

The frontend will automatically load this when ACH operations are attempted.

### 2. Create Backend Endpoints

Your backend will need these endpoints:

#### POST `/api/stripe/create-payment-intent`

**Purpose:** Create a Stripe Payment Intent for ACH deposits

**Request:**
```json
{
  "amount": 50000,
  "currency": "usd",
  "payment_method_types": ["us_bank_account"],
  "walletAddress": "user-solana-address"
}
```

**Response:**
```json
{
  "clientSecret": "pi_1234567890_secret_abcdefgh",
  "paymentIntentId": "pi_1234567890"
}
```

**Backend Implementation (Node.js/Express example):**

```javascript
app.post('/api/stripe/create-payment-intent', async (req, res) => {
  const { amount, currency, walletAddress } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency,
      payment_method_types: ['us_bank_account'],
      metadata: {
        walletAddress, // Store user's Solana wallet for later reconciliation
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

#### POST `/api/stripe/create-payout`

**Purpose:** Create a Stripe Payout to user's bank account

**Request:**
```json
{
  "amount": 47500,
  "bankAccountToken": "ba_1234567890",
  "walletAddress": "user-solana-address"
}
```

**Response:**
```json
{
  "payoutId": "po_1234567890",
  "status": "pending",
  "arrivalDate": "2026-04-15"
}
```

**Backend Implementation (Node.js/Express example):**

```javascript
app.post('/api/stripe/create-payout', async (req, res) => {
  const { amount, bankAccountToken, walletAddress } = req.body;

  try {
    // Verify user owns this wallet (implement your auth logic)
    const user = await User.findByWallet(walletAddress);
    if (!user) throw new Error('Unauthorized');

    const payout = await stripe.payouts.create({
      amount, // in cents
      currency: 'usd',
      destination: bankAccountToken,
      metadata: {
        walletAddress,
      },
    });

    res.json({
      payoutId: payout.id,
      status: payout.status,
      arrivalDate: new Date(payout.arrival_date * 1000),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### 3. Setup Webhook Handlers

Handle Stripe webhooks for payment status updates:

```javascript
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Update user's account with deposited ABRA tokens
      // Log successful deposit to blockchain
      const intent = event.data.object;
      console.log(`Deposit succeeded for ${intent.metadata.walletAddress}: $${intent.amount / 100}`);
      break;

    case 'payout.paid':
      // Log successful payout
      const payout = event.data.object;
      console.log(`Payout sent for ${payout.metadata.walletAddress}: $${payout.amount / 100}`);
      break;

    case 'payout.failed':
      // Handle failed payout
      console.log('Payout failed:', event.data.object);
      break;
  }

  res.json({ received: true });
});
```

### 4. Store Bank Account Tokens

When users enter bank account info, create a bank account token via Stripe:

```javascript
// In Stripe Dashboard or via API
const bankAccount = await stripe.customers.createSource(customerId, {
  source: {
    object: 'bank_account',
    country: 'US',
    currency: 'usd',
    account_holder_name: 'User Name',
    account_holder_type: 'individual',
    routing_number: '110000000',
    account_number: 'account_number',
  },
});

// Store bankAccount.id for later use in payouts
```

### 5. Update Frontend Code

Once backend is ready, uncomment the actual API calls in `src/lib/stripe.ts`:

```typescript
// Replace this in createAchDepositIntent():
const response = await fetch('/api/stripe/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: amountInCents,
    currency: 'usd',
    payment_method_types: ['us_bank_account'],
    walletAddress,
  }),
});
const data = await response.json();
return { success: true, clientSecret: data.clientSecret };
```

## Testing

### Development/Sandbox

```bash
# Update .env.local with sandbox keys
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_SANDBOX_KEY
```

Use Stripe's [test bank account numbers](https://stripe.com/docs/testing#cards) for development.

### Production

```bash
# Ensure live key is set
VITE_STRIPE_PUBLIC_KEY=pk_live_YOUR_LIVE_KEY
```

## Security Considerations

1. **Public Key:** The Stripe public key in `.env.local` is safe to expose (it's public)
2. **Secret Key:** NEVER commit your `sk_live_*` or `sk_test_*` keys to git
3. **Webhook Secret:** Store `STRIPE_WEBHOOK_SECRET` as a secure environment variable on backend only
4. **PCI Compliance:** Stripe handles PCI compliance for you—never handle raw card/bank data

## Troubleshooting

**"Stripe public key is not configured"**
- Check `.env.local` has `VITE_STRIPE_PUBLIC_KEY` set
- Restart dev server after changing env vars

**"ACH deposit backend not yet implemented"**
- The frontend is waiting for the backend endpoints
- Implement the endpoints described above

**Webhooks not firing**
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
- Check webhook endpoint URL is publicly accessible
- Test with `stripe listen` in development

## Resources

- [Stripe ACH Payments](https://stripe.com/docs/payments/bank-transfers/ach)
- [Stripe Payouts](https://stripe.com/docs/payouts)
- [Payment Intents API](https://stripe.com/docs/payments/payment-intents)
- [Webhooks](https://stripe.com/docs/webhooks)
- [Testing](https://stripe.com/docs/testing)
