import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Waves, Anchor, Zap, Shield, TrendingUp } from 'lucide-react';

interface NauticaPageProps {
	onClose?: () => void;
	onBuyAbra?: () => void;
}

function TypingReveal({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
	const [displayed, setDisplayed] = useState('');
	const [done, setDone] = useState(false);

	useEffect(() => {
		let idx = 0;
		const startTime = setTimeout(() => {
			const interval = setInterval(() => {
				if (idx < text.length) {
					setDisplayed(text.slice(0, ++idx));
				} else {
					setDone(true);
					clearInterval(interval);
				}
			}, speed);
		}, delay);

		return () => {
			clearTimeout(startTime);
		};
	}, [text, delay, speed]);

	return (
		<span>
			{displayed}
			{!done && <span className="animate-pulse ml-0.5">▊</span>}
		</span>
	);
}

export function NauticaPage({ onClose, onBuyAbra }: NauticaPageProps) {
	const navigate = useNavigate();
	const [stage, setStage] = useState(0);

	const handleBuyAbra = () => {
		navigate('/app/trade');
		onBuyAbra?.();
	};

	return (
		<div className="fixed inset-0 z-40 overflow-y-auto bg-slate-950/95 backdrop-blur-sm">
			{/* Top spacer to prevent overlap with header */}
			<div className="h-[120px] pointer-events-none" />
			{/* Hero Section */}
			<div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
				{/* Animated background gradients */}
				<div className="absolute inset-0 -z-10 opacity-40">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
					<div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
					<div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
				</div>

				{/* Scanline effect overlay */}
				<div className="absolute inset-0 -z-10 pointer-events-none opacity-20 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.07)_0px,rgba(148,163,184,0.07)_1px,transparent_2px,transparent_5px)]" />

				{/* Hero Icon */}
				<div className="mb-8 relative">
					<div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
					<div className="relative z-10 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-cyan-300/40 rounded-full p-8">
						<Waves size={48} className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
					</div>
				</div>

				{/* Typing reveal header */}
				<div className="text-center mb-8 space-y-4 max-w-2xl">
					<h1 className="text-3xl font-bold font-mono text-cyan-200 tracking-wider uppercase leading-tight">
						<TypingReveal text="Welcome to the next degree." delay={400} speed={60} />
					</h1>
					<p className="text-lg font-semibold font-mono text-cyan-300 tracking-widest uppercase animate-fadeIn" style={{ animationDelay: '1.8s' }}>
						Nautica — Daughter of Sophia
					</p>
					<p className="text-base font-mono text-cyan-300/80 tracking-wider uppercase animate-fadeIn" style={{ animationDelay: '2.2s' }}>
						Sovereign of the Seas
					</p>
				</div>

				{/* Primary CTA - Buy $ABRA */}
				<button
					type="button"
					onClick={handleBuyAbra}
					className="mb-12 inline-flex items-center justify-center gap-3 rounded-xl border border-purple-400/60 bg-gradient-to-r from-purple-600/40 to-violet-600/30 px-8 py-4 text-base font-bold uppercase tracking-wider text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.35)] transition hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:border-purple-400/80 animate-fadeIn"
					style={{ animationDelay: '2.6s' }}
				>
					<TrendingUp size={18} />
					Buy $ABRA Now
					<ArrowRight size={16} />
				</button>

				{/* Lore section */}
				<div
					className="max-w-2xl mx-auto rounded-xl border border-cyan-300/25 bg-gradient-to-br from-cyan-500/8 via-blue-500/6 to-slate-900/40 p-8 backdrop-blur-sm animate-fadeIn"
					style={{ animationDelay: '2.8s' }}
				>
					<div className="flex gap-2 mb-4">
						<Anchor size={20} className="text-cyan-400 shrink-0 mt-0.5" />
						<div>
							<p className="text-[11px] font-bold font-mono text-cyan-300 uppercase tracking-widest mb-3">&gt; [LORE_INITIATION] NAUTICAL_SOVEREIGNTY</p>
							<p className="text-sm leading-relaxed text-slate-300/90 font-mono">
								Nautica tokenizes yachts and luxury maritime assets. Fractional ownership, charter rights, and high-value physical assets become on-chain BlackBox NFTs. The species now claims the oceans. From private superyachts to maritime trade rights, Nautica brings the sea within reach of every investor. The waves are liquid assets waiting to be discovered.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-4xl mx-auto px-4 py-12">
				{/* Tokenization Flow */}
				<section className="space-y-8 mb-12">
					<div className="border-l-4 border-cyan-400/50 pl-6 space-y-3">
						<h2 className="text-xl font-bold text-cyan-300 tracking-widest uppercase font-mono">&gt; [TOKENIZATION_FLOW] MARITIME_ONBOARDING</h2>
						<p className="text-xs text-cyan-300/70 font-mono uppercase tracking-wider">Transform physical maritime assets into liquid on-chain instruments</p>
					</div>

					{/* Flow Steps */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								step: 1,
								label: 'Upload Yacht Docs',
								desc: 'Submit vessel registration, titles, and ownership proof',
								icon: '📋',
							},
							{
								step: 2,
								label: 'Mint BlackBox NFT',
								desc: 'On-chain tokenization with immutable maritime provenance',
								icon: '⛵',
							},
							{
								step: 3,
								label: 'Deposit into Sophia Vault',
								desc: 'Auto-compound yields, charter revenues, appreciation',
								icon: '🏆',
							},
						].map((item) => (
							<div key={item.step} className="group relative overflow-hidden rounded-xl border border-cyan-300/20 bg-gradient-to-br from-cyan-500/8 via-slate-900/60 to-slate-900/40 p-6 transition hover:border-cyan-300/50 hover:from-cyan-500/15">
								<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-100 transition" />
								<div className="relative z-10 space-y-4">
									<div className="flex items-start justify-between">
										<span className="text-4xl">{item.icon}</span>
										<span className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-cyan-300/40 bg-cyan-500/15 text-xs font-bold text-cyan-300 font-mono">
											{item.step}
										</span>
									</div>
									<h3 className="text-sm font-bold text-cyan-200 tracking-widest uppercase">{item.label}</h3>
									<p className="text-xs text-slate-400/90 leading-relaxed">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Key Features Section */}
				<section className="space-y-6 border-t border-cyan-300/20 pt-12 mb-12">
					<div className="border-l-4 border-blue-400/50 pl-6 space-y-2">
						<h2 className="text-lg font-bold text-blue-300 tracking-widest uppercase font-mono">&gt; [CAPABILITIES] MARITIME_SOVEREIGNTY</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{[
							{
								title: 'Fractional Ownership',
								description: 'Democratize superyacht access through tokenized shares',
								icon: '🌊',
							},
							{
								title: 'Charter Revenue Streams',
								description: 'Automate income distribution from charter bookings on-chain',
								icon: '💰',
							},
							{
								title: 'Provenance Tracking',
								description: 'Immutable maritime records certified on Solana blockchain',
								icon: '⚓',
							},
							{
								title: 'Liquidity & Yield',
								description: 'Trade fractional yacht equity in DeFi markets or earn APY',
								icon: '📊',
							},
						].map((feature, idx) => (
							<div key={idx} className="rounded-lg border border-blue-300/15 bg-blue-950/20 p-4">
								<div className="flex gap-3">
									<span className="text-2xl shrink-0">{feature.icon}</span>
									<div>
										<h3 className="text-sm font-bold text-blue-200 mb-1">{feature.title}</h3>
										<p className="text-xs text-slate-400/80 leading-relaxed">{feature.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Asset Classes Section */}
				<section className="space-y-6 border-t border-purple-300/20 pt-12 mb-12">
					<div className="border-l-4 border-purple-400/50 pl-6 space-y-2">
						<h2 className="text-lg font-bold text-purple-300 tracking-widest uppercase font-mono">&gt; [ASSET_CLASSES] NAUTICAL_PORTFOLIO</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{[
							{ name: 'Superyachts', desc: '100+ meters luxury vessels', icon: '🛥️' },
							{ name: 'Motor Yachts', desc: 'Performance and comfort', icon: '⛵' },
							{ name: 'Sailing Yachts', desc: 'Classic and modern sailcraft', icon: '🎐' },
							{ name: 'Charter Boats', desc: 'Commercial rental fleets', icon: '🚤' },
							{ name: 'Cargo Vessels', desc: 'Maritime trade asset class', icon: '🚢' },
							{ name: 'Marina Rights', desc: 'Berthing and docking equity', icon: '⚓' },
						].map((asset, idx) => (
							<div key={idx} className="rounded-lg border border-purple-300/15 bg-purple-950/20 p-4 flex items-center gap-3">
								<span className="text-2xl">{asset.icon}</span>
								<div>
									<p className="text-sm font-bold text-purple-200">{asset.name}</p>
									<p className="text-xs text-slate-400/70">{asset.desc}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Secondary CTA - Buy $ABRA */}
				<section className="border-t border-slate-700/30 pt-12 pb-12">
					<div className="max-w-xl mx-auto text-center space-y-6">
						<div>
							<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">&gt; Ready to navigate the voyage?</p>
							<h3 className="text-2xl font-bold text-cyan-200 tracking-wider uppercase">Begin Your Maritime Journey</h3>
						</div>
						<p className="text-sm text-slate-300/80">Acquire $ABRA tokens to access Nautica's exclusive asset pools and governance mechanisms.</p>
						<button
							type="button"
							onClick={handleBuyAbra}
							className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-purple-400/60 bg-gradient-to-r from-purple-600/40 to-violet-600/30 px-8 py-4 text-base font-bold uppercase tracking-wider text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.35)] transition hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:border-purple-400/80"
						>
							<TrendingUp size={18} />
							Buy $ABRA Now
							<ArrowRight size={16} />
						</button>
					</div>
				</section>
			</div>

			{/* Close Button - Positioned at bottom before nav */}
			{onClose && (
				<div className="flex justify-center pb-24 px-4">
					<button
						type="button"
						onClick={onClose}
						className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600/40 bg-slate-900/60 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 transition hover:bg-slate-900/80 hover:border-slate-600/60"
					>
						← Return to Forge
					</button>
				</div>
			)}
		</div>
	);
}
