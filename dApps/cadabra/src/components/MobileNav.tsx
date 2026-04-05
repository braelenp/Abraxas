type Tab = 'home' | 'explore' | 'post' | 'trending' | 'marketplace' | 'profile'

interface MobileNavProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'explore', label: 'Explore', icon: '🔍' },
  { id: 'post', label: 'Post', icon: '✍️' },
  { id: 'trending', label: 'Trending', icon: '⚡' },
  { id: 'marketplace', label: 'KOL', icon: '👥' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

export function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-cyan-400/25 glass md:hidden bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/80">
      <div className="flex justify-around gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs smooth-transition ${
              activeTab === tab.id
                ? 'border border-cyan-400/50 bg-cyan-500/20 text-cyan-100 glow-cyan shadow-lg shadow-cyan-500/20'
                : 'border border-cyan-400/10 text-cyan-200/70 hover:bg-cyan-500/15 hover:border-cyan-400/20'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="hidden text-[10px] sm:block font-mono">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
