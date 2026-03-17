import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Brain, LayoutDashboard, ShieldAlert, Sparkles, Vault } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { VaultsPage } from './pages/VaultsPage';
import { CircuitPage } from './pages/CircuitPage';
import { SophiaMintPage } from './pages/SophiaMintPage';
import { OrionPage } from './pages/OrionPage';
import { LandingPage } from './pages/LandingPage';
import { BrandLogo } from './components/BrandLogo';
import { OrionAssistant } from './components/OrionAssistant';

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/vaults', label: 'Vaults', icon: Vault },
  { to: '/app/orion', label: 'Orion', icon: Brain },
  { to: '/app/circuit', label: 'Circuit', icon: ShieldAlert },
  { to: '/app/sophia', label: 'Sophia', icon: Sparkles },
];

function ProtectedDapp() {
  return <DappShell />;
}

function DappShell() {
  const { connected } = useWallet();
  const introAmbientRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const dappBackgroundCandidates = useMemo(
    () => [
      '/assets/abraxas-background.jpg',
      '/assets/abraxas-background.jpeg',
      '/assets/abraxas-background.png',
      '/assets/abraxas-background.webp',
      '/assets/abraxas-logo-graphic.jpg',
    ],
    [],
  );
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [showAnimatedBackground, setShowAnimatedBackground] = useState(true);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [hasSeenIntroModal, setHasSeenIntroModal] = useState(false);

  const onBackgroundError = () => {
    if (backgroundIndex < dappBackgroundCandidates.length - 1) {
      setBackgroundIndex((current) => current + 1);
      return;
    }
    setShowAnimatedBackground(false);
  };

  useEffect(() => {
    if (connected) return;
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }, [connected]);

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

  return (
    <div className="dapp-theme tech-distortion relative mx-auto h-[100dvh] min-h-[100dvh] w-full max-w-md overflow-x-hidden overflow-y-auto text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-slate-950" />
      {showAnimatedBackground ? (
        <>
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
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slate-950/70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.2),transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/0 via-slate-950/25 to-slate-950/55" />
      <div className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/15 blur-3xl" />
      <div className="pointer-events-none absolute top-44 -right-24 -z-10 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.07)_0px,rgba(148,163,184,0.07)_1px,transparent_2px,transparent_5px)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(105deg,transparent_20%,rgba(34,211,238,0.18)_50%,transparent_78%)] [animation:tech-pulse_8s_ease-in-out_infinite]" />

      <header className="sticky top-0 z-50 border-b border-cyan-200/25 bg-slate-950/80 px-4 py-3 backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between gap-3">
          <BrandLogo size="sm" showWordmark className="dapp-header-brand" />
          <div className="dapp-header-wallet">
            <WalletMultiButton className="ui-action !h-8 !max-w-[8.75rem] !rounded-xl !border !border-cyan-300/55 !bg-cyan-300/20 !px-2 !text-[11px] !font-semibold !text-cyan-50 hover:!bg-cyan-300/32" />
          </div>
        </div>
        <p className="text-xs text-slate-300/80">RWA Vaults + Sophia Agents + Circuit Safety</p>
      </header>

      <main className="px-4 py-4 pb-[calc(5.25rem+env(safe-area-inset-bottom))]">
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="vaults" element={<VaultsPage />} />
          <Route path="orion" element={<OrionPage />} />
          <Route path="circuit" element={<CircuitPage />} />
          <Route path="sophia" element={<SophiaMintPage />} />
        </Routes>
      </main>

      {connected && showIntroModal ? (
        <>
          <div className="fixed top-0 left-1/2 z-[55] h-full w-full max-w-md -translate-x-1/2 bg-slate-950/18 backdrop-blur-[2px]" />
          <div className="fixed top-1/2 left-1/2 z-[56] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2">
            <div className="glow-panel rounded-2xl border border-cyan-300/35 bg-slate-950/92 p-4 backdrop-blur-xl">
              <div className="max-h-[56dvh] overflow-y-auto pr-1 text-sm text-slate-200">
                <p className="text-base font-semibold text-cyan-100">Welcome to ABRAXAS</p>
                <p className="mt-2 leading-relaxed text-slate-300">
                  You are entering a command layer for intelligent, real-world asset strategy on Solana — where vault orchestration, autonomous agents, and circuit safety converge.
                </p>

                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cyan-200/90">What you can do</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-300">
                  <li>• Monitor dashboard signals across liquidity, activity, and protocol behavior.</li>
                  <li>• Build and manage RWA vaults with guided allocation and assignment flows.</li>
                  <li>• Run Orion for tactical assistance on risk, vault operations, and next actions.</li>
                  <li>• Configure Circuit thresholds to simulate warning and protection states.</li>
                  <li>• Explore Sophia workflows for minting and agent-based execution paths.</li>
                </ul>

                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cyan-200/90">Tab overview</p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-300">
                  <li>• <span className="font-semibold text-cyan-100">Dashboard:</span> your live command center for ecosystem signals and rapid status checks.</li>
                  <li>• <span className="font-semibold text-cyan-100">Vaults:</span> create and manage RWA vault positions, allocations, and operational assignments.</li>
                  <li>• <span className="font-semibold text-cyan-100">Orion:</span> strategic assistant for guided decisions across risk, flows, and execution paths.</li>
                  <li>• <span className="font-semibold text-cyan-100">Circuit:</span> tune protection thresholds and test warning/protect behavior under stress.</li>
                  <li>• <span className="font-semibold text-cyan-100">Sophia:</span> run agent and mint workflows powering autonomous on-chain actions.</li>
                </ul>

                <p className="mt-3 leading-relaxed text-slate-300">
                  Start with a vault, stress-test your circuit logic, then let Orion guide your optimal move.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowIntroModal(false);
                  setHasSeenIntroModal(true);
                }}
                className="enter-abraxas-pulse ui-action mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border border-amber-200/75 bg-gradient-to-r from-amber-200 via-amber-100 to-orange-100 px-4 text-sm font-semibold text-slate-950 shadow-[0_0_14px_rgba(245,158,11,0.3)] hover:from-amber-100 hover:to-orange-100"
              >
                Enter the Control Surface
              </button>
            </div>
          </div>
        </>
      ) : null}

      {!connected ? (
        <>
          <div className="fixed top-0 left-1/2 z-[45] h-full w-full max-w-md -translate-x-1/2 bg-slate-950/18 backdrop-blur-[2px]" />
          <div className="pointer-events-none fixed top-1/2 left-1/2 z-[46] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2">
            <div className="glow-panel rounded-2xl border border-cyan-300/35 bg-slate-950/92 p-4 text-center backdrop-blur-xl">
              <p className="text-sm font-semibold text-cyan-100">Wallet connection required</p>
              <p className="mt-2 text-xs text-slate-300">Connect your wallet to continue using ABRAXAS.</p>
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

      <nav className="fixed right-0 bottom-[env(safe-area-inset-bottom)] left-0 z-40 mx-auto flex w-full max-w-md border-t border-cyan-200/25 bg-slate-950/88 p-2 backdrop-blur-xl">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-xs transition ${isActive ? 'bg-cyan-100/15 text-cyan-100' : 'text-slate-400 hover:text-slate-200'}`
            }
            end={to === '/app'}
          >
            <Icon size={16} />
            <span>{label}</span>
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
      <Route path="/orion" element={<Navigate to="/app/orion" replace />} />
      <Route path="/circuit" element={<Navigate to="/app/circuit" replace />} />
      <Route path="/sophia" element={<Navigate to="/app/sophia" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
