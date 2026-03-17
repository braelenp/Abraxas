# Abraxas - Sovereign Guardians for RWAs

**Mobile-first AI-powered protection protocol for Real-World Assets on Solana**

Abraxas is a Solana-native Real World Asset (RWA) protocol that combines on-chain vaults, AI-driven Sophia agents, and an automated Circuit protection layer, wrapped in a mobile-first app built for Seeker and Saga.

## Overview

| Layer | What It Does |
|---|---|
| Vaults | Non-custodial on-chain accounts holding tokenized RWAs (invoices, art, carbon credits) |
| Sophia Agents | NFT-gated AI agents assigned to vaults for autonomous risk management and yield routing |
| Circuit | Real-time signal evaluation (price speed, liquidity drain, activity spike) triggering automatic protective actions |
| Orion | In-app AI assistant, context-aware per page |
| Mobile | Android APK via Capacitor with native wallet connectivity |

## Architecture

```
Abraxas/
├── programs/abraxas/       # Anchor smart contract (Solana)
│   └── src/lib.rs          # initialize_vault · deposit · withdraw
│                           # assign_agent · evaluate_circuit
├── app/                    # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── pages/          # Dashboard · Vaults · Circuit · Sophia · Orion
│   │   ├── providers/      # SolanaProvider · AbraxasProvider
│   │   ├── components/     # BrandLogo · OrionAssistant
│   │   ├── lib/            # program.ts · types.ts · solana.ts · mobile.ts
│   │   └── idl/            # abraxas.json (Anchor IDL)
│   └── android/            # Capacitor Android project
└── target/                 # Compiled Anchor artifacts & IDL
```

## Smart Contract

Program ID (Devnet): `GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm`

### Instructions

- `initialize_vault`: Create a PDA vault for a given owner and RWA mint
- `deposit`: Transfer SOL lamports into the vault
- `withdraw`: Pull lamports back to the owner (owner-only)
- `assign_agent`: Link a Sophia agent NFT mint and rules hash to the vault
- `evaluate_circuit`: Score market signals in BPS and emit `CircuitEvaluated`

### Circuit Actions

- `None`: All signals below threshold
- `ReleaseLiquidity`: Price speed or liquidity drain >= 50% of threshold
- `PauseRisk`: Any signal meets or exceeds threshold

## Frontend

### Prerequisites

- Node 18+
- npm or yarn

### Run Locally (Devnet)

```bash
cd app
npm install
npm run dev
```

Set your environment variables:

```bash
# app/.env
VITE_ABRAXAS_PROGRAM_ID=GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm
VITE_SOLANA_RPC=https://api.devnet.solana.com
VITE_ENABLE_NATIVE_MWA=true
```

## Android APK

### One-Time Android SDK Setup

```bash
cd app/android
cp local.properties.example local.properties
# Set sdk.dir to your Android SDK path, e.g.:
# sdk.dir=/usr/lib/android-sdk
```

Or export:

```bash
export ANDROID_HOME=/usr/lib/android-sdk
```

### Build Debug APK

```bash
cd app
npm install
npm run android:apk
```

Output: `app/android/app/build/outputs/apk/debug/app-debug.apk`

### Native Wallet Support Order

1. Phantom
2. Solflare
3. Solana Mobile Wallet Adapter (MWA)

## Anchor Development

```bash
anchor build
anchor test
anchor deploy --provider.cluster devnet
```

## License

MIT
