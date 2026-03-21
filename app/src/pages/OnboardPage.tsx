import { CheckCircle, Coins, Gem, Lock, Sparkles, TrendingUp, Wallet, Zap } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';
import { BagsBuyWidget } from '../components/BagsBuyWidget';
import type { StakeRecord } from '../lib/types';
import { PublicKey, SystemProgram, Transaction, Connection } from '@solana/web3.js';
import { SOLANA_RPC_ENDPOINT } from '../lib/solana';

type TokenTier = {
  id: string;
  label: string;
  amount: string;
  note: string;
  highlight?: boolean;
};

type StakeTier = {
  duration: number;
  multiplier: string;
  label: string;
  description: string;
  highlight?: boolean;
};

const ABRA_SYMBOL = 'ABRA';
const ABRA_TOKEN_CA = import.meta.env.VITE_ABRA_TOKEN_CONTRACT_ADDRESS?.trim() || '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const STAKE_DESTINATION = '7xyCkPPMQfEmRzzvpyboHVkWMn6u8BTvhMYuH3MWUjfX';

const TOKEN_TIERS: TokenTier[] = [
  { id: 'starter', label: 'Starter', amount: '500 ABRA', note: 'Entry early-adopter stake' },
  { id: 'builder', label: 'Builder', amount: '2,500 ABRA', note: 'Balanced early allocation', highlight: true },
  { id: 'accelerator', label: 'Accelerator', amount: '7,500 ABRA', note: 'High-conviction market stake' },
  { id: 'founder', label: 'Founder', amount: '20,000 ABRA', note: 'Founder-scale early position' },
];

const STAKE_TIERS: StakeTier[] = [
  {
    duration: 30,
    multiplier: '1.2x',
    label: '30 Days',
    description: 'Quick liquidity with entry-level returns',
  },
  {
    duration: 90,
    multiplier: '1.8x',
    label: '90 Days',
    description: 'Balanced commitment, strong multiplier',
    highlight: true,
  },
  {
    duration: 180,
    multiplier: '2.5x',
    label: '180 Days',
    description: 'Maximum returns for long-term conviction',
  },
];

