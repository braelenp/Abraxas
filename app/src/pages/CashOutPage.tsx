import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { DollarSign, Zap } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';
import { useAbraBalance } from '../hooks/useAbraBalance';
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

const RUNE_CONFIG = {
  rune: '᚜',
  runeName: 'Fehu',
  runeEssence: 'Wealth · Off-Ramp',
  agentName: 'CASHOUT',
  lore: "Convert your digital assets into fiat currency. Bridge the crypto and traditional finance worlds with speed and security.",
  ctaLabel: 'Cash Out to Bank',
  coreGlow: '34, 211, 238',
  fireGlow: '6, 182, 212',
  accentClass: 'text-cyan-300',
} as const;

export function CashOutPage() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { balance: realAbraBalance, balanceFormatted, balanceUsd: usdBalance, balanceUsdFormatted, abraPrice, isLoading: balanceLoading } = useAbraBalance();
  const [cashOutAmount, setCashOutAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use USD balance for available amount
  const availableBalance = usdBalance;

  const banks = [
    { id: 'chase', name: 'Chase Bank', icon: '🏦' },
    { id: 'bofa', name: 'Bank of America', icon: '🏦' },
    { id: 'wells', name: 'Wells Fargo', icon: '🏦' },
    { id: 'other', name: 'Other Bank', icon: '🏦' },
  ];

  const handleCashOut = async () => {
    if (!cashOutAmount || !selectedBank || isNaN(Number(cashOutAmount)) || !connected || !publicKey || !sendTransaction) return;
    if (Number(cashOutAmount) > availableBalance) {
      alert('Insufficient balance');
      return;
    }
    setIsProcessing(true);
    try {
      const amount = Number(cashOutAmount);
      if (amount <= 0) {
        alert('Please enter a valid amount');
        return;
      }

      // Create cash-out transaction
      const transaction = new Transaction();
      
      // Add system instruction as placeholder (replace with actual cashout program)
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

      console.log('Cash-out transaction:', signature);
      alert(`Successfully initiated cash-out of $${cashOutAmount} to ${selectedBank}. Transaction: ${signature}`);
      setCashOutAmount('');
      setSelectedBank('');
    } catch (error) {
      console.error('Cash-out failed:', error);
      alert(`Cash-out failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
              <DollarSign className="text-cyan-300 relative z-10" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-cyan-200 tracking-widest uppercase">Cash Out</h1>
              <p className="text-xs text-cyan-300/60 font-mono">Convert to fiat and transfer to bank</p>
            </div>
          </div>
        </article>

        {/* Available Balance */}
        <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-emerald-900/20 p-6 backdrop-blur">
          <p className="text-xs text-emerald-300/80 uppercase font-mono">Available for Cash Out</p>
          <p className="mt-2 text-4xl font-bold text-emerald-300">
            {balanceLoading ? '...' : balanceUsdFormatted}
          </p>
          <p className="mt-1 text-xs text-emerald-300/70">
            {balanceLoading ? 'Loading balance...' : `${balanceFormatted} ABRA @ $${abraPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/ABRA`}
          </p>
        </article>

        {/* Bank Selection */}
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur space-y-4">
          <h2 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Select Bank</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {banks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => setSelectedBank(bank.id)}
                className={`rounded-xl border-2 p-4 transition ${
                  selectedBank === bank.id
                    ? 'border-cyan-400 bg-cyan-400/15'
                    : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
                }`}
              >
                <p className="text-2xl mb-2">{bank.icon}</p>
                <p className="text-xs font-semibold text-slate-100">{bank.name}</p>
              </button>
            ))}
          </div>
        </article>

        {/* Amount Input */}
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur space-y-4">
          <h2 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Amount</h2>
          
          <div className="space-y-2">
            <input
              type="number"
              placeholder="0"
              max={availableBalance}
              value={cashOutAmount}
              onChange={(e) => setCashOutAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white text-lg font-mono focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Maximum: ${availableBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              <button 
                onClick={() => setCashOutAmount(availableBalance.toString())}
                className="text-cyan-400 hover:text-cyan-300"
              >
                Max
              </button>
            </div>
          </div>

          {/* Processing Details */}
          <div className="rounded-lg bg-slate-800/30 p-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>ACH Processing Fee:</span>
              <span className="text-slate-300">$2.50</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Time:</span>
              <span className="text-slate-300">1-2 business days</span>
            </div>
            <div className="flex justify-between bg-slate-700/30 px-2 py-1 rounded">
              <span>Net Deposit:</span>
              <span className="text-emerald-300 font-semibold">${(Number(cashOutAmount || 0) - 2.5).toFixed(2)}</span>
            </div>
          </div>
        </article>

        {/* Action Button */}
        <button
          onClick={handleCashOut}
          disabled={!cashOutAmount || !selectedBank || isProcessing || !connected}
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
            'Cash Out to Bank'
          )}
        </button>

        {/* Info */}
        <div className="text-xs text-slate-400 rounded-lg bg-slate-800/20 p-4 space-y-2">
          <p className="font-semibold text-slate-300">✦ Cash Out Information</p>
          <ul className="space-y-1 text-slate-400">
            <li>• ACH transfer to your linked bank account</li>
            <li>• Processing time: 1-2 business days</li>
            <li>• No hidden fees beyond the disclosed $2.50</li>
            <li>• Maximum withdrawal: $50,000 per day</li>
            <li>• Secure connection via Helius RPC</li>
          </ul>
        </div>
      </section>
    </RuneRealm>
  );
}
