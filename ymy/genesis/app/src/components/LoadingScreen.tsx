import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  visible: boolean
  message?: string
}

export default function LoadingScreen({ visible, message = 'INITIALIZING GENESIS PROTOCOL' }: LoadingScreenProps) {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    if (!visible) return

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'))
    }, 500)

    return () => clearInterval(interval)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Animated loading symbol */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-300/50 animate-spin" style={{ width: '80px', height: '80px' }} />

          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-full border border-cyan-300/30 animate-pulse" style={{ width: '64px', height: '64px' }} />

          {/* Inner glyph */}
          <div className="flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
            <span className="text-4xl font-black drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" style={{ color: '#f9cc75' }}>
              ᚲ
            </span>
          </div>
        </div>

        {/* System message */}
        <div className="text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-cyan-300 font-mono mb-4">
            [SYSTEM.LOADING]
          </p>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-slate-100 mb-2 animate-glitch" style={{ color: '#f9cc75', textShadow: '0 0 20px rgba(249, 204, 117, 0.5)' }}>
            {message}
          </h2>
          <p className="text-xs md:text-sm text-cyan-300/80 font-mono">
            Status: <span className="animate-pulse">Active{dots}</span>
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-64 h-1 bg-slate-900/60 rounded-full border border-cyan-300/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
            style={{
              width: '100%',
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: '0 0 16px rgba(34, 211, 238, 0.6)',
            }}
          />
        </div>

        {/* Footer text */}
        <p className="text-[10px] md:text-xs text-slate-400/60 font-mono uppercase tracking-wider mt-8 text-center">
          &gt; Connecting to sovereign infrastructure<br/>
          &gt; Verifying authenticity protocol<br/>
          &gt; Initializing dApp gateway
        </p>
      </div>

      {/* Scanlines effect */}
      <div
        className="absolute inset-0 pointer-events-none animate-scanlines opacity-10"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, 0.05) 25%, rgba(34, 211, 238, 0.05) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.05) 75%, rgba(34, 211, 238, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '100% 4px',
          animation: 'scanlines 8s linear infinite',
        }}
      />
    </div>
  )
}
