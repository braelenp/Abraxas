/**
 * Raido Trading Engine - MBLB/50 Bounce Strategy
 * H1 setup + M15 confirmation for day trading across 70 major cryptos + XAU
 */

export type TimeFrame = 'H1' | 'M15' | 'M5' | 'M1';
export type TradeSignal = 'ENTRY' | 'HOLD' | 'EXIT' | 'NONE';
export type TradeStatus = 'PENDING' | 'ACTIVE' | 'CLOSED' | 'LIQUIDATED';

export interface OHLCV {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface BollingerBands {
  middle: number;
  upper: number;
  lower: number;
  stdDev: number;
}

export interface StrategySignal {
  symbol: string;
  timeFrame: TimeFrame;
  signal: TradeSignal;
  confidence: number; // 0-1
  price: number;
  entryReason: string;
  bbUpper: number;
  bbMiddle: number;
  bbLower: number;
  ema50: number;
  fundingRate: number;
  timestamp: number;
}

export interface TradeRecord {
  id: string;
  symbol: string;
  entryPrice: number;
  entryTime: number;
  stopLoss: number;
  takeProfit: number;
  riskReward: number;
  status: TradeStatus;
  exitPrice?: number;
  exitTime?: number;
  pnl?: number;
  pnlPercent?: number;
  reasoning: string;
  preTradeAnalysis: PreTradeAnalysis;
}

export interface PreTradeAnalysis {
  currentFundingRate: number;
  maxDrawdown: number;
  allTimeHigh: number;
  allTimeHighRatio: number;
  ahrScore: number; // ATH High Ratio score
  verdict: 'LONG' | 'NEUTRAL' | 'SHORT';
  volatilityScore: number;
  liquidityScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface BotConfig {
  symbols: string[];
  h1Timeframe: OHLCV[];
  m15Timeframe: OHLCV[];
  bbPeriod: number;
  bbStdDev: number;
  emaPeriod: number;
  riskPerTrade: number; // 0.01 = 1%
  stopLossPercent?: number;
  maxDrawdown: number;
  maxOpenTrades: number;
}

export interface BotState {
  allocatedBalance: number;
  activeSymbols: Set<string>;
  activeTrades: TradeRecord[];
  tradeHistory: TradeRecord[];
  totalWins: number;
  totalLosses: number;
  totalPnL: number;
  winRate: number;
  expectancy: number;
  maxDrawdown: number;
  compoundingProjection: number;
  lastUpdate: number;
}

// ════════════════════════════════════════════════════════════════════════════

/**
 * Calculate SMA (Simple Moving Average)
 */
export function calculateSMA(data: number[], period: number): number {
  if (data.length < period) return 0;
  const lastPeriod = data.slice(-period);
  return lastPeriod.reduce((a, b) => a + b, 0) / period;
}

/**
 * Calculate EMA (Exponential Moving Average)
 */
export function calculateEMA(data: number[], period: number): number {
  if (data.length === 0) return 0;
  if (data.length === 1) return data[0];

  const multiplier = 2 / (period + 1);
  let ema = data[0];

  for (let i = 1; i < data.length; i++) {
    ema = data[i] * multiplier + ema * (1 - multiplier);
  }

  return ema;
}

/**
 * Calculate Standard Deviation
 */
export function calculateStdDev(data: number[], period: number): number {
  if (data.length < period) return 0;

  const lastPeriod = data.slice(-period);
  const mean = lastPeriod.reduce((a, b) => a + b, 0) / period;
  const variance =
    lastPeriod.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
    period;

  return Math.sqrt(variance);
}

/**
 * Calculate Bollinger Bands
 */
export function calculateBollingerBands(
  data: number[],
  period: number = 20,
  stdDevs: number = 2
): BollingerBands {
  const sma = calculateSMA(data, period);
  const stdDev = calculateStdDev(data, period);

  return {
    middle: sma,
    upper: sma + stdDev * stdDevs,
    lower: sma - stdDev * stdDevs,
    stdDev,
  };
}

/**
 * Calculate ATH (All-Time High) Ratio
 */
export function calculateAHR(currentPrice: number, ath: number): number {
  if (ath === 0) return 0;
  return currentPrice / ath;
}

/**
 * Pre-trade analysis with funding rates, drawdown, and structure assessment
 */
export async function performPreTradeAnalysis(
  symbol: string,
  currentPrice: number,
  ohlcvData: OHLCV[],
  fundingRate: number,
  allTimeHigh: number,
  maxDrawdown: number
): Promise<PreTradeAnalysis> {
  const closePrices = ohlcvData.map((candle) => candle.close);
  const ahr = calculateAHR(currentPrice, allTimeHigh);
  const ahrScore = Math.max(0, Math.min(1, ahr)); // Normalize 0-1

  // Volatility: StdDev of last 14 closes
  const volatility = calculateStdDev(closePrices, 14);
  const volatilityScore = Math.min(1, volatility / currentPrice); // Normalized

  // Liquidity: Based on volume trend (simplified)
  const volumes = ohlcvData.map((c) => c.volume);
  const avgVolume = calculateSMA(volumes, 10);
  const lastVolume = volumes[volumes.length - 1];
  const liquidityScore = Math.min(1, lastVolume / Math.max(avgVolume, 1));

  // Risk level determination
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
  if (ahrScore < 0.3 || maxDrawdown > 0.5) {
    riskLevel = 'HIGH';
  } else if (ahrScore > 0.8 && maxDrawdown < 0.2) {
    riskLevel = 'LOW';
  }

  // Structured verdict: LONG/NEUTRAL/SHORT based on multiple factors
  let verdict: 'LONG' | 'NEUTRAL' | 'SHORT' = 'NEUTRAL';
  const buySignalStrength =
    (ahrScore * 0.3 + (1 - maxDrawdown / 100) * 0.3 + liquidityScore * 0.4) /
    3;
  if (buySignalStrength > 0.65) {
    verdict = 'LONG';
  } else if (buySignalStrength < 0.35) {
    verdict = 'SHORT'; // Not used in long-only strategy, but documented
  }

  return {
    currentFundingRate: fundingRate,
    maxDrawdown,
    allTimeHigh,
    allTimeHighRatio: ahr,
    ahrScore,
    verdict,
    volatilityScore,
    liquidityScore,
    riskLevel,
  };
}

/**
 * Main strategy: MBLB/50 Bounce
 * Entry: Price touches/moves below Lower BB while above 50-EMA (H1)
 * Confirmation: Candle closes back above lower band (M15)
 */
export function evaluateStrategy(
  h1Data: OHLCV[],
  m15Data: OHLCV[],
  config: BotConfig
): StrategySignal {
  if (h1Data.length < 50 || m15Data.length < 20) {
    return {
      symbol: 'UNKNOWN',
      timeFrame: 'H1',
      signal: 'NONE',
      confidence: 0,
      price: 0,
      entryReason: 'Insufficient data',
      bbUpper: 0,
      bbMiddle: 0,
      bbLower: 0,
      ema50: 0,
      fundingRate: 0,
      timestamp: Date.now(),
    };
  }

  // ─ H1 Setup Analysis ──────────────────────────────────────────────────

  const h1Closes = h1Data.map((c) => c.close);
  const h1Lows = h1Data.map((c) => c.low);

  const h1BB = calculateBollingerBands(h1Closes, config.bbPeriod, config.bbStdDev);
  const h1EMA50 = calculateEMA(h1Closes, config.emaPeriod);
  const h1CurrentPrice = h1Closes[h1Closes.length - 1];
  const h1PreviousPrice = h1Closes[h1Closes.length - 2] || h1CurrentPrice;
  const h1CurrentLow = h1Lows[h1Lows.length - 1];

  // H1 Setup: Price touches or below lower BB while above 50-EMA
  const h1TouchesLowerBB =
    h1CurrentLow <= h1BB.lower || h1PreviousPrice <= h1BB.lower;
  const h1AboveEMA50 = h1CurrentPrice > h1EMA50;
  const h1SetupValid = h1TouchesLowerBB && h1AboveEMA50;

  // ─ M15 Confirmation Analysis ───────────────────────────────────────────

  const m15Closes = m15Data.map((c) => c.close);
  const m15Lows = m15Data.map((c) => c.low);

  const m15BB = calculateBollingerBands(m15Closes, config.bbPeriod, config.bbStdDev);
  const m15CurrentPrice = m15Closes[m15Closes.length - 1];
  const m15PreviousClose = m15Closes[m15Closes.length - 2] || m15CurrentPrice;
  const m15CurrentLow = m15Lows[m15Lows.length - 1];

  // M15 Confirmation: Candle closes back above lower band
  const m15TouchedLowerBB = m15CurrentLow <= m15BB.lower;
  const m15ClosedAboveLowerBB = m15CurrentPrice > m15BB.lower;
  const m15PreviousAboveLowerBB = m15PreviousClose > m15BB.lower;
  const m15Confirmation =
    m15TouchedLowerBB &&
    m15ClosedAboveLowerBB &&
    (m15PreviousAboveLowerBB || m15ClosedAboveLowerBB);

  // ─ Signal Generation ──────────────────────────────────────────────────

  let signal: TradeSignal = 'NONE';
  let confidence = 0;
  let entryReason = 'No setup found';

  if (h1SetupValid && m15Confirmation) {
    signal = 'ENTRY';
    // Confidence based on how close price is to lower BB
    const bbDistanceFactor = Math.max(
      0,
      1 -
        Math.abs(m15CurrentPrice - m15BB.lower) /
          (m15BB.middle - m15BB.lower)
    );
    const emaDistanceFactor =
      (h1CurrentPrice - h1EMA50) / (h1BB.upper - h1EMA50);
    confidence = Math.max(0, Math.min(1, (bbDistanceFactor + emaDistanceFactor) / 2));
    entryReason = `H1: Price ${h1CurrentPrice.toFixed(2)} touches BB lower ${h1BB.lower.toFixed(2)}, above EMA50 ${h1EMA50.toFixed(2)}. M15: Bounce confirmation above ${m15BB.lower.toFixed(2)}`;
  } else if (h1SetupValid) {
    signal = 'HOLD';
    confidence = 0.3;
    entryReason = `H1 setup valid (touches lower BB, above EMA50), waiting for M15 confirmation`;
  } else {
    signal = 'NONE';
    confidence = 0;
    entryReason = `H1 conditions not met`;
  }

  return {
    symbol: 'UNKNOWN',
    timeFrame: 'H1',
    signal,
    confidence,
    price: h1CurrentPrice,
    entryReason,
    bbUpper: h1BB.upper,
    bbMiddle: h1BB.middle,
    bbLower: h1BB.lower,
    ema50: h1EMA50,
    fundingRate: 0,
    timestamp: Date.now(),
  };
}

/**
 * Calculate risk-reward position sizing
 */
export function calculatePositionSize(
  allocatedBalance: number,
  riskPercentage: number,
  entryPrice: number,
  stopLossPrice: number
): {
  positionSize: number;
  riskAmount: number;
  stopLossPercent: number;
} {
  const riskAmount = allocatedBalance * riskPercentage;
  const stopLossPercent = Math.abs((entryPrice - stopLossPrice) / entryPrice);
  const positionSize = riskAmount / (entryPrice * stopLossPercent);

  return {
    positionSize,
    riskAmount,
    stopLossPercent,
  };
}

/**
 * Calculate optimal take-profit targets and risk-reward
 */
export function calculateTakeProfitTargets(
  entryPrice: number,
  stopLossPrice: number,
  bbMiddle: number,
  riskRewardRatio: number = 3 // 1:3 default
): {
  tp1: number; // Middle BB
  tp2: number; // Risk-reward based
  riskRewardRatio: number;
} {
  const riskAmount = Math.abs(entryPrice - stopLossPrice);
  const tp1 = bbMiddle; // First target at middle BB
  const tp2 = entryPrice + riskAmount * riskRewardRatio; // 1:3 R:R target

  return {
    tp1,
    tp2,
    riskRewardRatio,
  };
}

/**
 * Monitor and update trade stops/targets
 */
export function updateTradeManagement(
  trade: TradeRecord,
  currentPrice: number,
  recentSwingLow: number,
  bbMiddle: number
): TradeRecord {
  // Trailing stop: Update SL to recent swing low if higher
  if (recentSwingLow > trade.stopLoss) {
    trade.stopLoss = recentSwingLow;
  }

  // Check exit conditions
  if (currentPrice <= trade.stopLoss) {
    trade.status = 'LIQUIDATED';
    trade.exitPrice = trade.stopLoss;
    trade.exitTime = Date.now();
    trade.pnl = (trade.stopLoss - trade.entryPrice) * 1; // Simplified
    trade.pnlPercent = (trade.pnl / trade.entryPrice) * 100;
  } else if (currentPrice >= trade.takeProfit) {
    trade.status = 'CLOSED';
    trade.exitPrice = trade.takeProfit;
    trade.exitTime = Date.now();
    trade.pnl = (trade.takeProfit - trade.entryPrice) * 1; // Simplified
    trade.pnlPercent = (trade.pnl / trade.entryPrice) * 100;
  }

  return trade;
}

/**
 * Calculate bot performance metrics
 */
export function calculatePerformanceMetrics(
  tradeHistory: TradeRecord[]
): {
  totalTrades: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  totalPnL: number;
  expectancy: number;
  avgWinSize: number;
  avgLossSize: number;
  profitFactor: number;
} {
  const closedTrades = tradeHistory.filter((t) => t.status === 'CLOSED' || t.status === 'LIQUIDATED');

  const wins = closedTrades.filter((t) => t.pnl && t.pnl > 0);
  const losses = closedTrades.filter((t) => t.pnl && t.pnl < 0);

  const totalPnL =
    closedTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + (t.pnl || 0), 0) / wins.length : 0;
  const avgLoss =
    losses.length > 0
      ? Math.abs(losses.reduce((sum, t) => sum + (t.pnl || 0), 0) / losses.length)
      : 0;

  const winRate = closedTrades.length > 0 ? wins.length / closedTrades.length : 0;
  const expectancy = winRate * avgWin - (1 - winRate) * avgLoss;
  const profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;

  return {
    totalTrades: closedTrades.length,
    totalWins: wins.length,
    totalLosses: losses.length,
    winRate,
    totalPnL,
    expectancy,
    avgWinSize: avgWin,
    avgLossSize: avgLoss,
    profitFactor,
  };
}

/**
 * Calculate compounding projection
 */
export function calculateCompoundingProjection(
  initialBalance: number,
  monthlyReturn: number,
  months: number = 12
): {
  projectedBalance: number;
  totalReturn: number;
  annualizedReturn: number;
} {
  const monthlyMultiplier = 1 + monthlyReturn;
  const projectedBalance = initialBalance * Math.pow(monthlyMultiplier, months);
  const totalReturn = projectedBalance - initialBalance;
  const annualizedReturn = Math.pow(monthlyMultiplier, 12) - 1;

  return {
    projectedBalance,
    totalReturn,
    annualizedReturn,
  };
}
