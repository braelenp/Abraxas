import { useState } from 'react';
import { Flame } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';
import { useAbraxas } from '../providers/AbraxasProvider';
import { useWallet } from '@solana/wallet-adapter-react';

const RUNE_CONFIG = {
	rune: 'ᚲ',
	runeName: 'Kenaz',
	runeEssence: 'Torch · Creative Forging',
	agentName: 'FORGE',
	lore: 'Kenaz is the rune of the torch, illumination born from creation. Here the raw capital of intention is transmuted into sovereign yield. Stake ABRA, forge positions, stack multipliers, and compound returns across every lock cycle. Forge your position. Forge your legacy.',
	ctaLabel: 'Enter the Forge',
	coreGlow: '234, 88, 12',
	fireGlow: '251, 191, 36',
	accentClass: 'text-orange-300',
} as const;

const QUICK_AMOUNTS = ['100', '500', '1000'];

export function ForgePage() {
	const { connected } = useWallet();
	const { vaults } = useAbraxas();
	const [stakeAmount, setStakeAmount] = useState('');
	const [isForging, setIsForging] = useState(false);
	const [forgedMessage, setForgedMessage] = useState('');

	const handleForge = () => {
		if (!connected || !stakeAmount) return;
		setIsForging(true);
		setForgedMessage('');
		setTimeout(() => {
			setIsForging(false);
			setForgedMessage(`✦ ${stakeAmount} ABRA forged. Position active.`);
			setStakeAmount('');
		}, 2000);
	};

	return (
		<RuneRealm {...RUNE_CONFIG}>
			<section className="space-y-4 pb-6">
				{/* Forge panel */}
				<article className="glow-panel rounded-2xl border border-orange-300/20 bg-slate-900/75 p-4 backdrop-blur">
					<p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-200/80">
						Kenaz Protocol
					</p>
					<h2 className="text-base font-semibold text-slate-100">Forge your ABRA position</h2>
					<p className="mt-2 text-xs leading-relaxed text-slate-400">
						Stake ABRA tokens to forge multiplier positions. Forged tokens earn compounding yield
						from market activity, vault fees, and prediction market outcomes.
					</p>

					<div className="mt-4 space-y-3">
						<div>
							<label className="mb-1 block text-[10px] uppercase tracking-wider text-slate-400">
								Amount to forge
							</label>
							<input
								type="number"
								min="0"
								placeholder="0.00 ABRA"
								value={stakeAmount}
								onChange={(e) => setStakeAmount(e.target.value)}
								className="w-full rounded-xl border border-slate-600/60 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-orange-300/50 focus:outline-none"
							/>
						</div>

						<div className="grid grid-cols-3 gap-2">
							{QUICK_AMOUNTS.map((amt) => (
								<button
									key={amt}
									type="button"
									onClick={() => setStakeAmount(amt)}
									className="rounded-lg border border-slate-600/50 bg-slate-800/60 py-1.5 text-xs text-slate-300 transition hover:border-orange-300/40 hover:text-orange-200"
								>
									{amt} ABRA
								</button>
							))}
						</div>

						<button
							type="button"
							onClick={handleForge}
							disabled={!connected || !stakeAmount || isForging}
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-300/45 bg-orange-500/20 px-4 py-2.5 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/30 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<Flame size={14} />
							{isForging ? 'Forging...' : 'Forge Position'}
						</button>

						{forgedMessage && (
							<p className="text-center text-xs font-medium text-orange-300">{forgedMessage}</p>
						)}

						{!connected && (
							<p className="text-center text-[10px] text-slate-500">
								Connect wallet to forge positions.
							</p>
						)}
					</div>
				</article>

				{/* Forge stats */}
				<article className="glow-panel rounded-2xl border border-orange-300/15 bg-slate-900/60 p-4 backdrop-blur">
					<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200/70">
						Forge Metrics
					</p>
					<div className="grid grid-cols-2 gap-3">
						{[
							{ label: 'Total Forged', value: '—' },
							{ label: 'Estimated APY', value: '~34%' },
							{ label: 'Unlock Cooldown', value: '7 days' },
							{ label: 'Yield Multiplier', value: '1.6×' },
						].map(({ label, value }) => (
							<div
								key={label}
								className="rounded-xl border border-slate-700/50 bg-slate-950/50 px-3 py-3"
							>
								<p className="text-[10px] text-slate-500">{label}</p>
								<p className="mt-1 text-sm font-semibold text-slate-200">{value}</p>
							</div>
						))}
					</div>
				</article>

				{/* Active positions */}
				<article className="glow-panel rounded-2xl border border-orange-300/15 bg-slate-900/60 p-4 backdrop-blur">
					<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200/70">
						Active Forges
					</p>
					{vaults.length === 0 ? (
						<p className="py-4 text-center text-xs text-slate-500">
							No active forges. Begin forging above.
						</p>
					) : (
						<div className="space-y-2">
							{vaults.slice(0, 3).map((vault) => (
								<div
									key={vault.id}
									className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-slate-950/60 px-3 py-2.5"
								>
									<div>
										<p className="text-xs font-medium text-slate-200">{vault.name}</p>
										<p className="text-[10px] text-slate-500">{vault.circuitState}</p>
									</div>
									<p className="text-xs font-semibold text-orange-300">
										{vault.vaultValue.toLocaleString()} ABRA
									</p>
								</div>
							))}
						</div>
					)}
				</article>
			</section>
		</RuneRealm>
	);
}
