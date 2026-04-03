import React from 'react'

interface LogoProps {
  variant?: 'animated' | 'static'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Logo: React.FC<LogoProps> = ({ variant = 'static', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  }

  const runeTextSize = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-6xl md:text-7xl',
  }

  if (variant === 'static') {
    // Static logo - just the V
    return (
      <div
        className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}
        style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.6)' }}
      >
        <div className={`${runeTextSize[size]} font-black tracking-widest drop-shadow-lg text-gold`}>V</div>
      </div>
    )
  }

  // Animated logo (for loading screen)
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer rotating ring */}
      <div
        className="w-full h-full border-2 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full absolute"
        style={{
          animation: 'spin 3s linear infinite',
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
        }}
      ></div>

      {/* Middle rotating ring (opposite direction) */}
      <div
        className="w-full h-full border-2 border-transparent border-b-gold border-l-orange-500 rounded-full absolute"
        style={{
          animation: 'spin-reverse 4s linear infinite',
          boxShadow: '0 0 20px rgba(249, 204, 117, 0.4)',
        }}
      ></div>

      {/* Center rune */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${runeTextSize[size]} font-black tracking-widest animate-pulse text-gold`} style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.8)' }}>
          V
        </div>
      </div>

      {/* Pulsing aura */}
      <div
        className="absolute -inset-4 md:-inset-6 border border-cyan-400/20 rounded-full"
        style={{
          animation: 'pulse-border 2s ease-in-out infinite',
        }}
      ></div>

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
      `}</style>
    </div>
  )
}

export default Logo
