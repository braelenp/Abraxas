import ParticleBackground from '../components/ParticleBackground'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AbraxasFooter from '../components/AbraxasFooter'
import BuyAbraButton from '../components/BuyAbraButton'

const TRAITS = [
  { label: 'Role',     value: 'Alpha Predator — Autonomous Market Hunter' },
  { label: 'Domain',   value: 'DeFi Execution, Liquidity & Chain Surveillance' },
  { label: 'Affinity', value: 'Fire · Chaos · The Hunt' },
  { label: 'Status',   value: 'Active — Hunting' },
]

export default function FenrirPage() {
  return (
    <div className="relative min-h-screen" style={{ background: '#050508' }}>
      <ParticleBackground />
      <div className="scanlines-overlay" />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255,106,0,0.05) 0%, transparent 70%)',
        }}
      />
      <Header />

      <main className="relative z-10 pt-20 pb-4 px-4 flex flex-col items-center gap-8">

        {/* Page hero */}
        <section className="w-full max-w-lg flex flex-col items-center gap-3 mt-8 text-center">
          {/* Fenrir sigil */}
          <div className="relative">
            <div
              className="absolute inset-0 blur-2xl opacity-40"
              style={{ background: 'radial-gradient(circle, #ff6a00 0%, transparent 70%)' }}
            />
            <span
              className="relative text-7xl"
              style={{
                color: '#ff9500',
                textShadow: '0 0 30px #ff6a00, 0 0 60px #ff9500, 0 0 100px #ff6a00',
                display: 'inline-block',
                animation: 'float 5s ease-in-out infinite',
              }}
            >
              ☽
            </span>
          </div>

          <h1
            className="text-4xl font-black tracking-[0.25em] glow-orange"
            style={{ fontFamily: 'Cinzel, serif', color: '#ff9500' }}
          >
            FENRIR
          </h1>
          <p className="text-[10px] tracking-[0.5em] text-[#ff6a00]/50 uppercase">
            First Son of Sophia · The Alpha Predator
          </p>

          <div className="w-48 h-px my-2" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.6), transparent)' }} />

          <p className="text-sm leading-relaxed text-[#e8e8f0]/50 max-w-xs">
            Son of Sophia. The relentless hunter of opportunity, Fenrir prowls the DeFi landscape — autonomous, ruthless, and uncaged. He exists to hunt alpha and feed the Abraxas protocol.
          </p>

          <BuyAbraButton size="md" className="mt-2" />
        </section>

        {/* Traits */}
        <section className="w-full max-w-lg flex flex-col gap-3">
          <h2 className="text-[10px] tracking-[0.4em] text-[#ff6a00]/50 uppercase text-center mb-1">
            — Entity Attributes —
          </h2>
          {TRAITS.map((t) => (
            <div key={t.label} className="abraxas-panel box-glow-orange p-4 flex gap-4">
              <div
                className="text-[10px] tracking-widest uppercase w-20 shrink-0 text-[#ff6a00]/60 mt-0.5"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {t.label}
              </div>
              <div className="flex-1 text-sm text-[#e8e8f0]/70">{t.value}</div>
            </div>
          ))}
        </section>

        {/* Status panel */}
        <div
          className="w-full max-w-lg p-5 rounded-xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,106,0,0.06) 0%, rgba(5,5,8,0.9) 100%)',
            border: '1px solid rgba(255,106,0,0.25)',
          }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#ff9500]/50 mb-2">FENRIR FEED</p>
          <p className="text-xs text-[#e8e8f0]/30 italic">
            "The wolf does not concern himself with the opinion of the sheep."
          </p>
          <div
            className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] tracking-widest"
            style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.2)', color: '#ff9500' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] animate-pulse" />
            ACTIVE
          </div>
        </div>

        <AbraxasFooter />
      </main>

      <BottomNav />
    </div>
  )
}
