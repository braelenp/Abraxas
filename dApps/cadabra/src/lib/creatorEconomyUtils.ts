/**
 * Creator Economy Fee Sharing Utilities
 * Handles royalty calculations, splits, and Bags SDK integration
 */

import type {
  FeeShare,
  RoyaltySplit,
  CreatorMetrics,
  FeeShareResult,
} from './creatorEconomyTypes';

// CONFIGURATION
export const DEFAULT_ROYALTY_SPLIT: RoyaltySplit = {
  creatorShare: 0.70,         // 70% to creator
  holderShare: 0.20,          // 20% to coin holders
  platformShare: 0.05,        // 5% to Abraxas
  bagsShare: 0.05,            // 5% to Bags protocol
};

// ABRA Token Configuration
export const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
export const ABRAX_PROGRAM_ID = 'AbrxFZYHpVjfShYs6Tt8nGpFFhCCXLN73KbkKNvnGgVM';

// Bags Integration
const BAGS_API_BASE = 'https://api.bags.fm/v1';

/**
 * Calculate fee distribution across stakeholders
 */
export function calculateFeeShare(
  totalAmount: number,
  split: RoyaltySplit = DEFAULT_ROYALTY_SPLIT
): FeeShare & { breakdown: Record<string, number> } {
  return {
    viewFees: totalAmount * 0.25,           // Example: 25% from views
    tipFees: totalAmount * 0.35,            // Example: 35% from tips
    donationFees: totalAmount * 0.15,       // Example: 15% from donations
    nftSales: totalAmount * 0.15,           // Example: 15% from NFT sales
    tokenTrades: totalAmount * 0.10,        // Example: 10% from trades
    totalEarned: totalAmount,
    breakdown: {
      creator: totalAmount * split.creatorShare,
      holders: totalAmount * split.holderShare,
      platform: totalAmount * split.platformShare,
      bags: totalAmount * split.bagsShare,
    },
  };
}

/**
 * Calculate individual creator earnings
 */
export function calculateCreatorEarnings(
  grossAmount: number,
  split: RoyaltySplit = DEFAULT_ROYALTY_SPLIT
): number {
  return grossAmount * split.creatorShare;
}

/**
 * Calculate holder pool distribution
 */
export function calculateHolderPoolShare(
  grossAmount: number,
  split: RoyaltySplit = DEFAULT_ROYALTY_SPLIT
): number {
  return grossAmount * split.holderShare;
}

/**
 * Calculate per-holder share (divided by holder count)
 */
export function calculatePerHolderShare(
  grossAmount: number,
  holderCount: number,
  split: RoyaltySplit = DEFAULT_ROYALTY_SPLIT
): number {
  if (holderCount === 0) return 0;
  return calculateHolderPoolShare(grossAmount, split) / holderCount;
}

/**
 * Generate fee-sharing transaction breakdown
 */
export function generateFeeBreakdown(
  amount: number,
  split: RoyaltySplit = DEFAULT_ROYALTY_SPLIT
) {
  return {
    amount,
    split,
    breakdown: {
      creator: {
        percentage: split.creatorShare * 100,
        amount: amount * split.creatorShare,
      },
      holders: {
        percentage: split.holderShare * 100,
        amount: amount * split.holderShare,
      },
      platform: {
        percentage: split.platformShare * 100,
        amount: amount * split.platformShare,
      },
      bags: {
        percentage: split.bagsShare * 100,
        amount: amount * split.bagsShare,
      },
    },
    total: amount,
  };
}

/**
 * Validate royalty split configuration
 */
export function validateRoyaltySplit(split: RoyaltySplit): {
  valid: boolean;
  error?: string;
} {
  const total =
    split.creatorShare +
    split.holderShare +
    split.platformShare +
    split.bagsShare;

  if (Math.abs(total - 1.0) > 0.001) {
    return {
      valid: false,
      error: `Royalty split must total 100%, got ${(total * 100).toFixed(2)}%`,
    };
  }

  if (split.creatorShare < 0.5 || split.creatorShare > 0.9) {
    return {
      valid: false,
      error: 'Creator share must be between 50% and 90%',
    };
  }

  return { valid: true };
}

/**
 * Estimate creator earnings based on TikTok metrics
 */
export function estimateCreatorEarnings(
  followers: number,
  avgViewsPerClip: number,
  tipConversionRate: number = 0.02, // 2% of viewers tip
  avgTipAmount: number = 0.5 // $0.50 in ABRA equivalent
): number {
  const estimatedViewsPerDay = avgViewsPerClip * 2; // 2 clips per day
  const estimatedTipsPerDay = estimatedViewsPerDay * tipConversionRate * avgTipAmount;
  const monthlyEarnings = estimatedTipsPerDay * 30;

  return monthlyEarnings * 0.7; // 70% creator share
}

/**
 * Calculate growth metrics
 */
export function calculateGrowthRate(
  current: number,
  previous: number,
  periodHours: number = 24
): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Format fee distribution for display
 */
