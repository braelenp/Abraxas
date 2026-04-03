import { useState } from 'react'
import { Upload, CheckCircle, Flame, Sparkles, FileText, Shield, ArrowRight } from 'lucide-react'
import { AbraxasCallout } from './AbraxasCallout'

type MintStep = 'upload' | 'attestation' | 'confirm' | 'complete'

interface UploadedFile {
  name: string
  size: number
  type: string
}

export function MintAgent() {
  const [step, setStep] = useState<MintStep>('upload')
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [loading, setLoading] = useState(false)
  const [tokenSymbol, setTokenSymbol] = useState('NIL')
  const [tokenSupply, setTokenSupply] = useState('1000000')
  const [athleteName, setAthleteName] = useState('')
  const [dealValue, setDealValue] = useState('')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
      })
    }
  }

  const handleMint = async () => {
    setLoading(true)
    // Simulate blockchain interaction
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStep('complete')
    setLoading(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Panel header */}
      <div className="mb-6 md:mb-8 flex items-center gap-2 md:gap-3 pb-3 md:pb-4 border-b border-red-400/20">
        <div className="text-xl md:text-2xl">ᛏ</div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-red-300">Tiwaz Protocol</h3>
          <p className="text-xs text-slate-500">NIL Tokenization Engine</p>
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-4 md:space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-red-200 mb-2">Tokenize an Athlete NIL or Equity Deal</h2>
          <p className="text-xs md:text-sm text-slate-400">
            Upload proof of an NIL agreement, endorsement contract, or equity arrangement. Legacy mints it as a sovereign SPL token and auto-deposits it into a Legacy-managed vault on Solana devnet.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-1.5 md:gap-2 mb-6 md:mb-8">
          {(['upload', 'attestation', 'confirm', 'complete'] as const).map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-colors ${
                (
                  ['upload', 'attestation', 'confirm', 'complete'].indexOf(step) >=
                  ['upload', 'attestation', 'confirm', 'complete'].indexOf(s)
                )
                  ? 'bg-red-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        {step === 'upload' && (
          <div className="space-y-4">
            <label className="block">
              <div className="glow-panel border-2 border-dashed border-red-400/30 hover:border-red-400/50 cursor-pointer transition-colors text-center p-6 md:p-8">
                {uploadedFile ? (
                  <div className="space-y-2 md:space-y-3">
                    <FileText className="w-8 md:w-10 h-8 md:h-10 text-red-400 mx-auto" />
                    <div className="text-xs md:text-sm text-slate-300">{uploadedFile.name}</div>
                    <div className="text-xs text-slate-500">{(uploadedFile.size / 1024).toFixed(2)} KB</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setUploadedFile(null)
                      }}
                      className="text-xs text-red-400 hover:text-red-300 mt-2"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3">
                    <Upload className="w-8 md:w-10 h-8 md:h-10 text-red-400 mx-auto" />
                    <div className="text-xs md:text-sm font-medium text-slate-300">Upload NIL Contract</div>
                    <div className="text-xs text-slate-500">PDF, DOC, or image (max 10MB)</div>
                  </div>
                )}
              </div>
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.jpg,.png" />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="text-xs text-slate-400 font-mono mb-2 block">Athlete Name</label>
                <input
                  type="text"
                  value={athleteName}
                  onChange={(e) => setAthleteName(e.target.value)}
                  placeholder="e.g., Alex Champion"
                  className="w-full px-3 py-2 md:py-3 bg-slate-900/50 border border-red-400/20 rounded text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 touch-manipulation"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-mono mb-2 block">Deal Value (USD)</label>
                <input
                  type="number"
                  value={dealValue}
                  onChange={(e) => setDealValue(e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full px-3 py-2 md:py-3 bg-slate-900/50 border border-red-400/20 rounded text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 touch-manipulation"
                />
              </div>
            </div>

            <button
              onClick={() => uploadedFile && athleteName && dealValue && setStep('attestation')}
              disabled={!uploadedFile || !athleteName || !dealValue}
              className="w-full px-4 py-3 md:py-4 bg-red-500/20 border border-red-400/50 text-red-300 rounded font-medium hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
            >
              <span>Continue to Self-Attestation</span>
              <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
            </button>
          </div>
        )}

        {step === 'attestation' && (
          <div className="space-y-4">
            <div className="glow-panel p-4 md:p-6 border border-red-400/20">
              <h4 className="font-semibold text-red-300 mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                <Shield className="w-4 h-4" />
                Self-Attestation
              </h4>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300">
                <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-red-400 flex-shrink-0" />
                  <span>I certify this document is authentic and represents a valid NIL, endorsement, or equity agreement.</span>
                </label>
                <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-red-400 flex-shrink-0" />
                  <span>I have authority to tokenize this agreement and deposit it into the Legacy vault.</span>
                </label>
                <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 accent-red-400 flex-shrink-0" />
                  <span>I understand this token represents fractional equity and creates on-chain liabilities.</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => setStep('upload')}
                className="flex-1 px-4 py-3 md:py-4 bg-slate-900/50 border border-slate-700 text-slate-300 rounded font-medium hover:bg-slate-900 transition-colors text-sm md:text-base touch-manipulation"
              >
                Back
              </button>
              <button
                onClick={() => setStep('confirm')}
                className="flex-1 px-4 py-3 md:py-4 bg-red-500/20 border border-red-400/50 text-red-300 rounded font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
              >
                <span>Proceed to Mint</span>
                <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-4">
            <div className="glow-panel p-4 md:p-6 border border-red-400/20 space-y-4">
              <h4 className="font-semibold text-red-300 mb-2 md:mb-3 text-sm md:text-base">TOKEN PREVIEW</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Athlete</div>
                  <div className="text-red-300 font-mono break-all">{athleteName}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Deal Value</div>
                  <div className="text-red-300 font-mono">${dealValue}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Token Symbol</div>
                  <input
                    type="text"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                    className="font-mono text-red-300 bg-slate-900/50 border border-red-400/20 rounded px-2 py-2 text-xs w-full touch-manipulation"
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Initial Supply</div>
                  <input
                    type="number"
                    value={tokenSupply}
                    onChange={(e) => setTokenSupply(e.target.value)}
                    className="font-mono text-red-300 bg-slate-900/50 border border-red-400/20 rounded px-2 py-2 text-xs w-full touch-manipulation"
                  />
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded p-3 text-xs">
                <div className="text-slate-500 mb-1">Estimated Tx Hash (devnet)</div>
                <div className="font-mono text-red-400 break-all text-xs">{generateMockHash().substring(0, 44)}</div>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-400/20 rounded p-3 md:p-4 text-xs text-slate-400">
              <p className="mb-2">
                <strong className="text-red-300">Ready to mint?</strong> Clicking "Mint Token" will sign a simulated Solana devnet transaction to create your SPL token.
              </p>
              <p className="text-xs text-slate-500">No real transaction cost on devnet. Auto-deposits into Legacy vault upon confirmation.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => setStep('attestation')}
                className="flex-1 px-4 py-3 md:py-4 bg-slate-900/50 border border-slate-700 text-slate-300 rounded font-medium hover:bg-slate-900 transition-colors text-sm md:text-base touch-manipulation"
              >
                Back
              </button>
              <button
                onClick={handleMint}
                disabled={loading}
                className="flex-1 px-4 py-3 md:py-4 bg-red-500 border border-red-400 text-white rounded font-medium hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-3 md:w-4 h-3 md:h-4 animate-spin" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Flame className="w-3 md:w-4 h-3 md:h-4" />
                    Mint Token
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-4">
            <div className="glow-panel p-6 md:p-8 border border-red-400/40 text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="w-10 md:w-12 h-10 md:h-12 text-red-400" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-red-300 mb-2">NIL Tokenized Successfully</h4>
                <p className="text-xs md:text-sm text-slate-400">
                  Your {tokenSymbol} token has been minted and auto-deposited into the Legacy Vault on Solana devnet.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded p-3 text-left text-xs">
                <div className="text-slate-500 mb-1">TOKEN DETAILS</div>
                <div className="space-y-1 font-mono text-slate-300">
                  <div>Symbol: {tokenSymbol}</div>
                  <div>Supply: {Number(tokenSupply).toLocaleString()}</div>
                  <div>Athlete: {athleteName}</div>
                  <div>Status: Auto-vaulted on devnet</div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    setStep('upload')
                    setUploadedFile(null)
                    setAthleteName('')
                    setDealValue('')
                    setTokenSymbol('NIL')
                    setTokenSupply('1000000')
                  }}
                  className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700 text-slate-300 rounded font-medium hover:bg-slate-900 transition-colors"
                >
                  Mint Another
                </button>
                <button className="flex-1 px-4 py-3 bg-red-500/20 border border-red-400/50 text-red-300 rounded font-medium hover:bg-red-500/30 transition-colors">
                  View in Vault
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AbraxasCallout />
    </div>
  )
}

function generateMockHash(): string {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
