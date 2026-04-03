# Abraxas dApps - Comprehensive Repository Analysis

**Last Updated:** April 1, 2026  
**Analyzed Repositories:** Abraxas, Genesis, Valkyr, Raido

---

## Executive Summary

The Abraxas ecosystem consists of four interconnected dApps built on Solana using React, Vite, and Tailwind CSS. Each dApp implements a sophisticated **dark esoteric aesthetic** with:

- Nordic/mystical rune symbolism
- Glowing neon effects (cyan, gold, purple)
- Particle and light beam backgrounds
- Typing animations for narrative flow
- Loading screens with system initialization themes
- Mobile-first responsive design

---

## 1. PROJECT STRUCTURES

### 1.1 Abraxas (Main Protocol)
**Location:** `braelenp/Abraxas`  
**Type:** Rust/Solana program + Web dApp

```
Abraxas/
├── programs/abraxas/          # Rust program (Cargo.toml, src/)
├── app/                        # Web frontend
│   ├── public/assets/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── idl/               # Anchor IDL for Solana program
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── providers/         # Context providers
│   │   ├── styles.css
│   │   ├── App.tsx
│   │   △ main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js     # Note: Not defined, uses custom CSS
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── index.html
├── android/                    # Capacitor mobile build
└── vercel.json
```

### 1.2 Genesis (First Son)
**Location:** `braelenp/Genesis`  
**Type:** Tokenization dApp

```
Genesis/
├── programs/first-son/        # Rust Cargo program
├── app/
│   ├── public/assets/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── idl/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── styles.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts      # ✓ Full Tailwind config
│   ├── tsconfig.json
│   └── index.html
└── vercel.json
```

### 1.3 Valkyr (Daughter - Strategic Oversight)
**Location:** `braelenp/Valkyr`  
**Type:** Portfolio management dApp

```
Valkyr/
├── public/assets/
├── src/
│   ├── components/             # 18 component files
│   │   ├── LoadingScreen.tsx
│   │   ├── LandingPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LightBeams.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── TypingText.tsx
│   │   ├── RuneDisplay.tsx
│   │   ├── RuneTabs.tsx
│   │   ├── ProtectionFlow.tsx
│   │   ├── Logo.tsx
│   │   ├── CTAButtons.tsx
│   │   ├── BottomNav.tsx
│   │   ├── BuyAbraButton.tsx
│   │   ├── AbraxasLink.tsx
│   │   ├── DAppHeader.tsx
│   │   ├── NavigationTabs.tsx
│   │   └── tabs/
│   ├── contexts/
│   │   └── PortfolioContext.tsx
│   ├── hooks/
│   │   ├── useScrollToTop.ts
│   │   └── useWallet.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── runeData.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.js          # ✓ Full Tailwind config
├── tsconfig.json
└── index.html
```

### 1.4 Raido (Swift Provider)
**Location:** `braelenp/Raido`  
**Type:** Liquidity hunting dApp

```
Raido/
├── public/
├── scripts/
│   └── validate.js
├── src/
│   ├── components/             # 14 component files
│   │   ├── RaidhoLoadingScreen.tsx
│   │   ├── LandingPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── LightBeam.tsx
│   │   ├── FlowSimulator.tsx
│   │   ├── OpportunityScanner.tsx
│   │   ├── MarketFlow.tsx
│   │   ├── TidePool.tsx
│   │   ├── LiquidityHub.tsx
│   │   ├── RaidhoRune.tsx
│   │   ├── BottomNav.tsx
│   │   └── AbraxasFooter.tsx
│   ├── config/
│   │   └── platform.ts
│   ├── hooks/
│   │   ├── useParticles.ts
│   │   └── useTypingEffect.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── format.ts
│   │   └── mockData.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

---

## 2. TECH STACK COMPARISON

| Feature | Abraxas | Genesis | Valkyr | Raido |
|---------|---------|---------|--------|-------|
| **React** | 19.2.4 | 19.1.0 | 18.2.0 | 18.2.0 |
| **Vite** | 7.3.1 | 6.3.5 | 5.0.8 | 5.0.8 |
| **Tailwind** | 4.2.1 | 3.4.17 | 3.4.0 | 3.3.6 |
| **React Router** | 7.13.1 | 7.5.2 | ✗ Custom | ✗ Custom |
| **Solana Web3** | 1.98.4 | 1.98.0 | ✗ Mock | 1.95.0 |
| **Wallet Adapter** | Full suite | Full suite | ✗ Mock | Full suite |
| **Anchor** | 0.32.1 | 0.32.0 | ✗ None | ✗ None |
| **TypeScript** | 5.9.3 | 5.8.3 | 5.2.2 | 5.2.2 |
| **ESLint** | ✗ | ✓ | ✓ Strict | ✓ |
| **Lucide Icons** | 0.576.0 | - | - | 0.408.0 |
| **Capacitor** | 8.1.0 | 8.1.0 | ✗ | ✗ |
| **PostCSS** | ✓ | ✓ | ✓ | ✓ |
| **Autoprefixer** | ✓ | ✓ | ✓ | ✓ |

---

## 3. TAILWIND COLOR SCHEMES

### Genesis Color Palette (Most Complete)
```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Primary esoteric colors
        'abraxas-cyan': '#22d3ee',       // Glow cyan
        'abraxas-gold': '#f9cc75',       // Sacred gold
        'abraxas-orange': '#ea580c',      // Ritual fire
        'abraxas-violet': '#a855f7',      // Mystical purple
        'abraxas-amber': '#fbbf24',       // Light warmth
        
        // Dark base colors
        charcoal: '#1a1a1a',
        gunmetal: '#2a3a3a',
        military: '#364537',
        steel: '#3a4f5f',
        offwhite: '#f5f5f5',
        
        // Slate variants
        'slate-950': '#0f172a',
        'slate-900': '#111827',
        'slate-850': '#1a2332',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
