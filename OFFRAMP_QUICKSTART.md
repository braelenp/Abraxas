# Fiat Off-Ramp Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Add Environment Variables
Edit `/app/.env.local` and add:

```bash
# For Testing (Sandbox mode)
VITE_RAMP_API_KEY=sandbox
VITE_RAMP_HOST_API_KEY=sandbox
VITE_TRANSAK_API_KEY=test
VITE_USDC_TOKEN_CONTRACT_ADDRESS=EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1
```

### Step 2: Start Dev Server
```bash
cd app
npm run dev
```

### Step 3: Test the Feature

**Via TradePage** (automatic):
1. Navigate to Trade page
2. Connect wallet (Phantom/Solflare)
3. Set amount (e.g., 1000 ABRA → USDC)
4. Click "Get Quote"
5. Click "Swap Now"
6. ✅ Off-ramp widget appears automatically!

### Step 4: Verify Success
You should see:
- ✅ Conversion quote with fee breakdown
- ✅ Payment method selection (Cash App / Apple Pay)
- ✅ Success modal with arrival timeframe
- ✅ Auto-dismiss after 5 seconds

## 📝 File Structure

```
app/src/
├── components/
│   └── FiatOffRampWidget.tsx    ← Main UI component (350 lines)
├── lib/
│   └── offramp.ts              ← API utilities (158 lines)
├── pages/
│   └── TradePage.tsx           ← Integration point
└── .env.example                ← Configuration template
```

## 🔧 Key Components

### FiatOffRampWidget Props
```typescript
interface FiatOffRampWidgetProps {
  abraAmount: number;          // Amount of ABRA to convert
  onSuccess?: () => void;      // Callback on completion
  compact?: boolean;           // Compact styling (default: false)
}
```

### Usage Example
```typescript
import { FiatOffRampWidget } from '@/components/FiatOffRampWidget';

export function MyPage() {
  return (
    <FiatOffRampWidget 
      abraAmount={1000}
      onSuccess={() => console.log('User completed off-ramp')}
      compact={false}
    />
  );
}
```

## 💰 How It Works

### Fee Calculation
```javascript
// User has: 1,000 ABRA
// Step 1: ABRA → USDC (0% fee via Bags)
abraAmount = 1000;
usdcAmount = 950;  // Current market rate

// Step 2: USDC → Fiat (1.5% fee via Ramp)
fiatAmount = usdcAmount * 0.985 = 936.25;
// Result: User receives $936.25 in Cash App
```

### State Flow
```
INPUT (user enters amount)
  ↓ User clicks "Get Quote"
QUOTE (shows conversion with fees)
  ↓ User clicks "Convert Now"
SWAPPING (executing ABRA→USDC)
  ↓ Swap complete
OFFRAMP (opening Ramp/Transak window)
  ↓ User completes payment in popup
SUCCESS (showing confirmation)
  ↓ Auto-closes after 5 seconds
[Return to previous page]
```

## 🧪 Testing Scenarios

### Scenario 1: Successful Conversion
1. Connect wallet
2. Enter 1000 in amount field
3. Select "Cash App" payment method
4. Review quote ($936.25 after fees)
5. Click "Convert Now"
6. Wait for success notification
7. ✅ Should see "ABRA swapped and sent to Cash App"

### Scenario 2: Invalid Amount
1. Enter 0 or negative amount
2. Click "Get Quote"
3. ❌ Button should be disabled
4. Fix amount to positive number
5. ✅ Button re-enables

### Scenario 3: Wallet Disconnected
1. Disconnect wallet
2. Try to click "Convert Now"
3. ❌ Should show error: "Please connect your wallet"
4. Connect wallet
5. ✅ Retry should work

## 📊 API Endpoints Used

### Jupiter DEX (Token Swaps)
- **Quote**: `GET https://quote-api.jup.ag/v6/quote`
- **Swap**: `POST https://quote-api.jup.ag/v6/swap`

### Ramp.network (Off-Ramp)
- **Base URL**: `https://ramp.network`
- **Params**: apiKey, amount, assetCode, paymentMethod

### Transak (Off-Ramp)
- **Base URL**: `https://transak.com`
- **Params**: apiKey, cryptoCurrency, amount, mode

## 🔑 Environment Variables Reference

| Variable | Purpose | Development | Production |
|----------|---------|-------------|------------|
| `VITE_RAMP_API_KEY` | Ramp authentication | `sandbox` | Real API key |
| `VITE_RAMP_HOST_API_KEY` | Ramp hosted flows | `sandbox` | Real API key |
| `VITE_TRANSAK_API_KEY` | Transak auth | `test` | Real API key |
| `VITE_USDC_TOKEN_CONTRACT_ADDRESS` | USDC token | `EPjFW...` | Reference |

## 🐛 Debugging

### Check Network Requests
```bash
# In browser DevTools > Network tab:
# 1. Look for requests to quote-api.jup.ag (should succeed)
# 2. Look for popup to opened.com (Ramp/Transak popup)
# 3. Check console for any error messages
```

### Enable Debug Logging
Add this to offramp.ts if needed:
```typescript
console.log('[OffRamp]', 'Event:', event);
```

### Common Issues

**Issue**: "Failed to get quote"
- Check network connectivity
- Verify ABRA amount is positive
- Check Jupiter API is accessible: https://quote-api.jup.ag/v6/quote

**Issue**: Popup blocked
- Disable popup blocker for localhost
- Check browser settings > Pop-ups

**Issue**: Wallet connection error
- Verify Phantom/Solflare is installed
- Try refreshing page
- Check browser console for errors

## 📚 Full Documentation

For comprehensive documentation, see:
- **FIAT_OFFRAMP_GUIDE.md** - Complete setup & API docs
- **IMPLEMENTATION_SUMMARY.md** - Architecture & details

## 🚀 Production Deployment

### 1. Get API Keys
- Ramp: https://dashboard.ramp.network/api-keys
- Transak: https://dashboard.transak.com/api

### 2. Update .env
```bash
VITE_RAMP_API_KEY=pk_prod_xxxxx
VITE_RAMP_HOST_API_KEY=sk_prod_xxxxx
VITE_TRANSAK_API_KEY=prod_xxxxx
```

### 3. Update Network
In `app/src/lib/solana.ts`:
```typescript
const network = 'mainnet-beta'; // Changed from 'devnet'
```

### 4. Test with Real Funds
```javascript
// Test with small amount first
abraAmount = 10;  // ~$9.50 after swap
// Should result in ~$9.35 after off-ramp fee
```

### 5. Monitor & Alert
- Track off-ramp completion rates
- Monitor wallet connection errors
- Alert on Jupiter API failures
- Track fee averages

## ✅ Checklist Before Launch

- [ ] Environment variables configured
- [ ] Jupiter API is accessible
- [ ] Ramp/Transak sandbox tested
- [ ] Mobile UI responsive (tested on mobile)
- [ ] Error messages are clear
- [ ] Success message displays correctly
- [ ] Analytics events are tracked
- [ ] Wallet connection works with Phantom & Solflare
- [ ] Popup blocker doesn't prevent off-ramp flow
- [ ] Network switching works (devnet ↔ mainnet)

## 📞 Support

For issues or questions:
1. Check GitHub Issues
2. Review FIAT_OFFRAMP_GUIDE.md
3. Check browser console for errors
4. Test with sandbox keys first

---

**Ready to go!** Your fiat off-ramp is now live. 🎉
