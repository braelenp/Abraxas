import { useRef, useState } from 'react';
import { Upload, CheckCircle, Flame, Sparkles, FileText, ArrowRight, Shield, Zap, Wind, Eye } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';

const RUNE_CONFIG = {
	rune: 'ᚲ',
	runeName: 'Kenaz',
	runeEssence: 'Torch · Capital Forging',
	agentName: 'FORGE',
	lore: 'Kenaz is the rune of transformation. The Forge converts raw capital into tokenized positions of sovereign yield. Here, assets gain luminosity—trading their physical form for algorithmic compounding, liquidity, and autonomous market participation. You do not choose the asset class. The asset class that burns for you reveals itself.',
	ctaLabel: 'Enter the Forge',
	coreGlow: '234, 88, 12',
	fireGlow: '251, 191, 36',
	accentClass: 'text-orange-300',
} as const;

const STEPS = [
	{ n: 1, label: 'Upload asset proof' },
	{ n: 2, label: 'Self-attestation' },
	{ n: 3, label: 'Mint La Casa NFT' },
	{ n: 4, label: 'Auto-deposit into Sophia vault' },
];

// Sophia's Daughters organized by Phase
const DAUGHTERS_PHASE1 = [
	{
		name: 'Echo',
		description: 'Music Rights & Media',
		rune: '📻',
		url: 'https://echo-pied-phi.vercel.app/',
		isComingSoon: false,
	},
	{
		name: 'Legacy',
		description: 'Athlete Equity & NIL',
		rune: '🏆',
		url: '#',
		isComingSoon: true,
	},
];

const DAUGHTERS_PHASE2 = [
	{
		name: 'Aurelia',
		description: 'Real Estate & Development',
		rune: '🏛️',
		url: 'https://aurelia-tau.vercel.app/',
		isComingSoon: false,
	},
	{
		name: 'Vein',
		description: 'Minerals & Natural Resources',
		rune: '⛏️',
		url: 'https://vein-delta.vercel.app/',
		isComingSoon: false,
	},
	{
		name: 'Verdant',
		description: 'Carbon & Environmental Assets',
		rune: '🌿',
		url: '#',
		isComingSoon: true,
	},
];

// The Sons of Sophia - The Providers
const SONS = [
	{
		name: 'Valkyr',
		description: 'The Wise Guardian',
		rune: '🛡️',
		url: '#',
		isComingSoon: true,
		icon: Shield,
	},
	{
		name: 'Raido',
		description: 'The Swift Provider',
		rune: '⚡',
		url: '#',
		isComingSoon: true,
		icon: Zap,
	},
	{
		name: 'Fenrir',
		description: 'The Fierce Protector',
		rune: '💨',
		url: '#',
		isComingSoon: true,
		icon: Wind,
	},
	{
		name: 'Mimir',
		description: 'The Oracle Provider',
		rune: '👁️',
		url: '#',
		isComingSoon: true,
		icon: Eye,
	},
];

