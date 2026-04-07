/**
 * Raido Trading Bot Server API & Event Manager
 * Handles WebSocket connections, trade lifecycle, and bot orchestration
 */

import type {
  TradeRecord,
  StrategySignal,
  BotState,
  BotConfig,
  PreTradeAnalysis,
  OHLCV,
} from './raido-strategy';
import {
  evaluateStrategy,
  calculatePositionSize,
  calculateTakeProfitTargets,
  updateTradeManagement,
  calculatePerformanceMetrics,
  calculateCompoundingProjection,
  performPreTradeAnalysis,
} from './raido-strategy';

export type BotEventType =
  | 'SIGNAL_GENERATED'
  | 'TRADE_OPENED'
  | 'TRADE_CLOSED'
  | 'TRADE_LIQUIDATED'
  | 'BOT_STARTED'
  | 'BOT_STOPPED'
  | 'ERROR'
  | 'METRICS_UPDATED'
  | 'COMPOUND_EVENT';

export interface BotEvent {
  type: BotEventType;
  timestamp: number;
  symbol: string;
  data: unknown;
  userId: string;
}

export interface BotServerConfig {
  port: number;
  pollIntervalMs: number; // How often to check for new signals
  maxConcurrentTrades: number;
  enableAutoCompounding: boolean;
  abraVaultAddress: string;
}

/**
 * Trade execution log for transparency and analysis
 */
interface TradeExecutionLog {
  tradeId: string;
  symbol: string;
  executedAt: number;
  entryPrice: number;
  positionSize: number;
  reasoning: {
    h1Signal: string;
    m15Confirmation: string;
    preTradeAnalysis: PreTradeAnalysis;
    riskAnalysis: string;
  };
  status: string;
}

/**
 * Raido Bot Server - Orchestrates trading across all symbols
 */
export class RaidoBotServer {
  private botState: BotState;
  private botConfig: BotConfig;
  private serverConfig: BotServerConfig;
  private eventSubscribers: Map<string, (event: BotEvent) => void> = new Map();
  private isRunning: boolean = false;
  private tradeExecutionLogs: TradeExecutionLog[] = [];
  private priceDataCache: Map<string, OHLCV[]> = new Map();
  private fundingRateCache: Map<string, number> = new Map();
  private athCache: Map<string, number> = new Map();
  private pollInterval: NodeJS.Timeout | null = null;

  constructor(config: BotServerConfig, botConfig: BotConfig) {
    this.serverConfig = config;
    this.botConfig = botConfig;

    this.botState = {
      allocatedBalance: 0,
      activeSymbols: new Set(),
      activeTrades: [],
      tradeHistory: [],
      totalWins: 0,
      totalLosses: 0,
      totalPnL: 0,
      winRate: 0,
      expectancy: 0,
      maxDrawdown: 0,
      compoundingProjection: 0,
      lastUpdate: Date.now(),
    };
  }

  /**
   * Initialize bot with user's allocated balance (tied to ABRA staking level)
   */
  public initializeBot(allocatedBalance: number): void {
    this.botState.allocatedBalance = allocatedBalance;
    this.emit('BOT_STARTED', '', {
      allocatedBalance,
      maxConcurrentTrades: this.serverConfig.maxConcurrentTrades,
      symbols: this.botConfig.symbols,
    });
  }

  /**
   * Start the polling loop for signal detection across all symbols
   */
  public startPolling(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    console.log('[Raido] Bot polling started');

    this.pollInterval = setInterval(() => {
      this.pollForSignals();
    }, this.serverConfig.pollIntervalMs);
  }

  /**
   * Stop polling and close any active connections
   */
  public stopPolling(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }

