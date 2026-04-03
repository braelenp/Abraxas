import React from 'react'
import { usePortfolio } from '../../contexts/PortfolioContext'
import AbraxasLink from '../AbraxasLink'

const StrategyTab: React.FC = () => {
  const { assets } = usePortfolio()

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      default:
        return '→'
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-emerald-300'
      case 'down':
        return 'text-orange-300'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <div className="relative w-full px-4 md:px-8 py-12 md:py-16 z-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="hero-title text-amber-300 glow-gold mb-4 md:mb-6">Raido</h1>
          <p className="section-title">ᛋ Sun · Victorious Vision</p>
        </div>

        {/* Lore */}
        <div className="glow-panel p-6 md:p-8 mb-8 md:mb-12">
          <p className="text-base md:text-lg text-slate-100 leading-relaxed mb-6">
            "Sowilo is the sun-wheel, the unstoppable light of sovereign victory. Raido sees every asset class trajectory across the Sophia family. The trajectory is visible before the market makes its move."
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent my-6"></div>
          <h3 className="subsection-title text-amber-300 mb-3">Strategic Oversight</h3>
          <p className="text-sm md:text-base text-slate-300/80">
            Comprehensive view of all tokenized assets under Valkyr protection. Asset allocation, performance tracking, and strategic positioning guidance.
          </p>
        </div>

        {/* Portfolio Composition */}
        <div className="mb-8 md:mb-12">
          <h2 className="subsection-title text-amber-300 mb-6">Portfolio Composition</h2>
          
          {/* Allocation Visualization */}
          <div className="glow-panel-gold p-6 md:p-8 mb-8">
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-100">{asset.name}</span>
                    <span className="text-sm text-amber-300 font-mono">{asset.allocation}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
                      style={{ width: `${asset.allocation}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Details Grid */}
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="glow-panel p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-100">{asset.name}</h3>
                    <p className="system-label">{asset.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="stat-value text-amber-300">${asset.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                    <div className={`flex items-center justify-end gap-1 ${getTrendColor(asset.trend)}`}>
                      <span className="text-sm font-bold">
                        {asset.performance > 0 ? '+' : ''}{asset.performance}%
                      </span>
                      <span className="text-lg">{getTrendIcon(asset.trend)}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent my-4"></div>

                {/* Asset Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="stat-label">Holdings</p>
                    <p className="text-sm font-mono text-slate-200">{asset.balance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="stat-label">Allocation</p>
                    <p className="text-sm font-mono text-slate-200">{asset.allocation}%</p>
                  </div>
                  <div>
                    <p className="stat-label">Price Action</p>
                    <p className={`text-sm font-mono font-bold ${getTrendColor(asset.trend)}`}>
                      {asset.performance > 0 ? '+' : ''}{asset.performance}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="glow-panel p-6 md:p-8">
          <h2 className="subsection-title text-amber-300 mb-4">Trajectory Analysis</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1 bg-emerald-300 rounded-full"></div>
              <div>
                <p className="font-bold text-emerald-300 text-sm">Ascending</p>
                <p className="text-xs text-slate-400">SOL (+12.5%) and ECHO (+8.3%) show positive momentum</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-amber-300 rounded-full"></div>
              <div>
                <p className="font-bold text-amber-300 text-sm">Monitor</p>
                <p className="text-xs text-slate-400">LEG (-2.1%) showing correction - consider entry strategies</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-slate-400 rounded-full"></div>
              <div>
                <p className="font-bold text-slate-300 text-sm">Stable</p>
                <p className="text-xs text-slate-400">USDC maintains baseline allocation (28%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Link */}
        <AbraxasLink />
      </div>
    </div>
  )
}

export default StrategyTab
