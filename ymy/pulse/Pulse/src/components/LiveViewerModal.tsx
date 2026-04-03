import { X, Send, Zap, Users, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { TokenizationModal } from './TokenizationModal'
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder'

interface LiveViewerModalProps {
  title: string
  streamer: string
  avatar: string
  viewers: string
  onClose: () => void
}

export function LiveViewerModal(props: LiveViewerModalProps) {
  const [messages, setMessages] = useState([
    { user: 'ProPlayer88', message: 'THIS IS INSANE', color: 'purple' },
    { user: 'SportsHub', message: 'What a moment!', color: 'orange' },
    { user: 'SpeedGamer92', message: 'GG', color: 'cyan' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showTokenize, setShowTokenize] = useState(false)
  const [clipSaved, setClipSaved] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: 'You', message: newMessage, color: 'purple' }])
      setNewMessage('')
    }
  }

  const handleClipMoment = () => {
    setClipSaved(true)
    setShowTokenize(true)
    setTimeout(() => setClipSaved(false), 2000)
  }

  const mockThumbnail = 'https://images.unsplash.com/photo-1538481143235-5d8e32e94d82?w=800&h=450&fit=crop'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative bg-slate-900 border border-purple-700/50 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row">
        {/* Video Player Section */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-700/30 bg-slate-900/95">
            <h2 className="text-lg font-bold text-purple-300 font-mono truncate">{props.title}</h2>
            <button
              onClick={props.onClose}
              className="text-slate-400 hover:text-purple-300 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Video */}
          <div className="flex-1 bg-slate-950 relative flex items-center justify-center">
            <img
              src={mockThumbnail}
              alt="Stream"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = PULSE_LOGO_URI
              }}
            />

            {/* Live indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">LIVE</span>
            </div>

            {/* Viewer count */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-mono text-slate-200">
              <Users size={14} />
              {props.viewers}
            </div>

            {/* Clip moment button - centered overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handleClipMoment}
                className={`px-6 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all ${
                  clipSaved
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-400'
                }`}
              >
                <Zap size={18} />
                {clipSaved ? 'Clip Saved!' : 'Clip This Moment'}
              </button>
            </div>

            {/* Info overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm text-slate-200 font-mono">{props.streamer}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-purple-700/30 bg-slate-950/50 flex gap-2">
            <button className="flex-1 px-4 py-3 bg-purple-600/20 border border-purple-500/50 text-purple-300 font-mono font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-purple-600/30 transition-all active:scale-95">
              ❤️ Like
            </button>
            <button className="flex-1 px-4 py-3 bg-purple-600/20 border border-purple-500/50 text-purple-300 font-mono font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-purple-600/30 transition-all active:scale-95">
              💬 Share
            </button>
            <button className="flex-1 px-4 py-3 bg-purple-600 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-purple-700 transition-all active:scale-95">
              Follow
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-purple-700/30 bg-slate-950/50">
          {/* Chat header */}
          <div className="p-4 border-b border-purple-700/30 flex items-center gap-2">
            <MessageCircle size={16} className="text-purple-400" />
            <h3 className="text-sm font-bold text-purple-300 font-mono">Live Chat</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className="text-xs">
                <p className={`font-mono font-bold ${
                  msg.color === 'purple' ? 'text-purple-300' :
                  msg.color === 'orange' ? 'text-orange-300' :
                  'text-cyan-300'
                }`}>
                  {msg.user}
                </p>
                <p className="text-slate-300 text-xs break-words">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-purple-700/30 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Say something..."
              className="flex-1 px-3 py-3 bg-slate-800 border border-purple-700/30 rounded-lg text-slate-200 text-xs font-mono focus:border-purple-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all active:scale-95"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {showTokenize && (
        <TokenizationModal
          clipTitle={`Clip from: ${props.title}`}
          creator={props.streamer}
          thumbnail={mockThumbnail}
          onClose={() => setShowTokenize(false)}
        />
      )}
    </div>
  )
}
