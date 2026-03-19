import { useMemo } from 'react';
import { useAbraxas } from '../providers/AbraxasProvider';

export function DashboardPage() {
  const { vaults, athleteTokens, futureAssetClasses, logs } = useAbraxas();

  const stats = useMemo(() => {
    const totalDeposited = vaults.reduce((sum, vault) => sum + vault.depositedAmount, 0);
    const totalMarketValue = vaults.reduce((sum, vault) => sum + vault.vaultValue, 0);
    const athleteFloat = athleteTokens.reduce((sum, token) => sum + token.exposure, 0);
    const averageGrowth = athleteTokens.reduce((sum, token) => sum + token.valueGrowthPct, 0) / athleteTokens.length;
    const protectedVaults = vaults.filter((vault) => vault.circuitState !== 'normal').length;
    const leadingToken = [...athleteTokens].sort((left, right) => right.valueGrowthPct - left.valueGrowthPct)[0];
    return { totalDeposited, totalMarketValue, athleteFloat, averageGrowth, protectedVaults, leadingToken };
  }, [athleteTokens, vaults]);

  return (
    <section className="space-y-4">
      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(145deg,rgba(15,23,42,0.88),rgba(8,47,73,0.78),rgba(71,85,105,0.72))] p-5 backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/85">Abraxas RWA Stock Market</p>
        <h1 className="mt-2 text-2xl font-semibold text-cyan-50">Athlete equity is the first live asset class.</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
          La Casa NFTs become instant stablecoin exposure, auto-route into vaults, and feed King AI development loops that grow athlete token value instead of only trading it.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-200/90">
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/45 px-3 py-3">
            <p className="text-slate-400/90">Live basket</p>
            <p className="mt-1 font-semibold">OYM Athlete Equity</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/45 px-3 py-3">
            <p className="text-slate-400/90">King AI state</p>
            <p className="mt-1 font-semibold">Development active</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/45 px-3 py-3">
            <p className="text-slate-400/90">Next blueprint</p>
            <p className="mt-1 font-semibold">Real estate RWAs</p>
          </div>
        </div>
      </article>

      <div className="grid grid-cols-2 gap-3">
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-xs text-slate-300/80">Total market value</p>
          <p className="mt-1 text-xl font-semibold">${stats.totalMarketValue.toLocaleString()}</p>
        </article>
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-xs text-slate-300/80">Athlete float</p>
          <p className="text-[10px] text-slate-400/80">stablecoin exposure routed to tokens</p>
          <p className="mt-1 text-xl font-semibold">${stats.athleteFloat.toLocaleString()}</p>
        </article>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-xs text-slate-300/80">Average King growth</p>
          <p className="mt-1 text-xl font-semibold">{stats.averageGrowth.toFixed(1)}%</p>
        </article>
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-xs text-slate-300/80">Protected vaults</p>
          <p className="text-[10px] text-slate-400/80">warning + protected states</p>
          <p className="mt-1 text-xl font-semibold">{stats.protectedVaults}</p>
        </article>
      </div>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-300/80">Leader token</p>
            <p className="mt-1 text-2xl font-semibold">{stats.leadingToken?.symbol ?? 'N/A'}</p>
          </div>
          <div className="text-right text-xs text-slate-300/85">
            <p>{stats.leadingToken?.name ?? 'Awaiting data'}</p>
            <p className="mt-1 text-cyan-200">{stats.leadingToken ? `${stats.leadingToken.valueGrowthPct.toFixed(1)}% value growth` : 'No athlete positions yet'}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400/80">Deposited exposure: ${stats.totalDeposited.toLocaleString()} across vaults and La Casa auto-routing.</p>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Future asset classes</p>
        <div className="space-y-2">
          {futureAssetClasses.map((assetClass) => (
            <div key={assetClass.id} className="rounded-2xl border border-cyan-300/20 bg-slate-950/40 px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">{assetClass.title}</p>
                <span className="rounded-full border border-amber-200/40 bg-amber-200/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-100">
                  {assetClass.status === 'coming_soon' ? 'Coming soon' : 'Blueprint'}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300/80">{assetClass.description}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Agent Activity Logs</p>
        <div className="space-y-2">
          {logs.length === 0 ? (
            <p className="text-xs text-slate-300/80">No actions yet. Route La Casa deposits or execute a King AI plan.</p>
          ) : (
            logs.slice(0, 6).map((log) => (
              <div key={log.id} className="rounded-xl border border-cyan-300/20 px-3 py-2 text-xs">
                <p className="text-slate-200">{log.action}</p>
                {log.detail ? <p className="mt-1 text-slate-300/80">{log.detail}</p> : null}
                <p className="mt-1 text-slate-400/80">{new Date(log.timestamp).toLocaleTimeString()} • {log.vaultId}</p>
              </div>
            ))
          )}
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-2 text-sm font-medium">On-chain Program Stream</p>
        <div className="rounded-xl border border-cyan-300/20 bg-slate-900/70 px-3 py-3">
          <p className="text-xs text-slate-300/85">Devnet-ready instructions added.</p>
          <p className="mt-1 text-[11px] text-cyan-200/90">The Anchor program now models La Casa deposits, athlete-equity exposure, and King AI growth signals for the first live asset class.</p>
        </div>
      </article>
    </section>
  );
}
