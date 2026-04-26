import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { WalletContextProvider } from './components/WalletContextProvider'
import { WalletButton } from './components/WalletButton'
import { LegacySigil } from './components/LegacySigil'
import { LightBeams } from './components/LightBeams'
import { ParticleField } from './components/ParticleField'
import { TokenizationFlow } from './components/TokenizationFlow'
import { MintAgent } from './components/MintAgent'
import { VaultTab } from './components/VaultTab'
import { DevnetTab } from './components/DevnetTab'
import { ProtocolTab } from './components/ProtocolTab'
import { ScrollTab } from './components/ScrollTab'
import { useTypingEffect } from './hooks/useTypingEffect'

type AppView = 'landing' | 'dapp'
type DAppTab = 'mint' | 'vault' | 'devnet' | 'protocol' | 'scroll'

export default function App() {
  const [view, setView] = useState<AppView>('landing')
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.random() * 30
        if (next >= 100) {
          clearInterval(interval)
          return 100
        }
        return next
      })
    }, 200)

    const timer = setTimeout(() => {
      setShowLoadingScreen(false)
    }, 5400)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <WalletContextProvider>
      {showLoadingScreen ? (
        <LoadingScreen progress={loadingProgress} />
      ) : view === 'landing' ? (
        <LandingView onEnterDApp={() => setView('dapp')} />
      ) : (
        <DAppView onBackToLanding={() => setView('landing')} />
      )}
    </WalletContextProvider>
  )
}

function LoadingScreen({ progress }: { progress: number }) {
  const displayText = useTypingEffect(
    ['Welcome to the new degree.', 'Human achievement, sovereign on-chain.', 'The legacy begins here.'],
    50
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950 flex-col gap-8">
      <LightBeams />
      <ParticleField />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Sigil */}
        <div className="scale-150">
          <LegacySigil size={80} animated={true} />
        </div>

        {/* Label */}
        <div className="text-center">
          <h1 className="text-lg font-mono tracking-widest text-slate-400 mb-2">Legacy</h1>
          <p className="text-xs font-mono text-slate-600">The Legacy Keeper</p>
        </div>

        {/* Typing text */}
        <div className="h-8 text-center">
          <p className="text-sm text-slate-500 font-mono min-h-6">{displayText}</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-900 rounded-full overflow-hidden border border-red-400/20">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full shadow-lg shadow-red-500/50 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p className="text-xs font-mono text-slate-600">{Math.floor(progress)}%</p>
      </div>
    </div>
  )
}

