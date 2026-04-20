# VERCEL BREACH SECURITY ACTION PLAN
**Created: April 20, 2026 | CRITICAL - Execute Today**

## THREAT SUMMARY
ShinyHunters (Ticketmaster breach group) is selling internal Vercel database access for $2M on BreachForums.  
**Exposed**: Internal DBs, employee accounts, GitHub tokens, NPM tokens, and ability to push malicious code to Next.js apps.  
**Your Risk**: Abraxas uses Vercel for serverless functions (Species Awakening backend, Stripe integration).

---

## IMMEDIATE ACTION ITEMS (TODAY)

### 1. ROTATE ALL ENVIRONMENT VARIABLES
**Priority: CRITICAL**

#### Abraxas Projects on Vercel:
- [ ] Abraxas Frontend (Next.js/Vite app)
- [ ] Abraxas Backend API (serverless functions)
- [ ] Species Awakening Campaign API
- [ ] RhythmForge (if deployed to Vercel)
- [ ] Pulse (if deployed to Vercel)
- [ ] Cadabra (if deployed to Vercel)

#### Environment Variables to Rotate:

**Stripe** (ACH payment processing):
- [ ] `STRIPE_SECRET_KEY` - **ROTATE IMMEDIATELY**
- [ ] `STRIPE_PUBLIC_KEY` - (public, lower risk but verify)
- [ ] Action: Log into [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) → Generate new secret key

**Solana/Blockchain RPC**:
- [ ] `VITE_SOLANA_RPC_URL` (mainnet)
- [ ] `VITE_SOLANA_DEVNET_URL` (if used)
- [ ] Action: Verify RPCs are through commercial provider or rotate provider endpoint

**Supabase** (if configured):
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SECRET_KEY`
- [ ] Action: Log into Supabase → Project Settings → API Keys → Regenerate

**API Keys**:
- [ ] `VITE_RAMP_API_KEY` (Ramp fiat off-ramp)
- [ ] `VITE_RAMP_HOST_API_KEY`
- [ ] `VITE_TRANSAK_API_KEY` (Transak fiat off-ramp)
- [ ] Action: Log into each service, regenerate keys

**NPM Token** (if publishing packages):
- [ ] Check [https://www.npmjs.com/settings/~/tokens](https://www.npmjs.com/settings/~/tokens)
- [ ] [ ] Revoke all tokens
- [ ] [ ] Generate new token locally only (never commit to Vercel env)

**Vercel Deployment Rotation Steps**:
```
1. Go to https://vercel.com → Select Project
2. Settings → Environment Variables
3. For each secret (API key, token, URL):
   a) Click on the variable
   b) Remove the current value
   c) Enter the NEW rotated value
   d) Make sure scope is correct (Production/Preview/Development)
   e) Save
4. Redeploy from Vercel dashboard (Settings → Deployments → Redeploy)
   - This forces all serverless functions to restart with new env vars
