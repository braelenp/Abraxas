import { ArrowUpRight, Coins, Gem, Sparkles, Wallet } from 'lucide-react';

type TokenTier = {
  id: string;
  label: string;
  amount: string;
  note: string;
  highlight?: boolean;
};

const ABRA_SYMBOL = 'ABRA';
const ABRA_TOKEN_CA = import.meta.env.VITE_ABRA_TOKEN_CONTRACT_ADDRESS?.trim() || '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const ABRA_BUY_URL = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || `https://bags.fm/${ABRA_TOKEN_CA}`;

const TOKEN_TIERS: TokenTier[] = [
  { id: 'starter', label: 'Starter', amount: '500 ABRA', note: 'Entry early-adopter stake' },
  { id: 'builder', label: 'Builder', amount: '2,500 ABRA', note: 'Balanced early allocation', highlight: true },
  { id: 'accelerator', label: 'Accelerator', amount: '7,500 ABRA', note: 'High-conviction market stake' },
  { id: 'founder', label: 'Founder', amount: '20,000 ABRA', note: 'Founder-scale early position' },
];

export function OnboardPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="glow-panel p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-violet-400" />
          <h1 className="text-lg font-semibold text-white">Early Adoption — Live</h1>
        </div>
        <p className="text-sm text-white/65 leading-relaxed">
          Athlete-specific token listings are not live yet. Early adopters onboard now through
          <span className="text-yellow-300 font-semibold"> ABRA token acquisition</span>, while core dApp flows remain live in Devnet showcase mode.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="glow-panel p-5 space-y-3">
          <div className="flex items-center gap-2 text-yellow-300">
            <Coins size={16} />
            <h2 className="text-sm font-semibold text-white">ABRA Token Acquisition (Live)</h2>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Acquire ABRA now for immediate liquid stake in the Abraxas RWA Stock Market.
            This is the live onboarding path while individual athlete token issuance remains pending.
          </p>
          <div className="rounded-xl border border-amber-300/25 bg-slate-900/70 p-3 space-y-1">
            <p className="text-[10px] uppercase tracking-[0.16em] text-amber-200/75 font-semibold">ABRA Token</p>
            <p className="text-[11px] text-slate-200">Symbol: <span className="font-semibold text-amber-200">{ABRA_SYMBOL}</span></p>
            <p className="text-[11px] break-all font-mono text-slate-100">{ABRA_TOKEN_CA}</p>
          </div>
          <a
            href={ABRA_BUY_URL}
            target="_blank"
            rel="noreferrer"
            className="ui-action inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-300/45 bg-amber-500/25 text-sm font-semibold text-amber-100 hover:bg-amber-500/35"
          >
            Buy ABRA Token <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.14em] text-amber-200/75 font-semibold">ABRA Position Guides</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOKEN_TIERS.map((tier) => (
            <div key={tier.id} className={`glow-panel p-4 space-y-2 ${tier.highlight ? 'ring-1 ring-amber-300/40' : ''}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{tier.label}</p>
                {tier.highlight ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-semibold">
                    <Gem size={11} /> Popular
                  </span>
                ) : null}
              </div>
              <p className="text-lg font-bold text-amber-200">{tier.amount}</p>
              <p className="text-xs text-white/55">{tier.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glow-panel p-4 text-xs text-white/50 leading-relaxed flex items-start gap-2">
        <Wallet size={14} className="mt-0.5 shrink-0 text-cyan-300" />
        <p>
          Live purchases are executed on BAGS. Genesis NFT rewards can be airdropped later to qualifying early ABRA holders,
          while the current app release focuses on token acquisition and devnet market showcase.
        </p>
      </div>
    </div>
  );
}
