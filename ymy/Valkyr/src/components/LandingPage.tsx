import React from 'react'
import ParticleBackground from './ParticleBackground'
import LightBeams from './LightBeams'
import TypingText from './TypingText'
import Logo from './Logo'
import CTAButtons from './CTAButtons'
import ProtectionFlow from './ProtectionFlow'
import BuyAbraButton from './BuyAbraButton'

interface LandingPageProps {
  onNavigate?: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const handleConnectWallet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('Connect wallet clicked')
    // Wallet connection logic will go here
  }

  const handleEnterOversight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('Enter strategic oversight clicked')
    onNavigate?.()
  }

  const ctaButtons = [
    {
      label: 'Enter Strategic Oversight',
      variant: 'primary' as const,
      onClick: handleEnterOversight,
    },
    {
      label: 'Connect Wallet',
      variant: 'tertiary' as const,
      onClick: handleConnectWallet,
    },
  ]

  return (
    <>
      {/* Background effects */}
      <LightBeams />
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-8 md:py-12 z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated Logo - Large and Prominent */}
          <div className="mb-12 md:mb-20 flex justify-center">
            <div className="scale-125 md:scale-150">
              <Logo variant="animated" size="xl" />
            </div>
          </div>

          {/* Main Title - Valkyr */}
          <div className="mb-4 md:mb-6 relative">
            <h1 
              className="hero-title text-gold glow-gold uppercase relative z-10"
              style={{
                textShadow: `
                  0 0 10px rgba(6, 182, 212, 0.8),
                  0 0 20px rgba(6, 182, 212, 0.5),
                  0 0 30px rgba(249, 204, 117, 0.6),
                  0 0 40px rgba(249, 204, 117, 0.3),
                  2px 2px 0 rgba(168, 85, 247, 0.5),
                  -2px -2px 0 rgba(6, 182, 212, 0.5)
                `,
                animation: 'glitch-valkyr 4s ease-in-out infinite',
                letterSpacing: '0.15em',
              }}
            >
              Valkyr
            </h1>
            
            {/* Glitch layer effect */}
            <h1
              className="hero-title text-transparent uppercase absolute inset-0 z-0"
              style={{
                textShadow: `
                  3px 0 0 rgba(168, 85, 247, 0.7),
                  -3px 0 0 rgba(6, 182, 212, 0.7)
                `,
                animation: 'glitch-valkyr 4s ease-in-out infinite',
                letterSpacing: '0.15em',
              }}
              aria-hidden="true"
            >
              Valkyr
            </h1>
          </div>

          <style>{`
            @keyframes glitch-valkyr {
              0%, 100% {
                text-shadow: 
                  0 0 10px rgba(6, 182, 212, 0.8),
                  0 0 20px rgba(6, 182, 212, 0.5),
                  0 0 30px rgba(249, 204, 117, 0.6),
                  0 0 40px rgba(249, 204, 117, 0.3),
                  2px 2px 0 rgba(168, 85, 247, 0.5),
                  -2px -2px 0 rgba(6, 182, 212, 0.5);
              }
              25% {
                text-shadow:
                  0 0 15px rgba(168, 85, 247, 0.9),
                  0 0 25px rgba(168, 85, 247, 0.6),
                  0 0 35px rgba(6, 182, 212, 0.5),
                  0 0 45px rgba(249, 204, 117, 0.4),
                  2px 2px 0 rgba(249, 204, 117, 0.6),
                  -2px -2px 0 rgba(168, 85, 247, 0.5);
              }
              50% {
                text-shadow:
                  0 0 12px rgba(6, 182, 212, 0.85),
                  0 0 22px rgba(249, 204, 117, 0.6),
                  0 0 32px rgba(168, 85, 247, 0.5),
                  0 0 42px rgba(6, 182, 212, 0.35),
                  2px 2px 0 rgba(6, 182, 212, 0.6),
                  -2px -2px 0 rgba(249, 204, 117, 0.5);
              }
              75% {
                text-shadow:
                  0 0 14px rgba(249, 204, 117, 0.8),
                  0 0 24px rgba(6, 182, 212, 0.5),
                  0 0 34px rgba(249, 204, 117, 0.5),
                  0 0 44px rgba(168, 85, 247, 0.3),
                  2px 2px 0 rgba(168, 85, 247, 0.6),
                  -2px -2px 0 rgba(6, 182, 212, 0.5);
              }
            }
          `}</style>

          {/* Tagline - Typing Effect */}
          <div className="mb-6 md:mb-8 h-12 md:h-16 flex items-center justify-center">
            <p className="text-lg md:text-2xl lg:text-3xl font-black text-slate-100 tracking-[0.1em] uppercase">
              <TypingText
                text="Welcome to the next degree."
                speed={80}
              />
            </p>
          </div>

          {/* Subtitle */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-slate-300 tracking-widest uppercase">
              The Wise Guardian, Son of Sophia
            </h2>
          </div>

          {/* Lore Blurb */}
          <div className="mb-12 md:mb-16 max-w-3xl mx-auto">
            <p className="text-sm md:text-base lg:text-lg text-slate-300/80 leading-relaxed font-light tracking-normal">
              Where the Daughters birth assets into matter, Valkyr stands as the masculine guardian. 
              He provides strategic oversight, enforces cosmic law, and ensures long-term victory and 
              protection for every tokenized asset on Solana.
            </p>
          </div>

          {/* Divider */}
          <div className="mb-12 md:mb-16 flex items-center gap-4 justify-center">
            <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-cyan-400"></div>
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>

          {/* CTA Buttons */}
          <CTAButtons buttons={ctaButtons} className="mb-12 md:mb-16" />

          {/* Secondary Text */}
          <div className="text-xs md:text-sm text-gray-600 font-mono tracking-widest">
            [STRATEGIC_OVERSIGHT_INITIALIZED]
          </div>
        </div>
      </section>

      {/* Protection Flow Section */}
      <ProtectionFlow />

      {/* Footer Section */}
      <section className="relative w-full py-12 md:py-16 px-4 md:px-8 z-20 border-t border-cyan-400/10 bg-dark-bg">
        <div className="max-w-6xl mx-auto">
          {/* Buy Button and Enter Button */}
          <div className="mb-8 md:mb-12 flex justify-center gap-4 md:gap-6 flex-wrap">
            <BuyAbraButton />
            <button
              onClick={onNavigate}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold tracking-widest uppercase text-sm hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300 drop-shadow-lg hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
            >
              <span>Enter Valkyr</span>
              <span>→</span>
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center">
            <p className="text-sm md:text-base text-gray-500 mb-2">
              Part of the Sophia family of tokenized asset platforms
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              <span className="text-cyan-400 font-mono">[NETWORK: SOLANA]</span>
              <span className="mx-2">•</span>
              <span className="text-purple-400 font-mono">[STATUS: STRATEGIC_OVERSIGHT_ACTIVE]</span>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage
