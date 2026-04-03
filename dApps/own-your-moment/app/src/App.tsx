import { useEffect } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { Activity, Brain, GraduationCap, Sparkles, Users } from "lucide-react";
import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import KingAIWidget from "./components/KingAIWidget";
import OverviewModal from "./components/OverviewModal";
import OverviewWidget from "./components/OverviewWidget";
import WalletToolbar from "./components/WalletToolbar";
import { endpoint, idlMetadata, network } from "./lib/constants";
import DashboardPage from "./pages/Dashboard";
import KingAIPage from "./pages/KingAI";
import LandingPage from "./pages/Landing";
import NilMarketplacePage from "./pages/NilMarketplace";
import RecruiterPage from "./pages/Recruiter";
import TeamModePage from "./pages/TeamMode";

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
];

const navItems = [
  { to: "/app", label: "Dash", icon: Activity },
  { to: "/app/king-ai", label: "King", icon: Brain },
  { to: "/app/recruiter", label: "Recruit", icon: GraduationCap },
  { to: "/app/team-mode", label: "Team", icon: Users },
];

function DappFrame() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const tabClassName = ({ isActive }: { isActive: boolean }) =>
    [
      "group inline-flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] transition sm:rounded-2xl sm:px-3 sm:py-2 sm:text-[0.67rem] sm:tracking-[0.12em]",
      isActive
        ? "border-[#f2c230]/65 bg-[#f2c230]/14 text-[#f7d86d] shadow-[0_0_20px_rgba(242,194,48,0.26)]"
        : "border-white/10 bg-black/45 text-white/62 hover:border-[#eb1c24]/50 hover:text-white",
    ].join(" ");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-obsidian text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(235,28,36,0.24),transparent_32%),radial-gradient(circle_at_84%_16%,rgba(242,194,48,0.22),transparent_30%),radial-gradient(circle_at_50%_110%,rgba(235,28,36,0.18),transparent_38%),linear-gradient(160deg,#050505,#101010_48%,#090909)]" />
      <div className="pointer-events-none absolute inset-0 bg-court bg-[size:72px_72px] opacity-[0.14]" />

      <div className="relative mx-auto min-h-screen w-full max-w-6xl px-3 pb-28 pt-3 sm:px-6 sm:pb-10 sm:pt-6">
        <section className="relative overflow-visible rounded-[30px] border border-white/12 bg-black/50 shadow-[0_0_64px_rgba(235,28,36,0.16)] backdrop-blur-xl sm:overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(235,28,36,0.16),transparent_42%),radial-gradient(circle_at_78%_0%,rgba(242,194,48,0.16),transparent_44%)]" />

          <header className="relative border-b border-white/10 px-4 pb-5 pt-4 sm:px-6 sm:pt-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div>
                  <p className="text-[0.54rem] uppercase tracking-[0.2em] text-[#f2c230] sm:text-[0.62rem] sm:tracking-[0.28em]">Swain Basketball x Solana Devnet</p>
                  <h1 className="mt-2 font-display text-xl uppercase tracking-[0.1em] text-white sm:text-3xl sm:tracking-[0.14em]">Own Your Moment</h1>
                </div>
                <div className="flex flex-wrap gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-white/58">
                  <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1">{network}</span>
                  <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1">{idlMetadata.name}</span>
                  <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1">v{idlMetadata.version}</span>
                </div>
              </div>

              <div className="lg:w-[19.5rem]">
                <WalletToolbar />
              </div>
            </div>
          </header>

          <main className="relative px-4 pb-32 pt-4 sm:px-6 sm:pb-24 sm:pt-5">
            <Routes>
              <Route index element={<DashboardPage />} />
              <Route path="king-ai" element={<KingAIPage />} />
              <Route path="marketplace/:athleteId" element={<NilMarketplacePage />} />
              <Route path="recruiter" element={<RecruiterPage />} />
              <Route path="team-mode" element={<TeamModePage />} />
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </main>
        </section>

        <nav
          className="fixed inset-x-2 bottom-0 z-30 w-auto rounded-t-[22px] border border-b-0 border-[#f2c230]/35 bg-[linear-gradient(145deg,rgba(18,13,12,0.94),rgba(10,10,10,0.95))] px-2 pb-2 pt-2 shadow-[0_0_30px_rgba(235,28,36,0.24)] backdrop-blur-2xl sm:bottom-4 sm:left-1/2 sm:right-auto sm:w-[min(88%,30rem)] sm:-translate-x-1/2 sm:rounded-[26px] sm:border-b"
          role="tablist"
          aria-label="App tabs"
        >
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end={to === "/app"} className={tabClassName}>
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/10 sm:rounded-[26px]" />
        </nav>

        <div className="pointer-events-none mt-2 flex items-center justify-center gap-2 text-[0.54rem] uppercase tracking-[0.14em] text-white/45 sm:hidden">
          <Sparkles className="h-3 w-3 text-[#f2c230]" />
          Quick mobile tab dock
        </div>
      </div>

      <KingAIWidget />
      <OverviewWidget />
      <OverviewModal />
    </div>
  );
}

function AppFrame() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<DappFrame />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AppFrame />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
