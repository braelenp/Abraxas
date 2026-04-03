/**
 * QUICK START GUIDE
 * 
 * Raido — The Swift Provider
 * A sovereign liquidity engine and opportunity hunter for Solana
 */

# 🚀 Quick Start

## Installation

### Option 1: Automated Setup (Recommended)

**On macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**On Windows:**
```bash
setup.bat
```

### Option 2: Manual Setup

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

## Development Commands

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Structure

```
Raido/
├── src/
│   ├── components/           # All React components
│   │   ├── App.tsx          # Main app shell
│   │   ├── LandingPage.tsx  # Hero page with Raidho rune
│   │   ├── LoadingScreen.tsx
│   │   ├── OpportunityScanner.tsx
│   │   ├── FlowSimulator.tsx
│   │   ├── Dashboard.tsx
│   │   └── [Others]         # Cinematic effects components
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind CSS config
└── README.md
```

## Key Features

### 🎯 Pages

| Page | Component | Purpose |
|------|-----------|---------|
| **Landing** | `LandingPage` | Hero page with Raidho rune, typing effects, CTA buttons |
| **Hunt** | `OpportunityScanner` | Discover liquidity opportunities across Solana |
| **Flow** | `FlowSimulator` | Build and simulate multi-step capital flows |
| **Dashboard** | `Dashboard` | Real-time metrics, activities, and pool integration |

### 🎨 Design

- **Colors:** Gold (#d4af37) on Deep Blue (#0a1f3e)
- **Effects:** Particles, light beams, glowing runes, typing animations
- **Mobile-First:** Responsive design for all screen sizes
- **Dark Aesthetic:** Cinematic, esoteric, DeFi-focused

### 🪝 Custom Hooks

- `useParticles` - Particle effect animation system
- `useTypingEffect` - Character-by-character text reveal

### 📦 Components

- `RaidhoRune` - Animated SVG wheel symbol
- `ParticleBackground` - Canvas-based particle system
- `LightBeam` - Cinematic light effects
- `LoadingScreen` - Cinematic loading sequence

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Solana network
VITE_SOLANA_NETWORK=devnet

# RPC endpoint
VITE_SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com
```

## Mock Data

By default, all features use mock data:

- **Opportunity Scanner:** Generates 6 random pool opportunities
- **Flow Simulator:** Shows example capital flow paths
- **Dashboard:** Displays realistic but simulated metrics

For production, integrate with:
- Raydium API
- Orca SDKs
- Jupiter API
- DexScreener API

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Performance Tips

1. **Particles:** Reduce `intensity` on lower-end devices
2. **Animations:** Use browser dev tools to monitor performance
3. **Images:** Optimize SVG and image assets
4. **Lazy Loading:** Implement for lengthy content pages

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Explore all pages and features
4. 🔗 Integrate real Solana wallet adapter
5. 🌐 Connect actual liquidity pool APIs
6. 📊 Add real data fetching
7. 🚀 Deploy to production

## Support

For more detailed development information, see [DEVELOPMENT.md](./DEVELOPMENT.md)

For project metadata, see [PROJECT.json](./PROJECT.json)

---

**The Swift Provider awaits. The hunt begins. ◆**
