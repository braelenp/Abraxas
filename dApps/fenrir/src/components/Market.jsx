import React, { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import AbraxasFooter from './AbraxasFooter'

const Market = () => {
  const [selectedAsset, setSelectedAsset] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedAsset(null)
  }, [])

  const assets = [
    {
      id: 1,
      symbol: 'FEN',
      name: 'Fenrir',
      price: '$0.847',
      change24h: '+12.4%',
      marketCap: '$23.1M',
      volume24h: '$2.3M',
      holders: 2847,
      rune: '💀',
    },
    {
      id: 2,
      symbol: 'ABRA',
      name: 'Abraxas',
      price: '$2.134',
      change24h: '+8.7%',
      marketCap: '$87.4M',
      volume24h: '$5.6M',
      holders: 8934,
      rune: '◆',
    },
    {
      id: 3,
      symbol: 'SOL',
      name: 'Solana',
      price: '$138.52',
      change24h: '+3.2%',
      marketCap: '$58.3B',
      volume24h: '$2.1B',
      holders: 'Billions',
      rune: '✦',
    },
    {
      id: 4,
      symbol: 'USDC',
      name: 'USD Coin',
      price: '$1.000',
      change24h: '-0.01%',
      marketCap: '$32.4B',
      volume24h: '$8.9B',
      holders: 'Millions',
      rune: '⇄',
    },
  ]

  return (
    <div className="relative w-full bg-deep-black overflow-hidden pb-32">
      <ParticleBackground count={20} color="#fbbf24" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-deep-black bg-opacity-90 backdrop-blur border-b border-cyan-bright">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-display text-2xl font-bold" style={{ color: '#fbbf24', textShadow: '0 0 15px rgba(251, 191, 36, 0.6)' }}>
            MARKET DATA
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-6 max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <p className="font-mono text-sm text-cyan-bright mb-6">
            Real-time market intelligence for protection ecosystem assets and network tokens.
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="neon-border-orange card-glow p-4 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-2">Total Market Cap</p>
            <p className="font-display text-xl font-bold" style={{ color: '#fbbf24' }}>
              $200.9M
            </p>
          </div>
          <div className="neon-border-orange card-glow p-4 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-2">24h Volume</p>
            <p className="font-display text-xl font-bold" style={{ color: '#00ffff' }}>
              $18.9M
            </p>
          </div>
          <div className="neon-border-orange card-glow p-4 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-2">Avg. Change</p>
            <p className="font-display text-xl font-bold text-orange-fire">
              +6.1%
            </p>
          </div>
          <div className="neon-border-orange card-glow p-4 rounded text-center">
            <p className="font-mono text-xs text-cyan-bright opacity-70 mb-2">Total Holders</p>
            <p className="font-display text-xl font-bold" style={{ color: '#00ffff' }}>
              11.8K
            </p>
          </div>
        </div>

        {/* Assets Table */}
        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
              className="neon-border-orange card-glow p-6 rounded cursor-pointer hover:bg-deep-black hover:bg-opacity-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl" style={{ color: '#fbbf24' }}>
                    {asset.rune}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cyan-bright">{asset.name}</h3>
                    <p className="font-mono text-sm text-cyan-bright opacity-70">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-bold" style={{ color: '#fbbf24' }}>
                    {asset.price}
                  </p>
                  <p
                    className="font-mono text-sm font-bold"
                    style={{
                      color:
                        asset.change24h.includes('+') && asset.change24h !== '+0.01%'
                          ? '#00ffff'
                          : asset.change24h.includes('-')
                          ? '#ff6024'
                          : '#fbbf24',
                    }}
                  >
                    {asset.change24h}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Market Cap</p>
                  <p className="font-mono font-bold" style={{ color: '#00ffff' }}>
                    {asset.marketCap}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">24h Volume</p>
                  <p className="font-mono font-bold" style={{ color: '#fbbf24' }}>
                    {asset.volume24h}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Holders</p>
                  <p className="font-mono font-bold" style={{ color: '#00ffff' }}>
                    {asset.holders}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-cyan-bright opacity-70 mb-1">Status</p>
                  <p className="font-mono font-bold text-orange-fire">Active</p>
                </div>
              </div>

              {selectedAsset === asset.id && (
                <div className="mt-4 pt-4 border-t border-orange-fire text-xs text-cyan-bright">
                  <p className="mb-3">This asset is actively used in the protection ecosystem and Abraxas collective.</p>
                  <button className="ui-action ui-action-gold w-full">
                    TRADE {asset.symbol}
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

export default Market
