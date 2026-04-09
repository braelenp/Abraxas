import { useEffect, useRef } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

interface JupiterWidgetProps {
  inputMint?: string;
  outputMint?: string;
  onSuccess?: (txSignature: string) => void;
}

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

  useEffect(() => {
    // Load Jupiter Terminal script
    const script = document.createElement('script');
    script.src = 'https://terminal.jup.ag/main-v3.js';
    script.async = true;
    script.onload = async () => {
      if (containerRef.current && window.Jupiter) {
        try {
          // Initialize Jupiter Terminal
          const terminal = window.Jupiter.Terminal.load({
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

          // Handle successful transactions
          if (onSuccess && typeof window !== 'undefined') {
            window.addEventListener('jupiterSuccess', (event: any) => {
              if (event.detail?.signature) {
                onSuccess(event.detail.signature);
              }
            });
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
      // Cleanup
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      if (typeof window !== 'undefined') {
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
