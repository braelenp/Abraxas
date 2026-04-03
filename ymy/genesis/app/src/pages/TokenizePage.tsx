import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Sparkles, Check, ArrowRight } from 'lucide-react'
import { PageRealm } from '../components/PageRealm'
import AbraFooter from '../components/AbraFooter'

const TOKENIZATION_STEPS = [
  {
    step: 1,
    title: 'Create Your DApp',
    description: 'Use Genesis to birth a new sovereign dApp from your prompt.',
    icon: Sparkles,
  },
  {
    step: 2,
    title: 'Generate Code',
    description: 'Genesis auto-generates complete, production-ready code.',
    icon: Check,
  },
  {
    step: 3,
    title: 'Push to GitHub',
    description: 'Your code is automatically pushed to your repository.',
    icon: Check,
  },
  {
    step: 4,
    title: 'Mint La Casa NFT',
    description: 'Tokenize ownership of your creation on-chain via Forge.',
    icon: Check,
  },
]

export default function TokenizePage() {
  const { connected } = useWallet()

  if (!connected) {
    return (
      <div className="w-full px-4 py-12 text-center">
        <h2 className="text-2xl font-black uppercase tracking-widest text-cyan-300/60 mb-4">
          CONNECT YOUR WALLET
        </h2>
        <p className="text-cyan-300/40 text-sm mb-8">
          Connect to prepare your creations for tokenization.
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

  return (
    <>
      <PageRealm
        symbol="ᚨ"
        symbolLabel="TOKENIZATION"
        pageEssence="Forge Your Ownership"
        agentName="FORGE"
        lore="In the Forge, raw creation becomes immutable proof. Bind your dApp to the blockchain—mint a La Casa NFT that declares your sovereignty. Your code, your vision, your ownership, forever on-chain."
        ctaLabel="SCROLL FOR DETAILS"
        accentColor="text-cyan-300"
        glowColor="bg-cyan-600/30"
      >
      <div className="px-4 md:px-4 py-8 md:py-10">
        {/* Header */}
        <div className="mb-10 max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 font-mono mb-3">&gt; [SYSTEM.OWNERSHIP]</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-slate-100 mb-3">
            TOKENIZE YOUR CREATIONS
          </h2>
          <p className="text-slate-300/80 text-sm md:text-base max-w-2xl">
            Every dApp you birth via Genesis can be tokenized as a La Casa NFT, giving you
            on-chain ownership of your creation and automatic rights to future iterations.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-12 max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 font-mono mb-6">&gt; [SYSTEM.TOKENIZE]</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">
            {TOKENIZATION_STEPS.map(({ step, title, description }) => (
              <div key={step}>
                {/* Step Card */}
                <div className="glow-panel mb-6 relative rounded-xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-full bg-cyan-300/10 border-2 border-cyan-300/40 flex items-center justify-center">
                      <span className="font-black text-cyan-300 text-xs">{step}</span>
                    </div>
                    {step < TOKENIZATION_STEPS.length && (
                      <div className="absolute top-full left-1/2 w-0.5 h-4 bg-cyan-300/30 translate-x-1 md:hidden"></div>
                    )}
                  </div>
                  <h3 className="font-black uppercase tracking-wide text-slate-100 text-xs md:text-sm mb-2">
                    {title}
                  </h3>
                  <p className="text-slate-300/70 text-xs leading-relaxed">{description}</p>
                </div>

                {/* Connector Arrow (desktop only) */}
                {step < TOKENIZATION_STEPS.length && (
                  <div className="hidden md:flex items-center justify-center mb-6 -translate-y-0">
                    <ArrowRight size={18} className="text-cyan-300/40 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* La Casa NFT Details */}
        <div className="glow-panel mb-8 max-w-4xl mx-auto rounded-xl border border-cyan-300/20 bg-slate-900/75 p-5 backdrop-blur">
          <div className="flex items-start gap-4 mb-5">
            <Sparkles size={24} className="text-cyan-300 flex-shrink-0 drop-glow-cyan" />
            <div>
              <h2 className="text-xl font-black uppercase tracking-wide text-slate-100 mb-2">
                La Casa NFT
              </h2>
              <p className="text-slate-300/80 text-sm">The proof of your sovereign creation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-cyan-300/20 pt-5">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gold mb-3">
                What You Get
              </h3>
              <ul className="space-y-2 text-slate-300/70 text-xs">
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-gold flex-shrink-0" />
                  <span>On-chain ownership proof</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-gold flex-shrink-0" />
                  <span>Repository metadata linked to NFT</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-gold flex-shrink-0" />
                  <span>Tradeable ownership token</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={12} className="text-gold flex-shrink-0" />
                  <span>Optional Code NFT with source files</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-gold mb-3">
                Metadata Included
              </h3>
              <ul className="space-y-2 text-slate-300/70 text-xs font-mono">
                <li className="bg-cyan-300/5 p-2 rounded text-xs">Creator: Your wallet address</li>
                <li className="bg-cyan-300/5 p-2 rounded text-xs">Repository: GitHub link</li>
                <li className="bg-cyan-300/5 p-2 rounded text-xs">Code Hash: SHA-256 verification</li>
                <li className="bg-cyan-300/5 p-2 rounded text-xs">Timestamp: Creation block</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-slate-300/60 text-sm mb-6">
            Ready to birth your first sovereign creation?
          </p>
          <a href="/genesis" className="btn-primary inline-flex items-center gap-2 rounded-lg">
            <Sparkles size={18} />
            GO TO GENESIS
          </a>
        </div>
      </div>
    </PageRealm>
    <AbraFooter />
    </>
  )
}
