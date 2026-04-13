import React, { useMemo, useState } from 'react'

// Seeded random for consistent particle placement
function seededRand(n: number): number {
  const x = Math.sin(n + 1.618) * 43758.5453
  return x - Math.floor(x)
}

function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
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

// Mock jet data for gallery
const FEATURED_JETS = [
  {
    id: 'g650er',
    model: 'Gulfstream G650ER',
    category: 'Heavy Jet',
    value: '$65M',
    flightHours: 8000,
    utilization: '45%',
    maintenance: '$2.1M/yr',
    charter: '$12,500/hr',
    status: 'Active',
    icon: '✈️',
  },
  {
    id: 'globalx',
    model: 'Bombardier Global 7500',
    category: 'Heavy Jet',
    value: '$72M',
    flightHours: 5200,
    utilization: '52%',
    maintenance: '$2.3M/yr',
    charter: '$13,200/hr',
    status: 'Active',
    icon: '🛩️',
  },
  {
    id: 'falcon8x',
    model: 'Dassault Falcon 8X',
    category: 'Heavy Jet',
    value: '$58M',
    flightHours: 6800,
    utilization: '48%',
    maintenance: '$1.9M/yr',
    charter: '$11,500/hr',
    status: 'Active',
    icon: '✈️',
  },
  {
    id: 'citationx',
    model: 'Cessna Citation X+',
    category: 'Mid-Size Jet',
    value: '$22M',
    flightHours: 3400,
    utilization: '61%',
    maintenance: '$1.2M/yr',
    charter: '$7,800/hr',
    status: 'Active',
    icon: '🛩️',
  },
  {
    id: 'learjet75',
    model: 'Bombardier Learjet 75',
    category: 'Light Jet',
    value: '$16M',
    flightHours: 2200,
    utilization: '68%',
    maintenance: '$850K/yr',
    charter: '$5,200/hr',
    status: 'Active',
    icon: '✈️',
  },
  {
    id: 'phenom300',
    model: 'Embraer Phenom 300E',
    category: 'Light Jet',
    value: '$18M',
    flightHours: 2800,
    utilization: '71%',
    maintenance: '$920K/yr',
    charter: '$6,100/hr',
    status: 'Active',
    icon: '🛩️',
  },
]

