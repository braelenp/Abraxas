import React, { useState, useCallback } from 'react'
import AbraxasCallout from '../AbraxasCallout'
import { Upload, CheckSquare, Cpu, Archive, CheckCircle, Loader } from 'lucide-react'

type Step = 'upload' | 'attest' | 'mint' | 'deposit' | 'done'

const MINT_DURATION = 2200

function fakeTxHash(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  return Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const GroveAgent: React.FC = () => {
  const [step, setStep]           = useState<Step>('upload')
  const [file, setFile]           = useState<File | null>(null)
  const [dragging, setDragging]   = useState(false)
  const [attested, setAttested]   = useState(false)
  const [minting, setMinting]     = useState(false)
  const [txHash, setTxHash]       = useState('')
  const [mintProgress, setMintProgress] = useState(0)

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }, [])

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  const handleMint = () => {
    setMinting(true)
    setMintProgress(0)
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / MINT_DURATION) * 100)
      setMintProgress(pct)
      if (pct >= 100) {
        clearInterval(interval)
        setTxHash(fakeTxHash())
        setMinting(false)
        setStep('deposit')
        setTimeout(() => setStep('done'), 1400)
      }
    }, 40)
  }

  const reset = () => {
    setStep('upload')
    setFile(null)
    setAttested(false)
    setTxHash('')
    setMintProgress(0)
  }

  const STEPS = [
    { id: 'upload',  icon: Upload,      label: 'Upload Proof' },
    { id: 'attest',  icon: CheckSquare, label: 'Self-Attest' },
    { id: 'mint',    icon: Cpu,         label: 'Mint Token' },
    { id: 'deposit', icon: Archive,     label: 'Deposit Vault' },
  ]

  const stepIdx = { upload: 0, attest: 1, mint: 2, deposit: 3, done: 3 }

  return (
    <div className="space-y-5">
      {/* Panel header */}
      <div
        className="rounded-xl p-5"
        style={{
          background: 'rgba(13,32,24,0.7)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-emerald-500/80 text-sm">ᚠ</span>
          <span className="font-mono text-[10px] tracking-[0.22em] text-emerald-600/70 uppercase">
            Fehu · Kenaz Verdant Protocol
          </span>
        </div>
        <h2 className="font-cinzel text-base font-semibold text-emerald-200/90 mb-1">
          Tokenize a Carbon Credit or Regenerative Land Asset
        </h2>
        <p className="text-xs text-slate-400/70 leading-relaxed">
          Upload proof of carbon credit issuance or land ownership for any regenerative asset. Verdant
          mints it as a sovereign SPL token and auto-deposits it into a Grove-managed vault on Solana
          devnet.
        </p>
      </div>

      {/* Step progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const current = stepIdx[step]
          const done    = i < current || step === 'done'
          const active  = i === current && step !== 'done'
          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: done
                      ? 'rgba(16,185,129,0.25)'
                      : active
                      ? 'rgba(16,185,129,0.14)'
                      : 'rgba(16,185,129,0.04)',
                    border: done
                      ? '1px solid rgba(16,185,129,0.7)'
                      : active
                      ? '1px solid rgba(16,185,129,0.45)'
                      : '1px solid rgba(16,185,129,0.12)',
                    boxShadow: active ? '0 0 10px rgba(16,185,129,0.2)' : 'none',
                  }}
                >
                  {done ? (
                    <CheckCircle size={13} className="text-emerald-400" />
                  ) : (
                    <s.icon size={13} style={{ color: active ? '#6ee7b7' : '#10b98155' }} />
                  )}
                </div>
                <span
                  className="font-mono text-[9px] tracking-wide hidden sm:block"
                  style={{ color: active ? '#6ee7b7' : done ? '#10b98199' : '#10b98133' }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px transition-all duration-500"
                  style={{
                    background: i < current ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.1)',
                  }}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Step panels */}
      {step === 'upload' && (
        <div className="space-y-4">
          <div
            className="rounded-xl p-6 text-center cursor-pointer transition-all duration-200"
            style={{
              background: dragging ? 'rgba(16,185,129,0.08)' : 'rgba(13,32,24,0.5)',
              border: `2px dashed ${dragging ? 'rgba(16,185,129,0.6)' : 'rgba(16,185,129,0.2)'}`,
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload size={28} className="mx-auto mb-3 text-emerald-500/60" />
            {file ? (
              <div>
                <p className="text-sm text-emerald-300/90 font-medium mb-1">{file.name}</p>
                <p className="font-mono text-[10px] text-emerald-600/60">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-400/80 mb-1">Drop asset proof here or click to browse</p>
                <p className="font-mono text-[10px] text-emerald-700/50">PDF · PNG · JPG · JSON · XML</p>
              </div>
            )}
            <input id="file-input" type="file" className="hidden" onChange={onFileInput} accept=".pdf,.png,.jpg,.jpeg,.json,.xml" />
          </div>

          <button
            disabled={!file}
            onClick={() => setStep('attest')}
            className="w-full py-2.5 font-grotesk text-xs font-semibold tracking-[0.12em] uppercase rounded-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(16,185,129,0.1))',
              border: '1px solid rgba(16,185,129,0.5)',
              color: '#a7f3d0',
            }}
          >
            Begin Carbon Tokenization
          </button>
        </div>
      )}

      {step === 'attest' && (
        <div className="space-y-4">
          <div
            className="rounded-xl p-5"
            style={{
              background: 'rgba(13,32,24,0.6)',
              border: '1px solid rgba(16,185,129,0.18)',
            }}
          >
            <p className="font-cinzel text-xs text-emerald-300/80 mb-4 tracking-wide">
              SELF-ATTESTATION — Asset Legitimacy
            </p>
            <div className="space-y-3">
              {[
                'I confirm this carbon credit or land asset is legally owned or authorized.',
                'The uploaded proof is authentic and unaltered.',
                'I understand this will mint an SPL token on Solana devnet.',
              ].map((txt, i) => (
                <label key={i} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={attested && i < 3}
                    onChange={() => setAttested(!attested)}
                    className="mt-0.5 accent-emerald-500"
                  />
                  <span className="text-xs text-slate-400/80 leading-relaxed group-hover:text-slate-300/80 transition-colors">
                    {txt}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <button
            disabled={!attested}
            onClick={() => setStep('mint')}
            className="w-full py-2.5 font-grotesk text-xs font-semibold tracking-[0.12em] uppercase rounded-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(16,185,129,0.1))',
              border: '1px solid rgba(16,185,129,0.5)',
              color: '#a7f3d0',
            }}
          >
            Confirm Attestation
          </button>
        </div>
      )}

      {step === 'mint' && (
        <div className="space-y-4">
          <div
            className="rounded-xl p-5 text-center"
            style={{
              background: 'rgba(13,32,24,0.6)',
              border: '1px solid rgba(16,185,129,0.18)',
            }}
          >
            {minting ? (
              <div>
                <Loader size={28} className="mx-auto mb-3 text-emerald-400 animate-spin" />
                <p className="text-sm text-emerald-300/80 mb-3">Minting sovereign SPL token…</p>
                <div className="w-full h-1.5 rounded-full bg-emerald-900/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-75"
                    style={{ width: `${mintProgress}%`, boxShadow: '0 0 8px rgba(16,185,129,0.5)' }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <Cpu size={28} className="mx-auto mb-3 text-emerald-500/70" />
                <p className="text-sm text-slate-400/80 mb-1">Ready to mint on Solana devnet</p>
                <p className="font-mono text-[10px] text-emerald-700/60">
                  Asset: {file?.name ?? 'Unknown'} · Network: Devnet
                </p>
              </div>
            )}
          </div>
          <button
            disabled={minting}
            onClick={handleMint}
            className="w-full py-2.5 font-grotesk text-xs font-semibold tracking-[0.12em] uppercase rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(16,185,129,0.1))',
              border: '1px solid rgba(16,185,129,0.5)',
              color: '#a7f3d0',
            }}
          >
            {minting ? 'Minting…' : 'Mint SPL Token'}
          </button>
        </div>
      )}

      {(step === 'deposit' || step === 'done') && (
        <div className="space-y-4">
          <div
            className="rounded-xl p-5"
            style={{
              background: 'rgba(13,32,24,0.6)',
              border: '1px solid rgba(16,185,129,0.35)',
              boxShadow: '0 0 20px rgba(16,185,129,0.07)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={18} className="text-emerald-400" />
              <span className="font-cinzel text-sm text-emerald-300/90">
                {step === 'done' ? 'Token Minted & Deposited' : 'Depositing into Grove Vault…'}
              </span>
            </div>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Asset</span>
                <span className="text-emerald-400/80 truncate ml-4 max-w-[180px]">{file?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Network</span>
                <span className="text-emerald-400/80">Solana Devnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Tx Hash</span>
                <span className="text-emerald-400/80 truncate ml-4 max-w-[180px]">
                  {txHash.slice(0, 18)}…
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700/70">Vault</span>
                <span className="text-emerald-400/80">Grove Vault</span>
              </div>
            </div>
          </div>

          {step === 'done' && (
            <button
              onClick={reset}
              className="w-full py-2.5 font-grotesk text-xs font-semibold tracking-[0.12em] uppercase rounded-md transition-all"
              style={{
                background: 'transparent',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#6ee7b7',
              }}
            >
              Tokenize Another Asset
            </button>
          )}
        </div>
      )}

      {/* Abraxas callout */}
      <AbraxasCallout />
    </div>
  )
}

export default GroveAgent
