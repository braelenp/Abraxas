/**
 * Custom hooks for Raido Trading Bot state management
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { BotState, TradeRecord, StrategySignal, PreTradeAnalysis } from '../lib/trading/raido-strategy';
import type { BotEvent } from '../lib/trading/raido-bot-server';
import { RaidoBotServer } from '../lib/trading/raido-bot-server';

export interface BotUIState {
  botState: BotState | null;
  activeSignals: StrategySignal[];
  recentTrades: TradeRecord[];
  performanceMetrics: {
    winRate: number;
    expectancy: number;
    totalPnL: number;
    profitFactor: number;
  } | null;
  isRunning: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook: Manage bot state and events
 */
export function useRaidoBot(bot: RaidoBotServer | null) {
  const [state, setState] = useState<BotUIState>({
    botState: null,
    activeSignals: [],
    recentTrades: [],
    performanceMetrics: null,
    isRunning: false,
    isLoading: true,
    error: null,
  });

  const unsubscribeRef = useRef<(() => void) | null>(null);
  const signalsRef = useRef<Map<string, StrategySignal>>(new Map());

  useEffect(() => {
    if (!bot) {
      setState((prev) => ({ ...prev, isLoading: false, error: 'Bot not initialized' }));
      return;
    }

    // Subscribe to bot events
    const unsubscribe = bot.subscribe('ui', (event: BotEvent) => {
      setState((prev) => {
        let newState = { ...prev };

        switch (event.type) {
          case 'BOT_STARTED':
          case 'BOT_STOPPED':
            newState.isRunning = event.type === 'BOT_STARTED';
            break;

          case 'SIGNAL_GENERATED': {
            const data = event.data as { signal: StrategySignal; preTradeAnalysis: PreTradeAnalysis };
            signalsRef.current.set(data.signal.symbol, data.signal);
            newState.activeSignals = Array.from(signalsRef.current.values());
            break;
          }

          case 'TRADE_OPENED':
          case 'TRADE_CLOSED':
          case 'TRADE_LIQUIDATED': {
            const data = event.data as { trade: TradeRecord };
            newState.recentTrades = [data.trade, ...prev.recentTrades].slice(0, 20);
            break;
          }

          case 'METRICS_UPDATED': {
            const data = event.data as { metrics: any; state: BotState };
            newState.botState = data.state;
            newState.performanceMetrics = {
              winRate: data.metrics.winRate,
              expectancy: data.metrics.expectancy,
              totalPnL: data.metrics.totalPnL,
              profitFactor: data.metrics.profitFactor,
            };
            break;
          }

          case 'ERROR':
            newState.error = event.data as string;
            break;
        }

        newState.isLoading = false;
        return newState;
      });
    });

    unsubscribeRef.current = unsubscribe;

    // Get initial state
    const botState = bot.getBotState();
    const recentTrades = bot.getTradeHistory(20);
    setState((prev) => ({
      ...prev,
      botState,
      recentTrades,
      isLoading: false,
    }));

    return () => {
      unsubscribeRef.current?.();
    };
  }, [bot]);

  return state;
}

/**
 * Hook: Real-time trade monitoring
 */
export function useLiveTradeMonitoring(
  activeTrades: TradeRecord[],
  currentPrices: Map<string, number>
) {
  const [monitoredTrades, setMonitoredTrades] = useState<
    Array<TradeRecord & { unrealizedPnL: number; unrealizedPnLPercent: number }>
  >([]);

  useEffect(() => {
    const updated = activeTrades.map((trade) => {
      const currentPrice = currentPrices.get(trade.symbol) || trade.entryPrice;
      const unrealizedPnL = currentPrice - trade.entryPrice;
      const unrealizedPnLPercent = (unrealizedPnL / trade.entryPrice) * 100;

      return {
        ...trade,
        unrealizedPnL,
        unrealizedPnLPercent,
      };
    });

    setMonitoredTrades(updated);
  }, [activeTrades, currentPrices]);

  return monitoredTrades;
}

/**
 * Hook: Compounding projection calculator
 */
