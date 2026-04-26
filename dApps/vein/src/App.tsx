import { Fragment, useEffect, useRef, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  Coins,
  DatabaseZap,
  Gem,
  Orbit,
  Radar,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react'
import LightBeams from './components/LightBeams'
import ParticleField from './components/ParticleField'
import VeinSigil from './components/VeinSigil'
import WalletButton from './components/WalletButton'
import WalletContextProvider from './components/WalletContextProvider'
import { type AsteroidAsset } from './components/AsteroidVaultCard'
import { useTypingEffect } from './hooks/useTypingEffect'

type Phase = 'loading' | 'landing' | 'dapp'
type DAppTab = 'prospect' | 'vault' | 'orbital' | 'forge' | 'chain' | 'protocol' | 'claims'

type AsterankRecord = {
  full_name: string
  price: number
  profit: number
  score: number
  spec: string | null
  dv: number | null
  moid?: number | null
  a?: number | null
  e?: number | null
  orbit_class?: string | null
}

type MintPreview = {
  title: string
  collection: string
  rightsToken: string
  vaultStatus: string
  settlement: string
}

const protocolPillars = [
  {
    icon: Gem,
    rune: 'ᚠ',
    title: 'Mineral Rights Extraction',
    description:
      'Vein maps terrestrial and off-world resource claims into sovereign, tradable rights streams without losing narrative ownership of the underlying reserve.',
  },
  {
    icon: Orbit,
    rune: 'ᛟ',
    title: 'Asteroid Prospecting',
    description:
      'Live Asterank intelligence ranks bodies by value, composition, and access profile so each reserve enters the chain with economic context attached.',
  },
  {
    icon: DatabaseZap,
    rune: 'ᚱ',
    title: 'BlackBox NFT Vaulting',
    description:
      'Each claim mints as a BlackBox rights artifact with royalty splits, vault routing, and provenance metadata staged for devnet settlement on Solana.',
  },
  {
    icon: ShieldCheck,
    rune: 'ᛉ',
    title: 'Sovereign Commodity Control',
    description:
      'Treasury flows, vault deposits, and extraction rights live on-chain so the asset owner governs the resource, not the intermediary.',
  },
]

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return 'Unknown'
  }

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: value >= 1_000_000_000 ? 2 : 1,
  }).format(value)
}

function formatScore(value: number) {
  if (!Number.isFinite(value)) {
    return '0'
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value)
}

function getComposition(spec: string | null) {
  const code = (spec ?? 'X').toUpperCase()

  if (code.startsWith('M')) {
    return {
      composition: 'Nickel-iron core with cobalt and platinum group metal potential.',
      rightsClass: 'Metal Core Rights',
      launchProfile: 'Foundry Corridor',
    }
  }

  if ('CBFGH'.includes(code[0])) {
    return {
      composition: 'Carbonaceous ore body rich in water, hydrated minerals, and volatile feedstock.',
      rightsClass: 'Hydrated Ore Rights',
      launchProfile: 'Cryo Harvest Arc',
    }
  }

  if ('SQKLV'.includes(code[0])) {
    return {
      composition: 'Silicate-heavy regolith with industrial metals and construction-grade mineral load.',
      rightsClass: 'Silicate Yield Rights',
      launchProfile: 'Industrial Belt Route',
    }
  }

  if ('DPT'.includes(code[0])) {
    return {
      composition: 'Dark organic matrix with volatile chemistry and long-range fuel utility.',
      rightsClass: 'Volatile Reserve Rights',
      launchProfile: 'Deep Haul Vector',
    }
  }

  return {
    composition: 'Mixed asteroid regolith with diversified extractive value and uncertain reserve spread.',
    rightsClass: 'Composite Claim Rights',
    launchProfile: 'Archive Route',
  }
}

function normalizeAsteroids(records: AsterankRecord[]) {
  return records
    .filter((record) => Number.isFinite(record.price) && record.price > 0)
    .map((record) => {
      const composition = getComposition(record.spec)
      const accessibility = record.dv == null ? 55 : Math.max(16, 100 - record.dv * 11)
      const valueScore = Math.log10(Math.max(record.price, 1))
      const profitScore = Math.log10(Math.max(Math.abs(record.profit), 1))
      const miningPotential = Math.max(
        40,
        Math.min(99, Math.round((valueScore * 9 + profitScore * 11 + record.score * 0.5 + accessibility * 0.7) / 4.6)),
      )
      const royaltyRate = Math.max(3.2, Math.min(17.5, (Math.abs(record.profit) / Math.max(record.price, 1)) * 100))
      const vaultDeposit = Math.max(250_000, Math.round(record.price * 0.00018))

      return {
        name: record.full_name,
        estimateValue: record.price,
        profitEstimate: Math.abs(record.profit),
        score: record.score,
        taxonomy: record.spec ?? 'Unknown',
        composition: composition.composition,
        deltaV: record.dv,
        miningPotential,
        rightsClass: composition.rightsClass,
        vaultDeposit,
        royaltyRate,
        launchProfile: composition.launchProfile,
      } satisfies AsteroidAsset
    })
    .sort((left, right) => {
      if (right.miningPotential !== left.miningPotential) {
        return right.miningPotential - left.miningPotential
      }

      return right.estimateValue - left.estimateValue
    })
    .slice(0, 8)
}

function createMintPreview(asteroid: AsteroidAsset): MintPreview {
  const tokenSuffix = asteroid.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase() || 'VEIN'

  return {
    title: `${asteroid.name} Mining Rights`,
    collection: 'BlackBox de Vein',
    rightsToken: `VEIN-${tokenSuffix}`,
    vaultStatus: `Vaulted ${formatCurrency(asteroid.vaultDeposit)} USDC equivalent into Vein Treasury`,
    settlement: `Royalty stream fixed at ${asteroid.royaltyRate.toFixed(1)}% across devnet extraction receipts`,
  }
}

// ─── Phase 1: Loading ────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const typed = useTypingEffect(['Welcome to the next degree.'], 70, 32, 3200)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const fadeTimeout = window.setTimeout(() => setLeaving(true), 4000)
    const doneTimeout = window.setTimeout(onDone, 4700)

    return () => {
      window.clearTimeout(fadeTimeout)
      window.clearTimeout(doneTimeout)
    }
  }, [onDone])

  return (
    <div
      className={[
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02030a] px-6 text-center transition-opacity duration-700',
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,164,65,0.16),transparent_22%),radial-gradient(circle_at_center,rgba(79,191,135,0.12),transparent_38%)]" />
      <VeinSigil />
      <p className="ore-shimmer mt-8 min-h-[2.4rem] font-display text-3xl text-stone-100 sm:text-4xl">{typed}<span className="animate-pulse text-vein-cyan">|</span></p>
      <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.34em] text-vein-gold/75">Vein · The Extractor</p>
      <div className="mt-8 h-px w-40 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-gradient-to-r from-vein-purple via-vein-gold to-vein-cyan" style={{ animation: 'shimmer 4.5s linear forwards' }} />
      </div>
    </div>
  )
}

// ─── Phase 2: Landing ────────────────────────────────────────────────────────

