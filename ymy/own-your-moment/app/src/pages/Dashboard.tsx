import { Trophy, Wallet } from "lucide-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import DrillTracker from "../components/DrillTracker";
import StatCard from "../components/StatCard";
import { heroMetrics } from "../lib/constants";
import {
  claimSkrRewards,
  fetchAthleteProfile,
  initializeProfile,
  logDrillCompletion,
  logKingAiAction,
  type AthleteProfileView,
} from "../lib/oymProgram";
import { swainDrills } from "../lib/swain";

export default function DashboardPage() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [profile, setProfile] = useState<AthleteProfileView | null>(null);
  const [status, setStatus] = useState<string>("Connect a wallet to load on-chain athlete data.");
  const [isPending, setIsPending] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!wallet.publicKey) {
      setProfile(null);
      setStatus("Connect a wallet to load on-chain athlete data.");
      return;
    }

    try {
      const nextProfile = await fetchAthleteProfile(connection, wallet);
      setProfile(nextProfile);

      if (nextProfile) {
        setStatus("Athlete profile loaded from devnet.");
      } else {
        setStatus("No athlete profile found yet. Initialize one to start logging drills.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to load athlete profile.");
    }
  }, [connection, wallet]);

  useEffect(() => {
    void refreshProfile();
  }, [refreshProfile]);

  const liveMetrics = useMemo(() => {
    if (!profile) {
      return heroMetrics;
    }

    return [
      {
        label: "Drills Completed",
        value: String(profile.totalCompletedDrills),
        detail: `${completedIds.length} logged this session`,
      },
      {
        label: "Current Streak",
        value: String(profile.currentStreak).padStart(2, "0"),
        detail: `Best streak ${profile.bestStreak}`,
      },
      {
        label: "Pending SKR",
        value: String(profile.pendingSkrRewards),
        detail: "claimable on devnet",
      },
      heroMetrics[3],
    ];
  }, [completedIds.length, profile]);

  const handleInitializeProfile = useCallback(async () => {
    if (!wallet.publicKey) {
      setStatus("Connect a wallet before initializing a profile.");
      return;
    }

    setIsPending(true);
    setStatus("Submitting initialize_profile...");

    try {
      const signature = await initializeProfile(connection, wallet, "Demo Athlete");
      setStatus(`Profile initialized: ${signature.slice(0, 8)}...`);
      await refreshProfile();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to initialize profile.");
    } finally {
      setIsPending(false);
    }
  }, [connection, refreshProfile, wallet]);

  const handleComplete = useCallback(
    async (drill: (typeof swainDrills)[number]) => {
      if (!wallet.publicKey) {
        setStatus("Connect a wallet before logging drills.");
        return;
      }

      if (!profile) {
        setStatus("Initialize your athlete profile before logging drills.");
        return;
      }

      if (completedIds.includes(drill.id)) {
        return;
      }

      const entryIndex = profile.totalCompletedDrills + completedIds.length;
      const actionIndex = Math.floor(Date.now() / 1000) & 0xffffffff;

      setIsPending(true);
      setStatus(`Submitting log_drill_completion for ${drill.title}...`);

      try {
        await logDrillCompletion(connection, wallet, {
          entryIndex,
          title: drill.title,
          category: drill.focus,
          durationMinutes: drill.durationMinutes,
          intensity: 7,
          rewardAmount: drill.reward,
        });

        await logKingAiAction(connection, wallet, {
          actionIndex,
          actionType: "drill_log",
          summary: `Logged ${drill.title}`,
        });

        setCompletedIds((current) => [...current, drill.id]);
        setStatus(`Drill logged on-chain: ${drill.title}`);
        await refreshProfile();
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Failed to log drill completion.");
      } finally {
        setIsPending(false);
      }
    },
    [completedIds, connection, profile, refreshProfile, wallet],
  );

  const handleClaimRewards = useCallback(async () => {
    if (!wallet.publicKey) {
      setStatus("Connect a wallet before claiming rewards.");
      return;
    }

    if (!profile || profile.pendingSkrRewards <= 0) {
      setStatus("No pending rewards to claim yet.");
      return;
    }

    setIsPending(true);
    setStatus("Submitting claim_skr_rewards...");

    try {
      await claimSkrRewards(connection, wallet, profile.pendingSkrRewards);
      setStatus("Rewards claimed on-chain.");
      await refreshProfile();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to claim rewards.");
    } finally {
      setIsPending(false);
    }
  }, [connection, profile, refreshProfile, wallet]);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <article className="panel relative overflow-hidden rounded-[32px] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Athlete Command Center</p>
          <h2 className="mt-1.5 font-display text-sm font-semibold uppercase tracking-[0.1em] text-white/90 sm:text-base">
            Train daily, prove it on-chain, and surface the moments that matter.
          </h2>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <p className="max-w-xl text-sm leading-7 text-white/68 sm:text-base">
              This dashboard is wired for devnet iteration: log daily drills, stage NIL badge mints, and hand off data to King AI for next-session recommendations.
            </p>

            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/55">{status}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {liveMetrics.map((metric) => (
                <StatCard key={metric.label} label={metric.label} value={metric.value} detail={metric.detail} />
              ))}
            </div>

            {!profile ? (
              <button
                type="button"
                onClick={() => void handleInitializeProfile()}
                disabled={!wallet.publicKey || isPending}
                className="mt-5 rounded-full border border-neon/50 px-4 py-2 text-sm font-medium text-neon transition hover:bg-neon hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                Initialize Athlete Profile
              </button>
            ) : null}
          </div>
        </article>

        <aside className="space-y-6">
          <article className="panel relative rounded-[32px] p-6">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl border border-gold/40 bg-gold/10 p-3 text-gold">
                <Wallet className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">Claim Window</p>
                <p className="font-display text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl sm:tracking-[0.12em]">
                  {profile ? profile.pendingSkrRewards : 0} SKR
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/65">
              Rewards are mock-calculated in the UI and map to the pending reward balance field in the Anchor athlete profile.
            </p>

            <button
              type="button"
              onClick={() => void handleClaimRewards()}
              disabled={isPending || !wallet.publicKey || !profile || profile.pendingSkrRewards <= 0}
              className="mt-5 rounded-full border border-neon/50 px-4 py-2 text-sm font-medium text-neon transition hover:bg-neon hover:text-black"
            >
              {isPending ? "Submitting..." : "Claim SKR Rewards"}
            </button>
          </article>

          <article className="panel relative rounded-[32px] p-6">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl border border-neon/40 bg-neon/10 p-3 text-neon">
                <Trophy className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">NIL Badge Mint Queue</p>
                <p className="font-display text-2xl uppercase tracking-[0.12em] text-white">Swain Shooter</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/65">
              Trigger this badge once your athlete profile crosses the verified shooting and streak thresholds required by your mint rules.
            </p>
          </article>
        </aside>
      </section>

      <DrillTracker
        drills={swainDrills}
        completedIds={completedIds}
        disabled={isPending || !wallet.publicKey || !profile}
        onComplete={(drill) => {
          void handleComplete(drill);
        }}
      />
    </div>
  );
}
