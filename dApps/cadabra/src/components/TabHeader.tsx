type Tab = 'home' | 'explore' | 'post' | 'trending' | 'marketplace' | 'creator-coins' | 'profile'

interface TabHeaderProps {
  activeTab: Tab
  isTransitioning: boolean
  sidebarOpen: boolean
  onSidebarToggle: () => void
}

const tabLabels: Record<Tab, string> = {
  home: '🏠 Home',
  explore: '🔍 Explore',
  post: '✍️ Compose',
  trending: '⚡ Trending',
  marketplace: '👥 KOL Market',
  'creator-coins': '🎵 Creator Coins',
  profile: '👤 Profile',
}

export function TabHeader({ activeTab, isTransitioning, sidebarOpen, onSidebarToggle }: TabHeaderProps) {
  return (
    <div className="sticky top-0 z-50 glass-sm px-4 py-3 border-b border-cyan-400/10 md:pt-3 pt-20">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onSidebarToggle}
            className="flex items-center justify-center w-8 h-8 text-cyan-300 hover:text-cyan-100 transition smooth-hover"
            title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <p className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 glitch">
            {tabLabels[activeTab]}
          </p>
        </div>
        {isTransitioning && <div className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />}
      </div>
    </div>
  )
}
