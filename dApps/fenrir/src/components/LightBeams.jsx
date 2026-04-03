import React from 'react'

const LightBeams = () => {
  const beams = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    left: 20 + i * 15,
    delay: i * 0.2,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {beams.map((beam) => (
        <div
          key={beam.id}
          className="light-beam absolute"
          style={{
            left: `${beam.left}%`,
            top: 0,
            width: '80px',
            height: '100%',
            animation: `beam-flicker 3s ease-in-out ${beam.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default LightBeams
