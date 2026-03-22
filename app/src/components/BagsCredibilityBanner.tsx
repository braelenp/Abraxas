import { CheckCircle, Zap, Shield } from 'lucide-react';

export function BagsCredibilityBanner() {
  return (
    <div className="rounded-xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-3 backdrop-blur">
      <div className="flex items-start gap-2 mb-2">
        <CheckCircle size={16} className="text-cyan-300 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-cyan-100">Powered by Bags</p>
          <p className="text-[11px] text-cyan-200/80 mt-0.5">
            Industry-leading DEX aggregator with 0% fees
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="flex items-center gap-1.5 text-[10px] text-cyan-200/70 bg-slate-950/40 rounded-lg p-2">
          <Zap size={12} className="text-cyan-300" />
          <span>Best prices across</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-cyan-200/70 bg-slate-950/40 rounded-lg p-2">
          <Shield size={12} className="text-cyan-300" />
          <span>Audited & trusted</span>
        </div>
      </div>
      
      <p className="text-[10px] text-cyan-200/60 mt-2 leading-relaxed">
        Bags aggregates liquidity from 50+ DEXes to find the best rates. Zero platform fees means more value in your swaps. Used by 100k+ traders on Solana.
      </p>
    </div>
  );
}
