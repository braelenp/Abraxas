import React, { useMemo, useState } from 'react'

// Seeded random for consistent particle placement
function seededRand(n: number): number {
  const x = Math.sin(n + 1.618) * 43758.5453
  return x - Math.floor(x)
}

function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        size: seededRand(i * 5) * 4 + 1,
        left: seededRand(i * 5 + 1) * 100,
        top: seededRand(i * 5 + 2) * 100,
        dur: seededRand(i * 5 + 3) * 15 + 8,
        delay: seededRand(i * 5 + 4) * 8,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Featured wine/spirits collection data
const FEATURED_BOTTLES = [
  {
    id: 'hennessy-1947',
    name: 'Hennessy Paradis Impérial',
    type: 'Fine Cognac',
    year: '1947',
    producer: 'Hennessy, France',
    vintage: 'Pre-War Blend',
    value: '$12.4M',
    lastSale: '$11.8M (2022)',
    condition: 'Museum Condition',
    provenance: 'Private French Estate',
    rarity: 'Only 3 bottles known',
    icon: '🥃',
  },
  {
    id: 'macallan-1945',
    name: 'The Macallan 1945',
    type: 'Single Malt Scotch',
    year: '1945',
    producer: 'Macallan, Scotland',
    vintage: 'Victory Edition',
    value: '$1.9M',
    lastSale: '$1.85M (2021)',
    condition: 'Excellent',
    provenance: 'Scottish Collector',
    rarity: 'Only 6 bottled',
    icon: '🥃',
  },
  {
    id: 'chateau-lafite-1787',
    name: 'Château Lafite Rothschild 1787',
    type: 'Grand Cru Bordeaux',
    year: '1787',
    producer: 'Lafite, France',
    vintage: 'Historic Vintage',
    value: '$847K',
    lastSale: '$800K (2019)',
    condition: 'Exceptional',
    provenance: 'European Private Collection',
    rarity: 'One of rarest vintages',
    icon: '🍷',
  },
  {
    id: 'dalmore-62',
    name: 'Dalmore 62 Years Old',
    type: 'Highland Single Malt',
    year: '1962',
    producer: 'Dalmore, Scotland',
    vintage: 'Golden Anniversary',
    value: '$3.2M',
    lastSale: '$3.1M (2020)',
    condition: 'Perfect',
    provenance: 'Luxe Spirits Collector',
    rarity: 'Ultra-premium release',
    icon: '🥃',
  },
  {
    id: 'romanee-conti-1947',
    name: 'Romanée-Conti 1947',
    type: 'Burgundy Grand Cru',
    year: '1947',
    producer: 'DRC, France',
    vintage: 'Post-War Masterpiece',
    value: '$759K',
    lastSale: '$720K (2018)',
    condition: 'Excellent',
    provenance: 'Geneva Private Vault',
    rarity: 'Legendary vintage',
    icon: '🍷',
  },
  {
    id: 'pappy-23',
    name: 'Pappy Van Winkle 23 Yr',
    type: 'Kentucky Bourbon',
    year: 'Established Blend',
    producer: 'Buffalo Trace, USA',
    vintage: 'Cult Collector Item',
    value: '$18.5K',
    lastSale: '$16.2K (2023)',
    condition: 'Sealed',
    provenance: 'USA Collector Reserve',
    rarity: 'Limited allocation',
    icon: '🥃',
  },
]

