// --- RWA Prediction Market Types ---
type PredictionMarket = {
  id: string;
  question: string;
  category: 'athlete' | 'real_estate' | 'other';
  status: 'open' | 'closed' | 'settled';
  outcomes: string[];
  totalYes: number;
  totalNo: number;
  userBet?: 'yes' | 'no';
  kingProbability: number; // 0-100
  circuitFlag?: 'warning' | 'critical';
  streak?: number;
  multiplier?: number;
  challenge?: string;
  reward?: string;
};

const initialPredictionMarkets: PredictionMarket[] = [
  {
    id: 'pred-1',
    question: 'Will Caleb score >25 next game?',
    category: 'athlete',
    status: 'open',
    outcomes: ['Yes', 'No'],
    totalYes: 1200,
    totalNo: 800,
    kingProbability: 68,
    circuitFlag: undefined,
    streak: 2,
    multiplier: 1.2,
    challenge: 'Daily Streak: 2+',
    reward: '25 ABRA + La Casa NFT fragment',
  },
  {
    id: 'pred-2',
    question: 'Will La Casa REIT yield >7% this quarter?',
    category: 'real_estate',
    status: 'open',
    outcomes: ['Yes', 'No'],
    totalYes: 900,
    totalNo: 1100,
    kingProbability: 41,
    circuitFlag: 'warning',
    streak: 0,
    multiplier: 1.0,
    challenge: 'First bet bonus',
    reward: '10 ABRA',
  },
];
// --- RWA Predictions Section ---
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
function RwaPredictions() {
  const { publicKey } = useWallet();
  const [markets, setMarkets] = useState<PredictionMarket[]>(initialPredictionMarkets);
  const [betting, setBetting] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>('');
  const [betOutcome, setBetOutcome] = useState<'yes' | 'no' | null>(null);
  const [betSuccess, setBetSuccess] = useState(false);

  // Simulate King AI suggestion
  function getKingSuggestion(market: PredictionMarket) {
    if (market.kingProbability > 60) return 'King AI: High probability for YES';
    if (market.kingProbability < 40) return 'King AI: High probability for NO';
    return 'King AI: Market is balanced, use your edge!';
  }

  // Simulate circuit flag
  function getCircuitFlag(flag?: 'warning' | 'critical') {
    if (flag === 'critical') return <span className="text-rose-400 font-bold ml-2">Circuit: High Risk</span>;
    if (flag === 'warning') return <span className="text-amber-300 font-bold ml-2">Circuit: Warning</span>;
    return null;
  }

  // Simulate bet placement
  function placeBet(marketId: string, outcome: 'yes' | 'no') {
    if (!betAmount || isNaN(Number(betAmount)) || Number(betAmount) <= 0) return;
    setMarkets((prev) => prev.map((m) =>
      m.id === marketId
        ? {
            ...m,
            userBet: outcome,
            totalYes: outcome === 'yes' ? m.totalYes + Number(betAmount) : m.totalYes,
            totalNo: outcome === 'no' ? m.totalNo + Number(betAmount) : m.totalNo,
          }
        : m
    ));
    setBetting(null);
    setBetSuccess(true);
    setTimeout(() => setBetSuccess(false), 2000);
    setBetAmount('');
    setBetOutcome(null);
  }

  return (
    <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/80 p-4 backdrop-blur mt-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="text-cyan-200" size={16} />
        <h3 className="text-lg font-semibold text-cyan-100">RWA Predictions</h3>
        <span className="ml-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-200 font-semibold">New</span>
      </div>
      <p className="text-xs text-slate-300/80 mb-4">Predict real-world asset outcomes. Bet ABRA, win rewards, and climb the leaderboard. Powered by Bags for ~0% fee settlement. King AI provides smart probability estimates. Circuit flags high-risk markets. Top predictors earn ABRA and La Casa NFT fragments.</p>
      <div className="space-y-4">
        {markets.map((market) => (
          <div key={market.id} className="rounded-xl border border-cyan-300/15 bg-slate-950/60 p-4 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Dumbbell size={14} className="text-cyan-300" />
              <span className="font-semibold text-slate-100 text-sm">{market.question}</span>
              {getCircuitFlag(market.circuitFlag)}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-cyan-200">King AI Probability: <span className="font-bold">{market.kingProbability}%</span></span>
              <span className="text-xs text-violet-200">{getKingSuggestion(market)}</span>
              {market.streak ? <span className="text-xs text-emerald-300 ml-2">Streak: {market.streak}x</span> : null}
              {market.multiplier && market.multiplier > 1 ? <span className="text-xs text-amber-200 ml-2">Multiplier: {market.multiplier}x</span> : null}
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-cyan-100">Yes: <span className="font-bold">{market.totalYes}</span></span>
              <span className="text-xs text-rose-200">No: <span className="font-bold">{market.totalNo}</span></span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-200 font-semibold">{market.reward}</span>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-200 font-semibold">{market.challenge}</span>
            </div>
            {market.status === 'open' && !market.userBet && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="number"
                  min="1"
                  placeholder="Bet ABRA amount"
                  value={betting === market.id ? betAmount : ''}
                  onChange={(e) => { setBetting(market.id); setBetAmount(e.target.value); }}
                  className="px-3 py-2 rounded-lg bg-slate-800/60 border border-cyan-400/20 text-white text-xs focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none w-32"
                />
                <button
                  className="px-4 py-2 rounded-lg bg-cyan-500/80 text-white font-semibold text-xs hover:bg-cyan-600/90 transition"
                  onClick={() => { setBetting(market.id); setBetOutcome('yes'); placeBet(market.id, 'yes'); }}
                  disabled={!betAmount || Number(betAmount) <= 0}
                >Bet Yes</button>
                <button
                  className="px-4 py-2 rounded-lg bg-rose-500/80 text-white font-semibold text-xs hover:bg-rose-600/90 transition"
                  onClick={() => { setBetting(market.id); setBetOutcome('no'); placeBet(market.id, 'no'); }}
                  disabled={!betAmount || Number(betAmount) <= 0}
                >Bet No</button>
              </div>
            )}
            {market.userBet && (
              <div className="mt-2 text-xs text-emerald-300 font-semibold">Your bet: {market.userBet.toUpperCase()}</div>
            )}
          </div>
        ))}
      </div>
      {betSuccess && <div className="mt-3 text-center text-emerald-300 font-bold">Bet placed! Good luck!</div>}
      <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs text-cyan-200">
        <span className="font-semibold">Leaderboard, daily challenges, and NFT rewards coming soon.</span>
      </div>
    </article>
  );
}
import { useMemo, useState } from 'react';
import { ArrowUpRight, Banknote, Brain, Building2, Dumbbell, ExternalLink, Lightbulb, Sparkles, Zap } from 'lucide-react';
import { useAbraxas } from '../providers/AbraxasProvider';

