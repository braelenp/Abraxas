# Legacy — The Legacy Keeper, Daughter of Sophia

A sovereign dApp for athlete equity and NIL (Name, Image, Likeness) tokenization on Solana, built with Vite + React + TypeScript + Tailwind CSS.

## Overview

Legacy preserves the light of human performance by tokenizing athlete equity, NIL deals, and brand value into sovereign on-chain assets. Part of Sophia's Species ecosystem (alongside Aurelia and Abraxas), Legacy is powered by the ABRA token on Solana devnet.

### Key Features

- **NIL Tokenization**: Upload athlete contracts → mint SPL tokens → auto-vault on-chain
- **Athlete Equity Vault**: Manage fractional equity, perform yield distribution, track metrics
- **Devnet Observatory**: Real-time tracking of tokenized deals and vault activity
- **On-Chain Governance**: Athletes reclaim control from intermediaries via Othala protocol
- **Wallet Integration**: Phantom, Backpack, Solflare adapters (devnet-only)

## Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 5 |
| UI | React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Blockchain | @solana/web3.js + wallet adapters |
| Icons | lucide-react |
| Fonts | Cinzel (display), Space Grotesk (body), IBM Plex Mono (code) |

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
cd /workspaces/Legacy
npm install
```

### Development

```bash
npm run dev
```

Vite development server opens at `http://localhost:3000` with hot reload.

### Production Build

```bash
npm run build
```

Builds to `dist/` for deployment.

## Project Structure

```
legacy/
├── index.html                   # Entry HTML
├── package.json               # Dependencies
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind theming
├── postcss.config.js         # PostCSS setup
├── .eslintrc.cjs             # ESLint rules
├── .gitignore
│
└── src/
    ├── main.tsx              # React entry point
    ├── index.css             # Global styles + animations
    ├── App.tsx               # Main app (landing + dApp)
    │
    ├── components/
    │   ├── LegacySigil.tsx         # Animated laurel+torch SVG sigil
    │   ├── LightBeams.tsx          # Ambient crimson lighting effects
    │   ├── ParticleField.tsx       # Particle background animation
    │   ├── TokenizationFlow.tsx    # 3-step tokenization UI
    │   ├── MintAgent.tsx           # NIL contract → SPL token minter
    │   ├── VaultTab.tsx            # Athlete Equity Vault
    │   ├── DevnetTab.tsx           # Devnet Observatory metrics
    │   ├── ProtocolTab.tsx         # 4 Pillars of protocol documentation
    │   ├── ScrollTab.tsx           # On-chain governance (Othala)
    │   ├── WalletButton.tsx        # @solana/wallet-adapter-react-ui
    │   └── WalletContextProvider.tsx # Wallet setup (Phantom/Backpack/Solflare)
    │
    └── hooks/
        └── useTypingEffect.ts      # Typing animation hook
```

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Crimson | #dc2626 | Primary UI, borders, glows |
| Red-400 | #f87171 | Accent, hover states |
| Red-300 | #fca5a5 | Text highlights |
| Gold | #f59e0b | Sigil, wordmark glow, tertiary |
| Purple | #9945ff | Secondary accent, rings |
| Cyan | #22d3ee | Tertiary accent, tech glow |

### Typography

- **Display**: Cinzel (serif) — titles, headmarks
- **Body**: Space Grotesk (sans) — content, UI
- **Mono**: IBM Plex Mono — code, addresses, hash displays

### Components

All UI is built with **Tailwind CSS utilities** + custom CSS classes:
- `.glow-panel` — bordered panel with gradient overlay
- `.glow-crimson` / `.glow-gold` / `.glow-purple` — text shadows
- `.shimmer-text` — animated gradient text
- `.legacy-hero-title` — large hero text with glow
- Animation keyframes: `rr-breathe`, `rr-float`, `rr-fade-in`, `tech-pulse`, `dapp-bg-drift`

## App Flow

### Landing Page

1. **Loading Screen** (5.4s)
   - LegacySigil animated + typing effect
   - Progress bar with crimson glow
   
