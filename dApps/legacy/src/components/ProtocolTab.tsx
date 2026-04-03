import { AbraxasCallout } from './AbraxasCallout'

export function ProtocolTab() {
  const pillars = [
    {
      rune: 'ᛏ',
      name: 'Tiwaz · Mint',
      color: 'text-red-300',
      borderColor: 'border-red-400/20',
      desc: 'Tiwaz is the rune of victory. Upload an NIL contract, mint a sovereign SPL token, and deposit it into the vault. The Mint tab transmutes paper deals into on-chain capital.',
    },
    {
      rune: 'ᛒ',
      name: 'Berkana · Vault',
      color: 'text-cyan-300',
      borderColor: 'border-cyan-400/20',
      desc: 'Berkana is the rune of growth. The Legacy vault governs every asset deposit, agent assignment, and yield cycle with autonomous on-chain precision.',
    },
    {
      rune: 'ᛋ',
      name: 'Sowilo · Devnet',
      color: 'text-purple-300',
      borderColor: 'border-purple-400/20',
      desc: 'Sowilo delivers solar clarity. The Devnet Observatory tracks every tokenized NIL deal, vault deposit, and yield cycle in real-time on Solana.',
    },
    {
      rune: 'ᛟ',
      name: 'Othala · Scroll',
      color: 'text-red-200',
      borderColor: 'border-red-400/15',
      desc: 'Othala holds the heritage. On-chain governance over brand partnerships, licensing decisions, and equity allocations. Athletes reclaim sovereignty from intermediaries.',
    },
  ]

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-red-300 mb-2">ᚨ Ansuz · The Protocol</h2>
        <p className="text-xs md:text-sm text-slate-400">Four Pillars of the Sovereign Legacy</p>
        <p className="text-xs text-slate-500 mt-2">
          Connecting athlete achievement's legal framework with on-chain global capital through four Elder Futhark runes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.name}
            className={`glow-panel p-4 md:p-6 border ${pillar.borderColor} space-y-3 md:space-y-4`}
          >
            <div className="flex items-start gap-2 md:gap-3">
              <div className={`text-2xl md:text-3xl flex-shrink-0 ${pillar.color}`}>{pillar.rune}</div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold text-sm md:text-base ${pillar.color}`}>{pillar.name}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AbraxasCallout />
    </div>
  )
}
