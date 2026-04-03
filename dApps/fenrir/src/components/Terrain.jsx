import React, { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import AbraxasFooter from './AbraxasFooter'

const Terrain = () => {
  const [expandedZone, setExpandedZone] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setExpandedZone(null)
  }, [])

  const protectionZones = [
    {
      id: 1,
      name: 'Core Sanctuary',
      status: 'SECURED',
      coverage: '100%',
      guardians: 847,
      protocols: 23,
      rune: '◆',
    },
    {
      id: 2,
      name: 'Outer Perimeter',
      status: 'ACTIVE',
      coverage: '94.2%',
      guardians: 523,
      protocols: 18,
      rune: '⚔',
    },
    {
      id: 3,
      name: 'Signal Network',
      status: 'MONITORING',
      coverage: '87.6%',
      guardians: 612,
      protocols: 31,
      rune: '✦',
    },
    {
      id: 4,
      name: 'Collective Shield',
      status: 'SYNCHRONIZED',
      coverage: '99.1%',
      guardians: 1234,
      protocols: 42,
      rune: '⇄',
    },
  ]

  return (
    <div className="relative w-full bg-deep-black overflow-hidden pb-32">
      <ParticleBackground count={25} color="#9945ff" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-deep-black bg-opacity-90 backdrop-blur border-b border-cyan-bright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-display text-2xl font-bold" style={{ color: '#9945ff', textShadow: '0 0 15px rgba(153, 69, 255, 0.6)' }}>
            TERRAIN
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-6 max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <p className="font-mono text-sm text-cyan-bright mb-6">
            Governance and protection zone management. Coordinate collective defense across sovereign territories.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid md:grid-cols-5 gap-3 mb-8">
          <div className="neon-border-cyan card-glow p-3 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Avg Coverage</p>
            <p className="font-display text-lg font-bold" style={{ color: '#00ffff' }}>
              95.2%
            </p>
          </div>
          <div className="neon-border-cyan card-glow p-3 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Total Guardians</p>
            <p className="font-display text-lg font-bold" style={{ color: '#fbbf24' }}>
              3.2K
            </p>
          </div>
          <div className="neon-border-cyan card-glow p-3 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Active Zones</p>
            <p className="font-display text-lg font-bold" style={{ color: '#00ffff' }}>
              4
            </p>
          </div>
          <div className="neon-border-cyan card-glow p-3 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Protocols</p>
            <p className="font-display text-lg font-bold" style={{ color: '#9945ff' }}>
              114
            </p>
          </div>
          <div className="neon-border-cyan card-glow p-3 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Health</p>
            <p className="font-display text-lg font-bold" style={{ color: '#00ffff' }}>
              OPTIMAL
            </p>
          </div>
        </div>

        {/* Protection Zones */}
        <div className="space-y-4">
          {protectionZones.map((zone) => (
            <div key={zone.id}>
              <div
                onClick={() => setExpandedZone(expandedZone === zone.id ? null : zone.id)}
                className="neon-border-cyan card-glow p-6 rounded cursor-pointer hover:bg-deep-black hover:bg-opacity-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl" style={{ color: '#9945ff' }}>
                      {zone.rune}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-cyan-bright">{zone.name}</h3>
                      <p className="font-mono text-sm text-cyan-bright opacity-70">{zone.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-3">
                      <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Coverage</p>
                      <p className="font-display font-bold" style={{ color: '#00ffff', fontSize: '18px' }}>
                        {zone.coverage}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Coverage Progress Bar */}
                <div className="mb-4 h-2 bg-deep-black rounded border border-cyan-bright">
                  <div
                    className="h-full rounded transition-all"
                    style={{
                      background: 'linear-gradient(90deg, #00ffff, #9945ff)',
                      width: zone.coverage,
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Guardians</p>
                    <p className="font-mono font-bold" style={{ color: '#fbbf24' }}>
                      {zone.guardians}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Protocols</p>
                    <p className="font-mono font-bold" style={{ color: '#00ffff' }}>
                      {zone.protocols}
                    </p>
                  </div>
                </div>
              </div>

              {expandedZone === zone.id && (
                <div className="neon-border-cyan p-4 rounded mt-2" style={{ borderTop: 'none', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                  <p className="font-mono text-xs text-cyan-bright mb-4 opacity-70">
                    {zone.name} represents a critical protection domain. Current operational status is excellent. All protocols are synchronized and operating within optimal parameters.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="ui-action ui-action-cyan text-sm py-2">
                      MANAGE PROTOCOLS
                    </button>
                    <button className="ui-action ui-action-gold text-sm py-2">
                      ADD GUARDIANS
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Governance Section */}
        <div className="mt-12 neon-border-cyan card-glow p-8 rounded">
          <h2 className="font-display text-xl font-bold text-cyan-bright mb-4">COLLECTIVE GOVERNANCE</h2>
          <p className="font-mono text-sm text-cyan-bright opacity-70 mb-6">
            The Fenrir dApp governance layer enables collective decision-making across protection zones. Stake tokens to vote on protocol upgrades, zone expansions, and resource allocation.
          </p>
          <button className="ui-action ui-action-gold">
            PARTICIPATE IN GOVERNANCE
          </button>
        </div>
      </div>

      {/* Abraxas Footer */}
      <AbraxasFooter />

      {/* Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  )
}

export default Terrain
