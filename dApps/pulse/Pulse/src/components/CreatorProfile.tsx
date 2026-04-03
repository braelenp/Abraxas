import { Heart, Share2, MessageCircle, CheckCircle, Radio } from 'lucide-react'
import { useState } from 'react'
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder'

interface CreatorProfileProps {
  name: string
  avatar: string
  category: string
  followers: string
  clips: number
  isLive: boolean
  bio: string
  verified: boolean
  recentClips: Array<{
    id: string
    title: string
    thumbnail: string
    views: string
    likes: string
  }>
}

export function CreatorProfile(props: CreatorProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [expandBio, setExpandBio] = useState(false)

  return (
    <div className="bg-gradient-to-b from-purple-950/40 to-slate-950/40 rounded-xl border border-purple-700/30 overflow-hidden hover:border-purple-500/50 transition-all">
      {/* Header background */}
      <div className="h-20 bg-gradient-to-r from-purple-600/20 to-purple-500/10" />

      {/* Profile content */}
      <div className="px-6 pb-6 -mt-8 relative">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 mb-4">
          <div className="relative">
            <img
              src={props.avatar}
              alt={props.name}
              className="w-20 h-20 rounded-lg border-4 border-slate-900 object-cover"
              onError={(e) => {
                e.currentTarget.src = PULSE_LOGO_URI
              }}
            />
            {props.isLive && (
              <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse" />
            )}
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold text-purple-300">{props.name}</h3>
              {props.verified && <CheckCircle size={18} className="text-cyan-400" />}
            </div>
            <p className="text-sm text-slate-400 font-mono">{props.category}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-slate-800/30 rounded-lg border border-purple-700/20">
          <div className="text-center">
            <p className="text-xs font-mono text-slate-400">Followers</p>
            <p className="text-lg font-bold text-purple-300">{props.followers}</p>
          </div>
          <div className="text-center border-l border-r border-purple-700/20">
            <p className="text-xs font-mono text-slate-400">Clips</p>
            <p className="text-lg font-bold text-purple-300">{props.clips}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-mono text-slate-400">Status</p>
            <p className="text-lg font-bold text-red-400 flex items-center justify-center gap-1">
              {props.isLive ? (
                <>
                  <Radio size={12} className="animate-pulse" />
                  LIVE
                </>
              ) : (
                'Offline'
              )}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className={`text-sm text-slate-300 mb-4 ${!expandBio && 'line-clamp-2'}`}>
          {props.bio}
        </p>
        {props.bio.length > 50 && (
          <button
            onClick={() => setExpandBio(!expandBio)}
            className="text-xs text-purple-400 hover:text-purple-300 mb-4 font-mono"
          >
            {expandBio ? 'Show less' : 'Show more'}
          </button>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 px-4 py-3 rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
              isFollowing
                ? 'bg-purple-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400'
            }`}
          >
            {isFollowing ? '✓ Following' : 'Follow'}
          </button>
          <button className="flex-1 px-4 py-3 border border-purple-700/50 text-purple-300 font-mono font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-purple-500/10 transition-all active:scale-95">
            Message
          </button>
        </div>

        {/* Social engagement */}
        <div className="flex gap-3 p-3 bg-slate-800/30 rounded-lg border border-purple-700/20">
          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors">
            <Heart size={14} />
            Like
          </button>
          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-purple-300 transition-colors">
            <MessageCircle size={14} />
            Comment
          </button>
          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition-colors">
            <Share2 size={14} />
            Share
          </button>
        </div>
      </div>

      {/* Recent clips preview */}
      <div className="border-t border-purple-700/30 p-6 bg-slate-950/30">
        <h4 className="text-sm font-bold text-purple-300 mb-3 font-mono">Recent Clips</h4>
        <div className="grid grid-cols-1 gap-2">
          {props.recentClips.slice(0, 3).map((clip) => (
            <div
              key={clip.id}
              className="flex gap-2 p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800/80 transition-all cursor-pointer"
            >
              <img
                src={clip.thumbnail}
                alt={clip.title}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = PULSE_LOGO_URI
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-slate-300 truncate">{clip.title}</p>
                <p className="text-xs text-slate-500">{clip.views} • {clip.likes} likes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
