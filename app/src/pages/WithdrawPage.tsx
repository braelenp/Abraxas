import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { ArrowUpFromLine, Zap } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

const RUNE_CONFIG = {
  rune: '᚜',
  runeName: 'Wunjo',
  runeEssence: 'Joy · Withdrawal',
  agentName: 'WITHDRAW',
  lore: "Withdraw capital from your account. Access your funds, harvest rewards, and exit positions with precision.",
  ctaLabel: 'Claim Your Capital',
  coreGlow: '34, 211, 238',
  fireGlow: '6, 182, 212',
  accentClass: 'text-cyan-300',
} as const;

export function WithdrawPage() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'solana' | 'fiat'>('solana');
  const [isProcessing, setIsProcessing] = useState(false);
  const accountBalance = 5240; // Mock balance

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount)) || !connected || !publicKey || !sendTransaction) return;
    if (Number(withdrawAmount) > accountBalance) {
      alert('Insufficient balance');
      return;
    }
    setIsProcessing(true);
    try {
      const amount = Number(withdrawAmount);
      if (amount <= 0) {
        alert('Please enter a valid amount');
        return;
      }

      // Create withdrawal transaction
      const transaction = new Transaction();
      
      // Add system instruction as placeholder (replace with actual withdrawal program)
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('11111111111111111111111111111111'),
          lamports: 1000, // Minimal for demo
        })
      );

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
      });

      console.log('Withdrawal transaction:', signature);
      alert(`Successfully withdrew $${withdrawAmount}. Transaction: ${signature}`);
      setWithdrawAmount('');
    } catch (error) {
      console.error('Withdrawal failed:', error);
      alert(`Withdrawal failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <RuneRealm {...RUNE_CONFIG}>
      <section className="space-y-6 max-w-2xl">
        {/* Header */}
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg" />
              <ArrowUpFromLine className="text-cyan-300 relative z-10" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-cyan-200 tracking-widest uppercase">Withdraw</h1>
              <p className="text-xs text-cyan-300/60 font-mono">Extract capital from your account</p>
            </div>
          </div>
        </article>

        {/* Account Balance */}
        <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-emerald-900/20 p-6 backdrop-blur">
          <p className="text-xs text-emerald-300/80 uppercase font-mono">Available Balance</p>
          <p className="mt-2 text-4xl font-bold text-emerald-300">${accountBalance.toLocaleString()}</p>
          <p className="mt-1 text-xs text-emerald-300/70">Ready to withdraw</p>
        </article>

        {/* Withdrawal Methods */}
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur space-y-4">
          <h2 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Withdrawal Method</h2>
          
          <div className="space-y-3">
            {/* Solana Transfer */}
            <button
              onClick={() => setSelectedMethod('solana')}
              className={`w-full rounded-xl border-2 p-4 transition ${
                selectedMethod === 'solana'
                  ? 'border-cyan-400 bg-cyan-400/15'
                  : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="text-left">
                  <p className="font-semibold text-cyan-100">Solana Wallet</p>
                  <p className="text-xs text-slate-400 mt-1">Receive SOL to your external wallet instantly</p>
                </div>
                <div className="text-xs font-mono text-slate-400">FAST</div>
              </div>
            </button>

            {/* Bank Transfer */}
            <button
              onClick={() => setSelectedMethod('fiat')}
              className={`w-full rounded-xl border-2 p-4 transition ${
                selectedMethod === 'fiat'
                  ? 'border-cyan-400 bg-cyan-400/15'
                  : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="text-left">
                  <p className="font-semibold text-cyan-100">Bank Transfer</p>
                  <p className="text-xs text-slate-400 mt-1">Send USD to your linked bank account (1-2 days)</p>
                </div>
                <div className="text-xs font-mono text-slate-400">1-2 DAYS</div>
              </div>
            </button>
          </div>
        </article>

        {/* Amount Input */}
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur space-y-4">
          <h2 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Amount</h2>
          
          <div className="space-y-2">
            <input
              type="number"
              placeholder="0"
              max={accountBalance}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white text-lg font-mono focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Maximum: ${accountBalance.toLocaleString()}</span>
              <button className="text-cyan-400 hover:text-cyan-300">Max</button>
            </div>
          </div>

          {/* Processing Fee */}
          <div className="rounded-lg bg-slate-800/30 p-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Withdrawal Fee:</span>
              <span className="text-slate-300">1%</span>
            </div>
            <div className="flex justify-between text-emerald-300 font-semibold">
              <span>You Receive:</span>
              <span>${(Number(withdrawAmount || 0) * 0.99).toFixed(2)}</span>
            </div>
          </div>
        </article>

        {/* Action Button */}
        <button
          onClick={handleWithdraw}
          disabled={!withdrawAmount || isProcessing || !connected}
          className="w-full rounded-xl border border-emerald-400/60 bg-emerald-400/20 px-4 py-4 text-sm font-bold uppercase tracking-wider text-emerald-100 shadow-[0_0_16px_rgba(34,197,94,0.2)] transition hover:border-emerald-400/80 hover:bg-emerald-400/30 hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] disabled:opacity-50"
        >
          {!connected ? (
            'Connect Wallet'
          ) : isProcessing ? (
            <>
              <Zap size={16} className="inline mr-2 animate-pulse" />
              Processing...
            </>
          ) : (
            'Withdraw'
          )}
        </button>

        {/* Info */}
        <div className="text-xs text-slate-400 rounded-lg bg-slate-800/20 p-4 space-y-2">
          <p className="font-semibold text-slate-300">✦ Withdrawal Information</p>
          <ul className="space-y-1 text-slate-400">
            <li>• Withdrawals processed within 24 hours</li>
            <li>• No lock-in period required</li>
            <li>• Active stakes must mature before withdrawal</li>
            <li>• Instant confirmation via Helius RPC</li>
          </ul>
        </div>
      </section>
    </RuneRealm>
  );
}
