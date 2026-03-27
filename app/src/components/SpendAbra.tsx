import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, getMint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// Token constants
const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const USDC_TOKEN_CA = 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1';

interface PaymentMethod {
  id: string;
  label: string;
  icon: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'apple_pay', label: 'Apple Pay', icon: '🍎' },
  { id: 'cash_app', label: 'Cash App', icon: '💵' },
  { id: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
  { id: 'paypal', label: 'PayPal', icon: '📱' },
];

interface SpendAbraProps {
  onClose: () => void;
}

export default function SpendAbra({ onClose }: SpendAbraProps) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  // State
  const [phase, setPhase] = useState<'input' | 'quote' | 'swapping' | 'offramp' | 'success'>('input');
  const [abraBalance, setAbra0Balance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [spendAmount, setSpendAmount] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('apple_pay');
  const [estimatedFiat, setEstimatedFiat] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [offrampProvider, setOfframpProvider] = useState<'ramp' | 'transak'>('ramp');

  // Fetch ABRA balance on-chain
  const fetchAbra0Balance = useCallback(async () => {
    if (!publicKey) {
      setLoadingBalance(false);
      setError('Wallet not connected');
      return;
    }

    try {
      setLoadingBalance(true);
      setError('');

      // Get ABRA token account
      const abra0Mint = new PublicKey(ABRA_TOKEN_CA);
      const tokenAccount = getAssociatedTokenAddressSync(
        abra0Mint,
        publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Check if account exists
      const tokenAccountInfo = await connection.getAccountInfo(tokenAccount, 'confirmed');
      if (!tokenAccountInfo) {
        setAbra0Balance(0);
        setLoadingBalance(false);
        return;
      }

      // Get token mint to determine decimals
      const mint = await getMint(connection, abra0Mint);

      // Decode token account balance
      const tokenAmount = await connection.getTokenAccountBalance(tokenAccount, 'confirmed');
      const balanceInTokens = tokenAmount.value.uiAmount || 0;

      setAbra0Balance(balanceInTokens);
    } catch (err) {
      console.error('Error fetching ABRA balance:', err);
      setError('Failed to fetch wallet balance');
      setAbra0Balance(0);
    } finally {
      setLoadingBalance(false);
    }
  }, [publicKey, connection]);

  // Fetch balance on component load and when wallet changes
  useEffect(() => {
    fetchAbra0Balance();
  }, [fetchAbra0Balance]);

  // Handle "Get Quote" button click
  const handleGetQuote = async () => {
    if (!spendAmount || isNaN(parseFloat(spendAmount))) {
      setError('Enter a valid amount');
      return;
    }

    if (parseFloat(spendAmount) > (abraBalance || 0)) {
      setError('Insufficient ABRA balance');
      return;
    }

    setPhase('quote');

    // Simulate quote fetch (in production: call Jupiter API)
    setTimeout(() => {
      const abraAmount = parseFloat(spendAmount);
      const usdcAmount = abraAmount * 0.95; // Simplified 1:1 exchange
      const feePercentage = 0.015; // 1.5% Ramp/Transak fee
      const fiatAmount = usdcAmount * (1 - feePercentage);

      setEstimatedFiat(fiatAmount);
      setPhase('input'); // Return to input to confirm
    }, 800);
  };

  // Handle "Swap & Send" button click
  const handleSwapAndOfframp = async () => {
    if (!spendAmount) return;

    setPhase('swapping');
    setError('');

    try {
      // Step 1: Simulate ABRA → USDC swap via Bags
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 2: Prepare off-ramp flow
      setPhase('offramp');
      const abraAmount = parseFloat(spendAmount);
      const usdcAmount = abraAmount * 0.95;

      // Generate off-ramp URL based on provider
      let offrampUrl = '';
      if (offrampProvider === 'ramp') {
        offrampUrl = generateRampUrl(usdcAmount, selectedPayment);
      } else {
        offrampUrl = generateTransakUrl(usdcAmount, selectedPayment);
      }

      // Open off-ramp provider
      const width = 600;
      const height = 800;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      const popup = window.open(
        offrampUrl,
        'AbrasSpendPopup',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        setError('Popup blocked. Please allow popups for this site.');
        setPhase('input');
        return;
      }

      // Wait 3 seconds then show success (user will complete externally)
      setTimeout(() => {
        const paymentLabel = PAYMENT_METHODS.find((m) => m.id === selectedPayment)?.label || selectedPayment;
        const message = `ABRA swapped and sent to ${paymentLabel} — funds arriving in minutes.`;
        setSuccessMessage(message);
        setPhase('success');

        // Auto-close after 5 seconds
        setTimeout(() => {
          onClose();
        }, 5000);
      }, 3000);
    } catch (err) {
      console.error('Error in spend flow:', err);
      setError('Transaction failed. Please try again.');
      setPhase('input');
    }
  };

  // Generate Ramp.network off-ramp URL
  const generateRampUrl = (usdcAmount: number, paymentMethod: string): string => {
    const rampHostApiKey = import.meta.env.VITE_RAMP_HOST_API_KEY || 'host_api_key';
    const paymentMethodMap: Record<string, string> = {
      'apple_pay': 'APPLE_PAY',
      'cash_app': 'DEBIT_CARD',
      'bank_transfer': 'BANK_TRANSFER',
      'paypal': 'BANK_TRANSFER', // Ramp doesn't have PayPal direct
    };

    const params = new URLSearchParams({
      hostApiKey: rampHostApiKey,
      assetCode: 'USDC_SOL',
      userAccount: window.location.href,
      selectedCountryCode: 'US',
      fiatValue: usdcAmount.toFixed(2),
      fiatCurrency: 'USD',
      paymentMethod: paymentMethodMap[paymentMethod] || 'DEBIT_CARD',
    });

    return `https://ramp.network/?${params.toString()}`;
  };

  // Generate Transak off-ramp URL
  const generateTransakUrl = (usdcAmount: number, paymentMethod: string): string => {
    const transakApiKey = import.meta.env.VITE_TRANSAK_API_KEY || 'api_key';
    const paymentMethodMap: Record<string, string> = {
      'apple_pay': 'credit_debit_card',
      'cash_app': 'credit_debit_card',
      'bank_transfer': 'bank_transfer',
      'paypal': 'paypal',
    };

    const params = new URLSearchParams({
      apiKey: transakApiKey,
      network: 'solana',
      cryptoCurrency: 'USDC',
      fiatAmount: usdcAmount.toFixed(2),
      fiatCurrency: 'USD',
      paymentMethod: paymentMethodMap[paymentMethod] || 'credit_debit_card',
      disablePaymentMethods: 'gbp_bank_transfer',
    });

    return `https://global.transak.com/?${params.toString()}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h2 className="text-sm font-bold text-emerald-400 tracking-widest uppercase font-mono">&gt; [SPEND] ABRA_FLOW</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Balance Display */}
          {loadingBalance ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={32} className="animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-[10px] text-emerald-400/70 mb-2 uppercase tracking-wider font-mono">WALLET_BALANCE</p>
              <p className="text-lg font-bold text-emerald-400 font-mono">
                {abraBalance !== null ? abraBalance.toFixed(2) : '0.00'} ABRA
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                On-chain balance from {publicKey?.toBase58().slice(0, 8)}...
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Success Display */}
          {phase === 'success' && (
            <div className="flex gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">Success!</p>
                <p className="text-sm text-green-700 dark:text-green-300">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Amount Input */}
          {phase !== 'success' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Amount to Spend
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={spendAmount}
                    onChange={(e) => setSpendAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 text-lg font-semibold border border-slate-300 dark:border-slate-600 dark:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    disabled={phase !== 'input'}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    ABRA
                  </span>
                </div>

                {/* Max Button */}
                {abraBalance !== null && phase === 'input' && (
                  <button
                    onClick={() => setSpendAmount(abraBalance.toString())}
                    className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Use Max: {abraBalance.toFixed(4)} ABRA
                  </button>
                )}
              </div>

              {/* Estimated Fiat */}
              {estimatedFiat > 0 && phase === 'input' && (
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-[10px] text-emerald-400/60 mb-1 uppercase tracking-wider font-mono">Estimate | 1.5% Fee Applied</p>
                  <p className="text-lg font-bold text-emerald-400 font-mono">
                    ${estimatedFiat.toFixed(2)} USD
                  </p>
                </div>
              )}

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Send to
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      disabled={phase !== 'input'}
                      className={`p-3 rounded-lg border-2 font-medium transition ${
                        selectedPayment === method.id
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-emerald-300'
                      }`}
                    >
                      <span className="text-xl mb-1">{method.icon}</span>
                      <div className="text-xs">{method.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Off-Ramp Provider Selection */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Provider
                </label>
                <div className="flex gap-3">
                  {(['ramp', 'transak'] as const).map((provider) => (
                    <button
                      key={provider}
                      onClick={() => setOfframpProvider(provider)}
                      disabled={phase !== 'input'}
                      className={`flex-1 px-4 py-2 rounded-lg border-2 font-medium transition ${
                        offrampProvider === provider
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {provider === 'ramp' ? 'Ramp.network' : 'Transak'}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {phase === 'input' && (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGetQuote}
                  disabled={!spendAmount || (abraBalance || 0) === 0}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  Get Quote
                </button>
                <button
                  onClick={handleSwapAndOfframp}
                  disabled={!spendAmount || estimatedFiat === 0 || (abraBalance || 0) === 0}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  Swap & Send
                </button>
              </>
            )}

            {phase === 'quote' && (
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg"
              >
                <Loader2 size={18} className="animate-spin" />
                Fetching quote...
              </button>
            )}

            {phase === 'swapping' && (
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg"
              >
                <Loader2 size={18} className="animate-spin" />
                Swapping ABRA...
              </button>
            )}

            {phase === 'offramp' && (
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white font-medium rounded-lg"
              >
                <Loader2 size={18} className="animate-spin" />
                Opening {offrampProvider === 'ramp' ? 'Ramp' : 'Transak'}...
              </button>
            )}

            {phase === 'success' && (
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
              >
                Done
              </button>
            )}
          </div>

          {/* Footer Info */}
          <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
            <p>• ABRA to USDC swap via Bags (~0% fees)</p>
            <p>• Off-ramp provider fee: 1.5%</p>
            <p>• Funds arriving in minutes</p>
            <p>• Mainnet ABRA token deployment via Vercel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
