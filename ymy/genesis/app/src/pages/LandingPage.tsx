import { Link } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Sparkles, Code, Lock, Zap, ExternalLink } from 'lucide-react'
import GlowingCodexSymbol from '../components/GlowingCodexSymbol'
import FeatureBadge from '../components/FeatureBadge'

const FEATURES = [
  { icon: Sparkles, title: 'AI-POWERED GENERATION', desc: 'Your prompts become complete, production-ready dApps in seconds.' },
  { icon: Code, title: 'AUTO-GITHUB PUSH', desc: 'Code automatically pushed to your repository—ready to customize.' },
  { icon: Lock, title: 'ON-CHAIN OWNERSHIP', desc: 'Mint La Casa NFT to tokenize ownership of your creation.' },
  { icon: Zap, title: 'SOVEREIGN CONTROL', desc: 'Your keys, your code, your dApp. Full control on Solana.' },
]

export default function LandingPage() {
  const { connected } = useWallet()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      {/* Atmospheric background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl opacity-40" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-cyan-500/8 blur-3xl opacity-30" />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-12 md:pb-16 text-center relative z-10">
        <div className="flex justify-center mb-6 md:mb-8">
          <GlowingCodexSymbol />
        </div>

        <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-8 flex-wrap">
          <FeatureBadge label="Solana Native" variant="military" />
          <FeatureBadge label="AI-Generated" variant="steel" />
          <FeatureBadge label="Tokenized" variant="gold" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.15em] md:tracking-[0.2em] mb-2 leading-none animate-glitch" style={{ color: '#f9cc75', textShadow: '0 0 30px rgba(249, 204, 117, 0.8), 0 0 60px rgba(217, 119, 6, 0.5), 0 0 100px rgba(245, 158, 11, 0.3)' }}>
          Genesis
        </h1>

        <p className="text-xs md:text-base font-bold uppercase tracking-[0.3em] text-cyan-300 mb-2 font-mono">[SYSTEM.CREATOR]</p>

        <p className="text-base md:text-2xl font-bold uppercase tracking-widest text-cyan-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          The First Son<br />
          Of Sophia
        </p>

        <p className="text-sm md:text-lg text-slate-300/80 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
          From a single prompt, Genesis births complete, sovereign dApps into existence.
          Your code is automatically pushed to GitHub. Your ownership is minted on-chain as an NFT.
          &gt; <span className="text-cyan-300 font-mono">SOVEREIGNTY_COMPLETE</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          {connected ? (
            <Link to="/genesis" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-primary w-full sm:w-auto text-sm md:text-base rounded-lg">
              BIRTH YOUR FIRST DAPP
            </Link>
          ) : (
            <WalletMultiButton
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '2px solid rgb(34, 211, 238)',
                color: 'rgb(34, 211, 238)',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '11px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderRadius: '0.5rem',
                height: '44px',
                padding: '0 20px',
              }}
            />
          )}
          <Link to="/genesis" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-secondary w-full sm:w-auto text-sm md:text-base rounded-lg">
            MINT & TOKENIZE
          </Link>
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-sm md:text-base px-4 md:px-6 py-3 md:py-3 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 hover:from-cyan-500/30 hover:to-cyan-600/30 text-cyan-300 hover:text-cyan-200 font-black uppercase tracking-widest border border-cyan-300/40 hover:border-cyan-300/70 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>BUY $ABRA</span>
            <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* Status Line */}
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-8 text-center border-b border-cyan-300/20">
        <div className="flex justify-center gap-2 md:gap-8 flex-wrap text-[10px] md:text-sm font-mono text-cyan-300/70 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span className="hidden sm:inline">[DAPP_GENERATION_ONLINE]</span>
            <span className="sm:hidden">GENERATION</span>
          </div>
          <div className="hidden md:block text-cyan-400/40">•</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span className="hidden sm:inline">[GITHUB_DEPLOYMENT_READY]</span>
            <span className="sm:hidden">DEPLOYMENT</span>
          </div>
          <div className="hidden md:block text-cyan-400/40">•</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            <span className="hidden sm:inline">[NFT_MINTING_ACTIVE]</span>
            <span className="sm:hidden">NFT_READY</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-center mb-8 md:mb-12 font-mono text-cyan-300">&gt; [SYSTEM.CAPABILITIES]</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glow-panel hover:border-cyan-300/40 hover:bg-slate-900/90 transition-all group p-3 md:p-4">
              <Icon size={20} className="text-cyan-300 mb-3 group-hover:text-cyan-200 transition md:size-24" strokeWidth={1.5} />
              <h3 className="font-black uppercase tracking-widest text-xs md:text-sm text-slate-100 mb-2 group-hover:text-cyan-200 transition leading-tight">
                {title}
              </h3>
              <p className="text-xs text-slate-300/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="border-t border-cyan-300/20 py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-300/60 mb-4 md:mb-6 font-mono">
            [GENESIS_DOCTRINE]
          </p>
          <blockquote className="text-lg md:text-2xl font-bold text-slate-200 leading-relaxed mb-6 md:mb-8">
            "Where others speculate, we execute.<br />
            Where others hesitate, we advance.<br />
            <span className="text-cyan-300 inline-block mt-3">The First Son does not ask for permission.</span>"
          </blockquote>
        </div>
      </section>

      {/* Enter dApp CTA Section */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-12 md:py-16 border-t border-cyan-300/20 relative z-10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs md:text-sm uppercase tracking-widest text-cyan-300/70 font-mono mb-4">
            &gt; Ready to begin?
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-slate-100 mb-6 md:mb-8">
            Enter the Genesis Protocol
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link to="/genesis" className="btn-primary w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg">
              ENTER GENESIS
            </Link>
            <a
              href="https://discord.gg/tdyukTeSS"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg"
            >
              JOIN COMMUNITY
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes glitch-genesis {
          0% {
            transform: translate(0);
            text-shadow: 
              -3px -3px 0px rgba(250, 204, 21, 0.8),
              3px 3px 0px rgba(6, 182, 212, 0.5);
          }
          20% {
            transform: translate(-2px, 2px);
            text-shadow:
              3px -3px 0px rgba(250, 204, 21, 0.8),
              -3px 3px 0px rgba(6, 182, 212, 0.5);
          }
          40% {
            transform: translate(-2px, -2px);
            text-shadow:
              -3px 3px 0px rgba(250, 204, 21, 0.8),
              3px -3px 0px rgba(6, 182, 212, 0.5);
          }
          60% {
            transform: translate(2px, 2px);
            text-shadow:
              3px 3px 0px rgba(250, 204, 21, 0.8),
              -3px -3px 0px rgba(6, 182, 212, 0.5);
          }
          80% {
            transform: translate(2px, -2px);
            text-shadow:
              -3px -3px 0px rgba(250, 204, 21, 0.8),
              3px 3px 0px rgba(6, 182, 212, 0.5);
          }
          100% {
            transform: translate(0);
            text-shadow:
              -3px -3px 0px rgba(250, 204, 21, 0.8),
              3px 3px 0px rgba(6, 182, 212, 0.5);
          }
        }
      `}</style>
    </div>
  )
}
