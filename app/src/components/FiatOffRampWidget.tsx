import React, { useState, useCallback, useEffect } from 'react';
import { ChevronRight, CheckCircle, AlertCircle, ExternalLink, Copy } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getJupiterQuote, calculateOutputAmount } from '../lib/jupiter';
import { useAbraBalance } from '../hooks/useAbraBalance';
import {
  estimateFiatAmount,
  openPhantomOffRamp,
  isPhantomAvailable,
  getPhantomOffRampInstructions,
  trackOffRampEvent,
  simulateOffRampSuccess,
} from '../lib/offramp';


// Token addresses
const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const USDC_TOKEN_CA = 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1';

interface FiatOffRampWidgetProps {
  abraAmount?: number;
  onSuccess?: () => void;
  compact?: boolean;
}

type PhaseType = 'input' | 'quote' | 'instructions' | 'success' | 'error';

interface ConversionStep {
  phase: PhaseType;
  abraAmount: number;
  usdcAmount: number;
  fiatAmount: number;
  paymentMethod: 'apple-pay' | 'cash-app';
  errorMessage?: string;
}

export const FiatOffRampWidget: React.FC<FiatOffRampWidgetProps> = ({
  abraAmount: initialAmount,
  onSuccess,
  compact = false,
}) => {
  const { publicKey, connected } = useWallet();
  const { balance: realAbraBalance, balanceFormatted, isLoading: balanceLoading } = useAbraBalance();

  const [step, setStep] = useState<ConversionStep>({
    phase: 'input',
    abraAmount: 0,
    usdcAmount: 0,
    fiatAmount: 0,
    paymentMethod: 'cash-app',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initialize with real balance or passed amount
  useEffect(() => {
    if (realAbraBalance > 0) {
      setStep((prev) => ({
        ...prev,
        abraAmount: realAbraBalance,
      }));
    } else if (initialAmount && initialAmount > 0) {
      setStep((prev) => ({
        ...prev,
        abraAmount: initialAmount,
      }));
    }
  }, [realAbraBalance, initialAmount]);

  /**
   * Get real Jupiter quote for ABRA → USDC
   */
  const handleGetQuote = useCallback(async () => {
    if (!step.abraAmount || step.abraAmount <= 0) return;

    setIsLoading(true);
    try {
      const amountInSmallestUnits = Math.floor(step.abraAmount * Math.pow(10, 6));
      const quote = await getJupiterQuote(ABRA_TOKEN_CA, USDC_TOKEN_CA, amountInSmallestUnits, 500);

      if (!quote) throw new Error('Failed to fetch quote');

      const usdcOutput = calculateOutputAmount(quote, 6);
      const fiatAmount = estimateFiatAmount(usdcOutput, 1.5);

      setStep((prev) => ({
        ...prev,
        phase: 'quote',
        usdcAmount: usdcOutput,
        fiatAmount,
      }));

      trackOffRampEvent('started', { amount: step.abraAmount, method: step.paymentMethod });
    } catch (error) {
      console.error('Quote error:', error);
      setStep((prev) => ({
        ...prev,
        phase: 'error',
        errorMessage: 'Failed to get conversion quote. Please check that you have sufficient ABRA.',
      }));
    } finally {
      setIsLoading(false);
    }
  }, [step.abraAmount, step.paymentMethod]);

  /**
   * Move to instructions phase
   */
  const handleProceed = useCallback(() => {
    setStep((prev) => ({
      ...prev,
      phase: 'instructions',
    }));
  }, []);

  /**
   * Open Phantom and complete off-ramp
   */
  const handleOpenPhantom = useCallback(() => {
    try {
      openPhantomOffRamp(step.usdcAmount, step.paymentMethod);
      trackOffRampEvent('completed', { amount: step.abraAmount, method: step.paymentMethod });

      // Show success after a delay
      setTimeout(() => {
        setStep((prev) => ({
          ...prev,
          phase: 'success',
        }));

        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 5000);
      }, 1000);
    } catch (error) {
      console.error('Phantom error:', error);
      setStep((prev) => ({
        ...prev,
        phase: 'error',
        errorMessage: 'Error opening Phantom. Please ensure Phantom is installed.',
      }));
    }
  }, [step.usdcAmount, step.abraAmount, step.paymentMethod, onSuccess]);

  /**
   * Copy instructions to clipboard
   */
  const handleCopyInstructions = useCallback(() => {
    const instructions = getPhantomOffRampInstructions(step.usdcAmount, step.paymentMethod);
    navigator.clipboard.writeText(instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [step.usdcAmount, step.paymentMethod]);

  /**
   * Reset to input phase
   */
  const handleReset = useCallback(() => {
    setStep((prev) => ({
      ...prev,
      phase: 'input',
      usdcAmount: 0,
      fiatAmount: 0,
    }));
  }, []);

  const phantomAvailable = isPhantomAvailable();
  const instructions = getPhantomOffRampInstructions(step.usdcAmount, step.paymentMethod);

  // ============ RENDER: INPUT PHASE ============
  if (step.phase === 'input') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="mb-6">
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-2 font-mono">&gt; [PHANTOM] OFFRAMP</h3>
          <p className="text-[11px] text-cyan-300/60 uppercase tracking-wide">Convert ABRA → Cash</p>
        </div>

        {/* Amount Input */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-cyan-400/20">
          <div className="flex justify-between items-center mb-2">
            <label className="text-cyan-400/70 text-xs font-semibold uppercase tracking-wider">Your ABRA Balance</label>
            {balanceLoading ? (
              <span className="text-cyan-400/50 text-xs">Loading...</span>
            ) : (
              <span className="text-cyan-300 text-xs font-mono">{balanceFormatted}</span>
            )}
          </div>
          <input
            type="number"
            value={step.abraAmount > 0 ? step.abraAmount : ''}
            onChange={(e) => {
              const amount = Number(e.target.value);
              if (amount <= realAbraBalance) {
                setStep((prev) => ({
                  ...prev,
                  abraAmount: amount,
                }));
              }
            }}
            placeholder="Enter amount to convert"
            className="w-full bg-slate-900 border border-cyan-400/40 rounded-lg px-3 py-2 text-white placeholder-cyan-400/30 focus:outline-none focus:border-cyan-400/70 mb-3"
          />
          
          {/* Quick select buttons */}
          {realAbraBalance > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => setStep((prev) => ({ ...prev, abraAmount: realAbraBalance * 0.25 }))}
                className="flex-1 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-700 text-cyan-300 rounded border border-cyan-400/20 transition"
              >
                25%
              </button>
              <button
                onClick={() => setStep((prev) => ({ ...prev, abraAmount: realAbraBalance * 0.5 }))}
                className="flex-1 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-700 text-cyan-300 rounded border border-cyan-400/20 transition"
              >
                50%
              </button>
              <button
                onClick={() => setStep((prev) => ({ ...prev, abraAmount: realAbraBalance * 0.75 }))}
                className="flex-1 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-700 text-cyan-300 rounded border border-cyan-400/20 transition"
              >
                75%
              </button>
              <button
                onClick={() => setStep((prev) => ({ ...prev, abraAmount: realAbraBalance }))}
                className="flex-1 py-1.5 text-xs bg-slate-700/50 hover:bg-slate-700 text-cyan-300 rounded border border-cyan-400/20 transition font-semibold"
              >
                MAX
              </button>
            </div>
          )}
          
          {balanceLoading && (
            <div className="text-cyan-400/50 text-xs mt-2">Fetching your ABRA balance...</div>
          )}
          {!connected && (
            <div className="text-orange-400/70 text-xs mt-2">💡 Connect your wallet to see your ABRA balance</div>
          )}
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
        {!connected ? (
          <button
            disabled
            className="w-full py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
          >
            Connect Wallet First
          </button>
        ) : realAbraBalance === 0 ? (
          <button
            disabled
            className="w-full py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
          >
            No ABRA Balance
          </button>
        ) : (
          <button
            onClick={handleGetQuote}
            disabled={!step.abraAmount || step.abraAmount <= 0 || isLoading || balanceLoading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Fetching Quote...
              </>
            ) : (
              <>
                Get Conversion Quote <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        )}

        <p className="text-cyan-400/40 text-xs text-center mt-4">
          ✓ Uses Phantom wallet's built-in off-ramp • 1-2 business days
        </p>
      </div>
    );
  }

  // ============ RENDER: QUOTE PHASE ============
  if (step.phase === 'quote') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="mb-6">
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase font-mono">&gt; [REVIEW] CONVERSION_QUOTE</h3>
          <p className="text-[10px] text-cyan-300/60 uppercase tracking-wider mt-1">Verify conversion details</p>
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
              <div className="text-cyan-400/70 text-xs">Sell</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ChevronRight className="w-6 h-6 text-cyan-400/50 rotate-90" />
          </div>

          {/* USDC Output */}
          <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-cyan-400/20">
            <div>
              <div className="text-cyan-400/70 text-xs font-semibold uppercase">Get (USDC)</div>
              <div className="text-lg font-semibold text-white mt-1">${step.usdcAmount.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-cyan-400/70 text-xs">on Solana</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ChevronRight className="w-6 h-6 text-cyan-400/50 rotate-90" />
          </div>

          {/* Fiat Output */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-400/50">
            <div>
              <div className="text-cyan-400/70 text-xs font-semibold uppercase">
                Arrives in {step.paymentMethod === 'cash-app' ? 'Cash App' : 'Apple Pay'}
              </div>
              <div className="text-2xl font-bold text-cyan-300 mt-1">${step.fiatAmount.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-cyan-400/70 text-xs">1-2 days</div>
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="bg-slate-800/30 rounded-lg p-3 mb-6 border border-cyan-400/10">
          <div className="text-xs text-cyan-400/60 space-y-1">
            <div className="flex justify-between">
              <span>ABRA → USDC</span>
              <span className="text-cyan-300">Market rate</span>
            </div>
            <div className="flex justify-between">
              <span>Phantom Off-ramp Fee</span>
              <span className="text-cyan-300">~1.5%</span>
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
            onClick={handleProceed}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // ============ RENDER: INSTRUCTIONS PHASE ============
  if (step.phase === 'instructions') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="mb-6">
          <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase font-mono">&gt; [PHANTOM] INSTRUCTIONS</h3>
          <p className="text-[10px] text-cyan-300/60 uppercase tracking-wider mt-1">Complete off-ramp in your wallet</p>
        </div>

        {/* Step-by-step Instructions */}
        <div className="space-y-3 mb-6">
          {[
            { num: '1', text: 'Open your Phantom wallet' },
            { num: '2', text: 'Tap the USDC token in your wallet' },
            { num: '3', text: 'Press "Sell" or "Convert to Cash"' },
            { num: '4', text: `Enter amount: $${step.usdcAmount.toFixed(2)}` },
            { num: '5', text: `Select: ${step.paymentMethod === 'apple-pay' ? 'Apple Pay' : 'Cash App'}` },
            { num: '6', text: 'Complete identity verification (KYC)' },
            { num: '7', text: 'Confirm and receive funds in 1-2 days' },
          ].map((step) => (
            <div key={step.num} className="flex gap-3 items-start p-3 bg-slate-800/30 rounded-lg border border-cyan-400/10">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/30 border border-cyan-400/50 flex items-center justify-center text-xs font-semibold text-cyan-300">
                {step.num}
              </div>
              <div className="text-cyan-300 text-sm mt-0.5">{step.text}</div>
            </div>
          ))}
        </div>

        {/* Amount Summary */}
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-4 mb-6 border border-cyan-400/30">
          <div className="text-cyan-400/70 text-xs font-semibold uppercase mb-2">Summary</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-cyan-300">
              <span>ABRA:</span>
              <span className="font-semibold">{step.abraAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cyan-300">
              <span>USDC:</span>
              <span className="font-semibold">${step.usdcAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cyan-200 border-t border-cyan-400/20 pt-1 mt-1 font-semibold">
              <span>Receive:</span>
              <span>${step.fiatAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Copy Instructions Button */}
        <button
          onClick={handleCopyInstructions}
          className="w-full py-2 mb-3 bg-slate-800/50 hover:bg-slate-700/50 text-cyan-400 font-semibold rounded-lg transition border border-cyan-400/20 flex items-center justify-center gap-2 text-sm"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy Instructions'}
        </button>

        {/* Open Phantom or Download */}
        {phantomAvailable ? (
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-cyan-400 font-semibold rounded-lg transition border border-cyan-400/20"
            >
              Cancel
            </button>
            <button
              onClick={handleOpenPhantom}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
            >
              Open Phantom <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => window.open('https://phantom.app/', '_blank')}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
          >
            Install Phantom <ExternalLink className="w-4 h-4" />
          </button>
        )}

        <p className="text-cyan-400/40 text-xs text-center mt-4">
          💡 Phantom handles all the off-ramp details securely
        </p>
      </div>
    );
  }

  // ============ RENDER: SUCCESS PHASE ============
  if (step.phase === 'success') {
    return (
      <div className={`rounded-2xl border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg ${compact ? 'max-w-sm' : ''}`}>
        <div className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
          <h3 className="text-sm font-bold text-green-400 tracking-widest uppercase mb-2 text-center font-mono">
            ✓ [SUCCESS] CONVERSION_INITIATED
          </h3>
          <p className="text-green-400 text-center mb-6 text-[11px]">
            Check your Phantom wallet to complete the off-ramp or monitor the progress
          </p>

          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-6 w-full mb-6 border border-cyan-400/50">
            <div className="text-cyan-400/70 text-xs font-semibold uppercase mb-2">Expected to Receive</div>
            <div className="text-3xl font-bold text-cyan-300 mb-1">${step.fiatAmount.toFixed(2)}</div>
            <div className="text-cyan-400/60 text-xs">
              in {step.paymentMethod === 'apple-pay' ? 'Apple Pay' : 'Cash App'} • 1-2 business days
            </div>
          </div>

          <div className="text-center">
            <p className="text-cyan-400/60 text-xs mb-1">
              {step.abraAmount.toFixed(2)} ABRA → ${step.usdcAmount.toFixed(2)} USDC
            </p>
            <p className="text-cyan-400/40 text-xs">
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
          <h3 className="text-lg font-semibold text-white text-center">Error</h3>
          <p className="text-red-400/70 text-center text-sm max-w-xs">{step.errorMessage}</p>
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
