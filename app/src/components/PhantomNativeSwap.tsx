import { useState, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { ArrowRightLeft, Zap, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';

const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';

interface SwapState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

/**
 * PhantomNativeSwap - Uses Phantom wallet's native swap capabilities
 * No external APIs - everything through Phantom
 */
export function PhantomNativeSwap() {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  
  const [swapState, setSwapState] = useState<SwapState>({ status: 'idle' });

  // Open Phantom's native swap
  const handleOpenPhantomSwap = useCallback(async () => {
    if (!connected || !publicKey) {
      setSwapState({
        status: 'error',
        message: 'Please connect your wallet first',
      });
      return;
    }

    try {
      setSwapState({ status: 'loading', message: 'Opening Phantom Swap...' });

      // Phantom swap URL scheme
      // Format: https://phantom.app/swap?outputMint=TOKEN_ADDRESS&inputMint=SOL&cluster=mainnet
      const swapUrl = `https://phantom.app/swap?outputMint=${ABRA_TOKEN_CA}&inputMint=So11111111111111111111111111111111111111112&cluster=mainnet`;
      
      console.log('[PhantomSwap] Opening Phantom swap:', swapUrl);
      
      // Open in new window
      window.open(swapUrl, 'phantom-swap', 'width=600,height=700');

      setSwapState({
        status: 'idle',
        message: undefined,
      });
    } catch (error) {
      console.error('Swap error:', error);
      setSwapState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to open swap',
      });
    }
  }, [connected, publicKey]);

  // If not connected, show connection prompt
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
        <h3 className="font-semibold text-teal-200">Phantom Native Swap</h3>
      </div>

      {/* Info Box */}
      <div className="rounded-lg bg-teal-900/20 border border-teal-300/30 p-3">
        <p className="text-xs text-teal-200">
          Swap SOL for ABRA directly through your Phantom wallet. Your wallet handles all routing and security.
        </p>
      </div>

      {/* Open Swap Button */}
      <button
        onClick={handleOpenPhantomSwap}
        disabled={swapState.status === 'loading'}
        className="w-full bg-teal-500/30 hover:bg-teal-500/40 disabled:opacity-30 border border-teal-300/40 rounded-lg py-3 text-sm font-medium text-teal-200 transition-colors flex items-center justify-center gap-2"
      >
        <ArrowRightLeft className="h-4 w-4" />
        {swapState.status === 'loading' ? 'Opening Phantom Swap...' : 'Open Phantom Swap'}
        <ExternalLink className="h-4 w-4" />
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
          <p className="text-xs text-emerald-200">{swapState.message}</p>
        </div>
      )}

      {/* Features List */}
      <div className="text-xs text-slate-400 pt-2 border-t border-slate-700 space-y-1">
        <p>• Swap managed entirely by Phantom wallet</p>
        <p>• Your private keys never leave your device</p>
        <p>• Automatic best price routing</p>
        <p>• Full control over transaction details</p>
      </div>

      {/* Manual Alternative */}
      <div className="rounded-lg bg-slate-800/30 border border-slate-600/30 p-3">
        <p className="text-xs text-slate-400 mb-2">
          <strong>Alternative:</strong> You can also swap directly in Phantom using the "Swap" tab
        </p>
        <ol className="text-xs text-slate-500 space-y-1">
          <li>1. Open Phantom wallet extension</li>
          <li>2. Click the "Swap" tab</li>
          <li>3. Select SOL as input, ABRA as output</li>
          <li>4. Enter amount and confirm</li>
        </ol>
      </div>
    </div>
  );
}
