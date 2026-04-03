# Raido Development

## Quick Start

To run Raido locally:

```bash
npm install
npm run dev
```

The app will open at `http://localhost:3000`

## Mobile-First Implementation

All components are designed mobile-first:
- Base styles apply to mobile
- `md:` prefix applies to tablets/desktop
- `lg:` prefix applies to large screens

## Cinematic Elements

The dApp features several cinematic enhancements:

### Particle Background
- Configurable intensity and color
- Canvas-based performance
- Used throughout for atmosphere

### Light Beams
- Static directional beams
- Animated movement effect
- Positioned at corners

### Raidho Rune
- SVG-based wheel/motion symbol
- Animated glow pulse
- Centered on landing page
- Appears in loading screen

### Typing Effects
- Character-by-character reveal
- Main title: "Welcome to the next degree."
- Subtitle: "Raido — The Swift Provider, Son of Sophia"

### Loading Screen
- Simulates protocol initialization
- Progress bar with stages
- Rune animation
- ~3 second duration

## Navigation Flow

1. **Landing** → Full cinematic hero with Raidho rune and typing effects
2. **Hunt** → Opportunity Scanner with search and discovery
3. **Flow** → Capital Flow Simulator for multi-step routing
4. **Dashboard** → Real-time metrics and activity tracking

## Mobile Responsiveness

- All components tested at mobile and tablet sizes
- Touch-friendly button sizes (44px minimum)
- Stack layouts on mobile, grid on desktop
- Responsive font sizes with `text-{xs|sm|base|lg|xl|2xl|3xl}`
- Flexible spacing with `gap-` utilities

## Color Palette

The gold/deep blue theme represents motion and capital flow:

- **Gold (#d4af37):** Primary, represents value and liquidity
- **Deep Blue (#0a1f3e-#2a4a7c):** Background, represents the flowing medium
- **Cyan (#00ffff):** Accents and highlights
- **Purple (#9945ff):** Supporting accent

## Animation Principles

- Smooth transitions on hover (300ms)
- Glow effects for interactive elements
- Pulse animations on live data
- Float animations on decorative elements
- Beam animations on light effects

## Dark Esoteric Aesthetic

The design draws from:
- Dark academia
- Esoteric symbolism (runes)
- Cyberpunk/futurism
- DeFi culture
- Sacred geometry

## Performance Considerations

- Canvas particles reduce on lower-end devices
- Smooth scrolling enabled
- Optimized animations with `will-change`
- Lazy loading recommended for production
- CDN delivery for assets

## Future Enhancements

- Real Solana RPC integration
- Chart libraries for data visualization
- WebGL for advanced particle effects
- Three.js for 3D rune rendering
- Real-time price feeds
- Advanced filtering/search
