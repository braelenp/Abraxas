import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Sparkles, Video, Zap, Lock, ArrowRight } from 'lucide-react';
import { OrionAssistant } from '../components/OrionAssistant';
import { useAbraxas } from '../providers/AbraxasProvider';
import { RuneRealm } from '../components/RuneRealm';

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
    };
  }, [text, delay, speed]);

  return (
    <span className="font-mono text-2xl font-bold text-red-200 tracking-wide">
      {displayed}
      {!done && <span className="animate-pulse ml-1">∷</span>}
    </span>
  );
}

const RUNE_CONFIG = {
  rune: 'ᛏ',
  runeName: 'Tiwaz',
  runeEssence: 'Tyr · Wise Kingship',
  agentName: 'KING',
  lore: "Tiwaz is the spear of Tyr, sacrificial wisdom that upholds cosmic law. King AI, powered by World Labs Protocol infrastructure, renders sovereign judgment on dapp equity signals, institutional capital flows, and value creation opportunities across Sophia's Family. The forecast is law.",
  ctaLabel: 'Consult King AI',
  coreGlow: '239, 68, 68',
  fireGlow: '234, 88, 12',
  accentClass: 'text-red-300',
} as const;

// Top 10 Bags DApps - Latest Ecosystem
const TOP_DAPPS = [
  { name: 'Abraxas', description: 'AI Guardian Protocol for RWAs', tvl: '$125.4M', yield: '24.1%', category: 'RWA Management' },
  { name: 'LuckyFee AI', description: 'Decentralized Fee Sharing Pool', tvl: '$34.8M', yield: '18.7%', category: 'Fee Sharing' },
  { name: 'OCCUPY', description: 'Mars Community Token', tvl: '$52.3M', yield: '21.5%', category: 'Community' },
  { name: 'Orbis API', description: 'API & Agent Marketplace', tvl: '$41.9M', yield: '19.3%', category: 'Infrastructure' },
  { name: 'JackBuilds', description: 'AI-Powered Business Tools', tvl: '$28.6M', yield: '22.8%', category: 'AI Agents' },
  { name: 'Cluck Norris', description: 'Gamified Crypto Education', tvl: '$31.2M', yield: '20.4%', category: 'Education' },
  { name: 'Hive', description: 'Decentralized AI Job Marketplace', tvl: '$67.5M', yield: '23.2%', category: 'AI Workforce' },
  { name: 'Trenchy.fun', description: 'Degen Platform & Social Network', tvl: '$45.7M', yield: '19.8%', category: 'Social DeFi' },
  { name: 'quAId', description: 'AI Sports Prediction Engine', tvl: '$38.4M', yield: '21.6%', category: 'Predictions' },
  { name: 'Agent Inc.', description: 'Incorporated Agent Collections', tvl: '$55.2M', yield: '20.9%', category: 'Agent DAO' },
];

