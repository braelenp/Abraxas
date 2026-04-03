# FENRIR dApp - Complete Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

---

## Project Overview

**Fenrir** is a standalone Abraxas dApp following the exact cinematic esoteric structure and aesthetic of Genesis, Valkyr, and Raido.

### Core Features Implemented

✦ **Loading Screen** (`src/components/LoadingScreen.jsx`)
- Typing reveal: "ACCESSING SOVEREIGN ARCHIVES"
- Thurisaz rune (↑) with orange fire glow
- Dynamic progress bar
- Particle background & light beams

✦ **Landing Page** (`src/components/LandingPage.jsx`)
- Dramatic typing reveal: "Welcome to the next degree."
- Central Thurisaz rune with orange fire pulse
- Subtitle: "Fenrir — The Fierce Protector"
- Full lore: "Son of Sophia. The unbreakable guardian..."
- Buy $ABRA buttons (top & bottom)
- Bottom navigation with all 8 tabs

✦ **Fenrir Main Page** (`src/components/FenrirPage.jsx`)
- Header with animated subtitle typing
- 4 interactive tabs:
  - OVERVIEW: Guardian Protocol
  - RITUAL: Ritual of Invocation
  - SOVEREIGNTY: Sovereign Authority
  - INVOKE FENRIR: Call-to-action
- Features grid, detailed content
- Full cinematic ritual aesthetic

✦ **Navigation System** (`src/components/Navigation.jsx`)
- All 8 dApp tabs: Dashboard, Vaults, Market, Trade, King AI, Circuit, Forge, Fenrir
- Nordic rune icons for each tab
- Active state with orange fire glow
- Fixed bottom navigation

✦ **Visual Effects**
- Particle background with floating runes
- Cyan light beams
- Scanline effect overlay
- Glowing text effects (purple, orange, cyan)
- Pulsing Thurisaz rune
- Multiple animations (float, glitch, shimmer, pulse)

---

## File Structure

```
/workspaces/Fenrir/
├── index.html                           # Vite entry point
├── package.json                         # Dependencies & scripts
├── tailwind.config.js                   # Tailwind CSS config with custom colors & animations
├── vite.config.js                       # Vite build config
├── postcss.config.js                    # PostCSS config
├── .gitignore                           # Git ignore rules
├── README.md                            # Documentation
│
└── src/
    ├── main.jsx                         # React entry point
    ├── index.css                        # Global styles & esoteric effects
    ├── App.jsx                          # Main app component
    │
    └── components/
        ├── ParticleBackground.jsx       # Animated particle symbols
        ├── LightBeams.jsx               # Cyan light beam effects
        ├── LoadingScreen.jsx            # Dramatic loading screen
        ├── LandingPage.jsx              # Welcome landing page
        ├── FenrirPage.jsx               # Main Fenrir content page
        └── Navigation.jsx               # Bottom navigation bar
```

---

## Color Palette (Tailwind Extended)

| Color | Hex | Tailwind Class | Usage |
|-------|-----|---|---|
| Void Black | #050505 | `bg-void` | Main background |
| Deep Black | #0a0a0a | `bg-deep-black` | Secondary background |
| Purple Core | #9945ff | `text-purple-core` | Primary accent |
| Orange Fire | #ff6024 | `text-orange-fire` | Highlights & runes |
| Cyan Light | #06b6d4 | `text-cyan-light` | Light beams & secondary |
| Gold Accent | #f9cc75 | `text-gold-accent` | Tertiary accents |

---

## Animation Reference

### CSS Animations (in tailwind.config.js)

| Animation | Duration | Effect |
|-----------|----------|--------|
| `float` | 3s | Y-axis peaceful movement |
| `glitch` | 0.3s | Color-offset displacement |
| `shimmer` | 2s | Background gradient shift |
| `typing-reveal` | 3s | Width growth with steps |
| `pulse-rune` | 2s | Orange glow pulsing |
| `glow-pulse` | 2s | Box shadow breathing |

### Custom Classes (in index.css)

| Class | Purpose |
|-------|---------|
| `.glow-text` | Purple multi-layer text shadow |
| `.glow-text-orange` | Orange multi-layer text shadow |
| `.glow-text-cyan` | Cyan multi-layer text shadow |
| `.glow-box` | Purple box shadow effect |
| `.glow-box-orange` | Orange box shadow effect |
| `.glow-box-cyan` | Cyan box shadow effect |
| `.scanlines` | Horizontal line overlay effect |
| `.rune-glow` | Animated rune pulsing |
| `.glitch-text` | Glitch animation effect |
| `.border-glow` | Purple border with glow |
| `.border-glow-orange` | Orange border with glow |
| `.border-glow-cyan` | Cyan border with glow |

