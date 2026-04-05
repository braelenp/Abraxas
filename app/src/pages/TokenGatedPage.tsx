import { useEffect, useRef, useState } from 'react';
import { useAbraBalance } from '../hooks/useAbraBalance';
import { ExternalLink, RefreshCw } from 'lucide-react';

export function TokenGatedPage() {
  const { balance, balanceFormatted, isLoading, error, hasMinimum } = useAbraBalance(10);
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
    // Trigger a re-fetch by simulating a small delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRefreshing(false);
  };

  const buyAbraUrl = 'https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';

  return (
    <div
      ref={containerRef}
      className="tech-distortion relative mx-auto flex h-[100dvh] min-h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-slate-950 text-slate-100"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-slate-950" />
      <div className="pointer-events-none absolute inset-0 -z-20 [background:radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-slate-900/0 via-slate-950/25 to-slate-950/55" />
      <div className="pointer-events-none absolute -top-28 left-1/2 -z-15 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-300/10 blur-3xl" />
      <div className="pointer-events-none absolute top-44 -right-24 -z-15 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-32 -z-15 h-96 w-96 rounded-full bg-cyan-300/5 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-15 opacity-20 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.07)_0px,rgba(148,163,184,0.07)_1px,transparent_2px,transparent_5px)]" />
      <div className="pointer-events-none absolute inset-0 -z-15 opacity-25 mix-blend-screen [background:linear-gradient(105deg,transparent_20%,rgba(34,211,238,0.15)_50%,transparent_78%)]" />

      {/* Main gate content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-8">
        {/* Header spacer */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" />

        {/* ASCII Gate Art */}
        <pre
          className="mb-6 font-mono text-[9px] tracking-tighter leading-4 text-cyan-300/60 drop-shadow-md"
          style={{ textShadow: '0 0 16px rgba(34, 211, 238, 0.3)' }}
        >
          {gateAscii}
        </pre>

        {/* Main message */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300 drop-shadow-lg">
            Hold $ABRA
          </h1>
          <p className="text-2xl mb-4 font-semibold text-purple-200 tracking-widest drop-shadow-md">
            to Enter the Species
          </p>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-[0.2em]">
            ✦ Hackathon Gated Access ✦
          </p>
        </div>

        {/* Status card */}
        <div className="w-full max-w-xs mb-8 rounded-xl border border-cyan-300/40 bg-slate-900/50 p-6 backdrop-blur-sm">
          {isLoading ? (
            <div className="text-center space-y-3">
              <div className="inline-block animate-spin">
                <div className="w-8 h-8 border-2 border-cyan-300/30 border-t-cyan-300 rounded-full" />
              </div>
              <p className="text-sm text-slate-300 font-mono">Scanning balance...</p>
            </div>
          ) : error ? (
            <div className="text-center space-y-3">
              <div className="text-4xl">⚠️</div>
              <p className="text-sm text-red-300 font-mono">{error}</p>
              <p className="text-xs text-slate-400">Check wallet connection</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Your Balance</p>
                <p
                  className="text-3xl font-black font-mono drop-shadow-md transition-colors"
                  style={{
                    color: hasMinimum ? 'rgb(34, 197, 94)' : 'rgb(248, 113, 113)',
                    textShadow: hasMinimum
                      ? '0 0 24px rgba(34, 197, 94, 0.5)'
                      : '0 0 24px rgba(248, 113, 113, 0.5)',
                  }}
                >
                  {balanceFormatted}
                </p>
                <p className="text-xs text-slate-400">
                  {hasMinimum ? '✓ Sufficient holdings' : '✗ Below minimum threshold'}
                </p>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                <p>Minimum Required: <span className="text-cyan-300 font-semibold">10.00 $ABRA</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Success message if passes gate */}
        {hasMinimum && !isLoading && (
          <div className="w-full max-w-xs mb-6 rounded-lg border border-emerald-300/50 bg-emerald-950/40 p-4 text-center animate-pulse">
            <p className="text-sm font-semibold text-emerald-300 font-mono uppercase tracking-wider">
              ✓ Access Granted — Refresh Page
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3 w-full max-w-xs">
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="ui-action w-full inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/50 bg-cyan-300/20 px-4 py-3 text-sm font-bold uppercase tracking-wider text-cyan-100 shadow-[0_0_16px_rgba(6,182,212,0.2)] transition disabled:opacity-50 hover:border-cyan-300/60 hover:bg-cyan-300/30 hover:shadow-[0_0_24px_rgba(6,182,212,0.4)]"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh Balance
          </button>

          {/* Buy ABRA button - always visible if not holding enough */}
          {!hasMinimum && (
            <a
              href={buyAbraUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-action w-full inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/60 bg-amber-400/20 px-4 py-3 text-sm font-bold uppercase tracking-wider text-amber-100 shadow-[0_0_16px_rgba(251,146,60,0.2)] transition hover:border-amber-400/80 hover:bg-amber-400/30 hover:shadow-[0_0_24px_rgba(251,146,60,0.4)]"
            >
              <ExternalLink size={16} />
              Buy $ABRA on Bags
            </a>
          )}

          {/* Enter button - only visible if has minimum */}
          {hasMinimum && !isLoading && (
            <button
              onClick={() => window.location.reload()}
              className="ui-action w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/60 bg-emerald-400/20 px-4 py-3 text-sm font-bold uppercase tracking-wider text-emerald-100 shadow-[0_0_16px_rgba(34,197,94,0.2)] transition hover:border-emerald-400/80 hover:bg-emerald-400/30 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]"
            >
              ✓ Enter Abraxas
            </button>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 border-t border-slate-700/50 bg-slate-950/60 px-4 py-4 backdrop-blur-sm text-center">
        <p className="text-xs text-slate-400 font-mono">
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
