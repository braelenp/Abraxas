/**
 * Raido Bot Configuration - MBLB/50 Bounce Strategy
 * Central configuration for bot behavior, assets, and parameters
 */

import type { BotConfig } from './raido-strategy';
import { RAIDO_SYMBOLS } from './jupiter-feed';

/**
 * Core bot parameters - FINALIZED STRATEGY RULES
 */
export const RAIDO_BOT_CONFIG: BotConfig = {
  symbols: RAIDO_SYMBOLS, // 70 major cryptos + XAU

  // Bollinger Bands settings (MBLB)
  bbPeriod: 20, // 20 MA period = Standard
  bbStdDev: 2, // 2 standard deviations

  // EMA settings (50-period)
  emaPeriod: 50, // 50-period for trend confirmation

  // Risk Management
  riskPerTrade: 0.01, // 1% of allocated balance per trade
  maxDrawdown: 20, // Max 20% portfolio drawdown before emergency stop
  maxOpenTrades: 5, // Max 5 concurrent trades across 70 assets

  // Timeframes
  h1Timeframe: [], // H1 for setup detection
  m15Timeframe: [], // M15 for entry confirmation

  // Stop Loss Configuration
  stopLossPercent: 2, // Fixed 2% stop loss if swing low unavailable

  // Take Profit Configuration (handled in trade setup)
  // - TP1: Middle Bollinger Band (exit 50%)
  // - TP2: 1:3 Risk-Reward ratio (exit 50%)
};

/**
 * Bot server configuration
 */
export const RAIDO_SERVER_CONFIG = {
  port: 3001,
  pollIntervalMs: 60000, // Poll every 60 seconds for new signals
  maxConcurrentTrades: 5,
  enableAutoCompounding: true,
  abraVaultAddress: 'GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm',
} as const;

/**
 * UI Theming
 */
export const RAIDO_THEME = {
  primary: {
    color: 'indigo',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-300',
  },
  accent: {
    color: 'cyan',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-300',
  },
  success: {
    color: 'green',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-300',
  },
  warning: {
    color: 'amber',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
  },
  danger: {
    color: 'red',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-300',
  },
} as const;

/**
 * Asset tier allocation based on ABRA staking level
 * Determines max allocation for the trading bot
 */
export const STAKING_TIER_ALLOCATIONS = {
  bronze: {
    minAbra: 0,
    maxAbra: 499,
    displayName: 'Bronze',
    maxAllocation: 100,
    dailyProfitShare: 0.7, // 70% of profits
    dailyCompoundShare: 0.3, // 30% to vault
  },
  silver: {
    minAbra: 500,
    maxAbra: 1999,
    displayName: 'Silver',
    maxAllocation: 500,
    dailyProfitShare: 0.65, // 65% to user
    dailyCompoundShare: 0.35, // 35% to vault
  },
  gold: {
    minAbra: 2000,
    maxAbra: 4999,
    displayName: 'Gold',
    maxAllocation: 2000,
    dailyProfitShare: 0.6, // 60% to user
    dailyCompoundShare: 0.4, // 40% to vault
  },
  platinum: {
    minAbra: 5000,
    maxAbra: Infinity,
    displayName: 'Platinum',
    maxAllocation: 10000,
    dailyProfitShare: 0.55, // 55% to user
    dailyCompoundShare: 0.45, // 45% to vault (accelerate ABRA growth)
  },
} as const;

/**
 * Performance metrics benchmarks
 */
export const PERFORMANCE_BENCHMARKS = {
  excellentWinRate: 0.6, // 60%+
  goodWinRate: 0.55, // 55-60%
  acceptableWinRate: 0.5, // 50-55%
  excellentProfitFactor: 3.0, // 3.0+
  goodProfitFactor: 2.0, // 2.0-3.0
  acceptableProfitFactor: 1.5, // 1.5-2.0
} as const;

/**
 * Market conditions detection thresholds
 */
export const MARKET_CONDITION_THRESHOLDS = {
  volatilityHigh: 0.05, // 5% volatility considered "high"
  volatilityNormal: 0.02, // 2% volatility considered "normal"
  volatilityLow: 0.01, // 1% volatility considered "low"
  fundingRateExtreme: 0.001, // 0.1% funding rate extreme
  drawdownCritical: 0.3, // 30% drawdown = critical
  drawdownHigh: 0.2, // 20% drawdown = high
  drawdownModerate: 0.1, // 10% drawdown = moderate
} as const;

/**
 * Trading hours and quiet periods (Unix hours 0-23)
 */
export const TRADING_WINDOWS = {
  enabled: true,
  quietHours: [0, 1, 2, 3, 4, 5, 6], // UTC hours when bot runs minimal scans
  activeHours: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], // Full scanning hours
  neverTrade: [], // Disabled - bot runs 24/7 by default
} as const;
