import { Link } from 'react-router-dom';
import { useAbraxas } from '../providers/AbraxasProvider';
import { VaultsPage } from './VaultsPage';

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function VaultsHubPage() {
  const { vaults } = useAbraxas();
  const totalDeposited = vaults.reduce((sum, vault) => sum + vault.depositedAmount, 0);
  const totalValue = vaults.reduce((sum, vault) => sum + vault.vaultValue, 0);
  const netGains = totalValue - totalDeposited;

  return (
    <section className="space-y-4 pb-4">
      <article className="glow-panel rounded-[28px] border border-emerald-300/25 bg-slate-950/80 p-5 backdrop-blur-xl">
        <div className="inline-flex rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-100">
          My Vaults
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-white">Stake your BlackBox NFT into Sophia Vaults for autonomous AI management.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Tokenize real-world assets into BlackBox NFTs, stake them into intelligent Sophia Vaults, and let the Species AI agents (Raido, Tide, Circuit, King AI) manage, defend, and compound your wealth 24/7 — all while you keep full ownership. Yields flow back to you as ABRAX stablecoin.
            </p>
          </div>
          <div className="min-w-[8rem] rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-right">
            <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">You Keep The Gains</p>
            <p className={`mt-2 text-xl font-semibold ${netGains >= 0 ? 'text-emerald-100' : 'text-rose-200'}`}>{formatUsd(netGains)}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-xs">
          <Link to="/app/deposit" className="block w-full rounded-xl border border-emerald-400/50 bg-gradient-to-r from-emerald-500/30 to-emerald-400/20 px-3 py-3 text-center font-bold text-emerald-100 transition hover:from-emerald-500/50 hover:to-emerald-400/40">🎯 Stake Your BlackBox NFT</Link>
          <Link to="/app/stake" className="block w-full rounded-xl border border-slate-600 bg-slate-950/50 px-3 py-3 text-center text-slate-300 transition hover:border-slate-500 hover:text-slate-200">Optional: Stake ABRAX</Link>
        </div>
      </article>

      <VaultsPage />
    </section>
  );
}