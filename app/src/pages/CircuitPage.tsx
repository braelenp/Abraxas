import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useAbraxas } from '../providers/AbraxasProvider';

export function CircuitPage() {
  const { vaults, runCircuitCheck } = useAbraxas();
  const [vaultId, setVaultId] = useState(vaults[0]?.id ?? '');
  const [priceSpeedBps, setPriceSpeedBps] = useState(450);
  const [liquidityDrainBps, setLiquidityDrainBps] = useState(350);
  const [activitySpikeBps, setActivitySpikeBps] = useState(500);
  const [lastAction, setLastAction] = useState('Not evaluated yet');

  useEffect(() => {
    if (!vaultId && vaults.length > 0) {
      setVaultId(vaults[0].id);
      return;
    }

    if (vaultId && !vaults.some((vault) => vault.id === vaultId) && vaults.length > 0) {
      setVaultId(vaults[0].id);
    }
  }, [vaultId, vaults]);

  const selectedVault = useMemo(() => vaults.find((vault) => vault.id === vaultId), [vaults, vaultId]);

  const onEvaluate = (event: FormEvent) => {
    event.preventDefault();
    const action = runCircuitCheck(vaultId, { priceSpeedBps, liquidityDrainBps, activitySpikeBps });
    setLastAction(`${action} • ${new Date().toLocaleTimeString()}`);
  };

  return (
    <section className="space-y-4">
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Circuit Safety Trigger Simulator</p>
        <form onSubmit={onEvaluate} className="space-y-3">
          <select
            value={vaultId}
            onChange={(event) => setVaultId(event.target.value)}
            className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          >
            {vaults.map((vault) => (
              <option key={vault.id} value={vault.id}>
                {vault.name}
              </option>
            ))}
          </select>

          <label className="block text-xs text-slate-300/80">Price Speed (bps)</label>
          <input
            type="number"
            value={priceSpeedBps}
            onChange={(event) => setPriceSpeedBps(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          />

          <label className="block text-xs text-slate-300/80">Liquidity Drain (bps)</label>
          <input
            type="number"
            value={liquidityDrainBps}
            onChange={(event) => setLiquidityDrainBps(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          />

          <label className="block text-xs text-slate-300/80">Activity Spike (bps)</label>
          <input
            type="number"
            value={activitySpikeBps}
            onChange={(event) => setActivitySpikeBps(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          />

          <button type="submit" className="ui-action w-full rounded-xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950">
            Evaluate Circuit
          </button>
        </form>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 text-sm backdrop-blur">
        <p>Vault: {selectedVault?.name ?? 'N/A'}</p>
        <p className="mt-2 text-slate-300">Last action: {lastAction}</p>
        <p className="mt-2 text-xs text-slate-400/80">Rules: warning when speed &gt; 500 or drain &gt; 600; protect when speed &gt; 1000, drain &gt; 900, or spike &gt; 1200.</p>
      </article>
    </section>
  );
}
