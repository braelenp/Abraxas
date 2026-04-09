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
    const loadJupiterScript = () => {
      return new Promise<void>((resolve) => {
        // Skip if already loaded
        if (window.Jupiter) {
          console.log('Jupiter already available globally');
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://terminal.jup.ag/main-v3.js';
        script.async = true;

        script.onload = () => {
          console.log('Jupiter script loaded');
          resolve();
        };

        script.onerror = (error) => {
          console.error('Failed to load Jupiter script:', error);
          resolve();
        };

        document.head.appendChild(script);
      });
    };

    const initializeTerminal = async () => {
      try {
        // Load the script
        await loadJupiterScript();

        // Wait for window.Jupiter with retry
        let attempts = 0;
        while (!window.Jupiter && attempts < 30) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          attempts++;
        }

        if (!window.Jupiter) {
          console.error('Jupiter Terminal failed to load');
          return;
        }

        // Ensure the target container exists
        const targetContainer = document.getElementById('jupiter-terminal-container');
        if (!targetContainer) {
          console.error('Target container not found');
          return;
        }

        // Initialize Jupiter Terminal
        console.log('Loading Jupiter Terminal...');
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
        console.log('Jupiter Terminal loaded successfully');

        // Listen for successful swaps
        if (onSuccess) {
          const handleSuccess = (e: any) => {
            if (e.detail?.signature) {
              console.log('Swap successful:', e.detail.signature);
              onSuccess(e.detail.signature);
            }
          };
          window.addEventListener('jupiterSuccess', handleSuccess);
        }
      } catch (error) {
        console.error('Terminal initialization error:', error);
      }
    };

    // Skip if already initialized
    if (!initializationAttemptedRef.current) {
      initializationAttemptedRef.current = true;
      initializeTerminal();
    }

    return () => {
      // Cleanup listeners
      if (onSuccess) {
        window.removeEventListener('jupiterSuccess', () => {});
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-teal-300/30 bg-slate-900/40 backdrop-blur-sm overflow-hidden w-full"
      style={{ minHeight: '600px', height: '100%' }}
    >
      <div id="jupiter-terminal-container" className="w-full h-full" style={{ minHeight: '600px' }} />
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
