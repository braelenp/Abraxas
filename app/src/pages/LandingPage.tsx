import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ChevronDown, Sparkles } from 'lucide-react';

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
    navigate('/app/profile');
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
              Welcome to the<br />Next Degree
            </span>
          </h1>

          {/* Subheadline - Simple Explanation */}
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl mx-auto">
            Tokenize any real-world asset. Put it in intelligent vaults. Move capital instantly and fairly on Solana.
          </p>

          {/* Abraxas Overview Video */}
          <div className="mt-12 max-w-2xl mx-auto w-full px-2">
            <div className="relative rounded-2xl overflow-hidden border border-purple-400/30 shadow-[0_0_40px_rgba(153,69,255,0.3),inset_0_0_20px_rgba(153,69,255,0.1)] backdrop-blur-sm bg-slate-900/40">
              <video
                className="w-full h-auto block"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/assets/abraxas-overview.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_20px_rgba(153,69,255,0.2)]" />
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-slate-900/40 border border-cyan-300/20 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-300/40 transition-all">
              <div className="text-3xl font-black text-cyan-400 mb-3">✧</div>
              <h3 className="text-sm font-bold text-cyan-300 mb-2">Tokenize Assets</h3>
              <p className="text-xs text-slate-300">Transform any real estate, yacht, art, or collectible into La Casa NFTs.</p>
            </div>
            
            <div className="bg-slate-900/40 border border-purple-300/20 rounded-lg p-6 backdrop-blur-sm hover:border-purple-300/40 transition-all">
              <div className="text-3xl font-black text-purple-400 mb-3">ᚨ</div>
              <h3 className="text-sm font-bold text-purple-300 mb-2">Intelligent Vaults</h3>
              <p className="text-xs text-slate-300">AI agents actively manage and grow your assets with precision.</p>
            </div>
            
            <div className="bg-slate-900/40 border border-orange-300/20 rounded-lg p-6 backdrop-blur-sm hover:border-orange-300/40 transition-all">
              <div className="text-3xl font-black text-orange-400 mb-3">ᛋ</div>
              <h3 className="text-sm font-bold text-orange-300 mb-2">Instant Capital</h3>
              <p className="text-xs text-slate-300">Move money instantly with ABRAX native stablecoin on Solana.</p>
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
              Abraxas is a <span className="text-cyan-300 font-semibold">complete sovereign economy on Solana</span>.
            </p>
            
            <ul className="space-y-3 text-xs">
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold min-w-fit">•</span>
                <span><span className="text-purple-300 font-semibold">Tokenize any asset</span> (real estate, yachts, players, art) into <span className="text-orange-300">La Casa NFTs</span></span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold min-w-fit">•</span>
                <span><span className="text-cyan-300 font-semibold">AI Species</span> actively manage, protect, and grow your assets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold min-w-fit">•</span>
                <span><span className="text-emerald-300 font-semibold">ABRAX</span> is our native stablecoin for instant payments</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold min-w-fit">•</span>
                <span><span className="text-pink-300 font-semibold">$ABRA</span> is the utility token for staking, vaults, and governance</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold min-w-fit">•</span>
                <span><span className="text-yellow-300 font-semibold">Validators</span> secure the network and earn rewards</span>
              </li>
            </ul>

            <p className="pt-3 border-t border-slate-700">
              You can participate <span className="text-cyan-300 font-semibold">passively</span> (hold or stake ABRA) or <span className="text-purple-300 font-semibold">actively</span> (deploy ABRA into vaults for agent-managed returns).
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full bg-slate-950/80 border-t border-slate-800 py-8 px-4 text-center">
        <p className="text-xs text-slate-400">
          Abraxas • Web5 Biological Ledger on Solana • Protected by seven Elder Futhark runes
        </p>
      </div>
    </div>
  );
}
