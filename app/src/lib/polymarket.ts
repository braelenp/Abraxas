import { ClobClient } from '@polymarket/clob-client';

export interface PolymarketBet {
  id: string;
  question: string;
  yes: number;
  no: number;
  yesPrice: number;
  noPrice: number;
  volume24h: number;
  kingAI?: number;
  status?: 'open' | 'closed';
  category?: 'crypto' | 'macro' | 'sports' | 'finance' | 'tech' | 'golf' | 'horses' | 'other';
}

export const POLYMARKET_CATEGORIES = [
  { id: 'crypto', label: 'Crypto', icon: '₿' },
  { id: 'macro', label: 'Macro', icon: '📊' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'tech', label: 'Tech', icon: '🚀' },
  { id: 'golf', label: 'Golf', icon: '⛳' },
  { id: 'horses', label: 'Horses', icon: '🐴' },
  { id: 'other', label: 'Other', icon: '🎯' },
] as const;

/**
 * Fetch top markets from Polymarket CLOB
 * Falls back to default markets on error
 */
export async function fetchPolymarketBets(limit: number = 5): Promise<PolymarketBet[]> {
  try {
    // For now, return default bets with categories
    // TODO: Integrate with actual Polymarket CLOB API when client params are clarified
    const bets = getDefaultBets();
    return bets.slice(0, limit);
  } catch (error) {
    console.error('Failed to fetch Polymarket bets:', error);
    return getDefaultBets().slice(0, limit);
  }
}

/**
 * Fallback default bets if API fails
 */
export function getDefaultBets(): PolymarketBet[] {
  return [
    {
      id: 'poly-1',
      question: 'Will BTC reach $100k by end of Q1 2026?',
      yes: 6800000,
      no: 3200000,
      yesPrice: 68,
      noPrice: 32,
      volume24h: 10000000,
      kingAI: 65,
      status: 'open',
      category: 'crypto',
    },
    {
      id: 'poly-2',
      question: 'Will the Fed cut rates in March 2026?',
      yes: 5200000,
      no: 4800000,
      yesPrice: 52,
      noPrice: 48,
      volume24h: 10000000,
      kingAI: 49,
      status: 'open',
      category: 'macro',
    },
    {
      id: 'poly-3',
      question: 'Will Solana SOL reach $300 by Q2 2026?',
      yes: 4100000,
      no: 5900000,
      yesPrice: 41,
      noPrice: 59,
      volume24h: 10000000,
      kingAI: 39,
      status: 'open',
      category: 'crypto',
    },
    {
      id: 'poly-4',
      question: 'Will Ethereum merge complete by Q2 2026?',
      yes: 7200000,
      no: 2800000,
      yesPrice: 72,
      noPrice: 28,
      volume24h: 10000000,
      kingAI: 68,
      status: 'open',
      category: 'crypto',
    },
    {
      id: 'poly-5',
      question: 'Will crypto market cap exceed $3T by year-end 2026?',
      yes: 5500000,
      no: 4500000,
      yesPrice: 55,
      noPrice: 45,
      volume24h: 10000000,
      kingAI: 52,
      status: 'open',
      category: 'crypto',
    },
    {
      id: 'poly-6',
      question: 'Will the S&P 500 reach 6000 by Q2 2026?',
      yes: 6200000,
      no: 3800000,
      yesPrice: 62,
      noPrice: 38,
      volume24h: 8500000,
      kingAI: 59,
      status: 'open',
      category: 'finance',
    },
    {
      id: 'poly-7',
      question: 'Will Apple stock outperform Nvidia in 2026?',
      yes: 4400000,
      no: 5600000,
      yesPrice: 44,
      noPrice: 56,
      volume24h: 7200000,
      kingAI: 42,
      status: 'open',
      category: 'tech',
    },
    {
      id: 'poly-8',
      question: 'Will Ethereum ecosystem revenue exceed Bitcoin in 2026?',
      yes: 5800000,
      no: 4200000,
      yesPrice: 58,
      noPrice: 42,
      volume24h: 6800000,
      kingAI: 55,
      status: 'open',
      category: 'crypto',
    },
    {
      id: 'poly-golf-1',
      question: 'Will Tiger Woods finish top 10 at Masters 2026?',
      yes: 4200000,
      no: 5800000,
      yesPrice: 42,
      noPrice: 58,
      volume24h: 3400000,
      kingAI: 45,
      status: 'open',
      category: 'golf',
    },
    {
      id: 'poly-golf-2',
      question: 'Will Rory McIlroy win PGA Championship 2026?',
      yes: 3100000,
      no: 6900000,
      yesPrice: 31,
      noPrice: 69,
      volume24h: 2800000,
      kingAI: 28,
      status: 'open',
      category: 'golf',
    },
    {
      id: 'poly-horses-1',
      question: 'Will a 10:1 or longer shot win Kentucky Derby 2026?',
      yes: 6200000,
      no: 3800000,
      yesPrice: 62,
      noPrice: 38,
      volume24h: 5600000,
      kingAI: 60,
      status: 'open',
      category: 'horses',
    },
    {
      id: 'poly-horses-2',
      question: 'Will total Triple Crown handle exceed $500M in 2026?',
      yes: 5400000,
      no: 4600000,
      yesPrice: 54,
      noPrice: 46,
      volume24h: 4200000,
      kingAI: 52,
      status: 'open',
      category: 'horses',
    },
  ];
}

/**
 * Filter markets by category
 */
export function filterByCategory(markets: PolymarketBet[], category: string | null): PolymarketBet[] {
  if (!category) return markets;
  return markets.filter(m => m.category === category);
}

/**
 * Get all unique categories from markets
 */
export function getCategoriesFromMarkets(markets: PolymarketBet[]): string[] {
  const categories = new Set<string>();
  markets.forEach(m => {
    if (m.category) categories.add(m.category);
  });
  return Array.from(categories);
}

/**
 * Convert Polymarket outcome to simplified display format
 */
export function getKingAIProbability(yesPrice: number): number {
  // Simulate King AI probability based on market odds (weighted)
  return Math.round(yesPrice * 0.95);
}

/**
 * Calculate potential payout for a bet
 */
export function calculatePayout(
  betAmount: number,
  odds: number
): number {
  return Math.round(betAmount * (odds / 100) * 100) / 100;
}
