# Railway Manual Deployment Guide

Since Railway's auto-detection finds Rust code in the root `/programs` folder, we need to manually configure the deployment.

## Step 1: Delete the Failed Service

In Railway Dashboard:
1. Go to your project
2. Click on the failed **Abraxas** service
3. Click **Settings** ⚙️
4. Scroll down → **Delete Service**
5. Confirm

## Step 2: Create a New Service from Template

1. Go back to your project
2. Click **+ Add Service**
3. Click **GitHub Repo** (not "Deploy from GitHub" - use the one in dropdowns)
4. Select `braelenp/Abraxas`
5. Click **Create**

## Step 3: Configure the Service

After creation, immediately go to **Settings**:

### Build Configuration:
- **Builder:** `Dockerfile` (IMPORTANT - change from default)
- **Dockerfile Path:** `server/Dockerfile`

### Deploy Configuration:
- **Start Command:** `node index.js`

### Root Directory:
- Set to: `/server`

## Step 4: Environment Variables

Click **Variables** tab:
```
NODE_ENV = production
PORT = 3001
FRONTEND_URL = https://abraxas-tokenization-engine.vercel.app
```

Click **Save** or **Update Configuration**

## Step 5: Deploy

1. Click **Deploy** button
2. Wait for build to complete
3. Watch for the logs to show: `🚀 Abraxas Stripe Backend running on port 3001`

## Step 6: Get Your URL

1. Go to **Settings** tab
2. Look for **Public Domain** - copy this URL
3. It will look like: `https://abraxas-production-abc.up.railway.app`

## Step 7: Update Vercel

1. Go to **https://vercel.com/dashboard**
2. Select **Abraxas** project
3. **Settings → Environment Variables**
4. Add/Update variable:
   ```
   REACT_APP_API_URL = https://your-railway-domain.up.railway.app
   ```
5. Click **Save**
6. Go to **Deployments** and click **Redeploy** on latest

## Troubleshooting

**If build still fails with Rust error:**
1. Check that **Builder** is set to `Dockerfile` (not Nixpacks)
2. Check that **Dockerfile Path** is `server/Dockerfile`
3. Delete service and try again

**If it keeps detecting Rust:**
1. Try opening Railway in Incognito/Private mode
2. Clear Railway cache
3. Contact Railway support about Rust detection override

## Manual Test

Once deployed, test your backend URL:
```bash
curl https://your-railway-domain/health
```

Should return:
```json
{"status":"ok","timestamp":"2026-04-14T..."}
```

## If All Else Fails

Alternative deployment options:
- **Render.com** - Simpler Node.js deployment
- **Fly.io** - Good Node.js support
- **Railway Spaces** - Create isolated environment
- **Vercel Functions** - Deploy serverless functions
