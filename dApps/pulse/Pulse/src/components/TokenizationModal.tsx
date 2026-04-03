import { X, Zap } from 'lucide-react'
import { useState } from 'react'
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder'

interface TokenizationModalProps {
  clipTitle: string
  creator: string
  thumbnail: string
  onClose: () => void
}

export function TokenizationModal(props: TokenizationModalProps) {
  const [step, setStep] = useState<'preview' | 'metadata' | 'revenue' | 'minting'>('preview')
  const [metadata, setMetadata] = useState({
    title: props.clipTitle,
    description: '',
    royaltyPercentage: 10,
  })
  const [isMinting, setIsMinting] = useState(false)
  const [mintedTx, setMintedTx] = useState<string | null>(null)

  const handleMint = async () => {
    setIsMinting(true)
    setStep('minting')
    
    // Simulate minting
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock transaction hash
    setMintedTx('0x' + Math.random().toString(16).slice(2, 10).toUpperCase() + '...')
    setIsMinting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={props.onClose} />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-purple-700/50 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-purple-700/30 bg-slate-900/95 backdrop-blur">
          <h2 className="text-xl font-bold text-purple-300 font-mono flex items-center gap-2">
            <Zap size={20} className="text-yellow-500" />
            Forge La Casa NFT
          </h2>
          <button
            onClick={props.onClose}
            className="text-slate-400 hover:text-purple-300 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 'preview' && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-mono text-slate-400 mb-2">Preview</p>
                <img
                  src={props.thumbnail}
                  alt={props.clipTitle}
                  className="w-full aspect-video object-cover rounded-lg border border-purple-700/30"
                  onError={(e) => {
                    e.currentTarget.src = PULSE_LOGO_URI
                  }}
                />
              </div>

              <div className="space-y-4 p-4 bg-purple-950/30 rounded-lg border border-purple-700/30">
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase mb-1">Title</p>
                  <p className="text-purple-300 font-semibold">{props.clipTitle}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase mb-1">Creator</p>
                  <p className="text-slate-300">{props.creator}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-slate-300">
                  Your clip will be minted as a <span className="text-purple-300 font-semibold">La Casa NFT</span> on Solana. 
                  Once minted, it's auto-deposited into your Sophia-managed vault for safekeeping and revenue generation.
                </p>
                <div className="p-3 bg-cyan-950/30 border border-cyan-700/30 rounded-lg">
                  <p className="text-xs font-mono text-cyan-300">
                    ✓ One-click minting • Auto-vault deposit • Instant ownership • Royalty split earnings
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep('metadata')}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold uppercase tracking-wider rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all"
              >
                Continue to Metadata
              </button>
            </div>
          )}

          {step === 'metadata' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-slate-400 uppercase mb-2">Title</label>
                <input
                  type="text"
                  value={metadata.title}
                  onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-purple-700/30 rounded-lg text-slate-200 font-mono text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-slate-400 uppercase mb-2">Description</label>
                <textarea
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-800 border border-purple-700/30 rounded-lg text-slate-200 font-mono text-sm focus:border-purple-500 focus:outline-none"
                  placeholder="Add details about this moment..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('preview')}
                  className="flex-1 px-4 py-3 border border-purple-700/50 text-purple-300 font-mono font-bold uppercase tracking-wider rounded-lg hover:bg-purple-600/10 transition-all active:scale-95"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('revenue')}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold uppercase tracking-wider rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all active:scale-95"
                >
                  Next: Revenue Split
                </button>
              </div>
            </div>
          )}

          {step === 'revenue' && (
            <div className="space-y-6">
              <div className="p-4 bg-purple-950/30 rounded-lg border border-purple-700/30">
                <p className="text-sm font-mono text-slate-400 uppercase mb-3">Creator Royalty %</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={metadata.royaltyPercentage}
                    onChange={(e) => setMetadata({ ...metadata, royaltyPercentage: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="text-2xl font-bold text-purple-300 min-w-12 text-right">
                    {metadata.royaltyPercentage}%
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  You'll earn {metadata.royaltyPercentage}% royalties every time this NFT is traded on secondary markets.
                </p>
              </div>

              <div className="space-y-3 p-4 bg-slate-800/50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Base Revenue (Initial Sale):</span>
                  <span className="text-purple-300 font-mono">100%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Secondary Royalties:</span>
                  <span className="text-purple-300 font-mono">{metadata.royaltyPercentage}%</span>
                </div>
                <div className="border-t border-purple-700/30 pt-3 flex justify-between text-sm font-bold">
                  <span className="text-slate-300">Total Earnings Potential:</span>
                  <span className="text-yellow-500">{100 + metadata.royaltyPercentage * 10}%</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('metadata')}
                  className="flex-1 px-4 py-3 border border-purple-700/50 text-purple-300 font-mono font-bold uppercase tracking-wider rounded-lg hover:bg-purple-600/10 transition-all active:scale-95"
                >
                  Back
                </button>
                <button
                  onClick={handleMint}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-mono font-bold uppercase tracking-wider rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap size={16} />
                  Mint NFT
                </button>
              </div>
            </div>
          )}

          {step === 'minting' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              {isMinting ? (
                <>
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-700/30" />
                    <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-300 mb-2">Forging La Casa NFT...</p>
                    <p className="text-sm text-slate-400 font-mono">Minting your sacred moment on Solana</p>
                  </div>
                </>
              ) : mintedTx ? (
                <>
                  <div className="w-16 h-16 bg-green-600/20 border border-green-500/50 rounded-full flex items-center justify-center">
                    <Zap size={32} className="text-green-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-400 mb-2">NFT Successfully Minted!</p>
                    <p className="text-sm text-slate-400 font-mono mb-4">Tx: {mintedTx}</p>
                    <p className="text-sm text-slate-300">Your clip is now deposited in your Sophia vault.</p>
                  </div>
                  <button
                    onClick={props.onClose}
                    className="px-6 py-2 bg-purple-600 text-white font-mono font-bold uppercase tracking-wider rounded-lg hover:bg-purple-700 transition-all"
                  >
                    View in Vault
                  </button>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