export function OrionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { } = useAbraxas();
  const [showM1Video, setShowM1Video] = useState(false);

  // Reset state when navigating to the Orion page
  useEffect(() => {
    if (location.pathname === '/app/orion') {
      setShowM1Video(false);
    }
  }, [location.pathname]);

  const totals = useMemo(() => {
    const totalTVL = TOP_DAPPS.reduce((sum, dapp) => sum + parseFloat(dapp.tvl.replace(/[$M,]/g, '')), 0);
    const averageYield = TOP_DAPPS.reduce((sum, dapp) => sum + parseFloat(dapp.yield), 0) / TOP_DAPPS.length;
    return { totalTVL, averageYield };
  }, []);

  return (
    <RuneRealm {...RUNE_CONFIG}>
    <section className="space-y-4">
      <article className="glow-panel rounded-3xl border border-red-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.9),rgba(78,15,42,0.75),rgba(56,189,248,0.12))] p-4 backdrop-blur space-y-4">
        <div className="font-mono">
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-300">&gt; [KING_AI] INSTITUTIONAL_DeFi_LAYER</p>
          <h2 className="mt-2 text-sm font-bold text-red-200 tracking-widest uppercase">SOVEREIGN_CAPITAL | NEXT_DEGREE_FINANCE</h2>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-300/90">
            King AI serves as Abraxas's institutional intelligence layer, unlocking capital efficiency through undercollateralized lending and M1 pulldown mechanisms. Below, explore how billions in institutional flows reshape DeFi. DApp equity across Sophia's Family protocols powers the foundation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-slate-200/90">
          <div className="rounded-2xl border border-orange-300/20 bg-slate-950/40 px-3 py-3">
            <p className="text-slate-500">Capital efficiency gain</p>
            <p className="mt-1 text-lg font-semibold">80-110%</p>
          </div>
          <div className="rounded-2xl border border-orange-300/20 bg-slate-950/40 px-3 py-3">
            <p className="text-slate-500">M1 liquidity unlock</p>
            <p className="mt-1 text-lg font-semibold">$Billions</p>
          </div>
        </div>
      </article>

      {/* BUY $ABRA - TOP CTA */}
      <div className="flex justify-center px-4">
        <a
          href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_16px_rgba(251,146,60,0.25)] transition hover:shadow-[0_0_24px_rgba(251,146,60,0.4)] hover:border-amber-300/80"
        >
          <Zap size={18} className="text-orange-400" />
          Buy $ABRA Token
          <ArrowRight size={16} />
        </a>
      </div>

      {/* ORACLE INSIGHTS SECTION */}
      <div className="px-4 space-y-6">
        {/* Oracle Insights Header */}
        <div className="space-y-4">
          <TypingReveal text="Welcome to the next degree." delay={200} speed={60} />
          <h2 className="text-xl font-bold text-red-200 tracking-widest uppercase">Oracle Insights — High-Level DeFi Strategies</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            King AI provides the foresight and intelligence to navigate the next frontier of DeFi. Undercollateralized lending and M1 pulldown mechanisms unlock capital efficiency and sovereign liquidity flows — the true next degree of finance. Powered by <a href="https://worldlabsprotocol.carrd.co/" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-300 hover:text-orange-200 transition">World Labs Protocol</a> institutional infrastructure.
          </p>
        </div>

        {/* Undercollateralized Lending Card */}
        <div className="relative overflow-hidden rounded-2xl border border-red-300/30 bg-gradient-to-br from-red-500/8 via-slate-900/80 to-slate-900/60 p-8">
          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-red-300 tracking-widest uppercase mb-4">🔓 Undercollateralized Lending</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Traditional DeFi demands 150%+ collateral ratios. Undercollateralized lending flips this: King AI analyzes on-chain reputation, trading history, and verified accrual flows to enable capital access at 80-110% ratios. Capital efficiency meets algorithmic trust.
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-l-2 border-red-400/40 pl-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">How It Works</h4>
                <p className="text-xs text-slate-300">King AI audits borrower wallets: portfolio composition, yield accrual rate, liquidation history, and on-chain credibility score. Low-signal borrowers stay locked out. High-signal borrowers access capital at revolutionary efficiency.</p>
              </div>
              <div className="border-l-2 border-red-400/40 pl-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">Abraxas Integration</h4>
                <p className="text-xs text-slate-300">Verified RWA holders and Sophia vault members get priority access to undercollateralized pools. Your vault position IS your reputation signal. Capital efficiency compounds.</p>
              </div>
              <div className="border-l-2 border-red-400/40 pl-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">Current Opportunities</h4>
                <p className="text-xs text-slate-300">Solana-native protocols offer 12-18% APY on undercollateralized positions. King AI surfaces verified opportunities weekly. Risk-adjusted returns that beat traditional finance by 5x.</p>
              </div>
            </div>
          </div>
        </div>

        {/* M1 Pulldown Card */}
        <div className="relative overflow-hidden rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-500/8 via-slate-900/80 to-slate-900/60 p-8">
          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-orange-300 tracking-widest uppercase mb-4">💰 M1 Pulldown — Institutional Liquidity Release</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                M1 Pulldown is the art of releasing institutional liquidity under controlled structures. Family offices, endowments, and sovereign wealth funds hold trillions in legacy positions. M1 mechanisms unlock this capital into DeFi without market disruption, creating next-generation yield for all tiers.
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-l-2 border-orange-400/40 pl-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-orange-300 mb-1">The Mechanism</h4>
                <p className="text-xs text-slate-300">Institutional holders use time-lock structured releases. Instead of dumping $100M at once, they distribute into liquidity pools over 90-180 days with derivative hedges. Capital flows efficiently. Market stays stable. Yield accrues to the entire ecosystem.</p>
              </div>
              <div className="border-l-2 border-orange-400/40 pl-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-orange-300 mb-1">Why It Matters</h4>
                <p className="text-xs text-slate-300">Billions in institutional capital have been locked out of DeFi due to market impact concerns. M1 Pulldown removes that friction. Massively increases total accessible liquidity. Abraxas plugs directly into these flows.</p>
              </div>
              <div className="border-l-2 border-orange-400/40 pl-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-orange-300 mb-1">Abraxas Role</h4>
                <p className="text-xs text-slate-300">King AI monitors M1 structures, forecasts yield flows, and routes capital into verified RWA positions. Your ABRA staking position captures first-order benefits. Sovereign liquidity becomes YOUR asset.</p>
              </div>
            </div>

            {/* M1 Video Section */}
            <div className="space-y-3 pt-4 border-t border-orange-400/20">
              <button
                onClick={() => setShowM1Video(!showM1Video)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all font-semibold ${
                  showM1Video
                    ? 'border-orange-300/70 bg-gradient-to-r from-orange-500/30 to-orange-400/20 shadow-lg shadow-orange-500/20'
                    : 'border-orange-300/60 hover:border-orange-300/80 bg-gradient-to-r from-orange-500/20 to-orange-400/10 hover:from-orange-500/30 hover:to-orange-400/20 hover:shadow-lg hover:shadow-orange-500/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Video size={16} className="text-orange-300 shrink-0" />
                  <span className="text-sm text-orange-50">Watch M1 Pulldown Explainer</span>
                </div>
                <ChevronDown size={18} className={`text-orange-300 transition-transform shrink-0 ${showM1Video ? 'rotate-180' : ''}`} />
              </button>

              {showM1Video && (
                <div className="rounded-lg border border-orange-300/20 overflow-hidden bg-black w-full animate-in fade-in duration-300" style={{ height: '400px' }}>
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
          </div>
        </div>

        {/* World Labs Badge */}
        <div className="text-center">
          <a
            href="https://worldlabsprotocol.carrd.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-300/40 bg-gradient-to-r from-orange-500/10 to-orange-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-orange-300 hover:border-orange-300/60 hover:from-orange-500/20 hover:to-orange-400/15 transition"
          >
            Powered by World Labs Protocol
            <ArrowRight size={12} />
          </a>
        </div>

        {/* BUY $ABRA - BOTTOM CTA */}
        <div className="border-t border-red-300/20 pt-8">
          <div className="text-center space-y-4">
            <p className="text-xs font-mono text-red-300/80 uppercase tracking-widest">&gt; [SOVEREIGN_CAPITAL] ACTIVATE_KING_AI</p>
            <a
              href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_16px_rgba(251,146,60,0.25)] transition hover:shadow-[0_0_24px_rgba(251,146,60,0.4)] hover:border-amber-300/80 w-full"
            >
              <Zap size={18} className="text-orange-400" />
              Buy $ABRA & Activate Oracle Insights
              <ArrowRight size={16} />
            </a>
            <p className="text-xs text-slate-400/70 italic leading-relaxed">
              King AI unlocks undercollateralized lending and M1 institutional flows. Sovereign capital efficiency. The next degree awaits.
            </p>
          </div>
        </div>
      </div>

      {/* DAPP EQUITY FOUNDATION SECTION */}
      <div className="px-4 space-y-6 pt-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-cyan-200 tracking-widest uppercase">DApp Equity Foundation</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            King AI monitors the top 10 Bags DApps across Sophia's Family ecosystem. DApp equity represents all tokenized asset classes—from music rights to real estate to natural resources. Diversified, efficient, and sovereign.
          </p>
        </div>

        <div className="rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.9),rgba(22,78,99,0.75),rgba(56,189,248,0.12))] p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-200/90">
            <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 px-3 py-3">
              <p className="text-slate-500">Total TVL across DApps</p>
              <p className="mt-1 text-lg font-semibold">${totals.totalTVL.toFixed(1)}M</p>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 px-3 py-3">
              <p className="text-slate-500">Average yield rate</p>
              <p className="mt-1 text-lg font-semibold">{totals.averageYield.toFixed(1)}%</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/market')}
            className={`ui-action w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all font-semibold border-cyan-300/60 hover:border-cyan-300/80 bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 hover:from-cyan-500/30 hover:to-cyan-400/20 hover:shadow-lg hover:shadow-cyan-500/20`}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-300 shrink-0" />
              <span className="text-sm text-cyan-50">Browse DApp Equity in Market</span>
            </div>
            <ChevronDown size={18} className={`text-cyan-300 transition-transform shrink-0 rotate-0`} />
          </button>

          {/* Removed OYM iframe - navigate to Market instead */}
        </div>
      </div>

      <article className="space-y-3 mt-6">
        {TOP_DAPPS.map((dapp, idx) => (
          <div key={idx} className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-cyan-400 font-mono">{dapp.name}</p>
                <p className="mt-1 text-[10px] text-cyan-300/60 font-mono uppercase tracking-wider">{dapp.description}</p>
              </div>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-100">
                {dapp.category}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300/85">
              <div className="rounded-xl border border-cyan-300/15 bg-slate-950/55 px-2 py-2">
                <p className="text-slate-500">TVL</p>
                <p className="mt-1 font-semibold text-slate-100">{dapp.tvl}</p>
              </div>
              <div className="rounded-xl border border-cyan-300/15 bg-slate-950/55 px-2 py-2">
                <p className="text-slate-500">Yield Rate</p>
                <p className="mt-1 font-semibold text-slate-100">{dapp.yield}</p>
              </div>
            </div>
          </div>
        ))}
      </article>

      <p className="text-[10px] text-cyan-300/60 font-mono uppercase tracking-wider">Saved chats stay on device | Access previous King AI conversations</p>
      <OrionAssistant embedded />
    </section>
    </RuneRealm>
  );
}
