import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { Clock, Lock, TrendingUp, Unlock, Zap } from 'lucide-react';
import { useCallback, useMemo, useState, useEffect } from 'react';
import type { StakeDuration, StakeRecord } from '../lib/types';
import { Transaction, PublicKey } from '@solana/web3.js';
import { createStakeInstruction, fetchStakeRecord, getStakePDA } from '../lib/staking';
import { ABRA_TOKEN_MINT } from '../lib/solana';

const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const DEV_STAKE_WALLET = '7xyCkPPMQfEmRzzvpyboHVkWMn6u8BTvhMYuH3MWUjfX';
const programId = new PublicKey('ABRAxUUkW5CyxB7wqvtBCnLJVLCiQC8hQLBPSPDKv7gN');

const STAKE_CONFIGS = [
  { duration: 30 as StakeDuration, multiplier: 1.2, displayMultiplier: '1.2x', label: '30 Days', description: 'Quick stake for early participants' },
  { duration: 90 as StakeDuration, multiplier: 1.8, displayMultiplier: '1.8x', label: '90 Days', description: 'Balanced returns & commitment', highlight: true },
  { duration: 180 as StakeDuration, multiplier: 2.5, displayMultiplier: '2.5x', label: '180 Days', description: 'Maximum multiplier for diamond hands' },
];

