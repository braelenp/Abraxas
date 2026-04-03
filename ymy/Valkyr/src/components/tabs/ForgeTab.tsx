import React, { useState } from 'react'
import { usePortfolio } from '../../contexts/PortfolioContext'
import AbraxasLink from '../AbraxasLink'

const ForgeTab: React.FC = () => {
  const { opportunities } = usePortfolio()
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-emerald-300'
      case 'high':
        return 'text-red-300'
      default:
        return 'text-amber-300'
    }
  }

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-emerald-300/10 border-emerald-300/30'
      case 'high':
        return 'bg-red-300/10 border-red-300/30'
      default:
        return 'bg-amber-300/10 border-amber-300/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'yield':
        return '⚡'
      case 'partnership':
        return '🔗'
      case 'investment':
        return '💎'
      default:
        return '→'
    }
  }

  const getTotalOpportunitiesValue = () => {
    return opportunities.reduce((sum, opp) => sum + opp.capital, 0)
  }

  return (
    <div className="relative w-full px-4 md:px-8 py-12 md:py-16 z-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="hero-title text-orange-300 glow-gold mb-4 md:mb-6">Forge</h1>
          <p className="section-title">ᚲ Torch · Capital Forging</p>
        </div>

        {/* Lore */}
        <div className="glow-panel p-6 md:p-8 mb-8 md:mb-12">
          <p className="text-base md:text-lg text-slate-100 leading-relaxed mb-6">
            "Kenaz is the rune of transformation. The Forge converts protected capital into strategic opportunities. Here, assets gain positioning—trading dormancy for compounding, liquidity, and autonomous strategy."
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-orange-300/30 to-transparent my-6"></div>
          <h3 className="subsection-title text-orange-300 mb-3">Strategic Opportunities</h3>
          <p className="text-sm md:text-base text-slate-300/80">
            Aligned opportunities across the Sophia family. Yield generation, strategic partnerships, and long-term wealth building.
          </p>
        </div>

        {/* Opportunities Summary */}
        <div className="glow-panel p-6 md:p-8 mb-8 md:mb-12 text-center">
          <p className="stat-label">Total Capital Available</p>
          <p className="stat-value text-orange-300 glow-gold">
            ${getTotalOpportunitiesValue().toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-400 mt-2">{opportunities.length} active opportunities</p>
        </div>

        {/* Opportunities List */}
        <div className="mb-8 md:mb-12">
          <h2 className="subsection-title text-orange-300 mb-6">Aligned Opportunities</h2>
          <div className="space-y-5">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                onClick={() => setSelectedOpportunity(selectedOpportunity === opp.id ? null : opp.id)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Base Card */}
                <div className={`glow-panel p-6 md:p-8 ${selectedOpportunity === opp.id ? 'border-2 border-orange-300/50' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3 flex-1">
                      <span className="text-2xl">{getTypeIcon(opp.type)}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-100">{opp.title}</h3>
                        <p className="system-label">{opp.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="stat-value text-orange-300">{opp.apy}%</p>
                      <p className="text-xs text-slate-400">APY</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="stat-label">Capital Allocated</p>
                      <p className="text-sm font-mono text-slate-200">${opp.capital.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div>
                      <p className="stat-label">Risk Level</p>
                      <p className={`text-sm font-bold ${getRiskColor(opp.risk)}`}>{opp.risk.toUpperCase()}</p>
                    </div>
                  </div>

                  {/* Risk Badge */}
                  <div className={`px-3 py-2 rounded-lg border text-xs font-bold ${getRiskBgColor(opp.risk)} ${getRiskColor(opp.risk)} ${getRiskColor(opp.risk)}`}>
                    {opp.risk.charAt(0).toUpperCase() + opp.risk.slice(1)} Risk Exposure
                  </div>

                  {/* Expanded Details */}
                  {selectedOpportunity === opp.id && (
                    <div className="mt-6 pt-6 border-t border-slate-600">
                      <p className="text-sm text-slate-200 mb-4">{opp.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="px-4 py-2 rounded-lg border border-orange-300/50 text-orange-300 hover:bg-orange-300/10 transition-all duration-300 text-xs font-bold tracking-wider uppercase">
                          Deploy Capital
                        </button>
                        <button className="px-4 py-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-600/10 transition-all duration-300 text-xs font-bold tracking-wider uppercase">
                          Learn More
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Opportunity */}
        <div className="glow-panel p-6 md:p-8">
          <h2 className="subsection-title text-orange-300 mb-4">Capital Transformation</h2>
          <p className="text-sm text-slate-300 mb-6">
            The Forge is always seeking new pathways for capital deployment. Submit a custom opportunity or connect existing strategies.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8 md:mb-12">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-slate-950 font-bold tracking-widest uppercase text-sm hover:from-orange-500 hover:to-orange-400 transition-all duration-300">
              Submit Opportunity
            </button>
            <button className="px-6 py-3 rounded-lg border border-orange-300/50 text-orange-300 hover:bg-orange-300/10 transition-all duration-300 font-bold tracking-widest uppercase text-sm">
              Connect Strategy
            </button>
          </div>
        </div>

        {/* Ecosystem Link */}
        <AbraxasLink />
      </div>
    </div>
  )
}

export default ForgeTab
