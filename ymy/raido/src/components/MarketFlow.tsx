import React, { useState } from 'react';
import { TrendingUp, BarChart3, ArrowRightLeft, Zap } from 'lucide-react';
import { AbraxasFooter } from './AbraxasFooter';

export const MarketFlow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flows' | 'routes' | 'history'>('flows');

  const topFlows = [
    { id: 1, from: 'SOL', to: 'USDC', volume: '$2.4M', apy: '12.5%', change: '+2.3%' },
    { id: 2, from: 'USDC', to: 'JTO', volume: '$1.8M', apy: '18.2%', change: '+1.1%' },
    { id: 3, from: 'RAY', to: 'SOL', volume: '$1.2M', apy: '15.8%', change: '-0.5%' },
    { id: 4, from: 'BONK', to: 'USDC', volume: '$890K', apy: '22.3%', change: '+3.2%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-raido-black via-raido-black to-raido-deep-blue relative overflow-hidden py-8">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-repeat opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(212, 165, 55, 0.1) 1px, rgba(212, 165, 55, 0.1) 2px)' }} />

      {/* Animated glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-raido-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-raido-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="space-y-6 p-4 md:p-8 relative z-10">
      <div>
        <h1 className="text-3xl md:text-5xl font-black text-raido-gold mb-2 font-mono uppercase tracking-widest" style={{ textShadow: '0 0 20px rgba(212, 165, 55, 0.5)' }}>
          [CAPITAL.FLOWS]
        </h1>
        <p className="text-raido-blue/70 text-sm font-mono" style={{ color: '#8099cc' }}>&gt; Real-time capital movement tracking across assets</p>
      </div>

      {/* Top Flows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topFlows.map((flow) => (
          <div key={flow.id} className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4 hover:border-raido-gold/40 transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-raido-gold" />
                <span className="text-sm font-bold text-raido-gold">{flow.from}</span>
                <Zap className="w-3 h-3 text-raido-gold/50" />
                <span className="text-sm font-bold text-raido-gold">{flow.to}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-raido-blue/60">Volume</p>
                <p className="text-raido-gold font-bold">{flow.volume}</p>
              </div>
              <div>
                <p className="text-raido-blue/60">APY</p>
                <p className="text-raido-gold font-bold">{flow.apy}</p>
              </div>
              <div>
                <p className="text-raido-blue/60">24h Change</p>
                <p className={`font-bold ${flow.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {flow.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-raido-gold/10">
        {['flows', 'routes', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition ${
              activeTab === tab
                ? 'border-b-2 border-raido-gold text-raido-gold'
                : 'text-raido-blue/60 hover:text-raido-gold'
            }`}
          >
            {tab === 'flows' ? 'Active Flows' : tab === 'routes' ? 'Best Routes' : 'History'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-6 text-center text-raido-blue/60">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Market flow visualization loading...</p>
        </div>
        <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4">
          <p className="text-xs font-bold text-raido-gold uppercase mb-3">Network Stats</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-raido-blue/60">Total 24h Volume</span>
              <span className="text-raido-gold font-bold">$24.5M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-raido-blue/60">Active Routes</span>
              <span className="text-raido-gold font-bold">148</span>
            </div>
            <div className="flex justify-between">
              <span className="text-raido-blue/60">Avg Efficiency</span>
              <span className="text-raido-gold font-bold">94.2%</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      <AbraxasFooter />
    </div>
  );
}

