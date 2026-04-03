import React from 'react'

interface RuneDisplayProps {
  rune: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  glow?: 'cyan' | 'purple' | 'orange' | 'gold'
}

const RuneDisplay: React.FC<RuneDisplayProps> = ({ rune, size = 'lg', glow = 'gold' }) => {
  const sizeMap = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-8xl',
    xl: 'text-9xl',
  }

  const glowColorMap: Record<string, string> = {
    cyan: 'text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]',
    purple: 'text-purple-400 drop-shadow-[0_0_20px_rgba(153,69,255,0.8)]',
    orange: 'text-orange-500 drop-shadow-[0_0_20px_rgba(234,88,12,0.8)]',
    gold: 'text-yellow-300 drop-shadow-[0_0_30px_rgba(253,216,53,0.8)]',
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`rune-glow ${sizeMap[size]} ${glowColorMap[glow]} font-bold`}>
        {rune}
      </div>
    </div>
  )
}

export default RuneDisplay
