import React, { useState, useEffect } from 'react';
import { BarChart3, Zap, Droplet, TrendingUp, Activity, PieChart, X } from 'lucide-react';
import { DashboardMetrics } from '../types';
import { AbraxasFooter } from './AbraxasFooter';

interface DashboardProps {
  onNavigate?: (section: string) => void;
}

interface OpportunityDetail {
  isOpen: boolean;
  name?: string;
  efficiency?: number;
  volume?: string;
  time?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalLiquidity: 45230000,
    totalVolume24h: 8500000,
    opportunitiesFound: 247,
    activeFlows: 12,
    averageAPY: 24.5,
  });

  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityDetail>({
    isOpen: false,
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const viewDetails = (oppName: string, efficiency: number, volume: string) => {
    setSelectedOpportunity({
      isOpen: true,
      name: oppName,
      efficiency,
      volume,
      time: Math.floor(Math.random() * 60) + 5,
    });
    showToast(`Viewing details for ${oppName}`, 'info');
  };

  const [activityLog] = useState([
    { id: 1, action: 'Discovered SOL/USDC pair', time: '2 min ago', value: '+$1.2M liquidity' },
    { id: 2, action: 'Flow executed: Jupiter → Orca', time: '15 min ago', value: '+$45K profit' },
    { id: 3, action: 'Opened new Raydium position', time: '1 hour ago', value: '+$500K capital' },
    { id: 4, action: 'Closed arbitrage opportunity', time: '2 hours ago', value: '+$23K gain' },
  ]);

  const [topOpportunities] = useState([
    { name: 'RAY/USDC Arbitrage', efficiency: 94, volume: '$2.3M', status: 'hot' },
    { name: 'JUP/SOL Swap Pool', efficiency: 87, volume: '$1.8M', status: 'active' },
    { name: 'ORCA/USDT Whirlpool', efficiency: 91, volume: '$1.5M', status: 'active' },
    { name: 'Magic Eden DEX', efficiency: 79, volume: '$980K', status: 'warm' },
  ]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-raido-black via-raido-black to-raido-deep-blue py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-repeat opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(212, 165, 55, 0.1) 1px, rgba(212, 165, 55, 0.1) 2px)' }} />

      {/* Animated glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-raido-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-raido-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-raido-gold" style={{ textShadow: '0 0 12px rgba(212, 165, 55, 0.6)' }} />
            <h2 className="text-3xl md:text-5xl font-black text-raido-gold font-mono uppercase tracking-widest" style={{ textShadow: '0 0 20px rgba(212, 165, 55, 0.5), 0 0 40px rgba(212, 165, 55, 0.25)' }}>
              [FORGE.PROTOCOL]
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg font-mono" style={{ color: '#9099b7' }}>
            &gt; STATUS: Real-time metrics and opportunities across the Solana ecosystem.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-12 md:mb-16">
          {/* Total Liquidity */}
          <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-4 md:p-6 hover:border-opacity-60 transition-all">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <Droplet className="w-5 h-5 text-raido-gold" />
              <p className="text-xs md:text-sm text-gray-400">Total Liquidity</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-raido-gold">
              ${(metrics.totalLiquidity / 1000000).toFixed(1)}M
            </p>
          </div>

          {/* 24h Volume */}
          <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-4 md:p-6 hover:border-opacity-60 transition-all">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <Activity className="w-5 h-5 text-raido-cyan" />
              <p className="text-xs md:text-sm text-gray-400">24h Volume</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-raido-cyan">
              ${(metrics.totalVolume24h / 1000000).toFixed(1)}M
            </p>
          </div>

          {/* Opportunities */}
          <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-4 md:p-6 hover:border-opacity-60 transition-all">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <p className="text-xs md:text-sm text-gray-400">Opportunities</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-yellow-400">
              {metrics.opportunitiesFound}
            </p>
          </div>

          {/* Active Flows */}
          <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-4 md:p-6 hover:border-opacity-60 transition-all">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <p className="text-xs md:text-sm text-gray-400">Active Flows</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-400">
              {metrics.activeFlows}
            </p>
          </div>

          {/* Avg APY */}
          <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-4 md:p-6 hover:border-opacity-60 transition-all">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <PieChart className="w-5 h-5 text-purple-400" />
              <p className="text-xs md:text-sm text-gray-400">Average APY</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-purple-400">
              {metrics.averageAPY.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Top Opportunities */}
          <div className="lg:col-span-2 bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-6 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-raido-gold mb-6 md:mb-8 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Hot Opportunities
            </h3>

            <div className="space-y-4 md:space-y-6">
              {topOpportunities.map((opp, idx) => (
                <div key={idx} className="pb-4 md:pb-6 border-b border-raido-gold border-opacity-20 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <h4 className="text-base md:text-lg font-semibold text-raido-gold">
                      {opp.name}
                    </h4>
                    <span
                      className={`text-xs px-2 md:px-3 py-1 rounded-full font-semibold ${
                        opp.status === 'hot'
                          ? 'bg-red-500 bg-opacity-20 text-red-400'
                          : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                      }`}
                    >
                      {opp.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 md:gap-8">
                    <div>
                      <p className="text-xs md:text-sm text-gray-400">Efficiency</p>
                      <p className="text-lg md:text-xl font-bold text-raido-cyan">
                        {opp.efficiency}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs md:text-sm text-gray-400">Volume</p>
                      <p className="text-lg md:text-xl font-bold text-green-400">
                        {opp.volume}
                      </p>
                    </div>

                    <button
                      onClick={() => viewDetails(opp.name, opp.efficiency, opp.volume)}
                      className="ml-auto px-3 md:px-4 py-2 bg-raido-gold bg-opacity-20 text-raido-gold rounded-lg hover:bg-opacity-40 transition-colors text-xs md:text-sm font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-6 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-raido-gold mb-6 md:mb-8 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </h3>

            <div className="space-y-4 md:space-y-6">
              {activityLog.map((activity) => (
                <div key={activity.id} className="pb-4 md:pb-6 border-b border-raido-gold border-opacity-20 last:border-0 last:pb-0">
                  <p className="text-sm md:text-base font-semibold text-raido-gold mb-1">
                    {activity.action}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">
                    {activity.time}
                  </p>
                  <p className="text-sm md:text-base font-bold text-green-400 mt-1 md:mt-2">
                    {activity.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tide Pool Integration */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-raido-deep-blue-accent to-raido-deep-blue-lighter bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-6 md:p-8">
          <h3 className="text-lg md:text-2xl font-bold text-raido-gold mb-4 md:mb-6">
            Tide Pool Integration
          </h3>
          <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8">
            Fee-sharing visualization and rewards tracking. Connect your wallet to see your share of Tide pool gains.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-raido-deep-blue bg-opacity-60 rounded-lg p-4 md:p-6">
              <p className="text-sm md:text-base text-gray-400 mb-2">Earned Fees</p>
              <p className="text-2xl md:text-3xl font-bold text-raido-gold">$12,450.50</p>
            </div>
            <div className="bg-raido-deep-blue bg-opacity-60 rounded-lg p-4 md:p-6">
              <p className="text-sm md:text-base text-gray-400 mb-2">Fee Share %</p>
              <p className="text-2xl md:text-3xl font-bold text-raido-cyan">2.3%</p>
            </div>
          </div>

          <button
            onClick={() => {
              onNavigate?.('scanner');
              showToast('Navigating to Opportunity Hunter...', 'info');
            }}
            className="w-full mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-raido-gold text-raido-black font-bold rounded-lg hover:bg-raido-gold-light transition-all"
          >
            View Pool Details
          </button>
        </div>

        {/* Abraxas Connection */}
        <AbraxasFooter />

        {/* Opportunity Detail Modal */}
        {selectedOpportunity.isOpen && (
          <div className="fixed inset-0 bg-raido-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-raido-deep-blue-accent backdrop-blur border border-raido-gold border-opacity-40 rounded-lg max-w-md w-full p-8 animate-pulse">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-raido-gold">{selectedOpportunity.name}</h3>
                <button
                  onClick={() => setSelectedOpportunity({ isOpen: false })}
                  className="p-2 hover:bg-raido-gold hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-raido-gold" />
                </button>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Efficiency</p>
                  <p className="text-2xl font-bold text-raido-cyan">{selectedOpportunity.efficiency}%</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">24h Volume</p>
                  <p className="text-2xl font-bold text-green-400">{selectedOpportunity.volume}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Estimated Execution Time</p>
                  <p className="text-xl font-bold text-yellow-400">{selectedOpportunity.time} minutes</p>
                </div>

                <div className="h-px bg-raido-gold bg-opacity-20" />

                <div className="bg-raido-deep-blue bg-opacity-60 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2">Status</p>
                  <p className="text-sm font-bold text-green-400">✓ Ready to Execute</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedOpportunity({ isOpen: false });
                  onNavigate?.('flows');
                  showToast('Opening Capital Flow Simulator...', 'info');
                }}
                className="w-full py-3 bg-raido-gold text-raido-black font-bold rounded-lg hover:bg-raido-gold-light transition-all"
              >
                Create Flow for This
              </button>
            </div>
          </div>
        )}

        {/* Toast notification */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg text-white font-semibold animate-pulse ${
              toast.type === 'success'
                ? 'bg-green-500 bg-opacity-80'
                : 'bg-raido-gold bg-opacity-80'
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </section>
  );
};
