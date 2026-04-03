export default function GlowingCodexSymbol() {
  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48" role="presentation">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-purple-500/10 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Middle ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        {/* Animated outer circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="90" 
          fill="none" 
          stroke="url(#goldGradient)" 
          strokeWidth="2" 
          opacity="0.6"
          style={{ 
            filter: 'drop-shadow(0 0 8px rgba(212, 165, 116, 0.4))',
            animation: 'spin 20s linear infinite'
          }}
        />
        
        {/* Inner runes circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="70" 
          fill="none" 
          stroke="rgba(153, 69, 255, 0.3)" 
          strokeWidth="1"
          style={{ 
            animation: 'spin-reverse 30s linear infinite'
          }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a574" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9945ff" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central symbol - Glowing Codex */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Golden glow behind symbol */}
          <div 
            className="absolute inset-0 blur-lg"
            style={{
              background: 'radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite'
            }}
          ></div>
          
          {/* Codex/Book symbol */}
          <svg 
            className="w-16 h-16 md:w-24 md:h-24 text-gold relative z-10"
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor"
          >
            {/* Book pages */}
            <path d="M 25 30 L 25 70 Q 25 75 30 75 L 70 75 Q 75 75 75 70 L 75 30" strokeWidth="2" />
            <line x1="50" y1="30" x2="50" y2="75" strokeWidth="2" />
            
            {/* Rune-like marks on pages */}
            <circle cx="35" cy="45" r="2" />
            <circle cx="45" cy="50" r="2" />
            <circle cx="55" cy="45" r="2" />
            <circle cx="65" cy="50" r="2" />
            
            <line x1="35" y1="60" x2="65" y2="60" strokeWidth="1" opacity="0.6" />
          </svg>

          {/* Corner glow accents */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400/60 rounded-full blur-sm"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400/60 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute -top-4 left-1/3 w-1 h-1 bg-gold/40 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/4 -right-4 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 -left-4 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
