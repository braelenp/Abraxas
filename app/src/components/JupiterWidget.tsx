import { useEffect, useRef } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

interface JupiterWidgetProps {
  inputMint?: string;
  outputMint?: string;
  onSuccess?: (txSignature: string) => void;
}

declare global {
  interface Window {
    Jupiter?: {
      Terminal: {
        load(params: any): Promise<void>;
      };
    };
  }
}

/**
 * JupiterWidget - Integrates Jupiter Terminal directly into Abraxas
 * Provides embedded DEX swap interface without leaving the dApp
 */
export function JupiterWidget({
  inputMint = 'So11111111111111111111111111111111111111112', // SOL
  outputMint = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS', // ABRA
  onSuccess,
}: JupiterWidgetProps) {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const containerRef = useRef<HTMLDivElement>(null);
  const initAttemptedRef = useRef(false);

  useEffect(() => {
    // Only initialize if wallet is connected and not already attempted
    if (initAttemptedRef.current || !publicKey) {
      return;
    }

    const initJupiter = async () => {
      initAttemptedRef.current = true;

      try {
        // Load Jupiter script if not already available
        if (!window.Jupiter) {
          console.log('[Jupiter] Loading script...');
          
          const scriptLoaded = await new Promise<boolean>((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://terminal.jup.ag/main-v3.js';
            script.async = true;
            
            script.onload = () => {
              console.log('[Jupiter] Script loaded from CDN');
              resolve(true);
            };
            
            script.onerror = () => {
              console.error('[Jupiter] Failed to load script');
              resolve(false);
            };
            
            document.body.appendChild(script);
          });

          if (!scriptLoaded) {
            return;
          }
        }

        // Wait for window.Jupiter to be available (with timeout)
        let retries = 0;
        while (!window.Jupiter && retries < 100) {
          await new Promise((res) => setTimeout(res, 50));
          retries++;
        }

        if (!window.Jupiter) {
          console.error('[Jupiter] window.Jupiter not available after retries');
          return;
        }

        console.log('[Jupiter] Initializing Terminal in container...');

        // Load Jupiter Terminal
        await window.Jupiter.Terminal.load({
          displayMode: 'integrated',
          integratedTargetId: 'jupiter-terminal-container',
          endpoint: import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
          formProps: {
            fixedOutputMint: true,
            initialInputMint: inputMint,
            initialOutputMint: outputMint,
          },
        });

        console.log('[Jupiter] Terminal initialized successfully');

        // Handle successful swaps
        if (onSuccess) {
          const handleSuccess = (event: any) => {
            if (event.detail?.signature) {
              console.log('[Jupiter] Swap successful:', event.detail.signature);
              onSuccess(event.detail.signature);
            }
          };
          
          // Remove any existing listeners to avoid duplicates
          window.removeEventListener('jupiterSuccess', handleSuccess);
          window.addEventListener('jupiterSuccess', handleSuccess);
        }
      } catch (error) {
        console.error('[Jupiter] Initialization error:', error);
        // Reset the flag so we can retry next time
        initAttemptedRef.current = false;
      }
    };

    initJupiter();

    return () => {
      // Cleanup on unmount
      if (typeof window !== 'undefined') {
        window.removeEventListener('jupiterSuccess', () => {});
      }
    };
  }, [publicKey, inputMint, outputMint, onSuccess, connection]);

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-teal-300/30 bg-slate-900/40 backdrop-blur-sm overflow-hidden w-full"
      style={{ minHeight: '650px', width: '100%' }}
    >
      <div 
        id="jupiter-terminal-container" 
        className="w-full"
        style={{ minHeight: '650px', width: '100%' }}
      />
    </div>
  );
}
