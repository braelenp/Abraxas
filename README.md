# Abraxas – RWA Stock Market + Live Polymarket Prediction Trading on Solana

**World Labs Protocol**

Abraxas is the first RWA Stock Market on Solana with integrated live Polymarket prediction markets. Buy the ABRA token directly in the app (Bags ~0% fees) to own equity in the platform and place prediction bets on live Polymarket odds. Stake ABRA for multipliers and priority airdrops.

# ABRA Token & Asset Links

**ABRA CA:** `5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS`

[View ABRA Bag](https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS)

[Live dApp (Vercel)](https://abraxas-ten.vercel.app/)

---

Sophia agents manage future vaults, Circuit safety protects during volatility, and King AI delivers real-time insights. Live Polymarket integration allows users to bet ABRA tokens on real prediction markets with King AI probability guidance. Athlete equity (OYM structure) is the first planned asset class. La Casa NFTs and full RWA access will be airdropped to ABRA holders during beta.

## Token Model
- **ABRA** – main utility & platform equity (live)
- Future asset-class tokens (e.g., planned OYM) – vertical representatives
- Athlete tokens – sub-assets (planned examples only)

## Staking
Buy ABRA → stake for 30/90/180 days  
Multipliers: 1.2x / 1.8x / 2.5x  
Longer locks = higher airdrop priority

## Quick Start
1. `yarn install`
2. `yarn dev`
3. Buy ABRA on the Trade tab (Bags integration)
4. Stake ABRA for multipliers and airdrop priority
5. Bet ABRA on live Polymarket prediction markets from the Dashboard
6. Explore vaults, athlete equity, and circuit protection

Devnet showcase mode shows the full vision (vaults, Sophia, Circuit, King AI, live Polymarket) while token-first onboarding ramps up.

---

## Asset Classes

| Class | Status | Live Tickers |
|---|---|---|
| Athlete Equity | **Live** | `$CDUBB`, `$AJWILL`, `$HAILEE` |
| Real Estate | Pilot | `$LC-REIT`, `$SB-HOME` |
| Trading Portfolio | Pilot | `$ORQ`, `$SGC` |
| Music Rights | Pipeline | `$WAVE`, `$SOUL`, `$ANTM` |
| IP Licensing | Pipeline | `$IPX`, `$ARCH`, `$CHAR` |

---

## Platform Architecture

| Layer | Role |
|---|---|
| **Vaults** | On-chain PDA accounts holding RWA positions — stablecoin exposure, athlete mints, value growth, protective buffer |
| **Polymarket Integration** | Live prediction market feed from Polymarket CLOB API — real-time odds, volume pools, King AI probability guidance, ABRA token betting interface |
| **King AI (Orion)** | Performance engine — reads athlete metrics and market data, emits `build / accelerate / protect` signals, calculates prediction probabilities, executes growth on-chain |
| **Sophia Agents** | Per-vault AI agents (Sentinel / Yield / Defensive) — assignable on-chain with auditable rules hash |
| **Circuit Breaker** | Three-signal risk system — price speed, liquidity drain, activity spike → `None / ReleaseLiquidity / PauseRisk` |
| **La Casa NFTs** | Capital onboarding layer — NFT purchase → stablecoin vault deposit → athlete token appreciation |
| **OYM Integration** | Live athlete data sync from Own Your Moment, feeding real training & game stats into token state |
| **Market Page** | Professional data book — live listings, filter by class, score, thesis, hypothetical pipeline |
| **Mobile (Android)** | Capacitor APK — package `io.abraxas.app`, version 1.1 |

---

## Repository Structure

```
Abraxas/
├── programs/abraxas/src/lib.rs      # Anchor smart contract
│   Instructions: initialize_vault · deposit_lacasa_nft · deposit_athlete_equity
│                 record_athlete_growth · deposit · withdraw
│                 assign_agent · evaluate_circuit
├── app/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx    # Portfolio + live Polymarket carousels — predictions, perps, following
│   │   │   ├── VaultsPage.tsx       # Vault management, La Casa deposits, athlete board
│   │   │   ├── MarketPage.tsx       # Market data book — all RWA listings + OYM link
│   │   │   ├── TradePage.tsx        # Token acquisition + ABRA staking (consolidated Trade/Onboard)
│   │   │   ├── CircuitPage.tsx      # Circuit breaker monitor
│   │   │   ├── SophiaMintPage.tsx   # Agent minting
│   │   │   └── OrionPage.tsx        # King AI assistant
│   │   ├── providers/
│   │   │   ├── AbraxasProvider.tsx  # Context — vaults, tokens, King AI, OYM sync
│   │   │   └── SolanaProvider.tsx   # Wallet adapter
│   │   ├── lib/
│   │   │   ├── types.ts             # All core types
│   │   │   ├── polymarket.ts        # Polymarket CLOB API integration & utilities
│   │   │   ├── oymAdapter.ts        # OYM live data → Abraxas token normalization
│   │   │   └── program.ts           # Anchor client helpers
│   │   ├── hooks/
│   │   │   └── usePolymarketBets.ts # Hook for live market data fetching + refresh
│   │   └── idl/abraxas.json         # Program IDL
│   └── android/                     # Capacitor Android project
└── target/deploy/                   # Compiled program + keypair
```

---

## Smart Contract

**Program ID (Devnet):** `GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm`

**Deployer wallet:** `9rXBSbeqBtEpPJHwBFyd8EFUnoqNfBtYmnrMyw7c4WeH`

### Key Instructions

| Instruction | Effect |
|---|---|
| `initialize_vault` | Creates PDA vault for RWA asset class |
| `deposit_lacasa_nft` | Records stablecoin from NFT into vault exposure |
| `deposit_athlete_equity` | Routes capital to athlete token position |
| `record_athlete_growth` | Writes performance data, triggers value delta on-chain |
| `evaluate_circuit` | Scores price speed + liquidity drain + activity spike → circuit action |
| `assign_agent` | Attaches Sophia agent to vault with immutable rules hash |

### Circuit Thresholds

| Signal | Warning | Pause |
|---|---|---|
| Price Speed | ≥ 500 bps | ≥ 1000 bps |
| Liquidity Drain | ≥ 450 bps | ≥ 900 bps |
| Activity Spike | — | ≥ 1200 bps |

### Events Emitted
`AgentActionLogged` · `LaCasaDepositRecorded` · `AthleteEquityDeposited` · `KingSignalTracked` · `CircuitEvaluated`

---

## Local Development

```bash
cd app
npm install
npm run dev
```

### Environment Variables

```bash
# app/.env
VITE_ABRAXAS_PROGRAM_ID=GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm
VITE_SOLANA_RPC=https://api.devnet.solana.com
VITE_ENABLE_NATIVE_MWA=true
VITE_OYM_DATA_URL=           # OYM live athlete data endpoint
VITE_OYM_APP_URL=https://own-your-moment.vercel.app/app
VITE_LA_CASA_BUY_URL=        # Public La Casa NFT buy page URL
VITE_ABRA_TOKEN_CONTRACT_ADDRESS=  # ABRA token contract address on BAGS
VITE_ABRA_TOKEN_BAGS_URL=          # Public BAGS token page URL
```

---

## Vercel Deployment

Configured for automatic deployment from the `app/` subdirectory.

**Build settings (auto-detected via `vercel.json`):**
- Framework: Vite
- Root: `app/`
- Build command: `npm run build`
- Output: `dist/`

Set env vars in Vercel dashboard matching the `.env` keys above.

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
