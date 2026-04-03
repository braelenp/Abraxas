import React, { useState } from 'react'

interface ProtectionFlowItem {
  icon: string
  title: string
  description: string
  stats?: string
}

const ProtectionFlow: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)

  const flowItems: ProtectionFlowItem[] = [
    {
      icon: '🛡️',
      title: 'Portfolio Defense',
      description: 'Multi-sig vault architecture protecting your tokenized assets from unauthorized access. Real-time monitoring of all custodial positions.',
      stats: 'Military-grade encryption',
    },
    {
      icon: '📊',
      title: 'Risk Overview',
      description: 'Comprehensive risk analytics ecosystem providing real-time exposure tracking. Integrated alerts for unusual portfolio movements.',
      stats: 'Live market feeds',
    },
    {
      icon: '🔐',
      title: 'Governance Tools',
      description: 'Strategic oversight mechanisms ensuring long-term asset protection. Participate in custody and strategic decisions.',
      stats: 'On-chain governance',
    },
  ]

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8 relative z-20 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text">Strategic Oversight</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Valkyr provides three pillars of protection for your tokenized assets on Solana
          </p>
        </div>

        {/* Tabs - Mobile optimized */}
        <div className="mb-8 flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
          {flowItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base
                transition-all duration-300 tracking-wide
                ${
                  activeTab === index
                    ? 'glow-panel-purple bg-purple-900/40 border border-purple-500 text-purple-200 shadow-[0_0_30px_rgba(153,69,255,0.5)]'
                    : 'glow-panel border-cyan-400/30 text-cyan-300 hover:border-cyan-400/50'
                }
              `}
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="glow-panel p-6 md:p-8 min-h-64">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            {/* Left side - Icon */}
            <div className="flex-shrink-0 text-5xl md:text-6xl">
              {flowItems[activeTab].icon}
            </div>

            {/* Right side - Content */}
            <div className="flex-grow">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 neon-text-purple">
                {flowItems[activeTab].title}
              </h3>
              <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed">
                {flowItems[activeTab].description}
              </p>
              {flowItems[activeTab].stats && (
                <div className="text-sm md:text-base text-cyan-400 font-mono">
                  → {flowItems[activeTab].stats}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Grid - 3 columns */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {flowItems.map((item, index) => (
            <div
              key={index}
              className={`glow-panel p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                activeTab === index ? 'glow-panel-purple border-purple-500' : 'hover:glow-panel-purple'
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-lg md:text-xl font-bold mb-2 text-cyan-300">{item.title}</h4>
              <p className="text-sm md:text-base text-gray-400">{item.description.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProtectionFlow
