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
  const initializationAttemptedRef = useRef(false);

  useEffect(() => {
    // Load Jupiter Terminal script
    const loadScript = async () => {
      if (jupiterScriptLoaded && scriptLoadedRef.current) {
        console.log('Jupiter script already fully loaded, attempting initialization');
      } else if (!scriptLoadedRef.current) {
        console.log('Loading Jupiter Terminal script...');
        
        return new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://terminal.jup.ag/main-v3.js';
          script.async = true;
          
          script.onload = () => {
            scriptLoadedRef.current = true;
            jupiterScriptLoaded = true;
            console.log('Jupiter Terminal script loaded successfully');
            resolve();
          };
          
          script.onerror = () => {
            console.error('Failed to load Jupiter Terminal script');
            scriptLoadedRef.current = false;
            resolve();
          };
          
          document.body.appendChild(script);
        });
      }
    };

    const initializeTerminal = async () => {
      // Prevent multiple initialization attempts
      if (initializationAttemptedRef.current) {
        console.log('Terminal initialization already attempted');
        return;
      }
      initializationAttemptedRef.current = true;

      // Wait for script to load
      await loadScript();

      // Wait for window.Jupiter to become available
      let retries = 0;
      while (!window.Jupiter && retries < 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
      }

      if (!window.Jupiter) {
        console.error('Jupiter did not load after retries');
        return;
      }

      if (containerRef.current && !terminalRef.current) {
        try {
          console.log('Initializing Jupiter Terminal...');
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
          console.log('Jupiter Terminal initialized successfully');

          // Handle successful transactions
          if (onSuccess && typeof window !== 'undefined') {
            const handleSuccess = (event: any) => {
              if (event.detail?.signature) {
                console.log('Transaction success:', event.detail.signature);
                onSuccess(event.detail.signature);
              }
            };
            window.addEventListener('jupiterSuccess', handleSuccess);
          }
        } catch (error) {
          console.error('Failed to initialize Jupiter Terminal:', error);
          initializationAttemptedRef.current = false; // Reset to retry
        }
      }
    };

    initializeTerminal();

    return () => {
      // Cleanup
      if (onSuccess && typeof window !== 'undefined') {
        window.removeEventListener('jupiterSuccess', () => {});
      }
    };
  }, [inputMint, outputMint, onSuccess]);

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
