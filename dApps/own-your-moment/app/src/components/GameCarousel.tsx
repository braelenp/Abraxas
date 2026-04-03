import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { GameStatEntry } from "../lib/swain";

type Props = {
  games: GameStatEntry[];
  athleteNameById: Map<string, string>;
};

const tagColors: Record<GameStatEntry["translationTag"], string> = {
  "Strong carryover": "border-[#f2c230]/35 bg-[#f2c230]/10 text-[#f7d86d]",
  "Rising carryover": "border-[#eb1c24]/30 bg-[#eb1c24]/10 text-[#ff9ea2]",
  "Needs carryover": "border-white/20 bg-white/5 text-white/55",
};

export default function GameCarousel({ games, athleteNameById }: Props) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!games.length) return null;

  const total = games.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  }

  return (
    <div className="select-none">
      {/* Slide wrapper */}
      <div
        className="relative overflow-hidden rounded-[20px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* sliding track */}
        <div
          className="flex transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {games.map((g) => (
            <article
              key={g.id}
              className="min-w-full rounded-[20px] border border-white/10 bg-black/30 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#f2c230]">
                    {athleteNameById.get(g.athleteId)} · {g.opponent}
                  </p>
                  <p className="mt-1 text-[0.58rem] uppercase tracking-[0.16em] text-white/45">
                    {g.dateLabel} · {g.minutes} min
                  </p>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-[0.54rem] uppercase tracking-[0.14em] ${tagColors[g.translationTag]}`}>
                  {g.translationTag}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2 text-center sm:grid-cols-7">
                {[
                  { label: "PTS", value: g.points, gold: false },
                  { label: "REB", value: g.rebounds, gold: false },
                  { label: "AST", value: g.assists, gold: false },
                  { label: "STL", value: g.steals, gold: false },
                  { label: "BLK", value: g.blocks, gold: false },
                  { label: "TO",  value: g.turnovers, gold: false },
                  { label: "FG%", value: g.fgPct, gold: true },
                ].map(({ label, value, gold }) => (
                  <div key={label} className="rounded-[14px] border border-white/10 bg-black/20 p-2">
                    <p className="text-[0.48rem] uppercase tracking-[0.12em] text-white/38">{label}</p>
                    <p className={`mt-1 font-display text-base ${gold ? "text-[#f7d86d]" : "text-white"}`}>{value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-sm leading-6 text-white/68">{g.translationNote}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={prev}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white/55 transition hover:border-white/25 hover:text-white disabled:opacity-30"
          aria-label="Previous game"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {games.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to game ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-5 bg-[#f2c230]"
                  : "w-1.5 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white/55 transition hover:border-white/25 hover:text-white"
          aria-label="Next game"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="mt-2 text-center text-[0.52rem] uppercase tracking-[0.14em] text-white/30">
        Game {index + 1} of {total} · swipe or use arrows
      </p>
    </div>
  );
}
