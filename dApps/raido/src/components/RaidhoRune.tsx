import React from 'react';

interface RaidhoRuneProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export const RaidhoRune: React.FC<RaidhoRuneProps> = ({
  size = 300,
  animated = true,
  className = '',
}) => {
  // Raidho rune - represents movement, journey, and flow (wheel/chariot motion)
  const glowClass = animated ? 'animate-glow-pulse rune-glow-intense' : 'rune-glow';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${glowClass} ${className}`}
      style={{
        filter: animated 
          ? 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 40px rgba(212, 175, 55, 0.3))'
          : 'none',
      }}
    >
      {/* Outer circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        opacity="0.8"
      />

      {/* Inner circle */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Raidho rune - wheel/chariot shape */}
      {/* Main diamond/rhombus for the wheel */}
      <path
        d="M 100 30 L 150 70 L 120 130 L 80 130 L 50 70 Z"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2.5"
        opacity="0.9"
      />

      {/* Central cross for wheel spokes */}
      <line x1="100" y1="50" x2="100" y2="130" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.7" />
      <line x1="60" y1="90" x2="140" y2="90" stroke="url(#goldGradient)" strokeWidth="2" opacity="0.7" />

      {/* Additional diagonal spokes */}
      <line x1="70" y1="60" x2="130" y2="120" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.5" />
      <line x1="130" y1="60" x2="70" y2="120" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.5" />

      {/* Center circle */}
      <circle
        cx="100"
        cy="90"
        r="8"
        fill="url(#goldGradient)"
        opacity="0.8"
      />

      {/* Pulsing center point */}
      <circle
        cx="100"
        cy="90"
        r="4"
        fill="#d4af37"
        opacity="1"
      />

      {/* Top and bottom accent triangles (motion indicators) */}
      <path
        d="M 95 40 L 105 40 L 100 50 Z"
        fill="url(#goldGradient)"
        opacity="0.6"
      />

      <path
        d="M 95 130 L 105 130 L 100 120 Z"
        fill="url(#goldGradient)"
        opacity="0.6"
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6c547" stopOpacity="1" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
          <stop offset="100%" stopColor="#c99f2f" stopOpacity="1" />
        </linearGradient>

        <radialGradient id="goldRadial">
          <stop offset="0%" stopColor="#e6c547" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
