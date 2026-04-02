/**
 * Living Oracle — The Self-Replicating Growth Engine
 * 
 * The Oracle runs silently in the background, auto-deploying trading bot profits
 * back into $ABRA to raise the floor. At preset MCAP thresholds, it triggers
 * automatic duplication/launch of the next part of the Abraxas species.
 */

export type OracleThreshold = {
  mcapTarget: number;
  description: string;
  speciesName: string;
};

export type OracleState = {
  abraFloor: number;
  abra24hProfit: number;
  abraMcap: number;
  totalDeployed: number;
  nextThreshold: OracleThreshold;
  birthProgress: number; // 0-100
  isThresholdReached: boolean;
  lastUpdateTime: string;
};

/**
 * Pre-set MCAP thresholds for species duplication/birth
 */
const SPECIES_THRESHOLDS: OracleThreshold[] = [
  {
    mcapTarget: 100_000,
    description: '$ABRA MCAP: 100K',
    speciesName: 'Cadabra Birth',
  },
  {
    mcapTarget: 500_000,
    description: '$ABRA MCAP: 500K or Cadabra 100K',
    speciesName: 'Echo / Pulse / Legacy Birth',
  },
  {
    mcapTarget: 2_500_000,
    description: '$ABRA MCAP: 2.5M or Daughters Hit 500K',
    speciesName: 'Aurelia / Vein / Verdant Birth',
  },
  {
    mcapTarget: 10_000_000,
    description: '$ABRA MCAP: 10M',
    speciesName: 'Genesis Evolution',
  },
];

/**
 * Initialize the Oracle with starting values
 */
export function initializeOracle(): OracleState {
  return {
    abraFloor: 0.000042, // Starting floor price
    abra24hProfit: 0,
    abraMcap: 0,
    totalDeployed: 0,
    nextThreshold: SPECIES_THRESHOLDS[0],
    birthProgress: 0,
    isThresholdReached: false,
    lastUpdateTime: new Date().toISOString(),
  };
}

/**
 * Simulate trading bot generating profits and deploying into $ABRA
 */
export function simulateOracleProfit(currentState: OracleState): OracleState {
  // Simulate varying daily profit generation (0.5% - 3% of floor value)
  const profitMultiplier = 0.005 + Math.random() * 0.025;
  const newProfit = currentState.abraFloor * currentState.abraMcap * profitMultiplier * 0.001;
  
  // Auto-deploy 80% of profits back into raising the floor
  const deploymentAmount = newProfit * 0.8;
  const newFloor = currentState.abraFloor + (deploymentAmount / (currentState.abraMcap || 1));
  
  // Update MCAP with new deployments
  const newMcap = currentState.abraMcap + (deploymentAmount * 2.5); // Multiplier effect
  
  // Calculate birth progress
  const birthProgress = Math.min(
    100,
    (newMcap / currentState.nextThreshold.mcapTarget) * 100
  );
  
  const isThresholdReached = newMcap >= currentState.nextThreshold.mcapTarget;
  
  return {
    abraFloor: Math.max(currentState.abraFloor, newFloor),
    abra24hProfit: newProfit,
    abraMcap: newMcap,
    totalDeployed: currentState.totalDeployed + deploymentAmount,
    nextThreshold: currentState.nextThreshold,
    birthProgress,
    isThresholdReached,
    lastUpdateTime: new Date().toISOString(),
  };
}

/**
 * Trigger species duplication when threshold is reached
 */
export function triggerSpeciesDuplication(
  currentState: OracleState
): OracleState {
  if (!currentState.isThresholdReached) {
    return currentState;
  }
  
  // Find next threshold
  const currentThresholdIndex = SPECIES_THRESHOLDS.findIndex(
    (t) => t.mcapTarget === currentState.nextThreshold.mcapTarget
  );
  
  const nextThreshold =
    currentThresholdIndex < SPECIES_THRESHOLDS.length - 1
      ? SPECIES_THRESHOLDS[currentThresholdIndex + 1]
      : SPECIES_THRESHOLDS[SPECIES_THRESHOLDS.length - 1];
  
  return {
    ...currentState,
    nextThreshold,
    birthProgress: 0,
    isThresholdReached: false,
  };
}

/**
 * Get human-readable metrics
 */
export function getOracleMetrics(state: OracleState) {
  return {
    floorPrice: `$${state.abraFloor.toFixed(8)}`,
    floor24hProfit: `$${state.abra24hProfit.toFixed(2)}`,
    mcap: `$${(state.abraMcap / 1000000).toFixed(2)}M`,
    nextThresholdMcap: `$${(state.nextThreshold.mcapTarget / 1000000).toFixed(2)}M`,
    totalDeployed: `$${state.totalDeployed.toFixed(2)}`,
    birthProgress: `${Math.round(state.birthProgress)}%`,
  };
}

/**
 * Get all available thresholds for visualization
 */
export function getAllThresholds(): OracleThreshold[] {
  return SPECIES_THRESHOLDS;
}
