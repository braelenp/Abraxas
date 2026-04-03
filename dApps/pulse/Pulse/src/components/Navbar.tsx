import { Link } from 'react-router-dom'
import { Zap, Menu } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-900/30 bg-slate-950/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <Zap className="w-6 h-6 text-purple-400" />
          <span className="font-bold text-lg text-purple-300 font-mono tracking-widest">PULSE</span>
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#trending" className="text-slate-400 hover:text-purple-300 transition text-sm font-mono">
            Trending
          </a>
          <a href="#live" className="text-slate-400 hover:text-purple-300 transition text-sm font-mono">
            Live
          </a>
          <a href="#creators" className="text-slate-400 hover:text-purple-300 transition text-sm font-mono">
            Creators
          </a>
          <button className="px-4 py-1.5 rounded-lg border border-purple-400/50 text-purple-300 hover:bg-purple-500/10 transition text-xs font-mono uppercase">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-purple-300"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-950/95 border-b border-purple-900/30 p-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a href="#trending" className="text-slate-400 hover:text-purple-300 transition text-sm font-mono px-2 py-1">
                Trending
              </a>
              <a href="#live" className="text-slate-400 hover:text-purple-300 transition text-sm font-mono px-2 py-1">
                Live
              </a>
              <a href="#creators" className="text-slate-400 hover:text-purple-300 transition text-sm font-mono px-2 py-1">
                Creators
              </a>
              <button className="w-full px-4 py-2 rounded-lg border border-purple-400/50 text-purple-300 hover:bg-purple-500/10 transition text-xs font-mono uppercase">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
