import React, { useState, useEffect, useRef } from 'react'
import { Leaf, Archive, Activity, BookOpen, Shield, ArrowLeft } from 'lucide-react'
import GroveAgent  from './GroveAgent'
import VaultTab    from './VaultTab'
import DevnetTab   from './DevnetTab'
import ProtocolTab from './ProtocolTab'
import GuardianTab from './GuardianTab'
import VerdantSigil from '../VerdantSigil'

type TabId = 'grove' | 'vault' | 'devnet' | 'protocol' | 'guardian'

const TABS: { id: TabId; icon: React.ElementType; label: string }[] = [
  { id: 'grove',    icon: Leaf,     label: 'Grove'    },
  { id: 'vault',    icon: Archive,  label: 'Vault'    },
  { id: 'devnet',   icon: Activity, label: 'Devnet'   },
  { id: 'protocol', icon: BookOpen, label: 'Protocol' },
  { id: 'guardian', icon: Shield,   label: 'Guardian' },
]

interface DAppShellProps {
  onBack: () => void
}

const DAppShell: React.FC<DAppShellProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabId>('grove')
  const mainRef = useRef<HTMLDivElement>(null)

  // Scroll to top on tab change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [activeTab])

  // Scroll to top on mount
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const renderTab = () => {
    switch (activeTab) {
      case 'grove':    return <GroveAgent />
      case 'vault':    return <VaultTab />
      case 'devnet':   return <DevnetTab />
      case 'protocol': return <ProtocolTab />
      case 'guardian': return <GuardianTab />
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: '#0f1816' }}
    >
      {/* ── Sidebar (lg+) ──────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-52 flex-shrink-0 pt-20 pb-6"
        style={{
          background: '#0a1410',
          borderRight: '1px solid rgba(16,185,129,0.12)',
        }}
      >
        {/* Back to landing */}
        <button
          onClick={onBack}
          className="mx-4 mb-6 flex items-center gap-2 text-emerald-700/70 hover:text-emerald-400/80 transition-colors font-grotesk text-xs tracking-wide"
        >
          <ArrowLeft size={13} />
          Landing
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 px-4 mb-7">
          <VerdantSigil size={24} animate={false} />
          <span
            className="font-cinzel text-xs font-semibold tracking-[0.22em] text-emerald-300/80"
            style={{ textShadow: '0 0 14px rgba(16,185,129,0.4)' }}
          >
            VERDANT
          </span>
        </div>

        {/* Nav tabs */}
        <nav className="flex flex-col gap-1 px-2 flex-1">
          {TABS.map(({ id, icon: Icon, label }) => {
            const active = id === activeTab
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200"
                style={{
                  background: active ? 'rgba(16,185,129,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(16,185,129,0.35)' : '1px solid transparent',
                  color: active ? '#a7f3d0' : '#6b7280',
                  boxShadow: active ? '0 0 10px rgba(16,185,129,0.12)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = '#6ee7b7aa'
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = '#6b7280'
                }}
              >
                <Icon size={15} />
                <span className="font-grotesk text-xs font-medium tracking-wide">{label}</span>
              </button>
            )
          })}
        </nav>

        {/* Protocol badge */}
        <div className="px-4 mt-4">
          <div
            className="rounded-lg p-2.5 text-center"
            style={{
              background: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.16)',
            }}
          >
            <div className="font-mono text-[9px] text-emerald-700/60 uppercase tracking-widest mb-1">
              Network
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: '0 0 5px #10b981' }}
              />
              <span className="font-mono text-[10px] text-emerald-500/70">Solana Devnet</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────────── */}
      <main 
        ref={mainRef}
        className="flex-1 pt-16 lg:pt-0 pb-20 lg:pb-0 overflow-y-auto"
        style={{ background: '#0f1816' }}
      >
        {/* Top bar (mobile back button) */}
        <div
          className="lg:hidden sticky top-16 z-30 flex items-center gap-3 px-4 py-3"
          style={{
            background: '#0a1410',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(16,185,129,0.12)',
          }}
        >
          <button onClick={onBack} className="text-emerald-700/70 hover:text-emerald-400/80 transition-colors">
            <ArrowLeft size={16} />
          </button>
          <span className="font-cinzel text-[11px] tracking-[0.22em] text-emerald-600/60 uppercase">
            Verdant · {TABS.find((t) => t.id === activeTab)?.label}
          </span>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 lg:py-8">
          {renderTab()}
        </div>
      </main>

      {/* ── Bottom tab bar (mobile) ─────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex"
        style={{
          background: '#0a1410',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(16,185,129,0.15)',
        }}
      >
        {TABS.map(({ id, icon: Icon, label }) => {
          const active = id === activeTab
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all"
              style={{ color: active ? '#6ee7b7' : '#374151' }}
            >
              <div
                style={{
                  filter: active ? 'drop-shadow(0 0 5px rgba(16,185,129,0.6))' : 'none',
                }}
              >
                <Icon size={17} />
              </div>
              <span className="font-grotesk text-[9px] font-medium tracking-wide">{label}</span>
              {active && (
                <span
                  className="absolute bottom-0 w-8 h-0.5 rounded-full"
                  style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }}
                />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default DAppShell