```

### Valkyr Color Palette
```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: '#06b6d4',
          purple: '#9945ff',
          orange: '#ea580c',
          gold: '#f9cc75',
        },
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a2e',
          card: '#16213e',
        },
        slate: { /* ... extensive slate variants ... */ },
      },
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'glitch': 'glitch 0.3s infinite',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.6)',
        'glow-gold': '0 0 30px rgba(249, 204, 117, 0.6)',
      },
    },
  },
  plugins: [],
}
```

### Raido Color Palette (Deep Blue + Gold)
```typescript
export default {
  theme: {
    extend: {
      colors: {
        raido: {
          gold: '#d4af37',
          'gold-light': '#e6c547',
          'deep-blue': '#0a1f3e',
          'deep-blue-accent': '#1a3a5c',
          'deep-blue-lighter': '#2a4a7c',
          cyan: '#00ffff',
          'cyan-subtle': '#00e6e6',
          purple: '#9945ff',
          black: '#0d0d1a',
        }
      },
      keyframes: {
        'typing-reveal': { /* 0% to 100% width and opacity */ },
        'glow-pulse': { /* 0%, 100%, 50% glow intensity */ },
        'float': { /* 0%, 50%, 100% translation */ },
        'shimmer': { /* background position shift */ },
        'beam': { /* translateX animation */ },
      },
      animation: {
        'typing-reveal': 'typing-reveal 3s steps(50, end) forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'beam': 'beam 2s ease-in-out infinite',
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.6)',
        'glow-blue': '0 0 20px rgba(26, 58, 92, 0.6)',
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.4)',
      }
    },
  },
}
```

---

## 4. COMPONENT ARCHITECTURE

### 4.1 Common Component Patterns

All dApps follow this structure:

```
components/
├── LoadingScreen.tsx           # Initialize sequence
├── LandingPage.tsx             # Hero/entry point
├── Dashboard.tsx               # Main dApp interface
├── ParticleBackground.tsx      # Floating particle effect
├── LightBeams.tsx              # Gradient light lines
├── TypingText.tsx              # Narrative typing animation
├── BottomNav.tsx               # Mobile navigation
└── [DApp-specific components]
```

### 4.2 Valkyr Components
- **LoadingScreen** - Rune-based loader with progress tracking
- **LandingPage** - Hero with animated title + rune display
- **Dashboard** - Main app interface with tabs
- **ProtectionFlow** - Visual flow diagram
- **RuneTabs** - Tabbed interface with rune symbols
- **Logo** - Animated Valkyr logo component
- **ParticleBackground** - 20 floating cyan particles
- **LightBeams** - 4 colored gradient beams

### 4.3 Raido Components
- **RaidhoLoadingScreen** - Advanced loader with system messages
- **RaidhoRune** - Animated ᚱ (Raido rune) display
- **LandingPage** - Full hero section
- **FlowSimulator** - Liquidity flow visualization
- **OpportunityScanner** - Opportunity hunting interface
- **MarketFlow** - Market data display
- **TidePool** - Liquidity pool interface
- **Dashboard** - Multi-section overview

### 4.4 Abraxas Components
- **BrandLogo** - Main Abraxas branding
- **OrionAssistant** - AI conversation component
- **DashboardPage** - Forge/main dashboard
- **VaultsPage** - Sophia vault management
- **MarketPage** - Trading interface
- **CadabraPage** - Mirror/reflection trading
- **CircuitPage** - Aegis protection circuits
- **LandingPage** - Pre-auth landing

---

## 5. LOADING SCREEN IMPLEMENTATIONS

### 5.1 Valkyr Loading Screen Pattern
```typescript
interface LoadingScreenProps {
  isVisible: boolean
  onComplete?: () => void
}

// Features:
// - Progress bar simulation (0-99% natural curve)
// - Cycling message system (8 system messages)
// - Dual rotating rings (cyan/purple + gold/orange)
// - Center rune display ("V" for Valkyr)
// - Grid background pattern with animation
// - Particles (20 floating points)
// - Glitch effect (random 30% chance at 500ms intervals)

// Duration: ~2-3 seconds
// Completion: onComplete() callback
// Z-index: 50 (fixture)
```

**Key Styling:**
```css
/* Grid pattern */
backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%...'
backgroundSize: '50px 50px'
animation: 'grid-move 20s linear infinite'

/* Rotating rings */
border: '2px solid transparent'
border-top: 'cyan-400'
border-right: 'purple-500'
animation: 'spin 3s linear infinite'

/* Glow effects */
boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)'
```

### 5.2 Raido Loading Screen Pattern
```typescript
interface RaidhoLoadingScreenProps {
  onComplete?: () => void
}

