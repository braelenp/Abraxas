interface CodexLogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

export default function CodexLogo({ size = 'md' }: CodexLogoProps) {
  return (
    <svg 
      className={`${sizeClasses[size]} text-gold`}
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor"
      strokeWidth="2"
    >
      {/* Book pages */}
      <path d="M 25 30 L 25 70 Q 25 75 30 75 L 70 75 Q 75 75 75 70 L 75 30" />
      <line x1="50" y1="30" x2="50" y2="75" />
      
      {/* Rune-like marks on pages */}
      <circle cx="35" cy="45" r="2" />
      <circle cx="45" cy="50" r="2" />
      <circle cx="55" cy="45" r="2" />
      <circle cx="65" cy="50" r="2" />
      
      <line x1="35" y1="60" x2="65" y2="60" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}
