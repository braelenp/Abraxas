import { useWallet } from '@solana/wallet-adapter-react';
import { ExternalLink, Zap } from 'lucide-react';
import { BagsBuyWidget } from '../components/BagsBuyWidget';

const ABRA_TOKEN_CA = import.meta.env.VITE_ABRA_TOKEN_CONTRACT_ADDRESS?.trim() || '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const ABRA_BAGS_MARKET_URL = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || `https://bags.fm/${ABRA_TOKEN_CA}`;

interface BuyOption {
  id: string;
  label: string;
  description: string;
  fee: string;
  route: 'jupiter' | 'bags';
}

const BUY_OPTIONS: BuyOption[] = [
  {
    id: 'jupiter',
    label: 'Buy via Jupiter',
    description: 'Swap SOL to ABRA through Jupiter DEX aggregator',
    fee: '~0.1% (variable)',
    route: 'jupiter',
  },
  {
    id: 'bags',
    label: 'Buy via Bags',
    description: 'Direct swap on Bags DEX - zero fees',
    fee: '0%',
    route: 'bags',
  },
];

export function TradePage() {
  const { connected } = useWallet();

  const handleBuyViaBags = () => {
    window.open(ABRA_BAGS_MARKET_URL, '_blank');
  };

  const handleBuyViaJupiter = () => {
    // Open Jupiter swap interface for ABRA
    // Route: SOL → ABRA
    const jupiterUrl = `https://jup.ag/swap/SOL-${ABRA_TOKEN_CA}`;
    window.open(jupiterUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header */}
      <div className="rounded-xl border border-teal-300/30 bg-teal-900/20 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-teal-300" />
          <h1 className="text-lg font-bold text-teal-300">Buy ABRA</h1>
        </div>
        <p className="text-xs text-slate-300">
          Choose your preferred method to acquire ABRA tokens. Both routes lead directly to the exchange interface.
        </p>
      </div>

      {/* Buying Options Grid */}
      <div className="space-y-3">
        {BUY_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              if (option.route === 'bags') {
                handleBuyViaBags();
              } else if (option.route === 'jupiter') {
                handleBuyViaJupiter();
              }
            }}
            className="w-full rounded-xl border border-teal-300/40 bg-gradient-to-r from-teal-900/30 to-cyan-900/30 p-4 transition hover:border-teal-300/70 hover:bg-teal-900/40 active:scale-95"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-teal-200">{option.label}</h3>
                  <ExternalLink className="h-4 w-4 text-teal-300/60" />
                </div>
                <p className="text-xs text-slate-400 mt-1">{option.description}</p>
                <div className="text-[11px] font-mono text-teal-300/80 mt-2">Fee: {option.fee}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bags Buy Widget */}
      <div className="mt-4">
        <div className="rounded-xl border border-emerald-300/30 bg-emerald-900/20 p-4 backdrop-blur-sm mb-4">
          <h2 className="text-sm font-bold text-emerald-300 mb-2">Quick Swap on Bags</h2>
          <p className="text-xs text-slate-400">
            Use the widget below for a direct, zero-fee swap within the dApp.
          </p>
        </div>
        <BagsBuyWidget tokenAddress={ABRA_TOKEN_CA} />
      </div>

      {/* Info Panel */}
      <div className="rounded-xl border border-cyan-300/20 bg-cyan-900/10 p-4 backdrop-blur-sm">
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold mt-0.5">→</span>
            <span>Jupiter: Use this for best routing through multiple DEX liquidity pools</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold mt-0.5">→</span>
            <span>Bags: Zero-fee direct swap - recommended for cost efficiency</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold mt-0.5">→</span>
            <span>Both routes execute immediately without leaving the Solana network</span>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      {!connected && (
        <div className="rounded-xl border border-amber-300/40 bg-amber-900/20 p-4 backdrop-blur-sm">
          <p className="text-xs text-amber-200">
            Connect your wallet to buy ABRA or use external links above to get started.
          </p>
        </div>
      )}
    </div>
  );
}
