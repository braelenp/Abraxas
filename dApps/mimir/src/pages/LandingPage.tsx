import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import BuyAbraButton from '../components/BuyAbraButton'

export default function LandingPage() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'MIMIR'
  const targetDelay = 100

  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, targetDelay)
      return () => clearTimeout(timer)
    }
  }, [displayText, fullText, targetDelay])

  const features = [
    {
      title: 'ORACLE',
      description: 'Real-time market feeds, price discovery, and live asset data streams',
      icon: '👁',
    },
    {
      title: 'VERIFY',
      description: 'Off-chain asset verification and cryptographic attestation for RWAs',
      icon: '✓',
    },
    {
      title: 'ANALYTICS',
      description: 'Strategic market intelligence, AI synthesis, and foresight algorithms',
      icon: '📊',
    },
  ]

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col">
      <ParticleBackground />

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.85) 100%)',
          borderBottom: '1px solid rgba(0,245,255,0.25)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)',
                animation: 'buyPulse 3s ease-in-out infinite',
              }}
            />
            <span
              className="relative text-4xl font-black"
              style={{
                fontFamily: 'Cinzel, serif',
                background: 'linear-gradient(135deg, #00f5ff, #9945ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              👁
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-base font-black tracking-[0.25em]"
              style={{
                fontFamily: 'Cinzel, serif',
                background: 'linear-gradient(135deg, #00f5ff 0%, #9945ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MIMIR
            </span>
            <span className="text-[9px] tracking-[0.3em] opacity-60 text-[#00f5ff] -mt-0.5">
              THE ORACLE PROVIDER
            </span>
          </div>
        </div>

        {/* Right — Buy $ABRA */}
        <BuyAbraButton size="sm" />
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 px-4 pb-32">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          {/* Central eye */}
          <div className="mb-12 flex justify-center">
            <div
              style={{
                fontSize: '14rem',
                color: '#00f5ff',
                textShadow: '0 0 24px #00f5ff, 0 0 48px #00f5ff, 0 0 72px #9945ff',
                filter: 'drop-shadow(0 0 16px #00f5ff)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              👁
            </div>
          </div>

          {/* Main headline - Large MIMIR */}
          <h1
            className="text-7xl md:text-8xl font-black tracking-tight mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: 'linear-gradient(135deg, #00f5ff 0%, #9945ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.1em',
            }}
          >
            {displayText}
            {displayText.length < fullText.length && (
              <span className="animate-pulse">▌</span>
            )}
          </h1>

          {/* Subtitle - The Oracle Provider */}
          <p
            className="text-2xl md:text-3xl mb-8 tracking-wider"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.5)',
              fontFamily: "'Space Mono', monospace",
              fontWeight: 400,
            }}
          >
            The Oracle Provider
          </p>

          {/* Lore blurb */}
          <div
            className="mb-12 p-8 rounded-lg border max-w-2xl mx-auto"
            style={{
              borderColor: 'rgba(0, 245, 255, 0.25)',
              background: 'rgba(0, 245, 255, 0.03)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#b0b0d0' }}>
              Son of Sophia. Eyes of Abraxas.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#b0b0d0' }}>
              Mimir is the Oracle Provider—the final and most essential Son of Sophia.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#b0b0d0' }}>
              While Valkyr guards, Raido accelerates, and Fenrir protects, Mimir provides the <span style={{ color: '#00f5ff' }}>vision</span> upon which all strategy depends. Real-time market feeds. Off-chain verification. Strategic intelligence.
            </p>
            <p className="text-base md:text-lg leading-relaxed mt-6" style={{ color: '#00f5ff', fontWeight: 'bold' }}>
              See the market before it moves.
            </p>
          </div>

          {/* CTA Button */}
          <Link
            to="/app"
            className="inline-block px-8 py-4 rounded-lg font-bold tracking-widest text-lg transition-all hover:scale-105 duration-300"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: 'linear-gradient(135deg, #00f5ff, #9945ff)',
              color: '#000000',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.6)',
            }}
          >
            ENTER THE ORACLE
          </Link>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2
            className="text-3xl font-bold tracking-widest mb-12 text-center"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.6)',
            }}
          >
            THREE ASPECTS OF SIGHT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 duration-300"
                style={{
                  borderColor: 'rgba(0, 245, 255, 0.25)',
                  background: 'rgba(0, 245, 255, 0.04)',
                  boxShadow: '0 0 16px rgba(0, 245, 255, 0.1)',
                }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3
                  className="text-xl font-bold tracking-widest mb-3"
                  style={{
                    fontFamily: 'Cinzel, serif',
                    color: '#00f5ff',
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer — Fixed at bottom of landing */}
      <footer
        className="relative w-full flex flex-col items-center gap-0 px-4 py-4"
        style={{
          background: 'linear-gradient(0deg, rgba(5,5,8,1) 0%, transparent 100%)',
          marginTop: 'auto',
        }}
      >
        {/* Enter Oracle Button */}
        <Link
          to="/app"
          className="px-8 py-3 rounded-lg font-bold tracking-widest text-sm md:text-base transition-all hover:scale-105 duration-300 mb-3"
          style={{
            fontFamily: "'Space Mono', monospace",
            background: 'linear-gradient(135deg, #00f5ff, #9945ff)',
            color: '#000000',
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.6)',
          }}
        >
          ENTER ORACLE
        </Link>

        {/* Separator rune line */}
        <div className="w-full flex items-center gap-4 max-w-lg my-3">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.5))' }} />
          <span className="text-[#00f5ff] opacity-60 text-sm">👁</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,245,255,0.5), transparent)' }} />
        </div>

        {/* Footer Action Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <a
            href="https://abraxas-ten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-bold tracking-widest text-sm md:text-base transition-colors duration-300 inline-flex items-center gap-2"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: 'linear-gradient(135deg, rgba(153, 69, 255, 0.8), rgba(147, 112, 219, 0.8))',
              color: '#ffffff',
              border: '1px solid rgba(153, 69, 255, 0.5)',
              boxShadow: '0 0 16px rgba(153, 69, 255, 0.4)',
            }}
          >
            ← BACK TO ABRAXAS
          </a>
          <BuyAbraButton size="lg" />
          <a
            href="https://discord.gg/B6nM8fe3q"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-bold tracking-widest text-sm md:text-base transition-colors duration-300 inline-flex items-center gap-2"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.8), rgba(114, 137, 218, 0.8))',
              color: '#ffffff',
              border: '1px solid rgba(88, 101, 242, 0.5)',
              boxShadow: '0 0 16px rgba(88, 101, 242, 0.4)',
            }}
          >
            JOIN DISCORD
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] tracking-[0.2em] opacity-25 mt-4 text-center" style={{ fontFamily: "'Space Mono', monospace" }}>
          © 2026 MIMIR — THE ORACLE PROVIDER. ALL RIGHTS RESERVED.
        </p>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.15), transparent)',
          }}
        />
      </footer>
    </div>
  )
}
