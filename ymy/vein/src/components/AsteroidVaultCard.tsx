export type AsteroidAsset = {
  name: string
  estimateValue: number
  profitEstimate: number
  score: number
  taxonomy: string
  composition: string
  deltaV: number | null
  miningPotential: number
  rightsClass: string
  vaultDeposit: number
  royaltyRate: number
  launchProfile: string
}

type Props = {
  asteroid: AsteroidAsset
  active: boolean
  onTokenize: (asteroid: AsteroidAsset) => void
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return 'Unknown'
  }

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: value >= 1_000_000_000 ? 2 : 1,
  }).format(value)
}

export default function AsteroidVaultCard({ asteroid, active, onTokenize }: Props) {
  return (
    <article
      className={[
        'group relative overflow-hidden rounded-[1.6rem] border p-5 transition duration-300',
        active
          ? 'border-vein-cyan/50 bg-slate-950/88 shadow-vein-panel'
          : 'border-white/10 bg-slate-950/72 hover:border-vein-purple/35 hover:bg-slate-950/82',
      ].join(' ')}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(153,69,255,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(60,246,255,0.08),transparent_38%)] opacity-70" />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.34em] text-vein-cyan/65">{asteroid.rightsClass}</p>
            <h3 className="mt-2 font-display text-2xl text-stone-100">{asteroid.name}</h3>
          </div>
          <div className="rounded-full border border-vein-orange/30 bg-vein-orange/10 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.22em] text-vein-orange/80">
            {asteroid.taxonomy}
          </div>
        </div>

        <p className="max-w-sm text-sm leading-6 text-slate-300/76">{asteroid.composition}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-white/6 bg-white/4 p-3">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">Value</p>
            <p className="mt-2 font-display text-xl text-vein-gold">${formatCurrency(asteroid.estimateValue)}</p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-white/4 p-3">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">Profit</p>
            <p className="mt-2 font-display text-xl text-vein-emerald">${formatCurrency(asteroid.profitEstimate)}</p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-white/4 p-3">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">Mining Potential</p>
            <p className="mt-2 font-display text-xl text-vein-cyan">{asteroid.miningPotential}/100</p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-white/4 p-3">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">Transfer Orbit</p>
            <p className="mt-2 font-display text-xl text-stone-100">{asteroid.deltaV ? `${asteroid.deltaV.toFixed(1)} km/s` : 'Archive'}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4 text-[0.72rem] uppercase tracking-[0.24em] text-slate-400">
          <span>Vault Seed ${formatCurrency(asteroid.vaultDeposit)}</span>
          <span>Royalty {asteroid.royaltyRate.toFixed(1)}%</span>
          <span>{asteroid.launchProfile}</span>
        </div>

        <button
          type="button"
          onClick={() => onTokenize(asteroid)}
          className="ui-action inline-flex w-full items-center justify-center rounded-2xl border border-vein-gold/55 bg-gradient-to-r from-vein-purple/28 via-vein-gold/16 to-vein-cyan/20 px-4 py-3 text-sm font-medium uppercase tracking-[0.22em] text-stone-100"
        >
          Tokenize Mining Rights
        </button>
      </div>
    </article>
  )
}
