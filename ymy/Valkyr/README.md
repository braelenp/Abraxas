# Valkyr — The Wise Guardian, Son of Sophia

Welcome to Valkyr, the strategic protection and oversight platform for tokenized assets on Solana.

## Overview

Valkyr is part of the Sophia family of DeFi platforms. Where the Daughters (Echo, Legacy, Pulse, Aurelia, Vein, Verdant) birth assets into matter, the Sons provide essential infrastructure. Valkyr stands as the masculine guardian—providing custody, security audits, compliance certifications, and strategic oversight for the entire ecosystem.

### Core Vision

**"Welcome to the next degree."**

Valkyr ensures long-term victory and protection for every tokenized asset through:
- **Strategic Oversight** — Multi-sig vault architecture and portfolio defense
- **Risk Management** — Real-time market monitoring and exposure tracking
- **Governance** — On-chain decision-making for custody and strategic protection

## Project Structure

```
Valkyr/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx           # Main landing page hero
│   │   ├── ParticleBackground.tsx    # Floating particle effects
│   │   ├── LightBeams.tsx            # Cinematic light beam overlays
│   │   ├── TypingText.tsx            # Typing animation component
│   │   ├── RuneDisplay.tsx           # Elder Futhark rune with glow
│   │   ├── ProtectionFlow.tsx        # Strategic oversight flow UI
│   │   └── CTAButtons.tsx            # Call-to-action buttons
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Technology Stack

- **Framework**: React 18.2+ with TypeScript
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.4+ with custom animations
- **Deployment**: Optimized for Vercel

## Design System

### Color Palette (Abraxas Inspired)

- **Primary Cyan**: `#06b6d4` — Primary interaction color
- **Purple**: `#9945ff` — Protection and mysticism
- **Orange**: `#ea580c` — Fire and energy
- **Gold**: `#fdd835` — Rune emphasis and sacred markers
- **Dark BG**: `#0a0a0a` — Core background
- **Surface**: `#1a1a2e` — Card and panel backgrounds

### Type System

- **Display Font**: Inter (300-800 weights)
- **Monospace**: JetBrains Mono (for system markers and technical text)

### Animation & Effects

- **Particles**: 20 floating cyan particles with 9-23s duration
- **Light Beams**: 4-layer gradient overlays (cyan, purple, orange)
- **Rune Glow**: Breathing halo effect (230px, 150px, 88px cascade)
- **Typing**: Character-by-character reveal with cursor
- **Neon Effects**: Text shadow glows for cybernetic aesthetic

## Features

### Landing Page

✅ **Dark Cinematic Hero** — Esoteric styling with light beams and particles  
✅ **Tiwaz Rune Display** — Central glowing rune (yellow/gold tones)  
✅ **Dramatic Typing Reveal** — "Welcome to the next degree."  
✅ **Lore Narrative** — Strategic guardian positioning  
✅ **Call-to-Action Buttons**:
   - Enter Strategic Oversight
   - View Devnet
   - Connect Wallet  

### Strategic Overview

✅ **Portfolio Defense Simulator** — Multi-sig vault visualization  
✅ **Risk Overview** — Real-time exposure tracking  
✅ **Governance Tools** — On-chain decision interface  

### Responsive Design

- Mobile-first architecture
- Full mobile optimization (375px - 768px)
- Desktop enhancements (1024px+)
- Touch-friendly CTA buttons

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment

- Node.js 16+ (18+ recommended)
- npm 8+ or yarn 3+

## Development Workflow

### Adding New Components

All components follow the established pattern:

```typescript
import React from 'react'

interface ComponentProps {
  // Define props
}

const ComponentName: React.FC<ComponentProps> = ({ props }) => {
  return (
    <div className="glow-panel">
      {/* Component content */}
    </div>
  )
}

export default ComponentName
```

### Custom Classes

Use the provided Tailwind and CSS utilities:

- `.glow-panel` — Base glow card style
- `.neon-text` — Cyan neon text effect
- `.neon-text-purple` — Purple neon effect
- `.neon-text-orange` — Orange neon effect
- `.rune-glow` — Breathing rune animation

## Lore Context

Valkyr is part of the Abraxas DeFi ecosystem, which reimagines tokenized asset management through ancient Germanic and Norse mysticism.

### The Sophia Family

**Central Intelligence:**
- **Sophia** — Divine wisdom governing RWA vaults and yield cycles

**Daughters (Asset Class Platforms):**
- Echo — Music rights and streaming royalties
- Legacy — Athlete equity and NIL
- Pulse — Gaming clips and live streams
- Aurelia — Real estate and development
- Vein — Minerals and natural resources
- Verdant — Carbon and environmental assets

**Sons (Provider Services):**
- **Valkyr** — Strategic custody and protection
- Raido — Liquidity provision
- Fenrir — Risk management and hedging
- Mimir — Oracle services
- Genesis — Prime foundation

## License

MIT

---

**Status:** Strategic Oversight Active  
**Network:** Solana (Mainnet, Devnet, Testnet support)  
**Version:** 1.0.0