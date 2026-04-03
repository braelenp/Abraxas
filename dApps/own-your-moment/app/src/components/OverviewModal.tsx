import { ArrowRight, Brain, GraduationCap, LayoutDashboard, Sparkles, Users } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "oym_overview_seen";
const OPEN_OVERVIEW_EVENT = "oym:open-overview";

type TabKey = "dash" | "king" | "recruit" | "team";

type TabOverviewItem = {
  key: TabKey;
  icon: typeof LayoutDashboard;
  label: string;
  desc: string;
  detailTitle: string;
  detailBody: string[];
};

const whatYouCanDo = [
  "Log daily Swain Basketball drills on Solana devnet and build a verifiable, on-chain training history.",
  "Track your streak, drill completions, and pending SKR rewards from the Athlete Command Center.",
  "Ask King AI (Kingslee) for personalized drill recommendations and next-session guidance.",
  "Build a recruiter-ready profile with on-chain proof points and NIL badge milestones.",
  "Connect your AAU team to shared accountability loops, live session scheduling, and drill packs.",
];

const tabOverview: TabOverviewItem[] = [
  {
    key: "dash",
    icon: LayoutDashboard,
    label: "Dash",
    desc: "Your live athlete command center — drills, stats, rewards, and on-chain wallet status.",
    detailTitle: "Dash explained for beginners",
    detailBody: [
      "Think of Dash as your progress report card that cannot be edited by anyone once your actions are saved.",
      "When you log drills, the app writes those records to Solana devnet, which is a public practice blockchain used for testing.",
      "Your wallet status simply means your athlete identity is connected so your progress can be tied to you.",
    ],
  },
  {
    key: "king",
    icon: Brain,
    label: "King AI Intelligence",
    desc: "Kingslee AI adviser — personalized session recommendations shaped by your logged training data.",
    detailTitle: "King AI Intelligence explained",
    detailBody: [
      "King AI reads your training history and turns it into practical next-session guidance.",
      "You can ask plain-language questions like what to train tomorrow or how to recover after a heavy session.",
      "No crypto knowledge needed here. The blockchain part runs in the background while King focuses on coaching insight.",
    ],
  },
  {
    key: "recruit",
    icon: GraduationCap,
    label: "Recruit",
    desc: "Verified training signals and NIL badge proof points ready for recruiter and coach visibility.",
    detailTitle: "Recruit explained for families and athletes",
    detailBody: [
      "Recruit is your athlete resume with proof attached, not just claims in a bio.",
      "NIL badges are milestone achievements you unlock, and each badge can be verified from your activity history.",
      "Coaches can review evidence-backed consistency instead of guessing whether progress numbers are real.",
    ],
  },
  {
    key: "team",
    icon: Users,
    label: "Team",
    desc: "AAU team mode — roster drill compliance, live Swain sessions, and shared accountability.",
    detailTitle: "Team mode in simple terms",
    detailBody: [
      "Team mode gives coaches and players one shared view of who completed drills and who still has work due.",
      "Session scheduling and drill packs stay organized in one place so team standards are clear.",
      "Blockchain logging helps with accountability because completed work has a timestamped record.",
    ],
  },
];

export default function OverviewModal() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabOverviewItem | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) setVisible(true);
  }, []);

  useEffect(() => {
    function handleOpen() {
      setVisible(true);
    }

    window.addEventListener(OPEN_OVERVIEW_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_OVERVIEW_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [visible]);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setActiveTab(null);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Own Your Moment"
    >
      {/* Blur backdrop */}
      <div
        className="absolute inset-0 bg-black/88 backdrop-blur-2xl"
        onClick={dismiss}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-t-[28px] border border-[#f2c230]/30 bg-[linear-gradient(158deg,rgba(18,10,10,0.98),rgba(10,8,8,0.98))] shadow-[0_0_80px_rgba(235,28,36,0.3),0_0_40px_rgba(242,194,48,0.1)] backdrop-blur-2xl sm:rounded-[28px]">
        {/* top gold line sweep */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_8%,rgba(242,194,48,0.55)_50%,transparent_92%)]" />
        {/* subtle inner glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(242,194,48,0.07),transparent_55%)]" />

        <div className="max-h-[88dvh] overflow-y-auto overscroll-contain px-5 pb-6 pt-6 sm:max-h-[86dvh] sm:px-7 sm:pt-7">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-[#f2c230]/45 bg-[#f2c230]/10 p-2.5 text-[#f2c230]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.28em] text-[#f2c230]">Swain Basketball x Solana</p>
              <h2 className="mt-0.5 font-display text-base uppercase tracking-[0.1em] text-white">Own Your Moment</h2>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-white/75">
            You are entering a training intelligence platform for serious athletes — where daily Swain workouts are logged on Solana, NIL progress is verifiable, and King AI shapes your next move.
          </p>

          {/* What you can do */}
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#f2c230]">What you can do</p>
            <ul className="mt-3 space-y-2.5">
              {whatYouCanDo.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-6 text-white/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#eb1c24]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tab overview */}
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-[#f2c230]">Tab Overview</p>
              <p className="text-[0.55rem] uppercase tracking-[0.16em] text-white/45">Click cards for more info</p>
            </div>
            <div className="mt-3 space-y-2">
              {tabOverview.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveTab(item)}
                    className="flex w-full items-start gap-3 rounded-[14px] border border-white/8 bg-white/[0.03] px-3 py-2.5 text-left transition hover:border-[#f2c230]/45 hover:bg-white/[0.06]"
                    aria-label={`Open ${item.label} details`}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#f2c230]" />
                    <p className="text-sm leading-6 text-white/70">
                      <span className="font-semibold text-white">{item.label}:</span> {item.desc}
                      <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.14em] text-[#f2c230]/80">Tap for full explanation</span>
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={dismiss}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#f2c230] px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_28px_rgba(242,194,48,0.5)] transition hover:shadow-[0_0_38px_rgba(242,194,48,0.7)] hover:brightness-110"
          >
            Enter the Control Surface
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {activeTab && (
          <div className="absolute inset-0 z-10 flex items-end bg-black/70 backdrop-blur-md sm:items-center">
            <div className="w-full rounded-t-[24px] border-t border-[#f2c230]/35 bg-[linear-gradient(160deg,rgba(16,10,10,0.98),rgba(7,7,7,0.98))] px-5 pb-5 pt-4 sm:mx-4 sm:rounded-[20px] sm:border sm:px-6 sm:pt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.56rem] uppercase tracking-[0.2em] text-[#f2c230]">In-depth overview</p>
                  <h3 className="mt-1 font-display text-sm uppercase tracking-[0.08em] text-white">{activeTab.detailTitle}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab(null)}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-white/75 transition hover:border-[#f2c230]/45 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="mt-3 space-y-2.5">
                {activeTab.detailBody.map((line) => (
                  <p key={line} className="text-sm leading-7 text-white/78">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
