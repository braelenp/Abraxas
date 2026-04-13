import { useWallet } from '@solana/wallet-adapter-react';
import { Zap } from 'lucide-react';
import { useState, useRef } from 'react';
import { BagsBuyWidget } from '../components/BagsBuyWidget';
import { EmbeddedPhantomSwap } from '../components/EmbeddedPhantomSwap';

const ABRA_TOKEN_CA = import.meta.env.VITE_ABRA_TOKEN_CONTRACT_ADDRESS?.trim() || '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const ABRA_BAGS_MARKET_URL = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || `https://bags.fm/${ABRA_TOKEN_CA}`;

export function TradePage() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState<'jupiter' | 'bags'>('jupiter');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: 'jupiter' | 'bags') => {
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
      {/* Welcome Header */}
      <div className="rounded-2xl border border-teal-300/20 bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-6 backdrop-blur">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="h-6 w-6 text-teal-300" />
          <h1 className="text-2xl font-bold text-teal-200">⚡ Get ABRA Tokens</h1>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">
          Buy ABRA tokens right here in one click. We've made it super simple with two easy options — pick the one that works best for you.
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
          Swap
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
      </div>

      {/* Embedded Phantom Swap */}
      <div style={{ display: activeTab === 'jupiter' ? 'block' : 'none' }}>
        <EmbeddedPhantomSwap />
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

      {/* Info Panel */}
      <div className="rounded-xl border border-teal-300/20 bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-4 backdrop-blur">
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <span className="text-teal-400 font-bold text-lg leading-none mt-0.5">1️⃣</span>
            <div>
              <strong>Phantom Swap:</strong> Sign with your wallet. Tokens stay with you the whole time.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal-400 font-bold text-lg leading-none mt-0.5">2️⃣</span>
            <div>
              <strong>Bags (No Fees):</strong> Even cheaper option. Zero trading fees, instant settlement.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-cyan-400 font-bold text-lg leading-none mt-0.5">✓</span>
            <div>
              All transactions happen directly on-chain. We never hold your tokens.
            </div>
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
