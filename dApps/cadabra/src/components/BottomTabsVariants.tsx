/**
 * Advanced Bottom Tabs Variant
 * Features rune-style symbols and advanced animations
 * Better matches Abraxas aesthetic
 */

type Tab = 'home' | 'explore' | 'post' | 'trending' | 'marketplace' | 'creator-coins' | 'profile'

interface BottomTabsAdvancedProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  showNotifications?: boolean
}

const tabs: Array<{
  id: Tab
  label: string
  rune: string
  description: string
  color: string
}> = [
  {
    id: 'home',
    label: 'Mirror',
    rune: '◇',
    description: 'Your Timeline',
    color: 'from-cyan-400 to-cyan-300',
  },
  {
    id: 'explore',
    label: 'Search',
    rune: '⊛',
    description: 'Discover',
    color: 'from-purple-400 to-pink-300',
  },
  {
    id: 'trending',
    label: 'Trending',
    rune: '⚡',
    description: 'What\'s Hot',
    color: 'from-orange-400 to-red-300',
  },
  {
    id: 'post',
    label: 'Create',
    rune: '✦',
    description: 'Share',
    color: 'from-cyan-300 to-blue-400',
  },
  {
    id: 'marketplace',
    label: 'Market',
    rune: '◈',
    description: 'KOL Exchange',
    color: 'from-purple-300 to-purple-400',
  },
  {
    id: 'creator-coins',
    label: 'Coins',
    rune: '♪',
    description: 'Creator Coins',
    color: 'from-amber-400 to-orange-400',
  },
  {
    id: 'profile',
    label: 'Identity',
    rune: '◉',
    description: 'Your Profile',
    color: 'from-pink-300 to-purple-400',
  },
]

export function BottomTabsAdvanced({
  activeTab,
  setActiveTab,
  showNotifications = false,
}: BottomTabsAdvancedProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 hidden lg:flex justify-center px-6 py-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 to-slate-950/80 backdrop-blur-xl border-t border-cyan-500/20 -z-10" />

      {/* Tabs Container */}
      <div className="flex gap-3 max-w-6xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const tabColor = isActive ? tab.color : 'from-slate-700 to-slate-600'

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
                isActive
                  ? 'px-6 py-3 scale-105'
                  : 'px-5 py-2.5 hover:scale-102'
              }`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tabColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
              />

              {/* Active state glow */}
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 to-purple-400/20 blur-lg -z-10 animate-pulse" />
                  <div className="absolute inset-0 border border-cyan-400/50 rounded-lg" />
                </>
              )}

              {/* Content */}
              <div className="flex flex-col items-center gap-1">
                {/* Rune */}
                <div
                  className={`text-2xl transition-all duration-300 ${
                    isActive
                      ? `text-cyan-300 drop-shadow-[0_0_12px_rgba(0,217,255,0.9)] scale-110`
                      : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                >
                  {tab.rune}
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-bold uppercase tracking-[0.08em] transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-300/95 drop-shadow-sm'
                      : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                >
                  {tab.label}
                </span>

                {/* Description (shown on hover) */}
                <span
                  className={`text-[0.6rem] uppercase tracking-[0.1em] font-mono transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-400/70 opacity-100'
                      : 'text-slate-700 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {tab.description}
                </span>
              </div>

              {/* Notification badge */}
              {showNotifications && tab.id !== 'profile' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border border-orange-300 drop-shadow-[0_0_6px_rgba(255,165,0,0.8)]" />
              )}
            </button>
          )
        })}
      </div>

      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </nav>
  )
}

/**
 * Minimal variant - cleaner, more minimalist
 */
interface BottomTabsMinimalProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const minimalTabs: Array<{ id: Tab; symbol: string; label: string }> = [
  { id: 'home', symbol: '◇', label: 'M' },
  { id: 'explore', symbol: '⊛', label: 'S' },
  { id: 'trending', symbol: '⚡', label: 'T' },
  { id: 'post', symbol: '✦', label: 'C' },
  { id: 'marketplace', symbol: '◈', label: 'K' },
  { id: 'profile', symbol: '◉', label: 'I' },
]

export function BottomTabsMinimal({
  activeTab,
  setActiveTab,
}: BottomTabsMinimalProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 hidden lg:flex justify-center px-6 py-3">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-lg border-t border-cyan-500/20 -z-10" />

      <div className="flex gap-6 max-w-6xl">
        {minimalTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`transition-all duration-300 flex flex-col items-center gap-1 group ${
              activeTab === tab.id ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div
              className={`text-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,217,255,0.9)]'
                  : 'text-slate-600 group-hover:text-slate-500'
              }`}
            >
              {tab.symbol}
            </div>
            <span
              className={`text-xs font-bold tracking-wider transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-cyan-400'
                  : 'text-slate-600 group-hover:text-slate-500'
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