// Features:
// - Animated background layers (gold/black gradient)
// - Pulsing circular halos
// - Rotating + pulsing rings with ᚱ rune
// - System message: "[SYSTEM.INITIALIZING]"
// - Title: "RAIDO PROTOCOL"
// - Status: "Activating..." with animated dots
// - Loading bar with gradient fill
// - System output messages (footer text)
// - Scanlines effect overlay

// Duration: ~3 seconds (0-100% progress)
// Z-index: 9999 (fullscreen)
```

**Key Animation - Scanlines:**
```typescript
style={{
  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(212, 165, 55, 0.05) 25%...',
  backgroundSize: '100% 4px',
  animation: 'scanlines 8s linear infinite',
}}
```

### 5.3 Common Loading Patterns

| Feature | Valkyr | Raido |
|---------|--------|-------|
| **Duration** | 2s | 3s |
| **Progress Simulation** | Yes (0-99%) | Yes (0-100%) |
| **Ring Animation** | Dual rotating (opposite dirs) | Single + pulsing |
| **Rune Display** | "V" centered | "ᚱ" centered |
| **Messages** | 8-step cycle | Static + status |
| **Background** | Grid pattern | Gradient + layers |
| **Effects** | Glitch, particles | Scanlines, halos |
| **Text Glow** | Multi-color shadow | Single-color glow |
| **Z-index** | 50 | 9999 |

---

## 6. LANDING PAGE STRUCTURE

### 6.1 Valkyr Landing Page
```typescript
// File: src/components/LandingPage.tsx
// Size: ~8KB

structure:
  Background Effects:
    - LightBeams (4 colored beams)
    - ParticleBackground (20 particles)
  
  Hero Section:
    - Logo (animated, scaled up)
    - Main Title: "VALKYR" (with glitch effect)
    - Animated glitch layer (offset color shadows)
    - Tagline: "Welcome to the next degree." (typing animation)
    - Subtitle: "The Wise Guardian, Son of Sophia"
    - CTA Buttons:
      * "Enter Strategic Oversight"
      * "Connect Wallet"
    - Protection Flow (visual component)
    - Portfolio Context (context provider)

Styling:
  Title:
    - hero-title class (4xl sm:5xl lg:6xl)
    - text-gold with glow-gold effect
    - Custom glitch animation (4s ease-in-out infinite)
    - Offset pseudo-element with purple/cyan shadows
    - Letter-spacing: 0.15em
  
  Glitch Animation:
    keyframes glitch-valkyr {
      0%, 100%: cyan/gold main shadow
      25%: purple-dominant shadow
      50%: cyan/gold mixed shadow
      75%: gold-dominant shadow
    }
```

### 6.2 Raido Landing Page
```typescript
// File: src/components/LandingPage.tsx
// Size: ~16KB

structure:
  Background Effects:
    - ParticleBackground (customizable intensity/color)
    - LightBeam × 3 (top-left, top-right, bottom-left)
  
  Fixed Header:
    - Logo: "◆ RAIDO"
    - Connect Wallet button (gold)
  
  Hero Section:
    - RaidhoRune (animated, 220px size)
    - Main Title: "RAIDO" (typing effect, 6xl-8xl)
    - Tagline: "Welcome to the next degree." (typing, 2xl-4xl, cyan)
    - Subtitle: "The Swift Provider, Son of Sophia"
    - Lore Blurb (fade-in animation)
    - CTA Buttons (3 buttons: Hunt, Connect, Buy):
      * Hunt Opportunities (gold gradient)
      * Connect Wallet (cyan border)
      * Buy $ABRA (gold-light border)
    - Scroll Indicator (animated bounce)
  
  Info Section (below fold):
    - Section Header: "The Swift Provider's Domain"
    - 3-Column Grid:
      * Opportunity Hunting (Zap icon)
      * Capital Flow (TrendingUp icon)
      * Liquidity Orchestration (Layers icon)

Animations:
  - Typing: 80ms for title, 50ms for tagline
  - Sequential reveal: title → tagline → content → buttons
  - Fade-in delay: 500ms after tagline complete
  - Button reveal: 800ms after content
```

### 6.3 Genesis Landing Page (Router-based)
```typescript
// Routes structure:
Routes:
  /                    → LandingPage (auth-free)
  /genesis             → GenesisPage (protected)
  /creations           → MyCreationsPage (protected)
  /tokenize            → TokenizePage (protected)
  /account             → AccountPage (protected)

Loading Context:
  - LoadingProvider wraps all routes
  - LoadingScreen component overlays when isLoading=true
  - Global loading state management
```

### 6.4 Abraxas Landing Page (Mobile-first)
```typescript
// Structure:
- Fixed background image layer
- Navigation with rune wheel (8 nav items)
- Hero section (max-width: md)
- Audio integration (intro ambient music)
- Intro modal with backdrop blur
- Mobile responsive layout

Rune Navigation:
  const navItems = [
    { to: '/app',         label: 'Forge',   rune: 'ᚲ' },
    { to: '/app/vaults',  label: 'Sophia',  rune: 'ᚨ' },
    { to: '/app/market',  label: 'Horizon', rune: 'ᛋ' },
    { to: '/app/cadabra', label: 'Mirror',  rune: '✦' },
    { to: '/app/trade',   label: 'Flux',    rune: 'ᛚ' },
    { to: '/app/orion',   label: 'King',    rune: 'ᛏ' },
    { to: '/app/circuit', label: 'Aegis',   rune: 'ᚦ' },
    { to: '/app/warden',  label: 'Warden',  rune: 'ᛉ' },
  ]
