import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAccount, getMint } from '@solana/spl-token';
import { ABRA_TOKEN_MINT, MINIMUM_ABRA_FOR_ACCESS } from '../lib/solana';

interface AbraBalanceState {
  balance: number;
  balanceFormatted: string;
  isLoading: boolean;
  error: string | null;
  hasMinimum: boolean;
}

export function useAbraBalance(minimumThreshold: number = MINIMUM_ABRA_FOR_ACCESS): AbraBalanceState {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [state, setState] = useState<AbraBalanceState>({
    balance: 0,
    balanceFormatted: '0',
    isLoading: true,
    error: null,
    hasMinimum: false,
  });

  useEffect(() => {
    if (!publicKey || !connection) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Wallet not connected',
      }));
      return;
    }

    const fetchBalance = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

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

        setState({
          balance,
          balanceFormatted,
          isLoading: false,
          error: null,
          hasMinimum: balance >= minimumThreshold,
        });
      } catch (err) {
        let errorMessage = err instanceof Error ? err.message : 'Failed to fetch balance';
        
        // Improve error messaging for common RPC issues
        if (errorMessage.includes('402') || errorMessage.includes('Forbidden')) {
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
          hasMinimum: false,
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
