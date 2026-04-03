import { useEffect, useState, useRef, useCallback } from 'react'
import { ClipCard } from '../components/ClipCard'
import { GlitchTitle } from '../components/GlitchTitle'
import { mockClips } from '../data/mockData'
import { TrendingUp } from 'lucide-react'

export function TrendingPage() {
  const [displayedClips, setDisplayedClips] = useState(() => {
    // Sort clips with thumbnails first
    return [...mockClips].sort((a, b) => {
      const aHasImage = a.thumbnail?.startsWith('http') ? 0 : 1
      const bHasImage = b.thumbnail?.startsWith('http') ? 0 : 1
      return aHasImage - bHasImage
    })
  })
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreClips()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [isLoading])

  const loadMoreClips = useCallback(() => {
    setIsLoading(true)
    // Simulate network delay
    setTimeout(() => {
      setDisplayedClips(prev => [...prev, ...mockClips])
      setIsLoading(false)
    }, 800)
  }, [])

  return (
    <div className="pt-20 pb-28 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <GlitchTitle 
            text="Trending Now" 
            className="text-4xl md:text-5xl"
          />
        </div>
        <p className="text-slate-400 text-sm font-mono mt-2">Watch the most popular clips being forged as La Casa NFTs</p>
      </div>

      {/* Pulse Intro Card */}
      <div className="mb-12 p-6 bg-gradient-to-br from-purple-950/60 to-slate-950/40 border border-purple-700/40 rounded-lg backdrop-blur">
        <div className="max-w-4xl">
          <p className="text-xs font-mono text-purple-400 uppercase tracking-wide mb-2">Why Trending Matters</p>
          <h3 className="text-lg font-bold text-purple-200 mb-2 font-mono">The Pulse of Gaming Culture</h3>
          <p className="text-sm text-slate-300 leading-relaxed">Every clip below represents a tokenized moment — a cinematic memory preserved on-chain. These aren't just views; they're ownership opportunities. When a moment trends, its value compounds. Follow the pulse. Own the culture.</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg">
          <p className="text-xs font-mono text-purple-400 uppercase mb-1">Top Clips</p>
          <p className="text-lg font-bold text-purple-300">{displayedClips.length}+</p>
          <p className="text-xs text-slate-400 mt-1">Most-viewed moments</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg">
          <p className="text-xs font-mono text-purple-400 uppercase mb-1">Categories</p>
          <p className="text-lg font-bold text-purple-300">3</p>
          <p className="text-xs text-slate-400 mt-1">Gaming • Sports • DeFi</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg">
          <p className="text-xs font-mono text-purple-400 uppercase mb-1">Updates</p>
          <p className="text-lg font-bold text-purple-300">Live</p>
          <p className="text-xs text-slate-400 mt-1">Scroll for more moments</p>
        </div>
      </div>

      {/* Grid of clips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {displayedClips.map((clip, idx) => (
          <ClipCard
            key={`${clip.id}-${idx}`}
            id={clip.id}
            title={clip.title}
            creator={clip.creator}
            creatorAvatar={clip.creatorAvatar}
            thumbnail={clip.thumbnail}
            views={clip.views}
            likes={clip.likes}
            duration={clip.duration}
            timestamp={clip.timestamp}
          />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="flex items-center justify-center py-8">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-purple-700/30" />
              <div className="absolute inset-0 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
            </div>
            <p className="text-sm text-slate-400 font-mono">Loading more moments...</p>
          </div>
        ) : (
          <p className="text-xs text-slate-500 font-mono">Scroll down to load more</p>
        )}
      </div>

      {/* Back to Abraxas Section */}
      <div className="mt-20 pt-12 border-t border-purple-700/30">
        <div className="text-center space-y-6">
          <div>
            <p className="text-sm font-mono text-purple-400 uppercase mb-2">Discover More</p>
            <h3 className="text-2xl md:text-3xl font-bold text-purple-300 font-mono mb-2">Explore Abraxas</h3>
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
    </div>
  )
}

