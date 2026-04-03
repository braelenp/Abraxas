import { AbraxasCallout } from './AbraxasCallout'

export function VaultTab() {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-red-300 mb-2">ᛒ Berkana · Legacy Vault</h2>
        <p className="text-xs md:text-sm text-slate-400">Athlete Equity Vault</p>
      </div>

      <div className="glow-panel p-4 md:p-8 border border-red-400/20">
        <div className="space-y-4">
          <h3 className="font-semibold text-red-300 text-sm md:text-base">Vault Status</h3>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {[
              { label: 'Assets', value: 0 },
              { label: 'ABRA Staked', value: 0 },
              { label: 'Network', value: 'Devnet' },
            ].map((metric) => (
              <div key={metric.label} className="bg-red-950/30 border border-red-400/10 rounded p-2 md:p-4 text-center">
                <div className="text-lg md:text-2xl font-semibold text-red-400">{metric.value}</div>
                <div className="text-xs text-slate-500 mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-red-400/10 space-y-4">
          <h3 className="font-semibold text-purple-300 text-sm md:text-base">ᚨ Ansuz · ABRA Staking</h3>
          <div className="text-xs md:text-sm text-slate-400">ABRA staking module available on mainnet launch.</div>
        </div>
      </div>

      {/* Upcoming Vault Classes */}
      <div className="space-y-4">
        <h3 className="font-semibold text-red-300 text-sm md:text-base">Upcoming Vault Classes</h3>
        {[
          {
            title: 'Fractional Athlete Equity',
            desc: 'Tokenize a percentage of future NIL earnings and raise fan capital for a portion of the athlete\'s long-term brand value.',
          },
          {
            title: 'Brand Partnership Vaults',
            desc: 'On-chain management of brand deals, licensing renewals, and co-branding governance with milestone-gated payouts.',
          },
          {
            title: 'Performance Milestone Vaults',
            desc: 'Issue capital tranches tied to athletic milestones — championships, records, award thresholds — with automatic on-chain release.',
          },
        ].map((cls) => (
          <div key={cls.title} className="glow-panel p-3 md:p-4 border border-red-400/20 space-y-2">
            <h4 className="font-semibold text-red-300 text-xs md:text-sm">{cls.title}</h4>
            <p className="text-xs text-slate-400">{cls.desc}</p>
            <div className="text-xs text-slate-600 pt-2">Status: Coming soon</div>
          </div>
        ))}
      </div>

      <AbraxasCallout />
    </div>
  )
}
