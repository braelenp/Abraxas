# Cadabra Vercel Deployment Guide

## Quick Start

The Cadabra project is configured for seamless Vercel deployment.

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Select the `cadabra` repository
5. Vercel will auto-detect Vite and configure settings
6. Click "Deploy"

Your app will be live at `cadabra.vercel.app` (or custom domain)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd /workspaces/cadabra
vercel

# For production deployment
vercel --prod
```

## Configuration Files

- **vercel.json** - Deployment configuration with build/dev commands
- **.vercelignore** - Files to exclude from deployment
- **vite.config.ts** - Vite bundler configuration
- **tailwind.config.js** - Tailwind CSS configuration

## Environment Variables

If you need environment variables in the future:

1. Go to Project Settings → Environment Variables
2. Add variables (e.g., API keys, tokens)
3. They'll be available at build and runtime

Current variables: None required

## Deployment Checklist

- ✅ Build command configured: `npm run build`
- ✅ Output directory: `dist`
- ✅ Development command: `npm run dev`
- ✅ Framework detected: Vite
- ✅ TypeScript support enabled
- ✅ Tailwind CSS configured
- ✅ Production build tested locally

## Local Testing Before Deployment

```bash
# Build locally
npm run build

# Preview production build
npm run preview

# This starts a local server showing exactly what will be deployed
```

## Post-Deployment

Your live app includes:
- ✅ All 6 tabs: home, explore, post, trending, marketplace, profile
- ✅ Full button interactivity and flows
- ✅ Post creation, commenting, liking, reposting
- ✅ KOL marketplace with follow/invest functionality
- ✅ Profile customization with avatar, name, bio
- ✅ Social links: Discord, Twitter, Bags DEX buy button
- ✅ Responsive design (desktop and mobile)
- ✅ Glass-morphism UI with cyan/purple theme

## Troubleshooting

**Build fails on Vercel?**
- Check build logs: Project Settings → Build & Development
- Verify TypeScript has no errors: `npm run build` locally first

**Styles not loading?**
- Tailwind CSS is included in index.css
- Vercel will bundle automatically

**Need custom domain?**
- Project Settings → Domains
- Add your domain and follow DNS instructions

## Next Steps

- Add environment variables for API endpoints
- Set up CI/CD with GitHub Actions
- Configure custom analytics
- Add auth integration (Magic, Phantom wallet, etc.)
- Connect to backend API

## Support

For deployment issues, check:
- [Vercel Docs](https://vercel.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- GitHub repo issues
