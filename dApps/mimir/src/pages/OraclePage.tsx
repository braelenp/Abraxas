import { useEffect, useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import BottomActionBar from '../components/BottomActionBar'
import ParticleBackground from '../components/ParticleBackground'
import ActionModal from '../components/ActionModal'

export default function OraclePage() {
  const [displayText, setDisplayText] = useState('')
  const [selectedAction, setSelectedAction] = useState<'BUY' | 'SWAP' | 'DEPOSIT' | 'WITHDRAW' | null>(null)
  const fullText = 'Real-Time Market Intelligence.'
  const targetDelay = 100

  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, targetDelay)
      return () => clearTimeout(timer)
    }
  }, [displayText, fullText, targetDelay])

  // Mock portfolio data
  const portfolioStats = {
    totalDeposited: 50000,
    totalValue: 62500,
    totalGains: 12500,
    gainsPct: '25.0%',
  }

  const holdings = [
    { symbol: 'SOL', amount: 150, value: 21300, change: '+8.5%' },
    { symbol: 'USDC', amount: 25000, value: 25000, change: '+0.0%' },
    { symbol: 'JTO', amount: 500, value: 16200, change: '+12.3%' },
  ]

  const quickActions = [
    { label: 'BUY $ABRA', icon: '💎', href: 'https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS' },
    { label: 'SWAP', icon: '🔄', href: '#' },
    { label: 'DEPOSIT', icon: '📥', href: '#' },
    { label: 'WITHDRAW', icon: '📤', href: '#' },
  ]

  const feeds = [
    {
      name: 'SOLANA/USD',
      price: '$142.50',
      change: '+5.2%',
      status: 'LIVE',
      confidence: '99.8%',
    },
    {
      name: 'BTC/SOL',
      price: '3.847',
      change: '+2.1%',
      status: 'LIVE',
      confidence: '99.9%',
    },
    {
      name: 'ETH/SOL',
      price: '0.658',
      change: '-1.3%',
      status: 'LIVE',
      confidence: '99.7%',
    },
    {
      name: 'USDC/USD',
      price: '0.9999',
      change: '+0.01%',
      status: 'LIVE',
      confidence: '100%',
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
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Mimir's Eye Sees All Markets
          </p>
        </div>

        {/* Portfolio Balance Section */}
        <div className="max-w-5xl mx-auto w-full mb-12">
          <h2
            className="text-2xl font-bold tracking-widest mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.6)',
            }}
          >
            PORTFOLIO OVERVIEW
          </h2>

          <div
            className="p-6 rounded-lg border mb-6"
            style={{
              borderColor: 'rgba(0, 245, 255, 0.3)',
              background: 'rgba(0, 245, 255, 0.10)',
              boxShadow: '0 0 16px rgba(0, 245, 255, 0.15)',
            }}
          >
            <p style={{ color: '#8080a0', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              TOTAL BALANCE
            </p>
            <p className="text-5xl font-bold mb-2" style={{ color: '#00f5ff' }}>
              ${portfolioStats.totalValue.toLocaleString()}
            </p>
            <p style={{ color: '#00ff88', fontSize: '1rem', fontWeight: 'bold' }}>
              +${portfolioStats.totalGains.toLocaleString()} ({portfolioStats.gainsPct})
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (action.label === 'BUY $ABRA') {
                    window.open(action.href, '_blank')
                  } else {
                    setSelectedAction(action.label.split(' ')[0] as 'SWAP' | 'DEPOSIT' | 'WITHDRAW')
                  }
                }}
                className="p-4 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 duration-300 flex flex-col items-center gap-2"
                style={{
                  borderColor: 'rgba(0, 245, 255, 0.3)',
                  background: 'rgba(0, 245, 255, 0.10)',
                  boxShadow: '0 0 12px rgba(0, 245, 255, 0.15)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <span className="text-3xl">{action.icon}</span>
                <span
                  className="text-xs font-bold tracking-widest text-center"
                  style={{ fontFamily: "'Space Mono', monospace", color: '#00f5ff' }}
                >
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Modal */}
        <ActionModal
          isOpen={!!selectedAction}
          actionType={selectedAction}
          onClose={() => setSelectedAction(null)}
        />

        {/* Holdings Grid */}
        <div className="max-w-5xl mx-auto w-full mb-12">
          <h2
            className="text-2xl font-bold tracking-widest mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.6)',
            }}
          >
            HOLDINGS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {holdings.map((asset, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 duration-300"
                style={{
                  borderColor: 'rgba(0, 245, 255, 0.3)',
                  background: 'rgba(0, 245, 255, 0.10)',
                  boxShadow: '0 0 16px rgba(0, 245, 255, 0.15)',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="font-bold tracking-widest text-lg"
                    style={{ fontFamily: "'Space Mono', monospace", color: '#00f5ff' }}
                  >
                    {asset.symbol}
                  </span>
                  <span style={{ color: '#00ff88', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    {asset.change}
                  </span>
                </div>

                <div className="space-y-1">
                  <p style={{ color: '#8080a0', fontSize: '0.875rem' }}>
                    {asset.amount.toLocaleString()} {asset.symbol}
                  </p>
                  <p className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                    ${asset.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Data Feeds Grid */}
        <div className="max-w-5xl mx-auto w-full mb-12">
          <h2
            className="text-2xl font-bold tracking-widest mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.6)',
            }}
          >
            LIVE FEEDS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feeds.map((feed, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border backdrop-blur-sm transition-all hover:scale-105 duration-300"
                style={{
                  borderColor: 'rgba(0, 245, 255, 0.3)',
                  background: 'rgba(0, 245, 255, 0.10)',
                  boxShadow: '0 0 16px rgba(0, 245, 255, 0.15)',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="font-bold tracking-widest"
                    style={{ fontFamily: "'Space Mono', monospace", color: '#00f5ff' }}
                  >
                    {feed.name}
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded border"
                    style={{
                      borderColor: 'rgba(0, 255, 136, 0.5)',
                      color: '#00ff88',
                      background: 'rgba(0, 255, 136, 0.1)',
                    }}
                  >
                    {feed.status}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                    {feed.price}
                  </p>
                  <p style={{ color: feed.change.includes('-') ? '#ff6b6b' : '#00ff88' }}>
                    {feed.change}
                  </p>
                </div>

                <p
                  className="text-xs"
                  style={{ color: '#9945ff', textShadow: '0 0 6px rgba(153, 69, 255, 0.5)' }}
                >
                  Confidence: {feed.confidence}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Up / Deposit Section */}
        <div className="max-w-5xl mx-auto w-full mb-12">
          <h2
            className="text-2xl font-bold tracking-widest mb-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: '#00f5ff',
              textShadow: '0 0 12px rgba(0, 245, 255, 0.6)',
            }}
          >
            DEPOSIT MORE
          </h2>

          <div
            className="p-6 rounded-lg border"
            style={{
              borderColor: 'rgba(0, 245, 255, 0.25)',
              background: 'rgba(0, 245, 255, 0.04)',
              boxShadow: '0 0 16px rgba(0, 245, 255, 0.1)',
            }}
          >
            <div className="mb-4">
              <label
                style={{
                  fontFamily: "'Space Mono', monospace",
                  color: '#8080a0',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  display: 'block',
                }}
              >
                AMOUNT (USD)
              </label>
              <input
                type="number"
                placeholder="Enter deposit amount"
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  background: 'rgba(0, 245, 255, 0.05)',
                  border: '1px solid rgba(0, 245, 255, 0.2)',
                  color: '#00f5ff',
                }}
              />
            </div>

            <button
              className="w-full px-6 py-3 rounded-lg font-bold tracking-widest transition-all hover:scale-105 duration-300"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: 'linear-gradient(135deg, #00f5ff, #9945ff)',
                color: '#000000',
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.6)',
              }}
            >
              DEPOSIT NOW
            </button>
          </div>
        </div>

        {/* Center Eye Rune */}
        <div className="flex justify-center my-12">
          <div
            className="text-8xl"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 16px #00f5ff, 0 0 32px #00f5ff, 0 0 48px #9945ff',
              filter: 'drop-shadow(0 0 12px #00f5ff)',
            }}
          >
            👁
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
