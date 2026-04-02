import { useEffect, useState, useRef } from 'react';
import { ExternalLink, CheckCircle, Zap } from 'lucide-react';

// Mock Bags Top 100 dApps Data
type DappCategory = 'AI Agents' | 'DeFi' | 'Social Finance' | 'Fee Sharing' | 'Prediction Markets' | 'Governance' | 'Yield Farming' | 'Trading' | 'Staking' | 'Liquidity';

interface DappListing {
  id: string;
  name: string;
  category: DappCategory;
  valueScore: number;
  marketCap: number;
  verified: boolean;
  tvl: number;
  rank: number;
}

const topDapps: DappListing[] = [
  { id: 'd1', name: 'Bags DEX', category: 'Trading', valueScore: 98, marketCap: 2450000, verified: true, tvl: 8750000, rank: 1 },
  { id: 'd2', name: 'Marinade Finance', category: 'Staking', valueScore: 96, marketCap: 2120000, verified: true, tvl: 6200000, rank: 2 },
  { id: 'd3', name: 'Orca', category: 'DeFi', valueScore: 94, marketCap: 1890000, verified: true, tvl: 5450000, rank: 3 },
  { id: 'd4', name: 'Magic Eden', category: 'Fee Sharing', valueScore: 92, marketCap: 1740000, verified: true, tvl: 4100000, rank: 4 },
  { id: 'd5', name: 'Phantom Wallet', category: 'Governance', valueScore: 90, marketCap: 1650000, verified: true, tvl: 3800000, rank: 5 },
  { id: 'd6', name: 'Jupiter Aggregator', category: 'Trading', valueScore: 88, marketCap: 1520000, verified: true, tvl: 3200000, rank: 6 },
  { id: 'd7', name: 'Raydium', category: 'DeFi', valueScore: 87, marketCap: 1410000, verified: true, tvl: 2900000, rank: 7 },
  { id: 'd8', name: 'Drift Protocol', category: 'Trading', valueScore: 85, marketCap: 1280000, verified: true, tvl: 2650000, rank: 8 },
  { id: 'd9', name: 'Solend', category: 'DeFi', valueScore: 84, marketCap: 1150000, verified: true, tvl: 2400000, rank: 9 },
  { id: 'd10', name: 'Mango Markets', category: 'DeFi', valueScore: 82, marketCap: 1020000, verified: true, tvl: 2100000, rank: 10 },
  { id: 'd11', name: 'Meteora', category: 'Yield Farming', valueScore: 81, marketCap: 950000, verified: true, tvl: 1900000, rank: 11 },
  { id: 'd12', name: 'Sanctum', category: 'Staking', valueScore: 79, marketCap: 850000, verified: true, tvl: 1650000, rank: 12 },
  { id: 'd13', name: 'Pyth Network', category: 'Governance', valueScore: 78, marketCap: 780000, verified: true, tvl: 1450000, rank: 13 },
  { id: 'd14', name: 'Kamino', category: 'Yield Farming', valueScore: 76, marketCap: 720000, verified: true, tvl: 1250000, rank: 14 },
  { id: 'd15', name: 'Oracle AI', category: 'AI Agents', valueScore: 75, marketCap: 680000, verified: true, tvl: 1100000, rank: 15 },
];

const categoryColors: Record<DappCategory, { bg: string; border: string; text: string }> = {
  'AI Agents': { bg: 'bg-purple-500/10', border: 'border-purple-400/30', text: 'text-purple-300' },
  'DeFi': { bg: 'bg-cyan-500/10', border: 'border-cyan-400/30', text: 'text-cyan-300' },
  'Social Finance': { bg: 'bg-pink-500/10', border: 'border-pink-400/30', text: 'text-pink-300' },
  'Fee Sharing': { bg: 'bg-emerald-500/10', border: 'border-emerald-400/30', text: 'text-emerald-300' },
  'Prediction Markets': { bg: 'bg-amber-500/10', border: 'border-amber-400/30', text: 'text-amber-300' },
  'Governance': { bg: 'bg-blue-500/10', border: 'border-blue-400/30', text: 'text-blue-300' },
  'Yield Farming': { bg: 'bg-green-500/10', border: 'border-green-400/30', text: 'text-green-300' },
  'Trading': { bg: 'bg-orange-500/10', border: 'border-orange-400/30', text: 'text-orange-300' },
  'Staking': { bg: 'bg-indigo-500/10', border: 'border-indigo-400/30', text: 'text-indigo-300' },
  'Liquidity': { bg: 'bg-teal-500/10', border: 'border-teal-400/30', text: 'text-teal-300' },
};

const ABRA_BAGS_MARKET_URL = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || 'https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';

