import React, { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import AbraxasFooter from './AbraxasFooter'

const Flow = () => {
  const [expandedPool, setExpandedPool] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setExpandedPool(null)
  }, [])

  const liquidityPools = [
    {
      id: 1,
      name: 'Fenrir-Abraxas Flow',
      pair: 'FEN / ABRA',
      liquidity: '$12.4M',
      fee: '0.75%',
      volume24h: '$2.1M',
      rune: '⇄',
    },
    {
      id: 2,
      name: 'Protection Pool',
      pair: 'ABRA / SOL',
      liquidity: '$8.7M',
      fee: '0.50%',
      volume24h: '$1.8M',
      rune: '◆',
    },
    {
      id: 3,
      name: 'Boundary Defense',
      pair: 'FEN / SOL',
      liquidity: '$5.3M',
      fee: '1.00%',
      volume24h: '$965K',
      rune: '⚔',
    },
    {
      id: 4,
      name: 'Sovereignty Pool',
      pair: 'ABRA / USD',
      liquidity: '$15.2M',
      fee: '0.25%',
      volume24h: '$3.4M',
      rune: '✦',
    },
  ]

  return (
    <div className="relative w-full bg-deep-black overflow-hidden pb-32">
      <ParticleBackground count={20} color="#00ffff" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-deep-black bg-opacity-90 backdrop-blur border-b border-cyan-bright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-display text-2xl font-bold" style={{ color: '#00ffff', textShadow: '0 0 15px rgba(0, 255, 255, 0.6)' }}>
            CAPITAL FLOW
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-6 max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <p className="font-mono text-sm text-cyan-bright mb-6">
            Route capital across liquidity pools and synchronized channels. Maximize collective yields through distributed protection.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="neon-border-cyan card-glow p-4 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-2">Total Liquidity</p>
            <p className="font-display text-xl font-bold" style={{ color: '#00ffff' }}>
              $41.6M
            </p>
          </div>
          <div className="neon-border-cyan card-glow p-4 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-2">24h Volume</p>
            <p className="font-display text-xl font-bold" style={{ color: '#fbbf24' }}>
              $8.3M
            </p>
          </div>
          <div className="neon-border-cyan card-glow p-4 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-2">Avg. APY</p>
            <p className="font-display text-xl font-bold" style={{ color: '#00ffff' }}>
              6.82%
            </p>
          </div>
          <div className="neon-border-cyan card-glow p-4 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-2">Active Routes</p>
            <p className="font-display text-xl font-bold" style={{ color: '#fbbf24' }}>
              127
            </p>
          </div>
        </div>

        {/* Liquidity Pools */}
        <div className="space-y-4">
          {liquidityPools.map((pool) => (
            <div key={pool.id}>
              <div
                onClick={() => setExpandedPool(expandedPool === pool.id ? null : pool.id)}
                className="neon-border-cyan card-glow p-6 rounded cursor-pointer hover:bg-deep-black hover:bg-opacity-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl" style={{ color: '#00ffff' }}>
                      {pool.rune}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-cyan-bright">{pool.name}</h3>
                      <p className="font-mono text-sm text-cyan-bright opacity-70">{pool.pair}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold" style={{ color: '#fbbf24' }}>
                      {pool.liquidity}
                    </p>
                    <p className="font-mono text-xs text-cyan-bright opacity-70">{pool.fee} fee</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">24h Volume</p>
                    <p className="font-mono font-bold" style={{ color: '#00ffff' }}>
                      {pool.volume24h}
                    </p>
                  </div>
                </div>
              </div>

              {expandedPool === pool.id && (
                <div className="neon-border-cyan p-4 rounded mt-2" style={{ borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                  <p className="font-mono text-xs text-cyan-bright mb-4 opacity-70">
                    Synchronized liquidity allowing collective protection and capital efficiency across network nodes.
                  </p>
                  <button className="ui-action ui-action-cyan w-full">
                    ADD LIQUIDITY
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Abraxas Footer */}
      <AbraxasFooter />

      {/* Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  )
}

export default Flow
