import { useMemo, useState } from 'react';
import { ArrowUpRight, Wallet2 } from 'lucide-react';

interface BagsBuyWidgetProps {
  tokenAddress: string;
  compact?: boolean;
  inAppHref?: string;
}

export function BagsBuyWidget({ tokenAddress, compact = false, inAppHref = '/app/trade#in-app-trade' }: BagsBuyWidgetProps) {
  const [amount, setAmount] = useState('');
  const marketUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || `https://bags.fm/${tokenAddress}`;
    if (!amount) {
      return baseUrl;
    }

    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}amount=${encodeURIComponent(amount)}`;
  }, [amount, tokenAddress]);

  const goToInAppTrade = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.location.assign(inAppHref);
  };

  const openExternalMarket = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.open(marketUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`bags-buy-widget rounded-xl border border-cyan-300/30 bg-slate-900/80 ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-center gap-2 mb-2">
        <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-cyan-200`}>Buy ABRA</h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">Live</span>
      </div>

      <div className={`${compact ? 'mb-2' : 'mb-3'} rounded-lg border border-emerald-300/20 bg-emerald-500/10 p-3`}>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-200/80">Recommended</p>
        <p className={`${compact ? 'text-[11px]' : 'text-xs'} mt-1 text-emerald-100/90`}>
          Use the main buy button to open the live ABRA buy flow. The trade center remains available if users want to compare routes first.
        </p>
      </div>

      {/* Token Address Display */}
      <div className={`${compact ? 'mb-2' : 'mb-3'} p-2 rounded-lg bg-slate-950/50 border border-cyan-300/15`}>
        <p className="text-[10px] text-cyan-200/60 uppercase tracking-wide font-semibold mb-1">Token Address</p>
        <p className="text-xs text-cyan-100 font-mono break-all">{tokenAddress}</p>
      </div>

      <div className={`flex flex-col gap-2 ${compact ? 'mb-1' : 'mb-2'}`}>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          className={`rounded-lg bg-slate-950 border border-cyan-300/20 text-white placeholder:text-cyan-200/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 px-3 py-2'}`}
        />
        <button
          onClick={openExternalMarket}
          type="button"
          className={`ui-action rounded-lg border border-emerald-400/45 bg-emerald-500/25 text-emerald-50 font-semibold hover:bg-emerald-500/35 transition-all ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 min-w-[6.5rem] px-4 py-2 text-sm'}`}
        >
          <span className="inline-flex items-center gap-2">
            Buy ABRA Now <Wallet2 size={14} />
          </span>
        </button>
        <button
          onClick={goToInAppTrade}
          type="button"
          className={`rounded-lg border border-cyan-400/30 bg-slate-950/60 text-cyan-100 font-semibold hover:bg-slate-900 transition-all ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 min-w-[6.5rem] px-4 py-2 text-sm'}`}
        >
          <span className="inline-flex items-center gap-2">
            Compare In Trade Center <ArrowUpRight size={14} />
          </span>
        </button>
      </div>

      <p className={`${compact ? 'mt-1 text-[10px]' : 'mt-2 text-xs'} text-cyan-200/70`}>
        Use Buy ABRA Now for the fastest path. Use Compare In Trade Center if you want quotes, route context, and swap tools first.
      </p>
    </div>
  );
}
