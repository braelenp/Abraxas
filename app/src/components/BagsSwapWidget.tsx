import { useMemo, useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface BagsSwapWidgetProps {
  fromMint: string;
  toMint: string;
  compact?: boolean;
}

export function BagsSwapWidget({ fromMint, toMint, compact = false }: BagsSwapWidgetProps) {
  const [amount, setAmount] = useState('');
  const [showEmbeddedSwap, setShowEmbeddedSwap] = useState(false);

  const swapUrl = useMemo(() => {
    // Bags swap URL format: bags.fm/from_mint/to_mint
    const baseUrl = `https://bags.fm/${fromMint}/${toMint}`;
    if (!amount) {
      return baseUrl;
    }

    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}amount=${encodeURIComponent(amount)}`;
  }, [amount, fromMint, toMint]);

  const handleSwap = () => {
    setShowEmbeddedSwap(true);
  };

  const openExternalSwap = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.open(swapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`bags-swap-widget rounded-xl border border-cyan-300/30 bg-slate-900/80 ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp size={16} className="text-cyan-200" />
        <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-cyan-200`}>Swap via Bags</h3>
        <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">Live</span>
      </div>
      
      <div className={`flex flex-col gap-2 ${compact ? 'mb-1' : 'mb-2'}`}>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount (ABRA)"
          className={`rounded-lg bg-slate-950 border border-cyan-300/20 text-white placeholder:text-cyan-200/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 px-3 py-2'}`}
        />
        <button
          onClick={handleSwap}
          type="button"
          className={`ui-action rounded-lg border border-cyan-400/45 bg-cyan-500/25 text-cyan-100 font-semibold hover:bg-cyan-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 min-w-[6.5rem] px-4 py-2 text-sm'}`}
        >
          <span className="inline-flex items-center gap-2">
            Open Embedded Swap <ArrowUpRight size={14} />
          </span>
        </button>
      </div>

      {showEmbeddedSwap ? (
        <div className={`mt-3 overflow-hidden rounded-xl border border-cyan-300/20 bg-slate-950/70 ${compact ? 'h-[26rem]' : 'h-[38rem]'}`}>
          <iframe
            src={swapUrl}
            title="Bags swap interface"
            className="h-full w-full border-0"
            allow="clipboard-read; clipboard-write"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}

      <button
        onClick={openExternalSwap}
        type="button"
        className="mt-3 text-xs font-semibold text-cyan-200/80 underline decoration-cyan-300/50 underline-offset-2 hover:text-cyan-100"
      >
        Open in full page instead
      </button>

      <p className={`${compact ? 'mt-1 text-[10px]' : 'mt-2 text-xs'} text-cyan-200/70`}>
        Zero fees on Bags. Swap directly inside this window for a seamless experience without leaving Abraxas.
      </p>
    </div>
  );
}
