/**
 * Raido Bot Manager - Orchestrates bot initialization and lifecycle
 */

import type { BotConfig, TradeRecord } from './raido-strategy';
import { RaidoBotServer, initializeBotServer } from './raido-bot-server';
import { startPriceFeedStreaming, RAIDO_SYMBOLS } from './jupiter-feed';
import { RAIDO_BOT_CONFIG, RAIDO_SERVER_CONFIG, STAKING_TIER_ALLOCATIONS } from './raido-config';

export type StakeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

/**
 * Manages bot lifecycle: initialization, start, stop, cleanup
 */
export class RaidoBotManager {
  private bot: RaidoBotServer | null = null;
  private cleanupPriceFeed: (() => void) | null = null;
  private isInitialized: boolean = false;
  private currentUserId: string | null = null;

  /**
   * Initialize bot for a specific user
   */
  public async initializeBot(
    userId: string,
    abraBalance: number,
    stakeTier: StakeTier
  ): Promise<RaidoBotServer> {
    if (this.isInitialized && this.bot) {
      return this.bot;
    }

    // Calculate allocated balance based on staking tier
    const tierConfig = STAKING_TIER_ALLOCATIONS[stakeTier];
    const maxAllocation = tierConfig.maxAllocation;
    const userAllocation = Math.min(maxAllocation, abraBalance * 0.1); // Max 10% of balance

    // Initialize bot server
    this.bot = initializeBotServer(RAIDO_SERVER_CONFIG, RAIDO_BOT_CONFIG);

    // Set user allocation
    this.bot.initializeBot(userAllocation);

    // Start price feed streaming
    try {
      this.cleanupPriceFeed = await startPriceFeedStreaming(
        this.bot,
        RAIDO_BOT_CONFIG.symbols
      );
    } catch (error) {
      console.error('[RaidoManager] Error starting price feed:', error);
    }

    this.isInitialized = true;
    this.currentUserId = userId;

    console.log(
      `[RaidoManager] Bot initialized for ${userId} with allocation: $${userAllocation.toFixed(2)}`
    );

    return this.bot;
  }

  /**
   * Start bot polling
   */
  public startBot(): void {
    if (!this.bot) {
      console.warn('[RaidoManager] Bot not initialized');
      return;
    }

    this.bot.startPolling();
    console.log('[RaidoManager] Bot polling started');
  }

  /**
   * Stop bot polling
   */
  public stopBot(): void {
    if (!this.bot) {
      console.warn('[RaidoManager] Bot not initialized');
      return;
    }

    this.bot.stopPolling();
    console.log('[RaidoManager] Bot polling stopped');
  }

  /**
   * Get current bot instance
   */
  public getBot(): RaidoBotServer | null {
    return this.bot;
  }

  /**
   * Clean up all resources
   */
  public cleanup(): void {
    this.stopBot();

    if (this.cleanupPriceFeed) {
      this.cleanupPriceFeed();
    }

    this.isInitialized = false;
    this.bot = null;
    this.currentUserId = null;

    console.log('[RaidoManager] Cleanup complete');
  }

  /**
   * Get bot state
   */
  public getBotState() {
    return this.bot?.getBotState() || null;
  }

  /**
   * Get trade history
   */
  public getTradeHistory(limit: number = 50): TradeRecord[] {
    return this.bot?.getTradeHistory(limit) || [];
  }

  /**
   * Get execution logs for audit trail
   */
  public getExecutionLogs(limit: number = 100) {
    return this.bot?.getTradeExecutionLogs(limit) || [];
  }

  /**
   * Manual trade closure (admin override)
   */
  public closeTrade(tradeId: string, exitPrice: number): void {
    if (!this.bot) {
      console.warn('[RaidoManager] Bot not initialized');
      return;
    }

    this.bot.manualCloseTrade(tradeId, exitPrice);
  }

  /**
   * Trigger auto-compounding immediately
   */
  public async compoundNow(): Promise<void> {
    if (!this.bot) {
      console.warn('[RaidoManager] Bot not initialized');
      return;
    }

    await this.bot.triggerAutoCompounding();
  }
}

/**
 * Singleton instance
 */
let managerInstance: RaidoBotManager | null = null;

export function createBotManager(): RaidoBotManager {
  if (!managerInstance) {
    managerInstance = new RaidoBotManager();
  }
  return managerInstance;
}

export function getBotManager(): RaidoBotManager {
  if (!managerInstance) {
    managerInstance = new RaidoBotManager();
  }
  return managerInstance;
}
