import { useEffect, useState } from 'react'
import EchoSigil from './EchoSigil'
import { useTypingEffect } from '../hooks/useTypingEffect'

interface Props {
  onDone: () => void
}

/** Aurelia-style loading screen — typing reveal + sigil + fade-out */
export default function LoadingScreen({ onDone }: Props) {
  const typed = useTypingEffect(
    ['Welcome to the next degree.', 'Sovereignty begins on-chain.', 'Illuminate your music.'],
    70,
    38,
    2200,
  )
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const exit = setTimeout(() => {
      setLeaving(true)
      setTimeout(onDone, 700)
    }, 5200)
    return () => clearTimeout(exit)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-700 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.08] blur-2xl" />

      {/* Sigil */}
      <div className="mb-10">
        <EchoSigil />
      </div>

      {/* Cycling typed phrase */}
      <p className="echo-hero-title min-h-[1.8em] px-6 text-center font-display text-2xl leading-tight sm:text-3xl">
        {typed}
        <span className="typing-cursor" aria-hidden="true">|</span>
      </p>

      {/* Progress bar */}
      <div className="mx-auto mt-8 w-48">
        <div className="h-1 overflow-hidden rounded-full bg-slate-800/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan via-purple to-amber"
            style={{ width: '100%', animation: 'echo-load 5.2s linear forwards' }}
          />
        </div>
      </div>
    </div>
  )
}
