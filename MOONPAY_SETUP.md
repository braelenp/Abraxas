# MoonPay Integration Setup Guide

MoonPay is now integrated into the Trade page as a third payment option for buying ABRA with fiat currency (credit card, debit card, bank transfer, etc.).

## Quick Start

### 1. Get Your MoonPay API Key

1. Sign up at [MoonPay Dashboard](https://dashboard.moonpay.com)
2. Navigate to **Settings** → **API Keys**
3. Create a new API key (or use an existing one)
4. Copy the **Public API Key** (starts with `pk_live_` or `pk_test_`)

### 2. Configure Environment Variable

Add your MoonPay API key to your `.env.local` file:

```env
VITE_MOONPAY_API_KEY=pk_live_your_api_key_here
```

### 3. Restart Development Server

```bash
npm run dev
```

The "Fiat (Visa/Bank)" tab will now appear on the Trade page.

## Features

- **Multiple payment methods**: Credit card, debit card, bank transfer, Apple Pay, Google Pay
- **Global coverage**: Support for 170+ countries
- **Instant delivery**: ABRA tokens delivered directly to user's wallet
- **Secure**: KYC-verified, compliance-ready

## Trade Page Flow

Users now have three options to acquire ABRA:

1. **Jupiter Terminal** (⚡ Best rates)
   - Swap SOL → ABRA
   - ~0.1% fee
   - Best for existing Solana users

2. **Bags** (🎯 Zero Fee)
   - Direct SOL → ABRA swap
   - Zero trading fees
   - Instant settlement on-chain

3. **Fiat (Visa/Bank)** (💳 No SOL needed)
   - Buy directly with fiat currency
   - Perfect for new users
   - Requires KYC verification

## MoonPay Widget Configuration

The widget is configured with:
- **Base currency**: USD (customizable per click)
- **Network**: Solana (SOL)
- **Default fallback**: $100 USD starting amount
- **Theme**: Matches app dark theme with teal/emerald accents

## Customization

To modify MoonPay widget behavior, edit `app/src/components/MoonPayWidget.tsx`:

```typescript
<MoonPayBuyWidget
  baseCurrencyCode="usd"        // Change to EUR, GBP, etc.
  baseCurrencyAmount={100}      // Default purchase amount
  theme={{                       // Custom theme colors
    primary: '#0d9488',
    surface: '#0f172a',
    text: '#e2e8f0',
    interactive: '#06b6d4',
  }}
/>
```

## Environment Variables

- `VITE_MOONPAY_API_KEY` - **Required** for MoonPay to work
- If not set, the Fiat tab will show a configuration message

## Troubleshooting

### "MoonPay not configured" message
- Check that `VITE_MOONPAY_API_KEY` is set in `.env.local`
- Restart dev server after adding the key
- Ensure the API key is valid and active

### Widget not loading
- Verify the API key is correct (should start with `pk_`)
- Check browser console for CORS or network errors
- Ensure wallet is connected before accessing MoonPay

### Wallet address not pre-filled
- Make sure wallet is connected first
- Click on the MoonPay tab after connecting wallet
- Use the connected wallet address for receiving ABRA

## Support

For MoonPay-specific issues, see:
- [MoonPay Documentation](https://docs.moonpay.com)
- [MoonPay React SDK](https://docs.moonpay.com/react)
- [MoonPay Support](https://support.moonpay.com)
