import React, { useRef, useState } from 'react'
import {
  Upload, CheckCircle, Flame, Sparkles, FileText, Shield,
} from 'lucide-react'

// ─── Aurelia Forge — mirrors Abraxas ForgePage.tsx exactly ───────────────────

const STEPS = [
  { n: 1, label: 'Upload asset proof' },
  { n: 2, label: 'Self-attestation' },
  { n: 3, label: 'Mint SPL Token' },
  { n: 4, label: 'Auto-deposit into Sophia vault' },
]

export default function ForgeAgent() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [attested, setAttested] = useState(false)
  const [minted, setMinted] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [txHash, setTxHash] = useState('')

  const handleFiles = (picked: FileList | null) => {
    if (!picked) return
    setFiles(Array.from(picked))
    if (currentStep === 1) setCurrentStep(2)
  }

  const handleAttest = () => {
    setAttested(true)
    setCurrentStep(3)
  }

  const handleMint = () => {
    setIsMinting(true)
    setTimeout(() => {
      const hash = Array.from({ length: 44 }, () =>
        '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'[
          Math.floor(Math.random() * 58)
        ]
      ).join('')
      setTxHash(hash)
      setIsMinting(false)
      setMinted(true)
      setCurrentStep(4)
    }, 2200)
  }

  const handleReset = () => {
    setFiles([])
    setCurrentStep(1)
    setAttested(false)
    setMinted(false)
    setIsMinting(false)
    setTxHash('')
  }

  const firstFile = files[0]
  const previewUrl = firstFile && firstFile.type.startsWith('image/')
    ? URL.createObjectURL(firstFile)
    : null

  return (
    <div className="space-y-4 pb-8">

      {/* ── Begin Tokenization card ── */}
      <article className="glow-panel rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
        <div className="mb-3 flex items-center gap-3">
          <Flame size={20} className="shrink-0 text-amber-300" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/80">Kenaz Protocol</p>
            <h2 className="text-base font-semibold leading-tight text-slate-100">Tokenize a Real Estate Asset</h2>
          </div>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-slate-400">
          Upload proof of ownership for any real estate asset. Aurelia mints it as a sovereign SPL token
          and auto-deposits it into a Sophia-managed vault on Solana devnet.
        </p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="ui-action inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500/25 to-yellow-500/15 px-4 py-3 text-sm font-bold uppercase tracking-wider text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.2)] transition hover:shadow-[0_0_32px_rgba(245,158,11,0.4)]"
        >
          <Sparkles size={15} />
          Begin Tokenization
        </button>
      </article>

      {/* ── Tokenization Flow step tracker ── */}
      <article className="glow-panel rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 backdrop-blur">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">Tokenization Flow</p>
        <ol className="space-y-2">
          {STEPS.map(({ n, label }) => {
            const done = currentStep > n
            const active = currentStep === n
            return (
              <li
                key={n}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                  active ? 'border border-amber-400/30 bg-amber-500/10' : 'border border-transparent'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition ${
                    done
                      ? 'bg-amber-400 text-slate-950'
                      : active
                        ? 'border border-amber-400/60 text-amber-300'
                        : 'border border-slate-600/60 text-slate-600'
                  }`}
                >
                  {done ? <CheckCircle size={13} /> : n}
                </span>
                <span
                  className={`text-xs ${
                    done ? 'text-slate-500 line-through' : active ? 'font-semibold text-slate-200' : 'text-slate-600'
                  }`}
                >
                  {label}
                </span>
                {active && <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />}
              </li>
            )
          })}
        </ol>
      </article>

      {/* ── Upload Asset Proof — step 1 ── */}
      <article className="glow-panel rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 backdrop-blur">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">Upload Asset Proof</p>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {files.length === 0 ? (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-slate-600/60 bg-slate-950/40 px-4 py-7 text-xs text-slate-500 transition hover:border-amber-400/40 hover:text-slate-400"
          >
            <Upload size={22} className="text-slate-600" />
            <span>Deed, Title, or Proof of Ownership</span>
            <span className="text-[10px] text-slate-600">PDF · JPG · PNG, devnet simulation</span>
          </button>
        ) : (
          <div className="space-y-2">
            {files.map((f) => (
              <div
                key={f.name}
                className="flex items-center gap-2 rounded-lg border border-slate-700/40 bg-slate-950/50 px-3 py-2"
              >
                <FileText size={13} className="shrink-0 text-amber-300/70" />
                <span className="truncate text-xs text-slate-300">{f.name}</span>
                <span className="ml-auto shrink-0 text-[10px] text-slate-500">{(f.size / 1024).toFixed(0)} KB</span>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-1 text-[10px] text-slate-500 underline underline-offset-2 hover:text-slate-400"
            >
              Add more files
            </button>
          </div>
        )}
      </article>

      {/* ── Self-Attestation — step 2 ── */}
      {currentStep >= 2 && !attested && (
        <article className="glow-panel rounded-2xl border border-amber-300/25 bg-slate-900/60 p-4 backdrop-blur">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">Self-Attestation</p>
          <p className="mb-4 text-xs leading-relaxed text-slate-400">
            I confirm I am the lawful owner of the asset represented in the uploaded documents.
            I understand this initiates an on-chain tokenization process on Solana devnet.
          </p>
          <div className="mb-4 space-y-2 rounded-xl border border-amber-400/10 bg-amber-400/4 p-3">
            {[
              'I am the legal owner or authorized agent',
              'The document is genuine and unaltered',
              'I consent to devnet tokenization of this asset',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                <span className="text-amber-400">✓</span> {item}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAttest}
            className="ui-action inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20"
          >
            <Shield size={14} />
            I Confirm Ownership
          </button>
        </article>
      )}

      {/* ── SPL Token Preview — step 3 ── */}
      {currentStep >= 3 && !minted && (
        <article className="glow-panel rounded-2xl border border-amber-300/25 bg-slate-900/60 p-4 backdrop-blur">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">SPL Token Preview</p>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-amber-400/25 bg-slate-950">
              {previewUrl ? (
                <img src={previewUrl} alt="Asset preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                  <FileText size={22} className="text-amber-400/40" />
                  <span className="font-serif text-xs text-amber-400/60">ARL</span>
                </div>
              )}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-amber-400/20" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-serif text-sm font-semibold text-slate-100">
                AURELIA-{firstFile?.name.replace(/\.[^.]+$/, '').slice(0, 8).toUpperCase() ?? '123MAIN'}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                {files.length} file{files.length !== 1 ? 's' : ''} attached
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
                {[['Supply', '420,000'], ['Decimals', '6'], ['$/token', '$1.00']].map(([l, v]) => (
                  <div key={l}>
                    <p className="text-slate-500">{l}</p>
                    <p className="font-mono text-amber-400">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleMint}
            disabled={isMinting}
            className="ui-action inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500/25 to-yellow-500/15 px-4 py-2.5 text-sm font-bold text-amber-100 shadow-[0_0_16px_rgba(245,158,11,0.2)] transition hover:shadow-[0_0_28px_rgba(245,158,11,0.38)] disabled:opacity-50"
          >
            <Flame size={14} />
            {isMinting ? 'Minting on Devnet…' : 'Forge this Asset into Sovereignty'}
          </button>
        </article>
      )}

      {/* ── Vault Success — step 4 ── */}
      {minted && (
        <article className="glow-panel rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 p-5 backdrop-blur text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/15">
            <CheckCircle size={22} className="text-amber-300" />
          </div>
          <p className="text-sm font-bold text-slate-100">SPL Token Minted</p>
          <p className="mt-1 text-xs text-slate-400">
            Your asset has been tokenized and auto-deposited into a Sophia-managed vault.
          </p>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Minted asset"
              className="mx-auto mt-4 h-28 w-28 rounded-xl border border-amber-400/25 object-cover shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            />
          )}
          {txHash && (
            <p className="mt-3 break-all font-mono text-[10px] text-amber-400/70">{txHash}</p>
          )}
          <p className="mt-2 text-[10px] font-mono text-amber-300/60 uppercase tracking-wider">
            Vault Assignment Pending Sophia Review
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-xs font-mono text-slate-400 transition hover:border-amber-400/30 hover:text-amber-400"
          >
            Tokenize Another Property
          </button>
        </article>
      )}

      {/* Abraxas callout */}
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

    </div>
  )
}
