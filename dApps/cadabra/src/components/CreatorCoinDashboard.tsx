/**
 * Creator Coin Dashboard Component
 * Displays live fee-sharing performance, earnings, and transactions
 */

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Users, Wallet, Activity, BarChart3 } from 'lucide-react';
import type {
  CreatorMetrics,
  TokenizedClip,
  CreatorTransaction,
} from '../lib/creatorEconomyTypes';
import {
  formatMetrics,
  calculateGrowthRate,
  getCreatorCoinData,
} from '../lib/creatorEconomyUtils';

interface CreatorCoinDashboardProps {
  metrics: CreatorMetrics[];
  onSelectCoin?: (metrics: CreatorMetrics) => void;
}

export function CreatorCoinDashboard({ metrics, onSelectCoin }: CreatorCoinDashboardProps) {
  const [selectedCoin, setSelectedCoin] = useState<CreatorMetrics | null>(
    metrics.length > 0 ? metrics[0] : null
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleSelectCoin = (coin: CreatorMetrics) => {
    setSelectedCoin(coin);
    onSelectCoin?.(coin);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Could fetch fresh data here
      await new Promise(resolve => setTimeout(resolve, 800));
    } finally {
      setRefreshing(false);
    }
  };

  if (!selectedCoin) {
    return (
      <div className="relative rounded-2xl border border-purple-300/40 bg-gradient-to-br from-purple-500/12 via-gray-900/80 to-purple-500/8 p-8 text-center">
        <p className="text-slate-400">No creator coins to display</p>
      </div>
    );
  }

  const formatMetricsDisplay = formatMetrics(selectedCoin);
  const growth24h = calculateGrowthRate(
    selectedCoin.volume24h,
    selectedCoin.volume24h * 0.8,
    24
  );

  return (
    <div className="relative">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(153, 69, 255, 0.3); }
          50% { box-shadow: 0 0 30px rgba(153, 69, 255, 0.5); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header with Coin Selector */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-purple-300 uppercase tracking-wider">
            Creator Earnings Dashboard
          </h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 rounded-lg border border-purple-300/40 bg-purple-500/20 text-xs font-bold uppercase text-purple-200 hover:border-purple-300/60 disabled:opacity-50 transition"
          >
            {refreshing ? '⟳ Refreshing...' : '⟳ Refresh'}
          </button>
        </div>

        {/* Coin Selector Tabs */}
        {metrics.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {metrics.map((coin) => (
              <button
                key={coin.coinAddress}
                onClick={() => handleSelectCoin(coin)}
                className={`px-4 py-2 rounded-lg font-bold uppercase text-xs whitespace-nowrap transition ${
                  selectedCoin?.coinAddress === coin.coinAddress
                    ? 'border border-purple-400/60 bg-purple-500/40 text-purple-100 shadow-[0_0_20px_rgba(153,69,255,0.4)]'
                    : 'border border-purple-300/20 bg-purple-950/40 text-slate-400 hover:text-slate-300'
                }`}
              >
                {coin.coin.symbol}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Creator Info Card */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/15 via-gray-900/60 to-purple-500/10 p-6 backdrop-blur">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-purple-400/20 flex items-center justify-center text-2xl border border-purple-300/30">
                📱
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-purple-200 text-lg">
                  {selectedCoin.creator.displayName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  @{selectedCoin.creator.username}
                </p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  <span className="text-[10px] font-mono bg-purple-500/20 text-purple-200 px-2 py-1 rounded">
                    {(selectedCoin.creator.followers / 1e6).toFixed(1)}M followers
                  </span>
                  {selectedCoin.creator.verified && (
                    <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-200 px-2 py-1 rounded">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-300/10 space-y-2 text-sm">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Coin Symbol</span>
                <span className="font-mono text-cyan-300 font-bold">{selectedCoin.coin.symbol}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Holders</span>
                <span className="font-mono text-purple-300 font-bold">{selectedCoin.holders.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: 'Total Earned',
              value: formatMetricsDisplay.totalEarned,
              icon: Wallet,
              color: 'from-green-500/20 to-green-500/5',
              border: 'border-green-300/30',
            },
            {
              label: 'Current Price',
              value: formatMetricsDisplay.price,
              icon: TrendingUp,
              color: 'from-blue-500/20 to-blue-500/5',
              border: 'border-blue-300/30',
            },
            {
              label: '24h Volume',
              value: formatMetricsDisplay.volume24h,
              icon: Activity,
              color: 'from-orange-500/20 to-orange-500/5',
              border: 'border-orange-300/30',
            },
            {
              label: 'Market Cap',
              value: formatMetricsDisplay.marketCap,
              icon: BarChart3,
              color: 'from-purple-500/20 to-purple-500/5',
              border: 'border-purple-300/30',
            },
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-lg border ${metric.border} bg-gradient-to-br ${metric.color} p-4 backdrop-blur`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {metric.label}
                    </p>
                    <p className="font-mono font-bold text-cyan-300 text-sm">
                      {metric.value}
                    </p>
                  </div>
                  <Icon size={18} className="text-slate-400 opacity-40" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="mt-6 rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/15 via-gray-900/60 to-purple-500/10 p-6 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-purple-200 uppercase tracking-wider">24h Performance</h3>
          <div className={`flex items-center gap-1 text-sm font-bold ${growth24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {growth24h > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(growth24h).toFixed(1)}%
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-3">
          {[
            { label: 'Views Revenue', percent: 35 },
            { label: 'Tips Earned', percent: 28 },
            { label: 'NFT Sales', percent: 22 },
            { label: 'Token Trades', percent: 15 },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{item.label}</span>
                <span className="text-cyan-300 font-mono">{item.percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950/50 overflow-hidden border border-slate-700/30">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-6 rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/15 via-gray-900/60 to-purple-500/10 p-6 backdrop-blur">
        <h3 className="font-bold text-purple-200 uppercase tracking-wider mb-4">Recent Earnings</h3>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {[
            { type: 'view_reward', desc: 'View Rewards', amount: 2.5, time: '2 hours ago' },
            { type: 'tip', desc: 'Fan Tip', amount: 5.0, time: '4 hours ago' },
            { type: 'nft_sale', desc: 'Clip NFT Sale', amount: 15.0, time: '6 hours ago' },
            { type: 'token_trade', desc: 'Token Trade Royalty', amount: 3.2, time: '8 hours ago' },
            { type: 'donation', desc: 'Donation', amount: 1.5, time: '10 hours ago' },
          ].map((tx, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-purple-300/20 bg-slate-950/30 p-3 text-xs hover:bg-slate-950/50 transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm">
                  {tx.type === 'view_reward' && '👁️'}
                  {tx.type === 'tip' && '💰'}
                  {tx.type === 'nft_sale' && '🖼️'}
                  {tx.type === 'token_trade' && '📈'}
                  {tx.type === 'donation' && '❤️'}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-300">{tx.desc}</p>
                  <p className="text-slate-500">{tx.time}</p>
                </div>
              </div>
              <span className="font-mono font-bold text-green-400">+{tx.amount.toFixed(2)} ABRA</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fee Distribution Info */}
      <div className="mt-6 rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-gray-900/60 to-cyan-500/5 p-6 backdrop-blur">
        <h3 className="font-bold text-cyan-200 uppercase tracking-wider mb-4">Fee Distribution</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Creator Share', percent: 70, color: 'text-purple-400' },
            { label: 'Holder Pool', percent: 20, color: 'text-blue-400' },
            { label: 'Abraxas Platform', percent: 5, color: 'text-orange-400' },
            { label: 'Bags Protocol', percent: 5, color: 'text-green-400' },
          ].map((share, idx) => (
            <div key={idx} className="text-center p-3 rounded-lg bg-slate-950/50 border border-slate-700/30">
              <p className={`text-lg font-bold ${share.color}`}>{share.percent}%</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                {share.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
