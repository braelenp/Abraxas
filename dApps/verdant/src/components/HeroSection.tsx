import React from 'react'
import VerdantSigil from './VerdantSigil'
import { ChevronDown } from 'lucide-react'

interface HeroSectionProps {
  onEnterApp: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterApp }) => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
    >
      {/* Background radials */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(16,185,129,0.07) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '8%',
          left: '18%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(153,69,255,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '12%',
          right: '14%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(132,204,22,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Devnet badge */}
      <div
        className="mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{
          background: 'rgba(16,185,129,0.07)',
          border: '1px solid rgba(16,185,129,0.25)',
          color: '#34d399',
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
          style={{ boxShadow: '0 0 6px #10b981' }}
        />
        Solana Devnet · Live
      </div>

      {/* Sigil */}
      <div className="mb-8" style={{ animation: 'rr-float 6s ease-in-out infinite' }}>
        <VerdantSigil size={148} animate />
      </div>

      {/* Wordmark */}
      <h1
        className="font-cinzel text-5xl sm:text-6xl lg:text-7xl font-black tracking-[0.25em] text-emerald-100 mb-3"
        style={{
          textShadow:
            '0 0 30px rgba(16,185,129,0.9), 0 0 60px rgba(16,185,129,0.55), 0 0 120px rgba(16,185,129,0.28)',
        }}
      >
        VERDANT
      </h1>

      {/* Tagline */}
      <p className="font-cinzel text-sm sm:text-base tracking-[0.38em] text-emerald-300/65 uppercase mb-6">
        Cultivate the Sovereign Earth
      </p>

      {/* Divider */}
      <div className="w-20 h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)' }} />

      {/* Lore */}
      <p className="max-w-xl text-center text-sm leading-7 text-slate-400/80 font-grotesk mb-10 px-2">
        Where Sophia's light fell upon soil, Verdant gathers that life-force into the living fabric of
        land, forest, and regenerative farms. Powered by the{' '}
        <span className="text-purple-300/90 font-medium">ABRA token</span> — Abraxas's sovereign
        engine. She tokenizes carbon credits, raises climate capital, optimizes yield from regenerative
        agriculture, and restores sovereignty to the living earth on Solana.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={onEnterApp}
          className="px-6 py-2.5 font-grotesk text-xs font-semibold tracking-[0.12em] uppercase rounded-md transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(16,185,129,0.1))',
            border: '1px solid rgba(16,185,129,0.55)',
            color: '#a7f3d0',
            boxShadow: '0 0 18px rgba(16,185,129,0.15)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 28px rgba(16,185,129,0.35)'
            e.currentTarget.style.borderColor = 'rgba(16,185,129,0.8)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 18px rgba(16,185,129,0.15)'
            e.currentTarget.style.borderColor = 'rgba(16,185,129,0.55)'
          }}
        >
          Enter the Grove
        </button>

        <button
          onClick={onEnterApp}
          className="px-6 py-2.5 font-grotesk text-xs font-semibold tracking-[0.12em] uppercase rounded-md transition-all duration-200"
          style={{
            background: 'transparent',
            border: '1px solid rgba(16,185,129,0.28)',
            color: '#6ee7b7',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(16,185,129,0.07)'
            e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(16,185,129,0.28)'
          }}
        >
          View Devnet
        </button>

        <a
          href="https://abraxas-ten.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 font-grotesk text-xs font-semibold tracking-[0.12em] uppercase rounded-md transition-all duration-200"
          style={{
            background: 'transparent',
            border: '1px solid rgba(153,69,255,0.4)',
            color: '#c4b5fd',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(153,69,255,0.08)'
            e.currentTarget.style.borderColor = 'rgba(153,69,255,0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(153,69,255,0.4)'
          }}
        >
          Buy ABRA ↗
        </a>
      </div>

      {/* Scroll cue */}
      <div className="animate-bounce-arrow text-emerald-500/40">
        <ChevronDown size={22} />
      </div>
    </section>
  )
}

export default HeroSection
