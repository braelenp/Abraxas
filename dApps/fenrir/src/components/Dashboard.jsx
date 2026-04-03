import React, { useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import AbraxasFooter from './AbraxasFooter'

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const metrics = [
    {
      label: 'Protection Status',
      value: '99.9%',
      rune: '⚔',
      color: '#ff6024',
      desc: 'Active Boundary Enforcement',
    },
    {
      label: 'Threats Neutralized',
      value: '847',
      rune: '↑',
      color: '#fbbf24',
      desc: 'This Cycle',
    },
    {
      label: 'Sovereign Power',
      value: '100M+',
      rune: '◆',
      color: '#00ffff',
      desc: 'Generated',
    },
    {
      label: 'Collective Guard',
      value: '2.4K+',
      rune: '✦',
      color: '#9945ff',
      desc: 'Active Protectors',
    },
    {
      label: 'Boundaries Secured',
      value: '12.8K',
      rune: '⬢',
      color: '#fbbf24',
      desc: 'Protected Areas',
    },
  ]

  return (
    <div className="relative w-full bg-deep-black overflow-hidden pb-32">
      <ParticleBackground count={20} color="#00ffff" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-deep-black bg-opacity-90 backdrop-blur border-b border-cyan-bright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-display text-2xl font-bold" style={{ color: '#fbbf24', textShadow: '0 0 15px rgba(251, 191, 36, 0.6)' }}>
            PROTECTION DASHBOARD
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-6 max-w-6xl mx-auto mt-20">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="neon-border card-glow p-6 rounded text-center"
              style={{
                borderColor: metric.color,
                boxShadow: `0 0 15px ${metric.color}40, inset 0 0 15px ${metric.color}20`,
              }}
            >
              <div className="text-3xl mb-3" style={{ color: metric.color }}>
                {metric.rune}
              </div>
              <div className="text-2xl font-bold mb-2" style={{ color: metric.color, textShadow: `0 0 10px ${metric.color}` }}>
                {metric.value}
              </div>
              <p className="font-mono text-xs text-cyan-bright mb-2">{metric.label}</p>
              <p className="font-mono text-xs opacity-70" style={{ color: metric.color }}>
                {metric.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Hot Threats Section */}
        <div className="neon-border-orange card-glow p-8 rounded mb-12">
          <h2 className="font-display text-xl font-bold mb-6" style={{ color: '#ff6024', textShadow: '0 0 10px #ff6024' }}>
            ACTIVE THREAT ALERTS
          </h2>
          <div className="space-y-4">
            {[
              { threat: 'Boundary Incursion Detected', severity: 'HIGH', seal: '↑' },
              { threat: 'Protocol Deviation Flagged', severity: 'MEDIUM', seal: '◆' },
              { threat: 'Collective Consensus Monitoring', severity: 'INFO', seal: '✦' },
            ].map((item, i) => (
              <div
                key={i}
                className="border-l-4 border-orange-fire pl-4 py-3 bg-deep-black bg-opacity-40"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono font-bold text-orange-fire">{item.seal} {item.threat}</p>
                    <p className="font-mono text-xs text-cyan-bright mt-1">Status: Active Monitoring</p>
                  </div>
                  <span
                    className="font-mono text-xs px-3 py-1 rounded"
                    style={{
                      backgroundColor:
                        item.severity === 'HIGH'
                          ? 'rgba(255, 96, 36, 0.2)'
                          : item.severity === 'MEDIUM'
                          ? 'rgba(251, 191, 36, 0.2)'
                          : 'rgba(0, 255, 255, 0.2)',
                      color:
                        item.severity === 'HIGH'
                          ? '#ff6024'
                          : item.severity === 'MEDIUM'
                          ? '#fbbf24'
                          : '#00ffff',
                    }}
                  >
                    {item.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="neon-border-cyan card-glow p-8 rounded">
            <h3 className="font-display text-lg font-bold mb-4" style={{ color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>
              LATEST PROTECTIONS
            </h3>
            <div className="space-y-3 font-mono text-xs text-cyan-bright">
              {['Boundary secured at 14:32', 'Threat neutralized at 13:15', 'Protocol updated at 12:48', 'System synchronized at 12:01'].map(
                (item, i) => (
                  <div key={i} className="p-2 bg-deep-black bg-opacity-50 rounded border-l border-cyan-bright pl-3">
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="neon-border-purple card-glow p-8 rounded" style={{ borderColor: '#9945ff' }}>
            <h3 className="font-display text-lg font-bold mb-4" style={{ color: '#9945ff', textShadow: '0 0 10px #9945ff' }}>
              PROTECTION STATS
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs">Uptime</span>
                  <span className="font-mono text-xs" style={{ color: '#00ffff' }}>
                    99.9%
                  </span>
                </div>
                <div className="h-2 bg-void border border-purple-core rounded overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-purple-core to-cyan-bright"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs">Threat Level</span>
                  <span className="font-mono text-xs" style={{ color: '#fbbf24' }}>
                    2.3%
                  </span>
                </div>
                <div className="h-2 bg-void border border-gold-accent rounded overflow-hidden">
                  <div className="h-full w-1/12 bg-gold-accent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abraxas Footer */}
      <AbraxasFooter />

      {/* Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  )
}

export default Dashboard
