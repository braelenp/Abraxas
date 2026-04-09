import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Route, Routes, useLocation, NavLink, Navigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { DashboardPage } from './pages/DashboardPage';
import { VaultsPage } from './pages/VaultsPage';
import { MarketPage } from './pages/MarketPage';
import { CadabraPage } from './pages/CadabraPage';
import { TradePage } from './pages/TradePage';
import { CircuitPage } from './pages/CircuitPage';
import { SophiaMintPage } from './pages/SophiaMintPage';
import { OrionPage } from './pages/OrionPage';
import { LandingPage } from './pages/LandingPage';
import { CampaignLandingPage } from './pages/CampaignLandingPage';
import { ForgePage } from './pages/ForgePage';
import { LoadingPage } from './pages/LoadingPage';
import { TokenGatedPage } from './pages/TokenGatedPage';
import { StakePage } from './pages/StakePage';
import { DepositPage } from './pages/DepositPage';
import { WithdrawPage } from './pages/WithdrawPage';
import { CashOutPage } from './pages/CashOutPage';
import { ProfilePage } from './pages/ProfilePage';
import { BrandLogo } from './components/BrandLogo';
import { OrionAssistant } from './components/OrionAssistant';
import { HackathonBanner } from './components/HackathonBanner';
import { useAbraBalance } from './hooks/useAbraBalance';

// ── Living rune wheel navigation ─────────────────────────────────────────────
const navItems = [
  { to: '/app/profile',  label: 'Profile',   rune: '✧' },
  { to: '/app/forge',    label: 'Forge',     rune: 'ᚲ' },
  { to: '/app/orion',    label: 'King AI',   rune: 'ᛏ' },
  { to: '/app/cadabra',  label: 'Cadabra',   rune: '✦' },
  { to: '/app/market',   label: 'Market',    rune: 'ᛋ' },
  { to: '/app/vaults',   label: 'Vaults',    rune: 'ᚨ' },
  { to: '/app/circuit',  label: 'Circuit',   rune: 'ᚦ' },
  { to: '/app/trade',    label: 'Trade',     rune: 'ᛚ' },
];

