import { useEffect, useState } from 'react'

interface TypingRevealProps {
  text: string
  speed?: number
  className?: string
  containerClassName?: string
}

export default function TypingReveal({ 
  text, 
  speed = 50, 
  className = '',
  containerClassName = ''
}: TypingRevealProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length === text.length) {
      setIsComplete(true)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1))
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayedText, text, speed])

  return (
    <div className={containerClassName}>
      <p className={className}>
        {displayedText}
        {!isComplete && (
          <span className="animate-pulse ml-1">_</span>
        )}
      </p>
    </div>
  )
}
