import { useMemo } from 'react';
import { useAbraxas } from '../providers/AbraxasProvider';

export function DashboardPage() {
  const { vaults, logs } = useAbraxas();

  const stats = useMemo(() => {
    const totalDeposited = vaults.reduce((sum, vault) => sum + vault.depositedAmount, 0);
    const protectedVaults = vaults.filter((vault) => vault.circuitState !== 'normal').length;
    return { totalDeposited, protectedVaults };
  }, [vaults]);

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-xs text-slate-300/80">Vaults</p>
          <p className="mt-1 text-xl font-semibold">{vaults.length}</p>
        </article>
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-xs text-slate-300/80">Protected</p>
          <p className="text-[10px] text-slate-400/80">warning + protected states</p>
          <p className="mt-1 text-xl font-semibold">{stats.protectedVaults}</p>
        </article>
      </div>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="text-xs text-slate-300/80">Tracked RWA Value (MVP)</p>
        <p className="mt-1 text-2xl font-semibold">${stats.totalDeposited.toLocaleString()}</p>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Agent Activity Logs</p>
        <div className="space-y-2">
          {logs.length === 0 ? (
            <p className="text-xs text-slate-300/80">No actions yet. Assign Sophia or run Circuit checks.</p>
          ) : (
            logs.slice(0, 6).map((log) => (
              <div key={log.id} className="rounded-xl border border-cyan-300/20 px-3 py-2 text-xs">
                <p className="text-slate-200">{log.action}</p>
                <p className="mt-1 text-slate-400/80">{new Date(log.timestamp).toLocaleTimeString()} • {log.vaultId}</p>
              </div>
            ))
          )}
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-2 text-sm font-medium">On-chain Program Stream</p>
        <div className="rounded-xl border border-cyan-300/20 bg-slate-900/70 px-3 py-3">
          <p className="text-xs text-slate-300/85">Reserved for V2.</p>
          <p className="mt-1 text-[11px] text-cyan-200/90">Live devnet log streaming and on-chain diagnostics will be re-enabled after deploy automation is finalized.</p>
        </div>
      </article>
    </section>
  );
}
