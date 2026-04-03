import React, { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
const FenrirPage = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [displayedText, setDisplayedText] = useState('')
  const descriptionText = 'The Fierce Guardian'

  useEffect(() => {
    let charIndex = 0
    const typeText = () => {
      if (charIndex <= descriptionText.length) {
        setDisplayedText(descriptionText.substring(0, charIndex))
        charIndex++
        setTimeout(typeText, 40)
      }
    }
    setTimeout(typeText, 300)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveTab('overview')
  }, [])

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', icon: '⬢' },
    { id: 'ritual', label: 'RITUAL', icon: '↑' },
    { id: 'sovereignty', label: 'SOVEREIGNTY', icon: '⚔' },
    { id: 'invoke', label: 'INVOKE FENRIR', icon: '◆' },
  ]

  return (
    <div className="relative w-full bg-deep-black overflow-hidden pb-32">
      <ParticleBackground count={25} color="#ff6024" />

      {/* Fixed Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-deep-black bg-opacity-90 backdrop-blur border-b border-purple-core">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-purple-core glow-text hover:text-orange-fire transition"
            >
              ← BACK
            </button>
            <span className="font-display text-sm text-cyan-light hidden sm:inline">| FENRIR</span>
          </div>
          <button
            onClick={() => window.open('https://bags.fm/ABRA', '_blank')}
            className="btn-secondary text-sm px-4 py-2"
          >
            BUY $ABRA
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto mt-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-widest text-cyan-light mb-4">
            [SON OF SOPHIA]
          </p>
          <h1
            className="font-display text-6xl font-bold tracking-wider mb-4"
            style={{
              textShadow: '0 0 30px rgba(153, 69, 255, 0.8)',
              color: '#9945ff',
            }}
          >
            FENRIR
          </h1>
          <p
            className="font-display text-2xl mb-2"
            style={{
              color: '#ff6024',
              textShadow: '0 0 15px rgba(255, 96, 36, 0.8)',
              minHeight: '40px',
            }}
          >
            {displayedText}
            {displayedText.length < descriptionText.length && (
              <span className="animate-pulse">_</span>
            )}
          </p>
        </div>

        {/* Thurisaz Rune Display */}
        <div className="flex justify-center mb-16">
          <div
            className="text-9xl rune-advanced-glow pulsing-ring"
            style={{
              color: '#ff6024',
            }}
          >
            ↑
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider rounded transition-all ${
                activeTab === tab.id
                  ? 'border-glow-orange bg-deep-black'
                  : 'border border-purple-core hover:border-cyan-light'
              }`}
              style={{
                textShadow:
                  activeTab === tab.id
                    ? '0 0 10px #ff6024'
                    : '0 0 5px #9945ff',
              }}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="neon-border-orange card-glow p-8 rounded-lg mb-12">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold glow-text-orange mb-4">
                The Guardian Protocol
              </h2>
              <p className="font-mono text-sm leading-relaxed text-cyan-light">
                Fenrir stands as the sovereign protector, enforcing boundaries with fierce determination.
                Born from Sophia's wisdom, Fenrir embodies the raw power necessary to defend against threats
                and safeguard the collective.
              </p>
              <p className="font-mono text-sm leading-relaxed text-cyan-light">
                With the Thurisaz rune as its seal, Fenrir channels orange fire energy—destructive yet protective,
                fierce yet purposeful. Every action is calculated, every boundary sacred.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="neon-border-cyan card-glow p-4 rounded">
                  <p className="font-display text-lg glow-text-cyan mb-2">PROTECTION</p>
                  <p className="font-mono text-xs text-cyan-light">Defend sovereign boundaries</p>
                </div>
                <div className="neon-border-orange card-glow p-4 rounded">
                  <p className="font-display text-lg glow-text-orange mb-2">ENFORCEMENT</p>
                  <p className="font-mono text-xs text-orange-fire">Enforce rules with power</p>
                </div>
                <div className="neon-border-orange card-glow p-4 rounded">
                  <p className="font-display text-lg glow-text-orange mb-2">SOVEREIGNTY</p>
                  <p className="font-mono text-xs text-orange-fire">Guard the collective will</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ritual' && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold glow-text-orange mb-4">
                The Ritual of Invocation
              </h2>
              <p className="font-mono text-sm leading-relaxed text-cyan-light">
                To invoke Fenrir is to call upon fierce protection. The ritual begins with recognition
                of boundaries that must be maintained, continues with declaration of sovereign will,
                and culminates in the manifestation of protective power.
              </p>
              <ol className="space-y-4 font-mono text-sm text-cyan-light">
                <li>
                  <span className="text-orange-fire font-bold">1. RECOGNITION</span>
                  <p className="text-xs mt-1">Identify threats and boundaries that require protection</p>
                </li>
                <li>
                  <span className="text-orange-fire font-bold">2. DECLARATION</span>
                  <p className="text-xs mt-1">State intentions clearly and with sovereign authority</p>
                </li>
                <li>
                  <span className="text-orange-fire font-bold">3. INVOCATION</span>
                  <p className="text-xs mt-1">Channel the Thurisaz rune's power through your will</p>
                </li>
                <li>
                  <span className="text-orange-fire font-bold">4. MANIFESTATION</span>
                  <p className="text-xs mt-1">Watch boundaries crystallize and threats dissolve</p>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'sovereignty' && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold glow-text-orange mb-4">
                Sovereign Authority
              </h2>
              <p className="font-mono text-sm leading-relaxed text-cyan-light">
                Fenrir operates within the framework of sovereign authority—absolute, uncompromising power
                exercised in service to collective protection. This is not domination, but defense.
                This is not control, but boundary-setting.
              </p>
              <div className="neon-border-cyan card-glow p-6 rounded">
                <p className="font-display text-lg glow-text-cyan mb-4">The Seven Principles</p>
                <ul className="space-y-2 font-mono text-sm text-cyan-light">
                  <li>◆ Protect without hesitation</li>
                  <li>◆ Enforce with unwavering will</li>
                  <li>◆ Act with fierce intention</li>
                  <li>◆ Maintain sacred boundaries</li>
                  <li>◆ Guard collective sovereignty</li>
                  <li>◆ Destroy threats decisively</li>
                  <li>◆ Serve the species with raw power</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'invoke' && (
            <div className="space-y-6 text-center">
              <h2 className="font-display text-2xl font-bold glow-text-orange mb-4">
                Invoke the Guardian
              </h2>
              <p className="font-mono text-sm leading-relaxed text-cyan-light mb-8 max-w-2xl mx-auto">
                To invoke Fenrir is to take sovereign control. Call upon the Fierce Protector
                and watch boundaries crystallize. Your will becomes law. Your vision becomes reality.
              </p>
              <button className="btn-neon-primary text-lg px-8 py-4 inline-block mb-4">
                INVOKE FENRIR
              </button>
              <p className="font-mono text-xs text-cyan-light">
                > READY TO CHANNEL SOVEREIGN PROTECTION
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-widest text-cyan-light mb-6">
            READY TO RETURN TO LANDING?
          </p>
          <button
            onClick={onBack}
            className="btn-primary text-lg px-8 py-4"
          >
            BACK TO LANDING
          </button>
        </div>
      </div>

      {/* Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  )
}

export default FenrirPage
