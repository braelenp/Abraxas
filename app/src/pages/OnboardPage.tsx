import { useState } from 'react';
import { ArrowRight, BadgeCheck, Coins, Image, Lock, Sparkles, Zap } from 'lucide-react';
import { useAbraxas } from '../providers/AbraxasProvider';

// ─── La Casa NFT collection definitions ──────────────────────────────────────

type NftTier = {
  id: string;
  name: string;
  collection: string;
  description: string;
  vaultTarget: string;
  athleteTokenId?: string;
  usdcAmount: number;
  mintPrice: number; // SOL
  supply: number;
  remaining: number;
  airdropMultiplier: number; // token airdrop weight per NFT
  badge: string;
};

const NFT_TIERS: NftTier[] = [
  {
    id: 'genesis-founder',
    name: 'La Casa Genesis — Founder',
    collection: 'La Casa Genesis',
    description:
      'The flagship Abraxas NFT. Routes $2,500 USDC into the OYM Prime Vault across the full athlete equity basket. Founders receive the highest airdrop allocation.',
    vaultTarget: 'vault-oym-prime',
    usdcAmount: 2500,
    mintPrice: 2.5,
    supply: 100,
    remaining: 87,
    airdropMultiplier: 5,
    badge: '👑',
  },
  {
    id: 'athlete-cdubb',
    name: 'La Casa Athlete — C Dubb',
    collection: 'La Casa Athlete Series',
    description:
      'Route $1,000 USDC directly into the $CDUBB athlete equity position. Token price appreciates on deposit. Airdrop allocation weighted to athlete performance index.',
    vaultTarget: 'vault-oym-prime',
    athleteTokenId: 'token-cdubb',
    usdcAmount: 1000,
    mintPrice: 1.0,
    supply: 250,
    remaining: 212,
    airdropMultiplier: 2,
    badge: '⚡',
  },
  {
    id: 'athlete-hailee',
    name: 'La Casa Athlete — Hailee',
    collection: 'La Casa Athlete Series',
    description:
      'Route $1,000 USDC into the $HAILEE guard alpha position. Highest training score in the basket (94). Airdrop allocation reflects performance premium.',
    vaultTarget: 'vault-oym-prime',
    athleteTokenId: 'token-hailee',
    usdcAmount: 1000,
    mintPrice: 1.0,
    supply: 250,
    remaining: 198,
    airdropMultiplier: 2,
    badge: '🛡️',
  },
  {
    id: 'athlete-ajwill',
    name: 'La Casa Athlete — AJ Will',
    collection: 'La Casa Athlete Series',
    description:
      'Route $1,000 USDC into the $AJWILL development basket. Strong week-over-week stat consistency — build-phase signal from King AI.',
    vaultTarget: 'vault-oym-prime',
    athleteTokenId: 'token-ajwill',
    usdcAmount: 1000,
    mintPrice: 1.0,
    supply: 250,
    remaining: 224,
    airdropMultiplier: 2,
    badge: '📈',
  },
  {
    id: 'rwa-explorer',
    name: 'La Casa RWA Explorer',
    collection: 'La Casa RWA Series',
    description:
      'Route $500 USDC into the World Labs Expansion Vault (Real Estate class). First-mover allocation into the Abraxas real estate market layer.',
    vaultTarget: 'vault-worldlabs-rwa',
    usdcAmount: 500,
    mintPrice: 0.5,
    supply: 500,
    remaining: 471,
    airdropMultiplier: 1,
    badge: '🏗️',
  },
];

// ─── Token acquisition tiers ──────────────────────────────────────────────────

type TokenTier = {
  id: string;
  label: string;
  amount: string;
  solPrice: number;
  bonus: string;
  highlight?: boolean;
};

