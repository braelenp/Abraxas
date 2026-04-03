import React, { useState } from 'react'
import { VALKYR_RUNE_TABS } from '../utils/runeData'

interface RuneTabsProps {
  onBack?: () => void
}

const RuneTabs: React.FC<RuneTabsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(0)
  const currentTab = VALKYR_RUNE_TABS[activeTab]

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      cyan: 'text-cyan-300',
      purple: 'text-purple-300',
      orange: 'text-orange-300',
      gold: 'text-yellow-300',
    }
    return colorMap[color] || 'text-cyan-300'
  }

  const getGlowClass = (color: string) => {
    const glowMap: Record<string, string> = {
      cyan: 'glow-panel shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      purple: 'glow-panel-purple shadow-[0_0_30px_rgba(153,69,255,0.3)]',
      orange: 'glow-panel-orange shadow-[0_0_30px_rgba(234,88,12,0.3)]',
      gold: 'glow-panel-gold shadow-[0_0_30px_rgba(253,216,53,0.3)]',
    }
    return glowMap[color] || 'glow-panel'
  }

  return (
    <div className="w-full min-h-screen py-12 md:py-16 px-4 md:px-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="neon-text-purple">Valkyr</span>
            <span className="text-cyan-300 ml-2 text-lg md:text-2xl">Strategic Oversight</span>
          </h1>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 md:px-6 py-2 md:py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-bg transition-all duration-300 text-sm md:text-base font-semibold tracking-wider"
            >
              ← Back
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mb-12 md:mb-16 overflow-x-auto pb-4">
          <div className="flex gap-2 md:gap-3 flex-nowrap min-w-max md:flex-wrap md:min-w-0">
            {VALKYR_RUNE_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`
                  px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base
                  transition-all duration-300 tracking-wider whitespace-nowrap
                  flex items-center gap-2
                  ${
                    activeTab === idx
                      ? `${getGlowClass(tab.color)} border ${tab.color === 'cyan' ? 'border-cyan-400' : tab.color === 'purple' ? 'border-purple-500' : tab.color === 'orange' ? 'border-orange-500' : 'border-yellow-400'} ${getColorClass(tab.color)}`
                      : 'glow-panel border-cyan-300/30 text-gray-300 hover:border-cyan-300/60'
                  }
                `}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.rune}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`${getGlowClass(currentTab.color)} p-6 md:p-8 mb-12 md:mb-16`}>
          {/* Rune and Name */}
          <div className="mb-6 flex items-start gap-4 md:gap-6">
            <div className="text-6xl md:text-8xl filter drop-shadow-[0_0_20px_rgba(253,216,53,0.8)]">
              {currentTab.rune}
            </div>
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold ${getColorClass(currentTab.color)} mb-2`}>
                {currentTab.name}
              </h2>
              <p className="text-sm md:text-base text-gray-400 italic tracking-wide">{currentTab.essence}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent my-6 md:my-8"></div>

          {/* Lore */}
          <div className="mb-8 md:mb-10">
            <h3 className="text-sm md:text-base uppercase tracking-widest text-cyan-300 font-semibold mb-3 md:mb-4">
              ⚔️ Ancient Lore
            </h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
              "{currentTab.lore}"
            </p>
          </div>

          {/* Function Description */}
          <div>
            <h3 className="text-sm md:text-base uppercase tracking-widest text-cyan-300 font-semibold mb-3 md:mb-4">
              📋 Function
            </h3>
            <div className="whitespace-pre-wrap text-base md:text-lg text-gray-300 leading-relaxed font-light">
              {currentTab.content}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="glow-panel p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl mb-2">🔒</div>
            <p className="text-xs md:text-sm text-cyan-300 font-semibold tracking-wider mb-1">CUSTODY</p>
            <p className="text-base md:text-lg font-bold text-white">Multi-Sig Protection</p>
          </div>
          <div className="glow-panel p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl mb-2">📈</div>
            <p className="text-xs md:text-sm text-cyan-300 font-semibold tracking-wider mb-1">STRATEGY</p>
            <p className="text-base md:text-lg font-bold text-white">Real-Time Analytics</p>
          </div>
          <div className="glow-panel p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl mb-2">⚡</div>
            <p className="text-xs md:text-sm text-cyan-300 font-semibold tracking-wider mb-1">DEFENSE</p>
            <p className="text-base md:text-lg font-bold text-white">Automated Circuits</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-cyan-400/10 text-center">
          <p className="text-xs md:text-sm text-gray-600 font-mono tracking-widest">
            [RUNE_SYSTEM_ACTIVE] • [7_SACRED_DOMAINS] • [GUARDIAN_PROTOCOL_ENGAGED]
          </p>
        </div>
      </div>
    </div>
  )
}

export default RuneTabs
