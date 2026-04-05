import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ArrowDownToLine, Zap } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';

const RUNE_CONFIG = {
  rune: '᚛',
  runeName: 'Dagaz',
  runeEssence: 'Day · Awakening',
  agentName: 'DEPOSIT',
  lore: "Deposit capital into your account. Fund vaults, stake positions, and activate yield cycles.",
  ctaLabel: 'Fund Your Account',
  coreGlow: '34, 211, 238',
  fireGlow: '6, 182, 212',
  accentClass: 'text-cyan-300',
} as const;

export function DepositPage() {
  const { connected } = useWallet();
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'solana' | 'transfer'>('solana');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposit = async () => {
    if (!depositAmount || isNaN(Number(depositAmount))) return;
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Deposited $${depositAmount}`);
      setDepositAmount('');
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
              <ArrowDownToLine className="text-cyan-300 relative z-10" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-cyan-200 tracking-widest uppercase">Deposit</h1>
              <p className="text-xs text-cyan-300/60 font-mono">Add capital to your account</p>
            </div>
          </div>
        </article>

        {/* Deposit Methods */}
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur space-y-4">
          <h2 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Deposit Method</h2>
          
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
                  <p className="font-semibold text-cyan-100">Solana Wallet Transfer</p>
                  <p className="text-xs text-slate-400 mt-1">Send SOL from your external wallet</p>
                </div>
                <div className="text-xs font-mono text-slate-400">SOLANA</div>
              </div>
            </button>

            {/* Bank Transfer / Card */}
            <button
              onClick={() => setSelectedMethod('transfer')}
              className={`w-full rounded-xl border-2 p-4 transition ${
                selectedMethod === 'transfer'
                  ? 'border-cyan-400 bg-cyan-400/15'
                  : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="text-left">
                  <p className="font-semibold text-cyan-100">Wire / ACH Transfer</p>
                  <p className="text-xs text-slate-400 mt-1">Deposit fiat directly to your account</p>
                </div>
                <div className="text-xs font-mono text-slate-400">USD</div>
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
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white text-lg font-mono focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Minimum: $100</span>
              <button className="text-cyan-400 hover:text-cyan-300">Max</button>
            </div>
          </div>

          {/* Processing Fee */}
          <div className="rounded-lg bg-slate-800/30 p-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Processing Fee:</span>
              <span className="text-slate-300">2.5%</span>
            </div>
            <div className="flex justify-between text-cyan-300 font-semibold">
              <span>You Receive:</span>
              <span>${(Number(depositAmount || 0) * 0.975).toFixed(2)}</span>
            </div>
          </div>
        </article>

        {/* Action Button */}
        <button
          onClick={handleDeposit}
          disabled={!depositAmount || isProcessing || !connected}
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
            'Deposit'
          )}
        </button>

        {/* Info */}
        <div className="text-xs text-slate-400 rounded-lg bg-slate-800/20 p-4 space-y-2">
          <p className="font-semibold text-slate-300">✦ Deposit Information</p>
          <ul className="space-y-1 text-slate-400">
            <li>• Deposits appear instantly after confirmation</li>
            <li>• No withdrawal lock-in period</li>
            <li>• Earn yield immediately on vault positions</li>
            <li>• Supported networks: Solana mainnet</li>
          </ul>
        </div>
      </section>
    </RuneRealm>
  );
}
