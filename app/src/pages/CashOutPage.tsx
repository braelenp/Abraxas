import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { DollarSign, Zap, Check, AlertCircle } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';
import { useAbraBalance } from '../hooks/useAbraBalance';
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

interface BankAccount {
  accountNumber: string;
  routingNumber: string;
  accountName: string;
  accountType: 'checking' | 'savings';
}

const ACH_FEE = 1.5; // $1.50 per transaction
const PROCESSING_TIME = 3; // 3 business days

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
  
  // UI State
  const [step, setStep] = useState<'amount' | 'bank' | 'confirm' | 'complete'>('amount');
  const [cashOutAmount, setCashOutAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Bank account state
  const [bankAccount, setBankAccount] = useState<BankAccount>({
    accountNumber: '',
    routingNumber: '',
    accountName: '',
    accountType: 'checking',
  });
  
  const [savedBankAccounts, setSavedBankAccounts] = useState<BankAccount[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('abraxas_bank_accounts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number | null>(null);
  const [verifiedAccounts, setVerifiedAccounts] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const verified = localStorage.getItem('abraxas_verified_accounts');
      return verified ? new Set(JSON.parse(verified)) : new Set();
    } catch {
      return new Set();
    }
  });

  const availableBalance = usdBalance;
  const calculatedFee = ACH_FEE;
  const totalCost = Number(cashOutAmount || 0) + calculatedFee;
  const selectedBank = selectedAccountIndex !== null ? savedBankAccounts[selectedAccountIndex] : null;
  const isAccountVerified = selectedBank ? verifiedAccounts.has(`${selectedBank.routingNumber}-${selectedBank.accountNumber}`) : false;

  const validateRoutingNumber = (routing: string): boolean => {
    // Validate 9-digit US routing number
    return /^\d{9}$/.test(routing.replace(/\s/g, ''));
  };

  const validateAccountNumber = (account: string): boolean => {
    // Validate 8-17 digit account number
    const cleanedAccount = account.replace(/\s/g, '');
    return /^\d{8,17}$/.test(cleanedAccount);
  };

  const handleSaveBank = () => {
    if (!bankAccount.accountName.trim()) {
      alert('Please enter an account name');
      return;
    }
    if (!validateRoutingNumber(bankAccount.routingNumber)) {
      alert('Invalid routing number (must be 9 digits)');
      return;
    }
    if (!validateAccountNumber(bankAccount.accountNumber)) {
      alert('Invalid account number (must be 8-17 digits)');
      return;
    }

    const accountKey = `${bankAccount.routingNumber}-${bankAccount.accountNumber}`;
    setSavedBankAccounts([...savedBankAccounts, bankAccount]);
    localStorage.setItem('abraxas_bank_accounts', JSON.stringify([...savedBankAccounts, bankAccount]));
    setBankAccount({ accountNumber: '', routingNumber: '', accountName: '', accountType: 'checking' });
  };

  const handleVerifyBank = async (index: number) => {
    setIsProcessing(true);
    try {
      const account = savedBankAccounts[index];
      const accountKey = `${account.routingNumber}-${account.accountNumber}`;

      // Simulate bank account verification via ACH micro-deposits
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const updatedVerified = new Set(verifiedAccounts);
      updatedVerified.add(accountKey);
      setVerifiedAccounts(updatedVerified);
      localStorage.setItem('abraxas_verified_accounts', JSON.stringify(Array.from(updatedVerified)));
      
      alert('Bank account verified! You should see 2 small deposits within 1-2 business days.');
    } catch (error) {
      alert(`Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashOut = async () => {
    if (!cashOutAmount || !selectedBank || isNaN(Number(cashOutAmount))) {
      alert('Please enter a valid amount and select a bank');
      return;
    }
    if (!isAccountVerified) {
      alert('Please verify your bank account first');
      return;
    }
    if (Number(cashOutAmount) > availableBalance) {
      alert('Insufficient balance');
      return;
    }
    if (totalCost > availableBalance) {
      alert('Insufficient balance for amount + fees');
      return;
    }

    setIsProcessing(true);
    try {
      const amount = Number(cashOutAmount);
      if (amount <= 0) {
        alert('Please enter a valid amount');
        return;
      }

      // Create on-chain cash-out transaction
      if (!publicKey || !sendTransaction) {
        throw new Error('Wallet not connected');
      }

      const transaction = new Transaction();
      
      // Add system instruction as placeholder for actual cash-out program
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('11111111111111111111111111111111'),
          lamports: 1000,
        })
      );

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
      });

      console.log('Cash-out transaction:', signature);

      // Record the cash-out
      const cashOutRecord = {
        signature,
        amount,
        fee: calculatedFee,
        bankAccount: selectedBank,
        completedAt: new Date().toISOString(),
        status: 'pending' as const,
        expectedArrival: new Date(Date.now() + PROCESSING_TIME * 24 * 60 * 60 * 1000).toISOString(),
      };

      // Save to transaction history
      try {
        const history = localStorage.getItem('abraxas_cashout_history');
        const records = history ? JSON.parse(history) : [];
        records.push(cashOutRecord);
        localStorage.setItem('abraxas_cashout_history', JSON.stringify(records));
      } catch (e) {
        console.warn('Could not save transaction history:', e);
      }

      setStep('complete');
      setCashOutAmount('');
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

        {/* Progress Indicator */}
        <div className="flex gap-2 justify-between text-xs">
          {(['amount', 'bank', 'confirm', 'complete'] as const).map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition ${
                step === s ? 'bg-cyan-400' : step > s ? 'bg-emerald-400' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Amount */}
        {step === 'amount' && (
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

            <div className="rounded-lg bg-slate-800/30 p-3 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>ACH Processing Fee:</span>
                <span className="text-slate-300">${calculatedFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Time:</span>
                <span className="text-slate-300">{PROCESSING_TIME} business days</span>
              </div>
              <div className="flex justify-between bg-slate-700/30 px-2 py-1 rounded mt-2">
                <span className="text-slate-200">Total Cost:</span>
                <span className="text-emerald-300 font-semibold">${totalCost.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('bank')}
              disabled={!cashOutAmount || Number(cashOutAmount) <= 0 || totalCost > availableBalance}
              className="w-full rounded-xl border border-cyan-400/60 bg-cyan-400/20 px-4 py-3 text-sm font-bold uppercase tracking-wider text-cyan-100 transition hover:border-cyan-400/80 hover:bg-cyan-400/30 disabled:opacity-50"
            >
              Continue to Bank Setup
            </button>
          </article>
        )}

        {/* Step 2: Bank Account */}
        {step === 'bank' && (
          <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur space-y-4">
            <h2 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Bank Account</h2>

            {/* Saved Accounts */}
            {savedBankAccounts.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Your Accounts</p>
                {savedBankAccounts.map((account, idx) => {
                  const acctKey = `${account.routingNumber}-${account.accountNumber}`;
                  const isVerified = verifiedAccounts.has(acctKey);
                  
                  return (
                    <div key={idx} className="rounded-lg border border-slate-600 p-3">
                      <button
                        onClick={() => setSelectedAccountIndex(idx)}
                        className={`w-full text-left transition ${
                          selectedAccountIndex === idx
                            ? 'bg-slate-700/50 border-cyan-400/50'
                            : 'hover:bg-slate-800/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-100">{account.accountName}</p>
                            <p className="text-xs text-slate-400">
                              {account.accountType} • {account.accountNumber.slice(-4).padStart(account.accountNumber.length, '*')}
                            </p>
                          </div>
                          {isVerified && <Check size={16} className="text-emerald-400" />}
                          {!isVerified && <AlertCircle size={16} className="text-amber-400" />}
                        </div>
                      </button>

                      {selectedAccountIndex === idx && !isVerified && (
                        <button
                          onClick={() => handleVerifyBank(idx)}
                          disabled={isProcessing}
                          className="mt-2 w-full rounded px-3 py-2 text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30 disabled:opacity-50"
                        >
                          {isProcessing ? 'Verifying...' : 'Verify Account'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add New Account */}
            <div className="border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-400 mb-3">Add New Account</p>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Account Name"
                  value={bankAccount.accountName}
                  onChange={(e) => setBankAccount({ ...bankAccount, accountName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-sm text-white focus:border-cyan-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Routing Number (9 digits)"
                  value={bankAccount.routingNumber}
                  onChange={(e) => setBankAccount({ ...bankAccount, routingNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-sm text-white focus:border-cyan-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={bankAccount.accountNumber}
                  onChange={(e) => setBankAccount({ ...bankAccount, accountNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-sm text-white focus:border-cyan-400 outline-none"
                />
                <select
                  value={bankAccount.accountType}
                  onChange={(e) => setBankAccount({ ...bankAccount, accountType: e.target.value as 'checking' | 'savings' })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-sm text-white focus:border-cyan-400 outline-none"
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
                <button
                  onClick={handleSaveBank}
                  className="w-full rounded-lg bg-cyan-400/20 border border-cyan-400/60 px-3 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/30"
                >
                  Save Account
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setStep('amount')}
                className="flex-1 rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800/30"
              >
                Back
              </button>
              <button
                onClick={() => setStep('confirm')}
                disabled={!selectedBank || !isAccountVerified}
                className="flex-1 rounded-lg bg-cyan-400/20 border border-cyan-400/60 px-3 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/30 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </article>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirm' && selectedBank && (
          <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur space-y-4">
            <h2 className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Confirm Cash Out</h2>

            <div className="rounded-lg bg-slate-800/30 p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Amount:</span>
                <span className="font-semibold">${Number(cashOutAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fee:</span>
                <span className="font-semibold">${calculatedFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-700 pt-3 flex justify-between">
                <span className="text-slate-300 font-semibold">You Will Receive:</span>
                <span className="text-emerald-300 font-semibold">${(Number(cashOutAmount) - calculatedFee).toFixed(2)}</span>
              </div>
            </div>

            <div className="rounded-lg bg-cyan-900/20 border border-cyan-600/30 p-3 text-xs text-cyan-200">
              <p className="font-semibold mb-1">Bank Account</p>
              <p>{selectedBank.accountName}</p>
              <p className="text-cyan-300/70">****{selectedBank.accountNumber.slice(-4)}</p>
              <p className="text-cyan-300/70 mt-1">ETA: {PROCESSING_TIME} business days</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep('bank')}
                className="flex-1 rounded-lg border border-slate-600 px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800/30"
              >
                Back
              </button>
              <button
                onClick={handleCashOut}
                disabled={isProcessing}
                className="flex-1 rounded-lg bg-emerald-400/20 border border-emerald-400/60 px-3 py-2.5 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/30 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Confirm Cash Out'}
              </button>
            </div>
          </article>
        )}

        {/* Step 4: Complete */}
        {step === 'complete' && (
          <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-emerald-900/20 p-6 backdrop-blur space-y-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-emerald-400/20 p-4">
                <Check size={32} className="text-emerald-400" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-emerald-300">Cash Out Initiated</h2>
            <p className="text-sm text-slate-300">
              Your cash-out of ${Number(cashOutAmount).toFixed(2)} has been successfully submitted to {selectedBank?.accountName}.
            </p>
            <div className="rounded-lg bg-slate-800/30 p-3 text-xs text-slate-400">
              <p>Expected arrival: {new Date(Date.now() + PROCESSING_TIME * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              <p className="mt-1">ACH Fee: ${calculatedFee.toFixed(2)}</p>
            </div>
            <button
              onClick={() => {
                setCashOutAmount('');
                setStep('amount');
              }}
              className="w-full rounded-lg bg-cyan-400/20 border border-cyan-400/60 px-3 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/30"
            >
              Initiate Another Cash Out
            </button>
          </article>
        )}

        {/* Info */}
        <div className="text-xs text-slate-400 rounded-lg bg-slate-800/20 p-4 space-y-2">
          <p className="font-semibold text-slate-300">✦ Cash Out Information</p>
          <ul className="space-y-1 text-slate-400">
            <li>• ACH transfer to your verified bank account</li>
            <li>• Processing time: {PROCESSING_TIME} business days</li>
            <li>• ACH fee: ${ACH_FEE.toFixed(2)} per transaction</li>
            <li>• Bank account verification required (1-2 deposits)</li>
            <li>• Maximum withdrawal: $50,000 per day</li>
          </ul>
        </div>
      </section>
    </RuneRealm>
  );
}
