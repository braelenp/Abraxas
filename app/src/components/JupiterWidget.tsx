import { useEffect, useRef } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

interface JupiterWidgetProps {
  inputMint?: string;
  outputMint?: string;
  onSuccess?: (txSignature: string) => void;
}

// Global flag to ensure script is only loaded once
let jupiterScriptLoaded = false;

declare global {
  namespace Jupiter {
    interface Terminal {
      load(params: {
        displayMode: 'integrated' | 'modal';
        integratedTargetId: string;
        endpoint?: string;
        formProps?: {
          fixedInputMint?: boolean;
          fixedOutputMint?: boolean;
          initialInputMint?: string;
          initialOutputMint?: string;
        };
      }): Promise<void>;
    }
  }
}

/**
 * JupiterWidget - Integrates Jupiter Terminal directly into Abraxas
 * Provides embedded DEX swap interface without leaving the dApp
 * Keeps script loaded permanently to prevent scroll jumping on tab changes
 */
export function JupiterWidget({
  inputMint = 'So11111111111111111111111111111111111111112', // SOL
  outputMint = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS', // ABRA
  onSuccess,
}: JupiterWidgetProps) {
  const { publicKey, sendTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load script once globally
    if (jupiterScriptLoaded || scriptLoadedRef.current) {
      // Script already loaded in this or another instance
      console.log('Jupiter script already loaded');
      return;
    }

    // Load Jupiter Terminal script once
    const script = document.createElement('script');
    script.src = 'https://terminal.jup.ag/main-v3.js';
    script.async = true;
    script.onload = async () => {
      scriptLoadedRef.current = true;
      jupiterScriptLoaded = true;
      console.log('Jupiter Terminal script loaded');

      if (containerRef.current && window.Jupiter) {
        try {
          // Initialize Jupiter Terminal only once
          if (!terminalRef.current) {
            const terminal = await window.Jupiter.Terminal.load({
              displayMode: 'integrated',
              integratedTargetId: 'jupiter-terminal-container',
              endpoint: import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
              formProps: {
                fixedOutputMint: true,
                initialInputMint: inputMint,
                initialOutputMint: outputMint,
              },
            });

            terminalRef.current = terminal;
            console.log('Jupiter Terminal initialized');
          }

          // Handle successful transactions
          if (onSuccess && typeof window !== 'undefined') {
            const handleSuccess = (event: any) => {
              if (event.detail?.signature) {
                onSuccess(event.detail.signature);
              }
            };
            // Remove old listener if exists to prevent duplicates
            window.removeEventListener('jupiterSuccess', handleSuccess);
            window.addEventListener('jupiterSuccess', handleSuccess);
          }
        } catch (error) {
          console.error('Failed to initialize Jupiter Terminal:', error);
        }
      }
    };
    script.onerror = () => {
      console.error('Failed to load Jupiter Terminal script');
    };

    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount since we're keeping it loaded
      // Only cleanup listeners if component unmounts
      if (onSuccess && typeof window !== 'undefined') {
        window.removeEventListener('jupiterSuccess', () => {});
      }
    };
  }, []); // Empty dependency array - load script only once

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-teal-300/30 bg-slate-900/40 backdrop-blur-sm overflow-hidden"
    >
      <div id="jupiter-terminal-container" className="min-h-[600px] w-full" />
    </div>
  );
}

// Prevent TypeScript errors by extending global Window interface
declare global {
  interface Window {
    Jupiter: {
      Terminal: {
        load: (params: any) => Promise<any>;
      };
    };
  }
}
