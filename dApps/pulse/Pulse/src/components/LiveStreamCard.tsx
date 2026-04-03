import { Play, Users, Zap, Heart } from 'lucide-react'
import { useState } from 'react'
import { LiveViewerModal } from './LiveViewerModal'
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder'

interface LiveStreamCardProps {
  id: string
  title: string
  streamer: string
  avatar: string
  thumbnail: string
  viewers: string
  category: string
  liveTime: string
}

export function LiveStreamCard(props: LiveStreamCardProps) {
  const [showViewer, setShowViewer] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <>
      <div className="group relative bg-slate-900/50 rounded-lg border border-purple-700/20 overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(153,69,255,0.2)]">
        {/* Thumbnail with live indicator */}
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

          {/* Live indicator */}
          <div className="absolute top-2 left-2 flex items-center gap-2 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full">
            <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" />
            <span className="text-xs font-mono font-bold text-white uppercase">LIVE</span>
          </div>

          {/* Viewer count */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-mono text-slate-200">
            <Users size={12} />
            {props.viewers}
          </div>

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={() => setShowViewer(true)}
              className="w-12 h-12 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-500"
            >
              <Play size={24} className="text-white fill-white ml-1" />
            </button>
          </div>

          {/* Live time */}
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-mono text-slate-200">
            {props.liveTime}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-sm font-bold text-slate-200 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {props.title}
          </h3>

          {/* Streamer info */}
          <div className="flex items-center gap-2">
            <img
              src={props.avatar}
              alt={props.streamer}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = PULSE_LOGO_URI
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-slate-300 truncate">{props.streamer}</p>
            </div>
            <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-300 rounded font-mono">
              {props.category}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex-1 px-2 py-3 rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
                liked
                  ? 'bg-red-600/30 text-red-300 border border-red-500/50'
                  : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-red-500/50'
              }`}
            >
              <Heart size={14} className={`${liked ? 'fill-red-300' : ''}`} />
            </button>
            <button
              onClick={() => setShowViewer(true)}
              className="flex-1 px-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              <Zap size={14} />
              Watch & Clip
            </button>
          </div>
        </div>
      </div>

      {showViewer && (
        <LiveViewerModal
          title={props.title}
          streamer={props.streamer}
          avatar={props.avatar}
          viewers={props.viewers}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  )
}
