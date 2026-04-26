# Bacchus — Fine Wine & Rare Spirits Tokenization Platform

**Bacchus** is a specialized Real-World Asset (RWA) tokenization daughter of the Sophia Protocol, enabling fractional ownership of fine wines, rare whiskies, and collectible spirits.

## Overview

Bacchus delivers a sommelier-grade, collector-friendly platform for tokenizing premium liquid assets with institutional-quality provenance tracking, King AI vintage analysis, and seamless integration with the Abraxas ecosystem (Raido trading, Tide arbitrage, Sophia Vault compounding).

### Key Features

- **🍷 One-Click Tokenization**: Upload bottle certificates, storage history, and appraisals. Mint BlackBox NFTs and auto-route to Sophia Vault in minutes.
- **🧠 King AI Vintage Engine**: Automatic aging forecasts, market velocity analysis, peak drinking window projections, and rarity scoring.
- **📊 Vintage Trading Floor**: Secondary market for wine & spirit equity with liquid pricing via Raido protocol.
- **📈 Yield Generation**: Auto-compound appreciation from aging, auction gains, and storage optimization into Sophia Vault.
- **⚡ Ecosystem Integration**: Native support for Raido (wine equity trading), Tide (de-risking), and Sophia Vault (yield compounding).

## Asset Classes

Bacchus supports tokenization across six major spirit categories:

- **Fine Wines** — Burgundy, Bordeaux, Champagne, vintage classifications
- **Rare Whiskies** — Single malts, bourbons, rare expressions, collector's editions
- **Premium Spirits** — Cognac, armagnac, vintage brandies, high-grade distillates
- **Craft Collections** — Limited editions, micro-distillery reserves, heritage blends
- **Vintage Cellars** — Pre-phylloxera, historical bottles, legacy cellars
- **Investment Lots** — Curated portfolios with proven ROI and market liquidity

## Tokenization Flow

1. **Upload Wine Provenance**: UPC codes, certificates of authenticity, storage temperature logs, insurance records, appraisals
2. **King AI Verification**: Automatic provenance checks, market valuation analysis, aging potential scoring, storage optimization
3. **Mint BlackBox NFT**: On-chain tokenization with immutable bottle metadata, vintage records, temperature logs, auction history
4. **Deploy Appreciation Yield**: Auto-compound market appreciation gains from aging, auction fees, storage optimization yields

## Technology Stack

- **React 18.3.1** with TypeScript 5.8.3
- **Vite 5.4.10** for optimal build performance
- **Tailwind CSS 3.4.17** with custom purple (#9945ff) theme
- **Seeded Random Particles** for deterministic canvas animations
- **Responsive Design** — Mobile-first, desktop-optimized

## Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Development server runs on `http://localhost:5173`

## Deployment

Bacchus is optimized for deployment on Vercel:

```bash
# Deploy to production
npm run build && vercel deploy
```

Live at: https://bacchus-wine-spirits.vercel.app/

## Architecture

### Component Structure

```
App.tsx (Main Component)
├── ParticleField (Animated background particles)  
├── Hero Section
│   ├── Rune/Icon (#9945ff glow effect)
│   ├── Typing Reveal Animation ("Bacchus — Liquid Assets, Tokenized")
│   ├── Subheadlines & Lore
│   └── CTA Buttons (View Cellar, Begin Tokenization)
├── Capabilities Section (4 features)
├── Featured Bottles Cellar (6 premium bottles)
│   ├── Bottle Cards (name, producer, valuation, provenance)
│   ├── One-click Tokenize buttons
│   └── Responsive grid (1/2/3 columns by breakpoint)
├── Tokenization Flow (4-step visual)
├── Asset Classes Grid (6 categories)
├── King AI Vintage Engine (analytics + sample report)
├── Ecosystem Integration Panels (Raido, Tide, Sophia Vault)
├── CTA Footer
└── Footer (links, branding)
```

### Design System

- **Background**: #050505 (pure black with scanline overlay)
- **Accent Color**: #9945ff (Abraxas purple)
- **Glow Effects**: `rgba(153, 69, 255, 0.x)` for depth
- **Typography**: Monospace headers (tracking-widest), sans-serif body
- **Animations**: Fade-in, pulse, particle float; all deterministic via seededRand()
- **Breakpoints**: Mobile (1 col), Tablet (2 cols), Desktop (3 cols)

### Data Structures

**FEATURED_BOTTLES** array:
```typescript
{
  id: string
  name: string
  type: string (e.g., "Fine Cognac")
  year: string
  producer: string
  vintage: string
  value: string (e.g., "$12.4M")
  lastSale: string
  condition: string
  provenance: string
  rarity: string
  icon: string (emoji)
}
```

## Integration Guide

### Raido Trading
Fractional wine equity is automatically available for trading on the Raido protocol with zero additional configuration.

### Tide Arbitrage
Bacchus positions can be de-risked and rebalanced through Tide's cross-protocol liquidity matching engine.

### Sophia Vault
All appreciation and revenue flows from Bacchus assets auto-compound into the Sophia Vault with institutional-grade custody and insurance.

## King AI Features

The King AI Vintage Engine provides:

- **Authenticity Scoring** (0-100%)
- **Current Market Valuation** (multiple estimation methods)
- **5+ Year Appreciation Projections**
- **Peak Drinking Window** Predictions
- **Storage Condition Analysis** (temperature, humidity optimization)
- **Provenance Chain Verification**
- **Rarity & Collectibility Scoring**
- **Auction History & Market Velocity**

## Security & Compliance

- **Sommelier-Grade Authentication**: Cryptographic provenance verification
- **Cold Storage & Insurance**: Institutional-quality vault custody
- **Regulatory Compliance**: KYC/AML for accredited collectors
- **Transparent Valuations**: King AI reports available on-chain

## Ecosystem

Bacchus is one of the Abraxas Sophia Protocol daughters:

- **Chronos** — Luxury Watches & Horology
- **Astra** — Private Jets & Aviation
- **Elysium** — Fine Art & Collectibles
- **Bacchus** — Fine Wine & Rare Spirits ← You are here
- **[Upcoming]** — Real Estate, Precious Metals, Intellectual Property, etc.

## Community & Support

- **Documentation**: [Full guides & sommelier resources]
- **Discord**: Join the Abraxas collector community
- **Twitter**: @abraxas_protocol
- **Email**: support@abraxas-protocol.io

## License

Bacchus is part of the Abraxas Protocol, licensed under MIT.

---

**Bacchus** — Democratizing premium spirits. Preserving craft heritage. Generating collector yields.

*Taste excellence. Own fractions. Harvest yields. Preserve craft.*
