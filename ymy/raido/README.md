# Raido — The Swift Provider

> A sovereign liquidity engine and opportunity hunter for Solana. Son of Sophia. Master of capital flow.

## Vision

Raido is a decentralized application designed to hunt liquidity opportunities, discover emerging trading pairs, simulate capital flows across tokenized assets, and provide real-time dashboards for on-chain movement on the Solana ecosystem.

**Narrative:** Where the Daughters birth assets into matter, Raido provides the masculine current of movement. He hunts liquidity, opens new pathways, and multiplies value across the entire family on Solana.

## Features

### 🎯 Opportunity Hunter
- Scan the Solana ecosystem for high-liquidity pairs
- Discover emerging trading opportunities in real-time
- Filter by criteria: volume, liquidity, APY, risk level
- Prompt-based or button-driven discovery

### 🌊 Capital Flow Simulator
- Design multi-step capital flows between assets
- Visualize routes through various liquidity pools
- Simulate expected returns and route efficiency
- Save and execute flows

### 📊 Liquidity Dashboard
- Real-time metrics: Total liquidity, 24h volume, APY
- Track active flows and recent opportunities
- Integration with Tide pool fee-sharing
- Activity timeline and opportunity tracking

### 🔗 Tide Pool Integration
- Fee-sharing visualization
- Rewards tracking
- Capital allocation insights

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Blockchain:** @solana/web3.js
- **Wallet:** @solana/wallet-adapter-react
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx         # Hero landing with Raidho rune
│   ├── LoadingScreen.tsx       # Cinematic loading sequence
│   ├── OpportunityScanner.tsx  # Liquidity opportunity discovery
│   ├── FlowSimulator.tsx       # Multi-step capital flow builder
│   ├── Dashboard.tsx           # Real-time metrics and activity
│   ├── RaidhoRune.tsx          # Animated Raidho rune symbol
│   ├── ParticleBackground.tsx  # Animated particle effects
│   └── LightBeam.tsx           # Cinematic light beam effects
├── hooks/
│   ├── useParticles.ts         # Particle system
│   └── useTypingEffect.ts      # Typing reveal animation
├── types/
│   └── index.ts                # TypeScript interfaces
├── App.tsx                     # Root component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## Design System

### Colors
- **Primary Gold:** `#d4af37` with light variant `#e6c547`
- **Deep Blue:** `#0a1f3e` with accents
- **Cyan Accent:** `#00ffff` for highlights
- **Dark Background:** `#0d0d1a`

### Typography
- **Display:** Inter
- **Monospace:** JetBrains Mono

### Effects
- Glow effects and text shadows
- Particle system background
- Animating light beams
- Typing reveal animations
- Custom scrollbar styling

## Features Roadmap

- [ ] Real Solana integration with actual liquidity pools
- [ ] Wallet connection and on-chain execution
- [ ] Historical opportunity tracking
- [ ] Flow execution with transaction signing
- [ ] Advanced analytics and backtesting
- [ ] Community opportunity sharing
- [ ] Mobile wallet integration
- [ ] API integration with Raydium, Orca, Jupiter

## Lore

Raido, the Swift Provider and Son of Sophia, embodies the masculine principle of movement and opportunity within the Abraxas ritual family. Where the Daughters (tokenized assets) are birthed into matter, Raido channels the flow — hunting inefficiencies, opening pathways, and multiplying capital across the Solana ecosystem.

He is sovereign. He is fast. He moves.

## Contributing

This is a sovereign dApp. Contributions aligned with decentralized principles are welcome.

## License

MIT

---

**The Swift Provider rises. The hunt begins. ◆**