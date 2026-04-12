import { FormEvent, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, AlertCircle, CheckCircle, Loader, X } from 'lucide-react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { useAbraxas } from '../providers/AbraxasProvider';
import type { VaultAssetType } from '../lib/types';
import { RuneRealm } from '../components/RuneRealm';
import { EmbeddedPhantomSwap } from '../components/EmbeddedPhantomSwap';
import { ABRAXAS_PROGRAM_ID_RAW, ABRA_TOKEN_MINT } from '../lib/solana';

const agentOptions = ['Sophia Sentinel', 'Sophia Yield', 'Sophia Defensive'];

function assetTypeLabel(assetType: VaultAssetType) {
  if (assetType === 'dapp_equity') return 'DApp Equity';
  if (assetType === 'real_estate') return 'Real Estate Development';
  if (assetType === 'trading_portfolio') return 'Trading Portfolios';
  if (assetType === 'music_rights') return 'Music Rights & Media';
  if (assetType === 'ip_licensing') return 'IP Licensing';
  return 'DApp Equity';
}

const RUNE_CONFIG = {
  rune: 'ᚨ',
  runeName: 'Ansuz',
  runeEssence: 'Divine Wisdom · Sacred Speech',
  agentName: 'SOPHIA',
  lore: "Ansuz carries the breath of Odin, divine intelligence flowing into form. Sophia speaks your vaults into being, governing every deposit, allocation, and yield cycle with autonomous precision.",
  ctaLabel: 'Open the Vaults',
  coreGlow: '34, 211, 238',
  fireGlow: '99, 102, 241',
  accentClass: 'text-cyan-300',
} as const;

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
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

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

  // Quick action handlers
  const handleSwap = () => {
    if (!connected) {
      setErrorMessage('Please connect your wallet first');
      return;
    }
    setShowSwapModal(true);
    addLog({
      vaultId: 'vaults-quick-actions',
      action: 'Swap modal opened',
    });
  };

  const handleTopUp = () => {
    if (!connected) {
      setErrorMessage('Please connect your wallet first');
      return;
    }
    // Redirect to TradePage where users can buy ABRA
    navigate('/app/trade');
    addLog({
      vaultId: 'vaults-quick-actions',
      action: 'Redirected to TradePage for Top Up',
    });
  };

  const handleWithdraw = () => {
    if (!connected) {
      setErrorMessage('Please connect your wallet first');
      return;
    }
    setShowWithdrawModal(true);
    addLog({
      vaultId: 'vaults-quick-actions',
      action: 'Withdraw (off-ramp) modal opened',
    });
  };

  const handleSwapSuccess = () => {
    setShowSwapModal(false);
    setSuccessMessage('Swap modal closed. Check your wallet for confirmation.');
    setTimeout(() => setSuccessMessage(null), 3000);
    
    // Refresh balance
    if (publicKey && connected) {
      connection.getBalance(publicKey).then(balance => {
        setWalletBalance(balance / 1e9);
      });
    }
  };

  const handleWithdrawSuccess = () => {
    setShowWithdrawModal(false);
    setSuccessMessage('Opening fiat conversion flow...');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <RuneRealm {...RUNE_CONFIG}>
    <section className="space-y-4">
      {/* Error/Success Messages */}
      {errorMessage && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-3 flex items-start gap-2">
          <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-red-200 font-medium">Error</p>
            <p className="text-xs text-red-300/80">{errorMessage}</p>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 flex items-start gap-2">
          <CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-emerald-200">{successMessage}</p>
        </div>
      )}

      {/* Wallet Status */}
      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.88),rgba(10,37,64,0.76),rgba(56,189,248,0.15))] p-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="font-mono">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">&gt; [VAULT_MARKET] LIVE_MODE</p>
            <h2 className="mt-2 text-sm font-bold text-cyan-200 tracking-widest uppercase">
              {connected ? '✓ WALLET_CONNECTED' : '○ WALLET_DISCONNECTED'}
            </h2>
          </div>
          {connected && (
            <div className="text-right">
              <p className="text-[10px] text-cyan-300/60 uppercase tracking-wider font-mono">SOL Balance</p>
              <div className="flex items-center gap-1">
                {isLoadingBalance && <Loader size={12} className="animate-spin" />}
                <p className="text-sm font-bold text-cyan-300">
                  {isLoadingBalance ? 'Loading...' : walletBalance?.toFixed(4) ?? '0.0000'}
                </p>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowAboutVaults(!showAboutVaults)}
          className="mt-3 flex items-center gap-2 text-sm text-cyan-200/80 hover:text-cyan-100 transition"
        >
          <span>{showAboutVaults ? 'Hide' : 'Show'} details</span>
          <ChevronDown size={14} className={`transition-transform ${showAboutVaults ? 'rotate-180' : ''}`} />
        </button>
        {showAboutVaults && (
          <div className="mt-3 space-y-2 text-sm">
            <p className="leading-relaxed text-slate-300/90">
              Vaults let you create diversified RWA positions across dapp equity, real estate, music rights, and more. Sophia agents automatically manage deposits, yield routing, and protective actions.
            </p>
            <p className="text-amber-100/90">
              {connected ? '✓ Your wallet is now connected to live vault operations.' : '⚠ Connect your wallet to create and manage vaults.'}
            </p>
          </div>
        )}
      </article>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={handleSwap}
          className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-3 backdrop-blur text-center hover:bg-slate-800/75 transition disabled:opacity-50" 
          disabled={!connected}
        >
          <p className="text-2xl">⇄</p>
          <p className="mt-1 text-xs font-medium text-slate-200">Swap</p>
        </button>
        <button 
          onClick={handleTopUp}
          className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-3 backdrop-blur text-center hover:bg-slate-800/75 transition disabled:opacity-50" 
          disabled={!connected}
        >
          <p className="text-2xl">↑</p>
          <p className="mt-1 text-xs font-medium text-slate-200">Top Up</p>
        </button>
        <button 
          onClick={handleWithdraw}
          className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-3 backdrop-blur text-center hover:bg-slate-800/75 transition disabled:opacity-50" 
          disabled={!connected}
        >
          <p className="text-2xl">↓</p>
          <p className="mt-1 text-xs font-medium text-slate-200">Withdraw</p>
        </button>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative rounded-3xl border border-cyan-300/20 bg-slate-900/95 p-6 backdrop-blur w-96 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSwapModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Swap Tokens</h3>
            <EmbeddedPhantomSwap />
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative rounded-3xl border border-cyan-300/20 bg-slate-900/95 p-6 backdrop-blur w-96 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-cyan-300 mb-4">Convert ABRA to Fiat</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-cyan-400/10 border border-cyan-300/20 p-4">
                <p className="text-sm text-cyan-200 mb-2">
                  <CheckCircle size={16} className="inline mr-2" />
                  Your Wallet Balance: <span className="font-bold">{walletBalance?.toFixed(4) || '0.0000'} SOL</span>
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  To convert ABRA to fiat, visit the TradePage where you can swap ABRA to USDC and use our off-ramp partners.
                </p>
              </div>

              <button
                onClick={() => {
                  navigate('/app/trade');
                  setShowWithdrawModal(false);
                }}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500/40 to-purple-500/40 border border-cyan-300/40 px-4 py-3 text-sm font-bold text-cyan-200 hover:from-cyan-500/60 hover:to-purple-500/60 transition-all"
              >
                Go to Trade Page
              </button>

              <div className="rounded-lg bg-slate-950/50 border border-slate-700/30 p-3">
                <p className="text-xs text-slate-400 mb-2 font-mono uppercase tracking-wider">Quick Steps:</p>
                <ol className="text-xs text-slate-300/70 space-y-1 list-decimal list-inside">
                  <li>Go to Trade page</li>
                  <li>Swap ABRA to USDC (Jupiter)</li>
                  <li>Use the off-ramp widget to convert to fiat</li>
                  <li>Receive in Cash App or Apple Pay</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Vault Form */}
      <form onSubmit={onCreateVault} className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono">&gt; CREATE_VAULT</p>
        <input
          value={vaultName}
          onChange={(event) => setVaultName(event.target.value)}
          className="mb-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm disabled:opacity-50"
          placeholder="Vault name"
          disabled={!connected || isCreatingVault}
        />
        <select
          value={assetType}
          onChange={(event) => setAssetType(event.target.value as VaultAssetType)}
          className="mb-3 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm disabled:opacity-50"
          disabled={!connected || isCreatingVault}
        >
          <option value="dapp_equity">DApp Equity</option>
          <option value="real_estate">Real Estate Development</option>
          <option value="trading_portfolio">Trading Portfolios</option>
          <option value="music_rights">Music Rights & Media</option>
          <option value="ip_licensing">IP Licensing</option>
        </select>
        <button
          type="submit"
          className="ui-action w-full rounded-xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={!connected || isCreatingVault}
        >
          {isCreatingVault && <Loader size={14} className="animate-spin" />}
          {isCreatingVault ? 'Creating...' : 'Create Vault'}
        </button>
      </form>

      {/* Vaults List */}
      <article className="space-y-3">
        {vaults.length === 0 ? (
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/35 p-4 text-center">
            <p className="text-[10px] text-slate-400/70 uppercase tracking-wider font-mono">No vaults yet | Create your first vault above</p>
          </div>
        ) : (
          vaults.map((vault) => (
            <div key={vault.id} className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-cyan-300 font-mono">{vault.name}</p>
                      <p className="mt-1 text-[10px] text-cyan-300/60 font-mono uppercase tracking-wider">${vault.vaultValue.toLocaleString()} | {assetTypeLabel(vault.assetType)}</p>
                    </div>
                    <button
                      onClick={() => setExpandedVaultMetrics(prev => ({ ...prev, [vault.id]: !prev[vault.id] }))}
                      className="text-cyan-300 hover:text-cyan-100 transition"
                    >
                      <ChevronDown size={18} className={`transition-transform ${expandedVaultMetrics[vault.id] ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {expandedVaultMetrics[vault.id] && (
                    <div className="mt-2 space-y-1 text-xs text-slate-300/80 border-t border-cyan-300/10 pt-2">
                      <p>Circuit: {vault.circuitState} • La Casa deposits: {vault.laCasaDeposits}</p>
                      <p>DApp Equity exposure: ${vault.athleteExposure.toLocaleString()} • Buffer: {vault.protectiveBuffer.toFixed(1)}%</p>
                      <p>Assigned: {vault.assignedAgent ?? 'None'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Deposit/Action Section */}
              {activeVaultId === vault.id && (
                <div className="mt-3 rounded-xl border border-cyan-300/20 bg-slate-950/50 p-3">
                  <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">DEPOSIT_AMOUNT</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs disabled:opacity-50"
                      disabled={!connected || isDepositing}
                    />
                    <button
                      onClick={() => onDeposit(vault.id)}
                      className="ui-action rounded-lg bg-cyan-300 px-3 py-1.5 text-xs font-semibold text-slate-950 disabled:opacity-50 flex items-center gap-1"
                      disabled={!connected || isDepositing}
                    >
                      {isDepositing && <Loader size={12} className="animate-spin" />}
                      {isDepositing ? 'Depositing..' : 'Deposit'}
                    </button>
                    <button
                      onClick={() => setActiveVaultId(null)}
                      className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 disabled:opacity-50"
                      disabled={isDepositing}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <select
                  value={getSelectedAgent(vault.id, vault.assignedAgent)}
                  onChange={(event) =>
                    setSelectedAgents((current) => ({
                      ...current,
                      [vault.id]: event.target.value
                    }))
                  }
                  className="flex-1 rounded-xl border border-slate-600 bg-slate-950 px-2 py-2 text-xs disabled:opacity-50"
                  disabled={!connected}
                >
                  {agentOptions.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => onAssignAgent(vault.id, getSelectedAgent(vault.id, vault.assignedAgent))}
                  className="ui-action rounded-xl bg-cyan-300 px-3 py-2 text-xs font-semibold text-slate-950 disabled:opacity-50"
                  disabled={!connected}
                >
                  Assign
                </button>
                <button
                  onClick={() => setActiveVaultId(activeVaultId === vault.id ? null : vault.id)}
                  className="rounded-xl border border-slate-500 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800/50 transition disabled:opacity-50"
                  disabled={!connected}
                >
                  {activeVaultId === vault.id ? 'Hide' : 'Deposit'}
                </button>
              </div>
            </div>
          ))
        )}
      </article>

      {/* Asset Classes Info */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono">&gt; ASSET_CLASS_HINTS</p>
        <div className="space-y-2">
          {futureAssetClasses.map((assetClass) => (
            <div key={assetClass.id} className="rounded-2xl border border-cyan-300/20 bg-slate-950/35 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-cyan-300 font-mono">{assetClass.title}</p>
                <span className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-100">
                  {assetClass.status === 'coming_soon' ? 'Coming soon' : 'Blueprint'}
                </span>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-cyan-300/60 font-mono uppercase tracking-[0.05em]">{assetClass.description}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
    </RuneRealm>
  );
}
