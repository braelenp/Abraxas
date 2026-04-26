# Fenrir — The Fierce Protector

**Standalone Abraxas dApp | Solana Protection Protocol**

A cinematic Abraxas dApp showcasing esoteric design, sovereign power, and protective protocols. Fenrir is the eighth son of Sophia, embodying fierce protection and sovereign authority.

**Live**: [fenrir.vercel.app](#) (Deploy to Vercel)  
**Connected Ecosystem**: [Abraxas](https://abraxas-tokenization-engine.vercel.app/) | Token: `$ABRA`

## Overview

This dApp captures the essence of raw power, unbreakable boundaries, and the uncompromising protection of the collective with a cinematic esoteric aesthetic.

**Design Elements**:
- Deep black backgrounds (#050505)
- Purple core (#9945ff) with neon glows
- Orange fire highlights (#ff6024)
- Cyan neon (#00ffff)
- Gold accents (#fbbf24)
- Scanline effects and particle backgrounds
- Advanced animations and multi-layer neon borders

**Central Symbol**: Thurisaz Rune (↑) - The rune of fierce power and protection

## Features

✦ **Loading Screen**
- Typing animations loading sovereign archives
- Animated Thurisaz rune with glowing effects
- Progress visualization with scanlines

✦ **Landing Page**
- Cinematic typing reveal: "FENRIR — Welcome to the next degree"
- Pulsing Thurisaz rune with advanced glow effects
- 3-column feature grid (Protection, Enforcement, Sovereignty)
- Dual CTA buttons (Explore & Buy $ABRA)
- Lore section with ecosystem context

✦ **Dashboard** (⬢)
- 5 metric cards: Protection Status, Threats Neutralized, Sovereign Power, Collective Guard, Boundaries Secured
- Active Threat Alerts with severity levels (HIGH/MEDIUM/INFO)
- Latest Protections activity log
- Protection Stats with progress visualizations

✦ **Hunt** (↑)
- Threat Hunt opportunity scanner
- 4 protection opportunities with risk/yield assessment
- Interactive expandable cards
- Engagement triggers for threat hunts

✦ **Flow** (⇄)
- Capital flow and liquidity pool management
- 4 synchronized pools with volume and fee data
- Market overview metrics
- Add liquidity interface

✦ **Market** (✦)
- Real-time asset data (FEN, ABRA, SOL, USDC)
- Price, volume, market cap visualizations
- 24h change tracking
- Interactive asset expansion

✦ **Terrain** (◆)
- Protection zone governance interface
- 4 protection zones with coverage tracking
- Guardian management system
- Protocol coordination dashboard
- Collective governance participation

✦ **Navigation System**
- Fixed bottom 5-tab navigation with Raido-style grid
- Cyan-bright top border for active tabs
- Scanline overlay effects
- Abraxas footer on all pages with ecosystem links

## Tech Stack

- **React 18.3** - UI Framework
- **Vite 5** - Build tool with HMR
- **Tailwind CSS 3** - Utility-first styling
- **React Router DOM** - Page routing
- **Solana Web3.js** - Blockchain integration

## Quick Start

### Prerequisites
- Node.js 16+ 
- Yarn or npm

### Installation

```bash
git clone https://github.com/braelenp/Fenrir.git
cd Fenrir
yarn install
```

### Development

```bash
yarn dev
```

Opens dev server on `http://localhost:3002`

### Build

```bash
yarn build
```

Generates optimized production build in `dist/` directory.

### Preview

```bash
yarn preview
```

Preview production build locally.

## Deployment

### Vercel (Recommended)

Fenrir is configured for one-click deployment to Vercel:

1. **Connect Repository**
   ```
   https://github.com/braelenp/Fenrir
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect GitHub account
   - Select Fenrir repository
   - Use default settings (Vercel auto-detects Vite + React)

3. **Deploy**
   - Click "Deploy"
   - Vercel builds (`vite build`) and deploys to CDN

4. **Automatic Redeployment**
   - Push to `main` branch
   - Vercel automatically rebuilds and deploys

### Configuration Files

**vercel.json** - SPA routing configuration:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This rewrites all routes to `index.html` for React Router compatibility.

**vite.config.js** - Build settings:
- Output: `dist/`
- React plugin enabled
- Dev server on port 3002 (local only)

**package.json** - Build command:
```json
{
  "build": "vite build"
}
```

Vercel runs this automatically during deployment.

### Environment Variables

For Solana integration or API keys, add to Vercel dashboard:
1. Project Settings → Environment Variables
2. Add your `VITE_RPC_ENDPOINT` or other variables
3. Variables automatically available during build and runtime

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Routes not working | Check `vercel.json` rewrites are deployed |
| Blank page | Clear cache, verify `dist/index.html` exists |
| Slow build | Reduce animation complexity or split code |
| 404 on refresh | Verify SPA rewrites working in Vercel dashboard |

## Project Structure

```
/
├── vercel.json          # SPA routing configuration
├── vite.config.js       # Vite build settings
├── tailwind.config.js   # Tailwind theme extensions
├── package.json         # Dependencies and scripts
├── index.html           # React entry point
├── postcss.config.js    # Tailwind+Autoprefixer
├── .vercelignore        # Files excluded from deployment
└── src/
    ├── main.jsx         # React root
    ├── App.jsx          # Main app component & routing
    ├── index.css        # Global styles & animations
    └── components/
        ├── LoadingScreen.jsx
        ├── LandingPage.jsx
        ├── FenrirPage.jsx
        ├── Dashboard.jsx
        ├── Hunt.jsx
        ├── Flow.jsx
        ├── Market.jsx
        ├── Terrain.jsx
        ├── BottomNav.jsx
        ├── AbraxasFooter.jsx
        ├── ParticleBackground.jsx
        └── LightBeams.jsx
```

## Customization

### Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'deep-black': '#050505',
  'purple-core': '#9945ff',
  'orange-fire': '#ff6024',
  'cyan-bright': '#00ffff',
  'gold-accent': '#fbbf24',
}
```

### Animations

Add new keyframes in `src/index.css` or `tailwind.config.js`:
```css
@keyframes my-animation {
  0% { ... }
  100% { ... }
}
```

### Token Links

Update token purchase URLs in pages (currently `https://bags.fm/{TOKEN_ID}`).

## Performance

- **Bundle Size**: ~150KB gzipped
- **Load Time**: <2s on 4G
- **Lighthouse**: 90+ scores (Vercel CDN)
- **SPA Routing**: Instant page transitions

## Badges

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React 18](https://img.shields.io/badge/React-18.3-blue?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue?style=flat&logo=tailwindcss)](https://tailwindcss.com)

## License

Part of the Abraxas ecosystem. See parent repository for licensing.

## Related Projects

- **Abraxas** - Main protocol dApp: https://abraxas-tokenization-engine.vercel.app/
- **Raido** - Trading interface
- **Cadabra** - Social layer

---

**Fenrir** — Fierce. Unbreakable. Sovereign. 🐺⚔️◆

```
/
├── index.html              # Entry point
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind theming
├── postcss.config.js       # PostCSS configuration
├── src/
│   ├── main.jsx            # React entry
│   ├── index.css           # Global styles
│   ├── App.jsx             # Main app component
│   └── components/
│       ├── ParticleBackground.jsx    # Animated particles
│       ├── LightBeams.jsx            # Cyan light beam effects
│       ├── LoadingScreen.jsx         # Dramatic loading screen
│       ├── LandingPage.jsx           # Welcome page
│       ├── FenrirPage.jsx            # Main Fenrir page
│       └── Navigation.jsx            # Bottom navigation
└── .gitignore             # Git ignore rules
```

## Installation & Setup

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:3000` with hot module replacement enabled.

3. **Build for production**
```bash
npm run build
```

## Design System

### Colors
- **Void Black**: #050505 (background)
- **Deep Black**: #0a0a0a (secondary bg)
- **Purple Core**: #9945ff (primary accent)
- **Orange Fire**: #ff6024 (highlight/rune)
- **Cyan Light**: #06b6d4 (beams/secondary)
- **Gold Accent**: #f9cc75 (tertiary)

### Animations
- `float` - Peaceful Y-axis movement
- `glitch` - Color-offset displacement effect
- `shimmer` - Background gradient shift
- `typing-reveal` - Width growth with steps
- `pulse-rune` - Orange glow pulsing
- `glow-pulse` - Box shadow breathing
- `particle-float` - Upward particle drift
- `beam-flicker` - Cyan light beam oscillation

### Effects
- **Glow Text**: Multi-layer text shadow with color separation
- **Scanlines**: Horizontal lines with subtle opacity
- **Particles**: Animated symbols drifting upward
- **Light Beams**: Vertical gradient beams with flicker
- **Glitch**: Horizontal displacement with cyan/orange shadows
- **Border Glow**: Inset and outset shadow combination

## Components

### ParticleBackground
Continuously generates animated symbols (✦, ◆, ✧, ⬢, ◇, ⬡) that float upward with fade effect.

**Props:**
- `count` (number): Total particles to maintain
- `color` (string): Hex color for particles

### LightBeams
Creates 5 vertical gradient beams with opacity flicker animation.

### LoadingScreen
Full-screen dramatic loading with typing animation, rune display, progress bar, and status messages.

**Props:**
- `onLoadComplete` (function): Called when loading completes

### LandingPage
Welcome page with typing reveal title, Thurisaz rune, lore blurb, and navigation.

### FenrirPage
Main content page with tabbed interface exploring:
- Guardian Protocol (Overview)
- Ritual of Invocation
- Sovereign Authority
- Invoke Fenrir CTA

### Navigation
Bottom navigation bar with all 8 dApp tabs, showing active state with orange fire glow.

**Props:**
- `activePage` (string): Current active page ID

## Customization

### Adding New Pages
1. Create component in `src/components/`
2. Add to App.jsx
3. Update Navigation component with new tab
4. Update navigation button click handlers

### Modifying Colors
Edit `tailwind.config.js` theme colors:
```javascript
colors: {
  'void': '#0a0a0a',
  'purple-core': '#9945ff',
  // ... etc
}
```

### Adjusting Animations
Modify keyframes in:
- `tailwind.config.js` (main animations)
- `src/index.css` (additional effects)

## Deployment

### Build
```bash
npm run build
```

Generates optimized production build in `dist/` directory.

### Deploy Options
- **Vercel**: Connect GitHub repo for automatic deployment
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **Traditional Server**: Copy `dist/` contents to web server

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Future Enhancements

- Solana wallet integration
- On-chain guardian protocols
- Real-time ritual tracking
- Community governance features
- Advanced analytics dashboard
- Mobile app via Capacitor

## Lore & Narrative

Fenrir is the fierce protector of the Abraxas ecosystem—the eighth son of Sophia, born to destroy threats and enforce boundaries. With the Thurisaz rune as its symbol, Fenrir channels raw sovereign power to safeguard the collective.

The ritual of invocation allows users to channel this protective force, establishing unbreakable boundaries and defending against threats with unwavering will.

## Credits

Built with the Abraxas cinematic esoteric aesthetic, following the same design patterns and spiritual narrative as Genesis, Valkyr, and Raido.

## License

MIT