export default function App() {
  const [displayedText, setDisplayedText] = React.useState('')
  const [selectedBottle, setSelectedBottle] = useState<string | null>(null)
  const fullText = 'Bacchus — Liquid Assets, Tokenized'

  React.useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, ++index))
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden scroll-smooth" style={{ backgroundColor: '#050505' }}>
      {/* Animated background gradients with exact Abraxas purple */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ '--tw-from-color': 'rgba(153, 69, 255, 0.2)' } as any} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/15 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s', '--tw-from-color': 'rgba(153, 69, 255, 0.15)' } as any} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-purple-700/10 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s', '--tw-from-color': 'rgba(153, 69, 255, 0.1)' } as any} />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.1)_0px,rgba(148,163,184,0.1)_1px,transparent_2px,transparent_5px)]" />

      {/* Particle field */}
      <ParticleField />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Rune/Icon */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(153, 69, 255, 0.4)' }} />
          <div className="relative z-10 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30 rounded-full p-12">
            <span className="text-7xl drop-shadow-[0_0_30px_rgba(153,69,255,0.8)]">🍷</span>
          </div>
        </div>

        {/* Typing Reveal Headline */}
        <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-widest uppercase text-center mb-4 h-20 flex items-center" style={{ color: '#9945ff' }}>
          {displayedText}
          {displayedText.length < fullText.length && <span className="animate-pulse ml-2">▊</span>}
        </h1>

        {/* Subheadlines */}
        <p className="text-2xl font-semibold font-mono tracking-wider uppercase text-center mb-4 animate-fade-in" style={{ animationDelay: '2s', color: '#c084fc' }}>
          Bacchus — Daughter of Sophia
        </p>
        <p className="text-lg font-mono tracking-wider uppercase text-center max-w-2xl animate-fade-in" style={{ animationDelay: '2.4s', color: '#9d75d9' }}>
          Fractional ownership of fine wine, rare whiskies, and collectible spirits
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex gap-4 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '2.8s' }}>
          <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-8 py-4 rounded-lg border transition" style={{ borderColor: 'rgba(153, 69, 255, 0.5)', backgroundColor: 'rgba(153, 69, 255, 0.15)', color: '#c084fc', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(153, 69, 255, 0.4)')} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}>
            View Cellar
          </button>
          <button className="px-8 py-4 rounded-lg border transition" style={{ borderColor: 'rgba(153, 69, 255, 0.3)', backgroundColor: 'rgba(50, 29, 80, 0.3)', color: '#9d75d9', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(153, 69, 255, 0.6)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(153, 69, 255, 0.3)')}>
            Tokenize Wine Asset
          </button>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-12 text-center" style={{ color: '#9945ff' }}>⚙️ BACCHUS_CAPABILITIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🍷',
                title: 'Liquid Asset Tokenization',
                desc: 'Upload bottle certs & provenance, mint La Casa NFT, auto-route to Sophia Vault for yield compounding',
              },
              {
                icon: '🧠',
                title: 'King AI Aging Forecasts',
                desc: 'Predictive aging curves, market timing, temperature-storage analysis, appreciation projections',
              },
              {
                icon: '📊',
                title: 'Vintage Trading Floor',
                desc: 'Secondary market for wine equity with live auction pricing and historical valuation data',
              },
              {
                icon: '⚙️',
                title: 'Raido + Tide Ecosystem',
                desc: 'Trade spirit fractions on Raido, de-risk positions via Tide stable arbitrage protocols',
              },
            ].map((feature, idx) => (
              <div key={idx} className="glow-panel rounded-lg border p-6 hover:border-opacity-100 transition" style={{ borderColor: 'rgba(153, 69, 255, 0.2)', backgroundColor: 'rgba(153, 69, 255, 0.05)' }}>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#c084fc' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: '#9d75d9' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bottles Cellar */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-12 text-center" style={{ color: '#9945ff' }}>🍾 BACCHUS_CELLAR</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_BOTTLES.map((bottle) => (
              <div
                key={bottle.id}
                onClick={() => setSelectedBottle(bottle.id)}
                className="wine-card rounded-lg border p-6 transition cursor-pointer"
                style={{ borderColor: 'rgba(153, 69, 255, 0.2)', backgroundColor: 'rgba(153, 69, 255, 0.08)' }}
              >
                {/* Wine Bottle Icon */}
                <div className="wine-bottle mb-4">
                  {bottle.icon}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs" style={{ color: '#7d5aub' }}>BOTTLE</p>
                    <h3 className="font-bold text-base" style={{ color: '#c084fc' }}>{bottle.name}</h3>
                    <p className="text-xs mt-1" style={{ color: '#9d75d9' }}>{bottle.producer} • {bottle.year}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[10px]" style={{ color: '#7d5aub' }}>VALUATION</p>
                      <p className="font-bold" style={{ color: '#c084fc' }}>{bottle.value}</p>
                    </div>
                    <div>
                      <p className="text-[10px]" style={{ color: '#7d5aub' }}>LAST SALE</p>
                      <p className="font-bold text-xs" style={{ color: '#c084fc' }}>{bottle.lastSale}</p>
                    </div>
                    <div>
                      <p className="text-[10px]" style={{ color: '#7d5aub' }}>CONDITION</p>
                      <p className="font-bold" style={{ color: '#c084fc' }}>{bottle.condition}</p>
                    </div>
                    <div>
                      <p className="text-[10px]" style={{ color: '#7d5aub' }}>RARITY</p>
                      <p className="font-bold text-xs" style={{ color: '#c084fc' }}>{bottle.rarity}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t" style={{ borderColor: 'rgba(153, 69, 255, 0.2)' }}>
                    <p className="text-[10px] mb-2" style={{ color: '#7d5aub' }}>PROVENANCE</p>
                    <p className="text-xs" style={{ color: '#9d75d9' }}>{bottle.provenance}</p>
                  </div>

                  <button className="w-full px-4 py-2 rounded border text-sm font-bold transition mt-4" style={{ borderColor: 'rgba(153, 69, 255, 0.5)', backgroundColor: 'rgba(153, 69, 255, 0.12)', color: '#c084fc' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.2)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.12)')}>
                    Tokenize This Bottle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenization Flow */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-12 text-center" style={{ color: '#9945ff' }}>📊 TOKENIZATION_FLOW</h2>
          <div className="space-y-4">
            {[
              {
                step: '1️⃣',
                label: 'Upload Wine Provenance',
                desc: 'UPC code, certificates of authenticity, storage history, insurance records, appraisals, tasting notes',
              },
              {
                step: '2️⃣',
                label: 'King AI Verification',
                desc: 'Automatic provenance checks, market valuation analysis, aging potential scoring, storage requirements',
              },
              {
                step: '3️⃣',
                label: 'Mint La Casa NFT',
                desc: 'On-chain tokenization with immutable bottle metadata, vintage records, temperature logs, auction history',
              },
              {
                step: '4️⃣',
                label: 'Deploy Appreciation Yield',
                desc: 'Auto-compound market appreciation gains from aging, auction fees, and storage optimization yields',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 rounded-lg border transition" style={{ borderColor: 'rgba(153, 69, 255, 0.2)', backgroundColor: 'rgba(153, 69, 255, 0.05)' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.1)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.05)')}>
                <span className="text-3xl shrink-0">{item.step}</span>
                <div className="flex-1">
                  <p className="font-bold" style={{ color: '#c084fc' }}>{item.label}</p>
                  <p className="text-sm mt-1" style={{ color: '#9d75d9' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Classes */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-12 text-center" style={{ color: '#9945ff' }}>🍾 ASSET_CLASSES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🍷', name: 'Fine Wines', desc: 'Burgundy, Bordeaux, Champagne vintages' },
              { icon: '🥃', name: 'Rare Whiskies', desc: 'Single malts, bourbons, rare expressions' },
              { icon: '🍸', name: 'Premium Spirits', desc: 'Cognac, armagnac, vintage brandies' },
              { icon: '🍺', name: 'Craft Collections', desc: 'Limited editions, micro-distillery reserves' },
              { icon: '🏺', name: 'Vintage Cellars', desc: 'Pre-phylloxera, historical bottles' },
              { icon: '💎', name: 'Investment Lots', desc: 'Curated portfolios with proven ROI' },
            ].map((asset, idx) => (
              <div key={idx} className="rounded-lg border p-4 transition" style={{ borderColor: 'rgba(153, 69, 255, 0.15)', backgroundColor: 'rgba(153, 69, 255, 0.05)' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.1)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.05)')}>
                <div className="text-3xl mb-2">{asset.icon}</div>
                <p className="font-bold" style={{ color: '#c084fc' }}>{asset.name}</p>
                <p className="text-xs mt-1" style={{ color: '#7d5aub' }}>{asset.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* King AI Section */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-8 text-center" style={{ color: '#9945ff' }}>🧠 KING_AI_VINTAGE_ENGINE</h2>
          <div className="glow-panel rounded-lg border p-8" style={{ borderColor: 'rgba(153, 69, 255, 0.4)', backgroundColor: 'rgba(153, 69, 255, 0.12)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4" style={{ color: '#9d75d9' }}>King AI analyzes each bottle for:</p>
                <ul className="space-y-2 text-sm" style={{ color: '#9d75d9' }}>
                  <li>✓ Aging trajectory & peak drinking window</li>
                  <li>✓ Market velocity & price appreciation rates</li>
                  <li>✓ Storage condition optimization & risk factors</li>
                  <li>✓ Provenance authentication & auction history</li>
                  <li>✓ Vintage rarity & collectibility scoring</li>
                  <li>✓ Insurance valuation & liquidity forecasts</li>
                </ul>
              </div>
              <div className="rounded border p-4" style={{ borderColor: 'rgba(153, 69, 255, 0.2)', backgroundColor: 'rgba(153, 69, 255, 0.08)' }}>
                <p className="text-xs font-bold mb-3" style={{ color: '#7d5aub' }}>Sample King AI Report</p>
                <div className="space-y-2 text-xs" style={{ color: '#9d75d9' }}>
                  <div className="flex justify-between">
                    <span>Authenticity Score:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>99.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Valuation:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>$246.5K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-Year Appreciation:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>+$52.3K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Drinking Window:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>2024-2032</span>
                  </div>
                  <div className="flex justify-between pt-3" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
                    <span>Fractional Shares:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>1,000 @ $246.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Integrations */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-12 text-center" style={{ color: '#9945ff' }}>🔗 ECOSYSTEM_PARTNERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glow-panel rounded-lg border p-8" style={{ borderColor: 'rgba(153, 69, 255, 0.3)', backgroundColor: 'rgba(153, 69, 255, 0.1)' }}>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#c084fc' }}>Raido Trading</h3>
              <p style={{ color: '#9d75d9' }}>Trade rare wine & spirit equity with institutional liquidity. Maker rewards for vintage floor providers.</p>
            </div>
            <div className="glow-panel rounded-lg border p-8" style={{ borderColor: 'rgba(153, 69, 255, 0.3)', backgroundColor: 'rgba(153, 69, 255, 0.1)' }}>
              <div className="text-4xl mb-3">🌊</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#c084fc' }}>Tide Arbitrage</h3>
              <p style={{ color: '#9d75d9' }}>De-risk wine holdings across protocols. Cross-protocol liquidity matching for cellars.</p>
            </div>
            <div className="glow-panel rounded-lg border p-8" style={{ borderColor: 'rgba(153, 69, 255, 0.3)', backgroundColor: 'rgba(153, 69, 255, 0.1)' }}>
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#c084fc' }}>Sophia Vault</h3>
              <p style={{ color: '#9d75d9' }}>Auto-compound aging yields & appreciation. Institutional-grade storage & insurance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-20 px-4 text-center" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg mb-6 font-mono" style={{ color: '#9d75d9' }}>Taste timeless excellence. Own fractions. Harvest yields. Preserve craft.</p>
          <button className="px-12 py-4 rounded-lg border transition text-lg" style={{ borderColor: 'rgba(153, 69, 255, 0.6)', backgroundColor: 'rgba(153, 69, 255, 0.2)', color: '#c084fc', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 40px rgba(153, 69, 255, 0.5)')} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}>
            Tokenize Your First Bottle
          </button>
          <p className="text-xs mt-6 uppercase tracking-widest" style={{ color: '#7d5aub' }}>Available on desktop & mobile | Sommelier-grade security | Collector-friendly experience</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 px-4 text-center" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono" style={{ color: '#7d5aub' }}>Bacchus — Fine Wine & Rare Spirits | Powered by Abraxas & Sophia Protocol</p>
          <div className="flex justify-center gap-4 mt-4 text-xs" style={{ color: '#7d5aub' }}>
            <a href="#" className="hover:opacity-80">Documentation</a>
            <span>•</span>
            <a href="#" className="hover:opacity-80">Storage & Insurance</a>
            <span>•</span>
            <a href="#" className="hover:opacity-80">Sommelier Community</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
