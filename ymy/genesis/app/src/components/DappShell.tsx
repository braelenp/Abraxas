import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import CodexLogo from './CodexLogo'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function DappShell() {
  return (
    <div className="fixed inset-0 z-0 bg-charcoal">
      {/* Animated background layers */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-slate-950" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-60">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-600/20 blur-3xl opacity-40" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl opacity-30" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slate-950/40 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_56%)]" />

      {/* Main dApp container */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-md min-h-0 flex-col overflow-hidden">
        {/* ── Header (Sticky Top) ──────────────────────────────────── */}
        <header className="sticky top-0 z-50 flex-none border-b border-cyan-200/25 bg-slate-950/80 px-4 py-3 md:px-4 md:py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <CodexLogo size="sm" />
            <WalletMultiButton
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgb(34, 211, 238)',
                color: 'rgb(34, 211, 238)',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '9px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: '0.5rem',
                height: '34px',
                padding: '0 12px',
              }}
            />
          </div>
          <p className="text-[7px] md:text-[8px] text-slate-400/70 mt-2 font-mono uppercase tracking-wider">
            ᚲ Genesis · ᛏ Forge · ᚨ Create · ᛋ Tokenize
          </p>
        </header>

        {/* ── Main Content Area (Scrollable) ────────────────────────── */}
        <main
          className="flex-1 min-h-0 overflow-y-auto overscroll-y-none px-4 md:px-4 py-4 md:py-4 pb-24 md:pb-28 [touch-action:pan-y]"
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          <Outlet />
        </main>

        {/* ── Bottom Navigation (Sticky) ─────────────────────────────── */}
        <BottomNav />
      </div>
    </div>
  )
}
