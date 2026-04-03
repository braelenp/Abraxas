import { CalendarClock, Instagram, RadioTower, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import GameCarousel from "../components/GameCarousel";
import { aauGameStats, exampleAthletes, swainDrills, swainIntegrationChecklist } from "../lib/swain";

const teamBoards = [
  { label: "AAU squads connected", value: "03" },
  { label: "Live session slots", value: "06" },
  { label: "Shared drill packs", value: "12" },
];

export default function TeamModePage() {
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(exampleAthletes[0]?.id ?? "");
  const athleteNameById = new Map(exampleAthletes.map((athlete) => [athlete.id, athlete.name]));
  const filteredAthletes = useMemo(
    () => exampleAthletes.filter((athlete) => !selectedAthleteId || athlete.id === selectedAthleteId),
    [selectedAthleteId],
  );
  const filteredAauGames = useMemo(
    () => aauGameStats.filter((game) => !selectedAthleteId || game.athleteId === selectedAthleteId),
    [selectedAthleteId],
  );
  const selectedAthlete = exampleAthletes.find((athlete) => athlete.id === selectedAthleteId) ?? exampleAthletes[0];

  return (
    <div className="space-y-6">
      <section className="panel relative rounded-[32px] p-6 sm:p-8">
        <div className="flex items-center gap-3 text-neon">
          <Users className="h-6 w-6" />
          <p className="text-xs uppercase tracking-[0.3em]">AAU Team Mode</p>
        </div>
        <h2 className="mt-1.5 font-display text-sm font-semibold uppercase tracking-[0.1em] text-white/90 sm:text-base">
          Team progress, Swain live sessions, and shared accountability loops.
        </h2>

        <div className="mt-4 border-t border-white/[0.08] pt-4">
          <p className="max-w-3xl text-sm leading-7 text-white/68 sm:text-base">
            This placeholder maps the product direction for AAU organizations: roster-level drill compliance, live session scheduling, and team benchmarks backed by the same athlete progress model.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {teamBoards.map((item) => (
              <article key={item.label} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-white/45">{item.label}</p>
                <p className="mt-3 font-display text-4xl uppercase tracking-[0.12em] text-gold">{item.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#f2c230]">Coach Athlete Selector</p>
                <p className="mt-1 text-sm text-white/62">Filter the roster to one athlete and jump into that athlete's mock NIL merch page.</p>
              </div>
              {selectedAthlete && (
                <Link
                  to={`/app/marketplace/${selectedAthlete.id}`}
                  className="rounded-full border border-[#f2c230]/35 bg-[#f2c230]/10 px-4 py-2 text-[0.58rem] uppercase tracking-[0.16em] text-[#f7d86d] transition hover:border-[#f2c230]/55 hover:bg-[#f2c230]/16"
                >
                  Open NIL marketplace
                </Link>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {exampleAthletes.map((athlete) => (
                <button
                  key={athlete.id}
                  type="button"
                  onClick={() => setSelectedAthleteId(athlete.id)}
                  className={`rounded-full border px-3 py-2 text-[0.58rem] uppercase tracking-[0.16em] transition ${
                    selectedAthleteId === athlete.id
                      ? "border-[#f2c230]/55 bg-[#f2c230]/12 text-[#f7d86d]"
                      : "border-white/10 bg-white/5 text-white/58 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {athlete.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <article className="panel relative rounded-[32px] p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl border border-gold/40 bg-gold/10 p-3 text-gold">
              <CalendarClock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Sample Team Roster</p>
              <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.1em] text-white">Player Activity Board</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-white/68">
            These example players show how coaches could monitor verified workout volume, streaks, and development focus areas across one team view.
          </p>

          <div className="mt-5 space-y-3">
            {filteredAthletes.map((athlete) => (
              <div key={athlete.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {athlete.imagePath ? (
                      <img
                        src={athlete.imagePath}
                        alt={athlete.name}
                        className="h-11 w-11 rounded-2xl border border-[#f2c230]/35 object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f2c230]/35 bg-[#f2c230]/10 font-display text-sm uppercase tracking-[0.14em] text-[#f2c230]">
                        {athlete.initials}
                      </div>
                    )}
                    <div>
                      <p className="font-display text-base uppercase tracking-[0.08em] text-white">{athlete.name}</p>
                      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-white/40">
                        {athlete.team} · {athlete.position}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-white/55">
                    {athlete.streak} day streak
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-2.5">
                    <p className="text-[0.52rem] uppercase tracking-[0.16em] text-white/38">Workouts</p>
                    <p className="mt-1 font-display text-lg uppercase tracking-[0.08em] text-white">{athlete.verifiedWorkouts}</p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-2.5">
                    <p className="text-[0.52rem] uppercase tracking-[0.16em] text-white/38">Finishing</p>
                    <p className="mt-1 font-display text-lg uppercase tracking-[0.08em] text-white">{athlete.finishingSessions}</p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-2.5">
                    <p className="text-[0.52rem] uppercase tracking-[0.16em] text-white/38">Badge</p>
                    <p className="mt-1 text-[0.58rem] uppercase tracking-[0.12em] text-[#f7d86d]">{athlete.badge}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/66">{athlete.summary}</p>

                <Link
                  to={`/app/marketplace/${athlete.id}`}
                  className="mt-3 inline-flex rounded-full border border-[#eb1c24]/30 bg-[#eb1c24]/10 px-3 py-2 text-[0.56rem] uppercase tracking-[0.15em] text-[#ff9ea2] transition hover:border-[#eb1c24]/55 hover:text-white"
                >
                  View NIL merch mockup
                </Link>
              </div>
            ))}
          </div>
        </article>

        <article className="panel relative rounded-[32px] p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl border border-neon/40 bg-neon/10 p-3 text-neon">
              <RadioTower className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Swain Content Feed</p>
              <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.1em] text-white">Integration Checklist</h3>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {swainIntegrationChecklist.map((item) => (
              <div key={item} className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/70">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-[#eb1c24]/20 bg-[linear-gradient(180deg,rgba(235,28,36,0.08),rgba(255,255,255,0.02))] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#ff6a70]">
                  <Instagram className="h-4 w-4" />
                  <p className="text-[0.68rem] uppercase tracking-[0.24em]">@swain_basketball</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Latest Swain workout drops, player development clips, and training energy. This section is ready to swap to a live Instagram source when an approved feed endpoint is available.
                </p>
              </div>

              <a
                href="https://www.instagram.com/swain_basketball"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eb1c24]/55 bg-[#eb1c24]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6a70] shadow-[0_0_18px_rgba(235,28,36,0.26)] transition hover:border-[#eb1c24]/80 hover:text-white hover:shadow-[0_0_24px_rgba(235,28,36,0.4)]"
              >
                <Instagram className="h-4 w-4" />
                Open Feed
              </a>
            </div>

            <div className="mt-4 grid gap-3">
              {swainDrills.map((drill) => (
                <div
                  key={drill.id}
                  className="rounded-[20px] border border-white/10 bg-black/25 p-4 shadow-[0_0_18px_rgba(0,0,0,0.14)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#f2c230]">{drill.focus}</p>
                      <h4 className="mt-1 font-display text-lg uppercase tracking-[0.08em] text-white">{drill.title}</h4>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-white/55">
                      {drill.durationMinutes} min
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-white/68">{drill.description}</p>
                  <p className="mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-white/40">{drill.source}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="panel relative rounded-[32px] p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#f2c230]">AAU Basketball</p>
            <h3 className="mt-1 font-display text-lg uppercase tracking-[0.09em] text-white">Game Stat Translation Tracker</h3>
          </div>
          <p className="text-[0.6rem] uppercase tracking-[0.14em] text-white/45">How training habits appear in live circuit play</p>
        </div>

        <div className="mt-4">
          <GameCarousel games={filteredAauGames} athleteNameById={athleteNameById} />
        </div>
      </section>
    </div>
  );
}
