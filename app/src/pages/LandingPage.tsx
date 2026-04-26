import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ChevronDown, Sparkles } from 'lucide-react';
import {
  ABRAXAS_PLAIN_ENGLISH_EXPLAINER,
  ABRAXAS_PRIMARY_VALUE_PROP,
  ABRAXAS_SHORT_FLOW,
  ABRAXAS_SIMPLE_PILLARS,
  ABRAXAS_SUPPORTING_VALUE_PROP,
} from '../lib/messaging';

/**
 * ── Landing Page ────────────────────────────────────────────────────────────
 * Clean hero for maximum conversion
 * Simple, clear value proposition for non-crypto users
 * Keep cinematic esoteric style (#050505, #9945ff glow, particles, runes)
 */

function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 25 }).map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-cyan-300/30 blur-sm"
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
      <style>{`
        @keyframes float {
          from {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}50px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function GlowRunes() {
  const runes = ['ᚲ', 'ᚨ', 'ᛋ', '✦', 'ᛏ', 'ᚦ', 'ᛚ'];
  
  return (
    <div className="pointer-events-none fixed inset-0">
      {/* Orbiting runes around center */}
      {runes.map((rune, index) => {
        const angle = (index / runes.length) * 360;
        const radius = 280;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        
        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-purple-400 to-orange-400 filter drop-shadow-[0_0_12px_rgba(153,69,255,0.6)]"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              animation: `orbit-slow 30s linear infinite`,
              animationDelay: `${-index * 2}s`,
            }}
          >
            {rune}
          </div>
        );
      })}
      
      <style>{`
        @keyframes orbit-slow {
          from { transform: rotate(0deg) translateX(280px); }
          to { transform: rotate(360deg) translateX(280px); }
        }
      `}</style>
    </div>
  );
}

function LightBeams() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 mix-blend-screen [background:linear-gradient(135deg,transparent_0%,rgba(34,211,238,0.2)_30%,transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(45deg,transparent_0%,rgba(157,78,221,0.15)_40%,transparent_70%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-15 mix-blend-screen [background:linear-gradient(to_top,rgba(234,88,12,0.1)_0%,transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(ellipse_at_center,rgba(157,78,221,0.08)_0%,transparent_70%)]" />
    </>
  );
}

export function LandingPage() {
  const navigate = useNavigate();
  const { connected } = useWallet();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCreateProfile = () => {
    navigate('/campaign');
  };

  const handleEnterDapp = () => {
    try {
      localStorage.removeItem('hasSeenIntroModal');
    } catch {
      // Ignore storage errors and continue navigation.
    }

    navigate('/app/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 overflow-x-hidden">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-slate-950" />
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwZjUyYmEiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMTUiIC8+PC9zdmc+')] opacity-30" />
      </div>
      <LightBeams />
      <Particles />
      <GlowRunes />

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-2xl mx-auto mb-8">
          {/* Abraxas Title and Subtext */}
          <div className="space-y-2 mb-8">
            <h1 className="text-6xl md:text-7xl font-black tracking-widest">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-orange-400 drop-shadow-[0_0_20px_rgba(153,69,255,0.6)]">
                ABRAXAS
              </span>
            </h1>
            <p className="text-sm md:text-base font-semibold tracking-[0.2em] text-purple-300 uppercase">
              The Next Transmutation
            </p>
          </div>

          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(153,69,255,0.4),inset_0_0_20px_rgba(153,69,255,0.2)]">
                <img
                  src="/assets/abraxas-logo-graphic.jpg"
                  alt="Abraxas"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background = 'linear-gradient(135deg, rgba(153, 69, 255, 0.3), rgba(34, 211, 238, 0.3))';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-orange-400">
              {ABRAXAS_PRIMARY_VALUE_PROP}
            </span>
          </h1>

          {/* Subheadline - Simple Explanation */}
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl mx-auto">
            {ABRAXAS_SUPPORTING_VALUE_PROP}
          </p>

          <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            {ABRAXAS_SHORT_FLOW}
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-slate-900/40 border border-cyan-300/20 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-300/40 transition-all">
              <div className="text-3xl font-black text-cyan-400 mb-3">✧</div>
              <h3 className="text-sm font-bold text-cyan-300 mb-2">Bring Assets Online</h3>
              <p className="text-xs text-slate-300">Turn assets into digital positions you can track and use more easily.</p>
            </div>
            
            <div className="bg-slate-900/40 border border-purple-300/20 rounded-lg p-6 backdrop-blur-sm hover:border-purple-300/40 transition-all">
              <div className="text-3xl font-black text-purple-400 mb-3">ᚨ</div>
              <h3 className="text-sm font-bold text-purple-300 mb-2">AI-Managed Vaults</h3>
              <p className="text-xs text-slate-300">Put assets in vaults where AI agents help manage and protect them.</p>
            </div>
            
            <div className="bg-slate-900/40 border border-orange-300/20 rounded-lg p-6 backdrop-blur-sm hover:border-orange-300/40 transition-all">
              <div className="text-3xl font-black text-orange-400 mb-3">ᛋ</div>
              <h3 className="text-sm font-bold text-orange-300 mb-2">Money That Moves Fast</h3>
              <p className="text-xs text-slate-300">Use ABRAX to move money simply and settle faster on Solana.</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 mt-12 w-full max-w-sm">
          {!connected ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 text-center">Connect your wallet to begin</p>
              <div className="flex justify-center">
                <WalletMultiButton className="ui-action !h-10 !rounded-xl !border !border-purple-400/60 !bg-purple-500/20 !px-6 !text-sm !font-bold !text-purple-200 hover:!bg-purple-500/30" />
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={handleCreateProfile}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-purple-400/60 bg-gradient-to-r from-purple-500/30 to-pink-500/20 text-purple-100 font-bold text-lg hover:from-purple-500/40 hover:to-pink-500/30 transition-all shadow-[0_0_32px_rgba(153,69,255,0.3)] hover:shadow-[0_0_48px_rgba(153,69,255,0.5)]"
              >
                <Sparkles size={20} />
                Create Profile & Enter
              </button>
              
              <button
                onClick={handleEnterDapp}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-cyan-300/40 bg-slate-900/50 text-cyan-200 font-semibold hover:border-cyan-300/60 hover:bg-slate-900/70 transition-all"
              >
                Continue to Dapp
              </button>
            </>
          )}
        </div>

        {/* Scroll Indicator - Only show when wallet is connected */}
        {connected && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <ChevronDown size={24} className="text-cyan-300" />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="relative z-10 w-full bg-slate-900/40 border-y border-cyan-300/10 py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 text-center">
            What is Abraxas?
          </h2>
          
          <div className="bg-slate-800/50 border border-purple-300/20 rounded-lg p-6 space-y-4 text-sm text-slate-200 leading-relaxed">
            <p>
              <span className="text-cyan-300 font-semibold">{ABRAXAS_PRIMARY_VALUE_PROP}</span>
            </p>
            <p className="text-slate-300">{ABRAXAS_PLAIN_ENGLISH_EXPLAINER}</p>
            
            <ul className="space-y-3 text-xs">
              {ABRAXAS_SIMPLE_PILLARS.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="text-cyan-400 font-bold min-w-fit">{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="pt-3 border-t border-slate-700">
              Start simple: hold ABRA, use vaults, or let the agents help you manage positions without giving up control.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full bg-slate-950/80 border-t border-slate-800 py-8 px-4 text-center">
        <p className="text-xs text-slate-400">
          Abraxas • AI-powered asset management on Solana • You stay in control
        </p>
      </div>
    </div>
  );
}
