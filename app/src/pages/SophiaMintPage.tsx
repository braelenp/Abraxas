import { useMemo, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useAbraxas } from '../providers/AbraxasProvider';

export function SophiaMintPage() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { addLog, vaults } = useAbraxas();
  const [mintState, setMintState] = useState<'idle' | 'minting' | 'done' | 'failed'>('idle');
  const [message, setMessage] = useState('');
  const [dailyFee, setDailyFee] = useState(0.25);

  const canMintStub = useMemo(() => wallet.connected && Boolean(wallet.publicKey), [wallet.connected, wallet.publicKey]);

  const mintSophiaStub = async () => {
    if (!canMintStub || !wallet.publicKey) {
      setMessage('Connect Phantom or Backpack to mint Sophia.');
      return;
    }

    try {
      setMintState('minting');
      const signature = await connection.requestAirdrop(wallet.publicKey, 1_000_000);
      const selectedVaultId = vaults[0]?.id ?? 'global';
      addLog({
        vaultId: selectedVaultId,
        action: 'Sophia NFT mint stub executed (Metaplex wiring ready)',
        tx: signature,
      });
      setMintState('done');
      setMessage(`Stub transaction: ${signature.slice(0, 16)}...`);
    } catch (error) {
      setMintState('failed');
      setMessage(`Mint stub failed: ${(error as Error).message}`);
    }
  };

  return (
    <section className="space-y-4">
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="text-sm font-medium">Mint Sophia Agent NFT</p>
        <p className="mt-2 text-xs text-slate-300/80">MVP stub is wired for wallet-driven mint flow on devnet. Replace with full Metaplex mint transaction in week 2.</p>
        <button
          onClick={mintSophiaStub}
          disabled={mintState === 'minting'}
          className="ui-action mt-4 w-full rounded-xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
        >
          {mintState === 'minting' ? 'Minting…' : 'Mint Sophia (Stub)'}
        </button>
      </article>

      {message ? (
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 text-xs text-slate-300 backdrop-blur">{message}</article>
      ) : null}

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
            onClick={() => setMessage(`Listing stub created at ${dailyFee} SOL/day`) }
            className="ui-action flex-1 rounded-xl border border-emerald-200/70 bg-emerald-300 px-3 py-2 text-xs font-semibold text-slate-950"
          >
            List Sophia
          </button>
          <button
            onClick={() => setMessage(`Rental stub accepted at ${dailyFee} SOL/day`) }
            className="ui-action flex-1 rounded-xl border border-sky-200/70 bg-sky-300 px-3 py-2 text-xs font-semibold text-slate-950"
          >
            Rent Sophia
          </button>
        </div>
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Sophia Mint Checkout</p>
          <span className="rounded-full border border-cyan-200/55 bg-cyan-300/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-100">
            Placeholder
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-300/80">Solana Pay mint is disabled for V1 stability. Checkout and on-chain confirmation flow will return in V2.</p>
      </article>

    </section>
  );
}
