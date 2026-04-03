import { useRef, useState } from 'react'
import EchoCallout from './EchoCallout'

/** Aurelia ForgeAgent pattern — adapted for music rights tokenization */

const STEPS = [
  { n: 1, label: 'Upload audio & stems' },
  { n: 2, label: 'Self-attestation' },
  { n: 3, label: 'Mint SPL Token' },
  { n: 4, label: 'Auto-deposit into Vault' },
]

export default function ForgeTab() {
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
      const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
      const hash = Array.from({ length: 44 }, () =>
        chars[Math.floor(Math.random() * chars.length)],
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

  return (
    <div className="space-y-4 pb-8">

      {/* ── Begin Tokenization card ── */}
      <article className="glow-panel rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/[0.14] via-slate-800/65 to-slate-800/45 p-5 backdrop-blur">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xl">♪</span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan/80">Kenaz · Forge Protocol</p>
            <h2 className="text-base font-semibold leading-tight text-slate-100">Tokenize a Music Asset</h2>
          </div>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-slate-300">
          Upload audio masters, stems, and rights documents. Echo mints a sovereign SPL token
          and auto-deposits it into a Sophia-managed vault on Solana devnet.
        </p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="ui-action inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/[0.10] px-4 py-2.5 text-sm font-semibold text-cyan transition hover:bg-cyan/20"
        >
          Upload Audio Files
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="audio/*,image/*,.pdf"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Step progress bar */}
        <div className="mt-4 flex gap-2">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                currentStep >= s.n ? 'bg-cyan' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </article>

      {/* ── File drop zone / file list ── */}
      {files.length === 0 ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-slate-600/60 bg-slate-950/40 px-4 py-7 text-xs text-slate-500 transition hover:border-cyan/40 hover:text-slate-400"
        >
          <span className="text-3xl">🎵</span>
          <span>Audio Masters, Stems, Artwork, or Rights PDF</span>
          <span className="text-[10px] text-slate-600">MP3 · WAV · FLAC · PDF · JPG · PNG — devnet simulation</span>
        </button>
      ) : (
        <div className="space-y-2">
          {files.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-2 rounded-lg border border-cyan/20 bg-slate-900/50 px-3 py-2"
            >
              <span className="text-xs">🎵</span>
              <p className="flex-1 truncate font-mono text-xs text-slate-300">{f.name}</p>
              <p className="text-[10px] text-slate-500">{(f.size / 1024).toFixed(0)} KB</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Self-attestation — step 2 ── */}
      {currentStep >= 2 && !attested && (
        <article className="glow-panel rounded-2xl border border-amber/25 bg-slate-800/55 p-4 backdrop-blur">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber/70">Self-Attestation</p>
          <p className="mb-4 text-xs leading-relaxed text-slate-300">
            I confirm I am the lawful creator or rights holder of the uploaded audio content.
            I understand this initiates an on-chain tokenization process on Solana devnet.
          </p>
          <div className="mb-4 space-y-2 rounded-xl border border-amber/10 bg-amber/[0.04] p-3">
            {[
              'I am the legal owner or authorized agent',
              'The files are genuine and unaltered',
              'I consent to devnet tokenization of this asset',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                <span className="text-amber">✓</span> {item}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAttest}
            className="ui-action inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber/40 bg-amber/[0.10] px-4 py-2.5 text-sm font-semibold text-amber/80 transition hover:bg-amber/20"
          >
            ♬ I Confirm Authorship
          </button>
        </article>
      )}

      {/* ── SPL Token Preview — step 3 ── */}
      {currentStep >= 3 && !minted && (
        <article className="glow-panel rounded-2xl border border-purple/25 bg-slate-800/55 p-4 backdrop-blur">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-purple/70">SPL Token Preview</p>
          <div className="mb-4 rounded-xl border border-slate-700 bg-slate-800/45 p-3">
            <p className="truncate font-display text-sm font-semibold text-slate-100">
              ECHO-{firstFile?.name.replace(/\.[^.]+$/, '').slice(0, 8).toUpperCase() ?? 'MYSONG01'}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500">
              {files.length} file{files.length !== 1 ? 's' : ''} attached · devnet
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
              {[['Supply', '1,000,000'], ['Decimals', '6'], ['$/token', '$0.01']].map(([l, v]) => (
                <div key={l}>
                  <p className="text-slate-500">{l}</p>
                  <p className="font-mono text-cyan">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleMint}
            disabled={isMinting}
            className="ui-action inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple/40 bg-purple/[0.10] px-4 py-2.5 text-sm font-semibold text-purple-300 transition hover:bg-purple/20 disabled:opacity-50"
          >
            {isMinting ? 'Minting…' : 'Sign & Mint on Devnet'}
          </button>
        </article>
      )}

      {/* ── Minted Success — step 4 ── */}
      {minted && (
        <article className="glow-panel rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/[0.14] to-purple/[0.08] p-5 backdrop-blur text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan/40 bg-cyan/[0.15]">
            <span className="text-xl text-cyan">✓</span>
          </div>
          <p className="text-sm font-bold text-slate-100">SPL Token Minted</p>
          <p className="mt-1 text-xs text-slate-300">
            Your music asset has been tokenized and auto-deposited into the Sophia-managed Echo vault.
          </p>
          {txHash && (
            <p className="mt-3 break-all font-mono text-[10px] text-cyan/70">{txHash}</p>
          )}
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-cyan/60">
            Vault Assignment Pending Sophia Review
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-xs font-mono text-slate-400 transition hover:border-cyan/30 hover:text-cyan"
          >
            Tokenize Another Track
          </button>
        </article>
      )}

      <EchoCallout />
    </div>
  )
}
