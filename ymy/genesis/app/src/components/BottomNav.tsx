import { NavLink } from 'react-router-dom'
import { useLoading } from '../context/LoadingContext'

interface NavItem {
  to: string
  label: string
  symbol: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/genesis', label: 'Genesis', symbol: 'ᚲ' },
  { to: '/creations', label: 'Creations', symbol: 'ᛏ' },
  { to: '/tokenize', label: 'Tokenize', symbol: 'ᚨ' },
  { to: '/account', label: 'Account', symbol: 'ᛋ' },
]

export default function BottomNav() {
  const { setIsLoading } = useLoading()

  const handleNavClick = () => {
    // Show loading screen during transition
    setIsLoading(true)
    // Scroll main content to top
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 mx-auto w-full max-w-md flex-none border-t border-gold/15 bg-slate-950/94 px-1 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-1 backdrop-blur-xl flex">
      {NAV_ITEMS.map(({ to, label, symbol }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/genesis'}
          onClick={handleNavClick}
          className="flex flex-1 flex-col items-center gap-1 rounded-lg py-2 transition cursor-pointer z-50 relative"
        >
          {({ isActive }) => (
            <>
              <span
                className={`text-xl font-black leading-tight transition-all duration-300 ${
                  isActive
                    ? 'text-gold drop-shadow-[0_0_8px_rgba(249,204,117,0.9)]'
                    : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {symbol}
              </span>
              <span
                className={`text-[7px] uppercase tracking-[0.12em] transition font-bold ${
                  isActive ? 'text-gold/80' : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
