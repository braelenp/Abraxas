# Vercel Deployment Guide

## Automatic Deployment

This project is configured to deploy on Vercel with automatic builds and deploys.

### Prerequisites

1. Push your code to GitHub
2. Have a Vercel account connected to your GitHub

### Steps to Deploy

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository (`braelenp/Valkyr`)

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add the following variables (required):
     - `VITE_SOLANA_RPC_URL`: `https://api.devnet.solana.com` (or mainnet as needed)
     - `VITE_NETWORK`: `devnet` (or `mainnet`)

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project
   - Your site will be available at a Vercel subdomain

### Automatic Deploys

Any push to the `main` branch will automatically trigger a new deployment.

### Build Settings

- **Framework**: Vite
- **Build Command**: `yarn build`
- **Install Command**: `yarn install`
- **Output Directory**: `dist`

### Useful Links

- **Vercel Documentation**: https://vercel.com/docs
- **Vite on Vercel**: https://vercel.com/docs/frameworks/vite
- **Environment Variables**: https://vercel.com/docs/projects/environment-variables

### Troubleshooting

**Build fails with "Cannot find module"**
- Clear the build cache in Vercel settings
- Ensure all dependencies are in package.json
- Run `yarn install && yarn build` locally to verify

**Environment variables not loading**
- Prefix all variables with `VITE_` (this is required for Vite to expose them to the browser)
- Redeploy after adding new environment variables

**Site shows blank page**
- Check browser console for errors
- Verify environment variables are set correctly
- Check Vercel build logs for compilation errors
