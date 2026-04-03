import { useEffect, useState } from 'react'

export function useTypingEffect(phrases: string[], speed: number = 50) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIndex]
    const delay = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < phrase.length) {
          setDisplayText(phrase.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(phrase.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setPhraseIndex((phraseIndex + 1) % phrases.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(delay)
  }, [charIndex, phraseIndex, isDeleting, phrases, speed])

  return displayText
}
