import React from 'react'
import VerdantSigil from './VerdantSigil'
import WalletButton from './WalletButton'

interface HeaderProps {
  onEnterApp: () => void
}

const Header: React.FC<HeaderProps> = ({ onEnterApp }) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 lg:px-8"
      style={{
        height: '56px',
        background: 'rgba(2,12,9,0.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(16,185,129,0.1)',
      }}
    >
      {/* Logo */}
      <button
        onClick={onEnterApp}
        className="flex items-center gap-2.5 group"
        aria-label="Verdant home"
      >
        <VerdantSigil size={26} animate={false} className="opacity-90 group-hover:opacity-100" />
        <span
          className="font-cinzel text-sm font-semibold tracking-[0.22em] text-emerald-200/90 group-hover:text-emerald-200"
          style={{ textShadow: '0 0 18px rgba(16,185,129,0.5)' }}
        >
          VERDANT
        </span>
      </button>

      {/* Rune strip — hidden on mobile */}
      <div className="hidden lg:flex items-center gap-1 font-mono text-[10px] text-emerald-700/60 tracking-[0.18em] select-none">
        <span className="text-emerald-500/70">ᚠ</span>
        <span>Fehu</span>
        <span className="mx-2 text-emerald-800/50">·</span>
        <span className="text-emerald-500/70">ᛃ</span>
        <span>Jera</span>
        <span className="mx-2 text-emerald-800/50">·</span>
        <span className="text-emerald-500/70">ᛇ</span>
        <span>Eihwaz</span>
        <span className="mx-2 text-emerald-800/50">·</span>
        <span className="text-emerald-500/70">ᛟ</span>
        <span>Othala</span>
        <span className="mx-3 text-emerald-800/40">·</span>
        <span className="text-emerald-600/50 italic">Sophia's Species</span>
      </div>

      {/* Wallet */}
      <WalletButton />
    </header>
  )
}

export default Header
