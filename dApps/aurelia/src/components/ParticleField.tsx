import { useMemo } from 'react'

/** Deterministic pseudo-random [0,1) — mirrors Abraxas seededRand, avoids render-time Math.random() */
function seededRand(n: number): number {
  const x = Math.sin(n + 1.618) * 43758.5453
  return x - Math.floor(x)
}

// Particle colors: gold dominant, purple + cyan accents
const COLORS = [
  'rgba(245, 158, 11, 0.75)',   // gold
  'rgba(251, 191, 36, 0.65)',   // amber
  'rgba(253, 230, 138, 0.55)',  // gold-light
  'rgba(153, 69, 255, 0.55)',   // purple
  'rgba(192, 132, 252, 0.45)',  // purple-light
  'rgba(34, 211, 238, 0.45)',   // cyan
]

export default function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        size: seededRand(i * 7) * 3 + 0.8,
        left: seededRand(i * 7 + 1) * 100,
        top: seededRand(i * 7 + 2) * 110,
        dur: seededRand(i * 7 + 3) * 18 + 12,
        delay: seededRand(i * 7 + 4) * 9,
        color: COLORS[Math.floor(seededRand(i * 7 + 5) * COLORS.length)],
      })),
    []
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 5}px ${p.color}`,
            animation: `rr-float ${p.dur}s linear ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}
