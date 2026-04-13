# Abraxas Stripe Backend

Node.js/Express backend for handling Stripe ACH payments, payouts, and webhooks for the Abraxas platform.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.template` to `.env.local`:

```bash
cp .env.template .env.local
```

Then edit `.env.local` with your actual values:

```env
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY
STRIPE_PUBLIC_KEY=pk_live_YOUR_PUBLIC_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 3. Start Development Server

```bash
npm run dev
```

Server will run on `http://localhost:3001`

### 4. Test Health Check

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{ "status": "ok", "timestamp": "2024-01-15T10:30:45.123Z" }
```

## API Endpoints

### Health Check

**GET** `/health`

Simple health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

---

### Create Payment Intent (ACH Deposits)

**POST** `/api/stripe/create-payment-intent`

Creates a Stripe Payment Intent for ACH deposits.

**Request:**
```json
{
  "amount": 50000,
  "walletAddress": "AbrDZvHEv1gJmyxJsYbZnDcx8HiH9PpZTWpgGgWeFHz",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Response (Success):**
```json
{
  "success": true,
  "clientSecret": "pi_1234567890_secret_abcdefghijk",
  "paymentIntentId": "pi_1234567890",
  "amount": 50000,
  "currency": "usd"
}
```

**Response (Error):**
```json
{
  "error": "Invalid amount",
  "code": 400
}
```

---

### Create Payout (Cash Out)

**POST** `/api/stripe/create-payout`

Creates a Stripe Payout to transfer funds to user's bank account.

**Request:**
```json
{
  "amount": 45000,
  "bankAccountToken": "tok_us_bank_123456",
  "walletAddress": "AbrDZvHEv1gJmyxJsYbZnDcx8HiH9PpZTWpgGgWeFHz",
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "payoutId": "po_1234567890",
  "amount": 45000,
  "currency": "usd",
  "status": "pending",
  "arrivalDate": 1705305600
}
```

---

### Create Bank Account Token

**POST** `/api/stripe/create-bank-account-token`

Creates a reusable bank account token for payouts.

**Request:**
```json
{
  "accountNumber": "000123456789",
  "routingNumber": "210000000",
  "accountHolderName": "John Doe",
  "walletAddress": "AbrDZvHEv1gJmyxJsYbZnDcx8HiH9PpZTWpgGgWeFHz"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "tok_us_bank_cus_123456",
  "bankAccountId": "ba_123456",
  "last4": "6789"
}
```

---

### Get Transaction Status

**GET** `/api/transactions/:transactionId`

Retrieve status of a specific transaction.

**Response:**
```json
{
  "success": true,
  "transaction": {
    "id": "pi_1234567890",
    "type": "deposit",
    "status": "succeeded",
    "amount": 50000,
    "createdAt": "2024-01-15T10:30:45.000Z"
  }
}
```

---

### Stripe Webhooks

**POST** `/webhooks/stripe`

Receives and processes Stripe webhook events. Stripe will send events for:

- **payment_intent.succeeded** - ACH deposit completed
- **payment_intent.payment_failed** - ACH deposit failed
- **payout.paid** - Cash out successful
- **payout.failed** - Cash out failed

**⚠️ Setup Required:**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Add new endpoint: `https://yourdomain.com/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payout.paid`, `payout.failed`
4. Copy the signing secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`

## Development

### Running in Development Mode

```bash
npm run dev
```

Uses nodemon for auto-restart on file changes.

### Project Structure

```
server/
├── index.js              # Main Express app & API endpoints
├── package.json          # Dependencies
├── .env.template         # Environment variables template
├── .env.local            # Local environment (gitignored)
└── README.md             # This file
```

## Testing with Stripe Test Mode

### 1. Get Test Keys

In [Stripe Dashboard](https://dashboard.stripe.com/apikeys):
- Copy **Publishable Key** (starts with `pk_test_`)
- Copy **Secret Key** (starts with `sk_test_`)

### 2. Use Test Bank Accounts

Stripe provides test bank account numbers for development:

```
Routing: 110000000
Account: 000111111116 (all passes)
Account: 000222222226 (needs verification)
```

### 3. Test ACH Flow

```bash
curl -X POST http://localhost:3001/api/stripe/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10000,
    "walletAddress": "TestWallet123",
    "email": "test@example.com",
    "name": "Test User"
  }'
```

### 4. Test Payout Flow

```bash
curl -X POST http://localhost:3001/api/stripe/create-bank-account-token \
  -H "Content-Type: application/json" \
  -d '{
    "accountNumber": "000111111116",
    "routingNumber": "110000000",
    "accountHolderName": "Test User",
    "walletAddress": "TestWallet123"
  }'
```

Then use the returned token for payouts.

## Production Deployment

### Environment Setup

```bash
# Copy template
cp .env.template .env

# Add production values
STRIPE_SECRET_KEY=sk_live_YOUR_REAL_SECRET_KEY
STRIPE_PUBLIC_KEY=pk_live_YOUR_REAL_PUBLIC_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_REAL_WEBHOOK_SECRET
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
PORT=3001
```

### Deploy Options

#### Option 1: Heroku

```bash
# Install Heroku CLI
# Then:
heroku create abraxas-stripe-backend
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set STRIPE_PUBLIC_KEY=pk_live_...
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_...
git push heroku main
```

#### Option 2: Railway

```bash
# See railway.app documentation
# Connect GitHub repo and set environment variables
```

#### Option 3: AWS Lambda + API Gateway

Use Serverless Framework or AWS SAM.

#### Option 4: DigitalOcean App Platform

Connect GitHub repo and set environment variables.

### Webhook Configuration for Production

1. Go to [Stripe Dashboard Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://your-backend-domain.com/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payout.paid`
   - `payout.failed`
4. Copy signing secret to environment

## Security Considerations

### ✅ Implemented

- ✅ CORS configured for frontend only
- ✅ Stripe webhook signature verification
- ✅ Request validation (amount > 0, required fields)
- ✅ Environment variable secrets (never in code)
- ✅ Helmet headers (in production)

### ⚠️ TODO

- [ ] Database for transaction persistence
- [ ] User authentication (verify wallet address ownership)
- [ ] Rate limiting (prevent abuse)
- [ ] Logging & monitoring
- [ ] Input sanitization
- [ ] Request signing with wallet

## Troubleshooting

### "Invalid amount"
- Ensure amount is a positive number (in cents)
- Example: $50.00 = 5000 cents

### "Wallet address required"
- Frontend must send `walletAddress` in request body

### Webhook events not received

1. Check webhook secret matches in Stripe Dashboard
2. Verify endpoint URL is publicly accessible
3. Check Stripe Dashboard > Webhooks > Event logs for errors
4. Test webhook: Stripe Dashboard > Webhooks > Send test event

### Payment Intent stays pending

- Frontend must complete payment confirmation
- See [Stripe ACH Guide](https://stripe.com/docs/payments/ach-debit)

## Next Steps

1. **Database Integration** - Replace in-memory store with MongoDB/PostgreSQL
2. **User Authentication** - Verify wallet signatures
3. **Email Notifications** - Send confirmation/failure emails
4. **Transaction History** - Persist transactions in database
5. **Monitoring** - Add Sentry/DataDog for error tracking

## Support

For issues or questions:
- Check [Stripe Documentation](https://stripe.com/docs)
- Review [Stripe ACH Guide](https://stripe.com/docs/payments/ach-debit)
- Check webhook logs in Stripe Dashboard
