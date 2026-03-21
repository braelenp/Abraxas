import { useWallet } from '@solana/wallet-adapter-react';
import { Clock, Lock, TrendingUp, Unlock, Zap } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import type { StakeDuration, StakeRecord } from '../lib/types';

const STAKE_CONFIGS = [
  { duration: 30 as StakeDuration, multiplier: 1.2, displayMultiplier: '1.2x', label: '30 Days', description: 'Quick stake for early participants' },
  { duration: 90 as StakeDuration, multiplier: 1.8, displayMultiplier: '1.8x', label: '90 Days', description: 'Balanced returns & commitment', highlight: true },
  { duration: 180 as StakeDuration, multiplier: 2.5, displayMultiplier: '2.5x', label: '180 Days', description: 'Maximum multiplier for diamond hands' },
];

export function StakePage() {
  const { connected, publicKey } = useWallet();
  const [selectedDuration, setSelectedDuration] = useState<StakeDuration>(90);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [userStakes, setUserStakes] = useState<StakeRecord[]>([
    {
      address: 'stake123',
      staker: publicKey?.toString() || '',
      abraAmount: 2500,
      lockDurationDays: 90,
      stakedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
      unlockedAt: Date.now() + 60 * 24 * 60 * 60 * 1000,
      multiplierBps: 18_000,
      isActive: true,
      claimedRewards: 0,
    },
  ]);
  const [isStaking, setIsStaking] = useState(false);

  const selectedConfig = useMemo(() => STAKE_CONFIGS.find((c) => c.duration === selectedDuration), [selectedDuration]);

  const projectedRewards = useMemo(() => {
    if (!stakeAmount || isNaN(Number(stakeAmount))) return 0;
    const amount = Number(stakeAmount);
    return amount * (selectedConfig?.multiplier || 1) - amount;
  }, [stakeAmount, selectedConfig]);

  const handleStake = useCallback(async () => {
    if (!connected || !publicKey || !stakeAmount) return;
    setIsStaking(true);
    try {
      // Simulate staking transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newStake: StakeRecord = {
        address: `stake_${Date.now()}`,
        staker: publicKey.toString(),
        abraAmount: Number(stakeAmount),
        lockDurationDays: selectedDuration,
        stakedAt: Date.now(),
        unlockedAt: Date.now() + selectedDuration * 24 * 60 * 60 * 1000,
        multiplierBps: Math.round((selectedConfig?.multiplier || 1) * 10_000),
        isActive: true,
        claimedRewards: 0,
      };
      setUserStakes([...userStakes, newStake]);
      setStakeAmount('');
    } finally {
      setIsStaking(false);
    }
  }, [connected, publicKey, stakeAmount, selectedDuration, selectedConfig, userStakes]);

  const handleUnstake = useCallback((address: string) => {
    setUserStakes(userStakes.map((s) => (s.address === address ? { ...s, isActive: false } : s)));
  }, [userStakes]);

  const handleClaim = useCallback((address: string) => {
    setUserStakes(
      userStakes.map((s) => {
        if (s.address === address && !s.isActive) {
          const rewards = Math.round((s.abraAmount * (s.multiplierBps / 10_000 - 1)));
          return { ...s, claimedRewards: rewards };
        }
        return s;
      })
    );
  }, [userStakes]);

  const totalStaked = useMemo(() => userStakes.reduce((sum, s) => sum + s.abraAmount, 0), [userStakes]);
  const totalProjectedValue = useMemo(
    () => userStakes.reduce((sum, s) => sum + Math.round(s.abraAmount * (s.multiplierBps / 10_000)), 0),
    [userStakes]
  );

  if (!connected) {
    return (
      <div className="min-h-screen max-w-3xl mx-auto px-4 py-8">
        <div className="glow-panel p-6 text-center space-y-3">
          <p className="text-white/65">Connect your wallet to view staking dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-violet-400" />
          <h1 className="text-2xl font-bold text-white">ABRA Staking — Lock & Earn</h1>
        </div>
        <p className="text-sm text-white/65">
          Stake ABRA for 30, 90, or 180 days to earn multiplied returns. Lock period multipliers: 1.2x → 1.8x → 2.5x
        </p>
      </div>

      {/* Staking Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glow-panel p-4 space-y-1">
          <p className="text-xs text-white/50 uppercase tracking-wide">Total Staked</p>
          <p className="text-2xl font-bold text-amber-200">{totalStaked.toLocaleString()}</p>
          <p className="text-xs text-white/40">ABRA</p>
        </div>
        <div className="glow-panel p-4 space-y-1">
          <p className="text-xs text-white/50 uppercase tracking-wide">Projected Value</p>
          <p className="text-2xl font-bold text-violet-300">{totalProjectedValue.toLocaleString()}</p>
          <p className="text-xs text-white/40">ABRA</p>
        </div>
        <div className="glow-panel p-4 space-y-1">
          <p className="text-xs text-white/50 uppercase tracking-wide">Active Stakes</p>
          <p className="text-2xl font-bold text-green-400">{userStakes.filter((s) => s.isActive).length}</p>
          <p className="text-xs text-white/40">Position(s)</p>
        </div>
      </div>

      {/* Staking Form */}
      <div className="glow-panel p-6 space-y-5">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-amber-300" />
          <h2 className="text-lg font-semibold text-white">New Stake</h2>
        </div>

        {/* Duration Selection */}
        <div className="space-y-3">
          <label className="text-xs text-white/60 uppercase tracking-wide font-semibold">Lock Duration</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {STAKE_CONFIGS.map((cfg) => (
              <button
                key={cfg.duration}
                onClick={() => setSelectedDuration(cfg.duration)}
                className={`relative group p-3 rounded-lg border transition-all ${
                  selectedDuration === cfg.duration
                    ? 'border-violet-400 bg-violet-500/20 ring-1 ring-violet-400/50'
                    : 'border-white/15 bg-slate-900/50 hover:border-white/25'
                }`}
              >
                <p className="text-sm font-semibold text-white">{cfg.label}</p>
                <p className="text-lg font-bold text-amber-300 mt-1">{cfg.displayMultiplier}</p>
                <p className="text-[11px] text-white/50 mt-1">{cfg.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-xs text-white/60 uppercase tracking-wide font-semibold">ABRA Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter amount..."
              className="flex-1 px-4 py-2 rounded-lg bg-slate-900/50 border border-white/15 text-white placeholder:text-white/30 focus:border-violet-400 focus:ring-1 focus:ring-violet-400/50 outline-none"
              disabled={isStaking}
            />
            <button
              onClick={() => setStakeAmount('2500')}
              className="px-3 py-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
            >
              Quick Fill
            </button>
          </div>
        </div>

        {/* Projected Rewards */}
        {stakeAmount && projectedRewards > 0 && (
          <div className="rounded-lg border border-green-400/25 bg-green-500/10 p-3 space-y-1">
            <p className="text-xs text-green-300 font-semibold">Projected Earnings</p>
            <p className="text-lg font-bold text-green-300">{projectedRewards.toFixed(0)} ABRA</p>
            <p className="text-xs text-green-300/60">
              Lock for {selectedDuration} days at {selectedConfig?.displayMultiplier} multiplier
            </p>
          </div>
        )}

        {/* Stake Button */}
        <button
          onClick={handleStake}
          disabled={!stakeAmount || isStaking || Number(stakeAmount) <= 0}
          className="w-full ui-action h-12 rounded-lg border border-violet-400/45 bg-violet-500/25 text-violet-100 font-semibold hover:bg-violet-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isStaking ? 'Processing Stake...' : `Stake ${stakeAmount || '0'} ABRA`}
        </button>

        <p className="text-[11px] text-white/40 text-center">
          After lock period expires, unstake and claim rewards to realize gains
        </p>
      </div>

      {/* Active Stakes */}
      {userStakes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-shrink-0 w-full" style={{ contain: 'layout style' }}>
            <Lock size={18} className="text-cyan-400 flex-shrink-0" />
            <h2 className="text-lg font-semibold text-white flex-shrink-0">Your Stakes</h2>
          </div>
          <div className="space-y-3">
            {userStakes.map((stake) => {
              const daysRemaining = Math.max(0, Math.floor((stake.unlockedAt - Date.now()) / (24 * 60 * 60 * 1000)));
              const isUnlocked = daysRemaining === 0;
              const earnedRewards = Math.round(stake.abraAmount * (stake.multiplierBps / 10_000 - 1));
              const totalValue = stake.abraAmount + (!stake.isActive ? earnedRewards : 0);

              return (
                <div
                  key={stake.address}
                  className={`glow-panel p-4 space-y-3 ${stake.isActive ? '' : 'opacity-75'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{stake.abraAmount.toLocaleString()} ABRA</p>
                      <p className="text-xs text-white/50">
                        Duration: {stake.lockDurationDays} days • Multiplier: {(stake.multiplierBps / 10_000).toFixed(1)}x
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <div
                        className={`text-sm font-bold ${
                          stake.isActive
                            ? daysRemaining === 0
                              ? 'text-yellow-400'
                              : 'text-cyan-300'
                            : 'text-green-300'
                        }`}
                      >
                        {stake.isActive
                          ? daysRemaining === 0
                            ? 'Ready to Unstake'
                            : `${daysRemaining}d Remaining`
                          : `+${earnedRewards.toLocaleString()} ABRA`}
                      </div>
                      <p className="text-xs text-white/40">
                        {new Date(stake.stakedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Projected Value */}
                  {stake.isActive && (
                    <div className="border-t border-white/10 pt-2">
                      <p className="text-xs text-white/50">Projected Value at Unlock</p>
                      <p className="text-lg font-bold text-green-300">
                        {(stake.abraAmount * (stake.multiplierBps / 10_000)).toLocaleString()} ABRA
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {stake.isActive ? (
                    <div className="flex gap-2">
                      {isUnlocked && (
                        <button
                          onClick={() => handleUnstake(stake.address)}
                          className="flex-1 h-10 rounded-lg border border-amber-400/30 bg-amber-500/15 text-amber-200 font-semibold text-sm hover:bg-amber-500/25 transition-all flex items-center justify-center gap-2"
                        >
                          <Unlock size={14} /> Unstake
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleClaim(stake.address)}
                      disabled={stake.claimedRewards > 0}
                      className="w-full h-10 rounded-lg border border-green-400/30 bg-green-500/15 text-green-200 font-semibold text-sm hover:bg-green-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      <TrendingUp size={14} /> {stake.claimedRewards > 0 ? 'Rewards Claimed' : 'Claim Rewards'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="glow-panel p-4 space-y-2 text-xs text-white/50">
        <div className="flex items-start gap-2">
          <Clock size={14} className="mt-0.5 shrink-0 text-cyan-300" />
          <p>
            Your ABRA stakes earn rewards through a multiplier system. After your lock period expires, you can unstake
            and claim the full accumulated value. The longer you commit, the higher your multiplier.
          </p>
        </div>
      </div>
    </div>
  );
}
