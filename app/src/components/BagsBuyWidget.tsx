import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';


export function BagsBuyWidget({ tokenAddress, compact = false }: { tokenAddress: string; compact?: boolean }) {
  const [amount, setAmount] = useState('');
  const marketUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || `https://bags.fm/${tokenAddress}`;
    if (!amount) {
      return baseUrl;
    }

    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}amount=${encodeURIComponent(amount)}`;
  }, [amount, tokenAddress]);

  const handleBuy = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.location.assign(marketUrl);
  };

  return (
    <div className={`bags-buy-widget rounded-xl border border-cyan-300/30 bg-slate-900/80 ${compact ? 'p-3' : 'p-4'}`}>
      <h3 className={`${compact ? 'mb-1 text-xs' : 'mb-2 text-sm'} font-bold text-cyan-200`}>Buy ABRA Live</h3>
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
          onClick={handleBuy}
          type="button"
          className={`ui-action rounded-lg border border-cyan-400/45 bg-cyan-500/25 text-cyan-100 font-semibold hover:bg-cyan-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 min-w-[6.5rem] px-4 py-2 text-sm'}`}
        >
          <span className="inline-flex items-center gap-2">
            Continue To Bags <ArrowUpRight size={14} />
          </span>
        </button>
      </div>
      <p className={`${compact ? 'mt-1 text-[10px]' : 'mt-2 text-xs'} text-cyan-200/70`}>
        Redirects straight to the live Bags market so the swap completes against the real liquidity venue.
      </p>
    </div>
  );
}
