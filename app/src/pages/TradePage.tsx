import { useWallet } from '@solana/wallet-adapter-react';
import { Activity, AlertTriangle, ArrowRightLeft, BarChart3, Brain, TrendingUp, Zap } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useRef } from 'react';
import { useAbraxas } from '../providers/AbraxasProvider';

type RWAPair = {
  id: string;
  fromSymbol: string;
  toSymbol: string;
  fromMint: string;
  toMint: string;
  price: number;
  change24h: number;
  volume24h: number;
  category: 'stablecoin' | 'token' | 'nft-collateral';
  chartData: Array<{ time: number; price: number }>;
};

const RWA_PAIRS: RWAPair[] = [
  {
    id: 'abra-usdc',
    fromSymbol: 'ABRA',
    toSymbol: 'USDC',
    fromMint: '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS',
    toMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
    price: 0.95,
    change24h: 5.2,
    volume24h: 125000,
    category: 'token',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (23 - i) * 60 * 60 * 1000,
      price: 0.88 + Math.random() * 0.1,
    })),
  },
  {
    id: 'lacasa-usdc',
    fromSymbol: 'La Casa NFT',
    toSymbol: 'USDC',
    fromMint: 'LaC4s1Aqz9gKhzUcfzvhFKGPQGfqEr6QxBCPKXLqZo',
    toMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
    price: 2500,
    change24h: -2.1,
    volume24h: 45000,
    category: 'nft-collateral',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (23 - i) * 60 * 60 * 1000,
      price: 2400 + Math.random() * 200,
    })),
  },
  {
    id: 'usdc-solana',
    fromSymbol: 'USDC',
    toSymbol: 'SOL',
    fromMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
    toMint: 'So11111111111111111111111111111111111111112',
    price: 0.024,
    change24h: 3.8,
    volume24h: 850000,
    category: 'stablecoin',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (23 - i) * 60 * 60 * 1000,
      price: 0.022 + Math.random() * 0.005,
    })),
  },
];

const KING_RECOMMENDATION = {
  symbol: 'ABRA',
  reason: 'Strong training progress detected. Swap stables into ABRA for equity upside.',
  confidence: 87,
  expectedGain: '+12-15% over 30 days',
};

