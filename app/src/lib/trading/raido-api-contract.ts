/**
 * Raido Trading Engine - Backend API Contract
 * Specifies the API endpoints and WebSocket events for backend integration
 */

/**
 * REST API Endpoints (to be implemented in backend service)
 */
export const RAIDO_API = {
  // Bot Management
  'POST /api/raido/bot/initialize': {
    description: 'Initialize bot for a user with allocation tier',
    request: {
      userId: string;
      abraBalance: number;
      stakeTier: 'bronze' | 'silver' | 'gold' | 'platinum';
    },
    response: {
      success: boolean;
      botId: string;
      allocatedBalance: number;
      symbols: string[];
    },
  },

  'POST /api/raido/bot/start': {
    description: 'Start bot signal polling',
    request: { botId: string },
    response: { status: 'running' | 'error'; message: string },
  },

  'POST /api/raido/bot/stop': {
    description: 'Stop bot polling',
    request: { botId: string },
    response: { status: 'stopped'; message: string },
  },

  // State & Data
  'GET /api/raido/bot/state': {
    description: 'Get current bot state',
    request: { botId: string },
    response: {
      allocatedBalance: number;
      activeTradeCount: number;
      totalPnL: number;
      winRate: number;
      lastUpdate: number;
    },
  },

  'GET /api/raido/trades/active': {
    description: 'Get active open trades',
    request: { botId: string; limit?: number },
    response: {
      trades: Array<{
        id: string;
        symbol: string;
        entryPrice: number;
        entryTime: number;
        currentP_L?: number;
        status: 'ACTIVE';
      }>;
    },
  },

  'GET /api/raido/trades/history': {
    description: 'Get closed trades with full reasoning',
    request: { botId: string; limit?: number; offset?: number },
    response: {
      trades: Array<{
        id: string;
        symbol: string;
        entryPrice: number;
        exitPrice: number;
        pnl: number;
        pnlPercent: number;
        reasoning: string;
        preTradeAnalysis: object;
        exitTime: number;
      }>;
      totalTrades: number;
    },
  },

  'GET /api/raido/logs/execution': {
    description: 'Get trade execution logs for audit trail',
    request: { botId: string; limit?: number },
    response: {
      logs: Array<{
        tradeId: string;
        symbol: string;
        executedAt: number;
        entryPrice: number;
        positionSize: number;
        reasoning: {
          h1Signal: string;
          m15Confirmation: string;
          preTradeAnalysis: object;
          riskAnalysis: string;
        };
        status: string;
      }>;
    },
  },

  // Trading Actions
  'POST /api/raido/trades/close': {
    description: 'Manually close a trade (admin override)',
    request: {
      botId: string;
      tradeId: string;
      exitPrice: number;
    },
    response: {
      trade: {
        id: string;
        exitPrice: number;
        pnl: number;
        status: 'CLOSED';
      };
    },
  },

  'POST /api/raido/compound/trigger': {
    description: 'Trigger immediate auto-compounding to ABRA vault',
    request: { botId: string },
    response: {
      status: 'submitted' | 'error';
      compoundAmount: number;
      transactionHash?: string;
    },
  },

  // Price Data (for frontend to fetch)
  'GET /api/raido/prices/ohlcv': {
    description: 'Get OHLCV data for a symbol',
    request: {
      symbol: string;
      timeframe: 'H1' | 'M15' | 'M5' | 'M1';
      limit?: number;
    },
    response: {
      symbol: string;
      timeframe: string;
      candles: Array<{
        timestamp: number;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
      }>;
    },
  },

  'GET /api/raido/signals/current': {
    description: 'Get current active signals',
    request: { symbols?: string[] },
    response: {
      signals: Array<{
        symbol: string;
        signal: 'ENTRY' | 'HOLD' | 'NONE';
        confidence: number;
        reason: string;
        price: number;
      }>;
    },
  },
} as const;

/**
 * WebSocket Events (Real-time updates)
 * Client connects: ws://backend/api/raido/ws?userId=xxx&botId=yyy
 */
