# Vercel Environment Variables Cleanup Checklist
**Date: April 20, 2026 | Pre-Deployment Security**

> Clean up Vercel dashboard before deploying crypto-native Abraxas

---

## STEP 1: Go to Vercel Dashboard

**URL**: https://vercel.com

1. Log in with your account
2. Select the **Abraxas** project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)

---

## STEP 2: Review Current Variables

You'll see a list of all environment variables across scopes:
- **Production** (what goes live)
- **Preview** (staging branches)
- **Development** (local dev)

---

## STEP 3: REMOVE These Old Variables (If Present)

### Fiat Payment Processors - DELETE THESE:

**❌ Stripe** (No longer needed - crypto-only):
- [ ] `STRIPE_SECRET_KEY` → Remove
- [ ] `STRIPE_PUBLIC_KEY` → Remove
- [ ] `STRIPE_WEBHOOK_SECRET` → Remove
- [ ] `STRIPE_WEBHOOK_URL` → Remove
- [ ] Any `VITE_STRIPE_*` → Remove

**❌ Ramp.network** (No longer needed - crypto-only):
- [ ] `VITE_RAMP_API_KEY` → Remove
- [ ] `VITE_RAMP_HOST_API_KEY` → Remove
- [ ] `RAMP_*` (any variant) → Remove

**❌ Transak** (No longer needed - crypto-only):
- [ ] `VITE_TRANSAK_API_KEY` → Remove
- [ ] `TRANSAK_*` (any variant) → Remove

**❌ Jupiter/DEX Swap Secrets** (Keep public URLs only):
- [ ] `JUPITER_SECRET_KEY` (if exists) → Remove
- [ ] Keep: `VITE_JUPITER_URL` (public, OK to keep)

**❌ Off-Ramp / Bank Integration**:
- [ ] `OFFRAMP_*` (any) → Remove
- [ ] `BANK_*` (any) → Remove

### How to Delete:
1. Click on the variable name
2. Click the **⋮** (three dots) menu
3. Select **Delete**
4. Confirm

---

## STEP 4: VERIFY These Are Present (Keep These)

### ✅ Solana Configuration - KEEP:
- [ ] `VITE_SOLANA_RPC_URL` (or `SOLANA_RPC_ENDPOINT`)
- [ ] `VITE_SOLANA_DEVNET_URL` (optional)
- [ ] `VITE_NETWORK` = "mainnet-beta"

### ✅ Token Configuration - KEEP:
- [ ] `VITE_ABRA_TOKEN_CONTRACT_ADDRESS` = `5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS`
- [ ] `VITE_USDC_TOKEN_CONTRACT_ADDRESS` = `EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1`
- [ ] `ABRAXAS_PROGRAM_ID` (if applicable)

### ✅ Backend API - KEEP:
- [ ] `REACT_APP_API_URL` (Species Awakening backend)
- [ ] `VITE_API_BASE_URL` (if different)

### ✅ Other Production APIs - KEEP:
- [ ] `VITE_OYM_DATA_URL` (if configured)
- [ ] `VITE_OYM_APP_URL` (if configured)

---

## STEP 5: Redeploy After Cleanup

Once you've removed old variables:

1. Go back to Vercel dashboard
2. Click **Deployments** (top navigation)
3. Find the latest production deployment
4. Click the **⋮** (three dots)
5. Select **Redeploy**
6. Confirm

This forces:
- All serverless functions to restart
- New environment to load
- Old secrets to be purged from memory

---

## STEP 6: Verify Deployed

After redeploy completes:
1. Go to your live Abraxas URL: `https://abraxas-ten.vercel.app` (or your domain)
2. Check that:
   - [ ] Landing page loads
   - [ ] Wallet connection works
   - [ ] TradePage loads (for ABRA acquisition)
   - [ ] VaultsPage loads
   - [ ] No console errors referencing removed services

---

## Security Notes

✅ **Code is already clean**:
- Stripe/Ramp/Transak components removed from VaultsPage.tsx
- `.env.example` already purged
- No references in code

⚠️ **Vercel dashboard is the last step**:
- Secrets stored in Vercel persist independently of code
- Even if code is clean, old API keys in Vercel dashboard can be compromised
- Removing them from Vercel = final cleanup

🔒 **Post-Deployment**:
- GitHub token rotation still recommended (separate task)
- Monitor for suspicious deployments
- Keep Vercel 2FA enabled

---

## Quick Reference: What to Search For

Use Ctrl+F in the Environment Variables list to find:
- Search for: `stripe` → Delete all results
- Search for: `ramp` → Delete all results
- Search for: `transak` → Delete all results
- Search for: `offramp` → Delete all results

---

## Questions?

- **"What if I deleted something I needed?"** → You can always add it back. Just paste the value again.
- **"Will this break production?"** → No. You're just removing unused payment processor keys. Core Solana/token config stays.
- **"How long does redeploy take?"** → Usually 2-5 minutes.
