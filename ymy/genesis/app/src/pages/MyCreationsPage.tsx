import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Plus, Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageRealm } from '../components/PageRealm'
import AbraFooter from '../components/AbraFooter'

const MOCK_CREATIONS = [
  {
    id: 1,
    name: 'Sports Highlight Clips',
    description: 'Tokenized sports highlight clips with live streaming and community chat',
    repoUrl: 'https://github.com/user/sports-clips',
    nftAddress: 'FAK3NFT1234567890abcdefg',
    createdAt: '2026-03-25',
    status: 'tokenized',
  },
  {
    id: 2,
    name: 'Web3 Music Platform',
    description: 'Decentralized music streaming with artist royalties',
    repoUrl: 'https://github.com/user/web3-music',
    nftAddress: 'FAK3NFT9876543210zyxwvu',
    createdAt: '2026-03-20',
    status: 'tokenized',
  },
]

export default function MyCreationsPage() {
  const { connected } = useWallet()

  if (!connected) {
    return (
      <div className="w-full px-4 py-12 text-center">
        <h2 className="text-2xl font-black uppercase tracking-widest text-cyan-300/60 mb-4">
          CONNECT TO VIEW CREATIONS
        </h2>
        <p className="text-cyan-300/40 text-sm mb-8">Connect your wallet to see your dApps.</p>
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

  return (
    <>
      <PageRealm
        symbol="ᛏ"
        symbolLabel="CREATIONS"
        pageEssence="Your Forged dApps"
        agentName="ARCHIVE"
        lore="Behold your creations. Each dApp you've birthed, each sovereign system you've brought into existence, lives here. From prompt to production, from GitHub to token."
        ctaLabel="SCROLL TO CREATIONS"
        accentColor="text-cyan-300"
        glowColor="bg-cyan-600/30"
      >
      <div className="px-4 md:px-4 py-8 md:py-10 w-full">
        {/* Header Section */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 font-mono mb-2">&gt; [SYSTEM.CREATIONS]</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-slate-100 leading-tight">
                YOUR DAPPS
              </h2>
              <p className="text-xs md:text-sm text-slate-400/80 mt-3 max-w-xl">
                Track and manage all your sovereign creations—each a unique entry in your development legacy.
              </p>
            </div>
            <Link to="/genesis" className="btn-primary flex items-center gap-2 whitespace-nowrap rounded-lg self-start md:self-auto">
              <Plus size={18} />
              BIRTH NEW
            </Link>
          </div>
        </div>

        {/* Creations Grid */}
        {MOCK_CREATIONS.length === 0 ? (
          <div className="text-center py-24 max-w-4xl mx-auto">
            <p className="text-slate-300/60 mb-6 text-lg">You haven't created any dApps yet.</p>
            <Link to="/genesis" className="btn-primary inline-flex rounded-lg">
              Birth Your First DApp
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto">
            {MOCK_CREATIONS.map((creation) => (
              <div
                key={creation.id}
                className="group glow-panel hover:border-cyan-300/60 hover:bg-slate-900/95 hover:shadow-[0_0_32px_rgba(34,211,238,0.2)] transition-all duration-300 rounded-2xl border border-cyan-300/25 bg-slate-900/80 p-5 md:p-5 backdrop-blur overflow-hidden"
              >
                {/* Card Top Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-wide text-slate-100 mb-2 group-hover:text-cyan-200 transition-colors line-clamp-2">
                      {creation.name}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-xs text-cyan-300/70 font-mono uppercase tracking-wider">
                        📅 {creation.createdAt}
                      </p>
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 rounded-full">
                        {creation.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300/85 text-xs md:text-sm mb-5 leading-relaxed">
                  {creation.description}
                </p>

                {/* NFT Info Card */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-300/30 rounded-xl p-4 mb-5">
                  <p className="text-xs text-cyan-300/70 uppercase tracking-wider font-mono mb-2 font-bold">
                    ⛓️ La Casa NFT
                  </p>
                  <p className="font-mono text-xs md:text-sm text-cyan-200/90 truncate break-all">
                    {creation.nftAddress}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 border-t border-cyan-300/20 pt-4">
                  <a
                    href={creation.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/15 to-cyan-600/10 hover:from-cyan-500/25 hover:to-cyan-600/20 text-cyan-300 hover:text-cyan-200 text-xs font-bold uppercase tracking-wide transition-all duration-200 rounded-lg border border-cyan-400/30 hover:border-cyan-300/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.15)]"
                  >
                    <Github size={16} />
                    <span className="hidden sm:inline">REPO</span>
                    <span className="sm:hidden">CODE</span>
                  </a>
                  <a
                    href={`https://solscan.io/token/${creation.nftAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/15 to-cyan-600/10 hover:from-cyan-500/25 hover:to-cyan-600/20 text-cyan-300 hover:text-cyan-200 text-xs font-bold uppercase tracking-wide transition-all duration-200 rounded-lg border border-cyan-400/30 hover:border-cyan-300/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.15)]"
                  >
                    <ExternalLink size={16} />
                    <span className="hidden sm:inline">VIEW NFT</span>
                    <span className="sm:hidden">NFT</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageRealm>
    <AbraFooter />
    </>
  )
}
