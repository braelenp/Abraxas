import { BadgeCheck, BarChart3, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import GameCarousel from "../components/GameCarousel";
import { exampleAthletes, recruiterSnapshot, schoolGameStats } from "../lib/swain";

export default function RecruiterPage() {
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(exampleAthletes[0]?.id ?? "");
  const athleteNameById = new Map(exampleAthletes.map((athlete) => [athlete.id, athlete.name]));
  const filteredAthletes = useMemo(
    () => exampleAthletes.filter((athlete) => !selectedAthleteId || athlete.id === selectedAthleteId),
    [selectedAthleteId],
  );
  const filteredSchoolGames = useMemo(
    () => schoolGameStats.filter((game) => !selectedAthleteId || game.athleteId === selectedAthleteId),
    [selectedAthleteId],
  );
  const selectedAthlete = exampleAthletes.find((athlete) => athlete.id === selectedAthleteId) ?? exampleAthletes[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="panel relative min-w-0 rounded-[32px] p-4 sm:p-8">
        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.3em]">Recruiter Dashboard</p>
        <h2 className="mt-1.5 break-words font-display text-[0.82rem] font-semibold uppercase tracking-[0.06em] leading-6 text-white/90 sm:text-base sm:tracking-[0.1em] sm:leading-7">
          Verified training signals that separate real work from highlight noise.
        </h2>

        <div className="mt-4 border-t border-white/[0.08] pt-4">
          <p className="max-w-2xl break-words text-[0.94rem] leading-7 text-white/68 sm:text-base">
            These sample athletes show how recruiter-facing profiles can surface verified workload, streak consistency, and badge context without forcing people to guess what the data means.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {recruiterSnapshot.map((item) => (
              <article key={item.label} className="rounded-[24px] border border-white/10 bg-black/25 p-4 sm:p-5">
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-white/45 sm:text-xs sm:tracking-[0.26em]">{item.label}</p>
                <p className="mt-3 font-display text-4xl uppercase tracking-[0.12em] text-neon">{item.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#f2c230]">Coach Athlete Selector</p>
                <p className="mt-1 text-sm text-white/62">Choose an athlete to inspect recruiting data and open their mock NIL marketplace.</p>
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

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {filteredAthletes.map((athlete) => (
              <article
                key={athlete.id}
                className="rounded-[26px] border border-[#f2c230]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_0_22px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {athlete.imagePath ? (
                      <img
                        src={athlete.imagePath}
                        alt={athlete.name}
                        className="h-12 w-12 rounded-2xl border border-[#f2c230]/35 object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f2c230]/35 bg-[#f2c230]/10 font-display text-sm uppercase tracking-[0.14em] text-[#f2c230]">
                        {athlete.initials}
                      </div>
                    )}
                    <div>
                      <p className="font-display text-lg uppercase tracking-[0.08em] text-white">{athlete.name}</p>
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/45">
                        {athlete.position} · {athlete.classYear}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#eb1c24]/30 bg-[#eb1c24]/10 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-[#ff8e92]">
                    {athlete.readiness}
                  </span>
                </div>

                <div className="mt-4 border-t border-white/[0.08] pt-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#f2c230]">{athlete.archetype}</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{athlete.summary}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
                      <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/40">Verified Work</p>
                      <p className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-white">{athlete.verifiedWorkouts}</p>
                    </div>
                    <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
                      <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/40">SKR Pending</p>
                      <p className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-gold">{athlete.pendingSkr}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-white/58">
                      {athlete.team}
                    </span>
                    <span className="rounded-full border border-[#f2c230]/30 bg-[#f2c230]/10 px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-[#f7d86d]">
                      {athlete.badge}
                    </span>
                  </div>

                    <Link
                      to={`/app/marketplace/${athlete.id}`}
                      className="mt-4 inline-flex rounded-full border border-[#eb1c24]/30 bg-[#eb1c24]/10 px-3 py-2 text-[0.56rem] uppercase tracking-[0.15em] text-[#ff9ea2] transition hover:border-[#eb1c24]/55 hover:text-white"
                    >
                      View NIL merch mockup
                    </Link>

                  <div className="mt-4 space-y-2">
                    {athlete.focusAreas.map((focus) => (
                      <div key={focus} className="rounded-[16px] border border-white/8 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.14em] text-white/62">
                        {focus}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[26px] border border-[#eb1c24]/22 bg-[linear-gradient(180deg,rgba(235,28,36,0.08),rgba(255,255,255,0.02))] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#ff9ea2]">School Basketball</p>
                <h3 className="mt-1 font-display text-lg uppercase tracking-[0.09em] text-white">Game Translation Tracker</h3>
              </div>
              <p className="text-[0.6rem] uppercase tracking-[0.14em] text-white/45">Training to game carryover snapshot</p>
            </div>

            <div className="mt-4">
              <GameCarousel games={filteredSchoolGames} athleteNameById={athleteNameById} />
            </div>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        {[
          {
            title: "Verified Milestones",
            copy: "Anchor events and badge records can be transformed into recruiter-facing proof points.",
            icon: BadgeCheck,
          },
          {
            title: "Performance Trends",
            copy: "Add shot chart deltas, streak graphs, and position-specific benchmarks in the next pass.",
            icon: BarChart3,
          },
          {
            title: "Share Flow",
            copy: "Generate a signed public view with opt-in visibility controls before exposing athlete profiles.",
            icon: Share2,
          },
        ].map(({ title, copy, icon: Icon }) => (
          <article key={title} className="panel relative rounded-[32px] p-6">
            <span className="rounded-2xl border border-white/10 bg-white/5 p-3 text-gold inline-flex">
              <Icon className="h-5 w-5" />
            </span>
            <div className="mt-3 border-t border-white/[0.08] pt-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/68">{copy}</p>
            </div>
          </article>
        ))}
      </aside>
    </div>
  );
}
