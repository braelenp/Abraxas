/**
 * Profile Page - Redesigned for onboarding context
 * - User profile info and Abraxas ID Card
 * - Getting Started guide with links to each dApp feature
 * - Dashboard with analytics
 * - Minimal airdrop points display
 */

import { Share2, Copy, ArrowRight, TrendingUp, Lock, Zap, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserProfile, useAirdropPoints } from '../hooks/useProfile';
import { AbraxasIDCard } from '../components/AbraxasIDCard';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ABRAXAS_PLAIN_ENGLISH_EXPLAINER, ABRAXAS_PRIMARY_VALUE_PROP } from '../lib/messaging';

export function ProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  const { profile } = useUserProfile();
  const { currentPoints } = useAirdropPoints();
  const [copied, setCopied] = useState(false);

  if (!profile) {
    return (
      <div className="space-y-4 text-center py-12">
        <div className="text-4xl font-black text-purple-400">✧</div>
        <h1 className="text-2xl font-bold text-slate-300">Loading Profile...</h1>
        <p className="text-slate-500">Setting up your Abraxas experience</p>
      </div>
    );
  }

  const primarySections = [
    {
      icon: '◈',
      title: 'Dashboard',
      description: 'See your firm, gains, vault health, and tax snapshot',
      path: '/app/dashboard',
    },
    {
      icon: '◌',
      title: 'Tokenize',
      description: 'Turn an asset into a vault-ready La Casa NFT record',
      path: '/app/tokenize',
    },
    {
      icon: '◍',
      title: 'My Vaults',
      description: 'Open vaults, assign agents, and manage positions',
      path: '/app/vaults',
    },
    {
      icon: '◎',
      title: 'Agents',
      description: 'Review agent performance, protection, and execution',
      path: '/app/agents',
    },
  ];

  const secondaryTools = [
    { title: 'Legacy Forge', path: '/app/forge' },
    { title: 'Market Signals', path: '/app/market' },
    { title: 'Trade Console', path: '/app/trade' },
    { title: 'King AI', path: '/app/orion' },
    { title: 'Circuit Defense', path: '/app/circuit' },
    { title: 'Cadabra', path: '/app/cadabra' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Language Switcher */}
      <div className="flex justify-end">
        <LanguageSwitcher variant="compact" />
      </div>

      {/* Hero Section with User Info */}
      <div className="bg-gradient-to-br from-purple-900/30 via-slate-900/50 to-cyan-900/30 rounded-2xl border border-cyan-500/30 p-8 backdrop-blur-sm space-y-6">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{profile.rune}</div>
              <div>
                <h1 className="text-3xl font-black text-white">{profile.username || 'Abraxas User'}</h1>
                <p className="text-xs text-cyan-300 font-mono mt-1">{profile.abraxasId}</p>
              </div>
            </div>
            {profile.blessing && (
              <p className="text-sm text-slate-300 italic">"{profile.blessing}"</p>
            )}
          </div>
          
          {/* Quick Stats */}
          <div className="text-right space-y-2">
            <div className="text-sm text-slate-400">Member Since</div>
            <div className="text-lg font-bold text-cyan-300">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Abraxas ID Card */}
        <AbraxasIDCard profile={profile} compact={true} />
      </div>

      {/* Getting Started Guide */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-cyan-300">Explore the Four Core Sections</h2>
          <div className="text-sm text-cyan-400 font-semibold uppercase tracking-wider">Getting Started</div>
        </div>
        
        <p className="text-slate-300 text-sm">{ABRAXAS_PRIMARY_VALUE_PROP} {ABRAXAS_PLAIN_ENGLISH_EXPLAINER}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {primarySections.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => navigate(feature.path)}
              className="text-left bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-cyan-500/20 hover:border-cyan-400/50 rounded-xl p-4 transition-all hover:bg-gradient-to-br hover:from-slate-900/80 hover:to-slate-800/60 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{feature.icon}</span>
                    <h3 className="font-bold text-slate-100">{feature.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400">{feature.description}</p>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-cyan-400 transition-colors mt-1 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-700/50 bg-slate-900/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Secondary Tools</p>
          <p className="mt-2 text-xs text-slate-500">Legacy screens still exist, but they no longer occupy the main tab bar.</p>
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
            {secondaryTools.map((tool) => (
              <button
                key={tool.title}
                onClick={() => navigate(tool.path)}
                className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-100"
              >
                {tool.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard & Analytics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-cyan-300">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Assets */}
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 rounded-xl border border-purple-500/30 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Assets</p>
                <p className="text-3xl font-black text-purple-300 mt-1">$0.00</p>
              </div>
              <Lock size={24} className="text-purple-400 opacity-50" />
            </div>
            <p className="text-xs text-slate-500">Deploy assets to get started</p>
          </div>

          {/* Active Vaults */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 rounded-xl border border-cyan-500/30 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Vaults</p>
                <p className="text-3xl font-black text-cyan-300 mt-1">0</p>
              </div>
              <Zap size={24} className="text-cyan-400 opacity-50" />
            </div>
            <p className="text-xs text-slate-500">No vaults deployed yet</p>
          </div>

          {/* Total Yield */}
          <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 rounded-xl border border-orange-500/30 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Yield (30d)</p>
                <p className="text-3xl font-black text-orange-300 mt-1">$0.00</p>
              </div>
              <TrendingUp size={24} className="text-orange-400 opacity-50" />
            </div>
            <p className="text-xs text-slate-500">Yield from active vaults</p>
          </div>

          {/* Account Status */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 rounded-xl border border-emerald-500/30 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Account Status</p>
                <p className="text-xl font-black text-emerald-300 mt-1">Active</p>
              </div>
              <BarChart3 size={24} className="text-emerald-400 opacity-50" />
            </div>
            <p className="text-xs text-slate-500">Verified on-chain</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/20 rounded-2xl border border-slate-700/50 p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-100">Next Steps</h3>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold flex-shrink-0">1.</span>
            <span>Visit the <button onClick={() => navigate('/app/forge')} className="text-cyan-400 font-semibold hover:underline">Forge</button> to bring an asset into the system</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold flex-shrink-0">2.</span>
            <span>Explore <button onClick={() => navigate('/app/market')} className="text-cyan-400 font-semibold hover:underline">Market</button> to review options and pricing</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold flex-shrink-0">3.</span>
            <span>Move assets to <button onClick={() => navigate('/app/vaults')} className="text-cyan-400 font-semibold hover:underline">Vaults</button> so AI can help manage them</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-bold flex-shrink-0">4.</span>
            <span>Monitor performance and stay in control from this Dashboard</span>
          </li>
        </ul>
      </div>

      {/* Airdrop Points - Minimal Display */}
      <div className="text-center space-y-2 p-4 bg-slate-900/30 rounded-lg border border-slate-700/30">
        <p className="text-xs text-slate-500 uppercase tracking-widest">Sharathon Points</p>
        <p className="text-lg font-bold text-slate-300">{currentPoints} points</p>
        <p className="text-xs text-slate-500">Earned through participation and referrals</p>
      </div>

      {/* Referral Section - Subtle */}
      <div className="bg-slate-900/30 rounded-lg border border-slate-700/30 p-4 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <Share2 size={16} className="text-slate-400" />
          <p className="text-sm font-semibold text-slate-300">Share Your Referral Link</p>
        </div>
        <div className="bg-slate-950/60 rounded px-3 py-2 font-mono text-xs text-slate-400 truncate">
          abraxas-ten.vercel.app/?ref={profile.abraxasId}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`abraxas-ten.vercel.app/?ref=${profile.abraxasId}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="w-full px-3 py-2 bg-slate-800/50 hover:bg-slate-800 rounded text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2"
        >
          <Copy size={14} />
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
