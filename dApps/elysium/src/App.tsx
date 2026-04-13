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

// Featured artwork gallery data
const FEATURED_ARTWORKS = [
  {
    id: 'monet-water-lilies',
    title: 'Water Lilies (Series)',
    artist: 'Claude Monet',
    year: '1906',
    period: 'Impressionism',
    value: '$54M',
    lastSale: '$43.7M (2018)',
    condition: 'Excellent',
    provenance: 'Private European Collection',
    exhibitions: '47 major exhibitions',
    icon: '🎨',
  },
  {
    id: 'van-gogh-starry',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: '1889',
    period: 'Post-Impressionism',
    value: '$2B+',
    lastSale: 'Unverified ownership',
    condition: 'Museum condition',
    provenance: 'Museum of Modern Art (NY)',
    exhibitions: '200+ exhibitions',
    icon: '✨',
  },
  {
    id: 'picasso-guernica-study',
    title: 'Guernica Study (No. 3)',
    artist: 'Pablo Picasso',
    year: '1937',
    period: 'Modernism',
    value: '$38M',
    lastSale: '$32.5M (2019)',
    condition: 'Very Good',
    provenance: 'Spanish Royal Collection',
    exhibitions: '89 exhibitions',
    icon: '🖼️',
  },
  {
    id: 'kandinsky-composition',
    title: 'Composition VIII',
    artist: 'Wassily Kandinsky',
    year: '1923',
    period: 'Abstraction',
    value: '$22M',
    lastSale: '$20.9M (2017)',
    condition: 'Fine',
    provenance: 'Swiss Private Collection',
    exhibitions: '76 exhibitions',
    icon: '🎨',
  },
  {
    id: 'basquiat-skull',
    title: 'Untitled (Skull Painting)',
    artist: 'Jean-Michel Basquiat',
    year: '1982',
    period: 'Contemporary',
    value: '$110M',
    lastSale: '$110.5M (2017)',
    condition: 'Excellent',
    provenance: 'Japanese Private Collector',
    exhibitions: '120+ exhibitions',
    icon: '💀',
  },
  {
    id: 'warhol-marilyn',
    title: 'Marilyn Diptych (Variant)',
    artist: 'Andy Warhol',
    year: '1962',
    period: 'Pop Art',
    value: '$85M',
    lastSale: '$80.4M (2016)',
    condition: 'Excellent',
    provenance: 'American Collector Estate',
    exhibitions: '95 exhibitions',
    icon: '✨',
  },
]