type MarketClass = 'athlete_equity' | 'real_estate' | 'trading_portfolio' | 'music_rights' | 'ip_licensing';

type MarketListing = {
  id: string;
  symbol: string;
  name: string;
  marketClass: MarketClass;
  status: 'live' | 'pilot' | 'hypothetical';
  price: number;
  changePct: number;
  marketCap: number;
  floatPct: number;
  dailyVolume: number;
  score: number;
  thesis: string;
};

const marketClassLabels: Record<MarketClass, string> = {
  athlete_equity: 'Athlete Equity',
  real_estate: 'Real Estate',
  trading_portfolio: 'Trading Portfolio',
  music_rights: 'Music Rights',
  ip_licensing: 'IP Licensing',
};

const OYM_APP_DEFAULT_URL = 'https://own-your-moment.vercel.app/app';

const listedAssets: MarketListing[] = [
  {
    id: 'mk-cdubb',
    symbol: '$CDUBB',
    name: 'C Dubb Performance Index',
    marketClass: 'athlete_equity',
    status: 'live',
    price: 18.92,
    changePct: 3.8,
    marketCap: 1240000,
    floatPct: 34,
    dailyVolume: 218400,
    score: 92,
    thesis: 'High conversion of training load into game carryover and sponsor engagement.',
  },
  {
    id: 'mk-ajwill',
    symbol: '$AJWILL',
    name: 'AJ Will Development Basket',
    marketClass: 'athlete_equity',
    status: 'live',
    price: 15.31,
    changePct: 1.9,
    marketCap: 1025000,
    floatPct: 41,
    dailyVolume: 166000,
    score: 86,
    thesis: 'Strong week-over-week stat consistency with room for upside on efficiency bands.',
  },
  {
    id: 'mk-hailee',
    symbol: '$HAILEE',
    name: 'Hailee Guard Alpha',
    marketClass: 'athlete_equity',
    status: 'live',
    price: 12.56,
    changePct: 5.4,
    marketCap: 890000,
    floatPct: 28,
    dailyVolume: 149200,
    score: 94,
    thesis: 'Assist and decision-speed profile supports compounding value under low volatility.',
  },
  {
    id: 'mk-lacasa-reit',
    symbol: '$LC-REIT',
    name: 'La Casa Urban Rehab Trust',
    marketClass: 'real_estate',
    status: 'pilot',
    price: 9.84,
    changePct: 0.7,
    marketCap: 2650000,
    floatPct: 52,
    dailyVolume: 90800,
    score: 79,
    thesis: 'Stable occupancy and staged renovation execution with conservative payout assumptions.',
  },
  {
    id: 'mk-sunbelt-housing',
    symbol: '$SB-HOME',
    name: 'Sunbelt Workforce Housing Pool',
    marketClass: 'real_estate',
    status: 'pilot',
    price: 10.12,
    changePct: 1.4,
    marketCap: 1980000,
    floatPct: 49,
    dailyVolume: 112300,
    score: 81,
    thesis: 'Affordable housing demand and disciplined capex pacing support resilient rent cash flow.',
  },
  {
    id: 'mk-campus-rev',
    symbol: '$CAMPUS',
    name: 'Campus Renewal Income Trust',
    marketClass: 'real_estate',
    status: 'hypothetical',
    price: 8.74,
    changePct: 0,
    marketCap: 1540000,
    floatPct: 37,
    dailyVolume: 0,
    score: 72,
    thesis: 'Semester-driven occupancy and utility-indexed contracts offer predictable income modeling.',
  },
  {
    id: 'mk-orion-quant',
    symbol: '$ORQ',
    name: 'Orion Quant Sleeve',
    marketClass: 'trading_portfolio',
    status: 'pilot',
    price: 21.18,
    changePct: -0.9,
    marketCap: 1740000,
    floatPct: 47,
    dailyVolume: 134100,
    score: 74,
    thesis: 'Diversified strategy sleeve with tighter downside controls than broad-beta alternatives.',
  },
  {
    id: 'mk-sigma-carry',
    symbol: '$SGC',
    name: 'Sigma Carry Program',
    marketClass: 'trading_portfolio',
    status: 'pilot',
    price: 19.44,
    changePct: 0.6,
    marketCap: 1380000,
    floatPct: 44,
    dailyVolume: 103200,
    score: 77,
    thesis: 'Carry-focused sleeve with tighter VaR guardrails and explicit overnight risk constraints.',
  },
  {
    id: 'mk-balance-alpha',
    symbol: '$BAL-A',
    name: 'Balanced Alpha Rotation',
    marketClass: 'trading_portfolio',
    status: 'hypothetical',
    price: 17.02,
    changePct: 0,
    marketCap: 1210000,
    floatPct: 39,
    dailyVolume: 0,
    score: 71,
    thesis: 'Regime-aware trend and mean-reversion blend designed to reduce single-factor dependency.',
  },
  {
    id: 'mk-hyp-sound',
    symbol: '$WAVE',
    name: 'Independent Catalog Wave',
    marketClass: 'music_rights',
    status: 'hypothetical',
    price: 7.42,
    changePct: 0,
    marketCap: 610000,
    floatPct: 18,
    dailyVolume: 0,
    score: 67,
    thesis: 'Royalty stream tokenization candidate tied to verified platform distribution metrics.',
  },
  {
    id: 'mk-soul-label',
    symbol: '$SOUL',
    name: 'Soul Label Revenue Stack',
    marketClass: 'music_rights',
    status: 'hypothetical',
    price: 6.95,
    changePct: 0,
    marketCap: 520000,
    floatPct: 20,
    dailyVolume: 0,
    score: 63,
    thesis: 'Emerging label royalty share model with track-level listen verification and payout checkpoints.',
  },
  {
    id: 'mk-anthem-reissue',
    symbol: '$ANTM',
    name: 'Anthem Masters Reissue Fund',
    marketClass: 'music_rights',
    status: 'hypothetical',
    price: 8.11,
    changePct: 0,
    marketCap: 730000,
    floatPct: 24,
    dailyVolume: 0,
    score: 68,
    thesis: 'Catalog reissue strategy where sync placements and anniversary campaigns drive royalty growth.',
  },
  {
    id: 'mk-hyp-ip',
    symbol: '$IPX',
    name: 'Creator Licensing Index',
    marketClass: 'ip_licensing',
    status: 'hypothetical',
    price: 6.88,
    changePct: 0,
    marketCap: 540000,
    floatPct: 22,
    dailyVolume: 0,
    score: 64,
    thesis: 'Potential listing path for recurring license contracts with transparent usage audits.',
  },
  {
    id: 'mk-archive-sports',
    symbol: '$ARCH',
    name: 'Archive Sports Rights Index',
    marketClass: 'ip_licensing',
    status: 'hypothetical',
    price: 7.24,
    changePct: 0,
    marketCap: 590000,
    floatPct: 21,
    dailyVolume: 0,
    score: 65,
    thesis: 'Licensing exposure to historical sports clips with audited media usage and contract renewal ladders.',
  },
  {
    id: 'mk-character-grid',
    symbol: '$CHAR',
    name: 'Character Licensing Grid',
    marketClass: 'ip_licensing',
    status: 'hypothetical',
    price: 6.41,
    changePct: 0,
    marketCap: 505000,
    floatPct: 19,
    dailyVolume: 0,
    score: 62,
    thesis: 'Cross-platform character IP model where retention and conversion metrics influence pricing bands.',
  },
];

