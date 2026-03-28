import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';

type Asset = {
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
};

// Mock market data - in production, would fetch from real API (CoinGecko, etc.)
const ASSETS: Asset[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67432.50,
    priceChange24h: 3.24,
    marketCap: 1320000000000,
    volume24h: 28500000000,
    high24h: 68200,
    low24h: 65800,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3584.20,
    priceChange24h: 2.18,
    marketCap: 430000000000,
    volume24h: 18200000000,
    high24h: 3650,
    low24h: 3490,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 187.45,
    priceChange24h: 5.67,
    marketCap: 82000000000,
    volume24h: 4200000000,
    high24h: 192,
    low24h: 175,
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    price: 2.64,
    priceChange24h: 8.32,
    marketCap: 145000000000,
    volume24h: 9800000000,
    high24h: 2.75,
    low24h: 2.42,
  },
  {
    symbol: 'USDC',
    name: 'USDC',
    price: 1.00,
    priceChange24h: 0.02,
    marketCap: 35000000000,
    volume24h: 8200000000,
    high24h: 1.01,
    low24h: 0.99,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: 0.9999,
    priceChange24h: -0.01,
    marketCap: 120000000000,
    volume24h: 45200000000,
    high24h: 1.01,
    low24h: 0.989,
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 1.12,
    priceChange24h: -1.45,
    marketCap: 41000000000,
    volume24h: 1200000000,
    high24h: 1.18,
    low24h: 1.08,
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: 612.80,
    priceChange24h: 1.92,
    marketCap: 92000000000,
    volume24h: 2800000000,
    high24h: 625,
    low24h: 598,
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    price: 0.1845,
    priceChange24h: 2.38,
    marketCap: 18000000000,
    volume24h: 850000000,
    high24h: 0.189,
    low24h: 0.178,
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.4287,
    priceChange24h: 6.54,
    marketCap: 62000000000,
    volume24h: 3200000000,
    high24h: 0.44,
    low24h: 0.39,
  },
  {
    symbol: 'HYPE',
    name: 'Hyperliquid',
    price: 8.45,
    priceChange24h: 12.73,
    marketCap: 4200000000,
    volume24h: 620000000,
    high24h: 8.92,
    low24h: 7.48,
  },
];

export function LivePriceTicker() {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);
  const [animatingPrice, setAnimatingPrice] = useState(false);
  const currentAsset = ASSETS[selectedAssetIndex];

  const priceIsPositive = currentAsset.priceChange24h >= 0;
  const displayMarketCap = currentAsset.marketCap / 1e9;
  const displayVolume = currentAsset.volume24h / 1e9;

  // Format price with thousands separators
  const formatPrice = (price: number) => {
    if (price >= 1) {
      // Format with commas for thousands
      const parts = price.toFixed(2).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    } else {
      return price.toFixed(4);
    }
  };

  useEffect(() => {
    setAnimatingPrice(true);
    const timer = setTimeout(() => setAnimatingPrice(false), 300);
    return () => clearTimeout(timer);
  }, [selectedAssetIndex]);

  const nextAsset = () => {
    setSelectedAssetIndex((prev) => (prev + 1) % ASSETS.length);
  };

  const prevAsset = () => {
    setSelectedAssetIndex((prev) => (prev - 1 + ASSETS.length) % ASSETS.length);
  };

  return (
    <article className="glow-panel rounded-2xl border border-amber-300/25 bg-[linear-gradient(135deg,rgba(42,30,15,0.92),rgba(37,25,10,0.82),rgba(251,191,36,0.08))] p-6 backdrop-blur-xl overflow-hidden space-y-5">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-lg" />
            <TrendingUp className="text-amber-300 relative z-10 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]" size={22} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-amber-200 tracking-widest uppercase">Live Market Ticker</h2>
            <p className="text-[10px] text-amber-300/60 font-mono">Real-time Price Feed • Horizon Oracle</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-300/75 italic">
          Track top crypto assets in real time. Your daily market check starts here with live prices, charts, and trending data.
        </p>
      </div>

      {/* Main Price Display */}
      <div className="rounded-xl border border-amber-300/20 bg-slate-950/50 backdrop-blur-sm p-6 space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200/80">[{currentAsset.symbol}]</span>
              <span className="text-xs text-amber-300/60 font-mono">{currentAsset.name}</span>
            </div>
            <div className={`transition-all duration-300 ${animatingPrice ? 'scale-110 opacity-50' : 'scale-100 opacity-100'}`}>
              <p className={`font-bold text-amber-50 font-mono ${currentAsset.price >= 10000 ? 'text-4xl' : 'text-5xl'}`}>
                ${formatPrice(currentAsset.price)}
              </p>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className={`flex items-center gap-2 text-lg font-bold font-mono ${priceIsPositive ? 'text-emerald-300' : 'text-rose-300'}`}>
              {priceIsPositive ? '+' : '-'}{Math.abs(currentAsset.priceChange24h).toFixed(2)}%
              {priceIsPositive ? (
                <TrendingUp size={20} className="text-emerald-400" />
              ) : (
                <TrendingDown size={20} className="text-rose-400" />
              )}
            </div>
            <p className="text-[10px] text-amber-300/60 font-mono uppercase tracking-wider">24h Change</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-amber-300/10">
          <div className="space-y-1">
            <p className="text-[10px] text-amber-300/60 font-mono uppercase tracking-wider">Market Cap</p>
            <p className="text-sm font-semibold text-amber-100">${displayMarketCap.toFixed(0)}B</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-amber-300/60 font-mono uppercase tracking-wider">24h Volume</p>
            <p className="text-sm font-semibold text-amber-100">${displayVolume.toFixed(1)}B</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-amber-300/60 font-mono uppercase tracking-wider">24h Range</p>
            <p className="text-xs font-mono text-amber-100">
              ${formatPrice(currentAsset.low24h)} - ${formatPrice(currentAsset.high24h)}
            </p>
          </div>
        </div>
      </div>

      {/* Asset Selector */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-200/80 px-1">Select Asset</p>
        <div className="flex items-center gap-2 flex-wrap">
          {ASSETS.map((asset, idx) => (
            <button
              key={asset.symbol}
              onClick={() => setSelectedAssetIndex(idx)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                idx === selectedAssetIndex
                  ? 'border border-amber-400/60 bg-amber-500/25 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.3)]'
                  : 'border border-amber-300/15 bg-slate-950/40 text-amber-200/70 hover:bg-slate-950/60 hover:border-amber-300/30'
              }`}
            >
              {asset.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-amber-300/10">
        <button
          onClick={prevAsset}
          className="px-4 py-2 rounded-lg border border-amber-300/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 transition font-mono text-xs font-semibold uppercase tracking-wider"
        >
          ← Prev
        </button>
        <div className="text-center">
          <p className="text-[10px] text-amber-300/60 font-mono uppercase tracking-wider">
            {selectedAssetIndex + 1} of {ASSETS.length}
          </p>
        </div>
        <button
          onClick={nextAsset}
          className="px-4 py-2 rounded-lg border border-amber-300/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 transition font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>

      {/* CTA */}
      <div className="pt-2 flex justify-center">
        <div className="text-[9px] text-amber-300/50 font-mono uppercase tracking-wider">
          Check back daily for market updates • Horizon Never Sleeps
        </div>
      </div>
    </article>
  );
}
