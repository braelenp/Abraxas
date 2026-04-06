export type VaultAssetType = 'dapp_equity' | 'real_estate' | 'trading_portfolio' | 'music_rights' | 'ip_licensing';

export type CircuitState = 'normal' | 'warning' | 'protected';

export type VaultPolicy = 'growth' | 'balanced' | 'defensive';

export type StakeDuration = 30 | 90 | 180;

export type StakeRecord = {
  address: string;
  staker: string;
  abraAmount: number;
  lockDurationDays: number;
  stakedAt: number;
  unlockedAt: number;
  multiplierBps: number;
  isActive: boolean;
  claimedRewards: number;
};

export type StakeConfig = {
  duration: StakeDuration;
  multiplier: number;
  displayMultiplier: string;
  label: string;
  description: string;
};

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

export type SophiaAgent = {
  id: string;
  name: string;
  description: string;
  personality: 'aggressive' | 'balanced' | 'conservative' | 'momentum' | 'mean_reversion';
  specialty: string; // e.g., "Athlete Equity Specialist", "RWA Swing Trader"
  status: 'active' | 'training' | 'retired';
  tradingStyle: string;
  riskTolerance: 'low' | 'medium' | 'high';
  // Performance metrics
  totalTradesExecuted: number;
  totalVolumeTraded: number; // in USDC equivalent
  totalPnL: number; // total profit/loss
  winRate: number; // 0-100, percentage of profitable trades
  averageReturnBps: number; // basis points per trade
  performanceScore: number; // 0-100, derived from metrics
  // Tracking
  createdAt: string;
  lastTradeAt?: string;
  monthlyWinRate?: number;
  sharpeRatio?: number; // risk-adjusted return
  maxDrawdown?: number; // worst peak-to-trough decline
  // Value tracking
  assignedToVaults: string[]; // vault IDs
  mintedTokenAmount?: number; // if minted as token
};

export type SophiaTradeRecord = {
  id: string;
  sophiaAgentId: string;
  timestamp: string;
  fromMint: string;
  toMint: string;
  fromSymbol: string;
  toSymbol: string;
  inputAmount: number;
  outputAmount: number;
  executedPrice: number;
  entryReason: string; // brief description of why this trade was executed
  priceAtEntry: number;
  priceAtExit?: number;
  pnl?: number;
  status: 'executed' | 'pending' | 'cancelled';
};

// ── Airdrop & Profile System ─────────────────────────────────────────────
export type AirdropPointsBreakdown = {
  profileCreation: number;
  cardShares: number;
  referralSuccess: number;
  communityEngagement: number;
  total: number;
};

export type ReferralRecord = {
  id: string;
  referrerId: string;
  referreeId?: string;
  timestamp: string;
  type: 'share' | 'signup' | 'staking';
  pointsAwarded: number;
  status: 'pending' | 'claimed' | 'failed';
  referralLink?: string;
};

export type UserProfile = {
  id: string;
  walletAddress: string;
  abraxasId: string; // Sequential ID (e.g., "ABRAXAS-001234")
  rune: string; // Elder Futhark rune character
  blessing: string; // Personalized blessing message
  createdAt: string;
  username?: string;
  profileImageUrl?: string;
  // Airdrop tracking
  airdropPoints: AirdropPointsBreakdown;
  referralCode: string; // Unique referral code for sharing
  referralsSent: number;
  successfulReferrals: number;
  totalAirdropClaimed: number;
  claimedAirdropAt?: string;
  // Tracking
  lastUpdatedAt: string;
};

export type AirdropLeaderboardEntry = {
  rank: number;
  walletAddress: string;
  abraxasId: string;
  rune: string;
  username?: string;
  totalPoints: number;
  successfulReferrals: number;
};

export type ProfileCreationPayload = {
  walletAddress: string;
  username?: string;
};