export const RAIDO_WEBSOCKET_EVENTS = {
  // Bot Lifecycle Events
  'bot.initialized': {
    data: {
      botId: string;
      allocatedBalance: number;
      userId: string;
      timestamp: number;
    },
  },

  'bot.started': {
    data: {
      botId: string;
      timestamp: number;
      status: 'running';
    },
  },

  'bot.stopped': {
    data: {
      botId: string;
      timestamp: number;
      reason?: string;
    },
  },

  // Signal Events
  'signal.detected': {
    data: {
      symbol: string;
      signal: 'ENTRY' | 'HOLD';
      confidence: number;
      price: number;
      bbLower: number;
      bbMiddle: number;
      bbUpper: number;
      ema50: number;
      entryReason: string;
      timestamp: number;
    },
  },

  // Trade Events
  'trade.opened': {
    data: {
      tradeId: string;
      symbol: string;
      entryPrice: number;
      entryTime: number;
      stopLoss: number;
      takeProfit: number;
      riskReward: number;
      reasoning: string;
      preTradeAnalysis: {
        currentFundingRate: number;
        maxDrawdown: number;
        allTimeHigh: number;
        ahrScore: number;
        verdict: 'LONG' | 'NEUTRAL' | 'SHORT';
        riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
      };
      positionSize: number;
    },
  },

  'trade.updated': {
    data: {
      tradeId: string;
      symbol: string;
      currentPrice: number;
      unrealizedPnL: number;
      unrealizedPnLPercent: number;
      stopLoss: number; // May have been trailed
      timestamp: number;
    },
  },

  'trade.closed': {
    data: {
      tradeId: string;
      symbol: string;
      entryPrice: number;
      exitPrice: number;
      pnl: number;
      pnlPercent: number;
      exitTime: number;
      exitReason: 'TP1' | 'TP2' | 'SL_HIT' | 'MANUAL';
    },
  },

  'trade.liquidated': {
    data: {
      tradeId: string;
      symbol: string;
      entryPrice: number;
      liquidationPrice: number;
      loss: number;
      lossPercent: number;
      exitTime: number;
      reason: string;
    },
  },

  // Metrics Events
  'metrics.updated': {
    data: {
      botId: string;
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
    },
  },

  // Compounding Events
  'compound.triggered': {
    data: {
      botId: string;
      amount: number;
      destination: string; // ABRA vault address
      timestamp: number;
      status: 'submitted' | 'confirmed' | 'error';
      transactionHash?: string;
    },
  },

  // Error Events
  'error.occurred': {
    data: {
      code: string;
      message: string;
      severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
      symbol?: string;
      timestamp: number;
    },
  },
} as const;

/**
 * Data Models
 */

export interface RaidoBotInitRequest {
  userId: string;
  abraBalance: number;
  stakeTier: 'bronze' | 'silver' | 'gold' | 'platinum';
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
  preTradeAnalysis: {
    currentFundingRate: number;
    maxDrawdown: number;
    allTimeHigh: number;
    allTimeHighRatio: number;
    ahrScore: number;
    verdict: 'LONG' | 'NEUTRAL' | 'SHORT';
    volatilityScore: number;
    liquidityScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  };
  status: 'PENDING' | 'ACTIVE' | 'CLOSED' | 'LIQUIDATED';
}

