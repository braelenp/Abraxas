export function AbraxasCallout() {
  return (
    <div className="glow-panel p-8 border border-purple-400/20 space-y-4 mt-12">
      <h3 className="font-semibold text-purple-300 mb-4 flex items-center gap-2">
        <span className="text-xl">🌑</span> Abraxas Callout
      </h3>
      <p className="text-sm text-slate-300 leading-relaxed">
        Abraxas is the sovereign intelligence layer powering Legacy. Stake ABRA, govern the protocol, access the
        Circuit, and manage multi-asset vaults — all from one control surface.
      </p>
      <div className="text-xs text-slate-600 pt-2">
        <a
          href="https://abraxas-ten.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:text-amber-300 transition-colors font-semibold"
        >
          Learn more about Abraxas ↗
        </a>
      </div>
    </div>
  )
}