const hypothesisExamples = [
  {
    title: 'Neighborhood Renovation Bond',
    classLabel: 'Real Estate',
    premise: 'Tokenized cash-flow exposure to staged rehab projects with monthly occupancy checkpoints.',
  },
  {
    title: 'Student Housing Yield Notes',
    classLabel: 'Real Estate',
    premise: 'Portfolio of accredited student units with semester-based occupancy and maintenance covenants.',
  },
  {
    title: 'Hospitality Turnaround Trust',
    classLabel: 'Real Estate',
    premise: 'Performance-linked exposure to boutique hotel upgrades with transparent ADR and utilization metrics.',
  },
  {
    title: 'Delta-Neutral Carry Sleeve',
    classLabel: 'Trading Portfolio',
    premise: 'Risk-bounded carry strategy with daily volatility ceilings and transparent drawdown controls.',
  },
  {
    title: 'Macro Rotation Basket',
    classLabel: 'Trading Portfolio',
    premise: 'Systematic allocation between trend and mean-reversion factors with strict stop-loss governance.',
  },
  {
    title: 'Options Income Vault',
    classLabel: 'Trading Portfolio',
    premise: 'Covered-call and protective-put structure optimized for yield consistency over directional upside.',
  },
  {
    title: 'Independent Catalog Wave',
    classLabel: 'Music Rights',
    premise: 'Streaming royalty basket anchored to third-party verifiable listen and payout telemetry.',
  },
  {
    title: 'Regional Label Revenue Pool',
    classLabel: 'Music Rights',
    premise: 'Revenue-share listing for emerging labels with transparent track-level and territory-level accounting.',
  },
  {
    title: 'Legacy Masters Reissue Fund',
    classLabel: 'Music Rights',
    premise: 'Catalog reissue strategy tied to anniversary campaigns, sync deals, and licensing reactivation.',
  },
  {
    title: 'Media Licensing Rollup',
    classLabel: 'IP Licensing',
    premise: 'Contract-backed creator IP bundle with verifiable usage telemetry and payout rails.',
  },
  {
    title: 'Sports Archive Rights Index',
    classLabel: 'IP Licensing',
    premise: 'Licensing exposure to archival sports media clips with usage audits and recurring contract checks.',
  },
  {
    title: 'Digital Character Licensing Pool',
    classLabel: 'IP Licensing',
    premise: 'Multi-platform character IP licensing basket with renewals scored by audience retention and conversion.',
  },
];


