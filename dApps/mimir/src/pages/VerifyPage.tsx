import { useEffect, useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import BottomActionBar from '../components/BottomActionBar'
import ParticleBackground from '../components/ParticleBackground'

export default function VerifyPage() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Off-Chain Verification Engine.'
  const targetDelay = 100

  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, targetDelay)
      return () => clearTimeout(timer)
    }
  }, [displayText, fullText, targetDelay])

  const verifications = [
    {
      asset: 'AAPL (Real Stock)',
      status: 'VERIFIED',
      confidence: '99.9%',
      timestamp: 'Live',
      color: '#00ff88',
    },
    {
      asset: 'MSFT (Real Stock)',
      status: 'VERIFIED',
      confidence: '99.8%',
      timestamp: 'Live',
      color: '#00ff88',
    },
    {
      asset: 'Gold (Physical)',
      status: 'VERIFIED',
      confidence: '99.7%',
      timestamp: 'Live',
      color: '#00ff88',
    },
    {
      asset: 'Treasury Bond (US)',
      status: 'VERIFIED',
      confidence: '99.95%',
      timestamp: 'Live',
      color: '#00ff88',
    },
    {
      asset: 'Real Estate (Property)',
      status: 'VERIFYING',
      confidence: '94.2%',
      timestamp: '2m ago',
      color: '#ffa500',
    },
    {
      asset: 'Commodity (Oil)',
      status: 'VERIFIED',
      confidence: '99.6%',
      timestamp: 'Live',
      color: '#00ff88',
    },
  ]

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
      <ParticleBackground />

      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-24 px-4 overflow-y-auto flex flex-col">
        {/* Mimir Branding Section */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <div
              className="text-9xl"
              style={{
                color: '#00f5ff',
                textShadow: '0 0 16px #00f5ff, 0 0 32px #9945ff',
                filter: 'drop-shadow(0 0 12px #00f5ff)',
              }}
            >
              👁
            </div>
            <div className="text-center">
              <p
                className="text-5xl md:text-6xl font-bold tracking-widest"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  background: 'linear-gradient(135deg, #00f5ff, #9945ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                MIMIR
              </p>
              <p
                className="text-lg md:text-xl tracking-widest opacity-70"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  color: '#00f5ff',
                }}
              >
                THE ORACLE PROVIDER
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto w-full mb-12 text-center">
          {/* Typing reveal */}
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight mb-2 glitch"
            data-text={displayText}
            style={{
              fontFamily: "'Space Mono', monospace",
              color: '#00f5ff',
              textShadow: '0 0 16px #00f5ff, 0 0 32px #00f5ff, 0 0 48px rgba(0, 245, 255, 0.5)',
              minHeight: '3.5rem',
            }}
          >
            {displayText}
            {displayText.length < fullText.length && (
              <span>▌</span>
            )}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl mb-8 tracking-wide"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.5)',
              fontFamily: 'Cinzel, serif',
            }}
          >
            Trust the Uncorruptible Attestation
          </p>

          {/* Lore blurb */}
          <div
            className="mb-12 p-6 rounded-lg border"
            style={{
              borderColor: 'rgba(0, 245, 255, 0.3)',
              background: 'rgba(0, 245, 255, 0.10)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#b0b0d0' }}>
              Mimir's verification engine authenticates real-world assets across every sphere.
              <br />
              Off-chain data flows through cryptographic attestation, enabling trust without intermediaries.
              <br />
              <span style={{ color: '#00f5ff' }}>Every asset, verified. Every claim, certified.</span>
            </p>
          </div>
        </div>

        {/* Verification Status Grid */}
        <div className="max-w-5xl mx-auto w-full">
          <h2
            className="text-2xl font-bold tracking-widest mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.6)',
            }}
          >
            ASSET ATTESTATIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifications.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 duration-300"
                style={{
                  borderColor: 'rgba(0, 245, 255, 0.3)',
                  background: 'rgba(0, 245, 255, 0.10)',
                  boxShadow: `0 0 16px ${item.color}40`,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="font-bold tracking-wide text-sm"
                    style={{ fontFamily: 'Cinzel, serif', color: '#ffffff' }}
                  >
                    {item.asset}
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded border font-bold"
                    style={{
                      borderColor: item.color + '80',
                      color: item.color,
                      background: item.color + '15',
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p style={{ color: '#b0b0d0', fontSize: '0.875rem' }}>
                    Confidence: <span style={{ color: item.color, fontWeight: 'bold' }}>{item.confidence}</span>
                  </p>
                  <p style={{ color: '#8080a0', fontSize: '0.75rem' }}>{item.timestamp}</p>
                </div>

                {/* Verification bar */}
                <div
                  className="mt-3 h-1 rounded-full border overflow-hidden"
                  style={{ borderColor: item.color + '40', background: item.color + '10' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: item.confidence,
                      background: `linear-gradient(90deg, ${item.color}, #00f5ff)`,
                      boxShadow: `0 0 8px ${item.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Verification Rune */}
        <div className="flex justify-center my-12">
          <div
            className="text-8xl"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 16px #00f5ff, 0 0 32px #00f5ff, 0 0 48px #9945ff',
              filter: 'drop-shadow(0 0 12px #00f5ff)',
            }}
          >
            ✓
          </div>
        </div>

        {/* Bottom Action Bar - Scrollable Footer */}
        <BottomActionBar />
      </main>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  )
}
