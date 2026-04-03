import type { AthleteToken, LaCasaDepositRecord, VaultSummary } from './types';

type OymAthlete = {
  id: string;
  name: string;
  verifiedWorkouts?: number;
  finishingSessions?: number;
  streak?: number;
  pendingSkr?: number;
};

type OymGameStat = {
  athleteId: string;
  points?: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  fgPct?: number;
  threePct?: number;
};

type NormalizedAthlete = {
  id: string;
  symbol: string;
  name: string;
  trainingScore: number;
  statsIndex: number;
  nilRewards: number;
  streak: number;
  changePct: number;
  valueGrowthPct: number;
};

type OymSourcePayload = {
  athletes?: OymAthlete[];
  exampleAthletes?: OymAthlete[];
  schoolGameStats?: OymGameStat[];
  aauGameStats?: OymGameStat[];
  timestamp?: string;
};

export type OymSnapshot = {
  source: string;
  athletes: NormalizedAthlete[];
  syncedAt: string;
};

const athleteIdToTokenId: Record<string, string> = {
  'aj-williams': 'token-ajwill',
  'caleb-wilson': 'token-cdubb',
  'hailee-swain': 'token-hailee',
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

function scoreAthleteTraining(athlete: OymAthlete): number {
  const workouts = athlete.verifiedWorkouts ?? 0;
  const finishing = athlete.finishingSessions ?? 0;
  const streak = athlete.streak ?? 0;
  const score = 60 + workouts * 1.4 + finishing * 1.1 + streak * 1.8;
  return clamp(Math.round(score), 35, 99);
}

function scoreAthleteStats(games: OymGameStat[]): number {
  if (!games.length) {
    return 62;
  }

  const totals = games.reduce(
    (acc, game) => {
      acc.points += game.points ?? 0;
      acc.rebounds += game.rebounds ?? 0;
      acc.assists += game.assists ?? 0;
      acc.steals += game.steals ?? 0;
      acc.blocks += game.blocks ?? 0;
      acc.fgPct += game.fgPct ?? 0;
      acc.threePct += game.threePct ?? 0;
      return acc;
    },
    { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fgPct: 0, threePct: 0 },
  );

  const gameCount = games.length;
  const points = totals.points / gameCount;
  const rebounds = totals.rebounds / gameCount;
  const assists = totals.assists / gameCount;
  const defense = (totals.steals + totals.blocks) / gameCount;
  const shooting = (totals.fgPct + totals.threePct) / (2 * gameCount);
  const score = 42 + points * 1.3 + rebounds * 0.7 + assists * 0.9 + defense * 3.6 + shooting * 0.24;
  return clamp(Math.round(score), 30, 99);
}

function toSymbol(name: string): string {
  return `$${name
    .split(/\s+/)
    .filter(Boolean)
    .map((segment) => segment[0])
    .join('')
    .toUpperCase()}`;
}

function normalizeAthletes(payload: OymSourcePayload): NormalizedAthlete[] {
  const athletes = payload.athletes ?? payload.exampleAthletes ?? [];
  const games = [...(payload.schoolGameStats ?? []), ...(payload.aauGameStats ?? [])];

  return athletes.map((athlete) => {
    const athleteGames = games.filter((game) => game.athleteId === athlete.id);
    const trainingScore = scoreAthleteTraining(athlete);
    const statsIndex = scoreAthleteStats(athleteGames);
    const streak = athlete.streak ?? 0;
    const pendingSkr = athlete.pendingSkr ?? 0;
    const valueGrowthPct = roundToTwo(clamp((trainingScore - 68) * 0.55 + (statsIndex - 64) * 0.42, -12, 40));
    const changePct = roundToTwo(clamp(valueGrowthPct * 0.34 + streak * 0.18, -8, 16));

    return {
      id: athlete.id,
      symbol: toSymbol(athlete.name),
      name: athlete.name,
      trainingScore,
      statsIndex,
      nilRewards: Math.round(pendingSkr * 36),
      streak,
      changePct,
      valueGrowthPct,
    };
  });
}

export function getMappedTokenId(oymAthleteId: string): string | undefined {
  return athleteIdToTokenId[oymAthleteId];
}

export async function fetchOymSnapshot(): Promise<OymSnapshot | null> {
  const url = import.meta.env.VITE_OYM_DATA_URL;
  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`OYM sync failed (${response.status})`);
  }

  const payload = (await response.json()) as OymSourcePayload;
  return {
    source: url,
    athletes: normalizeAthletes(payload),
    syncedAt: payload.timestamp ?? new Date().toISOString(),
  };
}

export function applyOymSnapshotToTokens(input: {
  snapshot: OymSnapshot;
  currentTokens: AthleteToken[];
  currentVaults: VaultSummary[];
}): AthleteToken[] {
  const athleteByTokenId = new Map<string, NormalizedAthlete>();
  for (const athlete of input.snapshot.athletes) {
    const tokenId = getMappedTokenId(athlete.id);
    if (tokenId) {
      athleteByTokenId.set(tokenId, athlete);
    }
  }

  return input.currentTokens.map((token) => {
    const nextAthlete = athleteByTokenId.get(token.id);
    if (!nextAthlete) {
      return token;
    }

    const carryingVault = input.currentVaults.find((vault) => vault.id === token.vaultId);
    const baseExposure = token.exposure > 0 ? token.exposure : Math.max((carryingVault?.athleteExposure ?? 0) / 3, 1);
    const nextPrice = roundToTwo(Math.max(token.price * (1 + nextAthlete.changePct / 100), 0.5));

    return {
      ...token,
      symbol: nextAthlete.symbol,
      name: nextAthlete.name,
      price: nextPrice,
      changePct: nextAthlete.changePct,
      valueGrowthPct: nextAthlete.valueGrowthPct,
      trainingScore: nextAthlete.trainingScore,
      statsIndex: nextAthlete.statsIndex,
      nilRewards: nextAthlete.nilRewards,
      streak: nextAthlete.streak,
      exposure: roundToTwo(baseExposure),
      kingSignal: nextAthlete.trainingScore >= 90 ? 'accelerate' : nextAthlete.trainingScore >= 80 ? 'build' : 'protect',
    };
  });
}

export function estimateLaCasaRecordsFromSnapshot(snapshot: OymSnapshot): LaCasaDepositRecord[] {
  const records: LaCasaDepositRecord[] = [];

  snapshot.athletes.forEach((athlete, index) => {
    const tokenId = getMappedTokenId(athlete.id);
    if (!tokenId) {
      return;
    }

    records.push({
      id: `oym-${athlete.id}-${index}`,
      label: `OYM Import ${athlete.name}`,
      collection: 'OYM Signal Sync',
      stablecoinAmount: roundToTwo(Math.max(athlete.nilRewards / 18, 600)),
      vaultId: 'vault-echo-foundation',
      athleteTokenId: tokenId,
      depositedAt: snapshot.syncedAt,
    });
  });

  return records;
}