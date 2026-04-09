import { MoonPayProvider, MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { CreditCard, AlertCircle } from 'lucide-react';

interface MoonPayWidgetProps {
  tokenAddress?: string;
}

const MOONPAY_API_KEY = import.meta.env.VITE_MOONPAY_API_KEY;

/**
 * MoonPayWidget - Fiat on-ramp for purchasing ABRA with credit card, bank transfer, etc.
 * Allows users to buy crypto directly without needing SOL first
 */
export function MoonPayWidget({ tokenAddress = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS' }: MoonPayWidgetProps) {
  const { publicKey, connected } = useWallet();

  if (!MOONPAY_API_KEY) {
    return (
      <div className="rounded-xl border border-amber-300/40 bg-amber-900/20 p-4 backdrop-blur-sm flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-amber-200 font-semibold">MoonPay not configured</p>
          <p className="text-xs text-amber-300/80 mt-1">
            Set VITE_MOONPAY_API_KEY in your environment to enable fiat purchases
          </p>
        </div>
      </div>
    );
  }

  if (!connected || !publicKey) {
    return (
      <div className="rounded-xl border border-amber-300/40 bg-amber-900/20 p-4 backdrop-blur-sm flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200">Connect your wallet to buy ABRA with fiat currency</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-300/30 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-b border-emerald-300/20 p-4 flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-emerald-400" />
        <h3 className="font-semibold text-emerald-200">Buy with Fiat</h3>
      </div>

      {/* Info Banner */}
      <div className="bg-emerald-900/20 border-b border-emerald-300/20 p-3 mx-4 mt-4 rounded-lg">
        <p className="text-xs text-emerald-200">
          💳 Buy ABRA directly with credit card, debit card, or bank transfer. No SOL needed!
        </p>
      </div>

      {/* MoonPay Widget Container */}
      <div className="p-4 flex justify-center">
        <MoonPayProvider apiKey={MOONPAY_API_KEY}>
          <MoonPayBuyWidget
            variant="embedded"
            baseCurrencyCode="usd"
            baseCurrencyAmount="100"
            walletAddress={publicKey.toString()}
            redirectURL={typeof window !== 'undefined' ? window.location.href : undefined}
          />
        </MoonPayProvider>
      </div>

      {/* Info Footer */}
      <div className="text-xs text-slate-400 p-4 border-t border-slate-700/50 space-y-1">
        <p>• Instant purchase with card or bank transfer</p>
        <p>• ABRA delivered directly to your wallet</p>
        <p>• Regulated and compliant globally</p>
      </div>
    </div>
  );
}
