# VERCEL BREACH - RAPID RESPONSE REFERENCE
**Quick lookup for immediate actions. Print or open in second monitor.**

---

## 🔴 CRITICAL LINKS (Open in Tabs Now)

### Environment Rotation:
- Vercel Dashboard: https://vercel.com/dashboard
- Stripe Keys: https://dashboard.stripe.com/apikeys
- GitHub OAuth: https://github.com/settings/applications
- GitHub Tokens (Classic): https://github.com/settings/tokens
- GitHub Tokens (Fine-grained): https://github.com/settings/tokens?type=beta
- Supabase (if used): https://supabase.com/dashboard

### Ramp & Transak:
- Ramp Dashboard: https://dashboard.ramp.network/
- Transak Dashboard: https://dashboard.transak.com/

---

## 📋 QUICK CHECKLIST (Copy & Paste This)

```
[ ] Stripe Secret Key - Rotated (new key: sk_live_***)
[ ] Solana RPC - Updated endpoint
[ ] Ramp API Keys - Regenerated 
[ ] Transak API Key - Regenerated
[ ] All Vercel env vars - Updated
[ ] Vercel redeployed - Status green
[ ] GitHub OAuth revoked - All suspicious apps
[ ] GitHub PAT - Regenerated or deleted
[ ] Copilot re-authenticated
[ ] Cursor re-configured
[ ] Recent deploys checked - No tampering
[ ] Git history checked - No malicious commits
[ ] Branch protection enabled
[ ] Production approval gate enabled
```

---

## 🔧 VERCEL ENV VAR UPDATE TEMPLATE

**For each environment variable:**

```
Project: Abraxas
Setting: Environment Variables

Variable Name: STRIPE_SECRET_KEY
Current: sk_live_***[last4]
New: sk_live_***[new last 4]
Scope: Production, Preview, Development
Action: [ ] Delete old [ ] Add new [ ] Save [ ] Redeploy

Variable Name: VITE_SOLANA_RPC_URL
Current: [old RPC]
New: [new RPC endpoint]
Scope: Production, Preview
Action: [ ] Delete old [ ] Add new [ ] Save [ ] Redeploy

Variable Name: VITE_RAMP_API_KEY
Current: [old key]
New: [new key from Ramp]
Scope: Production, Preview
Action: [ ] Delete old [ ] Add new [ ] Save [ ] Redeploy

Variable Name: VITE_RAMP_HOST_API_KEY
Current: [old key]
New: [new key from Ramp]
Scope: Production, Preview
Action: [ ] Delete old [ ] Add new [ ] Save [ ] Redeploy

Variable Name: VITE_TRANSAK_API_KEY
Current: [old key]
New: [new key from Transak]
Scope: Production, Preview
Action: [ ] Delete old [ ] Add new [ ] Save [ ] Redeploy
```

**After all variables updated:**
1. Go to Vercel → Abraxas → Settings → Deployments
2. Find latest production deployment
3. Click •••  (three dots)
4. Select "Redeploy"
5. Wait for green ✓ status
6. Test endpoint: `curl https://abraxas.vercel.app/api/health`

---

## 🔑 GITHUB TOKEN ROTATION QUICK STEPS

### Step 1: Revoke Compromised OAuth Apps
```
https://github.com/settings/applications
  → Look for: Vercel, Copilot, Cursor, Claude
  → Click app → "Revoke"
```

### Step 2: Delete Old Personal Access Tokens
```
https://github.com/settings/tokens
  → For each old token: Delete (X button)
  → Why: If leaked during breach, using old token proves compromise
```

### Step 3: Create New Fine-Grained Token (Safer)
```
https://github.com/settings/tokens?type=beta
  → Click "Generate new token" (fine-grained)
  → Name: abraxas-vercel-only
  → Repository: Abraxas (only this one)
  → Permissions:
       • Contents: read & write
       • Workflows: read
  → Expiration: 90 days
  → Generate and STORE IN PASSWORD MANAGER ONLY
  → Never commit to .env files!
```

