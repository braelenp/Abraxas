/** Cross-protocol callout linking back to Abraxas — mirrors Aurelia's AbraxasCallout */
export default function EchoCallout() {
  return (
    <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-800/60 p-4 backdrop-blur">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg leading-none text-amber">✦</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber/70">
          Sophia&apos;s Lineage · Resonance Protocol
        </span>
      </div>
      <h3 className="mb-2 font-display text-sm text-slate-100">Explore the Lineage</h3>
      <p className="mb-3 text-xs leading-relaxed text-slate-300">
        Echo is part of Sophia&apos;s Lineage. Abraxas governs real-world asset tokenisation.
        Aurelia governs ABRA distribution and yield. Together they form a sovereign on-chain ecosystem.
      </p>
      <a
        href="https://abraxas-ten.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-cyan/30 bg-cyan/[0.10] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan transition hover:bg-cyan/[0.18]"
      >
        Explore Abraxas →
      </a>
    </article>
  )
}
