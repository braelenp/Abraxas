import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BaseWalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { BagsBuyWidget } from '../components/BagsBuyWidget';
import { BrandLogo } from '../components/BrandLogo';

const ABRA_TOKEN_CA = import.meta.env.VITE_ABRA_TOKEN_CONTRACT_ADDRESS?.trim() || '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';

const LANDING_WALLET_LABELS = {
	'change-wallet': 'Change wallet',
	connecting: 'Connecting ...',
	'copy-address': 'Copy address',
	copied: 'Copied',
	disconnect: 'Disconnect',
	'has-wallet': 'Connect Wallet to Enter',
	'no-wallet': 'Connect Wallet to Enter',
} as const;

export function LandingPage() {
	const { connected } = useWallet();
	const soundtrackRef = useRef<HTMLAudioElement | null>(null);
	const [soundtrackEnabled, setSoundtrackEnabled] = useState(false);
	const [autoplayBlocked, setAutoplayBlocked] = useState(false);
	const [isSoundtrackPlaying, setIsSoundtrackPlaying] = useState(false);
	const [isBuyOpen, setIsBuyOpen] = useState(false);

	useEffect(() => {
		const audio = soundtrackRef.current;
		if (!audio) {
			return;
		}

		audio.loop = true;
		audio.volume = 0.42;
		audio.preload = 'auto';
		audio.muted = !soundtrackEnabled;

		if (!soundtrackEnabled) {
			audio.pause();
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(false);
			return;
		}

		const attemptPlay = async () => {
			try {
				await audio.play();
				setAutoplayBlocked(false);
				setIsSoundtrackPlaying(true);
			} catch {
				setAutoplayBlocked(true);
				setIsSoundtrackPlaying(false);
			}
		};

		void attemptPlay();

		const onPlay = () => {
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(true);
		};

		const onPause = () => {
			setIsSoundtrackPlaying(false);
		};

		const resumeOnInteraction = () => {
			if (!soundtrackEnabled || !audio.paused) {
				return;
			}
			void attemptPlay();
		};

		audio.addEventListener('play', onPlay);
		audio.addEventListener('pause', onPause);
		window.addEventListener('pointerdown', resumeOnInteraction);
		window.addEventListener('keydown', resumeOnInteraction);

		return () => {
			audio.removeEventListener('play', onPlay);
			audio.removeEventListener('pause', onPause);
			window.removeEventListener('pointerdown', resumeOnInteraction);
			window.removeEventListener('keydown', resumeOnInteraction);
		};
	}, [soundtrackEnabled]);

	const toggleSoundtrack = async () => {
		const audio = soundtrackRef.current;
		if (!audio) {
			return;
		}

		if (soundtrackEnabled) {
			audio.pause();
			audio.muted = true;
			setSoundtrackEnabled(false);
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(false);
			return;
		}

		audio.muted = false;
		setSoundtrackEnabled(true);

		try {
			await audio.play();
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(true);
		} catch {
			setAutoplayBlocked(true);
			setIsSoundtrackPlaying(false);
		}
	};

	return (
		<section className="tech-distortion relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
			<img
				src="/assets/sophia-minted.jpg"
				alt=""
				className="landing-moving-background pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
			/>
			<img
				src="/assets/sophia-minted.jpg"
				alt=""
				className="landing-moving-background-secondary pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
			/>
			<div className="pointer-events-none absolute inset-0 bg-slate-950/84" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_48%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(8,47,73,0.2),transparent_35%,rgba(120,53,15,0.1)_100%)]" />
			<div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/12 blur-3xl" />

			<div className="relative z-20 mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-5 sm:px-6">
				<div className="w-full">
					<div className="mb-3 flex items-center justify-between">
						<div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
							<Sparkles size={12} />
							Live On Solana Devnet
						</div>

						<button
							onClick={() => {
								void toggleSoundtrack();
							}}
							className="ui-action inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/50 bg-slate-950/70 text-violet-100 backdrop-blur-md"
							aria-label={soundtrackEnabled ? 'Mute soundtrack' : 'Play soundtrack'}
						>
							{soundtrackEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
						</button>
					</div>

					{autoplayBlocked && soundtrackEnabled && !isSoundtrackPlaying ? (
						<p className="mb-3 text-right text-[9px] font-medium uppercase tracking-[0.14em] text-violet-200/80">
							Tap sound to start music
						</p>
					) : null}

					<div className="landing-frame-blue-glow rounded-[2rem] border border-cyan-300/20 bg-slate-950/78 p-5 text-center backdrop-blur-xl sm:p-6">
						<div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
							<Sparkles size={12} />
							Abraxas Control Surface
						</div>

						<div className="mt-4 flex flex-col items-center gap-3">
							<div className="landing-logo-gold-ring inline-flex rounded-2xl p-0">
								<BrandLogo size="xl" showWordmark={false} className="landing-logo-no-blue-border justify-center" />
							</div>
							<div>
								<p className="landing-subtitle-glow text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">Prediction Economy Entry</p>
								<h1 className="abraxas-hero-title mt-1 text-3xl font-extrabold tracking-[0.14em] text-cyan-50 sm:text-4xl">ABRAXAS</h1>
							</div>
						</div>

						<p className="mt-4 text-xs leading-6 text-slate-300 sm:text-sm">
							A bold entry into the ABRA economy: prediction-market narrative, token-first onboarding, vault operations, King AI guidance, and circuit protection in one place.
						</p>

						<div className="mt-4 flex flex-wrap justify-center gap-2">
							<span className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2.5 py-1 text-[9px] font-medium text-cyan-100">ABRA Live</span>
							<span className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2.5 py-1 text-[9px] font-medium text-cyan-100">Prediction Markets</span>
							<span className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2.5 py-1 text-[9px] font-medium text-cyan-100">Vault Showcase</span>
							<span className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2.5 py-1 text-[9px] font-medium text-cyan-100">King AI</span>
							<span className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2.5 py-1 text-[9px] font-medium text-cyan-100">Circuit Safety</span>
						</div>

						<div className="mt-5 grid gap-2">
							<div className="flex justify-center">
								<BaseWalletMultiButton
									labels={LANDING_WALLET_LABELS}
									className="ui-action !h-10 !w-full !rounded-xl !border !border-violet-300/55 !bg-violet-500/30 !px-5 !text-[11px] !font-semibold !text-violet-50 hover:!bg-violet-500/42"
								/>
							</div>

							<button
								type="button"
								onClick={() => setIsBuyOpen(true)}
								className="ui-action inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300/45 bg-cyan-500/20 px-4 text-sm font-semibold text-cyan-50"
							>
								Buy ABRA
							</button>

							<a
								href="https://x.com/abraxasdapp"
								target="_blank"
								rel="noreferrer"
								className="follow-x-pulse ui-action inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/65 bg-black px-3 text-sm font-semibold text-white"
							>
								Follow on X
							</a>

							<Link
								to="/app"
								aria-disabled={!connected}
								className={`ui-action group relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-2xl border px-5 text-sm font-semibold tracking-wide transition ${
									connected
										? 'enter-abraxas-pulse border-amber-200/75 bg-gradient-to-r from-amber-200 via-amber-100 to-orange-100 text-slate-950 shadow-[0_0_14px_rgba(245,158,11,0.3)] hover:from-amber-100 hover:to-orange-100'
										: 'pointer-events-none border-slate-700/80 bg-slate-800/80 text-slate-400'
								}`}
							>
								<span className="relative">Enter ABRAXAS</span>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{isBuyOpen ? (
				<div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/72 px-4 backdrop-blur-md">
					<div className="landing-frame-blue-glow w-full max-w-sm rounded-[1.75rem] border border-cyan-300/25 bg-slate-950/95 p-4 shadow-[0_0_40px_rgba(8,145,178,0.25)]">
						<div className="mb-3 flex items-center justify-between gap-3">
							<div>
								<p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/80">Instant Entry</p>
								<h2 className="mt-1 text-sm font-semibold text-white">Buy ABRA On Landing</h2>
							</div>
							<button
								type="button"
								onClick={() => setIsBuyOpen(false)}
								className="ui-action inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/20 bg-slate-900/70 text-slate-100"
								aria-label="Close buy panel"
							>
								<X size={14} />
							</button>
						</div>

						<BagsBuyWidget tokenAddress={ABRA_TOKEN_CA} compact />

						<button
							type="button"
							onClick={() => setIsBuyOpen(false)}
							className="ui-action mt-3 inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200/20 bg-slate-900/70 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200"
						>
							Back to Landing
						</button>
					</div>
				</div>
			) : null}

			<audio ref={soundtrackRef} src="/assets/landing-theme.mp3" preload="auto" playsInline />
		</section>
	);
}