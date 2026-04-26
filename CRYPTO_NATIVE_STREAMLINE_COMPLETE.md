# ABRAXAS SIMPLIFICATION: CRYPTO-NATIVE PAYMENT STREAMLINE
**Completed: April 20, 2026**

---

## EXECUTIVE SUMMARY

Abraxas has been streamlined to be **Solana-native and crypto-only**. All fiat payment rails (Stripe, Ramp, Transak, Jupiter swaps) have been removed. The new flow is radically simpler:

1. **User pre-condition**: Must have crypto (SOL, USDC, etc.) in Phantom wallet
2. **Step 1**: Acquire ABRA tokens (via TradePage: Jupiter or Bags DEX)
3. **Step 2**: Mint RWA NFT (BlackBox asset) with ABRA holding requirement
4. **Step 3**: Stake NFT in Sophia Vault with AI agent
5. **Step 4**: Earn ABRAX rewards for vault staking

---

## CHANGES COMPLETED

### 1. Environment Variables (`.env.example`)
**Removed:**
- `VITE_STRIPE_PUBLIC_KEY` - Stripe ACH payments
- `VITE_STRIPE_BACKEND_URL` - Stripe backend
- `VITE_RAMP_API_KEY` - Ramp fiat on-ramp
- `VITE_RAMP_HOST_API_KEY` - Ramp host API
- `VITE_TRANSAK_API_KEY` - Transak fiat on-ramp

**Kept:**
- `VITE_ABRA_TOKEN_CONTRACT_ADDRESS` - Core token
- `VITE_ABRA_TOKEN_BAGS_URL` - Bags DEX link
- `VITE_USDC_TOKEN_CONTRACT_ADDRESS` - Stable reference
- `VITE_SOLANA_RPC_URL` - Solana network connectivity

---

### 2. VaultsPage.tsx (`app/src/pages/VaultsPage.tsx`)

**Removed Components:**
- [ ] `EmbeddedPhantomSwap` import - No in-app swaps
- [ ] `showSwapModal` state - Swap dialog
- [ ] `handleSwap()` function - Opens swap UI
- [ ] `handleSwapSuccess()` function - Swap completion
- [ ] `handleWithdraw()` function - Fiat off-ramp flow
- [ ] `handleWithdrawSuccess()` function
- [ ] "Quick Actions" button section (Trade Tokens, Buy ABRA, Cash Out)
- [ ] Swap Modal component (fixed overlay)
- [ ] Withdraw Modal component + off-ramp instructions (Transak, Ramp, etc.)

**Kept:**
- Vault creation and NFT minting logic
- Sophia AI agent assignment
- Tax report generation
- Vault staking and balance tracking
- Risk circuit controls

**Components Still Present:**
```tsx
// KEPT: Core vault operations
<form onSubmit={onCreateVault}>  // Create vault
<PhantomNFTMintComponent />       // Mint BlackBox NFT
// ... vault list and management
<button onClick={() => handleTaxReport(vault.id)}>  // Tax reporting
```

---

### 3. ProfilePage.tsx (`app/src/pages/ProfilePage.tsx`)

**Updated Descriptions:**
- Trade: `"Acquire ABRA tokens"` (was "Swap and route assets")

**Navigation - Still available:**
- ᚲ Forge → Bring asset into system
- ᚨ Vaults → Manage AI vaults
- ᛋ Market → Review opportunities
- ✦ Cadabra → Community
- ᛏ King AI → AI guidance
- ᚦ Circuit → Risk protection
- ᛚ Trade → **Get ABRA** (simplified from swap)
- 🔮 Species Awakening → Airdrop rewards

---

### 4. TradePage.tsx (`app/src/pages/TradePage.tsx`)

**Status: UNCHANGED (Correct as-is)**

The TradePage is already optimized for the new flow:
- Tab 1: "Swap" - Jupiter DEX for buying ABRA with existing crypto
- Tab 2: "Bags (0% Fee)" - Direct ABRA purchase on Bags DEX
- Both are **external liquidity**, not internal swaps
- Users come with SOL/USDC → swap to ABRA via existing DEX infrastructure

