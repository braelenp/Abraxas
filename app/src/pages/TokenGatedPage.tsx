import { useEffect, useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAbraBalance } from '../hooks/useAbraBalance';
import { ExternalLink, RefreshCw } from 'lucide-react';

export function TokenGatedPage() {
  const { balance, balanceFormatted, isLoading, error, hasMinimum } = useAbraBalance(10);
  const { connected } = useWallet();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ASCII art for the gate
  const gateAscii = `
  ╔═══════════════════════════════════╗
  ║  ✦  SPECIES  SANCTUM  SEALED  ✦  ║
  ║                                   ║
  ║   Hold $ABRA to Enter              ║
  ║   The Sacred Vessel                ║
  ╚═══════════════════════════════════╝
  `;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Clear cached balance to force fresh RPC call
    try {
      localStorage.removeItem('abraBalance');
    } catch {
      // Ignore cache errors
    }
    // Reload page to fetch fresh balance
    await new Promise((resolve) => setTimeout(resolve, 800));
    window.location.reload();
  };

  const buyAbraUrl = 'https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';

  return (
    <div
      ref={containerRef}
      className="tech-distortion relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-y-auto overflow-x-hidden bg-slate-950 text-slate-100"
    >
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-slate-950" />
      <div className="pointer-events-none fixed inset-0 -z-20 [background:radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_56%)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-slate-900/0 via-slate-950/25 to-slate-950/55" />
      <div className="pointer-events-none fixed -top-28 left-1/2 -z-15 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-300/10 blur-3xl" />
      <div className="pointer-events-none fixed top-44 -right-24 -z-15 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 -left-32 -z-15 h-96 w-96 rounded-full bg-cyan-300/5 blur-3xl" />
      <div className="pointer-events-none fixed inset-0 -z-15 opacity-20 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.07)_0px,rgba(148,163,184,0.07)_1px,transparent_2px,transparent_5px)]" />
      <div className="pointer-events-none fixed inset-0 -z-15 opacity-25 mix-blend-screen [background:linear-gradient(105deg,transparent_20%,rgba(34,211,238,0.15)_50%,transparent_78%)]" />

      {/* Main gate content - scrollable on mobile */}
      <div className="relative z-10 flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 min-h-full">
        {/* ASCII Gate Art */}
        <pre
          className="mb-4 sm:mb-6 font-mono text-[8px] sm:text-[9px] tracking-tighter leading-3 sm:leading-4 text-cyan-300/60 drop-shadow-md"
          style={{ textShadow: '0 0 16px rgba(34, 211, 238, 0.3)' }}
        >
          {gateAscii}
        </pre>

        {/* Wallet Connection Section */}
        {!connected && (
          <div className="mb-4 sm:mb-8 w-full max-w-xs rounded-lg border border-amber-300/50 bg-amber-950/30 p-3 sm:p-4 text-center">
            <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs font-mono text-amber-300 uppercase tracking-widest">
              ✦ Connect Wallet to Continue
            </p>
            <WalletMultiButton className="ui-action !w-full !h-9 sm:!h-10 !rounded-lg !border !border-amber-400/60 !bg-amber-400/20 !text-[11px] sm:!text-[12px] !font-semibold !text-amber-100 hover:!bg-amber-400/30 hover:!border-amber-400/80" />
          </div>
        )}

        {/* Main message */}
        <div className="mb-4 sm:mb-8 text-center">
          <h1 className="mb-1 sm:mb-2 text-2xl sm:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300 drop-shadow-lg">
            Hold $ABRA
          </h1>
          <p className="text-lg sm:text-2xl mb-2 sm:mb-4 font-semibold text-purple-200 tracking-widest drop-shadow-md">
            to Enter the Species
          </p>
          <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-[0.2em]">
            ✦ Hackathon Gated Access ✦
          </p>
        </div>

        {/* Status card */}
        <div className="w-full max-w-xs mb-4 sm:mb-8 rounded-xl border border-cyan-300/40 bg-slate-900/50 p-4 sm:p-6 backdrop-blur-sm max-h-[45vh] overflow-y-auto">
          {!connected && !isLoading ? (
            <div className="text-center space-y-3">
              <div className="text-3xl">🔗</div>
              <p className="text-sm text-cyan-300 font-mono uppercase tracking-wider">Wallet Disconnected</p>
              <p className="text-xs text-slate-400">Click the button above to connect</p>
            </div>
          ) : isLoading ? (
            <div className="text-center space-y-3">
              <div className="inline-block animate-spin">
                <div className="w-8 h-8 border-2 border-cyan-300/30 border-t-cyan-300 rounded-full" />
              </div>
              <p className="text-sm text-slate-300 font-mono">Scanning balance...</p>
              <p className="text-[9px] text-slate-400">Retrying if rate limited</p>
            </div>
          ) : error ? (
            <div className="text-center space-y-3">
              <div className="text-4xl">⚠️</div>
              <p className="text-xs font-mono text-slate-300 uppercase tracking-widest mb-2">Configuration Error</p>
              {error.includes('not deployed') || error.includes('could not find') ? (
                <>
                  <p className="text-xs text-amber-300 font-mono leading-relaxed">
                    Token not available on this network.
                  </p>
                  <div className="bg-slate-800/50 rounded p-3 text-[10px] text-slate-300 space-y-2">
                    <p className="font-semibold text-amber-200">Options:</p>
                    <ul className="text-left space-y-1">
                      <li>• Switch wallet to <span className="text-cyan-300">Mainnet</span></li>
                      <li>• Or deploy ABRA token to devnet</li>
                      <li>• Set VITE_ABRA_TOKEN_MINT_DEVNET in .env</li>
                    </ul>
                  </div>
                </>
              ) : error.includes('rate limited') || error.includes('429') || error.includes('402') || error.includes('403') || error.includes('401') ? (
                <>
                  <p className="text-xs text-amber-300 font-mono leading-relaxed">
                    RPC endpoint is rate limited or busy.
                  </p>
                  <div className="bg-slate-800/50 rounded p-3 text-[10px] text-slate-300 space-y-2">
                    <p className="font-semibold text-amber-200">What's happening:</p>
                    <p className="text-[9px]">Retrying automatically with backoff...</p>
                    <p className="font-semibold text-amber-200 mt-2">If it continues:</p>
                    <ul className="text-left space-y-1">
                      <li>• Wait 60+ seconds for cache to refresh</li>
                      <li>• Or use a free RPC endpoint:</li>
                      <li className="ml-2">- Helius: helius.dev</li>
                      <li className="ml-2">- QuickNode: quicknode.com</li>
                      <li>• Add to .env: VITE_SOLANA_RPC_URL=your_url</li>
                    </ul>
                  </div>
                </>
              ) : error.includes('network') || error.includes('connection') ? (
                <>
                  <p className="text-xs text-red-300 font-mono leading-relaxed">
                    Network connection issue.
                  </p>
                  <p className="text-xs text-slate-400">Check your internet connection and try refreshing.</p>
                </>
              ) : (
                <>
                  <p className="text-xs text-red-300 font-mono">{error}</p>
                  <p className="text-xs text-slate-400">Try refreshing or check your connection</p>
                </>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest">Your Balance</p>
                <p
                  className="text-2xl sm:text-3xl font-black font-mono drop-shadow-md transition-colors"
                  style={{
                    color: hasMinimum ? 'rgb(34, 197, 94)' : 'rgb(248, 113, 113)',
                    textShadow: hasMinimum
                      ? '0 0 24px rgba(34, 197, 94, 0.5)'
                      : '0 0 24px rgba(248, 113, 113, 0.5)',
                  }}
                >
                  {balanceFormatted}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-400">
                  {hasMinimum ? '✓ Sufficient holdings' : '✗ Below minimum threshold'}
                </p>
              </div>

              <div className="text-[10px] sm:text-xs text-slate-400 font-mono">
                <p>Minimum Required: <span className="text-cyan-300 font-semibold">10.00 $ABRA</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Success message if passes gate */}
        {hasMinimum && !isLoading && (
          <div className="w-full max-w-xs mb-3 sm:mb-6 rounded-lg border border-emerald-300/50 bg-emerald-950/40 p-3 sm:p-4 text-center animate-pulse">
            <p className="text-xs sm:text-sm font-semibold text-emerald-300 font-mono uppercase tracking-wider">
              ✓ Access Granted — Refresh Page
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-2 sm:space-y-3 w-full max-w-xs mb-6">
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="ui-action w-full inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/50 bg-cyan-300/20 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-100 shadow-[0_0_16px_rgba(6,182,212,0.2)] transition disabled:opacity-50 hover:border-cyan-300/60 hover:bg-cyan-300/30 hover:shadow-[0_0_24px_rgba(6,182,212,0.4)]"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh Balance
          </button>

          {/* Buy ABRA button - always visible if not holding enough */}
          {!hasMinimum && (
            <a
              href={buyAbraUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-action w-full inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/60 bg-amber-400/20 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100 shadow-[0_0_16px_rgba(251,146,60,0.2)] transition hover:border-amber-400/80 hover:bg-amber-400/30 hover:shadow-[0_0_24px_rgba(251,146,60,0.4)]"
            >
              <ExternalLink size={14} />
              Buy $ABRA on Bags
            </a>
          )}

          {/* Enter button - only visible if has minimum */}
          {hasMinimum && !isLoading && (
            <button
              onClick={() => window.location.reload()}
              className="ui-action w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/60 bg-emerald-400/20 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-100 shadow-[0_0_16px_rgba(34,197,94,0.2)] transition hover:border-emerald-400/80 hover:bg-emerald-400/30 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]"
            >
              ✓ Enter Abraxas
            </button>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 border-t border-slate-700/50 bg-slate-950/60 px-3 sm:px-4 py-3 sm:py-4 backdrop-blur-sm text-center mt-auto">
        <p className="text-[10px] sm:text-xs text-slate-400 font-mono leading-relaxed">
          Token gating active during hackathon period.{' '}
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-200 transition underline"
          >
            Get ABRA
          </a>
        </p>
      </div>
    </div>
  );
}
