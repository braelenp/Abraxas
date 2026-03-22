import { PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import type { StakeDuration } from './types';
import type { StakeRecord } from './types';

export const STAKING_SEED = 'stake';
export const STAKE_INSTRUCTION_DISCRIMINATOR = new Uint8Array([174, 52, 15, 177, 172, 229, 247, 123]);
export const STAKE_ACCOUNT_DISCRIMINATOR = new Uint8Array([80, 158, 67, 124, 50, 189, 192, 255]);

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
  const seedBytes = new TextEncoder().encode(STAKING_SEED);
  return PublicKey.findProgramAddressSync(
    [seedBytes, userPublicKey.toBuffer()],
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
): TransactionInstruction {
  const stakePDA = getStakePDA(userPublicKey, programId)[0];
  const data = new Uint8Array(24);
  data.set(STAKE_INSTRUCTION_DISCRIMINATOR, 0);
  writeU64(data, BigInt(amount), 8);
  writeU64(data, BigInt(durationDays), 16);

  return new TransactionInstruction({
    programId,
    keys: [
      { pubkey: userPublicKey, isSigner: true, isWritable: true },
      { pubkey: stakePDA, isSigner: false, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: data as any,
  });
}

export async function fetchStakeRecord(
  connection: Connection,
  userPublicKey: PublicKey,
  programId: PublicKey,
): Promise<StakeRecord | null> {
  const [stakePda] = getStakePDA(userPublicKey, programId);
  const accountInfo = await connection.getAccountInfo(stakePda, 'confirmed');

  if (!accountInfo) {
    return null;
  }

  const data = new Uint8Array(accountInfo.data);
  if (!hasDiscriminator(data, STAKE_ACCOUNT_DISCRIMINATOR)) {
    return null;
  }

  let offset = 8;
  const staker = new PublicKey(data.slice(offset, offset + 32)).toBase58();
  offset += 32;

  const abraAmount = Number(readU64(data, offset));
  offset += 8;
  const lockDurationDays = Number(readU64(data, offset));
  offset += 8;
  const stakedAtSeconds = Number(readU64(data, offset));
  offset += 8;
  const unlockedAtSeconds = Number(readU64(data, offset));
  offset += 8;
  const multiplierBps = Number(readU64(data, offset));
  offset += 8;
  const isActive = data[offset] === 1;
  offset += 1;
  const claimedRewards = Number(readU64(data, offset));

  return {
    address: stakePda.toBase58(),
    staker,
    abraAmount,
    lockDurationDays,
    stakedAt: stakedAtSeconds * 1000,
    unlockedAt: unlockedAtSeconds * 1000,
    multiplierBps,
    isActive,
    claimedRewards,
  };
}

function writeU64(target: Uint8Array, value: bigint, offset: number) {
  const view = new DataView(target.buffer, target.byteOffset, target.byteLength);
  view.setBigUint64(offset, value, true);
}

function readU64(source: Uint8Array, offset: number): bigint {
  const view = new DataView(source.buffer, source.byteOffset, source.byteLength);
  return view.getBigUint64(offset, true);
}

function hasDiscriminator(data: Uint8Array, discriminator: Uint8Array): boolean {
  if (data.length < discriminator.length) {
    return false;
  }

  for (let index = 0; index < discriminator.length; index += 1) {
    if (data[index] !== discriminator[index]) {
      return false;
    }
  }

  return true;
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
