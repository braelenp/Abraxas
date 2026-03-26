import { useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes, useLocation, NavLink, Navigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { DashboardPage } from './pages/DashboardPage';
import { VaultsPage } from './pages/VaultsPage';
import { MarketPage } from './pages/MarketPage';
import { TradePage } from './pages/TradePage';
import { CircuitPage } from './pages/CircuitPage';
import { SophiaMintPage } from './pages/SophiaMintPage';
import { OrionPage } from './pages/OrionPage';
import { LandingPage } from './pages/LandingPage';
import { ForgePage } from './pages/ForgePage';
import { BrandLogo } from './components/BrandLogo';
import { OrionAssistant } from './components/OrionAssistant';

// ── Living rune wheel navigation ─────────────────────────────────────────────
const navItems = [
  { to: '/app',         label: 'Warden',  rune: 'ᛉ' },
  { to: '/app/vaults',  label: 'Sophia',  rune: 'ᚨ' },
  { to: '/app/market',  label: 'Horizon', rune: 'ᛋ' },
  { to: '/app/trade',   label: 'Flux',    rune: 'ᛚ' },
  { to: '/app/orion',   label: 'King',    rune: 'ᛏ' },
  { to: '/app/circuit', label: 'Aegis',   rune: 'ᚦ' },
  { to: '/app/forge',   label: 'Forge',   rune: 'ᚲ' },
];

function ProtectedDapp() {
  return <DappShell />;
}

function DappShell() {
  const { connected } = useWallet();
  const introAmbientRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const dappBackgroundCandidates = useMemo(
    () => [
      '/assets/sophia-minted.jpg',
      '/assets/abraxas-logo-graphic.jpg',
    ],
    [],
  );
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [hasSeenIntroModal, setHasSeenIntroModal] = useState(false);

  const onBackgroundError = () => {
    if (backgroundIndex < dappBackgroundCandidates.length - 1) {
      setBackgroundIndex((current) => current + 1);
    }
  };

  useEffect(() => {
    if (!connected) {
      setShowIntroModal(false);
      return;
    }

    if (!hasSeenIntroModal) {
      setShowIntroModal(true);
    }
  }, [connected, hasSeenIntroModal]);

  useEffect(() => {
    const audio = introAmbientRef.current;
    if (!audio) {
      return;
    }

    audio.loop = true;
    audio.volume = 0.34;

    if (connected && showIntroModal) {
      const playAttempt = audio.play();
      if (playAttempt) {
        void playAttempt.catch(() => {
          // Ignore autoplay failures; user interaction will resume playback.
        });
      }
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, [connected, showIntroModal]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="dapp-theme tech-distortion relative mx-auto flex h-[100dvh] min-h-[100dvh] w-full max-w-md min-h-0 flex-col overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-slate-950" />
      <img
        src={dappBackgroundCandidates[backgroundIndex]}
        alt=""
        className="dapp-moving-background pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center"
        onError={onBackgroundError}
      />
      <img
        src={dappBackgroundCandidates[backgroundIndex]}
        alt=""
        className="dapp-moving-background dapp-moving-background-secondary pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center"
        onError={onBackgroundError}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slate-950/70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.2),transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/0 via-slate-950/25 to-slate-950/55" />
      <div className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/15 blur-3xl" />
      <div className="pointer-events-none absolute top-44 -right-24 -z-10 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.07)_0px,rgba(148,163,184,0.07)_1px,transparent_2px,transparent_5px)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(105deg,transparent_20%,rgba(34,211,238,0.18)_50%,transparent_78%)] [animation:tech-pulse_8s_ease-in-out_infinite]" />

      <header className="sticky top-0 z-50 flex-none border-b border-cyan-200/25 bg-slate-950/80 px-4 py-3 backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between gap-3">
          <BrandLogo size="sm" showWordmark className="dapp-header-brand" />
          <div className="dapp-header-wallet">
            <WalletMultiButton className="ui-action !h-8 !max-w-[8.75rem] !rounded-xl !border !border-cyan-300/55 !bg-cyan-300/20 !px-2 !text-[11px] !font-semibold !text-cyan-50 hover:!bg-cyan-300/32" />
          </div>
        </div>
        <p className="text-xs text-slate-300/80">ᛉ Warden · ᚨ Sophia · ᛋ Horizon · ᛚ Flux · ᛏ King · ᚦ Aegis · ᚲ Forge</p>
      </header>

      <main
        ref={contentRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-y-none px-4 py-4 pb-4 [touch-action:pan-y]"
      >
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="vaults" element={<VaultsPage />} />
          <Route path="market" element={<MarketPage />} />
          <Route path="onboard" element={<TradePage />} />
          <Route path="trade" element={<TradePage />} />
          <Route path="orion" element={<OrionPage />} />
          <Route path="circuit" element={<CircuitPage />} />
          <Route path="sophia" element={<SophiaMintPage />} />
          <Route path="forge" element={<ForgePage />} />
        </Routes>
      </main>

      {connected && showIntroModal ? (
        <>
          <div className="fixed top-0 left-1/2 z-[55] h-full w-full max-w-md -translate-x-1/2 bg-slate-950/18 backdrop-blur-[2px]" />
          <div className="fixed top-1/2 left-1/2 z-[56] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2">
            <div className="glow-panel rounded-2xl border border-cyan-300/35 bg-slate-950/92 p-4 backdrop-blur-xl">
              <div className="max-h-[56dvh] overflow-y-auto pr-1 text-sm text-slate-200">
                <p className="text-base font-semibold text-cyan-100">The Seven Runes Await</p>
                <p className="mt-2 leading-relaxed text-slate-300">
                  You have entered the Abraxas sovereign engine. A living RWA protocol on Solana, guarded by seven Elder Futhark runes. Each rune is bound to an AI agent and a domain of power.
                </p>

                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cyan-200/90">The Seven Runes</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-300">
                  <li><span className="font-semibold text-violet-300">ᛉ Algiz · Warden</span> stands at your sovereign command center. Live Polymarket prediction markets, portfolio momentum, and real-time market intelligence flow through the Warden's watch.</li>
                  <li><span className="font-semibold text-cyan-300">ᚨ Ansuz · Sophia</span> speaks your vaults into being. She governs every RWA deposit, assignment, and yield cycle with autonomous precision.</li>
                  <li><span className="font-semibold text-amber-300">ᛋ Sowilo · Horizon</span> sees the entire market from above. Browse every listed RWA class, compare assets across athlete equity, real estate, and trading portfolios, and read the full live data book.</li>
                  <li><span className="font-semibold text-teal-300">ᛚ Laguz · Flux</span> moves where force cannot follow. Acquire ABRA, swap RWA pairs through Jupiter DEX, and route capital into position with fluid execution.</li>
                  <li><span className="font-semibold text-red-300">ᛏ Tiwaz · King</span> delivers sovereign judgment. He runs athlete development analysis, market forecasts, and pushes value creation actions directly into the protocol.</li>
                  <li><span className="font-semibold text-emerald-300">ᚦ Thurisaz · Aegis</span> holds the line. Set circuit breaker thresholds to protect your vaults from volatility, liquidity drain, and entropy before they breach.</li>
                  <li><span className="font-semibold text-orange-300">ᚲ Kenaz · Forge</span> keeps the sacred flame burning. Stake ABRA to forge positions, accumulate multipliers, and compound yield across every lock cycle.</li>
                </ul>

                <p className="mt-3 leading-relaxed text-slate-300">
                  Each rune reveals itself when you enter its tab. Step through the threshold. The protocol responds to sovereign intent.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowIntroModal(false);
                  setHasSeenIntroModal(true);
                }}
                className="enter-abraxas-pulse ui-action mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border border-amber-200/75 bg-gradient-to-r from-amber-200 via-amber-100 to-orange-100 px-4 text-sm font-semibold text-slate-950 shadow-[0_0_14px_rgba(245,158,11,0.3)] hover:from-amber-100 hover:to-orange-100"
              >
                Enter the Rune Circle
              </button>
            </div>
          </div>
        </>
      ) : null}

      {connected ? (
        <audio
          ref={introAmbientRef}
          src="/assets/landing-theme.mp3"
          preload="auto"
          playsInline
        />
      ) : null}

      {location.pathname === '/app/orion' ? null : <OrionAssistant />}

      <nav className="z-40 mx-auto flex w-full max-w-md flex-none border-t border-yellow-300/15 bg-slate-950/94 px-1 pb-[calc(0.375rem+env(safe-area-inset-bottom))] pt-1 backdrop-blur-xl">
        {navItems.map(({ to, label, rune }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/app'}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 transition"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`text-xl font-black leading-tight transition-all duration-300 ${
                    isActive ? 'text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]' : 'text-slate-600'
                  }`}
                >
                  {rune}
                </span>
                <span
                  className={`text-[7.5px] uppercase tracking-[0.14em] transition ${
                    isActive ? 'text-yellow-200/80' : 'text-slate-600'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app/*" element={<ProtectedDapp />} />
      <Route path="/vaults" element={<Navigate to="/app/vaults" replace />} />
      <Route path="/market" element={<Navigate to="/app/market" replace />} />
      <Route path="/onboard" element={<Navigate to="/app/onboard" replace />} />
      <Route path="/trade" element={<Navigate to="/app/trade" replace />} />
      <Route path="/orion" element={<Navigate to="/app/orion" replace />} />
      <Route path="/circuit" element={<Navigate to="/app/circuit" replace />} />
      <Route path="/sophia" element={<Navigate to="/app/sophia" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
