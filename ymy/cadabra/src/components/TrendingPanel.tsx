interface TrendingPanelProps {
  coinStats: Array<{ ticker: string; volume24h: string; marketCap: string; socialVelocity: string }>
  kolDirectory: Array<{ id: number; name: string; handle: string; niche: string; followers: string; verified: boolean }>
  searchTerm: string
  setSearchTerm: (term: string) => void
  following: Record<string, boolean>
  setFollowing: (following: Record<string, boolean>) => void
}

export function TrendingPanel({ coinStats, kolDirectory, searchTerm, setSearchTerm, following, setFollowing }: TrendingPanelProps) {
  return (
    <aside className="hidden h-screen w-72 overflow-y-auto border-l border-cyan-400/25 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 backdrop-blur px-4 py-5 lg:block smooth-transition shadow-2xl shadow-cyan-500/10">
      <div className="mb-4 glass rounded-lg px-4 py-3 smooth-transition focus-within:glow-cyan">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Cadabra"
          className="w-full bg-transparent text-sm text-purple-100 outline-none placeholder:text-purple-100/40 smooth-transition font-mono"
        />
      </div>

      <div className="mb-6 space-y-3 glass rounded-2xl p-4 scale-in">
        <p className="text-xs uppercase tracking-[0.18em] text-orange-100/80">Trending Coins</p>
        <div className="space-y-2">
          {coinStats.slice(0, 4).map((coin) => (
            <button
              key={coin.ticker}
              className="glass w-full rounded-lg px-3 py-2 text-left text-xs transition smooth-hover hover:glow-orange"
            >
              <p className="font-semibold text-orange-100">${coin.ticker}</p>
              <p className="text-orange-100/70">{coin.marketCap} market cap</p>
              <p className="text-orange-100/60">Velocity: {coin.socialVelocity}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 glass rounded-2xl p-4 scale-in" style={{ animationDelay: '50ms' }}>
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/80">Suggested KOLs</p>
        <div className="space-y-2">
          {kolDirectory.slice(0, 3).map((kol, idx) => (
            <div key={kol.id} className="glass rounded-lg p-3 smooth-transition hover:glow-cyan scale-in" style={{ animationDelay: `${idx * 30}ms` }}>
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-cyan-100">
                    {kol.name} {kol.verified ? '✓' : ''}
                  </p>
                  <p className="text-xs text-cyan-100/70">{kol.handle}</p>
                </div>
              </div>
              <p className="mb-2 text-xs text-cyan-100/75">{kol.niche}</p>
              <button
                onClick={() => setFollowing({ ...following, [kol.handle]: !following[kol.handle] })}
                className={`btn-premium w-full py-2 text-xs transition ${
                  following[kol.handle]
                    ? 'border border-cyan-300/60 bg-cyan-500/20 text-cyan-100'
                    : 'border border-cyan-300/40 bg-cyan-500/10 text-cyan-100/80 hover:bg-cyan-500/20'
                }`}
              >
                {following[kol.handle] ? '✓ Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
