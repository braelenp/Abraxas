# Backend Deployment Guide - Railway

## Quick Deploy to Railway

### Option 1: Deploy via Railway CLI (Recommended)

1. **Create Railway Account**
   - Go to: https://railway.app
   - Sign up with GitHub (recommended)

2. **Authenticate Railway CLI**
   ```bash
   railway login
   ```
   This opens a browser for GitHub OAuth authentication

3. **Navigate to server directory**
   ```bash
   cd /workspaces/Abraxas/server
   ```

4. **Initialize Railway project**
   ```bash
   railway init
   ```
   - Select "Create a new project"
   - Name it: `Abraxas Species Awakening API`

5. **Deploy**
   ```bash
   railway up
   ```
   Railway will:
   - Build your Node.js app
   - Create a public URL (e.g., `https://abraxas-production-abc.up.railway.app`)
   - Deploy your backend

6. **Get Your Backend URL**
   ```bash
   railway logs
   ```
   Look for: "Abraxas Stripe Backend running on port 3001"
   Railway automatically assigns a public domain

### Option 2: Deploy via Railway Dashboard

1. Go to: https://railway.app/dashboard
2. Create new project → Import from GitHub
3. Select the `/workspaces/Abraxas` repo
4. Select `/server` as root directory
5. Add environment variables (see below)
6. Deploy

## Required Environment Variables

Set these in Railway dashboard (Settings → Environment):

```
PORT=3001
STRIPE_SECRET_KEY=sk_test_xxxx (from your Stripe dashboard)
STRIPE_WEBHOOK_SECRET=whsec_xxxx (optional)
FRONTEND_URL=https://abraxas-tokenization-engine.vercel.app
NODE_ENV=production
```

## Get Your Backend URL

After deployment, Railway provides a public URL like:
```
https://your-app-name-production-abc.up.railway.app
```

## Update Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select `Abraxas` project
3. Settings → Environment Variables
4. Add new variable:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://your-railway-url.up.railway.app`
   - **Environments:** Production
5. Click "Save" and **Redeploy** the frontend

## Verify Deployment

After updating Vercel:
1. Hard refresh: https://abraxas-tokenization-engine.vercel.app
2. Open browser console (F12)
3. Look for logs like: `[Species Awakening] Using API_URL from env: https://...`
4. Tasks should load in Active Quests section

## Troubleshooting

**Tasks still not showing?**
- Check console: F12 → Console tab
- Look for red network errors
- Verify `REACT_APP_API_URL` is set on Vercel

**Check API health:**
```bash
curl https://your-railway-url/health
```
Should return: `{"status":"ok","timestamp":"..."}`

**Check tasks endpoint directly:**
```bash
curl "https://your-railway-url/api/species-awakening/tasks/4L3GZexYeVmVNhm7eEbZpDK9t5Dxh3qhCtNqWvFGDGMd"
```

## Scaling Notes

- Free tier includes 5GB/month bandwidth
- Automatic scaling with usage
- Connect custom domain if needed
- Railway automatically manages SSL/HTTPS
