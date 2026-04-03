import { ExternalLink, ArrowUpRight } from 'lucide-react'

export default function AbraFooter() {
  return (
    <section className="border-t border-cyan-300/20 bg-slate-950/60 backdrop-blur px-4 py-6 md:py-8 w-full">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/60 font-mono mb-4">
          &gt; [ABRA_ECOSYSTEM]
        </p>

        <div className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full">
          {/* Buy $ABRA Button */}
          <a
            href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 md:px-8 py-3 md:py-3 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 hover:from-cyan-500/30 hover:to-cyan-600/30 text-cyan-300 hover:text-cyan-200 font-black uppercase tracking-widest text-xs md:text-sm border border-cyan-300/40 hover:border-cyan-300/70 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>BUY $ABRA</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Return to Abraxas Button */}
          <a
            href="https://abraxas-ten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-6 md:px-8 py-3 md:py-3 bg-gold/10 hover:bg-gold/15 text-gold hover:text-gold/90 font-black uppercase tracking-widest text-xs md:text-sm border border-gold/30 hover:border-gold/60 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>ABRAXAS CONTROL SURFACE</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <p className="text-xs text-slate-400/60 mt-4 font-mono">
          Genesis is created by the Abraxas collective
        </p>
      </div>
    </section>
  )
}
