import React from 'react'
import { usePortfolio } from '../../contexts/PortfolioContext'
import AbraxasLink from '../AbraxasLink'

const VaultsTab: React.FC = () => {
  const { vaults } = usePortfolio()

  const getMultiSigColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-emerald-300'
      case 'active':
        return 'text-gold'
      case 'pending':
        return 'text-amber-300'
      default:
        return 'text-cyan-300'
    }
  }

  const getMultiSigBorderColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'border-emerald-300/30'
      case 'active':
        return 'border-gold/30'
      case 'pending':
        return 'border-amber-300/30'
      default:
        return 'border-cyan-300/30'
    }
  }

  return (
    <div className="relative w-full px-4 md:px-8 py-12 md:py-16 z-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="hero-title text-cyan-300 glow-cyan mb-4 md:mb-6">Sophia</h1>
          <p className="section-title">ᚨ Divine Wisdom · Sacred Speech</p>
        </div>

        {/* Lore */}
        <div className="glow-panel p-6 md:p-8 mb-8 md:mb-12">
          <p className="text-base md:text-lg text-slate-100 leading-relaxed mb-6">
            "Ansuz carries the breath of Odin, divine intelligence flowing into form. Sophia speaks your vaults into being, governing every deposit, allocation, and yield cycle with autonomous precision."
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent my-6"></div>
          <h3 className="subsection-title text-cyan-300 mb-3">Custody & Vaults</h3>
          <p className="text-sm md:text-base text-slate-300/80">
            Multi-signature cold storage protecting your tokenized positions. Sophia's vault architecture ensures zero-knowledge custody with cryptographic proof.
          </p>
        </div>

        {/* Total Vault Value */}
        <div className="glow-panel p-6 md:p-8 mb-8 md:mb-12 text-center">
          <p className="stat-label">Total Vault Value</p>
          <p className="stat-value text-cyan-300 glow-cyan">
            ${vaults.reduce((sum, vault) => sum + vault.balance, 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Vaults List */}
        <div className="mb-8 md:mb-12">
          <h2 className="subsection-title text-cyan-300 mb-6">Active Vaults</h2>
          <div className="space-y-6">
            {vaults.map((vault, index) => (
              <div
                key={vault.id}
                className={`glow-panel-cyan border-2 ${getMultiSigBorderColor(vault.multiSigStatus)} p-6 md:p-8 rounded-lg`}
              >
                {/* Vault Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-100 mb-2">{vault.name}</h3>
                    <div className="flex gap-3 flex-wrap">
                      <span className="system-label">{index + 1} of {vaults.length}</span>
                      <span className={`text-xs font-mono font-bold uppercase ${getMultiSigColor(vault.multiSigStatus)}`}>
                        {vault.multiSigStatus}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="stat-value text-cyan-300">${vault.balance.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent my-4"></div>

                {/* Vault Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="stat-label">Allocation</p>
                    <p className="text-sm text-slate-200 font-mono">{vault.allocation}</p>
                  </div>
                  <div>
                    <p className="stat-label">Yield Cycle</p>
                    <p className="text-sm text-slate-200 font-mono">{vault.yieldCycle}</p>
                  </div>
                </div>

                {/* Vault Actions */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button className="px-4 py-3 rounded-lg border border-cyan-300/50 text-cyan-300 hover:bg-cyan-300/10 transition-all duration-300 text-xs font-bold tracking-wider uppercase">
                    Deposit
                  </button>
                  <button className="px-4 py-3 rounded-lg border border-cyan-300/50 text-cyan-300 hover:bg-cyan-300/10 transition-all duration-300 text-xs font-bold tracking-wider uppercase">
                    Withdraw
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create New Vault */}
        <div className="glow-panel p-6 md:p-8 text-center mb-8 md:mb-12">
          <p className="text-sm text-slate-300 mb-4">Expand your protection infrastructure</p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold tracking-widest uppercase text-sm hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300">
            Initialize New Vault
          </button>
        </div>

        {/* Ecosystem Link */}
        <AbraxasLink />
      </div>
    </div>
  )
}

export default VaultsTab