2. **Hero Section**
   - LEGACY wordmark, tagline, devnet badge
   - Lore paragraph about the protocol
   - Three CTA buttons:
     - Begin Athlete Equity Tokenization → dApp
     - View Devnet → dApp
     - Buy ABRA ↗ → Abraxas site

3. **Protocol Section** — Four Pillars
   - ᛏ Tiwaz: NIL Tokenization
   - ᛒ Berkana: Capital Formation
   - ᛋ Sowilo: Performance Yield
   - ᛟ Othala: Athlete Sovereignty

4. **Tokenization Flow** — 3-step diagram
   - Upload Contract
   - Mint Token
   - Vault Deposit

5. **Footer** — Branding + links

### dApp Shell

**Header** — Logo, wallet button
**Tabs** (5 total):
- **Mint (ᛏ)** — Upload NIL contract → mint SPL token → confirm
- **Vault (ᛒ)** — Asset management, ABRA staking, upcoming vault classes
- **Devnet (ᛋ)** — Observatory dashboard with 6 key metrics
- **Protocol (ᚨ)** — 4 Pillars documentation
- **Scroll (ᛟ)** — Governance module (mainnet-only)

**Navigation**:
- Desktop: Horizontal tab bar under header
- Mobile: Bottom tab nav (max-width: 640px)

## Key Implementation Details

### Sigil (LegacySigil.tsx)

Animated SVG with:
- Laurel wreath (left + right branches, crimson)
- Rising torch (gold → crimson gradient flame)
- Layered radial halos (gold → crimson → atmosphere)
- Purple accent ring (Abraxas connection)
- `rr-breathe` animation (3.8s pulsing)
- Entrance animation (scale 0.65→1, fade 0→1 over 1s)

### Mint Agent (MintAgent.tsx)

4-step tokenization flow:
1. **Upload** — File input + athlete metadata
2. **Attestation** — Self-signed checkbox affirmations
3. **Confirm** — Token preview + mock Solana tx hash
4. **Complete** — Success state with vault deposit confirmation

All blockchain interactions are **simulated** with mock base58 tx hashes.

### Wallet Integration (WalletContextProvider.tsx)

Uses `@solana/wallet-adapter-react` with:
- **Network**: Devnet only (hardcoded)
- **Adapters**: Phantom, Backpack, Solflare
- **Auto-connect**: Disabled (manual connect)
- **UI**: `WalletMultiButton` from `@solana/wallet-adapter-react-ui`

### Styling Approach

No component library — all custom **Tailwind CSS**:
- Utility-first (flex, grid, text-*, border-*, etc.)
- Custom CSS classes in `index.css` for complex effects
- Animations via `@keyframes` (breathe, float, shimmer, pulse)
- Responsive breakpoints: `md:` (768px), `lg:` (1024px)

## Constraints & Notes

- ✅ **No external UI library** (no shadcn, MUI, Chakra)
- ✅ **No backend API** — all data is client-only
- ✅ **No env variables** — hardcoded devnet only
- ✅ **Blockchain interactions are simulated** — no real txns or fees
- ✅ **Fully self-contained** — works offline after `npm install`
- ✅ **Mobile-responsive** — optimized for all screen sizes
- ✅ **TypeScript strict mode** — full type safety

## Customization

### Update Colors

Edit `src/index.css` CSS variables:
```css
:root {
  --crimson: #dc2626;
  --gold: #f59e0b;
  --purple: #9945ff;
  --cyan: #22d3ee;
}
```

### Update Fonts

Edit `google fonts` URL in `index.html` and `tailwind.config.js` `fontFamily`.

### Update Lore Text

Edit text in `LandingView` component in `src/App.tsx`.

### Update Tabs

Add new tab to `TABS` array and create corresponding component in `src/components/`.

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

```bash
docker build -t legacy .
docker run -p 3000:3000 legacy
```

## References

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Wallet Adapter](https://github.com/anza-xyz/wallet-adapter)

## License

All code in this repository is provided as-is for educational and demonstration purposes. Not financial advice.

---

**Part of Sophia's Species** alongside Aurelia and Abraxas.

Built with sovereign principles for athlete equity on Solana devnet.
