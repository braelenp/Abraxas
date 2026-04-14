/**
 * Species Awakening Dashboard
 * 
 * A cinematic Web3 airdrop campaign dashboard featuring:
 * - Live points balance and level progression
 * - Daily/weekly task quests for Discord and X (Twitter)
 * - Real-time leaderboard of top participants
 * - Shareable profile cards
 * - RWA Equity Education section
 * - Premium Abraxas cinematic styling
 */

import { useState, useMemo } from 'react';
import { Share2, Copy, ArrowRight, Zap, Trophy, Star, CheckCircle2, Target, BookOpen, Users } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTranslation } from 'react-i18next';
import { useSpeciesAwakening } from '../hooks/useSpeciesAwakening';

// ── Mock Data ────────────────────────────────────────────────────────────
// These are kept for RWA assets reference only
const RWA_ASSETS = [
  {
    id: 'chronos',
    name: 'Chronos Luxury Watches',
    emoji: '⌚',
    description: 'Institutional-grade horological assets with verified provenance and real-time market pricing.',
    allocation: 'Real-world luxury collectibles backed by blockchain verification.',
  },
  {
    id: 'astra',
    name: 'Astra Aviation Equity',
    emoji: '✈️',
    description: 'Stakes in emerging aircraft and aerospace ventures with transparent operational metrics.',
    allocation: 'Growth-stage aviation technology and leasing platforms.',
  },
  {
    id: 'elysium',
    name: 'Elysium Fine Art',
    emoji: '🎨',
    description: 'Fractional ownership of authenticated artworks with institutional-grade custody.',
    allocation: 'Gallery-verified contemporary and classical art portfolio.',
  },
  {
    id: 'credos',
    name: 'Credos Debt Instruments',
    emoji: '📋',
    description: 'Structured debt products from verified credit providers with transparent yield.',
    allocation: 'Fixed-income securities and emerging market debt opportunities.',
  },
];

// ── Level System ────────────────────────────────────────────────────────────
// (Now handled by backend)

