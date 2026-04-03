import React from 'react'

interface Tab {
  id: string
  label: string
  symbol: string
  icon: string
}

const TABS: Tab[] = [
  { id: 'dashboard', label: 'Guardian', symbol: 'ᛉ', icon: '🛡️' },
  { id: 'vaults', label: 'Sophia', symbol: 'ᚨ', icon: '🏛️' },
  { id: 'strategy', label: 'Raido', symbol: 'ᛋ', icon: '📊' },
  { id: 'settings', label: 'Forge', symbol: 'ᚲ', icon: '🔥' },
]

interface BottomNavProps {
  activeTab: string
  onTabChange: (id: string) => void
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto w-full max-w-md flex-none border-t border-gold/15 bg-slate-950/94 px-1 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-1 backdrop-blur-xl flex gap-1">
      {TABS.map(({ id, label, symbol }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className="flex flex-1 flex-col items-center gap-1 rounded-lg py-2 transition cursor-pointer"
        >
          <span
            className={`text-xl font-black leading-tight transition-all duration-300 ${
              activeTab === id
                ? 'text-gold drop-shadow-[0_0_8px_rgba(249,204,117,0.9)]'
                : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {symbol}
          </span>
          <span
            className={`text-[7px] uppercase tracking-[0.12em] transition font-bold ${
              activeTab === id ? 'text-gold/80' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
