import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BaseWalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { BrandLogo } from '../components/BrandLogo';

const LA_CASA_COLLECTION_ADDRESS = '0x99879b6bf05c893ba01f1bd18e042cf592a10210';
const ABRA_SYMBOL = 'ABRA';
const ABRA_TOKEN_CONTRACT_ADDRESS = import.meta.env.VITE_ABRA_TOKEN_CONTRACT_ADDRESS?.trim() || '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const ABRA_TOKEN_BAGS_URL = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || 'https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';

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
	const navigate = useNavigate();
	const soundtrackRef = useRef<HTMLAudioElement | null>(null);
	const enterTimerRef = useRef<number | null>(null);
	const imageCandidates = useMemo(
		() => [
			'/assets/abraxas-background.jpg',
			'/assets/abraxas-background.jpeg',
			'/assets/abraxas-background.png',
			'/assets/abraxas-background.webp',
			'/assets/abraxas-landing.jpg',
			'/assets/abraxas-landing.jpeg',
			'/assets/abraxas-landing.png',
			'/assets/abraxas-landing.webp',
			'/assets/abraxas-logo-graphic.jpg',
			'/assets/landing.jpg',
			'/assets/landing.png',
		],
		[],
	);
	const audioCandidates = useMemo(
		() => [
			'/assets/landing-theme.mp3',
			'/assets/landing-theme.wav',
			'/assets/landing-theme.ogg',
			'/assets/abraxas-theme.mp3',
			'/assets/abraxas-cinematic.mp3',
		],
		[],
	);
	const [candidateIndex, setCandidateIndex] = useState(0);
	const [showBackgroundImage, setShowBackgroundImage] = useState(true);
	const [audioCandidateIndex, setAudioCandidateIndex] = useState(0);
	const [hasAudioTrack, setHasAudioTrack] = useState(true);
	const [soundtrackEnabled, setSoundtrackEnabled] = useState(true);
	const [autoplayBlocked, setAutoplayBlocked] = useState(false);
	const [isSoundtrackPlaying, setIsSoundtrackPlaying] = useState(false);
	const [isEntering, setIsEntering] = useState(false);

	const handleImageError = () => {
		if (candidateIndex < imageCandidates.length - 1) {
			setCandidateIndex((current) => current + 1);
			return;
		}
		setShowBackgroundImage(false);
	};

	const handleAudioError = () => {
		if (audioCandidateIndex < audioCandidates.length - 1) {
			setAudioCandidateIndex((current) => current + 1);
			return;
		}

		setHasAudioTrack(false);
		setSoundtrackEnabled(false);
	};

	const toggleSoundtrack = async () => {
		const audio = soundtrackRef.current;

		if (!audio || !hasAudioTrack) {
			return;
		}

		if (soundtrackEnabled) {
			audio.muted = true;
			setSoundtrackEnabled(false);
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(false);
			return;
		}

		audio.muted = false;
		setSoundtrackEnabled(true);

		try {
			if (audio.paused) {
				await audio.play();
			}
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(true);
		} catch {
			setAutoplayBlocked(true);
			setIsSoundtrackPlaying(false);
		}
	};

	useEffect(() => {
		const audio = soundtrackRef.current;

		if (!audio || !hasAudioTrack) {
			return;
		}

		audio.loop = true;
		audio.volume = 0.42;
		audio.preload = 'auto';

		if (!soundtrackEnabled) {
			audio.muted = true;
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(false);
			return;
		}

		audio.muted = false;

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

		audio.load();
		void attemptPlay();

		const onPlay = () => {
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(true);
		};

		const onPlaying = () => {
			setAutoplayBlocked(false);
			setIsSoundtrackPlaying(!audio.muted);
		};

		const onPause = () => {
			setIsSoundtrackPlaying(false);
		};

		const onCanPlay = () => {
			if (!audio.paused) {
				setAutoplayBlocked(false);
			}
		};

		const resumeOnInteraction = () => {
			if (!soundtrackEnabled || !audio.paused) {
				return;
			}

			void attemptPlay();
		};

		const resumeWhenVisible = () => {
			if (document.visibilityState !== 'visible' || !audio.paused || !soundtrackEnabled) {
				return;
			}

			void attemptPlay();
		};

		window.addEventListener('pointerdown', resumeOnInteraction);
		window.addEventListener('keydown', resumeOnInteraction);
		document.addEventListener('visibilitychange', resumeWhenVisible);
		audio.addEventListener('play', onPlay);
		audio.addEventListener('playing', onPlaying);
		audio.addEventListener('pause', onPause);
		audio.addEventListener('canplay', onCanPlay);

		return () => {
			window.removeEventListener('pointerdown', resumeOnInteraction);
			window.removeEventListener('keydown', resumeOnInteraction);
			document.removeEventListener('visibilitychange', resumeWhenVisible);
			audio.removeEventListener('play', onPlay);
			audio.removeEventListener('playing', onPlaying);
			audio.removeEventListener('pause', onPause);
			audio.removeEventListener('canplay', onCanPlay);
		};
	}, [audioCandidateIndex, hasAudioTrack, soundtrackEnabled]);

	useEffect(() => {
		return () => {
			if (enterTimerRef.current !== null) {
				window.clearTimeout(enterTimerRef.current);
			}
		};
	}, []);

	const handleEnterAbraxas = (event: React.MouseEvent<HTMLAnchorElement>) => {
		if (!connected || isEntering) {
			event.preventDefault();
			return;
		}

		event.preventDefault();

		if ('speechSynthesis' in window) {
			try {
				window.speechSynthesis.cancel();
				const utterance = new SpeechSynthesisUtterance('Welcome to ABRAXAS');
				utterance.rate = 0.82;
				utterance.pitch = 0.92;
				utterance.volume = 1;

				const voices = window.speechSynthesis.getVoices();
				const preferredVoice =
					voices.find((voice) => /google us english|microsoft aria|microsoft guy|samantha|zira/i.test(voice.name))
					?? voices.find((voice) => voice.lang.toLowerCase().startsWith('en'));

				if (preferredVoice) {
					utterance.voice = preferredVoice;
				}

				window.speechSynthesis.speak(utterance);
			} catch {
				// Ignore speech synthesis failures and continue navigation.
			}
		}

		setIsEntering(true);

		enterTimerRef.current = window.setTimeout(() => {
			navigate('/app');
		}, 1450);
	};

	return (
		<section className="tech-distortion relative h-[100dvh] overflow-hidden bg-slate-950 text-slate-100">
			{showBackgroundImage ? (
				<>
					<img
						src={imageCandidates[candidateIndex]}
						alt=""
						className="landing-moving-background pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
						onError={handleImageError}
					/>
					<img
						src={imageCandidates[candidateIndex]}
						alt=""
						className="landing-moving-background-secondary pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
						onError={handleImageError}
					/>
				</>
			) : null}

			<div className="pointer-events-none absolute inset-0 bg-slate-950/70" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.2),transparent_52%)]" />
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/60 to-slate-950/95" />
			<div className="pointer-events-none absolute top-[12%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
			<div className="pointer-events-none absolute bottom-[20%] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-300/16 blur-3xl" />
			<div className="pointer-events-none absolute inset-0 opacity-24 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.08)_0px,rgba(148,163,184,0.08)_1px,transparent_2px,transparent_5px)]" />
			<div className="pointer-events-none absolute inset-0 opacity-34 mix-blend-screen [background:linear-gradient(110deg,transparent_18%,rgba(34,211,238,0.2)_50%,transparent_80%)] [animation:tech-pulse_8s_ease-in-out_infinite]" />

			<div className="relative z-20 mx-auto h-full w-full max-w-md overflow-y-auto overflow-x-hidden px-6 py-8">
				<div className="flex min-h-full flex-col items-center justify-center text-center">
					<div className="landing-frame-blue-glow pointer-events-auto relative w-full rounded-3xl border border-transparent bg-slate-950/65 p-7 backdrop-blur-xl">
					{hasAudioTrack ? (
						<div className="absolute top-3 right-3 z-30">
							<button
								onClick={() => {
									void toggleSoundtrack();
								}}
								aria-label={soundtrackEnabled ? 'Mute cinematic audio' : 'Unmute cinematic audio'}
								title={soundtrackEnabled ? 'Cinematic Audio On' : 'Cinematic Audio Off'}
								className="ui-action inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/60 bg-slate-950/55 text-violet-100 backdrop-blur-md hover:bg-violet-500/30"
							>
								{soundtrackEnabled ? (
									<svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
										<polygon points="11 5 6 9 3 9 3 15 6 15 11 19 11 5" />
										<path d="M15.5 8.5a5 5 0 0 1 0 7" />
										<path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
									</svg>
								) : (
									<svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
										<polygon points="11 5 6 9 3 9 3 15 6 15 11 19 11 5" />
										<line x1="22" y1="9" x2="16" y2="15" />
										<line x1="16" y1="9" x2="22" y2="15" />
									</svg>
								)}
							</button>
							{autoplayBlocked && soundtrackEnabled && !isSoundtrackPlaying && !connected ? (
								<p className="mt-2 max-w-[9.5rem] rounded-lg border border-violet-300/35 bg-slate-950/75 px-2 py-1 text-[10px] text-violet-100/85 backdrop-blur">
									Tap icon to start audio
								</p>
							) : null}
						</div>
					) : null}
					<div className="landing-logo-gold-ring mb-6 inline-flex rounded-2xl p-0">
						<BrandLogo size="3xl" showWordmark={false} className="landing-logo-no-blue-border justify-center" />
					</div>
					<h1 className="abraxas-hero-title text-4xl font-extrabold tracking-[0.22em]">ABRAXAS</h1>

						<p className="landing-subtitle-glow mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-100">
							Acquire ABRA live and explore full Abraxas flows in Devnet showcase mode
						</p>

						<p className="mt-4 text-xs leading-relaxed text-slate-300">
							Abraxas is live in token-first early adoption mode. Accumulate <span className="font-semibold text-amber-200">{ABRA_SYMBOL}</span> for immediate stake while the app demonstrates full vault and agent mechanics in Devnet as an on-chain proof-of-concept. Genesis NFTs can be airdropped later to qualifying holders.
						</p>

					<div className="mt-4 flex flex-wrap justify-center gap-2">
						<span className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2 py-1 text-[10px] font-medium text-cyan-100">
								Token-first Onboarding
						</span>
						<span className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2 py-1 text-[10px] font-medium text-cyan-100">
								ABRA Early Stake
						</span>
						<span className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2 py-1 text-[10px] font-medium text-cyan-100">
								Devnet Full Showcase
						</span>
					</div>

					<div className="mt-4 grid grid-cols-3 gap-2 text-left">
						<div className="rounded-xl border border-cyan-300/25 bg-slate-900/75 px-2 py-2">
								<p className="text-[10px] text-slate-400">Launch Paths</p>
								<p className="mt-1 text-sm font-semibold text-cyan-200">Token-first</p>
						</div>
						<div className="rounded-xl border border-cyan-300/25 bg-slate-900/75 px-2 py-2">
								<p className="text-[10px] text-slate-400">Live Token</p>
								<p className="mt-1 text-sm font-semibold text-cyan-200">ABRA</p>
						</div>
						<div className="rounded-xl border border-cyan-300/25 bg-slate-900/75 px-2 py-2">
								<p className="text-[10px] text-slate-400">Showcase Mode</p>
								<p className="mt-1 text-sm font-semibold text-cyan-200">Devnet</p>
						</div>
					</div>

						<div className="mt-4 space-y-2 rounded-2xl border border-cyan-300/25 bg-slate-900/75 p-3 text-left">
							<div>
								<p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200/80">Genesis NFT (Future Airdrop)</p>
								<p className="mt-1 break-all font-mono text-[11px] text-slate-200">{LA_CASA_COLLECTION_ADDRESS}</p>
							</div>
							<div className="border-t border-slate-700/70 pt-2">
								<p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-200/80">Abraxas Token</p>
								<p className="mt-1 text-[11px] text-slate-200">Symbol: <span className="font-semibold text-amber-200">{ABRA_SYMBOL}</span></p>
								<p className="mt-1 break-all font-mono text-[11px] text-slate-200">{ABRA_TOKEN_CONTRACT_ADDRESS}</p>
								<a
									href={ABRA_TOKEN_BAGS_URL}
									target="_blank"
									rel="noreferrer"
									className="mt-1 inline-flex text-[10px] text-cyan-200 underline decoration-cyan-300/50 underline-offset-2 hover:text-cyan-100"
								>
									View on BAGS
								</a>
							</div>
						</div>

					<div className="mt-7 space-y-3">
						<div className="flex justify-center">
							<BaseWalletMultiButton
								labels={LANDING_WALLET_LABELS}
												className="ui-action !h-8 !w-auto !min-w-[14rem] !rounded-xl !border !border-violet-300/55 !bg-violet-500/30 !px-5 !text-[11px] !font-semibold !text-violet-50 hover:!bg-violet-500/42"
							/>
						</div>

						<div className="grid grid-cols-2 gap-2">
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
									onClick={handleEnterAbraxas}
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

					<p className="mt-4 text-[11px] leading-relaxed text-slate-400">
						Connect wallet to buy ABRA for early participation, then explore the full vault, market, King AI, and circuit control flow in Devnet showcase mode.
					</p>
					</div>
				</div>
			</div>

						{hasAudioTrack ? (
							<audio
								ref={soundtrackRef}
								src={audioCandidates[audioCandidateIndex]}
								autoPlay
								playsInline
								preload="auto"
								onError={handleAudioError}
							/>
						) : null}

						{isEntering ? (
							<div className="abraxas-entry-overlay" aria-hidden="true">
								<div className="abraxas-entry-core" />
								<div className="abraxas-entry-ring" />
								<div className="abraxas-entry-ring abraxas-entry-ring-secondary" />
								<div className="abraxas-entry-scanline" />
								<p className="abraxas-entry-text">Entering ABRAXAS</p>
							</div>
						) : null}
		</section>
	);
}
