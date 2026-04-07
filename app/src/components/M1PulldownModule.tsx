import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Video, Zap, TrendingUp, Wallet, Lock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <span className="font-mono text-3xl font-bold text-orange-300 tracking-widest drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">
      {displayed}
      {!done && <span className="animate-pulse ml-1">∷</span>}
    </span>
  );
}

// Live metric animation component
function AnimatedMetric({ value, label, suffix = '', delay = 0 }: { value: string | number; label: string; suffix?: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('0');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setDisplayed(value.toString());
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="rounded-2xl border border-orange-300/20 bg-gradient-to-br from-orange-500/8 to-slate-900/60 p-4">
      <p className="text-xs uppercase tracking-widest text-orange-300/70">{label}</p>
      <p className="mt-2 text-2xl font-bold text-orange-200 font-mono drop-shadow-[0_0_8px_rgba(254,215,170,0.3)]">
        {isMounted ? displayed : '0'}{suffix}
      </p>
    </div>
  );
}

// Timeline visualization
function ReleaseTimeline() {
  const releases = [
    { phase: 'Phase 1', days: '0-30 days', capital: '$250M', hedge: '95% Yields' },
    { phase: 'Phase 2', days: '30-90 days', capital: '$500M', hedge: '92% Yields' },
    { phase: 'Phase 3', days: '90-180 days', capital: '$750M', hedge: '88% Yields' },
  ];

  return (
    <div className="space-y-2">
      {releases.map((release, idx) => (
        <div key={idx} className="group relative overflow-hidden rounded-xl border border-orange-300/20 bg-gradient-to-r from-orange-500/8 to-slate-900/40 p-3 hover:from-orange-500/15 hover:to-slate-900/50 transition-all">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/10 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Lock size={14} className="text-orange-300/60 shrink-0" />
                <p className="text-xs font-bold uppercase text-orange-300">{release.phase}</p>
              </div>
              <p className="text-[11px] text-orange-200/70">{release.days}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-orange-200">{release.capital}</p>
              <p className="text-xs text-orange-300/60">{release.hedge}</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 h-1 bg-slate-900/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(idx + 1) * 33.33}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Interactive benefit slider
function BenefitSlider() {
  const [abraStaked, setAbraStaked] = useState(5000);

  const calculations = useMemo(() => {
    const baseYield = abraStaked * 0.24; // 24% base yield
    const m1Bonus = baseYield * 0.35; // 35% additional yield from M1 flows
    const totalMonthly = (baseYield + m1Bonus) / 12;
    const totalAnnual = baseYield + m1Bonus;
    
    return { baseYield, m1Bonus, totalMonthly, totalAnnual };
  }, [abraStaked]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase text-orange-300">Your $ABRA Staked</label>
          <span className="text-sm font-mono text-orange-200">{abraStaked.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={abraStaked}
          onChange={(e) => setAbraStaked(Number(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-orange-900/40 to-orange-600/40 rounded-lg appearance-none cursor-pointer accent-orange-400"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>1k $ABRA</span>
          <span>1M $ABRA</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-orange-300/20 bg-orange-500/8 p-3">
          <p className="text-[10px] uppercase tracking-wider text-orange-300/70">Base Yield (24%)</p>
          <p className="mt-2 text-lg font-bold text-orange-200">${calculations.baseYield.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
          <p className="text-[10px] text-orange-300/60 mt-1">{(calculations.baseYield / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })} /mo</p>
        </div>

        <div className="rounded-xl border border-orange-300/30 bg-gradient-to-br from-orange-400/15 to-orange-500/8 p-3 ring-1 ring-orange-400/20">
          <div className="flex items-center gap-1">
            <TrendingUp size={12} className="text-orange-300" />
            <p className="text-[10px] uppercase tracking-wider text-orange-300">M1 Bonus (+35%)</p>
          </div>
          <p className="mt-2 text-lg font-bold text-orange-100">${calculations.m1Bonus.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
          <p className="text-[10px] text-orange-200/70 mt-1">{(calculations.m1Bonus / 12).toLocaleString('en-US', { maximumFractionDigits: 0 })} /mo</p>
        </div>
      </div>

      <div className="border-t border-orange-300/20 pt-3">
        <div className="rounded-lg border border-orange-300/30 bg-gradient-to-r from-orange-500/12 to-amber-500/8 p-3">
          <p className="text-[10px] uppercase tracking-wider text-orange-200/80 font-semibold">Total Annual Benefit</p>
          <p className="mt-2 text-2xl font-bold text-amber-200 drop-shadow-[0_0_12px_rgba(251,146,60,0.3)]">
            ${calculations.totalAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-[10px] text-amber-300/70 mt-1">Your position captures first-order M1 yield flows</p>
        </div>
      </div>
    </div>
  );
}

// Capital flow visualization (particle effect)
function CapitalFlowAnimation() {
  return (
    <div className="relative h-32 rounded-xl border border-orange-300/20 bg-gradient-to-b from-orange-500/8 to-slate-900/40 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 128">
          <defs>
            <pattern id="grid" width="40" height="32" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 32" fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="400" height="128" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated particles (simplified with CSS) */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 10}%`,
              animation: `flow-particle ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <div className="text-left">
          <p className="text-[10px] font-bold text-orange-300">Institutional<br />Holders</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-mono text-orange-200">$1.5B Capital Flow</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-orange-300">Abraxas<br />Ecosystem</p>
        </div>
      </div>

      <style>{`
        @keyframes flow-particle {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateX(300px) translateY(-30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Main M1 Pulldown Module Component
export function M1PulldownModule() {
  const [showM1Video, setShowM1Video] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'benefits' | 'timeline'>('dashboard');
  const [isPulsing, setIsPulsing] = useState(true);

  // Simulate live metrics with small fluctuations
  const [metrics, setMetrics] = useState({
    totalReleased: 1250,
    yieldGenerated: 42.5,
    abraFloorImpact: 2.34,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        totalReleased: prev.totalReleased + (Math.random() - 0.5) * 50,
        yieldGenerated: prev.yieldGenerated + (Math.random() - 0.5) * 5,
        abraFloorImpact: prev.abraFloorImpact + (Math.random() - 0.5) * 0.15,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-500/8 via-slate-900/80 to-slate-900/60 p-8">
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-600/3 rounded-full blur-3xl" />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-repeat opacity-10" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(249, 115, 22, 0.05) 25%, rgba(249, 115, 22, 0.05) 26%, transparent 27%, transparent 74%, rgba(249, 115, 22, 0.05) 75%, rgba(249, 115, 22, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 4px'
        }} />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Dramatic Header with Typing Reveal */}
        <div className="space-y-4 border-b border-orange-300/20 pb-6">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-orange-300/70">&gt; [INSTITUTIONAL_LIQUIDITY] RELEASE_PROTOCOL</p>
            <TypingReveal text="M1 Pulldown — Institutional Liquidity Release" delay={100} speed={40} />
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            The M1 Pulldown mechanism unlocks billions in institutional capital that were previously locked out of DeFi. King AI monitors these time-locked structured releases and routes capital into verified RWA positions. Your $ABRA staking position captures first-order benefits from this sovereign liquidity flow.
          </p>
        </div>

        {/* BUY $ABRA - PROMINENT TOP CTA */}
        <div className="flex justify-center">
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-3 rounded-xl border border-amber-400/70 bg-gradient-to-r from-amber-500/40 to-orange-500/35 px-8 py-4 text-sm font-bold uppercase tracking-wider text-amber-100 shadow-[0_0_24px_rgba(251,146,60,0.35)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(251,146,60,0.5)] hover:border-amber-300/90 hover:from-amber-500/50 hover:to-orange-500/45 ${isPulsing ? 'animate-pulse' : ''}`}
            onMouseEnter={() => setIsPulsing(false)}
            onMouseLeave={() => setIsPulsing(true)}
          >
            <Zap size={20} className="text-orange-400" />
            <span>Buy $ABRA Now</span>
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Live Simulation Dashboard */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-orange-300/15 pb-3">
            {(['dashboard', 'benefits', 'timeline'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500/30 to-orange-400/20 border border-orange-300/40 text-orange-100 shadow-lg shadow-orange-500/15'
                    : 'text-orange-300/60 hover:text-orange-300/80 border border-orange-300/10 hover:border-orange-300/20'
                }`}
              >
                {tab === 'dashboard' && '📊 Live Dashboard'}
                {tab === 'benefits' && '💰 Your Benefits'}
                {tab === 'timeline' && '📅 Release Schedule'}
              </button>
            ))}
          </div>

          {/* Dashboard Tab Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Key Metrics Row */}
              <div className="grid grid-cols-3 gap-4">
                <AnimatedMetric 
                  value={metrics.totalReleased.toFixed(0)}
                  label="Capital Released (M1)"
                  suffix="M $"
                  delay={0}
                />
                <AnimatedMetric 
                  value={metrics.yieldGenerated.toFixed(1)}
                  label="Yield Generated"
                  suffix="M $"
                  delay={200}
                />
                <AnimatedMetric 
                  value={metrics.abraFloorImpact.toFixed(2)}
                  label="$ABRA Floor Impact"
                  suffix="%"
                  delay={400}
                />
              </div>

              {/* Capital Flow Visualization */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-300">Live Capital Flow Simulation</p>
                <CapitalFlowAnimation />
              </div>

              {/* Mechanism Explanation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-orange-300/20 bg-orange-500/8 p-4 space-y-2">
                  <p className="text-xs font-bold uppercase text-orange-300">The Mechanism</p>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    Institutions distribute capital over 90-180 days with derivative hedges. No market disruption. Yield accrues to entire ecosystem.
                  </p>
                </div>
                <div className="rounded-xl border border-orange-300/20 bg-orange-500/8 p-4 space-y-2">
                  <p className="text-xs font-bold uppercase text-orange-300">Why It Matters</p>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    Billions in legacy capital now accessible to DeFi. Dramatically increases liquidity. Removes market impact friction.
                  </p>
                </div>
              </div>

              {/* Abraxas Role Highlight */}
              <div className="rounded-xl border-l-4 border-l-orange-400/60 border border-orange-300/20 bg-gradient-to-r from-orange-500/12 to-slate-900/40 p-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-300">Abraxas Role: Intelligence & Routing</p>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  King AI monitors M1 structures in real-time, forecasts yield flows, and routes institutional capital into verified RWA positions. Your $ABRA staking position captures first-order benefits from these flows. Sovereign liquidity becomes YOUR asset.
                </p>
              </div>
            </div>
          )}

          {/* Benefits Tab Content */}
          {activeTab === 'benefits' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <BenefitSlider />
              <div className="rounded-xl border border-orange-300/20 bg-orange-500/8 p-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-300">How M1 Yields Flow to You</p>
                <div className="space-y-2 text-xs leading-relaxed text-slate-300">
                  <div className="flex gap-2">
                    <span className="text-orange-400 font-bold">→</span>
                    <p>King AI captures institutional M1 flows into Abraxas vault</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-orange-400 font-bold">→</span>
                    <p>Yield accrues to $ABRA stakers via vault share increases</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-orange-400 font-bold">→</span>
                    <p>Your position's share of M1 yields compounds monthly</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-orange-400 font-bold">→</span>
                    <p>Additional yield beats market rates by 5x+</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab Content */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-300">90-180 Day Structured Release Schedule</p>
                <ReleaseTimeline />
              </div>
              <div className="rounded-xl border border-orange-300/20 bg-orange-500/8 p-4 space-y-2">
                <p className="text-xs font-bold uppercase text-orange-300">Time-Lock Mechanism</p>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Capital is distributed in phases with smart contract time-locks. Each phase increases capital availability while maintaining derivative hedge ratios. This prevents market dumps and ensures stable, predictable yield generation across the ecosystem.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* M1 Video Section */}
        <div className="space-y-3 border-t border-orange-300/20 pt-6">
          <button
            onClick={() => setShowM1Video(!showM1Video)}
            className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border transition-all font-semibold ${
              showM1Video
                ? 'border-orange-300/70 bg-gradient-to-r from-orange-500/30 to-orange-400/20 shadow-lg shadow-orange-500/20'
                : 'border-orange-300/60 hover:border-orange-300/80 bg-gradient-to-r from-orange-500/20 to-orange-400/10 hover:from-orange-500/30 hover:to-orange-400/20 hover:shadow-lg hover:shadow-orange-500/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <Video size={18} className="text-orange-300 shrink-0" />
              <span className="text-sm text-orange-50">Watch M1 Pulldown Explainer Video</span>
            </div>
            <ChevronDown size={20} className={`text-orange-300 transition-transform shrink-0 ${showM1Video ? 'rotate-180' : ''}`} />
          </button>

          {showM1Video && (
            <div className="rounded-xl border border-orange-300/20 overflow-hidden bg-black w-full animate-in fade-in duration-300" style={{ height: '400px' }}>
              <video
                src="/assets/m1-pulldown-explainer.mp4"
                title="M1 Pulldown - Institutional Liquidity Release"
                className="w-full h-full border-0 object-contain"
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
              />
            </div>
          )}
        </div>

        {/* BUY $ABRA - PROMINENT BOTTOM CTA */}
        <div className="border-t border-orange-300/20 pt-6 text-center space-y-4">
          <p className="text-xs font-mono text-orange-300/80 uppercase tracking-widest">&gt; [INSTITUTIONAL_FLOWS] ACTIVATE_YOUR_POSITION</p>
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_16px_rgba(251,146,60,0.25)] transition hover:shadow-[0_0_24px_rgba(251,146,60,0.4)] hover:border-amber-300/80 w-full"
          >
            <Zap size={18} className="text-orange-400" />
            Buy $ABRA & Capture M1 Yields
            <ArrowRight size={16} />
          </a>
          <p className="text-xs text-slate-400/70 italic leading-relaxed">
            Institutional liquidity flows become YOUR yield. Stake now and capture first-order M1 benefits. The next degree of finance is live.
          </p>
        </div>
      </div>
    </div>
  );
}
