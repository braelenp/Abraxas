import React from 'react'

const PILLARS = [
  {
    rune: 'ᚠ',
    name: 'Fehu',
    accent: '#6ee7b7',
    accentClass: 'text-emerald-300',
    borderColor: 'rgba(110,231,183,0.2)',
    glowColor: 'rgba(16,185,129,0.08)',
    title: 'Carbon Tokenization',
    body: 'Upload a verified carbon credit certificate or regenerative land deed. Verdant parses the methodology metadata and mints a sovereign SPL token on Solana devnet, fractionating nature\'s yield on-chain.',
  },
  {
    rune: 'ᛃ',
    name: 'Jera',
    accent: '#c084fc',
    accentClass: 'text-purple-300',
    borderColor: 'rgba(192,132,252,0.2)',
    glowColor: 'rgba(153,69,255,0.07)',
    title: 'Climate Capital',
    body: 'Issue token tranches to global climate investors. Set raise targets, vintage years, and buyer whitelists — all governed by transparent on-chain logic.',
  },
  {
    rune: 'ᛇ',
    name: 'Eihwaz',
    accent: '#bef264',
    accentClass: 'text-lime-300',
    borderColor: 'rgba(190,242,100,0.2)',
    glowColor: 'rgba(132,204,22,0.07)',
    title: 'Yield from Regeneration',
    body: 'Sequestration proceeds, harvest revenues, and ecosystem service payments flow into the vault and distribute automatically to token holders per epoch.',
  },
  {
    rune: 'ᛟ',
    name: 'Othala',
    accent: '#a7f3d0',
    accentClass: 'text-emerald-200',
    borderColor: 'rgba(167,243,208,0.18)',
    glowColor: 'rgba(16,185,129,0.06)',
    title: 'Land Sovereignty',
    body: 'On-chain governance over land-use decisions, certification renewals, and conservation easements. Landowners reclaim control from intermediaries.',
  },
]

interface ProtocolSectionProps {
  onEnterApp: () => void
}

const ProtocolSection: React.FC<ProtocolSectionProps> = ({ onEnterApp }) => {
  return (
    <section className="py-24 px-4 relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="font-mono text-[10px] tracking-[0.28em] text-emerald-600/60 uppercase mb-3">
            Protocol Architecture
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-emerald-100/90 mb-4">
            Four Pillars of the Sovereign Grove
          </h2>
          <p className="text-slate-400/75 text-sm leading-relaxed max-w-lg mx-auto">
            Connecting regenerative land's legal framework with on-chain global climate capital.
          </p>
        </div>

        {/* Pillar grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {PILLARS.map((p) => (
            <div
              key={p.name}
              className="relative rounded-xl p-6 transition-all duration-300 group"
              style={{
                background: `linear-gradient(135deg, ${p.glowColor}, rgba(13,32,24,0.7))`,
                border: `1px solid ${p.borderColor}`,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor = p.accent + '55'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.borderColor = p.borderColor
              }}
            >
              {/* Rune + name */}
              <div className="flex items-baseline gap-2 mb-3">
                <span
                  className="font-mono text-2xl leading-none"
                  style={{ color: p.accent, textShadow: `0 0 14px ${p.accent}80` }}
                >
                  {p.rune}
                </span>
                <span
                  className="font-cinzel text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: p.accent + 'aa' }}
                >
                  {p.name}
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-cinzel text-sm font-semibold mb-2 ${p.accentClass}`}>
                {p.title}
              </h3>

              {/* Body */}
              <p className="text-slate-400/75 text-xs leading-relaxed">{p.body}</p>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-br- opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at top right, ${p.accent}18, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onEnterApp}
            className="inline-flex items-center gap-2 font-grotesk text-xs font-semibold tracking-[0.14em] uppercase px-7 py-3 rounded-md transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.08))',
              border: '1px solid rgba(16,185,129,0.45)',
              color: '#a7f3d0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16,185,129,0.28), rgba(16,185,129,0.14))'
              e.currentTarget.style.boxShadow = '0 0 22px rgba(16,185,129,0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(16,185,129,0.08))'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Enter the Verdant dApp →
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProtocolSection
