import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Zap, TrendingUp, Target, Shield, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

function TypingReveal({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    const startTime = setTimeout(() => {
      const interval = setInterval(() => {
        if (idx < text.length) {
          setDisplayed(text.slice(0, ++idx));
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTime);
      clearInterval(startTime as any);
    };
  }, [text, delay, speed]);

  return (
    <span className="font-mono text-3xl font-bold text-purple-300 tracking-widest drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
      {displayed}
      {!done && <span className="animate-pulse ml-1">∷</span>}
    </span>
  );
}

// Reputation Score Indicator
function ReputationScoreCard({ score }: { score: number }) {
  const getScoreColor = (s: number) => {
    if (s >= 850) return 'from-emerald-500/30 to-emerald-400/20 border-emerald-300/40 text-emerald-200';
    if (s >= 750) return 'from-cyan-500/30 to-cyan-400/20 border-cyan-300/40 text-cyan-200';
    if (s >= 650) return 'from-amber-500/30 to-amber-400/20 border-amber-300/40 text-amber-200';
    return 'from-red-500/30 to-red-400/20 border-red-300/40 text-red-200';
  };

  const getScoreTier = (s: number) => {
    if (s >= 850) return 'Elite';
    if (s >= 750) return 'Prime';
    if (s >= 650) return 'Standard';
    return 'Limited';
  };

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${getScoreColor(score)} p-4 space-y-3`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-purple-300/70">On-Chain Reputation</p>
        <span className="text-2xl font-bold">{score}</span>
      </div>
      <div className="w-full h-2 bg-slate-900/40 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-400 to-purple-500 transition-all duration-500"
          style={{ width: `${(score / 1000) * 100}%` }}
        />
      </div>
      <p className="text-xs text-slate-300/90">{getScoreTier(score)} Tier — Collateral Ratio: 80-110%</p>
    </div>
  );
}

// Opportunity Card Component
interface Opportunity {
  name: string;
  apy: number;
  collateral: string;
  duration: string;
  verified: boolean;
  capacity: string;
}

function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <div className="rounded-lg border border-purple-300/25 bg-gradient-to-br from-purple-500/10 to-slate-900/40 p-4 hover:from-purple-500/15 hover:to-slate-900/50 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-sm font-bold text-purple-300">{opp.name}</p>
          <p className="text-xs text-purple-300/60 mt-1">ROI-optimized</p>
        </div>
        {opp.verified && <CheckCircle size={18} className="text-emerald-400 shrink-0" />}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="rounded-lg bg-slate-950/60 p-2 border border-purple-300/15">
          <p className="text-purple-300/70">APY</p>
          <p className="font-bold text-purple-200 mt-1">{opp.apy}%</p>
        </div>
        <div className="rounded-lg bg-slate-950/60 p-2 border border-purple-300/15">
          <p className="text-purple-300/70">Duration</p>
          <p className="font-bold text-purple-200 mt-1">{opp.duration}</p>
        </div>
      </div>

      <div className="text-xs space-y-1">
        <p className="text-purple-300/70">Collateral: <span className="text-purple-200 font-semibold">{opp.collateral}</span></p>
        <p className="text-purple-300/70">Capacity: <span className="text-purple-200 font-semibold">{opp.capacity}</span></p>
      </div>

      <button className="w-full mt-4 px-3 py-2 rounded-lg bg-purple-500/20 border border-purple-400/40 text-xs font-semibold text-purple-200 hover:bg-purple-500/30 transition">
        Apply Now
      </button>
    </div>
  );
}

// Trading Analysis Component
function TradingHistoryAnalysis() {
  const analysisPoints = [
    { label: 'Win Rate', value: '68%', color: 'text-emerald-300' },
    { label: 'Avg Hold', value: '4.2d', color: 'text-cyan-300' },
    { label: 'ROI (30d)', value: '+24.3%', color: 'text-amber-300' },
    { label: 'Volume (30d)', value: '$2.4M', color: 'text-purple-300' },
  ];

  return (
    <div className="rounded-lg border border-purple-300/20 bg-purple-500/8 p-4 space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Trading History Analysis</p>
      
      <div className="grid grid-cols-2 gap-2">
        {analysisPoints.map((point, idx) => (
          <div key={idx} className="rounded-lg bg-slate-950/40 p-2.5 border border-purple-300/15">
            <p className="text-[10px] text-purple-300/60">{point.label}</p>
            <p className={`text-base font-bold mt-1 ${point.color}`}>{point.value}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-purple-300/80">Consistent profitability and liquid asset rotation signal reliable borrower standing. Accessible for undercollateralized lending at 90% ratio.</p>
    </div>
  );
}

// Yield Accrual Projection
function YieldAccrualProjection() {
  const [investmentAmount, setInvestmentAmount] = useState(10000);

  const projections = useMemo(() => {
    const rates = [12, 15, 18];
    return rates.map(rate => ({
      rate,
      monthly: (investmentAmount * rate) / 12 / 100,
      annual: (investmentAmount * rate) / 100,
    }));
  }, [investmentAmount]);

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase text-purple-300">Simulated Investment</label>
          <span className="text-xs font-mono text-purple-200">${investmentAmount.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="500000"
          step="1000"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-purple-900/40 to-purple-600/40 rounded-lg appearance-none cursor-pointer accent-purple-400"
        />
        <div className="flex justify-between text-[9px] text-slate-400">
          <span>$1k</span>
          <span>$500k</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {projections.map((proj, idx) => (
          <div key={idx} className="rounded-lg border border-purple-300/20 bg-purple-500/8 p-2.5 text-center">
            <p className="text-[9px] text-purple-300/70">{proj.rate}% APY</p>
            <p className="font-bold text-purple-200 mt-1 text-xs">${proj.annual.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
            <p className="text-[9px] text-purple-300/60 mt-0.5">/year</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-purple-300/30 bg-gradient-to-r from-purple-500/15 to-purple-400/8 p-3">
        <p className="text-xs text-purple-300/80">
          <span className="font-semibold text-purple-200">Example:</span> ${investmentAmount.toLocaleString()} at 15% APY = ${projections[1].annual.toLocaleString('en-US', { maximumFractionDigits: 0 })}/year passive income sourced from undercollateralized lending opportunities.
        </p>
      </div>
    </div>
  );
}

// Main Component
export function UndercollateralizedLendingModule() {
  const [showQualifyToggle, setShowQualifyToggle] = useState(false);
  const [userScore, setUserScore] = useState(750);
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'analysis'>('overview');
  const [isPulsing, setIsPulsing] = useState(true);

  // Sample opportunities
  const opportunities: Opportunity[] = [
    { name: 'Solend', apy: 15.2, collateral: '90%', duration: '30d', verified: true, capacity: '$500k' },
    { name: 'Anchor (via Model)', apy: 12.8, collateral: '85%', duration: '90d', verified: true, capacity: '$2M' },
    { name: 'Orca Liquidity Pool', apy: 18.4, collateral: '105%', duration: '60d', verified: true, capacity: '$250k' },
    { name: 'RWA Verified Fund', apy: 14.5, collateral: '88%', duration: '180d', verified: true, capacity: '$1M' },
  ];

  // Simulate score changes
  useEffect(() => {
    const interval = setInterval(() => {
      setUserScore(prev => {
        const change = (Math.random() - 0.5) * 20;
        return Math.min(1000, Math.max(600, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/8 via-slate-900/80 to-slate-900/60 p-5 sm:p-8">
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/3 rounded-full blur-3xl" />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-repeat opacity-10" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(168, 85, 247, 0.05) 25%, rgba(168, 85, 247, 0.05) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.05) 75%, rgba(168, 85, 247, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 4px'
        }} />
      </div>

      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* Dramatic Header with Typing Reveal */}
        <div className="space-y-3 sm:space-y-4 border-b border-purple-300/20 pb-4 sm:pb-6">
          <div className="space-y-2">
            <p className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-purple-300/60">&gt; [ALGORITHMIC_TRUST] CAPITAL_EFFICIENCY</p>
            <div className="text-2xl sm:text-3xl">
              <TypingReveal text="Undercollateralized Lending — Capital Access Unlocked" delay={100} speed={40} />
            </div>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300/90">
            King AI audits on-chain reputation, trading patterns, and yield accrual flows to unlock capital at 80-110% collateral ratios. Revolutionary capital efficiency powered by algorithmic trust. No centralized intermediary. Pure sovereign lending.
          </p>
        </div>

        {/* BUY $ABRA - PROMINENT TOP CTA */}
        <div className="flex justify-center px-2">
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-amber-400/70 bg-gradient-to-r from-amber-500/40 to-orange-500/35 px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100 shadow-[0_0_24px_rgba(251,146,60,0.35)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(251,146,60,0.5)] hover:border-amber-300/90 hover:from-amber-500/50 hover:to-orange-500/45 ${isPulsing ? 'animate-pulse' : ''}`}
            onMouseEnter={() => setIsPulsing(false)}
            onMouseLeave={() => setIsPulsing(true)}
          >
            <Zap size={18} className="text-orange-400 shrink-0" />
            <span>Buy $ABRA Now</span>
            <ArrowRight size={16} className="hidden sm:inline" />
          </a>
        </div>

        {/* Tab Navigation */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex gap-2 sm:gap-3 border-b border-purple-300/15 pb-3 overflow-x-auto">
            {(['overview', 'opportunities', 'analysis'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500/30 to-purple-400/20 border border-purple-300/40 text-purple-100 shadow-lg shadow-purple-500/15'
                    : 'text-purple-300/60 hover:text-purple-300/80 border border-purple-300/10 hover:border-purple-300/20'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'opportunities' && '🎯 Opportunities'}
                {tab === 'analysis' && '📈 Analysis'}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
              {/* Reputation Score */}
              <ReputationScoreCard score={Math.round(userScore)} />

              {/* How It Works */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-lg border border-purple-300/20 bg-purple-500/8 p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-purple-300" />
                    <p className="text-xs font-bold uppercase text-purple-300">King AI Audit</p>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300/90">
                    Portfolio composition analysis, win rate tracking, liquidation history, and on-chain credibility scoring.
                  </p>
                </div>

                <div className="rounded-lg border border-purple-300/20 bg-purple-500/8 p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={16} className="text-purple-300" />
                    <p className="text-xs font-bold uppercase text-purple-300">Capital Access</p>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300/90">
                    High-signal borrowers unlock loans at revolutionary ratios. Low-signal borrowers remain locked. Algorithmic fairness.
                  </p>
                </div>
              </div>

              {/* Abraxas Integration Highlight */}
              <div className="rounded-lg border-l-4 border-l-purple-400/60 border border-purple-300/20 bg-gradient-to-r from-purple-500/12 to-slate-900/40 p-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Abraxas Priority Access</p>
                </div>
                <p className="text-xs leading-relaxed text-slate-300/90">
                  RWA vault holders and Sophia vault members get priority tier placement. Your vault position becomes your reputation signal. Capital efficiency multiplies.
                </p>
              </div>

              <div className="text-center space-y-3">
                <p className="text-xs text-purple-300/70">See how your $ABRA staking position qualifies</p>
                <button
                  onClick={() => setShowQualifyToggle(!showQualifyToggle)}
                  className="w-full px-4 py-3 rounded-lg border border-purple-300/40 bg-purple-500/15 text-sm font-semibold text-purple-200 hover:bg-purple-500/25 transition"
                >
                  {showQualifyToggle ? 'Hide Qualifier' : 'Show My Qualification'} 
                  <ChevronDown size={16} className={`inline ml-2 transition-transform ${showQualifyToggle ? 'rotate-180' : ''}`} />
                </button>

                {showQualifyToggle && (
                  <div className="rounded-lg border border-purple-300/20 bg-purple-500/12 p-4 space-y-2 animate-in fade-in duration-300">
                    <p className="text-xs text-purple-300/80">
                      <span className="font-semibold text-purple-200">Your Position:</span> If you hold $ABRA, your vault share immediately qualifies you for undercollateralized lending pools. Your on-chain reputation score is actively monitored and updated. Borrow and earn simultaneously.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Opportunities Tab */}
          {activeTab === 'opportunities' && (
            <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Current Verified Opportunities</p>
                <p className="text-xs text-purple-300/70">APY 12-18% on undercollateralized positions. King AI surfaces new verified opportunities weekly.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {opportunities.map((opp, idx) => (
                  <OpportunityCard key={idx} opp={opp} />
                ))}
              </div>

              <div className="rounded-lg border border-purple-300/20 bg-purple-500/8 p-4">
                <p className="text-xs text-purple-300/80">
                  <span className="font-semibold text-purple-200">Risk-Adjusted Performance:</span> Each opportunity is scored by King AI for liquidation probability, yield stability, and capital efficiency. All opportunities shown exceed traditional finance returns by 5x+.
                </p>
              </div>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
              <TradingHistoryAnalysis />
              <YieldAccrualProjection />
            </div>
          )}
        </div>

        {/* World Labs Badge */}
        <div className="text-center border-t border-purple-300/20 pt-5 sm:pt-6">
          <a
            href="https://worldlabsprotocol.carrd.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-300/40 bg-gradient-to-r from-purple-500/10 to-purple-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300 hover:border-purple-300/60 hover:from-purple-500/20 hover:to-purple-400/15 transition"
          >
            Powered by World Labs Protocol
            <ArrowRight size={12} />
          </a>
        </div>

        {/* BUY $ABRA - BOTTOM CTA */}
        <div className="border-t border-purple-300/20 pt-5 sm:pt-6 text-center space-y-3 sm:space-y-4">
          <p className="text-[9px] sm:text-xs font-mono text-purple-300/80 uppercase tracking-widest">&gt; [CAPITAL_EFFICIENCY] UNLOCK_YOUR_POSITION</p>
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/25 px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_16px_rgba(251,146,60,0.25)] transition hover:shadow-[0_0_24px_rgba(251,146,60,0.4)] hover:border-amber-300/80 w-full"
          >
            <Zap size={16} className="text-orange-400 shrink-0" />
            <span>Buy $ABRA & Access Lending</span>
            <ArrowRight size={14} className="hidden sm:inline" />
          </a>
          <p className="text-[10px] sm:text-xs text-slate-400/70 italic leading-relaxed">
            King AI unlocks undercollateralized lending powered by algorithmic trust. Capital efficiency without intermediaries. Sovereign lending is live.
          </p>
        </div>
      </div>
    </div>
  );
}
