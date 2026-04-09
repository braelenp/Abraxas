import { useWallet } from '@solana/wallet-adapter-react';
import { Zap, CreditCard } from 'lucide-react';
import { useState, useRef } from 'react';
import { BagsBuyWidget } from '../components/BagsBuyWidget';
import { JupiterSwapPanel } from '../components/JupiterSwapPanel';
import { MoonPayWidget } from '../components/MoonPayWidget';

const ABRA_TOKEN_CA = import.meta.env.VITE_ABRA_TOKEN_CONTRACT_ADDRESS?.trim() || '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const ABRA_BAGS_MARKET_URL = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || `https://bags.fm/${ABRA_TOKEN_CA}`;

export function TradePage() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState<'jupiter' | 'bags' | 'moonpay'>('jupiter');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: 'jupiter' | 'bags' | 'moonpay') => {
    setActiveTab(tab);
    // Prevent scroll jump by maintaining scroll position
    if (contentRef.current?.parentElement) {
      const scrollContainer = contentRef.current.parentElement;
      const scrollTop = scrollContainer.scrollTop;
      // Force a micro task to ensure DOM updates happen first
      Promise.resolve().then(() => {
        scrollContainer.scrollTop = scrollTop;
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4" ref={contentRef}>
      {/* Header */}
      <div className="rounded-xl border border-teal-300/30 bg-teal-900/20 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-teal-300" />
          <h1 className="text-lg font-bold text-teal-300">Buy ABRA</h1>
        </div>
        <p className="text-xs text-slate-300">
          Swap directly within Abraxas. Choose Jupiter for best routing or Bags for zero fees.
        </p>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-2 rounded-xl border border-cyan-300/20 bg-slate-900/40 p-1.5 backdrop-blur-sm">
        <button
          onClick={() => handleTabChange('jupiter')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            activeTab === 'jupiter'
              ? 'bg-teal-500/30 border border-teal-300/60 text-teal-200 shadow-lg shadow-teal-500/20'
              : 'text-slate-300 hover:text-slate-200'
          }`}
        >
          Jupiter Terminal
        </button>
        <button
          onClick={() => handleTabChange('bags')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            activeTab === 'bags'
              ? 'bg-emerald-500/30 border border-emerald-300/60 text-emerald-200 shadow-lg shadow-emerald-500/20'
              : 'text-slate-300 hover:text-slate-200'
          }`}
        >
          Bags (0% Fee)
        </button>
        <button
          onClick={() => handleTabChange('moonpay')}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
            activeTab === 'moonpay'
              ? 'bg-emerald-500/30 border border-emerald-300/60 text-emerald-200 shadow-lg shadow-emerald-500/20'
              : 'text-slate-300 hover:text-slate-200'
          }`}
        >
          Fiat (Visa/Bank)
        </button>
      </div>

      {/* Jupiter Swap Panel */}
      <div style={{ display: activeTab === 'jupiter' ? 'block' : 'none' }}>
        <JupiterSwapPanel />
      </div>

      {/* Bags Buy Widget - kept mounted, toggled with CSS */}
      <div style={{ display: activeTab === 'bags' ? 'block' : 'none' }}>
        <div className="mb-3 rounded-lg bg-emerald-900/20 border border-emerald-300/20 p-3">
          <p className="text-xs text-emerald-200">
            Bags offers zero-fee swaps with instant settlement on-chain. Recommended for best cost efficiency.
          </p>
        </div>
        <BagsBuyWidget tokenAddress={ABRA_TOKEN_CA} />
      </div>

      {/* MoonPay Fiat On-Ramp */}
      <div style={{ display: activeTab === 'moonpay' ? 'block' : 'none' }}>
        <MoonPayWidget tokenAddress={ABRA_TOKEN_CA} />
      </div>

      {/* Info Panel */}
      <div className="rounded-xl border border-cyan-300/20 bg-cyan-900/10 p-4 backdrop-blur-sm">
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold mt-0.5">→</span>
            <span><strong>Jupiter:</strong> Best rates through DEX aggregation (~0.1% fee)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold mt-0.5">→</span>
            <span><strong>Bags:</strong> Zero-fee direct swap - lowest cost option</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold mt-0.5">→</span>
            <span><strong>Fiat:</strong> Buy directly with credit card, debit card, or bank transfer</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold mt-0.5">→</span>
            <span>All transactions happen directly on-chain - no custody of your tokens</span>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      {!connected && (
        <div className="rounded-xl border border-amber-300/40 bg-amber-900/20 p-4 backdrop-blur-sm">
          <p className="text-xs text-amber-200">
            Connect your wallet to buy ABRA directly in this interface.
          </p>
        </div>
      )}
    </div>
  );
}
