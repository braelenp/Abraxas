import React, { useMemo } from 'react'

// Seeded random for consistent particle placement
function seededRand(n: number): number {
  const x = Math.sin(n + 1.618) * 43758.5453
  return x - Math.floor(x)
}

function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
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

export default function App() {
  const [displayedText, setDisplayedText] = React.useState('')
  const fullText = 'Chronos — Timeless Value, Tokenized'

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
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/15 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-purple-700/10 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.1)_0px,rgba(148,163,184,0.1)_1px,transparent_2px,transparent_5px)]" />

      {/* Particle field */}
      <ParticleField />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Rune/Icon */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(168, 85, 247, 0.4)' }} />
          <div className="relative z-10 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30 rounded-full p-12">
            <span className="text-7xl drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">⌚</span>
          </div>
        </div>

        {/* Typing Reveal Headline */}
        <h1 className="text-5xl md:text-6xl font-bold font-mono text-purple-200 tracking-widest uppercase text-center mb-4 h-20 flex items-center">
          {displayedText}
          {displayedText.length < fullText.length && <span className="animate-pulse ml-2">▊</span>}
        </h1>

        {/* Subheadlines */}
        <p className="text-2xl font-semibold font-mono text-purple-300 tracking-wider uppercase text-center mb-4 animate-fade-in" style={{ animationDelay: '2s' }}>
          Chronos — Daughter of Sophia
        </p>
        <p className="text-lg font-mono text-purple-200/70 tracking-wider uppercase text-center max-w-2xl animate-fade-in" style={{ animationDelay: '2.4s' }}>
          Fractional ownership of rare watches, vintage pieces, and modern masterpieces
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex gap-4 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '2.8s' }}>
          <button className="px-8 py-4 rounded-lg border border-purple-400/50 bg-gradient-to-r from-purple-500/30 to-purple-600/20 text-purple-100 font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition">
            Enter Chronos
          </button>
          <button className="px-8 py-4 rounded-lg border border-purple-300/30 bg-purple-900/20 text-purple-200 font-bold uppercase tracking-wider hover:border-purple-300/60 transition">
            View Details
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-300 tracking-widest uppercase mb-12 text-center">⚙️ CHRONOS_CAPABILITIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '📋',
                title: 'Tokenization Flow',
                desc: 'Upload certificates, mint La Casa NFT, auto-deposit to Sophia Vault',
              },
              {
                icon: '🧠',
                title: 'King AI Valuation',
                desc: 'Real-time appraisals, market comparables, rarity scoring algorithms',
              },
              {
                icon: '📈',
                title: 'Appreciation Tracking',
                desc: 'Historical data, auction results, yield projections for your collection',
              },
              {
                icon: '⚙️',
                title: 'Raido + Tide Integration',
                desc: 'Trade watch equity, de-risk arbitrage, tokenized fractional ownership',
              },
            ].map((feature, idx) => (
              <div key={idx} className="glow-panel rounded-lg border border-purple-400/20 bg-purple-900/10 p-6 hover:border-purple-400/40 transition">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-purple-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-purple-100/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Classes Section */}
      <section className="relative py-20 px-4 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-300 tracking-widest uppercase mb-12 text-center">💎 LUXURY_HOROLOGY</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '⌚', name: 'Rolex Sports', desc: 'Daytona, Submariner, GMT-Master II' },
              { icon: '👑', name: 'Patek Philippe', desc: 'Nautilus, Aquanaut, Annual Calendar' },
              { icon: '⚫', name: 'Audemars Piguet', desc: 'Royal Oak, Royal Oak Offshore' },
              { icon: '🕰️', name: 'Vintage Rare', desc: 'Pre-owned collectible timepieces' },
              { icon: '🎨', name: 'Independent Masters', desc: 'Boutique watchmakers' },
              { icon: '✨', name: 'Limited Editions', desc: 'Numbered pieces & specials' },
            ].map((asset, idx) => (
              <div key={idx} className="rounded-lg border border-purple-400/15 bg-purple-950/30 p-4 hover:bg-purple-950/50 transition">
                <div className="text-3xl mb-2">{asset.icon}</div>
                <p className="font-bold text-purple-200">{asset.name}</p>
                <p className="text-xs text-purple-100/60 mt-1">{asset.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="relative py-20 px-4 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-300 tracking-widest uppercase mb-12 text-center">🔗 ECOSYSTEM_INTEGRATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glow-panel rounded-lg border border-purple-400/30 bg-purple-900/15 p-8">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">Raido Trading Engine</h3>
              <p className="text-purple-100/70">Trade fractional watch equity seamlessly. Liquidity pools for every luxury timepiece. Market-making algorithms optimize your returns.</p>
            </div>
            <div className="glow-panel rounded-lg border border-purple-400/30 bg-purple-900/15 p-8">
              <div className="text-3xl mb-3">🌊</div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">Tide Arbitrage</h3>
              <p className="text-purple-100/70">De-risk positions through arbitrage opportunities. Cross-protocol liquidity matching. Automated delta-neutral strategies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Visualization */}
      <section className="relative py-20 px-4 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-300 tracking-widest uppercase mb-12 text-center">📊 TOKENIZATION_FLOW</h2>
          <div className="space-y-4">
            {[
              { step: '1️⃣', label: 'Upload Documentation', desc: 'Certificates, provenance, appraisals' },
              { step: '2️⃣', label: 'Verify Ownership', desc: 'King AI confirms authenticity & value' },
              { step: '3️⃣', label: 'Mint La Casa NFT', desc: 'On-chain tokenization complete' },
              { step: '4️⃣', label: 'Deploy Yields', desc: 'Auto-compound appreciation & earnings' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 rounded-lg border border-purple-400/20 bg-purple-900/10 hover:bg-purple-900/20 transition">
                <span className="text-3xl shrink-0">{item.step}</span>
                <div>
                  <p className="font-bold text-purple-200">{item.label}</p>
                  <p className="text-sm text-purple-100/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 px-4 border-t border-purple-500/20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-purple-200/80 text-lg mb-6 font-mono">Enter Chronos. Tokenize timelessness. Yield eternally.</p>
          <button className="px-12 py-4 rounded-lg border border-purple-400/60 bg-gradient-to-r from-purple-500/40 to-purple-600/30 text-purple-100 font-bold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition text-lg">
            Begin Forging Your Collection
          </button>
        </div>
      </section>
    </div>
  )
}
