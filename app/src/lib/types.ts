export type VaultAssetType = 'invoice' | 'art' | 'carbon';

export type VaultSummary = {
  id: string;
  name: string;
  assetType: VaultAssetType;
  depositedAmount: number;
  policy: 'balanced' | 'defensive' | 'yield';
  circuitState: 'normal' | 'warning' | 'protected';
  assignedAgent?: string;
};

export type CircuitSignal = {
  priceSpeedBps: number;
  liquidityDrainBps: number;
  activitySpikeBps: number;
};

export type AgentActionLog = {
  id: string;
  timestamp: string;
  vaultId: string;
  action: string;
  tx?: string;
};
