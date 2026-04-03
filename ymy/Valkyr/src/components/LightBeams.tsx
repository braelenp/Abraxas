import React, { useState } from 'react'

const LightBeams: React.FC = () => {
  const [beams] = useState([
    {
      id: 'beam-1',
      top: '20%',
      left: '10%',
      color: 'cyan',
      opacity: 0.3,
      width: '300px',
      height: '2px',
    },
    {
      id: 'beam-2',
      top: '50%',
      left: '50%',
      color: 'purple',
      opacity: 0.2,
      width: '400px',
      height: '2px',
    },
    {
      id: 'beam-3',
      top: '70%',
      left: '20%',
      color: 'orange',
      opacity: 0.15,
      width: '250px',
      height: '2px',
    },
    {
      id: 'beam-4',
      top: '40%',
      left: '75%',
      color: 'cyan',
      opacity: 0.25,
      width: '350px',
      height: '2px',
    },
  ])

  const getBeamGradient = (color: string) => {
    const colorMap: Record<string, string> = {
      cyan: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent)',
      purple: 'linear-gradient(90deg, transparent, rgba(153, 69, 255, 0.3), transparent)',
      orange: 'linear-gradient(90deg, transparent, rgba(234, 88, 12, 0.2), transparent)',
      gold: 'linear-gradient(90deg, transparent, rgba(253, 216, 53, 0.3), transparent)',
    }
    return colorMap[color] || colorMap.cyan
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {beams.map((beam) => (
        <div
          key={beam.id}
          className="light-beam"
          style={{
            top: beam.top,
            left: beam.left,
            width: beam.width,
            height: beam.height,
            background: getBeamGradient(beam.color),
            opacity: beam.opacity,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  )
}

export default LightBeams
