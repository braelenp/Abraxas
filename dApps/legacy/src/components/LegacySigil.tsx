export function LegacySigil({ size = 64, animated = true }: { size?: number; animated?: boolean }) {
  const viewBox = '0 0 64 80'

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      style={{
        animation: animated ? 'rr-fade-in 1s ease-out forwards' : 'none',
      }}
    >
      <defs>
        {/* Torch flame gradient */}
        <linearGradient id="legacyFlame" x1="32" y1="8" x2="32" y2="42">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>

        {/* Glow filters */}
        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="crimsonGlow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Radial halos */}
        <radialGradient id="innerHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="midHalo" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="outerHalo" cx="50%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g style={animated ? { animation: 'rr-breathe 3.8s ease-in-out infinite', animationDelay: '120ms' } : {}}>
        {/* Outer atmosphere halo */}
        <circle
          cx="32"
          cy="40"
          r="38"
          fill="url(#outerHalo)"
          opacity="0.6"
        />

        {/* Mid crimson fire ring */}
        <circle
          cx="32"
          cy="40"
          r="32"
          fill="url(#midHalo)"
          opacity="0.7"
        />

        {/* Inner gold flash */}
        <circle
          cx="32"
          cy="40"
          r="24"
          fill="url(#innerHalo)"
          opacity="0.8"
        />

        {/* Purple accent ring */}
        <circle
          cx="32"
          cy="40"
          r="28"
          fill="none"
          stroke="rgba(153, 69, 255, 0.3)"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Left laurel branch */}
        <path
          d="M 18 42 Q 12 35 14 28 Q 16 22 20 20 Q 22 19 23 21 Q 19 24 18 32 Q 17 38 20 44"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.5"
          opacity="0.85"
          strokeLinecap="round"
          filter="url(#crimsonGlow)"
        />

        {/* Right laurel branch */}
        <path
          d="M 46 42 Q 52 35 50 28 Q 48 22 44 20 Q 42 19 41 21 Q 45 24 46 32 Q 47 38 44 44"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.5"
          opacity="0.85"
          strokeLinecap="round"
          filter="url(#crimsonGlow)"
        />

        {/* Left laurel leaves detail */}
        <g opacity="0.6">
          <ellipse cx="16" cy="26" rx="2" ry="3.5" fill="#dc2626" transform="rotate(-30 16 26)" />
          <ellipse cx="15" cy="32" rx="2" ry="3.5" fill="#dc2626" transform="rotate(-15 15 32)" />
          <ellipse cx="17" cy="39" rx="2" ry="3.5" fill="#dc2626" transform="rotate(0 17 39)" />
        </g>

        {/* Right laurel leaves detail */}
        <g opacity="0.6">
          <ellipse cx="48" cy="26" rx="2" ry="3.5" fill="#dc2626" transform="rotate(30 48 26)" />
          <ellipse cx="49" cy="32" rx="2" ry="3.5" fill="#dc2626" transform="rotate(15 49 32)" />
          <ellipse cx="47" cy="39" rx="2" ry="3.5" fill="#dc2626" transform="rotate(0 47 39)" />
        </g>

        {/* Top laurel meeting point */}
        <circle cx="32" cy="18" r="2" fill="#f59e0b" opacity="0.9" filter="url(#goldGlow)" />

        {/* Torch body/stem */}
        <rect
          x="29"
          y="28"
          width="6"
          height="20"
          rx="3"
          fill="#b91c1c"
          opacity="0.85"
        />

        {/* Torch flame - main shape */}
        <path
          d="M 32 8 C 26 14 24 22 26 28 C 27 31 28.5 33 32 33 C 35.5 33 37 31 38 28 C 40 22 38 14 32 8 Z"
          fill="url(#legacyFlame)"
          filter="url(#goldGlow)"
          opacity="0.95"
        />

        {/* Flame highlight - inner bright area */}
        <path
          d="M 32 12 C 29 16 28 21 29 26 C 29.5 29 30.5 31 32 31 C 33.5 31 34.5 29 35 26 C 36 21 35 16 32 12 Z"
          fill="#fde68a"
          opacity="0.7"
        />

        {/* Torch tip glow */}
        <circle
          cx="32"
          cy="8"
          r="6"
          fill="#fde68a"
          opacity="0.6"
          filter="url(#goldGlow)"
        />

        {/* Center punctum - crimson core */}
        <circle
          cx="32"
          cy="40"
          r="6"
          fill="#dc2626"
          opacity="0.8"
          filter="url(#crimsonGlow)"
        />
      </g>
    </svg>
  )
}