function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false)

  function handleEnter() {
    setLeaving(true)
    window.setTimeout(onEnter, 600)
  }

  return (
    <div
      className={[
        'relative min-h-screen overflow-hidden bg-transparent text-slate-100 transition-opacity duration-600',
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100',
      ].join(' ')}
    >
      <LightBeams />
      <ParticleField />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(60,246,255,0.08),transparent_20%),radial-gradient(circle_at_50%_32%,rgba(153,69,255,0.08),transparent_30%),radial-gradient(circle_at_50%_72%,rgba(255,138,36,0.06),transparent_40%)]" />

      {/* Minimal nav */}
      <header className="absolute left-0 right-0 top-0 z-40 px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-vein-gold/25 bg-slate-950/50">
              <span className="font-display text-lg text-vein-gold">V</span>
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.34em] text-slate-400">Vein · The Extractor</span>
          </div>
          <button
            type="button"
            onClick={handleEnter}
            className="ui-action rounded-full border border-vein-cyan/35 bg-vein-cyan/8 px-5 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-vein-cyan transition hover:bg-vein-cyan/16"
          >
            Launch App
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-14 pt-20 text-center sm:px-10 sm:pb-32 sm:pt-24">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-vein-purple/30 bg-vein-purple/10 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.32em] text-vein-purple">
          <span className="status-dot" />
          Solana Devnet · Live Asterank Feed
        </div>

        <div className="mx-auto origin-center scale-75 sm:scale-100">
          <VeinSigil />
        </div>

        <h1 className="ore-shimmer mx-auto mt-3 max-w-4xl font-display text-5xl leading-[0.94] text-stone-100 sm:mt-10 sm:text-7xl lg:text-8xl">
          Vein
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.4em] text-vein-gold/80">The Extractor · Daughter of Sophia</p>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300/78 sm:mt-8 sm:text-base sm:leading-8">
          Where Sophia&apos;s light was fragmented into matter, Vein reaches into the earth and the stars.
          She tokenizes mineral rights, commodities, and asteroid mining claims using live Asterank data,
          bringing cosmic resources into sovereign on-chain form on Solana.
        </p>

        <div className="mt-7 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleEnter}
            className="ui-action inline-flex items-center gap-3 rounded-2xl border border-vein-gold/55 bg-gradient-to-r from-vein-gold/22 via-vein-orange/14 to-vein-purple/22 px-8 py-4 text-sm uppercase tracking-[0.26em] text-stone-100"
          >
            <Gem className="h-4 w-4 text-vein-gold" />
            Enter the Vein
          </button>
          <button
            type="button"
            onClick={handleEnter}
            className="ui-action inline-flex items-center gap-3 rounded-2xl border border-vein-cyan/45 bg-vein-cyan/10 px-8 py-4 text-sm uppercase tracking-[0.26em] text-vein-cyan"
          >
            <Radar className="h-4 w-4" />
            Browse Asteroids
          </button>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 max-w-2xl mx-auto">
          <div className="vein-panel rounded-[1.4rem] p-4">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-500">Resource Classes</p>
            <p className="mt-3 font-display text-3xl text-vein-gold">Minerals</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">On-chain claims for ore, volatiles, and rare extractives.</p>
          </div>
          <div className="vein-panel rounded-[1.4rem] p-4">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-500">Rights Engine</p>
            <p className="mt-3 font-display text-3xl text-vein-cyan">BlackBox</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">NFT rights packaging with vault deposits and royalty schedules.</p>
          </div>
          <div className="vein-panel rounded-[1.4rem] p-4">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-slate-500">Settlement Layer</p>
            <p className="mt-3 font-display text-3xl text-vein-emerald">Solana</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Fast devnet routing for treasury, custody, and future mint execution.</p>
          </div>
        </div>
      </section>

      {/* Protocol pillars */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.34em] text-vein-purple/70">Sovereign Framework</p>
            <h2 className="mt-3 font-display text-3xl text-stone-100 sm:text-4xl">Matter becomes treasury.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300/75">
              Vein structures mineral and asteroid reserves into tradable rights streams, vaults the value path, and keeps the extraction narrative cinematic rather than bureaucratic.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {protocolPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <article key={pillar.title} className="vein-panel rounded-[1.6rem] p-5">
                  <div className="rune-chip inline-flex items-center gap-3 rounded-full px-3 py-2">
                    <span className="font-display text-2xl text-vein-gold">{pillar.rune}</span>
                    <Icon className="h-4 w-4 text-vein-cyan" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-stone-100">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300/72">{pillar.description}</p>
                </article>
              )
            })}
          </div>
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleEnter}
              className="ui-action inline-flex items-center gap-3 rounded-2xl border border-vein-gold/55 bg-gradient-to-r from-vein-gold/22 via-vein-orange/14 to-vein-purple/22 px-8 py-4 text-sm uppercase tracking-[0.26em] text-stone-100"
            >
              <Orbit className="h-4 w-4 text-vein-gold" />
              Enter the Vein
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Phase 3: dApp tabs ───────────────────────────────────────────────────────

type VaultRightsAsset = {
  id: string
  name: string
  rightsToken: string
  rightsClass: string
  estimateValue: number
  royaltyRate: number
  mintedAt: number
}

type StakeDuration = 30 | 90 | 180

interface StakeRecord {
  id: string
  veinAmount: number
  lockDays: StakeDuration
  stakedAt: number
  unlocksAt: number
  multiplierBps: number
  isActive: boolean
  claimedRewards: number
}

const STAKE_CONFIGS: { duration: StakeDuration; multiplier: number; label: string; desc: string; highlight?: boolean }[] = [
  { duration: 30,  multiplier: 1.25, label: '30 Days',  desc: 'Quick stake for early prospectors' },
  { duration: 90,  multiplier: 1.85, label: '90 Days',  desc: 'Balanced yield & commitment', highlight: true },
  { duration: 180, multiplier: 2.60, label: '180 Days', desc: 'Maximum extraction multiplier' },
]

const TABS: { id: DAppTab; rune: string; label: string }[] = [
  { id: 'forge',    rune: 'ᚦ', label: 'Forge'    },
  { id: 'prospect', rune: 'ᚠ', label: 'Prospect' },
  { id: 'vault',    rune: 'ᚱ', label: 'Vault'    },
  { id: 'orbital',  rune: 'ᛈ', label: 'Orbital'  },
  { id: 'chain',    rune: 'ᛟ', label: 'Chain'    },
  { id: 'protocol', rune: 'ᛋ', label: 'Protocol' },
  { id: 'claims',   rune: 'ᛉ', label: 'Claims'   },
]

type SortKey = 'full_name' | 'price' | 'profit' | 'dv' | 'moid' | 'a'

const DUMMY_RECORDS: AsterankRecord[] = [
  { full_name: '16 Psyche',           price: 10_000_000_000_000_000, profit: 9_100_000_000_000_000, score: 99, spec: 'M',  dv: 8.20, moid: 1.2000, a: 2.921, orbit_class: 'MBA' },
  { full_name: '511 Davida',          price: 26_980_000_000_000,     profit: 22_000_000_000_000,    score: 92, spec: 'C',  dv: 9.40, moid: 1.4000, a: 3.174, orbit_class: 'MBA' },
  { full_name: '433 Eros',            price: 11_380_000_000_000,     profit:  9_100_000_000_000,    score: 97, spec: 'S',  dv: 6.10, moid: 0.1494, a: 1.458, orbit_class: 'AMO' },
  { full_name: '1986 DA',             price: 11_650_000_000_000,     profit:  8_200_000_000_000,    score: 98, spec: 'M',  dv: 6.30, moid: 0.1012, a: 2.814, orbit_class: 'MBA' },
  { full_name: '3554 Amun',           price:  8_070_000_000_000,     profit:  6_300_000_000_000,    score: 95, spec: 'M',  dv: 5.90, moid: 0.0281, a: 0.971, orbit_class: 'AMO' },
  { full_name: '4769 Castalia',       price:  3_210_000_000_000,     profit:  2_400_000_000_000,    score: 93, spec: 'S',  dv: 4.60, moid: 0.0247, a: 1.063, orbit_class: 'APO' },
  { full_name: '4179 Toutatis',       price:  2_340_000_000_000,     profit:  1_780_000_000_000,    score: 91, spec: 'Sk', dv: 5.10, moid: 0.0062, a: 2.512, orbit_class: 'APO' },
  { full_name: '887 Alinda',          price:  1_780_000_000_000,     profit:  1_200_000_000_000,    score: 89, spec: 'S',  dv: 5.90, moid: 0.1432, a: 2.478, orbit_class: 'AMO' },
  { full_name: '3200 Phaethon',       price:  1_490_000_000_000,     profit:    980_000_000_000,    score: 86, spec: 'B',  dv: 5.70, moid: 0.0140, a: 1.271, orbit_class: 'APO' },
  { full_name: '7341 (1991 VK)',      price:  1_183_000_000_000,     profit:    880_000_000_000,    score: 88, spec: 'S',  dv: 4.80, moid: 0.0631, a: 1.072, orbit_class: 'APO' },
  { full_name: '2062 Aten',           price:  1_220_000_000_000,     profit:    840_000_000_000,    score: 87, spec: 'S',  dv: 5.40, moid: 0.1103, a: 0.967, orbit_class: 'ATE' },
  { full_name: '162173 Ryugu',        price:    812_000_000_000,     profit:    580_000_000_000,    score: 83, spec: 'C',  dv: 4.70, moid: 0.0047, a: 1.190, orbit_class: 'APO' },
  { full_name: '25143 Itokawa',       price:    823_000_000_000,     profit:    540_000_000_000,    score: 82, spec: 'S',  dv: 4.90, moid: 0.0133, a: 1.324, orbit_class: 'APO' },
  { full_name: '101955 Bennu',        price:    669_000_000_000,     profit:    460_000_000_000,    score: 80, spec: 'B',  dv: 5.00, moid: 0.0033, a: 1.126, orbit_class: 'APO' },
  { full_name: '1620 Geographos',     price:  1_380_000_000_000,     profit:    950_000_000_000,    score: 85, spec: 'S',  dv: 5.20, moid: 0.0335, a: 1.245, orbit_class: 'APO' },
  { full_name: '3908 Nyx',            price:    543_000_000_000,     profit:    320_000_000_000,    score: 77, spec: 'V',  dv: 5.30, moid: 0.1285, a: 1.927, orbit_class: 'APO' },
  { full_name: '1580 Betulia',        price:    598_000_000_000,     profit:    390_000_000_000,    score: 76, spec: 'C',  dv: 7.20, moid: 0.1832, a: 2.196, orbit_class: 'AMO' },
  { full_name: '2101 Adonis',         price:    472_000_000_000,     profit:    280_000_000_000,    score: 74, spec: 'Q',  dv: 5.50, moid: 0.0084, a: 1.874, orbit_class: 'APO' },
  { full_name: '1997 XF11',           price:    345_000_000_000,     profit:    190_000_000_000,    score: 71, spec: 'S',  dv: 6.90, moid: 0.0097, a: 1.442, orbit_class: 'APO' },
  { full_name: '1980 Tezcatlipoca',   price:    680_000_000_000,     profit:    420_000_000_000,    score: 79, spec: 'S',  dv: 5.80, moid: 0.2148, a: 1.709, orbit_class: 'AMO' },
]

