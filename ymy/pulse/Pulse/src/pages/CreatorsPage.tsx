import { useEffect } from 'react'
import { CreatorProfile } from '../components/CreatorProfile'
import { GlitchTitle } from '../components/GlitchTitle'
import { mockCreators, mockClips } from '../data/mockData'
import { Users } from 'lucide-react'

export function CreatorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Map creators to their clips
  const creatorsWithClips = mockCreators.map(creator => ({
    ...creator,
    recentClips: mockClips
      .filter(clip => clip.creatorId === creator.id)
      .map(clip => ({
        id: clip.id,
        title: clip.title,
        thumbnail: clip.thumbnail,
        views: clip.views,
        likes: clip.likes,
      }))
  }))

  return (
    <div className="pt-20 pb-28 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-purple-400" />
          <GlitchTitle 
            text="Top Creators" 
            className="text-4xl md:text-5xl"
          />
        </div>
        <p className="text-slate-400 text-sm font-mono mt-2">Follow your favorite creators and support their moments</p>
      </div>

      {/* Pulse Intro Card */}
      <div className="mb-12 p-6 bg-gradient-to-br from-purple-950/60 to-slate-950/40 border border-purple-700/40 rounded-lg backdrop-blur">
        <div className="max-w-4xl">
          <p className="text-xs font-mono text-purple-400 uppercase tracking-wide mb-2">Creator Empowerment</p>
          <h3 className="text-lg font-bold text-purple-200 mb-2 font-mono">Own Your Moments. Control Your Revenue.</h3>
          <p className="text-sm text-slate-300 leading-relaxed">Creators aren't content creators anymore — they're sovereign artists. Every clip, every moment becomes a tokenized asset. You set the royalties. Your community owns a piece. No algorithm. No middleman gatekeeping. Just pure creator sovereignty on the blockchain.</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg">
          <p className="text-xs font-mono text-purple-400 uppercase mb-1">👑 Top Creators</p>
          <p className="text-2xl font-bold text-purple-300">{creatorsWithClips.length}</p>
          <p className="text-xs text-slate-400 mt-1">Notable creators</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-cyan-950/40 to-slate-950/40 border border-cyan-700/30 rounded-lg">
          <p className="text-xs font-mono text-cyan-400 uppercase mb-1">✓ Verified</p>
          <p className="text-2xl font-bold text-cyan-300">{creatorsWithClips.filter(c => c.verified).length}</p>
          <p className="text-xs text-slate-400 mt-1">Verified accounts</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-yellow-950/40 to-slate-950/40 border border-yellow-700/30 rounded-lg">
          <p className="text-xs font-mono text-yellow-400 uppercase mb-1">🔴 Live Now</p>
          <p className="text-2xl font-bold text-yellow-300">{creatorsWithClips.filter(c => c.isLive).length}</p>
          <p className="text-xs text-slate-400 mt-1">Streaming</p>
        </div>
      </div>

      {/* Featured creator - larger card */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-purple-300 font-mono mb-4 uppercase tracking-wider">Featured Creator</h2>
        <div className="w-full">
          <CreatorProfile
            name={creatorsWithClips[1].name}
            avatar={creatorsWithClips[1].avatar}
            category={creatorsWithClips[1].category}
            followers={creatorsWithClips[1].followers}
            clips={creatorsWithClips[1].clips}
            isLive={creatorsWithClips[1].isLive}
            bio={creatorsWithClips[1].bio}
            verified={creatorsWithClips[1].verified}
            recentClips={creatorsWithClips[1].recentClips}
          />
        </div>
      </div>

      {/* All creators grid */}
      <div>
        <h2 className="text-lg font-bold text-purple-300 font-mono mb-4 uppercase tracking-wider">All Creators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...creatorsWithClips]
            .sort((a, b) => {
              const aHasImage = a.avatar?.startsWith('http') ? 0 : 1
              const bHasImage = b.avatar?.startsWith('http') ? 0 : 1
              return aHasImage - bHasImage
            })
            .map((creator) => (
              <CreatorProfile
                key={creator.id}
                name={creator.name}
                avatar={creator.avatar}
                category={creator.category}
                followers={creator.followers}
                clips={creator.clips}
                isLive={creator.isLive}
                bio={creator.bio}
                verified={creator.verified}
                recentClips={creator.recentClips}
              />
            ))}
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
    </div>
  )
}