```

---

### 2. REVOKE & REGENERATE GITHUB TOKENS
**Priority: CRITICAL**

GitHub tokens are the most dangerous — they allow code push and package publishing.

#### Check for Compromised OAuth Apps:
1. Go to [https://github.com/settings/applications](https://github.com/settings/applications)
2. Look for suspicious apps (especially: Copilot, Claude, Cursor)
3. For each suspicious app:
   - [ ] Click "Revoke"
   - [ ] Note: You'll need to re-authenticate these apps after revoking

#### Personal Access Tokens (PAT):
1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. For each existing token:
   - [ ] Click "Regenerate" if used for personal work
   - [ ] **Delete completely** if you're unsure who/what created it
3. Create a new PAT only if needed:
   - Scope: `repo` (full control), `read:packages`, `write:packages`
   - Expiration: 90 days (shorter is better)
   - **STORE ONLY IN PASSWORD MANAGER**, never in Vercel env

#### Fine-grained Personal Access Tokens (Recommended):
1. Go to [https://github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)
2. Create new fine-grained token:
   - Select: Abraxas repository only
   - Permissions: contents:read/write, actions:read
   - **This is safer than classic PATs**

---

### 3. AUDIT AI TOOLS (Copilot, Claude, Cursor)
**Priority: HIGH**

#### For each AI tool you use:

**GitHub Copilot:**
- [ ] Go to [https://github.com/settings/copilot/setup](https://github.com/settings/copilot/setup)
- [ ] Check if connected to Abraxas repo
- [ ] Review activity log
- [ ] If suspicious: Revoke and re-authenticate

**Claude (if connected to GitHub):**
- [ ] Check [https://github.com/settings/applications](https://github.com/settings/applications) for "Anthropic" or "Claude"
- [ ] If listed: Click → "Revoke"
- [ ] Re-authenticate Claude with fresh GitHub OAuth if needed

**Cursor IDE:**
- [ ] If using Cursor with GitHub integration:
  - [ ] Go to Cursor → Settings → Extensions
  - [ ] Disable/re-authenticate GitHub extension
  - [ ] Clear local storage: `~/.cursor/`

**VS Code Extensions:**
- [ ] Go to Extensions marketplace in VSCode
- [ ] Check GitHub-connected extensions (Copilot, GitLens, etc.)
- [ ] Sign out of all
- [ ] Sign back in with new GitHub PAT

---

### 4. CHECK FOR UNEXPECTED VERCEL DEPLOYMENTS
**Priority: HIGH**

#### Verify Deployment Activity:
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. For each project (Abraxas, RhythmForge, Pulse, Cadabra):
   - [ ] Settings → Deployments → Check last 20 deployments
   - [ ] Look for:
     - Deployments you didn't trigger
     - Unusual deploy times
     - Changes to production branch unexpectedly
   - [ ] Click each deployment → Inspect changes
   - [ ] If suspicious: Rollback to last known good deployment

#### Git Commit History:
```bash
cd /workspaces/Abraxas
git log --oneline --author="username" -30  # Check your commits
git log --oneline --all -- app/src 2>/dev/null | head -50  # Check file changes
```
- [ ] Look for commits you didn't make
- [ ] Look for suspicious file adds (crypto malware, exfil scripts)

---

### 5. VALIDATE YOUR DEPLOYMENT CHAIN
**Priority: MEDIUM**

Verify that Vercel is the **only** point of deployment:

- [ ] Check Railway, Render, or other platforms for unexpected deployments
- [ ] Review AWS/GCP/Azure console for unauthorized resources
- [ ] Check Solana devnet/mainnet program IDs for any deployments while Vercel was compromised

---

## AFTER IMMEDIATE ACTIONS

### Within 48 Hours:
1. [ ] Monitor GitHub logs for any unauthorized pushes
2. [ ] Monitor Vercel deployment logs for suspicious activity
3. [ ] Set up Vercel alerts for unusual deployments
4. [ ] Create Security Document: "Post-Breach Hardening Checklist"

### Within 1 Week:
1. [ ] Enable GitHub branch protection rules
   - Require code review before merge
   - Require status checks to pass
   - Dismiss stale PR approvals
   
2. [ ] Set up GitHub secret scanning
   - [https://github.com/YOUR_ORG/Abraxas/settings/secrets/actions](https://github.com/YOUR_ORG/Abraxas/settings/actions)
   - Enable: "Push protection"
   
3. [ ] Implement Vercel security best practices
   - Use environment secrets (not uploaded)
   - Enable deployment protection (require approval for production)
   - Restrict who can deploy to main branch

4. [ ] Migrate high-value secrets **OUT OF VERCEL ENV**
   - Use AWS Secrets Manager or HashiCorp Vault instead
   - Vercel is now a known attack surface

---

## VERCEL SECURITY SETTINGS TO ENABLE

[Go to https://vercel.com → Your Account → Settings → Security]

- [ ] **Require approval for deployments** (Production)
- [ ] **Require approval for rollbacks**
- [ ] **Enable IP Whitelisting** (limit deployment ips)
- [ ] **Disable team settings** that allow auto-redeploy

---

## LONG-TERM: MOVE OFF CENTRALIZED PLATFORMS

**Why Abraxas Exists:**  
This breach is proof that centralized platforms (Vercel, AWS, Google Workspace) are becoming the attack surface.

### Migration Plan:
- [ ] Start deploying to **Railway** or **Render** instead of Vercel (reduces single point of failure)
- [ ] Implement Solana program deployments instead of serverless APIs
- [ ] Use **Phantom RPC** or **Helius** instead of single RPC provider
- [ ] Move secrets to on-chain program state with access controls

---

## CHECKLIST SUMMARY

**TODAY (Critical):**
- [ ] Rotate Stripe keys
- [ ] Rotate Solana RPC credentials (if any)
- [ ] Rotate Ramp/Transak API keys
- [ ] Revoke all GitHub OAuth apps
- [ ] Regenerate/rotate GitHub PATs
- [ ] Re-authenticate AI tools (Copilot, Claude, Cursor)
- [ ] Check Vercel deployments for tampering
- [ ] Verify Git commit history is clean

**This Week:**
- [ ] Enable GitHub branch protection
- [ ] Set up secret scanning
- [ ] Configure Vercel deployment protection
- [ ] Migrate secrets out of Vercel env

**This Month (Long-term):**
- [ ] Evaluate alternative deployment platforms
- [ ] Plan on-chain program migrations
- [ ] Document security policies

---

## REFERENCES
- Vercel Official Statement: [https://vercel.com/security](https://vercel.com/security)
- ShinyHunters Previous Breaches: Ticketmaster (2023), Coin.base, others
- GitHub Security Docs: [https://docs.github.com/en/code-security](https://docs.github.com/en/code-security)

---

**Status:** PENDING EXECUTION  
**Estimated Time:** 2-3 hours total  
**Severity:** CRITICAL - Execute immediately
