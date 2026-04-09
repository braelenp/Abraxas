import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { MINIMUM_TOKENS_FOR_ACCESS } from '../lib/token';

export function TokenGatedPage() {
  const { balanceFormatted, isLoading, error, hasMinimum } = useTokenBalance(MINIMUM_TOKENS_FOR_ACCESS);

  const handleRefresh = () => {
    localStorage.removeItem('cadabra_token_balance');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-auto z-50">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Title Section */}
        <div className="text-center mb-8 space-y-4">
          <p className="text-[7px] sm:text-[8px] md:text-[9px] font-mono text-cyan-300/60 uppercase tracking-[0.2em] drop-shadow-lg">
            ✦ ════════════════════════════════════════ ✦
          </p>
          <h1 className="text-[8px] sm:text-[10px] md:text-[12px] font-mono text-cyan-300 uppercase tracking-[0.15em] drop-shadow-lg">
            ✦ Cadabra Sanctum ✦
          </h1>
          <p className="text-[7px] sm:text-[8px] md:text-[9px] font-mono text-purple-300/70 uppercase tracking-[0.15em]">
            Access Sealed...
          </p>
          <p className="text-[7px] sm:text-[8px] md:text-[9px] font-mono text-cyan-300/60 uppercase tracking-[0.2em] drop-shadow-lg">
            ✦ ════════════════════════════════════════ ✦
          </p>
        </div>

        {/* Main Card */}
        <article className="max-w-md w-full border border-purple-400/30 rounded-2xl bg-gradient-to-b from-slate-900/95 to-purple-900/40 backdrop-blur-xl p-6 shadow-2xl space-y-5">
          {/* Status Section */}
          <div className="text-center space-y-2">
            <p className="text-[10px] font-mono text-slate-300 uppercase tracking-wider">Token Status</p>

            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 border-2 border-purple-300/30 border-t-purple-300 rounded-full" />
              </div>
            ) : error ? (
              <div className="space-y-2 py-4">
                <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3">
                  <p className="text-[10px] text-red-300 font-mono">{error}</p>
                  <p className="text-[8px] text-red-300/70 mt-2">
                    Visit Helius.dev for RPC setup assistance.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`py-4 rounded-lg border ${
                  hasMinimum
                    ? 'bg-emerald-500/10 border-emerald-400/30'
                    : 'bg-red-500/10 border-red-400/30'
                }`}
              >
                <p
                  className={`text-4xl font-black drop-shadow-lg ${
                    hasMinimum ? 'text-emerald-400' : 'text-red-400'
                  }`}
                  style={
                    hasMinimum
                      ? { textShadow: '0 0 24px rgba(52, 211, 153, 0.5)' }
                      : { textShadow: '0 0 24px rgba(248, 113, 113, 0.5)' }
                  }
                >
                  {balanceFormatted}
                </p>
                <p className={`text-[10px] font-mono mt-2 ${
                    hasMinimum ? 'text-emerald-300/80' : 'text-red-300/80'
                  }`}>
                  {hasMinimum ? '✓ Access Granted' : '✗ Insufficient Balance'}
                </p>
              </div>
            )}
          </div>

          {/* Wallet Connection */}
          {!isLoading && (
            <div className="pt-4">
              <div className="mb-4 flex justify-center">
                <div className="w-full max-w-xs">
                  <WalletMultiButton className="!bg-gradient-to-r !from-amber-500 !to-amber-600 hover:!from-amber-400 hover:!to-amber-500 !w-full !py-3 !rounded-lg !text-[11px] !font-semibold !uppercase !tracking-widest !shadow-lg hover:!shadow-amber-500/50" />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 text-[10px] font-semibold uppercase tracking-wider active:scale-95"
            >
              Refresh Balance
            </button>

            {hasMinimum && !isLoading && (
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white text-[10px] font-semibold uppercase tracking-wider active:scale-95 shadow-lg hover:shadow-purple-500/50"
              >
                Enter Cadabra
              </button>
            )}
          </div>

          {/* Info */}
          <div className="pt-4 border-t border-slate-600/30 text-center">
            <p className="text-[9px] text-slate-400 font-mono">
              Minimum balance required: {MINIMUM_TOKENS_FOR_ACCESS} tokens
            </p>
          </div>
        </article>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">
            ✦ Cadabra Protocol ✦
          </p>
        </div>
      </div>
    </div>
  );
}
