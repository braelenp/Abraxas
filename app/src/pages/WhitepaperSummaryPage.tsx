import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import {
  ABRAXAS_PLAIN_ENGLISH_EXPLAINER,
  ABRAXAS_PRIMARY_VALUE_PROP,
  ABRAXAS_SHORT_FLOW,
  ABRAXAS_SUPPORTING_VALUE_PROP,
} from '../lib/messaging';

/**
 * ── Whitepaper Summary Page ──────────────────────────────────────────────────
 * Shown after profile creation
 * One scrollable screen with clean summary of Sovereign Regime – Tokenization Engine
 * Button at bottom to "Enter the Dapp"
 */

function DarkBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-30 bg-slate-950" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 mix-blend-screen [background:linear-gradient(135deg,transparent_0%,rgba(153,69,255,0.2)_30%,transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(45deg,transparent_0%,rgba(157,78,221,0.15)_40%,transparent_70%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(ellipse_at_center,rgba(153,69,255,0.08)_0%,transparent_70%)]" />
    </>
  );
}

function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-purple-400/20 blur-sm"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          from { opacity: 0; }
          50% { opacity: 0.8; }
          to { opacity: 0; transform: translateY(-100vh); }
        }
      `}</style>
    </div>
  );
}

export function WhitepaperSummaryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
      if (scrollTop > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterDapp = () => {
    try {
      localStorage.removeItem('hasSeenIntroModal');
    } catch {
      // Ignore storage errors and continue navigation.
    }

    navigate('/app/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950">
      <DarkBackground />
      <Particles />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-900">
        <div
          className="h-full bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Welcome Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Success Badge */}
            <div className="inline-flex items-center justify-center">
              <div className="bg-green-500/20 border border-green-500/50 rounded-full p-4 animate-pulse">
                <CheckCircle size={48} className="text-green-400" />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400">
              Welcome to Sovereign Regime
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate-200 leading-relaxed">
              Welcome to the Tokenization Engine. Now let's explain what you've just joined.
            </p>

            {/* Logo */}
            <div className="flex justify-center">
              <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(153,69,255,0.4)]">
                <img
                  src="/assets/sovereign-logo.jpg"
                  alt="Sovereign Regime"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background = 'linear-gradient(135deg, rgba(153, 69, 255, 0.3), rgba(251, 191, 36, 0.3))';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Whitepaper Summary Section */}
        <div className="relative px-4 py-12 bg-gradient-to-b from-slate-900/30 to-slate-950/60">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Main Title */}
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">
                Sovereign Regime – Tokenization Engine
              </h2>
              <p className="text-sm text-slate-300">One-minute plain-English overview</p>
            </div>

            {/* Main Description */}
            <div className="bg-slate-900/60 border border-purple-400/20 rounded-xl p-8 space-y-6">
              <h3 className="text-xl font-black text-purple-300 text-center">
                {ABRAXAS_PRIMARY_VALUE_PROP}
              </h3>
              <p className="text-sm text-center text-slate-300">{ABRAXAS_SUPPORTING_VALUE_PROP}</p>
              <p className="text-sm text-center text-slate-400">{ABRAXAS_PLAIN_ENGLISH_EXPLAINER}</p>

              {/* Key Points */}
              <div className="space-y-5">
                {/* Point 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-500/20 border border-purple-400/50">
                      <span className="text-purple-300 font-bold text-sm">1</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-purple-300 mb-1">Mint BlackBox NFTs</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Tokenize real-world assets (real estate, watches, art, yachts, jets, collectibles) into BlackBox NFTs – the on-chain Black Card for sovereign individuals.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 border border-amber-400/50">
                      <span className="text-amber-300 font-bold text-sm">2</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-amber-300 mb-1">Deploy to Sophia Vaults</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Move BlackBox NFTs into Sophia Vaults where Species AI agents manage and compound your capital 24/7 while you maintain full ownership.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-400/50">
                      <span className="text-emerald-300 font-bold text-sm">3</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-emerald-300 mb-1">Earn ALLURE Yields</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Receive ALLURE stablecoin yields as agents manage your positions. Earn passive income while retaining complete sovereignty over your capital.
                    </p>
                  </div>
                </div>

                {/* Point 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-500/20 border border-purple-400/50">
                      <span className="text-purple-400 font-bold text-sm">4</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-purple-400 mb-1">We Build the People</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Sovereign Regime builds elite individuals. The people build the business. You stay in control, earn yields, and compound capital autonomously.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How You Participate */}
            <div className="bg-slate-900/60 border border-amber-400/20 rounded-xl p-8 space-y-4">
              <h3 className="text-lg font-bold text-amber-300">The Tokenization Flow</h3>
              <p className="text-sm text-slate-300">{ABRAXAS_SHORT_FLOW}</p>

              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="text-purple-400 font-bold min-w-fit">Academy:</span>
                  <p className="text-sm text-slate-300">Generate capital through the Academy trading edge.</p>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="text-amber-400 font-bold min-w-fit">Tokenize:</span>
                  <p className="text-sm text-slate-300">Mint BlackBox NFTs from real-world assets.</p>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="text-emerald-400 font-bold min-w-fit">Deploy:</span>
                  <p className="text-sm text-slate-300">Put BlackBox NFTs into Sophia Vaults and activate Species AI agents.</p>
                </div>
              </div>
            </div>

            {/* Primary App Sections */}
            <div className="bg-slate-900/60 border border-orange-300/20 rounded-xl p-8 space-y-4">
              <h3 className="text-lg font-bold text-orange-300">Four Core Sections</h3>
              <p className="text-xs text-slate-300 mb-4">The main app navigation is intentionally simple:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="flex gap-2">
                  <span className="text-purple-400 font-bold">1.</span>
                  <span className="text-slate-300">Dashboard</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-400 font-bold">2.</span>
                  <span className="text-slate-300">Tokenize</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-400 font-bold">3.</span>
                  <span className="text-slate-300">My Vaults</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-violet-400 font-bold">4.</span>
                  <span className="text-slate-300">Agents</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                This is the Sovereign Regime tokenization engine. Four tabs. Clean flow. Advanced tools sit inside sections without expanding the main navigation.
              </p>
            </div>

            {/* Call to Action Info */}
            <div className="bg-gradient-to-r from-purple-900/40 to-amber-900/40 border border-purple-400/30 rounded-xl p-8 text-center space-y-3">
              <p className="text-sm font-semibold text-purple-200">
                You're ready to explore the Sovereign Regime.
              </p>
              <p className="text-xs text-slate-300">
                Click below to enter the four-tab tokenization engine, mint BlackBox NFTs, deploy to Sophia Vaults, and let Species AI manage your capital in sovereign silence.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section - Fixed Footer */}
        <div className="sticky bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-12 pb-6 px-4">
          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            <button
              onClick={handleEnterDapp}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-purple-400/60 bg-gradient-to-r from-purple-500/30 to-amber-500/20 text-purple-100 font-bold text-lg hover:from-purple-500/40 hover:to-amber-500/30 transition-all shadow-[0_0_32px_rgba(153,69,255,0.3)] hover:shadow-[0_0_48px_rgba(153,69,255,0.5)]"
            >
              Enter the Dapp
              <ArrowRight size={20} />
            </button>

            <p className="text-xs text-center text-slate-400">
              {hasScrolled ? 'You understand the Sovereign Regime. Now enter it.' : 'Scroll to learn more'}
            </p>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
}
