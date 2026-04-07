import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Sparkles, Video, Zap, Lock, ArrowRight } from 'lucide-react';
import { OrionAssistant } from '../components/OrionAssistant';
import { useAbraxas } from '../providers/AbraxasProvider';
import { RuneRealm } from '../components/RuneRealm';
import { OracleInsights } from '../components/OracleInsights';

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
  { name: 'Abraxas', description: 'AI Guardian Protocol for RWAs', tvl: '$125.4M', yield: '24.1%', category: 'AI Agents' },
  { name: 'Orbis API', description: 'API & Agent Marketplace', tvl: '$22.3K', yield: '19.8%', category: 'Infrastructure' },
  { name: 'quAId', description: 'AI Sports Prediction Engine', tvl: '$2.85K', yield: '21.6%', category: 'Predictions' },
  { name: 'OCCUPY', description: 'Mars Community Token', tvl: '$2.38K', yield: '21.5%', category: 'Community' },
  { name: 'Cluck Norris', description: 'Gamified Crypto Education', tvl: '$32.13K', yield: '20.4%', category: 'Education' },
  { name: 'JackBuilds', description: 'AI-Powered Business Tools', tvl: '$22.62K', yield: '22.8%', category: 'AI Agents' },
  { name: 'LuckyFee AI', description: 'Decentralized Fee Sharing Pool', tvl: '$5.37K', yield: '18.7%', category: 'Fee Sharing' },
  { name: 'Rando', description: 'Randomized Rewards Distribution', tvl: '$6.36K', yield: '19.2%', category: 'Fee Sharing' },
  { name: 'Hive', description: 'Decentralized AI Job Marketplace', tvl: '$22.92K', yield: '23.2%', category: 'AI Workforce' },
  { name: 'Trenchy.fun', description: 'Community Solana Command Center', tvl: '$18.45K', yield: '19.8%', category: 'Social DeFi' },
];

export function OrionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { } = useAbraxas();

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

      {/* ORACLE INSIGHTS SECTION - New Interactive Module */}
      <OracleInsights />

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