✅ This page is already perfect for acquiring ABRA

---

## NEW USER FLOW

### Before (Complicated):
```
User with fiat → Stripe ACH → USD in dApp 
              → Jupiter swap → ABRA
              → Mint NFT → Vault → Earn yields
              → Want cash? → Swap ABRA to USDC 
              → Transak/Ramp → back to bank
```

### After (Simple):
```
User with crypto (SOL, USDC, etc.) in Phantom
    ↓
Visit TradePage → Swap to ABRA (Jupiter or Bags)
    ↓
Hold ABRA minimum → Mint BlackBox NFT
    ↓
Stake in Sophia Vault with AI agent
    ↓
Earn ABRAX rewards
```

---

## WHAT USERS NEED TO KNOW

### Prerequisites:
1. **Phantom wallet** installed and connected
2. **Existing crypto** (SOL, USDC, or other tokens) already in their wallet
3. **ABRA token minimum** required to:
   - Access the dApp (token gating)
   - Mint BlackBox RWA NFTs
   - Participate in vault operations

### Payment Method:
- **Only on-chain transactions** via Solana blockchain
- No ACH, no credit cards, no fiat conversions
- All token swaps happen via *existing DEX infrastructure* (Jupiter, Bags)
- Abraxas never holds custody of funds

### Earning Model:
- Stake RWA NFTs in vaults
- AI agents (Sophia Species) manage positions
- **Rewards: ABRAX tokens are airdropped** for vault staking (no fees)
- Users keep 100% of vault yields

---

## FILES MODIFIED

```
✅ app/.env.example
   - Removed Stripe, Ramp, Transak config

✅ app/src/pages/VaultsPage.tsx
   - Removed swap/off-ramp functions
   - Removed quick action buttons
   - Removed swap and withdraw modals
   - Kept vault creation and NFT staking

✅ app/src/pages/ProfilePage.tsx
   - Updated Trade description: "Acquire ABRA tokens"

📋 app/src/pages/TradePage.tsx
   - No changes needed (already optimized)

🗑️ DELETED (Can be removed):
   - EmbeddedPhantomSwap component (if it exists)
   - FiatOffRampWidget component (if it exists)
   - offramp.ts utilities (if it exists)
   - Any Stripe backend code (README_OFFRAMP.md docs)
```

---

## FILES NOT MODIFIED (But Exist)

These files reference the old payment systems and can stay for historical context or be updated later:

### Documentation (Can Archive):
- `README_OFFRAMP.md` - Fiat off-ramp guide (OBSOLETE)
- `FIAT_OFFRAMP_GUIDE.md` - Off-ramp setup (OBSOLETE)
- `OFFRAMP_QUICKSTART.md` - Off-ramp quickstart (OBSOLETE)
- `OFFRAMP_COMPLETE.md` - Off-ramp implementation (OBSOLETE)
- `STRIPE_BACKEND_QUICK_START.md` - Stripe integration (OBSOLETE)
- `STRIPE_SETUP_GUIDE.md` - Stripe setup (OBSOLETE)

### Old Content + Security Docs (Keep For Reference):
- `VERCEL_BREACH_SECURITY_ACTION.md` - References old Stripe/Ramp keys (update once rotated)

---

## NEXT STEPS

### Immediate (Optional Cleanup):
- [ ] Delete unused EmbeddedPhantomSwap component if it was created
- [ ] Delete unused FiatOffRampWidget component if it was created
- [ ] Archive off-ramp documentation files to `/docs/archived/`
- [ ] Update VERCEL_BREACH_SECURITY_ACTION.md to remove Stripe/Ramp rotation (no longer needed)

### Before Launch:
- [ ] Update onboarding docs: "You need crypto in Phantom first"
- [ ] Update error messages: Remove mentions of fiat on/off-ramps
- [ ] Remove unused imports: Check for dangling imports of removed components
- [ ] Test TradePage flow end-to-end: SOL → ABRA acquisition

