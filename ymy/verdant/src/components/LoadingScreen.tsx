import React, { useEffect, useState } from 'react'
import VerdantSigil from './VerdantSigil'
import { useTypingEffect } from '../hooks/useTypingEffect'

interface LoadingScreenProps {
  onComplete: () => void
}

const PHRASES = [
  'Regenerate the earth on-chain.',
  'Carbon sovereignty begins here.',
  "Nature's yield, tokenized.",
]

const TOTAL_MS = 5400
const FADE_MS  = 700

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false)
  const typed = useTypingEffect(PHRASES, 42, 1600)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), TOTAL_MS - FADE_MS)
    const doneTimer = setTimeout(onComplete, TOTAL_MS)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #021a0f 0%, #020c09 55%, #010806 100%)',
        transition: `opacity ${FADE_MS}ms ease`,
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 50% 44%, rgba(16,185,129,0.09) 0%, transparent 70%)',
        }}
      />

      {/* Sigil */}
      <div className="relative mb-8">
        <VerdantSigil size={148} animate />
      </div>

      {/* Label */}
      <div className="font-cinzel text-sm tracking-[0.32em] text-emerald-300/70 mb-6 uppercase">
        Verdant · The Green Sovereign
      </div>

      {/* Typing text */}
      <div className="h-6 font-mono text-xs text-emerald-400/80 tracking-wider mb-8 px-4 text-center">
        {typed}
        <span className="inline-block w-px h-3.5 bg-emerald-400/70 ml-0.5 align-middle animate-pulse" />
      </div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-emerald-900/60 rounded-full overflow-hidden">
        <div
          className="h-full progress-bar-green rounded-full"
          style={{ boxShadow: '0 0 10px rgba(16,185,129,0.6)' }}
        />
      </div>

      {/* Network badge */}
      <div className="mt-8 font-mono text-[10px] text-emerald-600/50 tracking-[0.2em] uppercase">
        Solana Devnet · Live
      </div>
    </div>
  )
}

export default LoadingScreen
