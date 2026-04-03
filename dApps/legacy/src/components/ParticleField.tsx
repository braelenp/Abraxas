import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  const COLORS = [
    'rgba(220, 38, 38, 0.75)',   // crimson
    'rgba(248, 113, 113, 0.65)', // red-400
    'rgba(252, 165, 165, 0.55)', // red-300
    'rgba(153, 69, 255, 0.55)',  // purple
    'rgba(192, 132, 252, 0.45)', // purple-light
    'rgba(34, 211, 238, 0.45)',  // cyan
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticle = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 1.5
      const maxLife = 3000 + Math.random() * 3000

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 2 + Math.random() * 4,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create new particles occasionally
      if (Math.random() < 0.15 && particlesRef.current.length < 100) {
        createParticle()
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life += 16
        if (p.life > p.maxLife) return false

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravity

        const progress = p.life / p.maxLife
        const opacity = Math.sin(progress * Math.PI)

        const rgba = p.color.replace(')', `, ${opacity})`).replace('rgba(', 'rgba(')
        ctx.fillStyle = rgba
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
