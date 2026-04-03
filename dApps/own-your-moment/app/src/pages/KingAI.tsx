import { Activity, ArrowUpRight, Bot, BrainCircuit, Sparkles } from "lucide-react";
import { programId } from "../lib/constants";
import { swainDrills } from "../lib/swain";

const recommendationMatrix = [
  {
    title: "Footwork Efficiency",
    insight: "Your recent drill mix favors finishing. Add more relocation reps to balance perimeter mechanics.",
    drill: swainDrills[1].title,
  },
  {
    title: "Burst Window",
    insight: "Streak consistency is strong enough to start layering reactive reads into your guard package.",
    drill: swainDrills[0].title,
  },
  {
    title: "Contact Finish Readiness",
    insight: "Attack volume is trending up. Keep rim-pressure sessions in the weekly cadence for recruiter visibility.",
    drill: swainDrills[2].title,
  },
];

const kingActionLog = [
  "Generated weekly progression snapshot for athlete profile PDA.",
  "Prepared recommended drill slate from Swain placeholder feed.",
  "Queued NIL badge checkpoint for next verified milestone.",
];

export default function KingAIPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="panel relative rounded-[32px] p-6 sm:p-8">
          <div className="flex items-center gap-3 text-neon">
            <Bot className="h-6 w-6" />
            <p className="text-xs uppercase tracking-[0.3em]">King AI Analytics</p>
          </div>

          <h2 className="mt-1.5 font-display text-sm font-semibold uppercase tracking-[0.1em] text-white/90 sm:text-base">
            Personalized recommendations shaped by your on-chain training data.
          </h2>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <p className="max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              Kingslee runs as a lightweight assistant for now: a rule-based layer that reads athlete profile stats, drill logs, and reward history before shaping the next Swain session.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Athlete Profile PDA</p>
              <p className="mt-2 break-all text-sm text-white/72">{programId.toBase58()}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Recommendation Mode</p>
              <p className="mt-2 text-sm text-white/72">Rule-based analytics, devnet-safe logging</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">Next Upgrade</p>
              <p className="mt-2 text-sm text-white/72">Recruiter-weighted summaries + team benchmarks</p>
            </div>
          </div>
          </div>
        </article>

        <article className="panel relative rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">King AI Action Log</p>
          <div className="mt-5 space-y-3">
            {kingActionLog.map((item) => (
              <div key={item} className="flex gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4">
                <span className="mt-0.5 rounded-full bg-neon/15 p-2 text-neon">
                  <Sparkles className="h-4 w-4" />
                </span>
                <p className="text-sm leading-6 text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="panel relative rounded-[32px] p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl border border-gold/40 bg-gold/10 p-3 text-gold">
              <BrainCircuit className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Recommendation Matrix</p>
              <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.1em] text-white">Today’s Focus</h3>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {recommendationMatrix.map((entry) => (
              <article key={entry.title} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-neon">{entry.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">{entry.insight}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </div>
                <p className="mt-4 text-sm font-medium text-gold">Recommended drill: {entry.drill}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel relative rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Analytics Console</p>
          <div className="mt-5 grid gap-4">
            {[
              ["Shot Balance", "Perimeter volume needs 12% more reps", Activity],
              ["Streak Stability", "Nine straight days tracked", Sparkles],
              ["Badge Velocity", "Next badge threshold in 3 logged sessions", ArrowUpRight],
            ].map(([label, detail, Icon]) => (
              <div key={label} className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
                <span className="rounded-2xl border border-white/10 bg-black/30 p-3 text-neon">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
                  <p className="mt-1 text-sm text-white/70">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