```

---

## 7. NAVIGATION & ROUTING STRUCTURE

### 7.1 Valkyr (Custom Page State)
```typescript
// No router library - uses React state
type Page = 'landing' | 'dashboard'

// Navigation:
const [currentPage, setCurrentPage] = useState<Page>('landing')

const handleNavigate = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setCurrentPage('dashboard')
}

const handleBack = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setCurrentPage('landing')
}

// Render:
{currentPage === 'landing' ? (
  <LandingPage onNavigate={handleNavigate} />
) : (
  <Dashboard onBack={handleBack} />
)}
```

### 7.2 Raido (Custom Multi-page State)
```typescript
type Page = 'landing' | 'dashboard' | 'hunt' | 'flow' | 'market' | 'tidepool'

// Navigation items with runes:
const navItems = [
  { id: 'dashboard', label: 'Dashboard', rune: 'ᚲ' },
  { id: 'hunt', label: 'Hunt', rune: 'ᚱ' },
  { id: 'flow', label: 'Flow', rune: 'ᛋ' },
  { id: 'market', label: 'Market', rune: '⇄' },
  { id: 'tidepool', label: 'Tide', rune: '✦' },
]

// Mobile header + navigation
{currentPage !== 'landing' && (
  <header className="sticky top-0 z-40 bg-raido-black/95 backdrop-blur">
    {/* Desktop nav + runes */}
    {/* Mobile menu toggle */}
  </header>
)}

// Bottom navigation (mobile)
{currentPage !== 'landing' && (
  <BottomNav activeTab={currentPage} onNavigate={handleNavigate} />
)}
```

### 7.3 Genesis (React Router)
```typescript
// BrowserRouter wrapper
<BrowserRouter>
  <SolanaProvider>
    <AppProvider>
      <LoadingProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<DappShell />}>
            <Route path="/genesis" element={<GenesisPage />} />
            <Route path="/creations" element={<MyCreationsPage />} />
            <Route path="/tokenize" element={<TokenizePage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LoadingProvider>
    </AppProvider>
  </SolanaProvider>
</BrowserRouter>
```

### 7.4 Abraxas (React Router + Rune Wheel)
```typescript
// Protected dApp shell with rune navigation
const DappShell = () => {
  // Background image management
  // Scroll-to-top on route change
  // Audio loop integration
  
  return (
    <div className="dapp-theme tech-distortion h-[100dvh]">
      <Routes>
        <Route path="/app" element={<DashboardPage />} />
        <Route path="/app/vaults" element={<VaultsPage />} />
        <Route path="/app/market" element={<MarketPage />} />
        <Route path="/app/cadabra" element={<CadabraPage />} />
        <Route path="/app/trade" element={<TradePage />} />
        <Route path="/app/circuit" element={<CircuitPage />} />
        <Route path="/app/warden" element={<...Page />} />
      </Routes>
      
      {/* Rune navigation sidebar/header */}
      {navItems.map(item => (
        <NavLink to={item.to} className="rune-nav-item">
          {item.rune} {item.label}
        </NavLink>
      ))}
    </div>
  )
}
```

---

## 8. CSS & STYLING APPROACH

### 8.1 Global Styles Pattern (Valkyr/Raido)

**index.css:**
```css
/* Typography */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-cyan: #06b6d4;
  --color-gold: #f9cc75;
  --color-orange: #ea580c;
  --color-purple: #a855f7;
}

body {
  background-color: #0a0a0a;  /* Ultra dark */
  color: #f1f5f9;              /* Off-white text */
  font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  overflow-x: hidden;
}

/* Typography Hierarchy */
.hero-title {
  @apply text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[0.15em] uppercase;
}

.section-title {
  @apply text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 mb-4 font-mono;
}

.subsection-title {
  @apply text-lg md:text-xl font-black uppercase tracking-widest;
}

/* Glow Panels */
.glow-panel {
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.6));
  border: 1px solid rgba(6, 182, 212, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.2);
}

.glow-panel-purple {
  border-color: rgba(153, 69, 255, 0.2);
  box-shadow: 0 0 30px rgba(153, 69, 255, 0.2);
}

.glow-panel-gold {
  border-color: rgba(253, 216, 53, 0.2);
  box-shadow: 0 0 30px rgba(253, 216, 53, 0.2);
}

/* Text Glow Effects */
.glow-gold {
  text-shadow: 
    0 0 8px rgba(245, 158, 11, 0.36),
    0 0 16px rgba(245, 158, 11, 0.24),
    0 0 24px rgba(217, 119, 6, 0.16);
}

.glow-cyan {
  text-shadow:
    0 0 12px rgba(34, 211, 238, 0.4),
    0 0 24px rgba(34, 211, 238, 0.24);
}

.neon-text {
  color: var(--color-cyan);
  text-shadow: 0 0 10px var(--color-cyan), 0 0 20px rgba(6, 182, 212, 0.5);
}

