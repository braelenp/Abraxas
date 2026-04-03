import React, { useEffect, useState } from 'react';

interface RaidhoLoadingScreenProps {
  onComplete?: () => void;
}

export const RaidhoLoadingScreen: React.FC<RaidhoLoadingScreenProps> = ({ onComplete }) => {
  const [dots, setDots] = useState('.');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete?.();
          }, 300);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-raido-black via-raido-black to-raido-deep-blue flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-raido-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-raido-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Animated loading symbol */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-raido-gold border-r-raido-gold/50 animate-spin" 
            style={{ width: '80px', height: '80px' }} 
          />

          {/* Middle pulsing ring */}
          <div 
            className="absolute inset-2 rounded-full border border-raido-gold/30 animate-pulse" 
            style={{ width: '64px', height: '64px' }} 
          />

          {/* Inner glyph */}
          <div className="flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
            <span 
              className="text-4xl font-black drop-shadow-lg" 
              style={{ 
                color: '#d4af37',
                textShadow: '0 0 12px rgba(212, 165, 55, 0.6), 0 0 24px rgba(212, 165, 55, 0.3)'
              }}
            >
              ᚱ
            </span>
          </div>
        </div>

        {/* System message */}
        <div className="text-center">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-raido-gold font-mono mb-4">
            [SYSTEM.INITIALIZING]
          </p>
          <h2 
            className="text-xl md:text-2xl font-black uppercase tracking-widest mb-2 animate-pulse" 
            style={{ 
              color: '#d4af37',
              textShadow: '0 0 20px rgba(212, 165, 55, 0.5)'
            }}
          >
            RAIDO PROTOCOL
          </h2>
          <p className="text-xs md:text-sm text-raido-blue/80 font-mono">
            Status: <span className="animate-pulse">Activating{dots}</span>
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-64 h-1 bg-raido-black/60 rounded-full border border-raido-gold/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-raido-gold to-raido-gold/60 rounded-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: '0 0 16px rgba(212, 165, 55, 0.6)',
            }}
          />
        </div>

        {/* Footer text */}
        <p className="text-[10px] md:text-xs text-raido-blue/60 font-mono uppercase tracking-wider mt-8 text-center">
          &gt; Establishing liquidity pathways<br/>
          &gt; Calibrating flow algorithms<br/>
          &gt; Activating opportunity hunter
        </p>
      </div>

      {/* Scanlines effect */}
      <div
        className="absolute inset-0 pointer-events-none animate-scanlines opacity-10"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(212, 165, 55, 0.05) 25%, rgba(212, 165, 55, 0.05) 26%, transparent 27%, transparent 74%, rgba(212, 165, 55, 0.05) 75%, rgba(212, 165, 55, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '100% 4px',
          animation: 'scanlines 8s linear infinite',
        }}
      />

      <style>{`
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  );
};
