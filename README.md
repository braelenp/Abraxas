# Abraxas

**Seven runes. Seven agents. One sovereign engine on Solana.**

Abraxas is a living RWA protocol guarded by the Elder Futhark. Each tab in the dapp is a rune, each rune is an AI agent, each agent governs a distinct domain of the protocol: prediction markets, vault management, market intelligence, trading execution, AI forecasting, circuit defense, and RWA tokenization.

## Quick Links

| | |
|---|---|
| **ABRA Token** | `5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS` (Mainnet) |
| **Buy ABRA** | https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS |
| **Live dApp** | https://abraxas-ten.vercel.app/ |

---

## The Seven Runes

Each tab opens with a cinematic rune landing sequence before revealing its functional layer.

| Rune | Agent | Tab | Domain |
|------|-------|-----|--------|
| ᛉ Algiz | Warden | Dashboard | Live Polymarket prediction markets, portfolio momentum, market intelligence |
| ᚨ Ansuz | Sophia | Vaults | RWA vault creation, agent assignment, yield governance |
| ᛋ Sowilo | Horizon | Market | Full RWA asset data book across all classes and categories |
| ᛚ Laguz | Flux | Trade | ABRA acquisition, Jupiter DEX swaps, RWA pair trading |
| ᛏ Tiwaz | King | Orion | AI athlete development analysis, market forecasts, value creation commands |
| ᚦ Thurisaz | Aegis | Circuit | Circuit breaker configuration, vault protection thresholds |
| ᚲ Kenaz | Forge | Forge | RWA tokenization flow, La Casa NFT minting, Sophia vault auto-deposit |

---

## What is Live

### ABRA Token Trading
- Buy via embedded Bags.fm widget (zero fees, 50+ DEXes)
- Live price display with 24-hour candles
- Available on Dashboard and Trade pages

### Live Polymarket Prediction Markets
- Real markets across crypto, macro, sports, finance, tech, golf, horses
- Rotating carousel on Dashboard with YES/NO betting
- King AI probability overlays on live Polymarket odds
- Bet with ABRA or USDC

### RWA Trading Pairs via Jupiter DEX
- ABRA/USDC, Golf PGA Points, Horse Racing, La Casa NFT, Athlete Equity tokens
- Live swap interface with quote routing
- 24-hour candlestick charts for all pairs

### Market Data Book
- Browse all listed RWA asset classes with price, cap, volume, and agent scores
- Filter by class: athlete equity, real estate, trading portfolios, golf, horses
- Status labels: Live / Pilot / Pipeline

### RWA Tokenization (Forge)
- Upload deed, title, or proof of ownership for any real world asset
- Self-attestation flow
- Mint La Casa NFT from uploaded documents
- Auto-deposit into Sophia-managed vault

### Mobile
- Capacitor 8.1.0 (Android APK buildable)
- Mobile-first responsive design
- Package ID: `io.abraxas.app`

---

## Devnet Showcase Features

### Smart Vaults
Create and manage RWA vaults for athlete equity, real estate, and trading portfolios. Deposit capital, track value, assign Sophia agents. Fully implemented on devnet.

### Sophia Agents
Three agent types: Sentinel (protective), Yield (growth), Defensive (capital preservation). Assign any agent to any vault. On-chain execution logic ready for production.

### Circuit Breaker (Aegis)
Monitor price speed, liquidity drain, and activity spike per vault. Automatic threshold triggering. Actions: None / Release Liquidity / Pause Risk.

### King AI (Orion)
Conversational AI with athlete development metrics, market analysis, and protocol action commands. OYM athlete data integrated.

---

## Pages and Routes

| Page | Route | Rune |
|------|-------|------|
| Landing | `/` | Entry — cinematic "Welcome to the next degree" page |
| Dashboard | `/app` | ᛉ Warden |
| Vaults | `/app/vaults` | ᚨ Sophia |
| Market | `/app/market` | ᛋ Horizon |
| Trade | `/app/trade` | ᛚ Flux |
| Orion | `/app/orion` | ᛏ King |
| Circuit | `/app/circuit` | ᚦ Aegis |
| Forge | `/app/forge` | ᚲ Kenaz |

