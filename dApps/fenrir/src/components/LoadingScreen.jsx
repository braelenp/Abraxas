import React, { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground'
import LightBeams from './LightBeams'

const LoadingScreen = ({ onLoadComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const fullText = 'ACCESSING SOVEREIGN ARCHIVES'
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let charIndex = 0
    let typingInterval

    const typeCharacter = () => {
      if (charIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, charIndex))
        charIndex++
        typingInterval = setTimeout(typeCharacter, 50)
      } else {
        clearTimeout(typingInterval)
        setTimeout(() => setIsComplete(true), 500)
      }
    }

    typeCharacter()
    return () => clearTimeout(typingInterval)
  }, [])

  useEffect(() => {
    if (!isComplete) return

    let progressInterval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          clearInterval(progressInterval)
          setTimeout(() => onLoadComplete?.(), 500)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 300)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [isComplete, onLoadComplete])

  return (
    <div className="fixed inset-0 bg-deep-black flex items-center justify-center overflow-hidden">
      <LightBeams />
      <ParticleBackground count={15} color="#ff6024" />

      <div className="relative z-20 text-center">
        {/* Central Rune */}
        <div className="mb-12 flex justify-center">
          <div className="text-8xl rune-advanced-glow pulsing-ring" style={{ color: '#ff6024' }}>
            ↑
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <p className="font-mono text-sm tracking-widest text-cyan-light mb-4">
            [FENRIR PROTOCOL INITIALIZED]
          </p>
          <h1
            className="font-display text-2xl font-bold tracking-wider color-shift-glow"
            style={{
              color: '#9945ff',
              minHeight: '40px',
            }}
          >
            {displayedText}
            {!isComplete && (
              <span className="animate-pulse" style={{ color: '#ff6024' }}>
                _
              </span>
            )}
          </h1>
        </div>

        {/* Status Messages */}
        {isComplete && (
          <div className="mb-8 space-y-2 font-mono text-xs text-cyan-light animate-pulse">
            <p>&gt; LOADING SOVEREIGN DATA...</p>
            <p>&gt; BINDING FIERCE CONSCIOUSNESS...</p>
            <p>&gt; CALIBRATING PROTECTIVE PROTOCOLS...</p>
          </div>
        )}

        {/* Progress Bar */}
        {isComplete && (
          <div className="w-64 mx-auto mt-8">
            <div className="h-2 bg-void border-2 border-purple-core relative overflow-hidden neon-border-purple">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, #ff6024, #9945ff, #06b6d4)',
                  boxShadow: '0 0 15px #ff6024, 0 0 25px #9945ff, 0 0 35px #06b6d4',
                }}
              />
            </div>
            <p className="text-xs text-orange-fire mt-3 font-mono">
              {Math.floor(Math.min(progress, 100))}%
            </p>
          </div>
        )}
      </div>

      {/* Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  )
}

export default LoadingScreen
