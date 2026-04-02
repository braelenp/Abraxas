import { useEffect, useState } from 'react';
import { ArrowRight, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { initializeOracle, simulateOracleProfit, getOracleMetrics, getAllThresholds, type OracleState } from '../lib/oracle';

/**
 * OracleEngine Component
 * 
 * Displays the Living Oracle — the self-replicating growth engine.
 * Shows real-time performance: floor price, 24h profits, next threshold,
 * and birth progress bar toward next species duplication.
 */
export function OracleEngine() {
  const [oracleState, setOracleState] = useState<OracleState>(initializeOracle);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Simulate oracle profit generation every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOracleState(prev => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 800);
        return simulateOracleProfit(prev);
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const metrics = getOracleMetrics(oracleState);
  const thresholds = getAllThresholds();
  const progressPercent = Math.min(100, oracleState.birthProgress);
  
  return (
    <div className="space-y-8 py-8">
      {/* Oracle Engine Header */}
      <div className="border-b border-cyan-400/30 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-400/40 blur-lg animate-pulse" />
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/40 to-purple-500/30 flex items-center justify-center border border-cyan-400/60">
              <Zap className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" size={20} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-cyan-300 tracking-wider uppercase font-mono">&gt; [ORACLE_ENGINE]</h2>
            <p className="text-[10px] text-cyan-300/60 mt-1 uppercase tracking-wider">THE_LIVING_HEART | SELF_REPLICATING_GROWTH</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-300/80 italic max-w-2xl">
          The Oracle runs silently, deploying trading profits back into $ABRA to steadily raise the floor. When thresholds are reached, it triggers automatic duplication of the next species.
        </p>
      </div>
      
      {/* Buy $ABRA CTA - Top */}
      <div className="flex gap-3 justify-center">
        <a
          href="https://jupiter.ag"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/15 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:border-cyan-300/60"
        >
          <TrendingUp size={14} />
          Buy $ABRA
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </a>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/40 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cyan-300/70 shadow-[0_0_12px_rgba(34,211,238,0.1)] transition hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:border-cyan-300/50 hover:from-cyan-500/15"
        >
          <Sparkles size={14} />
          Stake $ABRA
        </button>
      </div>
      
      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Floor Price */}
        <div className="rounded-xl border border-cyan-300/25 bg-gradient-to-br from-cyan-500/8 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400/80">[FLOOR_PRICE]</span>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-mono ${isAnimating ? 'text-green-300 bg-green-500/10 border border-green-400/30' : 'text-cyan-300/60 bg-cyan-500/5 border border-cyan-400/20'}`}>
              ⬆ +0.42%
            </div>
          </div>
          <p className="text-3xl font-bold text-cyan-200 font-mono tracking-tight mb-2">{metrics.floorPrice}</p>
          <p className="text-[10px] text-cyan-300/60 uppercase tracking-wider">Current trading floor</p>
        </div>
        
        {/* 24h Profit Generated */}
        <div className="rounded-xl border border-green-300/25 bg-gradient-to-br from-green-500/8 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-green-400/80">[24H_PROFIT]</span>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-mono ${isAnimating ? 'text-green-300 bg-green-500/20 border border-green-400/50' : 'text-green-300/70 bg-green-500/10 border border-green-400/30'}`}>
              🤖 Bot Active
            </div>
          </div>
          <p className="text-3xl font-bold text-green-200 font-mono tracking-tight mb-2">{metrics.floor24hProfit}</p>
          <p className="text-[10px] text-green-300/60 uppercase tracking-wider">Auto-deployed into $ABRA floor</p>
        </div>
        
        {/* MCAP */}
        <div className="rounded-xl border border-purple-300/25 bg-gradient-to-br from-purple-500/8 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400/80">[ABRAXAS_MCAP]</span>
          <p className="text-3xl font-bold text-purple-200 font-mono tracking-tight mt-4 mb-2">{metrics.mcap}</p>
          <p className="text-[10px] text-purple-300/60 uppercase tracking-wider">Total market capitalization</p>
        </div>
        
        {/* Total Deployed */}
        <div className="rounded-xl border border-orange-300/25 bg-gradient-to-br from-orange-500/8 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400/80">[DEPLOYED]</span>
          <p className="text-3xl font-bold text-orange-200 font-mono tracking-tight mt-4 mb-2">{metrics.totalDeployed}</p>
          <p className="text-[10px] text-orange-300/60 uppercase tracking-wider">Cumulative profits deployed</p>
        </div>
      </div>
      
      {/* Species Birth Progress */}
      <div className="rounded-xl border border-violet-300/25 bg-gradient-to-br from-violet-500/8 via-slate-900/80 to-slate-900/60 p-6 backdrop-blur space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-violet-400/80">[NEXT_SPECIES_BIRTH]</span>
              <p className="text-sm font-bold text-violet-200 mt-2 uppercase tracking-wider">{oracleState.nextThreshold.speciesName}</p>
              <p className="text-[10px] text-violet-300/70 mt-1 font-mono">{oracleState.nextThreshold.description}</p>
            </div>
            {oracleState.isThresholdReached && (
              <div className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-400/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-300">🎄 READY</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] text-violet-300/70 uppercase tracking-wider font-mono">Birth Progress</span>
            <span className="text-sm font-bold text-violet-200 font-mono">{metrics.birthProgress}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-900/60 border border-violet-300/20 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${progressPercent >= 100 ? 'bg-gradient-to-r from-green-400 to-cyan-400' : 'bg-gradient-to-r from-violet-500 to-purple-500'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-violet-300/60 italic">
            {oracleState.isThresholdReached
              ? '✨ Threshold reached! Next species ready to manifest.'
              : `${(100 - progressPercent).toFixed(1)}% until next birth`}
          </p>
        </div>
      </div>
      
      {/* Threshold Roadmap */}
      <div className="rounded-xl border border-slate-700/30 bg-slate-900/40 p-6 backdrop-blur space-y-4">
        <h3 className="text-sm font-bold text-slate-300 tracking-widest uppercase font-mono">&gt; [ROADMAP] SPECIES_THRESHOLDS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {thresholds.map((threshold, idx) => {
            const isCurrent = threshold.mcapTarget === oracleState.nextThreshold.mcapTarget;
            const isPassed = oracleState.abraMcap >= threshold.mcapTarget;
            
            return (
              <div
                key={threshold.mcapTarget}
                className={`relative rounded-lg border p-4 transition-all ${
                  isCurrent
                    ? 'border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : isPassed
                    ? 'border-green-400/40 bg-green-500/5'
                    : 'border-slate-600/30 bg-slate-800/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isCurrent ? 'text-cyan-300' : isPassed ? 'text-green-300' : 'text-slate-400'}`}>
                      {threshold.description}
                    </p>
                    <p className={`text-xs font-bold mt-2 ${isCurrent ? 'text-cyan-200' : isPassed ? 'text-green-200' : 'text-slate-300'}`}>
                      {threshold.speciesName}
                    </p>
                  </div>
                  {isPassed && (
                    <div className="flex-shrink-0">
                      <div className="px-2 py-1 rounded-full bg-green-500/20 border border-green-400/50">
                        <span className="text-[9px] font-bold text-green-300">✓ LIVE</span>
                      </div>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="flex-shrink-0">
                      <div className="px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 animate-pulse">
                        <span className="text-[9px] font-bold text-cyan-300">⚡ NEXT</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Buy $ABRA CTA - Bottom */}
      <div className="flex gap-3 justify-center border-t border-slate-700/30 pt-8">
        <a
          href="https://jupiter.ag"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/15 px-8 py-4 text-sm font-bold uppercase tracking-wider text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:border-cyan-300/60"
        >
          <TrendingUp size={16} />
          Buy $ABRA to Power the Oracle
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