export function TradePage() {
  const { connected, publicKey } = useWallet();
  const { sophiaAgents, recordSophiaTrade } = useAbraxas();
  const [selectedPair, setSelectedPair] = useState<RWAPair>(RWA_PAIRS[0]);
  const [pairView, setPairView] = useState<'carousel' | 'list'>('carousel');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedSophiaId, setSelectedSophiaId] = useState<string | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('1000');
  const [toAmount, setToAmount] = useState<string>('950');
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [useAutoTrade, setUseAutoTrade] = useState(false);
  const [circuitWarning, setCircuitWarning] = useState(false);
  const [showTradeSuccess, setShowTradeSuccess] = useState(false);
  const [showLiveMarket, setShowLiveMarket] = useState(false);

  const selectedSophia = useMemo(() => {
    if (!selectedSophiaId) return sophiaAgents[0]; // Default to first active agent
    return sophiaAgents.find((a) => a.id === selectedSophiaId);
  }, [selectedSophiaId, sophiaAgents]);

  // Simulate quote fetching from Bags API
  const handleQuote = useCallback(async () => {
    if (!fromAmount || isNaN(Number(fromAmount))) return;
    setIsLoadingQuote(true);
    try {
      // Simulate Bags API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const quote = Number(fromAmount) * selectedPair.price;
      setToAmount(quote.toFixed(2));
      
      // Simulate circuit check - warn if large trade
      if (Number(fromAmount) > 50000) {
        setCircuitWarning(true);
      } else {
        setCircuitWarning(false);
      }
    } finally {
      setIsLoadingQuote(false);
    }
  }, [fromAmount, selectedPair.price]);

  const handleSwap = useCallback(async () => {
    if (!connected || !publicKey || !fromAmount || !selectedSophia) return;
    
    // Record Sophia trade in the system
    recordSophiaTrade({
      sophiaAgentId: selectedSophia.id,
      timestamp: new Date().toISOString(),
      fromMint: selectedPair.fromMint,
      toMint: selectedPair.toMint,
      fromSymbol: selectedPair.fromSymbol,
      toSymbol: selectedPair.toSymbol,
      inputAmount: Number(fromAmount),
      outputAmount: Number(toAmount),
      executedPrice: selectedPair.price,
      entryReason: useAutoTrade ? `Auto-trade via Sophia ${selectedSophia.name}` : `Manual trade - ${selectedPair.fromSymbol} swap`,
      priceAtEntry: selectedPair.price,
      status: 'executed',
    });

    setShowTradeSuccess(true);
    setTimeout(() => setShowTradeSuccess(false), 3000);
    
    // Reset form
    setFromAmount('');
    setToAmount('');
  }, [connected, publicKey, fromAmount, toAmount, selectedPair, selectedSophia, useAutoTrade, recordSophiaTrade]);

  const swapFeePercentage = 0.02; // ~0% fee via Bags
  const estimatedFee = Number(toAmount) * (swapFeePercentage / 100);

  if (!connected) {
    return (
      <div className="min-h-screen max-w-3xl mx-auto px-4 py-8">
        <div className="glow-panel p-6 text-center space-y-3">
          <p className="text-white/65">Connect your wallet to trade RWAs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8 space-y-6" style={{ contain: 'layout style' }}>
      {/* Header */}
      <div className="flex-shrink-0 w-full space-y-2">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <Zap size={16} className="text-violet-400 shrink-0" />
          <h1 className="text-lg font-semibold text-white whitespace-nowrap">RWA Trading — Powered by Bags</h1>
        </div>
        <p className="text-xs text-white/65">
          Trade Real-World Asset pairs on Solana with ~0% fees. Sophia AI auto-trading available.
        </p>
      </div>

      {/* King AI Recommendation Banner */}
      <div className="flex-shrink-0 w-full rounded-lg border border-cyan-400/30 bg-cyan-500/15 p-4 space-y-3" style={{ contain: 'layout style' }}>
        <div className="flex items-start gap-3 w-full">
          <Brain size={18} className="mt-0.5 text-cyan-400 shrink-0 flex-shrink-0" />
          <div className="space-y-1 flex-1">
            <p className="font-semibold text-white">King AI Recommendation</p>
            <p className="text-sm text-cyan-300/80">{KING_RECOMMENDATION.reason}</p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-cyan-200">Confidence: {KING_RECOMMENDATION.confidence}%</span>
              <span className="text-green-300">Expected: {KING_RECOMMENDATION.expectedGain}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sophia Agent Selector */}
      {selectedSophia && (
        <div className="flex-shrink-0 w-full rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-900/40 to-slate-900/60 p-3" style={{ contain: 'layout style' }}>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Brain size={18} className="text-violet-300 shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-base truncate max-w-[120px]">{selectedSophia.name}</span>
                  <select
                    value={selectedSophiaId || ''}
                    onChange={(e) => setSelectedSophiaId(e.target.value || null)}
                    className="text-xs bg-slate-800/70 border border-violet-400/20 text-white rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-violet-400"
                  >
                    {sophiaAgents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name} ({agent.performanceScore}/100)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-xs text-violet-200/80 mt-0.5 truncate">{selectedSophia.specialty} · {selectedSophia.personality} style</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-violet-200 bg-violet-400/10 px-2 py-0.5 rounded font-medium">
                    Score: {selectedSophia.performanceScore}/100
                  </span>
                  <span className="text-[11px] text-cyan-200 bg-cyan-400/10 px-2 py-0.5 rounded font-medium">
                    Win: {selectedSophia.winRate.toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-emerald-200 bg-emerald-400/10 px-2 py-0.5 rounded font-medium">
                    Vol: {(selectedSophia.totalVolumeTraded / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Circuit Warning */}
      {circuitWarning && (
        <div className="flex-shrink-0 w-full rounded-lg border border-yellow-400/30 bg-yellow-500/15 p-4 space-y-2" style={{ contain: 'layout style' }}>
          <div className="flex items-start gap-2 w-full">
            <AlertTriangle size={16} className="mt-0.5 text-yellow-400 shrink-0 flex-shrink-0" />
            <div className="text-sm text-yellow-300/80">
              <p className="font-semibold">Circuit Warning</p>
              <p>Large trade detected. May trigger vault rebalancing rules. Proceed with caution.</p>
            </div>
          </div>
        </div>
      )}

      {/* Swap Interface */}
      <div className="space-y-4 flex-shrink-0 min-w-0">
        <div className="glow-panel p-4 space-y-3 flex-shrink-0 w-full min-w-0">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 flex-shrink-0 w-full">
            <ArrowRightLeft size={18} className="shrink-0" /> Swap
          </h2>

            {/* From Amount */}
            <div className="space-y-2 flex-shrink-0 w-full min-w-0">
              <label className="text-xs text-white/60 uppercase tracking-wide font-semibold block truncate">
                From: {selectedPair.fromSymbol}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 min-w-0 max-w-xs px-4 py-2 rounded-lg bg-slate-900/50 border border-white/15 text-white placeholder:text-white/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none"
                  style={{ width: '120px' }}
                />
                <button
                  onClick={() => setFromAmount('1000')}
                  className="px-3 py-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
                  style={{ minWidth: '2.5rem' }}
                >
                  1K
                </button>
              </div>
            </div>

            {/* Get Quote Button */}
            <button
              onClick={handleQuote}
              disabled={!fromAmount || isLoadingQuote}
              className="w-full h-10 flex-shrink-0 rounded-lg border border-cyan-400/45 bg-cyan-500/25 text-cyan-100 font-semibold text-sm hover:bg-cyan-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoadingQuote ? 'Getting Quote...' : 'Get Quote'}
            </button>

            {/* To Amount */}
            {toAmount && (
              <div className="space-y-2 flex-shrink-0 w-full min-w-0">
                <label className="text-xs text-white/60 uppercase tracking-wide font-semibold flex-shrink-0 block truncate">
                  To: {selectedPair.toSymbol}
                </label>
                <div className="px-4 py-3 rounded-lg bg-slate-900/50 border border-white/15 overflow-hidden min-w-0">
                  <p className="text-2xl font-bold text-green-300 break-words truncate max-w-full">{Number(toAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                  {estimatedFee > 0 && (
                    <p className="text-xs text-white/50 mt-1 truncate">Fee: ~${estimatedFee.toFixed(2)}</p>
                  )}
                </div>
              </div>
            )}

            {/* Trade Info */}
            {toAmount && (
              <div className="rounded-lg bg-white/5 p-3 space-y-2 text-xs flex-shrink-0 w-full">
                <div className="flex justify-between">
                  <p className="text-white/50">Price Impact</p>
                  <p className="text-white/70">0.02%</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-white/50">Route</p>
                  <p className="text-white/70">Bags DEX</p>
                </div>
              </div>
            )}

            {/* Sophia Auto-Trade Button */}
            {useAutoTrade && (
              <div className="rounded-lg border border-violet-400/30 bg-violet-500/15 p-3 flex-shrink-0 w-full">
                <p className="text-xs text-violet-300 font-semibold flex items-center gap-2">
                  <Zap size={14} className="shrink-0" /> Sophia will auto-execute this swap based on vault rules
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 flex-shrink-0 w-full">
              <button
                onClick={handleSwap}
                disabled={!toAmount}
                className="flex-1 h-11 rounded-lg border border-green-400/45 bg-green-500/25 text-green-100 font-semibold hover:bg-green-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Swap Now
              </button>
              <button
                onClick={() => setUseAutoTrade(!useAutoTrade)}
                className={`flex-1 h-11 rounded-lg border font-semibold transition-all flex items-center justify-center gap-2 ${
                  useAutoTrade
                    ? 'border-violet-400/45 bg-violet-500/25 text-violet-100'
                    : 'border-white/20 bg-transparent text-white/60 hover:bg-white/5'
                }`}
              >
                <Brain size={14} className="shrink-0" /> Sophia
              </button>
            </div>

            {/* Trade Success Indicator */}
            {showTradeSuccess && (
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 p-3 text-center flex-shrink-0 w-full">
                <p className="text-xs text-emerald-300 font-semibold">✓ Trade executed and recorded with {selectedSophia?.name}</p>
              </div>
            )}
          </div>

          {/* RWA Pairs Section (Carousel/List) */}
          <div className="glow-panel p-4 space-y-3 flex-shrink-0 w-full">
            <div className="flex items-center mb-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 flex-shrink-0">
                RWA Pairs
              </h3>
              <div className="flex-1"></div>
              <div className="flex gap-2 items-center">
                <button
                  className={`px-2 py-1 rounded text-xs font-semibold ${pairView === 'carousel' ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-800/60 text-white/60'}`}
                  onClick={() => setPairView('carousel')}
                >
                  Cards
                </button>
                <button
                  className={`px-2 py-1 rounded text-xs font-semibold ${pairView === 'list' ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-800/60 text-white/60'}`}
                  onClick={() => setPairView('list')}
                >
                  List
                </button>
              </div>
            </div>
            {pairView === 'carousel' ? (
              <div ref={carouselRef} className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {RWA_PAIRS.map((pair) => (
                  <button
                    key={pair.id}
                    onClick={() => setSelectedPair(pair)}
                    className={`min-w-[180px] max-w-[200px] snap-center p-4 rounded-lg border transition-all text-left ${
                      selectedPair.id === pair.id
                        ? 'border-cyan-400/50 bg-cyan-500/20 ring-1 ring-cyan-400/30'
                        : 'border-white/15 bg-slate-900/50 hover:border-white/25'
                    }`}
                  >
                    <p className="text-xs font-semibold text-white/60 uppercase tracking-wide truncate">{pair.category}</p>
                    <p className="text-sm font-bold text-white mt-1 truncate">{pair.fromSymbol} &rarr; {pair.toSymbol}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-white/50">${pair.price.toFixed(4)}</p>
                      <p className={`text-xs font-semibold ${pair.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{pair.change24h >= 0 ? '+' : ''}{pair.change24h}%</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {RWA_PAIRS.map((pair) => (
                  <button
                    key={pair.id}
                    onClick={() => setSelectedPair(pair)}
                    className={`w-full p-4 rounded-lg border transition-all text-left ${
                      selectedPair.id === pair.id
                        ? 'border-cyan-400/50 bg-cyan-500/20 ring-1 ring-cyan-400/30'
                        : 'border-white/15 bg-slate-900/50 hover:border-white/25'
                    }`}
                  >
                    <p className="text-xs font-semibold text-white/60 uppercase tracking-wide truncate">{pair.category}</p>
                    <p className="text-sm font-bold text-white mt-1 truncate">{pair.fromSymbol} &rarr; {pair.toSymbol}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-white/50">${pair.price.toFixed(4)}</p>
                      <p className={`text-xs font-semibold ${pair.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{pair.change24h >= 0 ? '+' : ''}{pair.change24h}%</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Live Market Toggle and Dex Screener Chart Embed */}
          <div className="glow-panel p-4 mt-4 flex-shrink-0 w-full">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-white/60 flex items-center gap-2">
                <BarChart3 size={16} className="text-cyan-400" /> Live Price Chart
              </h4>
              <button
                className={`px-3 py-1 rounded text-xs font-semibold transition-all border ${showLiveMarket ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40' : 'bg-slate-800/60 text-white/60 border-white/20 hover:bg-white/5'}`}
                onClick={() => setShowLiveMarket((v) => !v)}
              >
                {showLiveMarket ? 'Hide' : 'Show'} Live Market
              </button>
            </div>
            {showLiveMarket && (
              <div className="w-full h-[600px] rounded-lg overflow-hidden border border-cyan-400/20 bg-black transition-all duration-300">
                {/* Dex Screener Widget: ABRA/USDC on Solana (default) */}
                  <iframe
                    title="Dex Screener Chart"
                    src="https://dexscreener.com/solana/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS?theme=dark"
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen
                  ></iframe>
              </div>
            )}
            <p className="text-xs text-white/30 mt-2">Powered by Dex Screener. Chart shows ABRA/USDC on Solana. Contact us to add more pairs.</p>
          </div>
        </div>
      {/* End main container for swap, RWA pairs, and chart */}

      {/* Trade Stats & Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glow-panel p-4 space-y-2">
          <p className="text-xs text-white/50 uppercase tracking-wide font-semibold">24h Volume</p>
          <p className="text-2xl font-bold text-cyan-300">${selectedPair.volume24h.toLocaleString()}</p>
          <p className="text-xs text-white/40">{selectedPair.fromSymbol}/{selectedPair.toSymbol}</p>
        </div>
        <div className="glow-panel p-4 space-y-2">
          <p className="text-xs text-white/50 uppercase tracking-wide font-semibold">Liquidity Source</p>
          <p className="text-lg font-bold text-amber-200">Bags</p>
          <p className="text-xs text-white/40">~0% protocol fees</p>
        </div>
      </div>

      {/* Devnet Note */}
      <div className="flex-shrink-0 w-full rounded-lg border border-cyan-400/25 bg-cyan-500/10 p-4 space-y-2" style={{ contain: 'layout style' }}>
        <div className="flex items-start gap-2 w-full">
          <TrendingUp size={14} className="mt-0.5 text-cyan-400 shrink-0 flex-shrink-0" />
          <div className="space-y-1 text-xs text-cyan-300/80">
            <p className="font-semibold">Devnet RWA Trading</p>
            <p>
              This Trade tab is now live for devnet testing. All pairs, quotes, and swaps route through Bags API on devnet. Mainnet launch coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
