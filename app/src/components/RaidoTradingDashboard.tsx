/**
 * Raido Trading Bot Dashboard Component
 * Displays live bot status, signals, trades, and performance
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  Target,
  Gauge,
  PlayCircle,
  PauseCircle,
  LogOut,
} from 'lucide-react';
import { useRaidoBot, useLiveTradeMonitoring, useCompoundingProjection, useTradingPerformanceChart, useWinLossMetrics } from '../hooks/useRaidoBot';
import type { BotState, TradeRecord, StrategySignal } from '../lib/trading/raido-strategy';
import { RaidoBotServer, initializeBotServer } from '../lib/trading/raido-bot-server';
import { startPriceFeedStreaming, RAIDO_SYMBOLS } from '../lib/trading/jupiter-feed';

interface RaidoDashboardProps {
  userAbraBalance: number;
  userStakeTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  onBuyAbra?: () => void;
}

export function RaidoTradingDashboard({
  userAbraBalance,
  userStakeTier,
  onBuyAbra,
}: RaidoDashboardProps) {
  const [bot, setBot] = useState<RaidoBotServer | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'signals' | 'trades' | 'analysis'>('dashboard');
  const botRef = useRef<RaidoBotServer | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Determine bot allocation based on staking tier
  const allocationBySakeTier: Record<string, number> = {
    bronze: 100,
    silver: 500,
    gold: 2000,
    platinum: 10000,
  };

  const allocatedBalance = Math.min(allocationBySakeTier[userStakeTier], userAbraBalance * 0.1);

  // Initialize bot on mount
  useEffect(() => {
    if (botRef.current) return;

    const serverConfig = {
      port: 3001,
      pollIntervalMs: 60000, // Poll every minute
      maxConcurrentTrades: 5,
      enableAutoCompounding: true,
      abraVaultAddress: 'GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm',
    };

    const botConfig = {
      symbols: RAIDO_SYMBOLS,
      h1Timeframe: [],
      m15Timeframe: [],
      bbPeriod: 20,
      bbStdDev: 2,
      emaPeriod: 50,
      riskPerTrade: 0.01, // 1% risk per trade
      maxDrawdown: 20,
      maxOpenTrades: 5,
    };

    const newBot = initializeBotServer(serverConfig, botConfig);
    newBot.initializeBot(allocatedBalance);

    botRef.current = newBot;
    setBot(newBot);

    // Start price feed streaming
    startPriceFeedStreaming(newBot, RAIDO_SYMBOLS).then((cleanup) => {
      cleanupRef.current = cleanup;
    });

    return () => {
      cleanupRef.current?.();
      newBot.stopPolling();
    };
  }, [allocatedBalance]);

  const botState = useRaidoBot(bot);
  const currentPrices = new Map<string, number>(); // Would be populated from price feed
  const monitoredTrades = useLiveTradeMonitoring(botState.botState?.activeTrades || [], currentPrices);
  const projection = useCompoundingProjection(allocatedBalance, 0.05, 12);
  const performanceChart = useTradingPerformanceChart(botState.recentTrades);
  const winLoss = useWinLossMetrics(botState.recentTrades);

  const handleStartBot = () => {
    if (bot && !botState.isRunning) {
      bot.startPolling();
    }
  };

  const handleStopBot = () => {
    if (bot && botState.isRunning) {
      bot.stopPolling();
    }
  };

  if (botState.isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Zap className="w-12 h-12 animate-spin mx-auto text-cyan-400 mb-4" />
          <p className="text-gray-300">Initializing Raido Trading Engine...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 rounded-lg border border-indigo-500/30 overflow-hidden">
      {/* ─ Header & Status ─ */}
      <div className="border-b border-indigo-500/30 bg-gradient-to-r from-gray-800/50 to-indigo-900/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-lg animate-pulse" />
              <Zap className="w-8 h-8 text-cyan-400 relative" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Raido Trading Engine</h2>
              <p className="text-sm text-gray-400">MBLB/50 Bounce Strategy • Day Trading Bot</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {botState.isRunning ? (
              <button
                onClick={handleStopBot}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors"
              >
                <PauseCircle className="w-4 h-4" />
                Stop
              </button>
            ) : (
              <button
                onClick={handleStartBot}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 hover:bg-green-500/30 transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Start
              </button>
            )}
          </div>
        </div>

        {/* ─ Status Indicator ─ */}
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full animate-pulse ${
              botState.isRunning ? 'bg-green-400' : 'bg-gray-500'
            }`}
          />
          <span className={`text-sm font-medium ${botState.isRunning ? 'text-green-300' : 'text-gray-400'}`}>\n            {botState.isRunning ? 'Bot Running' : 'Bot Offline'} • Works While You Sleep ✓
          </span>
        </div>
      </div>

      {/* ─ Key Metrics Overview ─ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-indigo-500/30">
        {/* Allocated Balance */}
        <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-500/60 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Allocated Balance</p>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">${allocatedBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-500 mt-1">{userStakeTier.toUpperCase()} Tier</p>
        </div>

        {/* Win Rate */}
        <div className="bg-gray-800/50 border border-emerald-500/30 rounded-lg p-4 hover:border-emerald-500/60 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Win Rate</p>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-300">{(botState.performanceMetrics?.winRate || 0).toFixed(1)}%</p>
          <p className="text-xs text-gray-500 mt-1">{winLoss.totalTrades} trades</p>
        </div>

        {/* Total PnL */}
        <div
          className={`border rounded-lg p-4 hover:border-60 transition-colors ${
            (botState.performanceMetrics?.totalPnL || 0) >= 0
              ? 'bg-green-900/20 border-green-500/30 hover:border-green-500'
              : 'bg-red-900/20 border-red-500/30 hover:border-red-500'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total PnL</p>
            <TrendingUp className="w-4 h-4" style={{ color: (botState.performanceMetrics?.totalPnL || 0) >= 0 ? '#22c55e' : '#ef4444' }} />
          </div>
          <p
            className="text-2xl font-bold"
            style={{ color: (botState.performanceMetrics?.totalPnL || 0) >= 0 ? '#22c55e' : '#ef4444' }}
          >
            ${((botState.performanceMetrics?.totalPnL || 0) / 100).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Expectancy: {(botState.performanceMetrics?.expectancy || 0).toFixed(2)}%</p>
        </div>

        {/* Projection (12 months) */}
        <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-4 hover:border-purple-500/60 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">12-Month Projection</p>
            <Gauge className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-purple-300">${(projection.balances[projection.balances.length - 1] / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-500 mt-1">+{((projection.annualizedReturn) * 100).toFixed(1)}% annual</p>
        </div>
      </div>

      {/* ─ View Mode Tabs ─ */}
      <div className="flex border-b border-indigo-500/30 bg-gray-900/50">
        {(['dashboard', 'signals', 'trades', 'analysis'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              viewMode === mode
                ? 'border-cyan-400 text-cyan-300 bg-gray-800/30'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            {mode === 'dashboard' && 'Dashboard'}
            {mode === 'signals' && '📡 Signals'}
            {mode === 'trades' && '📊 Trades'}
            {mode === 'analysis' && '🎯 Analysis'}
          </button>
        ))}
      </div>

      {/* ─ Content Area ─ */}
      <div className="p-6">
        {viewMode === 'dashboard' && (
          <DashboardView
            botState={botState.botState}
            activeTrades={monitoredTrades}
            recentTrades={botState.recentTrades}
            projection={projection}
          />
        )}

        {viewMode === 'signals' && (
          <SignalsView activeSignals={botState.activeSignals} />
        )}

        {viewMode === 'trades' && (
          <TradesView activeTrades={monitoredTrades} recentTrades={botState.recentTrades} />
        )}

        {viewMode === 'analysis' && (
          <AnalysisView
            performanceChart={performanceChart}
            winLoss={winLoss}
            botState={botState.botState}
          />
        )}
      </div>

      {/* ─ Buy ABRA CTA ─ */}
      {userAbraBalance < 100 && (
        <div className="border-t border-indigo-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">🚀 Increase allocation & rewards</p>
              <p className="text-xs text-gray-500">Stake more $ABRA to unlock higher tier allocations</p>
            </div>
            <button
              onClick={onBuyAbra}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Buy $ABRA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════

/**
 * Dashboard View Component
 */
function DashboardView({
  botState,
  activeTrades,
  recentTrades,
  projection,
}: {
  botState: BotState | null;
  activeTrades: any[];
  recentTrades: TradeRecord[];
  projection: any;
}) {
  return (
    <div className="space-y-6">
      {/* ─ Active Trades ─ */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Active Positions ({activeTrades.length})
        </h3>

        {activeTrades.length === 0 ? (
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-8 text-center">
            <Target className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Waiting for setup conditions...</p>
            <p className="text-xs text-gray-500 mt-2">Bot scanning H1 + M15 for MBLB/50 bounces</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeTrades.map((trade) => (
              <div key={trade.id} className="bg-gray-800/50 border border-indigo-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{trade.symbol}</span>
                  <span
                    className={`text-sm font-bold ${
                      trade.unrealizedPnLPercent >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {trade.unrealizedPnLPercent > 0 ? '+' : ''}{trade.unrealizedPnLPercent.toFixed(2)}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
                  <div>Entry: ${trade.entryPrice.toFixed(2)}</div>
                  <div>SL: ${trade.stopLoss.toFixed(2)}</div>
                  <div>TP: ${trade.takeProfit.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─ Recent Trades ─ */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Trade History</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {recentTrades.slice(0, 10).map((trade) => (
            <div
              key={trade.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                (trade.pnl || 0) >= 0
                  ? 'bg-green-900/10 border-green-500/30'
                  : 'bg-red-900/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {(trade.pnl || 0) >= 0 ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
                <div>
                  <p className="text-sm font-semibold text-white">{trade.symbol}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(trade.entryTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <span
                className="font-bold text-sm"
                style={{
                  color:
                    (trade.pnl || 0) >= 0
                      ? '#22c55e'
                      : '#ef4444',
                }}
              >
                {(trade.pnl || 0) >= 0 ? '+' : ''}{trade.pnlPercent?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─ Compounding Projection ─ */}
      <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">12-Month Compounding Projection</h3>
        <div className="h-40 bg-gray-900/50 rounded-lg flex items-end justify-center gap-1 p-4">
          {projection.balances.slice(0, 13).map((balance: number, idx: number) => {
            const maxBalance = Math.max(...projection.balances);
            const heightPercent = (balance / maxBalance) * 100;
            return (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-cyan-500/50 to-purple-500/50 rounded-t hover:from-cyan-500/70 hover:to-purple-500/70 transition-colors"
                style={{ height: `${Math.max(heightPercent, 5)}%` }}
                title={`Month ${idx}: $${(balance / 100).toFixed(2)}`}
              />
            );
          })}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Starting</p>
            <p className="text-lg font-bold text-white">${(projection.balances[0] / 100).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-400">12-Month Target</p>
            <p className="text-lg font-bold text-green-400">
              ${(projection.balances[projection.balances.length - 1] / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Signals View Component
 */
function SignalsView({ activeSignals }: { activeSignals: StrategySignal[] }) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-300">📡 Scanning {activeSignals.length} symbols for H1 + M15 setup conditions</p>
      </div>

      {activeSignals.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No active signals at this time
        </div>
      ) : (
        <div className="space-y-3">
          {activeSignals.slice(0, 10).map((signal) => (
            <div
              key={signal.symbol}
              className="bg-gray-800/50 border border-indigo-500/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{signal.symbol}</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    signal.signal === 'ENTRY'
                      ? 'bg-green-500/20 text-green-300'
                      : signal.signal === 'HOLD'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}
                >
                  {signal.signal}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{signal.entryReason}</p>
              <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                <div>Confidence: {(signal.confidence * 100).toFixed(0)}%</div>
                <div>Price: ${signal.price.toFixed(2)}</div>
                <div>BB: ${signal.bbLower.toFixed(2)}-${signal.bbUpper.toFixed(2)}</div>
                <div>EMA50: ${signal.ema50.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Trades View Component
 */
function TradesView({
  activeTrades,
  recentTrades,
}: {
  activeTrades: any[];
  recentTrades: TradeRecord[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-white font-semibold mb-3">Open Positions</h4>
        {activeTrades.length === 0 ? (
          <p className="text-gray-400 text-sm">No active trades</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-indigo-500/30">
                  <th className="text-left px-3 py-2 text-gray-400">Symbol</th>
                  <th className="text-right px-3 py-2 text-gray-400">Entry</th>
                  <th className="text-right px-3 py-2 text-gray-400">Current</th>
                  <th className="text-right px-3 py-2 text-gray-400">PnL</th>
                  <th className="text-right px-3 py-2 text-gray-400">RR</th>
                </tr>
              </thead>
              <tbody>
                {activeTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="px-3 py-2 text-white font-semibold">{trade.symbol}</td>
                    <td className="px-3 py-2 text-right text-gray-300">${trade.entryPrice.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right text-gray-300">$–</td>
                    <td
                      className="px-3 py-2 text-right font-bold"
                      style={{
                        color:
                          trade.unrealizedPnLPercent >= 0
                            ? '#22c55e'
                            : '#ef4444',
                      }}
                    >
                      {trade.unrealizedPnLPercent > 0 ? '+' : ''}{trade.unrealizedPnLPercent.toFixed(2)}%
                    </td>
                    <td className="px-3 py-2 text-right text-gray-300">
                      {trade.riskReward.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3">Closed Trades</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-indigo-500/30">
                <th className="text-left px-3 py-2 text-gray-400">Symbol</th>
                <th className="text-right px-3 py-2 text-gray-400">Entry</th>
                <th className="text-right px-3 py-2 text-gray-400">Exit</th>
                <th className="text-right px-3 py-2 text-gray-400">PnL %</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades
                .filter((t) => t.status === 'CLOSED' || t.status === 'LIQUIDATED')
                .slice(0, 10)
                .map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-700/50">
                    <td className="px-3 py-2 text-white font-semibold">{trade.symbol}</td>
                    <td className="px-3 py-2 text-right text-gray-300">${trade.entryPrice.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right text-gray-300">${trade.exitPrice?.toFixed(2) || '–'}</td>
                    <td
                      className="px-3 py-2 text-right font-bold"
                      style={{
                        color: (trade.pnlPercent || 0) >= 0 ? '#22c55e' : '#ef4444',
                      }}
                    >
                      {(trade.pnlPercent || 0) > 0 ? '+' : ''}{trade.pnlPercent?.toFixed(2) || '0'}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/**
 * Analysis View Component
 */
function AnalysisView({
  performanceChart,
  winLoss,
  botState,
}: {
  performanceChart: any[];
  winLoss: any;
  botState: BotState | null;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <AnalysisMetric label="Total Trades" value={winLoss.totalTrades} />
        <AnalysisMetric label="Wins" value={winLoss.wins} accent="green" />
        <AnalysisMetric label="Losses" value={winLoss.losses} accent="red" />
        <AnalysisMetric label="Win Rate" value={`${winLoss.winRate.toFixed(1)}%`} />
        <AnalysisMetric label="Avg Win" value={`$${winLoss.avgWin.toFixed(2)}`} accent="green" />
        <AnalysisMetric label="Avg Loss" value={`$${winLoss.avgLoss.toFixed(2)}`} accent="red" />
        <AnalysisMetric label="Profit Factor" value={winLoss.profitFactor.toFixed(2)} />
        <AnalysisMetric label="Best Trade" value={`$${winLoss.largestWin.toFixed(2)}`} accent="green" />
        <AnalysisMetric label="Worst Trade" value={`$${winLoss.largestLoss.toFixed(2)}`} accent="red" />
      </div>

      <div className="bg-gray-800/50 border border-indigo-500/30 rounded-lg p-6">
        <h4 className="text-white font-semibold mb-4">Equity Curve</h4>
        <div className="h-64 bg-gray-900/50 rounded flex items-end justify-center gap-1 p-4">
          {performanceChart.slice(-12).map((point, idx) => {
            const minEquity = Math.min(...performanceChart.map((p) => p.equity));
            const maxEquity = Math.max(...performanceChart.map((p) => p.equity));
            const range = maxEquity - minEquity || 1;
            const heightPercent = ((point.equity - minEquity) / range) * 100;
            return (
              <div
                key={idx}
                className={`flex-1 rounded-t transition-colors ${
                  point.equity >= 0
                    ? 'bg-gradient-to-t from-green-500/50 to-green-500/30 hover:from-green-500/70 hover:to-green-500/50'
                    : 'bg-gradient-to-t from-red-500/50 to-red-500/30 hover:from-red-500/70 hover:to-red-500/50'
                }`}
                style={{ height: `${Math.max(heightPercent, 5)}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AnalysisMetric({
  label,
  value,
  accent = 'cyan',
}: {
  label: string;
  value: string | number;
  accent?: 'cyan' | 'green' | 'red';
}) {
  const accentMap = {
    cyan: 'text-cyan-400',
    green: 'text-green-400',
    red: 'text-red-400',
  };

  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-xl font-bold ${accentMap[accent]}`}>{value}</p>
    </div>
  );
}
