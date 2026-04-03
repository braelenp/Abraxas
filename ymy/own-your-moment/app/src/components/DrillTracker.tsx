import { CheckCircle2, TimerReset, Zap } from "lucide-react";
import type { SwainDrill } from "../lib/swain";

type DrillTrackerProps = {
  drills: SwainDrill[];
  completedIds: string[];
  onComplete: (drill: SwainDrill) => void;
  disabled?: boolean;
};

export default function DrillTracker({ drills, completedIds, onComplete, disabled = false }: DrillTrackerProps) {
  return (
    <section className="rounded-[32px] panel relative overflow-hidden p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-neon">Daily Swain Drills</p>
          <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.12em] text-white">
            On-Chain Progress Queue
          </h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/60">
          Devnet Simulation
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {drills.map((drill) => {
          const completed = completedIds.includes(drill.id);

          return (
            <article
              key={drill.id}
              className="rounded-[24px] border border-white/10 bg-black/30 p-5 transition hover:border-gold/40 hover:bg-black/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-gold">{drill.focus}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{drill.title}</h3>
                </div>
                {completed ? (
                  <span className="rounded-full bg-neon/15 p-2 text-neon">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-white/68">{drill.description}</p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-white/50">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                  <TimerReset className="h-3.5 w-3.5" />
                  {drill.durationMinutes} min
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                  <Zap className="h-3.5 w-3.5" />
                  +{drill.reward} SKR
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="max-w-[14rem] text-xs text-white/45">{drill.source}</p>
                <button
                  type="button"
                  onClick={() => onComplete(drill)}
                  disabled={disabled || completed}
                  className="rounded-full border border-gold/50 px-4 py-2 text-sm font-medium text-gold transition hover:bg-gold hover:text-black"
                >
                  {completed ? "Logged" : "Log Drill"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