export function ForgePage() {
	const fileRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [currentStep, setCurrentStep] = useState(1);
	const [attested, setAttested] = useState(false);
	const [minted, setMinted] = useState(false);
	const [isMinting, setIsMinting] = useState(false);

	const handleFiles = (picked: FileList | null) => {
		if (!picked) return;
		setFiles(Array.from(picked));
		if (currentStep === 1) setCurrentStep(2);
	};

	const handleAttest = () => {
		setAttested(true);
		setCurrentStep(3);
	};

	const handleMint = () => {
		setIsMinting(true);
		setTimeout(() => {
			setIsMinting(false);
			setMinted(true);
			setCurrentStep(4);
		}, 2200);
	};

	const firstFile = files[0];
	const previewUrl = firstFile && firstFile.type.startsWith('image/') ? URL.createObjectURL(firstFile) : null;

	return (
		<RuneRealm {...RUNE_CONFIG}>
			{/* The Forging Process – Briefing */}
			<section className="space-y-6 py-8 mb-4">
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-l-4 border-orange-400/50 pl-6 space-y-4 font-mono">
						<h2 className="text-lg font-bold text-orange-300 tracking-wider uppercase">&gt; SYSTEM_INITIALIZATION</h2>
						<div className="space-y-3 text-sm text-slate-300/80">
							<p>
								<span className="text-orange-400">[01_TOKENIZE]</span> Upload your asset proof. Supported: real estate deeds, music rights, commodities, IP—anything with intrinsic value.
							</p>
							<p>
								<span className="text-orange-400">[02_ATTEST]</span> Self-certify asset authenticity. No intermediaries. You maintain sovereign control of your capital.
							</p>
							<p>
								<span className="text-orange-400">[03_FORGE]</span> Mint your asset as an on-chain RWA token. Now eligible for liquidity and yield protocols.
							</p>
							<p>
								<span className="text-orange-400">[04_YIELD]</span> Deposit into specialized vaults. Capital compounds autonomously. Receive continuously.
							</p>
						</div>
						<p className="text-xs text-orange-300/70 pt-2 italic uppercase tracking-widest">&gt; ENTER_FORGE_TO_BEGIN</p>
					</div>
				</div>
			</section>

			{/* Sophia's Family – The Sacred Gallery */}
			<section className="space-y-12 py-8">

				{/* SOPHIA'S FAMILY - DAUGHTERS */}
				<div className="space-y-8">
					<div className="border-b border-orange-400/30 pb-6 font-mono">
						<h2 className="text-2xl font-bold text-orange-300 tracking-widest mb-2 uppercase">&gt; [SOPHIA_FAMILY_PROTOCOL]</h2>
						<p className="text-sm text-orange-300/70 uppercase tracking-wider">&gt; Select_Asset_Class || Initialize_Specialization</p>
					</div>

					{/* Phase 1 – Digital Content & Experiences */}
					<div className="space-y-4">
					<div className="px-1 font-mono">
						<h3 className="text-sm font-bold text-orange-400 tracking-widest uppercase">&gt; [PHASE_1] DIGITAL_CONTENT</h3>
						<p className="text-[10px] text-orange-300/60 mt-1 uppercase tracking-wider">MOST_PROMINENT | INITIATIVE_PRIORITY</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{DAUGHTERS_PHASE1.map((daughter) => (
								<a
									key={daughter.name}
									href={daughter.isComingSoon ? '#' : daughter.url}
									target={daughter.isComingSoon ? undefined : '_blank'}
									rel={daughter.isComingSoon ? undefined : 'noopener noreferrer'}
									className={`group relative overflow-hidden rounded-xl border backdrop-blur transition ${
										daughter.isComingSoon
											? 'border-slate-700/30 bg-slate-900/40 cursor-not-allowed opacity-75'
											: 'border-orange-300/30 bg-gradient-to-br from-orange-500/8 via-slate-900/80 to-slate-900/60 hover:border-orange-300/60 hover:from-orange-500/15 hover:shadow-[0_0_20px_rgba(234,88,12,0.2)]'
									}`}
								>
									{!daughter.isComingSoon && (
										<div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 opacity-0 group-hover:opacity-100 transition" />
									)}
									<div className="relative z-10 flex flex-col h-full p-6">
										<div className="flex items-start gap-3 mb-4">
										<span className="text-3xl leading-none shrink-0">{daughter.rune}</span>
										<h3 className={`text-lg font-bold tracking-wide leading-tight pt-1 ${
												daughter.isComingSoon ? 'text-slate-400' : 'text-slate-100 group-hover:text-orange-300 transition'
											}`}>
												{daughter.name}
											</h3>
										</div>
										<p className={`text-xs leading-relaxed mb-5 flex-grow ${
											daughter.isComingSoon ? 'text-slate-500' : 'text-slate-400'
										}`}>
											{daughter.description}
										</p>
										{daughter.isComingSoon ? (
											<div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/40 bg-slate-800/50 px-4 py-3 w-full justify-center">
												<span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Coming Soon</span>
											</div>
										) : (
											<button
												type="button"
												className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-300/40 bg-gradient-to-r from-orange-500/20 to-amber-500/15 px-3 py-2 text-xs font-bold uppercase tracking-wider text-orange-200 shadow-[0_0_12px_rgba(234,88,12,0.15)] transition group-hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] group-hover:border-orange-300/60"
											>
												Enter {daughter.name}
												<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
											</button>
										)}
									</div>
								</a>
							))}
						</div>
					</div>

					{/* Phase 2 – Real-World & Advanced Assets */}
					<div className="space-y-4 mt-8">
					<div className="px-1 font-mono">
						<h3 className="text-sm font-bold text-amber-400 tracking-widest uppercase">&gt; [PHASE_2] REALWORLD_ADVANCED</h3>
						<p className="text-[10px] text-amber-300/60 mt-1 uppercase tracking-wider">EXPANDING_HORIZONS | COMPLEX_MARKETS</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							{DAUGHTERS_PHASE2.map((daughter) => (
								<a
									key={daughter.name}
									href={daughter.isComingSoon ? '#' : daughter.url}
									target={daughter.isComingSoon ? undefined : '_blank'}
									rel={daughter.isComingSoon ? undefined : 'noopener noreferrer'}
									className={`group relative overflow-hidden rounded-xl border backdrop-blur transition ${
										daughter.isComingSoon
											? 'border-slate-700/30 bg-slate-900/40 cursor-not-allowed opacity-75'
											: 'border-amber-300/25 bg-gradient-to-br from-amber-500/8 via-slate-900/80 to-slate-900/60 hover:border-amber-300/50 hover:from-amber-500/12 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]'
									}`}
								>
									{!daughter.isComingSoon && (
										<div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 opacity-0 group-hover:opacity-100 transition" />
									)}
									<div className="relative z-10 flex flex-col h-full p-6">
										<div className="flex items-start gap-3 mb-4">
										<span className="text-3xl leading-none shrink-0">{daughter.rune}</span>
										<h3 className={`text-base font-bold tracking-wide leading-tight pt-1 ${
												daughter.isComingSoon ? 'text-slate-400' : 'text-slate-100 group-hover:text-amber-300 transition'
											}`}>
												{daughter.name}
											</h3>
										</div>
										<p className={`text-xs leading-relaxed mb-5 flex-grow ${
											daughter.isComingSoon ? 'text-slate-500' : 'text-slate-400'
										}`}>
											{daughter.description}
										</p>
										{daughter.isComingSoon ? (
											<div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/40 bg-slate-800/50 px-4 py-3 w-full justify-center">
												<span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Coming Soon</span>
											</div>
										) : (
											<button
												type="button"
												className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300/40 bg-gradient-to-r from-amber-500/20 to-yellow-500/15 px-3 py-2 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.15)] transition group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:border-amber-300/60"
											>
												Enter {daughter.name}
												<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
											</button>
										)}
									</div>
								</a>
							))}
						</div>
					</div>
				</div>

				{/* THE SONS OF SOPHIA – THE PROVIDERS */}
				<div className="space-y-6 border-t border-slate-700/30 pt-12">
					<div className="px-1 font-mono">
						<h2 className="text-sm font-bold text-violet-400 tracking-widest uppercase mb-2">&gt; [SONS_PROTOCOL] ANCILLARY_SERVICES</h2>
						<p className="text-[10px] text-violet-300/60 mt-1 uppercase tracking-wider">INFRASTRUCTURE_PARTNERS | ADVANCED_PROVIDERS</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
						{SONS.map((son) => {
							const IconComponent = son.icon;
							return (
								<a
									key={son.name}
									href={son.isComingSoon ? '#' : son.url}
									target={son.isComingSoon ? undefined : '_blank'}
									rel={son.isComingSoon ? undefined : 'noopener noreferrer'}
									className={`group relative overflow-hidden rounded-xl border backdrop-blur transition ${
										son.isComingSoon
											? 'border-slate-700/30 bg-slate-900/40 cursor-not-allowed opacity-75'
											: 'border-violet-300/25 bg-gradient-to-br from-violet-500/8 via-slate-900/80 to-slate-900/60 hover:border-violet-300/50 hover:from-violet-500/12 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]'
									}`}
								>
									{!son.isComingSoon && (
										<div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-violet-500/0 opacity-0 group-hover:opacity-100 transition" />
									)}
									<div className="relative z-10 flex flex-col h-full p-6">
										<div className="flex items-center justify-center mb-4">
											<div className={`p-3 rounded-lg ${
												son.isComingSoon 
													? 'bg-slate-800/30' 
													: 'bg-gradient-to-br from-violet-500/20 to-purple-500/10 group-hover:from-violet-500/30 group-hover:to-purple-500/20'
											}`}>
												<IconComponent size={20} className={son.isComingSoon ? 'text-slate-500' : 'text-violet-300 group-hover:text-violet-200 transition'} />
											</div>
										</div>
										<h3 className={`text-base font-bold tracking-wide mb-2 text-center ${
											son.isComingSoon ? 'text-slate-400' : 'text-slate-100 group-hover:text-violet-300 transition'
										}`}>
											{son.name}
										</h3>
										<p className={`text-[10px] leading-relaxed mb-5 flex-grow text-center ${
											son.isComingSoon ? 'text-slate-500' : 'text-slate-400'
										}`}>
											{son.description}
										</p>
										{son.isComingSoon ? (
											<div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/40 bg-slate-800/50 px-3 py-2.5 w-full justify-center">
												<span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Coming Soon</span>
											</div>
										) : (
											<button
												type="button"
												className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-violet-300/40 bg-gradient-to-r from-violet-500/20 to-purple-500/15 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-violet-200 shadow-[0_0_12px_rgba(167,139,250,0.15)] transition group-hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] group-hover:border-violet-300/60"
											>
												Enter {son.name}
												<ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
											</button>
										)}
									</div>
								</a>
							);
						})}
					</div>
				</div>

			</section>

			{/* Optional: Tokenization Form (Collapsible Section) */}
			<section className="space-y-4 py-12 border-t border-slate-700/30 mt-8">
				<div className="space-y-2 mb-6">
					<h2 className="text-sm font-bold text-slate-300 tracking-widest uppercase font-mono">&gt; [DIRECT] TOKENIZATION_FLOW</h2>
					<p className="text-[10px] text-slate-400/70 mt-1 uppercase tracking-wider">
						Begin raw asset tokenization process
					</p>
				</div>

				{/* Begin tokenization CTA */}
				<article className="glow-panel rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur">
					<div className="flex items-center gap-3 mb-3">
						<Flame size={20} className="text-orange-300 shrink-0" />
						<div>
							<p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-200/80">Kenaz Protocol</p>
						<h2 className="text-sm font-bold text-slate-300 tracking-widest uppercase font-mono">INITIALIZE_TOKENIZATION</h2>
					</div>
				</div>
				<p className="text-[10px] leading-relaxed text-slate-400/70 mb-4 uppercase tracking-[0.05em]">
					Upload proof of ownership | Abraxas mints La Casa NFT | Auto-deposit to Sophia Vault
					</p>
					<button
						type="button"
						onClick={() => fileRef.current?.click()}
						className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-300/60 bg-gradient-to-r from-orange-500/25 to-amber-500/20 px-4 py-3 text-sm font-bold uppercase tracking-wider text-orange-100 shadow-[0_0_20px_rgba(234,88,12,0.2)] transition hover:shadow-[0_0_28px_rgba(234,88,12,0.35)]"
					>
						<Sparkles size={15} />
						Begin Tokenization
					</button>
				</article>

				{/* Step tracker */}
				<article className="glow-panel rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 backdrop-blur">
					<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200/70">Tokenization Flow</p>
					<ol className="space-y-2">
						{STEPS.map(({ n, label }) => {
							const done = currentStep > n;
							const active = currentStep === n;
							return (
								<li key={n} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${active ? 'border border-orange-300/30 bg-orange-500/10' : 'border border-transparent'}`}>
									<span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition ${done ? 'bg-orange-400 text-slate-950' : active ? 'border border-orange-300/60 text-orange-300' : 'border border-slate-600/60 text-slate-600'}`}>
										{done ? <CheckCircle size={13} /> : n}
									</span>
									<span className={`text-xs ${done ? 'text-slate-400 line-through' : active ? 'font-semibold text-slate-200' : 'text-slate-600'}`}>{label}</span>
								</li>
							);
						})}
					</ol>
				</article>

				{/* Upload section */}
				<article className="glow-panel rounded-2xl border border-slate-700/40 bg-slate-900/60 p-4 backdrop-blur">
					<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200/70">Upload Asset Proof</p>
					<input
						ref={fileRef}
						type="file"
						multiple
						accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
						className="hidden"
						onChange={(e) => handleFiles(e.target.files)}
					/>
					{files.length === 0 ? (
						<button
							type="button"
							onClick={() => fileRef.current?.click()}
							className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-slate-600/60 bg-slate-950/40 px-4 py-6 text-xs text-slate-500 transition hover:border-orange-300/40 hover:text-slate-400"
						>
							<Upload size={22} className="text-slate-600" />
							<span>Deed, Title, or Proof of Ownership</span>
							<span className="text-[10px] text-slate-600">PDF, JPG, PNG — multiple files accepted</span>
						</button>
					) : (
						<div className="space-y-2">
							{files.map((f) => (
								<div key={f.name} className="flex items-center gap-2 rounded-lg border border-slate-700/40 bg-slate-950/50 px-3 py-2">
									<FileText size={13} className="shrink-0 text-orange-300/70" />
									<span className="truncate text-xs text-slate-300">{f.name}</span>
									<span className="ml-auto shrink-0 text-[10px] text-slate-500">{(f.size / 1024).toFixed(0)} KB</span>
								</div>
							))}
							<button
								type="button"
								onClick={() => fileRef.current?.click()}
								className="mt-1 text-[10px] text-slate-500 underline underline-offset-2 hover:text-slate-400"
							>
								Add more files
							</button>
						</div>
					)}
				</article>

				{/* Self-attestation — step 2 */}
				{currentStep >= 2 && !attested && (
					<article className="glow-panel rounded-2xl border border-amber-300/25 bg-slate-900/60 p-4 backdrop-blur">
						<p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">Self-Attestation</p>
						<p className="text-[10px] leading-relaxed text-slate-400/70 mb-4 uppercase tracking-[0.05em] font-mono">
							&gt; I confirm lawful ownership of this asset. Initiating on-chain tokenization.
						</p>
						<button
							type="button"
							onClick={handleAttest}
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-400/20"
						>
							<CheckCircle size={14} />
							I Confirm Ownership
						</button>
					</article>
				)}

				{/* NFT preview — step 3 */}
				{currentStep >= 3 && !minted && (
					<article className="glow-panel rounded-2xl border border-orange-300/25 bg-slate-900/60 p-4 backdrop-blur">
						<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200/70">La Casa NFT Preview</p>
						<div className="flex gap-4 items-center mb-4">
							<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-orange-300/25 bg-slate-950">
								{previewUrl ? (
									<img src={previewUrl} alt="Asset preview" className="h-full w-full object-cover" />
								) : (
									<div className="flex h-full w-full items-center justify-center">
										<FileText size={24} className="text-orange-300/40" />
									</div>
								)}
								<div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-orange-300/20" />
							</div>
							<div className="min-w-0">
								<p className="truncate text-sm font-semibold text-slate-100">{firstFile?.name ?? 'Asset'}</p>
								<p className="mt-0.5 text-[10px] text-slate-500">{files.length} file{files.length !== 1 ? 's' : ''} attached</p>
								<div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-orange-300/30 bg-orange-500/10 px-2 py-0.5">
									<span className="text-[10px] font-semibold text-orange-300">La Casa NFT</span>
								</div>
							</div>
						</div>
						<button
							type="button"
							onClick={handleMint}
							disabled={isMinting}
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-300/50 bg-gradient-to-r from-orange-500/25 to-amber-500/20 px-4 py-2.5 text-sm font-bold text-orange-100 shadow-[0_0_16px_rgba(234,88,12,0.2)] transition hover:shadow-[0_0_24px_rgba(234,88,12,0.35)] disabled:opacity-50"
						>
							<Flame size={14} />
							{isMinting ? 'Minting...' : 'Forge This Asset into Sovereignty'}
						</button>
					</article>
				)}

				{/* Success — step 4 */}
				{minted && (
					<article className="glow-panel rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-5 backdrop-blur text-center">
						<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-orange-300/40 bg-orange-500/15">
							<CheckCircle size={22} className="text-orange-300" />
						</div>
						<p className="text-sm font-bold text-slate-100">La Casa NFT Minted</p>
						<p className="mt-1 text-xs text-slate-400">Your asset has been tokenized and auto-deposited into a Sophia-managed vault.</p>
						{previewUrl && (
							<img src={previewUrl} alt="Minted asset" className="mx-auto mt-4 h-28 w-28 rounded-xl border border-orange-300/25 object-cover shadow-[0_0_20px_rgba(234,88,12,0.2)]" />
						)}
						<p className="mt-3 text-[10px] font-mono text-orange-300/70">VAULT ASSIGNMENT PENDING SOPHIA REVIEW</p>
					</article>
				)}

			</section>
		</RuneRealm>
	);
}
