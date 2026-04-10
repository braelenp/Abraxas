import { useState, useCallback, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { ArrowRightLeft, Zap, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PublicKey, SystemProgram, Transaction, VersionedTransaction } from '@solana/web3.js';
import { getJupiterQuote, getJupiterSwapTransaction, calculateOutputAmount } from '../lib/jupiter';
import { validateNetworkForTrading, checkAbraTokenExistsOnNetwork } from '../lib/networkValidator';

const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const SOL_TOKEN_CA = 'So11111111111111111111111111111111111111112';
const SOL_DECIMALS = 9;
const ABRA_DECIMALS = 6;

interface SwapState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  txSignature?: string;
}

/**
 * PhantomSwapPanel - Swap using Phantom's native wallet UI and signing
 * Gets quotes from Jupiter, but executes swaps through Phantom wallet
 */
export function PhantomSwapPanel() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  
  const [solAmount, setSolAmount] = useState<string>('1');
  const [abraAmount, setAbraAmount] = useState<string>('0');
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [swapState, setSwapState] = useState<SwapState>({ status: 'idle' });
  const [priceImpact, setPriceImpact] = useState<string>('0');
  const [networkValidation, setNetworkValidation] = useState<{
    isValid: boolean;
    cluster: string;
    message: string;
  } | null>(null);
  const [isValidatingNetwork, setIsValidatingNetwork] = useState(false);

  // Validate network on mount or when connection changes
  useEffect(() => {
    if (!connected) return;

    const validateNetwork = async () => {
      setIsValidatingNetwork(true);
      try {
        const validation = await validateNetworkForTrading(connection);
        setNetworkValidation(validation);

        // Also check if ABRA token exists
        if (validation.isValid) {
          const abraExists = await checkAbraTokenExistsOnNetwork(connection, ABRA_TOKEN_CA);
          if (!abraExists) {
            setNetworkValidation({
              isValid: false,
              cluster: validation.cluster,
              message: '❌ ABRA token not found on this network. Make sure you are on mainnet.',
            });
          }
        }
      } catch (error) {
        console.error('Network validation error:', error);
        setNetworkValidation({
          isValid: false,
          cluster: 'unknown',
          message: 'Failed to validate network',
        });
      } finally {
        setIsValidatingNetwork(false);
      }
    };

    validateNetwork();
  }, [connected, connection]);

  // Fetch quote from Jupiter
  const handleGetQuote = useCallback(async () => {
    if (!solAmount || parseFloat(solAmount) <= 0) {
      setAbraAmount('0');
      return;
    }

    // Check network before fetching quote
    if (networkValidation && !networkValidation.isValid) {
      setSwapState({
        status: 'error',
        message: networkValidation.message,
      });
      return;
    }

    setIsLoadingQuote(true);
    setSwapState({ status: 'idle' }); // Clear previous errors
    try {
      const quote = await getJupiterQuote(SOL_TOKEN_CA, ABRA_TOKEN_CA, parseFloat(solAmount), 50, SOL_DECIMALS);

      if (quote) {
        const outputAmount = calculateOutputAmount(quote, ABRA_DECIMALS);
        setAbraAmount(outputAmount.toFixed(2));
        setPriceImpact(quote.priceImpactPct);
        setSwapState({ status: 'idle' }); // Clear any error messages
      } else {
        console.error('[PhantomSwapPanel] Quote is null - check browser console for Jupiter API errors');
        setSwapState({
          status: 'error',
          message: 'Failed to get quote. Check browser console for details.',
        });
      }
    } catch (error) {
      console.error('Quote error:', error);
      setSwapState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Error fetching quote',
      });
    } finally {
      setIsLoadingQuote(false);
    }
  }, [solAmount, networkValidation]);

  // Fetch quote when SOL amount changes
  useEffect(() => {
    handleGetQuote();
  }, [handleGetQuote]);

  // Handle SOL amount change
  const handleSolChange = (value: string) => {
    setSolAmount(value);
  };

  // Execute swap via Phantom
  const handleSwap = useCallback(async () => {
    // Check network first
    if (networkValidation && !networkValidation.isValid) {
      setSwapState({
        status: 'error',
        message: networkValidation.message,
      });
      return;
    }

    if (!connected || !publicKey || !solAmount || parseFloat(solAmount) <= 0) {
      setSwapState({
        status: 'error',
        message: 'Connect wallet and enter amount',
      });
      return;
    }

    setSwapState({ status: 'loading', message: 'Getting swap transaction...' });

    try {
      // Get swap transaction from Jupiter (uses Phantom's sendTransaction to sign)
      const swapTx = await getJupiterSwapTransaction(
        publicKey.toString(),
        SOL_TOKEN_CA,
        ABRA_TOKEN_CA,
        parseFloat(solAmount),
        50, // 0.5% slippage
        SOL_DECIMALS
      );

      if (!swapTx) {
        throw new Error('Failed to get swap transaction');
      }

      setSwapState({ status: 'loading', message: 'Requesting Phantom approval...' });

      // Deserialize and send via Phantom
      const buf = Buffer.from(swapTx.swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(buf);

      // Phantom wallet will show approval dialog
      const signature = await sendTransaction(transaction, connection);

      setSwapState({ status: 'loading', message: 'Confirming transaction...' });

      // Wait for confirmation
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });

      setSwapState({
        status: 'success',
        message: `Swap successful! Received ~${abraAmount} ABRA`,
        txSignature: signature,
      });

      // Reset form
      setSolAmount('1');
      setAbraAmount('0');
      setPriceImpact('0');
    } catch (error) {
      console.error('Swap error:', error);
      setSwapState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Swap failed. Check console for details.',
      });
    }
  }, [connected, publicKey, solAmount, abraAmount, networkValidation, sendTransaction, connection]);

  // Show loading state if not connected
  if (!connected) {
    return (
      <div className="rounded-xl border border-orange-300/30 bg-orange-900/20 p-5 backdrop-blur-sm">
        <p className="text-xs text-amber-200">Connect your wallet to swap SOL for ABRA</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-teal-300/30 bg-slate-900/40 p-5 backdrop-blur-sm space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-teal-300" />
        <h3 className="font-semibold text-teal-200">Phantom Swap</h3>
      </div>

      {/* Network Validation Alert */}
      {isValidatingNetwork && (
        <div className="rounded-lg bg-blue-900/30 border border-blue-300/40 p-3 flex gap-2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-300 border-t-transparent rounded-full flex-shrink-0" />
          <p className="text-xs text-blue-200">Validating network...</p>
        </div>
      )}

      {networkValidation && !networkValidation.isValid && (
        <div className="rounded-lg bg-red-900/30 border border-red-300/40 p-3 flex gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-red-200 font-semibold">{networkValidation.message}</p>
            <p className="text-xs text-red-300/70 mt-1">
              Swap requires mainnet. Please switch your wallet to Solana mainnet.
            </p>
          </div>
        </div>
      )}

      {/* SOL Input */}
      <div>
        <label className="text-xs uppercase font-mono text-slate-400 mb-2 block">Input: SOL</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={solAmount}
            onChange={(e) => handleSolChange(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.1"
            disabled={swapState.status === 'loading'}
            className="flex-1 bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 disabled:opacity-50"
          />
          <button
            onClick={() => handleSolChange('1')}
            className="px-2 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300"
          >
            1 SOL
          </button>
          <button
            onClick={() => handleSolChange('5')}
            className="px-2 py-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300"
          >
            5 SOL
          </button>
        </div>
      </div>

      {/* Swap Arrow */}
      <div className="flex justify-center">
        <button
          onClick={handleGetQuote}
          disabled={isLoadingQuote || swapState.status === 'loading'}
          className="p-2 rounded-full bg-teal-500/20 hover:bg-teal-500/30 disabled:opacity-50 transition-colors"
        >
          <ArrowRightLeft className="h-4 w-4 text-teal-300" />
        </button>
      </div>

      {/* ABRA Output */}
      <div>
        <label className="text-xs uppercase font-mono text-slate-400 mb-2 block">Output: ABRA</label>
        <input
          type="text"
          value={abraAmount}
          readOnly
          placeholder="0.00"
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-300"
        />
        {priceImpact && (
          <p className="text-xs text-amber-300/70 mt-1">Price Impact: {priceImpact}%</p>
        )}
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!connected || !solAmount || parseFloat(solAmount) <= 0 || swapState.status === 'loading'}
        className="w-full bg-teal-500/30 hover:bg-teal-500/40 disabled:opacity-30 border border-teal-300/40 rounded-lg py-2 text-sm font-medium text-teal-200 transition-colors"
      >
        {swapState.status === 'loading' ? 'Swapping...' : 'Swap SOL for ABRA'}
      </button>

      {/* Success State */}
      {swapState.status === 'success' && (
        <div className="rounded-lg bg-emerald-900/30 border border-emerald-300/40 p-3 flex gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-200">
            <p className="font-semibold">{swapState.message}</p>
            {swapState.txSignature && (
              <p className="text-emerald-300/70 mt-1 font-mono break-all">
                <a
                  href={`https://solscan.io/tx/${swapState.txSignature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {swapState.txSignature.slice(0, 20)}...
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Error State */}
      {swapState.status === 'error' && (
        <div className="rounded-lg bg-red-900/30 border border-red-300/40 p-3 flex gap-2">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-200">{swapState.message}</p>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
        <p>• Swap secured by Phantom wallet signing</p>
        <p>• Best rates through Jupiter DEX aggregation</p>
        <p>• 0.5% slippage tolerance</p>
      </div>
    </div>
  );
}
