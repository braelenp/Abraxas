import BuyAbraButton from './BuyAbraButton'

export default function BottomActionBar() {
  return (
    <div
      className="w-full flex items-center justify-center gap-2 px-4 py-3 flex-wrap"
      style={{
        background: 'linear-gradient(0deg, rgba(5,5,8,0.99) 0%, rgba(5,5,8,0.92) 100%)',
        borderTop: '1px solid rgba(0,245,255,0.25)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <a
        href="https://abraxas-ten.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-4 text-base md:text-lg rounded-lg font-bold tracking-widest uppercase bg-gradient-to-r from-purple-700 via-purple-600 to-violet-600 text-white border border-purple-500/50 transition-colors duration-300 cursor-pointer select-none"
        style={{
          fontFamily: "'Space Mono', monospace",
        }}
      >
        ← ABRAXAS
      </a>
      <BuyAbraButton size="lg" />
      <a
        href="https://discord.gg/B6nM8fe3q"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-4 text-base md:text-lg rounded-lg font-bold tracking-widest uppercase bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white border border-indigo-500/50 transition-colors duration-300 cursor-pointer select-none"
        style={{
          fontFamily: "'Space Mono', monospace",
        }}
      >
        💬 DISCORD
      </a>
    </div>
  )
}
