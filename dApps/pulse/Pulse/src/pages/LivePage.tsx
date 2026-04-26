import { useEffect } from 'react'
import { LiveStreamCard } from '../components/LiveStreamCard'
import { GlitchTitle } from '../components/GlitchTitle'
import { mockLiveStreams } from '../data/mockData'
import { Radio } from 'lucide-react'

export function LivePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-20 pb-28 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <Radio className="w-6 h-6 text-red-500 animate-pulse" />
          </div>
          <GlitchTitle 
            text="Live Now" 
            className="text-4xl md:text-5xl"
          />
        </div>
        <p className="text-slate-400 text-sm font-mono mt-2">Watch live streams and tokenize epic moments in real-time</p>
      </div>

      {/* Pulse Intro Card */}
      <div className="mb-12 p-6 bg-gradient-to-br from-red-950/60 to-slate-950/40 border border-red-700/40 rounded-lg backdrop-blur">
        <div className="max-w-4xl">
          <p className="text-xs font-mono text-red-400 uppercase tracking-wide mb-2">Real-Time Tokenization</p>
          <h3 className="text-lg font-bold text-red-200 mb-2 font-mono">Capture. Clip. Own. Stream Live.</h3>
          <p className="text-sm text-slate-300 leading-relaxed">No more 10-minute delays. Watch live, clip the moment, mint the NFT — all in real-time. Streamers earn tips instantly. Communities own the culture. This is the heartbeat of gaming on-chain. One click. One blockchain. One BlackBox NFT.</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-br from-red-950/40 to-slate-950/40 border border-red-700/30 rounded-lg">
          <p className="text-xs font-mono text-red-400 uppercase mb-1">🔴 Live Now</p>
          <p className="text-2xl font-bold text-red-300">{mockLiveStreams.length}</p>
          <p className="text-xs text-slate-400 mt-1">Active streams</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg">
          <p className="text-xs font-mono text-purple-400 uppercase mb-1">👥 Viewers</p>
          <p className="text-2xl font-bold text-purple-300">2.4M+</p>
          <p className="text-xs text-slate-400 mt-1">Watching now</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950/40 border border-cyan-700/30 rounded-lg">
          <p className="text-xs font-mono text-cyan-400 uppercase mb-1">⚡ Categories</p>
          <p className="text-2xl font-bold text-cyan-300">5+</p>
          <p className="text-xs text-slate-400 mt-1">Stream types</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-yellow-950/40 to-slate-950/40 border border-yellow-700/30 rounded-lg">
          <p className="text-xs font-mono text-yellow-400 uppercase mb-1">🎬 Clip Now</p>
          <p className="text-2xl font-bold text-yellow-300">1-Click</p>
          <p className="text-xs text-slate-400 mt-1">Instant NFT mint</p>
        </div>
      </div>

      {/* Live stats banner */}
      <div className="mb-12 p-4 bg-gradient-to-r from-red-950/30 to-purple-950/30 border border-red-700/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono text-slate-300">{mockLiveStreams.length} streams live right now</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Discover, watch & tokenize</span>
        </div>
      </div>

      {/* Grid of live streams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...mockLiveStreams]
          .sort((a, b) => {
            const aHasImage = a.thumbnail?.startsWith('http') ? 0 : 1
            const bHasImage = b.thumbnail?.startsWith('http') ? 0 : 1
            return aHasImage - bHasImage
          })
          .map((stream) => (
            <LiveStreamCard
              key={stream.id}
              id={stream.id}
              title={stream.title}
              streamer={stream.streamer}
              avatar={stream.avatar}
              thumbnail={stream.thumbnail}
              viewers={stream.viewers}
              category={stream.category}
              liveTime={stream.liveTime}
            />
          ))}
      </div>

      {/* Back to Abraxas Section */}
      <div className="mt-20 pt-12 border-t border-purple-700/30">
        <div className="text-center space-y-6">
          <div>
            <p className="text-sm font-mono text-red-400 uppercase mb-2">Discover More</p>
            <h3 className="text-2xl md:text-3xl font-bold text-purple-300 font-mono mb-2">Explore Abraxas</h3>
            <p className="text-slate-400 text-sm font-mono">The complete gaming & DeFi entertainment platform</p>
          </div>
          <a
            href="https://abraxas.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-purple-600 text-white font-mono font-bold uppercase tracking-wider hover:from-red-500 hover:to-purple-500 transition-all active:scale-95 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
          >
            Return to Abraxas
          </a>
        </div>
      </div>
    </div>
  )
}
