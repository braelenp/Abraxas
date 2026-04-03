import { useEffect, useState } from 'react'

/**
 * Cycles through one or more phrases, typing them character by character.
 * @param phrases - A single string or array of strings to cycle through.
 * @param speed   - Milliseconds per character.
 * @param startDelay - Initial delay before the first character appears.
 * @param cycleDelay - Pause after a phrase completes before starting the next.
 */
export function useTypingEffect(
  phrases: string | string[],
  speed = 65,
  startDelay = 0,
  cycleDelay = 2200,
): string {
  const list = Array.isArray(phrases) ? phrases : [phrases]
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    let cancelled = false
    let interval: ReturnType<typeof setInterval>
    let delayTimer: ReturnType<typeof setTimeout>
    let cycleTimer: ReturnType<typeof setTimeout>

    const currentPhrase = list[phraseIdx]
    let charIdx = 0
    setText('')

    delayTimer = setTimeout(() => {
      if (cancelled) return
      interval = setInterval(() => {
        if (cancelled) return
        charIdx++
        setText(currentPhrase.slice(0, charIdx))
        if (charIdx >= currentPhrase.length) {
          clearInterval(interval)
          if (list.length > 1) {
            cycleTimer = setTimeout(() => {
              if (!cancelled) setPhraseIdx((p) => (p + 1) % list.length)
            }, cycleDelay)
          }
        }
      }, speed)
    }, startDelay)

    return () => {
      cancelled = true
      clearTimeout(delayTimer)
      clearTimeout(cycleTimer)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phraseIdx, list.join('||'), speed, startDelay, cycleDelay])

  return text
}
