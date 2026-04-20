# VERCEL BREACH RESPONSE - EXECUTION TRACKER
**Started:** April 20, 2026, [TIME]  
**Target Completion:** Today (before EOD)  
**Status:** IN PROGRESS

---

## SECTION 1: ENVIRONMENT VARIABLE ROTATION

### Vercel Projects Inventory:
- [ ] **Abraxas**, Environment: `production`
- [ ] **RhythmForge**, Environment: `production` (if exists)
- [ ] **Pulse**, Environment: `production` (if exists)
- [ ] **Cadabra**, Environment: `production` (if exists)

### Stripe Rotation:
- [ ] Login to [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
- [ ] Current Secret Key: `sk_live_***` (note last 4: ____)
- [ ] **Generate New Secret Key**: Copy new key `sk_live_***`
- [ ] Vercel → Abraxas → Settings → Environment Variables
  - [ ] Find `STRIPE_SECRET_KEY`
  - [ ] Replace with new key
  - [ ] Set scope: `Production` and `Preview`
  - [ ] Save
- [ ] Trigger Redeploy: [Check next section after all env vars complete]
- [ ] Test on staging: Try a test ACH payment

### Solana RPC Credentials:
- [ ] Current RPC Provider: _________ (Helius, QuickNode, Alchemy, etc)
- [ ] [ ] Generate new endpoint/credentials at provider
- [ ] Vercel env vars to update:
  - [ ] `VITE_SOLANA_RPC_URL` → New RPC endpoint
  - [ ] `VITE_SOLANA_DEVNET_URL` → New devnet endpoint (if used)
- [ ] [ ] Update local `.env.local` for testing

### Ramp/Transak API Keys:
- [ ] **Ramp** (off-ramp fiat):
  - [ ] Login to Ramp dashboard → API Settings
  - [ ] Revoke current key
  - [ ] Generate new `VITE_RAMP_API_KEY` and `VITE_RAMP_HOST_API_KEY`
  - [ ] Update Vercel environment
  - [ ] Old key revoked timestamp: ________

- [ ] **Transak** (off-ramp fiat):
  - [ ] Login to Transak dashboard → Settings
  - [ ] Revoke current key
  - [ ] Generate new `VITE_TRANSAK_API_KEY`
  - [ ] Update Vercel environment
  - [ ] Old key revoked timestamp: ________

### Supabase (if configured):
- [ ] Check if using Supabase: **YES / NO**
- [ ] If YES:
  - [ ] Login to [https://supabase.com](https://supabase.com)
  - [ ] Project → Settings → API
  - [ ] Regenerate `service_role_key` (secret)
  - [ ] Regenerate `anon_key` (public)
  - [ ] Update Vercel: `SUPABASE_SECRET_KEY`, `SUPABASE_ANON_KEY`

### NPM Tokens:
- [ ] Publishing any packages to NPM? **YES / NO**
- [ ] If YES:
  - [ ] Go to [https://www.npmjs.com/settings/~/tokens](https://www.npmjs.com/settings/~/tokens)
  - [ ] Revoke all existing tokens (list count: __)
  - [ ] Create new local-only token (never in Vercel env)
  - [ ] Generate token timestamp: ________
  - [ ] Store in password manager only

### Vercel Redeployment:
- [ ] All env vars updated? ✓ Yes
- [ ] Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
- [ ] Select Abraxas project
- [ ] Settings → Deployments → Find latest production deployment
- [ ] Click the three dots → **"Redeploy"**
- [ ] Wait for deployment to complete (watch build logs)
- [ ] Status check: `✓ Ready` with green checkmark
- [ ] Test endpoint: `https://abraxas.vercel.app/api/health` (should return 200)

**Status: [ ] Section 1 Complete**

---

## SECTION 2: GITHUB TOKEN ROTATION

### Check OAuth Apps Connected to Vercel:
- [ ] Go to [https://github.com/settings/applications](https://github.com/settings/applications)
- [ ] Count suspicious apps: __
- [ ] List them:
  1. ________________
  2. ________________
  3. ________________

### For Each Suspicious OAuth App:
- [ ] App: "Vercel"
  - [ ] Revoke: [ ] Yes
  - [ ] Revoked timestamp: ________
  
- [ ] App: "GitHub Copilot"
  - [ ] Safe? [ ] Yes [ ] No (Revoke if unsure)
  - [ ] Revoked: ________ 
  
- [ ] App: "Cursor IDE"
  - [ ] Revoke: [ ] Yes
  - [ ] Reason: Compromised IDE attack surface
  - [ ] Revoked timestamp: ________

- [ ] App: "Claude / Anthropic"
  - [ ] Revoke: [ ] Yes
  - [ ] Reason: AI tools not needed for this repo
  - [ ] Revoked timestamp: ________

### Personal Access Tokens (Classic):
- [ ] Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
- [ ] Count existing tokens: __
- [ ] Current tokens to delete/rotate:
  1. Token: `ghp_***` | Created: ____ | **Action**: [ ] Delete [ ] Rotate
  2. Token: `ghp_***` | Created: ____ | **Action**: [ ] Delete [ ] Rotate
  3. Token: `ghp_***` | Created: ____ | **Action**: [ ] Delete [ ] Rotate

### Fine-Grained PAT (Recommended):
- [ ] Create new fine-grained token (if needed):
  - [ ] Go to [https://github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)
  - [ ] Name: `abraxas-ci-only`
  - [ ] Repository: `Abraxas` (only this one)
  - [ ] Permissions:
    - [ ] `contents` - read & write
    - [ ] `workflows` - read
  - [ ] Expiration: 90 days
  - [ ] Token created: ________
  - [ ] Stored in password manager: [ ] Yes

### Check Recent GitHub Activity:
```bash
git log --oneline -30 --all 2>/dev/null | grep -v "YOUR_NAME"
```
- [ ] Suspicious commits found? **YES / NO**
- [ ] If YES, contact GitHub enterprise support immediately

**Status: [ ] Section 2 Complete**

---

## SECTION 3: AI TOOLS RE-AUTHENTICATION

### GitHub Copilot (VS Code):
- [ ] Signed out: [ ] Yes
- [ ] Signed back in with new credentials: [ ] Yes
- [ ] Testing: Open file in VS Code → Trigger Copilot
  - [ ] Works normally: [ ] Yes
  - [ ] Logged in to: GitHub account ____________

### Claude (Web or IDE):
- [ ] Verified OAuth connection revoked on GitHub: [ ] Yes
- [ ] Re-authenticated with GitHub: [ ] Yes (if using Claude + GitHub)
- [ ] OR confirmed Claude has local .env only: [ ] Yes

### Cursor IDE:
- [ ] Git integration disabled/re-auth: [ ] Yes
- [ ] GitHub token updated in Cursor: [ ] Yes (if using)
- [ ] OR removed from Cursor completely: [ ] Yes
- [ ] Testing: Open file → Check git history works
  - [ ] Works: [ ] Yes

### Other Tools:
- Tool: _____________ 
  - [ ] Check GitHub OAuth apps: Revoked
  - [ ] Re-auth if needed: [ ] Yes

**Status: [ ] Section 3 Complete**

---

## SECTION 4: CHECK VERCEL DEPLOYMENTS FOR TAMPERING

### Recent Deployments (Last 20):
- [ ] Go to [https://vercel.com/dashboard](https://vercel.com/dashboard) → Abraxas → Deployments
- [ ] Review top 20 deployments:
  - [ ] Date range checked: ____ to ____
  - [ ] Any unauthorized deploys? **YES / NO**
  - [ ] Any weird commit messages? **YES / NO**

### If Suspicious Deployment Found:
- [ ] Deployment ID: ________________
- [ ] Timestamp: ________________
- [ ] Deployed by: ________________
- [ ] [ ] Click "Rollback to Previous"
- [ ] [ ] Verify production is healthy after rollback
- [ ] [ ] Create incident ticket with GitHub/Vercel support

### Git Commit Audit:
```bash
cd /workspaces/Abraxas
git log --oneline --all -- . 2>/dev/null | head -50
```

- [ ] Commits reviewed: Last 50
- [ ] Suspicious commits found? **YES / NO**
- [ ] If YES: Rollback to last known good commit
  ```bash
  git revert [COMMIT_HASH]  # Don't force push!
  ```

**Status: [ ] Section 4 Complete**

---

## SECTION 5: IMMEDIATE HARDENING

### Vercel Security Settings:
1. Go to [https://vercel.com](https://vercel.com) → Account Settings
   - [ ] Navigate to "Security"
   
2. **Production Deployment Protection:**
   - [ ] Enable: "Require approval for production deployments"
   - [ ] Approvers list: ________________
   
3. **Deployment Options:**
   - [ ] Enable: "Automatic Git integration" is OFF for untrusted branches
   - [ ] Enable: "Only deploy main branch by default"

4. **Team Permissions:**
   - [ ] Review who has "write" access: ________________
   - [ ] Remove any suspicious team members
   - [ ] Only creators/leads can deploy: [ ] Confirmed

### GitHub Branch Protection:
1. Go to [https://github.com/braelenp/Abraxas/settings/branches](https://github.com/braelenp/Abraxas/settings/branches)
   - [ ] Click "Protect matching branches"
   
2. **Main Branch Rules:**
   - [ ] Require pull request reviews: ✓ Yes, minimum 1
   - [ ] Dismiss stale pull request approvals: ✓ Yes
   - [ ] Require approval from code owners: [ ] Yes (if CODEOWNERS file exists)
   - [ ] Require branches be up to date: ✓ Yes
   - [ ] Require status checks to pass: ✓ Yes

3. **Restricting Force Pushes:**
   - [ ] "Allow force pushes": ✓ Off
   - [ ] "Allow deletions": ✓ Off

**Status: [ ] Section 5 Complete**

---

## FINAL VALIDATION

### Test Suite:
- [ ] Run tests locally: `npm run test` (if exists)
  - Result: ________
  - [ ] All pass? YES / NO

- [ ] Deploy to staging: Trigger deployment via UI
  - [ ] Staging healthy? YES / NO
  - [ ] Test endpoint works? YES / NO

- [ ] Production smoke tests:
  - [ ] Landing page loads: YES / NO
  - [ ] API endpoints respond: YES / NO
  - [ ] Stripe payment flow works: YES / NO
  - [ ] Off-ramp (Ramp/Transak) works: YES / NO

### Communication:
- [ ] Notify team of rotation completion: [ ] Sent
- [ ] Create incident summary for leadership: [ ] Sent
- [ ] Document lessons learned: [ ] File: __________

---

## SIGN-OFF

**Execution Started:** __________ (date/time)  
**Execution Completed:** __________ (date/time)  
**Total Time:** __________ hours  

**Verified By:** __________________  
**Date:** __________________  

---

## FOLLOW-UP TASKS

Schedule for this week:
- [ ] **Monday**: Review GitHub audit logs (24 hours post-rotation)
- [ ] **Tuesday**: Check Vercel deployment logs for anomalies
- [ ] **Wednesday**: Implement secrets rotation policy
- [ ] **Thursday**: Security training for team (breach response)
- [ ] **Friday**: Deploy monitoring alerts for unauthorized changes

---

**Remember**: This breach proves Abraxas's thesis—centralized platforms are attack surfaces. Start planning migration to on-chain or self-hosted infrastructure.
