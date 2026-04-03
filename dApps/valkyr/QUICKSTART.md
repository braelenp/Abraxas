# 🚀 Valkyr Quick Start Guide

## Installation & Setup

```bash
# 1. Navigate to project
cd /workspaces/Valkyr

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:3000
```

## Project Architecture

### Component Hierarchy

```
App
└── LandingPage
    ├── LightBeams (fixed background)
    ├── ParticleBackground (fixed background)
    ├── Hero Section
    │   ├── RuneDisplay (Tiwaz ᚦ)
    │   ├── TypingText ("Welcome to the next degree")
    │   ├── Subtitle & Lore
    │   └── CTAButtons
    ├── Divider
    └── ProtectionFlow
        ├── Tab Navigation
        ├── Content Display
        └── Feature Grid
```

### File Purposes

| File | Purpose |
|------|---------|
| `App.tsx` | Main application entrypoint |
| `LandingPage.tsx` | Hero + protection flow layout |
| `ParticleBackground.tsx` | 20 floating cyan particles |
| `LightBeams.tsx` | 4-layer gradient light effects |
| `TypingText.tsx` | Character animation component |
| `RuneDisplay.tsx` | Tiwaz rune with glow effect |
| `ProtectionFlow.tsx` | 3-pillar strategy overview |
| `CTAButtons.tsx` | Reusable button component |
| `index.css` | Global animations & utilities |

## Styling Reference

### Global Classes

```css
/* Glow Panels */
.glow-panel           /* Base cyan glow */
.glow-panel-purple    /* Purple variant */
.glow-panel-orange    /* Orange variant */
.glow-panel-gold      /* Gold variant */

/* Neon Text */
.neon-text            /* Cyan glow on text */
.neon-text-purple     /* Purple variant */
.neon-text-orange     /* Orange variant */
.neon-text-gold       /* Gold variant */

/* Effects */
.rune-glow            /* Breathing halo */
.typing-text          /* Typing cursor */
.gradient-text        /* Multi-color gradient */
```

### Color System

```javascript
// Tailwind colors available
bg-valkyr-cyan        // #06b6d4
bg-valkyr-purple      // #9945ff
bg-valkyr-orange      // #ea580c
bg-valkyr-gold        // #fdd835
bg-valkyr-teal        // #14b8a6
```

## Key Features

### ✅ Implemented

- [x] Dark cinematic landing page
- [x] Tiwaz rune display with gold glow
- [x] Typing animation ("Welcome to the next degree")
- [x] Lore narrative blurb
- [x] Three CTA buttons (primary/secondary/tertiary)
- [x] Particle background system
- [x] Light beam overlays
- [x] Protection flow section (3-pillar strategy)
- [x] Mobile-first responsive design
- [x] Tailwind + custom CSS animations
- [x] TypeScript support
- [x] ESLint configuration

### 🔮 Ready for Extension

- [ ] Wallet connection (Phantom/Magic/WalletConnect)
- [ ] Portfolio dashboard
- [ ] Real-time market data integration
- [ ] Smart contract interactions
- [ ] On-chain governance
- [ ] Multi-sig vault visualization
- [ ] Risk analytics engine
- [ ] Trading interface

## Development Patterns

### Adding a New Component

```typescript
// src/components/MyComponent.tsx
import React from 'react'

interface MyComponentProps {
  // Define props
}

const MyComponent: React.FC<MyComponentProps> = ({ /* props */ }) => {
  return (
    <section className="w-full py-12 px-4 md:px-8 relative z-20">
      <div className="glow-panel p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold neon-text">Title</h2>
        {/* Content */}
      </div>
    </section>
  )
}

export default MyComponent
```

### Using Hooks

```typescript
import { useWallet } from '../hooks/useWallet'

const MyComponent: React.FC = () => {
  const { connected, connect } = useWallet()
  
  return (
    <button onClick={connect} disabled={connected}>
      {connected ? 'Connected' : 'Connect Wallet'}
    </button>
  )
}
```

## Build & Deploy

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel
# Push to GitHub, Vercel auto-deploys main branch
```

## Environment Variables

Create `.env.local`:

```env
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_WALLET_CONNECT_ID=your_wallet_connect_id
VITE_API_BASE_URL=http://localhost:3001
```

## Mobile Optimization

All components are built mobile-first:

- Breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)
- Touch-friendly buttons: 48px minimum height
- Responsive grid layouts
- Optimized typography scaling
- Viewport meta tag configured

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android Chrome)

## Performance Tips

1. **Lazy load components** for routes not immediately needed
2. **Optimize images** — use WebP format
3. **Tree-shake unused utilities** — Tailwind handles this automatically
4. **Monitor animations** — particles/beams use CSS for 60fps
5. **Use React DevTools** to profile components

## Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3001
```

### Tailwind classes not showing
- Clear `node_modules` and `.vite` cache
- Restart dev server
- Check `tailwind.config.js` content paths

### TypeScript errors
```bash
tsc --noEmit
```

### Build fails
```bash
rm -rf dist node_modules
npm install
npm run build
```

## Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Status:** Ready to build and deploy  
**Next Steps:** Connect wallet, integrate Solana RPCs, build trading interface
