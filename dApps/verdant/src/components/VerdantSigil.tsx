import React from 'react'

interface VerdantSigilProps {
  size?: number
  className?: string
  animate?: boolean
}

const VerdantSigil: React.FC<VerdantSigilProps> = ({
  size = 120,
  className = '',
  animate = true,
}) => {
  const w = size
  const h = Math.round(size * 1.18)
  const cx = w / 2
  const cy = h / 2 + 6

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'verdant-enter' : ''} ${className}`}
      aria-label="Verdant sigil"
    >
      <defs>
        {/* Outer emerald glow radial */}
        <radialGradient id="vg-outer" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#10b981" stopOpacity="0.18" />
          <stop offset="60%"  stopColor="#10b981" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        {/* Mid glow */}
        <radialGradient id="vg-mid" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#6ee7b7" stopOpacity="0.32" />
          <stop offset="55%"  stopColor="#10b981" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        {/* Core glow */}
        <radialGradient id="vg-core" cx="50%" cy="60%" r="50%">
          <stop offset="0%"   stopColor="#a7f3d0" stopOpacity="0.9" />
          <stop offset="40%"  stopColor="#6ee7b7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
        </radialGradient>
        {/* Tree trunk gradient */}
        <linearGradient id="vg-trunk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        {/* Lime leaf accent */}
        <linearGradient id="vg-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#bef264" />
          <stop offset="100%" stopColor="#84cc16" />
        </linearGradient>
        {/* Filter for glow */}
        <filter id="vg-blur-sm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="vg-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="vg-blur-xl" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* ── Outermost ambient glow ── */}
      <ellipse
        cx={cx} cy={cy}
        rx={w * 0.46} ry={h * 0.39}
        fill="url(#vg-outer)"
        filter="url(#vg-blur-xl)"
        className={animate ? '' : ''}"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* ── Purple outer ring (identical to Aurelia) ── */}
      <circle
        cx={cx} cy={cy}
        r={w * 0.415}
        stroke="#9945ff"
        strokeWidth="0.6"
        strokeOpacity="0.45"
        fill="none"
      />
      <circle
        cx={cx} cy={cy}
        r={w * 0.415}
        stroke="#9945ff"
        strokeWidth="1.5"
        strokeOpacity="0.18"
        strokeDasharray="3 7"
        fill="none"
        className={animate ? '' : ''}
        style={{ transformOrigin: `${cx}px ${cy}px` }}"
      />

      {/* ── Mid emerald ring ── */}
      <circle
        cx={cx} cy={cy}
        r={w * 0.34}
        stroke="#10b981"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeDasharray="5 5"
        fill="none"
        style={{ transformOrigin: `${cx}px ${cy}px` }}"
      />

      {/* ── Inner solid ring ── */}
      <circle
        cx={cx} cy={cy}
        r={w * 0.265}
        stroke="#6ee7b7"
        strokeWidth="1"
        strokeOpacity="0.35"
        fill="rgba(16,185,129,0.04)"
      />

      {/* ── Mid glow blob ── */}
      <ellipse
        cx={cx} cy={cy}
        rx={w * 0.28} ry={h * 0.24}
        fill="url(#vg-mid)"
        filter="url(#vg-blur-lg)"
      />

      {/* ── Branching Tree Sigil ───────────────────────────────── */}

      {/* Root base */}
      <path
        d={`M ${cx - w*0.03} ${cy + h*0.25} Q ${cx} ${cy + h*0.28} ${cx + w*0.03} ${cy + h*0.25}`}
        stroke="#10b981"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        fill="none"
      />

      {/* Main trunk */}
      <path
        d={`M ${cx} ${cy + h*0.25} L ${cx} ${cy - h*0.08}`}
        stroke="url(#vg-trunk)"
        strokeWidth={w * 0.04}
        strokeLinecap="round"
        fill="none"
      />

      {/* Glow duplicate of trunk */}
      <path
        d={`M ${cx} ${cy + h*0.25} L ${cx} ${cy - h*0.08}`}
        stroke="#6ee7b7"
        strokeWidth={w * 0.06}
        strokeLinecap="round"
        strokeOpacity="0.25"
        fill="none"
        filter="url(#vg-blur-sm)"
      />

      {/* Left main branch */}
      <path
        d={`M ${cx} ${cy + h*0.04} Q ${cx - w*0.15} ${cy - h*0.05} ${cx - w*0.2} ${cy - h*0.14}`}
        stroke="url(#vg-trunk)"
        strokeWidth={w * 0.025}
        strokeLinecap="round"
        fill="none"
      />
      {/* Right main branch */}
      <path
        d={`M ${cx} ${cy - h*0.01} Q ${cx + w*0.16} ${cy - h*0.07} ${cx + w*0.21} ${cy - h*0.16}`}
        stroke="url(#vg-trunk)"
        strokeWidth={w * 0.025}
        strokeLinecap="round"
        fill="none"
      />

      {/* Left sub-branch 1 */}
      <path
        d={`M ${cx - w*0.1} ${cy - h*0.04} Q ${cx - w*0.2} ${cy - h*0.1} ${cx - w*0.25} ${cy - h*0.2}`}
        stroke="#6ee7b7"
        strokeWidth={w * 0.015}
        strokeLinecap="round"
        strokeOpacity="0.8"
        fill="none"
      />
      {/* Right sub-branch 1 */}
      <path
        d={`M ${cx + w*0.11} ${cy - h*0.05} Q ${cx + w*0.22} ${cy - h*0.12} ${cx + w*0.17} ${cy - h*0.24}`}
        stroke="#6ee7b7"
        strokeWidth={w * 0.015}
        strokeLinecap="round"
        strokeOpacity="0.8"
        fill="none"
      />

      {/* Upper left branch */}
      <path
        d={`M ${cx} ${cy - h*0.08} Q ${cx - w*0.1} ${cy - h*0.18} ${cx - w*0.08} ${cy - h*0.28}`}
        stroke="#a7f3d0"
        strokeWidth={w * 0.015}
        strokeLinecap="round"
        strokeOpacity="0.9"
        fill="none"
      />
      {/* Upper right branch */}
      <path
        d={`M ${cx} ${cy - h*0.08} Q ${cx + w*0.1} ${cy - h*0.18} ${cx + w*0.07} ${cy - h*0.29}`}
        stroke="#a7f3d0"
        strokeWidth={w * 0.015}
        strokeLinecap="round"
        strokeOpacity="0.9"
        fill="none"
      />
      {/* Centre top branch */}
      <path
        d={`M ${cx} ${cy - h*0.08} L ${cx} ${cy - h*0.32}`}
        stroke="#a7f3d0"
        strokeWidth={w * 0.018}
        strokeLinecap="round"
        strokeOpacity="0.95"
        fill="none"
      />

      {/* Leaf clusters — left */}
      <ellipse cx={cx - w*0.2} cy={cy - h*0.18}  rx={w*0.055} ry={h*0.042} fill="url(#vg-leaf)" opacity="0.85" transform={`rotate(-30,${cx - w*0.2},${cy - h*0.18})`} />
      <ellipse cx={cx - w*0.25} cy={cy - h*0.24} rx={w*0.05}  ry={h*0.038} fill="url(#vg-leaf)" opacity="0.75" transform={`rotate(-40,${cx - w*0.25},${cy - h*0.24})`} />

      {/* Leaf clusters — right */}
      <ellipse cx={cx + w*0.21} cy={cy - h*0.19} rx={w*0.055} ry={h*0.042} fill="url(#vg-leaf)" opacity="0.85" transform={`rotate(30,${cx + w*0.21},${cy - h*0.19})`} />
      <ellipse cx={cx + w*0.17} cy={cy - h*0.27} rx={w*0.05}  ry={h*0.038} fill="url(#vg-leaf)" opacity="0.75" transform={`rotate(20,${cx + w*0.17},${cy - h*0.27})`} />

      {/* Top leaf */}
      <ellipse cx={cx}         cy={cy - h*0.34}  rx={w*0.06}  ry={h*0.045} fill="url(#vg-leaf)" opacity="0.9"  transform={`rotate(-5,${cx},${cy - h*0.34})`} />
      <ellipse cx={cx - w*0.07} cy={cy - h*0.31} rx={w*0.045} ry={h*0.034} fill="url(#vg-leaf)" opacity="0.7"  transform={`rotate(-15,${cx - w*0.07},${cy - h*0.31})`} />
      <ellipse cx={cx + w*0.07} cy={cy - h*0.31} rx={w*0.045} ry={h*0.034} fill="url(#vg-leaf)" opacity="0.7"  transform={`rotate(15,${cx + w*0.07},${cy - h*0.31})`} />

      {/* ── Core light ── */}
      <circle
        cx={cx} cy={cy + h*0.05}
        r={w * 0.065}
        fill="url(#vg-core)"
        filter="url(#vg-blur-sm)"
        className={animate ? 'rr-breathe' : ''}
        style={{ transformOrigin: `${cx}px ${cy + h*0.05}px` }}
      />
      <circle
        cx={cx} cy={cy + h*0.05}
        r={w * 0.025}
        fill="#d1fae5"
        opacity="0.9"
      />

      {/* ── Pulse ring ── */}
      {animate && (
        <circle
          cx={cx} cy={cy}
          r={w * 0.34}
          stroke="#10b981"
          strokeWidth="1.2"
          strokeOpacity="0.5"
          fill="none"
          style={{}}"
        />
      )}

      {/* ── Corner rune marks ── */}
      {[
        { angle: 45,  label: 'ᚠ' },
        { angle: 135, label: 'ᛃ' },
        { angle: 225, label: 'ᛇ' },
        { angle: 315, label: 'ᛟ' },
      ].map(({ angle, label }) => {
        const rad = (angle * Math.PI) / 180
        const rx = cx + Math.cos(rad) * w * 0.41
        const ry = cy + Math.sin(rad) * w * 0.41
        return (
          <text
            key={angle}
            x={rx}
            y={ry}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={w * 0.075}
            fill="#6ee7b7"
            fillOpacity="0.65"
            style={{ fontFamily: 'serif' }}
          >
            {label}
          </text>
        )
      })}
    </svg>
  )
}

export default VerdantSigil
