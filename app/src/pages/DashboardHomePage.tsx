import { Link } from 'react-router-dom';
import { useAbraxas } from '../providers/AbraxasProvider';
import { ACTIVE_TAX_YEAR, buildPortfolioTaxSummary } from '../lib/taxReporting';

const dashboardHeroCopy = 'Own your own AI-powered digital asset management firm. Simplified flow: Get ABRA → Mint NFT → Create Vault → Assign Sophia Agent → Stake → Earn ABRAX. You own everything. The agents work 24/7. You keep the gains. No intermediaries. No fiat rails. Pure sovereign finance on Solana.';

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function DashboardHomePage() {
  const { vaults, laCasaDeposits, sophiaAgents, logs, sophiaTradeRecords } = useAbraxas();

  const totalVaultValue = vaults.reduce((sum, vault) => sum + vault.vaultValue, 0);
  const totalDeposited = vaults.reduce((sum, vault) => sum + vault.depositedAmount, 0);
  const totalGains = totalVaultValue - totalDeposited;
  const protectedVaults = vaults.filter((vault) => vault.circuitState === 'protected').length;
  const activeAgents = sophiaAgents.filter((agent) => agent.status === 'active').length;
  const latestActions = logs.slice(0, 3);
  const taxSummary = buildPortfolioTaxSummary({
    vaults,
    deposits: laCasaDeposits,
    logs,
    tradeRecords: sophiaTradeRecords,
    agents: sophiaAgents,
    year: ACTIVE_TAX_YEAR,
  });

  return (
    <section className="space-y-4 pb-4">
      <article className="glow-panel overflow-hidden rounded-[28px] border border-cyan-300/25 bg-slate-950/80 p-5 backdrop-blur-xl">
        <div className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
          Own The Firm
        </div>
        <h1 className="mt-4 text-2xl font-semibold leading-tight text-white">AI-powered asset management that stays under your control.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">{dashboardHeroCopy}</p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            to="/app/forge"
            className="rounded-2xl border border-amber-300/35 bg-amber-300/10 px-4 py-4 text-sm font-semibold text-amber-100 transition hover:border-amber-200/60 hover:bg-amber-300/16"
          >
            Tokenize New Asset
          </Link>
          <Link
            to="/app/vaults"
            className="rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-4 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/16"
          >
            Open a Vault
          </Link>
          <Link
            to="/app/vaults"
            className="rounded-2xl border border-emerald-300/35 bg-emerald-300/10 px-4 py-4 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200/60 hover:bg-emerald-300/16"
          >
            View My Gains
          </Link>
        </div>
      </article>

      <div className="grid grid-cols-2 gap-3">
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Total Vault Value</p>
          <p className="mt-2 text-2xl font-semibold text-cyan-100">{formatUsd(totalVaultValue)}</p>
          <p className="mt-1 text-xs text-slate-400">Across {vaults.length} managed vaults</p>
        </article>
        <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">You Keep The Gains</p>
          <p className={`mt-2 text-2xl font-semibold ${totalGains >= 0 ? 'text-emerald-200' : 'text-rose-200'}`}>
            {formatUsd(totalGains)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Net change vs deposited capital</p>
        </article>
        <article className="glow-panel rounded-2xl border border-violet-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Tokenized Assets</p>
          <p className="mt-2 text-2xl font-semibold text-violet-100">{laCasaDeposits.length}</p>
          <p className="mt-1 text-xs text-slate-400">NFT-backed records routed into vaults</p>
        </article>
        <article className="glow-panel rounded-2xl border border-amber-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Agents On Duty</p>
          <p className="mt-2 text-2xl font-semibold text-amber-100">{activeAgents}</p>
          <p className="mt-1 text-xs text-slate-400">{protectedVaults} vaults currently in protected mode</p>
        </article>
      </div>

      <article className="glow-panel rounded-2xl border border-fuchsia-300/25 bg-[linear-gradient(140deg,rgba(15,23,42,0.92),rgba(76,29,149,0.22),rgba(236,72,153,0.12))] p-4 backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-fuchsia-200/75">{ACTIVE_TAX_YEAR} Tax Summary</p>
            <p className="mt-2 text-2xl font-semibold text-fuchsia-100">{formatUsd(taxSummary.estimatedCapitalGainsYtd)}</p>
            <p className="mt-1 text-xs text-slate-300/80">Estimated capital gains YTD across {taxSummary.reportCount} vault reports.</p>
          </div>
          <div className="rounded-2xl border border-fuchsia-300/25 bg-slate-950/45 px-3 py-2 text-right">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Unrealized</p>
            <p className={`mt-1 text-sm font-semibold ${taxSummary.estimatedUnrealizedGainLoss >= 0 ? 'text-cyan-100' : 'text-rose-200'}`}>
              {formatUsd(taxSummary.estimatedUnrealizedGainLoss)}
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Cost Basis</p>
            <p className="mt-1 font-semibold text-white">{formatUsd(taxSummary.totalCostBasis)}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Planning Mode</p>
            <p className="mt-1 font-semibold text-white">Estimated</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-3 sm:col-span-1 col-span-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Source</p>
            <p className="mt-1 font-semibold text-white">Vault balances, BlackBox basis, ABRAX activity</p>
          </div>
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Next moves</p>
            <p className="mt-1 text-xs text-slate-400">Everything else lives as secondary actions inside the four-tab system.</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          <Link to="/app/market" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100">Market Intel</Link>
          <Link to="/app/trade" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100">Trading Console</Link>
          <Link to="/app/orion" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100">King AI</Link>
          <Link to="/app/circuit" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100">Risk Controls</Link>
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-slate-700 bg-slate-900/70 p-4 backdrop-blur">
        <p className="text-sm font-semibold text-white">Recent automation</p>
        <div className="mt-3 space-y-2">
          {latestActions.map((entry) => (
            <div key={entry.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3">
              <p className="text-sm text-slate-100">{entry.action}</p>
              {entry.detail ? <p className="mt-1 text-xs leading-5 text-slate-400">{entry.detail}</p> : null}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}