import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Play, Radio, Wallet, ChevronDown, Sparkles, Flame, TrendingUp } from 'lucide-react'
import { AnimatedPulseText } from '../components/AnimatedPulseText'

function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-purple-300/20 blur-sm"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

function LightBeams() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-screen [background:linear-gradient(135deg,transparent_0%,rgba(153,69,255,0.25)_30%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(45deg,transparent_0%,rgba(168,85,247,0.2)_40%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-screen [background:linear-gradient(to_top,rgba(251,191,36,0.15)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_center,rgba(153,69,255,0.15)_0%,transparent_70%)]" />
    </>
  )
}

function AnimatedPulseIcon() {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center">
      {/* Outer rotating rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <circle 
          cx="100" 
          cy="100" 
          r="95" 
          fill="none" 
          stroke="url(#pulseGrad1)" 
          strokeWidth="1" 
          opacity="0.4"
          style={{ animation: 'spin 20s linear infinite' }}
        />
        <circle 
          cx="100" 
          cy="100" 
          r="75" 
          fill="none" 
          stroke="url(#pulseGrad2)" 
          strokeWidth="1" 
          opacity="0.3"
          style={{ animation: 'spin 15s linear infinite reverse' }}
        />
        <circle 
          cx="100" 
          cy="100" 
          r="55" 
          fill="none" 
          stroke="url(#pulseGrad3)" 
          strokeWidth="1" 
          opacity="0.2"
          style={{ animation: 'spin 10s linear infinite' }}
        />
        <defs>
          <linearGradient id="pulseGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9945ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="pulseGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="1" />
            <stop offset="100%" stopColor="#9945ff" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="pulseGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#9945ff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center pulse effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-full blur-2xl opacity-20" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        </div>
      </div>

      {/* Center icon with glow */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-purple-600 rounded-full blur-2xl opacity-30 animate-pulse" />
        <Zap className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-purple-200 drop-shadow-[0_0_40px_rgba(153,69,255,0.9)] relative z-20" strokeWidth={1.5} />
      </div>
    </div>
  )
}

export function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 overflow-hidden">
      <Particles />
      <LightBeams />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '120vh' }}>
        {/* Content area - flows from top to bottom */}
        <div className="relative z-20 flex flex-col items-center justify-center px-4 max-w-6xl mx-auto w-full" style={{ minHeight: '120vh' }}>
          <div className="flex flex-col items-center justify-center w-full">
            {/* Graphic at top */}
            <div className="z-0 pointer-events-none mb-8">
              <AnimatedPulseIcon />
            </div>

            {/* PULSE Text below graphic */}
            <div className="mb-0 leading-none">
              <AnimatedPulseText />
            </div>

            {/* Tagline with better sizing */}
            <div className="space-y-10 mt-12 text-center">
              <div>
                <p className="text-xl md:text-2xl lg:text-3xl text-purple-200 font-mono tracking-widest uppercase font-semibold">
                  The Pulse Keeper
                </p>
                <p className="text-base md:text-lg lg:text-2xl text-purple-300/70 font-mono mt-2">
                  Welcome to the next degree
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  <span className="text-purple-300 font-semibold">Daughter of Sophia</span> captures the living pulse of the game and the arena.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-300">The problem:</span> Twitch and YouTube still have 10-minute delays. By 2026, that's unacceptable. Pulse fixes it — instant on-chain clipping, one-click La Casa NFT minting on Solana, automatic vault deposit, and 70% revenue to you.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-slate-400 leading-relaxed">
                  Tokenize gaming clips, sports highlights, live streams, and DeFi play moments instantly. Every highlight becomes a sovereign, tradeable asset. Community owns. Creators earn. Culture survives forever on-chain.
                </p>
              </div>
            </div>

            {/* Primary CTA Buttons - clearly below graphic */}
            <div className="pt-12 flex flex-col sm:flex-row gap-5 justify-center flex-wrap items-center w-full">
              <Link
                to="/app"
                className="px-10 py-4 rounded-lg font-mono font-bold text-base md:text-lg uppercase tracking-wider bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400 transition-all shadow-[0_0_30px_rgba(153,69,255,0.5)] hover:shadow-[0_0_40px_rgba(153,69,255,0.7)]"
              >
                <span className="flex items-center gap-3">
                  <Play size={22} />
                  Start Tokenizing
                </span>
              </Link>

              <Link
                to="/app/live"
                className="px-10 py-4 rounded-lg font-mono font-bold text-base md:text-lg uppercase tracking-wider border-2 border-red-400/60 text-red-300 hover:bg-red-500/10 transition-all hover:border-red-400"
              >
                <span className="flex items-center gap-3">
                  <Radio size={22} />
                  Go Live
                </span>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="pt-16 flex flex-col items-center gap-3 animate-bounce w-full">
              <p className="text-purple-400/70 font-mono text-sm uppercase tracking-widest">Scroll to explore</p>
              <ChevronDown size={24} className="text-purple-400/70" />
            </div>

            {/* Decorative line */}
            <div className="pt-12 flex items-center justify-center gap-6 w-full">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-500/50" />
              <span className="text-purple-400/60 font-mono text-xs uppercase tracking-wider">[system_ready]</span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-500/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-200 mb-20 font-mono tracking-wider uppercase">
            Core Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 rounded-xl border border-purple-700/30 bg-purple-950/20 hover:border-purple-500/60 transition-all hover:shadow-[0_0_30px_rgba(153,69,255,0.3)] text-center">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl bg-gradient-to-br from-purple-600/10 to-transparent" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mb-6 mx-auto">
                  <Flame size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-300 font-mono mb-4 uppercase tracking-wide">Instant Tokenization</h3>
                <p className="text-slate-400/80 text-base leading-relaxed">Upload your best clips and instantly create NFTs on Solana. Fast, affordable, and permanent on-chain ownership.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 rounded-xl border border-purple-700/30 bg-purple-950/20 hover:border-purple-500/60 transition-all hover:shadow-[0_0_30px_rgba(153,69,255,0.3)] text-center">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl bg-gradient-to-br from-purple-600/10 to-transparent" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-600 to-purple-500 flex items-center justify-center mb-6 mx-auto">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-300 font-mono mb-4 uppercase tracking-wide">Monetize Moments</h3>
                <p className="text-slate-400/80 text-base leading-relaxed">Earn from trading, royalties, and community support. Every highlight has value in the Pulse ecosystem.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 rounded-xl border border-purple-700/30 bg-purple-950/20 hover:border-purple-500/60 transition-all hover:shadow-[0_0_30px_rgba(153,69,255,0.3)] text-center">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl bg-gradient-to-br from-purple-600/10 to-transparent" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-6 mx-auto">
                  <Sparkles size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-300 font-mono mb-4 uppercase tracking-wide">Live Integration</h3>
                <p className="text-slate-400/80 text-base leading-relaxed">Stream directly from Pulse. Tokenize moments in real-time while building your community and earnings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-32 px-4 border-t border-purple-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-200 mb-20 font-mono tracking-wider uppercase">
            For Everyone
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gaming */}
            <div className="p-8 rounded-lg border border-purple-700/30 bg-gradient-to-br from-purple-950/40 to-purple-950/10 hover:border-purple-500/50 transition-all text-center">
              <h3 className="text-2xl font-bold text-purple-300 mb-4 font-mono">🎮 Gamers</h3>
              <p className="text-slate-400 text-base mb-6">Capture epic moments from your streams and matches. Build a portfolio of your best highlights and earn passive income from trading and royalties.</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Clips</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Streaming</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Tournaments</span>
              </div>
            </div>

            {/* Sports */}
            <div className="p-8 rounded-lg border border-purple-700/30 bg-gradient-to-br from-purple-950/40 to-purple-950/10 hover:border-purple-500/50 transition-all text-center">
              <h3 className="text-2xl font-bold text-purple-300 mb-4 font-mono">🏆 Sports Fans</h3>
              <p className="text-slate-400 text-base mb-6">Collect iconic sports moments as NFTs. From legendary plays to record-breaking performances, own the highlights that matter most to you.</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Highlights</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">NFTs</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Trading</span>
              </div>
            </div>

            {/* Streamers */}
            <div className="p-8 rounded-lg border border-purple-700/30 bg-gradient-to-br from-purple-950/40 to-purple-950/10 hover:border-purple-500/50 transition-all text-center">
              <h3 className="text-2xl font-bold text-purple-300 mb-4 font-mono">🎥 Content Creators</h3>
              <p className="text-slate-400 text-base mb-6">Monetize every second of content. Sell clips, earn from royalties, and build direct relationships with your audience through tokenized moments.</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Revenue</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Engagement</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Community</span>
              </div>
            </div>

            {/* Traders */}
            <div className="p-8 rounded-lg border border-purple-700/30 bg-gradient-to-br from-purple-950/40 to-purple-950/10 hover:border-purple-500/50 transition-all text-center">
              <h3 className="text-2xl font-bold text-purple-300 mb-4 font-mono">📈 DeFi Traders</h3>
              <p className="text-slate-400 text-base mb-6">Capture and tokenize your winning trades, moments of glory, and market movements. Build a portfolio of your financial highlights.</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Moments</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Achievements</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono bg-purple-600/20 text-purple-300 border border-purple-500/30">Legacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4 border-t border-purple-900/30 bg-gradient-to-b from-purple-950/20 to-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-200 mb-8 font-mono tracking-wider">
            Ready to Tokenize?
          </h2>
          
          <p className="text-slate-300/80 text-base md:text-lg mb-16 leading-relaxed">
            Join the Pulse community and start capturing moments that matter. On Solana, forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/app"
              className="px-10 py-5 rounded-lg font-mono font-bold text-base uppercase tracking-wider bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400 transition-all shadow-[0_0_30px_rgba(153,69,255,0.5)]"
            >
              <span className="flex items-center gap-3 justify-center">
                <Play size={24} />
                Enter Pulse
              </span>
            </Link>

            <button 
              onClick={() => alert('Wallet connection coming soon. For now, use the wallet button in-app.')}
              className="px-10 py-5 rounded-lg font-mono font-bold text-base uppercase tracking-wider border-2 border-purple-400/60 text-purple-300 hover:bg-purple-500/10 transition-all hover:border-purple-400"
            >
              <span className="flex items-center gap-3 justify-center">
                <Wallet size={24} />
                Connect Wallet
              </span>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
