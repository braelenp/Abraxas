import React, { useState, useEffect } from 'react';
import { Search, Zap, TrendingUp, Droplet } from 'lucide-react';
import { Opportunity } from '../types';
import { AbraxasFooter } from './AbraxasFooter';

interface OpportunityScannerProps {
  onNavigate?: (section: string) => void;
}

export const OpportunityScanner: React.FC<OpportunityScannerProps> = ({ onNavigate }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Mock data generator
  const generateMockOpportunities = (count = 6, filter?: string): Opportunity[] => {
    const assets = ['SOL', 'USDC', 'USDT', 'JUP', 'ORCA', 'RAYDIUM', 'MARINADE'];
    const pools = [
      'Raydium AMM',
      'Orca Whirlpool',
      'Meteora DLMM',
      'Magic Eden DEX',
      'Marinade Pool',
      'Jupiter Limit Order',
    ];

    return Array.from({ length: count }, (_, i) => {
      let baseAPY = Math.random() * 100 + 5;
      let baseVolume = Math.random() * 5000000 + 100000;
      let risk: 'low' | 'medium' | 'high' = (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)];

      // Apply filter adjustments
      if (filter === 'High Volume') {
        baseVolume = Math.random() * 5000000 + 2000000;
      } else if (filter === 'High APY') {
        baseAPY = Math.random() * 80 + 50;
      } else if (filter === 'Stable Liquidity') {
        risk = 'low';
      } else if (filter === 'Emerging Pairs') {
        baseVolume = Math.random() * 500000 + 50000;
      }

      return {
        id: `opp-${i}-${Date.now()}`,
        name: pools[i % pools.length],
        description: `${assets[i % assets.length]}/${assets[(i + 1) % assets.length]} pair ${filter ? `- ${filter}` : 'with high volume'}`,
        liquidityUSD: Math.random() * 10000000 + 1000000,
        volume24h: baseVolume,
        apy: baseAPY,
        risk,
        assets: [assets[i % assets.length], assets[(i + 1) % assets.length]],
        timestamp: new Date(),
      };
    });
  };

  const handleScan = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newOpps = generateMockOpportunities(6, selectedFilter || undefined);
    setOpportunities(newOpps);
    setLoading(false);
    showToast(`Found ${newOpps.length} opportunities${selectedFilter ? ` for "${selectedFilter}"` : ''}`, 'success');
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? null : filter);
  };

  const handleSimulateFlow = (opp: Opportunity) => {
    showToast(`Simulating flow for ${opp.assets.join('/')}...`, 'info');
    setTimeout(() => {
      showToast(`Flow simulation ready for ${opp.assets.join('/')} - Expected return: $${opp.liquidityUSD * 1.15}`, 'success');
    }, 1000);
  };

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    handleScan();
  }, [selectedFilter]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-raido-black via-raido-black to-raido-deep-blue py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-repeat opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(212, 165, 55, 0.1) 1px, rgba(212, 165, 55, 0.1) 2px)' }} />

      {/* Animated glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-raido-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-raido-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-raido-gold" style={{ textShadow: '0 0 12px rgba(212, 165, 55, 0.6)' }} />
            <h2 className="text-3xl md:text-5xl font-black text-raido-gold font-mono uppercase tracking-widest" style={{ textShadow: '0 0 20px rgba(212, 165, 55, 0.5), 0 0 40px rgba(212, 165, 55, 0.25)' }}>
              [HUNT.PROTOCOL]
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl font-mono" style={{ color: '#9099b7' }}>
            &gt; STATUS: Scanning for emerging liquid pairs, high-volume spots, and capital flow opportunities.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 md:mb-16 bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-raido-gold opacity-60" />
              <input
                type="text"
                placeholder="Describe opportunities to hunt... (e.g., 'High liquidity SOL pairs' or 'Emerging pools')"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-raido-deep-blue bg-opacity-60 border border-raido-gold border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:border-raido-gold focus:outline-none transition-all"
              />
            </div>
            <button
              onClick={handleScan}
              disabled={loading}
              className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-raido-gold to-raido-gold-light text-raido-black font-bold rounded-lg hover:shadow-glow-gold transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-raido-black border-t-transparent rounded-full animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Scan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick filters */}
        <div className="mb-12 md:mb-16 flex flex-wrap gap-2 md:gap-3">
          {['High Volume', 'Emerging Pairs', 'Stable Liquidity', 'High APY'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 py-2 border rounded-lg transition-all text-sm font-semibold ${
                selectedFilter === filter
                  ? 'border-raido-gold bg-raido-gold bg-opacity-20 text-raido-gold'
                  : 'border-raido-gold border-opacity-50 text-raido-gold hover:bg-raido-gold hover:bg-opacity-10'
              }`}
            >
              {filter}
              {selectedFilter === filter && ' ✓'}
            </button>
          ))}
        </div>

        {/* Opportunities Grid */}
        {opportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="group bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-4 md:p-6 hover:border-raido-gold hover:border-opacity-60 transition-all hover:shadow-glow-gold cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-raido-gold group-hover:text-raido-gold-light transition-colors">
                      {opp.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">{opp.assets.join(' / ')}</p>
                  </div>
                  <span className={`text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full ${getRiskColor(opp.risk)} bg-opacity-10 border ${getRiskColor(opp.risk).replace('text-', 'border-')}`}>
                    {opp.risk.toUpperCase()}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6 line-clamp-2">
                  {opp.description}
                </p>

                {/* Metrics */}
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Droplet className="w-4 h-4" />
                      Liquidity
                    </span>
                    <span className="text-raido-gold font-semibold">
                      ${(opp.liquidityUSD / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      24h Volume
                    </span>
                    <span className="text-raido-cyan">
                      ${(opp.volume24h / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  {opp.apy && (
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-400">APY</span>
                      <span className="text-green-400 font-semibold">
                        {opp.apy.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 md:gap-3">
                  <button
                    onClick={() => handleSimulateFlow(opp)}
                    className="flex-1 px-3 md:px-4 py-2 bg-raido-gold bg-opacity-20 text-raido-gold rounded-lg hover:bg-opacity-40 transition-colors text-xs md:text-sm font-semibold"
                  >
                    Simulate Flow
                  </button>
                  <button
                    onClick={() => onNavigate?.('flows')}
                    className="flex-1 px-3 md:px-4 py-2 bg-raido-gold text-raido-black rounded-lg hover:bg-raido-gold-light transition-colors text-xs md:text-sm font-semibold"
                  >
                    Create Flow
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-24">
            <p className="text-gray-400 text-base md:text-lg">
              {loading ? 'Scanning opportunities...' : 'Click "Scan" to discover opportunities'}
            </p>
          </div>
        )}

        {/* Abraxas Connection */}
        <AbraxasFooter />

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
