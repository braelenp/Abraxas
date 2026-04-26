# Abraxas & Raido Repository Analysis

**Last Updated**: April 1, 2026
**Analysis Date**: Comprehensive extraction from braelenp/Abraxas and braelenp/Raido repositories

---

## 1. ABRAXAS BUTTON STYLING

### Button Base Styles (`.ui-action`)
```css
.ui-action {
  transition: transform 140ms ease, box-shadow 180ms ease, filter 180ms ease, background-color 180ms ease;
}

.ui-action:hover {
  filter: brightness(1.06);
  transform: translateY(-1px);
  box-shadow:
    0 0 18px rgba(34, 211, 238, 0.28),
    0 0 12px rgba(251, 191, 36, 0.2);
}

.ui-action:active {
  transform: scale(0.98);
  filter: brightness(1.01);
}

.ui-action:focus-visible {
  outline: 2px solid rgba(103, 232, 249, 0.65);
  outline-offset: 2px;
}

.ui-action:disabled,
.ui-action[aria-disabled='true'] {
  transform: none;
  filter: none;
  box-shadow: none;
}
```

### Wallet Button Styling
```css
.landing-wallet-button {
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  display: flex !important;
  justify-content: center !important;
}

.dapp-header-wallet .wallet-adapter-button {
  height: 2rem !important;
  min-width: 0 !important;
  max-width: 8.75rem !important;
  padding: 0 0.5rem !important;
  border-radius: 0.75rem !important;
  font-size: 11px !important;
  line-height: 1 !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dapp-header-wallet .wallet-adapter-button-start-icon,
.dapp-header-wallet .wallet-adapter-button-start-icon img {
  width: 0.9rem;
  height: 0.9rem;
  margin-right: 0.4rem;
}
```

### Button Color Scheme
- **Primary Gold**: `#fbbf24` (with text-shadow glow)
- **Secondary Cyan**: `#06b6d4` (for accent states)
- **Tertiary Purple**: `#9945ff`
- **Shadow Gold**: `rgba(251, 191, 36, 0.2)`
- **Shadow Cyan**: `rgba(34, 211, 238, 0.28)`

### Hover/Active States
- **Hover**: Brightness +6%, upward translate (-1px), gold+cyan glow shadow
- **Active**: Scale to 98%, brightness +1%
- **Focus**: 2px cyan outline with 2px offset
- **Disabled**: No transform, no filter, no shadow

### Text Styling
- Font: `IBM Plex Mono` (monospace) or `Space Grotesk`
- Size: `11px` for buttons
- Weight: `500-700` (semi-bold to bold)
- Tracking: `0.05em` to `0.18em` (increased letter-spacing)
- Text Transform: `uppercase`

---

## 2. ABRAXAS NAVIGATION/TABS

### 8-Rune Navigation Wheel
Located in `/app/src/App.tsx`:
```typescript
const navItems = [
  { to: '/app',         label: 'Forge',   rune: 'ᚲ' },    // Kennaz - Crafting/Forge
  { to: '/app/vaults',  label: 'Sophia',  rune: 'ᚨ' },    // Ansuz - Wisdom
  { to: '/app/market',  label: 'Horizon', rune: 'ᛋ' },    // Sowilo - Sun/Horizon
  { to: '/app/cadabra', label: 'Mirror',  rune: '✦' },    // Custom - Mirror/Balance
  { to: '/app/trade',   label: 'Flux',    rune: 'ᛚ' },    // Laguz - Liquidity/Flux
  { to: '/app/orion',   label: 'King',    rune: 'ᛏ' },    // Tiwaz - Kingship
  { to: '/app/circuit', label: 'Aegis',   rune: 'ᚦ' },    // Thurisaz - Gate/Protection
  { to: '/app/warden',  label: 'Warden',  rune: 'ᛉ' },    // Algiz - Divine Protection
];
```

