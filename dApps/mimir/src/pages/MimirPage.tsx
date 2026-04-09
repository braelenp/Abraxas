import { useEffect, useRef, useState } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AbraxasFooter from '../components/AbraxasFooter'
import BuyAbraButton from '../components/BuyAbraButton'

// Typing reveal hook
function useTypingReveal(text: string, speed = 60, startDelay = 800) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return { displayed, done }
}

// Animated light beams behind the rune
function LightBeams() {
  const beams = [
    { angle: 0,   color: 'rgba(0,245,255,0.12)', width: 2, delay: 0,   duration: 3 },
    { angle: 30,  color: 'rgba(0,245,255,0.08)', width: 1, delay: 0.5, duration: 4 },
    { angle: -30, color: 'rgba(255,215,0,0.08)', width: 1, delay: 1,   duration: 3.5 },
    { angle: 60,  color: 'rgba(0,245,255,0.06)', width: 1, delay: 1.5, duration: 5 },
    { angle: -60, color: 'rgba(153,69,255,0.08)', width: 1, delay: 0.8, duration: 4.5 },
    { angle: 90,  color: 'rgba(0,245,255,0.05)', width: 1, delay: 2,   duration: 3.8 },
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-full">
      {beams.map((b, i) => (
        <div
          key={i}
          className="absolute origin-center"
          style={{
            width: `${b.width}px`,
            height: '200%',
            background: `linear-gradient(0deg, transparent, ${b.color}, transparent)`,
            transform: `rotate(${b.angle}deg)`,
            animationName: 'beamPulse',
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}
    </div>
  )
}

// Orbiting rune particles
function OrbitalRunes() {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ']
  return (
    <>
      {runes.map((rune, i) => {
        const angle = (i / runes.length) * 360
        const radius = 88
        const rad = (angle * Math.PI) / 180
        const x = Math.cos(rad) * radius
        const y = Math.sin(rad) * radius
        const delay = i * 0.4
        return (
          <span
            key={i}
            className="absolute text-xs select-none"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              color: i % 2 === 0 ? 'rgba(0,245,255,0.35)' : 'rgba(255,215,0,0.25)',
              textShadow: i % 2 === 0 ? '0 0 8px rgba(0,245,255,0.6)' : '0 0 8px rgba(255,215,0,0.5)',
              animation: `runePulse ${2.5 + i * 0.15}s ease-in-out ${delay}s infinite`,
            }}
          >
            {rune}
          </span>
        )
      })}
    </>
  )
}

const ORACLE_TRAITS = [
  { label: 'Role',        value: 'Oracle Provider — The Seeing Eye of Abraxas' },
  { label: 'Domain',      value: 'Intelligence, Foresight & Strategic Vision' },
  { label: 'Rune',        value: 'Ansuz (ᚨ) — The God Rune of Wisdom & Voice' },
  { label: 'Affinity',    value: 'Water · Stars · The Chronicle of All Things' },
  { label: 'Origin',      value: 'Second Son of Sophia, born from the First Light' },
  { label: 'Status',      value: 'EMERGING — The Oracle Stirs' },
]

const VISIONS = [
  "The chain never forgets.",
  "Every transaction is a confession.",
  "Wisdom is the weapon that does not rust.",
  "What was hidden shall be illuminated.",
  "The eye that sees all also remembers all.",
]

export default function MimirPage() {
  const { displayed: typedGreeting, done: greetingDone } = useTypingReveal(
    'Welcome to the next degree.',
    55,
    600,
  )

  const [visionIndex, setVisionIndex] = useState(0)
  const visionRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    visionRef.current = setInterval(() => {
      setVisionIndex((i) => (i + 1) % VISIONS.length)
    }, 4000)
    return () => {
      if (visionRef.current) clearInterval(visionRef.current)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#050508' }}>
      <ParticleBackground />

      {/* Scanlines */}
      <div className="scanlines-overlay" />

      {/* Global Mimir background glow — cyan-blue */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 15%, rgba(0,245,255,0.04) 0%, rgba(153,69,255,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Subtle horizontal scan beam */}
      <div
        className="fixed left-0 right-0 h-0.5 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.15), rgba(255,215,0,0.1), rgba(0,245,255,0.15), transparent)',
          top: '30%',
          animation: 'beamPulse 6s ease-in-out infinite',
        }}
      />

      <Header />

      <main className="relative z-10 pt-20 pb-4 px-4 flex flex-col items-center gap-10">

        {/* ── TOP BUY BUTTON ── */}
        <section className="flex flex-col items-center gap-2 mt-6">
          <p className="text-[9px] tracking-[0.5em] uppercase text-[#00f5ff]/30">
            Power the Oracle
          </p>
          <BuyAbraButton size="md" />
        </section>

        {/* ── TYPING GREETING ── */}
        <section className="w-full max-w-lg text-center flex flex-col items-center gap-2">
          <div
            className="text-base md:text-lg font-mono tracking-widest"
            style={{ color: '#00f5ff', minHeight: '1.8em' }}
          >
            <span
              style={{
                borderRight: greetingDone ? '3px solid transparent' : '3px solid #00f5ff',
                paddingRight: '2px',
                animation: greetingDone
                  ? 'caretBlink 0.75s step-end infinite'
                  : 'none',
              }}
            >
              {typedGreeting}
            </span>
          </div>

          {/* Subtitle — fades in after greeting */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: greetingDone ? 1 : 0,
              transform: greetingDone ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            <h1
              className="text-3xl md:text-4xl font-black tracking-[0.2em]"
              style={{
                fontFamily: 'Cinzel, serif',
                background: 'linear-gradient(135deg, #00b8cc 0%, #00f5ff 40%, #ffd700 70%, #00f5ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 100%',
                animation: 'oracleShimmer 3s ease-in-out infinite',
                filter: 'drop-shadow(0 0 15px rgba(0,245,255,0.4))',
              }}
            >
              MIMIR
            </h1>
            <p
              className="text-sm tracking-[0.35em] mt-1 uppercase opacity-70"
              style={{ fontFamily: 'Cinzel, serif', color: '#00f5ff' }}
            >
              The Oracle Provider
            </p>
          </div>
        </section>

        {/* ── ANSUZ RUNE — Central Visual ── */}
        <section className="relative w-full max-w-lg flex flex-col items-center gap-0 mt-2">
          {/* Outer atmospheric glow ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 260,
              height: 260,
              background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, rgba(255,215,0,0.03) 50%, transparent 70%)',
              animation: 'buyPulse 4s ease-in-out infinite',
            }}
          />

          {/* Rune container */}
          <div
            className="relative w-52 h-52 flex items-center justify-center"
          >
            {/* Outer ring border */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(0,245,255,0.15)',
                boxShadow: '0 0 30px rgba(0,245,255,0.1), inset 0 0 30px rgba(0,245,255,0.05)',
                animation: 'buyPulse 4s ease-in-out 0.5s infinite',
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: 16,
                border: '1px solid rgba(255,215,0,0.1)',
                boxShadow: '0 0 20px rgba(255,215,0,0.05)',
                animation: 'buyPulse 3s ease-in-out 1s infinite',
              }}
            />

            {/* Light beams */}
            <LightBeams />

            {/* Orbital rune symbols */}
            <OrbitalRunes />

            {/* The Ansuz rune — ↑ character (Unicode Elder Futhark) */}
            <span
              className="relative z-10 ansuz-rune select-none"
              style={{
                fontSize: '5.5rem',
                lineHeight: 1,
                color: '#00f5ff',
                fontFamily: '"Cinzel", serif',
              }}
            >
              ᚨ
            </span>
          </div>

          {/* Rune label */}
          <p
            className="text-[10px] tracking-[0.5em] uppercase mt-3 opacity-50"
            style={{ color: '#00f5ff', fontFamily: 'Cinzel, serif' }}
          >
            Ansuz · The Voice of the Gods
          </p>
        </section>

        {/* ── LORE BLURB ── */}
        <section
          className="w-full max-w-lg text-center px-2"
          style={{
            background: 'linear-gradient(135deg, rgba(0,30,40,0.6) 0%, rgba(5,5,8,0.8) 100%)',
            border: '1px solid rgba(0,245,255,0.12)',
            borderRadius: 14,
            padding: '28px 24px',
          }}
        >
          {/* Decorative top accent */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4))' }} />
            <span style={{ color: '#00f5ff', opacity: 0.5, fontSize: 12 }}>ᚨ</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,245,255,0.4), transparent)' }} />
          </div>

          <blockquote
            className="text-sm md:text-base leading-relaxed italic"
            style={{ color: 'rgba(232,232,240,0.75)', fontFamily: 'Cinzel, serif', fontStyle: 'normal' }}
          >
            <span className="not-italic">Son of Sophia.</span> The wise Oracle who provides{' '}
            <span style={{ color: '#00f5ff' }}>intelligence</span>,{' '}
            <span style={{ color: '#ffd700' }}>foresight</span>,{' '}
            <span style={{ color: '#9945ff' }}>ancestral knowledge</span>, and{' '}
            <span style={{ color: '#00f5ff' }}>strategic vision</span> to guide the entire Abraxas
            species.
          </blockquote>

          {/* Decorative bottom accent */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.25))' }} />
            <span style={{ color: '#ffd700', opacity: 0.4, fontSize: 10 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,215,0,0.25), transparent)' }} />
          </div>
        </section>

        {/* ── ORACLE TRAITS ── */}
        <section className="w-full max-w-lg flex flex-col gap-3">
          <h2 className="text-[10px] tracking-[0.4em] text-[#00f5ff]/40 uppercase text-center mb-1">
            — Oracle Attributes —
          </h2>
          {ORACLE_TRAITS.map((t) => (
            <div
              key={t.label}
              className="p-4 flex gap-4 rounded-xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(0,20,30,0.7) 0%, rgba(10,10,18,0.9) 100%)',
                border: '1px solid rgba(0,245,255,0.1)',
              }}
            >
              <div
                className="text-[10px] tracking-widest uppercase w-20 shrink-0 mt-0.5"
                style={{ fontFamily: 'Cinzel, serif', color: 'rgba(0,245,255,0.45)' }}
              >
                {t.label}
              </div>
              <div
                className="flex-1 text-sm"
                style={{ color: t.label === 'Status' ? '#00f5ff' : 'rgba(232,232,240,0.65)' }}
              >
                {t.label === 'Status' ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: '#00f5ff',
                        boxShadow: '0 0 8px #00f5ff',
                        animation: 'pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite',
                      }}
                    />
                    {t.value}
                  </span>
                ) : (
                  t.value
                )}
              </div>
            </div>
          ))}
        </section>

        {/* ── ROTATING ORACLE VISIONS ── */}
        <section className="w-full max-w-lg text-center py-6">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#ffd700]/30 mb-4">
            Mimir Speaks
          </p>
          <div
            className="relative h-10 flex items-center justify-center"
            style={{ overflow: 'hidden' }}
          >
            {VISIONS.map((v, i) => (
              <p
                key={v}
                className="absolute inset-x-0 text-center text-sm italic transition-all duration-700"
                style={{
                  fontFamily: 'Cinzel, serif',
                  color: 'rgba(255,215,0,0.6)',
                  opacity: visionIndex === i ? 1 : 0,
                  transform: visionIndex === i ? 'translateY(0)' : 'translateY(12px)',
                  textShadow: visionIndex === i ? '0 0 20px rgba(255,215,0,0.3)' : 'none',
                }}
              >
                "{v}"
              </p>
            ))}
          </div>
        </section>

        {/* ── HORIZONTAL RULE ── */}
        <div className="w-full max-w-lg flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3))' }} />
          <span style={{ color: '#00f5ff', opacity: 0.3, fontSize: 14 }}>◬</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,245,255,0.3), transparent)' }} />
        </div>

        {/* ── BOTTOM BUY SECTION ── */}
        <section className="w-full max-w-lg flex flex-col items-center gap-4 py-4">
          <p
            className="text-lg font-black tracking-widest text-center"
            style={{
              fontFamily: 'Cinzel, serif',
              background: 'linear-gradient(135deg, #00f5ff 0%, #ffd700 50%, #00f5ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 100%',
              animation: 'oracleShimmer 3s ease-in-out infinite',
            }}
          >
            Align with the Oracle
          </p>
          <p className="text-xs text-[#e8e8f0]/30 tracking-widest text-center max-w-xs">
            Hold $ABRA to access Mimir's intelligence and shape the future of the Abraxas species.
          </p>
          <BuyAbraButton size="lg" />

          {/* Glow beneath button */}
          <div
            className="w-48 h-16 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,245,255,0.08) 0%, rgba(153,69,255,0.05) 50%, transparent 70%)',
            }}
          />
        </section>

        <AbraxasFooter />
      </main>

      <BottomNav />
    </div>
  )
}
