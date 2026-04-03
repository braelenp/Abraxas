type StatCardProps = {
  label: string;
  value: string;
  detail: string;
};

export default function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="metric-ring relative overflow-hidden rounded-[28px] panel p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-white/45">{label}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="font-display text-4xl uppercase tracking-[0.12em] text-gold">{value}</span>
        <span className="max-w-28 text-right text-sm text-white/62">{detail}</span>
      </div>
    </article>
  );
}