---

## 🧪 VALIDATION COMMANDS

### Check Git History (Look for Tampering):
```bash
cd /workspaces/Abraxas

# Show last 30 commits
git log --oneline -30 --all

# Show commits that AREN'T from you
git log --oneline -30 --all --author="!YOUR_NAME"

# Check for new files added recently
git log --oneline --name-status -20 | grep "^A"

# Show what changed in app/ folder
git log --oneline -- app/src -30
```

### Check Vercel Deployments via CLI (if installed):
```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Login to Vercel
vercel login

# List deployment history
vercel list

# Check specific deployment
vercel inspect [DEPLOYMENT_ID]
```

### Test Your APIs Post-Rotation:
```bash
# Health check (should return 200)
curl https://abraxas.vercel.app/api/health

# Test Species Awakening (if running)
curl https://abraxas.vercel.app/api/species-awakening/leaderboard

# Stripe test (will fail auth if key wrong)
curl -X POST https://abraxas.vercel.app/api/stripe/products
```

---

## ⚠️ RED FLAGS TO WATCH FOR

During this process, if you see ANY of these, STOP and escalate to GitHub:

```
❌ Unfamiliar commits in git log
❌ Vercel deployment you didn't trigger
❌ Environment variable you don't recognize
❌ GitHub repo added to suspicious CI/CD
❌ New files in app/ folder you didn't create
❌ Excessive AWS charge spike (crypto mining)
❌ RPC quota exceeded (someone mining)
❌ Stripe charges you don't recognize
```

### If You Find Red Flags:
1. **DO NOT deploy**
2. **DO NOT merge**
3. Contact GitHub Enterprise Security: security@github.com
4. Create incident ticket with your team

---

## 📱 TIMELINE

| Time | Action | Status |
|------|--------|--------|
| Now | Rotate Stripe + RPC keys | [ ] |
| +15 min | Update all Vercel env vars | [ ] |
| +20 min | Trigger Vercel redeploy | [ ] |
| +25 min | Revoke GitHub OAuth apps | [ ] |
| +30 min | Delete old GitHub PATs | [ ] |
| +35 min | Create new fine-grained PAT | [ ] |
| +40 min | Re-auth AI tools (Copilot, Cursor) | [ ] |
| +45 min | Audit Git commit history | [ ] |
| +50 min | Check recent Vercel deployments | [ ] |
| +60 min | Enable branch protection on GitHub | [ ] |
| +65 min | Enable Vercel deployment approval gate | [ ] |
| +70 min | Run smoke tests on production | [ ] |
| +75 min | Document completion + notify team | [ ] |

**Target: All steps complete in < 90 minutes**

---

## 🚨 EMERGENCY CONTACTS

If you discover active compromise:

**GitHub Enterprise Security:**
- Email: security@github.com
- Form: https://github.com/security

**Vercel Security:**
- Email: security@vercel.com
- Form: https://vercel.com/security

**Stripe Fraud Prevention:**
- Call: +1-888-252-0695 (Stripe Payments Support)
- Login: https://dashboard.stripe.com/dashboard

---

## 📝 NOTES & STATUS

```
Started: __________ (time)
Current Step: ________________
Blocker (if any): ________________
Completion Est: __________ (time)
Completed: __________ (time)
```

---

## ✅ POST-ROTATION CHECKLIST

After completing all rotations:

- [ ] All Stripe charges working normally (test transaction)
- [ ] RPC endpoints responding (check Phantom wallet)
- [ ] Off-ramp fiat working (Ramp/Transak test)
- [ ] GitHub can still push (test small commit)
- [ ] Vercel deploys successfully (check build logs)
- [ ] No error spikes in Vercel logs
- [ ] Team notified of completion
- [ ] Security incident documented

---

**Remember: Speed + Thoroughness = Security**

Execute this methodically but quickly. The attacker has already had 24+ hours inside Vercel infrastructure.
