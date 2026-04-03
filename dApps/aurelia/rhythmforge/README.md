# RhythmForge

**Play your owned music NFTs – on-chain rhythm game for Solana creators & fans**

RhythmForge turns static music NFTs (e.g., WL Studios songs) into interactive rhythm gameplay. Load tracks from your wallet, tap notes to the beat, score high, stake $SSKR for multipliers, and climb on-chain leaderboards. Built mobile-first for Solana Seeker.

Live demo: https://rhythmforge.vercel.app

## The Problem
Music NFTs are minted with incredible potential but often sit unused in wallets. Rhythm games are fun and popular but centralized, disconnected from true ownership. Creators miss engagement; fans miss rewards tied to what they own.

## What RhythmForge Does
A rhythm game where you:
- Load your owned song NFTs directly (metadata → BPM + difficulty).
- Play tap-falling-notes mode synced to the track.
- Submit scores to on-chain leaderboard.
- Stake $SSKR → earn multipliers, bonuses, airdrop eligibility.
- (Coming) Remix/combine NFTs, multiplayer sessions.

Drives real on-chain activity, volume, and creator royalties (ideal for Bags.fm integration).

## How It Works
1. Connect Seeker/Solana wallet.
2. Browse/load your music NFTs (on-chain verification: only owned playable).
3. Play rhythm game (tap notes, real-time audio).
4. High score → on-chain submit + leaderboard.
5. Stake $SSKR for boosted rewards & ecosystem boosts.

## Tech Stack
- **Frontend**: React, Vite, Howler (audio), Phasor/Game engine elements
- **On-chain**: Anchor (Rust) – scores, staking, leaderboards, NFT verification
- **Integration**: web3.js for metadata parsing, Solana RPC
- **Mobile**: PWA for Seeker-native (SMS wallet, touch gameplay)

## Current Features (MVP)
- Wallet connect & NFT loading
- Rhythm gameplay with audio sync
- Score submission & basic leaderboard
- $SSKR staking hooks

## Roadmap
- Q1 2026: Full Seeker integration, live leaderboards
- Q2 2026: Remix mode (multi-NFT tracks), Bags.fm launch tie-in
- Q3 2026: Multiplayer, airdrop mechanics, premium packs

## Why Solana & Bags?
Solana enables fast, cheap on-chain verification + ownership. Bags.fm powers creator launches & perpetual royalties—RhythmForge can help music projects on Bags gain viral engagement through playable NFTs.

Built by World Labs Protocol for the Bags Hackathon.

Questions? Reach out on X @ [your handle] or check commits.

Born Feb 2026 • Built for Solana Mobile (Seeker)
