# 🚀 Vercel Deployment Guide — Raido dApp

## **Quick Start (1 Click)**

### **Option 1: Deploy with Vercel Button**
Click the button below to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbraelenp%2FRaido&project-name=raido-swift-provider&repository-name=Raido&demo-title=Raido%20%E2%80%94%20The%20Swift%20Provider&demo-description=Liquidity%20hunting%20and%20capital%20flow%20dApp%20on%20Solana&demo-url=https%3A%2F%2Fraido.vercel.app&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fbraelenp%2FRaido%2Fmain%2Findex.html&env=VITE_API_BASE&envDescription=Optional%3A%20API%20base%20URL%20for%20backend%20services)

---

## **Option 2: Manual Deployment**

### **1. Connect Repository**
```bash
# Push to GitHub (already done)
git push origin main
```

### **2. Deploy to Vercel**

**Via CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Via Web Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose **braelenp/Raido**
5. Click **"Deploy"**

---

## **Configuration Options**

### **Environment Variables**
Currently none required. Optional variables:
- `VITE_API_BASE` - Backend API endpoint (for future Solana integration)

Add in Vercel Dashboard:
1. Project Settings → Environment Variables
2. Add `VITE_API_BASE` with your API URL
3. Redeploy

### **Build Settings** (Pre-configured)
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## **After Deployment**

### **Domain Setup**
1. Vercel assigns URL: `raido-*.vercel.app`
2. To use custom domain:
   - Go to **Project Settings** → **Domains**
   - Add your domain (e.g., `raido.com`)
   - Follow DNS configuration steps

### **First Deployment Checks**
- ✅ Landing page loads at `/`
- ✅ Dashboard tab works
- ✅ Hunt tab with filters works
- ✅ Flow simulator functions
- ✅ All buttons are clickable
- ✅ Responsive on mobile

### **Monitoring**
- Vercel Dashboard shows:
  - Build logs
  - Deployment history
  - Performance metrics
  - Analytics

---

## **Optimization Tips**

### **For Production**
```bash
# Test production build locally
npm run build
npm run preview
# Visit http://localhost:4173
```

### **Enable Edge Caching**
Already configured in `vercel.json`:
- Static assets: 1 year cache
- HTML: default (no cache)

### **Security Headers**
Already included:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

---

## **Troubleshooting**

### **Build Fails**
```bash
# Check locally first
npm install
npm run build
# Should create dist/ folder
```

### **Website Shows 404**
- Ensure `vercel.json` rewrites are active
- Check that build output is in `dist/`
- Redeploy: `vercel --prod`

### **Slow Performance**
- Check Vercel Analytics dashboard
- Verify images are optimized
- Consider using CDN for assets

---

## **Performance Metrics**

### **Current Optimization**
- ✅ Vite builds: ~500ms
- ✅ Code splitting enabled
- ✅ Tree-shaking active
- ✅ Minification enabled
- ✅ Source maps disabled for production

### **Page Size**
- HTML: ~2KB
- CSS: ~50KB (Tailwind)
- JS: ~200KB (React + deps)
- Total: ~250KB (gzipped)

---

## **Rollback**

If deployment breaks:
1. Vercel Dashboard → **Deployments**
2. Click previous working deployment
3. Click **"Promote to Production"**

---

## **GitHub Actions Integration**

Vercel auto-deploys on:
- **Push to main**: Automatic production deploy
- **Pull requests**: Auto preview deployments
- **Scheduled redeploys**: Available in settings

---

## **Next Steps**

### **Ready to Deploy?**
```bash
# All changes committed and pushed
git log --oneline -1
# Should show your recent commit

# Go to Vercel and connect repository
```

### **Future Enhancements**
- Add Solana RPC environment variables
- Connect real liquidity pool data
- Integrate Jupiter Aggregator API
- Add wallet adapter UI
- Enable transaction signing

---

**Status**: ✅ **Ready for Vercel Deployment**  
**Last Updated**: March 31, 2026  
**Version**: 0.1.0

The Swift Provider awaits. 🚀

