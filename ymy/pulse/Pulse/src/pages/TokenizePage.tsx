import { useEffect, useState } from 'react'
import { Upload, Zap } from 'lucide-react'
import { GlitchTitle } from '../components/GlitchTitle'
import { TokenizationModal } from '../components/TokenizationModal'
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder'

export function TokenizePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [showTokenize, setShowTokenize] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const mockThumbnail = 'https://images.unsplash.com/photo-1538481143235-5d8e32e94d82?w=800&h=450&fit=crop'

  return (
    <div className="pt-20 pb-28 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <GlitchTitle 
            text="Forge NFT" 
            className="text-4xl md:text-5xl"
          />
        </div>
        <p className="text-slate-400 text-sm font-mono mt-2">Upload your clip and instantly mint it as a La Casa NFT</p>
      </div>
      {/* Pulse Intro Card */}
      <div className="mb-12 p-6 bg-gradient-to-br from-yellow-950/60 to-slate-950/40 border border-yellow-700/40 rounded-lg backdrop-blur">
        <div className="max-w-4xl">
          <p className="text-xs font-mono text-yellow-400 uppercase tracking-wide mb-2">Instant Minting</p>
          <h3 className="text-lg font-bold text-yellow-200 mb-2 font-mono">Forge in Seconds. Own Forever. Earn Instantly.</h3>
          <p className="text-sm text-slate-300 leading-relaxed">Upload your clip. Set royalties. Forge instantly on Solana. Your La Casa NFT is now live, auto-deposited into your Sophia vault, earning you 70% of every trade. Five-second mint time. Zero transaction limits. Pure speed. Pure ownership. Pure revenue.</p>
        </div>
      </div>
      {/* Overview Stats */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-yellow-950/40 to-slate-950/40 border border-yellow-700/30 rounded-lg">
          <p className="text-xs font-mono text-yellow-400 uppercase mb-1">⚡ Speed</p>
          <p className="text-2xl font-bold text-yellow-300">5 sec</p>
          <p className="text-xs text-slate-400 mt-1">Average mint time</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg">
          <p className="text-xs font-mono text-purple-400 uppercase mb-1">💰 Earnings</p>
          <p className="text-2xl font-bold text-purple-300">70%</p>
          <p className="text-xs text-slate-400 mt-1">Creator revenue share</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950/40 border border-cyan-700/30 rounded-lg">
          <p className="text-xs font-mono text-cyan-400 uppercase mb-1">🔐 Safe</p>
          <p className="text-2xl font-bold text-cyan-300">Auto-Vault</p>
          <p className="text-xs text-slate-400 mt-1">Protected storage</p>
        </div>
      </div>

      {/* Upload section */}
      <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Upload area */}
        <div>
          <h2 className="text-lg font-bold text-purple-300 font-mono mb-4 uppercase tracking-wider">Upload Clip</h2>
          
          <label className="block p-8 border-2 border-dashed border-purple-700/50 rounded-lg hover:border-purple-500 transition-all cursor-pointer bg-purple-950/20 hover:bg-purple-950/40">
            <div className="flex flex-col items-center justify-center gap-3">
              <Upload size={32} className="text-purple-400" />
              <div className="text-center">
                <p className="text-sm font-bold text-slate-200 mb-1">
                  {uploadedFile ? uploadedFile.name : 'Choose a video clip'}
                </p>
                <p className="text-xs text-slate-400">MP4, WebM or MOV (max 100MB)</p>
              </div>
            </div>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="video/*"
              className="hidden"
            />
          </label>

          {uploadedFile && (
            <div className="mt-4 p-3 bg-green-950/30 border border-green-700/50 rounded-lg">
              <p className="text-sm text-green-300 font-mono">
                ✓ {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)}MB)
              </p>
            </div>
          )}
        </div>

        {/* Preview */}
        <div>
          <h2 className="text-lg font-bold text-purple-300 font-mono mb-4 uppercase tracking-wider">Preview</h2>
          
          <div className="aspect-video bg-slate-950 rounded-lg border border-purple-700/30 overflow-hidden flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = PULSE_LOGO_URI
                }}
              />
            ) : (
              <p className="text-sm text-slate-500 font-mono text-center">Upload a clip to see preview</p>
            )}
          </div>
        </div>
      </div>

      {/* Minting flow card */}
      <div className="mb-12 p-6 bg-gradient-to-b from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg">
        <h2 className="text-lg font-bold text-purple-300 font-mono mb-4 uppercase tracking-wider">Minting Flow</h2>
        
        <div className="space-y-4">
          {[
            { step: '01', title: 'Upload', desc: 'Select your gaming clip, sports highlight, or moment' },
            { step: '02', title: 'Customize', desc: 'Add metadata, description, and royalty percentage' },
            { step: '03', title: 'Set Revenue Split', desc: 'Configure your earnings for primary & secondary sales' },
            { step: '04', title: 'Forge NFT', desc: 'Mint instantly as La Casa NFT on Solana' },
            { step: '05', title: 'Auto-Vault', desc: 'Automatically deposited into Sophia-managed vault' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center flex-shrink-0">
                <p className="text-xs font-mono font-bold text-purple-300">{item.step}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-200">{item.title}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {[
          { title: 'One-Click Minting', desc: 'Forge your NFT in seconds' },
          { title: 'Instant Ownership', desc: 'Full control on the blockchain' },
          { title: 'Auto-Vault Safety', desc: 'Protected in Sophia-managed vault' },
          { title: 'Royalty Earnings', desc: 'Earn from every trade' },
        ].map((item) => (
          <div key={item.title} className="p-4 bg-slate-800/50 border border-purple-700/30 rounded-lg hover:border-purple-500/50 transition-all">
            <p className="text-sm font-bold text-purple-300 mb-1">{item.title}</p>
            <p className="text-xs text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => setShowTokenize(true)}
        disabled={!uploadedFile}
        className={`w-full px-6 py-4 rounded-lg font-mono font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 ${
          uploadedFile
            ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-400 cursor-pointer'
            : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
        }`}
      >
        <Zap size={20} />
        {uploadedFile ? 'Forge NFT Now' : 'Upload a Clip to Continue'}
      </button>

      {showTokenize && (
        <TokenizationModal
          clipTitle="Your Epic Moment"
          creator="Creator Name"
          thumbnail={mockThumbnail}
          onClose={() => setShowTokenize(false)}
        />
      )}

      {/* Back to Abraxas Section */}
      <div className="mt-20 pt-12 border-t border-purple-700/30">
        <div className="text-center space-y-6">
          <div>
            <p className="text-sm font-mono text-yellow-400 uppercase mb-2">Done Forging?</p>
            <h3 className="text-2xl md:text-3xl font-bold text-purple-300 font-mono mb-2">Explore Abraxas</h3>
            <p className="text-slate-400 text-sm font-mono">The complete gaming & DeFi entertainment platform</p>
          </div>
          <a
            href="https://abraxas.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-mono font-bold uppercase tracking-wider hover:from-yellow-500 hover:to-yellow-400 transition-all active:scale-95 shadow-[0_0_30px_rgba(202,138,4,0.4)]"
          >
            Return to Abraxas
          </a>
        </div>
      </div>
    </div>
  )
}
