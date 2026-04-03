import { useEffect, useState } from 'react'

export function AnimatedPulseText() {
  const [glitch, setGlitch] = useState(false)
  const [scanline, setScanline] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 120)
    }, 4000)
    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanline(true)
      setTimeout(() => setScanline(false), 150)
    }, 3500)
    return () => clearInterval(scanInterval)
  }, [])

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Scanline effect overlay */}
      {scanline && (
        <div className="absolute inset-0 pointer-events-none opacity-50 w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
        </div>
      )}

      {/* Multi-layer glitch text effect */}
      <div className="relative w-full text-center">
        {/* Red glitch layer */}
        {glitch && (
          <div
            className="absolute inset-0 font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter pointer-events-none"
            style={{
              opacity: 0.8,
              transform: 'translate(4px, -4px)',
              zIndex: 2,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            PULSE
          </div>
        )}

        {/* Cyan glitch layer */}
        {glitch && (
          <div
            className="absolute inset-0 font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter pointer-events-none"
            style={{
              opacity: 0.8,
              transform: 'translate(-4px, 4px)',
              zIndex: 2,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            PULSE
          </div>
        )}

        {/* Deep purple glow layer 1 */}
        <div className="absolute inset-0 blur-3xl opacity-50 pointer-events-none">
          <div className="text-center font-black text-purple-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
            PULSE
          </div>
        </div>

        {/* Deep purple glow layer 2 */}
        <div className="absolute inset-0 blur-2xl opacity-40 pointer-events-none">
          <div className="text-center font-black text-purple-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
            PULSE
          </div>
        </div>

        {/* Main purple text with glow - visible layer */}
        <div className="relative text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter drop-shadow-[0_0_50px_rgba(168,85,247,0.8)]">
          PULSE
        </div>
      </div>

      {/* Animated border/frame effect */}
      <div className="absolute inset-0 pointer-events-none w-full">
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
      </div>

      <style>{`
        @keyframes glitch-shift {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
