import { useState, useEffect } from 'react'

export function useTypingEffect(
  phrases: string[],
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseMs = 2200
) {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseMs)
      return () => clearTimeout(t)
    }

    if (!isDeleting) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setText(current.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        }, typingSpeed)
        return () => clearTimeout(t)
      } else {
        setIsPaused(true)
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setText(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        }, deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setIsDeleting(false)
        setPhraseIndex((p) => (p + 1) % phrases.length)
      }
    }
  }, [charIndex, isDeleting, isPaused, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs])

  return text
}
