import { useState, useCallback, useEffect } from 'react'
import { Heart, MessageCircle, Share2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GlitchTitle } from '../components/GlitchTitle'
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder'

interface UserProfile {
  name: string
  handle: string
  bio: string
  avatar: string
  cover: string
  followers: number
  following: number
  posts: number
}

interface Post {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  image?: string
  liked: boolean
}

interface Comment {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
}

export function SocialPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: { name: 'streamer_xyz', handle: '@streamer_xyz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=streamer_xyz' },
      content: 'just hit a 360 no-scope clutch in ranked. minted it as an NFT on Pulse. BLACKBOX gonna moon 🚀',
      timestamp: '2h ago',
      likes: 234,
      comments: 18,
      shares: 56,
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop',
      liked: false,
    },
    {
      id: '2',
      author: { name: 'esports_pro', handle: '@esports_pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=esports_pro' },
      content: 'Pulse > YouTube clips. Zero delays. Revenue split. Community owns. This is the future of streaming.',
      timestamp: '4h ago',
      likes: 1205,
      comments: 89,
      shares: 423,
      liked: false,
    },
    {
      id: '3',
      author: { name: 'defi_trader', handle: '@defi_trader', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=defi_trader' },
      content: 'captured my +$50k trade execution. now it\'s a tokenized moment forever. this is the new collectible 📊',
      timestamp: '6h ago',
      likes: 567,
      comments: 42,
      shares: 145,
      image: 'https://images.unsplash.com/photo-1611974789882-a6c03bf63ecb?w=500&h=300&fit=crop',
      liked: false,
    },
  ])

  const [showPostModal, setShowPostModal] = useState(false)
  const [postText, setPostText] = useState('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({
    '1': [
      {
        id: 'c1',
        author: { name: 'gaming_fan', handle: '@gaming_fan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gaming_fan' },
        content: 'bro that was insane!! gonna grab this NFT for sure',
        timestamp: '1h ago',
        likes: 42,
      },
    ],
    '2': [],
    '3': [],
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem('pulseUserProfile')
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }, [])

  const toggleLike = useCallback((postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        }
      }
      return post
    }))
  }, [posts])

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId)
    if (post) {
      alert(`🎬 Shared: "${post.content.substring(0, 50)}..."\n\nSimulating share to Solana network...\n✓ Share broadcast successful!`)
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, shares: p.shares + 1 }
        }
        return p
      }))
    }
  }

  const handlePost = () => {
    if (postText.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        author: {
          name: userProfile?.name || 'you',
          handle: userProfile?.handle || '@yourhandle',
          avatar: userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
        },
        content: postText,
        timestamp: 'now',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
      }
      setPosts([newPost, ...posts])
      setPostText('')
      setShowPostModal(false)
      alert('✓ Post created!\n\nYour moment is now live on the Pulse feed.')
    }
  }

  const openComments = (post: Post) => {
    setSelectedPost(post)
    setShowComments(true)
  }

  return (
    <div className="pb-28 pt-20">
      {/* Header */}
      <div className="sticky top-16 z-30 border-b border-purple-900/30 bg-slate-950/95 backdrop-blur-xl px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <GlitchTitle 
            text="Pulse Community" 
            className="text-2xl md:text-3xl mb-0"
          />
          <p className="text-slate-400 text-sm font-mono mt-1">Share your moments. Comment. Like. Own the culture.</p>
        </div>
      </div>

      {/* Pulse Intro Card */}
      <div className="max-w-2xl mx-auto px-4 mt-6">
        <div className="mb-8 p-6 bg-gradient-to-br from-pink-950/60 to-slate-950/40 border border-pink-700/40 rounded-lg backdrop-blur">
          <div>
            <p className="text-xs font-mono text-pink-400 uppercase tracking-wide mb-2">Social Tokenization</p>
            <h3 className="text-lg font-bold text-pink-200 mb-2 font-mono">Your Moments. Your Community. Your Revenue.</h3>
            <p className="text-sm text-slate-300 leading-relaxed">Share clips, trades, and highlights. Comment on the culture. Like what matters. Every interaction tokenizes your network. This is community ownership on-chain.</p>
          </div>
        </div>
      </div>

      {/* Create Profile Card */}
      {!userProfile && (
        <div className="max-w-2xl mx-auto px-4 mb-8">
          <Link
            to="/app/profile"
            className="block border border-purple-700/30 rounded-lg p-6 bg-gradient-to-r from-purple-950/40 to-purple-900/20 hover:border-purple-600/50 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-1 font-mono">Create Your Profile</h3>
                <p className="text-sm text-slate-400">Set up your profile to interact with the community and share your moments.</p>
              </div>
              <div className="text-purple-300 font-mono text-lg">→</div>
            </div>
          </Link>
        </div>
      )}

      {/* Post Composer */}
      <div className="max-w-2xl mx-auto px-4 mb-6">
        <div className="border border-purple-700/30 rounded-lg p-4 bg-purple-950/10 hover:border-purple-600/50 transition cursor-pointer" onClick={() => setShowPostModal(true)}>
          <div className="flex gap-4">
            <img 
              src={userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you'} 
              alt="Your avatar" 
              className="w-10 h-10 rounded-full"
              onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder={userProfile ? "Share your moment..." : "Create a profile first..."}
                className="w-full bg-transparent text-purple-300 placeholder-slate-400 font-mono text-sm outline-none cursor-pointer"
                readOnly
                onClick={() => setShowPostModal(true)}
              />
              <div className="mt-3 flex gap-2">
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono text-xs uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition" onClick={() => setShowPostModal(true)}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border border-purple-700/30 rounded-lg p-6 bg-purple-950/10 hover:border-purple-600/50 transition">
            {/* Post Header */}
            <div className="flex gap-4 mb-4">
              <Link to={`/app/profile/${post.author.handle.replace('@', '')}`}>
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full hover:opacity-80 transition cursor-pointer"
                  onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
                />
              </Link>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link to={`/app/profile/${post.author.handle.replace('@', '')}`} className="font-bold text-purple-300 hover:text-purple-200 transition">
                    {post.author.name}
                  </Link>
                  <span className="text-slate-400">{post.author.handle}</span>
                  <span className="text-slate-500 text-sm">·</span>
                  <span className="text-slate-500 text-sm">{post.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-slate-300 mb-4 leading-relaxed">{post.content}</p>

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Post media"
                className="w-full rounded-lg mb-4 max-h-80 object-cover"
                onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
              />
            )}

            {/* Engagement Stats */}
            <div className="text-slate-400 text-sm mb-4 space-x-4 px-4 py-3 border-t border-b border-purple-900/20">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>

            {/* Interaction Buttons */}
            <div className="flex items-center justify-between px-4 text-slate-400">
              <button 
                onClick={() => openComments(post)}
                className="flex items-center gap-2 hover:text-pink-400 transition group flex-1 justify-center py-2 rounded hover:bg-pink-500/10"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition" />
                <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Comment</span>
              </button>
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-2 transition group flex-1 justify-center py-2 rounded ${
                  post.liked ? 'text-red-400 bg-red-500/10' : 'hover:text-red-400 hover:bg-red-500/10'
                }`}
              >
                <Heart 
                  size={18} 
                  className={`transition ${post.liked ? 'fill-current' : ''} group-hover:scale-110`}
                  fill={post.liked ? 'currentColor' : 'none'}
                />
                <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">{post.liked ? 'Liked' : 'Like'}</span>
              </button>
              <button 
                onClick={() => handleShare(post.id)}
                className="flex items-center gap-2 hover:text-blue-400 transition group flex-1 justify-center py-2 rounded hover:bg-blue-500/10"
              >
                <Share2 size={18} className="group-hover:scale-110 transition" />
                <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-700/50 rounded-lg w-full max-w-lg shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-900/30">
              <h2 className="text-lg font-bold text-purple-300 font-mono">Share Your Moment</h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-purple-300 transition p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <img
                  src={userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you'}
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full"
                  onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
                />
                <div className="flex-1">
                <p className="font-bold text-purple-300 font-mono">{userProfile?.name || 'Your Account'}</p>
                <p className="text-sm text-slate-400">{userProfile?.handle || '@yourhandle'}</p>
                </div>
              </div>

              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's happening?!"
                className="w-full bg-transparent text-purple-300 placeholder-slate-400 font-mono text-lg outline-none resize-none"
                rows={6}
              />

              <div className="text-xs text-slate-400 font-mono">
                {postText.length} characters
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-4 border-t border-purple-900/30">
              <button
                onClick={() => setShowPostModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-purple-400/50 text-purple-300 font-mono font-bold text-sm uppercase tracking-wider hover:bg-purple-500/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={!postText.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold text-sm uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && selectedPost && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-700/50 rounded-lg w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-900/30 sticky top-0 bg-slate-900/95">
              <h2 className="text-lg font-bold text-purple-300 font-mono">Comments</h2>
              <button
                onClick={() => setShowComments(false)}
                className="text-slate-400 hover:text-purple-300 transition p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Original Post */}
            <div className="p-4 border-b border-purple-900/20 bg-purple-950/20">
              <div className="flex gap-3 mb-3">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-10 h-10 rounded-full"
                  onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
                />
                <div>
                  <p className="font-bold text-purple-300 text-sm">{selectedPost.author.name}</p>
                  <p className="text-xs text-slate-400">{selectedPost.author.handle}</p>
                </div>
              </div>
              <p className="text-sm text-slate-300">{selectedPost.content}</p>
            </div>

            {/* Comments List */}
            <div className="p-4 space-y-4">
              {comments[selectedPost.id]?.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-purple-300 text-sm">{comment.author.name}</span>
                      <span className="text-slate-400 text-xs">{comment.author.handle}</span>
                      <span className="text-slate-500 text-xs">·</span>
                      <span className="text-slate-500 text-xs">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">{comment.content}</p>
                    <p className="text-xs text-slate-500 mt-2">{comment.likes} likes</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-purple-900/30 sticky bottom-0 bg-slate-900/95">
              <div className="flex gap-3">
                <img
                  src={userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you'}
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full"
                  onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
                />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Reply..."
                    className="flex-1 bg-purple-950/30 border border-purple-700/30 rounded-full px-4 py-2 text-purple-300 placeholder-slate-400 font-mono text-sm outline-none focus:border-purple-600/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        const newComment: Comment = {
                          id: `c${Date.now()}`,
                          author: { name: userProfile?.name || 'you', handle: userProfile?.handle || '@yourhandle', avatar: userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
                          content: e.currentTarget.value,
                          timestamp: 'now',
                          likes: 0,
                        }
                        setComments({
                          ...comments,
                          [selectedPost.id]: [...(comments[selectedPost.id] || []), newComment],
                        })
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono text-xs uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
