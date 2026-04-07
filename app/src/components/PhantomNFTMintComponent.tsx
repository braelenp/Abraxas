import React, { useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ExternalLink, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import {
  mintNFTWithPhantom,
  isPhantomNFTCapable,
  getSophiaMetadata,
  getMonolithMetadata,
  checkNFTOwnership,
} from '../lib/phantomNftMint';

interface PhantomNFTMintComponentProps {
  nftType: 'sophia' | 'monolith';
  agentId?: string;
  onSuccess?: (mintAddress: string) => void;
  compact?: boolean;
}

type MintPhase = 'idle' | 'preparing' | 'signing' | 'minting' | 'success' | 'error';

export const PhantomNFTMintComponent: React.FC<PhantomNFTMintComponentProps> = ({
  nftType,
  agentId = '001',
  onSuccess,
  compact = false,
}) => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  
  const [phase, setPhase] = useState<MintPhase>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mintResult, setMintResult] = useState<{ signature?: string; mint?: string }>({});

  const isPhantomAvailable = isPhantomNFTCapable();
  const nftTitle = nftType === 'sophia' ? 'Sophia Agent' : 'Genesis Monolith';
  const nftIcon = nftType === 'sophia' ? '🤖' : '◆';

  /**
   * Handle NFT mint click
   */
  const handleMintNFT = useCallback(async () => {
    if (!publicKey || !connected) {
      setPhase('error');
      setErrorMessage('Please connect your Phantom wallet first');
      return;
    }

    if (!isPhantomAvailable) {
      setPhase('error');
      setErrorMessage('Phantom wallet not detected. Please install Phantom.');
      return;
    }

    try {
      setPhase('preparing');
      setErrorMessage('');

      // Get metadata based on NFT type
      const metadata = nftType === 'sophia' 
        ? getSophiaMetadata(agentId)
        : getMonolithMetadata(publicKey.toString().slice(0, 8));

      setPhase('signing');

      // Request Phantom to mint
      const result = await mintNFTWithPhantom({
        recipientWallet: publicKey,
        connection,
        metadataUri: metadata.uri,
        nftType,
      });

      if (result.success) {
        setPhase('success');
        setMintResult({
          mint: result.mintAddress?.toString(),
          signature: result.transactionSignature,
        });

        if (onSuccess && result.mintAddress) {
          onSuccess(result.mintAddress.toString());
        }
      } else {
        setPhase('error');
        setErrorMessage(result.error || 'Mint failed');
      }
    } catch (error) {
      setPhase('error');
      setErrorMessage((error as Error).message);
    }
  }, [publicKey, connected, isPhantomAvailable, nftType, agentId, connection, onSuccess]);

  /**
   * Reset to idle state
   */
  const handleReset = useCallback(() => {
    setPhase('idle');
    setErrorMessage('');
    setMintResult({});
  }, []);

  // ============ IDLE STATE ============
  if (phase === 'idle') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="mb-6">
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase font-mono mb-2">
            &gt; [PHANTOM] MINT_{nftType.toUpperCase()}
          </h3>
          <p className="text-[11px] text-cyan-300/60 uppercase tracking-wide">
            Sign with Phantom to mint your {nftTitle}
          </p>
        </div>

        {/* NFT Preview */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-cyan-400/20 text-center">
          <div className="text-6xl mb-3">{nftIcon}</div>
          <h4 className="text-lg font-bold text-cyan-300 mb-1">{nftTitle} NFT</h4>
          <p className="text-xs text-cyan-400/60">
            {nftType === 'sophia' 
              ? 'AI agent with full autonomy capabilities'
              : 'Genesis holder status with 2x multiplier'}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {nftType === 'sophia' ? (
            <>
              <div className="flex gap-2 text-xs text-cyan-300">
                <span>✓</span>
                <span>Autonomous AI agent</span>
              </div>
              <div className="flex gap-2 text-xs text-cyan-300">
                <span>✓</span>
                <span>Tradeable on marketplaces</span>
              </div>
              <div className="flex gap-2 text-xs text-cyan-300">
                <span>✓</span>
                <span>Earn rental income</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 text-xs text-cyan-300">
                <span>✓</span>
                <span>2x airdrop multiplier</span>
              </div>
              <div className="flex gap-2 text-xs text-cyan-300">
                <span>✓</span>
                <span>Early species access</span>
              </div>
              <div className="flex gap-2 text-xs text-cyan-300">
                <span>✓</span>
                <span>Biological ledger mark</span>
              </div>
            </>
          )}
        </div>

        {/* Mint Button */}
        {isPhantomAvailable && connected ? (
          <button
            onClick={handleMintNFT}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Zap className="w-5 h-5" />
            Mint with Phantom
          </button>
        ) : (
          <button
            onClick={() => window.open('https://phantom.app/', '_blank')}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
          >
            <ExternalLink className="w-5 h-5" />
            Install Phantom
          </button>
        )}

        <p className="text-cyan-400/40 text-xs text-center mt-4">
          One-click NFT creation • In your Phantom wallet instantly
        </p>
      </div>
    );
  }

  // ============ PREPARING STATE ============
  if (phase === 'preparing') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase text-center font-mono">
            &gt; [PREPARING] METADATA
          </h3>
          <p className="text-cyan-400/60 text-center max-w-xs text-xs mt-4">
            Preparing NFT metadata for mint...
          </p>
        </div>
      </div>
    );
  }

  // ============ SIGNING STATE ============
  if (phase === 'signing') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase text-center font-mono">
            &gt; [SIGNING] AWAIT_PHANTOM
          </h3>
          <p className="text-cyan-400/60 text-center max-w-xs text-xs mt-4">
            Check your Phantom wallet • Approve the transaction to mint
          </p>
        </div>
      </div>
    );
  }

  // ============ MINTING STATE ============
  if (phase === 'minting') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase text-center font-mono">
            &gt; [PROCESSING] MINTING_NFT
          </h3>
          <p className="text-cyan-400/60 text-center max-w-xs text-xs mt-4">
            Your {nftTitle} is being minted on-chain...
          </p>
        </div>
      </div>
    );
  }

  // ============ SUCCESS STATE ============
  if (phase === 'success') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
          <h3 className="text-sm font-bold text-green-400 tracking-widest uppercase text-center font-mono mb-2">
            ✓ [SUCCESS] NFT_MINTED
          </h3>
          <p className="text-green-400 text-center mb-6 text-xs">
            Your {nftTitle} has been created and is now in your Phantom wallet
          </p>

          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-4 w-full mb-6 border border-cyan-400/30">
            <div className="text-cyan-400/70 text-xs font-semibold uppercase mb-2">NFT Details</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-cyan-300">
                <span>Type:</span>
                <span className="font-mono">{nftTitle}</span>
              </div>
              {mintResult.mint && (
                <div className="flex justify-between text-cyan-300 flex-wrap">
                  <span>Mint:</span>
                  <span className="font-mono">{mintResult.mint.slice(0, 12)}...</span>
                </div>
              )}
              {mintResult.signature && (
                <div className="flex justify-between text-cyan-300 flex-wrap">
                  <span>Tx:</span>
                  <span className="font-mono">{mintResult.signature.slice(0, 12)}...</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={handleReset}
              className="flex-1 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-cyan-400 font-semibold rounded-lg transition border border-cyan-400/20 text-sm"
            >
              Done
            </button>
            {mintResult.signature && (
              <button
                onClick={() => window.open(`https://solscan.io/tx/${mintResult.signature}?cluster=mainnet`, '_blank')}
                className="flex-1 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-semibold rounded-lg transition border border-cyan-400/40 text-sm"
              >
                View Tx
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============ ERROR STATE ============
  if (phase === 'error') {
    return (
      <div className={`rounded-2xl border border-red-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <h3 className="text-lg font-semibold text-white text-center">Mint Failed</h3>
          <p className="text-red-400/70 text-center text-sm max-w-xs">{errorMessage}</p>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  return null;
};
