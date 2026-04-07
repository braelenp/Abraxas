import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAccount, getMint } from '@solana/spl-token';
import { ABRA_TOKEN_MINT, MINIMUM_ABRA_FOR_ACCESS } from '../lib/solana';
import { fetchAbraPrice } from '../lib/abraPrice';

interface AbraBalanceState {
  balance: number;
  balanceFormatted: string;
  balanceUsd: number;
  balanceUsdFormatted: string;
  abraPrice: number;
  isLoading: boolean;
  error: string | null;
  hasMinimum: boolean;
}

const CACHE_KEY = 'abraBalance';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CachedBalance {
  balance: number;
  balanceFormatted: string;
  timestamp: number;
}

export function useAbraBalance(minimumThreshold: number = MINIMUM_ABRA_FOR_ACCESS): AbraBalanceState {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [state, setState] = useState<AbraBalanceState>({
    balance: 0,
    balanceFormatted: '0',
    balanceUsd: 0,
    balanceUsdFormatted: '$0.00',
    abraPrice: 1,
    isLoading: true,
    error: null,
    hasMinimum: false,
  });
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  // Check if cached balance is still valid
  const getCachedBalance = (): CachedBalance | null => {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as CachedBalance;
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          return parsed;
        }
      }
    } catch {
      // Ignore cache errors
    }
    return null;
  };

  // Cache balance result
  const setCachedBalance = (balance: number, balanceFormatted: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ balance, balanceFormatted, timestamp: Date.now() }),
      );
    } catch {
      // Ignore cache errors
    }
  };

  useEffect(() => {
    if (!publicKey || !connection) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Wallet not connected',
      }));
      return;
    }

    const fetchBalance = async (attempt = 0) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        // Try to use cached balance first
        const cached = getCachedBalance();
        
        // Fetch ABRA price
        let abraPrice = 1;
        try {
          abraPrice = await fetchAbraPrice();
        } catch (priceErr) {
          console.warn('Could not fetch ABRA price, using default $1:', priceErr);
        }

        if (cached) {
          const balanceUsd = cached.balance * abraPrice;
          const balanceUsdFormatted = balanceUsd.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          setState({
            balance: cached.balance,
            balanceFormatted: cached.balanceFormatted,
            balanceUsd,
            balanceUsdFormatted,
            abraPrice,
            isLoading: false,
            error: null,
            hasMinimum: cached.balance >= minimumThreshold,
          });
          return;
        }

        const abraMintPublicKey = new PublicKey(ABRA_TOKEN_MINT);
        
        // Get mint information to determine decimals
        let decimals = 6; // Default assumption
        try {
          const mintInfo = await getMint(connection, abraMintPublicKey);
          decimals = mintInfo.decimals;
        } catch (mintErr) {
          // If mint not found, provide helpful error
          const mintError = mintErr instanceof Error ? mintErr.message : String(mintErr);
          if (mintError.includes('could not find mint') || mintError.includes('Invalid param')) {
            setState({
              balance: 0,
              balanceFormatted: '0',
              balanceUsd: 0,
              balanceUsdFormatted: '$0.00',
              abraPrice: 1,
              isLoading: false,
              error: `ABRA token not deployed on this cluster. Switch to mainnet or use testnet with deployed token.`,
              hasMinimum: false,
            });
            return;
          }
          console.warn('Could not fetch ABRA mint info, using default decimals');
        }

        // Find associated token account for ABRA
        const tokenAccountsResponse = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { mint: abraMintPublicKey },
        );

        let balance = 0;
        if (tokenAccountsResponse.value.length > 0) {
          const tokenAccount = tokenAccountsResponse.value[0];
          const parsedTokenAmount = tokenAccount.account.data.parsed.info.tokenAmount;
          balance = parsedTokenAmount.uiAmount || 0;
        }

        const balanceFormatted = balance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        const balanceUsd = balance * abraPrice;
        const balanceUsdFormatted = balanceUsd.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        // Cache the result
        setCachedBalance(balance, balanceFormatted);

        setState({
          balance,
          balanceFormatted,
          balanceUsd,
          balanceUsdFormatted,
          abraPrice,
          isLoading: false,
          error: null,
          hasMinimum: balance >= minimumThreshold,
        });
        
        // Reset retry count on success
        setRetryCount(0);
      } catch (err) {
        let errorMessage = err instanceof Error ? err.message : 'Failed to fetch balance';
        
        // Improve error messaging for common RPC issues
        if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
          errorMessage = 'RPC access forbidden (403). Retrying...';
          // Retry with exponential backoff
          if (attempt < MAX_RETRIES) {
            const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
            setTimeout(() => {
              setRetryCount(attempt + 1);
              fetchBalance(attempt + 1);
            }, delay);
            return;
          } else {
            errorMessage = 'RPC rate limited. Please wait and refresh in 1 minute or use a custom RPC endpoint.';
          }
        } else if (errorMessage.includes('402') || errorMessage.includes('Forbidden')) {
          errorMessage = 'RPC rate limited (402). Please try again in 30 seconds or use a paid RPC.';
        } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
          errorMessage = 'RPC API key invalid or missing. Using public RPC fallback.';
        } else if (errorMessage.includes('429') || errorMessage.includes('Too many')) {
          errorMessage = 'RPC endpoint busy (429). Please refresh and try again.';
        } else if (errorMessage.includes('network') || errorMessage.includes('failed to fetch')) {
          errorMessage = 'Network connection issue. Check your internet connection.';
        }
        
        console.error('Error fetching ABRA balance:', err);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          // Only preserve hasMinimum if not first load (prev.isLoading was false)
          // On initial load errors, reset to false but show error message
          hasMinimum: prev.isLoading ? false : prev.hasMinimum,
        }));
      }
    };

    fetchBalance();

    // Optionally set up polling to refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [publicKey, connection, minimumThreshold]);

  return state;
}
