/**
 * Creator Economy Module
 * Main integration point for TikTok Fee Sharing in Pulse/Cadabra
 */

import { useState } from 'react';
import { Music, Sparkles, Zap, Users, TrendingUp, BarChart3 } from 'lucide-react';
import { LaunchCreatorCoin } from './LaunchCreatorCoin';
import { CreatorCoinDashboard } from './CreatorCoinDashboard';
import type { CreatorMetrics } from '../lib/creatorEconomyTypes';

interface CreatorEconomyModuleProps {
  onContractInteraction?: (action: string, data: any) => void;
}

// Mock data for demonstration
const MOCK_CREATOR_METRICS: CreatorMetrics[] = [
  {
    coinAddress: 'coin_Luna_001',
    creator: {
      username: 'lunaforge',
      walletAddress: 'luna1.sol',
      displayName: 'Luna Forge',
      avatar: '🌙',
      followers: 425000,
      verified: true,
      joinedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    },
    coin: {
      id: 'coin_Luna_001',
      symbol: 'LUNA',
      name: '$LUNA Creator Coin',
      creatorUsername: 'lunaforge',
      mintAddress: 'mint_luna_abc123',
      supply: 1000000,
      decimals: 6,
      launchedAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
      description: 'Luna Forge\'s creator coin powered by Abraxas',
      imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=luna',
    },
    feeShare: {
      viewFees: 2450,
      tipFees: 3650,
      donationFees: 1820,
      nftSales: 5600,
      tokenTrades: 2100,
      totalEarned: 15620,
    },
    royaltySplit: {
      creatorShare: 0.70,
      holderShare: 0.20,
      platformShare: 0.05,
      bagsShare: 0.05,
    },
    holders: 2847,
    marketCap: 892500,
    price: 0.8925,
    volume24h: 45200,
    lastUpdated: Date.now(),
  },
  {
    coinAddress: 'coin_Nyx_001',
    creator: {
      username: 'nyx_signal',
      walletAddress: 'nyx1.sol',
      displayName: 'Nyx Signal',
      avatar: '🔮',
      followers: 287000,
      verified: true,
      joinedAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    },
    coin: {
      id: 'coin_Nyx_001',
      symbol: 'NYX',
      name: '$NYX Creator Coin',
      creatorUsername: 'nyx_signal',
      mintAddress: 'mint_nyx_def456',
      supply: 1000000,
      decimals: 6,
      launchedAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
      description: 'Nyx Signal\'s creator coin powered by Abraxas',
      imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=nyx',
    },
    feeShare: {
      viewFees: 1820,
      tipFees: 2750,
      donationFees: 1050,
      nftSales: 4200,
      tokenTrades: 1680,
      totalEarned: 11500,
    },
    royaltySplit: {
      creatorShare: 0.70,
      holderShare: 0.20,
      platformShare: 0.05,
      bagsShare: 0.05,
    },
    holders: 1920,
    marketCap: 615000,
    price: 0.615,
    volume24h: 32100,
    lastUpdated: Date.now(),
  },
];

type TabType = 'launch' | 'dashboard' | 'tokenize' | 'analytics';