---

## Component Usage Examples

### ParticleBackground
```jsx
<ParticleBackground count={25} color="#9945ff" />
```

### LightBeams
```jsx
<LightBeams />
```

### LoadingScreen
```jsx
<LoadingScreen onLoadComplete={() => setIsLoading(false)} />
```

### Navigation
```jsx
<Navigation activePage="fenrir" />
```

---

## Key Implementation Details

### Typing Animation
- Character-by-character reveal with 50ms delay
- Blinking cursor indicator
- Smooth fade-in of subsequent content

### Rune Displays
- Thurisaz Symbol: `↑` (Unicode character)
- Orange fire color: #ff6024
- Pulsing animation with scale transformation
- Multiple glow layers for depth

### Tab System
- Four tabs on Fenrir page with smooth transitions
- Content dynamically renders based on active tab
- Border styling changes on active state

### Navigation
- 8 navigation items (Dashboard through Fenrir)
- Fixed to bottom of viewport
- Shows active state with orange fire glow
- Smooth color transitions on hover

---

## Customization Examples

### Change Primary Color to Blue
Edit `tailwind.config.js`:
```javascript
colors: {
  'purple-core': '#3b82f6', // Changed to blue
}
```

### Add New Tab
1. Add to `pages` array in `Navigation.jsx`
2. Create new component in `src/components/`
3. Add case to App.jsx routing logic

### Adjust Animation Speed
Edit `tailwind.config.js` keyframes:
```javascript
'pulse-rune': {
  '0%, 100%': { animation: '1s' }, // Changed from 2s
}
```

---

## Development Tips

1. **Hot Module Replacement**: Changes auto-reload in browser
2. **Tailwind Classes**: Use custom theme colors (e.g., `text-purple-core`)
3. **Animations**: Combine multiple animations with space separator
4. **Responsive**: Add `md:` prefix for tablet+ (e.g., `md:grid-cols-3`)
5. **Performance**: Keep particle count reasonable (20-30 max)

---

## Performance Optimization

- Particles are removed after animation completes
- Light beams use CSS animations (GPU accelerated)
- Scanlines use CSS patterns (not images)
- Lazy render content based on visibility
- Minimal re-renders with React hooks

---

## Browser Support

✓ Chrome/Edge 90+
✓ Firefox 88+
✓ Safari 14+
✓ Mobile browsers (iOS Safari 14+, Chrome Android)

---

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
Drag & drop `dist/` folder to Netlify

### Traditional Server
```bash
npm run build
# Upload dist/ contents to web server
```

---

## Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- --port 3001
```

**Styles not applying:**
- Check Tailwind CSS is imported in `App.jsx`
- Verify `index.css` is imported in `main.jsx`
- Rebuild Tailwind cache: `npm run dev`

**Animations not smooth:**
- Check if GPU acceleration is enabled (Chrome DevTools → Performance)
- Reduce particle count if laggy

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Architecture Notes

### Component Hierarchy
```
App (state management for page/loading)
├── LoadingScreen (initial load)
├── LandingPage
│   ├── LightBeams (background effect)
│   ├── ParticleBackground (background effect)
│   └── Navigation (bottom nav)
├── FenrirPage
│   ├── LightBeams (background effect)
│   ├── ParticleBackground (background effect)
│   ├── (Content with tabs)
│   └── Navigation (bottom nav)
```

### State Management
- `isLoading`: Tracks loading screen completion
- `currentPage`: Tracks which page to display
- Component-level state for animations and tabs

### Styling Approach
- **Global styles**: `index.css` (animations, effects)
- **Component styles**: Tailwind classes with custom theme
- **Custom utilities**: CSS classes for complex effects

---

## Next Steps

### To Extend Fenrir:
1. Add Solana wallet integration (Phantom, Slope)
2. Implement on-chain guardian protocols
3. Add real-time ritual tracking
4. Create community governance features
5. Build analytics dashboard

### To Connect to Abraxas:
1. Set up routing to navigate between dApps
2. Implement unified auth/wallet system
3. Share navigation state across dApps
4. Connect to Abraxas smart contracts

---

## Support

For questions or issues, refer to:
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)

---

**Fenrir dApp - Ready to Protect.**
