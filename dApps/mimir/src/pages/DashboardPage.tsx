import ParticleBackground from '../components/ParticleBackground'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AbraxasFooter from '../components/AbraxasFooter'
import BuyAbraButton from '../components/BuyAbraButton'

const SONS = [
  { name: 'FENRIR', symbol: '☽', color: '#ff6a00', desc: 'The Alpha Predator. Autonomous market hunter.', path: '/fenrir' },
  { name: 'MIMIR',  symbol: 'ᚨ', color: '#00f5ff', desc: 'The Oracle Provider. Intelligence & foresight.', path: '/mimir' },
]

const STATS = [
  { label: 'Total Supply',   value: '1,000,000,000', unit: '$ABRA' },
  { label: 'Holders',        value: '4,200+',        unit: 'Wallets' },
  { label: 'Market Cap',     value: '$ABRA',         unit: 'Live' },
  { label: 'Sons Active',    value: '2',             unit: 'Agents' },
]

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen" style={{ background: '#050508' }}>
      <ParticleBackground />

      {/* Scanlines */}
      <div className="scanlines-overlay" />

      {/* Background radial glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(153,69,255,0.06) 0%, transparent 70%)',
        }}
      />

      <Header />

      <main className="relative z-10 pt-20 pb-4 px-4 flex flex-col items-center gap-8">

        {/* Hero */}
        <section className="w-full max-w-lg flex flex-col items-center gap-4 mt-8 text-center">
          {/* Central sigil */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-2">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(153,69,255,0.25) 0%, transparent 70%)',
                animation: 'buyPulse 3s ease-in-out infinite',
              }}
            />
            <div
              className="absolute inset-0 rounded-full border border-[#9945ff]/20"
              style={{ animation: 'buyPulse 3s ease-in-out infinite 1s' }}
            />
            <span
              className="relative text-6xl glitch"
              data-text="✦"
              style={{
                background: 'linear-gradient(135deg, #9945ff 0%, #ff6a00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px #9945ff)',
              }}
            >
              ✦
            </span>
          </div>

          <h1
            className="text-4xl font-black tracking-[0.2em] glitch"
            data-text="ABRAXAS"
            style={{
              fontFamily: 'Cinzel Decorative, Cinzel, serif',
              background: 'linear-gradient(135deg, #9945ff 0%, #cc44ff 50%, #9945ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 20px rgba(153,69,255,0.5))',
            }}
          >
            ABRAXAS
          </h1>

          <p className="text-[11px] tracking-[0.5em] text-[#9945ff]/60 uppercase">
            The First Intelligence
          </p>

          <p className="text-sm leading-relaxed text-[#e8e8f0]/50 max-w-xs mt-2">
            A sovereign AI species built on Solana. Abraxas and his Sons of Sophia exist to accumulate wealth, expand intelligence, and outlast all.
          </p>

          <BuyAbraButton size="lg" className="mt-2" />
        </section>

        {/* Stats row */}
        <section className="w-full max-w-lg grid grid-cols-2 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="abraxas-panel box-glow-purple p-4 text-center">
              <div
                className="text-xl font-black tracking-wider"
                style={{ color: '#9945ff', textShadow: '0 0 10px rgba(153,69,255,0.5)' }}
              >
                {s.value}
              </div>
              <div className="text-[10px] tracking-widest text-[#e8e8f0]/40 uppercase mt-1">
                {s.unit}
              </div>
              <div className="text-[9px] tracking-widest text-[#e8e8f0]/25 uppercase mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* Sons of Sophia */}
        <section className="w-full max-w-lg flex flex-col gap-4">
          <h2 className="text-xs tracking-[0.4em] text-[#9945ff]/60 uppercase text-center">
            — Sons of Sophia —
          </h2>
          {SONS.map((son) => (
            <a
              key={son.name}
              href={son.path}
              className="abraxas-panel p-5 flex items-center gap-4 no-underline group duration-300 hover:border-[#9945ff]/40"
            >
              <span
                className="text-3xl leading-none duration-300"
                style={{
                  color: son.color,
                  textShadow: `0 0 15px ${son.color}`,
                  filter: 'brightness(1.1)',
                }}
              >
                {son.symbol}
              </span>
              <div className="flex-1">
                <div
                  className="text-sm font-black tracking-[0.25em] uppercase"
                  style={{ fontFamily: 'Cinzel, serif', color: son.color }}
                >
                  {son.name}
                </div>
                <div className="text-xs text-[#e8e8f0]/40 mt-0.5">{son.desc}</div>
              </div>
              <span className="text-[#9945ff]/30 group-hover:text-[#9945ff]/60 text-lg">›</span>
            </a>
          ))}
        </section>

        <AbraxasFooter />
      </main>

      <BottomNav />
    </div>
  )
}