export default function App() {
  const [displayedText, setDisplayedText] = React.useState('')
  const [selectedArt, setSelectedArt] = useState<string | null>(null)
  const fullText = 'Elysium — Timeless Art, Tokenized'

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
            <span className="text-7xl drop-shadow-[0_0_30px_rgba(153,69,255,0.8)]">🎨</span>
          </div>
        </div>

        {/* Typing Reveal Headline */}
        <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-widest uppercase text-center mb-4 h-20 flex items-center" style={{ color: '#9945ff' }}>
          {displayedText}
          {displayedText.length < fullText.length && <span className="animate-pulse ml-2">▊</span>}
        </h1>

        {/* Subheadlines */}
        <p className="text-2xl font-semibold font-mono tracking-wider uppercase text-center mb-4 animate-fade-in" style={{ animationDelay: '2s', color: '#c084fc' }}>
          Elysium — Daughter of Sophia
        </p>
        <p className="text-lg font-mono tracking-wider uppercase text-center max-w-2xl animate-fade-in" style={{ animationDelay: '2.4s', color: '#9d75d9' }}>
          Fractional ownership of fine art, rare collectibles, and cultural masterpieces
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex gap-4 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '2.8s' }}>
          <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-8 py-4 rounded-lg border transition" style={{ borderColor: 'rgba(153, 69, 255, 0.5)', backgroundColor: 'rgba(153, 69, 255, 0.15)', color: '#c084fc', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 30px rgba(153, 69, 255, 0.4)')} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}>
            View Gallery
          </button>
          <button className="px-8 py-4 rounded-lg border transition" style={{ borderColor: 'rgba(153, 69, 255, 0.3)', backgroundColor: 'rgba(50, 29, 80, 0.3)', color: '#9d75d9', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(153, 69, 255, 0.6)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(153, 69, 255, 0.3)')}>
            Begin Tokenization
          </button>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-12 text-center" style={{ color: '#9945ff' }}>⚙️ ELYSIUM_CAPABILITIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🖼️',
                title: 'One-Click Tokenization',
                desc: 'Upload artwork images & provenance, mint La Casa NFT, auto-route to Sophia Vault in minutes',
              },
              {
                icon: '🧠',
                title: 'King AI Valuation',
                desc: 'Real-time appraisals, provenance verification, market comparables, condition assessment',
              },
              {
                icon: '📊',
                title: 'Auction Floor Trading',
                desc: 'Secondary market for fractional art equity with price discovery and market history',
              },
              {
                icon: '⚙️',
                title: 'Raido + Tide Ecosystem',
                desc: 'Trade art equity on Raido, de-risk via Tide stable arbitrage protocols',
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

      {/* Featured Artwork Gallery */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-12 text-center" style={{ color: '#9945ff' }}>🎨 GALLERY_ELYSIUM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_ARTWORKS.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArt(art.id)}
                className="art-card rounded-lg border p-6 transition cursor-pointer"
                style={{ borderColor: 'rgba(153, 69, 255, 0.2)', backgroundColor: 'rgba(153, 69, 255, 0.08)' }}
              >
                {/* Art Thumbnail */}
                <div className="art-thumbnail mb-4" style={{ backgroundColor: 'rgba(153, 69, 255, 0.08)', borderColor: 'rgba(153, 69, 255, 0.2)' }}>
                  {art.icon}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs" style={{ color: '#7d5aab' }}>ARTWORK</p>
                    <h3 className="font-bold text-base" style={{ color: '#c084fc' }}>{art.title}</h3>
                    <p className="text-xs mt-1" style={{ color: '#9d75d9' }}>{art.artist} • {art.year}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[10px]" style={{ color: '#7d5aab' }}>CURRENT VALUE</p>
                      <p className="font-bold" style={{ color: '#c084fc' }}>{art.value}</p>
                    </div>
                    <div>
                      <p className="text-[10px]" style={{ color: '#7d5aab' }}>LAST SALE</p>
                      <p className="font-bold text-xs" style={{ color: '#c084fc' }}>{art.lastSale}</p>
                    </div>
                    <div>
                      <p className="text-[10px]" style={{ color: '#7d5aub' }}>CONDITION</p>
                      <p className="font-bold" style={{ color: '#c084fc' }}>{art.condition}</p>
                    </div>
                    <div>
                      <p className="text-[10px]" style={{ color: '#7d5aub' }}>EXHIBITIONS</p>
                      <p className="font-bold" style={{ color: '#c084fc' }}>{art.exhibitions}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t" style={{ borderColor: 'rgba(153, 69, 255, 0.2)' }}>
                    <p className="text-[10px] mb-2" style={{ color: '#7d5aub' }}>PROVENANCE</p>
                    <p className="text-xs" style={{ color: '#9d75d9' }}>{art.provenance}</p>
                  </div>

                  <button className="w-full px-4 py-2 rounded border text-sm font-bold transition mt-4" style={{ borderColor: 'rgba(153, 69, 255, 0.5)', backgroundColor: 'rgba(153, 69, 255, 0.12)', color: '#c084fc' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.2)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.12)')}>
                    Tokenize This Artwork
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
                label: 'Upload Artwork & Provenance',
                desc: 'High-resolution images, certificates of authenticity, exhibition records, appraisals, chain of title',
              },
              {
                step: '2️⃣',
                label: 'King AI Verification',
                desc: 'Automatic provenance checks, market comparables analysis, condition assessment, rarity scoring',
              },
              {
                step: '3️⃣',
                label: 'Mint La Casa NFT',
                desc: 'On-chain tokenization with immutable artwork metadata, exhibition history, valuation records',
              },
              {
                step: '4️⃣',
                label: 'Deploy Appreciation Yield',
                desc: 'Auto-compound market appreciation gains, exhibition revenue, secondary market fees into Sophia Vault',
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
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-12 text-center" style={{ color: '#9945ff' }}>🖌️ ASSET_CLASSES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🎨', name: 'Old Masters', desc: 'Renaissance to 18th century paintings' },
              { icon: '🖌️', name: 'Modern Art', desc: 'Impressionism to mid-20th century' },
              { icon: '✨', name: 'Contemporary', desc: 'Post-1945 artworks and installations' },
              { icon: '🏛️', name: 'Sculptures', desc: 'Bronze, marble, and monumental works' },
              { icon: '💎', name: 'Collectibles', desc: 'Rare manuscripts, coins, memorabilia' },
              { icon: '🌐', name: 'Digital Art', desc: 'NFT artworks, generative, metaverse' },
            ].map((asset, idx) => (
              <div key={idx} className="rounded-lg border p-4 transition" style={{ borderColor: 'rgba(153, 69, 255, 0.15)', backgroundColor: 'rgba(153, 69, 255, 0.05)' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.1)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(153, 69, 255, 0.05)')}>
                <div className="text-3xl mb-2">{asset.icon}</div>
                <p className="font-bold" style={{ color: '#c084fc' }}>{asset.name}</p>
                <p className="text-xs mt-1" style={{ color: '#7d5aab' }}>{asset.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* King AI Section */}
      <section className="relative py-20 px-4" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-widest uppercase mb-8 text-center" style={{ color: '#9945ff' }}>🧠 KING_AI_PROVENANCE_ENGINE</h2>
          <div className="glow-panel rounded-lg border p-8" style={{ borderColor: 'rgba(153, 69, 255, 0.4)', backgroundColor: 'rgba(153, 69, 255, 0.12)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4" style={{ color: '#9d75d9' }}>King AI analyzes artwork for:</p>
                <ul className="space-y-2 text-sm" style={{ color: '#9d75d9' }}>
                  <li>✓ Provenance chain verification (ownership history)</li>
                  <li>✓ Forgery & authenticity detection</li>
                  <li>✓ Condition assessment & restoration history</li>
                  <li>✓ Market comparable analysis & price trends</li>
                  <li>✓ Exhibition rarity & historical significance</li>
                  <li>✓ Insurance & tax valuation estimates</li>
                </ul>
              </div>
              <div className="rounded border p-4" style={{ borderColor: 'rgba(153, 69, 255, 0.2)', backgroundColor: 'rgba(153, 69, 255, 0.08)' }}>
                <p className="text-xs font-bold mb-3" style={{ color: '#7d5aub' }}>Sample King AI Report</p>
                <div className="space-y-2 text-xs" style={{ color: '#9d75d9' }}>
                  <div className="flex justify-between">
                    <span>Authenticity Score:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Valuation:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>$54.2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-Year Appreciation:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>+$8.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance Value:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>$56.8M</span>
                  </div>
                  <div className="flex justify-between pt-3" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
                    <span>Fractional Shares:</span>
                    <span className="font-bold" style={{ color: '#c084fc' }}>10,000 @ $5,420</span>
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
              <p style={{ color: '#9d75d9' }}>Trade fractional art equity with zero friction. Deep liquidity pools, maker rewards, and market-making algorithms.</p>
            </div>
            <div className="glow-panel rounded-lg border p-8" style={{ borderColor: 'rgba(153, 69, 255, 0.3)', backgroundColor: 'rgba(153, 69, 255, 0.1)' }}>
              <div className="text-4xl mb-3">🌊</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#c084fc' }}>Tide Arbitrage</h3>
              <p style={{ color: '#9d75d9' }}>De-risk fractional art positions. Cross-protocol liquidity matching and delta-neutral strategies.</p>
            </div>
            <div className="glow-panel rounded-lg border p-8" style={{ borderColor: 'rgba(153, 69, 255, 0.3)', backgroundColor: 'rgba(153, 69, 255, 0.1)' }}>
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#c084fc' }}>Sophia Vault</h3>
              <p style={{ color: '#9d75d9' }}>Auto-compound exhibition revenue and appreciation. Institutional custody with algorithmic rebalancing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-20 px-4 text-center" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg mb-6 font-mono" style={{ color: '#9d75d9' }}>Discover masterpieces. Own fractions. Earn yields. Preserve culture.</p>
          <button className="px-12 py-4 rounded-lg border transition text-lg" style={{ borderColor: 'rgba(153, 69, 255, 0.6)', backgroundColor: 'rgba(153, 69, 255, 0.2)', color: '#c084fc', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 40px rgba(153, 69, 255, 0.5)')} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}>
            Tokenize Your First Artwork
          </button>
          <p className="text-xs mt-6 uppercase tracking-widest" style={{ color: '#7d5aub' }}>Available on desktop & mobile | Beginner-friendly interface | Museum-grade security</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 px-4 text-center" style={{ borderTop: '1px solid rgba(153, 69, 255, 0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono" style={{ color: '#7d5aub' }}>Elysium — Fine Art & Collectibles | Powered by Abraxas & Sophia Protocol</p>
          <div className="flex justify-center gap-4 mt-4 text-xs" style={{ color: '#7d5aub' }}>
            <a href="#" className="hover:opacity-80">Documentation</a>
            <span>•</span>
            <a href="#" className="hover:opacity-80">Security & Authentication</a>
            <span>•</span>
            <a href="#" className="hover:opacity-80">Community</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