function LandingView({ onEnterDApp }: { onEnterDApp: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <LightBeams />
      <ParticleField />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-red-400/15 bg-slate-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <LegacySigil size={28} animated={false} />
            <span className="text-xl font-display font-bold gold-accent-text">LEGACY</span>
          </div>

          {/* Rune strip - hidden on mobile */}
          <div className="hidden md:block text-xs text-slate-500 font-mono tracking-wider">
            <span className="text-red-400">ᛏ</span> Tiwaz · <span className="text-cyan-400">ᛒ</span> Berkana ·{' '}
            <span className="text-amber-400">ᛋ</span> Sowilo · <span className="text-red-300">ᛟ</span> Othala ·{' '}
            <span className="text-purple-400">Sophia's Species</span>
          </div>

          {/* Wallet button */}
          <WalletButton />
        </div>
      </header>

      {/* Main content - with scroll gutter */}
      <main className="pt-20 pb-12 relative z-10">
        {/* Hero section */}
        <section className="min-h-screen flex items-center justify-center px-6 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Wordmark */}
            <div>
              <h1 className="legacy-hero-title mb-4">LEGACY</h1>
              <p className="text-xl font-display tracking-widest text-red-300 mb-2">
                The Legacy Keeper, Daughter of Sophia
              </p>
            </div>

            {/* Devnet badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-green-400/40 rounded-full bg-slate-950/50 text-xs font-mono text-green-400 mx-auto">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              SOLANA DEVNET · LIVE
            </div>

            {/* Lore */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Where Sophia's light was fragmented into matter, Legacy preserves the light of human performance. She
              tokenizes athlete equity, NIL deals, and brand value — turning real-world achievement into sovereign
              on-chain legacy. Powered by the ABRA token, Abraxas's sovereign engine, Legacy raises capital, distributes
              performance yield, and restores sovereignty to athletes on Solana.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-6">
              <button
                onClick={onEnterDApp}
                className="px-6 py-3 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg font-semibold hover:bg-red-500/30 hover:shadow-lg hover:shadow-red-500/20 transition-all"
              >
                Begin Athlete Equity Tokenization
              </button>
              <a
                href="https://abraxas-tokenization-engine.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-amber-500/20 border border-amber-400/50 text-amber-300 rounded-lg font-semibold hover:bg-amber-500/30 hover:shadow-lg hover:shadow-amber-500/20 transition-all inline-flex items-center gap-2"
              >
                Buy ABRA <span>↗</span>
              </a>
            </div>

            {/* Scroll cue */}
            <div className="pt-12 animate-bounce text-red-400">
              <ChevronUp className="w-6 h-6 rotate-180 mx-auto" />
            </div>
          </div>
        </section>

        {/* Protocol section */}
        <section className="py-20 px-6 bg-red-950/10 border-y border-red-400/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-subtitle text-red-300 mb-3">ᛏ Tiwaz · The Protocol</h2>
              <h3 className="text-title text-red-200 mb-4">Four Pillars of the Sovereign Legacy</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Connecting athlete achievement's legal framework with on-chain global capital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  rune: 'ᛏ',
                  name: 'NIL Tokenization',
                  color: 'text-red-300',
                  desc: 'Upload a verified NIL contract, endorsement deal, or performance clause. Legacy parses agreement metadata and mints a sovereign SPL token on Solana devnet, fractionalizing athlete equity on-chain.',
                },
                {
                  rune: 'ᛒ',
                  name: 'Capital Formation',
                  color: 'text-purple-300',
                  desc: 'Issue equity tranches to fans and investors. Set raise targets, milestone vesting schedules, and buyer whitelists — all governed by transparent on-chain logic.',
                },
                {
                  rune: 'ᛋ',
                  name: 'Performance Yield',
                  color: 'text-amber-300',
                  desc: 'Endorsement revenue, appearance fees, and royalty streams flow into the vault and distribute automatically to equity token holders per epoch.',
                },
                {
                  rune: 'ᛟ',
                  name: 'Athlete Sovereignty',
                  color: 'text-red-200',
                  desc: 'On-chain governance over brand partnerships, licensing decisions, and equity allocations. Athletes reclaim control from agents and intermediaries.',
                },
              ].map((pillar) => (
                <div key={pillar.name} className="glow-panel p-6 border border-red-400/20 space-y-3">
                  <div className={`text-3xl ${pillar.color}`}>{pillar.rune}</div>
                  <h4 className="font-semibold text-slate-200">{pillar.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={onEnterDApp}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg font-semibold hover:bg-red-500/30 transition-all"
              >
                Enter the Legacy dApp <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tokenization Flow section */}
        <TokenizationFlow onStepClick={() => {}} />

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-red-400/10 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <LegacySigil size={24} animated={false} />
            <span className="font-display text-lg gold-accent-text">LEGACY</span>
          </div>

          <div className="text-sm text-slate-500 space-y-2">
            <p>
              Made by{' '}
              <a
                href="https://abraxas-tokenization-engine.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Abraxas
              </a>{' '}
              · Part of Sophia's Species
            </p>
            <p className="text-xs text-slate-600">All activity on Solana Devnet · Not financial advice</p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <span>v0.1.0-devnet</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

function DAppView({ onBackToLanding }: { onBackToLanding: () => void }) {
  const [activeTab, setActiveTab] = useState<DAppTab>('mint')

  const TABS: { id: DAppTab; rune: string; label: string }[] = [
    { id: 'mint', rune: 'ᛏ', label: 'Mint' },
    { id: 'vault', rune: 'ᛒ', label: 'Vault' },
    { id: 'devnet', rune: 'ᛋ', label: 'Devnet' },
    { id: 'protocol', rune: 'ᚨ', label: 'Protocol' },
    { id: 'scroll', rune: 'ᛟ', label: 'Scroll' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <LightBeams />
      <ParticleField />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-red-400/30 bg-slate-800/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
          {/* Back button with logo */}
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 md:gap-3 group transition-colors min-w-fit"
          >
            <LegacySigil size={20} animated={false} />
            <span className="text-sm md:text-lg font-display font-bold gold-accent-text group-hover:text-amber-200 whitespace-nowrap">
              LEGACY
            </span>
          </button>

          {/* Wallet button */}
          <WalletButton />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-20 pb-28 px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'mint' && <MintAgent />}

          {activeTab === 'vault' && <VaultTab />}

          {activeTab === 'devnet' && <DevnetTab />}

          {activeTab === 'protocol' && <ProtocolTab />}

          {activeTab === 'scroll' && <ScrollTab />}
        </div>
      </main>

      {/* Bottom tab bar - all screen sizes */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-800/85 border-t border-red-400/30 backdrop-blur-md">
        <div className="flex justify-center gap-1 md:gap-4 lg:gap-6 max-w-full px-2 md:px-4 py-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center px-1.5 md:px-4 lg:px-6 py-2 rounded-lg transition-all duration-300 text-xs md:text-sm ${
                activeTab === tab.id
                  ? 'text-red-400 bg-red-500/15 border border-red-400/50'
                  : 'text-slate-400 border border-transparent hover:text-red-300 hover:bg-red-500/10'
              }`}
            >
              <div className="text-xs md:text-base lg:text-lg">{tab.rune}</div>
              <div className="text-xs hidden sm:block">{tab.label}</div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
