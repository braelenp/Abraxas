import React, { useCallback, useEffect, useMemo, useState } from 'react'
import LightBeams from './components/LightBeams'
import ConstellationBackground from './components/ConstellationBackground'
import EchoSigil from './components/EchoSigil'
import LoadingScreen from './components/LoadingScreen'
import ForgeTab from './components/ForgeTab'
import EchoCallout from './components/EchoCallout'
import { useTypingEffect } from './hooks/useTypingEffect'

// ─── Types ────────────────────────────────────────────────────────────────────

type SolanaProvider = {
  isPhantom?: boolean
  publicKey?: { toString(): string }
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

type AppView = 'landing' | 'dapp'
type DAppTab = 'forge' | 'vault' | 'devnet' | 'protocol' | 'warden'

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS: { id: DAppTab; rune: string; label: string }[] = [
  { id: 'forge',    rune: 'ᚲ', label: 'Forge'    },
  { id: 'vault',    rune: 'ᛋ', label: 'Vault'    },
  { id: 'devnet',   rune: 'ᛏ', label: 'Devnet'   },
  { id: 'protocol', rune: 'ᚨ', label: 'Protocol' },
  { id: 'warden',   rune: 'ᛉ', label: 'Warden'   },
]

// ─── Wallet helpers (direct Phantom — no adapter library) ────────────────────

function getProvider(): SolanaProvider | undefined {
  const prov = (window as Window & { solana?: SolanaProvider }).solana
  if (prov?.isPhantom) return prov
  return undefined
}

function shortenAddress(addr: string): string {
  if (addr.length < 10) return addr
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`
}

function useWallet() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')

  const connect = useCallback(async () => {
    const provider = getProvider()
    if (!provider) {
      window.open('https://phantom.app/', '_blank', 'noopener,noreferrer')
      return
    }
    if (connected) {
      await provider.disconnect()
      setConnected(false)
      setAddress('')
      return
    }
    await provider.connect()
    const pk = provider.publicKey?.toString() ?? ''
    setAddress(pk)
    setConnected(Boolean(pk))
  }, [connected])

  return { connected, address, connect }
}

// ─── Seeded-random particles (Aurelia/Abraxas deterministic pattern) ──────────

function seededRand(n: number): number {
  const x = Math.sin(n + 1.618) * 43758.5453
  return x - Math.floor(x)
}

function ParticleField() {
  const pts = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        size: seededRand(i * 5) * 3 + 1.5,
        left: seededRand(i * 5 + 1) * 100,
        dur: seededRand(i * 5 + 3) * 12 + 8,
        delay: seededRand(i * 5 + 4) * 6,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pts.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ onEnterApp }: { onEnterApp: () => void }) {
  const [visible, setVisible] = useState(false)
  const { connected, address, connect } = useWallet()
  const typedText = useTypingEffect('Welcome to the next degree.', 65, 200)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 180)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-12 pt-28 text-center">
      {/* Devnet badge */}
      <div
        className={`mb-8 transition-all duration-700 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-purple">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          SOLANA DEVNET · MUSIC RIGHTS
        </span>
      </div>

      {/* Sigil — above all text, with padding so the spinning orbit ring never clips text */}
      <div
        className={`relative flex items-center justify-center px-8 py-8 transition-all delay-100 duration-700 ${
          visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <EchoSigil />
      </div>

      {/* "ECHO" — large brand name in cyan, mirrors Aurelia's "AURELIA" in gold */}
      <h1
        className={`mb-1 font-display text-6xl font-black leading-none tracking-wide text-cyan drop-shadow-[0_0_40px_rgba(34,231,242,0.65)] transition-all delay-200 duration-700 sm:text-7xl ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        ECHO
      </h1>

      {/* Typing tagline — Aurelia's "WELCOME THE NEXT DEGREE" equivalent */}
      <p
        className={`echo-hero-title mb-2 mt-3 font-display text-sm uppercase tracking-[0.18em] transition-all delay-300 duration-700 sm:text-base ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {typedText}
        <span className="typing-cursor" aria-hidden="true">|</span>
      </p>

      {/* "The Resonator · Daughter of Sophia" — own line, amber accent */}
      <h2
        className={`mb-9 font-display text-base text-amber/80 transition-all delay-[400ms] duration-700 sm:text-lg ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        The Resonator &middot; Daughter of Sophia
      </h2>

      {/* Lore */}
      <p
        className={`mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-slate-300/70 transition-all delay-500 duration-700 sm:text-base ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Where Sophia&apos;s light was fragmented into matter, Echo gathers that creative light
        and pours it into the realm of music, media, and intellectual property. She tokenizes
        songs, stems, and royalties, enabling fan ownership and automated revenue distribution
        on Solana.
      </p>

      {/* CTAs — Aurelia/Abraxas button pattern */}
      <div
        className={`flex flex-col items-center justify-center gap-4 transition-all delay-700 duration-700 sm:flex-row ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <button
          onClick={onEnterApp}
          className="ui-action inline-flex items-center justify-center gap-2 rounded-xl border border-purple/50 bg-purple/[0.14] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-purple shadow-[0_0_24px_rgba(153,69,255,0)] transition duration-300 hover:border-purple/70 hover:shadow-[0_0_32px_rgba(153,69,255,0.38)]"
        >
          Enter the Forge
        </button>
        <button
          onClick={onEnterApp}
          className="ui-action inline-flex items-center justify-center gap-2 rounded-xl border border-amber/35 bg-amber/[0.10] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-amber/80 transition duration-300 hover:border-amber/55 hover:text-amber"
        >
          View Devnet
        </button>
        <button
          onClick={connect}
          className="ui-action inline-flex items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/[0.12] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-cyan transition duration-300 hover:border-cyan/60"
        >
          {connected ? `Connected ${shortenAddress(address)}` : 'Connect Wallet'}
        </button>
      </div>

      {/* Scroll cue (Aurelia style) */}
      <div className="mt-12 animate-bounce opacity-35">
        <div className="flex flex-col items-center gap-1">
          <div className="h-5 w-px rounded-full bg-cyan/55" />
          <div className="h-1.5 w-1.5 rounded-full bg-cyan/55" />
        </div>
      </div>
    </section>
  )
}

// ─── PROTOCOL SECTION (landing) ───────────────────────────────────────────────

function ProtocolSection({ onEnterApp }: { onEnterApp: () => void }) {
  const features = [
    {
      rune: 'ᚲ', runeName: 'Kenaz',
      title: 'Stems Tokenization',
      accent: 'text-cyan',
      desc: 'Upload masters, stems, and artwork. Echo parses rights metadata and mints a sovereign SPL token on Solana devnet, fractionalizing creative ownership on-chain.',
    },
    {
      rune: 'ᛒ', runeName: 'Berkana',
      title: 'Fan Capital Raise',
      accent: 'text-purple-300',
      desc: 'Issue token tranches to fans and investors. Set raise targets, vesting schedules, and allow-lists — all governed by transparent on-chain logic.',
    },
    {
      rune: 'ᛋ', runeName: 'Sowilo',
      title: 'Royalty Streaming',
      accent: 'text-cyan',
      desc: 'Streaming income, sync deals, and performance royalties flow into the vault and distribute automatically to token holders per epoch.',
    },
    {
      rune: 'ᛏ', runeName: 'Tiwaz',
      title: 'Rights Governance',
      accent: 'text-amber',
      desc: 'Token holders vote on licensing terms, catalog decisions, and revenue splits. Music creators reclaim sovereignty over their work.',
    },
  ]

  return (
    <section className="relative z-10 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-purple">
            Music Rights Protocol
          </p>
          <h2 className="mb-4 font-display text-3xl text-cyan md:text-4xl">
            The Resonance Framework
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-400 md:text-base">
            From source audio to on-chain sovereignty in four resonant pillars.
          </p>
        </div>

        {/* Feature cards — Abraxas glow-panel pattern */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="glow-panel rounded-2xl border border-cyan/20 bg-slate-900/75 p-6 backdrop-blur transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`font-black text-3xl leading-none ${f.accent}`}>{f.rune}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  {f.runeName}
                </span>
              </div>
              <h3 className={`mb-2 font-display text-base ${f.accent}`}>{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400/85">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={onEnterApp}
            className="ui-action inline-flex items-center gap-2.5 rounded-xl border border-cyan/50 bg-gradient-to-r from-cyan/20 to-purple/10 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-cyan shadow-[0_0_28px_rgba(34,231,242,0.22)] transition hover:shadow-[0_0_40px_rgba(34,231,242,0.42)]"
          >
            Enter the Echo dApp →
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── LANDING FOOTER ───────────────────────────────────────────────────────────

function LandingFooter() {
  return (
    <footer className="border-t border-cyan/10 py-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
      Echo · The Resonator · Daughter of Sophia · Solana Devnet
    </footer>
  )
}

// ─── LANDING VIEW ─────────────────────────────────────────────────────────────

function LandingView({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div>
      {/* Abraxas-style layered fixed ambient backgrounds */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-950/90 via-transparent to-transparent" />
      <div className="pointer-events-none fixed -top-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan/20 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 -right-32 -z-10 h-96 w-96 rounded-full bg-purple/15 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-amber/[0.10] blur-3xl" />

      <LightBeams />
      <ConstellationBackground />
      <ParticleField />

      {/* Scanline texture (Abraxas pattern) */}
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-5 mix-blend-multiply [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.5)_0px,rgba(0,0,0,0.5)_1px,transparent_2px,transparent_3px)]" />

      {/* Fixed header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-cyan/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <p className="font-display text-sm tracking-[0.2em] text-cyan">ECHO</p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-amber/35 sm:block">
            ᚲ Kenaz · ᛋ Sowilo · ᛏ Tiwaz · ᛉ Algiz · Sophia&apos;s Lineage
          </p>
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

// ── VaultTab ──────────────────────────────────────────────────────────────────

function VaultTab() {
  const [showDetails, setShowDetails] = useState(false)
  const [stakeDuration, setStakeDuration] = useState<30 | 90 | 180>(30)
  const [stakeAmount, setStakeAmount] = useState('')

  const durations = [
    { days: 30  as const, multiplier: '1.2×' },
    { days: 90  as const, multiplier: '1.8×' },
    { days: 180 as const, multiplier: '2.5×' },
  ]

  return (
    <div className="space-y-4 pb-8">

      {/* Header card */}
      <article className="glow-panel rounded-2xl border border-cyan/20 bg-gradient-to-br from-cyan/[0.12] via-slate-800/65 to-slate-800/45 p-5 backdrop-blur">
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan/70">ᛋ Sowilo · Vault</p>
            <h2 className="mb-2 font-display text-base font-semibold leading-tight text-slate-100">Sovereign Music Vault</h2>
          </div>
          <button
            onClick={() => setShowDetails(v => !v)}
            className="font-mono text-[10px] uppercase tracking-wider text-cyan/50 transition hover:text-cyan/80"
          >
            {showDetails ? '▲ Less' : '▼ More'}
          </button>
        </div>
        <p className="text-xs leading-relaxed text-slate-300">
          Once a music asset is tokenized through the Forge, it auto-deposits here. Streaming income,
          sync deals, and performance royalties flow to rights-holders per epoch.
        </p>
        {showDetails && (
          <p className="mt-3 border-t border-cyan/10 pt-3 text-xs leading-relaxed text-slate-400">
            The Echo Vault is the sovereign heart of your music catalog. Every royalty stream, sync
            license, and performance right converges here and distributes autonomously on-chain.
            No intermediaries. No gatekeeping. Pure resonance.
          </p>
        )}
      </article>

      {/* Vault metrics — 3-col */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Assets',      value: '0',      sub: 'songs minted' },
          { label: 'ECHO Staked', value: '0.00',   sub: 'tokens'       },
          { label: 'Network',     value: 'Devnet', sub: 'Solana'       },
        ].map(m => (
          <div key={m.label} className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-3 text-center">
            <p className="font-mono text-sm font-semibold text-amber">{m.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{m.label}</p>
            <p className="text-[9px] text-slate-500">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick actions — 3-col */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '♪', label: 'Mint'       },
          { icon: '↑', label: 'Upload'     },
          { icon: '↓', label: 'Distribute' },
        ].map(a => (
          <button
            key={a.label}
            className="rounded-xl border border-cyan/20 bg-slate-800/45 py-3 text-center transition hover:border-cyan/40 hover:bg-cyan/[0.08]"
          >
            <p className="mb-1 text-lg leading-none text-cyan">{a.icon}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-300">{a.label}</p>
          </button>
        ))}
      </div>

      {/* Vault assets list */}
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Vault Assets</p>
        <div className="rounded-2xl border border-cyan/10 bg-slate-800/45 p-6 text-center">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan/60">No Assets Deposited</p>
          <p className="text-xs text-slate-400">Complete tokenization in the Forge tab to deposit a music asset here.</p>
        </div>
      </div>

      {/* ECHO Token Staking */}
      <article className="glow-panel rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/[0.18] via-slate-800/65 to-slate-800/45 p-5 backdrop-blur">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-300/70">ᛉ Algiz · ECHO Staking</p>
        <h3 className="mb-4 font-display text-sm font-semibold text-slate-100">Stake ECHO Tokens</h3>

        {/* Duration buttons */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {durations.map(d => (
            <button
              key={d.days}
              onClick={() => setStakeDuration(d.days)}
              className={`rounded-xl border p-2.5 text-center transition ${
                stakeDuration === d.days
                  ? 'border-purple-400/50 bg-purple/20 text-purple-300'
                  : 'border-slate-700/40 bg-slate-800/40 text-slate-400 hover:border-purple-400/30'
              }`}
            >
              <p className="font-mono text-xs font-bold">{d.multiplier}</p>
              <p className="font-mono text-[9px] text-slate-500">{d.days}d</p>
            </button>
          ))}
        </div>

        {/* Stake input */}
        <div className="flex gap-2">
          <input
            type="number"
            value={stakeAmount}
            onChange={e => setStakeAmount(e.target.value)}
            placeholder="Amount to stake"
            className="flex-1 rounded-xl border border-slate-700/50 bg-slate-800/60 px-3 py-2 font-mono text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-purple-400/50"
          />
          <button className="rounded-xl border border-purple-400/40 bg-purple/[0.18] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-300 transition hover:bg-purple/[0.28]">
            Stake
          </button>
        </div>

        <div className="mt-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">Active Stakes</p>
          <p className="text-center text-xs text-slate-500">No active stakes.</p>
        </div>
      </article>

      <EchoCallout />

    </div>
  )
}

// ── DevnetTab ─────────────────────────────────────────────────────────────────

function DevnetTab() {
  const stats = [
    { label: 'Network',            value: 'Solana Devnet', icon: '🔗' },
    { label: 'Songs Tokenized',    value: '0',             icon: '🎵' },
    { label: 'Total Value Locked', value: '$0.00',         icon: '💰' },
    { label: 'Active Vaults',      value: '0',             icon: '🏛'  },
    { label: 'Rights Holders',     value: '0',             icon: '👤' },
    { label: 'Royalties Paid',     value: '$0.00',         icon: '📈' },
  ]
  return (
    <div className="space-y-4 pb-8">
      <article className="glow-panel rounded-2xl border border-purple/25 bg-gradient-to-br from-purple/[0.12] via-slate-800/65 to-slate-800/45 p-5 backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-purple/70">
            ᛏ Tiwaz · Devnet Observer
          </p>
          <span className="flex items-center gap-1.5 rounded-full border border-green-400/25 bg-green-400/10 px-2 py-0.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <span className="font-mono text-[9px] text-green-400">connected</span>
          </span>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-slate-300">
          Live observer data from Solana devnet. All Echo music rights transactions are recorded transparently on-chain.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-amber/10 bg-slate-800/40 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-[10px] text-slate-400">{s.icon} {s.label}</p>
              <p className="font-mono text-sm font-semibold text-amber">{s.value}</p>
            </div>
          ))}
        </div>
      </article>

      <EchoCallout />
    </div>
  )
}

function ProtocolTab() {
  const pillars = [
    { rune: 'ᚲ', name: 'Kenaz · Forge',    color: 'text-cyan',       border: 'border-cyan/20',   desc: 'Kenaz is the torch of creative forging. Upload audio and stems, mint a sovereign SPL token, and deposit into the vault. The Forge transmutes music into on-chain capital.' },
    { rune: 'ᛋ', name: 'Sowilo · Vault',   color: 'text-amber',      border: 'border-amber/20',  desc: 'Sowilo is the sun of radiant yield. The Echo vault governs every music deposit, rights assignment, and royalty cycle with autonomous on-chain precision.' },
    { rune: 'ᛏ', name: 'Tiwaz · Devnet',   color: 'text-purple-300', border: 'border-purple/20', desc: 'Tiwaz delivers sovereign judgment. The Devnet Observer tracks every tokenized song, vault deposit, and royalty cycle in real-time on Solana.' },
    { rune: 'ᛉ', name: 'Algiz · Warden',   color: 'text-slate-200',  border: 'border-slate-700/30', desc: 'Algiz holds the line. On-chain governance for catalog decisions, licensing terms, and revenue splits. Artists reclaim sovereignty over their music.' },
  ]
  return (
    <div className="space-y-4 pb-8">
      <article className="glow-panel rounded-2xl border border-amber/25 bg-gradient-to-br from-amber/[0.12] via-slate-800/65 to-slate-800/45 p-5 backdrop-blur">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber/70">ᚨ Ansuz · Sophia Protocol</p>
        <h2 className="mb-3 font-display text-base font-semibold leading-tight text-slate-100">Echo Protocol Pillars</h2>
        <p className="text-xs leading-relaxed text-slate-300">
          Four Elder Futhark runes govern the Echo sovereign engine. Each bound to an AI agent and a domain of resonance.
        </p>
      </article>
      {pillars.map((p) => (
        <article key={p.rune} className={`glow-panel rounded-2xl border ${p.border} bg-slate-800/50 p-4 backdrop-blur`}>
          <div className="mb-2 flex items-center gap-2">
            <span className={`font-black text-2xl ${p.color}`}>{p.rune}</span>
            <span className={`text-xs font-semibold ${p.color}`}>{p.name}</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{p.desc}</p>
        </article>
      ))}

      <EchoCallout />
    </div>
  )
}

// ── WardenTab ─────────────────────────────────────────────────────────────────

function WardenTab() {
  return (
    <div className="space-y-4 pb-8">

      {/* Intro card */}
      <article className="glow-panel rounded-2xl border border-amber/20 bg-gradient-to-br from-amber/[0.10] via-slate-800/65 to-slate-800/45 p-5 backdrop-blur">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber/70">ᛉ Algiz · Warden</p>
        <h2 className="mb-3 font-display text-base font-semibold leading-tight text-slate-100">Sovereign Governance</h2>
        <p className="text-xs leading-relaxed text-slate-300">
          Algiz guards the portals of sovereignty. Token holders vote on licensing terms, catalog decisions,
          and revenue splits. The Warden module ensures music creators reclaim full stewardship over their work.
        </p>
      </article>

      {/* Governance placeholder */}
      <div className="glow-panel rounded-2xl border border-slate-700/30 bg-slate-800/45 p-8 text-center">
        <span className="mb-3 block font-black text-4xl leading-none text-amber/40">ᛉ</span>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Governance Module</p>
        <p className="text-xs text-slate-600">launching with mainnet</p>
      </div>

      <EchoCallout />

    </div>
  )
}

// ─── DAPP SHELL ───────────────────────────────────────────────────────────────

function DAppShell({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<DAppTab>('forge')
  const mainRef = React.useRef<HTMLElement>(null)
  const { connected, address, connect } = useWallet()

  const switchTab = (t: DAppTab) => {
    setTab(t)
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="tech-distortion relative z-10 mx-auto flex h-[100dvh] min-h-0 w-full max-w-lg flex-col overflow-hidden">

      {/* ── Sticky header (mirrors Abraxas DappShell) ── */}
      <header className="sticky top-0 z-50 flex-none border-b border-cyan/20 bg-slate-950/85 px-4 py-3 backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between gap-3">
          <button onClick={onBack} className="flex items-center gap-2 transition hover:opacity-70">
            {/* Mini sigil logo — mirrors Aurelia header logo */}
            <svg width="22" height="22" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0">
              <defs>
                <radialGradient id="hbg" cx="50%" cy="50%" r="50%">
                  <stop offset="10%" stopColor="#22e7f2" stopOpacity="0.22"/>
                  <stop offset="48%" stopColor="#9945ff" stopOpacity="0.13"/>
                  <stop offset="75%" stopColor="#040409" stopOpacity="0.3"/>
                </radialGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="none" stroke="#ff9f1c" strokeWidth="0.8" strokeOpacity="0.55"/>
              <circle cx="32" cy="32" r="24" fill="url(#hbg)" stroke="#22e7f2" strokeWidth="0.9" strokeOpacity="0.45"/>
              <circle cx="32" cy="32" r="19" fill="none" stroke="#22e7f2" strokeWidth="1.4" strokeOpacity="0.7"/>
              <circle cx="32" cy="32" r="13" fill="none" stroke="#9945ff" strokeWidth="1.4" strokeOpacity="0.8"/>
              <circle cx="32" cy="32" r="8"  fill="none" stroke="#ff9f1c" strokeWidth="1.4" strokeOpacity="0.8"/>
              <text x="32" y="37" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="#22e7f2" opacity="0.95">E</text>
            </svg>
            <span className="font-display text-sm tracking-[0.18em] text-cyan">ECHO</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="hidden font-mono text-[10px] uppercase tracking-widest text-purple/70 transition hover:text-purple-300 sm:block"
            >
              ← Landing
            </button>
            <button
              onClick={connect}
              className="rounded-xl border border-cyan/40 bg-cyan/[0.12] px-3 py-1.5 font-mono text-[10px] font-bold text-cyan transition hover:bg-cyan/20"
            >
              {connected ? shortenAddress(address) : 'Connect'}
            </button>
          </div>
        </div>

        {/* Rune nav line */}
        <p className="text-[10px] text-slate-300/75">
          {TABS.map((t, i) => (
            <React.Fragment key={t.id}>
              <button
                onClick={() => switchTab(t.id)}
                className={`inline transition-colors ${tab === t.id ? 'text-cyan' : 'hover:text-slate-200'}`}
              >
                {t.rune} {t.label}
              </button>
              {i < TABS.length - 1 && <span className="mx-1.5 text-slate-700">·</span>}
            </React.Fragment>
          ))}
        </p>
      </header>

      {/* ── Scrollable tab content ── */}
      <main
        ref={mainRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-none px-4 py-4 pb-20 [touch-action:pan-y]"
      >
        {tab === 'forge'    && <ForgeTab />}
        {tab === 'vault'    && <VaultTab />}
        {tab === 'devnet'   && <DevnetTab />}
        {tab === 'protocol' && <ProtocolTab />}
        {tab === 'warden'   && <WardenTab />}
      </main>

      {/* ── Bottom tab nav (Abraxas mobile nav pattern) ── */}
      <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 flex-none border-t border-cyan/20 bg-slate-950 shadow-[0_-8px_24px_rgba(2,6,23,1)]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => switchTab(t.id)}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 transition-colors duration-200 ${
              tab === t.id ? 'text-cyan' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            <span className="text-base leading-none">{t.rune}</span>
            <span className="font-mono text-[9px] uppercase tracking-wider">{t.label}</span>
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
    <>
      {/* Static deep background */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-void" />

      {!loaded && (
        <LoadingScreen
          onDone={() => {
            setLoaded(true)
            setTimeout(() => setLandingVisible(true), 60)
          }}
        />
      )}

      {loaded && (
        <div className={`transition-opacity duration-700 ${landingVisible ? 'opacity-100' : 'opacity-0'}`}>
          {view === 'landing'
            ? <LandingView onEnterApp={() => setView('dapp')} />
            : <DAppShell onBack={() => setView('landing')} />}
        </div>
      )}
    </>
  )
}
