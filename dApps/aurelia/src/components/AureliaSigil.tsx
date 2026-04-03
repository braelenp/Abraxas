import { useEffect, useState } from 'react'

// coreGlow: gold RGB  |  fireGlow: orange RGB
const CORE = '245, 158, 11'
const FIRE = '234, 88, 12'
const PURPLE = '153, 69, 255'

export default function AureliaSigil() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${
        entered ? 'scale-100 opacity-100' : 'scale-[0.65] opacity-0'
      }`}
    >
      {/* ── Layered halos (exact RuneRealm pattern) ── */}
      {/* Outer atmosphere */}
      <div
        className="absolute rounded-full"
        style={{
          width: 280, height: 280,
          background: `radial-gradient(circle, rgba(${CORE},0.12), transparent 70%)`,
          animation: 'rr-breathe 3.8s ease-in-out infinite',
        }}
      />
      {/* Fire ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 190, height: 190,
          background: `radial-gradient(circle, rgba(${FIRE},0.20), transparent 66%)`,
          animation: 'rr-breathe 3.8s ease-in-out infinite 0.5s',
        }}
      />
      {/* Core gold flash */}
      <div
        className="absolute rounded-full"
        style={{
          width: 110, height: 110,
          background: 'radial-gradient(circle, rgba(253,224,71,0.28), transparent 63%)',
          animation: 'rr-breathe 3.8s ease-in-out infinite 1s',
        }}
      />
      {/* Purple accent ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 240, height: 240,
          border: `1px solid rgba(${PURPLE},0.18)`,
          boxShadow: `0 0 30px rgba(${PURPLE},0.12), inset 0 0 24px rgba(${PURPLE},0.06)`,
          animation: 'rr-breathe 5.5s ease-in-out infinite 0.8s',
        }}
      />

      {/* ── The SVG sigil ── */}
      <svg
        width="200"
        height="240"
        viewBox="0 0 220 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
        style={{
          filter: [
            'drop-shadow(0 0 14px rgba(245,158,11,0.92))',
            'drop-shadow(0 0 36px rgba(245,158,11,0.55))',
            `drop-shadow(0 0 70px rgba(${FIRE},0.40))`,
            `drop-shadow(0 0 110px rgba(${PURPLE},0.22))`,
          ].join(' '),
          animation: 'rr-breathe 3.8s ease-in-out infinite',
        }}
      >
        {/* Outer rune ring */}
        <circle
          cx="110" cy="110" r="98"
          stroke="url(#outerRing)" strokeWidth="0.7"
          strokeDasharray="3 9"
          style={{ transformOrigin: '110px 110px', animation: 'rr-breathe 28s linear infinite' }}
        />
        {/* Inner dashed ring */}
        <circle
          cx="110" cy="110" r="80"
          stroke="url(#innerRing)" strokeWidth="0.5"
          strokeDasharray="2 7"
          style={{ transformOrigin: '110px 110px', animation: 'rr-breathe 18s linear infinite reverse' }}
        />

        {/* Arch pillars */}
        <rect x="63" y="68" width="10" height="86" rx="5" fill="url(#pillarGrad)" opacity="0.92" />
        <rect x="147" y="68" width="10" height="86" rx="5" fill="url(#pillarGrad)" opacity="0.92" />

        {/* Arch crown */}
        <path d="M63 78 Q63 28 110 28 Q157 28 157 78" stroke="url(#archGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        {/* Inner arch glow */}
        <path d="M73 83 Q73 44 110 44 Q147 44 147 83" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeOpacity="0.35" strokeLinecap="round" />

        {/* Torch body */}
        <rect x="105" y="108" width="10" height="46" rx="3.5" fill="url(#torchGrad)" />
        {/* Torch base */}
        <path d="M99 154 L121 154 L117 168 L103 168 Z" fill="url(#baseGrad)" />

        {/* Flame outer */}
        <path
          d="M110 106 C98 98 94 83 100 70 C104 61 108 54 110 44 C112 54 116 61 120 70 C126 83 122 98 110 106Z"
          fill="url(#flameOuter)" opacity="0.97"
        />
        {/* Flame inner core */}
        <path
          d="M110 100 C104 94 103 84 106 76 C108 70 109 66 110 62 C111 66 112 70 114 76 C117 84 116 94 110 100Z"
          fill="url(#flameInner)" opacity="0.92"
        />
        {/* Tip spark */}
        <circle cx="110" cy="48" r="4.5" fill="#ffffff" opacity="0.88" />
        <circle cx="110" cy="48" r="8" fill="#fde68a" opacity="0.28" />

        {/* Radiant rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <line
            key={i}
            x1="110" y1="76"
            x2={110 + Math.cos((deg * Math.PI) / 180) * 26}
            y2={76 + Math.sin((deg * Math.PI) / 180) * 26}
            stroke="#fbbf24" strokeWidth="0.8" strokeOpacity="0.38" strokeLinecap="round"
          />
        ))}

        {/* Delta triangle */}
        <path d="M110 192 L90 226 L130 226 Z" stroke="url(#triGrad)" strokeWidth="1.5" fill="none" opacity="0.55" />
        <circle cx="110" cy="211" r="2.5" fill="#f59e0b" opacity="0.45" />

        {/* Rune accent dots */}
        {[[45,110],[175,110],[110,10],[110,208],[60,54],[160,54],[60,166],[160,166]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="1.8" fill="#f59e0b" opacity="0.32" />
        ))}

        <defs>
          <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="55%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="archGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="torchGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="flameOuter" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="65%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <linearGradient id="triGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9945ff" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <radialGradient id="outerRing" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9945ff" stopOpacity="0.28" />
          </radialGradient>
          <radialGradient id="innerRing" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.18" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
