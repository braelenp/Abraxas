# Pulse — The Pulse Keeper, Daughter of Sophia

A sovereign dApp for tokenizing gaming clips, sports highlights, live streams, and DeFi moments on Solana.

## Features

- **Clip Upload & Tokenization**: Upload video clips that get instantly minted as BlackBox NFTs
- **Live Streaming**: "Go Live" with integrated chat and auto-tokenization of highlight moments
- **Clip Feed**: YouTube-style feed featuring trending gaming, sports, and streaming content
- **Community Features**: Like, comment, share, and follow creators
- **Revenue Sharing**: 70% of trading fees go to clip creators, 30% to protocol revenue

## Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Build**: Vite
- **Blockchain**: Solana Web3.js
- **Wallet**: Solana Wallet Adapter
- **Storage**: Arweave/Shadow Drive (for video clips)

## Design System

- **Theme**: Dark cinematic esoteric aesthetic
- **Colors**: Purple (#9945ff) core, Orange & Cyan accents
- **UI**: Spaceship console style with monospace headers, glows, and animations

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.tsx      # Cinematic intro with typing effects
│   └── HomePage.tsx          # Main feed and in-app experience
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── ClipCard.tsx          # Individual clip card
│   ├── ClipFeed.tsx          # YouTube-style feed
│   ├── ClipUploadModal.tsx   # Upload & tokenize workflow
│   └── LiveStreamingSection.tsx # Live streaming with chat
├── lib/
│   └── solana.ts             # Solana integration (TODO)
├── App.tsx                   # Main app component
└── styles.css                # Global styles & animations
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

The app will open at `http://localhost:5174`

### Build for Production

```bash
npm run build
```

## Features Roadmap

- [ ] Real Arweave integration for video storage
- [ ] Solana wallet connection & devnet testing
- [ ] NFT minting on La Casa protocol
- [ ] Revenue sharing smart contracts
- [ ] Creator dashboard & analytics
- [ ] Community moderation tools
- [ ] Tournament functionality
- [ ] Trending algorithms
- [ ] Recommendation engine

## Brand Narrative

**"Welcome to the next degree."**

Pulse is the sovereign Pulse Keeper — the daughter of Sophia who captures the living heartbeat of gaming, sports highlights, and streaming culture. Where the Daughters birth assets into matter, Pulse tokenizes every highlight into sovereign on-chain ownership on Solana.

## License

Proprietary - Pulse Keeper Protocol 2026
