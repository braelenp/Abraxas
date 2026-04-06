/**
 * Referral Leaderboard Component
 * - Display top referrers
 * - Show personal ranking
 * - Track referral stats
 */

import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';
import { useAirdropLeaderboard } from '../hooks/useProfile';
import { useUserProfile } from '../hooks/useProfile';

interface ReferralLeaderboardProps {
  compact?: boolean;
  showPersonalRank?: boolean;
  limit?: number;
}

export function ReferralLeaderboard({
  compact = false,
  showPersonalRank = true,
  limit = 10,
}: ReferralLeaderboardProps) {
  const { leaderboard } = useAirdropLeaderboard();
  const { profile } = useUserProfile();

  const topEntries = leaderboard.slice(0, limit);
  const personalRank = leaderboard.find(
    (entry) => entry.walletAddress === profile?.walletAddress
  );

  const getRankMedal = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (
    rank: number
  ): string => {
    if (rank === 1) return 'from-yellow-600 to-yellow-700 border-yellow-500/50';
    if (rank === 2) return 'from-slate-500 to-slate-600 border-slate-400/50';
    if (rank === 3) return 'from-orange-700 to-orange-800 border-orange-500/50';
    return 'from-slate-700 to-slate-800 border-slate-500/30';
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
            Top Referrers
          </h3>
          <Trophy size={16} className="text-yellow-400" />
        </div>

        {topEntries.slice(0, 5).map((entry) => (
          <div
            key={entry.walletAddress}
            className="flex items-center justify-between bg-slate-950/50 p-2 rounded border border-slate-700"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-lg font-bold w-8 text-center">
                {getRankMedal(entry.rank)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-mono text-slate-300 truncate">
                  {entry.walletAddress.slice(0, 6)}...
                  {entry.walletAddress.slice(-4)}
                </div>
                <div className="text-xs text-slate-500">
                  {entry.successfulReferrals} referral{entry.successfulReferrals !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-orange-300">
                {entry.totalPoints}
              </div>
              <div className="text-xs text-slate-500">pts</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Full leaderboard
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-1">Sharathon Leaderboard</h2>
          <p className="text-sm text-slate-400">
            Top performers in the referral campaign
          </p>
        </div>
        <Trophy className="text-yellow-400" size={32} />
      </div>

      {/* Personal Rank (if applicable) */}
      {showPersonalRank && personalRank && (
        <div className="bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-lg border-2 border-purple-500/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star size={24} className="text-purple-400" />
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">
                  Your Position
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  #{personalRank.rank} • {personalRank.totalPoints} points
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 mb-1">Successful Referrals</div>
              <div className="text-3xl font-bold text-cyan-300">
                {personalRank.successfulReferrals}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="grid grid-cols-1 gap-2">
        {topEntries.map((entry, index) => (
          <div
            key={entry.walletAddress}
            className={`bg-gradient-to-r ${getRankColor(entry.rank)} rounded-lg border p-4 transition hover:scale-105 transform ${
              entry.walletAddress === profile?.walletAddress
                ? 'ring-2 ring-purple-400'
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Rank & Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-10">
                  {entry.rank <= 3 ? (
                    <span className="text-3xl">{getRankMedal(entry.rank)}</span>
                  ) : (
                    <div className="text-2xl font-bold text-white">
                      #{entry.rank}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* Rune */}
                  <div className="text-3xl drop-shadow-lg">{entry.rune}</div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-mono text-sm font-bold text-white">
                        {entry.abraxasId}
                      </div>
                      {entry.rank <= 3 && (
                        <Medal size={14} className="text-orange-200" />
                      )}
                    </div>

                    <div className="text-xs text-slate-200 opacity-90">
                      {entry.walletAddress && (
                        <>
                          {entry.walletAddress.slice(0, 6)}...
                          {entry.walletAddress.slice(-4)}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right ml-4">
                <div className="mb-1">
                  <div className="text-xs text-slate-200 opacity-75 mb-1">
                    AIRDROP PTS
                  </div>
                  <div className="text-3xl font-bold text-white drop-shadow">
                    {entry.totalPoints}
                  </div>
                </div>

                <div className="bg-black/20 rounded px-3 py-1 mt-2">
                  <div className="text-xs text-slate-200 opacity-75">
                    {entry.successfulReferrals} referral{entry.successfulReferrals !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 bg-black/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white/30 to-white/50 transition-all duration-300"
                style={{ width: `${Math.min((entry.totalPoints / 500) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-slate-950/50 rounded border border-cyan-500/20 p-4 space-y-2">
        <div className="flex items-start gap-2">
          <TrendingUp size={18} className="text-cyan-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-slate-300">
            <p className="font-bold text-cyan-400 mb-1">How to Climb the Leaderboard:</p>
            <ul className="space-y-1 text-slate-400">
              <li>• Share your ID card: +10 points per share</li>
              <li>• Successful referral signups: +50 points each</li>
              <li>• Referral staking participation: +150 bonus points</li>
              <li>• Community engagement: +5 points each action</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Total Stats */}
      {leaderboard.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-950/50 rounded border border-slate-700 p-3 text-center">
            <div className="text-2xl font-bold text-cyan-300">
              {leaderboard.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Participants
            </div>
          </div>
          <div className="bg-slate-950/50 rounded border border-slate-700 p-3 text-center">
            <div className="text-2xl font-bold text-orange-300">
              {leaderboard.reduce((sum, e) => sum + e.totalPoints, 0)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Total Points
            </div>
          </div>
          <div className="bg-slate-950/50 rounded border border-slate-700 p-3 text-center">
            <div className="text-2xl font-bold text-green-300">
              {(leaderboard.reduce((sum, e) => sum + e.successfulReferrals, 0))}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Total Referrals
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
