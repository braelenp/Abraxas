import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Sparkles, Video, Zap, Lock, ArrowRight } from 'lucide-react';
import { OrionAssistant } from '../components/OrionAssistant';
import { useAbraxas } from '../providers/AbraxasProvider';
import { RuneRealm } from '../components/RuneRealm';
import { OracleInsights } from '../components/OracleInsights';

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

      {/* ORCA UNCOLLATERALIZED LENDING SECTION */}
      <div className="px-4 space-y-6 pt-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-purple-200 tracking-widest uppercase">ORCA — Undercollateralized Lending Protocol</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            ORCA expands undercollateralized lending by default through diversified overcollateral asset classes. King AI audits portfolio composition, liquidation history, and on-chain credibility to unlock capital at 80-110% collateral ratios. No intermediary. Pure algorithmic trust.
          </p>
        </div>

        <div className="rounded-3xl border border-purple-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.9),rgba(78,15,42,0.75),rgba(56,189,248,0.08))] p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-200/90">
            <div className="rounded-2xl border border-purple-300/20 bg-slate-950/40 px-3 py-3">
              <p className="text-slate-500">Collateral efficiency</p>
              <p className="mt-1 text-lg font-semibold">80-110%</p>
            </div>
            <div className="rounded-2xl border border-purple-300/20 bg-slate-950/40 px-3 py-3">
              <p className="text-slate-500">Average lending APY</p>
              <p className="mt-1 text-lg font-semibold">14-18%</p>
            </div>
          </div>
        </div>
      </div>

      {/* OVERCOLLATERAL ASSET CLASSES - Hippo-Style Categorization */}
      <div className="px-4 space-y-6 pt-4">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-orange-200 tracking-widest uppercase">Overcollateral Asset Classes</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            Mirror Hippo dApps structure. Each asset class is categorized by type with tradeable market place and value stacking. King AI assigns collateral weights based on infrastructure maturity and liquidation probability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* RWA Infrastructure - Tradeable */}
          <div className="rounded-2xl border border-orange-300/25 bg-gradient-to-br from-orange-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-orange-300">RWA Infrastructure</p>
            </div>
            <div className="space-y-2 text-xs text-slate-300/90">
              <p><span className="font-semibold text-orange-200">Real Estate Equity</span> — Tokenized property with deed vault</p>
              <p><span className="font-semibold text-orange-200">Commodity Futures</span> — Oil, metals, agricultural contracts</p>
              <p><span className="font-semibold text-orange-200">Invoice Receivables</span> — SMB AR financing on-chain</p>
              <p className="text-orange-300/60 font-mono">WEIGHT: 95% | Tradeable via Forge</p>
            </div>
          </div>

          {/* DApp Fee Revenue - Stacking */}
          <div className="rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">DApp Fee Revenue</p>
            </div>
            <div className="space-y-2 text-xs text-slate-300/90">
              <p><span className="font-semibold text-cyan-200">Sophia Treasury Streams</span> — Monthly fee accrual secured</p>
              <p><span className="font-semibold text-cyan-200">Cadabra KOL Royalties</span> — Creator marketplace yield</p>
              <p><span className="font-semibold text-cyan-200">Raido Trading Volume</span> — Taker fee distributions</p>
              <p className="text-cyan-300/60 font-mono">WEIGHT: 90% | Value stacking enabled</p>
            </div>
          </div>

          {/* SPL Token Holdings - Diversified */}
          <div className="rounded-2xl border border-emerald-300/25 bg-gradient-to-br from-emerald-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">SPL Token Holdings</p>
            </div>
            <div className="space-y-2 text-xs text-slate-300/90">
              <p><span className="font-semibold text-emerald-200">$ABRA Vault Shares</span> — RWA guardian protocol equity</p>
              <p><span className="font-semibold text-emerald-200">Ecosystem Token Portfolio</span> — Diversified blue-chip SPL</p>
              <p><span className="font-semibold text-emerald-200">Staking Rewards Accrual</span> — Validator APY captured</p>
              <p className="text-emerald-300/60 font-mono">WEIGHT: 85% | Market-priced daily</p>
            </div>
          </div>

          {/* On-Chain Reputation - Algorithmic */}
          <div className="rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-amber-300">On-Chain Reputation</p>
            </div>
            <div className="space-y-2 text-xs text-slate-300/90">
              <p><span className="font-semibold text-amber-200">Portfolio Win Rate</span> — 60%+ trading profitability</p>
              <p><span className="font-semibold text-amber-200">Liquidation History</span> — Zero on-chain margin calls</p>
              <p><span className="font-semibold text-amber-200">Transaction Volume</span> — {'>'}$1M monthly activity</p>
              <p className="text-amber-300/60 font-mono">MULT: 100% | King AI audited</p>
            </div>
          </div>
        </div>
      </div>

      {/* KING AI INTELLIGENT LAYER */}
      <div className="px-4 space-y-6 pt-4">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-red-200 tracking-widest uppercase">King AI — Intelligent Layer</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            King AI serves as the institutional decision engine, continuously monitoring borrower credibility across all four asset classes. Algorithmic trust replaces intermediaries. Capital flows to signal.
          </p>
        </div>

        <div className="rounded-3xl border border-red-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.9),rgba(78,15,42,0.75))] p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Collaboration 1 */}
            <div className="rounded-lg border border-red-300/20 bg-red-500/8 p-3 space-y-2">
              <p className="text-xs font-bold uppercase text-red-300">King AI Assistant Collaboration</p>
              <p className="text-xs leading-relaxed text-slate-300/90">
                Real-time portfolio analysis and personalized lending recommendations. King AI surfaces opportunities aligned with risk tolerance and capital needs.
              </p>
            </div>

            {/* Collaboration 2 */}
            <div className="rounded-lg border border-red-300/20 bg-red-500/8 p-3 space-y-2">
              <p className="text-xs font-bold uppercase text-red-300">Abraxas Institution Access</p>
              <p className="text-xs leading-relaxed text-slate-300/90">
                $ABRA holders and RWA vault members get institutional-grade capital access. Priority queuing and dedicated pool allocation.
              </p>
            </div>
          </div>

          {/* Intelligence Matrix */}
          <div className="border-t border-red-300/15 pt-4 space-y-2">
            <p className="text-xs font-bold uppercase text-red-300/70">King AI Scoring Matrix</p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-red-300/15">
                <p className="text-red-300/70">Portfolio Risk</p>
                <p className="font-semibold text-red-200 mt-1">15%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-red-300/15">
                <p className="text-red-300/70">Liquidation Prob</p>
                <p className="font-semibold text-red-200 mt-1">3%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-red-300/15">
                <p className="text-red-300/70">Capital Efficiency</p>
                <p className="font-semibold text-red-200 mt-1">92%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-red-300/15">
                <p className="text-red-300/70">Reputation Tier</p>
                <p className="font-semibold text-red-200 mt-1">Elite</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOPHIA'S DAUGHTERS - ASSET CLASS MARKET SUMMARIES */}
      <div className="px-4 space-y-6 pt-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-orange-200 tracking-widest uppercase">Sophia's Daughters — Asset Class Metrics</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            Each Daughter specializes in a specific RWA asset class. King AI monitors estimated market caps, tokenized supply, and capital efficiency across all classes. Diversified sovereign ownership at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Echo - Music Rights */}
          <div className="rounded-xl border border-orange-300/25 bg-gradient-to-br from-orange-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📻</span>
              <div>
                <p className="text-sm font-bold text-orange-200">Echo</p>
                <p className="text-xs text-orange-300/60">Music Rights & Media</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-orange-300/15">
                <p className="text-orange-300/70">Est. Market Cap</p>
                <p className="font-semibold text-orange-200 mt-1">$42.3M</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-orange-300/15">
                <p className="text-orange-300/70">Tokenized</p>
                <p className="font-semibold text-orange-200 mt-1">18.7%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-orange-300/15">
                <p className="text-orange-300/70">Active Artists</p>
                <p className="font-semibold text-orange-200 mt-1">2,847</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-orange-300/15">
                <p className="text-orange-300/70">Avg APY</p>
                <p className="font-semibold text-orange-200 mt-1">16.2%</p>
              </div>
            </div>
          </div>

          {/* Pulse - Gaming */}
          <div className="rounded-xl border border-cyan-300/25 bg-gradient-to-br from-cyan-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-sm font-bold text-cyan-200">Pulse</p>
                <p className="text-xs text-cyan-300/60">Gaming & Live Streams</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-cyan-300/15">
                <p className="text-cyan-300/70">Est. Market Cap</p>
                <p className="font-semibold text-cyan-200 mt-1">$28.9M</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-cyan-300/15">
                <p className="text-cyan-300/70">Tokenized</p>
                <p className="font-semibold text-cyan-200 mt-1">22.1%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-cyan-300/15">
                <p className="text-cyan-300/70">Active Creators</p>
                <p className="font-semibold text-cyan-200 mt-1">1,563</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-cyan-300/15">
                <p className="text-cyan-300/70">Avg APY</p>
                <p className="font-semibold text-cyan-200 mt-1">18.5%</p>
              </div>
            </div>
          </div>

          {/* Aurelia - Real Estate */}
          <div className="rounded-xl border border-amber-300/25 bg-gradient-to-br from-amber-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🏛️</span>
              <div>
                <p className="text-sm font-bold text-amber-200">Aurelia</p>
                <p className="text-xs text-amber-300/60">Real Estate & Development</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-amber-300/15">
                <p className="text-amber-300/70">Est. Market Cap</p>
                <p className="font-semibold text-amber-200 mt-1">$156.4M</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-amber-300/15">
                <p className="text-amber-300/70">Tokenized</p>
                <p className="font-semibold text-amber-200 mt-1">12.3%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-amber-300/15">
                <p className="text-amber-300/70">Properties Vaulted</p>
                <p className="font-semibold text-amber-200 mt-1">487</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-amber-300/15">
                <p className="text-amber-300/70">Avg APY</p>
                <p className="font-semibold text-amber-200 mt-1">14.8%</p>
              </div>
            </div>
          </div>

          {/* Vein - Minerals & Commodities */}
          <div className="rounded-xl border border-emerald-300/25 bg-gradient-to-br from-emerald-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⛏️</span>
              <div>
                <p className="text-sm font-bold text-emerald-200">Vein</p>
                <p className="text-xs text-emerald-300/60">Minerals & Natural Resources</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-emerald-300/15">
                <p className="text-emerald-300/70">Est. Market Cap</p>
                <p className="font-semibold text-emerald-200 mt-1">$89.2M</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-emerald-300/15">
                <p className="text-emerald-300/70">Tokenized</p>
                <p className="font-semibold text-emerald-200 mt-1">8.9%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-emerald-300/15">
                <p className="text-emerald-300/70">Active Mines</p>
                <p className="font-semibold text-emerald-200 mt-1">142</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-emerald-300/15">
                <p className="text-emerald-300/70">Avg APY</p>
                <p className="font-semibold text-emerald-200 mt-1">13.4%</p>
              </div>
            </div>
          </div>

          {/* Verdant - Carbon & Environmental */}
          <div className="rounded-xl border border-lime-300/25 bg-gradient-to-br from-lime-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🌿</span>
              <div>
                <p className="text-sm font-bold text-lime-200">Verdant</p>
                <p className="text-xs text-lime-300/60">Carbon & Environmental</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-lime-300/15">
                <p className="text-lime-300/70">Est. Market Cap</p>
                <p className="font-semibold text-lime-200 mt-1">$67.1M</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-lime-300/15">
                <p className="text-lime-300/70">Tokenized</p>
                <p className="font-semibold text-lime-200 mt-1">15.2%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-lime-300/15">
                <p className="text-lime-300/70">Carbon Credits</p>
                <p className="font-semibold text-lime-200 mt-1">3.2M tons</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-lime-300/15">
                <p className="text-lime-300/70">Avg APY</p>
                <p className="font-semibold text-lime-200 mt-1">15.9%</p>
              </div>
            </div>
          </div>

          {/* Nautica - Maritime & Luxury */}
          <div className="rounded-xl border border-blue-300/25 bg-gradient-to-br from-blue-500/10 to-slate-900/40 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⛵</span>
              <div>
                <p className="text-sm font-bold text-blue-200">Nautica</p>
                <p className="text-xs text-blue-300/60">Yachts & Luxury Maritime</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-blue-300/15">
                <p className="text-blue-300/70">Est. Market Cap</p>
                <p className="font-semibold text-blue-200 mt-1">$31.8M</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-blue-300/15">
                <p className="text-blue-300/70">Tokenized</p>
                <p className="font-semibold text-blue-200 mt-1">9.7%</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-blue-300/15">
                <p className="text-blue-300/70">Vessels Vaulted</p>
                <p className="font-semibold text-blue-200 mt-1">156</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 px-2 py-2 border border-blue-300/15">
                <p className="text-blue-300/70">Avg APY</p>
                <p className="font-semibold text-blue-200 mt-1">17.3%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-orange-300/60 font-mono uppercase tracking-widest">Total Sophia Family Est. Market Cap: $415.7M | Avg Tokenization: 14.5%</p>
        </div>
      </div>

      {/* KING AI - INSTITUTIONAL ADVISORY BOX */}
      <div className="px-4 space-y-4 pt-4">
        <div className="rounded-2xl border border-red-300/20 bg-gradient-to-br from-red-500/8 to-slate-900/40 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest text-red-300">&gt; [KING_AI] INSTITUTIONAL_ADVISORY</p>
          </div>
          <p className="text-sm leading-relaxed text-slate-300/90">
            King AI continuously monitors Daughters' asset classes, capital flows, and lending opportunities. Ask about market conditions, ORCA opportunities, or capital efficiency optimization across all asset classes.
          </p>
        </div>
      </div>

      <OrionAssistant embedded />
    </section>
    </RuneRealm>
  );
}
