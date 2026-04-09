/**
 * Abraxas ID Card Component
 * High-tech holographic ID card with:
 * - Sequential ID number
 * - Elder Futhark rune with glow effect
 * - Personalized blessing
 * - Airdrop points tracking
 * - Referral QR/link generation
 */

import { Share2, Copy, Download } from 'lucide-react';
import type { UserProfile } from '../lib/types';
import { createReferralLink } from '../lib/profileUtils';
import { useState } from 'react';

interface AbraxasIDCardProps {
  profile: UserProfile;
  onShare?: () => void;
  compact?: boolean;
  showReferralLink?: boolean;
}

export function AbraxasIDCard({
  profile,
  onShare,
  compact = false,
  showReferralLink = false,
}: AbraxasIDCardProps) {
  const [copied, setCopied] = useState(false);

  const referralLink = createReferralLink(
    profile.abraxasId,
    profile.rune,
    profile.referralCode,
  );

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCard = () => {
    // In production, use html2canvas or similar to generate image
    console.log('Downloading ID card...');
  };

  if (compact) {
    return (
      <div className="relative w-full max-w-md mx-auto">
        {/* Outer glow effect */}
        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-orange-500/30 rounded-xl -z-10" />

        {/* Card */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-xl border border-cyan-500/50 overflow-hidden shadow-2xl">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-repeat"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.5) 4px)',
            }}
          />

          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(0deg, transparent 24%, rgba(255, 0, 255, 0.1) 25%, rgba(255, 0, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, 0.1) 75%, rgba(255, 0, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px',
            }}
          />

          <div className="relative p-6 z-10 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2 pb-4 border-b border-cyan-500/30">
              <div className="text-xs tracking-widest text-cyan-400 font-mono uppercase">Abraxas Protocol</div>
              <div className="font-mono text-lg font-bold text-purple-300">ID CARD</div>
            </div>

            {/* Rune Section */}
            <div className="flex justify-center py-4">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-50 animate-pulse" />
                <div className="absolute inset-0 blur-md bg-purple-500/30 animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="relative text-7xl text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-orange-300 bg-clip-text font-bold drop-shadow-lg">
                  {profile.rune}
                </div>
              </div>
            </div>
            <div className="text-center text-xs text-slate-400 font-mono">Elder Futhark</div>

            {/* ID Information */}
            <div className="space-y-4 pb-4 border-b border-cyan-500/30">
              <div className="bg-slate-950/60 rounded p-3">
                <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono mb-1">ID</div>
                <div className="font-mono text-sm font-bold text-purple-300 truncate">{profile.abraxasId}</div>
              </div>
              {profile.username && (
                <div className="bg-slate-950/60 rounded p-3">
                  <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono mb-1">Username</div>
                  <div className="text-sm font-mono text-purple-200 truncate">@{profile.username}</div>
                </div>
              )}
            </div>

            {/* Blessing */}
            <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 rounded p-3 border border-purple-500/25 text-center py-4">
              <p className="text-xs text-slate-300 italic leading-relaxed">"{profile.blessing}"</p>
            </div>

            {/* Points */}
            <div className="bg-gradient-to-br from-orange-900/40 to-orange-900/10 rounded p-3 border border-orange-500/40">
              <div className="text-xs text-orange-300 uppercase tracking-wider font-mono mb-2">Total Airdrop Points</div>
              <div className="text-4xl font-black text-orange-300">{profile.airdropPoints.total}</div>
            </div>

            {/* Referrals */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/10 rounded p-3 border border-cyan-500/40">
              <div className="text-xs text-cyan-300 uppercase tracking-wider font-mono mb-2">Successful Referrals</div>
              <div className="text-4xl font-black text-cyan-300">{profile.successfulReferrals}</div>
            </div>

            {/* Member Date */}
            <div className="text-xs text-slate-500 text-center py-3 border-t border-cyan-500/30">
              Member Since: {new Date(profile.createdAt).toLocaleDateString()}
            </div>

            {/* Academy Whitelist Badge */}
            {profile.academyWhitelisted && (
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 rounded p-3 border border-purple-500/50 text-center space-y-1">
                <div className="text-xs text-purple-300 uppercase tracking-wider font-mono font-bold">✦ Academy Whitelisted ✦</div>
                <div className="text-xs text-purple-300/70">Early Adopter • Exclusive Access</div>
                {profile.whitelistEnrolledAt && (
                  <div className="text-xs text-purple-300/50 mt-1">
                    Enrolled: {new Date(profile.whitelistEnrolledAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            )}

            {/* Points Breakdown */}
            <div className="bg-slate-950/60 rounded p-4 border border-slate-700/50 space-y-3">
              <div className="text-cyan-300 uppercase tracking-wider font-mono text-xs">Points Breakdown</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Profile Creation:</span>
                  <span className="text-cyan-300 font-semibold">{profile.airdropPoints.profileCreation}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Card Shares:</span>
                  <span className="text-cyan-300 font-semibold">{profile.airdropPoints.cardShares}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Referral Success:</span>
                  <span className="text-cyan-300 font-semibold">{profile.airdropPoints.referralSuccess}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Community Engagement:</span>
                  <span className="text-cyan-300 font-semibold">{profile.airdropPoints.communityEngagement}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-cyan-500/30 pt-4 text-center">
              <div className="text-xs font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
                Making DeFi Great Again ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full-size card
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Outer glow effect */}
      <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-orange-500/40 rounded-2xl -z-10" />

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-2xl border-2 border-cyan-500/60 overflow-hidden shadow-2xl">
        {/* Scanline effect overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5 bg-repeat"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.5) 4px)',
          }}
        />

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255, 0, 255, 0.1) 25%, rgba(255, 0, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, 0.1) 75%, rgba(255, 0, 255, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 space-y-4 p-6">
          {/* Header Section */}
          <div className="text-center space-y-2 pb-3 border-b border-cyan-500/30">
            <div className="text-xs tracking-widest text-purple-400 font-mono uppercase">Abraxas Protocol</div>
            <div className="font-mono text-2xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-orange-300 bg-clip-text">
              ID CARD v1.0
            </div>
          </div>

          {/* Rune Section */}
          <div className="flex justify-center py-3">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 opacity-70 animate-pulse" />
              <div className="absolute inset-0 blur-2xl bg-purple-500/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="relative text-7xl font-black text-transparent bg-gradient-to-b from-cyan-300 via-purple-400 to-orange-300 bg-clip-text">
                {profile.rune}
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-slate-400 font-mono -mt-2">Elder Futhark Rune</div>

          {/* ID Information */}
          <div className="space-y-2 py-3 border-t border-b border-cyan-500/30">
            <div className="bg-slate-950/60 rounded p-2">
              <div className="text-xs text-cyan-400 uppercase tracking-widest font-mono">Abraxas ID</div>
              <div className="font-mono text-lg font-bold text-purple-300 truncate">{profile.abraxasId}</div>
            </div>
            {profile.username && (
              <div className="bg-slate-950/60 rounded p-2">
                <div className="text-xs text-cyan-400 uppercase tracking-widest font-mono">Username</div>
                <div className="text-sm font-mono text-purple-200 truncate">@{profile.username}</div>
              </div>
            )}
          </div>

          {/* Blessing */}
          <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 rounded p-3 border border-purple-500/30 text-center">
            <p className="text-sm text-slate-200 italic leading-relaxed">"{profile.blessing}"</p>
          </div>

          {/* Points & Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-orange-900/40 to-orange-900/10 rounded p-3 border border-orange-500/40">
              <div className="text-xs text-orange-300 uppercase tracking-wider font-mono">Airdrop</div>
              <div className="text-3xl font-black text-orange-300">{profile.airdropPoints.total}</div>
              <div className="text-xs text-slate-500">of 500</div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/10 rounded p-3 border border-cyan-500/40">
              <div className="text-xs text-cyan-300 uppercase tracking-wider font-mono">Referrals</div>
              <div className="text-3xl font-black text-cyan-300">{profile.successfulReferrals}</div>
              <div className="text-xs text-slate-500">successful</div>
            </div>
          </div>

          {/* Member Info */}
          <div className="text-xs text-slate-500 text-center space-y-1 py-2 border-t border-cyan-500/30">
            <div>Member Since: {new Date(profile.createdAt).toLocaleDateString()}</div>
            <div>Sharathon Participant</div>
          </div>

          {/* Points Breakdown - Compact */}
          <div className="bg-slate-950/60 rounded p-3 border border-slate-700/50 text-xs space-y-1">
            <div className="text-cyan-300 uppercase tracking-wider font-mono mb-2">Points</div>
            <div className="flex justify-between text-slate-400">
              <span>Profile:</span>
              <span className="text-cyan-300">{profile.airdropPoints.profileCreation}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Shares:</span>
              <span className="text-cyan-300">{profile.airdropPoints.cardShares}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Referrals:</span>
              <span className="text-cyan-300">{profile.airdropPoints.referralSuccess}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Engagement:</span>
              <span className="text-cyan-300">{profile.airdropPoints.communityEngagement}</span>
            </div>
          </div>

          {/* Referral Section */}
          {showReferralLink && (
            <div className="border-t border-cyan-500/30 pt-3 space-y-2">
              <div className="text-xs text-cyan-400 uppercase tracking-widest font-mono">Referral Link</div>
              <div className="bg-slate-950/80 rounded border border-slate-700 p-2 font-mono text-xs text-slate-300 break-all max-h-16 overflow-y-auto">
                {referralLink}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={copyReferralLink}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-purple-600/70 to-purple-700/70 hover:from-purple-600 hover:to-purple-700 border border-purple-500/60 rounded text-xs text-purple-200 font-semibold transition"
                >
                  <Copy size={14} />
                  {copied ? 'Copied' : 'Copy'}
                </button>
                {onShare && (
                  <button
                    onClick={onShare}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-cyan-600/70 to-cyan-700/70 hover:from-cyan-600 hover:to-cyan-700 border border-cyan-500/60 rounded text-xs text-cyan-200 font-semibold transition"
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                )}
                <button
                  onClick={downloadCard}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-orange-600/70 to-orange-700/70 hover:from-orange-600 hover:to-orange-700 border border-orange-500/60 rounded text-xs text-orange-200 font-semibold transition"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-cyan-500/30 pt-3 text-center space-y-1">
            <div className="text-xs font-bold text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text">
              Making DeFi Great Again 🔮
            </div>
            <div className="text-xs text-slate-600 font-mono leading-tight">
              Cryptographic proof of Sharathon participation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
