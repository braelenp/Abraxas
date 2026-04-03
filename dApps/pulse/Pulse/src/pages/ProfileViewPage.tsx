import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Link as LinkIcon, Heart } from 'lucide-react'
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

const mockProfiles: { [key: string]: UserProfile } = {
  streamer_xyz: {
    name: 'streamer_xyz',
    handle: '@streamer_xyz',
    bio: 'Gaming clutches & NFT moments. Streaming competitive FPS titles. Building the metaverse one clip at a time.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=streamer_xyz',
    cover: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=400&fit=crop',
    followers: 2450,
    following: 186,
    posts: 342,
  },
  esports_pro: {
    name: 'esports_pro',
    handle: '@esports_pro',
    bio: 'Professional esports player. Competing in international tournaments. Creator economy advocate.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=esports_pro',
    cover: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&h=400&fit=crop',
    followers: 5621,
    following: 234,
    posts: 856,
  },
  defi_trader: {
    name: 'defi_trader',
    handle: '@defi_trader',
    bio: 'DeFi trader & blockchain enthusiast. Building wealth through strategy & timing.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=defi_trader',
    cover: 'https://images.unsplash.com/photo-1611974789882-a6c03bf63ecb?w=1200&h=400&fit=crop',
    followers: 3241,
    following: 412,
    posts: 1205,
  },
}

export function ProfileViewPage() {
  const { handle } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [showFollowModal, setShowFollowModal] = useState(false)

  useEffect(() => {
    if (handle) {
      const cleanHandle = handle.replace('@', '')
      const userProfile = mockProfiles[cleanHandle]
      if (userProfile) {
        setProfile(userProfile)
      } else {
        navigate('/app/social')
      }
    }
  }, [handle, navigate])

  if (!profile) return null

  return (
    <div className="pb-28 pt-16">
      {/* Header */}
      <div className="sticky top-16 z-30 border-b border-purple-900/30 bg-slate-950/95 backdrop-blur-xl px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/app/social')}
            className="p-2 hover:bg-purple-600/20 rounded-full transition"
          >
            <ArrowLeft size={20} className="text-purple-300" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-purple-300 font-mono">{profile.name}</h1>
            <p className="text-xs text-slate-400">{profile.posts} posts</p>
          </div>
        </div>
      </div>

      {/* Profile Container */}
      <div className="max-w-2xl mx-auto">
        {/* Cover Image */}
        <div className="h-48 overflow-hidden border-b border-purple-900/30">
          <img
            src={profile.cover}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
          />
        </div>

        {/* Profile Info Card */}
        <div className="px-4 py-6 border-b border-purple-900/30 bg-purple-950/10">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end mb-6">
            {/* Avatar */}
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full border-4 border-slate-950 object-cover -mt-12 sm:-mt-16"
              onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
            />
            <div className="flex-1">
              <GlitchTitle 
                text={profile.name} 
                className="text-2xl"
              />
              <p className="text-purple-400 font-mono">{profile.handle}</p>
            </div>
            <button
              onClick={() => setShowFollowModal(true)}
              className={`px-6 py-2 rounded-full font-mono font-bold text-sm uppercase tracking-wider transition ${
                isFollowing
                  ? 'bg-slate-800 border border-purple-600 text-purple-300 hover:bg-slate-900'
                  : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Bio */}
          <p className="text-slate-300 mb-6 leading-relaxed">{profile.bio}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-purple-700/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-300">{profile.posts}</p>
              <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest">Posts</p>
            </div>
            <div className="bg-slate-900/50 border border-purple-700/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-300">{profile.followers}</p>
              <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest">Followers</p>
            </div>
            <div className="bg-slate-900/50 border border-purple-700/30 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-300">{profile.following}</p>
              <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest">Following</p>
            </div>
          </div>
        </div>

        {/* Latest Posts Section */}
        <div className="px-4 py-8 border-b border-purple-900/30">
          <h3 className="text-lg font-bold text-purple-300 mb-6 font-mono uppercase tracking-wider">Latest Moments</h3>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-purple-700/30 rounded-lg p-4 bg-purple-950/10 hover:border-purple-600/50 transition cursor-pointer">
                <div className="flex gap-3">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => { e.currentTarget.src = PULSE_LOGO_URI }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-purple-300 text-sm">{profile.name}</span>
                      <span className="text-slate-500 text-xs">·</span>
                      <span className="text-slate-500 text-xs">{Math.floor(Math.random() * 24) + 1}h ago</span>
                    </div>
                    <p className="text-sm text-slate-300 mt-2">Amazing moment from {profile.name} - check it out on the feed!</p>
                    <div className="flex gap-6 mt-3 text-slate-500 text-xs">
                      <button className="hover:text-red-400 transition flex items-center gap-1">
                        <Heart size={14} />
                        {Math.floor(Math.random() * 500) + 10}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 py-8 space-y-4">
          <h3 className="text-lg font-bold text-purple-300 font-mono uppercase tracking-wider mb-6">About</h3>
          <div className="space-y-4 text-slate-400 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-purple-400" />
              <span>Creator on Pulse</span>
            </div>
            <div className="flex items-center gap-3">
              <LinkIcon size={18} className="text-purple-400" />
              <span>Joined March 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Follow Confirmation Modal */}
      {showFollowModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-700/50 rounded-lg p-8 max-w-sm shadow-2xl text-center">
            <h2 className="text-xl font-bold text-purple-300 mb-2 font-mono">
              {isFollowing ? 'Unfollow' : 'Follow'} {profile.name}?
            </h2>
            <p className="text-slate-400 mb-6 text-sm">
              {isFollowing
                ? "You won't see their posts on your timeline anymore."
                : 'You will see their posts on your timeline.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFollowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-purple-400/50 text-purple-300 font-mono font-bold text-sm uppercase tracking-wider hover:bg-purple-500/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsFollowing(!isFollowing)
                  setShowFollowModal(false)
                  alert(`✓ ${isFollowing ? 'Unfollowed' : 'Following'} ${profile.name}!`)
                }}
                className={`flex-1 px-4 py-2 rounded-lg font-mono font-bold text-sm uppercase tracking-wider transition ${
                  isFollowing
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400'
                }`}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
