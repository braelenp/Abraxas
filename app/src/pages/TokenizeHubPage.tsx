import { Link } from 'react-router-dom';
import { SophiaMintPage } from './SophiaMintPage';

export function TokenizeHubPage() {
  return (
    <section className="space-y-4 pb-4">
      <article className="glow-panel rounded-[28px] border border-amber-300/25 bg-slate-950/80 p-5 backdrop-blur-xl">
        <div className="inline-flex rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100">
          Tokenize
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-white">Turn real-world ownership into La Casa NFTs.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          This is the front door for getting assets on-chain. Mint the NFT, create the proof of ownership record, then route it into a Sophia Vault so the agents can work on top of it.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <Link to="/app/vaults" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-amber-300/45 hover:text-amber-100">Send To Vaults</Link>
          <Link to="/app/forge" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-amber-300/45 hover:text-amber-100">Legacy Forge</Link>
        </div>
      </article>

      <SophiaMintPage />
    </section>
  );
}