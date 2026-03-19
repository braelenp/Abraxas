import { FormEvent, useState } from 'react';
import { useAbraxas } from '../providers/AbraxasProvider';
import type { VaultAssetType } from '../lib/types';

const agentOptions = ['Sophia Sentinel', 'Sophia Yield', 'Sophia Defensive'];

function assetTypeLabel(assetType: VaultAssetType) {
  if (assetType === 'athlete_equity') return 'Athlete Equity';
  if (assetType === 'real_estate') return 'Real Estate Development';
  return 'Trading Portfolios';
}

export function VaultsPage() {
  const {
    vaults,
    futureAssetClasses,
    createVault,
    assignAgent,
    oymSyncStatus,
    oymSource,
    lastOymSyncAt,
    refreshOymData,
  } = useAbraxas();
  const [vaultName, setVaultName] = useState('');
  const [assetType, setAssetType] = useState<VaultAssetType>('athlete_equity');
  const [selectedAgents, setSelectedAgents] = useState<Record<string, string>>({});

  const getSelectedAgent = (vaultId: string, assignedAgent?: string | null) => {
    return selectedAgents[vaultId] ?? assignedAgent ?? agentOptions[0];
  };

  const onCreateVault = (event: FormEvent) => {
    event.preventDefault();
    if (!vaultName.trim()) {
      return;
    }
    createVault(vaultName.trim(), assetType);
    setVaultName('');
  };

  return (
    <section className="space-y-4">
      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.88),rgba(10,37,64,0.76),rgba(56,189,248,0.15))] p-4 backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/85">Abraxas Vault Market</p>
        <h2 className="mt-2 text-xl font-semibold text-cyan-50">Devnet vault showcase with live ABRA onboarding</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
          ABRA acquisition is live for early adopters, while vault and agent workflows stay available in Devnet to demonstrate full market behavior.
        </p>
        <p className="mt-3 text-sm text-amber-100/90">Genesis NFT rewards are planned as a later airdrop to qualifying ABRA holders.</p>
        <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-slate-950/35 px-3 py-3 text-xs text-slate-300/85">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p>
              OYM sync status:
              <span className="ml-1 font-semibold text-cyan-100">{oymSyncStatus}</span>
            </p>
            <button
              type="button"
              onClick={() => void refreshOymData()}
              className="ui-action rounded-xl bg-cyan-300 px-2.5 py-1.5 text-xs font-semibold text-slate-950"
            >
              Refresh OYM data
            </button>
          </div>
          {oymSource ? <p className="mt-2 truncate text-[11px] text-slate-400">Source: {oymSource}</p> : null}
          {lastOymSyncAt ? <p className="mt-1 text-[11px] text-slate-400">Last sync: {new Date(lastOymSyncAt).toLocaleString()}</p> : null}
        </div>
      </article>

      <form onSubmit={onCreateVault} className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Create RWA Vault</p>
        <input
          value={vaultName}
          onChange={(event) => setVaultName(event.target.value)}
          className="mb-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          placeholder="Vault name"
        />
        <select
          value={assetType}
          onChange={(event) => setAssetType(event.target.value as VaultAssetType)}
          className="mb-3 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
        >
          <option value="athlete_equity">Athlete Equity</option>
          <option value="real_estate">Real Estate Development</option>
          <option value="trading_portfolio">Trading Portfolios</option>
        </select>
        <button
          type="submit"
          className="ui-action w-full rounded-xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950"
        >
          Create Vault
        </button>
      </form>

      <article className="space-y-3">
        {vaults.map((vault) => (
          <div key={vault.id} className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
            <p className="text-sm font-medium">{vault.name}</p>
            <p className="mt-1 text-xs text-slate-300/80">
              {assetTypeLabel(vault.assetType)} • Circuit: {vault.circuitState}
            </p>
            <p className="mt-1 text-xs text-slate-300/80">Vault value: ${vault.vaultValue.toLocaleString()} • La Casa deposits: {vault.laCasaDeposits}</p>
            <p className="mt-1 text-xs text-slate-300/80">Athlete exposure: ${vault.athleteExposure.toLocaleString()} • Buffer: {vault.protectiveBuffer.toFixed(1)}%</p>
            <p className="mt-1 text-xs text-slate-300/80">Assigned: {vault.assignedAgent ?? 'None'}</p>
            <div className="mt-3 flex gap-2">
              <select
                value={getSelectedAgent(vault.id, vault.assignedAgent)}
                onChange={(event) =>
                  setSelectedAgents((current) => ({
                    ...current,
                    [vault.id]: event.target.value
                  }))
                }
                className="flex-1 rounded-xl border border-slate-600 bg-slate-950 px-2 py-2 text-xs"
              >
                {agentOptions.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
              <button
                onClick={() => assignAgent(vault.id, getSelectedAgent(vault.id, vault.assignedAgent))}
                className="ui-action rounded-xl bg-cyan-300 px-3 py-2 text-xs font-semibold text-slate-950"
              >
                Assign
              </button>
            </div>
          </div>
        ))}
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Future asset class hints</p>
        <div className="space-y-2">
          {futureAssetClasses.map((assetClass) => (
            <div key={assetClass.id} className="rounded-2xl border border-cyan-300/20 bg-slate-950/35 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">{assetClass.title}</p>
                <span className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-100">
                  {assetClass.status === 'coming_soon' ? 'Coming soon' : 'Blueprint'}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300/80">{assetClass.description}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
