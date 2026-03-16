# Abraxas – Sovereign Guardians for RWAs

**Mobile-first AI-powered protection protocol for Real-World Assets on Solana**

Abraxas transforms passive tokenized Real-World Assets (RWAs) — such as real estate, art, invoices, and more — into actively managed, protected holdings using autonomous AI agents. Built with a mobile-first approach (optimized for Solana Mobile devices like Seeker/Saga), Abraxas lets users tokenize and deposit RWAs into secure vaults, assign intelligent **Sophia** AI agents for ongoing optimization (rebalancing, hedging, yield generation), and deploy **Circuit** — an autonomous safety agent that monitors on-chain signals in real time and triggers preventive actions to mitigate volatility risks before significant damage occurs.

## Features

- **Tokenize & Vault RWAs** — Securely bring real-world assets on-chain using Metaplex NFTs.
- **Sophia AI Agents** — Autonomous agents (rentable/buyable as NFTs) that intelligently manage assets: rebalancing, hedging, yield optimization.
- **Circuit Safety Agent** — Proactive on-chain monitoring of price speed, liquidity drains, activity spikes; crosses predefined thresholds → executes small, transparent preventive payouts.
- **Mobile-Native Dashboard** — Real-time visibility into vaults, agents, signals, payouts, and audit logs — intuitive touch UI for on-the-go management.
- **On-Chain Verifiability** — All rules, actions, and payouts are fully transparent, auditable, and executed on Solana.

## How It Works

1. Connect your Solana wallet and deposit/tokenize RWAs into dedicated vaults.
2. Assign or acquire Sophia AI agents (as NFTs) to autonomously manage your assets.
3. Circuit Agent continuously monitors on-chain activity and risk signals.
4. When multiple risk thresholds are crossed, Circuit triggers small preventive payouts to protect capital.
5. View everything in real-time via the mobile dashboard — signals, agent activity, vault status, and logs.

## Tech Stack

- **Frontend**: React, Vite, Capacitor (native mobile builds for Android/iOS), Solana Wallet Adapter
- **On-Chain**: Anchor (Rust) – vaults, agent logic, Circuit rules, payout execution
- **Agents & Off-Chain**: Node.js for autonomous agent operations and signal processing
- **NFT Standard**: Metaplex for RWA representation, agent NFTs, and vault metadata
- **Blockchain**: Solana (high-speed, low-cost real-time monitoring)

