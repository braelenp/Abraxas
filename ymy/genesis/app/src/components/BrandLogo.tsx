import { Sparkles } from 'lucide-react'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

export default function BrandLogo({ size = 'md' }: Props) {
  const sizes = {
    sm: { icon: 20, text: 'text-sm' },
    md: { icon: 28, text: 'text-lg' },
    lg: { icon: 40, text: 'text-2xl' },
  }

  const { icon, text } = sizes[size]

  return (
    <div className="flex items-center gap-2">
      <Sparkles size={icon} className="text-gold" strokeWidth={2.5} />
      <span className={`font-black uppercase tracking-[0.2em] ${text} text-offwhite`}>
        Genesis
      </span>
    </div>
  )
}
