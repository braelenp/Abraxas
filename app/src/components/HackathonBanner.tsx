import { useAbraBalance } from '../hooks/useAbraBalance';
import { memo } from 'react';

interface HackathonBannerProps {
  show?: boolean;
}

function HackathonBannerComponent({ show = true }: HackathonBannerProps) {
  const { balance, balanceFormatted, hasMinimum } = useAbraBalance(10);

  if (!show || !hasMinimum) {
    return null;
  }

  return (
    <div className="z-45 mx-auto flex w-full max-w-md flex-none border-b border-purple-400/30 bg-gradient-to-r from-purple-950/60 to-slate-950/60 px-3 py-2 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between text-[9px] font-mono uppercase tracking-wider">
        <span className="text-purple-300/90">
          ✦ Hackathon Gated Access
        </span>
        <span className="text-cyan-300 font-semibold">
          {balanceFormatted} $ABRA
        </span>
      </div>
    </div>
  );
}

export const HackathonBanner = memo(HackathonBannerComponent);
