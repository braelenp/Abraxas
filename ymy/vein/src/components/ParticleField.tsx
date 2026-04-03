function seededRand(seed: number) {
  const value = Math.sin(seed + 1.618) * 43758.5453
  return value - Math.floor(value)
}

const colors = [
  'rgba(217, 164, 65, 0.72)',
  'rgba(79, 191, 135, 0.58)',
  'rgba(153, 69, 255, 0.42)',
  'rgba(60, 246, 255, 0.38)',
  'rgba(255, 138, 36, 0.42)',
]

export default function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, index) => ({
    size: seededRand(index * 4) * 3.5 + 1,
    left: seededRand(index * 5 + 1) * 100,
    top: seededRand(index * 6 + 2) * 100,
    duration: seededRand(index * 7 + 3) * 16 + 12,
    delay: seededRand(index * 8 + 4) * 8,
    color: colors[Math.floor(seededRand(index * 9 + 5) * colors.length)],
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 5}px ${particle.color}`,
            animation: `float-rise ${particle.duration}s linear ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
