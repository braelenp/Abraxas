/**
 * Profile Page - Complete user profile management
 * - Display Abraxas ID card
 * - Airdrop points tracking
 * - Referral system
 * - Leaderboard
 * - Share functionality
 */

import { Share2, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUserProfile, useReferrals, useAirdropPoints } from '../hooks/useProfile';
import { AbraxasIDCard } from '../components/AbraxasIDCard';
import { AirdropPointsWidget } from '../components/AirdropPointsWidget';
import { ReferralLeaderboard } from '../components/ReferralLeaderboard';
import { createReferralLink } from '../lib/profileUtils';

export function ProfilePage() {
  const { publicKey } = useWallet();
  const { profile } = useUserProfile();
  const { referralCode } = useReferrals();
  const { currentPoints } = useAirdropPoints();

  const [activeTab, setActiveTab] = useState<'card' | 'points' | 'referrals' | 'leaderboard'>(
    'card'
  );
  const [copied, setCopied] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="mx-auto text-purple-400 animate-spin" size={48} />
          <h1 className="text-2xl font-bold text-slate-300">
            Create your profile to get started
          </h1>
          <p className="text-slate-500">
            No profile found. Please create one to participate in the Sharathon.
          </p>
        </div>
      </div>
    );
  }

  const referralLink = createReferralLink(profile.abraxasId, profile.rune, referralCode);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = `I just joined the Abraxas Sharathon Campaign! 🔮✨

ID: ${profile.abraxasId}
Rune: ${profile.rune}
Points: ${currentPoints}

"${profile.blessing}"

Join me and earn points: ${referralLink}

Making DeFi Great Again 🚀`;

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const shareOnDiscord = () => {
    const text = `**Abraxas Sharathon Profile**\n\n**ID:** ${profile.abraxasId}\n**Rune:** ${profile.rune}\n**Points:** ${currentPoints}\n\n_"${profile.blessing}"_\n\nJoin me:\n${referralLink}`;
    // Copy to clipboard with Discord formatting
    navigator.clipboard.writeText(text);
    setShareMessage('Discord-formatted message copied!');
    setTimeout(() => setShareMessage(''), 2000);
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/50 to-slate-900/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{profile.rune}</div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {profile.username || 'Abraxas User'}
                </h1>
                <p className="text-sm text-slate-400 font-mono">{profile.abraxasId}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-orange-300">{currentPoints}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">
                Airdrop Points
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-cyan-500/20 bg-slate-900/30 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {['card', 'points', 'referrals', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-3 text-sm font-bold uppercase tracking-widest transition border-b-2 ${
                  activeTab === tab
                    ? 'text-cyan-300 border-cyan-500'
                    : 'text-slate-400 border-transparent hover:text-slate-300'
                }`}
              >
                {tab === 'card' && 'ID Card'}
                {tab === 'points' && 'Points'}
                {tab === 'referrals' && 'Referrals'}
                {tab === 'leaderboard' && 'Leaderboard'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ID Card Tab */}
        {activeTab === 'card' && (
          <div className="space-y-8">
            <AbraxasIDCard profile={profile} showReferralLink={true} />

            {/* Share Options */}
            <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl border border-cyan-500/20 p-6 space-y-4">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Share2 size={20} />
                Share Your Profile
              </h3>

              {shareMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-green-300 text-sm">
                  ✓ {shareMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={shareOnTwitter}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-bold transition"
                >
                  <Twitter size={18} />
                  Share on Twitter
                </button>

                <button
                  onClick={shareOnDiscord}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-bold transition"
                >
                  <Discord size={18} />
                  Share on Discord
                </button>

                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-bold transition"
                >
                  <Linkedin size={18} />
                  Share on LinkedIn
                </button>

                <button
                  onClick={copyReferralLink}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-bold transition"
                >
                  <Copy size={18} />
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Points Tab */}
        {activeTab === 'points' && (
          <div>
            <AirdropPointsWidget showClaim={true} onClaimClick={() => {
              window.open('https://world-labs.xyz/claim', '_blank');
            }} />
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            {/* Referral Link Section */}
            <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl border border-cyan-500/20 p-6 space-y-4">
              <h3 className="text-lg font-bold text-cyan-300">Your Referral Link</h3>

              <div className="bg-slate-950 rounded border border-slate-700 p-4 font-mono text-xs text-slate-300 break-all">
                {referralLink}
              </div>

              <button
                onClick={copyReferralLink}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-lg text-white font-bold transition"
              >
                {copied ? '✓ Copied' : 'Copy Referral Link'}
              </button>
            </div>

            {/* Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-4">
                <div className="text-3xl font-bold text-purple-300 mb-1">
                  {profile.referralsSent}
                </div>
                <div className="text-sm text-slate-400">Invitations Sent</div>
              </div>

              <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-4">
                <div className="text-3xl font-bold text-cyan-300 mb-1">
                  {profile.successfulReferrals}
                </div>
                <div className="text-sm text-slate-400">Successful Referrals</div>
              </div>

              <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-4">
                <div className="text-3xl font-bold text-orange-300 mb-1">
                  {profile.airdropPoints.referralSuccess}
                </div>
                <div className="text-sm text-slate-400">Points from Referrals</div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-slate-950/50 rounded-lg border border-cyan-500/20 p-6 space-y-4">
              <h3 className="text-lg font-bold text-cyan-300">How Referrals Work</h3>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600/30 rounded-full flex items-center justify-center font-bold text-purple-300">
                    1
                  </div>
                  <div>
                    <p className="font-bold mb-1">Share Your Link</p>
                    <p className="text-slate-400">
                      Send your referral link to friends and community members.+10 points per share.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-600/30 rounded-full flex items-center justify-center font-bold text-cyan-300">
                    2
                  </div>
                  <div>
                    <p className="font-bold mb-1">They Sign Up</p>
                    <p className="text-slate-400">
                      Your referees create profiles using your link. +50 points per signup.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-600/30 rounded-full flex items-center justify-center font-bold text-orange-300">
                    3
                  </div>
                  <div>
                    <p className="font-bold mb-1">They Stake $ABRA</p>
                    <p className="text-slate-400">
                      Bonus +150 points when referees successfully stake. Maximum rewards!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div>
            <ReferralLeaderboard showPersonalRank={true} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-500/20 bg-slate-900/30 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3 text-sm text-slate-400">
          <p>💎 Making DeFi Great Again ✨</p>
          <p>
            This profile is uniquely yours. Your Abraxas ID and rune are permanent tokens of your
            participation in the Sharathon campaign.
          </p>
        </div>
      </div>
    </div>
  );
}

// Placeholder icons for social media
function Twitter({ size }: { size: number }) {
  return <span style={{ fontSize: size }}>𝕏</span>;
}

function Discord({ size }: { size: number }) {
  return <span style={{ fontSize: size }}>💬</span>;
}

function Linkedin({ size }: { size: number }) {
  return <span style={{ fontSize: size }}>💼</span>;
}
