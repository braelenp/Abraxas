import { useEffect, useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import BottomActionBar from '../components/BottomActionBar'
import ParticleBackground from '../components/ParticleBackground'

export default function AnalyticsPage() {
  const fullText = 'Strategic Market Intelligence.'

  const metrics = [
    {
      label: 'Market Volatility',
      value: '24.3%',
      status: 'ELEVATED',
      icon: '⚡',
      trend: '↑ +2.1%',
    },
    {
      label: 'Liquidity Index',
      value: '8.7/10',
      status: 'ROBUST',
      icon: '💧',
      trend: '↑ +0.3',
    },
    {
      label: 'Sentiment Score',
      value: '67/100',
      status: 'BULLISH',
      icon: '📈',
      trend: '↑ +5pts',
    },
    {
      label: 'RWA Volume (24h)',
      value: '$1.2B',
      status: 'ACTIVE',
      icon: '📊',
      trend: '↑ +18%',
    },
  ]

  const insights = [
    'Solana on-chain activity surging—optimal conditions for asset tokenization',
    'RWA market cap acceleration exceeds traditional equity growth by 340%',
    'Cross-asset correlations weakening—diversification opportunities emerge',
    'Whales accumulating ABRA positions; institutional signal strengthening',
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
            {fullText}
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
            Foresight-Driven Decision Intelligence
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
              Mimir synthesizes vast market data into actionable foresight.
              <br />
              Real-time analytics reveal hidden patterns, correlations, and opportunities across all asset classes.
              <br />
              <span style={{ color: '#00f5ff' }}>See the market before it moves.</span>
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="max-w-5xl mx-auto w-full mb-12">
          <h2
            className="text-2xl font-bold tracking-widest mb-6"
            style={{
              fontFamily: 'Cinzel, serif',
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.6)',
            }}
          >
            KEY METRICS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 duration-300"
                style={{
                  borderColor: 'rgba(0, 245, 255, 0.3)',
                  background: 'rgba(0, 245, 255, 0.10)',
                  boxShadow: '0 0 16px rgba(0, 245, 255, 0.15)',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p style={{ color: '#8080a0', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {m.label}
                    </p>
                    <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>
                      {m.value}
                    </p>
                  </div>
                  <span className="text-3xl">{m.icon}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className="text-xs px-2 py-1 rounded border font-bold"
                    style={{
                      borderColor: 'rgba(153, 69, 255, 0.5)',
                      color: '#9945ff',
                      background: 'rgba(153, 69, 255, 0.1)',
                    }}
                  >
                    {m.status}
                  </span>
                  <span style={{ color: '#00ff88', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    {m.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="max-w-5xl mx-auto w-full">
          <h2
            className="text-2xl font-bold tracking-widest mb-6"
            style={{
              fontFamily: 'Cinzel, serif',
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.6)',
            }}
          >
            AI SYNTHESIS
          </h2>

          <div className="space-y-3">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border-l-2 backdrop-blur-sm"
                style={{
                  borderLeftColor: '#9945ff',
                  borderColor: 'rgba(0, 245, 255, 0.25)',
                  background: 'rgba(153, 69, 255, 0.12)',
                }}
              >
                <p style={{ color: '#d0d0e8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Center Analytics Rune */}
        <div className="flex justify-center my-12">
          <div
            className="text-8xl"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 16px #00f5ff, 0 0 32px #00f5ff, 0 0 48px #9945ff',
              filter: 'drop-shadow(0 0 12px #00f5ff)',
            }}
          >
            📊
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
