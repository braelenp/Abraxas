import { useLocation, useNavigate } from 'react-router-dom'

interface NavItem {
  path: string
  label: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { path: '/app',         label: 'ORACLE',    icon: '👁' },
  { path: '/app/verify',  label: 'VERIFY',    icon: '✓' },
  { path: '/app/analytics', label: 'ANALYTICS', icon: '📊' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 safe-area-bottom"
      style={{
        background: 'linear-gradient(0deg, rgba(5,5,8,0.99) 0%, rgba(5,5,8,0.92) 100%)',
        borderTop: '1px solid rgba(153,69,255,0.25)',
        backdropFilter: 'blur(16px)',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
        willChange: 'transform',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`bottom-nav-item flex-1 flex flex-col items-center gap-0.5 py-1 px-1 rounded-lg transition-all duration-200 ${isActive ? 'active' : ''}`}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
            aria-label={item.label}
          >
            {/* Icon */}
            <span
              className="text-xl leading-none transition-all duration-200"
              style={{
                color: isActive ? '#00f5ff' : '#2a3a4a',
                textShadow: isActive
                  ? '0 0 12px #00f5ff, 0 0 24px #00f5ff'
                  : 'none',
                filter: isActive ? 'brightness(1.3)' : 'brightness(0.6)',
              }}
            >
              {item.icon}
            </span>

            {/* Label */}
            <span
              className="text-[9px] font-bold tracking-widest transition-all duration-200"
              style={{
                fontFamily: 'Cinzel, serif',
                color: isActive ? '#00f5ff' : '#7090b0',
                textShadow: isActive ? '0 0 8px #00f5ff' : 'none',
              }}
            >
              {item.label}
            </span>

            {/* Active dot */}
            {isActive && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                style={{
                  background: '#00f5ff',
                  boxShadow: '0 0 6px #00f5ff, 0 0 12px #00f5ff',
                }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