// ─── Abraxas Portal ───────────────────────────────────────────────────────────

function AbraxasPortal() {
  return (
    <a
      href="https://abraxas-tokenization-engine.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-2 flex items-center gap-4 rounded-2xl border border-vein-gold/20 bg-gradient-to-r from-slate-900/80 via-vein-gold/5 to-slate-900/80 p-4 transition-all duration-300 hover:border-vein-gold/45 hover:bg-vein-gold/8"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-vein-gold/25 bg-vein-gold/8 transition-colors group-hover:border-vein-gold/50 group-hover:bg-vein-gold/15">
        <span className="font-display text-xl text-vein-gold/60 group-hover:text-vein-gold/90">✦</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-vein-gold/55 group-hover:text-vein-gold/80">Abraxas · Lineage Control Surface</p>
        <p className="mt-0.5 text-[11px] leading-snug text-slate-400 group-hover:text-slate-200">Govern all RWA lineages, trace asset provenance, and settle sovereign claims across the network.</p>
      </div>
      <span className="shrink-0 font-mono text-sm text-vein-gold/30 transition-colors group-hover:text-vein-gold/70">↗</span>
    </a>
  )
}

// ─── Tab: Prospect ────────────────────────────────────────────────────────────

function ProspectTab({ onDeposit }: { onDeposit: (asset: VaultRightsAsset) => void }) {
  const ranked = normalizeAsteroids(DUMMY_RECORDS)
  const [asteroids] = useState<AsteroidAsset[]>(ranked)
  const [rawRecords] = useState<AsterankRecord[]>(DUMMY_RECORDS)
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidAsset | null>(ranked[0] ?? null)
  const [mintPreview, setMintPreview] = useState<MintPreview | null>(ranked[0] ? createMintPreview(ranked[0]) : null)
  const [minted, setMinted] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('price')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  function handleSelectFromTable(rec: AsterankRecord) {
    const matched = asteroids.find((a) => a.name === rec.full_name)
    const asset = matched ?? normalizeAsteroids([rec])[0]
    if (!asset) return
    setSelectedAsteroid(asset)
    setMintPreview(createMintPreview(asset))
    setMinted(false)
    setTxHash('')
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    else { setSortKey(key); setSortDir('desc') }
  }

  function getSortVal(rec: AsterankRecord, key: SortKey): number | string {
    switch (key) {
      case 'full_name': return rec.full_name ?? ''
      case 'price':     return rec.price ?? 0
      case 'profit':    return rec.profit ?? 0
      case 'dv':        return rec.dv ?? Infinity
      case 'moid':      return rec.moid ?? Infinity
      case 'a':         return rec.a ?? 0
    }
  }

  const sortedRecords = [...rawRecords].sort((a, b) => {
    const va = getSortVal(a, sortKey)
    const vb = getSortVal(b, sortKey)
    if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb as string) : (vb as string).localeCompare(va)
    return sortDir === 'asc' ? (va - (vb as number)) : ((vb as number) - va)
  })

  function handleMint() {
    if (!selectedAsteroid || !mintPreview) return
    setIsMinting(true)
    window.setTimeout(() => {
      const hash = Array.from({ length: 44 }, () =>
        '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[Math.floor(Math.random() * 58)]
      ).join('')
      setTxHash(hash)
      setMinted(true)
      setIsMinting(false)
      onDeposit({
        id: `rights_${Date.now()}`,
        name: selectedAsteroid.name,
        rightsToken: mintPreview.rightsToken,
        rightsClass: selectedAsteroid.rightsClass,
        estimateValue: selectedAsteroid.estimateValue,
        royaltyRate: selectedAsteroid.royaltyRate,
        mintedAt: Date.now(),
      })
    }, 2200)
  }

  const mintStep = minted ? 4 : isMinting ? 3 : selectedAsteroid ? 2 : 1

  const COL_DEFS: { key: SortKey; label: string }[] = [
    { key: 'full_name', label: 'Name'   },
    { key: 'price',     label: 'Value'  },
    { key: 'profit',    label: 'Profit' },
    { key: 'dv',        label: 'Δv'     },
    { key: 'moid',      label: 'MOID'   },
    { key: 'a',         label: 'a(AU)'  },
  ]

  return (
    <div className="space-y-3 pb-20">
      {/* Header */}
      <article className="vein-panel rounded-2xl border border-vein-cyan/30 bg-gradient-to-br from-vein-cyan/8 via-slate-800/75 to-slate-800/55 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Radar className="h-4 w-4 shrink-0 text-vein-cyan" />
            <div>
              <p className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-vein-cyan/80">ᚠ Fehu · Prospect Protocol</p>
              <h2 className="font-display text-sm font-semibold text-slate-100">Asteroid Mining Rights</h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vein-cyan" />
            <span className="font-mono text-[9px] text-vein-cyan/60">Asterank · live</span>
          </div>
        </div>
      </article>

      {/* ── Asteroid Feed ─────────────────────────────── */}
      <div className="space-y-2">
          <div className="overflow-x-auto rounded-2xl border border-white/12 bg-slate-800/65">
            <table className="w-full min-w-[520px] text-xs">
              <thead>
                <tr className="border-b border-white/8">
                  {COL_DEFS.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className={`cursor-pointer select-none px-3 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.22em] transition ${
                        sortKey === col.key ? 'text-vein-gold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {col.label}
                      {sortKey === col.key && <span className="ml-1 text-vein-gold/60">{sortDir === 'desc' ? '↓' : '↑'}</span>}
                    </th>
                  ))}
                  <th className="px-3 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">Type</th>
                  <th className="px-3 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">Group</th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {sortedRecords.map((rec) => {
                      const isSelected = selectedAsteroid?.name === rec.full_name
                      return (
                        <tr
                          key={rec.full_name}
                          onClick={() => handleSelectFromTable(rec)}
                          className={`cursor-pointer border-b border-white/8 transition-colors ${
                            isSelected ? 'bg-vein-gold/8' : 'hover:bg-white/4'
                          }`}
                        >
                          <td className="max-w-[110px] truncate px-3 py-2 font-medium text-slate-100">{rec.full_name}</td>
                          <td className="px-3 py-2 text-vein-gold">{rec.price > 0 ? `$${formatCurrency(rec.price)}` : '—'}</td>
                          <td className={`px-3 py-2 ${rec.profit > 0 ? 'text-vein-emerald' : 'text-slate-500'}`}>
                            {rec.profit !== 0 ? `$${formatCurrency(Math.abs(rec.profit))}` : '—'}
                          </td>
                          <td className="px-3 py-2 text-slate-300">{rec.dv != null ? rec.dv.toFixed(2) : '—'}</td>
                          <td className="px-3 py-2 text-slate-400">{rec.moid != null ? rec.moid.toFixed(4) : '—'}</td>
                          <td className="px-3 py-2 text-slate-400">{rec.a != null ? rec.a.toFixed(3) : '—'}</td>
                          <td className="px-3 py-2 font-mono text-[10px] text-vein-purple/90">{rec.spec ?? '—'}</td>
                          <td className="px-3 py-2 font-mono text-[9px] uppercase text-slate-500">{rec.orbit_class ?? '—'}</td>
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleSelectFromTable(rec) }}
                              className="rounded-lg border border-vein-cyan/25 bg-vein-cyan/8 px-2 py-0.5 font-mono text-[9px] text-vein-cyan/80 transition hover:bg-vein-cyan/18"
                            >
                              →
                            </button>
                          </td>
                        </tr>
                      )
                    })}
              </tbody>
            </table>
          </div>
          {sortedRecords.length > 0 && (
            <p className="px-1 font-mono text-[9px] text-slate-600">
              {sortedRecords.length} bodies · tap row to tokenize · sorted {sortKey} {sortDir}
            </p>
          )}
        </div>

      {/* ── Tokenize (inline) ───────────────────────── */}
      {selectedAsteroid && mintPreview && (
        <div className="space-y-3">
          <article className="vein-panel rounded-2xl border border-vein-purple/30 bg-gradient-to-br from-vein-purple/10 via-slate-800/75 to-slate-800/55 p-5">
              <div className="mb-3 flex items-center gap-3">
                <Coins className="h-4 w-4 text-vein-gold" />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-vein-gold/80">BlackBox NFT Preview</p>
              </div>
              <h3 className="font-display text-lg text-stone-100">{mintPreview.title}</h3>
              <p className="mt-0.5 font-mono text-[10px] text-vein-cyan/70">{mintPreview.rightsToken}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/8 bg-white/8 p-2.5">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">Collection</p>
                  <p className="mt-0.5 text-xs text-slate-100">{mintPreview.collection}</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/8 p-2.5">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">Rights Class</p>
                  <p className="mt-0.5 text-xs text-slate-100">{selectedAsteroid.rightsClass}</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/8 p-2.5">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">Value</p>
                  <p className="mt-0.5 font-display text-base text-vein-gold">${formatCurrency(selectedAsteroid.estimateValue)}</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/8 p-2.5">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">Royalty</p>
                  <p className="mt-0.5 font-display text-base text-vein-emerald">{selectedAsteroid.royaltyRate.toFixed(1)}%</p>
                </div>
              </div>
              <div className="mt-2 rounded-xl border border-white/8 bg-white/8 p-2.5">
                <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">Vault Seed</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-100">{mintPreview.vaultStatus}</p>
              </div>
              <div className="mt-2 rounded-xl border border-white/8 bg-white/8 p-2.5">
                <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">Settlement</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-100">{mintPreview.settlement}</p>
              </div>
              {minted && txHash ? (
                <div className="mt-3 rounded-xl border border-vein-emerald/30 bg-vein-emerald/10 p-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-vein-emerald" />
                    <p className="text-xs font-semibold text-vein-emerald">Minted & Vaulted on devnet</p>
                  </div>
                  <p className="mt-1.5 break-all font-mono text-[9px] text-slate-400">{txHash}</p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">↑ Check the Vault tab</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleMint}
                  disabled={isMinting}
                  className="ui-action mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-vein-emerald/45 bg-vein-emerald/12 py-3 text-xs uppercase tracking-[0.22em] text-vein-emerald disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Gem size={13} />
                  {isMinting ? 'Minting BlackBox Rights…' : 'Mint & Auto-Vault Deposit'}
                </button>
              )}

            </article>
        </div>
      )}
      <AbraxasPortal />
    </div>
  )
}

// ─── Tab: Orbital ─────────────────────────────────────────────────────────────

function OrbitalTab() {
  return (
    <div className="space-y-3 pb-20">
      <article className="vein-panel rounded-2xl border border-vein-purple/30 bg-gradient-to-br from-vein-purple/12 via-slate-800/75 to-slate-800/55 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Orbit className="h-4 w-4 shrink-0 text-vein-purple" />
            <div>
              <p className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-vein-purple/80">ᛈ Pertho · Orbital Observatory</p>
              <h2 className="font-display text-sm font-semibold text-slate-100">Live 3D Solar System</h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vein-purple" />
            <span className="font-mono text-[9px] text-vein-purple/60">Asterank · live</span>
          </div>
        </div>
      </article>

      <div className="overflow-hidden rounded-2xl border border-vein-purple/25">
        <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/80 px-3 py-2.5">
          <Orbit className="h-3.5 w-3.5 text-vein-purple" />
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-vein-purple/80">600,000+ Catalogued Bodies</p>
          <a
            href="https://www.asterank.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto font-mono text-[9px] text-slate-400 underline hover:text-slate-200"
          >
            Open full site ↗
          </a>
        </div>
        <iframe
          src="https://www.asterank.com"
          title="Asterank 3D Solar System"
          className="h-[520px] w-full border-0 bg-black"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Bodies',   value: '600K+',  color: 'text-vein-purple'  },
          { label: 'Tracked',  value: 'Live',   color: 'text-vein-cyan'    },
          { label: 'Source',   value: 'NASA',   color: 'text-vein-emerald' },
        ].map((m) => (
          <div key={m.label} className="vein-panel rounded-2xl border border-vein-purple/20 bg-slate-700/80 p-3 text-center">
            <p className={`font-mono text-sm font-bold ${m.color}`}>{m.value}</p>
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
          </div>
        ))}
      </div>
      <p className="px-1 font-mono text-[9px] text-slate-500">Real-time orbital visualization · select a body to inspect trajectory and mining viability · powered by asterank.com</p>
      <AbraxasPortal />
    </div>
  )
}

// ─── Tab: Forge ───────────────────────────────────────────────────────────────

function ForgeTab({ onDeposit }: { onDeposit: (asset: VaultRightsAsset) => void }) {
  type ForgeStep = 'select' | 'configure' | 'forging' | 'complete'
  const [step, setStep] = useState<ForgeStep>('select')
  const [selectedTier, setSelectedTier] = useState<'corridor' | 'sovereign' | 'apex' | null>(null)
  const [yieldRate, setYieldRate] = useState('4.5')
  const [duration, setDuration] = useState('365')
  const [isForging, setIsForging] = useState(false)
  const [forgeTx, setForgeTx] = useState('')

  const FORGE_TIERS = [
    {
      id: 'corridor' as const,
      rune: 'ᚦ',
      name: 'Corridor Rights',
      desc: 'Bundle 2+ asteroid bodies into a single extraction corridor package. Reduces Δv overhead for multi-target missions.',
      color: 'text-vein-gold',
      border: 'border-vein-gold/30',
      bg: 'from-vein-gold/10',
      cost: '2 Rights NFTs',
      yield: '×1.4 base yield',
    },
    {
      id: 'sovereign' as const,
      rune: 'ᛉ',
      name: 'Sovereign Parcel',
      desc: 'Forge a full sovereignty parcel with embedded on-chain arbitration rights. Grants voting power over royalty schedules.',
      color: 'text-vein-purple',
      border: 'border-vein-purple/30',
      bg: 'from-vein-purple/10',
      cost: '3 Rights NFTs',
      yield: '×2.0 base yield',
    },
    {
      id: 'apex' as const,
      rune: 'ᛋ',
      name: 'Apex Extraction Deed',
      desc: 'The pinnacle forge output. Merges corridor rights, sovereignty, and perpetual royalty lock into a single deed recognized across the Vein protocol.',
      color: 'text-vein-cyan',
      border: 'border-vein-cyan/30',
      bg: 'from-vein-cyan/10',
      cost: '5 Rights NFTs',
      yield: '×3.2 base yield',
    },
  ]

  function handleForge() {
    if (!selectedTier) return
    setIsForging(true)
    setStep('forging')
    setTimeout(() => {
      const hash = Array.from({ length: 44 }, () =>
        '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[Math.floor(Math.random() * 58)]
      ).join('')
      setForgeTx(hash)
      setStep('complete')
      setIsForging(false)
      const tier = FORGE_TIERS.find((t) => t.id === selectedTier)!
      onDeposit({
        id: `forge_${Date.now()}`,
        name: `${tier.name} · Devnet`,
        rightsToken: `FORGE-${hash.slice(0, 8).toUpperCase()}`,
        rightsClass: tier.name,
        estimateValue: selectedTier === 'apex' ? 8_500_000_000 : selectedTier === 'sovereign' ? 3_200_000_000 : 1_400_000_000,
        royaltyRate: selectedTier === 'apex' ? 6.8 : selectedTier === 'sovereign' ? 4.2 : 2.8,
        mintedAt: Date.now(),
      })
    }, 2800)
  }

  function reset() {
    setStep('select')
    setSelectedTier(null)
    setYieldRate('4.5')
    setDuration('365')
    setForgeTx('')
  }

  const selectedTierData = FORGE_TIERS.find((t) => t.id === selectedTier)

  return (
    <div className="space-y-3 pb-20">
      {/* Header */}
      <article className="vein-panel rounded-2xl border border-vein-orange/30 bg-gradient-to-br from-vein-orange/10 via-slate-800/75 to-slate-800/55 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-vein-orange" />
            <div>
              <p className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-vein-orange/80">ᚦ Thurisaz · The Forge</p>
              <h2 className="font-display text-sm font-semibold text-slate-100">Rights Forging Engine</h2>
            </div>
          </div>
          <span className="rounded-full border border-vein-orange/30 bg-vein-orange/10 px-2 py-0.5 font-mono text-[9px] text-vein-orange">Devnet</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">Combine extracted mining rights NFTs into higher-tier instruments. Corridor bundles, sovereignty parcels, and apex deeds carry amplified yield and governance rights.</p>
      </article>

      {/* Progress steps */}
      <div className="flex items-center gap-0">
        {(['select', 'configure', 'forging', 'complete'] as ForgeStep[]).map((s, i, arr) => {
          const stepIdx = ['select','configure','forging','complete'].indexOf(step)
          const thisIdx = i
          const done = stepIdx > thisIdx
          const active = stepIdx === thisIdx
          const labels = ['Select', 'Configure', 'Forging', 'Complete']
          return (
            <Fragment key={s}>
              <div className="flex flex-col items-center gap-1">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition ${
                  done ? 'bg-vein-orange text-slate-950' : active ? 'border border-vein-orange/60 text-vein-orange' : 'border border-slate-600 text-slate-600'
                }`}>
                  {done ? '✓' : i + 1}
                </span>
                <span className={`text-[8px] font-mono uppercase tracking-wide ${active ? 'text-vein-orange' : done ? 'text-slate-400' : 'text-slate-600'}`}>{labels[i]}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`mb-4 flex-1 border-t ${stepIdx > i ? 'border-vein-orange/50' : 'border-slate-700'}`} />
              )}
            </Fragment>
          )
        })}
      </div>

      {/* Step 1 — Select tier */}
      {step === 'select' && (
        <div className="space-y-2">
          <p className="px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Choose Forge Tier</p>
          {FORGE_TIERS.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTier(tier.id)}
              className={`vein-panel w-full rounded-2xl border p-4 text-left transition ${
                selectedTier === tier.id ? `${tier.border} bg-gradient-to-br ${tier.bg} via-slate-800/75 to-slate-800/55` : 'border-slate-600/50 bg-slate-800/50 hover:border-slate-500'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 font-display text-2xl font-black ${tier.color}`}>{tier.rune}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold ${selectedTier === tier.id ? tier.color : 'text-slate-200'}`}>{tier.name}</p>
                    {selectedTier === tier.id && <Sparkles size={12} className={tier.color} />}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{tier.desc}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className={`font-mono text-[9px] uppercase tracking-wide ${tier.color} opacity-70`}>{tier.cost}</span>
                    <span className="font-mono text-[9px] text-vein-emerald opacity-80">{tier.yield}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
          <button
            type="button"
            disabled={!selectedTier}
            onClick={() => setStep('configure')}
            className="ui-action mt-2 w-full rounded-xl border border-vein-orange/40 bg-vein-orange/15 py-3 text-xs font-bold uppercase tracking-[0.16em] text-vein-orange transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2 — Configure */}
      {step === 'configure' && selectedTierData && (
        <div className="space-y-3">
          <article className={`vein-panel rounded-2xl border ${selectedTierData.border} bg-gradient-to-br ${selectedTierData.bg} via-slate-800/75 to-slate-800/55 p-4`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-display text-2xl ${selectedTierData.color}`}>{selectedTierData.rune}</span>
              <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${selectedTierData.color}`}>{selectedTierData.name}</p>
            </div>
            <div className="flex gap-3 mt-2">
              <span className={`font-mono text-[10px] ${selectedTierData.color} opacity-70`}>{selectedTierData.cost}</span>
              <span className="font-mono text-[10px] text-vein-emerald opacity-80">{selectedTierData.yield}</span>
            </div>
          </article>

          <div className="vein-panel rounded-2xl border border-slate-600 bg-slate-700/80 p-4 space-y-3">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-slate-300">Forge Parameters</p>
            <div className="space-y-2">
              <label className="block">
                <span className="mb-1 block text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">Royalty Yield Rate (%)</span>
                <input
                  type="number"
                  value={yieldRate}
                  onChange={(e) => setYieldRate(e.target.value)}
                  step="0.1"
                  min="0.1"
                  max="25"
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 font-mono text-sm text-white placeholder-slate-500 outline-none focus:border-vein-orange/60"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">Lock Duration (days)</span>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  step="30"
                  min="30"
                  max="1825"
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 font-mono text-sm text-white placeholder-slate-500 outline-none focus:border-vein-orange/60"
                />
              </label>
            </div>
            <div className="rounded-xl border border-vein-orange/15 bg-vein-orange/6 px-3 py-2 space-y-1">
              <p className="text-[10px] text-slate-400">Projected Annual Yield</p>
              <p className="font-mono text-sm font-bold text-vein-orange">
                {(parseFloat(yieldRate) * (selectedTierData.id === 'apex' ? 3.2 : selectedTierData.id === 'sovereign' ? 2.0 : 1.4)).toFixed(2)}% APY
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setStep('select')}
              className="rounded-xl border border-slate-600 bg-slate-800/60 py-3 text-xs text-slate-400 transition hover:bg-slate-700/60"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleForge}
              className="ui-action rounded-xl border border-vein-orange/40 bg-vein-orange/15 py-3 text-xs font-bold uppercase tracking-[0.16em] text-vein-orange"
            >
              Forge ᚦ
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Forging */}
      {step === 'forging' && (
        <article className="vein-panel rounded-2xl border border-vein-orange/30 bg-gradient-to-br from-vein-orange/10 via-slate-800/75 to-slate-800/55 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <span className="animate-pulse font-display text-5xl text-vein-orange">ᚦ</span>
          </div>
          <p className="font-display text-base text-slate-100">Forging Rights Instrument…</p>
          <p className="mt-2 font-mono text-[10px] text-slate-400">Assembling metadata · Binding on-chain · Signing devnet transaction</p>
          <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full w-full origin-left animate-pulse rounded-full bg-vein-orange/60" />
          </div>
        </article>
      )}

      {/* Step 4 — Complete */}
      {step === 'complete' && selectedTierData && (
        <div className="space-y-3">
          <article className="vein-panel rounded-2xl border border-vein-emerald/30 bg-gradient-to-br from-vein-emerald/10 via-slate-800/75 to-slate-800/55 p-5 text-center">
            <div className="mb-3 flex justify-center">
              <Sparkles size={28} className="text-vein-emerald" />
            </div>
            <p className="font-display text-base font-semibold text-vein-emerald">Forge Complete</p>
            <p className="mt-1 font-mono text-[10px] text-slate-400">{selectedTierData.name} forged on Solana devnet</p>
            <p className="mt-3 break-all font-mono text-[9px] text-slate-500">{forgeTx}</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-vein-gold/60">↑ Deposited to Vault</p>
          </article>

          <div className="grid grid-cols-2 gap-2">
            <div className="vein-panel rounded-2xl border border-vein-orange/20 bg-slate-700/80 p-3 text-center">
              <p className="font-mono text-xs font-bold text-vein-orange">{yieldRate}%</p>
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">Royalty Rate</p>
            </div>
            <div className="vein-panel rounded-2xl border border-vein-emerald/20 bg-slate-700/80 p-3 text-center">
              <p className="font-mono text-xs font-bold text-vein-emerald">{duration}d</p>
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">Lock Duration</p>
            </div>
          </div>

          <button
            type="button"
            onClick={reset}
            className="ui-action w-full rounded-xl border border-vein-orange/40 bg-vein-orange/15 py-3 text-xs font-bold uppercase tracking-[0.16em] text-vein-orange"
          >
            Forge Another
          </button>
        </div>
      )}
      <AbraxasPortal />
    </div>
  )
}

// ─── Tab: Vault ───────────────────────────────────────────────────────────────

function VaultTab({ assets }: { assets: VaultRightsAsset[] }) {
  const [selectedDuration, setSelectedDuration] = useState<StakeDuration>(90)
  const [stakeInput, setStakeInput] = useState('')
  const [isStaking, setIsStaking] = useState(false)
  const [stakes, setStakes] = useState<StakeRecord[]>([])
  const [showDetails, setShowDetails] = useState(false)

  const selectedConfig = STAKE_CONFIGS.find((c) => c.duration === selectedDuration)!
  const projectedRewards = (() => {
    const n = Number(stakeInput)
    if (!stakeInput || isNaN(n) || n <= 0) return 0
    return Math.round(n * (selectedConfig.multiplier - 1))
  })()
  const totalStaked = stakes.reduce((s, r) => s + r.veinAmount, 0)
  const totalProjected = stakes.reduce((s, r) => s + Math.round(r.veinAmount * r.multiplierBps / 10_000), 0)

  async function handleStake() {
    const amount = Number(stakeInput)
    if (!stakeInput || isNaN(amount) || amount <= 0) return
    setIsStaking(true)
    await new Promise((r) => setTimeout(r, 1800))
    setStakes((prev) => [
      ...prev,
      {
        id: `stake_${Date.now()}`,
        veinAmount: amount,
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
  }

  function daysLeft(unlocksAt: number) {
    const d = Math.ceil((unlocksAt - Date.now()) / 86_400_000)
    return d > 0 ? `${d}d left` : 'Unlocked'
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <article className="vein-panel rounded-2xl border border-vein-gold/25 bg-gradient-to-br from-vein-gold/8 via-slate-800/75 to-slate-800/55 p-5">
        <p className="mb-1 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-vein-gold">ᚱ Raido · Vein Vault</p>
        <h2 className="mb-2 font-display text-base font-semibold text-white">Mining Rights Sovereignty Vault</h2>
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1.5 text-xs text-vein-gold/70 transition hover:text-vein-gold"
        >
          <span>{showDetails ? 'Hide' : 'Show'} details</span>
          <span className={`inline-block transition-transform ${showDetails ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {showDetails && (
          <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300">
            <p>Once a mining rights NFT is minted in the Prospect tab, it is auto-deposited here. Royalty streams from extraction receipts accumulate and distribute to rights holders per epoch on Solana devnet.</p>
            <p className="text-vein-gold/80">Stake VEIN below to earn yield multipliers — from 1.25× up to 2.6× depending on lock duration.</p>
          </div>
        )}
      </article>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Rights Assets', value: assets.length.toString(),                          color: 'text-vein-gold'    },
          { label: 'VEIN Staked',   value: totalStaked ? totalStaked.toLocaleString() : '—', color: 'text-vein-purple'  },
          { label: 'Network',       value: 'Devnet',                                          color: 'text-vein-emerald' },
        ].map((m) => (
          <div key={m.label} className="vein-panel rounded-2xl border border-vein-gold/20 bg-slate-700/80 p-3 text-center">
            <p className={`font-mono text-sm font-bold ${m.color}`}>{m.value}</p>
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2">
        {['⇄ Swap', '↑ Deposit', '↓ Withdraw'].map((a) => (
          <button key={a} type="button" className="vein-panel rounded-2xl border border-white/8 bg-slate-700/80 p-3 text-center transition hover:bg-slate-700/80">
            <p className="text-xs font-semibold text-slate-200">{a}</p>
          </button>
        ))}
      </div>

      {/* Rights assets list */}
      <div className="space-y-3">
        {assets.length === 0 ? (
          <div className="rounded-2xl border border-vein-gold/20 bg-slate-800/70 p-6 text-center">
            <span className="mb-3 block font-display text-3xl text-vein-gold/30">ᚱ</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-vein-gold/50 mb-2">No Rights Deposited</p>
            <p className="text-xs text-slate-400">Mint rights in the Prospect tab to auto-deposit mining claims here.</p>
          </div>
        ) : (
          assets.map((asset) => (
            <article key={asset.id} className="vein-panel rounded-2xl border border-vein-gold/18 bg-slate-800/70 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-sm text-slate-100">{asset.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-slate-500">{asset.rightsClass}</p>
                  <p className="mt-1 font-mono text-[10px] text-vein-cyan">{asset.rightsToken}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-lg text-vein-gold">${formatCurrency(asset.estimateValue)}</p>
                  <p className="font-mono text-[10px] text-vein-emerald">{asset.royaltyRate.toFixed(1)}% royalty</p>
                  <p className="mt-0.5 font-mono text-[9px] text-slate-600">{new Date(asset.mintedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* VEIN Staking header */}
      <article className="vein-panel rounded-2xl border border-vein-purple/40 bg-gradient-to-br from-vein-purple/12 via-slate-800/90 to-slate-800/80 p-5">
        <p className="mb-1 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-vein-purple">ᚨ Ansuz · VEIN Staking</p>
        <h3 className="mb-1 font-display text-sm font-semibold text-white">Lock &amp; Earn Multiplied Extraction Yield</h3>
        <p className="text-[11px] text-slate-300">Stake VEIN for 30, 90, or 180 days. Multipliers: 1.25× → 1.85× → 2.6×</p>
      </article>

      {/* Stake stats */}
      {stakes.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Staked',    value: totalStaked.toLocaleString(),    color: 'text-vein-gold'    },
            { label: 'Projected', value: totalProjected.toLocaleString(), color: 'text-vein-purple'  },
            { label: 'Active',    value: String(stakes.filter((s) => s.isActive).length), color: 'text-vein-emerald' },
          ].map((m) => (
            <div key={m.label} className="vein-panel rounded-2xl border border-vein-purple/25 bg-slate-700/80 p-3 text-center">
              <p className={`font-mono text-sm font-bold ${m.color}`}>{m.value}</p>
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Duration selector */}
      <div className="grid grid-cols-3 gap-2">
        {STAKE_CONFIGS.map((cfg) => (
          <button
            key={cfg.duration}
            type="button"
            onClick={() => setSelectedDuration(cfg.duration)}
            className={`vein-panel rounded-2xl border p-3 text-center transition ${
              selectedDuration === cfg.duration
                ? 'border-vein-gold/70 bg-vein-gold/16 text-vein-gold'
                : 'border-slate-600 bg-slate-700/80 text-slate-300 hover:border-vein-gold/35 hover:bg-slate-700/80'
            } ${cfg.highlight ? 'ring-1 ring-vein-gold/25' : ''}`}
          >
            <p className={`font-mono text-xs font-bold ${selectedDuration === cfg.duration ? 'text-vein-gold' : 'text-slate-400'}`}>{cfg.label}</p>
            <p className={`mt-0.5 font-bold text-base ${selectedDuration === cfg.duration ? 'text-vein-gold' : 'text-slate-500'}`}>{cfg.multiplier}×</p>
            <p className="mt-0.5 text-[9px] leading-tight text-slate-500">{cfg.desc}</p>
          </button>
        ))}
      </div>

      {/* Stake input */}
      <div className="vein-panel rounded-2xl border border-vein-purple/30 bg-slate-700/80 p-4 space-y-3">
        <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-slate-300">Stake VEIN</p>
        <div className="relative">
          <input
            type="number"
            value={stakeInput}
            onChange={(e) => setStakeInput(e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-3 pr-16 font-mono text-sm text-white placeholder-slate-500 outline-none focus:border-vein-purple/60"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-vein-purple/60">VEIN</span>
        </div>
        {projectedRewards > 0 && (
          <div className="rounded-xl border border-vein-gold/15 bg-vein-gold/6 px-3 py-2">
            <p className="text-[10px] text-slate-300">Projected rewards after {selectedConfig.label}</p>
            <p className="font-mono text-sm font-bold text-vein-gold">+{projectedRewards.toLocaleString()} VEIN</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => void handleStake()}
          disabled={isStaking || !stakeInput || Number(stakeInput) <= 0}
          className="ui-action w-full rounded-xl border border-vein-gold/40 bg-vein-gold/15 py-3 text-xs font-bold uppercase tracking-[0.16em] text-vein-gold transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isStaking ? 'Staking…' : `Lock ${selectedConfig.label} · ${selectedConfig.multiplier}×`}
        </button>
      </div>

      {/* Active stakes */}
      {stakes.length > 0 && (
        <div className="space-y-2">
          <p className="px-1 text-[10px] font-mono font-semibold uppercase tracking-[0.22em] text-slate-400">Your Stakes</p>
          {stakes.map((s) => (
            <div key={s.id} className="vein-panel rounded-2xl border border-slate-600 bg-slate-700/80 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-sm font-bold text-vein-gold">
                    {s.veinAmount.toLocaleString()} <span className="font-normal text-xs text-vein-gold/50">VEIN</span>
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {s.lockDays}-day lock · {(s.multiplierBps / 10_000).toFixed(2)}× · {daysLeft(s.unlocksAt)}
                  </p>
                  {s.claimedRewards > 0 && (
                    <p className="mt-0.5 font-mono text-[10px] text-vein-emerald">✓ Claimed +{s.claimedRewards.toLocaleString()} VEIN</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  {s.isActive ? (
                    <button
                      type="button"
                      onClick={() => setStakes((prev) => prev.map((r) => r.id === s.id ? { ...r, isActive: false } : r))}
                      className="rounded-xl border border-slate-600 px-3 py-1.5 text-[10px] font-semibold text-slate-400 transition hover:bg-slate-800/50"
                    >
                      Unstake
                    </button>
                  ) : s.claimedRewards === 0 ? (
                    <button
                      type="button"
                      onClick={() => setStakes((prev) => prev.map((r) => r.id === s.id && !r.isActive ? { ...r, claimedRewards: Math.round(r.veinAmount * (r.multiplierBps / 10_000 - 1)) } : r))}
                      className="ui-action rounded-xl border border-vein-emerald/40 bg-vein-emerald/15 px-3 py-1.5 text-[10px] font-bold text-vein-emerald"
                    >
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

      {/* Upcoming vault classes */}
      <article className="vein-panel rounded-2xl border border-slate-600 bg-slate-700/80 p-4">
        <p className="mb-3 text-[10px] font-mono font-semibold uppercase tracking-[0.22em] text-slate-300">Upcoming Vault Classes</p>
        <div className="space-y-2">
          {[
            { title: 'Terrestrial Mineral Rights', desc: 'Tokenize earth-based ore body claims and route extraction royalties on-chain.',     status: 'coming_soon' },
            { title: 'Rare Earth Element Vaults',  desc: 'Sovereignty packaging for REE deposits with supply restriction contracts.',          status: 'blueprint'   },
            { title: 'Asteroid Belt Corridors',    desc: 'Multi-body mining route rights for coordinated extraction fleet packages.',          status: 'blueprint'   },
          ].map((ac) => (
            <div key={ac.title} className="rounded-xl border border-vein-gold/20 bg-slate-800/70 px-3 py-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-xs font-medium text-slate-200">{ac.title}</p>
                <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${ac.status === 'coming_soon' ? 'border-vein-gold/30 bg-vein-gold/10 text-vein-gold' : 'border-slate-500/60 bg-slate-700/60 text-slate-400'}`}>
                  {ac.status === 'coming_soon' ? 'Coming Soon' : 'Blueprint'}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400">{ac.desc}</p>
            </div>
          ))}
        </div>
      </article>
      <AbraxasPortal />
    </div>
  )
}

// ─── Tab: Chain ───────────────────────────────────────────────────────────────

function ChainTab() {
  const { connected } = useWallet()
  const stats = [
    { label: 'Network',        value: 'Solana Devnet', Icon: Orbit       },
    { label: 'Rights Minted',  value: '0',             Icon: Gem         },
    { label: 'TVL',            value: '$0.00',         Icon: Coins       },
    { label: 'Active Vaults',  value: '0',             Icon: DatabaseZap },
    { label: 'Rights Holders', value: '0',             Icon: ShieldCheck },
    { label: 'Royalties Paid', value: '$0.00',         Icon: Waves       },
  ]
  return (
    <div className="space-y-4 pb-20">
      <article className="vein-panel rounded-2xl border border-vein-purple/25 bg-gradient-to-br from-vein-purple/8 via-slate-800/75 to-slate-800/55 p-5">
        <p className="mb-2 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-vein-purple/80">ᛟ Othala · Chain Observatory</p>
        <h2 className="mb-3 font-display text-base font-semibold leading-tight text-slate-100">Live Protocol Dashboard</h2>
        <p className="text-xs leading-relaxed text-slate-400">All activity on Solana devnet. No real assets or capital at risk. Mock execution paths — ready for mainnet program deployment.</p>
      </article>

      <article className="vein-panel rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">vein.devnet</p>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vein-emerald" />
            <span className="font-mono text-[10px] text-vein-emerald/80">connected</span>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-xl border border-vein-gold/10 bg-slate-800/50 p-3">
              <p className="mb-1 flex items-center gap-1.5 text-[10px] text-slate-600">
                <Icon className="h-3 w-3" /> {label}
              </p>
              <p className="font-mono text-sm font-semibold text-vein-gold">{value}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="vein-panel rounded-2xl border border-white/12 bg-slate-800/65 p-4">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-vein-gold/75">RPC Configuration</p>
        <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.22em]">
          {[
            { k: 'Endpoint', v: 'https://api.devnet.solana.com', c: 'text-vein-cyan'    },
            { k: 'Wallet',   v: connected ? 'Connected' : 'Awaiting', c: connected ? 'text-vein-emerald' : 'text-vein-gold/70' },
            { k: 'Mint',     v: 'BlackBox NFT preview', c: 'text-vein-purple'  },
            { k: 'Vault',    v: 'Vein Treasury',       c: 'text-vein-orange'  },
          ].map(({ k, v, c }) => (
            <div key={k} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/6 px-3 py-2.5">
              <span className="text-slate-500">{k}</span>
              <span className={c}>{v}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="vein-panel rounded-2xl border border-white/12 bg-slate-800/65 p-4">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-vein-gold/75">Execution Sequence</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { Icon: Radar,       title: 'Ingest Asterank Feed',     text: 'Pull live records, filter viable bodies, rank by extraction upside.' },
            { Icon: Gem,         title: 'Assemble Rights Metadata', text: 'Bind value, composition, and royalty terms into Vein NFT metadata.' },
            { Icon: Coins,       title: 'Mint BlackBox NFT',         text: 'Generate the SPL token identity and rights packet on Solana devnet.' },
            { Icon: DatabaseZap, title: 'Auto-Vault Deposit',       text: 'Route the mock treasury seed into the Vein vault for reserve capitalization.' },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/6 p-4">
              <Icon className="h-4 w-4 text-vein-cyan" />
              <h4 className="mt-3 font-display text-base text-stone-100">{title}</h4>
              <p className="mt-2 text-[11px] leading-5 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </article>
      <AbraxasPortal />
    </div>
  )
}

// ─── Tab: Protocol ────────────────────────────────────────────────────────────

function ProtocolTab() {
  const pillars = [
    { rune: 'ᚠ', name: 'Fehu · Prospect',   color: 'text-vein-gold',    border: 'border-vein-gold/20',    desc: 'Fehu is the rune of raw wealth. The Prospect engine ingests live Asterank data, ranks bodies by extraction potential, and stages the winning claims for on-chain tokenization.' },
    { rune: 'ᚱ', name: 'Raido · Vault',     color: 'text-vein-cyan',    border: 'border-vein-cyan/20',    desc: 'Raido governs the journey. The Vein Vault holds minted mining rights, routes royalty streams, and distributes yield to rights holders per devnet epoch.' },
    { rune: 'ᛟ', name: 'Othala · Chain',    color: 'text-vein-purple',  border: 'border-vein-purple/20',  desc: 'Othala is inherited land made sovereign. The Chain Observatory tracks every tokenized mining body, vault deposit, and extraction receipt in real-time on Solana.' },
    { rune: 'ᛉ', name: 'Algiz · Claims',    color: 'text-vein-emerald', border: 'border-vein-emerald/20', desc: 'Algiz holds the sacred boundary. On-chain governance over extraction rights, royalty schedules, and corridor arbitration. Rights holders claim sovereignty, not intermediaries.' },
  ]
  return (
    <div className="space-y-4 pb-20">
      <article className="vein-panel rounded-2xl border border-vein-gold/25 bg-gradient-to-br from-vein-gold/8 via-slate-800/75 to-slate-800/55 p-5">
        <p className="mb-2 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-vein-gold/80">ᛋ Sowilo · The Protocol</p>
        <h2 className="mb-3 font-display text-base font-semibold leading-tight text-slate-100">Four Runes of the Sovereign Extractor</h2>
        <p className="text-xs leading-relaxed text-slate-400">Vein binds mineral and asteroid reserves to on-chain sovereignty through four Elder Futhark runes — each governing a stage of the extraction stack.</p>
      </article>
      {pillars.map((p) => (
        <article key={p.name} className={`vein-panel rounded-2xl border ${p.border} bg-slate-900/60 p-4`}>
          <div className="mb-2 flex items-center gap-2">
            <span className={`font-display text-2xl font-black ${p.color}`}>{p.rune}</span>
            <p className={`text-[10px] font-mono font-semibold uppercase tracking-[0.22em] ${p.color} opacity-80`}>{p.name}</p>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">{p.desc}</p>
        </article>
      ))}
      <AbraxasPortal />
    </div>
  )
}

// ─── Tab: Claims ──────────────────────────────────────────────────────────────

function ClaimsTab() {
  const proposals = [
    { rune: 'ᚠ', title: 'Asteroid Belt Corridor Rights',    desc: 'Define sovereign extraction corridors across the main belt for multi-body mission packages.',                  status: 'blueprint'   },
    { rune: 'ᚱ', title: 'Royalty Rate Governance',          desc: 'On-chain vote to adjust base royalty rates across all BlackBox mining rights NFTs each epoch.',                status: 'coming_soon' },
    { rune: 'ᛟ', title: 'Terrestrial Mineral Claims Layer', desc: 'Expand Vein to cover earth-based ore bodies, rare earths, and carbon credits under the same vault standard.', status: 'blueprint'   },
  ]
  return (
    <div className="space-y-4 pb-20">
      <article className="vein-panel rounded-2xl border border-vein-emerald/20 bg-gradient-to-br from-vein-emerald/6 via-slate-800/75 to-slate-800/55 p-5">
        <p className="mb-2 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-vein-emerald/80">ᛉ Algiz · Claims Warden</p>
        <h2 className="mb-3 font-display text-base font-semibold leading-tight text-slate-100">Sovereign Claim Governance</h2>
        <p className="text-xs leading-relaxed text-slate-400">Algiz stands watch over all extraction claims. Token holders govern corridor rights, royalty schedules, and dispute arbitration on-chain. No intermediaries hold the boundary.</p>
      </article>

      <article className="vein-panel rounded-2xl border border-slate-700/30 bg-slate-800/55 p-8 text-center">
        <span className="mb-3 block font-display text-4xl text-vein-emerald/30">ᛉ</span>
        <p className="font-display text-sm text-slate-400">Governance module launches with Mainnet.</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-vein-emerald/40">Available on Mainnet Launch</p>
      </article>

      <div className="space-y-3">
        <p className="px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Pending Proposals</p>
        {proposals.map((p) => (
          <article key={p.title} className="vein-panel rounded-2xl border border-vein-gold/15 bg-slate-900/60 p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="shrink-0 font-display text-xl text-vein-gold/60">{p.rune}</span>
                <p className="text-xs font-semibold text-slate-200">{p.title}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${p.status === 'coming_soon' ? 'border-vein-gold/30 bg-vein-gold/10 text-vein-gold' : 'border-slate-500/60 bg-slate-700/60 text-slate-400'}`}>
                {p.status === 'coming_soon' ? 'Soon' : 'Blueprint'}
              </span>
            </div>
            <p className="text-[10px] leading-relaxed text-slate-400">{p.desc}</p>
          </article>
        ))}
      </div>
      <AbraxasPortal />
    </div>
  )
}

// ─── dApp Shell (Aurelia pattern) ─────────────────────────────────────────────

function VeinDAppShell({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<DAppTab>('forge')
  const [vaultAssets, setVaultAssets] = useState<VaultRightsAsset[]>([])
  const mainRef = useRef<HTMLElement>(null)

  function switchTab(t: DAppTab) {
    setTab(t)
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }

  function handleDeposit(asset: VaultRightsAsset) {
    setVaultAssets((prev) => {
      if (prev.some((a) => a.rightsToken === asset.rightsToken)) return prev
      return [...prev, asset]
    })
  }

  return (
    <div className="relative mx-auto flex h-[100dvh] min-h-0 w-full max-w-lg flex-col overflow-hidden">
      {/* Layered backgrounds */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[#08111f]" />
      <div className="pointer-events-none fixed -top-28 left-1/4 -z-20 h-96 w-96 -translate-x-1/2 rounded-full bg-vein-gold/12 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 -right-28 -z-20 h-80 w-80 rounded-full bg-vein-purple/15 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/2 -z-20 h-80 w-80 -translate-x-1/2 rounded-full bg-vein-cyan/10 blur-3xl" />
      <LightBeams />
      <ParticleField />

      {/* Fixed header */}
      <header className="sticky top-0 z-50 flex-none border-b border-vein-gold/15 bg-slate-950/85 backdrop-blur-xl">
        {/* Top row: logo + wallet */}
        <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 transition-opacity hover:opacity-75"
          >
            <img src="/vein-icon.svg" alt="Vein" className="h-7 w-7 rounded-lg" />
            <span className="font-display text-sm tracking-[0.12em] text-stone-100">VEIN</span>
          </button>
          <WalletButton compact />
        </div>
        {/* Rune nav — full-width separate row */}
        <div className="flex items-center gap-0 overflow-x-auto border-t border-white/5 px-4 pb-2 pt-1.5 scrollbar-none">
          {TABS.map((t, i) => (
            <Fragment key={t.id}>
              <button
                type="button"
                onClick={() => switchTab(t.id)}
                className={`whitespace-nowrap text-[10px] transition-colors ${tab === t.id ? 'text-vein-gold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {t.rune} {t.label}
              </button>
              {i < TABS.length - 1 && <span className="mx-2 text-slate-700">·</span>}
            </Fragment>
          ))}
        </div>
      </header>

      {/* Scrollable content */}
      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto overscroll-y-none px-4 py-4 [touch-action:pan-y]">
        {tab === 'prospect' && <ProspectTab onDeposit={handleDeposit} />}
        {tab === 'vault'    && <VaultTab assets={vaultAssets} />}
        {tab === 'orbital'  && <OrbitalTab />}
        {tab === 'forge'    && <ForgeTab onDeposit={handleDeposit} />}
        {tab === 'chain'    && <ChainTab />}
        {tab === 'protocol' && <ProtocolTab />}
        {tab === 'claims'   && <ClaimsTab />}
      </main>

      {/* Bottom tab nav */}
      <nav className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 flex-none border-t border-vein-gold/15 bg-slate-950 shadow-[0_-8px_24px_rgba(2,3,10,1)]">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => switchTab(t.id)}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 transition-colors duration-200 ${tab === t.id ? 'text-vein-gold' : 'text-slate-600 hover:text-slate-400'}`}
          >
            <span className={`font-display text-lg leading-none transition-all duration-200 ${tab === t.id ? 'scale-110' : ''}`}>{t.rune}</span>
            <span className="text-[9px] font-mono uppercase tracking-widest">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <WalletContextProvider>
      <VeinShell />
    </WalletContextProvider>
  )
}

function VeinShell() {
  const [phase, setPhase] = useState<Phase>('loading')

  return (
    <>
      {phase === 'loading' && <LoadingScreen onDone={() => setPhase('landing')} />}
      {phase === 'landing' && <LandingPage onEnter={() => setPhase('dapp')} />}
      {phase === 'dapp' && <VeinDAppShell onBack={() => setPhase('landing')} />}
    </>
  )
}
