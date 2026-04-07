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
      {/* Hero Header */}
      <div className="border-b border-cyan-500/30 bg-gradient-to-b from-slate-900/80 to-slate-900/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="text-5xl flex-shrink-0">{profile.rune}</div>
              <div className="min-w-0">
                <h1 className="text-3xl font-black text-white truncate">
                  {profile.username || 'Abraxas User'}
                </h1>
                <p className="text-sm text-cyan-300 font-mono mt-1">{profile.abraxasId}</p>
                {profile.blessing && (
                  <p className="text-xs text-slate-400 italic mt-2 line-clamp-1">"{profile.blessing}"</p>
                )}
              </div>
            </div>

            {/* Points Badge */}
            <div className="text-right flex-shrink-0">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-400 text-transparent bg-clip-text">
                {currentPoints}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
                ← Airdrop Points
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-[6.5rem] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto">
            {['card', 'points', 'referrals', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab
                    ? 'text-cyan-300 border-cyan-500 bg-cyan-500/10'
                    : 'text-slate-400 border-transparent hover:text-slate-300 hover:border-slate-600'
                }`}
              >
                {tab === 'card' && '✧ ID Card'}
                {tab === 'points' && '⚡ Points'}
                {tab === 'referrals' && '🔗 Referrals'}
                {tab === 'leaderboard' && '👑 Leaderboard'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ID Card Tab */}
        {activeTab === 'card' && (
          <div className="space-y-8">
            {/* Large ID Card Section */}
            <div className="bg-gradient-to-br from-purple-900/30 via-slate-900/50 to-cyan-900/30 rounded-2xl border border-cyan-500/30 p-8 backdrop-blur-sm">
              <AbraxasIDCard profile={profile} showReferralLink={true} />
            </div>

            {/* Share Options */}
            <div className="bg-gradient-to-br from-purple-500/15 to-cyan-500/15 rounded-2xl border border-cyan-500/30 p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-3 mb-2">
                  <Share2 size={24} />
                  Share Your Profile
                </h3>
                <p className="text-sm text-slate-400">Grow your network and earn bonus points</p>
              </div>

              {shareMessage && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm font-semibold flex items-center gap-2">
                  <span>✓</span> {shareMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={shareOnTwitter}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-xl text-white font-bold transition border border-slate-600/50"
                >
                  <Twitter size={20} />
                  Share on Twitter
                </button>

                <button
                  onClick={shareOnDiscord}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-xl text-white font-bold transition border border-slate-600/50"
                >
                  <Discord size={20} />
                  Share on Discord
                </button>

                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-xl text-white font-bold transition border border-slate-600/50"
                >
                  <Linkedin size={20} />
                  Share on LinkedIn
                </button>

                <button
                  onClick={copyReferralLink}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-700 to-cyan-700 hover:from-purple-600 hover:to-cyan-600 rounded-xl text-white font-bold transition border border-purple-500/50"
                >
                  <Copy size={20} />
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Points Tab */}
        {activeTab === 'points' && (
          <div className="bg-gradient-to-br from-purple-900/30 via-slate-900/50 to-cyan-900/30 rounded-2xl border border-cyan-500/30 p-8">
            <AirdropPointsWidget showClaim={true} onClaimClick={() => {
              window.open('https://world-labs.xyz/claim', '_blank');
            }} />
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className="space-y-8">
            {/* Referral Link Section */}
            <div className="bg-gradient-to-br from-purple-900/30 via-slate-900/50 to-cyan-900/30 rounded-2xl border border-cyan-500/30 p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-cyan-300 mb-2">Your Referral Link</h3>
                <p className="text-sm text-slate-400">Share this link to bring friends into Abraxas</p>
              </div>

              <div className="bg-slate-950/60 rounded-xl border border-slate-700/50 p-4 font-mono text-xs text-slate-300 break-all backdrop-blur-sm">
                {referralLink}
              </div>

              <button
                onClick={copyReferralLink}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl text-white font-bold transition border border-purple-400/50 text-lg"
              >
                {copied ? '✓ Copied to Clipboard' : 'Copy Referral Link'}
              </button>
            </div>

            {/* Referral Stats */}
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Your Referral Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-900/40 to-purple-900/10 rounded-xl border border-purple-500/30 p-6 backdrop-blur-sm">
                  <div className="text-sm text-slate-400 uppercase tracking-wider mb-2">Invitations Sent</div>
                  <div className="text-4xl font-black text-purple-300">{profile.referralsSent}</div>
                  <div className="text-xs text-slate-500 mt-3">People invited</div>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/10 rounded-xl border border-cyan-500/30 p-6 backdrop-blur-sm">
                  <div className="text-sm text-slate-400 uppercase tracking-wider mb-2">Successful Referrals</div>
                  <div className="text-4xl font-black text-cyan-300">{profile.successfulReferrals}</div>
                  <div className="text-xs text-slate-500 mt-3">Signed up</div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/40 to-orange-900/10 rounded-xl border border-orange-500/30 p-6 backdrop-blur-sm">
                  <div className="text-sm text-slate-400 uppercase tracking-wider mb-2">Referral Points</div>
                  <div className="text-4xl font-black text-orange-300">{profile.airdropPoints.referralSuccess}</div>
                  <div className="text-xs text-slate-500 mt-3">Points earned</div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-100 mb-2">How Referrals Work</h3>
                <p className="text-sm text-slate-400">Maximize your earnings with every successful referral</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-slate-950/50 rounded-lg border border-slate-700/30">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center font-bold text-white text-lg">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Share Your Link</p>
                    <p className="text-sm text-slate-400">
                      Send your referral link to friends and community members. <span className="text-purple-300 font-semibold">+10 points per share</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-950/50 rounded-lg border border-slate-700/30">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center font-bold text-white text-lg">
                    2
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">They Sign Up</p>
                    <p className="text-sm text-slate-400">
                      Your referees create profiles using your link. <span className="text-cyan-300 font-semibold">+50 points per signup</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-950/50 rounded-lg border border-slate-700/30">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center font-bold text-white text-lg">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">They Stake $ABRA</p>
                    <p className="text-sm text-slate-400">
                      Bonus <span className="text-orange-300 font-semibold">+150 points</span> when referees successfully stake. Maximum rewards!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/20 rounded-2xl border border-slate-700/50 p-8">
            <ReferralLeaderboard showPersonalRank={true} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-500/30 bg-gradient-to-r from-slate-950/50 to-slate-900/30 backdrop-blur-sm py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg mb-2">
            <p className="text-sm font-mono text-purple-300">✧ ABRAXAS_PROFILE ✧</p>
          </div>
          <p className="text-sm text-slate-300 font-semibold">💎 Making DeFi Great Again ✨</p>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Your Abraxas ID and rune are permanent cryptographic tokens of your participation in the Sharathon campaign. 
            They exist forever on-chain. Your identity is sovereign.
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
