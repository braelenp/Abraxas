import React, { useState } from 'react'
import { usePortfolio } from '../../contexts/PortfolioContext'
import AbraxasLink from '../AbraxasLink'

interface DashboardTabProps {
  onBack: () => void
}

const DashboardTab: React.FC<DashboardTabProps> = ({ onBack }) => {
  const {
    connected,
    walletAddress,
    balance,
    connect,
    disconnect,
    totalValue,
    riskLevel,
    status,
    assets,
  } = usePortfolio()

  const [showWalletModal, setShowWalletModal] = useState(false)

  const handleConnectWallet = (walletType: string) => {
    const mockAddress = `${walletType.slice(0, 4)}...${Math.random().toString(36).substring(7)}`
    const mockBalance = Math.floor(Math.random() * 50000) + 1000
    connect(mockAddress, mockBalance)
    setShowWalletModal(false)
  }

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low':
        return 'text-emerald-300'
      case 'high':
        return 'text-orange-300'
      default:
        return 'text-cyan-300'
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'ALERT':
        return 'text-red-300'
      case 'MONITORING':
        return 'text-amber-300'
      default:
        return 'text-gold'
    }
  }

  return (
    <div className="relative w-full px-4 md:px-8 py-12 md:py-16 z-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex items-center justify-between">
          <h1 className="hero-title text-gold glow-gold">Guardian</h1>
          <button
            onClick={onBack}
            className="px-4 md:px-6 py-2 md:py-3 rounded-lg border border-cyan-300/50 text-cyan-300 hover:bg-cyan-300/10 transition-all duration-300 text-xs md:text-sm font-bold tracking-widest uppercase"
          >
            ← Back
          </button>
        </div>

        {/* Essence */}
        <p className="section-title">ᛉ Protection · Divine Guardianship</p>

        {/* Lore */}
        <div className="glow-panel p-6 md:p-8 mb-8 md:mb-12">
          <p className="text-base md:text-lg text-slate-100 leading-relaxed mb-4">
            "Algiz stands as the rune of divine protection, elk antlers raised against all unseen forces. The Warden holds the threshold between chaos and the sovereign order of Valkyr. Live portfolio monitoring, risk alerts, and strategic intelligence all answer to the Warden's watch."
          </p>
        </div>

        {/* Wallet Connection */}
        {!connected ? (
          <div className="glow-panel p-6 md:p-8 mb-8 md:mb-12 text-center">
            <p className="text-sm md:text-base text-slate-300 mb-4">Connect your wallet to begin strategic oversight</p>
            <button
              onClick={() => setShowWalletModal(true)}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-gold to-amber-400 text-slate-950 font-bold tracking-widest uppercase text-sm hover:from-amber-400 hover:to-gold transition-all duration-300"
            >
              Connect Wallet
            </button>

            {showWalletModal && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="glow-panel p-8 max-w-sm w-full">
                  <h2 className="text-xl font-bold text-gold mb-6">Select Wallet</h2>
                  <div className="space-y-3">
                    {['Phantom', 'Solflare', 'Backpack'].map((wallet) => (
                      <button
                        key={wallet}
                        onClick={() => handleConnectWallet(wallet)}
                        className="w-full px-6 py-3 rounded-lg border border-cyan-300/50 text-cyan-300 hover:bg-cyan-300/10 transition-all duration-300 font-bold tracking-wider"
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowWalletModal(false)}
                    className="w-full mt-4 px-6 py-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-600/10 transition-all duration-300 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Wallet Info */}
            <div className="glow-panel p-6 md:p-8 mb-8 md:mb-12">
              <div className="flex items-center justify-between mb-4">
                <span className="system-label">Wallet Connected</span>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 text-xs rounded-lg border border-red-300/50 text-red-300 hover:bg-red-300/10 transition-all duration-300 font-bold tracking-wider uppercase"
                >
                  Disconnect
                </button>
              </div>
              <p className="font-mono text-sm text-cyan-300 mb-2">{walletAddress}</p>
              <p className="text-xs text-slate-400">Balance: {balance.toLocaleString()} SOL</p>
            </div>

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="glow-panel p-6 md:p-8 text-center">
                <p className="stat-label">Total Portfolio Value</p>
                <p className="stat-value text-gold glow-gold">${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              </div>
              <div className="glow-panel p-6 md:p-8 text-center">
                <p className="stat-label">Risk Level</p>
                <p className={`stat-value ${getRiskColor()} font-bold`}>{riskLevel.toUpperCase()}</p>
              </div>
              <div className="glow-panel p-6 md:p-8 text-center">
                <p className="stat-label">System Status</p>
                <p className={`stat-value ${getStatusColor()}`}>{status}</p>
              </div>
            </div>

            {/* Asset Holdings */}
            <div className="mb-8 md:mb-12">
              <h2 className="subsection-title text-cyan-300 mb-6">Asset Holdings</h2>
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="glow-panel p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-100">{asset.name}</h3>
                        <p className="system-label">{asset.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="stat-value text-gold">${asset.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                        <p className={`text-sm font-bold ${asset.performance > 0 ? 'text-emerald-300' : 'text-orange-300'}`}>
                          {asset.performance > 0 ? '+' : ''}{asset.performance}%
                        </p>
                      </div>
                    </div>
                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-gold"
                        style={{ width: `${asset.allocation}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <p className="text-xs text-slate-400">{asset.balance.toLocaleString()} {asset.symbol}</p>
                      <p className="text-xs text-cyan-300">{asset.allocation}% of portfolio</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              <button className="glow-panel p-4 md:p-6 text-center hover:border-cyan-300 transition-all duration-300">
                <p className="text-xs font-mono text-cyan-300 mb-2">ACTION</p>
                <p className="font-bold text-slate-100">Deposit Assets</p>
              </button>
              <button className="glow-panel p-4 md:p-6 text-center hover:border-gold transition-all duration-300">
                <p className="text-xs font-mono text-gold mb-2">ACTION</p>
                <p className="font-bold text-slate-100">View Alerts</p>
              </button>
            </div>

            {/* Ecosystem Link */}
            <AbraxasLink />
          </>
        )}
      </div>
    </div>
  )
}

export default DashboardTab
