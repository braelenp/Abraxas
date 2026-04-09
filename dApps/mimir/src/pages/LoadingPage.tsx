import { useEffect, useState } from 'react'

interface LoadingPageProps {
  onComplete?: () => void
}

export default function LoadingPage({ onComplete }: LoadingPageProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)
  const [loadingBar, setLoadingBar] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)
  const [allMessagesComplete, setAllMessagesComplete] = useState(false)
  const startTimeRef = { current: Date.now() }

  const messages = [
    '> INITIALIZING_ORACLE_ENGINE...',
  ]

  // Typing effect for messages
  useEffect(() => {
    if (messageIndex < messages.length) {
      const message = messages[messageIndex]
      if (displayedText.length < message.length) {
        const timer = setTimeout(() => {
          setDisplayedText(message.slice(0, displayedText.length + 1))
        }, 60)
        return () => clearTimeout(timer)
      } else {
        // Message complete, wait before next
        const timer = setTimeout(() => {
          if (messageIndex === messages.length - 1) {
            // All messages complete
            setAllMessagesComplete(true)
          } else {
            setMessageIndex(messageIndex + 1)
            setDisplayedText('')
          }
        }, 800)
        return () => clearTimeout(timer)
      }
    }
  }, [displayedText, messageIndex, messages])

  // Loading bar progress - synced with message completion
  useEffect(() => {
    if (allMessagesComplete) {
      // Once all messages complete, quickly finish the bar
      setLoadingBar(100)
      return
    }
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      // Adjust timing: single message takes ~1.2 seconds to complete
      const progress = Math.min((elapsed / 1200) * 100, 99)
      setLoadingBar(progress)
    }, 50)
    return () => clearInterval(interval)
  }, [allMessagesComplete])

  // Glitch effect every 3 seconds
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 100)
    }, 3000)
    return () => clearInterval(glitchInterval)
  }, [])

  // Trigger onComplete callback when all messages are done
  useEffect(() => {
    if (allMessagesComplete && onComplete) {
      // Give a brief pause to show completion
      const timer = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [allMessagesComplete, onComplete])

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* SVG Grid background */}
      <svg className="fixed inset-0 w-full h-full opacity-10 pointer-events-none">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f5ff" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00f5ff', stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: '#00f5ff', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#00f5ff', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#gridGradient)" />
      </svg>

      {/* Circuit pattern overlay */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Central Eye with rotating rings */}
        <div
          className={`w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/25 via-slate-950 to-violet-400/25 border-2 border-cyan-400/60 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-cyan-400/40 transition-all duration-100 ${glitchActive ? 'scale-110 opacity-80' : ''}`}
          style={{
            filter: glitchActive
              ? 'hue-rotate(30deg) drop-shadow(0 0 20px rgba(0, 245, 255, 0.8))'
              : 'drop-shadow(0 0 30px rgba(0, 245, 255, 0.5))',
          }}
        >
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-l-4 border-t-4 border-cyan-400 animate-spin" />
          {/* Inner reverse ring */}
          <div
            className="absolute inset-1 rounded-full border-r-2 border-b-2 border-violet-400/50 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '3s' }}
          />
          {/* Eye emoji */}
          <span
            className="text-6xl font-black text-cyan-400 font-mono drop-shadow-[0_0_30px_rgba(0,245,255,1)] z-10"
            style={{
              textShadow: '0 0 20px #00f5ff, 0 0 40px #9945ff',
            }}
          >
            👁
          </span>
        </div>

        {/* Terminal messages */}
        <div className="max-w-md">
          <div
            className="p-4 font-mono text-sm text-cyan-400 font-bold h-24 flex flex-col justify-end"
            style={{
              border: '1px solid rgba(0, 245, 255, 0.3)',
              background: 'rgba(0, 245, 255, 0.03)',
              backdropFilter: 'blur(8px)',
              textShadow: '0 0 8px #00f5ff',
            }}
          >
            {messages.slice(0, messageIndex).map((msg, idx) => (
              <div key={idx} className="opacity-60 text-xs">
                {msg}
              </div>
            ))}
            {messageIndex < messages.length && (
              <div className="text-cyan-400">
                {displayedText}
                <span className="animate-pulse">▌</span>
              </div>
            )}
          </div>
        </div>

        {/* System stats */}
        <div className="flex gap-8 text-xs font-mono opacity-50">
          <span>CPU • {Math.round(loadingBar)}%</span>
          <span>MEM • 64%</span>
          <span>NET • LIVE</span>
        </div>

        {/* Loading progress bar */}
        <div className="w-64 h-1 rounded-full overflow-hidden border border-cyan-400/30" style={{ background: 'rgba(0, 245, 255, 0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{
              width: `${loadingBar}%`,
              background: 'linear-gradient(90deg, #00f5ff, #9945ff)',
              boxShadow: '0 0 12px #00f5ff',
            }}
          />
        </div>

        {/* Footer text */}
        <p className="text-xs text-cyan-400/60 tracking-widest font-mono">
          AWAITING_YOUR_SIGHT...
        </p>
      </div>
    </div>
  )
}
