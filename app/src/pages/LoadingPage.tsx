import React, { useEffect, useState, useRef } from 'react';

export function LoadingPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [loadingBar, setLoadingBar] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const messages = [
    '> INITIALIZING_SOVEREIGN_REGIME...',
    '> LOADING_TOKENIZATION_ENGINE...',
    '> REAL_WORLD_ASSET_SYSTEM_ONLINE...',
    '> BLOCKCHAIN_INFRASTRUCTURE_READY...',
    '> VAULT_LAYER_ACTIVE...',
    '> SPECIES_INTELLIGENCE_SYNCING...',
    '> [SYSTEM_READY] SOVEREIGN_REGIME_ACTIVE',
  ];

  // Glitch effect trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Typing effect for messages
  useEffect(() => {
    if (messageIndex < messages.length) {
      const message = messages[messageIndex];
      if (displayedText.length < message.length) {
        const timer = setTimeout(() => {
          setDisplayedText(message.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // Message complete, wait before next
        const timer = setTimeout(() => {
          setMessageIndex(messageIndex + 1);
          setDisplayedText('');
          setPhase(messageIndex + 1);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [displayedText, messageIndex]);

  // Loading bar animation - reach 100% in 3 seconds to match page transition
  useEffect(() => {
    const startTime = startTimeRef.current;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 3000) * 100, 100);
      setLoadingBar(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 min-h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
      {/* Animated spaceship grid background */}
      <svg className="fixed inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9945ff" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9945ff', stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: '#9945ff', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#9945ff', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#gridGradient)" />
      </svg>

      {/* Circuit pattern overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(153, 69, 255, 0.3) 1px, transparent 1px),
          linear-gradient(rgba(153, 69, 255, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      {/* Central glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      {/* Scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30 mix-blend-overlay animate-scanlines" />

      {/* Glitch effect layer */}
      {glitchActive && (
        <>
          <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-screen animate-glitch" style={{
            animation: 'glitch-red 0.3s',
            clip: 'rect(0, 900px, 300px, 0)'
          }} />
          <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-screen animate-glitch" style={{
            animation: 'glitch-blue 0.3s 0.1s',
            clip: 'rect(0, 900px, 300px, 0)'
          }} />
        </>
      )}

      {/* Main content - centered perfectly */}
      <div className="relative z-20 w-full max-w-md px-4 mx-auto">
        <div className="space-y-8 backdrop-blur-sm">
          {/* ABRAXAS Logo */}
          <div className="text-center space-y-4">
            <div className="flex justify-center relative group">
              {/* Glitch effect on logo */}
              {glitchActive && (
                <>
                  <div className="absolute inset-0 text-center" style={{
                    color: '#ff0000',
                    transform: 'translate(-2px, 2px)',
                    opacity: 0.3,
                    fontSize: '1rem'
                  }}>
                    <div className="w-20 h-20 rounded-full" />
                  </div>
                  <div className="absolute inset-0 text-center" style={{
                    color: '#fbbf24',
                    transform: 'translate(2px, -2px)',
                    opacity: 0.3,
                    fontSize: '1rem'
                  }}>
                    <div className="w-20 h-20 rounded-full" />
                  </div>
                </>
              )}

              {/* Main logo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-pulse shadow-lg shadow-purple-400/20" />
                <div className="absolute inset-2 rounded-full border border-purple-400/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="absolute inset-4 rounded-full border border-amber-400/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
                
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/25 via-slate-950 to-amber-400/25 border-2 border-purple-400/60 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-purple-400/40">
                  <div className="absolute inset-0 rounded-full border-l-4 border-t-4 border-purple-400 animate-spin" />
                  <div className="absolute inset-1 rounded-full border-r-2 border-b-2 border-amber-400/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
                  <span className="text-4xl font-black text-purple-400 font-mono drop-shadow-[0_0_30px_rgba(153,69,255,1)] z-10">Ψ</span>
                </div>
              </div>
            </div>

            {/* Title with glitch effect */}
            <div className="space-y-3 relative">
              <h1 className="text-3xl sm:text-4xl font-black text-purple-400 tracking-[0.3em] font-mono drop-shadow-[0_0_40px_rgba(153,69,255,0.8)] text-center">
                SOVEREIGN REGIME
              </h1>
              <p className="text-xs text-purple-300/70 uppercase tracking-[0.15em] font-mono text-center drop-shadow-[0_0_20px_rgba(153,69,255,0.4)]">
                Tokenization Engine
              </p>
              <p className="text-[10px] text-amber-400/60 uppercase tracking-widest font-mono text-center">
                [SOVEREIGNTY_PROTOCOL_ACTIVE]
              </p>
            </div>
          </div>

          {/* Terminal loading section - enhanced */}
          <div className="space-y-4 border border-purple-400/50 rounded-lg bg-slate-950/80 p-5 backdrop-blur-md shadow-2xl shadow-purple-400/20 relative overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
              </div>
              <span className="text-[10px] text-purple-300/50 font-mono uppercase tracking-wider">forge-quantum-console v2.1</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

            {/* Loading messages */}
            <div className="space-y-2 min-h-[160px] font-mono text-[11px]">
              {/* Previous messages - faded */}
              {messages.slice(0, messageIndex).map((msg, idx) => (
                <p key={idx} className="text-purple-400/50 uppercase tracking-[0.05em] animate-pulse" style={{
                  opacity: 0.3 + (idx / messages.length) * 0.4
                }}>
                  {msg}
                </p>
              ))}

              {/* Current typing message - bright */}
              <p className="text-purple-400 uppercase tracking-[0.05em] min-h-[16px] font-semibold drop-shadow-[0_0_10px_rgba(153,69,255,0.6)]">
                {displayedText}
                <span className="ml-1 inline-block w-2 h-3 bg-purple-400 animate-pulse drop-shadow-[0_0_10px_rgba(153,69,255,0.8)]" />
              </p>

              {/* Upcoming messages hint */}
              {messageIndex < messages.length - 1 && (
                <div className="pt-2">
                  {messages.slice(messageIndex + 1, Math.min(messageIndex + 2, messages.length)).map((msg, idx) => (
                    <p key={idx} className="text-purple-400/20 uppercase tracking-[0.05em] text-[9px] line-clamp-1">
                      {msg}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

            {/* System status */}
            <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
              <div className="px-2 py-1.5 border border-purple-400/30 rounded bg-purple-400/5 backdrop-blur">
                <span className="text-purple-300/60">[CPU]</span>
                <span className="ml-1 text-green-400 font-semibold drop-shadow-[0_0_5px_rgba(34,197,94,0.6)]">{loadingBar.toFixed(0)}%</span>
              </div>
              <div className="px-2 py-1.5 border border-purple-400/30 rounded bg-purple-400/5 backdrop-blur">
                <span className="text-purple-300/60">[RAM]</span>
                <span className="ml-1 text-green-400 font-semibold drop-shadow-[0_0_5px_rgba(34,197,94,0.6)]">{Math.round(loadingBar / 2)}%</span>
              </div>
              <div className="px-2 py-1.5 border border-purple-400/30 rounded bg-purple-400/5 backdrop-blur">
                <span className="text-purple-300/60">[NET]</span>
                <span className="ml-1 text-orange-400 font-semibold drop-shadow-[0_0_5px_rgba(251,146,60,0.6)]">OK</span>
              </div>
            </div>
          </div>

          {/* Enhanced progress bar */}
          <div className="space-y-3">
            <div className="relative h-2 bg-purple-400/10 rounded-full overflow-hidden border border-purple-400/30 shadow-md shadow-purple-400/20">
              <div
                className="h-full bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 rounded-full transition-all duration-300 ease-out shadow-lg shadow-purple-400/60 relative"
                style={{ width: `${loadingBar}%` }}
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white to-transparent" />
              </div>
            </div>
            <p className="text-[9px] text-purple-300/60 text-center font-mono uppercase tracking-wider drop-shadow-[0_0_10px_rgba(153,69,255,0.3)]">
              ▮ SYSTEM_INITIALIZATION: {Math.round(loadingBar)}%
            </p>
          </div>

          {/* Bottom status */}
          <div className="text-center space-y-2 border-t border-purple-400/20 pt-4">
            <p className="text-[10px] text-purple-300/70 font-mono uppercase tracking-[0.1em] drop-shadow-[0_0_10px_rgba(153,69,255,0.4)]">
              ⬥ FORGING_QUANTUM_CONNECTIONS
            </p>
            <p className="text-[8px] text-purple-400/50 font-mono">
              v2.1 | Welcome to the next degree
            </p>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-6 left-6 text-purple-400/20 text-xs font-mono tracking-widest pointer-events-none hidden sm:block z-10">
        &lt;SOVEREIGN_REGIME&gt;
      </div>
      <div className="fixed bottom-6 right-6 text-purple-400/20 text-xs font-mono tracking-widest pointer-events-none hidden sm:block z-10">
        &lt;/TOKENIZATION&gt;
      </div>

      {/* Define glitch animation keyframes inline via style */}
      <style>{`
        @keyframes glitch-red {
          0% { filter: hue-rotate(0deg) drop-shadow(0 0 10px rgba(255, 0, 0, 0.5)); }
          50% { filter: hue-rotate(30deg) drop-shadow(2px 2px 5px rgba(255, 0, 0, 0.8)); }
          100% { filter: hue-rotate(0deg) drop-shadow(0 0 10px rgba(255, 0, 0, 0.5)); }
        }

        @keyframes glitch-blue {
          0% { filter: hue-rotate(200deg) drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)); }
          50% { filter: hue-rotate(220deg) drop-shadow(-2px -2px 5px rgba(0, 255, 255, 0.8)); }
          100% { filter: hue-rotate(200deg) drop-shadow(0 0 10px rgba(0, 255, 255, 0.5)); }
        }

        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }

        .animate-scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          animation: scanlines 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