export function SpeciesAwakeningPage() {
  const { t } = useTranslation();
  const { publicKey, connected } = useWallet();
  const [copied, setCopied] = useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [taskCompletionMessage, setTaskCompletionMessage] = useState<string | null>(null);

  const {
    profile,
    profileLoading,
    profileError,
    tasks,
    tasksLoading,
    leaderboard,
    leaderboardLoading,
    completeTask,
    isConnected,
  } = useSpeciesAwakening();

  if (!connected) {
    return (
      <div className="space-y-4 text-center py-12">
        <div className="text-4xl font-black text-purple-400">🔮</div>
        <h1 className="text-2xl font-bold text-slate-300">Connect Your Wallet</h1>
        <p className="text-slate-500">To participate in Species Awakening, please connect your wallet.</p>
      </div>
    );
  }

  if (profileLoading && !profile) {
    return (
      <div className="space-y-4 text-center py-12">
        <div className="text-4xl font-black text-purple-400">✧</div>
        <h1 className="text-2xl font-bold text-slate-300">Loading Campaign...</h1>
        <p className="text-slate-500">Awakening your profile</p>
        <p className="text-xs text-slate-600 mt-4">Using API: {process.env.REACT_APP_API_URL || 'auto-detected'}</p>
      </div>
    );
  }

  // Show error state if API is unavailable but still render UI with mock data
  if (profileError && !profile) {
    return (
      <div className="space-y-6 pb-20">
        <div className="rounded-lg border border-amber-400/30 bg-amber-950/40 p-4 backdrop-blur-sm">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-2">⚠️ API Connection Issue</p>
          <p className="text-sm text-amber-100 mb-3">{profileError}</p>
          <p className="text-xs text-amber-200/70">Make sure the backend server is running on port 3001 or set REACT_APP_API_URL environment variable.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 rounded border border-amber-400/50 bg-amber-500/20 text-amber-300 text-sm font-semibold hover:bg-amber-500/30"
          >
            Retry Connection
          </button>
        </div>

        {/* Render mock UI when offline */}
        <section className="space-y-3">
          <div className="text-center space-y-2 mb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-purple-400/60">✧ Species Awakening ✧</p>
            <h1 className="text-3xl font-black text-slate-50 drop-shadow-[0_0_12px_rgba(153,69,255,0.3)]">
              The Airdrop Awaits
            </h1>
            <p className="text-sm text-slate-400">
              (Offline mode - backend server not available)
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-4 text-center py-12">
        <div className="text-4xl font-black text-purple-400">🔮</div>
        <h1 className="text-2xl font-bold text-slate-300">Profile Unavailable</h1>
        <p className="text-slate-500">Unable to load your campaign profile</p>
      </div>
    );
  }

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const visibleLeaderboard = showFullLeaderboard ? leaderboard : leaderboard.slice(0, 10);

  // Shareable link
  const shareableLink = `${window.location.origin}/app/species-awakening?user=${publicKey?.toString() || 'abraxas'}`;
  const shareMessage = `I'm ${profile.levelName} (Level ${profile.level}) in the Species Awakening Airdrop! 🌟 ${profile.totalPoints} points. Join me and help awaken the protocol! 🔮`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Species Awakening Airdrop',
          text: shareMessage,
          url: shareableLink,
        });
      } catch (err) {
        console.log('Share cancelled:', err);
      }
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    setCompletingTaskId(taskId);
    setTaskCompletionMessage(null);

    const result = await completeTask(taskId);
    setCompletingTaskId(null);

    if (result.success) {
      setTaskCompletionMessage(result.reward || 'Task completed!');
      setTimeout(() => setTaskCompletionMessage(null), 3000);
    } else {
      setTaskCompletionMessage(result.error || 'Failed to complete task');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* ── HEADER ────────────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="text-center space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-purple-400/60">✧ Species Awakening ✧</p>
          <h1 className="text-3xl font-black text-slate-50 drop-shadow-[0_0_12px_rgba(153,69,255,0.3)]">
            The Airdrop Awakens
          </h1>
          <p className="text-sm text-slate-400">
            Complete quests, earn points, and climb the tiers of the Species Awakening campaign.
          </p>
        </div>
      </section>

      {/* ── MAIN POINTS & LEVEL CARD ──────────────────────────── */}
      <section className="rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-900/20 to-slate-900/40 p-6 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-mono uppercase tracking-widest text-purple-300/70">Your Power Level</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-purple-300">{profile.totalPoints}</span>
              <span className="text-sm text-slate-400">points</span>
            </div>
          </div>
          <div className="text-5xl drop-shadow-[0_0_20px_rgba(153,69,255,0.4)]">🔮</div>
        </div>

        <div className="border-t border-purple-300/20 pt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-100">
              Level {profile.level}
            </span>
            <span className="text-sm text-purple-300 font-semibold">
              {profile.progressToNext}% to next
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-3">{profile.levelName}</p>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full bg-slate-800/50 border border-purple-400/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-500"
              style={{ width: `${profile.progressToNext}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>{profile.totalPoints} pts</span>
            <span>{profile.nextLevelPoints} pts</span>
          </div>
        </div>

        {/* Whitelist Status */}
        <div className="border-t border-purple-300/20 pt-3 flex items-center gap-2 text-sm">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              profile.whitelistEligible ? 'bg-emerald-400/80' : 'bg-slate-600/50'
            }`}
          />
          <span className="text-slate-300">
            {profile.whitelistEligible ? (
              <>
                <span className="text-emerald-300 font-semibold">✓ Whitelist Eligible</span> — Top 100 activated
              </>
            ) : (
              <>
                <span className="text-slate-400">{1500 - profile.totalPoints} pts</span> until whitelist status
              </>
            )}
          </span>
        </div>
      </section>

      {/* ── QUICK STATS ────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-cyan-300/25 bg-cyan-500/10 p-3 space-y-1 backdrop-blur-sm">
          <p className="text-xs text-cyan-300/70 font-mono uppercase tracking-wide">Task Progress</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-cyan-200">{completedTasks}</span>
            <span className="text-xs text-cyan-400/60">/ {totalTasks}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-cyan-900/30 overflow-hidden mt-2">
            <div
              className="h-full bg-cyan-400 transition-all"
              style={{ width: `${taskProgress}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-amber-300/25 bg-amber-500/10 p-3 space-y-1 backdrop-blur-sm">
          <p className="text-xs text-amber-300/70 font-mono uppercase tracking-wide">Rank</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-amber-200">#3</span>
            <span className="text-xs text-amber-400/60 ml-auto">of 1.2K</span>
          </div>
          <div className="text-xs text-amber-300/70 mt-2">💫 Top 10 - Keep it up!</div>
        </div>
      </section>

      {/* ── ACTIVE TASKS SECTION ──────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-purple-300" />
          <h2 className="text-lg font-bold text-slate-100">Active Quests</h2>
        </div>

        {taskCompletionMessage && (
          <div className={`rounded-lg p-3 text-sm font-semibold text-center ${
            taskCompletionMessage.includes('Failed') 
              ? 'bg-red-500/20 border border-red-400/30 text-red-300'
              : 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300'
          }`}>
            {taskCompletionMessage}
          </div>
        )}

        <div className="space-y-2">
          {tasksLoading ? (
            <div className="text-center py-8 text-slate-400">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-slate-400">No tasks available</div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`rounded-lg border p-3 transition-all backdrop-blur-sm ${
                  task.completed
                    ? 'border-emerald-400/30 bg-emerald-500/10'
                    : 'border-slate-600/50 bg-slate-800/40 hover:border-purple-400/40 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{task.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">{task.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {task.platform}{' '}
                          <span className="text-slate-500">
                            • {task.type === 'daily' ? 'Daily' : 'Weekly'}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-bold text-purple-300">+{task.reward}</span>
                        {task.completed && (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {!task.completed && (
                  <div className="flex gap-2 mt-2">
                    {task.link && (
                      <a
                        href={task.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-purple-300 hover:text-purple-200 transition border border-purple-400/30 rounded py-1.5 hover:border-purple-400/60"
                      >
                        Open <ArrowRight size={12} />
                      </a>
                    )}
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={completingTaskId === task.id}
                      className="flex-shrink-0 px-3 py-1.5 rounded text-xs font-semibold border border-emerald-400/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-50 transition"
                    >
                      {completingTaskId === task.id ? 'Marking...' : 'Mark Done'}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── SHARE YOUR PROGRESS ───────────────────────────────── */}
      <section className="rounded-lg border border-amber-300/30 bg-gradient-to-r from-amber-900/20 to-purple-900/20 p-4 space-y-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Share2 size={18} className="text-amber-300" />
          <h3 className="text-sm font-bold text-amber-100">Share Your Journey</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {shareMessage}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-amber-400/50 bg-amber-500/20 text-amber-200 text-xs font-semibold hover:bg-amber-500/30 transition-all"
          >
            <Copy size={14} />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-purple-400/50 bg-purple-500/20 text-purple-200 text-xs font-semibold hover:bg-purple-500/30 transition-all"
          >
            <Share2 size={14} />
            Share
          </button>
        </div>
      </section>

      {/* ── LEADERBOARD ───────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-amber-300" />
          <h2 className="text-lg font-bold text-slate-100">Top Awakened</h2>
          <span className="ml-auto text-xs text-slate-500">
            Top {showFullLeaderboard ? 100 : 10}
          </span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {leaderboardLoading ? (
            <div className="text-center py-8 text-slate-400">Loading leaderboard...</div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-8 text-slate-400">No participants yet</div>
          ) : (
            visibleLeaderboard.map((entry, index) => (
              <div
                key={`${entry.rank}-${entry.walletAddress}`}
                className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/40 p-3 hover:border-slate-600 transition-all"
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 font-bold text-xs text-white flex-shrink-0">
                  {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : entry.rank}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-slate-100 truncate">
                      {entry.username || `User ${entry.rank}`}
                    </h3>
                    {entry.whitelistEligible && (
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30 flex-shrink-0">
                        ✓ Whitelisted
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Level {entry.level} • {entry.points} points
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-purple-300">{entry.points}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {!showFullLeaderboard && leaderboard.length > 10 && (
          <button
            onClick={() => setShowFullLeaderboard(true)}
            className="w-full px-4 py-2.5 rounded-lg border border-purple-400/40 bg-purple-500/10 text-purple-200 text-sm font-semibold hover:bg-purple-500/20 transition-all flex items-center justify-center gap-2"
          >
            View All 100 <ArrowRight size={16} />
          </button>
        )}
      </section>

      {/* ── RWA EDUCATION SECTION ─────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-cyan-300" />
          <h2 className="text-lg font-bold text-slate-100">RWA Asset Classes</h2>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Abraxas tokenizes Real-World Assets — institutional-grade holdings brought on-chain. Each class represents a real economic opportunity with transparent, verifiable metrics.
        </p>

        <div className="space-y-2">
          {RWA_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-3 hover:border-cyan-400/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{asset.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-100 text-sm mb-1">
                    {asset.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                    {asset.description}
                  </p>
                  <p className="text-xs text-cyan-300/70 font-mono tracking-wide">
                    {asset.allocation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10% ALLOCATION BANNER ─────────────────────────────── */}
      <section className="rounded-lg border border-emerald-400/40 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 p-4 space-y-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-emerald-300" />
          <h3 className="text-sm font-bold text-emerald-100">10% $ABRA Allocation</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Active creators, community leaders, and top 100 participants in the Species Awakening campaign earn from the
          <span className="text-emerald-300 font-semibold"> 10% $ABRA airdrop pool</span>.
        </p>

        <p className="text-xs text-emerald-400/80 font-semibold">
          📊 Distribution based on: Quest completion • Referrals • Community engagement • RWA education
        </p>
      </section>

      {/* ── CALL TO ACTION ────────────────────────────────────── */}
      <section className="rounded-lg border border-purple-400/50 bg-gradient-to-br from-purple-900/40 to-slate-900/30 p-4 text-center space-y-3 backdrop-blur-sm">
        <h3 className="text-sm font-bold text-purple-100">Ready to Awaken?</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          The Species Awakening is a collaborative journey. Complete quests, help others, and rise through the ranks to claim your place in the Abraxas ecosystem.
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-purple-400/60 bg-purple-500/25 text-purple-200 text-sm font-bold hover:bg-purple-500/35 transition-all"
        >
          Learn More <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
}
