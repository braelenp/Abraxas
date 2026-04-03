import { AbraxasCallout } from './AbraxasCallout'

export function DevnetTab() {
  const stats = [
    { icon: '🔗', label: 'Network', value: 'Solana Devnet' },
    { icon: '🏅', label: 'NIL Deals Tokenized', value: 0 },
    { icon: '💰', label: 'Total Value Locked', value: '$0.00' },
    { icon: '🏛', label: 'Active Vaults', value: 0 },
    { icon: '👤', label: 'Equity Holders', value: 0 },
    { icon: '📈', label: 'Yield Distributed', value: '$0.00' },
  ]

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-red-300 mb-2">ᛋ Sowilo · Devnet Observatory</h2>
        <p className="text-xs md:text-sm text-slate-400">Real-time Protocol Metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glow-panel p-4 md:p-6 border border-red-400/20 space-y-2 md:space-y-3 text-center"
          >
            <div className="text-2xl md:text-3xl">{stat.icon}</div>
            <div className="text-lg md:text-2xl font-semibold text-red-400 font-mono break-all">
              {typeof stat.value === 'number' ? stat.value : stat.value}
            </div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="glow-panel p-6 md:p-8 border border-red-400/20 text-center">
        <h3 className="font-semibold text-red-300 mb-3 md:mb-4 text-sm md:text-base">Domain Label</h3>
        <div className="font-mono text-xs md:text-sm text-slate-400 break-all">legacy.devnet</div>
      </div>

      <AbraxasCallout />
    </div>
  )
}
