import React from 'react'

const BottomNav = ({ activePage, onPageChange }) => {
  const pages = [
    { id: 'dashboard', label: 'Dashboard', rune: '⬢' },
    { id: 'hunt', label: 'Hunt', rune: '↑' },
    { id: 'flow', label: 'Flow', rune: '⇄' },
    { id: 'market', label: 'Market', rune: '✦' },
    { id: 'terrain', label: 'Terrain', rune: '◆' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-deep-black bg-opacity-95 backdrop-blur border-t border-cyan-bright">
      <div className="scanlines"></div>
      <div className="max-w-full px-4 py-3">
        <div className="grid grid-cols-5 gap-0">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`flex flex-col items-center justify-center py-3 px-2 transition-all duration-150 border-t-2 ${
                activePage === page.id
                  ? 'border-t-cyan-bright text-cyan-bright opacity-100'
                  : 'border-t-transparent text-gold-accent opacity-50 hover:opacity-75'
              }`}
              style={{
                textShadow:
                  activePage === page.id
                    ? '0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.5)'
                    : '0 0 5px rgba(251, 191, 36, 0.3)',
              }}
            >
              <span className="text-xl">{page.rune}</span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider mt-1">
                {page.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default BottomNav
