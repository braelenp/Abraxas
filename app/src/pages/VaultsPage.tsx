import { FormEvent, useState } from 'react';
import { useAbraxas } from '../providers/AbraxasProvider';
import type { VaultAssetType } from '../lib/types';

const agentOptions = ['Sophia Sentinel', 'Sophia Yield', 'Sophia Defensive'];

export function VaultsPage() {
  const { vaults, createVault, assignAgent } = useAbraxas();
  const [vaultName, setVaultName] = useState('');
  const [assetType, setAssetType] = useState<VaultAssetType>('invoice');
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
          <option value="invoice">Tokenized Invoices</option>
          <option value="art">Tokenized Art</option>
          <option value="carbon">Carbon Credits</option>
        </select>
        <button type="submit" className="ui-action w-full rounded-xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950">
          Create Vault
        </button>
      </form>

      <article className="space-y-3">
        {vaults.map((vault) => (
          <div key={vault.id} className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
            <p className="text-sm font-medium">{vault.name}</p>
            <p className="mt-1 text-xs text-slate-300/80">
              {vault.assetType.toUpperCase()} • Circuit: {vault.circuitState}
            </p>
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
    </section>
  );
}
