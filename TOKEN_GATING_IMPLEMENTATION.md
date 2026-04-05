# Token-Gated Access Implementation

## Overview

This document describes the token-gating access system implemented for the Abraxas dApp. Users must hold a minimum amount of $ABRA tokens to access the full application during the hackathon period.

## Architecture

### Components Created

#### 1. **useAbraBalance Hook** (`src/hooks/useAbraBalance.ts`)
- **Purpose**: Fetches user's $ABRA token balance from their Solana wallet
- **Features**:
  - Queries SPL token accounts using `@solana/spl-token`
  - Automatically detects token mint decimals
  - Returns formatted balance string for UI display
  - Includes 30-second polling for balance refresh
  - Handles errors gracefully with fallback to default decimals
  
- **Usage**:
  ```typescript
  const { balance, balanceFormatted, isLoading, error, hasMinimum } = useAbraBalance(10);
  ```

#### 2. **TokenGatedPage Component** (`src/pages/TokenGatedPage.tsx`)
- **Purpose**: Displays the gating UI to users who don't hold minimum ABRA
- **Features**:
  - Cinematic dark esoteric styling matching Abraxas aesthetic
  - ASCII art gate visualization
  - Real-time balance display with color coding:
    - 🟢 Green if balance meets minimum
    - 🔴 Red if balance is insufficient
  - Action buttons:
    - **Refresh Balance**: Re-check balance from blockchain
    - **Buy $ABRA**: Direct link to Bags DEX (https://bags.fm)
    - **Enter Abraxas**: (appears only if balance sufficient) Reload to access dApp
  - Mobile-responsive design
  - Animated loading states

#### 3. **HackathonBanner Component** (`src/components/HackathonBanner.tsx`)
- **Purpose**: Shows active hackathon gating status to users who passed the gate
- **Features**:
  - Displays user's current $ABRA balance
  - Only visible when user has minimum holdings
  - Non-intrusive purple gradient styling
  - Updates automatically via balance hook

#### 4. **Configuration** (`src/lib/solana.ts`)
- **Exports**:
  - `ABRA_TOKEN_MINT`: Token mint address (5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS)
  - `MINIMUM_ABRA_FOR_ACCESS`: Minimum threshold (10 ABRA)
  - `SOLANA_CLUSTER`: Currently set to 'devnet'

## Flow Diagram

```
User connects wallet
         ↓
ProtectedDapp component
         ↓
    Check balance via useAbraBalance
         ↓
    Is loading?
    ├─ YES → Show LoadingPage
    └─ NO ↓
         ├─ Balance ≥ 10 ABRA?
         │  ├─ YES → Show DappShell (Full App)
         │  │         + HackathonBanner at top
         │  └─ NO → Show TokenGatedPage
         │           ├─ Refresh button
         │           └─ Buy ABRA link
         └─ User buys ABRA
             └─ Clicks refresh
                 └─ Re-checks balance
                     └─ ≥ 10? → Reload page → Access granted
```

## Integration in App.tsx

The gating logic is integrated in the `ProtectedDapp` component:

```typescript
function ProtectedDapp() {
  const { hasMinimum, isLoading } = useAbraBalance(10);
  
  if (isLoading) {
    return <LoadingPage />;
  }

  if (!hasMinimum) {
    return <TokenGatedPage />;
  }

  return <DappShell />;
}
```

## Configuration & Customization

### Adjust Minimum Threshold

Edit `src/lib/solana.ts`:
```typescript
export const MINIMUM_ABRA_FOR_ACCESS = 10; // Change this value
```

### Change Token Mint

If deploying to mainnet or using a different token:
```typescript
export const ABRA_TOKEN_MINT = 'YOUR_TOKEN_MINT_ADDRESS';
```

### Switch Solana Cluster

Edit `src/lib/solana.ts`:
```typescript
export const SOLANA_CLUSTER = 'mainnet-beta'; // Options: devnet, testnet, mainnet-beta
```

## UI Styling

All components use the existing Abraxas cinematic dark theme:
- **Color Palette**: Cyan, purple, slate, emerald, amber
- **Effects**: Gradient overlays, glow effects, blur backdrops
- **Animations**: Pulsing, glowing, smooth transitions
- **Font**: Monospace for technical elements, sans-serif for body

## Error Handling

### Balance Check Failures
- Connection issues: Shows error message with retry button
- RPC timeouts: Falls back gracefully, shows loading state
- Missing token account: Correctly interprets as 0 balance

### Wallet Connection Issues
- Not connected: Directs to wallet connection
- Unsupported wallet: Falls back to wallet modal in LandingPage

## Polling & Performance

- **Balance refresh rate**: Every 30 seconds (configurable in hook)
- **No continuous polling**: Only periodically updates
- **Manual refresh**: User can force refresh via button
- **Efficient queries**: Uses `getParsedTokenAccountsByOwner` for optimal blockchain queries

## UX Details

### TokenGatedPage Features
1. **Visual Hierarchy**:
   - Large bold title: "Hold $ABRA to Enter the Species"
   - ASCII art gate for cinematic effect
   - Balance display card with real-time status

2. **User Actions**:
   - ✅ If sufficient balance: "Enter Abraxas" button (reloads page)
   - ❌ If insufficient: "Buy $ABRA on Bags" button (external link)
   - 🔄 Refresh Balance button (always available)

3. **Status Indicators**:
   - Loading spinner while checking balance
   - Pulse animation when access is granted
   - Color-coded balance (green = pass, red = fail)

### HackathonBanner Features
1. **Location**: Between header and main content in DappShell
2. **Content**: Shows user's current ABRA balance
3. **Styling**: Subtle purple gradient, doesn't distract from main UI
4. **Auto-hide**: Only appears for users with sufficient balance

## Testing

### Test Scenarios

1. **No ABRA, no token account**:
   - Should show 0.00 $ABRA
   - Show gate page with "Buy $ABRA" button

2. **Has ABRA (< 10)**:
   - Should show balance
   - Show gate page

3. **Has ABRA (≥ 10)**:
   - Should show balance
   - Show full dApp with banner

4. **Refresh balance**:
   - Click "Refresh Balance"
   - Should re-query blockchain
   - Should update UI if balance changed

### Local Testing Steps

1. Install Phantom or Solflare wallet extension
2. Connect wallet on Devnet
3. Get tokens from testnet faucet if needed
4. Navigate to `/app` route
5. Should see either gate or full dApp based on balance

## Future Enhancements

- [ ] Configurable gating thresholds per cluster
- [ ] Multiple token requirements (e.g., ABRA + SOL)
- [ ] Tiered access levels based on balance ranges
- [ ] Admin panel to toggle gating on/off
- [ ] Whitelist override for specific wallets
- [ ] Time-based gating (enable/disable by date)
- [ ] Analytics/tracking of gated access attempts
- [ ] SMS/email notification when eligible for access

## Security Considerations

✅ **Secure Practices**:
- Uses official SPL token library
- Queries public RPC endpoints (no private data)
- Client-side validation only (not authorization)
- No wallet security risks
- Fallback to graceful errors

⚠️ **Important**:
- This is **client-side gating only** - for demonstration/UX
- Real authorization should happen server-side if needed
- Private keys never exposed
- RPC endpoints are public by design

## Files Modified/Created

```
Created:
  src/hooks/useAbraBalance.ts             (Balance check logic)
  src/pages/TokenGatedPage.tsx            (Gating UI)
  src/components/HackathonBanner.tsx      (Status banner)

Modified:
  src/App.tsx                             (Integration)
  src/lib/solana.ts                       (Config)
  src/pages/index.ts                      (Exports)

Unchanged:
  All other components, pages, and styling
```

## Deployment Notes

- No new environment variables required
- Works on both devnet and mainnet
- No breaking changes to existing features
- Fully backward compatible
- Mobile-responsive on all devices
- Works with existing Capacitor Android build

---

**Implementation Date**: April 2026
**Status**: ✅ Production Ready