export function useCompoundingProjection(
  initialBalance: number,
  monthlyReturn: number = 0.05,
  projectionMonths: number = 12
) {
  const [projection, setProjection] = useState<{
    months: number[];
    balances: number[];
    totalReturn: number;
    annualizedReturn: number;
  }>({
    months: [],
    balances: [],
    totalReturn: 0,
    annualizedReturn: 0,
  });

  useEffect(() => {
    const months: number[] = [];
    const balances: number[] = [];

    const monthlyMultiplier = 1 + monthlyReturn;
    let balance = initialBalance;

    for (let i = 0; i <= projectionMonths; i++) {
      months.push(i);
      balances.push(balance);
      balance *= monthlyMultiplier;
    }

    const totalReturn = balance - initialBalance;
    const annualizedReturn = Math.pow(monthlyMultiplier, 12) - 1;

    setProjection({
      months,
      balances,
      totalReturn,
      annualizedReturn,
    });
  }, [initialBalance, monthlyReturn, projectionMonths]);

  return projection;
}

/**
 * Hook: Performance chart data generation
 */
export function useTradingPerformanceChart(tradeHistory: TradeRecord[]) {
  const [chartData, setChartData] = useState<
    Array<{
      date: string;
      equity: number;
      wins: number;
      losses: number;
      winRate: number;
    }>
  >([]);

  useEffect(() => {
    const data: Array<{
      date: string;
      equity: number;
      wins: number;
      losses: number;
      winRate: number;
    }> = [];

    let equity = 0;
    let wins = 0;
    let losses = 0;

    tradeHistory.forEach((trade) => {
      const pnl = trade.pnl || 0;
      equity += pnl;

      if (pnl > 0) wins++;
      if (pnl < 0) losses++;

      const date = new Date(trade.entryTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;

      data.push({
        date,
        equity,
        wins,
        losses,
        winRate,
      });
    });

    setChartData(data);
  }, [tradeHistory]);

  return chartData;
}

/**
 * Hook: Win/Loss distribution
 */
export function useWinLossMetrics(tradeHistory: TradeRecord[]) {
  const [metrics, setMetrics] = useState({
    totalTrades: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    avgWin: 0,
    avgLoss: 0,
    profitFactor: 0,
    largestWin: 0,
    largestLoss: 0,
    consecutiveWins: 0,
    consecutiveLosses: 0,
  });

  useEffect(() => {
    const closedTrades = tradeHistory.filter(
      (t) => t.status === 'CLOSED' || t.status === 'LIQUIDATED'
    );

    const wins = closedTrades.filter((t) => t.pnl && t.pnl > 0);
    const losses = closedTrades.filter((t) => t.pnl && t.pnl <= 0);

    const totalWinAmount = wins.reduce((sum, t) => sum + (t.pnl || 0), 0);
    const totalLossAmount = Math.abs(losses.reduce((sum, t) => sum + (t.pnl || 0), 0));

    const avgWin = wins.length > 0 ? totalWinAmount / wins.length : 0;
    const avgLoss = losses.length > 0 ? totalLossAmount / losses.length : 0;
    const profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;
    const largestWin = wins.length > 0 ? Math.max(...wins.map((t) => t.pnl || 0)) : 0;
    const largestLoss = losses.length > 0 ? Math.min(...losses.map((t) => t.pnl || 0)) : 0;

    const winRate = closedTrades.length > 0 ? (wins.length / closedTrades.length) * 100 : 0;

    // Calculate consecutive wins/losses
    let consecutiveWins = 0;
    let consecutiveLosses = 0;
    let maxConsecutiveWins = 0;
    let maxConsecutiveLosses = 0;

    closedTrades.forEach((trade) => {
      if (trade.pnl && trade.pnl > 0) {
        consecutiveWins++;
        consecutiveLosses = 0;
        maxConsecutiveWins = Math.max(maxConsecutiveWins, consecutiveWins);
      } else {
        consecutiveLosses++;
        consecutiveWins = 0;
        maxConsecutiveLosses = Math.max(maxConsecutiveLosses, consecutiveLosses);
      }
    });

    setMetrics({
      totalTrades: closedTrades.length,
      wins: wins.length,
      losses: losses.length,
      winRate,
      avgWin,
      avgLoss,
      profitFactor,
      largestWin,
      largestLoss,
      consecutiveWins: maxConsecutiveWins,
      consecutiveLosses: maxConsecutiveLosses,
    });
  }, [tradeHistory]);

  return metrics;
}
