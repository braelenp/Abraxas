import { useEffect, useState } from 'react';
import { fetchPolymarketBets, PolymarketBet } from '../lib/polymarket';

export function usePolymarketBets(limit: number = 3) {
  const [bets, setBets] = useState<PolymarketBet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPolymarketBets(limit);
        setBets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bets');
        // Still set default bets on error
        const { getDefaultBets } = await import('../lib/polymarket');
        setBets(getDefaultBets());
      } finally {
        setIsLoading(false);
      }
    };

    loadBets();
  }, [limit]);

  return { bets, isLoading, error };
}
