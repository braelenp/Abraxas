import { useMemo } from 'react';
import { OrionAssistant } from '../components/OrionAssistant';
import { useAbraxas } from '../providers/AbraxasProvider';

export function OrionPage() {
  const { athleteTokens, executeKingPlan } = useAbraxas();

  const totals = useMemo(() => {
    const totalNIL = athleteTokens.reduce((sum, token) => sum + token.nilRewards, 0);
    const averageTraining = athleteTokens.reduce((sum, token) => sum + token.trainingScore, 0) / athleteTokens.length;
    return { totalNIL, averageTraining };
  }, [athleteTokens]);

  return (
    <section className="space-y-4">
      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.9),rgba(22,78,99,0.75),rgba(56,189,248,0.12))] p-4 backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-200/85">King AI Development Engine</p>
        <h2 className="mt-2 text-xl font-semibold text-cyan-50">Athlete equity analytics and value creation</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
          King AI turns athlete development into the first live Abraxas growth loop: training inputs, stat improvements, and NIL outputs feed directly into token value expansion.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-200/90">
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 px-3 py-3">
            <p className="text-slate-500">Average training score</p>
            <p className="mt-1 text-lg font-semibold">{totals.averageTraining.toFixed(1)}</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 px-3 py-3">
            <p className="text-slate-500">NIL rewards tracked</p>
            <p className="mt-1 text-lg font-semibold">${totals.totalNIL.toLocaleString()}</p>
          </div>
        </div>
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
  );
}
