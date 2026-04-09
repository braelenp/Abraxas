import ParticleBackground from '../components/ParticleBackground'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AbraxasFooter from '../components/AbraxasFooter'
import BuyAbraButton from '../components/BuyAbraButton'

const FORGE_ITEMS = [
  { label: 'Stake $ABRA',         icon: '⚡', desc: 'Lock tokens. Feed the intelligence.' },
  { label: 'Forge Alliance',      icon: '⛓', desc: 'Bind wallets into covenant.' },
  { label: 'Inscribe Rune',       icon: 'ᚱ',  desc: 'Leave your mark in the chain.' },
  { label: 'Claim Protocol',      icon: '◈',  desc: 'Harvest accumulated yield.' },
]

export default function ForgePage() {
  return (
    <div className="relative min-h-screen" style={{ background: '#050508' }}>
      <ParticleBackground />
      <div className="scanlines-overlay" />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 10%, rgba(255,106,0,0.04) 0%, transparent 70%)',
        }}
      />
      <Header />

      <main className="relative z-10 pt-20 pb-4 px-4 flex flex-col items-center gap-8">

        {/* Page hero */}
        <section className="w-full max-w-lg flex flex-col items-center gap-3 mt-8 text-center">
          <span
            className="text-5xl"
            style={{ color: '#ff6a00', textShadow: '0 0 30px #ff6a00, 0 0 60px #ff9500', filter: 'brightness(1.2)' }}
          >
            ⚒
          </span>
          <h1
            className="text-3xl font-black tracking-[0.25em]"
            style={{
              fontFamily: 'Cinzel, serif',
              background: 'linear-gradient(135deg, #ff6a00 0%, #ff9500 50%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 15px rgba(255,106,0,0.4))',
            }}
          >
            THE FORGE
          </h1>
          <p className="text-[10px] tracking-[0.4em] text-[#ff6a00]/50 uppercase">
            Where intelligence is tempered
          </p>
          <p className="text-sm leading-relaxed text-[#e8e8f0]/40 max-w-xs mt-1">
            The Forge is the sacred workshop of Abraxas. Stake your tokens, forge alliances, and inscribe your covenant into the chain.
          </p>
          <BuyAbraButton size="md" className="mt-2" />
        </section>

        {/* Forge actions */}
        <section className="w-full max-w-lg flex flex-col gap-3">
          {FORGE_ITEMS.map((item) => (
            <button
              key={item.label}
              className="w-full abraxas-panel box-glow-orange p-5 flex items-center gap-4 group transition-all duration-300 hover:border-[#ff6a00]/40 text-left"
              style={{ border: 'none', cursor: 'pointer', background: 'none' }}
            >
              <span
                className="text-2xl w-10 text-center transition-all duration-300"
                style={{ color: '#ff9500', textShadow: '0 0 12px #ff6a00' }}
              >
                {item.icon}
              </span>
              <div className="flex-1">
                <div
                  className="text-sm font-black tracking-[0.15em] uppercase text-[#ff9500]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {item.label}
                </div>
                <div className="text-xs text-[#e8e8f0]/35 mt-0.5">{item.desc}</div>
              </div>
              <span className="text-[#ff6a00]/30 group-hover:text-[#ff6a00]/70 transition-colors text-lg">›</span>
            </button>
          ))}
        </section>

        {/* Fire accent */}
        <div
          className="w-full max-w-lg h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.5), transparent)' }}
        />

        <div className="abraxas-panel box-glow-orange w-full max-w-lg p-5 text-center">
          <p className="text-xs tracking-[0.2em] text-[#ff9500]/60 mb-3">TOTAL FORGED</p>
          <p
            className="text-3xl font-black tracking-wider"
            style={{ color: '#ffd700', textShadow: '0 0 20px #ff9500' }}
          >
            0 $ABRA
          </p>
          <p className="text-[10px] tracking-widest text-[#e8e8f0]/30 mt-1 uppercase">Connect wallet to begin</p>
        </div>

        <AbraxasFooter />
      </main>

      <BottomNav />
    </div>
  )
}