const TOKEN_TIERS: TokenTier[] = [
  { id: 'starter', label: 'Starter', amount: '500 ABX', solPrice: 0.25, bonus: 'Whitelist access' },
  { id: 'builder', label: 'Builder', amount: '2,500 ABX', solPrice: 1.0, bonus: '+10% bonus tokens', highlight: true },
  { id: 'accelerator', label: 'Accelerator', amount: '7,500 ABX', solPrice: 2.5, bonus: '+20% bonus + genesis NFT priority' },
  { id: 'founder', label: 'Founder', amount: '20,000 ABX', solPrice: 6.0, bonus: '+30% bonus + all 3 athlete NFTs' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function OnboardPage() {
  const { depositLaCasa, laCasaDeposits, addLog } = useAbraxas();
  const [activeTab, setActiveTab] = useState<'nft' | 'token'>('nft');
  const [mintingId, setMintingId] = useState<string | null>(null);
  const [mintedSet, setMintedSet] = useState<Set<string>>(new Set());
  const [acquiringId, setAcquiringId] = useState<string | null>(null);
  const [acquiredSet, setAcquiredSet] = useState<Set<string>>(new Set());

  // Total airdrop weight from user's minted NFTs
  const totalAirdropWeight = NFT_TIERS.filter((t) => mintedSet.has(t.id)).reduce(
    (sum, t) => sum + t.airdropMultiplier,
    0,
  );

  function handleMint(tier: NftTier) {
    if (mintingId || mintedSet.has(tier.id)) return;
    setMintingId(tier.id);

    // Simulate wallet confirmation delay
    setTimeout(() => {
      const label = `${tier.name} #${String(Math.floor(Math.random() * (tier.supply - tier.remaining + 1) + 1)).padStart(3, '0')}`;
      depositLaCasa({
        vaultId: tier.vaultTarget,
        label,
        collection: tier.collection,
        stablecoinAmount: tier.usdcAmount,
        athleteTokenId: tier.athleteTokenId,
      });
      setMintedSet((prev) => new Set(prev).add(tier.id));
      setMintingId(null);
    }, 1400);
  }

  function handleAcquire(tier: TokenTier) {
    if (acquiringId || acquiredSet.has(tier.id)) return;
    setAcquiringId(tier.id);

    setTimeout(() => {
      addLog({
        vaultId: 'vault-oym-prime',
        action: `ABX token acquisition — ${tier.label} tier`,
        detail: `${tier.amount} acquired at ${tier.solPrice} SOL. ${tier.bonus}.`,
      });
      setAcquiredSet((prev) => new Set(prev).add(tier.id));
      setAcquiringId(null);
    }, 1400);
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-3xl mx-auto space-y-8">

      {/* Header */}
      <div className="glow-panel p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-violet-400" />
          <h1 className="text-lg font-semibold text-white">Early Adoption</h1>
        </div>
        <p className="text-sm text-white/60 leading-relaxed">
          Two paths. One destination — early equity in the Abraxas RWA Stock Market.
          Mint a La Casa NFT to onboard capital and earn a token airdrop, or acquire
          ABX tokens directly for immediate liquid stake.
        </p>
        {totalAirdropWeight > 0 && (
          <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-lg px-3 py-2">
            <BadgeCheck size={15} className="text-violet-400" />
            <span className="text-xs text-violet-300">
              Your airdrop weight: <strong>{totalAirdropWeight}x</strong> — {mintedSet.size} NFT{mintedSet.size !== 1 ? 's' : ''} minted
            </span>
          </div>
        )}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('nft')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all
            ${activeTab === 'nft'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
              : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
        >
          <Image size={15} />
          La Casa NFTs
        </button>
        <button
          onClick={() => setActiveTab('token')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all
            ${activeTab === 'token'
              ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-400/20'
              : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
        >
          <Coins size={15} />
          ABX Token
        </button>
      </div>

      {/* NFT Tab */}
      {activeTab === 'nft' && (
        <div className="space-y-4">
          <div className="glow-panel p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Zap size={14} className="text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-xs text-white/60 leading-relaxed">
                Each NFT embeds a USDC deposit into a specific Abraxas vault on-chain.
                Your deposit is recorded as a capital founding event — you'll receive
                a proportional ABX token airdrop at launch.
              </p>
            </div>
          </div>

          {NFT_TIERS.map((tier) => {
            const isMinting = mintingId === tier.id;
            const minted = mintedSet.has(tier.id);
            const soldPct = Math.round(((tier.supply - tier.remaining) / tier.supply) * 100);

            return (
              <div key={tier.id} className="glow-panel p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{tier.badge}</span>
                      <span className="text-sm font-semibold text-white">{tier.name}</span>
                    </div>
                    <p className="text-xs text-white/50">{tier.collection}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-white">{tier.mintPrice} SOL</div>
                    <div className="text-xs text-white/40">${tier.usdcAmount.toLocaleString()} USDC vault</div>
                  </div>
                </div>

                <p className="text-xs text-white/60 leading-relaxed">{tier.description}</p>

                {/* Airdrop + supply row */}
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <BadgeCheck size={12} className="text-violet-400" />
                    <span className="text-violet-300">{tier.airdropMultiplier}x airdrop weight</span>
                  </span>
                  <span>{tier.remaining} / {tier.supply} remaining</span>
                </div>

                {/* Supply bar */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full transition-all duration-700"
                    style={{ width: `${soldPct}%` }}
                  />
                </div>

                <button
                  onClick={() => handleMint(tier)}
                  disabled={isMinting || minted}
                  className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all
                    ${minted
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                      : isMinting
                        ? 'bg-violet-500/30 text-violet-300 cursor-wait'
                        : 'bg-violet-600 hover:bg-violet-500 text-white'}`}
                >
                  {minted ? (
                    <><BadgeCheck size={15} /> Minted — Airdrop Registered</>
                  ) : isMinting ? (
                    <>Confirming...</>
                  ) : (
                    <>Mint NFT <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
            );
          })}

          {/* My deposits summary */}
          {laCasaDeposits.length > 0 && (
            <div className="glow-panel p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-white/40" />
                <span className="text-xs font-medium text-white/60">On-chain deposit ledger</span>
              </div>
              <div className="space-y-2">
                {laCasaDeposits.map((d) => (
                  <div key={d.id} className="flex items-center justify-between text-xs">
                    <span className="text-white/60">{d.label}</span>
                    <span className="text-green-400 font-medium">${d.stablecoinAmount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Token Tab */}
      {activeTab === 'token' && (
        <div className="space-y-4">
          <div className="glow-panel p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Coins size={14} className="text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-xs text-white/60 leading-relaxed">
                ABX is the equity token of the Abraxas RWA Stock Market. Each new asset
                class, vault, and athlete listing added to the market expands the underlying
                value surface of your stake. Token holders receive priority access to new
                vault allocations and governance participation as the market matures.
              </p>
            </div>
          </div>

          {TOKEN_TIERS.map((tier) => {
            const isAcquiring = acquiringId === tier.id;
            const acquired = acquiredSet.has(tier.id);

            return (
              <div
                key={tier.id}
                className={`glow-panel p-5 space-y-4 ${tier.highlight ? 'ring-1 ring-yellow-500/40' : ''}`}
              >
                {tier.highlight && (
                  <div className="flex items-center gap-1 text-xs text-yellow-400 font-medium">
                    <Sparkles size={12} />
                    Most popular
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{tier.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{tier.bonus}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-400">{tier.amount}</div>
                    <div className="text-xs text-white/40">{tier.solPrice} SOL</div>
                  </div>
                </div>

                <button
                  onClick={() => handleAcquire(tier)}
                  disabled={isAcquiring || acquired}
                  className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all
                    ${acquired
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                      : isAcquiring
                        ? 'bg-yellow-500/30 text-yellow-300 cursor-wait'
                        : tier.highlight
                          ? 'bg-yellow-500 hover:bg-yellow-400 text-black'
                          : 'bg-white/10 hover:bg-white/15 text-white'}`}
                >
                  {acquired ? (
                    <><BadgeCheck size={15} /> Acquired — Stake Recorded</>
                  ) : isAcquiring ? (
                    <>Confirming...</>
                  ) : (
                    <>Acquire {tier.amount} <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
            );
          })}

          <div className="glow-panel p-4 space-y-1">
            <p className="text-xs text-white/40 leading-relaxed">
              Token acquisition records your stake in the Abraxas activity log. Full on-chain
              SPL token distribution will be confirmed at mainnet launch. Acquiring now
              locks your allocation at the earliest market valuation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
