import { useEffect, useState } from 'react'

export function useTypingEffect(
  phrases: string[],
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseMs = 2200,
) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]

    if (isPaused) {
      const timeoutId = window.setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseMs)

      return () => window.clearTimeout(timeoutId)
    }

    if (!isDeleting) {
      if (charIndex < current.length) {
        const timeoutId = window.setTimeout(() => {
          setText(current.slice(0, charIndex + 1))
          setCharIndex((value) => value + 1)
        }, typingSpeed)

        return () => window.clearTimeout(timeoutId)
      }

      setIsPaused(true)
      return undefined
    }

    if (charIndex > 0) {
      const timeoutId = window.setTimeout(() => {
        setText(current.slice(0, charIndex - 1))
        setCharIndex((value) => value - 1)
      }, deletingSpeed)

      return () => window.clearTimeout(timeoutId)
    }

    setIsDeleting(false)
    setPhraseIndex((value) => (value + 1) % phrases.length)

    return undefined
  }, [charIndex, deletingSpeed, isDeleting, isPaused, pauseMs, phraseIndex, phrases, typingSpeed])

  return text
}
