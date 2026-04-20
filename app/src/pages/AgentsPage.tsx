import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAbraxas } from '../providers/AbraxasProvider';

export function AgentsPage() {
  const { sophiaAgents, vaults, sophiaTradeRecords } = useAbraxas();

  const sortedAgents = useMemo(
    () => [...sophiaAgents].sort((a, b) => b.performanceScore - a.performanceScore),
    [sophiaAgents],
  );

  const ownedAgents = sortedAgents.filter((agent) => agent.assignedToVaults.length > 0 || agent.mintedTokenAmount);
  const totalPnL = sortedAgents.reduce((sum, agent) => sum + agent.totalPnL, 0);

  return (
    <section className="space-y-4 pb-4">
      <article className="glow-panel rounded-[28px] border border-violet-300/25 bg-slate-950/80 p-5 backdrop-blur-xl">
        <div className="inline-flex rounded-full border border-violet-300/35 bg-violet-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-100">
          Agents
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-white">Own the agents that grow and defend your vaults.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Browse the marketplace, review live performance, and track which Sophia agents are already working inside your stack. This is where automation becomes an owned asset instead of rented software.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-violet-300/20 bg-slate-900/75 p-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Marketplace</p>
            <p className="mt-2 text-xl font-semibold text-violet-100">{sortedAgents.length}</p>
            <p className="mt-1 text-xs text-slate-400">Agents available to review</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Owned / Assigned</p>
            <p className="mt-2 text-xl font-semibold text-cyan-100">{ownedAgents.length}</p>
            <p className="mt-1 text-xs text-slate-400">Already attached to your flow</p>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Agent PnL</p>
            <p className={`mt-2 text-xl font-semibold ${totalPnL >= 0 ? 'text-emerald-100' : 'text-rose-200'}`}>${(totalPnL / 1000).toFixed(1)}K</p>
            <p className="mt-1 text-xs text-slate-400">Across {sophiaTradeRecords.length} tracked trades</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          <Link to="/app/orion" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-violet-300/45 hover:text-violet-100">King AI Desk</Link>
          <Link to="/app/circuit" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-violet-300/45 hover:text-violet-100">Circuit Defense</Link>
          <Link to="/app/trade" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-violet-300/45 hover:text-violet-100">Trading Console</Link>
          <Link to="/app/market" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-violet-300/45 hover:text-violet-100">Market Signals</Link>
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-violet-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-violet-100">Owned agents</p>
            <p className="mt-1 text-xs text-slate-400">Agents already minted, assigned, or active inside vault management.</p>
          </div>
          <p className="text-xs text-slate-500">{vaults.length} vaults connected</p>
        </div>
        <div className="mt-4 space-y-2">
          {(ownedAgents.length ? ownedAgents : sortedAgents.slice(0, 3)).map((agent) => (
            <div key={agent.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{agent.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{agent.description}</p>
                </div>
                <span className="rounded-full border border-violet-300/30 bg-violet-300/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
                  {agent.performanceScore}/100
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
                <span className="rounded-full border border-slate-700 px-2 py-1">{agent.specialty}</span>
                <span className="rounded-full border border-slate-700 px-2 py-1">{agent.winRate.toFixed(1)}% win rate</span>
                <span className="rounded-full border border-slate-700 px-2 py-1">{agent.totalTradesExecuted} trades</span>
                <span className="rounded-full border border-slate-700 px-2 py-1">{agent.assignedToVaults.length} vaults</span>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-violet-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="text-sm font-semibold text-violet-100">Marketplace leaderboard</p>
        <p className="mt-1 text-xs text-slate-400">Verifiable performance history for the Sophia layer.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-violet-300/15 bg-slate-950/60">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-violet-300/15 bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-3 py-2 font-medium">Agent</th>
                <th className="px-3 py-2 font-medium">Specialty</th>
                <th className="px-3 py-2 font-medium text-right">Score</th>
                <th className="px-3 py-2 font-medium text-right">Win Rate</th>
                <th className="px-3 py-2 font-medium text-right">PnL</th>
              </tr>
            </thead>
            <tbody>
              {sortedAgents.map((agent) => (
                <tr key={agent.id} className="border-b border-violet-300/10 last:border-b-0">
                  <td className="px-3 py-3">
                    <p className="font-semibold text-violet-100">{agent.name}</p>
                    <p className="text-[11px] text-slate-400">{agent.tradingStyle}</p>
                  </td>
                  <td className="px-3 py-3 text-slate-300">{agent.specialty}</td>
                  <td className="px-3 py-3 text-right font-semibold text-violet-200">{agent.performanceScore}</td>
                  <td className="px-3 py-3 text-right text-cyan-200">{agent.winRate.toFixed(1)}%</td>
                  <td className={`px-3 py-3 text-right font-semibold ${agent.totalPnL >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    ${(agent.totalPnL / 1000).toFixed(1)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}