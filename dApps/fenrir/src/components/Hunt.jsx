import React, { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import AbraxasFooter from './AbraxasFooter'

const Hunt = () => {
  const [selectedHunt, setSelectedHunt] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedHunt(null)
  }, [])

  const opportunities = [
    {
      id: 1,
      name: 'Deep Boundary Scan',
      threat: 'HIGH',
      yield: '8.5%',
      tvl: '$2.3M',
      rune: '↑',
    },
    {
      id: 2,
      name: 'Perimeter Defense',
      threat: 'MEDIUM',
      yield: '5.2%',
      tvl: '$1.8M',
      rune: '⚔',
    },
    {
      id: 3,
      name: 'Protocol Enforcement',
      threat: 'LOW',
      yield: '3.1%',
      tvl: '$4.6M',
      rune: '◆',
    },
    {
      id: 4,
      name: 'Collective Synchronization',
      threat: 'MEDIUM',
      yield: '6.7%',
      tvl: '$3.2M',
      rune: '✦',
    },
  ]

  return (
    <div className="relative w-full bg-deep-black overflow-hidden pb-32">
      <ParticleBackground count={20} color="#ff6024" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-deep-black bg-opacity-90 backdrop-blur border-b border-cyan-bright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-display text-2xl font-bold" style={{ color: '#ff6024', textShadow: '0 0 15px rgba(255, 96, 36, 0.6)' }}>
            THREAT HUNT
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-6 max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <p className="font-mono text-sm text-cyan-bright mb-6">
            Discover and evaluate emerging threats and protection opportunities across the collective network.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => setSelectedHunt(selectedHunt === opp.id ? null : opp.id)}
              className="neon-border-orange card-glow p-6 rounded cursor-pointer"
              style={{
                borderColor: opp.threat === 'HIGH' ? '#ff6024' : opp.threat === 'MEDIUM' ? '#fbbf24' : '#00ffff',
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-3xl mb-2" style={{ color: '#ff6024' }}>
                    {opp.rune}
                  </div>
                  <h3 className="font-display text-lg font-bold text-cyan-bright">{opp.name}</h3>
                </div>
                <span
                  className="font-mono text-xs px-3 py-1 rounded"
                  style={{
                    backgroundColor: `${opp.threat === 'HIGH' ? '#ff6024' : opp.threat === 'MEDIUM' ? '#fbbf24' : '#00ffff'}20`,
                    color: opp.threat === 'HIGH' ? '#ff6024' : opp.threat === 'MEDIUM' ? '#fbbf24' : '#00ffff',
                  }}
                >
                  {opp.threat}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">APY</p>
                  <p className="font-mono text-lg font-bold" style={{ color: '#fbbf24' }}>
                    {opp.yield}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">TVL</p>
                  <p className="font-mono text-lg font-bold" style={{ color: '#00ffff' }}>
                    {opp.tvl}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Status</p>
                  <p className="font-mono text-sm" style={{ color: '#00ffff' }}>
                    Active
                  </p>
                </div>
              </div>

              {selectedHunt === opp.id && (
                <div className="mt-4 pt-4 border-t border-orange-fire text-xs text-cyan-bright">
                  <p className="mb-3">
                    This opportunity represents a significant protection vector. Engage carefully with full protocol compliance.
                  </p>
                  <button className="ui-action ui-action-gold w-full">
                    ENGAGE THREAT HUNT
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

export default Hunt
