import { useState } from 'react'
import { Home, Radio, Zap, Gamepad2, Wallet } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function BottomTabBar() {
  const location = useLocation()
  const [showWallet, setShowWallet] = useState(false)

  const tabs = [
    { icon: Home, label: 'Feed', path: '/app', id: 'feed' },
    { icon: Gamepad2, label: 'Gaming', path: '/app/gaming', id: 'gaming' },
    { icon: Radio, label: 'Live', path: '/app/live', id: 'live' },
    { icon: Zap, label: 'Forge', path: '/app/tokenize', id: 'tokenize' },
  ]

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app' || location.pathname === '/app/'
    }
    return location.pathname === path
  }

  return (
    <>
      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pt-3 pb-safe bg-gradient-to-t from-slate-950 via-slate-950 to-slate-950/80 backdrop-blur-xl border-t border-purple-500/40 shadow-[inset_0_2px_20px_rgba(168,85,247,0.15),0_-10px_30px_rgba(168,85,247,0.1)]">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-1">
          {/* Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 justify-center flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const active = isActive(tab.path)
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md transition-all text-xs font-mono uppercase tracking-wider relative group ${
                    active
                      ? 'bg-purple-600/40 text-purple-300 border border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.5),inset_0_0_10px_rgba(168,85,247,0.2)]'
                      : 'text-slate-400 hover:text-purple-300 border border-purple-500/20 hover:border-purple-400/60 hover:bg-purple-600/15 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                  }`}
                >
                  <Icon size={16} className="sm:size-18" />
                  <span className="text-xs font-bold leading-tight">{tab.label}</span>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-md -z-10 transition-opacity ${
                    active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0) 100%)',
                  }} />
                </Link>
              )
            })}
          </div>

          {/* Wallet Button */}
          <button
            onClick={() => setShowWallet(!showWallet)}
            className="flex items-center gap-2 px-3 sm:px-3 py-2 rounded-md border border-purple-400/60 text-purple-300 hover:bg-purple-500/20 hover:border-purple-300/80 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all text-xs sm:text-sm font-mono uppercase tracking-wider mt-2 sm:mt-0 sm:ml-2 relative group"
          >
            <Wallet size={16} />
            <span className="hidden sm:inline text-xs">Wallet</span>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0) 100%)',
            }} />
          </button>
        </div>
      </div>

      {/* Wallet Modal */}
      {showWallet && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40">
          <div className="fixed bottom-16 right-4 bg-slate-900 border border-purple-700/50 rounded-lg p-4 shadow-2xl w-80 max-w-[calc(100vw-2rem)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-purple-300 font-mono">Wallet</h3>
              <button
                onClick={() => setShowWallet(false)}
                className="text-slate-400 hover:text-purple-300 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-purple-950/50 rounded border border-purple-700/30">
                <p className="text-xs text-slate-400 font-mono mb-1">Connected Wallet</p>
                <p className="text-purple-300 font-mono text-sm truncate">Not Connected</p>
              </div>

              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition-all">
                Connect Wallet
              </button>

              <button className="w-full px-4 py-2 rounded-lg border border-purple-400/50 text-purple-300 font-mono font-bold text-xs uppercase tracking-wider hover:bg-purple-500/10 transition-all">
                View Balance
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
