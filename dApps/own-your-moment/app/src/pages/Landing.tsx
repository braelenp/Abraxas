import { ArrowRight, Bot, Instagram, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Verifiable Training",
    detail: "Daily Swain workouts tracked on-chain with athlete-owned progression history.",
    icon: ShieldCheck,
  },
  {
    title: "NIL Badge Momentum",
    detail: "Milestone badges and recruiter-ready proof points designed for modern hoops careers.",
    icon: Trophy,
  },
  {
    title: "King AI Guidance",
    detail: "High-context recommendations that adapt to your logged sessions and reward cadence.",
    icon: Bot,
  },
];

export default function LandingPage() {
  return (
    <div className="landing-bg relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <div className="landing-grid pointer-events-none absolute inset-0" />
      <div className="landing-glow pointer-events-none absolute inset-0" />
      <div className="landing-orb landing-orb-red pointer-events-none absolute -left-16 top-24 h-44 w-44 rounded-full sm:h-72 sm:w-72" />
      <div className="landing-orb landing-orb-gold pointer-events-none absolute right-[-3.5rem] top-[22%] h-52 w-52 rounded-full sm:h-80 sm:w-80" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="flex items-center justify-between rounded-[28px] border border-white/10 bg-black/35 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/assets/oym-logo.svg" alt="Own Your Moment" className="h-10 w-10 rounded-full bg-white" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#f2c230]">Own Your Moment</p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">Swain Basketball Academy</p>
            </div>
          </div>
        </header>

        <main className="mt-4 grid flex-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="text-center lg:text-left">
            <p className="landing-pill inline-flex items-center gap-1.5 rounded-full border border-[#eb1c24]/45 bg-[#eb1c24]/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-[#ff6a70] sm:text-xs sm:tracking-[0.28em]">
              <Sparkles className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              <span className="whitespace-nowrap">Train with Purpose. Compete with Confidence.</span>
            </p>

            <h1 className="landing-title mt-3 whitespace-nowrap font-display text-[1.75rem] font-black uppercase tracking-[0.07em] text-white sm:mt-5 sm:text-6xl sm:tracking-[0.12em]">
              Own Your Moment
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm leading-7 text-white/72 sm:mt-4 sm:text-lg sm:leading-8">
              A high-performance basketball platform where athletes train, prove progress on Solana, unlock NIL-ready badges,
              and level up with King AI.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:mt-7 lg:justify-start">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-full border border-[#f2c230]/70 bg-[#f2c230] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black shadow-[0_0_22px_rgba(242,194,48,0.45)] transition hover:shadow-[0_0_30px_rgba(242,194,48,0.65)] hover:brightness-110"
              >
                Launch App
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://www.instagram.com/swain_basketball"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#eb1c24]/50 bg-[#eb1c24]/10 px-5 py-3 text-sm uppercase tracking-[0.2em] text-[#ff6a70] shadow-[0_0_18px_rgba(235,28,36,0.35)] transition hover:border-[#eb1c24]/80 hover:shadow-[0_0_26px_rgba(235,28,36,0.55)] hover:text-white"
              >
                <Instagram className="h-4 w-4" />
                Follow on IG
              </a>
            </div>
          </section>

          <section className="relative landing-photo-stage">
            {/* ambient glows */}
            <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-[#eb1c24]/28 blur-3xl" />
            <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-[#f2c230]/22 blur-3xl" />

            <article className="landing-photo-card relative overflow-hidden rounded-[34px] border border-white/12 shadow-[0_0_64px_rgba(235,28,36,0.22)]">
              {/* ── Athlete photo ── */}
              <div className="relative">
                <img
                  src="/assets/athlete.jpg"
                  alt="Swain Academy athlete"
                  className="h-[400px] w-full object-cover object-[center_18%] sm:h-[460px]"
                />
                {/* bottom-to-top dark fade so photo blends into the cards */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#0a0a0a_0%,rgba(10,10,10,0.55)_30%,transparent_62%)]" />
                {/* subtle edge vignette */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,5,5,0.55)_100%)]" />
                {/* red glow from bottom-center */}
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-56 -translate-x-1/2 rounded-full bg-[#eb1c24]/18 blur-2xl" />

                {/* corner badge */}
                <div className="absolute right-4 top-4 rounded-full border border-[#f2c230]/55 bg-black/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.26em] text-[#f2c230] backdrop-blur-md">
                  Swain Academy
                </div>
              </div>

              {/* ── Feature highlights ── */}
              <div id="vision" className="space-y-3 bg-[linear-gradient(to_bottom,#0a0a0a,#0d0808)] px-5 pb-5 pt-2">
                {highlights.map(({ title, detail, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl border border-[#f2c230]/35 bg-[#f2c230]/10 p-2 text-[#f2c230]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">{title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/65">{detail}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