### Tab Active State Styling
```css
.glow-panel {
  position: relative;
  border-color: rgba(103, 232, 249, 0.5) !important;
  box-shadow:
    inset 0 0 0 1px rgba(103, 232, 249, 0.2),
    inset 0 0 0 2px rgba(251, 191, 36, 0.07),
    0 0 0 1px rgba(103, 232, 249, 0.2),
    0 0 34px rgba(34, 211, 238, 0.24),
    0 0 22px rgba(251, 191, 36, 0.14);
}

.glow-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(140deg, rgba(34, 211, 238, 0.24), rgba(251, 191, 36, 0.14) 28%, transparent 52%, rgba(96, 165, 250, 0.24));
  opacity: 0.72;
  mix-blend-mode: screen;
}
```

### Tab Hover Effects
- **Opacity**: 50% default → 75% hover → 100% active
- **Color Shift**: Cyan glow increases on hover
- **Transition**: 300ms ease-in-out
- **Border**: Animated gradient border with blend-mode

### Colors Used
- **Active Tab Border**: `rgba(103, 232, 249, 0.5)` (cyan)
- **Active Tab Glow**: Cyan `#22d3ee` and Gold `#fbbf24` mixed
- **Inactive Tab**: 50% opacity
- **Hover Tab**: 75% opacity

---

## 3. ABRAXAS FOOTER LINKING BACK

### AbraxasFooter Component (Found in Raido)
**Location**: `/tmp/Raido/src/components/AbraxasFooter.tsx`

```typescript
export const AbraxasFooter: React.FC = () => {
  return (
    <div className="mt-12 pt-12 border-t border-raido-deep-blue/30">
      {/* Abraxas Connection Section */}
      <div className="bg-gradient-to-r from-raido-deep-blue/20 to-raido-gold/5 rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-raido-gold mb-2">
              Connected to the Source
            </h3>
            <p className="text-gray-300 mb-4">
              Raido flows from Abraxas — the primordial source of all Daughters. 
              Return to the originating consciousness.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://abraxas-tokenization-engine.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-raido-gold to-raido-gold-light 
                           text-raido-deep-blue font-bold rounded-lg 
                           hover:shadow-lg hover:shadow-raido-gold/50 transition-all duration-300"
              >
                ◆ Visit Abraxas
              </a>
              <a
                href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-raido-cyan to-raido-cyan-light 
                           text-raido-deep-blue font-bold rounded-lg 
                           hover:shadow-lg hover:shadow-raido-cyan/50 transition-all duration-300"
              >
                💰 Buy $ABRA
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 hidden md:block">
            <div className="text-6xl font-bold text-raido-gold/20">◆</div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-center text-gray-400 text-sm">
        Raido serves the Abraxas ecosystem. Together, we flow.
      </p>
    </div>
  );
};
```

### Footer Structure
- **Heading**: "Connected to the Source" (text-2xl, bold, gold)
- **Subtitle**: Explains relationship between Raido and Abraxas
- **Buttons**:
  1. "◆ Visit Abraxas" - Gold gradient button → `https://abraxas-tokenization-engine.vercel.app/`
  2. "💰 Buy $ABRA" - Cyan gradient button → Bags FM link
- **Styling**: Border-top, gradient background, backdrop blur
- **Visual Element**: Large gold diamond symbol (◆) on desktop
- **Closing Line**: "Raido serves the Abraxas ecosystem. Together, we flow."

### Call-to-Action Language
- "Connected to the Source" - Establishes the connection
- "primordial source of all Daughters" - Explains Abraxas' role
- "Return to the originating consciousness" - Philosophical framing
- "Raido flows from Abraxas" - Describes relationship hierarchy

---

## 4. RAIDO TAB NAVIGATION - COMPLETE CODE

### BottomNav Component
**Location**: `/tmp/Raido/src/components/BottomNav.tsx`

