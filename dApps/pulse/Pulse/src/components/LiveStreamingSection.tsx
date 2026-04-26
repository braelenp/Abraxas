import { useState } from 'react'
import { X, MessageCircle, Users, Heart } from 'lucide-react'

interface LiveStreamingSectionProps {
  onClose: () => void
}

export function LiveStreamingSection({ onClose }: LiveStreamingSectionProps) {
  const [messages, setMessages] = useState([
    { user: 'ProStreamer', text: 'This game is insane!', timestamp: '2:45' },
    { user: 'GamerX', text: 'LFG! 🔥', timestamp: '2:43' },
    { user: 'Clip_Master', text: 'Just tokenized your previous clip!', timestamp: '2:40' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        user: 'You',
        text: newMessage,
        timestamp: 'now',
      }])
      setNewMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition font-mono"
      >
        <X size={16} />
        Back to Feed
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-black border border-purple-700/30 aspect-video flex items-center justify-center relative overflow-hidden">
            {/* Mock video stream */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-slate-900 to-slate-950 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-purple-500 flex items-center justify-center mb-4 animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🎮</span>
                </div>
              </div>
              <p className="text-purple-300 font-bold text-lg mb-2">ProStreamer LIVE</p>
              <p className="text-slate-400 text-sm font-mono">Valorant Ranked Push</p>
              <div className="mt-4 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-red-300" />
                2,547 watching
              </div>
            </div>

            {/* Stream Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
              <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-mono font-bold hover:bg-purple-700 transition">
                Follow
              </button>
              <button className="px-4 py-2 rounded-lg border border-purple-500/50 text-purple-300 text-sm font-mono font-bold hover:bg-purple-500/10 transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Stream Info */}
          <div className="mt-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">Valorant Ranked Push - Road to 5k RR</h2>
                <p className="text-slate-400 text-sm mt-1">ProStreamer • 2,547 watching • Started 1h ago</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition text-sm">
                <Heart size={16} />
                Like
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition text-sm">
                <Users size={16} />
                Share
              </button>
            </div>

            {/* Stream Description */}
            <div className="rounded-lg bg-purple-950/20 border border-purple-700/20 p-4">
              <p className="text-sm text-slate-300">
                Watch live as we push to 5k RR in Valorant! Every moment is being tokenized. Top clip moments get auto-minted as BlackBox NFTs with revenue sharing enabled. 
                <br /><br />
                <span className="text-purple-300 font-mono text-xs">🎬 Moments auto-tokenize • 💰 Split revenue • 🔗 On-chain ownership</span>
              </p>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="rounded-lg border border-purple-700/30 bg-slate-900/50 flex flex-col h-[500px]">
          {/* Chat Header */}
          <div className="border-b border-purple-700/20 p-4 font-mono text-sm font-bold text-purple-300 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} />
              Live Chat ({messages.length})
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className="text-sm">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-purple-300 text-xs">{msg.user}</span>
                  <span className="text-slate-500 text-xs">{msg.timestamp}</span>
                </div>
                <p className="text-slate-300 text-sm mt-0.5">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-purple-700/20 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Say something..."
                className="flex-1 rounded-lg bg-slate-800/50 border border-purple-700/30 text-white text-sm px-3 py-2 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
