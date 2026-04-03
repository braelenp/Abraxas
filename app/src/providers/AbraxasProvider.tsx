import { createContext, type FC, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  starterAthleteTokens,
  starterFutureAssetClasses,
  starterLaCasaDeposits,
  starterLogs,
  starterSophiaAgents,
  starterVaults,
} from '../lib/mockData';
import { applyOymSnapshotToTokens, estimateLaCasaRecordsFromSnapshot, fetchOymSnapshot } from '../lib/oymAdapter';
import type {
  AgentActionLog,
  AthleteToken,
  CircuitSignal,
  FutureAssetClass,
  LaCasaDepositRecord,
  SophiaAgent,
  SophiaTradeRecord,
  VaultAssetType,
  VaultSummary,
} from '../lib/types';

type AbraxasContextValue = {
  vaults: VaultSummary[];
  athleteTokens: AthleteToken[];
  futureAssetClasses: FutureAssetClass[];
  laCasaDeposits: LaCasaDepositRecord[];
  logs: AgentActionLog[];
  sophiaAgents: SophiaAgent[];
  sophiaTradeRecords: SophiaTradeRecord[];
  createVault: (name: string, assetType: VaultAssetType) => void;
  assignAgent: (vaultId: string, agentLabel: string) => void;
  depositLaCasa: (input: {
    vaultId: string;
    label: string;
    collection: string;
    stablecoinAmount: number;
    athleteTokenId?: string;
  }) => void;
  executeKingPlan: (tokenId: string) => void;
  runCircuitCheck: (vaultId: string, signal: CircuitSignal) => 'none' | 'stabilize' | 'pause';
  addLog: (entry: Omit<AgentActionLog, 'id' | 'timestamp'>) => void;
  recordSophiaTrade: (input: Omit<SophiaTradeRecord, 'id'>) => void;
  recordSophiaTradeSuccess: (tradeId: string, exitPrice: number, pnl: number) => void;
  calculateSophiaScore: (agent: SophiaAgent) => number;
  recordSpendAbra: (input: {
    abraAmount: number;
    usdcAmount: number;
    fiatAmount: number;
    destination: string;
    provider: 'ramp' | 'transak';
    walletAddress: string;
  }) => void;
  oymSyncStatus: 'idle' | 'loading' | 'ready' | 'error';
  oymSource?: string;
  lastOymSyncAt?: string;
  refreshOymData: () => Promise<void>;
};

const AbraxasContext = createContext<AbraxasContextValue | null>(null);

function nowIso(): string {
  return new Date().toISOString();
}

function roundToTwo(value: number) {
  return Math.round(value * 100) / 100;
}

