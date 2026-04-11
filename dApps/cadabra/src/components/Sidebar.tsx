type Tab = 'home' | 'explore' | 'post' | 'trending' | 'marketplace' | 'creator-coins' | 'pulse' | 'profile'

interface SidebarProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  isOpen: boolean
}

const navItems: Array<{ id: Tab; label: string; icon: string }> = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'explore', label: 'Explore', icon: '🔍' },
  { id: 'marketplace', label: 'KOL Market', icon: '👥' },
  { id: 'trending', label: 'Trending', icon: '⚡' },
  { id: 'creator-coins', label: 'Creator Coins', icon: '🎵' },
  { id: 'pulse', label: 'Pulse', icon: '🎬' },
  { id: 'post', label: 'Compose', icon: '✍️' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

export function Sidebar({ activeTab, setActiveTab, isOpen }: SidebarProps) {
  return (
    <aside className={`fixed md:static left-0 top-0 h-screen border-r border-cyan-400/25 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 backdrop-blur px-4 py-8 flex flex-col shadow-2xl shadow-cyan-500/10 z-40 md:z-auto transition-all duration-300 overflow-hidden ${
      isOpen ? 'w-64' : 'w-0 md:w-20'
    } ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      {/* Logo */}
      <div className="mb-8 pb-4 border-b border-cyan-400/20">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500">◇</div>
            <div>
              <p className="text-lg tracking-[0.3em] text-cyan-300 font-bold">CADABRA</p>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/50 font-mono">Protocol</p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-2 mt-4">
        {navItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`slide-in-up flex items-center rounded-lg px-4 py-3 text-left text-sm transition smooth-hover ${
              isOpen ? 'gap-3' : 'justify-center'
            } ${
              activeTab === item.id
                ? 'border border-purple-300/60 bg-purple-600/30 text-purple-100 glow-purple shadow-lg shadow-purple-500/20'
                : 'border border-cyan-400/10 text-purple-200/75 hover:bg-cyan-500/10 hover:border-cyan-400/20'
            }`}
            style={{ animationDelay: `${idx * 50}ms` }}
            title={!isOpen ? item.label : undefined}
          >
            <span className="text-lg smooth-transition">{item.icon}</span>
            {isOpen && <span className="font-semibold">{item.label}</span>}
          </button>
        ))}
      </nav>

      {isOpen && (
        <div className="space-y-3 border-t border-cyan-400/20 pt-4 mt-4">
          <p className="text-xs uppercase tracking-[0.15em] text-cyan-100/40 font-mono text-center">◇ Social Protocol ◇</p>
        </div>
      )}
    </aside>
  )
}