.neon-text-gold {
  color: var(--color-gold);
  text-shadow: 0 0 10px var(--color-gold), 0 0 20px rgba(249, 204, 117, 0.5);
}

/* Glitch Animation */
@keyframes glitch {
  0%, 100% {
    transform: translate(0);
    text-shadow: 
      -3px -3px 0px rgba(250, 204, 21, 0.8),
      3px 3px 0px rgba(6, 182, 212, 0.5);
  }
  20% {
    transform: translate(-2px, 2px);
    text-shadow:
      3px -3px 0px rgba(250, 204, 21, 0.8),
      -3px 3px 0px rgba(6, 182, 212, 0.5);
  }
  40% {
    transform: translate(-2px, -2px);
    text-shadow:
      -3px 3px 0px rgba(250, 204, 21, 0.8),
      3px -3px 0px rgba(6, 182, 212, 0.5);
  }
  /* 60%, 80% variations... */
}

.animate-glitch {
  animation: glitch 0.3s infinite;
}

/* Light Beam */
.light-beam {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent);
  filter: blur(1px);
  pointer-events: none;
}

.beam-purple {
  background: linear-gradient(90deg, transparent, rgba(153, 69, 255, 0.3), transparent);
}

.beam-orange {
  background: linear-gradient(90deg, transparent, rgba(234, 88, 12, 0.2), transparent);
}

/* Particles */
.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(6, 182, 212, 0.6);
  border-radius: 50%;
  filter: blur(0.5px);
}

.particle.pulse {
  animation: float 15s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(26, 26, 46, 0.5);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--color-cyan), var(--color-purple));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, var(--color-purple), var(--color-cyan));
}
```

### 8.2 Raido CSS Specializations

```css
/* Rune glow effect */
.rune-glow {
  filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6)) 
          drop-shadow(0 0 40px rgba(212, 175, 55, 0.3));
}

.rune-glow-intense {
  filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.8)) 
          drop-shadow(0 0 60px rgba(212, 175, 55, 0.5)) 
          drop-shadow(0 0 90px rgba(212, 175, 55, 0.3));
}

/* Text glow variations */
.text-glow {
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.6), 0 0 20px rgba(212, 175, 55, 0.3);
}

.text-glow-cyan {
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3);
}

/* Focus states */
:focus-visible {
  outline: 2px solid rgba(212, 175, 55, 0.6);
  outline-offset: 2px;
}

/* Fade in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

---

## 9. DARK ESOTERIC AESTHETIC IMPLEMENTATION

### 9.1 Color Philosophy

| Color | Hex | Usage | Meaning |
|-------|-----|-------|---------|
| **Gold** | #f9cc75, #d4af37 | Primary accent, titles, highlights | Sacred, divine |
| **Cyan** | #06b6d4, #00ffff | Secondary accent, glow effects | Energy, connection |
| **Purple** | #9945ff, #a855f7 | Tertiary accent, mysticism | Magic, ritual |
| **Orange** | #ea580c | Fire, energy | Action, transformation |
| **Deep Black** | #0a0a0a, #0d0d1a | Background | Void, mystery |
| **Slate** | #1a1a2e, #16213e | Surface, cards | Grounded |

### 9.2 Rune Symbol Usage

**Abraxas/Solana Futhark Runes:**
```
Navigation Runes:
  ᚲ (Kennaz/Kenaz)      - Knowledge, clarity, Forge
  ᚨ (Ansuz/Ansuz)       - Sophia, wisdom, communication
  ᛋ (Sowilo/Sowulo)     - Sun, success, vision
  ✦ (Mirror/Custom)     - Reflection, balance, Mirror/Cadabra
  ᛚ (Laguz)             - Flux, water, flow
  ᛏ (Tiwaz)             - Orion, warrior king
  ᚦ (Thurisaz/Thurisaz) - Gate, protection, Aegis Circuit
  ᛉ (Algiz)             - Warden, protection, rune ward

Typing characters (in loading/narrative):
  ▌ cursor                - System in progress
  ᚱ (Raido)              - Journey, movement (Raido rune)
  ◆ diamond              - Spark, convergence point
```

### 9.3 Glow & Shadow Techniques

```typescript
/* Multi-layer text shadow for depth */
text-shadow: 
  0 0 10px rgba(6, 182, 212, 0.8),   /* Inner glow */
  0 0 20px rgba(6, 182, 212, 0.5),   /* Mid glow */
  0 0 30px rgba(249, 204, 117, 0.6), /* Outer glow (color shift) */
  0 0 40px rgba(249, 204, 117, 0.3), /* Extended glow */
  2px 2px 0 rgba(168, 85, 247, 0.5), /* Glitch layer 1 */
  -2px -2px 0 rgba(6, 182, 212, 0.5) /* Glitch layer 2 */

/* Multi-layer drop-shadow for element emphasis */
filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6)) 
        drop-shadow(0 0 40px rgba(212, 175, 55, 0.3))

/* Box-shadow for card glow */
box-shadow: 0 0 30px rgba(6, 182, 212, 0.2)
```

### 9.4 Animation Techniques

```typescript
/* Float animation - peaceful movement */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }

