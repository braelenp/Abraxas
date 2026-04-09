import React, { useCallback, useEffect, useMemo, useState } from 'react'
import WalletContextProvider from './components/WalletContextProvider'
import ParticleField from './components/ParticleField'
import LightBeams from './components/LightBeams'
import AureliaSigil from './components/AureliaSigil'
import ForgeAgent from './components/ForgeAgent'
import WalletButton from './components/WalletButton'
import { useTypingEffect } from './hooks/useTypingEffect'

type AppView = 'landing' | 'dapp'
type DAppTab = 'forge' | 'vault' | 'devnet' | 'protocol' | 'warden'

// ─── Seeded rand (mirrors Abraxas) ───────────────────────────────────────────
function seededRand(n: number): number {
  const x = Math.sin(n + 1.618) * 43758.5453
  return x - Math.floor(x)
}

// ─── CONSTELLATION BACKGROUND (adapted from Abraxas LandingPage) ─────────────
const C_NODES: [number, number][] = [
  [100,100],[250,150],[350,80],[450,120],[900,200],[1000,280],[1100,200],
  [200,600],[380,550],[500,650],[800,650],[950,600],[1050,720],
]
const C_EDGES: [number,number][] = [
  [0,1],[1,2],[2,3],[4,5],[5,6],[7,8],[8,9],[9,10],[10,11],[11,12],
]
function ConstellationBackground() {
  const stars = useMemo(
    () => C_NODES.map(([cx, cy], i) => ({ cx, cy, r: seededRand(i*3) > 0.5 ? 2.5 : 2, delay: `${(seededRand(i*3+1)*1.5).toFixed(1)}s` })),
    []
  )
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <svg className="h-full w-full opacity-28" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {C_EDGES.map(([a,b],i) => (
          <line key={i} x1={C_NODES[a][0]} y1={C_NODES[a][1]} x2={C_NODES[b][0]} y2={C_NODES[b][1]}
            className="constellation-line" style={{ animationDelay: `${(i*0.15).toFixed(2)}s` }} />
        ))}
        {stars.map((s,i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} className="constellation-star" style={{ animationDelay: s.delay }} />
        ))}
      </svg>
    </div>
  )
}

// ─── LOADING SCREEN ────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const typed = useTypingEffect(
    ['Welcome to the next degree.', 'Sovereignty begins on-chain.', 'Illuminate your assets.'],
    70, 38, 2200
  )
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const exit = setTimeout(() => {
      setLeaving(true)
      setTimeout(onDone, 700)
    }, 5400)
    return () => clearTimeout(exit)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-700 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/8 blur-2xl" />

      {/* Sigil */}
      <div className="mb-10">
        <AureliaSigil />
      </div>

      {/* Typing phrase */}
      <p className="aurelia-hero-title min-h-[1.6em] px-6 text-center font-serif text-2xl leading-tight sm:text-3xl">
        <span className="shimmer-text">{typed}</span>
        <span className="ml-0.5 animate-pulse" style={{ color: '#f59e0b' }}>|</span>
      </p>

      {/* Label */}
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.32em] text-amber-400/40">
        Aurelia · The Golden Illuminator
      </p>

      {/* Progress bar */}
      <div className="mt-8 h-px w-40 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-amber-400/50"
          style={{}}"
        />
      </div>
    </div>
  )
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function Hero({ onEnterApp }: { onEnterApp: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 180); return () => clearTimeout(t) }, [])

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pb-12 pt-28 text-center">
      {/* Devnet badge */}
      <div className={`mb-7 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-[11px] font-mono tracking-[0.28em] text-purple-300 uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          SOLANA DEVNET · LIVE
        </span>
      </div>

      {/* Sigil */}
      <div className={`mb-8 transition-all duration-1000 delay-100 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <AureliaSigil />
      </div>

      {/* Wordmark */}
      <h1
        className={`mb-3 font-serif text-5xl font-black uppercase tracking-[0.14em] sm:text-6xl transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ color: '#fde68a', textShadow: '0 0 48px rgba(245,158,11,0.42), 0 0 12px rgba(245,158,11,0.22)' }}
      >
        AURELIA
      </h1>

      {/* Tagline */}
      <p
        className={`mb-8 font-black text-lg uppercase tracking-[0.22em] sm:text-xl transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ color: '#f59e0b' }}
      >
        WELCOME THE NEXT DEGREE
      </p>

      {/* Lore */}
      <p className={`mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-slate-300/70 sm:text-base transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        Where Sophia's light was fragmented into matter, Aurelia gathers that light into the
        physical realm of land, homes, and development. Powered by the{' '}
        <span className="font-medium text-amber-300">ABRA token</span>
        {' '}Abraxas's sovereign engine. She tokenizes deeds, raises capital, optimizes yield,
        and restores sovereignty to real estate on Solana.
      </p>

      {/* CTAs */}
      <div className={`flex flex-col sm:flex-row gap-4 items-center justify-center transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <button
          onClick={onEnterApp}
          className="ui-action inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-amber-500/14 px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-amber-200 shadow-[0_0_24px_rgba(245,158,11,0)] transition duration-300 hover:border-amber-400/70 hover:shadow-[0_0_32px_rgba(245,158,11,0.38)]"
        >
          Enter the Forge
        </button>
        <button
          onClick={onEnterApp}
          className="ui-action inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-purple-300 shadow-[0_0_24px_rgba(153,69,255,0)] transition duration-300 hover:border-purple-400/60 hover:shadow-[0_0_28px_rgba(153,69,255,0.32)]"
        >
          View Devnet
        </button>
        <a
          href="https://abraxas-ten.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="ui-action inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/35 bg-amber-950/40 px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-amber-400/80 transition duration-300 hover:border-amber-400/55 hover:text-amber-300"
        >
          Buy ABRA ↗
        </a>
      </div>

      {/* Scroll cue */}
      <div className="mt-12 animate-bounce opacity-35">
        <div className="flex flex-col items-center gap-1">
          <div className="h-5 w-px rounded-full bg-amber-400/55" />
          <div className="h-1.5 w-1.5 rounded-full bg-amber-400/55" />
        </div>
      </div>
    </section>
  )
}

