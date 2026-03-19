export type VaultAssetType = 'athlete_equity' | 'real_estate' | 'trading_portfolio';

export type CircuitState = 'normal' | 'warning' | 'protected';

export type VaultPolicy = 'growth' | 'balanced' | 'defensive';

export type KingSuggestion = {
  id: string;
  title: string;
  focus: 'training' | 'stats' | 'nil';
  rationale: string;
  expectedImpactBps: number;
  status: 'queued' | 'executed';
};

export type AthleteToken = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  exposure: number;
  valueGrowthPct: number;
  trainingScore: number;
  statsIndex: number;
  nilRewards: number;
  streak: number;
  vaultId: string;
  kingSignal: 'build' | 'accelerate' | 'protect';
  suggestions: KingSuggestion[];
};

export type VaultSummary = {
  id: string;
  name: string;
  assetType: VaultAssetType;
  depositedAmount: number;
  vaultValue: number;
  policy: VaultPolicy;
  circuitState: CircuitState;
  assignedAgent?: string;
  laCasaDeposits: number;
  athleteExposure: number;
  protectiveBuffer: number;
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
  detail?: string;
  tx?: string;
};

export type LaCasaDepositRecord = {
  id: string;
  label: string;
  collection: string;
  stablecoinAmount: number;
  vaultId: string;
  athleteTokenId?: string;
  depositedAt: string;
};

export type FutureAssetClass = {
  id: string;
  title: string;
  description: string;
  status: 'blueprint' | 'coming_soon';
};
