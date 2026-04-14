# Alternative Deployment: Render.com

If Railway continues to have issues with Rust detection, Render.com is a great alternative that's Node.js-friendly.

## Step 1: Sign Up

1. Go to **https://render.com**
2. Sign up with GitHub
3. Grant Render access to your repositories

## Step 2: Create Web Service

1. Click **New +** → **Web Service**
2. Connect `braelenp/Abraxas` repository
3. Click **Connect**

## Step 3: Configuration

Set these values:

| Field | Value |
|-------|-------|
| **Name** | abraxas-server |
| **Environment** | Node |
| **Region** | Choose closest to you |
| **Branch** | main |
| **Build Command** | `cd server && npm install` |
| **Start Command** | `node server/index.js` |
| **Root Directory** | (leave empty) |

## Step 4: Environment Variables

Click **Environment** and add:
```
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://abraxas-ten.vercel.app
```

## Step 5: Deploy

1. Click **Create Web Service**
2. Wait for build to complete
3. You'll get a URL like: `https://abraxas-server.onrender.com`

## Step 6: Update Vercel

1. Copy your Render URL from the dashboard
2. Go to **https://vercel.com/dashboard** → **Abraxas**
3. **Settings → Environment Variables**
4. Add/Update:
   ```
   REACT_APP_API_URL = https://abraxas-server.onrender.com
   ```
5. Click **Save** and **Redeploy**

## Advantages of Render
- ✅ Simpler configuration
- ✅ Better Node.js detection
- ✅ Free tier available
- ✅ No Rust detection issues
- ✅ Automatic deploys from GitHub