    console.log('[Raido] Bot polling stopped');
    this.emit('BOT_STOPPED', '', { finalState: this.botState });
  }

  /**
   * Poll for new signals across all symbols
   */
  private async pollForSignals(): Promise<void> {
    for (const symbol of this.botConfig.symbols) {
      try {
        // Fetch latest price data (H1 + M15)
        const h1Data = this.priceDataCache.get(`${symbol}_H1`) || [];
        const m15Data = this.priceDataCache.get(`${symbol}_M15`) || [];

        if (h1Data.length === 0 || m15Data.length === 0) {
          continue; // Skip if no data
        }

        // Evaluate strategy
        const signal = evaluateStrategy(h1Data, m15Data, this.botConfig);
        signal.symbol = symbol;

        // Get pre-trade analysis
        const currentPrice = h1Data[h1Data.length - 1].close;
        const fundingRate = this.fundingRateCache.get(symbol) || 0;
        const ath = this.athCache.get(symbol) || currentPrice;
        
        const preTradeAnalysis = await performPreTradeAnalysis(
          symbol,
          currentPrice,
          h1Data,
          fundingRate,
          ath,
          this.botConfig.maxDrawdown
        );

        // Check if signal is actionable
        if (
          signal.signal === 'ENTRY' &&
          signal.confidence > 0.6 &&
          preTradeAnalysis.verdict === 'LONG'
        ) {
          await this.executeEntry(symbol, signal, preTradeAnalysis, h1Data);
        }

        // Emit signal for UI
        this.emit('SIGNAL_GENERATED', symbol, { signal, preTradeAnalysis });
      } catch (error) {
        console.error(`[Raido] Error processing symbol ${symbol}:`, error);
        this.emit('ERROR', symbol, { error: String(error) });
      }
    }

    // Update active trades and metrics
    this.updateActiveTradesAndMetrics();
  }

  /**
   * Execute trade entry with full reasoning logged
   */
  private async executeEntry(
    symbol: string,
    signal: StrategySignal,
    preTradeAnalysis: PreTradeAnalysis,
    h1Data: OHLCV[]
  ): Promise<void> {
    // Check if we already have max concurrent trades
    if (
      this.botState.activeTrades.length >=
      this.serverConfig.maxConcurrentTrades
    ) {
      return;
    }

    const entryPrice = signal.price;
    const recentSwingLow = h1Data[h1Data.length - 1].low;
    const stopLossPrice = recentSwingLow;

    // Calculate position size based on risk
    const { positionSize, riskAmount } = calculatePositionSize(
      this.botState.allocatedBalance,
      this.botConfig.riskPerTrade,
      entryPrice,
      stopLossPrice
    );

    // Calculate take-profit targets
    const { tp1, tp2 } = calculateTakeProfitTargets(
      entryPrice,
      stopLossPrice,
      signal.bbMiddle
    );

    // Create trade record
    const trade: TradeRecord = {
      id: `${symbol}-${Date.now()}`,
      symbol,
      entryPrice,
      entryTime: Date.now(),
      stopLoss: stopLossPrice,
      takeProfit: tp1, // Use middle BB as primary TP
      riskReward: (tp1 - entryPrice) / (entryPrice - stopLossPrice),
      status: 'ACTIVE',
      reasoning: signal.entryReason,
      preTradeAnalysis,
    };

    // Log execution
    const executionLog: TradeExecutionLog = {
      tradeId: trade.id,
      symbol,
      executedAt: Date.now(),
      entryPrice,
      positionSize,
      reasoning: {
        h1Signal: 'Price at lower BB, above 50-EMA',
        m15Confirmation: 'Candle closed above lower BB',
        preTradeAnalysis,
        riskAnalysis: `Risk: ${riskAmount.toFixed(2)}, Position: ${positionSize.toFixed(4)}, R:R: ${trade.riskReward.toFixed(2)}`,
      },
      status: 'ENTRY_EXECUTED',
    };

    this.tradeExecutionLogs.push(executionLog);
    this.botState.activeTrades.push(trade);

    console.log(`[Raido] Trade opened: ${symbol} @ ${entryPrice.toFixed(2)}`);
    this.emit('TRADE_OPENED', symbol, { trade, executionLog });
  }

  /**
   * Update active trades and calculate metrics
   */
  private updateActiveTradesAndMetrics(): void {
    const closedTrades: TradeRecord[] = [];

    for (let i = this.botState.activeTrades.length - 1; i >= 0; i--) {
      const trade = this.botState.activeTrades[i];
      const currentData = this.priceDataCache.get(`${trade.symbol}_M1`) || [];

      if (currentData.length === 0) continue;

      const currentPrice = currentData[currentData.length - 1].close;
      const recentSwingLow = Math.min(
        ...currentData.slice(-20).map((c) => c.low)
      );

      // Update trade management
      const updatedTrade = updateTradeManagement(
        trade,
        currentPrice,
        recentSwingLow,
        trade.takeProfit
      );

      if (
        updatedTrade.status === 'CLOSED' ||
        updatedTrade.status === 'LIQUIDATED'
      ) {
        this.botState.activeTrades.splice(i, 1);
        closedTrades.push(updatedTrade);
        this.botState.tradeHistory.push(updatedTrade);

        const eventType =
          updatedTrade.status === 'CLOSED'
            ? 'TRADE_CLOSED'
            : 'TRADE_LIQUIDATED';
        this.emit(eventType, trade.symbol, { trade: updatedTrade });
      }
    }

    // Calculate metrics
    const metrics = calculatePerformanceMetrics(this.botState.tradeHistory);
    this.botState.totalWins = metrics.totalWins;
    this.botState.totalLosses = metrics.totalLosses;
    this.botState.totalPnL = metrics.totalPnL;
    this.botState.winRate = metrics.winRate;
    this.botState.expectancy = metrics.expectancy;

    // Calculate compounding projection (monthly return used for projection)
    const monthlyReturn = this.botState.expectancy / 100; // Simplified
    const projection = calculateCompoundingProjection(
      this.botState.allocatedBalance,
      monthlyReturn,
      12
    );
    this.botState.compoundingProjection = projection.projectedBalance;
    this.botState.lastUpdate = Date.now();

    this.emit('METRICS_UPDATED', '', { metrics, state: this.botState });
  }

  /**
   * Update price data for a symbol (called by price feed integration)
   */
  public updatePriceData(
    symbol: string,
    timeframe: 'H1' | 'M15' | 'M5' | 'M1',
    ohlcv: OHLCV[]
  ): void {
    const key = `${symbol}_${timeframe}`;
    this.priceDataCache.set(key, ohlcv);
  }

  /**
   * Update funding rate for a symbol
   */
  public updateFundingRate(symbol: string, fundingRate: number): void {
    this.fundingRateCache.set(symbol, fundingRate);
  }

  /**
   * Update ATH for a symbol
   */
  public updateATH(symbol: string, ath: number): void {
    this.athCache.set(symbol, ath);
  }

  /**
   * Subscribe to bot events (for WebSocket and UI updates)
   */
  public subscribe(userId: string, callback: (event: BotEvent) => void): () => void {
    this.eventSubscribers.set(userId, callback);

    // Return unsubscribe function
    return () => {
      this.eventSubscribers.delete(userId);
    };
  }

  /**
   * Emit event to all subscribers
   */
  private emit(type: BotEventType, symbol: string, data: unknown): void {
    const event: BotEvent = {
      type,
      timestamp: Date.now(),
      symbol,
      data,
      userId: 'global', // Replace with actual user context
    };

    // Broadcast to all subscribers
    this.eventSubscribers.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error('[Raido] Error in event callback:', error);
      }
    });
  }

  /**
   * Get trade execution logs for transparency
   */
  public getTradeExecutionLogs(limit: number = 100): TradeExecutionLog[] {
    return this.tradeExecutionLogs.slice(-limit);
  }

  /**
   * Get current bot state
   */
  public getBotState(): BotState {
    return { ...this.botState };
  }

  /**
   * Get active trades
   */
  public getActiveTrades(): TradeRecord[] {
    return [...this.botState.activeTrades];
  }

  /**
   * Get trade history
   */
  public getTradeHistory(limit: number = 50): TradeRecord[] {
    return this.botState.tradeHistory.slice(-limit);
  }

  /**
   * Auto-compound profits into ABRA vault (triggered periodically or on threshold)
   */
  public async triggerAutoCompounding(): Promise<void> {
    if (!this.serverConfig.enableAutoCompounding) return;

    const profitableUnits = this.botState.totalPnL;
    if (profitableUnits > 0) {
      // This would integrate with Solana program to deposit into ABRA vault
      console.log(
        `[Raido] Auto-compounding ${profitableUnits.toFixed(2)} USDC into ABRA vault`
      );

      this.emit('COMPOUND_EVENT', '', {
        amount: profitableUnits,
        destination: this.serverConfig.abraVaultAddress,
        status: 'SUBMITTED',
      });
    }
  }

  /**
   * Manual trade closure (admin/user override)
   */
  public manualCloseTrade(tradeId: string, exitPrice: number): void {
    const tradeIndex = this.botState.activeTrades.findIndex(
      (t) => t.id === tradeId
    );

    if (tradeIndex === -1) return;

    const trade = this.botState.activeTrades[tradeIndex];
    trade.exitPrice = exitPrice;
    trade.exitTime = Date.now();
    trade.pnl = (exitPrice - trade.entryPrice) * 1; // Simplified
    trade.pnlPercent = (trade.pnl / trade.entryPrice) * 100;
    trade.status = 'CLOSED';

    this.botState.activeTrades.splice(tradeIndex, 1);
    this.botState.tradeHistory.push(trade);

    this.emit('TRADE_CLOSED', trade.symbol, { trade, manual: true });
  }
}

/**
 * Singleton instance management
 */
let botServerInstance: RaidoBotServer | null = null;

export function initializeBotServer(
  serverConfig: BotServerConfig,
  botConfig: BotConfig
): RaidoBotServer {
  if (!botServerInstance) {
    botServerInstance = new RaidoBotServer(serverConfig, botConfig);
  }
  return botServerInstance;
}

export function getBotServer(): RaidoBotServer | null {
  return botServerInstance;
}