export function OnboardPage() {
  const { connected, publicKey, signTransaction } = useWallet();
  const [selectedStakeDuration, setSelectedStakeDuration] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ amount: string; duration: number; multiplier: string } | null>(null);
  const [userStakes, setUserStakes] = useState<StakeRecord[]>([]);
  const [isStaking, setIsStaking] = useState(false);
  const [stakeError, setStakeError] = useState<string | null>(null);
  const [stakeSuccess, setStakeSuccess] = useState(false);

  useEffect(() => {
    if (!connected || !publicKey) {
      setUserStakes([]);
      return;
    }

    setUserStakes([
      {
        address: 'stake123',
        staker: publicKey.toString(),
        abraAmount: 2500,
        lockDurationDays: 90,
        stakedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
        unlockedAt: Date.now() + 60 * 24 * 60 * 60 * 1000,
        multiplierBps: 18_000,
        isActive: true,
        claimedRewards: 0,
      },
    ]);
  }, [connected, publicKey]);

  // Send ABRA (SOL for demo) to the provided SOL address
  const handleStakeSend = async () => {
    setIsStaking(true);
    setStakeError(null);
    setStakeSuccess(false);
    try {
      if (!connected && typeof window !== 'undefined') {
        if (typeof window.solana?.connect === 'function') {
          await window.solana.connect();
        }
        setIsStaking(false);
        return;
      }
      if (!publicKey || !stakeAmount || Number(stakeAmount) <= 0) {
        setStakeError('Enter a valid amount.');
        setIsStaking(false);
        return;
      }
      const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
      const lamports = Math.max(1, Number(stakeAmount)) * 1000000; // 0.001 SOL per unit (for demo)
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(STAKE_DESTINATION),
          lamports,
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;
      if (!signTransaction) throw new Error('Wallet not ready.');
      const signed = await signTransaction(tx);
      const sig = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(sig, 'confirmed');
      setStakeSuccess(true);
      setStakeAmount('');
    } catch (e: any) {
      setStakeError(e?.message || 'Failed to stake ABRA.');
    } finally {
      setIsStaking(false);
    }
  };

  const handleStake = useCallback((duration: number) => {
    setSelectedStakeDuration(duration);
    // Auto-fill with popular amount
    if (!stakeAmount) {
      setStakeAmount('2500');
    }
  }, [stakeAmount]);

  if (showSuccess && successData) {
    return (
      <div className="min-h-screen max-w-3xl mx-auto px-4 py-8 flex items-center justify-center">
        <div className="glow-panel p-8 space-y-4 text-center max-w-md">
          <div className="flex justify-center">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">ABRA Acquired & Staked</h2>
          <div className="space-y-2 text-sm text-white/70">
            <p>
              <span className="font-semibold text-amber-200">{successData.amount} ABRA</span> locked for{' '}
              <span className="font-semibold text-violet-300">{successData.duration} days</span>
            </p>
            <p>
              Multiplier: <span className="font-semibold text-green-300">{successData.multiplier}</span>
            </p>
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="text-white/60 text-xs leading-relaxed">
              You now hold equity in Abraxas + locked liquidity. La Casa NFT airdrops coming soon to all ABRA holders
              at unlock.
            </p>
          </div>
          <div className="text-xs text-white/40 font-mono pt-2">
            Stake active • Rewards accumulating
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="glow-panel p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-violet-400" />
          <h1 className="text-lg font-semibold text-white">Early Adoption — Live</h1>
        </div>
        <p className="text-sm text-white/65 leading-relaxed">
          Athlete-specific token listings are not live yet. Early adopters onboard now through
          <span className="text-yellow-300 font-semibold"> ABRA token acquisition + immediate staking</span>, while core dApp flows remain live in Devnet showcase mode.
        </p>
      </div>

      {/* Step 1: Buy ABRA or Stake if already holding */}
      <div className="grid grid-cols-1 gap-4">
        <div className="glow-panel p-5 space-y-3">
          <div className="flex items-center gap-2 text-yellow-300">
            <Coins size={16} />
            <h2 className="text-sm font-semibold text-white">Step 1: Buy ABRA Token (Live)</h2>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Acquire ABRA now for immediate liquid stake in the Abraxas RWA Stock Market.
            This is the live onboarding path while individual athlete token issuance remains pending.
          </p>
          <div className="rounded-xl border border-amber-300/25 bg-slate-900/70 p-3 space-y-1">
            <p className="text-[10px] uppercase tracking-[0.16em] text-amber-200/75 font-semibold">ABRA Token</p>
            <p className="text-[11px] text-slate-200">
              Symbol: <span className="font-semibold text-amber-200">{ABRA_SYMBOL}</span>
            </p>
            <p className="text-[11px] break-all font-mono text-slate-100">{ABRA_TOKEN_CA}</p>
          </div>
          {/* Already have ABRA? Stake now button */}
          <button
            onClick={() => setSelectedStakeDuration(90)}
            className="ui-action w-full h-11 mb-2 rounded-xl border border-violet-400/45 bg-violet-500/25 text-sm font-semibold text-violet-100 hover:bg-violet-500/35 transition-all"
            type="button"
          >
            Already have ABRA? Stake now
          </button>
          {/* BagsBuyWidget with Bags API key and ABRA token address */}
          <BagsBuyWidget tokenAddress={ABRA_TOKEN_CA} />
        </div>
      </div>

      {/* Step 2: Immediate Staking */}
      {selectedStakeDuration === null ? (
        <div className="space-y-4">
          <div className="glow-panel p-5 space-y-4">
            <div className="flex items-center gap-2 text-violet-300">
              <Lock size={16} />
              <h2 className="text-sm font-semibold text-white">Step 2: Immediate Stake ABRA</h2>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Stake your freshly acquired ABRA tokens for 30, 90, or 180 days to earn multiplied returns. Choose your lock period below.
            </p>

            {/* Stake Duration Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STAKE_TIERS.map((tier) => (
                <button
                  key={tier.duration}
                  onClick={() => handleStake(tier.duration)}
                  className={`group relative p-4 rounded-lg border transition-all text-left ${
                    tier.highlight
                      ? 'ring-1 ring-violet-400/40 border-violet-400/50'
                      : 'border-white/15 hover:border-white/30'
                  } hover:bg-slate-900/80`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 w-full">
                      <p className="text-sm font-semibold text-white">{tier.label}</p>
                      {tier.highlight && (
                        <span className="ml-auto inline-flex items-center gap-0 text-violet-300 font-semibold shrink-0">
                          <Gem size={14} />
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-green-400">{tier.multiplier}</p>
                      <p className="text-xs text-white/50">{tier.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="glow-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-violet-300">
              <Zap size={16} />
              <h2 className="text-sm font-semibold text-white">Confirm Your Stake</h2>
            </div>
            <button
              onClick={() => {
                setSelectedStakeDuration(null);
                setStakeAmount('');
              }}
              className="text-xs text-white/50 hover:text-white/70 transition-colors"
            >
              Change Duration
            </button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs text-white/60 uppercase tracking-wide font-semibold">ABRA Amount to Stake</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Enter ABRA amount..."
                className="flex-1 px-4 py-2 rounded-lg bg-slate-900/50 border border-white/15 text-white placeholder:text-white/30 focus:border-violet-400 focus:ring-1 focus:ring-violet-400/50 outline-none"
              />
              <button
                onClick={() => setStakeAmount('2500')}
                className="px-3 py-2 text-xs font-semibold text-white/60 hover:text-white transition-colors whitespace-nowrap"
              >
                Builder Tier
              </button>
            </div>
          </div>

          {/* Projection */}
          {stakeAmount && Number(stakeAmount) > 0 && (
            <div className="rounded-lg border border-green-400/25 bg-green-500/10 p-3 space-y-2">
              <p className="text-xs text-green-300 font-semibold">Projected Value at Unlock</p>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold text-green-300">
                  {(
                    Number(stakeAmount) *
                    (selectedStakeDuration === 30
                      ? 1.2
                      : selectedStakeDuration === 90
                        ? 1.8
                        : 2.5)
                  ).toFixed(0)}
                </p>
                <p className="text-xs text-green-300/70">
                  {selectedStakeDuration === 30
                    ? '1.2x'
                    : selectedStakeDuration === 90
                      ? '1.8x'
                      : '2.5x'}{' '}
                  multiplier
                </p>
              </div>
              <p className="text-xs text-green-300/60">
                Lock for {selectedStakeDuration} days, unlock & claim rewards anytime after
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedStakeDuration(null);
                setStakeAmount('');
              }}
              className="flex-1 h-10 rounded-lg border border-white/20 bg-transparent text-white font-semibold text-sm hover:bg-white/5 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleStakeSend}
              disabled={!stakeAmount || Number(stakeAmount) <= 0 || isStaking}
              className="flex-1 h-10 rounded-lg border border-green-400/45 bg-green-500/25 text-green-100 font-semibold text-sm hover:bg-green-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isStaking ? 'Staking...' : 'Stake'}
            </button>
          </div>
          {stakeSuccess && <p className="text-green-300 text-xs mt-1">Stake successful!</p>}
          {stakeError && <p className="text-red-400 text-xs mt-1">{stakeError}</p>}
        </div>
      )}

      {/* ABRA Position Guides */}
      <div className="space-y-3" style={{ contain: 'layout style' }}>
        <p className="text-xs uppercase tracking-[0.14em] text-amber-200/75 font-semibold flex-shrink-0">ABRA Position Guides</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOKEN_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`glow-panel p-4 space-y-2 ${tier.highlight ? 'ring-1 ring-amber-300/40' : ''}`}
            >
              <div className="flex items-center gap-2 w-full">
                <p className="text-sm font-semibold text-white">{tier.label}</p>
                {tier.highlight ? (
                  <span className="ml-auto inline-flex items-center gap-0 text-amber-300 font-semibold shrink-0">
                    <Gem size={14} />
                  </span>
                ) : null}
              </div>
              <p className="text-lg font-bold text-amber-200">{tier.amount}</p>
              <p className="text-xs text-white/55">{tier.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="glow-panel p-4 text-xs text-white/50 leading-relaxed flex items-start gap-2">
        <Wallet size={14} className="mt-0.5 shrink-0 text-cyan-300" />
        <p>
          You can stake your ABRA directly here after buying. Manage your stakes, check projections, and claim rewards after unlock all from this onboarding page.
          La Casa NFT rewards will be airdropped to qualifying early ABRA holders, while the app release focuses on token acquisition and devnet market showcase.
        </p>
      </div>

      {/* Devnet Note */}
      <div className="flex-shrink-0 w-full rounded-lg border border-cyan-400/25 bg-cyan-500/10 p-4 space-y-2" style={{ contain: 'layout style' }}>
        <div className="flex items-start gap-2 w-full">
          <TrendingUp size={14} className="mt-0.5 text-cyan-400 shrink-0 flex-shrink-0" />
          <div className="space-y-1 text-xs text-cyan-300/80 flex-1 min-w-0">
            <p className="font-semibold">Devnet Showcase Flows</p>
            <p>
              Vaults, Sophia AI, Circuit, and King AI remain live in devnet mode. Live trading flows with athlete tokens
              coming soon after launch.
            </p>
          </div>
        </div>
      </div>

      {/* Staking Dashboard Section */}
      {connected && (
        <>
          <div className="border-t border-white/10 pt-8"></div>
          
          {/* Staking Stats */}
          {userStakes.length > 0 && (
            <div className="sticky top-0 z-20 -mx-4 space-y-4 border-b border-cyan-200/15 bg-slate-950/92 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center min-w-0 max-w-full overflow-hidden">
                <h2 className="text-lg font-bold text-white min-w-0 max-w-full overflow-hidden truncate">Your ABRA Stakes</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 min-w-0 max-w-full overflow-hidden">
                <div className="glow-panel p-4 space-y-1 min-w-0 max-w-full overflow-hidden">
                  <p className="text-xs text-white/50 uppercase tracking-wide truncate">Total Staked</p>
                  <p className="text-2xl font-bold text-amber-200 truncate">
                    {userStakes.reduce((sum, s) => sum + s.abraAmount, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-white/40 truncate">ABRA</p>
                </div>
                <div className="glow-panel p-4 space-y-1 min-w-0 max-w-full overflow-hidden">
                  <p className="text-xs text-white/50 uppercase tracking-wide truncate">Projected Value</p>
                  <p className="text-2xl font-bold text-violet-300 truncate">
                    {Math.round(
                      userStakes.reduce((sum, s) => sum + s.abraAmount * (s.multiplierBps / 10_000), 0)
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-white/40 truncate">ABRA</p>
                </div>
                <div className="glow-panel p-4 space-y-1 min-w-0 max-w-full overflow-hidden">
                  <p className="text-xs text-white/50 uppercase tracking-wide truncate">Active Stakes</p>
                  <p className="text-2xl font-bold text-green-400 truncate">{userStakes.filter((s) => s.isActive).length}</p>
                  <p className="text-xs text-white/40 truncate">Position(s)</p>
                </div>
              </div>
            </div>
          )}

          {/* Your Stakes List */}
          {userStakes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-shrink-0 w-full" style={{ contain: 'layout style' }}>
                <Lock size={18} className="text-cyan-400 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-white flex-shrink-0">Active Stakes</h3>
              </div>
              <div className="space-y-3">
                {userStakes.map((stake) => {
                  const daysRemaining = Math.max(0, Math.floor((stake.unlockedAt - Date.now()) / (24 * 60 * 60 * 1000)));
                  const isUnlocked = daysRemaining === 0;
                  const earnedRewards = Math.round(stake.abraAmount * (stake.multiplierBps / 10_000 - 1));

                  return (
                    <div key={stake.address} className={`glow-panel p-4 space-y-3 ${stake.isActive ? '' : 'opacity-75'}`}>
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
                          <p className="text-xs text-white/40">{new Date(stake.stakedAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {stake.isActive && (
                        <div className="border-t border-white/10 pt-2">
                          <p className="text-xs text-white/50">Projected Value at Unlock</p>
                          <p className="text-lg font-bold text-green-300">
                            {(stake.abraAmount * (stake.multiplierBps / 10_000)).toLocaleString()} ABRA
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
