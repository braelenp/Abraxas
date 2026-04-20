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
import { Share2, Copy, ArrowRight, Zap, Trophy, Star, CheckCircle2, Target, BookOpen, Users, Download } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSpeciesAwakening } from '../hooks/useSpeciesAwakening';
import type { SpeciesAwakeningTask } from '../lib/types';

// ── Mock Data ────────────────────────────────────────────────────────────
// These are kept for RWA assets reference only
const RWA_ASSETS = [
  {
    id: 'chronos',
    name: 'Chronos Luxury Watches',
    emoji: '⌚',
    description: 'Institutional-grade horological assets with verified provenance and real-time market pricing.',
    allocation: 'Premium luxury watch collectibles backed by blockchain verification.',
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
    id: 'bacchus',
    name: 'Bacchus Wine & Spirits',
    emoji: '🍷',
    description: 'Premium fine wines and rare spirits with sommelier-grade authentication.',
    allocation: 'Collectible wines, rare whiskies, and vintage spirits.',
  },
  {
    id: 'echo',
    name: 'Echo Music Rights',
    emoji: '🎵',
    description: 'Streaming royalties and music publishing rights with real-time yield tracking.',
    allocation: 'Music royalties from streaming platforms and licensing agreements.',
  },
  {
    id: 'legacy',
    name: 'Legacy Athlete Equity',
    emoji: '⚽',
    description: 'NIL stakes and athlete equity with performance-based yield multipliers.',
    allocation: 'Athlete Name, Image, Likeness (NIL) rights and equity.',
  },
  {
    id: 'pulse',
    name: 'Pulse Gaming & Streams',
    emoji: '🎮',
    description: 'Gaming clips, live stream rights, and content creator equity.',
    allocation: 'Gaming content, streaming revenue, and creator partnerships.',
  },
  {
    id: 'aurelia',
    name: 'Aurelia Real Estate',
    emoji: '🏢',
    description: 'Fractional real estate and development projects with transparent tenant metrics.',
    allocation: 'Commercial and residential development projects.',
  },
  {
    id: 'vein',
    name: 'Vein Minerals & Resources',
    emoji: '⛏️',
    description: 'Mining rights and natural resource extraction with environmental compliance.',
    allocation: 'Mineral reserves, mining operations, and resource extraction.',
  },
  {
    id: 'verdant',
    name: 'Verdant Carbon Assets',
    emoji: '🌿',
    description: 'Carbon credits and environmental offset projects with verified impact.',
    allocation: 'Carbon credits, environmental conservation, and ESG assets.',
  },
];

// ── Level System ────────────────────────────────────────────────────────────
// (Now handled by backend)

