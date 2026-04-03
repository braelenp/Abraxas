import React, { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import LightBeams from './LightBeams'

const LandingPage = ({ onExplore }) => {
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [displayedDescription, setDisplayedDescription] = useState('')
  const titleText = 'FENRIR'
  const descriptionText = 'Welcome to the next degree.'
  const taglineText = 'The Swift Guardian, Son of Sophia'

  useEffect(() => {
    let charIndex = 0
    const typeTitle = () => {
      if (charIndex <= titleText.length) {
        setDisplayedTitle(titleText.substring(0, charIndex))
        charIndex++
        setTimeout(typeTitle, 60)
      } else {
        typeDescription()
      }
    }
    typeTitle()
  }, [])

  const typeDescription = () => {
    let charIndex = 0
    const typeDesc = () => {
      if (charIndex <= descriptionText.length) {
        setDisplayedDescription(descriptionText.substring(0, charIndex))
        charIndex++
        setTimeout(typeDesc, 40)
      }
    }
    typeDesc()
  }

  return (
    <div className="relative w-full bg-deep-black overflow-hidden">
      <ParticleBackground count={30} color="#ff6024" />
      <LightBeams />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-deep-black bg-opacity-80 backdrop-blur border-b border-purple-core">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="font-display text-2xl font-bold glow-text">ABRAXAS</div>
          <button
            onClick={() => window.open('https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS', '_blank')}
            className="ui-action ui-action-gold text-sm px-4 py-2"
          >
            BUY $ABRA TOKEN
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* Thurisaz Rune */}
        <div className="mb-8 flex justify-center">
          <div
            className="text-9xl rune-advanced-glow"
            style={{
              color: '#ff6024',
            }}
          >
            ↑
          </div>
        </div>

        {/* Main Title */}
        <div className="mb-6 text-center">
          <h1
            className="font-display text-7xl md:text-8xl font-bold tracking-wider"
            style={{
              textShadow: '0 0 30px rgba(153, 69, 255, 0.8)',
              color: '#9945ff',
              minHeight: '100px',
            }}
          >
            {displayedTitle}
            {displayedTitle.length < titleText.length && (
              <span className="animate-pulse" style={{ color: '#ff6024' }}>_</span>
            )}
          </h1>
        </div>

        {/* Subtitle Description */}
        {displayedTitle === titleText && (
          <div
            className="mb-6 text-center animate-fade-in"
            style={{ animation: 'fadeIn 0.5s ease-in' }}
          >
            <h2
              className="font-display text-4xl md:text-5xl font-bold tracking-wider"
              style={{
                textShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
                color: '#06b6d4',
                minHeight: '80px',
              }}
            >
              {displayedDescription}
              {displayedDescription.length < descriptionText.length && (
                <span className="animate-pulse" style={{ color: '#ff6024' }}>_</span>
              )}
            </h2>
          </div>
        )}

        {/* Tagline */}
        {displayedDescription === descriptionText && (
          <div
            className="mb-12 text-center animate-fade-in"
            style={{ animation: 'fadeIn 0.8s ease-in 0.2s both' }}
          >
            <p className="font-display text-xl md:text-2xl text-orange-fire font-bold">
              {taglineText}
            </p>
          </div>
        )}

        {/* CTA Buttons */}
        {displayedDescription === descriptionText && (
          <div
            className="mb-16 flex flex-col sm:flex-row gap-6 justify-center animate-fade-in"
            style={{ animation: 'fadeIn 0.8s ease-in 0.5s both' }}
          >
            <button
              onClick={onExplore}
              className="ui-action ui-action-cyan px-8 py-3 text-lg"
            >
              EXPLORE
            </button>
            <button
              onClick={() => window.open('https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS', '_blank')}
              className="ui-action ui-action-gold px-8 py-3 text-lg"
            >
              BUY $ABRA TOKEN
            </button>
          </div>
        )}
      </div>

      {/* Feature Grid Section */}
      {displayedDescription === descriptionText && (
        <div
          className="relative z-10 pb-24 px-4 animate-fade-in"
          style={{ animation: 'fadeIn 1s ease-in 0.8s both' }}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Protection Card */}
            <div className="neon-border-orange card-glow p-8 rounded text-center">
              <div className="text-5xl mb-4 triple-glow" style={{ color: '#ff6024' }}>⚔</div>
              <h3 className="font-display text-xl font-bold glow-text-orange mb-3">PROTECTION</h3>
              <p className="font-mono text-sm text-cyan-light">
                Defend sovereign boundaries with unbreakable will
              </p>
            </div>

            {/* Enforcement Card */}
            <div className="neon-border-orange card-glow p-8 rounded text-center">
              <div className="text-5xl mb-4 triple-glow" style={{ color: '#ff6024' }}>↑</div>
              <h3 className="font-display text-xl font-bold glow-text-orange mb-3">ENFORCEMENT</h3>
              <p className="font-mono text-sm text-cyan-light">
                Enforce rules and protocols with raw sovereign power
              </p>
            </div>

            {/* Sovereignty Card */}
            <div className="neon-border-orange card-glow p-8 rounded text-center">
              <div className="text-5xl mb-4 triple-glow" style={{ color: '#ff6024' }}>◆</div>
              <h3 className="font-display text-xl font-bold glow-text-orange mb-3">SOVEREIGNTY</h3>
              <p className="font-mono text-sm text-cyan-light">
                Guard collective sovereignty and species protection
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lore Section */}
      {displayedDescription === descriptionText && (
        <div
          className="relative z-10 pb-24 px-4 animate-fade-in"
          style={{ animation: 'fadeIn 1s ease-in 1s both' }}
        >
          <div className="max-w-3xl mx-auto neon-border-cyan card-glow p-12 rounded text-center">
            <p className="font-mono text-sm text-cyan-light leading-relaxed mb-4">
              Son of Sophia. The unbreakable guardian who destroys threats,
            </p>
            <p className="font-mono text-sm text-cyan-light leading-relaxed mb-6">
              enforces boundaries, and protects the species with raw sovereign power.
            </p>
            <div className="flex justify-center gap-3">
              <span className="font-display text-lg triple-glow" style={{ color: '#ff6024' }}>⚔</span>
              <span className="font-display text-lg color-shift-glow" style={{ color: '#9945ff' }}>◆</span>
              <span className="font-display text-lg triple-glow" style={{ color: '#ff6024' }}>⚔</span>
            </div>
          </div>
        </div>
      )}

      {/* Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  )
}

export default LandingPage
