# Abraxas - Sovereign Guardians for RWAs
# Abraxas — RWA Stock Market on Solana

**The first on-chain Real World Asset Stock Market. Tokenized athlete equity, real estate, music rights, trading portfolios, and IP licensing — built on Solana, managed by AI agents, protected by an on-chain circuit breaker.**

---

## What Is Abraxas?

Abraxas is a decentralized RWA Stock Market where real-world assets are tokenized, vaulted, and grown by AI agents using verifiable performance data. It is available as a web app (Vercel) and a native Android app.

The first live asset class is **Athlete Equity** — fractional ownership tokens tied to the real training, game stats, and NIL economics of individual athletes. Every token price is driven by on-chain data, not speculation.

---

## Early Adoption: Two Onboarding Paths

### 1. Token Acquisition — Direct equity stake
Abraxas tokens are **live**. Buying now means owning fractional equity in the RWA market infrastructure at its earliest valuation. Token holders gain position before Real Estate, Music Rights, Trading Portfolios, and IP Licensing expand the underlying demand surface.

### 2. La Casa NFT Onboarding — Capital bridge → token airdrop
La Casa NFTs are the stablecoin-backed capital onboarding mechanism for Abraxas vaults. Each NFT embeds a USDC deposit that routes into a specific RWA vault on-chain. Early NFT holders are recorded as capital founders and receive a **proportional Abraxas token airdrop** at launch.

Both paths converge at the token — two roads to the same destination: early equity in the Abraxas RWA Stock Market.

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
| **King AI (Orion)** | Performance engine — reads athlete metrics, emits `build / accelerate / protect` signals, executes growth on-chain |
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
│   │   │   ├── DashboardPage.tsx    # Portfolio overview — market value, agent logs
│   │   │   ├── VaultsPage.tsx       # Vault management, La Casa deposits, athlete board
│   │   │   ├── MarketPage.tsx       # Market data book — all RWA listings + OYM link
│   │   │   ├── OnboardPage.tsx      # NFT mint + token acquisition (early adoption)
│   │   │   ├── CircuitPage.tsx      # Circuit breaker monitor
│   │   │   ├── SophiaMintPage.tsx   # Agent minting
│   │   │   └── OrionPage.tsx        # King AI assistant
│   │   ├── providers/
│   │   │   ├── AbraxasProvider.tsx  # Context — vaults, tokens, King AI, OYM sync
│   │   │   └── SolanaProvider.tsx   # Wallet adapter
│   │   ├── lib/
│   │   │   ├── types.ts             # All core types
│   │   │   ├── oymAdapter.ts        # OYM live data → Abraxas token normalization
│   │   │   └── program.ts           # Anchor client helpers
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
