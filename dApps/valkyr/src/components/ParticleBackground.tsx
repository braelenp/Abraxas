import React, { useEffect, useState } from 'react'

interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  duration: number
  delay: number
}

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate 20 floating cyan particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 14 + 9,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            backgroundColor: 'rgba(6, 182, 212, 0.8)',
          }}
        />
      ))}
    </div>
  )
}

export default ParticleBackground
