# 🚀 Stripe Backend - Quick Start Guide

Your complete Stripe ACH backend is now live! Here's how to get it running locally.

## ⚡ Quick Setup (5 minutes)

### 1. Copy Environment Template

```bash
cd server
cp .env.template .env.local
```

### 2. Add Your Stripe Keys

Edit `.env.local` and add:
```env
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLIC_KEY=pk_test_YOUR_PUBLIC_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Get your keys from:** https://dashboard.stripe.com/apikeys

### 3. Install & Run

```bash
npm install
npm run dev
```

You should see:
```
🚀 Abraxas Stripe Backend running on port 3001
```

### 4. Test Health Check

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-01-15T10:30:45.123Z"}
```

✅ Backend is live!

---

## 📚 What's Included

### API Endpoints Ready

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/stripe/create-payment-intent` | ACH deposits |
| POST | `/api/stripe/create-payout` | Cash out to bank |
| POST | `/api/stripe/create-bank-account-token` | Store bank details |
| GET | `/api/transactions/:id` | Check transaction status |
| POST | `/webhooks/stripe` | Webhook handler |

### Frontend Integration

Your `app/src/lib/stripe.ts` is already configured to call these endpoints. The functions now return real data:

```typescript
// Frontend example usage:
const result = await createAchDepositIntent(5000, walletAddress, email, name);
// Returns: { success: true, clientSecret: "pi_...", paymentIntentId: "pi_..." }
```

---

## 🔧 Development Workflow

### Using Test Keys (Recommended)

Get test keys from Stripe Dashboard → API Keys → Clicking the "Viewing test data" toggle

Test bank account numbers:
- **All Tests Pass:** 000111111116
- **Needs Verification:** 000222222226
- **Routing:** 110000000

### Running Both Frontend & Backend

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd app
npm run dev
```

Both should run on:
- Backend: http://localhost:3001
- Frontend: http://localhost:5173

---

## 🪝 Webhook Setup (Important!)

For production, set up webhook endpoint in Stripe Dashboard:

1. Go to: https://dashboard.stripe.com/webhooks
2. Add new endpoint
3. URL: `https://your-backend-domain.com/webhooks/stripe`
4. Events: Select `payment_intent.succeeded`, `payment_intent.payment_failed`, `payout.paid`, `payout.failed`
5. Copy signing secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

## 📊 Transaction Flow

### ACH Deposit (User deposits cash → ABRA tokens)

```
Frontend (MarketPage)
    ↓
frontend/stripe.ts: createAchDepositIntent()
    ↓
Backend: POST /api/stripe/create-payment-intent
    ↓
Stripe: Creates payment intent
    ↓
Returns: clientSecret for payment confirmation
    ↓
Frontend: Complete payment via Stripe
    ↓
Stripe webhook: payment_intent.succeeded
    ↓
Backend: Logs transaction as succeeded
    ↓
TODO: Transfer ABRA tokens to user wallet
```

### Cash Out (User converts ABRA → bank deposit)

```
Frontend (MarketPage)
    ↓
frontend/stripe.ts: initiateStripePayout()
    ↓
Backend: POST /api/stripe/create-payout
    ↓
Stripe: Creates and processes payout
    ↓
Returns: Payout ID
    ↓
Stripe webhook: payout.paid
    ↓
Backend: Logs transaction as succeeded
    ↓
Bank: Deposits funds (1-2 business days)
```

---

## 🚨 Common Issues

### "Stripe secret key is not configured"
→ Make sure `.env.local` has `STRIPE_SECRET_KEY`

### "Cannot connect to backend"
→ Check if backend is running on port 3001: `npm run dev`

### "CORS error from frontend"
→ Make sure `FRONTEND_URL=http://localhost:5173` in `.env.local`

### "Webhook events not received"
→ Check Stripe Dashboard → Events for error logs

---

## 🎯 Next Steps

### Immediate (This Session)
- Get Stripe test keys
- Test `createAchDepositIntent()` endpoint
- Verify frontend can call backend
- Test webhook delivery (use Stripe Dashboard)

### Short Term (This Week)
- Add database (MongoDB/PostgreSQL/SQLite)
- Persist transactions
- Add user authentication (verify wallet signatures)
- Email confirmations

### Production (Before Launch)
- Switch to live Stripe keys
- Deploy backend (Heroku/Railway/AWS)
- Set up production webhooks
- Add rate limiting
- Add monitoring/logging

---

## 📖 Full Documentation

See `server/README.md` for:
- Complete API reference
- Deployment guides
- Security best practices
- Troubleshooting

## 💡 Quick Commands

```bash
# Start backend in development
npm run dev

# Start backend in production mode
npm start

# Check what's running on port 3001
lsof -i :3001

# Kill process on port 3001
kill -9 $(lsof -t -i :3001)
```

---

## ✨ You're All Set!

Your Stripe backend is ready to:
- ✅ Accept ACH deposits
- ✅ Process cash outs to bank accounts
- ✅ Manage bank account tokens
- ✅ Track transactions
- ✅ Handle webhooks

Start the backend, run your frontend, and test deposits/cash outs!

**Questions?** Check `server/README.md` for full documentation.
