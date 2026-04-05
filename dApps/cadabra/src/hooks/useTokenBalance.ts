import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { CADABRA_TOKEN_MINT, MINIMUM_TOKENS_FOR_ACCESS, TOKEN_DECIMALS } from '../lib/token';

interface TokenBalanceResult {
  balance: number;
  balanceFormatted: string;
  isLoading: boolean;
  error: string | null;
  hasMinimum: boolean;
}

const CACHE_KEY = 'cadabra_token_balance';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useTokenBalance(minimumRequired: number = MINIMUM_TOKENS_FOR_ACCESS): TokenBalanceResult {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(0);
        setIsLoading(false);
        setError(null);
        return;
      }

      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { balance: cachedBalance, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          if (isMounted) {
            setBalance(cachedBalance);
            setIsLoading(false);
            setError(null);
          }
          return;
        }
      }

      setIsLoading(true);
      setError(null);

      try {
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
          try {
            const accounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
              mint: CADABRA_TOKEN_MINT,
            });

            if (accounts.value.length === 0) {
              if (isMounted) {
                setBalance(0);
                setError(null);
                localStorage.setItem(
                  CACHE_KEY,
                  JSON.stringify({
                    balance: 0,
                    timestamp: Date.now(),
                  })
                );
              }
              break;
            }

            const tokenAmount = accounts.value[0].account.data.parsed.info.tokenAmount;
            const balanceAmount = tokenAmount.uiAmount || 0;

            if (isMounted) {
              setBalance(balanceAmount);
              setError(null);
              localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                  balance: balanceAmount,
                  timestamp: Date.now(),
                })
              );
            }
            break;
          } catch (err: any) {
            attempts++;

            // Handle rate limiting errors with exponential backoff
            if (err.status === 429 || err.status === 403 || err.status === 402) {
              const backoffMs = Math.pow(2, attempts) * 1000;
              if (attempts < maxAttempts) {
                await new Promise((resolve) => setTimeout(resolve, backoffMs));
                continue;
              }
            }

            throw err;
          }
        }

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err: any) {
        let errorMsg = 'Failed to fetch token balance';

        if (err.status === 401) {
          errorMsg = 'Unauthorized: Check your RPC endpoint';
        } else if (err.status === 429) {
          errorMsg = 'Rate limited: Too many requests. Please try again later.';
        } else if (err.status === 403 || err.status === 402) {
          errorMsg = 'Access forbidden or insufficient quota. Please try again.';
        }

        if (isMounted) {
          setError(errorMsg);
          setBalance(0);
          setIsLoading(false);
        }
      }
    };

    fetchBalance();

    return () => {
      isMounted = false;
    };
  }, [publicKey, connection, minimumRequired]);

  const balanceFormatted = balance.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const hasMinimum = balance >= minimumRequired;

  return {
    balance,
    balanceFormatted,
    isLoading,
    error,
    hasMinimum,
  };
}