function ProtectedDapp() {
  const { hasMinimum, isLoading } = useAbraBalance(10);
  
  // If still loading, show loading page while checking balance
  if (isLoading) {
    return <LoadingPage />;
  }

  // If balance is below minimum, show gate page
  if (!hasMinimum) {
    return <TokenGatedPage />;
  }

  // Otherwise show full dApp
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
  const [backgroundErrors, setBackgroundErrors] = useState(0);
  const [hasSeenIntroModal, setHasSeenIntroModal] = useState(() => {
    // Load intro modal dismissal from localStorage on mount
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('hasSeenIntroModal') === 'true';
    } catch {
      return false;
    }
  });

  const onBackgroundError = useCallback(() => {
    // Track errors to prevent infinite cycling
    setBackgroundErrors((prev) => {
      const newErrorCount = prev + 1;
      // Only cycle through images if we haven't exceeded the candidate count
      // This prevents infinite loops if all images fail
      if (newErrorCount <= dappBackgroundCandidates.length) {
        setBackgroundIndex((current) => {
          if (current < dappBackgroundCandidates.length - 1) {
            return current + 1;
          }
          return current;
        });
      }
      return newErrorCount;
    });
  }, [dappBackgroundCandidates.length]);

  // Dismiss intro modal and persist to localStorage
  const dismissIntroModal = () => {
    setHasSeenIntroModal(true);
    try {
      localStorage.setItem('hasSeenIntroModal', 'true');
    } catch (e) {
      console.warn('Could not save intro modal state:', e);
    }
  };

  useEffect(() => {
    const audio = introAmbientRef.current;
    if (!audio) {
      return;
    }

    audio.loop = true;
    audio.volume = 0.34;

    if (connected && !hasSeenIntroModal) {
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
  }, [connected, hasSeenIntroModal]);

  // Scroll content to top when route changes (tab navigation)
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    // Reset background errors on route change
    setBackgroundErrors(0);
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
        <p className="text-xs text-slate-300/80">ᚲ Forge · ᚨ Vaults · ᛋ Market · ✦ Cadabra · ᛏ King AI · ᚦ Circuit · ᛚ Trade</p>
      </header>

      <HackathonBanner show={true} />

      <main
        ref={contentRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-y-none px-4 py-4 pb-4 [touch-action:pan-y]"
      >
        <Routes>
          <Route index element={<ProfilePage />} />
          <Route path="forge" element={<ForgePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="vaults" element={<VaultsPage />} />
          <Route path="market" element={<MarketPage />} />
          <Route path="cadabra" element={<CadabraPage />} />
          <Route path="trade" element={<TradePage />} />
          <Route path="orion" element={<OrionPage />} />
          <Route path="circuit" element={<CircuitPage />} />
          <Route path="sophia" element={<SophiaMintPage />} />
          <Route path="warden" element={<DashboardPage />} />
          <Route path="stake" element={<StakePage />} />
          <Route path="deposit" element={<DepositPage />} />
          <Route path="withdraw" element={<WithdrawPage />} />
          <Route path="cashout" element={<CashOutPage />} />
        </Routes>
      </main>

      {!hasSeenIntroModal ? (
        <>
          <div className="fixed top-0 left-1/2 z-[55] h-full w-full max-w-md -translate-x-1/2 bg-slate-950/18 backdrop-blur-[2px]" />
          <div className="fixed top-1/2 left-1/2 z-[56] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2">
            <div className="glow-panel rounded-2xl border border-cyan-300/35 bg-slate-950/92 p-4 backdrop-blur-xl">
              <div className="max-h-[56dvh] overflow-y-auto pr-1 text-sm text-slate-200">
                <p className="text-sm font-mono font-bold text-cyan-300 uppercase tracking-widest">&gt; [INTRO_AWAITS] SOVEREIGN_ENGINE</p>
                <p className="mt-3 leading-relaxed text-slate-300 text-xs">
                  You have entered the Abraxas Protocol — a tokenization engine that brings institutional-grade digital asset management to retail users on Solana. Built on World Labs Protocol infrastructure, Abraxas democratizes access to provably secure RWA handling sealed by seven Elder Futhark runes. Each rune binds an AI agent to institutional asset management domains.
                </p>

                <p className="mt-4 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">&gt; [RUNE_CIRCLE] MANIFEST</p>
                <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-300">
                  <li><span className="font-semibold text-orange-300">• ᚲ Kenaz — Forge.</span> Stake ABRA to mint positions, stack multipliers, and compound yield every lock cycle.</li>
                  <li><span className="font-semibold text-cyan-300">• ᚨ Ansuz — Vaults.</span> Autonomous vault engine. Handles every RWA deposit, assignment, and yield cycle with precision.</li>
                  <li><span className="font-semibold text-amber-300">• ᛋ Sowilo — Market.</span> Full market oversight. Browse all RWA classes, Foundation Market (Dapp Equity), and real-time data visualization.</li>
                  <li><span className="font-semibold text-purple-300">• ✦ Mirror — Cadabra.</span> The social mirror. Build community, share alpha, tokenize moments. Pulse gaming clips. Apex Legends tournaments.</li>
                  <li><span className="font-semibold text-red-300">• ᛏ Tiwaz — King AI.</span> Monitors World Labs institutional capital flows. Delivers sovereign judgment on dapp equity, M1 pulldown mechanics, and automated yield routing.</li>
                  <li><span className="font-semibold text-emerald-300">• ᚦ Thurisaz — Circuit.</span> Circuit breaker protection. Set thresholds to shield vaults from volatility, liquidity drain, and entropy.</li>
                  <li><span className="font-semibold text-teal-300">• ᛚ Laguz — Trade.</span> Acquire ABRA and execute fluid RWA swaps & routing via Bags DEX.</li>
                </ul>

                <p className="mt-4 text-xs leading-relaxed text-slate-300">
                  Each rune activates in its tab.<br />
                  Step through. The protocol awaits your intent.
                </p>

                <div className="mt-6 border-t border-amber-300/20 pt-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400 mb-2">&gt; [FOUNDATION_MARKET]</p>
                  <p className="text-xs leading-relaxed text-slate-300/90">
                    Inside the Market tab, witness the Foundation Market.<br />
                    The top 100 dApps on Bags are the infrastructure itself.<br />
                    <span className="text-purple-300 font-semibold">Own Dapp Equity RWA.</span><br />
                    Value scores, live metrics, verified builders. The foundation reveals itself.
                  </p>
                </div>

                <div className="mt-4 border-t border-cyan-300/20 pt-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 mb-2">&gt; [FORGE]</p>
                  <p className="text-xs leading-relaxed text-slate-300/90">
                    Kenaz transforms raw capital into tokenized sovereign yield positions.<br />
                    Assets surrender physical form for algorithmic compounding, liquidity, and autonomous market force.<br />
                    <span className="text-orange-300 font-semibold">You do not choose the asset.</span><br />
                    The one that burns for you reveals itself.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setHasSeenIntroModal(true);
                  // Persist intro modal dismissal to localStorage
                  try {
                    localStorage.setItem('hasSeenIntroModal', 'true');
                  } catch (e) {
                    console.warn('Could not save intro modal state:', e);
                  }
                }}
                className="enter-abraxas-pulse ui-action mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border border-amber-400/60 bg-slate-900/60 px-4 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest shadow-[0_0_16px_rgba(217,119,6,0.2)] hover:bg-slate-800/70 hover:border-amber-300/80 transition-all"
              >
                &gt; [ENTER] BEGIN_PROTOCOL
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

      {/* Bags Integration Badge */}
      <div className="z-35 mx-auto flex w-full max-w-md flex-none border-b border-emerald-400/20 bg-emerald-950/40 px-3 py-1.5 backdrop-blur-sm">
        <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-300/80">
          ✓ <span className="text-emerald-300 font-semibold">Powered by Bags</span> • Deep Integration • Fee-Share Active
        </div>
      </div>

      <nav className="z-40 mx-auto flex w-full max-w-md flex-none border-t border-yellow-300/15 bg-slate-950/94 px-1 pb-[calc(0.375rem+env(safe-area-inset-bottom))] pt-1 backdrop-blur-xl relative">
        {navItems.map(({ to, label, rune }) => (
          <NavLink
            key={to}
            to={to}
            end={true}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 transition cursor-pointer z-50 relative"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`text-xl font-black leading-tight transition-all duration-300 ${
                    isActive ? 'text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]' : 'text-slate-600 hover:text-slate-500'
                  }`}
                >
                  {rune}
                </span>
                <span
                  className={`text-[7.5px] uppercase tracking-[0.14em] transition ${
                    isActive ? 'text-yellow-200/80' : 'text-slate-600 hover:text-slate-500'
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 3 seconds on app startup
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/campaign" element={<CampaignLandingPage />} />
        <Route path="/app/*" element={<ProtectedDapp />} />
        <Route path="/vaults" element={<Navigate to="/app/vaults" replace />} />
        <Route path="/market" element={<Navigate to="/app/market" replace />} />
        <Route path="/onboard" element={<Navigate to="/app/trade" replace />} />
        <Route path="/trade" element={<Navigate to="/app/trade" replace />} />
        <Route path="/orion" element={<Navigate to="/app/orion" replace />} />
        <Route path="/circuit" element={<Navigate to="/app/circuit" replace />} />
        <Route path="/sophia" element={<Navigate to="/app/sophia" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