// ─── PROTOCOL SECTION (landing) ──────────────────────────────────────────────

function ProtocolSection({ onEnterApp }: { onEnterApp: () => void }) {
  const features = [
    { rune: 'ᚲ', runeName: 'Kenaz',   title: 'Deed Tokenization',  accent: 'text-amber-300',  desc: 'Upload a property deed or title. Aurelia parses legal metadata and mints a sovereign SPL token on Solana devnet, fractionalizing ownership on-chain.' },
    { rune: 'ᛒ', runeName: 'Berkana', title: 'Capital Formation',  accent: 'text-purple-300', desc: 'Issue token tranches to global investors. Set raise targets, vesting schedules, and whitelists, all governed by transparent on-chain logic.' },
    { rune: 'ᛋ', runeName: 'Sowilo',  title: 'Yield Optimization', accent: 'text-cyan-300',   desc: 'Rental income, development proceeds, and HOA assessments flow into the vault and distribute automatically to token holders per epoch.' },
    { rune: 'ᛉ', runeName: 'Algiz',   title: 'Asset Sovereignty',  accent: 'text-amber-200',  desc: 'On-chain governance over assessments, HOA bylaws, and renovation decisions. Property owners reclaim control from intermediaries.' },
  ]
  return (
    <section id="protocol" className="relative z-10 py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] font-mono tracking-[0.32em] text-purple-400 uppercase">The Protocol</p>
          <h2 className="mb-4 font-serif text-3xl md:text-4xl glow-gold" style={{ color: '#fde68a' }}>
            Four Pillars of the Sovereign Bridge
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-400 md:text-base">
            Connecting traditional real estate's legal framework with on-chain global liquidity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="glow-panel rounded-2xl border border-amber-400/20 bg-slate-900/75 p-6 backdrop-blur transition-all duration-300 hover:scale-[1.02]">
              <div className="mb-3 flex items-center gap-2">
                <span className={`font-black text-3xl leading-none ${f.accent}`}>{f.rune}</span>
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">{f.runeName}</span>
              </div>
              <h3 className={`mb-2 font-serif text-base ${f.accent}`}>{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400/85">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <button
            onClick={onEnterApp}
            className="ui-action inline-flex items-center gap-2.5 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-amber-200 shadow-[0_0_28px_rgba(245,158,11,0.22)] transition hover:shadow-[0_0_40px_rgba(245,158,11,0.42)]"
          >
            Enter the Aurelia dApp →
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── LANDING FOOTER ───────────────────────────────────────────────────────────

function LandingFooter() {
  return (
    <footer className="relative z-10 border-t border-amber-400/10 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <svg width="20" height="24" viewBox="0 0 28 32" fill="none">
            <path d="M14 1 C8 5 5 12 7 19 C9 24 14 28 14 28C14 28 19 24 21 19 C23 12 20 5 14 1Z" fill="url(#footerFlame)" />
            <rect x="11" y="18" width="6" height="10" rx="2" fill="#d97706" opacity="0.8" />
            <defs>
              <linearGradient id="footerFlame" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-serif text-sm tracking-wider" style={{ color: 'rgba(253,230,138,0.75)' }}>AURELIA</span>
        </div>
        <div className="text-center">
          <p className="font-mono text-xs tracking-wider text-slate-500">
            Made by{' '}
            <a href="https://abraxas-ten.vercel.app" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline underline-offset-2 hover:text-purple-300">Abraxas</a>
            {' '}· <span className="text-amber-500/65">Part of Sophia's Species</span>
          </p>
          <p className="mt-1 font-mono text-xs text-slate-600">All activity on Solana Devnet · Not financial advice</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-slate-600">v0.1.0-devnet</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <span className="font-mono text-xs text-green-500/65">devnet</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── LANDING VIEW ─────────────────────────────────────────────────────────────

function LandingView({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-amber-400/15 bg-slate-950/40 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <svg width="22" height="26" viewBox="0 0 28 32" fill="none">
              <path d="M14 1 C8 5 5 12 7 19 C9 24 14 28 14 28C14 28 19 24 21 19 C23 12 20 5 14 1Z" fill="url(#lhNavFlame)" />
              <rect x="11" y="18" width="6" height="10" rx="2" fill="#d97706" opacity="0.8" />
              <defs>
                <linearGradient id="lhNavFlame" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#d97706" /><stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-serif text-base tracking-[0.18em] font-semibold"
              style={{ color: '#fde68a', textShadow: '0 0 8px rgba(245,158,11,0.36)' }}>AURELIA</span>
          </div>
          <div className="hidden md:block">
            <p className="text-[10px] font-mono tracking-[0.28em] text-amber-400/35 uppercase">
              ᚲ Kenaz · ᛋ Sowilo · ᛏ Tiwaz · ᛉ Algiz · Sophia's Species
            </p>
          </div>
          <div className="header-wallet shrink-0">
            <WalletButton />
          </div>
        </div>
      </header>
      <main>
        <Hero onEnterApp={onEnterApp} />
        <ProtocolSection onEnterApp={onEnterApp} />
      </main>
      <LandingFooter />
    </div>
  )
}

// ─── DAPP TAB CONTENT ─────────────────────────────────────────────────────────

// ─── ABRAXAS CALLOUT (shared across all tabs) ───────────────────────────────
function AbraxasCallout() {
  return (
    <a
      href="https://abraxas-ten.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-900/50 via-slate-800/80 to-slate-900/70 p-4 backdrop-blur transition hover:border-purple-400/60 hover:from-purple-900/60"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-900/50 text-xl font-black text-purple-300">
          ᚨ
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] abraxas-title-glow">Abraxas · Control Surface</p>
            <span className="font-mono text-[10px] text-purple-400/70 transition group-hover:text-purple-300">↗</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            Abraxas is the sovereign intelligence layer powering Aurelia. Stake ABRA, govern the protocol, access the Circuit, and manage multi-asset vaults, all from one control surface.
          </p>
          <p className="mt-2 inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-purple-300 transition group-hover:text-purple-200">
            Open Abraxas dApp ↗
          </p>
        </div>
      </div>
    </a>
  )
}

// ── Vault types ──────────────────────────────────────────────────────────────
type StakeDuration = 30 | 90 | 180

interface StakeRecord {
  id: string
  abraAmount: number
  lockDays: StakeDuration
  stakedAt: number
  unlocksAt: number
  multiplierBps: number
  isActive: boolean
  claimedRewards: number
}

interface VaultAsset {
  id: string
  name: string
  assetType: 'residential' | 'commercial' | 'development'
  tokenSymbol: string
  vaultValue: number
  yieldApy: number
  assignedAgent: string | null
  depositedAt: number
}

const STAKE_CONFIGS: { duration: StakeDuration; multiplier: number; label: string; desc: string; highlight?: boolean }[] = [
  { duration: 30,  multiplier: 1.2, label: '30 Days',  desc: 'Quick stake for early adopters' },
  { duration: 90,  multiplier: 1.8, label: '90 Days',  desc: 'Balanced returns & commitment', highlight: true },
  { duration: 180, multiplier: 2.5, label: '180 Days', desc: 'Maximum multiplier for diamond hands' },
]

const YIELD_AGENTS = ['Sophia Sentinel', 'Sophia Yield', 'Sophia Defensive']

function VaultTab() {
  // ── Vault assets ─────────────────────────────────────────────────────────
  const [assets, setAssets] = useState<VaultAsset[]>([])
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null)
  const [activeDepositId, setActiveDepositId] = useState<string | null>(null)
  const [depositAmount, setDepositAmount] = useState('')
  const [selectedAgents, setSelectedAgents] = useState<Record<string, string>>({})
  const [showDetails, setShowDetails] = useState(false)

  // ── Staking ───────────────────────────────────────────────────────────────
  const [selectedDuration, setSelectedDuration] = useState<StakeDuration>(90)
  const [stakeInput, setStakeInput] = useState('')
  const [isStaking, setIsStaking] = useState(false)
  const [stakes, setStakes] = useState<StakeRecord[]>([])

  const selectedConfig = useMemo(() => STAKE_CONFIGS.find((c) => c.duration === selectedDuration)!, [selectedDuration])

  const projectedRewards = useMemo(() => {
    const n = Number(stakeInput)
    if (!stakeInput || isNaN(n) || n <= 0) return 0
    return Math.round(n * (selectedConfig.multiplier - 1))
  }, [stakeInput, selectedConfig])

  const totalStaked    = useMemo(() => stakes.reduce((s, r) => s + r.abraAmount, 0), [stakes])
  const totalProjected = useMemo(() => stakes.reduce((s, r) => s + Math.round(r.abraAmount * r.multiplierBps / 10_000), 0), [stakes])

  const handleStake = useCallback(async () => {
    const amount = Number(stakeInput)
    if (!stakeInput || isNaN(amount) || amount <= 0) return
    setIsStaking(true)
    await new Promise((r) => setTimeout(r, 1800))
    setStakes((prev) => [
      ...prev,
      {
        id: `stake_${Date.now()}`,
        abraAmount: amount,
        lockDays: selectedDuration,
        stakedAt: Date.now(),
        unlocksAt: Date.now() + selectedDuration * 86_400_000,
        multiplierBps: Math.round(selectedConfig.multiplier * 10_000),
        isActive: true,
        claimedRewards: 0,
      },
    ])
    setStakeInput('')
    setIsStaking(false)
  }, [stakeInput, selectedDuration, selectedConfig])

  const handleUnstake = useCallback((id: string) => {
    setStakes((prev) => prev.map((s) => s.id === id ? { ...s, isActive: false } : s))
  }, [])

  const handleClaim = useCallback((id: string) => {
    setStakes((prev) => prev.map((s) => {
      if (s.id === id && !s.isActive) {
        return { ...s, claimedRewards: Math.round(s.abraAmount * (s.multiplierBps / 10_000 - 1)) }
      }
      return s
    }))
  }, [])

  const getAgent = (id: string, fallback?: string | null) => selectedAgents[id] ?? fallback ?? YIELD_AGENTS[0]

  const daysLeft = (unlocksAt: number) => {
    const d = Math.ceil((unlocksAt - Date.now()) / 86_400_000)
    return d > 0 ? `${d}d left` : 'Unlocked'
  }

  return (
    <div className="space-y-4 pb-8">

      {/* ── Header card ─────────────────────────────────────────────────────── */}
      <article className="glow-panel rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/8 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300">ᛋ Sowilo · Sophia Vault</p>
        <h2 className="mb-2 font-serif text-base font-semibold text-white">Asset Sovereignty Vault</h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1.5 text-xs text-amber-300 transition hover:text-amber-200"
        >
          <span>{showDetails ? 'Hide' : 'Show'} details</span>
          <span className={`inline-block transition-transform ${showDetails ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {showDetails && (
          <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300">
            <p>Once a property is tokenized through the Forge, it is auto-deposited here. Rental income, development proceeds, and HOA distributions flow to token holders per epoch.</p>
            <p className="text-amber-200">Stake ABRA below to earn yield multipliers on vault assets, from 1.2× up to 2.5× depending on lock duration.</p>
          </div>
        )}
      </article>

      {/* ── Vault metrics ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Assets',    value: assets.length.toString(),                  color: 'text-amber-400' },
          { label: 'ABRA Staked', value: totalStaked ? totalStaked.toLocaleString() : '—', color: 'text-purple-300' },
          { label: 'Network',   value: 'Devnet',                                  color: 'text-green-400' },
        ].map((m) => (
          <div key={m.label} className="glow-panel rounded-2xl border border-amber-400/30 bg-slate-800/80 p-3 backdrop-blur text-center">
            <p className="font-mono text-sm font-bold mb-0.5"><span className={m.color}>{m.value}</span></p>
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
          </div>
        ))}
      </div>

      {/* ── Quick actions ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '⇄', label: 'Swap' },
          { icon: '↑',  label: 'Top Up' },
          { icon: '↓',  label: 'Withdraw' },
        ].map((a) => (
          <button key={a.label} className="glow-panel rounded-2xl border border-amber-400/30 bg-slate-800/80 p-3 text-center backdrop-blur transition hover:bg-slate-700/80 hover:border-amber-400/50">
            <p className="text-xl">{a.icon}</p>
            <p className="mt-1 text-[10px] font-semibold text-slate-200">{a.label}</p>
          </button>
        ))}
      </div>

      {/* ── Vault assets list ────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {assets.length === 0 ? (
          <div className="rounded-2xl border border-amber-400/30 bg-slate-800/70 p-5 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-400/70 mb-2">No Assets Deposited</p>
            <p className="text-xs text-slate-300">Complete tokenization in the Forge tab to auto-deposit an asset here.</p>
          </div>
        ) : (
          assets.map((asset) => (
            <div key={asset.id} className="glow-panel rounded-2xl border border-amber-400/18 bg-slate-900/70 p-4 backdrop-blur">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{asset.name}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-slate-500">
                        ${asset.vaultValue.toLocaleString()} · {asset.assetType} · {asset.yieldApy}% APY
                      </p>
                    </div>
                    <button onClick={() => setExpandedAsset(expandedAsset === asset.id ? null : asset.id)}
                      className="text-amber-400/60 transition hover:text-amber-300">
                      <span className={`inline-block transition-transform text-sm ${expandedAsset === asset.id ? 'rotate-180' : ''}`}>▾</span>
                    </button>
                  </div>
                  {expandedAsset === asset.id && (
                    <div className="mt-2 border-t border-amber-400/10 pt-2 text-[10px] text-slate-400 space-y-0.5">
                      <p>Token: <span className="text-amber-300">{asset.tokenSymbol}</span></p>
                      <p>Deposited: {new Date(asset.depositedAt).toLocaleDateString()}</p>
                      <p>Agent: {asset.assignedAgent ?? 'Unassigned'}</p>
                    </div>
                  )}
                </div>
              </div>

              {activeDepositId === asset.id && (
                <div className="mt-3 rounded-xl border border-amber-400/15 bg-slate-950/50 p-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Deposit Amount (SOL)</p>
                  <div className="flex gap-2">
                    <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100 placeholder-slate-600 outline-none focus:border-amber-400/40"
                    />
                    <button onClick={() => { setDepositAmount(''); setActiveDepositId(null) }}
                      className="ui-action rounded-lg border border-amber-400/40 bg-amber-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Confirm
                    </button>
                    <button onClick={() => setActiveDepositId(null)}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-[10px] font-medium text-slate-400">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <select value={getAgent(asset.id, asset.assignedAgent)}
                  onChange={(e) => setSelectedAgents((prev) => ({ ...prev, [asset.id]: e.target.value }))}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-2 py-2 text-[10px] text-slate-300 outline-none focus:border-amber-400/40">
                  {YIELD_AGENTS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                <button onClick={() => setAssets((prev) => prev.map((a) => a.id === asset.id ? { ...a, assignedAgent: getAgent(asset.id, asset.assignedAgent) } : a))}
                  className="ui-action rounded-xl border border-amber-400/40 bg-amber-500/15 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Assign
                </button>
                <button onClick={() => setActiveDepositId(activeDepositId === asset.id ? null : asset.id)}
                  className="rounded-xl border border-slate-600 px-3 py-2 text-[10px] font-semibold text-slate-300 transition hover:bg-slate-800/50">
                  {activeDepositId === asset.id ? 'Hide' : 'Deposit'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── ABRA Staking ─────────────────────────────────────────────────────── */}
      <article className="glow-panel rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/15 via-slate-800/90 to-slate-800/80 p-5 backdrop-blur">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-300">ᚨ Ansuz · ABRA Staking</p>
        <h3 className="mb-1 font-serif text-sm font-semibold text-white">Lock &amp; Earn Multiplied Yield</h3>
        <p className="text-[11px] text-slate-300">Stake ABRA for 30, 90, or 180 days. Multipliers: 1.2× → 1.8× → 2.5×</p>
      </article>

      {/* Stats */}
      {stakes.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Total Staked',  value: totalStaked.toLocaleString(),    color: 'text-amber-300' },
            { label: 'Projected',     value: totalProjected.toLocaleString(), color: 'text-purple-300' },
            { label: 'Active',        value: String(stakes.filter((s) => s.isActive).length), color: 'text-green-400' },
          ].map((m) => (
            <div key={m.label} className="glow-panel rounded-2xl border border-purple-400/30 bg-slate-800/80 p-3 text-center backdrop-blur">
              <p className={`font-mono text-sm font-bold ${m.color}`}>{m.value}</p>
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Duration selector */}
      <div className="grid grid-cols-3 gap-2">
        {STAKE_CONFIGS.map((cfg) => (
          <button key={cfg.duration} onClick={() => setSelectedDuration(cfg.duration)}
            className={`glow-panel rounded-2xl border p-3 text-center backdrop-blur transition ${
              selectedDuration === cfg.duration
                ? 'border-amber-400/70 bg-amber-500/20 text-amber-200'
                : 'border-slate-600 bg-slate-800/80 text-slate-300 hover:border-amber-400/40 hover:bg-slate-700/80'
            } ${cfg.highlight ? 'ring-1 ring-amber-400/30' : ''}`}
          >
            <p className={`font-mono text-xs font-bold ${selectedDuration === cfg.duration ? 'text-amber-300' : 'text-slate-300'}`}>{cfg.label}</p>
            <p className={`mt-0.5 font-bold text-base ${selectedDuration === cfg.duration ? 'text-amber-200' : 'text-slate-400'}`}>
              {cfg.multiplier}×
            </p>
            <p className="mt-0.5 text-[9px] leading-tight text-slate-400">{cfg.desc}</p>
          </button>
        ))}
      </div>

      {/* Stake input */}
      <div className="glow-panel rounded-2xl border border-purple-400/35 bg-slate-800/80 p-4 backdrop-blur space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">Stake ABRA</p>
        <div className="relative">
          <input type="number" value={stakeInput} onChange={(e) => setStakeInput(e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-3 pr-16 font-mono text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400/60"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-amber-400/60">ABRA</span>
        </div>
        {projectedRewards > 0 && (
          <div className="rounded-xl border border-amber-400/15 bg-amber-500/6 px-3 py-2">
            <p className="text-[10px] text-slate-300">Projected rewards after {selectedConfig.label}</p>
            <p className="font-mono text-sm font-bold text-amber-300">+{projectedRewards.toLocaleString()} ABRA</p>
          </div>
        )}
        <button
          onClick={() => void handleStake()}
          disabled={isStaking || !stakeInput || Number(stakeInput) <= 0}
          className="ui-action w-full rounded-xl border border-amber-400/40 bg-amber-500/15 py-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-300 transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isStaking ? 'Staking…' : `Lock ${selectedConfig.label} · ${selectedConfig.multiplier}×`}
        </button>
      </div>

      {/* Active stakes */}
      {stakes.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400 px-1">Your Stakes</p>
          {stakes.map((s) => (
            <div key={s.id} className="glow-panel rounded-2xl border border-slate-600 bg-slate-800/80 p-4 backdrop-blur">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-sm font-bold text-amber-300">{s.abraAmount.toLocaleString()} <span className="text-amber-500/70 font-normal text-xs">ABRA</span></p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {s.lockDays}-day lock · {(s.multiplierBps / 10_000).toFixed(1)}× · {daysLeft(s.unlocksAt)}
                  </p>
                  {s.claimedRewards > 0 && (
                    <p className="mt-0.5 font-mono text-[10px] text-green-400">✓ Claimed +{s.claimedRewards.toLocaleString()} ABRA</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  {s.isActive ? (
                    <button onClick={() => handleUnstake(s.id)}
                      className="rounded-xl border border-slate-600 px-3 py-1.5 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-800/50">
                      Unstake
                    </button>
                  ) : s.claimedRewards === 0 ? (
                    <button onClick={() => handleClaim(s.id)}
                      className="ui-action rounded-xl border border-green-400/40 bg-green-500/15 px-3 py-1.5 text-[10px] font-bold text-green-400">
                      Claim
                    </button>
                  ) : (
                    <span className="rounded-xl border border-slate-700/30 px-3 py-1.5 text-[10px] text-slate-600">Done</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Abraxas callout */}
      <AbraxasCallout />

      {/* Future asset classes */}
      <article className="glow-panel rounded-2xl border border-slate-600 bg-slate-800/80 p-4 backdrop-blur">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">Upcoming Vault Classes</p>
        <div className="space-y-2">
          {[
            { title: 'Fractional Land Deeds',          desc: 'Tokenize raw land parcels and raise development capital from global investors.',                  status: 'coming_soon' },
            { title: 'HOA Governance Vaults',           desc: 'On-chain HOA assessments, bylaw votes, and reserve fund management.',                            status: 'blueprint'   },
            { title: 'Development Tranche Vaults',      desc: 'Issue capital tranches for multi-phase construction projects with milestone-gated releases.',       status: 'blueprint'   },
          ].map((ac) => (
              <div key={ac.title} className="rounded-xl border border-amber-400/25 bg-slate-900/70 px-3 py-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-xs font-medium text-slate-200">{ac.title}</p>
                <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                  ac.status === 'coming_soon'
                    ? 'border-amber-400/30 bg-amber-500/10 text-amber-300'
                    : 'border-slate-500/60 bg-slate-700/60 text-slate-400'
                }`}>
                  {ac.status === 'coming_soon' ? 'Coming Soon' : 'Blueprint'}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-300">{ac.desc}</p>
            </div>
          ))}
        </div>
      </article>

    </div>
  )
}