---

## Tech Stack

| | |
|---|---|
| Frontend | React 19.2.4 + TypeScript strict |
| Styling | Tailwind CSS 4.x |
| Build | Vite 7 |
| Blockchain | Solana web3.js 1.98.4 |
| Smart Contracts | Anchor 0.32.1 (Rust, devnet) |
| Wallet | @solana/wallet-adapter 0.15.39 |
| DEX | Jupiter API v6 |
| Predictions | Polymarket CLOB API |
| Embedded Trading | Bags.fm |
| Mobile | Capacitor 8.1.0 |
| Deployment | Vercel (root directory: `app/`) |

---

## Local Development

```bash
cd app
npm install
npm run dev

# Production build
npm run build

# Android APK
npm run cap:sync && npm run android:apk
```

### Environment Variables

```bash
VITE_ABRAXAS_PROGRAM_ID=GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm
VITE_SOLANA_RPC=https://api.devnet.solana.com
VITE_ABRA_TOKEN_CONTRACT_ADDRESS=5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS
VITE_OYM_DATA_URL=
VITE_RAMP_HOST_API_KEY=
VITE_TRANSAK_API_KEY=
```

---

## Asset Classes

| Class | Status | Examples |
|-------|--------|---------|
| Athlete Equity | Live | $CDUBB, $AJWILL, $HAILEE (OYM-integrated) |
| Real Estate | Pilot | Manhattan, Malibu devnet demos |
| Trading Portfolios | Pilot | Algo strategies |
| Golf | Live | PGA Tour Points Index |
| Horse Racing | Live | Triple Crown Index |
| Music Rights | Pipeline | Direct artist funding |
| IP Licensing | Pipeline | Fan-backed intellectual property |

---

## Smart Contract

**Program ID:** `GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm` (Devnet)

Key instructions: `initialize_vault`, `deposit_lacasa_nft`, `deposit_athlete_equity`, `record_athlete_growth`, `assign_agent`, `evaluate_circuit`

---

*The rune that calls you is the rune that rules you.*


**Solana's First Fully-Integrated Real-World Asset (RWA) Stock Market**

Abraxas is a complete platform for trading real-world assets (RWAs), predicting market outcomes, and earning yields through AI-managed vaults. Buy ABRA token directly (Bags.fm, ~0% fees), stake for multipliers, and place bets on live Polymarket prediction markets with King AI probability guidance.

## 🎯 Quick Links