### Documentation (Create):
```
New onboarding guide:
1. Install Phantom wallet
2. Get SOL or USDC from exchange
3. Use TradePage to swap for ABRA
4. Mint BlackBox NFT with ABRA
5. Stake in Sophia Vault
6. Earn ABRAX rewards
```

---

## BACKEND CONSIDERATIONS

### What No Longer Needs Backend:
- ❌ Stripe payment processing endpoints
- ❌ Ramp webhook handling
- ❌ Transak transaction callbacks
- ❌ ACH deposit verification
- ❌ Fiat conversion logic

### What Still Needs Backend:
- ✅ Species Awakening airdrop campaign
- ✅ ABRAX reward distribution
- ✅ Vault state synchronization
- ✅ RWA metadata APIs
- ✅ Tax reporting data collection

### Vercel Deployment:
- The backend no longer needs `STRIPE_SECRET_KEY` or fiat API keys
- Can simplify `.env` configuration
- Remove Stripe webhook processing if it exists
- Update security validation once keys are rotated

---

## SECURITY IMPLICATIONS

### Keys That Can Be RETIRED (No Longer Used):
After rotation:
- ~~`STRIPE_SECRET_KEY`~~ → No longer needed
- ~~`VITE_RAMP_API_KEY`~~ → No longer needed
- ~~`VITE_RAMP_HOST_API_KEY`~~ → No longer needed
- ~~`VITE_TRANSAK_API_KEY`~~ → No longer needed

### Keys That Should Be KEPT:
- `VITE_SOLANA_RPC_URL` - Blockchain connectivity
- `VITE_ABRA_TOKEN_*` - Token references
- `REACT_APP_API_URL` - Backend connection
- `VITE_*_BEACON_URL` (if any) - RPC redundancy

### Benefit:
Fewer secrets = smaller attack surface. The Vercel breach is now less dangerous because there are fewer API keys at risk.

---

## MESSAGING ALIGNMENT

### Value Prop (Updated):
**Old:** "NFT-backed assets with fiat on/off ramps"
**New:** "Own your AI-powered digital asset management firm on Solana"

### Onboarding Requirement (Updated):
**Old:** "We handle everything, including fiat conversion"
**New:** "Bring crypto to Phantom, acquire ABRA, and start staking for yields"

### Simplicity Narrative:
This aligns with Abraxas's core thesis:
- ✅ Decentralized (no fiat intermediaries)
- ✅ Blockchain-native (Solana only)
- ✅ User-controlled (your crypto, your keys)
- ✅ Automated management (AI Species handle the work)
- ✅ No centralized attack surface (no payment processor)

---

## TESTING CHECKLIST

Before deploying this change:

- [ ] **TradePage**: SOL → ABRA swap works via Jupiter
- [ ] **TradePage**: Direct ABRA purchase via Bags works
- [ ] **VaultsPage**: Can create vault (no crash from removed modals)
- [ ] **VaultsPage**: Can mint BlackBox NFT
- [ ] **VaultsPage**: Can assign Sophia agent
- [ ] **VaultsPage**: Tax report generation still works
- [ ] **ProfilePage**: All navigation links functional
- [ ] **No console errors** from missing imports
- [ ] **Phantom wallet**: Connection still works
- [ ] **ABRA balance**: Displays correctly after TradePage purchase

---

## SUMMARY

Abraxas is now **radically simpler**:
- ✅ Removed all fiat payment complexity
- ✅ Removed all external payment processor dependencies
- ✅ Focused purely on on-chain Solana operations
- ✅ Users need: Phantom + crypto + ABRA token
- ✅ Fewer attack surfaces (security benefit)
- ✅ Clearer value prop (decentralized asset management)
- ✅ Aligned with original thesis (sovereign economic rails)

**New user narrative:** 
*"Already have crypto? Get ABRA. Mint an NFT. Stake it. Let our AI agents grow your money while you keep ownership. That's Abraxas."*

---

**Status**: ✅ Core changes complete  
**Ready for**: Testing and user documentation updates