export function formatFeeDistribution(amount: number) {
  const breakdown = generateFeeBreakdown(amount);
  return {
    creator: `${(breakdown.breakdown.creator.percentage).toFixed(1)}% → ${breakdown.breakdown.creator.amount.toFixed(4)} ABRA`,
    holders: `${(breakdown.breakdown.holders.percentage).toFixed(1)}% → ${breakdown.breakdown.holders.amount.toFixed(4)} ABRA`,
    platform: `${(breakdown.breakdown.platform.percentage).toFixed(1)}% → ${breakdown.breakdown.platform.amount.toFixed(4)} ABRA`,
    bags: `${(breakdown.breakdown.bags.percentage).toFixed(1)}% → ${breakdown.breakdown.bags.amount.toFixed(4)} ABRA`,
  };
}

/**
 * Get Creator Coin token data from Bags API
 */
export async function getCreatorCoinData(mintAddress: string) {
  try {
    const response = await fetch(`${BAGS_API_BASE}/token/${mintAddress}`);
    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      mint: data.address,
      symbol: data.symbol,
      name: data.name,
      price: data.price,
      marketCap: data.marketCap,
      volume24h: data.volume24h,
      holders: data.holders,
      liquidity: data.liquidity,
      priceChange24h: data.priceChange24h,
    };
  } catch (error) {
    console.error('Failed to fetch creator coin data from Bags:', error);
    return null;
  }
}

/**
 * Calculate creator coin bonding curve price
 * Uses simplified linear bonding curve
 */
export function calculateBondingCurvePrice(
  currentSupply: number,
  totalSupply: number,
  basePrice: number = 0.01 // Base price in ABRA
): number {
  const utilizationRatio = currentSupply / totalSupply;
  // Price increases linearly with supply
  return basePrice * (1 + utilizationRatio);
}

/**
 * Estimate purchase cost on bonding curve
 */
export function estimatePurchaseCost(
  tokenAmount: number,
  currentSupply: number,
  totalSupply: number,
  basePrice: number = 0.01
): number {
  const startPrice = calculateBondingCurvePrice(currentSupply, totalSupply, basePrice);
  const endPrice = calculateBondingCurvePrice(
    currentSupply + tokenAmount,
    totalSupply,
    basePrice
  );
  
  // Average cost
  return ((startPrice + endPrice) / 2) * tokenAmount;
}

/**
 * Format metrics for display
 */
export function formatMetrics(metrics: CreatorMetrics) {
  return {
    creator: metrics.creator.displayName,
    coinSymbol: metrics.coin.symbol,
    price: `${metrics.price.toFixed(6)} ABRA`,
    marketCap: `${(metrics.marketCap / 1e6).toFixed(2)}M ABRA`,
    volume24h: `${(metrics.volume24h / 1e3).toFixed(2)}K ABRA`,
    holders: metrics.holders.toLocaleString(),
    totalEarned: `${metrics.feeShare.totalEarned.toFixed(2)} ABRA`,
  };
}

/**
 * Verify TikTok creator exists and get basic info
 * (Would call actual TikTok API in production)
 */
export async function verifyTikTokCreator(username: string) {
  // Placeholder - would integrate with TikTok API
  // For now, returns mock data structured for frontend
  return {
    found: true,
    username: username.replace(/^@/, ''),
    followers: Math.floor(Math.random() * 1000000000) + 1000,
    verified: Math.random() > 0.7,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
  };
}

/**
 * Create fee-sharing transaction on-chain
 * (Placeholder - integrates with Anchor/Solana)
 */
export async function createFeeShareTransaction(
  creatorAddress: string,
  amount: number,
  split: RoyaltySplit = DEFAULT_ROYALTY_SPLIT
): Promise<FeeShareResult> {
  const breakdown = generateFeeBreakdown(amount, split);
  
  return {
    transactionId: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fromAccount: 'platform_vault',
    toAccounts: {
      creator: {
        address: creatorAddress,
        amount: breakdown.breakdown.creator.amount,
      },
      holders: {
        address: 'holder_pool_vault',
        amount: breakdown.breakdown.holders.amount,
      },
      platform: {
        address: 'abraxas_treasury',
        amount: breakdown.breakdown.platform.amount,
      },
      bags: {
        address: 'bags_protocol_fee',
        amount: breakdown.breakdown.bags.amount,
      },
    },
    timestamp: Date.now(),
    status: 'pending',
  };
}

/**
 * Generate creator economy dashboard analytics
 */
export function generateDashboardAnalytics(metrics: CreatorMetrics[]) {
  const totalCreators = metrics.length;
  const totalEarnings = metrics.reduce((sum, m) => sum + m.feeShare.totalEarned, 0);
  const totalMarketCap = metrics.reduce((sum, m) => sum + m.marketCap, 0);
  const totalVolume24h = metrics.reduce((sum, m) => sum + m.volume24h, 0);
  const avgHolders = metrics.reduce((sum, m) => sum + m.holders, 0) / totalCreators;

  return {
    totalCreators,
    totalEarnings,
    totalMarketCap,
    totalVolume24h,
    averageHolders: Math.round(avgHolders),
    topCreator: metrics.reduce((top, m) =>
      m.feeShare.totalEarned > top.feeShare.totalEarned ? m : top
    ),
  };
}
