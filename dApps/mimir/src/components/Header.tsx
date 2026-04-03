import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
      style={{
        background: 'linear-gradient(180deg, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.85) 100%)',
        borderBottom: '1px solid rgba(153,69,255,0.25)',
        backdropFilter: 'blur(12px)',
        willChange: 'transform',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 no-underline group">
        {/* Mimir symbol - The Eye */}
        <div className="relative w-9 h-9 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)',
              animation: 'buyPulse 3s ease-in-out infinite',
            }}
          />
          <span
            className="relative text-lg font-black"
            style={{
              fontFamily: "'Space Mono', monospace",
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
            className="text-base font-black tracking-[0.25em] glitch"
            data-text="MIMIR"
            style={{
              fontFamily: "'Space Mono', monospace",
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
      </Link>
      </header>
    )
  }
