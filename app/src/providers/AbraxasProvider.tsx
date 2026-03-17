import { createContext, type FC, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { starterVaults } from '../lib/mockData';
import type { AgentActionLog, CircuitSignal, VaultAssetType, VaultSummary } from '../lib/types';

type AbraxasContextValue = {
  vaults: VaultSummary[];
  logs: AgentActionLog[];
  createVault: (name: string, assetType: VaultAssetType) => void;
  assignAgent: (vaultId: string, agentLabel: string) => void;
  runCircuitCheck: (vaultId: string, signal: CircuitSignal) => 'none' | 'stabilize' | 'pause';
  addLog: (entry: Omit<AgentActionLog, 'id' | 'timestamp'>) => void;
};

const AbraxasContext = createContext<AbraxasContextValue | null>(null);

function nowIso(): string {
  return new Date().toISOString();
}

export const AbraxasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [vaults, setVaults] = useState<VaultSummary[]>(starterVaults);
  const [logs, setLogs] = useState<AgentActionLog[]>([]);

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
        policy: 'balanced',
        circuitState: 'normal',
      };
      setVaults((current) => [newVault, ...current]);
      addLog({ vaultId: newVault.id, action: `Vault created (${assetType})` });
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

  const runCircuitCheck = useCallback(
    (vaultId: string, signal: CircuitSignal) => {
      const warning = signal.priceSpeedBps > 500 || signal.liquidityDrainBps > 600;
      const critical = signal.priceSpeedBps > 1000 || signal.liquidityDrainBps > 900 || signal.activitySpikeBps > 1200;

      if (critical) {
        setVaults((current) =>
          current.map((vault) => (vault.id === vaultId ? { ...vault, circuitState: 'protected' } : vault)),
        );
        addLog({ vaultId, action: 'Circuit protective action: move collateral to stables + pause risk' });
        return 'pause';
      }

      if (warning) {
        setVaults((current) =>
          current.map((vault) => (vault.id === vaultId ? { ...vault, circuitState: 'warning' } : vault)),
        );
        addLog({ vaultId, action: 'Circuit warning: release protective liquidity' });
        return 'stabilize';
      }

      setVaults((current) => current.map((vault) => (vault.id === vaultId ? { ...vault, circuitState: 'normal' } : vault)));
      addLog({ vaultId, action: 'Circuit check: normal conditions' });
      return 'none';
    },
    [addLog],
  );

  const value = useMemo(
    () => ({ vaults, logs, createVault, assignAgent, runCircuitCheck, addLog }),
    [vaults, logs, createVault, assignAgent, runCircuitCheck, addLog],
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
