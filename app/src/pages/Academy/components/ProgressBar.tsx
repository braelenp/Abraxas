interface ProgressBarProps {
  value: number;
  total: number;
  label: string;
  detail?: string;
}

export function ProgressBar({ value, total, label, detail }: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-slate-400">
        <span>{label}</span>
        <span className="font-mono text-cyan-200">{value}/{total}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full border border-cyan-300/20 bg-slate-950/70">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#9945ff_0%,#3cf3ff_55%,#7cffc4_100%)] shadow-[0_0_18px_rgba(153,69,255,0.45)] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {detail ? <p className="text-xs text-slate-400">{detail}</p> : null}
    </div>
  );
}