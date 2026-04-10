import { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { validateNetworkForTrading } from '../lib/networkValidator';

/**
 * NetworkStatus - Shows network detection info for debugging
 */
export function NetworkStatus() {
  const { connection } = useConnection();
  const [status, setStatus] = useState<{
    isValid: boolean;
    cluster: string;
    message: string;
    rpcEndpoint: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        setLoading(true);
        const validation = await validateNetworkForTrading(connection);
        setStatus({
          ...validation,
          rpcEndpoint: connection.rpcEndpoint || 'unknown',
        });
      } catch (error) {
        console.error('Network status check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkNetwork();
  }, [connection]);

  if (loading || !status) {
    return (
      <div className="rounded-lg bg-slate-800/30 border border-slate-600/30 p-3">
        <p className="text-xs text-slate-400">Checking network...</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border p-3 ${
        status.isValid
          ? 'bg-emerald-900/20 border-emerald-300/30'
          : 'bg-red-900/20 border-red-300/30'
      }`}
    >
      <div className="flex gap-2">
        {status.isValid ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
        )}
        <div className="text-xs">
          <p className={status.isValid ? 'text-emerald-200' : 'text-red-200'}>
            {status.message}
          </p>
          <p className="text-slate-400 mt-1 font-mono text-[10px] break-all">
            RPC: {status.rpcEndpoint}
          </p>
          <p className="text-slate-400 font-mono text-[10px]">
            Cluster: {status.cluster}
          </p>
        </div>
      </div>
    </div>
  );
}