function DevnetTab() {
  const stats = [
    { label: 'Network',              value: 'Solana Devnet', icon: '🔗' },
    { label: 'Properties Tokenized', value: '0',             icon: '🏡' },
    { label: 'Total Value Locked',   value: '$0.00',         icon: '💰' },
    { label: 'Active Vaults',        value: '0',             icon: '🏛'  },
    { label: 'Token Holders',        value: '0',             icon: '👤' },
    { label: 'Yield Distributed',    value: '$0.00',         icon: '📈' },
  ]
  return (
    <div className="space-y-4 pb-8">
      <article className="glow-panel rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/8 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">ᛏ Tiwaz · Devnet Observatory</p>
        <h2 className="mb-3 font-serif text-base font-semibold leading-tight text-slate-100">Live Protocol Dashboard</h2>
        <p className="text-xs leading-relaxed text-slate-400">All activity on Solana devnet. No real assets or capital are at risk. This is a simulation environment.</p>
      </article>
      <article className="glow-panel rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">aurelia.devnet</p>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <span className="font-mono text-[10px] text-green-400">connected</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-amber-400/10 bg-slate-950/45 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-[10px] text-slate-600">{s.icon} {s.label}</p>
              <p className="font-mono text-sm font-semibold text-amber-400">{s.value}</p>
            </div>
          ))}
        </div>
      </article>      <AbraxasCallout />    </div>
  )
}

