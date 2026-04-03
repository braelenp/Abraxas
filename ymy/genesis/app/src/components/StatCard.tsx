interface Props {
  label: string
  value: string
  sub?: string
  change?: number
}

export default function StatCard({ label, value, sub, change }: Props) {
  return (
    <div className="card border-l-4 border-l-gold/60">
      <p className="section-title">{label}</p>
      <p className="stat-value">{value}</p>
      {sub && <p className="text-xs font-mono text-offwhite/50 mt-1">{sub}</p>}
      {change !== undefined && (
        <p className={`text-xs font-bold mt-2 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
        </p>
      )}
    </div>
  )
}
