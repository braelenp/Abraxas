import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  life: number
  maxLife: number
}

const COLORS = [
  'rgba(153, 69, 255,',  // purple
  'rgba(0, 245, 255,',   // cyan
  'rgba(255, 106, 0,',   // orange
  'rgba(255, 215, 0,',   // gold
]

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticle = () => {
      const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)]
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.1),
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        color: colorBase,
        life: 0,
        maxLife: Math.random() * 300 + 150,
      })
    }

    // Pre-seed particles
    for (let i = 0; i < 60; i++) spawnParticle()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new particles
      if (particles.length < 80 && Math.random() < 0.3) spawnParticle()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        const progress = p.life / p.maxLife
        const currentAlpha = p.alpha * (1 - progress)

        if (p.life >= p.maxLife || currentAlpha <= 0.01) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color} ${currentAlpha})`
        ctx.fill()

        // Add subtle glow
        if (p.size > 1.2) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `${p.color} ${currentAlpha * 0.15})`
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}