```typescript
import React from 'react';
import { Activity, Lock, Zap, Waves, Wind } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Activity, rune: 'ᚲ' },
    { id: 'hunt', name: 'Hunt', icon: Lock, rune: 'ᚱ' },
    { id: 'flow', name: 'Flow', icon: Zap, rune: 'ᛋ' },
    { id: 'market', name: 'Market', icon: Waves, rune: '⇄' },
    { id: 'tidepool', name: 'Tide', icon: Wind, rune: '✦' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-raido-black to-raido-black/80 border-t border-raido-gold/20 backdrop-blur-sm z-50">
      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(212, 165, 55, 0.03) 0px, rgba(212, 165, 55, 0.03) 1px, transparent 1px, transparent 2px)',
        }}
      />

      <div className="relative grid grid-cols-5 gap-0 overflow-x-auto px-2 py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center py-2 px-1 transition-all duration-300 ${
              activeTab === tab.id
                ? 'opacity-100'
                : 'opacity-50 hover:opacity-75'
            }`}
          >
            {/* Glow background for active tab */}
            {activeTab === tab.id && (
              <div 
                className="absolute inset-0 bg-raido-gold/10 rounded-lg"
                style={{
                  boxShadow: 'inset 0 0 12px rgba(212, 165, 55, 0.2)',
                }}
              />
            )}
            
            <div className="relative z-10 flex flex-col items-center gap-1">
              {/* Rune */}
              <span 
                className="text-lg font-black"
                style={{ 
                  color: '#d4af37',
                  textShadow: '0 0 8px rgba(212, 165, 55, 0.6)',
                }}
              >
                {tab.rune}
              </span>
              
              {/* Label */}
              <span 
                className="text-xs font-mono font-bold uppercase tracking-wider"
                style={{ 
                  color: '#d4af37',
                  textShadow: '0 0 4px rgba(212, 165, 55, 0.4)',
                }}
              >
                {tab.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
```

### Tab Navigation Features
- **5-Tab Layout**: Used in grid-cols-5 for desktop
- **Rune Icons**: Each tab has ancient rune symbols
- **Active/Inactive States**:
  - Active: opacity-100 with gold glow
  - Inactive: opacity-50 with hover effect (opacity-75)
- **Glow Effect**: `inset 0 0 12px rgba(212, 165, 55, 0.2)` on active
- **Scanline Overlay**: Subtle horizontal lines for retro feel
- **Responsive**: Fixed bottom position, grid layout
- **Backdrop Blur**: `backdrop-blur-sm` for glassmorphism

### Icon/Rune Assignments
| Tab | Rune | Icon | Symbol | Purpose |
|-----|------|------|--------|---------|
| Dashboard | ᚲ (Kennaz) | Activity | Forge symbol | Main hub |
| Hunt | ᚱ (Raido) | Lock | Journey/Discovery | Opportunity hunting |
| Flow | ᛋ (Sowilo) | Zap | Lightning/Energy | Capital flows |
| Market | ⇄ | Waves | Exchange symbol | Market data |
| Tide | ✦ | Wind | Liquidity pools | Fee sharing |

### Responsive Design
- **Fixed**: `fixed bottom-0 left-0 right-0` stays on bottom
- **Z-Index**: `z-50` above content
- **Colors**: All gold `#d4af37` for consistency
- **Text Shadows**: 2-layer glow on runes and labels
- **Transition**: 300ms smooth transitions

---

## 5. RAIDO DASHBOARD FEATURES

### Dashboard Pages/Sections

#### 1. **Dashboard** (Main Hub)
- **Key Metrics**: 5-column metric display
  - Total Liquidity: `$45.2M`
  - 24h Volume: `$8.5M`
  - Opportunities Found: `247`
  - Active Flows: `12`
  - Average APY: `24.5%`
- **Hot Opportunities**: List of top arbitrage pairs with efficiency scores
- **Recent Activity**: Activity log showing trades and executions
- **Tide Pool Integration**: Fee-sharing visualization
- **Components**: Metric cards, opportunity list, activity log

#### 2. **Hunt** (OpportunitiesScanner)
- Opportunity discovery interface
- Efficiency ratings and volume tracking
- Click-to-view details for opportunities
- Connected to Flow Simulator for execution

#### 3. **Flow** (FlowSimulator)
- **Purpose**: Build and simulate capital flow paths
- **Features**:
  - Multi-step flow creation
  - Asset type selection (SOL, USDC, etc.)
  - Route creation through liquidity pools
  - Simulation with expected returns
  - Save/load saved flows
- **Routes Supported**: Marinade, Jupiter, Orca, Raydium

#### 4. **Market** (MarketFlow)
- Real-time market data display
- Price tracking across DEXes
- Market statistics and trends
- Trading pair monitoring

#### 5. **Tide Pool** (TidePool)
- **Liquidity Pool Management**:
  - Total TVL: `$142.3M`
  - 24h Volume: `$28.5M`
  - Active Pools: `47`
  - Average APY: `15.2%`
- **Top Pools Display**:
  - SOL/USDC: $12.5M TVL, 8.5% APY
  - RAY/SOL: $8.3M TVL, 12.1% APY
  - BONK/USDC: $5.2M TVL, 24.7% APY
- **Fee Distribution**:
  - Liquidity Providers: 45% ($2.1M)
  - Raido Protocol: 30% ($1.4M)
  - Abraxas Family: 15% ($700K)
  - Growth Fund: 10% ($467K)

### Dashboard Layout Pattern
```typescript
<section className="relative min-h-screen bg-gradient-to-b from-raido-black 
                    via-raido-black to-raido-deep-blue py-16 md:py-24 px-4 md:px-8">
  {/* Scanlines + animated glow backgrounds */}
  {/* Header with title and icon */}
  {/* Key metrics grid */}
  {/* Main content grid (2/3 left, 1/3 right) */}
  {/* Modal for details */}
  {/* Toast notifications */}
  {/* Abraxas footer */}
</section>
```

---

## 6. CADABRA FEATURES & FUNCTIONALITY

### What is Cadabra?
Cadabra is the **social mirror** and collective intelligence layer of the Abraxas ecosystem. It serves as a real-time price discovery and community sentiment aggregation platform.

**Location**: `https://cadabra-eight.vercel.app/` (Separate dApp)
**Integrated in Abraxas**: `/app/cadabra` route

### Core Features

#### 1. **[ALPHA]** - Real-Time Price Discovery
- Cross-asset class price discovery
- RWA (Real-World Asset) market sentiment
- Real-time alpha sourcing before on-chain execution
- Institutional positioning tracking

#### 2. **[KOL_DEALS]** - Follow Smart Capital
- Institutional trader positioning
- Market maker flow visualization
- Verified KOL (Key Opinion Leader) insights
- Insider positioning on breaking opportunities
- Capital concentration tracking

#### 3. **[MEME_TRADING]** - Momentum Detection
- Emerging narrative momentum
- Asset class trend identification
- Protocol adoption signals
- Community sentiment amplification

#### 4. **[COMMUNITY]** - Multi-Asset Discussion
- Athlete equity communities
- Real estate syndication discussions
- Music rights holder networks
- Sports betting groups
- DeFi protocol discussions
- Commodity traders
- Each asset class has dedicated channels

#### 5. **[CONSENSUS]** - Smart Capital Aggregation
- Identification of where smart money congregates
- Market structure derivation from collective intent
- Reversal point identification
- Thesis validation across communities

### Cadabra Page Layout
**Location**: `/tmp/Abraxas/app/src/pages/CadabraPage.tsx`

```typescript
const RUNE_CONFIG = {
  rune: '✦',
  runeName: 'Mirror',
  runeEssence: 'Reflection · Collective Wisdom',
  agentName: 'CADABRA',
  lore: 'Cadabra is the social mirror that reflects the collective intelligence 
         of the ecosystem. Alpha flows here. KOL insights crystallize here. 
         Every asset class—athlete equity, RWA, gaming, music—congregates in 
         real-time discussion. The protocol listens. The Mirror remembers. 
         Price discovery begins where community intent manifests.',
  ctaLabel: 'Enter the Mirror',
  coreGlow: '153, 69, 255',  // Purple
  fireGlow: '168, 85, 247',
  accentClass: 'text-purple-300',
};
```

### Cadabra x Abraxas Integration
- Cadabra sources alpha from community
- Abraxas executes on discovered opportunities
- Feedback loop: Abraxas success validates Cadabra signals
- Unified ecosystem with separate UIs

### Why Cadabra Matters
- **Abraxas = Engine** (Protocol execution)
- **Cadabra = Nervous System** (Collective intelligence)
- Provides real-time FDV signals before markets move
- Validates investment theses through community consensus
- Creates feedback loop for continuous intelligence gathering

---

## 7. COLOR SCHEME BRIGHTNESS COMPARISON

### Raido Color Palette
```javascript
const raido = {
  gold: '#d4af37',           // Medium gold
  'gold-light': '#e6c547',   // Lighter gold
  'deep-blue': '#0a1f3e',    // Very dark blue
  'deep-blue-accent': '#1a3a5c',  // Slightly lighter
  'deep-blue-lighter': '#2a4a7c', // Medium-dark blue
  cyan: '#00ffff',           // Bright neon cyan
  'cyan-subtle': '#00e6e6',  // Slightly less bright
  purple: '#9945ff',         // Medium purple
  black: '#0d0d1a',          // Deep black base
};
```

### Fenrir Current Color Palette (from workspace)
```javascript
// Implied from Fenrir components
const fenrir = {
  black: '#0a0a0a',          // Slightly brighter black
  gold: '#f9cc75',           // Brighter/warmer gold
  cyan: '#06b6d4',           // Less neon, more muted
  purple: '#a855f7',         // Brighter purple
};
```

### Brightness Comparison

| Element | Raido | Fenrir | Brightness |
|---------|-------|--------|------------|
| Gold | #d4af37 (HSL: 45, 58%, 50%) | #f9cc75 (HSL: 44, 97%, 69%) | **Fenrir: +38% brighter** |
| Cyan | #00ffff (HSL: 180, 100%, 50%) | #06b6d4 (HSL: 189, 95%, 44%) | **Raido: +13% brighter (pure neon)** |
| Purple | #9945ff (HSL: 270, 100%, 54%) | #a855f7 (HSL: 268, 87%, 58%) | **Fenrir: +7% brighter** |
| Black | #0d0d1a | #0a0a0a | **Nearly identical** |
| Backgrounds | #0a1f3e-#1a3a5c | Similar | Roughly equal |

### Key Findings

#### Raido vs Fenrir Brightness
1. **Raido: Darker, More Vibrant**
   - Uses more saturated, neon-like colors
   - Gold is muted but cyan is intense neon
   - Background blues are very dark (#0a1f3e)
   - Creates high-contrast, mysterious aesthetic

2. **Fenrir: Brighter, Warmer**
   - Gold is warmer and significantly brighter (+38%)
   - More balanced between colors
   - Could appear "washed out" vs Raido's intensity
   - More forgiving on dark backgrounds

#### Design Impact
- **Raido**: Feels more technical, mysterious, "hacker aesthetic"
- **Fenrir**: Feels more approachable, warm, accessible

### Tips for Making Your Design Brighter Without Losing Esoteric Feel

#### 1. **Increase Gold Luminosity Selectively**
```css
/* Keep a balance */
:root {
  --gold-primary: #e6c547;    /* Raido's light gold */
  --gold-accent: #f9cc75;     /* Fenrir's warm gold */
  --gold-glow: #d4af37;       /* For shadows/secondary */
}
```

#### 2. **Boost Cyan Intelligently**
```css
/* Use bright cyan for CTAs, mute for backgrounds */
.cta-button { color: #00ffff; }        /* Full brightness */
.background-accent { color: #00e6e6; } /* Muted version */
```

#### 3. **Add Luminance to Glows**
```css
.glow-intense {
  box-shadow: 
    0 0 20px rgba(212, 165, 55, 0.8),   /* Raido current */
    0 0 40px rgba(230, 197, 71, 1),     /* Fenrir brighter */
    0 0 60px rgba(249, 204, 117, 0.6);  /* Fenrir warmth */
}
```

#### 4. **Use Gradient Overlays**
```css
/* Add brightness via overlay gradients */
.magic-panel {
  background: linear-gradient(
    135deg,
    rgba(230, 197, 71, 0.1),   /* Brighter gold */
    rgba(0, 255, 255, 0.05)    /* Cyan */
  );
}
```

#### 5. **Increase Opacity Selectively**
```css
/* Raido: More transparent */
.panel { box-shadow: 0 0 20px rgba(212, 165, 55, 0.2); }

/* Fenrir: More opaque for brightness */
.panel { box-shadow: 0 0 20px rgba(249, 204, 117, 0.4); }
```

#### 6. **Add Accent Highlights**
```css
.element::before {
  background: radial-gradient(
    circle,
    rgba(249, 204, 117, 0.3),  /* Bright gold center */
    transparent 70%
  );
}
```

#### 7. **Maintain Dark Backgrounds for Contrast**
- Keep background blacks dark (`#0a0a0a` to `#0d0d1a`)
- This makes brighter gold and cyan POP more
- Contrast is more important than absolute brightness

#### 8. **Use Color Temperature**
```css
/* Raido: Cool gold with blue tints */
--gold: #d4af37;  /* Neutral */

/* Fenrir: Warm gold with orange tints */
--gold: #f9cc75;  /* Warmer, brighter */

/* Compromise: Balanced */
--gold: #e6c547;  /* Raido's light gold - bright but cool */
```

---

## 8. RECOMMENDED IMPLEMENTATION STRATEGY

### Color Set for "Bright Mystical" Aesthetic
```javascript
export const brightMysticalColors = {
  // Brighter base colors
  gold: {
    primary: '#e6c547',      // Raido's light gold
    bright: '#f9cc75',       // Fenrir's bright gold
    dim: '#d4af37',          // For shadows/secondary
  },
  cyan: {
    primary: '#00ffff',      // Full neon
    muted: '#00e6e6',        // Slightly soft
  },
  purple: {
    primary: '#a855f7',      // Fenrir's purple
    muted: '#9945ff',        // Raido's purple
  },
  black: '#0a0a0a',          // Dark base
};
```

### Button Styling (Bright Mystical)
```typescript
className="px-6 py-3 bg-gradient-to-r from-[#e6c547] to-[#f9cc75] 
           text-[#0a0a0a] font-bold rounded-lg
           hover:shadow-[0_0_30px_rgba(230, 197, 71, 0.8)]
           active:shadow-[0_0_50px_rgba(249, 204, 117, 1)]
           transition-all duration-300"
```

---

## VERCEL DEPLOYMENT URLS

| Project | URL | Status |
|---------|-----|--------|
| **Abraxas** | `https://abraxas-tokenization-engine.vercel.app/` | ✅ Live |
| **Cadabra** | `https://cadabra-eight.vercel.app/` | ✅ Live |
| **Raido** | Not explicitly listed | (Check repo) |
| Echo (Music) | `https://echo-pied-phi.vercel.app/` | ✅ Live |
| Aurelia (Real Estate) | `https://aurelia-tau.vercel.app/` | ✅ Live |
| Vein (Minerals) | `https://vein-delta.vercel.app/` | ✅ Live |

---

## KEY TAKEAWAYS

### Abraxas Architecture
- **8-Rune Navigation**: Each section has a rune symbol and lore-based name
- **Router-Based**: Uses React Router for page management
- **Nested Pages**: Pages like Cadabra are routes within the main app
- **Wallet Integration**: Full Solana wallet adapter support
- **Audio**: Ambient background soundtrack support

### Raido Architecture
- **State-Based Navigation**: Simple useState for page management
- **5-Tab Bottom Navigation**: Mobile-first design
- **Embedded Footers**: Links back to Abraxas in each major section
- **Scanline Effects**: Retro scanline overlays throughout
- **Dashboard Focus**: Metrics-first presentation

### Design Philosophy
- **Esoteric + Practical**: Mystical aesthetics with functional data displays
- **Rune-Based Navigation**: Every interface element has a rune connection
- **Color Consistency**: Gold + Cyan + Purple across all projects
- **Glow Effects**: Heavy use of text-shadow and box-shadow for mystique
- **Responsive Design**: Mobile-first with desktop enhancements