export interface RaidoMetrics {
  allocatedBalance: number;
  activeTrades: number;
  totalPnL: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  expectancy: number;
  profitFactor: number;
  maxDrawdown: number;
  compoundingProjection: number; // 12-month projection
  lastUpdate: number;
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

/**
 * Error Codes
 */
export const RAIDO_ERROR_CODES = {
  BOT_NOT_INITIALIZED: 'BOT_NOT_INITIALIZED',
  BOT_ALREADY_RUNNING: 'BOT_ALREADY_RUNNING',
  BOT_NOT_RUNNING: 'BOT_NOT_RUNNING',
  INSUFFICIENT_ALLOCATION: 'INSUFFICIENT_ALLOCATION',
  MAX_CONCURRENT_TRADES_REACHED: 'MAX_CONCURRENT_TRADES_REACHED',
  INVALID_TRADE_ID: 'INVALID_TRADE_ID',
  PRICE_FEED_ERROR: 'PRICE_FEED_ERROR',
  STRATEGY_EVAL_ERROR: 'STRATEGY_EVAL_ERROR',
  COMPOUND_FAILED: 'COMPOUND_FAILED',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const;

/**
 * Rate Limiting (Recommended)
 */
export const RAIDO_RATE_LIMITS = {
  'GET /api/raido/': { maxRequests: 100, windowMs: 60000 }, // 100 req/min
  'POST /api/raido/bot/': { maxRequests: 10, windowMs: 60000 }, // 10 req/min
  'WS /api/raido/ws': {
    maxMessageRate: 100,
    windowMs: 1000, // 100 msg/sec per connection
  },
} as const;

/**
 * Database Schema (for backend persistence)
 */
export const RAIDO_SCHEMA = {
  bots: {
    table: 'raido_bots',
    columns: [
      'id: PRIMARY KEY VARCHAR(32)',
      'userId: VARCHAR(32) NOT NULL',
      'abraBalance: DECIMAL(16,8)',
      'stakeTier: VARCHAR(16)',
      'allocatedBalance: DECIMAL(16,8)',
      'isRunning: BOOLEAN',
      'createdAt: TIMESTAMP',
      'updatedAt: TIMESTAMP',
    ],
  },

  trades: {
    table: 'raido_trades',
    columns: [
      'id: PRIMARY KEY VARCHAR(64)',
      'botId: VARCHAR(32) FOREIGN KEY',
      'symbol: VARCHAR(16)',
      'entryPrice: DECIMAL(24,8)',
      'entryTime: TIMESTAMP',
      'exitPrice: DECIMAL(24,8)',
      'exitTime: TIMESTAMP',
      'stopLoss: DECIMAL(24,8)',
      'takeProfit: DECIMAL(24,8)',
      'pnl: DECIMAL(16,8)',
      'pnlPercent: DECIMAL(8,2)',
      'reasoning: TEXT',
      'preTradeAnalysis: JSON',
      'status: VARCHAR(16)',
      'createdAt: TIMESTAMP',
    ],
  },

  executionLogs: {
    table: 'raido_execution_logs',
    columns: [
      'id: PRIMARY KEY VARCHAR(64)',
      'botId: VARCHAR(32) FOREIGN KEY',
      'tradeId: VARCHAR(64) FOREIGN KEY',
      'symbol: VARCHAR(16)',
      'executedAt: TIMESTAMP',
      'entryPrice: DECIMAL(24,8)',
      'positionSize: DECIMAL(16,8)',
      'reasoning: JSON',
      'createdAt: TIMESTAMP',
    ],
  },

  metrics: {
    table: 'raido_metrics',
    columns: [
      'id: PRIMARY KEY VARCHAR(64)',
      'botId: VARCHAR(32) FOREIGN KEY UNIQUE',
      'totalTrades: INTEGER',
      'totalWins: INTEGER',
      'totalLosses: INTEGER',
      'winRate: DECIMAL(5,4)',
      'expectancy: DECIMAL(8,4)',
      'totalPnL: DECIMAL(16,8)',
      'profitFactor: DECIMAL(8,4)',
      'maxDrawdown: DECIMAL(8,4)',
      'compoundingProjection: DECIMAL(16,8)',
      'updatedAt: TIMESTAMP',
    ],
  },
} as const;

/**
 * Frontend Integration Checklist
 */
export const FRONTEND_INTEGRATION = {
  'Initialize Bot': `
    const response = await fetch('/api/raido/bot/initialize', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'user123',
        abraBalance: 5000,
        stakeTier: 'gold'
      })
    });
  `,

  'Subscribe to Events': `
    const ws = new WebSocket('ws://backend/api/raido/ws?userId=user123&botId=bot456');
    ws.on('message', (event) => {
      if (event.type === 'trade.opened') {
        // Update UI with new trade
      }
      if (event.type === 'metrics.updated') {
        // Update dashboard metrics
      }
    });
  `,

  'Get Trade History': `
    const response = await fetch('/api/raido/trades/history?limit=50');
    const { trades } = await response.json();
    // Display in UI
  `,

  'Trigger Compounding': `
    const response = await fetch('/api/raido/compound/trigger', {
      method: 'POST',
      body: JSON.stringify({ botId: 'bot456' })
    });
  `,
} as const;

/**
 * Testing Endpoints (for development)
 */
export const RAIDO_TEST_ENDPOINTS = {
  'POST /api/raido/test/signal': {
    description: 'Inject a test signal (dev mode only)',
    request: {
      botId: string;
      symbol: string;
      signal: 'ENTRY' | 'HOLD';
      confidence: number;
    },
  },

  'POST /api/raido/test/trade': {
    description: 'Create a mock trade for testing (dev mode only)',
    request: {
      botId: string;
      symbol: string;
      entryPrice: number;
      stopLoss: number;
      takeProfit: number;
    },
  },

  'POST /api/raido/test/reset': {
    description: 'Reset bot state (dev mode only)',
    request: { botId: string },
  },
} as const;

/**
 * Documentation
 */
export const API_DOCUMENTATION = `
Raido Trading Engine - Backend API Contract v1.0

Full specification for implementing backend service endpoints.

## Architecture
- Frontend: React component + WebSocket client
- Backend: Node.js/Rust service running bot algorithm
- Database: PostgreSQL for persistence
- Message Queue: For event streaming (RabbitMQ/Kafka optional)

## Key Responsibilities

### Frontend (Already Implemented)
✅ UI Dashboard rendering
✅ State management (React hooks)
✅ WebSocket connection handling
✅ Performance visualization
✅ User interactions (start/stop/close trade)

### Backend (To Implement)
⚠️ Bot algorithm execution loop
⚠️ OHLCV data fetching (Jupiter API)
⚠️ Trade persistence (PostgreSQL)
⚠️ Event broadcasting (WebSocket)
⚠️ Solana transaction execution (auto-compound)
⚠️ Funding rate & ATH updates
⚠️ Risk management circuit breakers

## Testing Priority
1. Strategy evaluation tests (MBLB/50 algorithm)
2. Position sizing calculations
3. Trade lifecycle (entry→update→exit)
4. Metrics aggregation
5. WebSocket event delivery
6. Database persistence
7. Solana integration (auto-compound)

## Performance Requirements
- Signal evaluation: < 100ms per symbol
- WebSocket latency: < 500ms
- Database queries: < 50ms
- Overall polling cycle: 60 seconds (configurable)

## Security
- ✅ No private keys on client
- ✅ All trades via Solana blockchain
- ✅ API auth via JWT/wallet signature
- ✅ Rate limiting enforced
- ✅ SQL injection prevention (use ORM)
- ✅ WebSocket auth token validation
`;

export default RAIDO_API;
