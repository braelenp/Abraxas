import { Zap } from 'lucide-react';

export type FeatureStatus = 'live' | 'coming-soon';

interface FeatureBadgeProps {
  status: FeatureStatus;
  size?: 'sm' | 'md';
}

export function FeatureBadge({ status, size = 'sm' }: FeatureBadgeProps) {
  if (status === 'live') {
    return (
      <span className={`inline-flex items-center gap-1 font-semibold px-2 py-1 rounded-full border border-green-400/30 bg-green-500/20 text-green-300 ${
        size === 'md' ? 'text-xs' : 'text-[10px]'
      }`}>
        <Zap size={size === 'md' ? 14 : 12} />
        Live
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 font-semibold px-2 py-1 rounded-full border border-slate-500/30 bg-slate-700/20 text-slate-400 ${
      size === 'md' ? 'text-xs' : 'text-[10px]'
    }`}>
      ⏱️ Coming Soon
    </span>
  );
}
