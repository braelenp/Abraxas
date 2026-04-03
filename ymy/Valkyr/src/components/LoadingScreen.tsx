import React, { useEffect, useState } from 'react'

interface LoadingScreenProps {
  isVisible: boolean
  onComplete?: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible, onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('Initializing systems...')
  const [glitchActive, setGlitchActive] = useState(false)

  const systemMessages = [
    'Initializing systems...',
    'Connecting to Solana network...',
    'Loading vaults...',
    'Calibrating protection protocols...',
    'Synchronizing asset data...',
    'Establishing secure connection...',
    'Loading portfolio...',
    'Ready for strategic oversight...',
  ]

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      return
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          // Reach 100% and complete
          setProgress(100)
          clearInterval(progressInterval)
          return 100
        }
        const increment = Math.random() * 30
        return Math.min(prev + increment, 99)
      })
    }, 300)

    return () => {
      clearInterval(progressInterval)
    }
  }, [isVisible])

  // Separate effect to handle completion at 100%
  useEffect(() => {
    if (progress === 100) {
      const completeTimer = setTimeout(() => {
        onComplete?.()
      }, 500)
      return () => clearTimeout(completeTimer)
    }
  }, [progress, onComplete])

  // Cycle through system messages
  useEffect(() => {
    const messageIndex = Math.floor((progress / 100) * (systemMessages.length - 1))
    setCurrentText(systemMessages[messageIndex])
  }, [progress])

  // Random glitch effect
  useEffect(() => {
    if (!isVisible) return

    const glitchTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 100)
      }
    }, 500)

    return () => {
      clearInterval(glitchTimer)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite',
          }}
        ></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 7}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          ></div>
        ))}
      </div>

      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12">
        {/* Rune circle with rotating glow */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div
            className="w-24 h-24 md:w-32 md:h-32 border-2 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full"
            style={{
              animation: 'spin 3s linear infinite',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
            }}
          ></div>

          {/* Middle rotating ring (opposite direction) */}
          <div
            className="absolute inset-0 border-2 border-transparent border-b-gold border-l-orange-500 rounded-full"
            style={{
              animation: 'spin-reverse 4s linear infinite',
              boxShadow: '0 0 20px rgba(249, 204, 117, 0.4)',
            }}
          ></div>

          {/* Center rune */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl md:text-6xl font-black tracking-widest animate-pulse text-gold" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.8)' }}>
              V
            </div>
          </div>

          {/* Pulsing aura */}
          <div
            className="absolute -inset-8 md:-inset-12 border border-cyan-400/20 rounded-full"
            style={{
              animation: 'pulse-border 2s ease-in-out infinite',
            }}
          ></div>
        </div>

        {/* System text with glitch effect */}
        <div className="text-center">
          <h1 className={`text-2xl md:text-3xl font-black tracking-[0.2em] uppercase mb-4 ${glitchActive ? 'animate-glitch' : ''}`}>
            <span className="text-cyan-300">VALKYR</span>
          </h1>
          <p className="text-xs md:text-sm font-mono text-cyan-300/60 tracking-wider mb-6">
            STRATEGIC OVERSIGHT SYSTEM
          </p>
        </div>

        {/* Loading message */}
        <div className="text-center min-h-12">
          <p className={`text-sm md:text-base font-mono text-slate-300 tracking-wider transition-all duration-300 ${glitchActive ? 'opacity-60' : 'opacity-100'}`}>
            <span className="text-gold">[</span>
            <span className="text-cyan-300">{currentText}</span>
            <span className="text-gold">]</span>
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-64 md:w-80">
          {/* Outer glow box */}
          <div className="relative p-1 rounded-lg border border-cyan-400/40" style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}>
            {/* Progress bar background */}
            <div className="w-full h-2 bg-slate-800 rounded overflow-hidden border border-cyan-400/20">
              {/* Progress fill */}
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-gold rounded transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>

              {/* Animated shimmer effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                style={{
                  animation: 'shimmer 2s infinite',
                  backgroundSize: '200% 100%',
                }}
              ></div>
            </div>
          </div>

          {/* Progress percentage */}
          <div className="text-center mt-3">
            <p className="text-xs md:text-sm font-mono text-cyan-300/80">
              {Math.floor(progress)}%
            </p>
          </div>
        </div>

        {/* System status indicators */}
        <div className="flex gap-4 md:gap-6 justify-center text-xs md:text-sm font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-slate-400">Network</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${progress > 30 ? 'bg-emerald-400' : 'bg-slate-600'} ${progress > 30 ? 'animate-pulse' : ''}`}></div>
            <span className="text-slate-400">Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${progress > 60 ? 'bg-emerald-400' : 'bg-slate-600'} ${progress > 60 ? 'animate-pulse' : ''}`}></div>
            <span className="text-slate-400">Security</span>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center text-[10px] md:text-xs text-slate-500 font-mono tracking-wider mt-4">
          <p>Guardian Protocol v1.0.0</p>
          <p className="mt-1">
            <span className="text-cyan-400">SOL</span>
            {' '}
            <span className="text-purple-400">|</span>
            {' '}
            <span className="text-gold">DEVNET</span>
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-20px) translateX(20px);
            opacity: 0.6;
          }
        }

        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen
