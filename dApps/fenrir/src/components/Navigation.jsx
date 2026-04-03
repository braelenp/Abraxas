import React, { useState } from 'react'

const Navigation = ({ activePage = 'fenrir' }) => {
  const pages = [
    { name: 'Dashboard', icon: '⬢', id: 'dashboard' },
    { name: 'Vaults', icon: '◆', id: 'vaults' },
    { name: 'Market', icon: '✦', id: 'market' },
    { name: 'Trade', icon: '⬡', id: 'trade' },
    { name: 'King AI', icon: '◇', id: 'king-ai' },
    { name: 'Circuit', icon: '✧', id: 'circuit' },
    { name: 'Forge', icon: '⚔', id: 'forge' },
    { name: 'Fenrir', icon: '↑', id: 'fenrir' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-deep-black border-t border-purple-core">
      <div className="max-w-full px-4 py-4">
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          {pages.map((page) => (
            <button
              key={page.id}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all whitespace-nowrap ${
                activePage === page.id
                  ? 'border-glow-orange bg-deep-black'
                  : 'border border-purple-core hover:border-glow-orange hover:glow-box'
              }`}
              style={{
                textShadow:
                  activePage === page.id
                    ? '0 0 10px #ff6024'
                    : '0 0 10px #9945ff',
              }}
            >
              <span className="text-lg">{page.icon}</span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                {page.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom scanline */}
      <div
        className="h-px bg-gradient-to-r from-transparent via-purple-core to-transparent"
        style={{ boxShadow: '0 0 10px rgba(153, 69, 255, 0.5)' }}
      />
    </nav>
  )
}

export default Navigation
