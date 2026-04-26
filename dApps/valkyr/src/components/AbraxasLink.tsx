import React from 'react'
import BuyAbraButton from './BuyAbraButton'

const AbraxasLink: React.FC = () => {
  return (
    <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-slate-700/50">
      {/* Buy Button */}
      <div className="mb-8 md:mb-12 flex justify-center">
        <BuyAbraButton />
      </div>

      {/* Abraxas Link */}
      <div className="glow-panel p-6 md:p-8 text-center">
        <p className="system-label mb-3">Part of the Sophia Ecosystem</p>
        <h3 className="subsection-title text-gold glow-gold mb-4">Explore Abraxas</h3>
        <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed">
          Valkyr is woven into the greater tapestry of the Abraxas custody and strategic asset management platform. 
          Discover how your assets fit within the complete Sophia family ecosystem.
        </p>
        <a
          href="https://abraxas-tokenization-engine.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-gold to-amber-400 text-slate-950 font-bold tracking-widest uppercase text-sm hover:from-amber-400 hover:to-gold transition-all duration-300 drop-shadow-lg hover:drop-shadow-[0_0_15px_rgba(249,204,117,0.6)]"
        >
          Enter Abraxas →
        </a>
        <p className="text-xs text-slate-500 mt-4">Opens in new window</p>
      </div>
    </div>
  )
}

export default AbraxasLink