| Link | Purpose |
|------|---------|
| **ABRA Token** | `5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS` (Mainnet) |
| **Buy ABRA** | https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS |
| **Live dApp** | https://abraxas-ten.vercel.app/ |
| **Docs** | See [GROK_BUILD_SYNOPSIS.md](GROK_BUILD_SYNOPSIS.md) & [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |

---

## ✨ What's Live Right Now

### **ABRA Token Trading** ✅
- **Buy:** Embedded Bags.fm widget (zero fees, 50+ DEXes)
- **Price:** ~$0.95 live (24-hour candles displayed)
- **Volume:** $125K+ daily
- **Where:** Dashboard, Trade page, Buy widgets everywhere

### **Staking System** ✅
- **3 Tiers:** 30 days (1.2x) → 90 days (1.8x) → 180 days (2.5x)
- **Reward:** ABRA airdrop multipliers + governance priority
- **Lock Duration Timer:** See exactly when you can unstake

### **Live Polymarket Betting** ✅
- **Real Markets:** Crypto (BTC/ETH odds), Macro, Sports, Finance, Tech, Golf, Horses
- **Dashboard Carousel:** Interactive 3-5 rotating prediction markets
- **Bet With:** ABRA or USDC tokens
- **King AI:** AI probability calculators overlaid on real odds
- **Order Book:** Live volume and depth from Polymarket CLOB

### **RWA Trading Pairs** ✅
- **Available Now:**
  - ABRA ↔ USDC ($0.95)
  - Golf PGA Points ↔ USDC ($125.50)
  - Horse Racing Payout ↔ USDC ($3.75)
  - La Casa NFT ↔ USDC ($2,500)
  - Athlete Equity Tokens (OYM: $CDUBB, $AJWILL, $HAILEE)
- **Quick Trade:** Direct swap interface on Trade page
- **Charts:** 24-hour candlestick data for all pairs
- **Category Filtering:** Token, Golf, Horses, NFT, Athlete, etc.

### **Market Data Book** ✅
- **Asset Classes:** Athlete Equity, Real Estate, Trading Portfolios, Golf, Horses
- **Live Data:** Professional market listings with price, cap, volume, scores
- **Filter & Expand:** Category filters + "View More/Less" toggles (4 default, expand all)
- **Status Labels:** Live ✅ | Pilot 🟡 | Pipeline 📅

### **Off-Ramp (Cash Out)** ✅
- **Conversion:** ABRA → USDC → Fiat (1.5% avg fee)
- **Providers:** Ramp Network (150+ countries) + Transak (global)
- **Methods:** Apple Pay, Bank Transfer, Card
- **Access:** "Convert ABRA to Cash" button on Dashboard & Trade pages
- **Currencies:** All major fiat (USD, EUR, GBP, etc.)

### **Mobile Support** ✅
- **Framework:** Capacitor 8.1.0 (Android APK buildable)
- **Design:** 100% responsive, mobile-first (portrait optimized)
- **Gestures:** Touch-enabled, swipeable carousels
- **Package:** `io.abraxas.app` v1.1

---

## 🟡 Devnet Showcase Features (Full Demos)

### **Smart Vaults** (On-chain RWA positions)
- Create vaults for Athlete Equity, Real Estate, Trading Portfolios
- Deposit stablecoins, track growth, withdraw with multiplier
- Fully implemented, awaiting production rollout

### **Sophia Agents** (AI trading)
- Assign agents to vaults: Sentinel (protective), Yield (growth), Defensive (capital preservation)
- NFT-based marketplace (MVP stubs ready)
- Automated execution logic on-chain

### **Circuit Breaker** (Risk protection)
- Monitor price speed, liquidity drain, activity spike
- Automatic triggering at thresholds (500-1000 bps)
- Actions: None / ReleaseLiquidity / PauseRisk

### **King AI (Orion)** (AI Assistant)
- Conversational market insights
- Athlete performance metrics (OYM-integrated)
- Signals: Build / Accelerate / Protect

### **OYM Athlete Integration** (Live sync)
- Real athlete data from Own Your Moment
- Training scores, game performance, injury status
- Daily refreshable sync

---

## 🏗️ Platform Pages

| Page | Route | Purpose |
|------|-------|---------|
| **Dashboard** | `/app` | Portfolio overview, live Polymarket betting, quick actions (Buy, Swap, Cash Out, Send, Receive) |
| **Trade** | `/app/trade` | ABRA acquisition, staking, RWA pair trading, quick trade box, live price chart |
| **Market** | `/app/market` | Asset listings (athlete, real estate, trading, golf, horses), filtering, data book |
| **Vaults** | `/app/vaults` | Vault management, La Casa deposits, agent assignment |
| **Orion** | `/app/orion` | King AI assistant, athlete metrics, market guidance |
| **Circuit** | `/app/circuit` | Risk simulator, signal monitoring |
| **Sophia Mint** | `/app/sophia-mint` | Agent NFT minting, marketplace |
| **Landing** | `/` | Entry point, wallet connect, ABRA onboarding |

---

## 🔧 Tech Stack

| Category | Technology | Status |
|----------|-----------|--------|
| **Frontend** | React 19.2.4 + TypeScript | Production ✅ |
| **Styling** | Tailwind CSS 4.2.1 | Production ✅ |
| **Build** | Vite 7.3.1 | Production ✅ |
| **Blockchain** | Solana web3.js 1.98.4 | Production ✅ |
| **Smart Contracts** | Anchor 0.32.1 (Rust) | Devnet ✅ |
| **Wallet** | @solana/wallet-adapter 0.15.39 | Production ✅ |
| **DEX Integration** | Jupiter API v6 | Live ✅ |
| **Predictions** | Polymarket CLOB API | Live ✅ |
| **Embedded Trading** | Bags.fm iframes | Live ✅ |
| **Off-Ramp** | Ramp Network + Transak | Configured ✅ |
| **Mobile** | Capacitor 8.1.0 | Ready ✅ |

---

## 💻 Local Development

```bash
# Install & run
cd app
npm install
npm run dev

# Build for production
npm run build

# Android APK (devnet)
npm run cap:sync && npm run android:apk

# Deploy to Vercel (auto-CDN)
git push origin main
```

### Environment Variables (`.env`)

```bash
# Solana (devnet by default)
VITE_ABRAXAS_PROGRAM_ID=GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm
VITE_SOLANA_RPC=https://api.devnet.solana.com

# Token
VITE_ABRA_TOKEN_CONTRACT_ADDRESS=5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS

# Optional APIs
VITE_OYM_DATA_URL=          # Own Your Moment athlete data endpoint
VITE_RAMP_HOST_API_KEY=     # Ramp Network off-ramp
VITE_TRANSAK_API_KEY=       # Transak off-ramp alternative
```

## Token Model

| Token | Status | Utility |
|-------|--------|---------|
| **ABRA** | Live (Mainnet) | Platform equity, staking, predictions, rewards |
| **Athlete Tokens** | Live ($CDUBB, $AJWILL, $HAILEE) | OYM-powered athlete equity positions |
| **Future Assets** | Pipeline | Real Estate, Music Rights, IP Licensing tokens |

## Staking Mechanics

**30/90/180 Day Locks with Multipliers:**

```
30 Days  → 1.2x multiplier (entry-level)
90 Days  → 1.8x multiplier (recommended)
180 Days → 2.5x multiplier (maximum)
```

**Benefits:**
- Higher multiplier = higher airdrop priority
- Unlock at end of lock period (no slashing)
- Fully on-chain (Solana PDAs)
- Visible on Trade page with countdown timer

## 🚀 Quick Start for Users

1. **Connect Wallet** → Landing page auto-detects Solana wallet (Phantom, Backpack, etc.)
2. **Buy ABRA** → Trade page, Bags widget (embedded, zero fees)
3. **Stake ABRA** → Select 30/90/180 day lock, confirm transaction
4. **Place Prediction** → Dashboard, select market, enter amount, YES or NO
5. **Cash Out to Fiat** → "Convert to Cash" button, Ramp/Transak off-ramp
6. **Explore Vaults** → Vaults page, create or join existing RWA positions

---

## 📊 Asset Classes

| Class | Status | Live Tickers | Examples |
|-------|--------|--------------|----------|
| **Athlete Equity** | ✅ Live | $CDUBB, $AJWILL, $HAILEE | OYM-integrated, real athlete stats |
| **Real Estate** | 🟡 Pilot | $LC-REIT, $SB-HOME | Devnet demo, Manhattan + Malibu properties |
| **Trading Portfolios** | 🟡 Pilot | $ORQ, $SGC | Algo strategies, historical returns |
| **Golf** | ✅ Live | $PGAPT | PGA Tour Points Index, live pricing |
| **Horse Racing** | ✅ Live | $DERBY | Triple Crown Index, live pricing |
| **Music Rights** | 📅 Pipeline | $WAVE, $SOUL, $ANTM | Direct artist funding (future) |
| **IP Licensing** | 📅 Pipeline | $IPX, $ARCH, $CHAR | Fan-backed intellectual property (future) |

---

## 🎨 Platform Architecture

### User Interface & State
- **React 19** with TypeScript (strict mode)
- **Provider Stack:** AbraxasProvider (app state) → SolanaProvider (wallet)
- **Pages:** 8 pages (Dashboard, Trade, Market, Vaults, Orion, Circuit, Sophia, Landing)
- **Components:** Reusable (BagsBuyWidget, FeatureBadge, BagsSwapWidget, FiatOffRampWidget, etc.)

### Business Logic
```
Contracts (Anchor)
    ↓
Program.ts (Anchor client)
    ↓
Utilities (Jupiter, Polymarket, Staking, OffRamp)
    ↓
Components & Pages
```

### Smart Contract (Devnet)
**Program ID:** `GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm`

**Key Instructions:**
- `initialize_vault` – Create RWA position bucket
- `deposit_lacasa_nft` – Record capital entry
- `deposit_athlete_equity` – Route to athlete tokens
- `record_athlete_growth` – Update on-chain value
- `assign_agent` – Attach AI agent to vault
- `evaluate_circuit` – Risk signal evaluation

### External Integrations
- **Jupiter API** (v6) – DEX quotes & swaps (price discovery)
- **Polymarket CLOB** – Live prediction market odds
- **Bags.fm** – Embedded zero-fee trading
- **Ramp Network** – ABRA → Fiat (150+ countries)
- **Transak** – ABRA → Fiat (global alternative)
- **Own Your Moment** – Live athlete data sync
- **Solana RPC** – Devnet transaction execution

---

## 📁 Repository Structure

```
Abraxas/
├── programs/abraxas/src/lib.rs          # Anchor smart contract
│   ├── Instructions: initialize_vault, deposit_lacasa_nft,
│   │    deposit_athlete_equity, record_athlete_growth,
│   │    assign_agent, evaluate_circuit
│   └── Events: AgentActionLogged, CircuitEvaluated
│
├── app/                                   # React frontend
│   ├── src/pages/
│   │   ├── DashboardPage.tsx             # Portfolio + Polymarket carousel
│   │   ├── TradePage.tsx                 # ABRA + staking + RWA pairs
│   │   ├── MarketPage.tsx                # Asset listings with filtering
│   │   ├── VaultsPage.tsx                # RWA vault management
│   │   ├── OrionPage.tsx                 # King AI assistant
│   │   ├── CircuitPage.tsx               # Risk simulator
│   │   ├── SophiaMintPage.tsx            # Agent NFT minting
│   │   └── LandingPage.tsx               # Entry point
│   │
│   ├── src/components/
│   │   ├── BagsBuyWidget.tsx             # Buy ABRA (Bags embed + address)
│   │   ├── BagsSwapWidget.tsx            # Swap tokens (Bags embed)
│   │   ├── BagsCredibilityBanner.tsx     # Trust messaging
│   │   ├── FiatOffRampWidget.tsx         # ABRA → Fiat conversion
│   │   ├── FeatureBadge.tsx              # Live/Coming Soon badges
│   │   └── OrionAssistant.tsx            # AI chat interface
│   │
│   ├── src/lib/
│   │   ├── types.ts                      # All TypeScript interfaces
│   │   ├── solana.ts                     # RPC config, program ID
│   │   ├── jupiter.ts                    # DEX quote + swap utilities
│   │   ├── polymarket.ts                 # Market definitions + filtering
│   │   ├── offramp.ts                    # Ramp & Transak integration
│   │   ├── staking.ts                    # Staking PDA creation
│   │   ├── oymAdapter.ts                 # Athlete data normalization
│   │   ├── program.ts                    # Anchor client helpers
│   │   └── mockData.ts                   # Starter data (devnet)
│   │
│   ├── src/hooks/
│   │   └── usePolymarketBets.ts          # Fetch live market data
│   │
│   ├── src/providers/
│   │   ├── AbraxasProvider.tsx           # Main app context
│   │   └── SolanaProvider.tsx            # Wallet context
│   │
│   ├── src/idl/abraxas.json              # Smart contract IDL
│   ├── vite.config.ts                    # Build config
│   ├── tsconfig.json                     # TypeScript strict mode
│   └── package.json                      # Dependencies (20+ packages)
│
├── target/deploy/                        # Compiled smart contract
│   └── abraxas-keypair.json              # Devnet keypair
│
├── README.md                              # This file
├── GROK_BUILD_SYNOPSIS.md                # Executive summary for planning
├── QUICK_REFERENCE.md                    # Developer lookup guide
└── STAKING_IMPLEMENTATION.md             # Staking smart contract docs
```

---

## 🔐 Smart Contract Overview

### Vault Data Structure
```typescript
Vault {
  owner: Pubkey,
  assetClass: 'AthleteEquity' | 'RealEstate' | 'TradingPortfolio' | 'LaCasaNFT',
  depositedAmount: u64,  // in lamports
  vaultValue: u64,        // current value (updated on deposits + growth)
  multiplier: f64,        // growth multiplier (e.g., 1.8x)
  assignedAgent: Option<AgentType>,  // Sophia agent (Sentinel/Yield/Defensive)
  createdAt: u64,         // timestamp
  lastUpdated: u64
}
```

### Circuit Breaker Thresholds
```
Price Speed:
  Warning → ≥ 500 bps
  Pause   → ≥ 1000 bps

Liquidity Drain:
  Warning → ≥ 450 bps
  Pause   → ≥ 900 bps

Activity Spike:
  Pause   → ≥ 1200 bps
```

---

## 🧪 Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| ✅ ABRA Token | Live | Mainnet trading active |
| ✅ Trading UI | Live | Jupiter + Bags fallback |
| ✅ Staking | Live | 30/90/180 day locks, multipliers |
| ✅ Polymarket Betting | Live | Real CLOB odds, King AI overlay |
| ✅ RWA Asset Data | Live | Athlete, real estate, golf, horses |
| ✅ Off-Ramp (Fiat) | Live | Ramp + Transak configured |
| ✅ Mobile Responsive | Live | 100% Tailwind CSS, portrait-first |
| 🟡 OYM Sync | Devnet | Awaiting live API keys |
| 🟡 Vaults | Devnet | Full contract, awaiting mainnet |
| 🟡 Sophia Agents | Devnet | MVP stubs, full execution ready |
| 🟡 Circuit Breaker | Devnet | Simulator working, awaiting vault integration |
| 📅 Leveraged Trading | Pipeline | 2x-5x multipliers planned |
| 📅 Perpetuals | Pipeline | BTC/ETH on-chain futures |
| 📅 Leaderboard | Pipeline | Top betters, tournament mode |

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| **[GROK_BUILD_SYNOPSIS.md](GROK_BUILD_SYNOPSIS.md)** | Executive summary, roadmap, build ideas (8,000 lines) |
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | Dev lookup guide—shortcuts, addresses, APIs, tasks (500 lines) |
| **[STAKING_IMPLEMENTATION.md](STAKING_IMPLEMENTATION.md)** | Staking smart contract technical details |
| **[ABRAXAS_COMPREHENSIVE_ANALYSIS.md](ABRAXAS_COMPREHENSIVE_ANALYSIS.md)** | Full technical breakdown (8,500 lines) |
| **README.md** | You are here—overview + quick start |

---

## 🚀 Deployment

### Vercel (Production)
```bash
git add -A
git commit -m "feat: update features"
git push origin main
```
→ Auto-deployed to https://abraxas-ten.vercel.app/

### Android APK (Local Build)
```bash
npm run cap:sync
npm run android:apk
```
→ Releases `io.abraxas.app` on device

### Mainnet Smart Contract
```bash
# From programs/abraxas
anchor build --release
anchor deploy
```
→ Deploys to Solana Mainnet (requires keypair)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Test locally: `npm run dev`
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/your-feature`
5. Open PR against `main`

**Pre-commit:**
- [ ] `npm run build` (no errors)
- [ ] TypeScript strict mode (zero errors)
- [ ] Mobile tested (portrait 768px)
- [ ] API fallbacks working (mock data)

---

## 📞 Support

- **Docs:** See [GROK_BUILD_SYNOPSIS.md](GROK_BUILD_SYNOPSIS.md) for detailed roadmap
- **Quick Lookup:** View [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common tasks
- **Issues:** File GitHub issues with repro steps
- **Discord:** [World Labs Community](https://discord.gg) (community-run)

---

**Built with ❤️ on Solana | Deployed on Vercel | Devnet Ready, Mainnet Pending**


---

## Android APK

**Package:** `io.abraxas.app` | **Version:** 1.1 (versionCode 2)

```bash
# Build release APK
cd app/android
./gradlew assembleRelease
# Output: app/build/outputs/apk/release/app-release.apk
```

Signed with `abraxas-release.jks` (alias: `abraxas-release`, valid until 2053).

### Wallet Support
1. Phantom
2. Solflare
3. Solana Mobile Wallet Adapter (MWA)

---

## Anchor Development

```bash
anchor build
anchor test
anchor deploy --provider.cluster devnet
```

---

## License

MIT
