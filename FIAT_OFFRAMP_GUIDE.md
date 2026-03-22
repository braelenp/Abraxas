# Fiat Off-Ramp Integration Guide

## Overview

This guide explains how to set up and use the fiat off-ramp functionality in Abraxas, which allows users to:
1. Convert ABRA tokens to USDC using Jupiter DEX (~0% fees via Bags)
2. Transfer USDC to fiat via Ramp.network or Transak API
3. Receive funds in their Cash App, Apple Pay, or bank account

## Components

### 1. **lib/offramp.ts** - Off-Ramp Utilities
Provides functions for:
- Generating Ramp.network off-ramp URLs
- Generating Transak off-ramp URLs
- Calculating fiat amounts after fees (~1.5%)
- Opening off-ramp flows in new windows
- Tracking analytics events

### 2. **components/FiatOffRampWidget.tsx** - UI Component
A complete React component that handles:
- User amount input and review
- ABRA → USDC quote fetching via Jupiter
- Payment method selection (Cash App / Apple Pay)
- Off-ramp initiation via Ramp or Transak
- Success/error states with user feedback

### 3. **Integration in TradePage.tsx**
- Automatically shows the off-ramp widget after successful swaps
- Displays estimated fiat amount based on current USDC rates
- Seamless UX flow: Swap → Review → Cash Out → Success

## Environment Variables

Add these to your `.env` or `.env.local` file:

```bash
# Ramp.network Configuration
VITE_RAMP_API_KEY=sandbox                    # Use 'sandbox' for testing, real API key for production
VITE_RAMP_HOST_API_KEY=sandbox               # Host API key for embedded flows

# Transak Configuration (optional alternative)
VITE_TRANSAK_API_KEY=test                    # Use 'test' for testing, real API key for production
```

## Setup Instructions

### 1. Install Dependencies

The widget uses existing dependencies, but you may need to add Ramp SDK:

```bash
cd app
npm install @ramp/ramp-react
# OR for Transak
npm install @transak/transak-sdk
```

### 2. Obtain API Keys

#### Ramp.network
1. Visit [https://ramp.network](https://ramp.network)
2. Sign up for developer account
3. Create project and get API keys
4. Add to `.env` file

#### Transak
1. Visit [https://transak.com](https://transak.com) 
2. Sign up for partner account
3. Get API key from dashboard
4. Add to `.env` file

### 3. Configure Solana Network

The off-ramp is configured for:
- **Network**: Solana (devnet/mainnet)
- **Token**: USDC (EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1)
- **Wallets**: Phantom, Solflare (standard Solana wallet-adapter)

### 4. Test in Development

```bash
# Start dev server
cd app
npm run dev

# Navigate to Trade page
# 1. Connect wallet
# 2. Execute a swap
# 3. Click "Convert to Cash" button
# 4. Review fiat amount
# 5. Complete mock off-ramp (sandbox mode)
```

## Flow Walkthrough

### User Journey: Buy ABRA → Cash Out

```
1. User lands on TradePage
   ↓
2. Sets up swap (e.g., 1000 ABRA → $950 USDC)
   ↓
3. Executes swap via Jupiter
   ↓
4. Off-ramp widget automatically appears with quote
   ↓
5. User selects payment method (Cash App / Apple Pay)
   ↓
6. Clicks "Convert Now"
   ↓
7. ABRA/USDC swap transaction confirmed
   ↓
8. Ramp/Transak off-ramp window opens ($936.25 USD after fees)
   ↓
9. User completes KYC & payment setup in Ramp window
   ↓
10. Success notification: "ABRA swapped and sent to Cash App — funds arriving in 1-2 business days"
```

## API Reference

### getOffRampUrl()

```typescript
import { getOffRampUrl } from '../lib/offramp';

const url = getOffRampUrl(
  {
    amountUSDC: 950,
    paymentMethod: 'cash-app',
    userEmail: 'user@example.com'
  },
  'ramp' // or 'transak'
);
```

### estimateFiatAmount()

```typescript
import { estimateFiatAmount } from '../lib/offramp';

const fiatAmount = estimateFiatAmount(950, 1.5); // 950 USDC - 1.5% fee
// Returns: 936.25
```

### openOffRampFlow()

```typescript
import { openOffRampFlow } from '../lib/offramp';

openOffRampFlow(offRampUrl, 'ramp');
// Opens off-ramp in new popup window
```

## Fee Structure

| Step | Provider | Fee |
|------|----------|-----|
| ABRA → USDC | Bags DEX | ~0% |
| USDC → Fiat | Ramp/Transak | ~1.5% |
| **Total Cost** | | **~1.5%** |

Example: $1,000 ABRA
- Swap to USDC: $1,000 (no fee)
- Off-ramp fee: -$15
- **Receive: $985** in Cash App (1-2 business days)

## Supported Payment Methods

### Ramp.network
- ✅ Bank Transfer (USA/EU)
- ✅ Apple Pay
- ✅ Debit/Credit Card
- ✅ ACH Transfer

### Transak
- ✅ Bank Transfer
- ✅ Debit/Credit Card
- ✅ Apple Pay
- ✅ Google Pay

## Security & Compliance

1. **KYC Required**: Users must complete identity verification in Ramp/Transak
2. **No Custody**: Abraxas never holds user funds
3. **Third-Party**: Off-ramp handled entirely by Ramp.network or Transak
4. **Encryption**: All communication via HTTPS
5. **Wallet Signing**: Users sign all transactions with their wallet

## Troubleshooting

### "Failed to get conversion quote"
- Check network connectivity
- Verify Jupiter API is accessible
- Ensure ABRA token address is correct

### "Wallet not connected"
- Click "Connect Wallet" button
- Approve connection in Phantom/Solflare
- Ensure wallet has ABRA tokens

### "Off-ramp window won't open"
- Check browser popup blocker settings
- Disable adblockers that might block Ramp domain
- Try different browser if issues persist

### "Transaction pending longer than expected"
- Solana transactions typically finalize in 5-30 seconds
- Check Solscan.io with transaction signature
- If stuck >2 minutes, reload page and retry

## Production Deployment

When deploying to production:

1. **Get Real API Keys**:
   ```bash
   VITE_RAMP_API_KEY=your_real_api_key
   VITE_RAMP_HOST_API_KEY=your_real_host_key
   ```

2. **Update Network**:
   ```typescript
   // In solana.ts - ensure mainnet-beta is used
   const network = 'mainnet-beta';
   ```

3. **Enable Real Wallets**:
   - Phantom (default in production)
   - Ledger via Phantom
   - Magic.link via Phantom extension

4. **Test Full Flow**:
   - Small test swap ($10 USDC equivalent)
   - Complete real off-ramp to test wallet
   - Verify funds arrive in 1-2 business days

## Additional Features (Future)

- [ ] Multiple fiat on-ramp providers (Moonpay, Transak, etc.)
- [ ] Recurring conversions (auto-cashout weekly)
- [ ] Batch off-ramps for high-volume users
- [ ] Multi-currency support (EUR, GBP, etc.)
- [ ] Real-time off-ramp status tracking
- [ ] Email/SMS notifications on completion

## Support & Resources

- **Ramp Docs**: https://docs.ramp.network/
- **Transak Docs**: https://transak.gitbook.io/
- **Jupiter Docs**: https://station.jup.ag/docs/api
- **Solana Docs**: https://docs.solana.com/

---

**Component Status**: ✅ Production Ready
**Last Updated**: 2024
**Maintained By**: Abraxas Team
