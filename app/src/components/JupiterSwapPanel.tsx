import { useState, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { ArrowRightLeft, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PublicKey } from '@solana/web3.js';
import { getJupiterQuote, getJupiterSwapTransaction, executeSwap, calculateOutputAmount } from '../lib/jupiter';

const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const SOL_TOKEN_CA = 'So11111111111111111111111111111111111111112';
const SOL_DECIMALS = 9;
const ABRA_DECIMALS = 6;

interface SwapState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  txSignature?: string;
}

export function JupiterSwapPanel() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  
  const [solAmount, setSolAmount] = useState<string>('1');
  const [abraAmount, setAbraAmount] = useState<string>('0');
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [swapState, setSwapState] = useState<SwapState>({ status: 'idle' });
  const [priceImpact, setPriceImpact] = useState<string>('0');

  // Fetch quote from Jupiter
  const handleGetQuote = useCallback(async () => {
    if (!solAmount || parseFloat(solAmount) <= 0) {
      setAbraAmount('0');
      return;
    }

    setIsLoadingQuote(true);
    try {
      const amountInSmallestUnits = Math.floor(parseFloat(solAmount) * Math.pow(10, SOL_DECIMALS));
      const quote = await getJupiterQuote(SOL_TOKEN_CA, ABRA_TOKEN_CA, amountInSmallestUnits, 50);

      if (quote) {
        const outputAmount = calculateOutputAmount(quote, ABRA_DECIMALS);
        setAbraAmount(outputAmount.toFixed(2));
        setPriceImpact(quote.priceImpactPct);
      } else {
        setSwapState({
          status: 'error',
          message: 'Failed to fetch quote from Jupiter',
        });
      }
    } catch (error) {
      console.error('Quote error:', error);
      setSwapState({
        status: 'error',
        message: 'Error fetching quote',
      });
    } finally {
      setIsLoadingQuote(false);
    }
  }, [solAmount]);

  // Execute swap
  const handleSwap = useCallback(async () => {
    if (!connected || !publicKey || !solAmount || parseFloat(solAmount) <= 0) {
      setSwapState({
        status: 'error',
        message: 'Connect wallet and enter amount',
      });
      return;
    }

    setSwapState({ status: 'loading', message: 'Getting swap transaction...' });

    try {
      const amountInSmallestUnits = Math.floor(parseFloat(solAmount) * Math.pow(10, SOL_DECIMALS));
      
      // Get swap transaction from Jupiter
      const swapTx = await getJupiterSwapTransaction(
        publicKey.toString(),
        SOL_TOKEN_CA,
        ABRA_TOKEN_CA,
        amountInSmallestUnits,
        50 // 0.5% slippage
      );

      if (!swapTx) {
        throw new Error('Failed to get swap transaction');
      }

      setSwapState({ status: 'loading', message: 'Executing swap...' });

      // Execute the swap
      const signature = await executeSwap(connection, swapTx.swapTransaction, sendTransaction);

      if (signature) {
        setSwapState({
          status: 'success',
          message: `Swap successful! Received ~${abraAmount} ABRA`,
          txSignature: signature,
        });
        // Reset form
        setSolAmount('1');
        setAbraAmount('0');
        setPriceImpact('0');
      } else {
        throw new Error('Swap execution failed');
      }
    } catch (error) {
      console.error('Swap error:', error);
      setSwapState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Swap failed. Please try again.',
      });
    }
  }, [connected, publicKey, solAmount, abraAmount, connection, sendTransaction]);

  // Auto-fetch quote when SOL amount changes
  const handleSolChange = (value: string) => {
    setSolAmount(value);
    if (value && parseFloat(value) > 0) {
      // Fetch quote after a small delay to avoid excessive requests
      const timer = setTimeout(() => {
        handleGetQuote();
      }, 500);
      return () => clearTimeout(timer);
    }
  };

  if (!connected) {
    return (
      <div className="rounded-xl border border-amber-300/40 bg-amber-900/20 p-4 backdrop-blur-sm">
        <p className="text-xs text-amber-200">Connect your wallet to swap SOL for ABRA</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-teal-300/30 bg-slate-900/40 p-5 backdrop-blur-sm space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-teal-300" />
        <h3 className="font-semibold text-teal-200">Jupiter Swap</h3>
      </div>

      {/* SOL Input */}
      <div>
        <label className="text-xs uppercase font-mono text-slate-400 mb-2 block">Input: SOL</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={solAmount}
            onChange={(e) => handleSolChange(e.target.value)}
            placeholder="0.0"
            min="0"
            step="0.1"
            className="flex-1 rounded-lg bg-slate-950/50 border border-teal-300/30 px-3 py-2 text-sm text-teal-100 placeholder-slate-500 focus:outline-none focus:border-teal-300/60 focus:ring-1 focus:ring-teal-300/30"
          />
          <button
            onClick={() => handleSolChange('1')}
            className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/30 text-xs text-slate-300 hover:bg-slate-700/50 transition"
          >
            1 SOL
          </button>
          <button
            onClick={() => handleSolChange('5')}
            className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/30 text-xs text-slate-300 hover:bg-slate-700/50 transition"
          >
            5 SOL
          </button>
        </div>
      </div>

      {/* Swap Arrow */}
      <div className="flex justify-center">
        <div className="rounded-full bg-teal-500/20 border border-teal-300/40 p-2">
          <ArrowRightLeft className="h-4 w-4 text-teal-300" />
        </div>
      </div>

      {/* ABRA Output */}
      <div>
        <label className="text-xs uppercase font-mono text-slate-400 mb-2 block">Output: ABRA</label>
        <div className="relative">
          <input
            type="text"
            value={abraAmount}
            readOnly
            placeholder="0.0"
            className="w-full rounded-lg bg-slate-950/50 border border-emerald-300/30 px-3 py-2 text-sm text-emerald-100 placeholder-slate-500 cursor-not-allowed"
          />
          {isLoadingQuote && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-teal-300 border-t-transparent rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Price Impact */}
      {priceImpact && parseFloat(priceImpact) !== 0 && (
        <div className="text-xs text-slate-400">
          Price Impact: <span className={parseFloat(priceImpact) > 1 ? 'text-orange-400' : 'text-green-400'}>
            {priceImpact}%
          </span>
        </div>
      )}

      {/* Status Messages */}
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

      {swapState.status === 'error' && (
        <div className="rounded-lg bg-red-900/30 border border-red-300/40 p-3 flex gap-2">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-200">{swapState.message}</p>
        </div>
      )}

      {swapState.status === 'loading' && (
        <div className="rounded-lg bg-blue-900/30 border border-blue-300/40 p-3 flex gap-2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-300 border-t-transparent rounded-full flex-shrink-0" />
          <p className="text-xs text-blue-200">{swapState.message}</p>
        </div>
      )}

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={swapState.status === 'loading' || !solAmount || parseFloat(solAmount) <= 0}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-teal-500/40 to-cyan-500/40 border border-teal-300/60 text-sm font-semibold text-teal-100 hover:from-teal-500/50 hover:to-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {swapState.status === 'loading' ? 'Swapping...' : 'Swap SOL for ABRA'}
      </button>

      {/* Info */}
      <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
        <p>• Best rates through Jupiter DEX aggregation</p>
        <p>• 0.5% slippage tolerance</p>
        <p>• Direct wallet signing - no custody</p>
      </div>
    </div>
  );
}
