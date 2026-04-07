import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAbraxas } from '../providers/AbraxasProvider';
import { PhantomNFTMintComponent } from '../components/PhantomNFTMintComponent';

export function SophiaMintPage() {
  const wallet = useWallet();
  const { addLog, vaults } = useAbraxas();
  const [dailyFee, setDailyFee] = useState(0.25);

  const handleMintSuccess = (mintAddress: string) => {
    const selectedVaultId = vaults[0]?.id ?? 'global';
    addLog({
      vaultId: selectedVaultId,
      action: `Sophia NFT minted successfully via Phantom`,
      tx: mintAddress,
    });
  };

  return (
    <section className="space-y-4">
      {/* Phantom Sophia Mint Component */}
      <PhantomNFTMintComponent 
        nftType="sophia" 
        agentId="001"
        onSuccess={handleMintSuccess}
      />

      {/* Sophia Marketplace (MVP Stub) */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="text-sm font-medium">Sophia Marketplace (MVP Stub)</p>
        <p className="mt-2 text-xs text-slate-300/80">List your Sophia NFT for rental so other vault owners can assign it.</p>
        <label className="mt-3 block text-xs text-slate-300/80">Daily rental fee (SOL)</label>
        <input
          value={dailyFee}
          onChange={(event) => setDailyFee(Number(event.target.value))}
          type="number"
          min="0"
          step="0.01"
          className="mt-1 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
        />
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => alert(`Listing stub created at ${dailyFee} SOL/day`)}
            className="ui-action flex-1 rounded-xl border border-emerald-200/70 bg-emerald-300 px-3 py-2 text-xs font-semibold text-slate-950"
          >
            List Sophia
          </button>
          <button
            onClick={() => alert(`Rental stub accepted at ${dailyFee} SOL/day`)}
            className="ui-action flex-1 rounded-xl border border-sky-200/70 bg-sky-300 px-3 py-2 text-xs font-semibold text-slate-950"
          >
            Rent Sophia
          </button>
        </div>
      </article>

      {/* Sophia Mint Checkout Info */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Phantom Integration</p>
          <span className="rounded-full border border-green-200/55 bg-green-300/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-100">
            Live
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-300/80">Sophia NFTs are now minted directly through Phantom wallet using Metaplex protocol. Your Sophia Agent will appear in your wallet immediately after minting.</p>
        <div className="mt-3 space-y-1 text-xs text-slate-400">
          <p>✓ One-click minting with Phantom</p>
          <p>✓ Instant wallet delivery</p>
          <p>✓ Full Metaplex compliance</p>
          <p>✓ Marketplace tradeable</p>
        </div>
      </article>
    </section>
  );
}
