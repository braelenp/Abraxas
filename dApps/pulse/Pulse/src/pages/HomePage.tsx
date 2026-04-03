import { useState, useEffect } from 'react'
import { ClipFeed } from '../components/ClipFeed'
import { ClipUploadModal } from '../components/ClipUploadModal'
import { LiveStreamingSection } from '../components/LiveStreamingSection'
import { GlitchTitle } from '../components/GlitchTitle'
import { Sparkles } from 'lucide-react'

export function HomePage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showLiveStream, setShowLiveStream] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-28">
      {/* Hero section with quick actions */}
      <div className="border-b border-purple-900/30 bg-gradient-to-b from-purple-950/40 to-slate-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <GlitchTitle 
                text="&gt; [CLIP_KEEPER] ACTIVE" 
                className="text-2xl sm:text-3xl md:text-4xl"
              />
              <p className="text-slate-400 text-sm font-mono mt-2">Tokenize gaming highlights • Sports moments • Live streams • DeFi moments</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 rounded-lg bg-purple-600 text-white font-mono font-semibold text-sm uppercase tracking-wider hover:bg-purple-700 transition-all active:scale-95 border border-purple-500/50 shadow-[0_0_15px_rgba(153,69,255,0.3)]"
              >
                + Upload Clip
              </button>
              <button
                onClick={() => setShowLiveStream(true)}
                className="px-6 py-3 rounded-lg bg-red-600/80 text-white font-mono font-semibold text-sm uppercase tracking-wider hover:bg-red-700 transition-all active:scale-95 border border-red-500/50 animate-pulse"
              >
                Go Live
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {showLiveStream ? (
          <LiveStreamingSection onClose={() => setShowLiveStream(false)} />
        ) : (
          <>
            {/* Pulse Intro Card */}
            <div className="mb-12 p-6 bg-gradient-to-br from-purple-950/60 to-slate-950/40 border border-purple-700/40 rounded-lg backdrop-blur">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <p className="text-xs font-mono text-purple-400 uppercase tracking-wide">Pulse — The Pulse Keeper</p>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-purple-200 mb-2 font-mono">One Clip. One Mint. Infinite Possibilities.</h2>
                <p className="text-sm text-slate-300 leading-relaxed">Capture gaming highlights, esports moments, and DeFi plays. Instant on-chain clipping. One-click NFT minting on Solana. Revenue splits. Community ownership. No delays. No middlemen. Just pure, tokenized moments from the gaming & streaming culture.</p>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg">
                <p className="text-xs font-mono text-purple-400 uppercase mb-1">📊 Feed Status</p>
                <p className="text-2xl font-bold text-purple-300">Live</p>
                <p className="text-xs text-slate-400 mt-1">Latest clips loading</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950/40 border border-cyan-700/30 rounded-lg">
                <p className="text-xs font-mono text-cyan-400 uppercase mb-1">📹 Ready to Go</p>
                <p className="text-2xl font-bold text-cyan-300">Upload</p>
                <p className="text-xs text-slate-400 mt-1">Share your moment</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-red-950/40 to-slate-950/40 border border-red-700/30 rounded-lg">
                <p className="text-xs font-mono text-red-400 uppercase mb-1">🎬 Go Live</p>
                <p className="text-2xl font-bold text-red-300">Stream</p>
                <p className="text-xs text-slate-400 mt-1">Start broadcasting</p>
              </div>
            </div>

            {/* Clip Feed */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <GlitchTitle 
                  text="&gt; [TRENDING_CLIPS] LIVE" 
                  className="text-lg md:text-xl"
                />
              </div>
              <ClipFeed />
            </div>

            {/* Coming soon sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="rounded-lg border border-purple-700/30 bg-gradient-to-br from-purple-950/40 to-purple-950/10 p-8 text-center hover:border-purple-500/50 transition-all">
                <h3 className="text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide">📊 Community Leaderboard</h3>
                <p className="text-slate-400/80 text-sm">Top clip creators, highest earnings, most shared moments</p>
              </div>
              <div className="rounded-lg border border-purple-700/30 bg-gradient-to-br from-purple-950/40 to-purple-950/10 p-8 text-center hover:border-purple-500/50 transition-all">
                <h3 className="text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide">🎮 Gaming Tournaments</h3>
                <p className="text-slate-400/80 text-sm">Tokenized esports moments, play-to-earn streaming</p>
              </div>
            </div>

            {/* Back to Abraxas Section */}
            <div className="mt-20 pt-12 border-t border-purple-700/30">
              <div className="text-center space-y-6">
                <div>
                  <p className="text-sm font-mono text-purple-400 uppercase mb-2">Explore More</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-purple-300 font-mono mb-2">Visit Abraxas</h3>
                  <p className="text-slate-400 text-sm font-mono">The complete gaming & DeFi entertainment platform</p>
                </div>
                <a
                  href="https://abraxas.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition-all active:scale-95 shadow-[0_0_30px_rgba(153,69,255,0.4)]"
                >
                  Return to Abraxas
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <ClipUploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  )
}
