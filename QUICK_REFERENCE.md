# Abraxas Quick Reference Guide

## Navigation

- **📊 Dashboard** (`/app`) - Portfolio overview, live Polymarket betting, King AI signals
- **💰 Trade** (`/app/trade`) - ABRA acquisition, staking (30/90/180 day tiers), RWA pairs
- **📈 Market** (`/app/market`) - Asset listings (athlete equity, real estate, golf, horses, IP)
- **🏦 Vaults** (`/app/vaults`) - RWA vault management, La Casa deposits, agent assignment
- **🧠 King AI** (`/app/orion`) - Athlete metrics, OYM integration, training scores
- **⚡ Circuit** (`/app/circuit`) - Risk signal simulator, protective buffer
- **🤖 Sophia Mint** (`/app/sophia-mint`) - Agent NFT minting stub, marketplace MVP

---

## Key Addresses & URLs

| Item | Value |
|------|-------|
| **ABRA Token (Mainnet)** | `5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS` |
| **Program ID (Devnet)** | `GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm` |
| **Bags Market** | https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS |
| **Live dApp** | https://abraxas-ten.vercel.app/ |
| **OYM dApp** | https://own-your-moment.vercel.app/app |

---

## Core Trading Pairs

| Pair | Price | Category | Volume | Status |
|------|-------|----------|--------|--------|
| ABRA ↔ USDC | $0.95 | Token | $125K | Live |
| Golf PGA ↔ USDC | $125.50 | Golf | $230K | Live |
| Horse Racing ↔ USDC | $3.75 | Horses | $580K | Live |
| La Casa NFT ↔ USDC | $2,500 | RWA | $45K | Live |
| USDC ↔ SOL | $0.024 | Stablecoin | $850K | Live |

---

## Staking Tiers

| Duration | Multiplier | Use Case | Airdrop Priority |
|----------|-----------|----------|------------------|
| 30 Days | 1.2x | Entry-level liquidity | Standard |
| 90 Days | **1.8x** | **Balanced (recommended)** | **High** |
| 180 Days | 2.5x | Maximum returns | Very High |

---

## Athlete Tokens (OYM)

| Symbol | Name | Price | Change | Training | Status |
|--------|------|-------|--------|----------|--------|
| $CDUBB | C Dubb | $18.42 | +8.4% | 91/100 | Live |
| $AJWILL | AJ Will | $14.76 | +5.1% | 86/100 | Live |
| $HAILEE | Hailee Swain | $12.30 | +3.2% | 78/100 | Live |

---

## Polymarket Categories

🔐 **Crypto** | 📊 **Macro** | ⚽ **Sports** | 💰 **Finance** | 🚀 **Tech** | ⛳ **Golf** | 🐴 **Horses** | 🎯 **Other**

---

## Off-Ramp Providers

| Provider | Fee | Coverage | Payment Methods |
|----------|-----|----------|------------------|
| **Ramp** | ~1.5% | 150+ countries | Apple Pay, Card, Bank |
| **Transak** | ~1.5% | 150+ countries | Global coverage |

---

## API Integrations

| Service | Type | Status | Endpoint |
|---------|------|--------|----------|
| **Jupiter** | DEX Aggregator | Live | https://quote-api.jup.ag/v6 |
| **Polymarket CLOB** | Prediction Markets | Mock | (TODO: full integration) |
| **Bags.fm** | Embedded Trading | Live | https://bags.fm |
| **Own Your Moment** | Athlete Data | Configurable | `VITE_OYM_DATA_URL` |
| **Ramp Network** | Off-ramp | Configurable | https://ramp.network |
| **Transak** | Off-ramp | Configurable | https://transak.com |

---

## Deployment

```bash
# Development
npm run dev

# Build
npm run build

# Vercel (auto-deployed)
https://abraxas-ten.vercel.app/

# Android APK
npm run cap:sync && npm run android:apk
```

---

## Environment Variables (Key)

```bash
VITE_ABRAXAS_PROGRAM_ID=GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm
VITE_ABRA_TOKEN_CONTRACT_ADDRESS=5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS
VITE_OYM_DATA_URL=<optional: your OYM endpoint>
VITE_RAMP_HOST_API_KEY=<optional: Ramp key>
VITE_TRANSAK_API_KEY=<optional: Transak key>
```

---

## Circuit Breaker Thresholds

| Signal | ⚠️ Warning | 🚫 Pause |
|--------|-----------|---------|
| Price Speed | ≥ 500 bps | ≥ 1000 bps |
| Liquidity Drain | ≥ 450 bps | ≥ 900 bps |
| Activity Spike | — | ≥ 1200 bps |

---

## File Structure (Key)

