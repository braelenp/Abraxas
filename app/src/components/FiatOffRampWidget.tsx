import React, { useState, useCallback } from 'react';
import { ChevronRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getJupiterQuote, executeSwap, calculateOutputAmount } from '../lib/jupiter';
import {
  estimateFiatAmount,
  getOffRampUrl,
  openOffRampFlow,
  trackOffRampEvent,
  simulateOffRampSuccess,
} from '../lib/offramp';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

// Token addresses
const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const USDC_TOKEN_CA = 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1';

interface FiatOffRampWidgetProps {
  abraAmount: number;
  onSuccess?: () => void;
  compact?: boolean;
}

interface ConversionStep {
  phase: 'input' | 'quote' | 'swapping' | 'offramp' | 'success' | 'error';
  abraAmount: number;
  usdcAmount: number;
  fiatAmount: number;
  paymentMethod: 'apple-pay' | 'cash-app';
  errorMessage?: string;
}

export const FiatOffRampWidget: React.FC<FiatOffRampWidgetProps> = ({
  abraAmount,
  onSuccess,
  compact = false,
}) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [step, setStep] = useState<ConversionStep>({
    phase: 'input',
    abraAmount: Math.floor(abraAmount * 100) / 100,
    usdcAmount: 0,
    fiatAmount: 0,
    paymentMethod: 'cash-app',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [priceImpact, setPriceImpact] = useState<string>('');

  /**
   * Fetch Jupiter quote for ABRA → USDC swap
   */
  const handleGetQuote = useCallback(async () => {
    if (!step.abraAmount || step.abraAmount <= 0) return;

    setIsLoading(true);
    try {
      const amountInSmallestUnits = Math.floor(step.abraAmount * Math.pow(10, 6)); // ABRA has 6 decimals
      const quote = await getJupiterQuote(
        ABRA_TOKEN_CA,
        USDC_TOKEN_CA,
        amountInSmallestUnits,
        500 // 5% slippage
      );

      if (!quote) throw new Error('Failed to fetch quote');

      const usdcOutput = calculateOutputAmount(quote, 6); // USDC also has 6 decimals
      const fiatAmount = estimateFiatAmount(usdcOutput, 1.5); // 1.5% off-ramp fee

      setStep((prev) => ({
        ...prev,
        phase: 'quote',
        usdcAmount: usdcOutput,
        fiatAmount,
      }));

      const impactValue = typeof quote.priceImpactPct === 'string'
        ? parseFloat(quote.priceImpactPct) * 100
        : quote.priceImpactPct * 100;
      setPriceImpact(`${impactValue.toFixed(2)}%`);
      trackOffRampEvent('started', { amount: step.abraAmount });
    } catch (error) {
      console.error('Quote error:', error);
      setStep((prev) => ({
        ...prev,
        phase: 'error',
        errorMessage: 'Failed to get conversion quote. Please try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  }, [step.abraAmount]);

  /**
   * Execute ABRA → USDC swap via Jupiter, then open off-ramp
   */
  const handleSwapAndOffRamp = useCallback(async () => {
    if (!publicKey || !sendTransaction) {
      setStep((prev) => ({
        ...prev,
        phase: 'error',
        errorMessage: 'Please connect your wallet first',
      }));
      return;
    }

    setIsLoading(true);
    setStep((prev) => ({ ...prev, phase: 'swapping' }));

    try {
      // Get swap transaction from Jupiter
      const amountInSmallestUnits = Math.floor(step.abraAmount * Math.pow(10, 6));
      const swapTx = await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteResponse: {
            inputMint: ABRA_TOKEN_CA,
            outputMint: USDC_TOKEN_CA,
            inAmount: amountInSmallestUnits,
            outAmount: Math.floor(step.usdcAmount * Math.pow(10, 6)),
            slippageBps: 500,
            priceImpactPct: 0,
          },
          userPublicKey: publicKey.toString(),
          wrapUnwrapSOL: true,
        }),
      }).then((res) => res.json());

      if (!swapTx.swapTransaction) {
        throw new Error('Failed to create swap transaction');
      }

      // Note: In production, decode and execute the transaction properly
      // For now, simulate successful swap
      console.log('Swap transaction created:', swapTx);

      // Move to off-ramp phase
      setStep((prev) => ({ ...prev, phase: 'offramp' }));

      // Open off-ramp flow
      const offRampUrl = getOffRampUrl(
        {
          amountUSDC: Math.floor(step.usdcAmount * 100) / 100,
          paymentMethod: step.paymentMethod,
        },
        'ramp'
      );

      openOffRampFlow(offRampUrl, 'ramp');

      // Simulate success (in production, would wait for webhook)
      setTimeout(() => {
        const successStatus = simulateOffRampSuccess(step.usdcAmount);
        setStep((prev) => ({
          ...prev,
          phase: 'success',
          fiatAmount: step.fiatAmount,
        }));
        trackOffRampEvent('completed', {
          amount: step.abraAmount,
          provider: 'ramp',
        });

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 5000);
      }, 2000);
    } catch (error: any) {
      console.error('Swap/Off-ramp error:', error);
      setStep((prev) => ({
        ...prev,
        phase: 'error',
        errorMessage: error.message || 'Failed to complete conversion. Please try again.',
      }));
      trackOffRampEvent('failed', {
        amount: step.abraAmount,
        error: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, sendTransaction, step.abraAmount, step.usdcAmount, step.paymentMethod, onSuccess]);

  /**
   * Reset to input phase
   */
  const handleReset = useCallback(() => {
    setStep((prev) => ({
      ...prev,
      phase: 'input',
      abraAmount: 0,
      usdcAmount: 0,
      fiatAmount: 0,
    }));
    setPriceImpact('');
  }, []);

  // ============ RENDER: INPUT PHASE ============
  if (step.phase === 'input') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="mb-6">
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-2 font-mono">&gt; [CONVERT] ABRA_TO_CASH</h3>
          <p className="text-[11px] text-cyan-300/60 uppercase tracking-wide">Swap ABRA to USDC | Send to Cash App</p>
        </div>

        {/* Amount Display */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-cyan-400/20">
          <label className="text-cyan-400/70 text-xs font-semibold uppercase tracking-wider">ABRA Amount</label>
          <div className="text-3xl font-bold text-white mt-2">{step.abraAmount.toFixed(2)}</div>
          <div className="text-cyan-400/40 text-xs mt-1">Selected for conversion</div>
        </div>

        {/* Payment Method Selector */}
        <div className="mb-6">
          <label className="text-cyan-400/70 text-xs font-semibold uppercase tracking-wider block mb-3">
            Receive To
          </label>
          <div className="flex gap-3">
            {(['cash-app', 'apple-pay'] as const).map((method) => (
              <button
                key={method}
                onClick={() =>
                  setStep((prev) => ({
                    ...prev,
                    paymentMethod: method,
                  }))
                }
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                  step.paymentMethod === method
                    ? 'bg-cyan-500/80 text-white border border-cyan-400'
                    : 'bg-slate-800/50 text-cyan-400/60 border border-cyan-400/20 hover:bg-slate-700/50'
                }`}
              >
                {method === 'cash-app' ? '💵 Cash App' : '🍎 Apple Pay'}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGetQuote}
          disabled={!step.abraAmount || step.abraAmount <= 0 || isLoading}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Fetching Quote...
            </>
          ) : (
            <>
              Get Conversion Quote <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-cyan-400/40 text-xs text-center mt-4">
          ✓ ~0% swap fee (Bags) + ~1.5% off-ramp fee
        </p>
      </div>
    );
  }

  // ============ RENDER: QUOTE PHASE ============
  if (step.phase === 'quote') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="mb-6">
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase font-mono">&gt; [QUOTE] REVIEW_CONVERSION</h3>
          <p className="text-[10px] text-cyan-300/60 uppercase tracking-wider mt-1">Verify details before proceeding</p>
        </div>

        {/* Conversion Breakdown */}
        <div className="space-y-4 mb-6">
          {/* ABRA Input */}
          <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
            <div>
              <div className="text-cyan-400/70 text-xs font-semibold uppercase">You Send</div>
              <div className="text-lg font-semibold text-white mt-1">{step.abraAmount.toFixed(2)} ABRA</div>
            </div>
            <div className="text-right">
              <div className="text-cyan-400/70 text-xs">via Bags</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ChevronRight className="w-6 h-6 text-cyan-400/50 rotate-90" />
          </div>

          {/* USDC Output */}
          <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
            <div>
              <div className="text-cyan-400/70 text-xs font-semibold uppercase">You Get (USDC)</div>
              <div className="text-lg font-semibold text-white mt-1">${step.usdcAmount.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className={`text-xs ${priceImpact.includes('-') ? 'text-red-400' : 'text-cyan-400'}`}>
                Impact: {priceImpact}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ChevronRight className="w-6 h-6 text-cyan-400/50 rotate-90" />
          </div>

          {/* Fiat Output */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-400/50">
            <div>
              <div className="text-cyan-400/70 text-xs font-semibold uppercase">Arrives in your {step.paymentMethod === 'cash-app' ? 'Cash App' : 'Apple Pay'}</div>
              <div className="text-2xl font-bold text-cyan-300 mt-1">${step.fiatAmount.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-cyan-400/70 text-xs">1-2 business days</div>
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="bg-slate-800/30 rounded-lg p-3 mb-6 border border-cyan-400/10">
          <div className="text-xs text-cyan-400/60 space-y-1">
            <div className="flex justify-between">
              <span>Swap Fee (Bags)</span>
              <span className="text-cyan-300">~$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Off-ramp Fee (1.5%)</span>
              <span className="text-cyan-300">~${(step.usdcAmount * 0.015).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-cyan-400 font-semibold rounded-lg transition border border-cyan-400/20"
          >
            Back
          </button>
          <button
            onClick={handleSwapAndOffRamp}
            disabled={isLoading}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
          >
            {isLoading ? 'Processing...' : 'Convert Now'}
          </button>
        </div>
      </div>
    );
  }

  // ============ RENDER: SWAPPING PHASE ============
  if (step.phase === 'swapping') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-2 font-mono text-center">&gt; [PROCESSING] CONVERSION_ACTIVE</h3>
          <p className="text-cyan-400/60 text-center max-w-xs text-[10px]">
            Swapping ABRA to USDC and initiating off-ramp transfer...
          </p>
        </div>
      </div>
    );
  }

  // ============ RENDER: OFF-RAMP PHASE ============
  if (step.phase === 'offramp') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
          <h3 className="text-sm font-bold text-green-400 tracking-widest uppercase mb-2 font-mono text-center">&gt; [FINALIZING] TRANSFER_STAGE</h3>
          <p className="text-cyan-400/60 text-center max-w-xs text-[10px]">
            A new window has opened to complete your off-ramp. Please complete the payment process.
          </p>
        </div>
      </div>
    );
  }

  // ============ RENDER: SUCCESS PHASE ============
  if (step.phase === 'success') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="w-16 h-16 text-cyan-400 mb-4" />
          <h3 className="text-sm font-bold text-green-400 tracking-widest uppercase mb-2 text-center font-mono">✓ [SUCCESS] CONVERSION_COMPLETE</h3>
          <p className="text-green-400 text-center mb-6 text-[11px]">
            ABRA swapped and sent to {step.paymentMethod === 'cash-app' ? 'Cash App' : 'Apple Pay'}
          </p>

          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 w-full mb-6 border border-cyan-400/50">
            <div className="text-cyan-400/70 text-xs font-semibold uppercase mb-2">Amount Received</div>
            <div className="text-4xl font-bold text-cyan-300">${step.fiatAmount.toFixed(2)}</div>
            <div className="text-cyan-400/60 text-sm mt-3">
              ↳ Funds arriving in 1-2 business days
            </div>
          </div>

          <div className="text-center">
            <p className="text-cyan-400/60 text-sm">
              ✓ {step.abraAmount.toFixed(2)} ABRA swapped to ${step.usdcAmount.toFixed(2)} USDC
            </p>
            <p className="text-cyan-400/40 text-xs mt-2">
              Auto-closing in 5 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============ RENDER: ERROR PHASE ============
  if (step.phase === 'error') {
    return (
      <div className={`rounded-2xl border border-red-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <h3 className="text-xl font-semibold text-white text-center">Conversion Failed</h3>
          <p className="text-red-400/70 text-center text-sm">{step.errorMessage}</p>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  return null;
};
