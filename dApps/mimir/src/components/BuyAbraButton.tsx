interface BuyAbraButtonProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function BuyAbraButton({ size = 'md', className = '' }: BuyAbraButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }

  return (
    <a
      href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        buy-abra-btn
        inline-flex items-center gap-2
        ${sizes[size]}
        rounded-lg font-bold tracking-widest uppercase
        bg-gradient-to-r from-[#6622cc] via-[#9945ff] to-[#ff6a00]
        text-white
        border border-[#9945ff]/50
        transition-colors duration-300
        cursor-pointer select-none
        ${className}
      `}
      style={{
        textDecoration: 'none',
      }}
    >
      <span className="text-[#ffd700]">◈</span>
      Buy $ABRA
      <span className="text-[#ffd700]">◈</span>
    </a>
  )
}
