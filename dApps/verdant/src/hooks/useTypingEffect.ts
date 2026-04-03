import { useState, useEffect, useRef } from 'react'

export function useTypingEffect(phrases: string[], speed = 45, pause = 1800): string {
  const [displayed, setDisplayed] = useState('')
  const phraseIdx = useRef(0)
  const charIdx = useRef(0)
  const deleting = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIdx.current]
      if (!deleting.current) {
        charIdx.current += 1
        setDisplayed(current.slice(0, charIdx.current))
        if (charIdx.current >= current.length) {
          deleting.current = true
          timer.current = setTimeout(tick, pause)
          return
        }
      } else {
        charIdx.current -= 1
        setDisplayed(current.slice(0, charIdx.current))
        if (charIdx.current <= 0) {
          deleting.current = false
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length
        }
      }
      timer.current = setTimeout(tick, deleting.current ? speed / 2 : speed)
    }
    timer.current = setTimeout(tick, speed)
    return () => clearTimeout(timer.current)
  }, [phrases, speed, pause])

  return displayed
}
