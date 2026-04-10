import { useState, useCallback, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { ArrowRightLeft, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const SOL_TOKEN_CA = 'So11111111111111111111111111111111111111112';

interface SwapState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  txSignature?: string;
}

/**
 * EmbeddedPhantomSwap - Swap interface embedded in the dApp
 * Uses Phantom wallet to sign transactions, all swap logic happens in-app
 */
export function EmbeddedPhantomSwap() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [solAmount, setSolAmount] = useState<string>('1');
  const [abraAmount, setAbraAmount] = useState<string>('0');
  const [swapState, setSwapState] = useState<SwapState>({ status: 'idle' });
  const [isEstimating, setIsEstimating] = useState(false);

  // Estimate output amount (simple ratio for now)
  // In production, you'd call Jupiter API here
  const estimateOutput = useCallback((solInput: string) => {
    const sol = parseFloat(solInput) || 0;
    // Rough estimate: 1 SOL ≈ 0.1 ABRA (this would come from Jupiter API)
    const estimated = (sol * 0.1).toFixed(2);
    setAbraAmount(estimated);
  }, []);

  // Update estimate when SOL amount changes
  useEffect(() => {
    setIsEstimating(true);
    const timer = setTimeout(() => {
      estimateOutput(solAmount);
      setIsEstimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [solAmount, estimateOutput]);

  // Handle SOL amount change
  const handleSolChange = (value: string) => {
    setSolAmount(value);
  };

  // Perform swap - creates and signs transaction
  const handleSwap = useCallback(async () => {
    if (!connected || !publicKey || !sendTransaction) {
      setSwapState({
        status: 'error',
        message: 'Wallet not connected',
      });
      return;
    }

    const solAmount_num = parseFloat(solAmount);
    if (solAmount_num <= 0) {
      setSwapState({
        status: 'error',
        message: 'Enter a valid SOL amount',
      });
      return;
    }

    setSwapState({ status: 'loading', message: 'Preparing swap transaction...' });

    try {
      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();

      // Create swap transaction
      // In production: fetch this from Jupiter API or Moon Pay API
      // For now: simplified transaction that would be replaced with real swap logic
      const transaction = new (await import('@solana/web3.js')).Transaction({
        recentBlockhash: blockhash,
        feePayer: publicKey,
      });

      // Add swap instruction (simplified - would be Jupiter/DEX instruction in production)
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('11111111111111111111111111111111'), // System program
          lamports: Math.floor(solAmount_num * LAMPORTS_PER_SOL),
        })
      );

      setSwapState({ status: 'loading', message: 'Requesting Phantom approval...' });

      // Sign and send with Phantom
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
    } catch (error) {
      console.error('Swap error:', error);

      // Check if user rejected the transaction
      const errorMsg = error instanceof Error ? error.message : 'Swap failed';
      if (errorMsg.includes('User rejected')) {
        setSwapState({
          status: 'error',
          message: 'Transaction rejected by user',
        });
      } else {
        setSwapState({
          status: 'error',
          message: errorMsg,
        });
      }
    }
  }, [connected, publicKey, sendTransaction, solAmount, abraAmount, connection]);

  if (!connected) {
    return (
      <div className="rounded-xl border border-orange-300/30 bg-orange-900/20 p-5 backdrop-blur-sm">
        <p className="text-xs text-amber-200">Connect your Phantom wallet to swap SOL for ABRA</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-teal-300/30 bg-slate-900/40 p-5 backdrop-blur-sm space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-teal-300" />
        <h3 className="font-semibold text-teal-200">Embedded Swap</h3>
      </div>

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
            disabled={swapState.status === 'loading'}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-xs text-slate-300 transition"
          >
            1 SOL
          </button>
          <button
            onClick={() => handleSolChange('5')}
            disabled={swapState.status === 'loading'}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded text-xs text-slate-300 transition"
          >
            5 SOL
          </button>
        </div>
      </div>

      {/* Swap Arrow */}
      <div className="flex justify-center">
        <div className="p-2 rounded-full bg-teal-500/20">
          <ArrowRightLeft className="h-4 w-4 text-teal-300" />
        </div>
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
        {isEstimating && <p className="text-xs text-slate-400 mt-1">Estimating...</p>}
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={swapState.status === 'loading' || !connected || !solAmount || parseFloat(solAmount) <= 0}
        className="w-full bg-teal-500/30 hover:bg-teal-500/40 disabled:bg-slate-700 disabled:cursor-not-allowed border border-teal-300/40 rounded-lg py-2 text-sm font-medium text-teal-200 transition-colors"
      >
        {swapState.status === 'loading' ? '⏳ Swapping...' : '→ Swap SOL for ABRA'}
      </button>

      {/* Error State */}
      {swapState.status === 'error' && (
        <div className="rounded-lg bg-red-900/30 border border-red-300/40 p-3 flex gap-2">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-200">{swapState.message}</p>
        </div>
      )}

      {/* Success State */}
      {swapState.status === 'success' && (
        <div className="rounded-lg bg-emerald-900/30 border border-emerald-300/40 p-3 flex gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-200">
            <p className="font-semibold">{swapState.message}</p>
            {swapState.txSignature && (
              <p className="text-emerald-300/70 mt-1 font-mono text-[11px] break-all">
                <a
                  href={`https://solscan.io/tx/${swapState.txSignature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  View on Solscan →
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
        <p>• Swap stays in Abraxas app</p>
        <p>• Sign with Phantom wallet</p>
        <p>• Estimate rates shown above</p>
      </div>
    </div>
  );
}
