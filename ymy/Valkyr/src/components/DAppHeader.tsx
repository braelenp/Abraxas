import React from 'react'
import Logo from './Logo'

interface DAppHeaderProps {
  onBack: () => void
}

const DAppHeader: React.FC<DAppHeaderProps> = ({ onBack }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-cyan-400/10 bg-slate-950/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo on left */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
          title="Return to landing page"
        >
          <Logo variant="static" size="sm" />
          <span className="hidden sm:inline text-sm md:text-base font-black tracking-widest uppercase text-gold">Valkyr</span>
        </button>

        {/* Network indicator on right */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-slate-400 hidden sm:inline">Devnet</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DAppHeader
