import { FormEvent, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, AlertCircle, CheckCircle, Loader, X } from 'lucide-react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { useAbraxas } from '../providers/AbraxasProvider';
import type { VaultAssetType } from '../lib/types';

import { ABRAXAS_PROGRAM_ID_RAW, ABRA_TOKEN_MINT } from '../lib/solana';
import { ACTIVE_TAX_YEAR, buildVaultTaxReport, downloadVaultTaxReportCsv, downloadVaultTaxReportPdf } from '../lib/taxReporting';

const agentOptions = ['Sophia Sentinel', 'Sophia Yield', 'Sophia Defensive'];

function assetTypeLabel(assetType: VaultAssetType) {
  if (assetType === 'dapp_equity') return 'DApp Equity';
  if (assetType === 'real_estate') return 'Real Estate Development';
  if (assetType === 'trading_portfolio') return 'Trading Portfolios';
  if (assetType === 'music_rights') return 'Music Rights & Media';
  if (assetType === 'ip_licensing') return 'IP Licensing';
  return 'DApp Equity';
}
export function VaultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { publicKey, signTransaction, connected } = useWallet();
  const { connection } = useConnection();
  const {
    vaults,
    futureAssetClasses,
    createVault,
    assignAgent,
    addLog,
    laCasaDeposits,
    logs,
    sophiaTradeRecords,
    sophiaAgents,
  } = useAbraxas();

  const [vaultName, setVaultName] = useState('');
  const [assetType, setAssetType] = useState<VaultAssetType>('dapp_equity');
  const [selectedAgents, setSelectedAgents] = useState<Record<string, string> | undefined>();
  const [depositAmount, setDepositAmount] = useState('');
  const [activeVaultId, setActiveVaultId] = useState<string | null>(null);
  const [showAboutVaults, setShowAboutVaults] = useState(false);
  const [expandedVaultMetrics, setExpandedVaultMetrics] = useState<Record<string, boolean>>({});
  
  // Blockchain state
  const [isCreatingVault, setIsCreatingVault] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Quick action modals
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [generatingTaxReportId, setGeneratingTaxReportId] = useState<string | null>(null);

  // Reset state when navigating to the Vaults page
  useEffect(() => {
    if (location.pathname === '/app/vaults') {
      setVaultName('');
      setAssetType('dapp_equity');
      setSelectedAgents({});
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [location.pathname]);

  // Fetch wallet balance on connection
  useEffect(() => {
    const fetchBalance = async () => {
      if (!connected || !publicKey) {
        setWalletBalance(null);
        return;
      }

      setIsLoadingBalance(true);
      try {
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / 1e9); // Convert lamports to SOL
      } catch (error) {
        console.error('Error fetching balance:', error);
        setErrorMessage('Failed to fetch wallet balance');
      } finally {
        setIsLoadingBalance(false);
      }
    };

    fetchBalance();
    
    // Refresh balance every 10 seconds
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [connected, publicKey, connection]);

  const onCreateVault = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!vaultName.trim()) {
      setErrorMessage('Vault name is required');
      return;
    }

    if (!connected || !publicKey) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    setIsCreatingVault(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Create vault in local state (backend sync would happen here)
      createVault(vaultName.trim(), assetType);
      
      // Log the creation
      addLog({
        vaultId: `vault-${assetType}-${Date.now()}`,
        action: 'Vault created successfully',
        detail: `${vaultName} - ${assetType}`,
      });

      setSuccessMessage(`Vault "${vaultName}" created successfully!`);
      setVaultName('');
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to create vault';
      setErrorMessage(errorMsg);
      addLog({
        vaultId: 'vault-creation-error',
        action: 'Vault creation failed',
        detail: errorMsg,
      });
    } finally {
      setIsCreatingVault(false);
    }
  };

  const onDeposit = async (vaultId: string) => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setErrorMessage('Please enter a valid deposit amount');
      return;
    }

    if (!connected || !publicKey) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    if (!signTransaction) {
      setErrorMessage('Wallet does not support transactions');
      return;
    }

    setIsDepositing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const amount = parseFloat(depositAmount);
      
      // In production, this would:
      // 1. Create a token transfer instruction for ABRA tokens
      // 2. Call the vault deposit instruction on the Abraxas program
      // 3. Sign and send the transaction
      
      // For now, optimistically update UI
      addLog({
        vaultId,
        action: 'Deposit initiated',
        detail: `${amount} ABRA deposited to vault`,
      });

      setSuccessMessage(`Successfully deposited ${amount} ABRA!`);
      setDepositAmount('');
      setActiveVaultId(null);
      
      // Refresh balance
      if (publicKey && connected) {
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / 1e9);
      }

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Deposit failed';
      setErrorMessage(errorMsg);
      addLog({
        vaultId,
        action: 'Deposit failed',
        detail: errorMsg,
      });
    } finally {
      setIsDepositing(false);
    }
  };

  const onWithdraw = async (vaultId: string, amount: number) => {
    if (amount <= 0) {
      setErrorMessage('Please enter a valid withdrawal amount');
      return;
    }

    if (!connected || !publicKey) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    setIsWithdrawing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // In production, this would:
      // 1. Call the vault withdrawal instruction on the Abraxas program
      // 2. Sign and send the transaction
      
      addLog({
        vaultId,
        action: 'Withdrawal initiated',
        detail: `${amount} ABRA withdrawn from vault`,
      });

      setSuccessMessage(`Successfully withdrew ${amount} ABRA!`);
      
      // Refresh balance
      if (publicKey && connected) {
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / 1e9);
      }

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Withdrawal failed';
      setErrorMessage(errorMsg);
      addLog({
        vaultId,
        action: 'Withdrawal failed',
        detail: errorMsg,
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  const getSelectedAgent = (vaultId: string, assignedAgent?: string | null) => {
    return selectedAgents?.[vaultId] ?? assignedAgent ?? agentOptions[0];
  };

  const onAssignAgent = (vaultId: string, agentLabel: string) => {
    if (!connected) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    try {
      assignAgent(vaultId, agentLabel);
      addLog({
        vaultId,
        action: `Agent assigned: ${agentLabel}`,
      });
      setSuccessMessage(`${agentLabel} assigned to vault!`);
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to assign agent';
      setErrorMessage(errorMsg);
    }
  };



  const handleTaxReport = async (vaultId: string) => {
    const vault = vaults.find((entry) => entry.id === vaultId);
    if (!vault) {
      setErrorMessage('Vault not found for tax report generation');
      return;
    }

    setGeneratingTaxReportId(vaultId);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const report = buildVaultTaxReport({
        vault,
        deposits: laCasaDeposits,
        logs,
        tradeRecords: sophiaTradeRecords,
        agents: sophiaAgents,
        year: ACTIVE_TAX_YEAR,
      });

      downloadVaultTaxReportPdf(report);
      downloadVaultTaxReportCsv(report);

      setSuccessMessage(`${vault.name} tax report exported as PDF and CSV.`);
      setTimeout(() => setSuccessMessage(null), 3500);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate tax report');
    } finally {
      setGeneratingTaxReportId(null);
    }
  };

  return (
    <section className="space-y-6">
      {/* Error/Success Messages */}
      {errorMessage && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-red-200 font-bold">Oops! Something went wrong</p>
            <p className="text-sm text-red-300/80 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 flex items-start gap-3">
          <CheckCircle size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-emerald-200 font-bold">{successMessage}</p>
        </div>
      )}

      {/* Welcome Section */}
      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.88),rgba(10,37,64,0.76),rgba(56,189,248,0.15))] p-6 backdrop-blur">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-cyan-300/80 uppercase tracking-widest font-mono mb-3">&gt; Own Your Asset Management Firm</p>
          <h1 className="text-2xl font-bold text-cyan-200 mb-2">🏦 Vault Management — Steps 3–6</h1>
          <p className="text-sm text-slate-300/90 leading-relaxed mb-4">
            You've acquired ABRA and minted your NFT. Now create a vault to stake your asset with a Sophia agent who manages 24/7. You own everything. The agents do the work. You keep the ABRAX gains.
          </p>
          
          <div className="grid grid-cols-2 gap-3 text-xs mt-4">
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">🔒</span>
              <div>
                <p className="font-bold text-slate-200">Safe & Secure</p>
                <p className="text-slate-400">Protected by smart contracts</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">📈</span>
              <div>
                <p className="font-bold text-slate-200">Automatic Growth</p>
                <p className="text-slate-400">Your money compounds</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">🤖</span>
              <div>
                <p className="font-bold text-slate-200">AI Managed</p>
                <p className="text-slate-400">Sophia handles the work</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">⏱️</span>
              <div>
                <p className="font-bold text-slate-200">Any Time</p>
                <p className="text-slate-400">Withdraw whenever you want</p>
              </div>
            </div>
          </div>

          {!connected && (
            <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-400/30">
              <p className="text-xs text-yellow-200">
                <span className="font-bold">👋 Ready to start?</span> Connect your wallet above to create your first vault.
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3">

      </div>

      {/* How It Works */}
      <article className="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-6 backdrop-blur">
        <p className="text-sm font-bold text-cyan-300 uppercase tracking-widest mb-4">📚 How Vaults Work</p>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-xl">1️⃣</span>
            <div>
              <p className="font-bold text-slate-200">Create a vault</p>
              <p className="text-xs text-slate-400">Pick a name and choose what type of investment (DApp tokens, real estate, etc.)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-xl">2️⃣</span>
            <div>
              <p className="font-bold text-slate-200">Assign an AI manager</p>
              <p className="text-xs text-slate-400">Pick Sophia Sentinel (safe), Sophia Yield (growth), or Sophia Defensive (conservative)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-xl">3️⃣</span>
            <div>
              <p className="font-bold text-slate-200">Add money</p>
              <p className="text-xs text-slate-400">Deposit your tokens into the vault</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 text-xl">4️⃣</span>
            <div>
              <p className="font-bold text-slate-200">Watch it grow</p>
              <p className="text-xs text-slate-400">Sophia automatically manages your investment and earns you rewards</p>
            </div>
          </div>
        </div>
      </article>



      {/* Create Vault */}
      <form onSubmit={onCreateVault} className="rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6 backdrop-blur">
        <p className="mb-4 text-sm font-bold text-cyan-400 uppercase tracking-widest">➕ Create Your First Vault</p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-2">Vault Name (what will you invest in?)</label>
            <input
              value={vaultName}
              onChange={(event) => setVaultName(event.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-sm placeholder-slate-500 focus:border-cyan-400 focus:outline-none disabled:opacity-50"
              placeholder="e.g., My Music Investment, Tech Growth Fund"
              disabled={!connected || isCreatingVault}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-2">What type of investment?</label>
            <select
              value={assetType}
              onChange={(event) => setAssetType(event.target.value as VaultAssetType)}
              className="w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-sm focus:border-cyan-400 focus:outline-none disabled:opacity-50"
              disabled={!connected || isCreatingVault}
            >
              <option value="dapp_equity">🎮 DApp & Tech Tokens</option>
              <option value="real_estate">🏠 Real Estate</option>
              <option value="trading_portfolio">📈 Trading & Growth</option>
              <option value="music_rights">🎵 Music & Entertainment</option>
              <option value="ip_licensing">📚 IP & Intellectual Property</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500/60 to-blue-500/60 border border-cyan-300/40 px-4 py-3 text-sm font-bold text-white hover:from-cyan-500/80 hover:to-blue-500/80 transition disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={!connected || isCreatingVault}
          >
            {isCreatingVault && <Loader size={16} className="animate-spin" />}
            {isCreatingVault ? 'Creating...' : '✨ Create Vault'}
          </button>
        </div>
      </form>

      {/* Your Vaults */}
      <article className="space-y-3">
        {vaults.length === 0 ? (
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/35 p-6 text-center">
            <p className="text-sm text-slate-400/70">📭 No vaults yet</p>
            <p className="text-xs text-slate-500 mt-1">Create one above to get started!</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-bold text-cyan-300 uppercase tracking-widest px-1">💼 Your Vaults</p>
            {vaults.map((vault) => (
              <div key={vault.id} className="rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm font-bold text-cyan-300">{vault.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{assetTypeLabel(vault.assetType)}</p>
                  </div>
                  <button
                    onClick={() => setExpandedVaultMetrics(prev => ({ ...prev, [vault.id]: !prev[vault.id] }))}
                    className="text-cyan-300 hover:text-cyan-100 transition p-1"
                  >
                    <ChevronDown size={18} className={`transition-transform ${expandedVaultMetrics[vault.id] ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Vault Balance */}
                <div className="bg-slate-950/50 rounded-lg p-3 mb-3 border border-slate-700/30">
                  <p className="text-xs text-slate-400 mb-1">Current Value</p>
                  <p className="text-lg font-bold text-cyan-300">${vault.vaultValue.toLocaleString()}</p>
                </div>

                {/* Expanded Details */}
                {expandedVaultMetrics[vault.id] && (
                  <div className="bg-slate-950/50 rounded-lg p-3 mb-3 border border-slate-700/30 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Your deposit:</span>
                      <span className="text-slate-200 font-mono">${vault.depositedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Manager:</span>
                      <span className="text-slate-200">{vault.assignedAgent || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`font-bold ${vault.circuitState === 'normal' ? 'text-emerald-400' : vault.circuitState === 'warning' ? 'text-yellow-400' : 'text-orange-400'}`}>
                        {vault.circuitState.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveVaultId(activeVaultId === vault.id ? null : vault.id)}
                      className="rounded-lg border border-cyan-300/30 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-200 hover:bg-cyan-500/20 transition disabled:opacity-50"
                      disabled={!connected}
                    >
                      💵 Add Money
                    </button>
                    <select
                      value={getSelectedAgent(vault.id, vault.assignedAgent)}
                      onChange={(event) =>
                        setSelectedAgents((current) => ({
                          ...current,
                          [vault.id]: event.target.value
                        }))
                      }
                      className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs font-bold text-slate-200 focus:border-cyan-400 focus:outline-none disabled:opacity-50"
                      disabled={!connected}
                    >
                      <option value="">Choose Manager...</option>
                      {agentOptions.map((agent) => (
                        <option key={agent} value={agent}>
                          {agent}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleTaxReport(vault.id)}
                    className="w-full rounded-lg border border-fuchsia-300/60 bg-gradient-to-r from-fuchsia-500/40 via-pink-500/35 to-amber-400/35 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-50 shadow-[0_0_22px_rgba(217,70,239,0.18)] transition hover:from-fuchsia-500/60 hover:via-pink-500/55 hover:to-amber-400/45"
                  >
                    {generatingTaxReportId === vault.id ? (
                      <span className="inline-flex items-center gap-2"><Loader size={12} className="animate-spin" /> Generating Tax Report</span>
                    ) : (
                      `Tax Report · PDF + CSV`
                    )}
                  </button>
                  <button
                    onClick={() => onAssignAgent(vault.id, getSelectedAgent(vault.id, vault.assignedAgent))}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-500/40 to-indigo-500/40 border border-purple-300/40 px-3 py-2 text-xs font-bold text-purple-200 hover:from-purple-500/60 hover:to-indigo-500/60 transition disabled:opacity-50"
                    disabled={!connected || !getSelectedAgent(vault.id, vault.assignedAgent)?.includes('Sophia')}
                  >
                    🤖 Assign Manager
                  </button>
                </div>

                {/* Deposit Form */}
                {activeVaultId === vault.id && (
                  <div className="mt-3 rounded-lg border border-cyan-300/20 bg-slate-950/50 p-3">
                    <p className="text-xs font-bold text-cyan-400 mb-2">How much do you want to add?</p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Amount"
                        className="flex-1 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-xs focus:border-cyan-400 focus:outline-none disabled:opacity-50"
                        disabled={!connected || isDepositing}
                      />
                      <button
                        onClick={() => onDeposit(vault.id)}
                        className="rounded-lg bg-emerald-500/40 border border-emerald-300/40 px-3 py-2 text-xs font-bold text-emerald-200 hover:bg-emerald-500/60 transition disabled:opacity-50 flex items-center gap-1"
                        disabled={!connected || isDepositing}
                      >
                        {isDepositing ? <Loader size={12} className="animate-spin" /> : '✓'}
                        {isDepositing ? 'Processing..' : 'Deposit'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </article>

      {/* Investment Options */}
      {futureAssetClasses.length > 0 && (
        <article className="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-6 backdrop-blur">
          <p className="mb-4 text-sm font-bold text-cyan-300 uppercase tracking-widest">🔮 Coming Soon</p>
          <div className="space-y-3">
            {futureAssetClasses.map((assetClass) => (
              <div key={assetClass.id} className="rounded-lg border border-cyan-300/10 bg-slate-950/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-cyan-300">{assetClass.title}</p>
                  <span className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-2 py-0.5 text-[9px] font-bold text-cyan-100 uppercase">
                    {assetClass.status === 'coming_soon' ? '⏳ Coming Soon' : '📋 Blueprint'}
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-slate-400">{assetClass.description}</p>
              </div>
            ))}
          </div>
        </article>
      )}

      {/* Wallet Status */}
      {!connected && (
        <article className="rounded-2xl border border-yellow-300/20 bg-yellow-500/10 p-4 backdrop-blur text-center">
          <p className="text-xs text-yellow-200">
            <span className="font-bold">👛 Not connected yet?</span><br />
            Click the wallet button in the top right to connect and start creating vaults.
          </p>
        </article>
      )}
    </section>
  );
}