```
app/src/
├── pages/
│   ├── DashboardPage.tsx       # Portfolio + Polymarket bets
│   ├── TradePage.tsx            # ABRA + staking + RWA pairs
│   ├── MarketPage.tsx           # Asset listings
│   ├── VaultsPage.tsx           # Vault management
│   ├── OrionPage.tsx            # King AI assistant
│   ├── CircuitPage.tsx          # Risk simulator
│   ├── SophiaMintPage.tsx       # Agent NFT stub
│   └── LandingPage.tsx          # Entry point
├── components/
│   ├── BagsBuyWidget.tsx        # Buy ABRA
│   ├── BagsSwapWidget.tsx       # Swap tokens
│   ├── FiatOffRampWidget.tsx    # ABRA → Fiat
│   ├── FeatureBadge.tsx         # Live/Coming Soon badges
│   └── OrionAssistant.tsx       # King AI chat
├── lib/
│   ├── types.ts                 # All TypeScript types
│   ├── solana.ts                # RPC + Program ID config
│   ├── jupiter.ts               # DEX quote + swap
│   ├── polymarket.ts            # Market data
│   ├── offramp.ts               # Off-ramp URLs
│   ├── staking.ts               # Staking logic
│   ├── oymAdapter.ts            # Athlete data normalization
│   ├── program.ts               # Anchor integration
│   └── mockData.ts              # Starter data
├── hooks/
│   └── usePolymarketBets.ts     # Market data hook
├── providers/
│   ├── AbraxasProvider.tsx      # Main context
│   └── SolanaProvider.tsx       # Wallet context
└── idl/
    └── abraxas.json             # Program IDL
```

---

## Common Tasks

### Buy ABRA
1. Go to Dashboard (auto-redirects from /) or Trade page
2. Click "Buy ABRA" widget (Bags embedded)
3. Enter amount
4. Confirm in Bags iframe (zero fees)

### Stake ABRA
1. Go to Trade page (`/app/trade`)
2. Select staking tier (30/90/180 days)
3. Enter ABRA amount
4. Click "Stake"
5. Sign transaction in wallet

### Place Prediction Bet
1. Go to Dashboard (`/app`)
2. View Polymarket markets
3. Select category (optional filter)
4. Enter bet amount
5. Click YES or NO
6. Confirm bet

### Convert to Fiat
1. Go to Dashboard
2. Click "Convert to Fiat" (top right)
3. Enter ABRA amount
4. Get quote (ABRA → USDC conversion)
5. Select payment method
6. Confirm swap + off-ramp

### View Market Data
1. Go to Market page (`/app/market`)
2. Browse asset classes (Athlete, Real Estate, Trading, Music, IP)
3. View live tickers, market caps, volumes
4. Filter by status (Live/Pilot/Hypothetical)

### Create RWA Vault
1. Go to Vaults page (`/app/vaults`)
2. Enter vault name
3. Select asset type (athlete equity, real estate, trading portfolio)
4. Click "Create Vault"
5. Assign Sophia agent (optional)

### Check Risk Signals
1. Go to Circuit page (`/app/circuit`)
2. Select vault
3. Adjust price speed, liquidity drain, activity spike
4. Click "Evaluate Circuit"
5. View circuit action (None/Stabilize/Pause)

---

## Architecture at a Glance

```
┌─────────────────────────────┐
│   React 19 + TypeScript     │
│   Vite Build, Tailwind CSS  │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│   AbraxasProvider (State)   │
│   - Vaults, Athletes, Logs  │
│   - OYM Sync, Sophia Agents │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────────────────────┐
│ Blockchain Libraries & APIs                │
│ ├─ Jupiter (DEX quotes/swaps)              │
│ ├─ Polymarket CLOB (predictions)           │
│ ├─ Anchor (on-chain calls)                 │
│ ├─ Solana web3.js (transactions)           │
│ ├─ Wallet Adapter (multi-wallet)           │
│ └─ Metaplex (NFT metadata)                 │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│ External Services                          │
│ ├─ Bags.fm (zero-fee trading)              │
│ ├─ Solana Devnet RPC                       │
│ ├─ Ramp/Transak (off-ramp)                 │
│ ├─ Own Your Moment (athlete data)          │
│ └─ Polymarket (live markets)               │
└──────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 19.2.4 |
| **Bundler** | Vite | 7.3.1 |
| **Styling** | Tailwind CSS | 4.2.1 |
| **Routing** | React Router | 7.13.1 |
| **Blockchain** | Solana web3.js | 1.98.4 |
| **Smart Contracts** | Anchor | 0.32.1 |
| **Wallet** | Wallet Adapter | 0.15.39 |
| **Mobile** | Capacitor | 8.1.0 |
| **Market Data** | Polymarket CLOB | 5.8.0 |
| **DEX** | Jupiter API | v6 |

---

## Status Summary

| Feature | Status | Notes |
|---------|--------|-------|
| ABRA Token | ✅ Live | Mainnet trading active |
| Staking | ✅ Live | 30/90/180 day tiers |
| Polymarket Betting | ✅ Live | Mock data, TODO: full CLOB |
| RWA Market Data | ✅ Live | Professional data book |
| Athlete Equity (OYM) | ✅ Live | Devnet data, OYM sync ready |
| Vaults | 🟡 Devnet Demo | Full structs, awaiting V2 |
| Sophia Agents | 🟡 MVP Stub | Minting + marketplace stubs |
| Circuit Breaker | ✅ Simulator | Risk signal evaluation working |
| Off-Ramp (Fiat) | ✅ Live | Ramp + Transak configured |
| Mobile (Android) | ✅ Ready | APK build configured |

---

**For detailed technical analysis, see:** [ABRAXAS_COMPREHENSIVE_ANALYSIS.md](ABRAXAS_COMPREHENSIVE_ANALYSIS.md)