export function StakePage() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [selectedDuration, setSelectedDuration] = useState<StakeDuration>(90);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [userStakes, setUserStakes] = useState<StakeRecord[]>([]);
  const [isStaking, setIsStaking] = useState(false);
  const [isLoadingStakes, setIsLoadingStakes] = useState(true);

  // Fetch real stakes from blockchain
  useEffect(() => {
    const loadStakes = async () => {
      if (!publicKey || !connection) {
        setIsLoadingStakes(false);
        return;
      }

      try {
        setIsLoadingStakes(true);
        const stake = await fetchStakeRecord(connection, publicKey, programId);
        if (stake) {
          setUserStakes([stake]);
        } else {
          setUserStakes([]);
        }
      } catch (error) {
        console.error('Failed to fetch stakes:', error);
        setUserStakes([]);
      } finally {
        setIsLoadingStakes(false);
      }
    };

    loadStakes();
  }, [publicKey, connection]);

  const selectedConfig = useMemo(() => STAKE_CONFIGS.find((c) => c.duration === selectedDuration), [selectedDuration]);

  const projectedRewards = useMemo(() => {
    if (!stakeAmount || isNaN(Number(stakeAmount))) return 0;
    const amount = Number(stakeAmount);
    return amount * (selectedConfig?.multiplier || 1) - amount;
  }, [stakeAmount, selectedConfig]);

  const handleStake = useCallback(async () => {
    if (!connected || !publicKey || !stakeAmount || !sendTransaction) return;
    setIsStaking(true);
    try {
      const wholeAmount = Math.floor(Number(stakeAmount));
      if (!Number.isFinite(wholeAmount) || wholeAmount <= 0) {
        alert('Stake amount must be a positive whole number of ABRA.');
        return;
      }

      // Check for existing active stake
      const existingStake = await fetchStakeRecord(connection, publicKey, programId);
      if (existingStake?.isActive) {
        alert('This live staking program currently supports one active stake per wallet.');
        return;
      }

      const latestBlockhash = await connection.getLatestBlockhash('confirmed');
      const mintAddress = new PublicKey(ABRA_TOKEN_CA);
      const treasuryWallet = new PublicKey(DEV_STAKE_WALLET);
      const {
        ASSOCIATED_TOKEN_PROGRAM_ID,
        createAssociatedTokenAccountInstruction,
        createTransferCheckedInstruction,
        getAssociatedTokenAddressSync,
        getMint,
        TOKEN_PROGRAM_ID,
      } = await import('@solana/spl-token');
      
      const mintAccount = await getMint(connection, mintAddress, 'confirmed', TOKEN_PROGRAM_ID);
      const sourceTokenAccount = getAssociatedTokenAddressSync(mintAddress, publicKey, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
      const treasuryTokenAccount = getAssociatedTokenAddressSync(mintAddress, treasuryWallet, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
      const tokenAmount = BigInt(wholeAmount) * (10n ** BigInt(mintAccount.decimals));

      const sourceTokenAccountInfo = await connection.getAccountInfo(sourceTokenAccount, 'confirmed');
      if (!sourceTokenAccountInfo) {
        alert('No ABRA token account found for this wallet. Buy ABRA first, then try staking again.');
        return;
      }

      const treasuryTokenAccountInfo = await connection.getAccountInfo(treasuryTokenAccount, 'confirmed');

      const instruction = createStakeInstruction(publicKey, wholeAmount, selectedDuration as StakeDuration, programId);
      const tx = new Transaction({
        feePayer: publicKey,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });

      if (!treasuryTokenAccountInfo) {
        tx.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            treasuryTokenAccount,
            treasuryWallet,
            mintAddress,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
          ),
        );
      }

      tx
        .add(
          createTransferCheckedInstruction(
            sourceTokenAccount,
            mintAddress,
            treasuryTokenAccount,
            publicKey,
            tokenAmount,
            mintAccount.decimals,
            [],
            TOKEN_PROGRAM_ID,
          ),
        )
        .add(instruction);

      const signature = await sendTransaction(tx, connection, {
        skipPreflight: false,
      });

      console.log('Stake transaction:', signature);
      alert(`Successfully staked ${wholeAmount} ABRA for ${selectedDuration} days!`);
      
      // Reload stakes
      const newStake = await fetchStakeRecord(connection, publicKey, programId);
      if (newStake) {
        setUserStakes([newStake]);
      }
      setStakeAmount('');
    } catch (error) {
      console.error('Staking failed:', error);
      alert(`Staking failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsStaking(false);
    }
  }, [connected, publicKey, sendTransaction, connection, stakeAmount, selectedDuration, selectedConfig]);

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
          <p className="text-[11px] text-white/60 font-mono uppercase tracking-wider">Connect wallet to view staking dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3 font-mono">
        <div className="flex items-center gap-2">
          <span className="text-violet-400">&gt;</span>
          <h1 className="text-sm font-bold text-violet-400 tracking-widest uppercase">[STAKING_PROTOCOL] ABRA_LOCK_EARN</h1>
        </div>
        <p className="text-[10px] text-violet-300/60 uppercase tracking-wider">
          &gt; Stake ABRA for 30, 90, or 180 days | Multipliers: 1.2x → 1.8x → 2.5x
        </p>
      </div>

      {/* Staking Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glow-panel p-4 space-y-1">
          <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono">TOTAL_STAKED</p>
          <p className="text-2xl font-bold text-amber-200">{totalStaked.toLocaleString()}</p>
          <p className="text-[10px] text-cyan-300/60 font-mono">ABRA</p>
        </div>
        <div className="glow-panel p-4 space-y-1">
          <p className="text-[10px] text-violet-400 uppercase tracking-widest font-mono">PROJECTED_VALUE</p>
          <p className="text-2xl font-bold text-violet-300">{totalProjectedValue.toLocaleString()}</p>
          <p className="text-[10px] text-violet-300/60 font-mono">ABRA</p>
        </div>
        <div className="glow-panel p-4 space-y-1">
          <p className="text-[10px] text-green-400 uppercase tracking-widest font-mono">ACTIVE_STAKES</p>
          <p className="text-2xl font-bold text-green-400">{userStakes.filter((s) => s.isActive).length}</p>
          <p className="text-[10px] text-green-300/60 font-mono">Position(s)</p>
        </div>
      </div>

      {/* Staking Form */}
      <div className="glow-panel p-6 space-y-5">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-amber-400">&gt;</span>
          <h2 className="text-sm font-bold text-amber-400 tracking-widest uppercase">[NEW_STAKE] INITIALIZE</h2>
        </div>

        {/* Duration Selection */}
        <div className="space-y-3">
          <label className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold font-mono">&gt; LOCK_DURATION</label>
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
                <p className="text-sm font-bold text-cyan-300 font-mono">{cfg.label}</p>
                <p className="text-lg font-bold text-amber-300 mt-1">{cfg.displayMultiplier}</p>
                <p className="text-[10px] text-cyan-300/60 mt-1 font-mono uppercase tracking-wider">{cfg.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold font-mono">&gt; ABRA_AMOUNT</label>
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
            <p className="text-[10px] text-green-400 font-mono uppercase tracking-wider">PROJECTED_EARNINGS</p>
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
          <div className="flex items-center gap-2 flex-shrink-0 w-full font-mono" style={{ contain: 'layout style' }}>
            <span className="text-cyan-400 flex-shrink-0">&gt;</span>
            <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase flex-shrink-0">[YOUR_STAKES] ACTIVE_LOCKS</h2>
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
                      <p className="text-sm font-bold text-cyan-300 font-mono">{stake.abraAmount.toLocaleString()} ABRA</p>
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
                      <p className="text-[10px] text-green-400/60 font-mono uppercase tracking-wider">Value_at_unlock</p>
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