export function MarketPage() {
  const [selectedClass, setSelectedClass] = useState<MarketClass | 'all'>('all');
  const oymAppUrl = import.meta.env.VITE_OYM_APP_URL?.trim() || OYM_APP_DEFAULT_URL;

  const classes = useMemo(() => {
    const uniqueClasses = Array.from(new Set(listedAssets.map((asset) => asset.marketClass)));
    return ['all' as const, ...uniqueClasses];
  }, []);

  const filteredAssets = useMemo(() => {
    if (selectedClass === 'all') {
      return listedAssets;
    }
    return listedAssets.filter((asset) => asset.marketClass === selectedClass);
  }, [selectedClass]);

  return (
    <section className="space-y-4">
      {/* --- Polymarket-style RWA Prediction Market --- */}
      <RwaPredictions />

      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.88),rgba(10,37,64,0.76),rgba(56,189,248,0.15))] p-4 backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/85">Abraxas RWA Prediction Market</p>
        <h2 className="mt-2 text-xl font-semibold text-cyan-50">Predict Real-World Outcomes. Win Big. Go Viral.</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
          The world’s first viral, gamified RWA prediction market. Bet on athlete stats, real estate yields, and more—settled instantly with ABRA on Solana. Powered by Bags for ~0% fees, King AI for smart probabilities, and World Labs for next-gen rewards. Top predictors win ABRA, La Casa NFT fragments, and leaderboard glory. <span className="font-semibold text-cyan-200">Polymarket for the real world.</span>
        </p>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="text-sm font-medium">Asset Development Layer Demo (OYM)</p>
        <p className="mt-2 text-xs leading-relaxed text-slate-300/85">
          Link users from Abraxas Market directly into OYM so they can see how athlete development activity drives asset value in practice.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={oymAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-action inline-flex items-center gap-1 rounded-xl border border-cyan-200/55 bg-cyan-300/20 px-3 py-2 text-xs font-semibold text-cyan-50"
          >
            Open OYM dApp
            <ExternalLink size={13} />
          </a>
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="mb-3 flex flex-wrap gap-2">
          {classes.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setSelectedClass(entry)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition ${
                selectedClass === entry
                  ? 'border-cyan-200/65 bg-cyan-300/15 text-cyan-100'
                  : 'border-slate-500/45 bg-slate-950/45 text-slate-300 hover:border-slate-400/70 hover:text-slate-100'
              }`}
            >
              {entry === 'all' ? 'All Classes' : marketClassLabels[entry]}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-cyan-300/20 bg-slate-950/55">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-cyan-300/20 bg-slate-900/80 text-slate-300/90">
              <tr>
                <th className="px-3 py-2 font-medium">Asset</th>
                <th className="px-3 py-2 font-medium">Class</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Price</th>
                <th className="px-3 py-2 font-medium">24h</th>
                <th className="px-3 py-2 font-medium">Mkt Cap</th>
                <th className="px-3 py-2 font-medium">Float</th>
                <th className="px-3 py-2 font-medium">Volume</th>
                <th className="px-3 py-2 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-cyan-300/10 last:border-b-0">
                  <td className="px-3 py-2">
                    <p className="font-semibold text-slate-100">{asset.symbol}</p>
                    <p className="text-[11px] text-slate-400">{asset.name}</p>
                  </td>
                  <td className="px-3 py-2 text-slate-300">{marketClassLabels[asset.marketClass]}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      asset.status === 'live'
                        ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200'
                        : asset.status === 'pilot'
                        ? 'border-amber-300/40 bg-amber-300/10 text-amber-100'
                        : 'border-slate-400/40 bg-slate-400/10 text-slate-300'
                    }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-200">${asset.price.toFixed(2)}</td>
                  <td className={`px-3 py-2 font-semibold ${asset.changePct >= 0 ? 'text-cyan-200' : 'text-rose-300'}`}>
                    {asset.changePct >= 0 ? '+' : ''}
                    {asset.changePct.toFixed(1)}%
                  </td>
                  <td className="px-3 py-2 text-slate-300">${asset.marketCap.toLocaleString()}</td>
                  <td className="px-3 py-2 text-slate-300">{asset.floatPct}%</td>
                  <td className="px-3 py-2 text-slate-300">${asset.dailyVolume.toLocaleString()}</td>
                  <td className="px-3 py-2 text-slate-100">{asset.score}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Listing thesis cards</p>
        <div className="space-y-2">
          {filteredAssets.slice(0, 4).map((asset) => (
            <div key={asset.id} className="rounded-2xl border border-cyan-300/20 bg-slate-950/45 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-100">{asset.symbol} · {asset.name}</p>
                <span className="inline-flex items-center gap-1 text-[11px] text-cyan-200">
                  <ArrowUpRight size={12} />
                  {asset.score}/100
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300/85">{asset.thesis}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-amber-200" size={16} />
          <p className="text-sm font-medium">Hypothetical examples pipeline</p>
        </div>
        <div className="mt-3 grid gap-3">
          {hypothesisExamples.map((example) => (
            <div key={example.title} className="rounded-2xl border border-cyan-300/20 bg-slate-950/45 px-3 py-3">
              <p className="text-sm font-semibold text-slate-100">{example.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-cyan-200/90">{example.classLabel}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300/85">{example.premise}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Class Radar</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-200/90">
          <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-3">
            <Dumbbell size={14} className="text-cyan-200" />
            <p className="mt-2 font-semibold">Athlete Equity</p>
            <p className="mt-1 text-slate-400">Live and compounding through development signals.</p>
          </div>
          <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-3">
            <Building2 size={14} className="text-cyan-200" />
            <p className="mt-2 font-semibold">Real Estate</p>
            <p className="mt-1 text-slate-400">Pilot listings tied to occupancy and renovation milestones.</p>
          </div>
          <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-3">
            <Banknote size={14} className="text-cyan-200" />
            <p className="mt-2 font-semibold">Trading Portfolios</p>
            <p className="mt-1 text-slate-400">Risk-bounded sleeves with transparent drawdown profiles.</p>
          </div>
          <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-3">
            <Sparkles size={14} className="text-cyan-200" />
            <p className="mt-2 font-semibold">Experimental RWAs</p>
            <p className="mt-1 text-slate-400">Music rights and IP licensing as next hypothetical listings.</p>
          </div>
        </div>
      </article>

      <SophiaAgentsMarketplace />
      <RwaPredictions />
    </section>
  );
}

function SophiaAgentsMarketplace() {
  const { sophiaAgents } = useAbraxas();

  const sortedAgents = useMemo(() => {
    return [...sophiaAgents].sort((a, b) => b.performanceScore - a.performanceScore);
  }, [sophiaAgents]);

  return (
    <article className="glow-panel rounded-2xl border border-violet-300/20 bg-slate-900/75 p-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-2">
        <Brain size={16} className="text-violet-300" />
        <p className="text-sm font-medium text-violet-100">Sophia Agents Marketplace</p>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-slate-300/85">
        Autonomous trading agents with verifiable performance history. Each Sophia earns value through successful trades and can be assigned to vaults or minted as tokens.
      </p>

      <div className="space-y-2">
        <div className="overflow-x-auto rounded-lg border border-violet-300/20 bg-slate-950/55">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-violet-300/20 bg-slate-900/80 text-slate-300/90">
              <tr>
                <th className="px-3 py-2 font-medium">Agent</th>
                <th className="px-3 py-2 font-medium">Specialty</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium text-right">Score</th>
                <th className="px-3 py-2 font-medium text-right">Win Rate</th>
                <th className="px-3 py-2 font-medium text-right">Trades</th>
                <th className="px-3 py-2 font-medium text-right">Volume</th>
                <th className="px-3 py-2 font-medium text-right">Total PnL</th>
              </tr>
            </thead>
            <tbody>
              {sortedAgents.map((agent) => (
                <tr key={agent.id} className="border-b border-violet-300/10 last:border-b-0">
                  <td className="px-3 py-2">
                    <p className="font-semibold text-violet-100">{agent.name}</p>
                    <p className="text-[11px] text-slate-400">{agent.description}</p>
                  </td>
                  <td className="px-3 py-2 text-slate-300">{agent.specialty}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      agent.status === 'active'
                        ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200'
                        : agent.status === 'training'
                          ? 'border-amber-300/40 bg-amber-300/10 text-amber-100'
                          : 'border-slate-400/40 bg-slate-400/10 text-slate-300'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <span className="font-semibold text-violet-200">{agent.performanceScore}/100</span>
                  </td>
                  <td className="px-3 py-2 text-right text-cyan-200">{agent.winRate.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right text-slate-300">{agent.totalTradesExecuted}</td>
                  <td className="px-3 py-2 text-right text-slate-300">${(agent.totalVolumeTraded / 1000000).toFixed(2)}M</td>
                  <td className={`px-3 py-2 text-right font-semibold ${agent.totalPnL >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    ${(agent.totalPnL / 1000).toFixed(1)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 pt-3">
        {sortedAgents.slice(0, 3).map((agent) => (
          <div key={agent.id} className="rounded-2xl border border-violet-300/20 bg-slate-950/45 px-3 py-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="font-semibold text-violet-100">{agent.name}</p>
                <p className="mt-1 text-xs text-slate-400">{agent.tradingStyle}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="rounded-full border border-violet-300/30 bg-violet-300/10 px-2 py-0.5 text-[10px] text-violet-200">
                    {agent.personality}
                  </span>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-200">
                    {agent.riskTolerance} risk
                  </span>
                  {agent.sharpeRatio && (
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-[10px] text-emerald-200">
                      Sharpe: {agent.sharpeRatio.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-violet-300">{agent.performanceScore}</p>
                <p className="text-[10px] text-slate-400">score</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-violet-300/20 bg-violet-500/10 p-3 text-xs text-violet-200/80">
        <p className="font-semibold">Performance Tracking:</p>
        <p className="mt-1">Each agent's score updates dynamically based on trade execution, win rate, volume, and risk-adjusted returns (Sharpe ratio). Higher scores unlock access to larger vault allocations and tokenization opportunities.</p>
      </div>
    </article>
  );
}