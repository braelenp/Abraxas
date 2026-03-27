import { useMemo, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { OrionAssistant } from '../components/OrionAssistant';
import { useAbraxas } from '../providers/AbraxasProvider';
import { RuneRealm } from '../components/RuneRealm';

const OYM_APP_DEFAULT_URL = 'https://own-your-moment.vercel.app/app';

const RUNE_CONFIG = {
  rune: 'ᛏ',
  runeName: 'Tiwaz',
  runeEssence: 'Tyr · Wise Kingship',
  agentName: 'KING',
  lore: "Tiwaz is the spear of Tyr, sacrificial wisdom that upholds cosmic law. King AI renders sovereign judgment on athlete development metrics, market trajectory, and value creation opportunities. The forecast is law.",
  ctaLabel: 'Consult King AI',
  coreGlow: '239, 68, 68',
  fireGlow: '234, 88, 12',
  accentClass: 'text-red-300',
} as const;

export function OrionPage() {
  const { athleteTokens, executeKingPlan } = useAbraxas();
  const [showOymExample, setShowOymExample] = useState(false);
  const oymAppUrl = import.meta.env.VITE_OYM_APP_URL?.trim() || OYM_APP_DEFAULT_URL;

  const totals = useMemo(() => {
    const totalNIL = athleteTokens.reduce((sum, token) => sum + token.nilRewards, 0);
    const averageTraining = athleteTokens.reduce((sum, token) => sum + token.trainingScore, 0) / athleteTokens.length;
    return { totalNIL, averageTraining };
  }, [athleteTokens]);

  return (
    <RuneRealm {...RUNE_CONFIG}>
    <section className="space-y-4">
      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.9),rgba(22,78,99,0.75),rgba(56,189,248,0.12))] p-4 backdrop-blur space-y-4">
        <div className="font-mono">
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">&gt; [KING_AI] ATHLETE_ANALYTICS</p>
          <h2 className="mt-2 text-sm font-bold text-cyan-200 tracking-widest uppercase">VALUE_CREATION | NIL_OPTIMIZATION</h2>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-300/90">
            King AI turns athlete development into the first live Abraxas growth loop: training inputs, stat improvements, and NIL outputs feed directly into token value expansion.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-slate-200/90">
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 px-3 py-3">
            <p className="text-slate-500">Average training score</p>
            <p className="mt-1 text-lg font-semibold">{totals.averageTraining.toFixed(1)}</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 px-3 py-3">
            <p className="text-slate-500">NIL rewards tracked</p>
            <p className="mt-1 text-lg font-semibold">${totals.totalNIL.toLocaleString()}</p>
          </div>
        </div>

        <button
          onClick={() => setShowOymExample(!showOymExample)}
          className={`ui-action w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all font-semibold ${
            showOymExample
              ? 'border-cyan-300/70 bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 shadow-lg shadow-cyan-500/20'
              : 'border-cyan-300/60 hover:border-cyan-300/80 bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 hover:from-cyan-500/30 hover:to-cyan-400/20 hover:shadow-lg hover:shadow-cyan-500/20'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-300 shrink-0" />
            <span className="text-sm text-cyan-50">View OYM Value Creation dApp</span>
          </div>
          <ChevronDown size={18} className={`text-cyan-300 transition-transform shrink-0 ${showOymExample ? 'rotate-180' : ''}`} />
        </button>

        {showOymExample && (
          <div className="rounded-lg border border-cyan-300/20 overflow-hidden bg-black w-full animate-in fade-in duration-300" style={{ height: '600px' }}>
            <iframe
              src={oymAppUrl}
              title="OYM - Own Your Moment dApp"
              className="w-full h-full border-0"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        )}
      </article>

      <article className="space-y-3">
        {athleteTokens.map((token) => (
          <div key={token.id} className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-slate-100">{token.symbol}</p>
                <p className="mt-1 text-xs text-slate-400/80">{token.name}</p>
              </div>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-100">
                {token.kingSignal}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 text-[11px] text-slate-300/85">
              <div className="rounded-xl border border-cyan-300/15 bg-slate-950/55 px-2 py-2">
                <p className="text-slate-500">Price</p>
                <p className="mt-1 font-semibold text-slate-100">${token.price.toFixed(2)}</p>
              </div>
              <div className="rounded-xl border border-cyan-300/15 bg-slate-950/55 px-2 py-2">
                <p className="text-slate-500">Stats</p>
                <p className="mt-1 font-semibold text-slate-100">{token.statsIndex}</p>
              </div>
              <div className="rounded-xl border border-cyan-300/15 bg-slate-950/55 px-2 py-2">
                <p className="text-slate-500">Streak</p>
                <p className="mt-1 font-semibold text-slate-100">{token.streak} days</p>
              </div>
              <div className="rounded-xl border border-cyan-300/15 bg-slate-950/55 px-2 py-2">
                <p className="text-slate-500">Growth</p>
                <p className="mt-1 font-semibold text-slate-100">{token.valueGrowthPct.toFixed(1)}%</p>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {token.suggestions.map((suggestion) => (
                <div key={suggestion.id} className="rounded-xl border border-cyan-300/20 bg-slate-950/45 px-3 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-100">{suggestion.title}</p>
                    <span className="text-[11px] font-semibold text-cyan-200">+{suggestion.expectedImpactBps} bps</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300/80">{suggestion.rationale}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => executeKingPlan(token.id)}
              className="ui-action mt-4 w-full rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-200 via-cyan-200 to-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950"
            >
              Execute King Development Plan
            </button>
          </div>
        ))}
      </article>

      <p className="text-xs text-slate-300/80">Saved chats stay on this device so you can return to previous King AI conversations.</p>
      <OrionAssistant embedded />
    </section>
    </RuneRealm>
  );
}
