type Tab = 'home' | 'explore' | 'post' | 'trending' | 'marketplace' | 'creator-coins' | 'profile'

interface BottomTabsProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const tabs: Array<{ id: Tab; label: string; icon: string; symbol: string }> = [
  { id: 'home', label: 'Mirror', icon: '◇', symbol: 'HOME' },
  { id: 'explore', label: 'Search', icon: '🔍', symbol: 'FIND' },
  { id: 'trending', label: 'Trending', icon: '⚡', symbol: 'TREND' },
  { id: 'post', label: 'Create', icon: '✨', symbol: 'MAKE' },
  { id: 'marketplace', label: 'Market', icon: '👥', symbol: 'KOLS' },
  { id: 'creator-coins', label: 'Coins', icon: '🎵', symbol: 'EARN' },
  { id: 'profile', label: 'Identity', icon: '👤', symbol: 'SELF' },
]

export function BottomTabs({ activeTab, setActiveTab }: BottomTabsProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-cyan-400/15 bg-slate-950/94 backdrop-blur-xl hidden lg:flex justify-center px-6 py-4">
      <div className="flex gap-4 max-w-6xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-2 px-6 py-2 rounded-lg smooth-transition transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-cyan-300'
                : 'text-slate-600 hover:text-slate-500'
            }`}
          >
            <div
              className={`text-2xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'drop-shadow-[0_0_12px_rgba(0,217,255,0.8)]'
                  : ''
              }`}
            >
              {tab.icon}
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span
                className={`text-xs font-bold uppercase tracking-[0.08em] transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-cyan-300/90'
                    : 'text-slate-600'
                }`}
              >
                {tab.label}
              </span>
              <span
                className={`text-[0.65rem] uppercase tracking-[0.15em] font-mono transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-cyan-400/70'
                    : 'text-slate-700'
                }`}
              >
                {tab.symbol}
              </span>
            </div>
          </button>
        ))}
      </div>
    </nav>
  )
}
