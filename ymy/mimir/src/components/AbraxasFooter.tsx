import BuyAbraButton from './BuyAbraButton'

export default function AbraxasFooter() {
  return (
    <footer
      className="relative w-full flex flex-col items-center gap-6 px-4 py-10 pb-28"
      style={{
        background: 'linear-gradient(0deg, rgba(5,5,8,1) 0%, transparent 100%)',
      }}
    >
      {/* Separator rune line */}
      <div className="w-full flex items-center gap-4 max-w-lg">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.5))' }} />
        <span className="text-[#00f5ff] opacity-60 text-sm">👁</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,245,255,0.5), transparent)' }} />
      </div>

      {/* Buy CTA */}
      <div className="flex flex-col items-center gap-3">
        <p
          className="text-xs tracking-[0.3em] uppercase opacity-50"
          style={{ fontFamily: 'Cinzel, serif', color: '#00f5ff' }}
        >
          See the Future. Support Mimir.
        </p>
        <BuyAbraButton size="lg" />
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-6 opacity-40 text-xs tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity text-[#00f5ff]">
          Twitter
        </a>
        <span className="text-[#00f5ff]/30">|</span>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity text-[#00f5ff]">
          Telegram
        </a>
        <span className="text-[#00f5ff]/30">|</span>
        <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity text-[#00f5ff]">
          Discord
        </a>
      </div>

      {/* Copyright */}
      <p className="text-[10px] tracking-[0.2em] opacity-25 mt-2 text-center" style={{ fontFamily: 'Cinzel, serif' }}>
        © 2026 MIMIR — THE ORACLE PROVIDER. ALL RIGHTS RESERVED.
      </p>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(153,69,255,0.12) 0%, transparent 70%)',
        }}
      />
    </footer>
  )
}
