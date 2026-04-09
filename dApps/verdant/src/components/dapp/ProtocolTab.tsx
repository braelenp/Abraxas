import React, { useState } from 'react'
import AbraxasCallout from '../AbraxasCallout'
import { ChevronDown, ChevronUp } from 'lucide-react'

const PILLARS = [
  {
    rune: 'ᚠ',
    name: 'Fehu',
    accent: '#6ee7b7',
    borderColor: 'rgba(110,231,183,0.22)',
    glowColor: 'rgba(16,185,129,0.08)',
    title: 'Carbon Tokenization',
    body: 'Upload a verified carbon credit certificate or regenerative land deed. Verdant parses the methodology metadata and mints a sovereign SPL token on Solana devnet, fractionating nature\'s yield on-chain.',
    extended: [
      'Supports VCS, Gold Standard, American Carbon Registry, and Climate Action Reserve methodologies.',
      'Each token is uniquely identified with vintage year, project ID, and sequestration methodology.',
      'Fractional minting allows each credit ton to be represented as a sub-divisible SPL token unit.',
      'Immutable on-chain provenance — project coordinates, verifier, and issuance date stored in token metadata.',
    ],
  },
  {
    rune: 'ᛃ',
    name: 'Jera',
    accent: '#c084fc',
    borderColor: 'rgba(192,132,252,0.22)',
    glowColor: 'rgba(153,69,255,0.07)',
    title: 'Climate Capital',
    body: 'Issue token tranches to global climate investors. Set raise targets, vintage years, and buyer whitelists — all governed by transparent on-chain logic.',
    extended: [
      'Configurable raise parameters: minimum investment, target capital, close date.',
      'Buyer whitelisting supports KYC-gated access for regulated jurisdictions.',
      'Every investment event is recorded on-chain with immutable audit trail.',
      'Automated escrow release upon tranche completion; refund logic if target not met.',
    ],
  },
  {
    rune: 'ᛇ',
    name: 'Eihwaz',
    accent: '#bef264',
    borderColor: 'rgba(190,242,100,0.22)',
    glowColor: 'rgba(132,204,22,0.07)',
    title: 'Yield from Regeneration',
    body: 'Sequestration proceeds, harvest revenues, and ecosystem service payments flow into the vault and distribute automatically to token holders per epoch.',
    extended: [
      'Epoch-based yield distribution: weekly, monthly, or custom interval configurable per project.',
      'Multi-stream income: carbon offset sales, biodiversity credits, agri-commodity revenues.',
      'Sophia Yield and Sophia Harvest agents optimize distribution routing per token weight.',
      'Claimable rewards accumulate per wallet without gas overhead until claimed.',
    ],
  },
  {
    rune: 'ᛟ',
    name: 'Othala',
    accent: '#a7f3d0',
    borderColor: 'rgba(167,243,208,0.2)',
    glowColor: 'rgba(16,185,129,0.06)',
    title: 'Land Sovereignty',
    body: 'On-chain governance over land-use decisions, certification renewals, and conservation easements. Landowners reclaim control from intermediaries.',
    extended: [
      'SPL governance tokens grant proportional voting power over land-use proposals.',
      'Certification renewal votes triggered automatically per registry schedule.',
      'Conservation easement terms encoded as on-chain smart constraints.',
      'Dispute resolution pathway via multi-sig council; outcomes recorded publicly.',
    ],
  },
]

const ProtocolTab: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className="rounded-xl p-5"
        style={{
          background: 'rgba(13,32,24,0.7)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-emerald-500/80 text-sm">◈</span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-emerald-600/70 uppercase">
            Verdant · Protocol Architecture
          </span>
        </div>
        <h2 className="font-cinzel text-base font-semibold text-emerald-200/90 mb-1">
          Four Pillars of the Sovereign Grove
        </h2>
        <p className="text-xs text-slate-400/70 leading-relaxed">
          Connecting regenerative land's legal framework with on-chain global climate capital.
        </p>
      </div>

      {/* Pillar cards */}
      <div className="space-y-3">
        {PILLARS.map((p) => {
          const isOpen = expanded === p.name
          return (
            <div
              key={p.name}
              className="rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${p.glowColor}, rgba(13,32,24,0.7))`,
                border: `1px solid ${isOpen ? p.accent + '55' : p.borderColor}`,
                boxShadow: isOpen ? `0 0 20px ${p.accent}18` : 'none',
              }}
            >
              {/* Collapsed header */}
              <button
                className="w-full flex items-start justify-between p-4 text-left"
                onClick={() => setExpanded(isOpen ? null : p.name)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="font-mono text-xl leading-none mt-0.5"
                    style={{ color: p.accent, textShadow: `0 0 12px ${p.accent}80` }}
                  >
                    {p.rune}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-cinzel text-xs font-semibold"
                        style={{ color: p.accent }}
                      >
                        {p.title}
                      </span>
                      <span
                        className="font-mono text-[9px] tracking-[0.2em] uppercase"
                        style={{ color: p.accent + '70' }}
                      >
                        {p.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400/75 leading-relaxed">{p.body}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-3 mt-0.5">
                  {isOpen ? (
                    <ChevronUp size={14} style={{ color: p.accent + '80' }} />
                  ) : (
                    <ChevronDown size={14} style={{ color: p.accent + '60' }} />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div
                  className="px-4 pb-4"
                  style={{ borderTop: `1px solid ${p.accent}20` }}
                >
                  <div className="pt-3 space-y-2">
                    {p.extended.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: p.accent }}
                        />
                        <span className="text-xs text-slate-400/70 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Technical spec */}
      <div
        className="rounded-xl p-4"
        style={{
          background: 'rgba(13,32,24,0.5)',
          border: '1px solid rgba(16,185,129,0.12)',
        }}
      >
        <div className="font-mono text-[10px] text-emerald-700/60 tracking-widest uppercase mb-3">
          Technical Specifications
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {[
            ['Blockchain',    'Solana (Devnet)'],
            ['Token Standard','SPL / Token-2022'],
            ['Framework',     'Anchor / Rust'],
            ['Frontend',      'React + TypeScript'],
            ['ABRA Token',    'Abraxas · Sovereign Layer'],
            ['Wallet',        'Phantom · Solflare · Backpack'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between font-mono text-[10px]">
              <span className="text-emerald-700/60">{k}</span>
              <span className="text-emerald-400/70">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <AbraxasCallout />
    </div>
  )
}

export default ProtocolTab
