import { useEffect, useState, useMemo } from 'react';
import { TrendingUp, Zap, GitBranch, Shield, Wallet, ArrowRight } from 'lucide-react';
import { fetchAbraTokenData, getBagsFeeSchedule } from '../lib/bagsIntegration';
import type { BagsTokenData } from '../lib/bagsIntegration';

export function BagsDashboard() {
  const [abraData, setAbraData] = useState<BagsTokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const feeSchedule = useMemo(() => getBagsFeeSchedule(), []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchAbraTokenData();
      setAbraData(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <article className="glow-panel rounded-2xl border border-emerald-300/25 bg-[linear-gradient(135deg,rgba(15,42,30,0.92),rgba(10,37,25,0.82),rgba(52,211,153,0.08))] p-5 backdrop-blur-xl overflow-hidden space-y-4">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-lg" />
            <GitBranch className="text-emerald-300 relative z-10 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]" size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-emerald-200 tracking-widest uppercase">Bags Integration</h2>
            <p className="text-[10px] text-emerald-300/60 font-mono">Deep API Integration & Revenue Share</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-300/75 italic">
          Abraxas partners seamlessly with Bags protocol. Every transaction routes through Bags DEX, enabling zero-fee ABRA trading while Abraxas and Bags share protocol revenue.
        </p>
      </div>

      {/* ABRA Token Live Data */}
      {abraData && !loading && (
        <div className="rounded-lg border border-emerald-300/15 bg-slate-950/40 backdrop-blur-sm p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-200/80">[ABRA_TOKEN_DATA]</span>
            <span className="text-[10px] text-emerald-300/60">Via Bags API</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-emerald-300/60 font-mono text-[10px] uppercase">Price</p>
              <p className="text-emerald-100 font-semibold text-sm">${abraData.price?.toFixed(4) || 'N/A'}</p>
            </div>
            <div>
              <p className="text-emerald-300/60 font-mono text-[10px] uppercase">24h Change</p>
              <p className={`font-semibold text-sm ${abraData.priceChange24h > 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                {abraData.priceChange24h > 0 ? '+' : ''}{abraData.priceChange24h?.toFixed(2) || '0'}%
              </p>
            </div>
          </div>

          {abraData.marketCap && (
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-emerald-300/10">
              <div>
                <p className="text-emerald-300/60 font-mono text-[10px] uppercase">Market Cap</p>
                <p className="text-emerald-100 text-xs">${(abraData.marketCap / 1e6).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-emerald-300/60 font-mono text-[10px] uppercase">24h Vol</p>
                <p className="text-emerald-100 text-xs">${(abraData.volume24h / 1e6).toFixed(1)}M</p>
              </div>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="rounded-lg border border-emerald-300/15 bg-slate-950/40 backdrop-blur-sm p-3">
          <p className="text-[10px] text-emerald-300/60 animate-pulse">Loading ABRA token data from Bags API...</p>
        </div>
      )}

      {/* Fee Schedule */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-emerald-200/80 px-1">Bags Fee Structure</h3>
        <div className="space-y-1">
          {Object.entries(feeSchedule).map(([_key, fee]) => (
            <div key={_key} className="flex items-center gap-2 rounded-lg border border-emerald-300/10 bg-slate-950/30 backdrop-blur-sm px-2 py-1.5 text-[10px]">
              <Zap size={12} className="text-emerald-300/60 shrink-0" />
              <span className="flex-1 text-emerald-100/80">{fee.description}</span>
              <span className="text-emerald-300/90 font-mono font-semibold whitespace-nowrap">{fee.rate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Points */}
      <div className="space-y-2 pt-2 border-t border-emerald-300/10">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-emerald-200/80 px-1">Integration Points</h3>
        <div className="grid grid-cols-1 gap-1">
          {[
            'Bags token price feeds for ABRA',
            'Bags DEX zero-fee swap routing',
            'Revenue sharing agreement active',
            'ABRA buy widget via Bags.fm',
            'Live market data integration',
            'Fee-sharing transparency',
          ].map((point, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-300/80">
              <div className="w-1 h-1 rounded-full bg-emerald-400/60" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-2 border-t border-emerald-300/10">
        <a
          href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full rounded-lg border border-emerald-300/40 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25 transition px-3 py-2 text-xs font-semibold"
        >
          <span>View ABRA on Bags.fm</span>
          <ArrowRight size={12} />
        </a>
      </div>

      {/* Powered by Badge */}
      <div className="pt-1 flex justify-center">
        <div className="text-[9px] text-emerald-300/50 font-mono uppercase tracking-wider">
          [POWERED_BY_BAGS] ✓ Deep Integration
        </div>
      </div>
    </article>
  );
}
