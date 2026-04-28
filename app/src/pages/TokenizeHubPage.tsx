import { Link } from 'react-router-dom';
import { SophiaMintPage } from './SophiaMintPage';

export function TokenizeHubPage() {
  return (
    <section className="space-y-4 pb-4">
      <article className="glow-panel rounded-[28px] border border-purple-400/25 bg-slate-950/80 p-5 backdrop-blur-xl">
        <div className="inline-flex rounded-full border border-purple-400/35 bg-purple-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-100">
          BlackBox NFT Minting
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-white">Mint BlackBox NFTs – The On-Chain Black Card for Real Assets.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Tokenize real-world assets (real estate, watches, art, yachts, jets, collectibles) into BlackBox NFTs. Create the immutable proof-of-ownership record on-chain. Deploy into Sophia Vaults where Species AI agents manage and compound your capital. Earn ALLURE stablecoin yields while maintaining complete sovereignty.
        </p>
        <p className="mt-2 text-xs text-amber-300 font-semibold">The full tokenization loop: Academy trading edge → Generate capital → Mint BlackBox NFT → Deploy into Sophia Vaults → Species agents manage and compound → Earn ALLURE yields</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <Link to="/app/vaults" className="rounded-xl border border-purple-600 bg-purple-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-purple-400/45 hover:text-purple-100">Deploy to Vaults</Link>
          <Link to="/app/forge" className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-center text-slate-200 transition hover:border-purple-400/45 hover:text-purple-100">Legacy Forge</Link>
        </div>
      </article>

      <SophiaMintPage />
    </section>
  );
}