/* Glitch - rapid offset displacement */
@keyframes glitch {
  0%, 100% { transform: translate(0); /* Original */ }
  20% { transform: translate(-2px, 2px); /* Lower left */ }
  40% { transform: translate(-2px, -2px); /* Upper left */ }
  60% { transform: translate(2px, 2px); /* Lower right */ }
  80% { transform: translate(2px, -2px); /* Upper right */ }
}

/* Pulse - opacity breathing */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Spin - rotation */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Shimmer - background gradient movement */
@keyframes shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Typing reveal - width growth */
@keyframes typing-reveal {
  0% { width: 0%; opacity: 0; }
  100% { width: 100%; opacity: 1; }
}
animation: typing-reveal 3s steps(50, end) forwards;
```

---

## 10. TYPING ANIMATION IMPLEMENTATIONS

### 10.1 Valkyr - Component-Based Typing

**TypingText.tsx:**
```typescript
interface TypingTextProps {
  text: string
  speed?: number           // ms per character
  className?: string
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (displayedText.length === text.length) {
      setIsComplete(true)
    }
  }, [displayedText, text, speed])

  return (
    <span className={!isComplete ? 'typing-text' : ''}>
      {displayedText}
    </span>
  )
}

// Usage: <TypingText text="Welcome to the next degree." speed={80} />
```

### 10.2 Raido - Hook-Based Typing

**useTypingEffect.ts:**
```typescript
export const useTypingEffect = (
  text: string, 
  speed = 50, 
  startDelay = 0
) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let index = 0

    const typeCharacter = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
        timeoutId = setTimeout(typeCharacter, speed)
      } else {
        setIsComplete(true)
      }
    }

    if (startDelay > 0) {
      timeoutId = setTimeout(typeCharacter, startDelay)
    } else {
      timeoutId = setTimeout(typeCharacter, speed)
    }

    return () => clearTimeout(timeoutId)
  }, [text, speed, startDelay])

  return { displayedText, isComplete }
}

// Usage: 
const { displayedText, isComplete } = useTypingEffect(
  "RAIDO",
  80,      // speed
  300      // startDelay
)
```

### 10.3 Typing Usage Pattern

**Landing Page Sequence:**
```typescript
// Raido example:
const { displayedRaido, isComplete: raidoComplete } = useTypingEffect(
  "RAIDO",
  80,
  300
)

const { displayedTagline, isComplete: taglineComplete } = useTypingEffect(
  "Welcome to the next degree.",
  50,
  raidoComplete ? 400 : 999999  // Start only after title completes
)

// Sequential reveal:
// 1. 300ms delay
// 2. Type "RAIDO" at 80ms/char (640ms total)
// 3. After raidoComplete (940ms total)
// 4. Start typing tagline at 50ms/char (1290ms to complete)
```

---

## 11. KEY FILES & CONFIGURATION

### 11.1 Build Configuration (Vite)

**vite.config.ts** (Standard pattern):
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true  // Auto-open in browser
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

### 11.2 TypeScript Configuration

**tsconfig.json** (modern target):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 11.3 PostCSS & Autoprefixer

**postcss.config.js** (Standard):
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 12. COMMON PATTERNS & BEST PRACTICES

### 12.1 Navigation Patterns

| Pattern | Used By | Pros | Cons |
|---------|---------|------|------|
| **Custom State** | Valkyr, Raido | Lightweight, simple | No browser history |
| **React Router** | Genesis, Abraxas | Browser history, SEO | More bundle size |
| **Hybrid** (Router + Custom) | Abraxas | Best of both | Complex |

### 12.2 Loading Screen Pattern

```
1. Mount App
2. Show LoadingScreen (isVisible=true)
3. Simulate progress (0→100%)
4. Trigger onComplete callback
5. Remove LoadingScreen
6. Render main interface
7. (Optional) Show overlay loading for page transitions
```

### 12.3 Page Transition Pattern

```typescript
// Smooth scroll to top
window.scrollTo({ top: 0, behavior: 'smooth' })

// Change page state
setCurrentPage(newPage)

// Optional: Fade out old content → update → fade in new
```

### 12.4 Context/State Pattern

**Valkyr:**
```typescript
<PortfolioProvider>
  {/* App content with portfolio context available */}
</PortfolioProvider>
```

**Genesis:**
```typescript
<BrowserRouter>
  <SolanaProvider>
    <AppProvider>
      <LoadingProvider>
        {/* Routes + loading state */}
      </LoadingProvider>
    </AppProvider>
  </SolanaProvider>
</BrowserRouter>
```

**Abraxas:**
```typescript
// Audio loop integration
const [showIntroModal, setShowIntroModal] = useState(false)

useEffect(() => {
  if (connected && showIntroModal) {
    introAmbientRef.current?.play()
  }
}, [connected, showIntroModal])

// Background image cycling
const [backgroundIndex, setBackgroundIndex] = useState(0)

const onBackgroundError = () => {
  if (backgroundIndex < candidates.length - 1) {
    setBackgroundIndex(prev => prev + 1)
  }
}
```

### 12.5 Component Composition Pattern

```typescript
// Each page/section typically follows:
1. Background Effects (Particles, Light Beams)
2. Header/Navigation
3. Hero Section (with animations)
4. Content Sections (with cards, panels)
5. Footer
6. Mobile-specific navigation (Bottom Nav, Menu)
```

### 12.6 Mobile Responsive Pattern

```typescript
// Valkyr/Raido use:
- Tailwind breakpoints: sm: (640px), md: (768px), lg: (1024px)
- Scaled components: scale-125 md:scale-150
- Hidden/shown elements: hidden md:flex
- Font sizes: text-lg md:text-2xl lg:text-4xl
- Spacing: px-4 md:px-8, py-8 md:py-12

