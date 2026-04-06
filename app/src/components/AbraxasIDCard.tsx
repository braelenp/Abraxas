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
      <div className="relative w-full max-w-sm mx-auto perspective">
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

          <div className="relative p-6 z-10">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-xs tracking-widest text-cyan-400 font-mono uppercase mb-2">
                Abraxas Protocol
              </div>
              <div className="font-mono text-sm font-bold text-purple-300">
                ID CARD • v1.0
              </div>
            </div>

            {/* Rune - Central Focus */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Glow rings */}
                <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-50 animate-pulse" />
                <div className="absolute inset-0 blur-md bg-purple-500/30 animate-pulse animation-delay-300" />

                {/* Rune text */}
                <div className="relative text-8xl text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-orange-300 bg-clip-text font-bold drop-shadow-lg">
                  {profile.rune}
                </div>
              </div>
            </div>

            {/* ID Information */}
            <div className="space-y-3 mb-6 border-t border-b border-cyan-500/30 py-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-cyan-400 uppercase tracking-widest font-mono">
                  ID
                </span>
                <span className="text-sm font-mono font-bold text-purple-300">
                  {profile.abraxasId}
                </span>
              </div>

              <div>
                <span className="text-xs text-cyan-400 uppercase tracking-widest font-mono block mb-1">
                  Blessing
                </span>
                <p className="text-xs text-slate-300 italic font-light leading-relaxed">
                  {profile.blessing}
                </p>
              </div>

              {profile.username && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-cyan-400 uppercase tracking-widest font-mono">
                    Username
                  </span>
                  <span className="text-sm text-purple-200">{profile.username}</span>
                </div>
              )}
            </div>

            {/* Airdrop Points */}
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded border border-purple-500/30 p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-purple-300 uppercase tracking-widest font-mono">
                  Airdrop Points
                </span>
                <span className="text-lg font-bold text-orange-300">
                  {profile.airdropPoints.total}
                </span>
              </div>

              {/* Points breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-slate-400">
                  <span className="text-cyan-400">Profile:</span> {profile.airdropPoints.profileCreation}
                </div>
                <div className="text-slate-400">
                  <span className="text-cyan-400">Shares:</span> {profile.airdropPoints.cardShares}
                </div>
                <div className="text-slate-400">
                  <span className="text-cyan-400">Referrals:</span>{' '}
                  {profile.airdropPoints.referralSuccess}
                </div>
                <div className="text-slate-400">
                  <span className="text-cyan-400">Engagement:</span>{' '}
                  {profile.airdropPoints.communityEngagement}
                </div>
              </div>
            </div>

            {/* Referral Info */}
            {profile.successfulReferrals > 0 && (
              <div className="text-center text-xs text-slate-400 mb-4">
                <span className="text-green-400 font-bold">{profile.successfulReferrals}</span>{' '}
                successful referral{profile.successfulReferrals !== 1 ? 's' : ''}
              </div>
            )}

            {/* Footer message */}
            <div className="text-center text-xs text-slate-500 italic">
              Making DeFi Great Again ✨
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full-size card
  return (
    <div className="relative w-full max-w-2xl mx-auto perspective">
      {/* Outer glow effect */}
      <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500/40 via-cyan-500/40 to-orange-500/40 rounded-2xl -z-10" />

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-2xl border-2 border-cyan-500/50 overflow-hidden shadow-2xl">
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

        <div className="relative p-12 z-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-sm tracking-widest text-cyan-400 font-mono uppercase">
              Abraxas Protocol Genesis
            </div>
            <div className="font-mono text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-orange-300 bg-clip-text">
              IDENTIFICATION CARD
            </div>
            <div className="text-xs text-slate-400">v1.0 • Sharathon Campaign</div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left: Rune */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="relative mb-4">
                {/* Multiple glow layers */}
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 opacity-60 animate-pulse" />
                <div className="absolute inset-0 blur-xl bg-purple-500/40 animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="absolute inset-0 blur-md bg-cyan-500/30 animate-pulse" style={{ animationDelay: '0.6s' }} />

                <div className="relative text-9xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-orange-300 bg-clip-text drop-shadow-2xl">
                  {profile.rune}
                </div>
              </div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                Elder Futhark
              </div>
            </div>

            {/* Center: ID Information */}
            <div className="col-span-1 space-y-6 border-l border-r border-cyan-500/20">
              <div className="px-6">
                <div className="text-xs text-cyan-400 uppercase tracking-widest font-mono mb-2">
                  Abraxas ID
                </div>
                <div className="font-mono text-2xl font-bold text-purple-300">
                  {profile.abraxasId}
                </div>
              </div>

              <div className="border-t border-cyan-500/20 px-6 pt-6">
                <div className="text-xs text-cyan-400 uppercase tracking-widest font-mono mb-2">
                  Blessing
                </div>
                <p className="text-sm text-slate-300 italic font-light leading-relaxed">
                  "{profile.blessing}"
                </p>
              </div>

              {profile.username && (
                <div className="border-t border-cyan-500/20 px-6 pt-6">
                  <div className="text-xs text-cyan-400 uppercase tracking-widest font-mono mb-1">
                    Username
                  </div>
                  <div className="text-sm font-mono text-purple-200">
                    @{profile.username}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Points & Dates */}
            <div className="col-span-1 space-y-4">
              <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded border border-purple-500/40 p-4">
                <div className="text-xs text-purple-300 uppercase tracking-widest font-mono mb-3">
                  Airdrop Points
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="text-4xl font-bold text-orange-300">
                    {profile.airdropPoints.total}
                  </div>
                  <div className="text-xs text-slate-400">/ 500</div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-700 rounded h-2 overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
                    style={{
                      width: `${Math.min((profile.airdropPoints.total / 500) * 100, 100)}%`,
                    }}
                  />
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Profile:</span>
                    <span className="text-cyan-300">{profile.airdropPoints.profileCreation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shares:</span>
                    <span className="text-cyan-300">{profile.airdropPoints.cardShares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Referrals:</span>
                    <span className="text-cyan-300">{profile.airdropPoints.referralSuccess}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement:</span>
                    <span className="text-cyan-300">
                      {profile.airdropPoints.communityEngagement}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="text-xs text-slate-500 space-y-1">
                <div>
                  <span className="text-slate-600">Created:</span>{' '}
                  {new Date(profile.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-slate-600">Referrals:</span> {profile.successfulReferrals}
                </div>
              </div>
            </div>
          </div>

          {/* Referral Section */}
          {showReferralLink && (
            <div className="border-t border-cyan-500/20 pt-6">
              <div className="text-xs text-cyan-400 uppercase tracking-widest font-mono mb-3">
                Your Referral Link
              </div>
              <div className="bg-slate-950 rounded border border-slate-700 p-3 font-mono text-xs text-slate-300 break-all mb-3">
                {referralLink}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyReferralLink}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600/50 hover:bg-purple-600 border border-purple-500/50 rounded text-xs text-purple-200 transition"
                >
                  <Copy size={14} />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                {onShare && (
                  <button
                    onClick={onShare}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-600/50 hover:bg-cyan-600 border border-cyan-500/50 rounded text-xs text-cyan-200 transition"
                  >
                    <Share2 size={14} />
                    Share
                  </button>
                )}
                <button
                  onClick={downloadCard}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-orange-600/50 hover:bg-orange-600 border border-orange-500/50 rounded text-xs text-orange-200 transition"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-cyan-500/20 pt-6 text-center space-y-2">
            <div className="text-sm text-slate-400">
              Making DeFi Great Again 🔮✨
            </div>
            <div className="text-xs text-slate-600 font-mono">
              This card is your proof of participation in the Abraxas Sharathon Campaign
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
