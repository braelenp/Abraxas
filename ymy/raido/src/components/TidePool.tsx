import React, { useState } from 'react';
import { Waves, Share2, TrendingUp, Droplet } from 'lucide-react';
import { AbraxasFooter } from './AbraxasFooter';

export const TidePool: React.FC = () => {
  const [pools] = useState([
    { name: 'SOL/USDC', tvl: '$12.5M', apy: '8.5%', volume24h: '$4.2M' },
    { name: 'RAY/SOL', tvl: '$8.3M', apy: '12.1%', volume24h: '$2.8M' },
    { name: 'BONK/USDC', tvl: '$5.2M', apy: '24.7%', volume24h: '$1.5M' },
  ]);

  const distributions = [
    { recipient: 'Liquidity Providers', percentage: 45, amount: '$2.1M' },
    { recipient: 'Raido Protocol', percentage: 30, amount: '$1.4M' },
    { recipient: 'Abraxas Family', percentage: 15, amount: '$700K' },
    { recipient: 'Growth Fund', percentage: 10, amount: '$467K' },
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

      {/* Content container */}

      <div className="space-y-6 p-4 md:p-8 relative z-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-raido-gold mb-2 font-mono uppercase tracking-widest" style={{ textShadow: '0 0 20px rgba(212, 165, 55, 0.5)' }}>
            [TIDE.POOL]
          </h1>
          <p className="text-raido-blue/70 text-sm font-mono" style={{ color: '#8099cc' }}>&gt; Liquidity pools and fee-sharing orchestration</p>
        </div>

        {/* Liquidity Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4 text-center">
            <p className="text-raido-blue/60 text-xs mb-1">Total TVL</p>
            <p className="text-raido-gold font-black text-lg">$142.3M</p>
          </div>
          <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4 text-center">
            <p className="text-raido-blue/60 text-xs mb-1">24h Volume</p>
            <p className="text-raido-gold font-black text-lg">$28.5M</p>
          </div>
          <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4 text-center">
            <p className="text-raido-blue/60 text-xs mb-1">Active Pools</p>
            <p className="text-raido-gold font-black text-lg">47</p>
          </div>
          <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4 text-center">
            <p className="text-raido-blue/60 text-xs mb-1">Avg APY</p>
            <p className="text-raido-gold font-black text-lg">15.2%</p>
          </div>
        </div>

        {/* Top Pools */}
        <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-6">
          <div className="flex items-center gap-2 mb-4">
            <Droplet className="w-5 h-5 text-raido-gold" />
            <h2 className="text-xl font-bold text-raido-gold uppercase">Top Pools</h2>
          </div>
          <div className="space-y-3">
            {pools.map((pool) => (
              <div key={pool.name} className="flex items-center justify-between p-3 bg-raido-black/40 rounded-lg border border-raido-gold/10">
                <div>
                  <p className="font-bold text-raido-gold text-sm">{pool.name}</p>
                  <p className="text-raido-blue/60 text-xs">TVL: {pool.tvl}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-raido-gold text-sm">{pool.apy}</p>
                  <p className="text-raido-blue/60 text-xs">{pool.volume24h} vol</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Distribution */}
        <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-6">
          <div className="flex items-center gap-2 mb-6">
            <Waves className="w-5 h-5 text-raido-gold" />
            <h2 className="text-xl font-bold text-raido-gold uppercase">Current Distribution</h2>
          </div>

          <div className="space-y-4">
            {distributions.map((dist) => (
              <div key={dist.recipient}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-raido-blue/80 font-bold text-sm">{dist.recipient}</p>
                  <p className="text-raido-gold font-black">{dist.amount}</p>
                </div>
                <div className="w-full bg-raido-black/40 rounded-full h-2 overflow-hidden border border-raido-gold/10">
                  <div
                    className="h-full bg-gradient-to-r from-raido-gold to-raido-gold/60"
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
                <p className="text-raido-blue/60 text-xs mt-1">{dist.percentage}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4">
            <p className="text-raido-blue/60 text-xs font-bold uppercase mb-2">Total Distributed</p>
            <p className="text-raido-gold font-black text-2xl">$4.67M</p>
            <p className="text-raido-blue/60 text-xs mt-2">This epoch</p>
          </div>
          <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4">
            <p className="text-raido-blue/60 text-xs font-bold uppercase mb-2">Avg Daily Revenue</p>
            <p className="text-raido-gold font-black text-2xl">$182K</p>
            <p className="text-raido-blue/60 text-xs mt-2">7-day average</p>
          </div>
          <div className="border border-raido-gold/20 rounded-lg bg-raido-deep-blue/40 backdrop-blur p-4">
            <p className="text-raido-blue/60 text-xs font-bold uppercase mb-2">Fee Tier</p>
            <p className="text-raido-gold font-black text-2xl">0.3%</p>
            <p className="text-raido-blue/60 text-xs mt-2">Standard swap</p>
          </div>
        </div>

        <AbraxasFooter />
      </div>
    </div>
  );
};
