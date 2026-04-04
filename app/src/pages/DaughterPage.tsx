import { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

export interface DaughterConfig {
	name: string;
	subtitle: string;
	headerReveal: string;
	description: string;
	lore: string;
	accentColor: 'orange' | 'cyan' | 'purple' | 'emerald' | 'amber' | 'blue' | 'red';
	icon: string;
	flowSteps: Array<{ step: number; label: string; desc: string; icon: string }>;
	features: Array<{ title: string; description: string; icon: string }>;
	assetClasses: Array<{ name: string; desc: string; icon: string }>;
	dappUrl: string;
	dappLabel?: string;
}

interface DaughterPageProps {
	config: DaughterConfig;
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

const accentColorMap = {
	orange: {
		bgFrom: 'from-orange-500/8',
		bgVia: 'via-orange-500/6',
		border: 'border-orange-300/25',
		text: 'text-orange-300',
		textLight: 'text-orange-200',
		textDark: 'text-orange-400',
		buttonBorder: 'border-orange-300/40',
		buttonBg: 'from-orange-500/20',
		buttonBgTo: 'to-amber-500/15',
		buttonText: 'text-orange-200',
		buttonGlow: 'rgba(234,88,12,0.35)',
		featureBorder: 'border-orange-300/15',
		featureBg: 'bg-orange-950/20',
		accentBg: 'from-orange-500/30',
		accentBgAlt: 'bg-orange-500/15',
	},
	cyan: {
		bgFrom: 'from-cyan-500/8',
		bgVia: 'via-cyan-500/6',
		border: 'border-cyan-300/25',
		text: 'text-cyan-300',
		textLight: 'text-cyan-200',
		textDark: 'text-cyan-400',
		buttonBorder: 'border-cyan-300/40',
		buttonBg: 'from-cyan-500/20',
		buttonBgTo: 'to-blue-500/15',
		buttonText: 'text-cyan-200',
		buttonGlow: 'rgba(34,211,238,0.35)',
		featureBorder: 'border-cyan-300/15',
		featureBg: 'bg-cyan-950/20',
		accentBg: 'from-cyan-500/30',
		accentBgAlt: 'bg-cyan-500/15',
	},
	purple: {
		bgFrom: 'from-purple-500/8',
		bgVia: 'via-purple-500/6',
		border: 'border-purple-300/25',
		text: 'text-purple-300',
		textLight: 'text-purple-200',
		textDark: 'text-purple-400',
		buttonBorder: 'border-purple-300/40',
		buttonBg: 'from-purple-500/20',
		buttonBgTo: 'to-violet-500/15',
		buttonText: 'text-purple-200',
		buttonGlow: 'rgba(168,85,247,0.35)',
		featureBorder: 'border-purple-300/15',
		featureBg: 'bg-purple-950/20',
		accentBg: 'from-purple-500/30',
		accentBgAlt: 'bg-purple-500/15',
	},
	emerald: {
		bgFrom: 'from-emerald-500/8',
		bgVia: 'via-emerald-500/6',
		border: 'border-emerald-300/25',
		text: 'text-emerald-300',
		textLight: 'text-emerald-200',
		textDark: 'text-emerald-400',
		buttonBorder: 'border-emerald-300/40',
		buttonBg: 'from-emerald-500/20',
		buttonBgTo: 'to-green-500/15',
		buttonText: 'text-emerald-200',
		buttonGlow: 'rgba(52,211,153,0.35)',
		featureBorder: 'border-emerald-300/15',
		featureBg: 'bg-emerald-950/20',
		accentBg: 'from-emerald-500/30',
		accentBgAlt: 'bg-emerald-500/15',
	},
	amber: {
		bgFrom: 'from-amber-500/8',
		bgVia: 'via-amber-500/6',
		border: 'border-amber-300/25',
		text: 'text-amber-300',
		textLight: 'text-amber-200',
		textDark: 'text-amber-400',
		buttonBorder: 'border-amber-300/40',
		buttonBg: 'from-amber-500/20',
		buttonBgTo: 'to-yellow-500/15',
		buttonText: 'text-amber-200',
		buttonGlow: 'rgba(251,191,36,0.35)',
		featureBorder: 'border-amber-300/15',
		featureBg: 'bg-amber-950/20',
		accentBg: 'from-amber-500/30',
		accentBgAlt: 'bg-amber-500/15',
	},
	blue: {
		bgFrom: 'from-blue-500/8',
		bgVia: 'via-blue-500/6',
		border: 'border-blue-300/25',
		text: 'text-blue-300',
		textLight: 'text-blue-200',
		textDark: 'text-blue-400',
		buttonBorder: 'border-blue-300/40',
		buttonBg: 'from-blue-500/20',
		buttonBgTo: 'to-cyan-500/15',
		buttonText: 'text-blue-200',
		buttonGlow: 'rgba(59,130,246,0.35)',
		featureBorder: 'border-blue-300/15',
		featureBg: 'bg-blue-950/20',
		accentBg: 'from-blue-500/30',
		accentBgAlt: 'bg-blue-500/15',
	},
	red: {
		bgFrom: 'from-red-500/8',
		bgVia: 'via-red-500/6',
		border: 'border-red-300/25',
		text: 'text-red-300',
		textLight: 'text-red-200',
		textDark: 'text-red-400',
		buttonBorder: 'border-red-300/40',
		buttonBg: 'from-red-500/20',
		buttonBgTo: 'to-rose-500/15',
		buttonText: 'text-red-200',
		buttonGlow: 'rgba(239,68,68,0.35)',
		featureBorder: 'border-red-300/15',
		featureBg: 'bg-red-950/20',
		accentBg: 'from-red-500/30',
		accentBgAlt: 'bg-red-500/15',
	},
};

const accentGradientMap = {
	orange: 'to-orange-500/0',
	cyan: 'to-cyan-500/0',
	purple: 'to-violet-500/0',
	emerald: 'to-emerald-500/0',
	amber: 'to-amber-500/0',
	blue: 'to-blue-500/0',
	red: 'to-red-500/0',
};

export function DaughterPage({ config, onClose, onBuyAbra }: DaughterPageProps) {
	const colors = accentColorMap[config.accentColor];

	const handleEnterDapp = () => {
		window.open(config.dappUrl, '_blank', 'noopener noreferrer');
	};

	const handleBuyAbra = () => {
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
					<div className={`absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br ${colors.accentBg} ${accentGradientMap[config.accentColor]} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '8s' }} />
					<div className={`absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br ${colors.accentBg} ${accentGradientMap[config.accentColor]} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '10s', animationDelay: '1s' }} />
					<div className={`absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br ${colors.accentBg} ${accentGradientMap[config.accentColor]} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '12s', animationDelay: '2s' }} />
				</div>

				{/* Scanline effect overlay */}
				<div className="absolute inset-0 -z-10 pointer-events-none opacity-20 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.07)_0px,rgba(148,163,184,0.07)_1px,transparent_2px,transparent_5px)]" />

				{/* Hero Icon */}
				<div className="mb-8 relative">
					<div className={`absolute inset-0 rounded-full blur-3xl animate-pulse`} style={{ background: colors.buttonGlow, animationDuration: '3s' }} />
					<div className={`relative z-10 bg-gradient-to-br ${colors.accentBg} border ${colors.border} rounded-full p-8`}>
						<span className="text-5xl drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">{config.icon}</span>
					</div>
				</div>

				{/* Typing reveal header */}
				<div className="text-center mb-8 space-y-4 max-w-2xl">
					<h1 className={`text-3xl font-bold font-mono ${colors.textLight} tracking-wider uppercase leading-tight`}>
						<TypingReveal text={config.headerReveal} delay={400} speed={60} />
					</h1>
					<p className={`text-lg font-semibold font-mono ${colors.textDark} tracking-widest uppercase animate-fadeIn`} style={{ animationDelay: '1.8s' }}>
						{config.name} — Daughter of Sophia
					</p>
					<p className={`text-base font-mono ${colors.text}/80 tracking-wider uppercase animate-fadeIn`} style={{ animationDelay: '2.2s' }}>
						{config.subtitle}
					</p>
				</div>

				{/* Primary CTA - Buy $ABRA */}
				<button
					type="button"
					onClick={handleBuyAbra}
					className={`mb-12 inline-flex items-center justify-center gap-3 rounded-xl border ${colors.buttonBorder} bg-gradient-to-r ${colors.buttonBg} ${colors.buttonBgTo} px-8 py-4 text-base font-bold uppercase tracking-wider ${colors.buttonText} shadow-[0_0_30px_var(--glow)] transition hover:shadow-[0_0_40px_var(--glow-hover)] hover:border-opacity-80 animate-fadeIn`}
					style={{ '--glow': colors.buttonGlow, '--glow-hover': colors.buttonGlow } as any}
				>
					<TrendingUp size={18} />
					Buy $ABRA Now
					<ArrowRight size={16} />
				</button>

				{/* Lore section */}
				<div
					className={`max-w-2xl mx-auto rounded-xl border ${colors.border} bg-gradient-to-br ${colors.bgFrom} ${colors.bgVia} to-slate-900/40 p-8 backdrop-blur-sm animate-fadeIn`}
					style={{ animationDelay: '2.8s' }}
				>
					<p className={`text-[11px] font-bold font-mono ${colors.text} uppercase tracking-widest mb-3`}>&gt; [LORE_INITIATION]</p>
					<p className="text-sm leading-relaxed text-slate-300/90 font-mono">
						{config.lore}
					</p>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-4xl mx-auto px-4 py-12">
				{/* Tokenization Flow */}
				<section className="space-y-8 mb-12">
					<div className={`border-l-4 ${colors.border} pl-6 space-y-3`}>
						<h2 className={`text-xl font-bold ${colors.text} tracking-widest uppercase font-mono`}>&gt; [TOKENIZATION_FLOW]</h2>
						<p className={`text-xs ${colors.text}/70 font-mono uppercase tracking-wider`}>Transform assets into liquid on-chain instruments</p>
					</div>

					{/* Flow Steps */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{config.flowSteps.map((item) => (
							<div key={item.step} className={`group relative overflow-hidden rounded-xl border ${colors.border} bg-gradient-to-br ${colors.bgFrom} via-slate-900/60 to-slate-900/40 p-6 transition hover:border-opacity-50 hover:from-opacity-15`}>
								<div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
								<div className="relative z-10 space-y-4">
									<div className="flex items-start justify-between">
										<span className="text-4xl">{item.icon}</span>
										<span className={`inline-flex items-center justify-center h-8 w-8 rounded-full border ${colors.buttonBorder} ${colors.accentBgAlt} text-xs font-bold ${colors.text} font-mono`}>
											{item.step}
										</span>
									</div>
									<h3 className={`text-sm font-bold ${colors.textLight} tracking-widest uppercase`}>{item.label}</h3>
									<p className="text-xs text-slate-400/90 leading-relaxed">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Key Features Section */}
				<section className="space-y-6 border-t border-slate-700/30 pt-12 mb-12">
					<div className={`border-l-4 ${colors.border} pl-6 space-y-2`}>
						<h2 className={`text-lg font-bold ${colors.text} tracking-widest uppercase font-mono`}>&gt; [CAPABILITIES]</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{config.features.map((feature, idx) => (
							<div key={idx} className={`rounded-lg border ${colors.featureBorder} ${colors.featureBg} p-4`}>
								<div className="flex gap-3">
									<span className="text-2xl shrink-0">{feature.icon}</span>
									<div>
										<h3 className={`text-sm font-bold ${colors.textLight} mb-1`}>{feature.title}</h3>
										<p className="text-xs text-slate-400/80 leading-relaxed">{feature.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Asset Classes Section */}
				<section className="space-y-6 border-t border-slate-700/30 pt-12 mb-12">
					<div className={`border-l-4 ${colors.border} pl-6 space-y-2`}>
						<h2 className={`text-lg font-bold ${colors.text} tracking-widest uppercase font-mono`}>&gt; [ASSET_CLASSES]</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{config.assetClasses.map((asset, idx) => (
							<div key={idx} className={`rounded-lg border ${colors.featureBorder} ${colors.featureBg} p-4 flex items-center gap-3`}>
								<span className="text-2xl">{asset.icon}</span>
								<div>
									<p className={`text-sm font-bold ${colors.textLight}`}>{asset.name}</p>
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
							<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">&gt; Ready to explore?</p>
							<h3 className={`text-2xl font-bold ${colors.textLight} tracking-wider uppercase`}>Acquire $ABRA Tokens</h3>
						</div>
						<p className="text-sm text-slate-300/80">Get access to exclusive asset pools and governance mechanisms.</p>
						<button
							type="button"
							onClick={handleBuyAbra}
							className={`w-full inline-flex items-center justify-center gap-3 rounded-xl border ${colors.buttonBorder} bg-gradient-to-r ${colors.buttonBg} ${colors.buttonBgTo} px-8 py-4 text-base font-bold uppercase tracking-wider ${colors.buttonText} shadow-[0_0_30px_var(--glow)] transition hover:shadow-[0_0_40px_var(--glow-hover)] hover:border-opacity-80`}
							style={{ '--glow': colors.buttonGlow, '--glow-hover': colors.buttonGlow } as any}
						>
							<TrendingUp size={18} />
							Buy $ABRA Now
							<ArrowRight size={16} />
						</button>
					</div>
				</section>

				{/* Enter Dapp Section */}
				<section className="border-t border-slate-700/30 pt-12 pb-12">
					<div className="max-w-xl mx-auto text-center space-y-6">
						<div>
							<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">&gt; Ready for immersion?</p>
							<h3 className={`text-2xl font-bold ${colors.textLight} tracking-wider uppercase`}>Enter {config.name}</h3>
						</div>
						<p className="text-sm text-slate-300/80">Access the full {config.name} dapp experience.</p>
						<button
							type="button"
							onClick={handleEnterDapp}
							className={`w-full inline-flex items-center justify-center gap-3 rounded-xl border ${colors.border} bg-gradient-to-r ${colors.bgFrom} to-slate-900/40 px-8 py-4 text-base font-bold uppercase tracking-wider ${colors.textLight} shadow-[0_0_20px_var(--glow-dim)] transition hover:bg-gradient-to-r hover:${colors.bgFrom} hover:via-slate-900/50 hover:shadow-[0_0_30px_var(--glow)] hover:border-opacity-80`}
							style={{ '--glow': colors.buttonGlow, '--glow-dim': `rgba(0,0,0,0.1)` } as any}
						>
							Enter {config.name}
							<ArrowRight size={18} />
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