export const AbraxasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [vaults, setVaults] = useState<VaultSummary[]>(starterVaults);
  const [athleteTokens, setAthleteTokens] = useState<AthleteToken[]>(starterAthleteTokens);
  const [futureAssetClasses] = useState<FutureAssetClass[]>(starterFutureAssetClasses);
  const [laCasaDeposits, setLaCasaDeposits] = useState<LaCasaDepositRecord[]>(starterLaCasaDeposits);
  const [logs, setLogs] = useState<AgentActionLog[]>(starterLogs);
  const [sophiaAgents, setSophiaAgents] = useState<SophiaAgent[]>(starterSophiaAgents);
  const [sophiaTradeRecords, setSophiaTradeRecords] = useState<SophiaTradeRecord[]>([]);
  const [oymSyncStatus, setOymSyncStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [oymSource, setOymSource] = useState<string | undefined>(undefined);
  const [lastOymSyncAt, setLastOymSyncAt] = useState<string | undefined>(undefined);

  const addLog = useCallback((entry: Omit<AgentActionLog, 'id' | 'timestamp'>) => {
    setLogs((current) => [
      {
        id: crypto.randomUUID(),
        timestamp: nowIso(),
        ...entry,
      },
      ...current,
    ]);
  }, []);

  const createVault = useCallback(
    (name: string, assetType: VaultAssetType) => {
      const newVault: VaultSummary = {
        id: `vault-${assetType}-${Date.now()}`,
        name,
        assetType,
        depositedAmount: 0,
        vaultValue: 0,
        policy: assetType === 'dapp_equity' ? 'growth' : 'balanced',
        circuitState: 'normal',
        laCasaDeposits: 0,
        athleteExposure: 0,
        protectiveBuffer: 10,
      };
      setVaults((current) => [newVault, ...current]);
      addLog({
        vaultId: newVault.id,
        action: `Vault created (${assetType})`,
        detail: assetType === 'dapp_equity'
          ? 'Configured for dapp equity positions and Sophia yield protocols.'
          : 'Blueprint vault created for the next RWA asset class.',
      });
    },
    [addLog],
  );

  const assignAgent = useCallback(
    (vaultId: string, agentLabel: string) => {
      setVaults((current) =>
        current.map((vault) =>
          vault.id === vaultId
            ? {
                ...vault,
                assignedAgent: agentLabel,
              }
            : vault,
        ),
      );
      addLog({ vaultId, action: `Sophia assigned: ${agentLabel}` });
    },
    [addLog],
  );

  const depositLaCasa = useCallback(
    ({ vaultId, label, collection, stablecoinAmount, athleteTokenId }: {
      vaultId: string;
      label: string;
      collection: string;
      stablecoinAmount: number;
      athleteTokenId?: string;
    }) => {
      if (stablecoinAmount <= 0) {
        return;
      }

      const amount = roundToTwo(stablecoinAmount);

      setLaCasaDeposits((current) => [
        {
          id: crypto.randomUUID(),
          label,
          collection,
          stablecoinAmount: amount,
          vaultId,
          athleteTokenId,
          depositedAt: nowIso(),
        },
        ...current,
      ]);

      setVaults((current) =>
        current.map((vault) =>
          vault.id === vaultId
            ? {
                ...vault,
                depositedAmount: roundToTwo(vault.depositedAmount + amount),
                vaultValue: roundToTwo(vault.vaultValue + amount),
                laCasaDeposits: vault.laCasaDeposits + 1,
                athleteExposure: athleteTokenId ? roundToTwo(vault.athleteExposure + amount) : vault.athleteExposure,
              }
            : vault,
        ),
      );

      if (athleteTokenId) {
        setAthleteTokens((current) =>
          current.map((token) =>
            token.id === athleteTokenId
              ? {
                  ...token,
                  exposure: roundToTwo(token.exposure + amount),
                  price: roundToTwo(token.price * 1.012),
                  changePct: roundToTwo(token.changePct + 0.6),
                  kingSignal: 'build',
                }
              : token,
          ),
        );
      }

      addLog({
        vaultId,
        action: `La Casa NFT auto-deposited to vault`,
        detail: `${label} routed ${amount.toLocaleString()} USDC of exposure${athleteTokenId ? ' into athlete equity' : ''}.`,
      });
    },
    [addLog],
  );

  const executeKingPlan = useCallback(
    (tokenId: string) => {
      let updatedSymbol = '';
      let vaultId = '';
      let valueDelta = 0;

      setAthleteTokens((current) =>
        current.map((token) => {
          if (token.id !== tokenId) {
            return token;
          }

          updatedSymbol = token.symbol;
          vaultId = token.vaultId;
          valueDelta = roundToTwo(Math.max(token.exposure * 0.032, 650));

          return {
            ...token,
            price: roundToTwo(token.price * 1.028),
            changePct: roundToTwo(token.changePct + 1.4),
            valueGrowthPct: roundToTwo(token.valueGrowthPct + 2.1),
            trainingScore: Math.min(token.trainingScore + 4, 99),
            statsIndex: Math.min(token.statsIndex + 3, 99),
            nilRewards: roundToTwo(token.nilRewards + valueDelta * 0.12),
            streak: token.streak + 1,
            kingSignal: token.kingSignal === 'protect' ? 'accelerate' : 'build',
            suggestions: token.suggestions.map((suggestion, index) =>
              index === 0
                ? {
                    ...suggestion,
                    status: 'executed',
                  }
                : suggestion,
            ),
          };
        }),
      );

      if (!vaultId) {
        return;
      }

      setVaults((current) =>
        current.map((vault) =>
          vault.id === vaultId
            ? {
                ...vault,
                vaultValue: roundToTwo(vault.vaultValue + valueDelta),
                protectiveBuffer: roundToTwo(Math.max(vault.protectiveBuffer - 0.3, 8)),
              }
            : vault,
        ),
      );

      addLog({
        vaultId,
        action: `King AI executed development plan for ${updatedSymbol}`,
        detail: `Projected value impact ${valueDelta.toLocaleString()} USDC equivalent across training, stats, and NIL flows.`,
      });
    },
    [addLog],
  );

  const runCircuitCheck = useCallback(
    (vaultId: string, signal: CircuitSignal) => {
      const warning = signal.priceSpeedBps > 500 || signal.liquidityDrainBps > 600;
      const critical = signal.priceSpeedBps > 1000 || signal.liquidityDrainBps > 900 || signal.activitySpikeBps > 1200;

      if (critical) {
        setVaults((current) =>
          current.map((vault) =>
            vault.id === vaultId
              ? {
                  ...vault,
                  circuitState: 'protected',
                  protectiveBuffer: roundToTwo(vault.protectiveBuffer + 3.6),
                }
              : vault,
          ),
        );
        addLog({
          vaultId,
          action: 'Circuit protective action: move collateral to stables + pause risk',
          detail: 'Protective payout staging widened the buffer while athlete equity volatility cooled.',
        });
        return 'pause';
      }

      if (warning) {
        setVaults((current) =>
          current.map((vault) =>
            vault.id === vaultId
              ? {
                  ...vault,
                  circuitState: 'warning',
                  protectiveBuffer: roundToTwo(vault.protectiveBuffer + 1.2),
                }
              : vault,
          ),
        );
        addLog({
          vaultId,
          action: 'Circuit warning: release protective liquidity',
          detail: 'Buffer capital was staged before a full pause condition.',
        });
        return 'stabilize';
      }

      setVaults((current) =>
        current.map((vault) =>
          vault.id === vaultId
            ? {
                ...vault,
                circuitState: 'normal',
                protectiveBuffer: roundToTwo(Math.max(vault.protectiveBuffer - 0.8, 8)),
              }
            : vault,
        ),
      );
      addLog({ vaultId, action: 'Circuit check: normal conditions' });
      return 'none';
    },
    [addLog],
  );

  const calculateSophiaScore = useCallback((agent: SophiaAgent): number => {
    // Score calculation based on multiple factors
    const winRateComponent = Math.min(agent.winRate / 100, 1) * 25; // 0-25 points
    const volumeComponent = Math.min(agent.totalVolumeTraded / 5000000, 1) * 20; // 0-20 points
    const pnlComponent = Math.min(Math.max(agent.totalPnL / 500000, -10), 20) / 2; // 0-10 points
    const sharpeComponent = agent.sharpeRatio ? Math.min(agent.sharpeRatio / 3, 1) * 20 : 0; // 0-20 points
    const drawdownComponent = agent.maxDrawdown ? Math.max(0, 15 - Math.abs(agent.maxDrawdown) * 2) : 15; // 0-15 points
    const tradeCountComponent = Math.min(agent.totalTradesExecuted / 200, 1) * 10; // 0-10 points

    return Math.max(0, Math.min(100, roundToTwo(
      winRateComponent + volumeComponent + pnlComponent + sharpeComponent + drawdownComponent + tradeCountComponent,
    )));
  }, []);

  const recordSophiaTrade = useCallback((input: Omit<SophiaTradeRecord, 'id'>) => {
    const tradeId = crypto.randomUUID();
    const trade: SophiaTradeRecord = {
      id: tradeId,
      ...input,
    };

    setSophiaTradeRecords((current) => [trade, ...current]);

    // Update the Sophia agent's trade count
    setSophiaAgents((current) =>
      current.map((agent) =>
        agent.id === input.sophiaAgentId
          ? {
              ...agent,
              totalTradesExecuted: agent.totalTradesExecuted + 1,
              totalVolumeTraded: roundToTwo(agent.totalVolumeTraded + input.inputAmount),
              lastTradeAt: input.timestamp,
            }
          : agent,
      ),
    );

    addLog({
      vaultId: 'global',
      action: `Sophia trade executed: ${input.fromSymbol} → ${input.toSymbol}`,
      detail: `${input.inputAmount} ${input.fromSymbol} swapped at ${input.executedPrice} for ${input.outputAmount} ${input.toSymbol}. Reason: ${input.entryReason}`,
    });
  }, [addLog]);

  const recordSophiaTradeSuccess = useCallback((tradeId: string, exitPrice: number, pnl: number) => {
    setSophiaTradeRecords((current) =>
      current.map((trade) =>
        trade.id === tradeId
          ? {
              ...trade,
              status: 'executed',
              priceAtExit: exitPrice,
              pnl: pnl,
            }
          : trade,
      ),
    );

    const updatedTrade = sophiaTradeRecords.find((t) => t.id === tradeId);
    if (updatedTrade) {
      setSophiaAgents((current) =>
        current.map((agent) =>
          agent.id === updatedTrade.sophiaAgentId
            ? {
                ...agent,
                totalPnL: roundToTwo(agent.totalPnL + pnl),
                performanceScore: calculateSophiaScore({
                  ...agent,
                  totalPnL: agent.totalPnL + pnl,
                }),
              }
            : agent,
        ),
      );
    }
  }, [sophiaTradeRecords, calculateSophiaScore]);

  const recordSpendAbra = useCallback(
    ({
      abraAmount,
      usdcAmount,
      fiatAmount,
      destination,
      provider,
      walletAddress,
    }: {
      abraAmount: number;
      usdcAmount: number;
      fiatAmount: number;
      destination: string;
      provider: 'ramp' | 'transak';
      walletAddress: string;
    }) => {
      const destinationLabel = destination === 'apple_pay' ? 'Apple Pay'
        : destination === 'cash_app' ? 'Cash App'
        : destination === 'bank_transfer' ? 'Bank Transfer'
        : destination === 'paypal' ? 'PayPal'
        : destination;

      addLog({
        vaultId: 'spend-abra-flow',
        action: `ABRA spent via ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
        detail: `User spent ${roundToTwo(abraAmount)} ABRA (${roundToTwo(usdcAmount)} USDC equivalent) → ${roundToTwo(fiatAmount)} USD to ${destinationLabel}. Wallet: ${walletAddress.slice(0, 8)}...`,
      });
    },
    [addLog],
  );

  const refreshOymData = useCallback(async () => {
    setOymSyncStatus('loading');

    try {
      const snapshot = await fetchOymSnapshot();
      if (!snapshot) {
        setOymSyncStatus('idle');
        return;
      }

      setAthleteTokens((current) => applyOymSnapshotToTokens({ snapshot, currentTokens: current, currentVaults: vaults }));

      const importedRecords = estimateLaCasaRecordsFromSnapshot(snapshot);
      if (importedRecords.length) {
        setLaCasaDeposits((current) => {
          const withoutPreviousImports = current.filter((record) => record.collection !== 'OYM Signal Sync');
          return [...importedRecords, ...withoutPreviousImports];
        });
      }

      setOymSource(snapshot.source);
      setLastOymSyncAt(snapshot.syncedAt);
      setOymSyncStatus('ready');
      addLog({
        vaultId: 'vault-echo-foundation',
        action: 'OYM data sync complete',
        detail: `Imported ${snapshot.athletes.length} athlete snapshots from ${snapshot.source}.`,
      });
    } catch (error) {
      setOymSyncStatus('error');
      addLog({
        vaultId: 'vault-echo-foundation',
        action: 'OYM data sync failed',
        detail: error instanceof Error ? error.message : 'Unknown OYM sync error',
      });
    }
  }, [addLog, vaults]);

  useEffect(() => {
    if (import.meta.env.VITE_OYM_DATA_URL) {
      void refreshOymData();
    }
  }, [refreshOymData]);

  const value = useMemo(
    () => ({
      vaults,
      athleteTokens,
      futureAssetClasses,
      laCasaDeposits,
      logs,
      sophiaAgents,
      sophiaTradeRecords,
      createVault,
      assignAgent,
      depositLaCasa,
      executeKingPlan,
      runCircuitCheck,
      recordSophiaTrade,
      recordSophiaTradeSuccess,
      calculateSophiaScore,
      recordSpendAbra,
      addLog,
      oymSyncStatus,
      oymSource,
      lastOymSyncAt,
      refreshOymData,
    }),
    [
      vaults,
      athleteTokens,
      futureAssetClasses,
      laCasaDeposits,
      logs,
      sophiaAgents,
      sophiaTradeRecords,
      createVault,
      assignAgent,
      depositLaCasa,
      executeKingPlan,
      runCircuitCheck,
      recordSophiaTrade,
      recordSophiaTradeSuccess,
      calculateSophiaScore,
      recordSpendAbra,
      addLog,
      oymSyncStatus,
      oymSource,
      lastOymSyncAt,
      refreshOymData,
    ],
  );

  return <AbraxasContext.Provider value={value}>{children}</AbraxasContext.Provider>;
};

export function useAbraxas(): AbraxasContextValue {
  const ctx = useContext(AbraxasContext);
  if (!ctx) {
    throw new Error('useAbraxas must be used within AbraxasProvider');
  }
  return ctx;
}
