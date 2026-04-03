import { ReactNode } from 'react'

export interface PageRealmProps {
  symbol: string
  symbolLabel: string
  pageEssence: string
  agentName: string
  lore: string
  ctaLabel: string
  accentColor: string
  glowColor: string
  onCta?: () => void
  children: ReactNode
}

export function PageRealm({
  symbol,
  symbolLabel,
  pageEssence,
  agentName,
  lore,
  ctaLabel,
  accentColor,
  glowColor,
  onCta,
  children,
}: PageRealmProps) {
  return (
    <div className="w-full">
      {/* ── Cinematic Hero Section ─────────────────────────────────── */}
      <section className={`relative flex min-h-[60dvh] md:min-h-[72dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-900/90`}>
        {/* Atmospheric layers */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className={`absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-30 ${glowColor}`} />
          <div className={`absolute top-1/3 -right-32 h-96 w-96 rounded-full blur-3xl opacity-20 ${glowColor.replace('0.5', '0.25')}`} />
        </div>

        {/* Symbol / Icon */}
        <div className="mb-5 md:mb-6 text-5xl md:text-6xl font-black drop-shadow-lg">
          {symbol}
        </div>

        {/* Symbol Label & Agent Name */}
        <div className="text-center mb-4 md:mb-5">
          <p className={`text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-2 font-mono ${accentColor}`}>
            {symbolLabel}
          </p>
          <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-[0.15em] mb-2 leading-none animate-glitch`} style={{ color: glowColor.split(' ')[1] }}>
            {agentName}
          </h1>
          <p className={`text-xs md:text-base font-bold uppercase tracking-[0.2em] ${accentColor}`}>
            &gt; {pageEssence}
          </p>
        </div>

        {/* Lore / Description */}
        <p className="text-sm md:text-base text-slate-300/80 max-w-2xl px-4 mb-5 md:mb-6 text-center leading-relaxed">
          {lore}
        </p>

        {/* CTA Button */}
        {onCta && (
          <button
            onClick={onCta}
            className={`px-4 py-2 md:px-6 md:py-3 font-bold uppercase tracking-widest text-xs md:text-sm rounded-lg transition-all ${accentColor} border-2 hover:opacity-80`}
          >
            {ctaLabel}
          </button>
        )}
      </section>

      {/* ── Page Content Section ──────────────────────────────────── */}
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