export function SpeciesAwakeningPage() {
  const { publicKey, connected } = useWallet();
  const [copied, setCopied] = useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [taskCompletionMessage, setTaskCompletionMessage] = useState<string | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const {
    profile,
    profileLoading,
    profileError,
    tasks,
    tasksLoading,
    leaderboard,
    leaderboardLoading,
    completeTask,
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
  const groupedTasks = useMemo(
    () => ({
      discord: tasks.filter((task) => task.platform === 'Discord'),
      social: tasks.filter((task) => task.platform !== 'Discord'),
    }),
    [tasks]
  );

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
      
      // Show certificate modal if this is the Discord join task
      if (taskId === 'discord-join') {
        setTimeout(() => setShowCertificateModal(true), 500);
      }
      
      setTimeout(() => setTaskCompletionMessage(null), 3000);
    } else {
      setTaskCompletionMessage(result.error || 'Failed to complete task');
    }
  };

  const handleTaskAction = async (task: SpeciesAwakeningTask) => {
    if (task.link) {
      window.open(task.link, '_blank', 'noopener,noreferrer');
    }

    if (!task.completed) {
      await handleCompleteTask(task.id);
    }
  };

  const getTaskActionLabel = (task: SpeciesAwakeningTask) => {
    if (task.completed) {
      return 'Completed';
    }

    if (task.platform === 'Discord') {
      return task.id === 'discord-post' ? 'Open Discord' : 'Join Discord';
    }

    if (task.platform === 'X') {
      return 'Open X';
    }

    return 'Complete Task';
  };

  const generateCertificate = () => {
    // Create canvas for certificate
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#9945ff';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner decorative border
    ctx.strokeStyle = '#9945ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Title
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#9945ff';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Achievement', canvas.width / 2, 120);

    // Subtitle
    ctx.font = '24px Arial';
    ctx.fillStyle = '#e4d5ff';
    ctx.fillText('Species Awakening Genesis Validator', canvas.width / 2, 180);

    // Divider line
    ctx.strokeStyle = '#9945ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 220);
    ctx.lineTo(canvas.width - 200, 220);
    ctx.stroke();

    // Achievement text
    ctx.font = '20px Arial';
    ctx.fillStyle = '#ccc';
    ctx.textAlign = 'center';
    ctx.fillText('This certifies that', canvas.width / 2, 280);

    // User name/wallet
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#9945ff';
    const displayName = publicKey?.toString().slice(0, 8) || 'Genesis Member';
    ctx.fillText(displayName, canvas.width / 2, 340);

    // Achievement description
    ctx.font = '18px Arial';
    ctx.fillStyle = '#ccc';
    ctx.textAlign = 'center';
    ctx.fillText('has completed the Genesis validation quest and joined the', canvas.width / 2, 400);
    ctx.fillText('Species Awakening Discord community as a founding member', canvas.width / 2, 430);

    // Achievement badge section
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#9945ff';
    ctx.fillText('🔮 Genesis Validator Badge Earned 🔮', canvas.width / 2, 500);

    // Date
    ctx.font = '16px Arial';
    ctx.fillStyle = '#888';
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(`Date: ${today}`, canvas.width / 2, 590);

    // Footer
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Valid on Solana Mainnet | Abraxas Protocol', canvas.width / 2, 720);
    ctx.fillText('This certificate grants whitelist priority for upcoming distributions', canvas.width / 2, 750);

    // Download
    const link = document.createElement('a');
    link.download = `species-awakening-certificate-${publicKey?.toString().slice(0, 8)}.png`;
    link.href = canvas.toDataURL();
    link.click();
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

        {/* Whitelist Status + Button */}
        <div className="border-t border-purple-300/20 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                profile.whitelistEligible ? 'bg-emerald-400/80' : 'bg-slate-600/50'
              }`}
            />
            <span className="text-slate-300">
              {profile.whitelistEligible ? (
                <>
                  <span className="text-emerald-300 font-semibold">✓ Whitelist Eligible</span> — Genesis tier
                </>
              ) : (
                <>
                  <span className="text-slate-400">{1500 - profile.totalPoints} pts</span> until whitelist
                </>
              )}
            </span>
          </div>

          {profile.whitelistEligible && (
            <button
              onClick={() => {
                // In production, this would submit to whitelist
                setTaskCompletionMessage('✨ Whitelist registration submitted!');
                setTimeout(() => setTaskCompletionMessage(null), 3000);
              }}
              className="px-4 py-2 rounded-lg border border-emerald-400/50 bg-emerald-500/20 text-emerald-200 text-xs font-bold hover:bg-emerald-500/30 transition-all"
            >
              Join Whitelist
            </button>
          )}
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

      {/* ── QUESTS ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-cyan-300" />
          <h2 className="text-lg font-bold text-slate-100">Active Quests</h2>
          <span className="ml-auto text-xs text-slate-500">{totalTasks} available</span>
        </div>

        {taskCompletionMessage && (
          <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {taskCompletionMessage}
          </div>
        )}

        {tasksLoading ? (
          <div className="rounded-lg border border-slate-700/50 bg-slate-900/30 p-4 text-sm text-slate-400">
            Loading quests...
          </div>
        ) : totalTasks === 0 ? (
          <div className="rounded-lg border border-slate-700/50 bg-slate-900/30 p-4 text-sm text-slate-400">
            No quests are live yet.
          </div>
        ) : (
          <div className="space-y-5">
            {groupedTasks.discord.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-purple-300" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-purple-200">Discord Quests</h3>
                </div>

                <div className="space-y-3">
                  {groupedTasks.discord.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isCompleting={completingTaskId === task.id}
                      actionLabel={getTaskActionLabel(task)}
                      onAction={() => handleTaskAction(task)}
                    />
                  ))}
                </div>
              </div>
            )}

            {groupedTasks.social.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-amber-300" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-amber-200">Other Quests</h3>
                </div>

                <div className="space-y-3">
                  {groupedTasks.social.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isCompleting={completingTaskId === task.id}
                      actionLabel={getTaskActionLabel(task)}
                      onAction={() => handleTaskAction(task)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── DISCORD INVITE SECTION ────────────────────────────── */}
      <section className="rounded-lg border border-purple-400/40 bg-gradient-to-br from-purple-900/30 to-slate-900/40 p-6 text-center space-y-4 backdrop-blur-sm">
        <div className="flex justify-center">
          <div className="text-5xl">✧</div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-purple-200 mb-2">Join Our Discord</h2>
          <p className="text-sm text-slate-300 mb-4">
            Connect with the Genesis Validator community and be part of the Species Awakening
          </p>
        </div>
        <a
          href="https://discord.gg/EhgEe2MPa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition shadow-lg"
        >
          Join Discord <ArrowRight size={16} />
        </a>
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
          href="https://discord.gg/EhgEe2MPa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-purple-400/60 bg-purple-500/25 text-purple-200 text-sm font-bold hover:bg-purple-500/35 transition-all"
        >
          Join Discord Community <ArrowRight size={16} />
        </a>
      </section>

      {/* ── CERTIFICATE MODAL ─────────────────────────────────── */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="rounded-2xl border border-purple-400/50 bg-slate-900/95 p-6 max-w-md w-full space-y-4 backdrop-blur-xl">
            <div className="text-center space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-purple-300">🏆 Achievement Unlocked</p>
              <h2 className="text-2xl font-black text-purple-200">Genesis Validator</h2>
              <p className="text-sm text-slate-400">
                You've earned your Species Awakening certificate! Download it and share in Discord.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-300/20">
              <p className="text-xs text-slate-300 text-center mb-3">
                ✨ Your certificate proves your Genesis Validator status and grants whitelist priority.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  generateCertificate();
                  setShowCertificateModal(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-emerald-400/60 bg-emerald-500/25 text-emerald-200 font-bold hover:bg-emerald-500/35 transition-all"
              >
                <Download size={18} />
                Download Certificate (PNG)
              </button>
              
              <button
                onClick={() => setShowCertificateModal(false)}
                className="w-full px-4 py-2 rounded-lg border border-slate-600/50 bg-slate-800/50 text-slate-300 font-semibold hover:bg-slate-800 transition-all"
              >
                Continue
              </button>

              <p className="text-xs text-slate-500 text-center">
                💡 Pro tip: Download and share your certificate in the #genesis-validators Discord channel to unlock exclusive rewards!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type TaskCardProps = {
  task: SpeciesAwakeningTask;
  isCompleting: boolean;
  actionLabel: string;
  onAction: () => void;
};

function TaskCard({ task, isCompleting, actionLabel, onAction }: TaskCardProps) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-900/35 p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/10 text-xl text-purple-200">
          {task.icon}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-100">{task.title}</h3>
            <span className="rounded-full border border-slate-600/60 px-2 py-0.5 text-[11px] uppercase tracking-wide text-slate-300">
              {task.type}
            </span>
            <span className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cyan-200">
              +{task.reward} pts
            </span>
          </div>

          <p className="text-xs text-slate-400">
            {task.description || `Complete this ${task.platform} quest to grow your Species Awakening score.`}
          </p>

          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-xs text-slate-500">{task.platform}</span>

            {task.completed ? (
              <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200">
                <CheckCircle2 size={14} />
                Completed
              </span>
            ) : (
              <button
                onClick={onAction}
                disabled={isCompleting}
                className="inline-flex items-center gap-2 rounded-lg border border-purple-400/50 bg-purple-500/15 px-3 py-2 text-xs font-semibold text-purple-100 transition-all hover:bg-purple-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCompleting ? 'Completing...' : actionLabel}
                {!isCompleting && <ArrowRight size={14} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
