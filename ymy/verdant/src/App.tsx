import React, { useState, useCallback } from 'react'
import LoadingScreen  from './components/LoadingScreen'
import Header         from './components/Header'
import HeroSection    from './components/HeroSection'
import ProtocolSection from './components/ProtocolSection'
import DAppShell      from './components/dapp/DAppShell'

type View = 'landing' | 'app'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [view, setView]       = useState<View>('landing')

  const handleLoadDone = useCallback(() => setLoading(false), [])
  const enterApp       = useCallback(() => setView('app'), [])
  const backToLanding  = useCallback(() => setView('landing'), [])

  if (loading) {
    return <LoadingScreen onComplete={handleLoadDone} />
  }

  if (view === 'app') {
    return (
      <>
        <Header onEnterApp={backToLanding} />
        <DAppShell onBack={backToLanding} />
      </>
    )
  }

  return (
    <>
      <Header onEnterApp={enterApp} />
      <main>
        <HeroSection onEnterApp={enterApp} />
        <ProtocolSection onEnterApp={enterApp} />

        {/* Footer */}
        <footer
          className="py-10 px-4 text-center"
          style={{ borderTop: '1px solid rgba(16,185,129,0.08)' }}
        >
          <div className="font-cinzel text-xs tracking-[0.28em] text-emerald-700/50 uppercase mb-2">
            Verdant · The Green Sovereign
          </div>
          <div className="font-mono text-[10px] text-emerald-800/40 tracking-widest mb-3">
            ᚠ Fehu &nbsp;·&nbsp; ᛃ Jera &nbsp;·&nbsp; ᛇ Eihwaz &nbsp;·&nbsp; ᛟ Othala
          </div>
          <div className="font-mono text-[10px] text-emerald-900/40">
            Part of the{' '}
            <a
              href="https://abraxas-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700/60 hover:text-purple-500/70 transition-colors"
            >
              Sophia's Species
            </a>{' '}
            ecosystem · Solana Devnet
          </div>
        </footer>
      </main>
    </>
  )
}

export default App
