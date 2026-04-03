import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Copy, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { PageRealm } from '../components/PageRealm'
import AbraFooter from '../components/AbraFooter'

export default function AccountPage() {
  const { publicKey, connected, disconnect } = useWallet()
  const [copied, setCopied] = useState(false)

  if (!connected || !publicKey) {
    return (
      <div className="w-full px-4 py-12 text-center">
        <h2 className="text-2xl font-black uppercase tracking-widest text-cyan-300/60 mb-4">
          NOT CONNECTED
        </h2>
        <p className="text-cyan-300/40 text-sm mb-8">
          Connect your wallet to access your account.
        </p>
        <WalletMultiButton
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '2px solid rgb(34, 211, 238)',
            color: 'rgb(34, 211, 238)',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '0.5rem',
            height: '44px',
            padding: '0 16px',
          }}
        />
      </div>
    )
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(publicKey.toBase58())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <PageRealm
        symbol="ᛋ"
        symbolLabel="ACCOUNT"
        pageEssence="Your Sovereign Identity"
        agentName="WARDEN"
        lore="This is your sanctum. Your wallet, your creations, your preferences. Your gateway to sovereignty. Manage everything here."
        ctaLabel="SCROLL TO SETTINGS"
        accentColor="text-cyan-300"
        glowColor="bg-cyan-600/30"
      >
      <div className="px-4 md:px-4 py-8 md:py-10">
        {/* Wallet Info */}
        <div className="glow-panel mb-8 max-w-2xl mx-auto rounded-xl border border-cyan-300/20 bg-slate-900/75 p-5 backdrop-blur">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wide text-slate-100 flex items-center gap-2">
              <Settings size={20} className="text-cyan-300 drop-glow-cyan" />
              WALLET
            </h2>
          </div>

          <div className="space-y-5">
            {/* Address Display */}
            <div>
              <p className="text-xs text-cyan-300/60 uppercase tracking-wider font-mono mb-2">
                Wallet Address
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <code className="flex-1 px-4 py-2 md:px-4 md:py-2 bg-slate-950/60 border border-cyan-300/20 rounded-lg font-mono text-xs md:text-sm text-cyan-300/80 truncate w-full">
                  {publicKey.toBase58()}
                </code>
                <button
                  onClick={handleCopyAddress}
                  className="px-4 py-2 md:px-4 md:py-2 bg-cyan-300/10 border border-cyan-300/40 text-cyan-300 hover:bg-cyan-300/20 transition-colors rounded-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2 whitespace-nowrap"
                >
                  <Copy size={14} />
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 border-t border-cyan-300/20 pt-5">
              <div>
                <p className="text-xs text-cyan-300/60 uppercase tracking-wider font-mono mb-2">
                  dApps Created
                </p>
                <p className="text-xl font-black text-cyan-300">2</p>
              </div>
              <div>
                <p className="text-xs text-cyan-300/60 uppercase tracking-wider font-mono mb-2">
                  NFTs Minted
                </p>
                <p className="text-xl font-black text-cyan-300">2</p>
              </div>
              <div>
                <p className="text-xs text-cyan-300/60 uppercase tracking-wider font-mono mb-2">
                  Member Since
                </p>
                <p className="text-xs md:text-sm text-gold font-mono">Mar 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <h2 className="text-lg md:text-xl font-black uppercase tracking-wide text-slate-100 mb-5 px-4 md:px-0">
            PREFERENCES
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 md:p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/20">
              <div>
                <p className="font-bold text-slate-100 text-sm">Auto-save to GitHub</p>
                <p className="text-xs text-slate-300/60 mt-1">Automatically push generated code</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between p-4 md:p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/20">
              <div>
                <p className="font-bold text-slate-100 text-sm">Mint NFT Automatically</p>
                <p className="text-xs text-slate-300/60 mt-1">Mint La Casa NFT on creation</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between p-4 md:p-4 bg-cyan-300/5 rounded-lg border border-cyan-300/20">
              <div>
                <p className="font-bold text-slate-100 text-sm">Email Notifications</p>
                <p className="text-xs text-slate-300/60 mt-1">Get updates on your creations</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Disconnect */}
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => disconnect()}
            className="w-full btn-secondary flex items-center justify-center gap-2 rounded-lg px-4 py-2 md:px-6 md:py-3"
          >
            <LogOut size={16} />
            DISCONNECT WALLET
          </button>
        </div>
      </div>
    </PageRealm>
    <AbraFooter />
    </>
  )
}
