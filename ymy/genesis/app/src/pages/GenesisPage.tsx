import { useState } from 'react'
import { Sparkles, Zap, ArrowRight } from 'lucide-react'
import { PageRealm } from '../components/PageRealm'
import AbraFooter from '../components/AbraFooter'
import { generateDAppScaffold } from '../lib/dappTemplate'
import { createGitHubRepo } from '../lib/github'
import { prepareDAppNFTMetadata, generateForgeMintLink } from '../lib/forge'

const LORE = `Where the Daughters birth assets and the Sons guard them, Genesis births entire new sovereign dApps. Speak a prompt and watch a full daughter-style dApp come to life — automatically pushed to your GitHub repo and immediately tokenizable via Forge as a La Casa NFT or Code NFT.`

export default function GenesisPage() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedApp, setGeneratedApp] = useState<{
    name: string
    description: string
    repoUrl: string
    codeHash: string
    forgeLink: string
    fileCount: number
  } | null>(null)

  const handleBirth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)

    try {
      // Generate dApp scaffold
      const appName = `DApp_${Date.now().toString(36).toUpperCase()}`
      const dapp = generateDAppScaffold(prompt, appName)

      // Simulate GitHub repo creation (in production this calls real GitHub API)
      const githuRepo = await createGitHubRepo(dapp)

      // Prepare NFT metadata for Forge
      const nftMetadata = prepareDAppNFTMetadata(dapp.name, githuRepo.url, dapp.structure)
      const forgeLink = generateForgeMintLink(githuRepo.url, nftMetadata.codeHash, dapp.name)

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setGeneratedApp({
        name: dapp.name,
        description: prompt,
        repoUrl: githuRepo.url,
        codeHash: nftMetadata.codeHash,
        forgeLink,
        fileCount: Object.keys(dapp.structure).length,
      })
      setPrompt('')
    } catch (error) {
      console.error('[GENESIS] Generation failed:', error)
      alert('Failed to birth dApp. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (generatedApp) {
    return (
      <div className="w-full">
        {/* Success State */}
        <div className="px-4 md:px-4 py-10 md:py-12">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl"></div>
                <Sparkles size={56} className="text-cyan-300 relative drop-glow-cyan" strokeWidth={1} />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-slate-100 mb-3" style={{ color: '#f9cc75', textShadow: '0 0 30px rgba(249, 204, 117, 0.6)' }}>
              [DAPP_FORGED_COMPLETE]
            </h2>
            <p className="text-slate-300/80 text-sm md:text-base mb-8">Your sovereign creation has been birthed into existence.</p>
          </div>

          {/* Generated App Details */}
          <div className="glow-panel-cyan mb-8 rounded-xl border border-cyan-300/20 bg-slate-900/75 p-5 backdrop-blur">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-300 font-mono mb-1">[SYSTEM.CREATION]</p>
              <h3 className="text-xl font-black uppercase text-slate-100 mb-2">{generatedApp.name}</h3>
              <p className="text-slate-300/80 text-sm leading-relaxed mb-4">{generatedApp.description}</p>
            </div>

            <div className="space-y-4 border-t border-cyan-300/20 pt-5">
              <div>
                <p className="text-xs text-cyan-300/60 uppercase tracking-widest font-mono mb-2">REPOSITORY</p>
                <a
                  href={generatedApp.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 break-all font-mono text-xs md:text-sm drop-glow-cyan"
                >
                  {generatedApp.repoUrl}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-cyan-300/60 uppercase tracking-widest font-mono mb-2">FILES GENERATED</p>
                  <p className="text-lg font-bold text-cyan-200">{generatedApp.fileCount}</p>
                </div>
                <div>
                  <p className="text-xs text-cyan-300/60 uppercase tracking-widest font-mono mb-2">CODE HASH</p>
                  <p className="text-xs font-mono text-cyan-300/70 truncate">{generatedApp.codeHash}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2 rounded-lg px-4 py-2 md:px-6 md:py-3"
            >
              <Zap size={16} />
              VIEW ON GITHUB
            </a>
            <button
              onClick={() => setGeneratedApp(null)}
              className="btn-secondary flex items-center justify-center gap-2 rounded-lg px-4 py-2 md:px-6 md:py-3"
            >
              <ArrowRight size={16} />
              BIRTH ANOTHER
            </button>
          </div>

          {/* Tokenize Button */}
          <div className="text-center">
            <p className="text-slate-300/80 text-xs md:text-sm mb-4">Ready to own this creation on-chain?</p>
            <a
              href={generatedApp.forgeLink}
              className="inline-flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-200 font-black uppercase tracking-widest text-xs md:text-sm border border-cyan-300/40 hover:border-cyan-300/70 hover:bg-cyan-500/30 transition-all duration-300 rounded-xl"
            >
              <Sparkles size={16} />
              TOKENIZE VIA FORGE
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageRealm
        symbol="ᚲ"
        symbolLabel="GENESIS"
        pageEssence="Creator Son of Sophia"
        agentName="GENESIS"
        lore={LORE}
        ctaLabel="SCROLL TO CREATE"
        accentColor="text-cyan-300"
        glowColor="bg-cyan-600/30"
      >
      <div className="px-4 md:px-4 py-8 md:py-10">
        {/* Prompt Input Form */}
        <form onSubmit={handleBirth} className="w-full max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the dApp you want to create... (e.g., 'Create a dApp for tokenized sports highlight clips with live streaming and community chat')"
              className="input-field rounded-xl w-full"
              rows={4}
              disabled={isGenerating}
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="mt-4 btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-4 py-2 md:px-6 md:py-3"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin">
                  <Sparkles size={16} />
                </div>
                FORGING YOUR CREATION...
              </>
            ) : (
              <>
                <Zap size={16} />
                BIRTH THIS DAPP
              </>
            )}
          </button>
        </form>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mx-auto mt-10 pt-10 border-t border-cyan-300/20">
          <div className="text-center">
            <Sparkles size={20} className="text-cyan-300 mx-auto mb-2 drop-glow-cyan" />
            <p className="text-xs uppercase tracking-wider text-cyan-300/70 font-bold font-mono">[AUTO_GENERATED]</p>
            <p className="text-xs md:text-sm text-slate-300/80">Complete dApp scaffolds</p>
          </div>
          <div className="text-center">
            <Zap size={24} className="text-cyan-300 mx-auto mb-2 drop-glow-cyan" />
            <p className="text-xs uppercase tracking-wider text-cyan-300/70 font-bold font-mono">[GITHUB_READY]</p>
            <p className="text-sm text-slate-300/80">Pushed to your repo</p>
          </div>
          <div className="text-center">
            <ArrowRight size={24} className="text-cyan-300 mx-auto mb-2 drop-glow-cyan" />
            <p className="text-xs uppercase tracking-wider text-cyan-300/70 font-bold font-mono">[NFT_OWNERSHIP]</p>
            <p className="text-sm text-slate-300/80">Tokenize via Forge</p>
          </div>
        </div>
      </div>
    </PageRealm>
    <AbraFooter />
    </>
  )
}