export default function App() {
  const [displayedText, setDisplayedText] = React.useState('')
  const [selectedJet, setSelectedJet] = useState<string | null>(null)
  const [tokenizationStep, setTokenizationStep] = useState(1)
  const fullText = 'Astra — Sovereign Skies'

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
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 scroll-smooth">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-600/15 to-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-700/10 to-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.1)_0px,rgba(148,163,184,0.1)_1px,transparent_2px,transparent_5px)]" />

      {/* Particle field */}
      <ParticleField />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Rune/Icon */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(59, 130, 246, 0.4)' }} />
          <div className="relative z-10 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/30 rounded-full p-12">
            <span className="text-7xl drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]">✈️</span>
          </div>
        </div>

        {/* Typing Reveal Headline */}
        <h1 className="text-5xl md:text-6xl font-bold font-mono text-blue-200 tracking-widest uppercase text-center mb-4 h-20 flex items-center">
          {displayedText}
          {displayedText.length < fullText.length && <span className="animate-pulse ml-2">▊</span>}
        </h1>

        {/* Subheadlines */}
        <p className="text-2xl font-semibold font-mono text-blue-300 tracking-wider uppercase text-center mb-4 animate-fade-in" style={{ animationDelay: '2s' }}>
          Astra — Daughter of Sophia
        </p>
        <p className="text-lg font-mono text-blue-200/70 tracking-wider uppercase text-center max-w-2xl animate-fade-in" style={{ animationDelay: '2.4s' }}>
          Tokenize fractional ownership of private jets, flight hours, and aviation assets
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex gap-4 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '2.8s' }}>
          <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-8 py-4 rounded-lg border border-blue-400/50 bg-gradient-to-r from-blue-500/30 to-blue-600/20 text-blue-100 font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition">
            View Jet Gallery
          </button>
          <button className="px-8 py-4 rounded-lg border border-blue-300/30 bg-blue-900/20 text-blue-200 font-bold uppercase tracking-wider hover:border-blue-300/60 transition">
            Begin Tokenization
          </button>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-20 px-4 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-300 tracking-widest uppercase mb-12 text-center">⚙️ ASTRA_CAPABILITIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '📋',
                title: 'One-Click Tokenization',
                desc: 'Upload jet docs, mint La Casa NFT, auto-route to Sophia Vault in minutes',
              },
              {
                icon: '🧠',
                title: 'King AI Optimization',
                desc: 'Maintenance forecasting, utilization planning, cost projections, ROI models',
              },
              {
                icon: '📊',
                title: 'Flight Hour Trading',
                desc: 'Buy/sell fractional flight hours on secondary markets with live pricing',
              },
              {
                icon: '⚙️',
                title: 'Raido + Tide Ecosystem',
                desc: 'Trade jet equity on Raido, de-risk via Tide stable arbitrage protocols',
              },
            ].map((feature, idx) => (
              <div key={idx} className="glow-panel rounded-lg border border-blue-400/20 bg-blue-900/10 p-6 hover:border-blue-400/40 transition">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-blue-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-blue-100/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jet Gallery */}
      <section className="relative py-20 px-4 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-300 tracking-widest uppercase mb-12 text-center">✈️ FEATURED_AIRCRAFT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_JETS.map((jet) => (
              <div
                key={jet.id}
                onClick={() => setSelectedJet(jet.id)}
                className="jet-card rounded-lg border border-blue-400/20 bg-blue-900/15 p-6 hover:bg-blue-900/30 transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-2xl mb-1">{jet.icon}</p>
                    <h3 className="font-bold text-blue-200">{jet.model}</h3>
                    <p className="text-xs text-blue-100/60">{jet.category}</p>
                  </div>
                  <span className="px-2 py-1 rounded text-[10px] font-bold text-green-200 border border-green-400/40 bg-green-900/20">
                    {jet.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-[10px] text-blue-100/60 uppercase">Valuation</p>
                    <p className="font-bold text-blue-200">{jet.value}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-100/60 uppercase">Utilization</p>
                    <p className="font-bold text-blue-200">{jet.utilization}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-100/60 uppercase">Maintenance</p>
                    <p className="font-bold text-blue-200">{jet.maintenance}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-100/60 uppercase">Charter Rate</p>
                    <p className="font-bold text-blue-200">{jet.charter}</p>
                  </div>
                </div>

                <button className="w-full px-4 py-2 rounded border border-blue-400/50 bg-blue-500/20 text-blue-100 font-bold text-sm hover:bg-blue-500/30 transition">
                  Tokenize This Jet
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenization Flow */}
      <section className="relative py-20 px-4 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-300 tracking-widest uppercase mb-12 text-center">📊 TOKENIZATION_FLOW</h2>
          <div className="space-y-4">
            {[
              {
                step: '1️⃣',
                label: 'Upload Aircraft Docs',
                desc: 'Registration certificate, airworthiness cert, maintenance logs, appraisal',
              },
              {
                step: '2️⃣',
                label: 'Verify Authenticity',
                desc: 'King AI validates ownership, condition, market comparables, and value',
              },
              {
                step: '3️⃣',
                label: 'Mint La Casa NFT',
                desc: 'On-chain tokenization with immutable aircraft provenance and fractional ownership',
              },
              {
                step: '4️⃣',
                label: 'Deploy Charter Yield',
                desc: 'Auto-compound flight hours, charter revenue, maintenance reserves into Sophia Vault',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 rounded-lg border border-blue-400/20 bg-blue-900/10 hover:bg-blue-900/20 transition">
                <span className="text-3xl shrink-0">{item.step}</span>
                <div className="flex-1">
                  <p className="font-bold text-blue-200">{item.label}</p>
                  <p className="text-sm text-blue-100/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Classes */}
      <section className="relative py-20 px-4 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-300 tracking-widest uppercase mb-12 text-center">🛩️ AIRCRAFT_CATEGORIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '✈️', name: 'Heavy Jets', desc: 'Gulfstream, Bombardier, Dassault Falcon' },
              { icon: '🛩️', name: 'Mid-Size Jets', desc: 'Citation X, Learjet, Hawker 7500' },
              { icon: '✈️', name: 'Light Jets', desc: 'Phenom 300E, Citation M2, Embraer' },
              { icon: '⏱️', name: 'Flight Hours', desc: 'Fractional annual flight time contracts' },
              { icon: '💰', name: 'Charter Ops', desc: 'Revenue-sharing agreements from bookings' },
              { icon: '🏢', name: 'Hangar Rights', desc: 'Exclusive airport facilities & services' },
            ].map((asset, idx) => (
              <div key={idx} className="rounded-lg border border-blue-400/15 bg-blue-950/30 p-4 hover:bg-blue-950/50 transition">
                <div className="text-3xl mb-2">{asset.icon}</div>
                <p className="font-bold text-blue-200">{asset.name}</p>
                <p className="text-xs text-blue-100/60 mt-1">{asset.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Integrations */}
      <section className="relative py-20 px-4 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-300 tracking-widest uppercase mb-12 text-center">🔗 ECOSYSTEM_PARTNERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glow-panel rounded-lg border border-blue-400/30 bg-blue-900/15 p-8">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-blue-200 mb-2">Raido Trading</h3>
              <p className="text-blue-100/70">Trade fractional jet equity with zero friction. Deep liquidity pools, maker rewards, and market-making algorithms optimize your execution.</p>
            </div>
            <div className="glow-panel rounded-lg border border-blue-400/30 bg-blue-900/15 p-8">
              <div className="text-4xl mb-3">🌊</div>
              <h3 className="text-xl font-bold text-blue-200 mb-2">Tide Arbitrage</h3>
              <p className="text-blue-100/70">De-risk jet positions through stable arbitrage. Cross-protocol liquidity matching and delta-neutral strategies protect your capital.</p>
            </div>
            <div className="glow-panel rounded-lg border border-blue-400/30 bg-blue-900/15 p-8">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="text-xl font-bold text-blue-200 mb-2">Sophia Vault</h3>
              <p className="text-blue-100/70">Auto-compound charter revenue, maintenance reserves, and appreciation yields. Institutional custody with algorithmic rebalancing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* King AI Section */}
      <section className="relative py-20 px-4 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-300 tracking-widest uppercase mb-8 text-center">🧠 KING_AI_ANALYTICS</h2>
          <div className="glow-panel rounded-lg border border-blue-400/40 bg-blue-900/20 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-blue-100/80 mb-4">King AI provides real-time predictive analytics for:</p>
                <ul className="space-y-2 text-blue-100/70 text-sm">
                  <li>✓ Maintenance cost forecasting (12-36 month outlook)</li>
                  <li>✓ Utilization rate optimization based on market demand</li>
                  <li>✓ Depreciation modeling and residual value prediction</li>
                  <li>✓ Charter revenue projections and seasonal trends</li>
                  <li>✓ Operating cost benchmarking vs peer aircraft</li>
                  <li>✓ ROI modeling for fractional ownership structures</li>
                </ul>
              </div>
              <div className="bg-blue-950/40 rounded border border-blue-400/20 p-4">
                <p className="text-xs font-bold text-blue-100/60 uppercase mb-3">Sample King AI Report</p>
                <div className="space-y-2 text-xs text-blue-100/70">
                  <div className="flex justify-between">
                    <span>Annual Maintenance:</span>
                    <span className="font-bold text-blue-200">$2.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Charter Revenue:</span>
                    <span className="font-bold text-green-200">$5.2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Yield (Year 1):</span>
                    <span className="font-bold text-blue-200">$1.8M</span>
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-blue-400/20">
                    <span>5-Year Appreciation:</span>
                    <span className="font-bold text-blue-200">+$8.2M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Friendly CTA */}
      <section className="relative py-20 px-4 border-t border-blue-500/20 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-blue-200/80 text-lg mb-6 font-mono">Take fractional ownership. Earn charter yields. Scale your portfolio infinitely.</p>
          <button className="px-12 py-4 rounded-lg border border-blue-400/60 bg-gradient-to-r from-blue-500/40 to-blue-600/30 text-blue-100 font-bold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition text-lg">
            Tokenize Your First Jet
          </button>
          <p className="text-blue-100/60 text-xs mt-6 uppercase tracking-widest">Available on desktop & mobile | Single-click Wallet connect</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 px-4 border-t border-blue-500/20 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-100/60 text-sm font-mono">Astra — Private Jets, Tokenized | Powered by Abraxas & Sophia Protocol</p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-blue-100/50">
            <a href="#" className="hover:text-blue-300">Docs</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-300">Security</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-300">Community</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
