export default function VeinSigil() {
  return (
    <div className="relative mx-auto flex h-[17rem] w-[17rem] items-center justify-center sm:h-[22rem] sm:w-[22rem]">
      <div className="absolute inset-6 rounded-full border border-vein-purple/20 bg-[radial-gradient(circle,rgba(217,164,65,0.08),rgba(5,8,22,0)_70%)] blur-2xl" />
      <div className="absolute inset-0 rounded-full border border-vein-cyan/15 shadow-[0_0_50px_rgba(60,246,255,0.1)]" />
      <svg
        viewBox="0 0 320 320"
        className="relative z-10 h-full w-full animate-sigil-pulse drop-shadow-[0_0_36px_rgba(217,164,65,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vein-core" x1="160" y1="24" x2="160" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F3C86B" />
            <stop offset="0.5" stopColor="#4FBF87" />
            <stop offset="1" stopColor="#9945FF" />
          </linearGradient>
          <radialGradient id="vein-orb" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 54) rotate(90) scale(36)">
            <stop stopColor="#3CF6FF" />
            <stop offset="1" stopColor="#3CF6FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="160" cy="160" r="120" stroke="rgba(153,69,255,0.28)" strokeWidth="1.5" strokeDasharray="8 12" />
        <path d="M160 48C170 80 170 101 156 132C142 162 142 185 160 213C175 236 178 258 160 284" stroke="url(#vein-core)" strokeWidth="10" strokeLinecap="round" />
        <path d="M156 122C207 111 241 127 270 174" stroke="#4FBF87" strokeOpacity="0.82" strokeWidth="7" strokeLinecap="round" />
        <path d="M160 162C204 155 240 175 267 218" stroke="#D9A441" strokeOpacity="0.76" strokeWidth="5" strokeLinecap="round" />
        <path d="M156 148C115 138 82 149 53 187" stroke="#9945FF" strokeOpacity="0.9" strokeWidth="7" strokeLinecap="round" />
        <path d="M159 196C119 190 86 208 58 245" stroke="#FF8A24" strokeOpacity="0.84" strokeWidth="5" strokeLinecap="round" />
        <circle cx="160" cy="54" r="18" fill="url(#vein-orb)" />
        <circle cx="272" cy="176" r="8" fill="#4FBF87" />
        <circle cx="268" cy="220" r="6" fill="#D9A441" />
        <circle cx="52" cy="188" r="8" fill="#9945FF" />
        <circle cx="58" cy="246" r="6" fill="#3CF6FF" />
      </svg>
    </div>
  )
}
