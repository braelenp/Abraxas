import React, { useEffect, useState } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  className?: string
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 100, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (displayedText.length === text.length) {
      setIsComplete(true)
    }
  }, [displayedText, text, speed])

  return (
    <span className={`${className} ${!isComplete ? 'typing-text' : ''}`}>
      {displayedText}
    </span>
  )
}

export default TypingText
