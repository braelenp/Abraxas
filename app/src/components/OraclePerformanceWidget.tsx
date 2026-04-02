import { useEffect, useState } from 'react';
import { Zap, TrendingUp, Sparkles } from 'lucide-react';
import { initializeOracle, simulateOracleProfit, getOracleMetrics, type OracleState } from '../lib/oracle';

/**
 * OraclePerformanceWidget
 * 
 * Compact widget for the Dashboard showing live Oracle metrics:
 * - Current $ABRA floor price
 * - 24h profit generated
 * - Next species threshold
 * - Birth progress indicator
 */
export function OraclePerformanceWidget() {
  const [oracleState, setOracleState] = useState<OracleState>(initializeOracle);
  
  // Simulate oracle profit generation
  useEffect(() => {
    const interval = setInterval(() => {
      setOracleState(prev => simulateOracleProfit(prev));
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const metrics = getOracleMetrics(oracleState);
  const progressPercent = Math.min(100, oracleState.birthProgress);
  
  return (
    <div className="rounded-xl border border-cyan-300/30 bg-gradient-to-br from-cyan-500/8 via-slate-900/80 to-slate-900/60 p-4 backdrop-blur space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-cyan-300/20">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-lg" />
          <div className="relative w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500/40 to-purple-500/30 flex items-center justify-center border border-cyan-400/60">
            <Zap className="text-cyan-300" size={14} />
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-bold text-cyan-300 tracking-wider uppercase font-mono">Oracle Performance</h3>
          <p className="text-[8px] text-cyan-300/60">Living Engine</p>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Floor Price */}
        <div className="rounded-lg bg-slate-900/60 border border-cyan-300/15 p-2.5">
          <p className="text-[8px] font-mono text-cyan-400/70 uppercase tracking-wider mb-0.5">Floor</p>
          <p className="text-sm font-bold text-cyan-200 font-mono">{metrics.floorPrice}</p>
          <p className="text-[9px] text-green-300 mt-0.5">↑ +0.42%</p>
        </div>
        
        {/* 24h Profit */}
        <div className="rounded-lg bg-slate-900/60 border border-green-300/15 p-2.5">
          <p className="text-[8px] font-mono text-green-400/70 uppercase tracking-wider mb-0.5">24h Profit</p>
          <p className="text-sm font-bold text-green-200 font-mono">{metrics.floor24hProfit}</p>
          <p className="text-[9px] text-green-300 mt-0.5">🤖 Deployed</p>
        </div>
        
        {/* MCAP */}
        <div className="rounded-lg bg-slate-900/60 border border-purple-300/15 p-2.5">
          <p className="text-[8px] font-mono text-purple-400/70 uppercase tracking-wider mb-0.5">MCAP</p>
          <p className="text-sm font-bold text-purple-200 font-mono">{metrics.mcap}</p>
        </div>
        
        {/* Next Threshold */}
        <div className="rounded-lg bg-slate-900/60 border border-violet-300/15 p-2.5">
          <p className="text-[8px] font-mono text-violet-400/70 uppercase tracking-wider mb-0.5">Next</p>
          <p className="text-sm font-bold text-violet-200 font-mono">{metrics.nextThresholdMcap}</p>
        </div>
      </div>
      
      {/* Birth Progress */}
      <div className="space-y-1 rounded-lg bg-slate-900/40 border border-slate-700/30 p-2.5">
        <div className="flex justify-between items-center">
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-slate-400">
            {oracleState.nextThreshold.speciesName}
          </span>
          <span className="text-xs font-bold text-violet-200 font-mono">{metrics.birthProgress}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-800 border border-violet-300/20 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${progressPercent >= 100 ? 'bg-gradient-to-r from-green-400 to-cyan-400' : 'bg-gradient-to-r from-violet-400 to-purple-400'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="flex gap-1.5 pt-1 border-t border-cyan-300/15">
        <a
          href="https://jupiter.ag"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-cyan-300/30 bg-cyan-500/10 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-cyan-200 transition hover:bg-cyan-500/15 hover:border-cyan-300/50"
        >
          <TrendingUp size={11} />
          Buy
        </a>
        <button
          type="button"
          className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-600/30 bg-slate-800/30 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-300 transition hover:bg-slate-800/50 hover:border-slate-600/50"
        >
          <Sparkles size={11} />
          View
        </button>
      </div>
    </div>
  );
}
