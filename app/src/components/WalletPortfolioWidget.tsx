import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet, TrendingUp } from 'lucide-react';
import { useAbraBalance } from '../hooks/useAbraBalance';

export function WalletPortfolioWidget() {
  const { connected } = useWallet();
  const { balance, balanceFormatted, isLoading, error } = useAbraBalance(0);

  if (!connected) {
    return null;
  }

  return (
    <div className="rounded-xl border border-cyan-300/30 bg-slate-900/50 p-3 sm:p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Wallet icon + label */}
        <div className="flex items-center gap-2 min-w-0">
          <Wallet size={16} className="text-cyan-300 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider truncate">
            Portfolio
          </span>
        </div>

        {/* Right: Balance display */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-cyan-300/30 border-t-cyan-300 rounded-full animate-spin" />
              <span className="text-xs text-slate-400 font-mono">...</span>
            </div>
          ) : error ? (
            <span className="text-xs text-red-400 font-mono">Error</span>
          ) : (
            <>
              <TrendingUp size={14} className="text-emerald-400 flex-shrink-0" />
              <span className="text-sm sm:text-base font-mono font-bold text-cyan-300 whitespace-nowrap">
                {balanceFormatted}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-mono uppercase tracking-wider">
                $ABRA
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
