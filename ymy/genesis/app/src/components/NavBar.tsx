import { Link, useLocation } from 'react-router-dom'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import CodexLogo from './CodexLogo'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { path: '/genesis', label: 'Genesis' },
  { path: '/creations', label: 'My Creations' },
  { path: '/tokenize', label: 'Tokenize' },
  { path: '/account', label: 'Account' },
]

export default function NavBar() {
  const { pathname } = useLocation()

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="border-b border-cyan-300/20 bg-slate-950/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 flex items-center justify-between">
        <Link to="/" onClick={handleNavClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <CodexLogo />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300 hidden sm:inline">Genesis</span>
        </Link>

        {/* Mobile & Desktop Navigation */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={handleNavClick}
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors ${
                pathname === path
                  ? 'text-cyan-300'
                  : 'text-slate-300/60 hover:text-slate-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <WalletMultiButton
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '2px solid rgb(34, 211, 238)',
              color: 'rgb(34, 211, 238)',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '10px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderRadius: '0',
              height: '38px',
              padding: '0 16px',
            }}
          />
        </div>
      </div>
    </nav>
  )
}
