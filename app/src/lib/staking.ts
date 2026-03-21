import * as anchor from '@coral-xyz/anchor';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import type { StakeDuration } from './types';

export const STAKING_SEED = 'stake';

export const STAKE_MULTIPLIERS: Record<StakeDuration, number> = {
  30: 1.2,
  90: 1.8,
  180: 2.5,
};

export const STAKE_DESCRIPTIONS: Record<StakeDuration, string> = {
  30: 'Quick liquidity with entry-level returns',
  90: 'Balanced commitment, strong multiplier',
  180: 'Maximum returns for long-term conviction',
};

/**
 * Get the stake PDA for a user
 */
export function getStakePDA(userPublicKey: PublicKey, programId: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(STAKING_SEED), userPublicKey.toBuffer()],
    programId
  );
}

/**
 * Create a stake instruction
 */
export function createStakeInstruction(
  userPublicKey: PublicKey,
  amount: number,
  durationDays: StakeDuration,
  programId: PublicKey
): Transaction {
  const stakePDA = getStakePDA(userPublicKey, programId)[0];

  const tx = new Transaction();
  // This would be filled in when Anchor IDL is generated
  // For now, returning placeholder
  return tx;
}

/**
 * Calculate projected rewards based on stake amount and duration
 */
export function calculateProjectedRewards(amount: number, duration: StakeDuration): number {
  const multiplier = STAKE_MULTIPLIERS[duration];
  return amount * multiplier;
}

/**
 * Calculate rewards earned (total value - principal)
 */
export function calculateRewardsEarned(amount: number, duration: StakeDuration): number {
  const totalValue = calculateProjectedRewards(amount, duration);
  return totalValue - amount;
}

/**
 * Get readable duration label
 */
export function getDurationLabel(days: StakeDuration): string {
  return `${days} Days`;
}

/**
 * Get multiplier display string (e.g., "1.2x")
 */
export function getMultiplierDisplay(duration: StakeDuration): string {
  const multiplier = STAKE_MULTIPLIERS[duration];
  return `${multiplier.toFixed(1)}x`;
}

/**
 * Validate stake amount
 */
export function validateStakeAmount(amount: number): { valid: boolean; error?: string } {
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }
  if (!Number.isFinite(amount)) {
    return { valid: false, error: 'Invalid amount' };
  }
  return { valid: true };
}

/**
 * Validate lock duration
 */
export function validateLockDuration(duration: number): { valid: boolean; error?: string } {
  if (![30, 90, 180].includes(duration)) {
    return { valid: false, error: 'Duration must be 30, 90, or 180 days' };
  }
  return { valid: true };
}

/**
 * Format ABRA amount with commas
 */
export function formatAbraAmount(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/**
 * Check if a stake is unlocked based on unlock time
 */
export function isStakeUnlocked(unlockedAt: number, now: number = Date.now()): boolean {
  return now >= unlockedAt;
}

/**
 * Get days remaining until unlock
 */
export function getDaysRemaining(unlockedAt: number, now: number = Date.now()): number {
  const millisRemaining = Math.max(0, unlockedAt - now);
  return Math.ceil(millisRemaining / (24 * 60 * 60 * 1000));
}

/**
 * Format unlock time as readable date
 */
export function formatUnlockDate(unlockedAt: number): string {
  return new Date(unlockedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get status badge for a stake
 */
export type StakeStatus = 'active' | 'unlocked' | 'claimed';

export function getStakeStatus(stake: {
  isActive: boolean;
  claimedRewards: number;
  unlockedAt: number;
}): StakeStatus {
  if (!stake.isActive && stake.claimedRewards > 0) {
    return 'claimed';
  }
  if (!stake.isActive) {
    return 'unlocked';
  }
  return 'active';
}