// Bottom navigation for mobile-only
{currentPage !== 'landing' && (
  <BottomNav activeTab={currentPage} onNavigate={handleNavigate} />
)}

// Mobile menu toggle in header
{currentPage !== 'landing' && (
  <button className="md:hidden">
    {mobileMenuOpen ? <X /> : <Menu />}
  </button>
)}
```

---

## 13. PERFORMANCE & OPTIMIZATION

### 13.1 Code Splitting
- Each dApp uses Vite's lazy loading for routes
- Dynamic imports for heavy components

### 13.2 Asset Optimization
- Public/assets folder for images
- Next.js Image optimization (Raido/Valkyr use standard tags)
- Lucide icons (0.4-0.5MB library)

### 13.3 Animation Performance
- CSS animations (GPU accelerated)
- clip-path and transform preferred over width/height change
- Particle animations use CSS not JS loops
- Scanlines/grid effects use background-image not render

### 13.4 Bundle Optimization
| Feature | Impact |
|---------|--------|
| Tree-shaking | ✓ ESM modules |
| CSS purging | ✓ Tailwind in build |
| Minification | ✓ Vite build mode |
| Source maps | ✗ Disabled in build |

---

## 14. DEVELOPMENT WORKFLOW

### 14.1 Development Commands

```bash
# All dApps
npm run dev           # Start Vite dev server (port 3000)
npm run build         # Build for production
npm run preview       # Preview production build

# Genesis/Abraxas
npm run lint          # Run ESLint
npm run android:sync  # Sync to Capacitor

# Abraxas only
npm run android:apk   # Build debug APK
```

### 14.2 Environment Setup

```bash
# Node version: 18+ (for all projects)
# Package managers: npm, yarn, pnpm

# Key dependencies to install:
- React 18/19
- Vite 5-7
- Tailwind CSS 3-4
- React Router (Genesis/Abraxas)
- Solana web3.js (Abraxas/Genesis/Raido)
- Anchor (Abraxas/Genesis)
```

---

## 15. CODE EXAMPLES & SNIPPETS

### 15.1 Reusable Loading Screen Template

```typescript
interface LoadingScreenProps {
  isVisible: boolean
  rune?: string
  title?: string
  onComplete?: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isVisible,
  rune = 'V',
  title = 'INITIALIZING',
  onComplete,
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 300)

    return () => clearInterval(interval)
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-50 
                    flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.05)...',
        backgroundSize: '50px 50px',
        animation: 'grid-move 20s linear infinite',
      }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Rotating rings with center rune */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 
                          border-r-purple-500 rounded-full animate-spin"
               style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-black text-gold animate-pulse"
                 style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.8)' }}>
              {rune}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-[0.2em] uppercase text-cyan-300 mb-4">
            {title}
          </h1>
          <p className="text-sm font-mono text-slate-300 tracking-wider">
            STRATEGIC OVERSIGHT SYSTEM
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 p-1 rounded-lg border border-cyan-400/40 overflow-hidden">
          <div className="h-2 bg-slate-800 rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-gold
                            transition-all duration-300"
                 style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Percentage */}
        <p className="text-sm font-mono text-cyan-300/80">
          {Math.floor(progress)}%
        </p>
      </div>

      <style>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  )
}
```

### 15.2 Reusable Particle Background

```typescript
interface ParticleBackgroundProps {
  count?: number
  speed?: number
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 20,
  speed = 15,
}) => {
  const [particles, setParticles] = useState<Array<{
    id: string
    x: number
    y: number
    size: number
    opacity: number
    duration: number
    delay: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-cyan-400 rounded-full blur-0.5"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
```

### 15.3 Reusable Light Beam Component

```typescript
interface LightBeamProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  angle?: number  // degrees
  color?: 'cyan' | 'gold' | 'purple' | 'orange'
}

export const LightBeam: React.FC<LightBeamProps> = ({
  position = 'top-left',
  angle = 45,
  color = 'cyan',
}) => {
  const colorMap = {
    cyan: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent)',
    gold: 'linear-gradient(90deg, transparent, rgba(249, 204, 117, 0.3), transparent)',
    purple: 'linear-gradient(90deg, transparent, rgba(153, 69, 255, 0.3), transparent)',
    orange: 'linear-gradient(90deg, transparent, rgba(234, 88, 12, 0.2), transparent)',
  }

  const positionMap = {
    'top-left': { top: '10%', left: '5%' },
    'top-right': { top: '10%', right: '5%' },
    'bottom-left': { bottom: '10%', left: '5%' },
    'bottom-right': { bottom: '10%', right: '5%' },
  }

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        ...positionMap[position],
        width: '400px',
        height: '2px',
        background: colorMap[color],
        filter: 'blur(1px)',
        transform: `rotate(${angle}deg)`,
        opacity: 0.6,
      }}
    />
  )
}
```

### 15.4 Glitch Text Effect

```typescript
interface GlitchTextProps {
  text: string
  className?: string
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main text */}
      <div className="text-gold animate-pulse" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.8)' }}>
        {text}
      </div>

      {/* Glitch layers */}
      <div className="absolute inset-0 text-transparent animate-glitch" 
           style={{ textShadow: '3px 0 0 rgba(168, 85, 247, 0.7), -3px 0 0 rgba(6, 182, 212, 0.7)' }}>
        {text}
      </div>

      <style>{`
        @keyframes glitch-effect {
          0%, 100% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(0.5em 0 0.25em 0); }
          40% { clip-path: inset(0.25em 0 0.5em 0); }
          60% { clip-path: inset(0.75em 0 0.1em 0); }
          80% { clip-path: inset(0.1em 0 0.8em 0); }
        }
        
        .animate-glitch {
          animation: glitch-effect 0.3s infinite;
        }
      `}</style>
    </div>
  )
}
```

---

## 16. SUMMARY TABLE: QUICK REFERENCE

| Aspect | Abraxas | Genesis | Valkyr | Raido |
|--------|---------|---------|--------|-------|
| **Purpose** | Master protocol | Asset tokenization | Portfolio management | Liquidity hunting |
| **Navigation** | Router + runes (8) | Router (4 routes) | State (2 pages) | State (5 pages) |
| **Loading Screen** | Custom (loading page) | Generic overlay | Valkyr pattern | RaidhoLoadingScreen |
| **Landing Page** | Mobile-first | Context-based | Hero + animations | Hero + info section |
| **Color Scheme** | Slate + custom | Charcoal + neon | Cyan/gold | Deep blue + gold |
| **Font Family** | Various | Space Grotesk + JPM | Space Grotesk + IBM | Inter + JetBrains |
| **Tailwind Config** | ✗ Custom | ✓ Full | ✓ Full | ✓ Full |
| **Particles** | Minimal | Minimal | 20 points | Customizable |
| **Light Beams** | Minimal | Minimal | 4 beams | 3 beams |
| **Mobile Support** | Capacitor Android | Capacitor Android | Responsive | Responsive |
| **Rune Symbols** | 8 navigation runes | None | V + Protect rune | ᚱ + navigation |
| **Typing Animation** | None | None | TypingText comp | useTypingEffect hook |
| **Audio** | Intro ambient loop | None | None | None |
| **Deployed** | Complex shell | Protected routes | Vercel-ready | Vercel-ready |

---

## 17. DEPLOYMENT & PRODUCTION

### 17.1 Vercel Configuration

**vercel.json** (All dApps):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### 17.2 Environment Variables

**Typical .env files:**
```bash
# Solana network
VITE_SOLANA_NETWORK=mainnet-beta