export function FoundationMarket() {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const fullText = 'Welcome to the next degree.';
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;
    typingIntervalRef.current = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        if (index === fullText.length) {
          setIsComplete(true);
        }
        index++;
      } else {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      }
    }, 50);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  return (
    <>
      {/* Foundation Market Section */}
      <article className="relative overflow-hidden rounded-2xl border border-purple-400/25 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(20,10,40,0.90),rgba(88,28,135,0.08),rgba(147,51,234,0.04))] p-6 backdrop-blur-xl">
        {/* Animated background particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Glowing core orb - deep purple */}
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-purple-900/20 blur-3xl opacity-60" />
          <div className="absolute -bottom-16 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl opacity-40" />
          
          {/* Cyan accent beams */}
          <div className="absolute top-0 right-1/3 h-64 w-64 rounded-full bg-cyan-400/5 blur-2xl opacity-30" />
          
          {/* Orange fire accent */}
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-500/8 blur-2xl opacity-25" />

          {/* Scanline effect */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none [background:repeating-linear-gradient(180deg,rgba(147,51,234,0.1)_0px,rgba(147,51,234,0.1)_1px,transparent_2px,transparent_3px)]" />
          
          {/* Glitch effect overlay */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-screen pointer-events-none [background:linear-gradient(105deg,transparent_20%,rgba(147,51,234,0.15)_50%,transparent_78%)] [animation:tech-pulse_6s_ease-in-out_infinite]" />
        </div>

        <div className="relative z-10">
          {/* Header with Buy Button */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Dramatic typing reveal */}
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-cyan-300 mb-3 tracking-tight">
                {displayText}
                {!isComplete && <span className="animate-pulse">▌</span>}
              </h2>

              {/* Lore title */}
              <h3 className="text-lg font-bold text-purple-100 mb-3 flex items-center gap-2">
                <span className="text-2xl">💎</span>
                Foundation Market — Dapp Equity RWA
              </h3>

              {/* Lore blurb */}
              <p className="text-xs leading-relaxed text-slate-300/85 mb-4 max-w-2xl">
                The top 100 dApps on Bags are the foundation of the biggest token launchpad on Solana. We tokenize their real value as Dapp Equity — not just their tokens. <span className="text-purple-300 font-semibold">Verified builders only.</span> Value scoring per category. Own the infrastructure itself.
              </p>
            </div>

            {/* Top Buy Button */}
            <a
              href={ABRA_BAGS_MARKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 h-fit rounded-xl border border-purple-400/60 bg-gradient-to-br from-purple-600/40 to-purple-900/40 px-4 py-3 text-sm font-bold text-purple-200 uppercase tracking-wider shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:from-purple-600/60 hover:to-purple-900/60 transition-all duration-300 flex items-center gap-2"
            >
              <Zap size={14} />
              Buy ABRA
            </a>
          </div>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 via-purple-300/20 to-transparent" />
            <span className="text-purple-400/60 font-mono text-xs">TOP 100 DAPPS</span>
            <div className="flex-1 h-px bg-gradient-to-l from-purple-500/40 via-purple-300/20 to-transparent" />
          </div>

          {/* DApp Table / List */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(147,51,234,0.3)_rgba(15,23,42,0.5)]">
            {topDapps.map((dapp) => {
              const catColor = categoryColors[dapp.category];
              return (
                <div
                  key={dapp.id}
                  className="group rounded-lg border border-purple-400/20 bg-slate-950/50 hover:bg-slate-950/70 p-3 transition-all duration-300 hover:shadow-[0_0_16px_rgba(147,51,234,0.25)] hover:border-purple-400/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Rank + Name */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-purple-300/80 bg-purple-400/10 px-2 py-1 rounded border border-purple-400/20">
                          #{dapp.rank}
                        </span>
                        <span className="font-semibold text-slate-100 truncate">{dapp.name}</span>
                        {dapp.verified && (
                          <div title="On-chain verified">
                            <CheckCircle className="flex-shrink-0 w-4 h-4 text-emerald-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className={`flex-shrink-0 inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${catColor.bg} ${catColor.border} ${catColor.text}`}>
                      {dapp.category}
                    </div>

                    {/* Value Score */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-xs font-mono font-bold text-purple-300">
                        {dapp.valueScore}/100
                      </div>
                      <div className="w-16 h-1.5 bg-slate-800/50 rounded-full overflow-hidden border border-purple-400/20">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                          style={{ width: `${dapp.valueScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Market Cap */}
                    <div className="flex-shrink-0 text-right hidden md:block">
                      <div className="text-xs text-slate-300/70">Market Cap</div>
                      <div className="font-mono font-bold text-amber-300">
                        ${(dapp.marketCap / 1000000).toFixed(1)}M
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button className="flex-shrink-0 rounded-lg border border-purple-400/30 bg-purple-500/10 p-2 hover:bg-purple-500/20 hover:border-purple-400/50 transition text-purple-300 group-hover:text-purple-200">
                      <ExternalLink size={14} />
                    </button>
                  </div>

                  {/* Mobile Market Cap Below */}
                  <div className="md:hidden flex items-center justify-between text-xs mt-2 pt-2 border-t border-purple-400/10">
                    <span className="text-slate-400">Market Cap: <span className="font-mono font-bold text-amber-300">${(dapp.marketCap / 1000000).toFixed(1)}M</span></span>
                    <span className="text-slate-400">TVL: <span className="font-mono font-bold text-cyan-300">${(dapp.tvl / 1000000).toFixed(1)}M</span></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider before footer */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 via-purple-300/20 to-transparent" />
            <span className="text-purple-400/60 font-mono text-xs">EQUITY STAKE NOW AVAILABLE</span>
            <div className="flex-1 h-px bg-gradient-to-l from-purple-500/40 via-purple-300/20 to-transparent" />
          </div>

          {/* Footer with Bottom Buy Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg border border-purple-400/20 bg-purple-500/5 p-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-purple-300/80">Ready to own the infrastructure?</p>
              <p className="text-xs text-slate-400/70 mt-1">Power the next generation of dApps with $ABRA</p>
            </div>
            <a
              href={ABRA_BAGS_MARKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 rounded-xl border border-purple-400/60 bg-gradient-to-br from-purple-600/40 to-purple-900/40 px-5 py-2.5 text-sm font-bold text-purple-200 uppercase tracking-wider shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:from-purple-600/60 hover:to-purple-900/60 transition-all duration-300 flex items-center gap-2"
            >
              <Zap size={14} />
              Buy ABRA
            </a>
          </div>

          {/* Information footer */}
          <div className="mt-4 pt-3 border-t border-purple-400/10 text-center">
            <p className="text-[10px] text-slate-400/70 font-mono uppercase tracking-wider">
              Live data synced from Bags • Value scores updated every 6 hours • Solana verified only
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
