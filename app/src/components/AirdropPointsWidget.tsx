/**
 * Airdrop Points Widget
 * - Display current points total
 * - Show breakdown by category
 * - Progress toward airdrop threshold
 * - Claim status
 */

import { TrendingUp, Gift, Users, Share2, Zap } from 'lucide-react';
import { useAirdropPoints } from '../hooks/useProfile';
import { calculateAirdropProgress } from '../lib/profileUtils';

interface AirdropPointsWidgetProps {
  compact?: boolean;
  showClaim?: boolean;
  onClaimClick?: () => void;
}

const AIRDROP_THRESHOLD = 500;
const ESTIMATED_AIRDROP_VALUE = 1000; // $1000 ABRA

export function AirdropPointsWidget({
  compact = false,
  showClaim = true,
  onClaimClick,
}: AirdropPointsWidgetProps) {
  const { currentPoints, pointsBreakdown } = useAirdropPoints();

  if (!pointsBreakdown) {
    return null;
  }

  const progress = calculateAirdropProgress(currentPoints, AIRDROP_THRESHOLD);
  const estimatedValue = (currentPoints / AIRDROP_THRESHOLD) * ESTIMATED_AIRDROP_VALUE;

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gift size={18} className="text-orange-400" />
            <span className="text-sm font-bold text-slate-300">Airdrop Points</span>
          </div>
          <span className="text-2xl font-bold text-orange-300">{currentPoints}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-400">
          <span>{currentPoints} / 500</span>
          <span>{progress.percentage.toFixed(0)}%</span>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="text-slate-400">
            Profile: <span className="text-cyan-400">{pointsBreakdown.profileCreation}</span>
          </div>
          <div className="text-slate-400">
            Shares: <span className="text-cyan-400">{pointsBreakdown.cardShares}</span>
          </div>
          <div className="text-slate-400">
            Referrals: <span className="text-cyan-400">{pointsBreakdown.referralSuccess}</span>
          </div>
          <div className="text-slate-400">
            Other: <span className="text-cyan-400">{pointsBreakdown.communityEngagement}</span>
          </div>
        </div>

        {showClaim && progress.isEligible && (
          <button
            onClick={onClaimClick}
            className="w-full mt-4 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-bold rounded transition"
          >
            Eligible to Claim
          </button>
        )}

        {!progress.isEligible && (
          <p className="mt-2 text-xs text-slate-500 text-center">
            {progress.remaining} more points needed
          </p>
        )}
      </div>
    );
  }

  // Full-size widget
  return (
    <div className="space-y-6">
      {/* Main Points Display */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {/* Total Points */}
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-lg border border-orange-500/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-orange-400" />
            <span className="text-xs text-orange-300 uppercase tracking-widest font-mono">
              Total Points
            </span>
          </div>
          <div className="text-4xl font-bold text-orange-300">{currentPoints}</div>
          <div className="text-xs text-slate-500 mt-1">
            {progress.remaining} to threshold
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/10 rounded-lg border border-purple-500/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={20} className="text-purple-400" />
            <span className="text-xs text-purple-300 uppercase tracking-widest font-mono">
              Progress
            </span>
          </div>
          <div className="text-4xl font-bold text-purple-300">
            {progress.percentage.toFixed(0)}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {progress.isEligible ? '✓ Eligible' : 'In progress'}
          </div>
        </div>

        {/* Estimated Value */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-lg border border-green-500/30 p-4 md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Gift size={20} className="text-green-400" />
            <span className="text-xs text-green-300 uppercase tracking-widest font-mono">
              Est. Airdrop
            </span>
          </div>
          <div className="text-4xl font-bold text-green-300">
            ${estimatedValue.toFixed(0)}
          </div>
          <div className="text-xs text-slate-500 mt-1">ABRA value</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-400">Progress to Airdrop</span>
          <span className="text-sm font-bold text-orange-300">
            {currentPoints} / {AIRDROP_THRESHOLD}
          </span>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 transition-all duration-300 shadow-lg shadow-purple-500/50"
            style={{ width: `${Math.min(progress.percentage, 100)}%` }}
          />
        </div>

        {progress.isEligible && (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <span>✓</span>
            <span>You're eligible to claim your airdrop!</span>
          </div>
        )}
      </div>

      {/* Breakdown Grid */}
      <div>
        <h3 className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-widest">
          Points Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Profile Creation */}
          <div className="bg-slate-950/50 rounded border border-slate-700 p-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-cyan-500/10 rounded">
                <Users size={18} className="text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Profile Creation</div>
                <div className="text-xs text-slate-500 mt-1">
                  Created your Abraxas identity
                </div>
                <div className="text-lg font-bold text-cyan-300 mt-2">
                  +{pointsBreakdown.profileCreation}
                </div>
              </div>
            </div>
          </div>

          {/* Card Shares */}
          <div className="bg-slate-950/50 rounded border border-slate-700 p-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 rounded">
                <Share2 size={18} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Card Shares</div>
                <div className="text-xs text-slate-500 mt-1">
                  Shared your ID card with others
                </div>
                <div className="text-lg font-bold text-purple-300 mt-2">
                  +{pointsBreakdown.cardShares}
                </div>
              </div>
            </div>
          </div>

          {/* Referral Success */}
          <div className="bg-slate-950/50 rounded border border-slate-700 p-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500/10 rounded">
                <TrendingUp size={18} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Referral Success</div>
                <div className="text-xs text-slate-500 mt-1">
                  Successful referrals and signups
                </div>
                <div className="text-lg font-bold text-orange-300 mt-2">
                  +{pointsBreakdown.referralSuccess}
                </div>
              </div>
            </div>
          </div>

          {/* Community Engagement */}
          <div className="bg-slate-950/50 rounded border border-slate-700 p-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/10 rounded">
                <Gift size={18} className="text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Engagement</div>
                <div className="text-xs text-slate-500 mt-1">
                  Community interactions & activities
                </div>
                <div className="text-lg font-bold text-green-300 mt-2">
                  +{pointsBreakdown.communityEngagement}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-slate-950/50 rounded border border-cyan-500/20 p-4">
        <div className="text-sm text-slate-300 space-y-2">
          <p>
            💎 <span className="text-cyan-400 font-bold">Sharathon Airdrop Program:</span>
          </p>
          <ul className="ml-5 space-y-1 text-slate-400">
            <li>• Earn points by participating in the Sharathon campaign</li>
            <li>• Reach 500 points to become eligible for the airdrop</li>
            <li>• Claim your $ABRA from the World Labs Treasury</li>
            <li>• Campaign ends in 30 days - maximum rewards distributed</li>
          </ul>
        </div>
      </div>

      {/* Claim Button */}
      {showClaim && (
        <button
          onClick={onClaimClick}
          disabled={!progress.isEligible}
          className={`w-full py-4 px-4 rounded-lg font-bold text-lg transition ${
            progress.isEligible
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/50'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          {progress.isEligible
            ? '🎉 Claim Your Airdrop'
            : `Earn ${progress.remaining} more points to claim`}
        </button>
      )}
    </div>
  );
}
