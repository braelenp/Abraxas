import React, { useEffect, useState } from 'react';

export function LoadingPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [loadingBar, setLoadingBar] = useState(0);

  const messages = [
    '> INITIALIZING_FORGE_PROTOCOL...',
    '> LOADING_RWA_ENGINE...',
    '> TOKENIZATION_SYSTEM_ONLINE...',
    '> ATTEST_INFRASTRUCTURE_READY...',
    '> YIELD_VAULTS_ACTIVE...',
    '> SOPHIA_CONSENSUS_SYNCING...',
    '> [SYSTEM_READY] ABRAXAS_ONLINE',
  ];

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

  // Loading bar animation
  useEffect(() => {
    if (phase < messages.length - 1) {
      const interval = setInterval(() => {
        setLoadingBar((prev) => {
          const increment = Math.random() * (12 - 2) + 2;
          return Math.min(prev + increment, (phase + 1) * 14);
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setLoadingBar(100);
    }
  }, [phase]);

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30 mix-blend-overlay animate-scanlines" />

      {/* Main content container */}
      <div className="w-full max-w-md space-y-8 z-10">
        {/* ABRAXAS Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              {/* Glowing outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse" />
              <div className="absolute inset-2 rounded-full border border-cyan-400/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
              
              {/* Main logo circle */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-400/20 border-2 border-cyan-400/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 rounded-full border-l-4 border-t-4 border-cyan-400 animate-spin" />
                <span className="text-3xl font-black text-cyan-400 font-mono drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10">Ψ</span>
              </div>
            </div>
          </div>

          {/* Main title */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-cyan-400 tracking-[0.2em] font-mono drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]">
              ABRAXAS
            </h1>
            <p className="text-[10px] text-cyan-300/60 uppercase tracking-widest font-mono">
              RWA Tokenization Engine
            </p>
          </div>
        </div>

        {/* Terminal loading section */}
        <div className="space-y-4 border border-cyan-400/30 rounded-lg bg-slate-950/50 p-4 backdrop-blur-sm">
          {/* Terminal header */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <span className="text-[10px] text-cyan-300/40 font-mono uppercase tracking-wider">forge-system-console</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-cyan-400/20" />

          {/* Loading messages */}
          <div className="space-y-2 min-h-[140px] sm:min-h-[100px]">
            {/* Previous messages */}
            {messages.slice(0, messageIndex).map((msg, idx) => (
              <p key={idx} className="text-[10px] text-cyan-400/60 font-mono uppercase tracking-[0.05em] line-clamp-1">
                {msg}
              </p>
            ))}

            {/* Current typing message */}
            <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-[0.05em] min-h-[14px]">
              {displayedText}
              <span className="ml-1 inline-block w-2 h-3 bg-cyan-400 animate-pulse" />
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-cyan-400/20" />

          {/* Status indicators */}
          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
            <div className="px-2 py-1 border border-cyan-400/30 rounded bg-cyan-400/10">
              <span className="text-cyan-300/60">[CPU] </span>
              <span className="text-green-400">{loadingBar.toFixed(0)}%</span>
            </div>
            <div className="px-2 py-1 border border-cyan-400/30 rounded bg-cyan-400/10">
              <span className="text-cyan-300/60">[MEM] </span>
              <span className="text-green-400">{Math.round(loadingBar / 2)}%</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="h-1 bg-cyan-400/20 rounded-full overflow-hidden border border-cyan-400/30">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 rounded-full transition-all duration-300 ease-out shadow-lg shadow-cyan-400/50"
              style={{ width: `${loadingBar}%` }}
            />
          </div>
          <p className="text-[9px] text-cyan-300/50 text-center font-mono uppercase tracking-wider">
            System initialization: {Math.round(loadingBar)}%
          </p>
        </div>

        {/* Bottom status */}
        <div className="text-center space-y-2">
          <p className="text-[10px] text-cyan-300/60 font-mono uppercase tracking-[0.1em]">
            ▮ FORGING_CONNECTIONS_TO_SOLANA
          </p>
          <p className="text-[8px] text-cyan-400/40 font-mono">
            v1.0-devnet | Welcome to the next degree
          </p>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="fixed top-4 left-4 text-cyan-400/20 text-xs font-mono tracking-widest pointer-events-none hidden sm:block">
        &lt;ABRAXAS&gt;
      </div>
      <div className="fixed bottom-4 right-4 text-cyan-400/20 text-xs font-mono tracking-widest pointer-events-none hidden sm:block">
        &lt;/&gt;
      </div>

      {/* Mobile-specific adjustments */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}
