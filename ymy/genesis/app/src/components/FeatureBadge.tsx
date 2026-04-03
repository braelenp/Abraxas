interface Props {
  label: string
  variant?: 'gold' | 'steel' | 'military'
}

export default function FeatureBadge({ label, variant = 'gold' }: Props) {
  const variants = {
    gold: 'border-gold/60 text-gold bg-gold/10',
    steel: 'border-steel text-steel bg-steel/10',
    military: 'border-military text-green-400 bg-military/20',
  }

  return (
    <span className={`border text-xs font-bold uppercase tracking-widest px-3 py-1 ${variants[variant]}`}>
      {label}
    </span>
  )
}