export function CreatorEconomyModule({ onContractInteraction }: CreatorEconomyModuleProps) {
  const [activeTab, setActiveTab] = useState<TabType>('launch');
  const [creatorMetrics, setCreatorMetrics] = useState<CreatorMetrics[]>(MOCK_CREATOR_METRICS);
  const [showDetails, setShowDetails] = useState(false);

  const handleCoinLaunch = (coinData: any) => {
    // Add new coin to metrics
    const newMetrics: CreatorMetrics = {
      coinAddress: coinData.mintAddress,
      creator: {
        username: coinData.creator.username,
        walletAddress: 'user_wallet.sol',
        displayName: coinData.creator.displayName,
        avatar: '🎵',
        followers: coinData.creator.followers,
        verified: coinData.creator.verified,
        joinedAt: Date.now(),
      },
      coin: coinData,
      feeShare: {
        viewFees: 0,
        tipFees: 0,
        donationFees: 0,
        nftSales: 0,
        tokenTrades: 0,
        totalEarned: 0,
      },
      royaltySplit: {
        creatorShare: 0.70,
        holderShare: 0.20,
        platformShare: 0.05,
        bagsShare: 0.05,
      },
      holders: 0,
      marketCap: 0,
      price: coinData.basePrice,
      volume24h: 0,
      lastUpdated: Date.now(),
    };

    setCreatorMetrics([...creatorMetrics, newMetrics]);
    setActiveTab('dashboard');
    onContractInteraction?.('coin_launched', newMetrics);
  };

  return (
    <div className="relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 0.6; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(153, 69, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(153, 69, 255, 0.5); }
        }
        .tab-button.active {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-lg" />
            <Music size={24} className="text-purple-400 relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-300 uppercase tracking-wider">
              Creator Economy
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Launch coins, monetize content, and share fees with TikTok creators
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { icon: Sparkles, label: 'Launch Coins', desc: 'One-click creator coin' },
            { icon: Users, label: 'Fan Community', desc: 'Build holder base' },
            { icon: TrendingUp, label: 'Live Metrics', desc: 'Real-time earnings' },
            { icon: Zap, label: 'Auto Royalties', desc: 'Fee-share to wallet' },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="rounded-lg border border-purple-300/20 bg-purple-950/40 p-3 hover:border-purple-300/40 transition"
              >
                <div className="flex gap-2 items-start">
                  <Icon size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-purple-200 tracking-wider">
                      {feature.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 border-b border-purple-300/20">
        {[
          { id: 'launch' as TabType, label: 'Launch Coin', icon: Sparkles },
          { id: 'dashboard' as TabType, label: 'Dashboard', icon: TrendingUp },
          { id: 'tokenize' as TabType, label: 'Tokenize Clips', icon: Music },
          { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button flex items-center gap-2 px-4 py-3 border-b-2 font-bold uppercase text-xs tracking-wider transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-400 text-purple-300 active'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Launch Tab */}
        {activeTab === 'launch' && (
          <div className="space-y-6">
            <LaunchCreatorCoin onSuccess={handleCoinLaunch} />

            {/* Information Card */}
            <div className="rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-gray-900/60 to-cyan-500/5 p-6 backdrop-blur">
              <h3 className="font-bold text-cyan-200 uppercase tracking-wider mb-4">
                How It Works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    step: '01',
                    title: 'Enter TikTok Username',
                    desc: 'Verify any TikTok creator (no wallet required yet)',
                  },
                  {
                    step: '02',
                    title: 'Launch Creator Coin',
                    desc: 'Instant SPL token minting on Solana blockchain',
                  },
                  {
                    step: '03',
                    title: 'Earn Royalties',
                    desc: 'All views, tips, donations flow to creator wallet',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="text-3xl font-bold text-purple-400">{item.step}</div>
                    <h4 className="font-bold text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Card */}
            <div className="rounded-2xl border border-green-300/30 bg-gradient-to-br from-green-500/10 via-gray-900/60 to-green-500/5 p-6 backdrop-blur">
              <h3 className="font-bold text-green-200 uppercase tracking-wider mb-4">
                Benefits
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Zero friction - just enter TikTok username</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Native on-chain royalty payments via ABRA</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Creator keeps 70% of all earnings</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Holders earn 20% - incentivizing fans to buy</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Tokenized clips become BlackBox NFTs in Forge</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <CreatorCoinDashboard metrics={creatorMetrics} />
        )}

        {/* Tokenize Clips Tab */}
        {activeTab === 'tokenize' && (
          <div className="rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/15 via-gray-900/60 to-purple-500/10 p-6 backdrop-blur">
            <div className="text-center space-y-4 py-12">
              <Music size={48} className="text-purple-400 mx-auto opacity-60" />
              <h3 className="text-xl font-bold text-purple-200">Tokenize Your Clips</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                Upload TikTok clips directly to Abraxas. They're automatically minted as BlackBox NFTs and earn royalties from trades.
              </p>
              <button className="px-6 py-3 rounded-lg border border-purple-400/60 bg-gradient-to-r from-purple-500/40 to-purple-400/30 text-sm font-bold uppercase text-purple-100 hover:border-purple-300/80 hover:shadow-[0_0_24px_rgba(153,69,255,0.4)] transition">
                Upload Clip to Forge
              </button>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/15 via-gray-900/60 to-purple-500/10 p-6 backdrop-blur">
            <h3 className="font-bold text-purple-200 uppercase tracking-wider mb-6">
              Creator Economy Analytics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: 'Total Creators',
                  value: creatorMetrics.length,
                  color: 'text-purple-400',
                },
                {
                  label: 'Combined Earnings',
                  value: `${(creatorMetrics.reduce((sum, m) => sum + m.feeShare.totalEarned, 0) / 1000).toFixed(1)}K ABRA`,
                  color: 'text-green-400',
                },
                {
                  label: 'Total Holders',
                  value: creatorMetrics.reduce((sum, m) => sum + m.holders, 0),
                  color: 'text-cyan-400',
                },
                {
                  label: 'Total Volume',
                  value: `${(creatorMetrics.reduce((sum, m) => sum + m.volume24h, 0) / 1000).toFixed(0)}K ABRA`,
                  color: 'text-orange-400',
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-purple-300/20 bg-slate-950/50 p-4 text-center"
                >
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold font-mono ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Top Performers */}
            <div>
              <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-4">
                Top Performers
              </h4>
              <div className="space-y-3">
                {creatorMetrics
                  .sort((a, b) => b.feeShare.totalEarned - a.feeShare.totalEarned)
                  .slice(0, 5)
                  .map((metric, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-purple-300/20 bg-slate-950/50 p-4 flex items-center justify-between hover:bg-slate-950/70 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-purple-400 w-8 text-center">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200">
                            {metric.creator.displayName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {metric.coin.symbol} • {metric.holders.toLocaleString()} holders
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-green-400">
                          {metric.feeShare.totalEarned.toFixed(0)} ABRA
                        </p>
                        <p className="text-xs text-slate-500">earned</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}\n