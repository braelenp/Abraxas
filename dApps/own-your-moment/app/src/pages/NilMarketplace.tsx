import { ArrowLeft, ShoppingBag, Sparkles, Ticket } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { exampleAthletes, nilMarketplaceItems } from "../lib/swain";

export default function NilMarketplacePage() {
  const { athleteId } = useParams();
  const athlete = exampleAthletes.find((entry) => entry.id === athleteId);

  if (!athlete) {
    return <Navigate to="/app/recruiter" replace />;
  }

  const merch = nilMarketplaceItems.filter((item) => item.athleteId === athlete.id);

  return (
    <div className="space-y-6">
      <Link
        to="/app/recruiter"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-white/65 transition hover:border-[#f2c230]/45 hover:text-[#f7d86d]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Recruit
      </Link>

      <section className="panel relative overflow-hidden rounded-[32px] p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(242,194,48,0.16),transparent_32%),radial-gradient(circle_at_0%_100%,rgba(235,28,36,0.14),transparent_36%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[28px] border border-[#f2c230]/25 bg-black/25">
            {athlete.imagePath ? (
              <img src={athlete.imagePath} alt={athlete.name} className="h-full min-h-[22rem] w-full object-cover" />
            ) : (
              <div className="flex min-h-[22rem] items-center justify-center bg-black/30 font-display text-5xl uppercase tracking-[0.12em] text-[#f2c230]">
                {athlete.initials}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#f2c230]">Mock NIL Marketplace</p>
            <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.1em] text-white sm:text-4xl">{athlete.name}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/48">{athlete.position} · Class of {athlete.classYear} · {athlete.badge}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
              This mock marketplace shows how a coach, family, or partner could click into an athlete profile and review merch concepts tied to that athlete's NIL identity.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-white/10 bg-black/25 p-4">
                <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/38">Verified Workouts</p>
                <p className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-white">{athlete.verifiedWorkouts}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-black/25 p-4">
                <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/38">Current Streak</p>
                <p className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-white">{athlete.streak}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-black/25 p-4">
                <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/38">NIL Readiness</p>
                <p className="mt-2 font-display text-sm uppercase tracking-[0.08em] text-[#f7d86d]">{athlete.readiness}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="panel relative rounded-[32px] p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-2xl border border-[#f2c230]/35 bg-[#f2c230]/10 p-3 text-[#f2c230]">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/45">Athlete Merch Catalog</p>
              <h3 className="mt-1 font-display text-xl uppercase tracking-[0.09em] text-white">Live Mockup Storefront</h3>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {merch.map((item) => (
              <article key={item.id} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.58rem] uppercase tracking-[0.16em] text-[#f2c230]">{item.category}</p>
                    <h4 className="mt-1 font-display text-base uppercase tracking-[0.07em] text-white">{item.title}</h4>
                  </div>
                  <span className="rounded-full border border-[#eb1c24]/30 bg-[#eb1c24]/10 px-2.5 py-1 text-[0.54rem] uppercase tracking-[0.14em] text-[#ff9ea2]">
                    {item.status}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/68">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-display text-xl uppercase tracking-[0.08em] text-[#f7d86d]">{item.price}</p>
                  <button
                    type="button"
                    className="rounded-full border border-[#f2c230]/35 bg-[#f2c230]/10 px-3 py-2 text-[0.56rem] uppercase tracking-[0.16em] text-[#f7d86d] transition hover:border-[#f2c230]/55 hover:bg-[#f2c230]/16"
                  >
                    View mock item
                  </button>
                </div>
              </article>
            ))}
          </div>
        </article>

        <aside className="space-y-6">
          <article className="panel relative rounded-[32px] p-6">
            <span className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-[#f2c230]">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="mt-3 border-t border-white/[0.08] pt-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-white">Coach Controls</h3>
              <p className="mt-2 text-sm leading-6 text-white/68">
                Coaches can select an athlete, inspect verified performance context, and review the merch identity attached to that athlete's NIL story.
              </p>
            </div>
          </article>

          <article className="panel relative rounded-[32px] p-6">
            <span className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-[#f2c230]">
              <Ticket className="h-5 w-5" />
            </span>
            <div className="mt-3 border-t border-white/[0.08] pt-3">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-white">Marketplace Notes</h3>
              <div className="mt-2 space-y-2 text-sm leading-6 text-white/68">
                <p>Each athlete can have a separate merch catalog, pricing, and release status.</p>
                <p>This is a mockup flow only, ready to connect to a real storefront or creator-commerce backend later.</p>
              </div>
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
