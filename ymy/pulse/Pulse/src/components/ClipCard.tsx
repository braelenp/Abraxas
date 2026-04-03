import { Heart, Play, Zap } from 'lucide-react'
import { useState } from 'react'
import { TokenizationModal } from './TokenizationModal'
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder'

interface ClipCardProps {
  id: string
  title: string
  creator: string
  creatorAvatar: string
  thumbnail: string
  views: string
  likes: string
  duration: string
  timestamp: string
}

export function ClipCard(props: ClipCardProps) {
  const [liked, setLiked] = useState(false)
  const [showTokenize, setShowTokenize] = useState(false)

  return (
    <>
      <div className="group relative bg-slate-900/50 rounded-lg border border-purple-700/20 overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(153,69,255,0.2)]">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video bg-slate-950 flex items-center justify-center">
          <img
            src={props.thumbnail}
            alt={props.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = PULSE_LOGO_URI
            }}
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Play size={24} className="text-white fill-white ml-1" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-mono text-white">
            {props.duration}
          </div>

          {/* Timestamp badge */}
          <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-mono text-purple-300">
            {props.timestamp}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-3">
          {/* Title */}
          <h3 className="text-sm font-bold text-slate-200 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {props.title}
          </h3>

          {/* Creator info */}
          <div className="flex items-center gap-2">
            <img
              src={props.creatorAvatar}
              alt={props.creator}
              className="w-8 h-8 rounded-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = PULSE_LOGO_URI
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-slate-300 truncate">{props.creator}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{props.views} views</span>
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 transition-all active:scale-95 ${
                liked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'
              }`}
            >
              <Heart size={14} className={liked ? 'fill-red-500' : ''} />
              {props.likes}
            </button>
          </div>

          {/* Tokenize button */}
          <button
            onClick={() => setShowTokenize(true)}
            className="w-full mt-3 px-3 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition-all shadow-[0_0_20px_rgba(153,69,255,0.3)] active:scale-95 flex items-center justify-center gap-2"
          >
            <Zap size={14} />
            Tokenize as NFT
          </button>
        </div>
      </div>

      {showTokenize && (
        <TokenizationModal
          clipTitle={props.title}
          creator={props.creator}
          thumbnail={props.thumbnail}
          onClose={() => setShowTokenize(false)}
        />
      )}
    </>
  )
}
