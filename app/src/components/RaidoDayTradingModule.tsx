import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Video, Zap, TrendingUp, Wallet, Lock, ArrowRight, CheckCircle, AlertCircle, RadioIcon, Bot, Award } from 'lucide-react';

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
    <span className="font-mono text-3xl font-bold text-teal-300 tracking-widest drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]">
      {displayed}
      {!done && <span className="animate-pulse ml-1">∷</span>}
    </span>
  );
}

// Live Raido Bot Status Card
function RaidoBotLiveStatus() {
  const [signals, setSignals] = useState(0);
  const [winRate, setWinRate] = useState(87);
  const [pnl, setPnl] = useState(4250);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prev => prev + Math.floor(Math.random() * 3));
      setWinRate(Math.min(90, Math.max(75, 87 + (Math.random() - 0.5) * 5)));
      setPnl(prev => prev + (Math.random() - 0.5) * 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const recentTrades = [
    { symbol: 'BTC/USD', time: '12m ago', outcome: 'win', pnl: '+$850' },
    { symbol: 'ETH/USD', time: '28m ago', outcome: 'win', pnl: '+$620' },
    { symbol: 'XAU/USD', time: '45m ago', outcome: 'win', pnl: '+$340' },
    { symbol: 'NAS/USD', time: '1h ago', outcome: 'loss', pnl: '-$160' },
  ];

  return (
    <div className="space-y-4">
      {/* Bot Status Header */}
      <div className="rounded-lg sm:rounded-xl border border-teal-300/30 bg-gradient-to-r from-teal-500/15 to-cyan-500/10 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-teal-400 animate-ping opacity-40" />
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-300">Raido Bot Active</p>
          </div>
          <p className="text-xs font-mono text-teal-300/70">Works While You Sleep ⚒</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
          <div className="rounded-lg border border-teal-300/20 bg-slate-950/50 p-2 sm:p-3 text-center">
            <p className="text-[10px] sm:text-xs text-teal-300/70 uppercase tracking-wider">Live Signals</p>
            <p className="mt-1.5 text-lg sm:text-xl font-bold text-teal-200">{signals}</p>
          </div>
          <div className="rounded-lg border border-teal-300/20 bg-slate-950/50 p-2 sm:p-3 text-center">
            <p className="text-[10px] sm:text-xs text-teal-300/70 uppercase tracking-wider">Win Rate</p>
            <p className="mt-1.5 text-lg sm:text-xl font-bold text-teal-200">{winRate.toFixed(0)}%</p>
          </div>
          <div className="rounded-lg border border-teal-300/20 bg-slate-950/50 p-2 sm:p-3 text-center">
            <p className="text-[10px] sm:text-xs text-teal-300/70 uppercase tracking-wider">Today PnL</p>
            <p className={`mt-1.5 text-lg sm:text-xl font-bold ${pnl >= 0 ? 'text-teal-200' : 'text-red-300'}`}>${pnl.toFixed(0)}</p>
          </div>
        </div>

        {/* Recent Trades */}
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-teal-300 mb-2">Recent Trades</p>
        <div className="space-y-1.5">
          {recentTrades.map((trade, idx) => (
            <div key={idx} className="flex items-center justify-between px-2 py-1.5 rounded border border-teal-300/15 bg-slate-950/30">
              <span className="text-[10px] sm:text-xs font-mono text-teal-300">{trade.symbol}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] ${trade.outcome === 'win' ? 'text-teal-300' : 'text-red-300'}`}>
                  {trade.outcome === 'win' ? '✓' : '✗'} {trade.pnl}
                </span>
                <span className="text-[9px] text-slate-400">{trade.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Watchlist Component
function AssetWatchlist() {
  const assets = {
    'Crypto': ['BTC', 'ETH', 'XRP', 'SOL', 'HYPE', 'SKR'],
    'Metals': ['XAU', 'XAG', 'XAU/AUD', 'XAU/EUR'],
    'Indices': ['NAS', 'US30', 'SPX'],
    'Commodities': ['USOIL', 'UKOIL'],
    'Currencies': ['DXY', 'GBP/USD', 'EUR/USD', 'USD/JPY'],
  };

  return (
    <div className="space-y-3">
      {Object.entries(assets).map(([category, symbols]) => (
        <div key={category} className="rounded-lg sm:rounded-xl border border-teal-300/20 bg-teal-500/8 p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-teal-300 mb-2">{category}</p>
          <div className="flex flex-wrap gap-2">
            {symbols.map((symbol) => (
              <span
                key={symbol}
                className="px-2.5 py-1 rounded-lg border border-teal-300/30 bg-teal-500/15 text-[10px] sm:text-xs font-mono tracking-wider text-teal-100 hover:border-teal-300/60 hover:bg-teal-500/25 transition"
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Strategy Explanation Component
function StrategyExplanation() {
  return (
    <div className="rounded-lg sm:rounded-xl border border-teal-300/30 bg-gradient-to-br from-teal-500/10 to-slate-900/40 p-4 sm:p-6 space-y-4">
      <div className="space-y-2">
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-teal-300/60">&gt; [CORE_ALGORITHM] MBLB_50_BOUNCE</p>
        <h3 className="text-sm sm:text-base font-bold text-teal-200">Modified Bollinger Lower Band with 50 EMA Bounce</h3>
      </div>

      <div className="space-y-3">
        {/* Setup */}
        <div className="rounded-lg border border-teal-300/20 bg-slate-950/50 p-3">
          <div className="flex items-start gap-2 mb-2">
            <RadioIcon size={14} className="text-teal-300 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase text-teal-300">H1 Setup</p>
              <p className="text-[10px] sm:text-xs text-teal-300/80 mt-1">Price touches or moves below Lower Bollinger Band (20, 2) while maintaining position above 50 EMA</p>
            </div>
          </div>
        </div>

        {/* Entry */}
        <div className="rounded-lg border border-teal-300/20 bg-slate-950/50 p-3">
          <div className="flex items-start gap-2 mb-2">
            <CheckCircle size={14} className="text-teal-300 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase text-teal-300">M15 Entry Signal</p>
              <p className="text-[10px] sm:text-xs text-teal-300/80 mt-1">Candle closes above Lower Bollinger Band after touching it = LONG entry</p>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="rounded-lg border border-teal-300/20 bg-slate-950/50 p-3">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle size={14} className="text-teal-300 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase text-teal-300">Risk Rules</p>
              <p className="text-[10px] sm:text-xs text-teal-300/80 mt-1">1% risk per trade | Stop Loss below entry | Target: 5-8x R:R</p>
            </div>
          </div>
        </div>

        {/* Exits */}
        <div className="rounded-lg border border-teal-300/20 bg-slate-950/50 p-3">
          <div className="flex items-start gap-2 mb-2">
            <TrendingUp size={14} className="text-teal-300 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase text-teal-300">Automatic Exits</p>
              <p className="text-[10px] sm:text-xs text-teal-300/80 mt-1">Hit 5-8x target → Close 100% | Hit SL → Close 100% | Works across ALL asset classes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="border-t border-teal-300/20 pt-4 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-[10px] text-teal-300/60">Win Rate</p>
          <p className="text-lg font-bold text-teal-200">85-90%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-teal-300/60">Risk:Reward</p>
          <p className="text-lg font-bold text-teal-200">1:5-8x</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-teal-300/60">Asset Classes</p>
          <p className="text-lg font-bold text-teal-200">All</p>
        </div>
      </div>
    </div>
  );
}

// Interactive Quiz Component
function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What is the main setup condition for MBLB/50 bounce?',
      options: [
        'Price breaks above 50 EMA',
        'Price touches/moves below Lower BB (20,2) while above 50 EMA',
        'Any breakout above resistance',
        'Moving average crosses over',
      ],
      correct: 1,
    },
    {
      question: 'On which timeframe is the actual entry signal triggered?',
      options: ['1H', 'M15 (15-minute)', '4H', 'D (Daily)'],
      correct: 1,
    },
    {
      question: "What's the specified risk per trade?",
      options: ['2%', '5%', '1%', '0.5%'],
      correct: 2,
    },
    {
      question: 'What are the target exit levels for a successful trade?',
      options: ['2-3x R:R', '5-8x R:R', '10x R:R', '3-5x R:R'],
      correct: 1,
    },
    {
      question: 'Which asset class does the MBLB/50 bounce NOT work on?',
      options: [
        'It works on all asset classes',
        'Only on Crypto',
        'Only on Metals',
        'Only on Currencies',
      ],
      correct: 0,
    },
  ];

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = optionIdx;
    setUserAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const score = userAnswers.reduce((sum, answer, idx) => {
    return sum + (answer === questions[idx].correct ? 1 : 0);
  }, 0);

  const passed = score >= Math.ceil(questions.length * 0.8);

  if (showResults) {
    return (
      <div className="rounded-lg sm:rounded-xl border border-teal-300/30 bg-gradient-to-br from-teal-500/10 to-slate-900/40 p-4 sm:p-6 space-y-4">
        <div className="text-center space-y-2">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-teal-300">&gt; [QUIZ_RESULTS]</p>
          <p className="text-2xl sm:text-3xl font-bold text-teal-200">{score}/{questions.length}</p>
          <p className={`text-sm sm:text-base font-bold uppercase tracking-wider ${passed ? 'text-teal-300' : 'text-orange-300'}`}>
            {passed ? '✓ Mastery Unlocked' : 'Try Again'}
          </p>
        </div>

        {passed && (
          <div className="rounded-lg border border-teal-300/30 bg-teal-500/15 p-3 sm:p-4">
            <div className="flex items-start gap-2">
              <Award size={16} className="text-teal-300 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-teal-300 uppercase">+500 Airdrop Points</p>
                <p className="text-[10px] sm:text-xs text-teal-300/80 mt-1">You've unlocked Raido Day Trading mastery points!</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setCurrentQuestion(0);
            setUserAnswers([]);
            setShowResults(false);
          }}
          className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500/30 to-teal-400/20 border border-teal-300/40 text-teal-100 font-bold uppercase tracking-wider text-xs sm:text-sm hover:from-teal-500/40 hover:to-teal-400/30 transition"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg sm:rounded-xl border border-teal-300/30 bg-gradient-to-br from-teal-500/10 to-slate-900/40 p-4 sm:p-6 space-y-4">
      <div className="space-y-2">
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-teal-300/60">Question {currentQuestion + 1}/{questions.length}</p>
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-sm sm:text-base font-bold text-teal-100">{questions[currentQuestion].question}</p>

      <div className="space-y-2">
        {questions[currentQuestion].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full px-4 py-3 rounded-lg border border-teal-300/20 bg-slate-950/50 hover:border-teal-300/60 hover:bg-teal-500/15 text-left text-xs sm:text-sm text-teal-100 transition font-semibold"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Component
export function RaidoDayTradingModule() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'watchlist' | 'strategy' | 'bot'>('overview');

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-teal-300/30 bg-gradient-to-br from-teal-500/8 via-slate-900/80 to-slate-900/60 p-5 sm:p-8">
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-600/3 rounded-full blur-3xl" />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-repeat opacity-10" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(20,184,166,0.05) 25%, rgba(20,184,166,0.05) 26%, transparent 27%, transparent 74%, rgba(20,184,166,0.05) 75%, rgba(20,184,166,0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 4px'
        }} />
      </div>

      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* Dramatic Header */}
        <div className="space-y-3 sm:space-y-4 border-b border-teal-300/20 pb-4 sm:pb-6">
          <div className="space-y-2">
            <p className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-teal-300/60">&gt; [RAIDO_ACADEMY] DAY_TRADING_MODULE_7</p>
            <div className="text-lg sm:text-2xl md:text-3xl">
              <TypingReveal text="Day Trading Strategy & Raido Bot" delay={100} speed={40} />
            </div>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300/90">
            The Day Trading Strategy that powers Raido — 85-90% win rate, 5-8x R:R, works across all asset classes. This is the same algorithm that powers the Oracle's sovereign automation — turning market equilibrium into consistent, compounding profits for the species.
          </p>
        </div>

        {/* BUY $ABRA - PROMINENT TOP CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 px-2">
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-amber-400/70 bg-gradient-to-r from-amber-500/40 to-orange-500/35 px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100 shadow-[0_0_24px_rgba(251,146,60,0.35)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(251,146,60,0.5)] hover:border-amber-300/90 hover:from-amber-500/50 hover:to-orange-500/45 flex-1 sm:flex-none"
          >
            <Zap size={18} className="text-orange-400 shrink-0" />
            <span>Buy $ABRA</span>
            <ArrowRight size={16} className="hidden sm:inline" />
          </a>

          <button
            disabled
            className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-slate-400/30 bg-slate-700/20 px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 cursor-not-allowed opacity-50"
          >
            <Lock size={16} className="shrink-0" />
            <span>Claim Airdrop</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 sm:gap-3 border-b border-teal-300/15 pb-3 overflow-x-auto">
          {(['overview', 'watchlist', 'strategy', 'bot'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-teal-500/30 to-teal-400/20 border border-teal-300/40 text-teal-100 shadow-lg shadow-teal-500/15'
                  : 'text-teal-300/60 hover:text-teal-300/80 border border-teal-300/10 hover:border-teal-300/20'
              }`}
            >
              {tab === 'overview' && '📊 Overview'}
              {tab === 'watchlist' && '📈 Watchlist'}
              {tab === 'strategy' && '⚙ Strategy'}
              {tab === 'bot' && '🤖 Bot'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-5 sm:space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-5 sm:space-y-6">
              <RaidoBotLiveStatus />

              {/* Lore Tie-in */}
              <div className="rounded-lg sm:rounded-xl border-l-4 border-l-teal-400/60 border border-teal-300/20 bg-gradient-to-r from-teal-500/12 to-slate-900/40 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-teal-300">Lore: Oracle Sovereignty</p>
                </div>
                <p className="text-[10px] sm:text-xs leading-relaxed text-slate-300/90">
                  This is the same strategy that powers the Oracle's sovereign automation — turning market equilibrium into consistent, compounding profits for the species. The Raido Bot operates 24/7, analyzing price action across all asset classes and executing trades with surgical precision.
                </p>
              </div>

              {/* Module Completion Reward */}
              <div className="rounded-lg sm:rounded-xl border border-teal-300/30 bg-teal-500/15 p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <Award size={16} className="text-teal-300 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-teal-300 uppercase">Module Completion Reward</p>
                    <p className="text-[10px] sm:text-xs text-teal-300/80 mt-1">Complete the interactive quiz to earn +500 Airdrop Points</p>
                  </div>
                </div>
              </div>

              {/* Quiz CTA */}
              <button
                onClick={() => setShowQuiz(!showQuiz)}
                className="w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border transition-all font-semibold text-xs sm:text-sm border-teal-300/60 hover:border-teal-300/80 bg-gradient-to-r from-teal-500/20 to-teal-400/10 hover:from-teal-500/30 hover:to-teal-400/20 hover:shadow-lg hover:shadow-teal-500/20"
              >
                <div className="flex items-center gap-2">
                  <RadioIcon size={16} className="text-teal-300 shrink-0" />
                  <span className="text-teal-50">Interactive Quiz: Test Your Knowledge</span>
                </div>
                <ChevronDown size={18} className={`text-teal-300 transition-transform shrink-0 ${showQuiz ? 'rotate-180' : ''}`} />
              </button>

              {showQuiz && (
              <div className="">
                  <InteractiveQuiz />
                </div>
              )}
            </div>
          )}

          {/* Watchlist Tab */}
          {activeTab === 'watchlist' && (
            <div className="space-y-4">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-teal-300">Full Raido Watchlist - 26 Symbols Across All Asset Classes</p>
              <AssetWatchlist />
            </div>
          )}

          {/* Strategy Tab */}
          {activeTab === 'strategy' && (
            <div className="space-y-4">
              <StrategyExplanation />

              {/* Video Section */}
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border transition-all font-semibold text-xs sm:text-sm border-teal-300/60 hover:border-teal-300/80 bg-gradient-to-r from-teal-500/20 to-teal-400/10 hover:from-teal-500/30 hover:to-teal-400/20 hover:shadow-lg hover:shadow-teal-500/20"
              >
                <div className="flex items-center gap-2">
                  <Video size={16} className="text-teal-300 shrink-0" />
                  <span className="text-teal-50">Watch Raido Strategy Explainer</span>
                </div>
                <ChevronDown size={18} className={`text-teal-300 transition-transform shrink-0 ${showVideo ? 'rotate-180' : ''}`} />
              </button>

              {showVideo && (
                <div className="rounded-lg sm:rounded-xl border border-teal-300/20 overflow-hidden bg-black w-full" style={{ height: '300px', minHeight: '200px' }}>
                  <video
                    src="/assets/raido-strategy-explainer.mp4"
                    title="Raido Day Trading Strategy"
                    className="w-full h-full border-0 object-contain"
                    controls
                    controlsList="nodownload"
                    playsInline
                    preload="metadata"
                  />
                </div>
              )}
            </div>
          )}

          {/* Bot Tab */}
          {activeTab === 'bot' && (
            <div className="space-y-4">
              <div className="rounded-lg sm:rounded-xl border border-teal-300/20 bg-teal-500/8 p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bot size={16} className="text-teal-300" />
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-teal-300">Raido Bot Dashboard</p>
                </div>
                <p className="text-[10px] sm:text-xs text-teal-300/80 mb-4">The Raido Bot runs 24/7 across all your selected asset classes. It monitors price action, identifies MBLB/50 bounce setups, and executes trades automatically with 1% risk per trade.</p>
              </div>

              <RaidoBotLiveStatus />

              <div className="rounded-lg sm:rounded-xl border border-teal-300/20 bg-teal-500/8 p-3 sm:p-4 space-y-3">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-teal-300">Bot Features</p>
                <div className="space-y-2 text-[10px] sm:text-xs leading-relaxed text-slate-300/90">
                  <div className="flex gap-2 items-start">
                    <span className="text-teal-400 font-bold shrink-0">→</span>
                    <p>Automated MBLB/50 bounce detection across all 26 symbols</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-teal-400 font-bold shrink-0">→</span>
                    <p>1% risk per trade with intelligent position sizing</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-teal-400 font-bold shrink-0">→</span>
                    <p>5-8x target exits automatically captured</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-teal-400 font-bold shrink-0">→</span>
                    <p>Works while you sleep — market execution 24/7</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-teal-400 font-bold shrink-0">→</span>
                    <p>Live performance tracking and compounding rewards</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BUY $ABRA - PROMINENT BOTTOM CTA */}
        <div className="border-t border-teal-300/20 pt-5 sm:pt-6 text-center space-y-3 sm:space-y-4">
          <p className="text-[9px] sm:text-xs font-mono text-teal-300/80 uppercase tracking-widest">&gt; [RAIDO_BOT] AUTOMATE_YOUR_TRADING</p>
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/25 px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_16px_rgba(251,146,60,0.25)] transition hover:shadow-[0_0_24px_rgba(251,146,60,0.4)] hover:border-amber-300/80 w-full"
          >
            <Zap size={16} className="text-orange-400 shrink-0" />
            <span>Buy $ABRA & Activate Raido Bot</span>
            <ArrowRight size={14} className="hidden sm:inline" />
          </a>
          <p className="text-[10px] sm:text-xs text-slate-400/70 italic leading-relaxed">
            Raido powers your trading 24/7. The day trading strategy that's beaten 85-90% of market participants. Join the species evolution.
          </p>
        </div>
      </div>
    </div>
  );
}
