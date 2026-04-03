import React from 'react'
import { ExternalLink } from 'lucide-react'

const AbraxasCallout: React.FC = () => {
  return (
    <div
      className="relative rounded-xl p-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(153,69,255,0.07), rgba(13,32,24,0.6))',
        border: '1px solid rgba(153,69,255,0.25)',
      }}
    >
      {/* Purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 0% 50%, rgba(153,69,255,0.08), transparent)',
        }}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Icon / rune */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-lg"
          style={{
            background: 'rgba(153,69,255,0.14)',
            border: '1px solid rgba(153,69,255,0.35)',
            color: '#c084fc',
            textShadow: '0 0 12px rgba(153,69,255,0.7)',
          }}
        >
          ◈
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-cinzel text-xs font-semibold text-purple-300/90 tracking-wider">
              ABRAXAS
            </span>
            <span className="font-mono text-[9px] text-purple-500/60 tracking-widest uppercase">
              Sovereign Intelligence Layer
            </span>
          </div>
          <p className="text-xs text-slate-400/75 leading-relaxed">
            Abraxas is the sovereign intelligence layer powering Verdant. Stake ABRA, govern the
            protocol, access the Circuit, and manage multi-asset vaults — all from one control surface.
          </p>
        </div>

        <a
          href="https://abraxas-ten.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded font-grotesk text-[10px] font-semibold tracking-[0.1em] uppercase transition-all duration-200"
          style={{
            background: 'rgba(153,69,255,0.14)',
            border: '1px solid rgba(153,69,255,0.4)',
            color: '#c4b5fd',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(153,69,255,0.24)'
            e.currentTarget.style.borderColor = 'rgba(153,69,255,0.7)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(153,69,255,0.14)'
            e.currentTarget.style.borderColor = 'rgba(153,69,255,0.4)'
          }}
        >
          Open Abraxas
          <ExternalLink size={11} />
        </a>
      </div>
    </div>
  )
}

export default AbraxasCallout
