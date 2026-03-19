import { useMemo, useState } from 'react';
import { ArrowUpRight, Banknote, Building2, Dumbbell, ExternalLink, Lightbulb, Sparkles } from 'lucide-react';

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
      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.88),rgba(10,37,64,0.76),rgba(56,189,248,0.15))] p-4 backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/85">Market Data Book</p>
        <h2 className="mt-2 text-xl font-semibold text-cyan-50">Listed assets and hypothetical pipelines</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
          This section acts like a market intelligence sheet: active listings, pilot classes, and future hypothetical examples across RWA categories.
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
    </section>
  );
}