function ProtocolTab() {
  const pillars = [
    { rune: 'ᚲ', name: 'Kenaz · Forge',    color: 'text-amber-300',  border: 'border-amber-400/20', desc: 'Kenaz is the torch of creative forging. Upload a deed, mint a sovereign SPL token, and deposit into the vault. The Forge transmutes paper ownership into on-chain capital.' },
    { rune: 'ᛋ', name: 'Sowilo · Vault',   color: 'text-cyan-300',   border: 'border-cyan-400/20',  desc: 'Sowilo is the sun of radiant yield. The Sophia vault governs every asset deposit, assignment, and yield cycle with autonomous on-chain precision.' },
    { rune: 'ᛏ', name: 'Tiwaz · Devnet',   color: 'text-purple-300', border: 'border-purple-400/20',desc: 'Tiwaz delivers sovereign judgment. The Devnet Observatory tracks every tokenized property, vault deposit, and yield cycle in real-time on Solana.' },
    { rune: 'ᛉ', name: 'Algiz · Warden',   color: 'text-amber-200',  border: 'border-amber-400/15', desc: 'Algiz holds the line. On-chain governance over HOA bylaws, development decisions, and capital governance. Property owners reclaim sovereignty.' },
  ]
  return (
    <div className="space-y-4 pb-8">
      <article className="glow-panel rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/8 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/80">ᚨ Ansuz · The Protocol</p>
        <h2 className="mb-3 font-serif text-base font-semibold leading-tight text-slate-100">Four Pillars of the Sovereign Bridge</h2>
        <p className="text-xs leading-relaxed text-slate-400">Connecting traditional real estate's legal framework with on-chain global liquidity through four Elder Futhark runes.</p>
      </article>
      {pillars.map((p) => (
        <article key={p.name} className={`glow-panel rounded-2xl border ${p.border} bg-slate-900/60 p-4 backdrop-blur`}>
          <div className="mb-2 flex items-center gap-2">
            <span className={`text-2xl font-black ${p.color}`}>{p.rune}</span>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${p.color} opacity-80`}>{p.name}</p>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">{p.desc}</p>
        </article>
      ))}      <AbraxasCallout />    </div>
  )
}

function WardenTab() {
  return (
    <div className="space-y-4 pb-8">
      <article className="glow-panel rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/6 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/70">ᛉ Algiz · Warden</p>
        <h2 className="mb-3 font-serif text-base font-semibold leading-tight text-slate-100">Sovereign Governance</h2>
        <p className="text-xs leading-relaxed text-slate-400">
          Algiz stands watch. On-chain governance over HOA assessments, development bylaws, and renovation decisions.
          Token holders vote. No intermediaries. Property sovereignty restored.
        </p>
      </article>
      <article className="glow-panel rounded-2xl border border-slate-700/30 bg-slate-900/50 p-8 backdrop-blur text-center">
        <span className="mb-3 block font-black text-4xl text-amber-400/35">ᛉ</span>
        <p className="font-serif text-sm text-slate-400">Governance module launching with mainnet.</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-amber-400/40">Available on Mainnet Launch</p>
      </article>
      <AbraxasCallout />
    </div>
  )
}

// ─── DAPP SHELL ───────────────────────────────────────────────────────────────

const TABS: { id: DAppTab; rune: string; label: string }[] = [
  { id: 'forge',    rune: 'ᚲ', label: 'Forge'    },
  { id: 'vault',    rune: 'ᛋ', label: 'Vault'    },
  { id: 'devnet',   rune: 'ᛏ', label: 'Devnet'   },
  { id: 'protocol', rune: 'ᚨ', label: 'Protocol' },
  { id: 'warden',   rune: 'ᛉ', label: 'Warden'   },
]

function DAppShell({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<DAppTab>('forge')
  const mainRef = React.useRef<HTMLElement>(null)

  const switchTab = (t: DAppTab) => {
    setTab(t)
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="tech-distortion relative z-10 mx-auto flex h-[100dvh] min-h-0 w-full max-w-lg flex-col overflow-hidden">
      {/* ── Fixed header (mirrors Abraxas DappShell) ── */}
      <header className="sticky top-0 z-50 flex-none border-b border-amber-400/20 bg-slate-950/85 px-4 py-3 backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between gap-3">
          {/* Logo / back */}
          <button
            onClick={onBack}
            className="dapp-header-brand flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <svg width="20" height="24" viewBox="0 0 28 32" fill="none">
              <path d="M14 1 C8 5 5 12 7 19 C9 24 14 28 14 28C14 28 19 24 21 19 C23 12 20 5 14 1Z" fill="url(#dappFlame)" />
              <rect x="11" y="18" width="6" height="10" rx="2" fill="#d97706" opacity="0.8" />
              <defs>
                <linearGradient id="dappFlame" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#d97706" /><stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
              </defs>
            </svg>
            <span
              className="gold-accent-text font-serif text-sm font-semibold tracking-[0.18em]"
              style={{ color: '#f7d79a' }}
            >
              AURELIA
            </span>
          </button>
          {/* Wallet */}
          <div className="dapp-header-wallet flex items-center gap-3">
            <a
              href="https://abraxas-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-[10px] uppercase tracking-widest text-purple-400/70 transition hover:text-purple-300 sm:block"
            >
              ← Abraxas
            </a>
            <WalletButton />
          </div>
        </div>
        {/* Rune nav line */}
        <p className="text-[10px] text-slate-300/75">
          {TABS.map((t, i) => (
            <React.Fragment key={t.id}>
              <button
                onClick={() => switchTab(t.id)}
                className={`inline transition-colors ${tab === t.id ? 'text-amber-300' : 'hover:text-slate-200'}`}
              >
                {t.rune} {t.label}
              </button>
              {i < TABS.length - 1 && <span className="mx-1.5 text-slate-700">·</span>}
            </React.Fragment>
          ))}
        </p>
      </header>

      {/* ── Scrollable content ── */}
      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto overscroll-y-none px-4 py-4 pb-20 [touch-action:pan-y]">
        {tab === 'forge'    && <ForgeAgent />}
        {tab === 'vault'    && <VaultTab />}
        {tab === 'devnet'   && <DevnetTab />}
        {tab === 'protocol' && <ProtocolTab />}
        {tab === 'warden'   && <WardenTab />}
      </main>

      {/* ── Bottom tab nav (Abraxas-style mobile nav) ── */}
      <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 flex-none border-t border-amber-400/20 bg-slate-950 shadow-[0_-8px_24px_rgba(2,6,23,1)]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTab(t.id)}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 transition-colors duration-200 ${
              tab === t.id ? 'text-amber-300' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            <span className={`text-lg leading-none transition-all duration-200 ${tab === t.id ? 'scale-110' : ''}`}>
              {t.rune}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<AppView>('landing')
  const [loaded, setLoaded] = useState(false)
  const [landingVisible, setLandingVisible] = useState(false)

  return (
    <WalletContextProvider>
      {/* ── Abraxas-style layered fixed backgrounds ── */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-slate-950" />
      <div className="pointer-events-none fixed -top-28 left-1/4 -z-20 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-600/12 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 -right-28 -z-20 h-80 w-80 rounded-full bg-purple-700/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/2 -z-20 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-700/8 blur-3xl" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/0 via-slate-950/20 to-slate-950/55" />
      <div className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(circle_at_top,rgba(245,158,11,0.13),transparent_52%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-25 mix-blend-screen [background:linear-gradient(105deg,transparent_20%,rgba(245,158,11,0.10)_50%,transparent_78%)] [animation:tech-pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none fixed inset-0 -z-10 scanlines" />

      <ParticleField />
      <LightBeams />
      <ConstellationBackground />

      {!loaded && <LoadingScreen onDone={() => { setLoaded(true); setTimeout(() => setLandingVisible(true), 60) }} />}

      {loaded && (
        <div className={`transition-opacity duration-700 ${landingVisible ? 'opacity-100' : 'opacity-0'}`}>
          {view === 'landing'
            ? <LandingView onEnterApp={() => setView('dapp')} />
            : <DAppShell onBack={() => setView('landing')} />}
        </div>
      )}
    </WalletContextProvider>
  )
}
