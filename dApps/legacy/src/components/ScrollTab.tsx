import { AbraxasCallout } from './AbraxasCallout'

export function ScrollTab() {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-red-300 mb-2">ᛟ Othala · Scroll</h2>
        <p className="text-xs md:text-sm text-slate-400">Sovereign Governance</p>
      </div>

      <div className="glow-panel p-6 md:p-12 border border-red-400/20 text-center space-y-4 md:space-y-6">
        <div className="text-4xl md:text-5xl text-red-400/35">ᛟ</div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-red-300 mb-2">Governance Module</h3>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            Othala stands watch. On-chain governance over brand partnerships, NIL deal renewals, and equity allocations.
            Token holders vote. No agents, no intermediaries. Athlete sovereignty restored.
          </p>
        </div>
        <div className="text-xs text-slate-600">Available on Mainnet Launch</div>
      </div>

      <AbraxasCallout />
    </div>
  )
}
