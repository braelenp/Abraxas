# The First Son

A warrior-class intelligence protocol built on Solana. Bold, direct, unflinching.

## Architecture

- **Frontend**: React 19 + TypeScript + Vite 6 + Tailwind CSS 3
- **Blockchain**: Anchor 0.32 + Solana
- **Mobile**: Capacitor 8 (Android APK)

## Setup

### Prerequisites
- Node.js 18+
- Rust + Anchor CLI
- Solana CLI

### Frontend
```bash
cd app
npm install
npm run dev
```

### Backend (Anchor Program)
```bash
anchor build
anchor deploy
```

### Mobile (Android APK)
```bash
cd app
npm run build
npm run android:apk
```

## Directory Structure

```
├── app/                    # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities
│   │   ├── providers/      # Context providers
│   │   └── idl/            # Anchor IDL JSON
│   └── ...
└── programs/
    └── first-son/          # Anchor Solana program
```

## License

MIT
