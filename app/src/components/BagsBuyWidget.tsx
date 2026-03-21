import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { SOLANA_RPC_ENDPOINT } from '../lib/solana';
import { Connection } from '@solana/web3.js';


export function BagsBuyWidget({ tokenAddress, compact = false }: { tokenAddress: string; compact?: boolean }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { publicKey, signTransaction, connected, connect } = useWallet();

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!connected) {
        await connect();
        setLoading(false);
        return;
      }
      if (!publicKey || !signTransaction) {
        setError('Wallet not ready.');
        setLoading(false);
        return;
      }
      const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');
      const lamports = Math.max(1, Number(amount)) * 1000000; // 0.001 SOL per unit (for demo)
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(tokenAddress),
          lamports,
        })
      );
      // Set recent blockhash and fee payer
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;
      const signed = await signTransaction(tx);
      const sig = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(sig, 'confirmed');
      setSuccess(true);
      setAmount('');
    } catch (e: any) {
      setError(e?.message || 'Failed to buy ABRA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bags-buy-widget rounded-xl border border-cyan-300/30 bg-slate-900/80 ${compact ? 'p-3' : 'p-4'}`}>
      <h3 className={`${compact ? 'mb-1 text-xs' : 'mb-2 text-sm'} font-bold text-cyan-200`}>Buy ABRA Instantly</h3>
      <div className={`flex flex-col gap-2 ${compact ? 'mb-1' : 'mb-2'}`}>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          className={`rounded-lg bg-slate-950 border border-cyan-300/20 text-white placeholder:text-cyan-200/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 px-3 py-2'}`}
        />
        <button
          onClick={handleBuy}
          disabled={!amount || loading}
          className={`ui-action rounded-lg border border-cyan-400/45 bg-cyan-500/25 text-cyan-100 font-semibold hover:bg-cyan-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${compact ? 'h-10 px-3 py-2 text-xs' : 'h-11 min-w-[6.5rem] px-4 py-2 text-sm'}`}
        >
          {loading ? 'Processing...' : 'Buy ABRA'}
        </button>
      </div>
      {success && <p className="text-green-300 text-xs mt-1">Purchase successful!</p>}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      <p className={`${compact ? 'mt-1 text-[10px]' : 'mt-2 text-xs'} text-cyan-200/70`}>Powered by BAGS API</p>
    </div>
  );
}
