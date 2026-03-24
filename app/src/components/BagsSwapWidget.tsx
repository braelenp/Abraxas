import { useMemo, useState } from 'react';
import { ArrowUpRight, TrendingUp, Wallet2 } from 'lucide-react';

interface BagsSwapWidgetProps {
  fromMint: string;
  toMint: string;
  compact?: boolean;
  inAppHref?: string;
}

export function BagsSwapWidget({ fromMint, toMint, compact = false, inAppHref = '/app/trade#in-app-trade' }: BagsSwapWidgetProps) {
  const [amount, setAmount] = useState('');

  const swapUrl = useMemo(() => {
    const baseUrl = `https://bags.fm/${fromMint}/${toMint}`;
    if (!amount) {
      return baseUrl;
    }

    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}amount=${encodeURIComponent(amount)}`;
  }, [amount, fromMint, toMint]);

  const goToInAppTrade = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.location.assign(inAppHref);
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
        <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-cyan-200`}>Optional Bags Swap</h3>
        <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">0% fee option</span>
      </div>

      <div className={`${compact ? 'mb-2' : 'mb-3'} rounded-lg border border-emerald-300/20 bg-emerald-500/10 p-3`}>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-200/80">Default Flow</p>
        <p className={`${compact ? 'text-[11px]' : 'text-xs'} mt-1 text-emerald-100/90`}>
          Use the in-app Jupiter route first. Bags is kept as a fallback if you want the external 0% fee path.
        </p>
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
          onClick={goToInAppTrade}
          type="button"
          className={`ui-action rounded-lg border border-emerald-400/45 bg-emerald-500/25 text-emerald-50 font-semibold hover:bg-emerald-500/35 transition-all ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 min-w-[6.5rem] px-4 py-2 text-sm'}`}
        >
          <span className="inline-flex items-center gap-2">
            Swap In Abraxas <Wallet2 size={14} />
          </span>
        </button>
        <button
          onClick={openExternalSwap}
          type="button"
          className={`rounded-lg border border-cyan-400/30 bg-slate-950/60 text-cyan-100 font-semibold hover:bg-slate-900 transition-all ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 min-w-[6.5rem] px-4 py-2 text-sm'}`}
        >
          <span className="inline-flex items-center gap-2">
            Use Bags 0% Fees <ArrowUpRight size={14} />
          </span>
        </button>
      </div>

      <p className={`${compact ? 'mt-1 text-[10px]' : 'mt-2 text-xs'} text-cyan-200/70`}>
        Bags stays available as an external fallback. The recommended route is the in-app swap flow below.
      </p>
    </div>
  );
}
