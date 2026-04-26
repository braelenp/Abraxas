import { useState } from 'react'
import { Heart, MessageCircle, Share2, Zap } from 'lucide-react'
import { GlitchTitle } from '../components/GlitchTitle'

interface GamingPost {
  id: string
  title: string
  content: string
  icon: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  liked: boolean
}

export function GamingPage() {
  const [posts] = useState<GamingPost[]>([
    {
      id: '1',
      title: 'Apex Legends Integration',
      content: 'Apex Legends integration is now in motion inside the Abraxas gaming layer.\nPulse will host the tokenized gaming experience.\nTournaments, leaderboards, $ABRA rewards, and BlackBox NFT drops for top performers.\nThe battlefield is being prepared.\nThe Abraxas team rises.',
      icon: '⚔️',
      timestamp: 'Mar 28, 2026',
      likes: 2847,
      comments: 342,
      shares: 584,
      liked: false
    },
    {
      id: '2',
      title: 'The Apex Realm',
      content: 'The Apex Realm is coming.\nRanked cups, seasonal finals, and community tournaments — all inside Pulse / Cadabra.\nEarn $ABRA, mint tournament moments as NFTs, climb the Abraxas leaderboard.\nThe first installment of the tokenized gaming layer is being built.\nMore soon.',
      icon: '🎮',
      timestamp: 'Mar 27, 2026',
      likes: 1923,
      comments: 287,
      shares: 456,
      liked: false
    }
  ])

  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    '1': 2847,
    '2': 1923
  })

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({
    '1': false,
    '2': false
  })

  const toggleLike = (postId: string) => {
    const isLiked = likedPosts[postId]
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }))
    setLikeCounts(prev => ({
      ...prev,
      [postId]: isLiked ? (prev[postId] || 0) - 1 : (prev[postId] || 0) + 1
    }))
  }

  return (
    <div className="pb-28 pt-20">
      {/* Header */}
      <div className="sticky top-16 z-30 border-b border-purple-900/30 bg-slate-950/95 backdrop-blur-xl px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <GlitchTitle 
            text="Apex Gaming Layer" 
            className="text-2xl md:text-3xl mb-0"
          />
          <p className="text-slate-400 text-sm font-mono mt-1">Tournaments • Leaderboards • NFT Rewards • $ABRA</p>
        </div>
      </div>

      {/* Intro Card */}
      <div className="max-w-2xl mx-auto px-4 mt-6">
        <div className="mb-8 p-6 bg-gradient-to-br from-orange-950/60 to-slate-950/40 border border-orange-700/40 rounded-lg backdrop-blur">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-orange-400" />
            <p className="text-xs font-mono text-orange-400 uppercase tracking-wide">Gaming Innovation</p>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-orange-200 mb-2 font-mono">Apex Integration</h2>
          <p className="text-sm text-slate-300 leading-relaxed">Tokenized gaming experiences built inside Pulse. Earn $ABRA, mint NFTs of your greatest moments, climb the leaderboards, and own your glory.</p>
        </div>
      </div>

      {/* Gaming Posts Feed */}
      <div className="max-w-2xl mx-auto px-4 space-y-6 mb-12">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-purple-700/30 rounded-lg hover:border-purple-600/50 transition-all"
          >
            {/* Post Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">{post.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-purple-300 font-mono mb-1">{post.title}</h3>
                <p className="text-xs text-slate-400 font-mono">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-6 text-xs text-slate-400 font-mono border-t border-purple-700/20 pt-4">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-2 hover:text-purple-300 transition-colors group"
              >
                <div className={`p-2 rounded-lg ${likedPosts[post.id] ? 'bg-red-500/20 text-red-400' : 'group-hover:bg-purple-600/20 text-slate-400'} transition-colors`}>
                  <Heart size={16} fill={likedPosts[post.id] ? 'currentColor' : 'none'} />
                </div>
                <span className={likedPosts[post.id] ? 'text-red-400' : 'text-slate-400'}>{likeCounts[post.id]}</span>
              </button>

              <div className="flex items-center gap-2 hover:text-purple-300 transition-colors cursor-pointer group">
                <div className="p-2 rounded-lg group-hover:bg-purple-600/20 text-slate-400">
                  <MessageCircle size={16} />
                </div>
                <span>{post.comments}</span>
              </div>

              <div className="flex items-center gap-2 hover:text-purple-300 transition-colors cursor-pointer group">
                <div className="p-2 rounded-lg group-hover:bg-purple-600/20 text-slate-400">
                  <Share2 size={16} />
                </div>
                <span>{post.shares}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Section */}
      <div className="max-w-2xl mx-auto px-4 mt-16 pt-12 border-t border-purple-700/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg text-center hover:border-purple-500/50 transition-all">
            <h3 className="text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide">🏆 Tournaments</h3>
            <p className="text-slate-400/80 text-sm">Ranked cups, seasonal finals, and community brackets</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg text-center hover:border-purple-500/50 transition-all">
            <h3 className="text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide">📊 Leaderboards</h3>
            <p className="text-slate-400/80 text-sm">Climb the ranks and earn $ABRA rewards</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg text-center hover:border-purple-500/50 transition-all">
            <h3 className="text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide">🎁 NFT Drops</h3>
            <p className="text-slate-400/80 text-sm">BlackBox NFTs for top performers and tournaments</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-700/30 rounded-lg text-center hover:border-purple-500/50 transition-all">
            <h3 className="text-lg font-bold text-purple-300 mb-2 font-mono uppercase tracking-wide">💰 $ABRA Rewards</h3>
            <p className="text-slate-400/80 text-sm">Earn tokenized rewards for your achievements</p>
          </div>
        </div>
      </div>
    </div>
  )
}
