/**
 * Raido Trading Engine - Type Definitions & Backend API Contract
 * Specifies interfaces for bot integration and API communication
 */

// ════════════════════════════════════════════════════════════════════════════
// BOT INITIALIZATION & MANAGEMENT
// ════════════════════════════════════════════════════════════════════════════

export interface RaidoBotInitRequest {
  userId: string;
  abraBalance: number;
  stakeTier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface RaidoBotInitResponse {
  success: boolean;
  botId: string;
  allocatedBalance: number;
  symbols: string[];
}

export interface RaidoStartBotRequest {
  botId: string;
}

export interface RaidoStartBotResponse {
  status: 'running' | 'error';
  message: string;
}

export interface RaidoStopBotRequest {
  botId: string;
}

export interface RaidoStopBotResponse {
  status: 'stopped' | 'error';
  message: string;
}

// ════════════════════════════════════════════════════════════════════════════
// BOT STATE & DATA
// ════════════════════════════════════════════════════════════════════════════

export interface RaidoBotState {
  allocatedBalance: number;
  activeTrades: number;
  totalPnL: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  expectancy: number;
  maxDrawdown: number;
  compoundingProjection: number;
  lastUpdate: number;
}

export interface RaidoTradeData {
  id: string;
  symbol: string;
  entryPrice: number;
  entryTime: number;
  exitPrice?: number;
  exitTime?: number;
  stopLoss: number;
  takeProfit: number;
  pnl?: number;
  pnlPercent?: number;
  reasoning: string;
  preTradeAnalysis: RaidoPreTradeAnalysis;
  status: 'PENDING' | 'ACTIVE' | 'CLOSED' | 'LIQUIDATED';
}

export interface RaidoPreTradeAnalysis {
  currentFundingRate: number;
  maxDrawdown: number;
  allTimeHigh: number;
  allTimeHighRatio: number;
  ahrScore: number;
  verdict: 'LONG' | 'NEUTRAL' | 'SHORT';
  volatilityScore: number;
  liquidityScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

// ════════════════════════════════════════════════════════════════════════════
// TRADE OPERATIONS
// ════════════════════════════════════════════════════════════════════════════

export interface RaidoCloseTradeRequest {
  botId: string;
  tradeId: string;
  exitPrice: number;
}

export interface RaidoCloseTradeResponse {
  trade: RaidoTradeData;
}

export interface RaidoCompoundRequest {
  botId: string;
}

export interface RaidoCompoundResponse {
  status: 'submitted' | 'confirmed' | 'error';
  compoundAmount: number;
  transactionHash?: string;
}

// ════════════════════════════════════════════════════════════════════════════
// WEBSOCKET EVENTS
// ════════════════════════════════════════════════════════════════════════════

export type RaidoEventType =
  | 'bot.initialized'
  | 'bot.started'
  | 'bot.stopped'
  | 'signal.detected'
  | 'trade.opened'
  | 'trade.updated'
  | 'trade.closed'
  | 'trade.liquidated'
  | 'metrics.updated'
  | 'compound.triggered'
  | 'error.occurred';

export interface RaidoWebSocketEvent<T = unknown> {
  type: RaidoEventType;
  timestamp: number;
  data: T;
}

export interface RaidoSignalEvent {
  symbol: string;
  signal: 'ENTRY' | 'HOLD' | 'NONE';
  confidence: number;
  price: number;
  bbLower: number;
  bbMiddle: number;
  bbUpper: number;
  ema50: number;
  entryReason: string;
}

export interface RaidoTradeOpenedEvent {
  tradeId: string;
  symbol: string;
  entryPrice: number;
  entryTime: number;
  stopLoss: number;
  takeProfit: number;
  riskReward: number;
  reasoning: string;
  preTradeAnalysis: RaidoPreTradeAnalysis;
  positionSize: number;
}

export interface RaidoTradeUpdatedEvent {
  tradeId: string;
  symbol: string;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  stopLoss: number;
  timestamp: number;
}

export interface RaidoTradeClosedEvent {
  tradeId: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent: number;
  exitTime: number;
  exitReason: 'TP1' | 'TP2' | 'SL_HIT' | 'MANUAL';
}

export interface RaidoMetricsUpdatedEvent {
  totalTrades: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  expectancy: number;
  totalPnL: number;
  profitFactor: number;
  maxDrawdown: number;
  activeTrades: number;
  timestamp: number;
}

// ════════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ════════════════════════════════════════════════════════════════════════════

export enum RaidoErrorCode {
  BOT_NOT_INITIALIZED = 'BOT_NOT_INITIALIZED',
  BOT_ALREADY_RUNNING = 'BOT_ALREADY_RUNNING',
  BOT_NOT_RUNNING = 'BOT_NOT_RUNNING',
  INSUFFICIENT_ALLOCATION = 'INSUFFICIENT_ALLOCATION',
  MAX_CONCURRENT_TRADES_REACHED = 'MAX_CONCURRENT_TRADES_REACHED',
  INVALID_TRADE_ID = 'INVALID_TRADE_ID',
  PRICE_FEED_ERROR = 'PRICE_FEED_ERROR',
  STRATEGY_EVAL_ERROR = 'STRATEGY_EVAL_ERROR',
  COMPOUND_FAILED = 'COMPOUND_FAILED',
}

export interface RaidoErrorEvent {
  code: RaidoErrorCode;
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  symbol?: string;
  timestamp: number;
}

// ════════════════════════════════════════════════════════════════════════════
// API DOCUMENTATION (for reference)
// ════════════════════════════════════════════════════════════════════════════

/**
 * Backend REST API Endpoints
 *
 * Bot Management:
 *   POST   /api/raido/bot/initialize   - Initialize bot
 *   POST   /api/raido/bot/start        - Start bot polling
 *   POST   /api/raido/bot/stop         - Stop bot polling
 *
 * State & Data:
 *   GET    /api/raido/bot/state        - Get current bot state
 *   GET    /api/raido/trades/active    - Get active trades
 *   GET    /api/raido/trades/history   - Get trade history
 *   GET    /api/raido/logs/execution   - Get execution logs
 *
 * Trading Actions:
 *   POST   /api/raido/trades/close     - Manual close trade
 *   POST   /api/raido/compound/trigger - Trigger compounding
 *
 * Price Data:
 *   GET    /api/raido/prices/ohlcv     - Get OHLCV data
 *   GET    /api/raido/signals/current  - Get current signals
 *
 * WebSocket:
 *   WS     /api/raido/ws               - Real-time event stream
 */

// ════════════════════════════════════════════════════════════════════════════
// DATABASE SCHEMA (reference for backend)
// ════════════════════════════════════════════════════════════════════════════

/**
 * Tables to create in PostgreSQL/MongoDB:
 *
 * raido_bots:
 *   - id (PK)
 *   - userId (FK)
 *   - abraBalance (DECIMAL)
 *   - stakeTier (VARCHAR)
 *   - allocatedBalance (DECIMAL)
 *   - isRunning (BOOLEAN)
 *   - createdAt (TIMESTAMP)
 *   - updatedAt (TIMESTAMP)
 *
 * raido_trades:
 *   - id (PK)
 *   - botId (FK)
 *   - symbol (VARCHAR)
 *   - entryPrice (DECIMAL)
 *   - entryTime (TIMESTAMP)
 *   - exitPrice (DECIMAL)
 *   - exitTime (TIMESTAMP)
 *   - stopLoss (DECIMAL)
 *   - takeProfit (DECIMAL)
 *   - pnl (DECIMAL)
 *   - pnlPercent (DECIMAL)
 *   - reasoning (TEXT)
 *   - preTradeAnalysis (JSON)
 *   - status (VARCHAR)
 *
 * raido_execution_logs:
 *   - id (PK)
 *   - botId (FK)
 *   - tradeId (FK)
 *   - symbol (VARCHAR)
 *   - executedAt (TIMESTAMP)
 *   - positionSize (DECIMAL)
 *   - reasoning (JSON)
 *
 * raido_metrics:
 *   - id (PK)
 *   - botId (FK, UNIQUE)
 *   - totalTrades (INT)
 *   - totalWins (INT)
 *   - totalLosses (INT)
 *   - winRate (DECIMAL)
 *   - expectancy (DECIMAL)
 *   - totalPnL (DECIMAL)
 *   - profitFactor (DECIMAL)
 *   - maxDrawdown (DECIMAL)
 *   - updatedAt (TIMESTAMP)
 */