# RPC endpoints
VITE_RPC_ENDPOINT=https://api.mainnet-beta.solana.com

# Wallet configuration
VITE_WALLET_TYPES=phantom,solflare

# Optional API keys
VITE_API_KEY=xxx
```

### 17.3 Build Output

```bash
npm run build

# Output folder: dist/
# Contents:
#   - index.html (entry point)
#   - assets/
#     - [hash].js (bundled JS)
#     - [hash].css (bundled CSS)
#     - [hash-img].png (optimized images)
```

---

## 18. ACCESSIBILITY & UX PATTERNS

### 18.1 Contrast
- Gold (#f9cc75) on black - AAA compliant
- Cyan (#06b6d4) on black - AAA compliant
- Purple (#9945ff) on black - AA compliant

### 18.2 Focus States
```css
:focus-visible {
  outline: 2px solid rgba(212, 175, 55, 0.6);
  outline-offset: 2px;
}
```

### 18.3 Motion Accessibility
- All animations use standard 3-6 second loops
- No audio autoplay (Abraxas uses user-triggered audio)
- Smooth scrolling enabled (scroll-behavior: smooth)

---

## 19. FUTURE ENHANCEMENTS & PATTERNS

### Ideas for Extension:
1. **Dark mode toggle** - Already hardcoded dark, could add light theme
2. **Accessibility menu** - Reduce motion, increase contrast options
3. **Rune lore wiki** - Explain each rune's meaning in esoteric context
4. **Custom particle colors** - Let users choose glow colors
5. **Achievement system** - Rune-based rewards/badges
6. **Sound effects** - Subtle esoteric audio on interactions
7. **WebGL background** - Advanced 3D rune animations
8. **NFT backgrounds** - User-configurable header images

---

## 20. CONCLUSION & DESIGN PHILOSOPHY

The Abraxas ecosystem demonstrates a cohesive design philosophy:

1. **Mystical Branding** - Runes, glyphs, esoteric color schemes
2. **Performance Focus** - CSS animations, lazy loading, optimized builds
3. **Mobile-First** - Responsive design + Capacitor for native mobile
4. **Narrative Integration** - Typing animations, system messages, lore
5. **Accessibility** - Proper contrast, focus states, semantic HTML
6. **Scalability** - Modular components, context providers, hooks
7. **Solana Integration** - Wallet adapters, Anchor programs, Web3 integration

The use of Valkyr and Raido as templates allows rapid prototyping of new dApps while maintaining visual cohesion.

---

**End of Analysis**

Generated: April 1, 2026  
Repositories Analyzed: 4  
Total Components: 72+  
Configuration Files: 20+  
CSS Keyframes: 15+
