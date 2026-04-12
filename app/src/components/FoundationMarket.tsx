import { useEffect, useState, useRef } from 'react';
import { Zap } from 'lucide-react';

// Sophia's Daughters Asset Classes
interface DaughterAssetClass {
  id: string;
  symbol: string;
  name: string;
  subtitle: string;
  tvl: number;
  apy: number;
  status: 'live' | 'pilot';
  description: string;
  color: { bg: string; border: string; text: string; accent: string };
}

const daughtersAssets: DaughterAssetClass[] = [
  {
    id: 'aurelia',
    symbol: '$AURELIA',
    name: 'Aurelia',
    subtitle: 'Real Estate Tokenization',
    tvl: 156400000,
    apy: 7.2,
    status: 'live',
    description: 'Institutional property-backed yields with transparent occupancy metrics. 278 properties across North America.',
    color: { bg: 'bg-emerald-500/10', border: 'border-emerald-400/30', text: 'text-emerald-300', accent: 'text-emerald-200' },
  },
  {
    id: 'echo',
    symbol: '$ECHO',
    name: 'Echo',
    subtitle: 'Music Rights & Royalties',
    tvl: 42300000,
    apy: 14.8,
    status: 'live',
    description: 'Tokenized streaming royalties from independent and emerging artists. Verifiable platform metrics.',
    color: { bg: 'bg-pink-500/10', border: 'border-pink-400/30', text: 'text-pink-300', accent: 'text-pink-200' },
  },
  {
    id: 'pulse',
    symbol: '$PULSE',
    name: 'Pulse',
    subtitle: 'Gaming Guild Economy',
    tvl: 28900000,
    apy: 11.6,
    status: 'live',
    description: 'Guild coordination and in-game asset tokenization. GTA 6 RP servers and DeFi gaming economy.',
    color: { bg: 'bg-violet-500/10', border: 'border-violet-400/30', text: 'text-violet-300', accent: 'text-violet-200' },
  },
];

export function FoundationMarket() {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const fullText = 'Sophia\'s Daughters — Institutional Asset Classes';
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
    }, 30);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  return (
    <>
      {/* Sophia's Daughters Section */}
      <article className="relative overflow-hidden rounded-2xl border border-purple-400/25 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(20,10,40,0.90),rgba(88,28,135,0.08),rgba(147,51,234,0.04))] p-4 backdrop-blur-xl">
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
          {/* Header with Lore */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Dramatic typing reveal */}
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-cyan-300 mb-2 tracking-tight">
                {displayText}
                {!isComplete && <span className="animate-pulse">▌</span>}
              </h2>

              {/* Lore title */}
              <h3 className="text-sm font-bold text-purple-100 mb-2 flex items-center gap-1">
                <span className="text-lg">👑</span>
                Combined $415.7M Est. Value
              </h3>

              {/* Lore blurb */}
              <p className="text-[11px] leading-snug text-slate-300/80 mb-3 max-w-2xl">
                Three institutional RWA families powering capital efficiency across real estate, music rights, and gaming guilds. <span className="text-purple-300 font-semibold">King AI audited.</span> Circuit protected. Multi-agent coordinated.
              </p>
            </div>

            {/* Buy ABRA Button */}
            <a
              href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 h-fit rounded-lg border border-purple-400/60 bg-gradient-to-br from-purple-600/40 to-purple-900/40 px-3 py-2 text-xs font-bold text-purple-200 uppercase tracking-wider shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:from-purple-600/60 hover:to-purple-900/60 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Zap size={14} />
              Buy ABRA
            </a>
          </div>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 via-purple-300/20 to-transparent" />
            <span className="text-purple-400/60 font-mono text-[9px] px-1">THREE DAUGHTERS</span>
            <div className="flex-1 h-px bg-gradient-to-l from-purple-500/40 via-purple-300/20 to-transparent" />
          </div>

          {/* Daughters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {daughtersAssets.map((daughter) => (
              <div
                key={daughter.id}
                className={`group rounded-2xl border ${daughter.color.border} ${daughter.color.bg} p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:border-${daughter.color.text.split('-')[1]}-400/50`}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${daughter.color.border} ${daughter.color.bg} ${daughter.color.text}`}>
                    {daughter.status === 'live' ? '✓ Live' : '○ Pilot'}
                  </span>
                </div>

                {/* Header */}
                <div className="mb-3">
                  <h4 className={`text-lg font-black ${daughter.color.accent} mb-0.5`}>{daughter.name}</h4>
                  <p className="text-[10px] text-slate-400">{daughter.subtitle}</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {/* TVL */}
                  <div className="bg-slate-950/40 rounded-lg p-2 border border-slate-700/30">
                    <p className="text-[9px] text-slate-400 mb-0.5">TVL</p>
                    <p className={`text-sm font-bold ${daughter.color.text}`}>
                      ${(daughter.tvl / 1000000).toFixed(1)}M
                    </p>
                  </div>

                  {/* APY */}
                  <div className="bg-slate-950/40 rounded-lg p-2 border border-slate-700/30">
                    <p className="text-[9px] text-slate-400 mb-0.5">APY</p>
                    <p className={`text-sm font-bold ${daughter.color.text}`}>
                      {daughter.apy.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[9px] leading-snug text-slate-300/70 mb-3">
                  {daughter.description}
                </p>

                {/* Symbol Footer */}
                <div className={`text-[10px] font-mono font-bold ${daughter.color.text} uppercase tracking-wider pt-2 border-t border-slate-700/30`}>
                  {daughter.symbol}
                </div>
              </div>
            ))}
          </div>

          {/* Divider before footer */}
          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/40 via-purple-300/20 to-transparent" />
            <span className="text-purple-400/60 font-mono text-[8px] px-1">CAPITAL EFFICIENCY ENGINE</span>
            <div className="flex-1 h-px bg-gradient-to-l from-purple-500/40 via-purple-300/20 to-transparent" />
          </div>

          {/* Footer Info */}
          <div className="rounded-lg border border-purple-400/20 bg-purple-500/5 p-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-purple-300/80 leading-tight">
              ORCA lending + Circuit protection + King AI audited
            </p>
            <p className="text-[9px] text-slate-400/65 mt-1 leading-tight">
              Route La Casa deposits through Vaults into optimal Daughters tiers. Multi-agent Species coordination powered by Raido + Tide + Circuit.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
