import React, { useEffect, useRef } from 'react'

const ParticleBackground = ({ count = 20, color = '#9945ff' }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const particles = []
    const symbols = ['✦', '◆', '✧', '⬢', '◇', '⬡']

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)]
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.color = color
      particle.style.opacity = Math.random() * 0.5 + 0.3
      particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px')
      
      containerRef.current.appendChild(particle)
      particles.push(particle)

      setTimeout(() => {
        particle.remove()
      }, 4000)
    }

    const interval = setInterval(() => {
      if (containerRef.current && containerRef.current.children.length < count / 2) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)]
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        particle.style.color = color
        particle.style.opacity = Math.random() * 0.5 + 0.3
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px')
        
        containerRef.current.appendChild(particle)

        setTimeout(() => {
          particle.remove()
        }, 4000)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [count, color])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default ParticleBackground
