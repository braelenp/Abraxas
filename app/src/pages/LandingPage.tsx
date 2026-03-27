import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

function useTypingEffect(text: string, speed = 50, delay = 0) {
	const [displayedText, setDisplayedText] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		let intervalId: ReturnType<typeof setInterval> | undefined;
		const timeoutId = setTimeout(() => {
			let currentIndex = 0;
			intervalId = setInterval(() => {
				if (currentIndex < text.length) {
					setDisplayedText(text.slice(0, currentIndex + 1));
					currentIndex += 1;
				} else {
					setIsComplete(true);
					if (intervalId) {
						clearInterval(intervalId);
					}
				}
			}, speed);
		}, delay);

		return () => {
			clearTimeout(timeoutId);
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [delay, speed, text]);

	return { displayedText, isComplete };
}

function useScrollReveal(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [ref, threshold]);

	return isVisible;
}

function Particles() {
	return (
		<div className="pointer-events-none fixed inset-0 overflow-hidden">
			{Array.from({ length: 20 }).map((_, index) => (
				<div
					key={index}
					className="absolute rounded-full bg-cyan-300/30 blur-sm"
					style={{
						width: `${Math.random() * 4 + 1}px`,
						height: `${Math.random() * 4 + 1}px`,
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						animation: `float ${Math.random() * 20 + 10}s linear infinite`,
						animationDelay: `${Math.random() * 5}s`,
					}}
				/>
			))}
		</div>
	);
}

function LightBeams() {
	return (
		<>
			<div className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-screen [background:linear-gradient(135deg,transparent_0%,rgba(34,211,238,0.25)_30%,transparent_60%)]" />
			<div className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(45deg,transparent_0%,rgba(157,78,221,0.2)_40%,transparent_70%)]" />
			<div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen [background:linear-gradient(to_top,rgba(234,88,12,0.15)_0%,transparent_50%)]" />
			<div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_center,rgba(157,78,221,0.1)_0%,transparent_70%)]" />
		</>
	);
}

function ConstellationBackground() {
	return (
		<div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
			<svg className="h-full w-full opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
				<defs>
					<style>{`
						.constellation-star {
							fill: rgba(250, 204, 21, 0.6);
							animation: twinkle 3s ease-in-out infinite;
						}

						.constellation-line {
							stroke: rgba(250, 204, 21, 0.2);
							stroke-width: 1;
							animation: pulse-line 4s ease-in-out infinite;
						}
					`}</style>
				</defs>

				<line x1="100" y1="100" x2="250" y2="150" className="constellation-line" style={{ animationDelay: '0s' }} />
				<line x1="250" y1="150" x2="350" y2="80" className="constellation-line" style={{ animationDelay: '0.3s' }} />
				<line x1="350" y1="80" x2="450" y2="120" className="constellation-line" style={{ animationDelay: '0.6s' }} />
				<line x1="900" y1="200" x2="1000" y2="280" className="constellation-line" style={{ animationDelay: '0.2s' }} />
				<line x1="1000" y1="280" x2="1100" y2="200" className="constellation-line" style={{ animationDelay: '0.4s' }} />
				<line x1="200" y1="600" x2="380" y2="550" className="constellation-line" style={{ animationDelay: '0.1s' }} />
				<line x1="380" y1="550" x2="500" y2="650" className="constellation-line" style={{ animationDelay: '0.5s' }} />
				<line x1="800" y1="650" x2="950" y2="600" className="constellation-line" style={{ animationDelay: '0.3s' }} />
				<line x1="950" y1="600" x2="1050" y2="720" className="constellation-line" style={{ animationDelay: '0.7s' }} />

				<circle cx="100" cy="100" r="2.5" className="constellation-star" style={{ animationDelay: '0s' }} />
				<circle cx="250" cy="150" r="2" className="constellation-star" style={{ animationDelay: '0.5s' }} />
				<circle cx="350" cy="80" r="2.5" className="constellation-star" style={{ animationDelay: '1s' }} />
				<circle cx="450" cy="120" r="2" className="constellation-star" style={{ animationDelay: '1.5s' }} />
				<circle cx="900" cy="200" r="2.5" className="constellation-star" style={{ animationDelay: '0.3s' }} />
				<circle cx="1000" cy="280" r="2" className="constellation-star" style={{ animationDelay: '0.8s' }} />
				<circle cx="1100" cy="200" r="2.5" className="constellation-star" style={{ animationDelay: '1.2s' }} />
				<circle cx="200" cy="600" r="2" className="constellation-star" style={{ animationDelay: '0.2s' }} />
				<circle cx="380" cy="550" r="2.5" className="constellation-star" style={{ animationDelay: '0.7s' }} />
				<circle cx="500" cy="650" r="2" className="constellation-star" style={{ animationDelay: '1.1s' }} />
				<circle cx="800" cy="650" r="2.5" className="constellation-star" style={{ animationDelay: '0.4s' }} />
				<circle cx="950" cy="600" r="2" className="constellation-star" style={{ animationDelay: '0.9s' }} />
				<circle cx="1050" cy="720" r="2.5" className="constellation-star" style={{ animationDelay: '1.3s' }} />
			</svg>
		</div>
	);
}

interface CTAButtonProps {
	text: string;
	href: string;
}

function CTAButton({ text, href }: CTAButtonProps) {
	const className = 'group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-slate-900/60 px-6 py-3 text-sm font-bold uppercase tracking-wider text-cyan-200 shadow-[0_0_24px_rgba(6,182,212,0.0)] transition duration-300 hover:border-cyan-300/60 hover:shadow-[0_0_32px_rgba(6,182,212,0.4)]';

	if (href.startsWith('/')) {
		return <Link to={href} className={className}>{text}</Link>;
	}

	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className={className}>
			{text}
			<ExternalLink size={16} className="transition group-hover:translate-x-0.5" />
		</a>
	);
}

export function LandingPage() {
	const topBarTyping = useTypingEffect('KINDLING THE FORGE...', 40, 0);
	const mainHeadlineTyping = useTypingEffect('Tokenize. Forge. Yield.', 60, 0);
	const loreRef = useRef<HTMLElement | null>(null);
	const loreVisible = useScrollReveal(loreRef, 0.2);
	const [isLoading, setIsLoading] = useState(true);
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [backgroundIndex, setBackgroundIndex] = useState(0);

	const backgroundCandidates = ['/assets/sophia-minted.jpg', '/assets/abraxas-logo-graphic.jpg'];

	useEffect(() => {
		if (!topBarTyping.isComplete) {
			return;
		}

		const loadingInterval = setInterval(() => {
			setLoadingProgress((previous) => {
				if (previous >= 100) {
					clearInterval(loadingInterval);
					setTimeout(() => setIsLoading(false), 300);
					return 100;
				}

				return previous + Math.random() * 30;
			});
		}, 200);

		return () => clearInterval(loadingInterval);
	}, [topBarTyping.isComplete]);

	const onBackgroundError = () => {
		if (backgroundIndex < backgroundCandidates.length - 1) {
			setBackgroundIndex((current) => current + 1);
		}
	};

	return (
		<div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-cyan-50">
			<div className="pointer-events-none fixed inset-0 -z-30 bg-slate-950" />
			<img
				src={backgroundCandidates[backgroundIndex]}
				alt=""
				className="dapp-moving-background animate-phase-in pointer-events-none fixed inset-0 -z-20 h-full w-full object-cover object-center opacity-30"
				onError={onBackgroundError}
			/>
			<img
				src={backgroundCandidates[backgroundIndex]}
				alt=""
				className="dapp-moving-background dapp-moving-background-secondary pointer-events-none fixed inset-0 -z-20 h-full w-full object-cover object-center"
				onError={onBackgroundError}
			/>
			<div className="pointer-events-none fixed inset-0 -z-10 bg-slate-950/75" />

			<LightBeams />
			<Particles />
			<ConstellationBackground />

			<div className="pointer-events-none fixed inset-0 -z-20 opacity-5 mix-blend-multiply [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.5)_0px,rgba(0,0,0,0.5)_1px,transparent_2px,transparent_3px)]" />
			<div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-cyan-950/30 via-transparent to-slate-950" />
			<div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
			<div className="pointer-events-none fixed -top-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-600/20 blur-3xl" />
			<div className="pointer-events-none fixed top-1/3 -right-32 -z-10 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
			<div className="pointer-events-none fixed bottom-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-600/10 blur-3xl" />

			<header className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-300/20 bg-slate-950/70 backdrop-blur-xl">
				<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<img
								src="/assets/abraxas-logo-graphic.jpg"
								alt="Abraxas Logo"
								className="h-10 w-auto rounded-lg object-contain shadow-[0_0_20px_rgba(6,182,212,0.3)] sm:h-12"
							/>
						</div>

						{isLoading ? (
							<div className="hidden flex-1 justify-center sm:flex">
								<p className="font-mono text-xs tracking-wider text-cyan-200/80 sm:text-sm">
									{topBarTyping.displayedText}
									<span className={`${topBarTyping.isComplete ? '' : 'animate-pulse'} ml-1`}>_</span>
								</p>
							</div>
						) : <div className="hidden sm:block" />}
					</div>

					{isLoading ? (
						<div className="mx-auto mt-4 max-w-md">
							<div className="h-1.5 overflow-hidden rounded-full bg-slate-800/80">
								<div
									className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-amber-200 transition-all duration-300"
									style={{ width: `${Math.min(loadingProgress, 100)}%` }}
								/>
							</div>
						</div>
					) : null}
				</div>
			</header>

			<section className={`relative flex min-h-[100vh] flex-col items-center justify-center px-4 pb-12 pt-20 transition-opacity duration-700 sm:px-6 ${!isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
				<div className="mx-auto max-w-4xl space-y-4 text-center sm:space-y-6">
					<div className="mt-20 sm:mt-28 lg:mt-32">
						<h1 className="text-5xl font-black leading-tight tracking-[0.15em] sm:text-7xl sm:tracking-[0.2em] lg:text-8xl">
							<span className="inline-block text-white animate-glitch [filter:drop-shadow(0_0_50px_rgba(250,204,21,0.8))]">
								ABRAXAS
							</span>
						</h1>
					</div>

					<div className="space-y-2">
						<h2 className="text-3xl font-black leading-tight tracking-tighter text-cyan-300 sm:text-5xl lg:text-6xl">
							<span className="inline-block">
								{mainHeadlineTyping.displayedText}
								{!mainHeadlineTyping.isComplete ? <span className="ml-1 animate-pulse text-cyan-300">_</span> : null}
							</span>
						</h2>

						{mainHeadlineTyping.isComplete ? (
							<div className="space-y-3">
								<div className="flex justify-center">
									<div className="h-1 w-32 animate-pulse bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-300 opacity-60 blur-lg" />
								</div>
								<p className="text-lg font-semibold text-cyan-200/80 sm:text-xl">Welcome to the next degree.</p>
							</div>
						) : null}
					</div>

					<div className="mt-6 flex justify-center sm:mt-8">
						<img
							src="/assets/abraxas-logo-graphic.jpg"
							alt="Abraxas"
							className="h-40 w-40 rounded-lg object-cover shadow-[0_0_25px_rgba(6,182,212,0.25)] sm:h-48 sm:w-48"
						/>
					</div>

					<p className="mx-auto max-w-2xl text-sm leading-relaxed text-cyan-50/80 sm:text-base">
					Convert real-world assets into on-chain positions. Burn capital into sovereign yield.
					<br />
					Abraxas is the RWA engine on Solana where assets become intelligence, and yield becomes autonomous.				</p>
					<div className="mx-auto flex flex-col justify-center gap-4 pt-4 sm:flex-row sm:pt-8">
						<CTAButton text="Buy $ABRA Now" href="https://bags.fm" />
						<CTAButton text="Join Discord" href="https://discord.gg/tdyukTeSS" />
						<CTAButton text="Explore Devnet" href="/app" />
					</div>
				</div>
			</section>

			<section className={`relative border-b border-t border-cyan-300/20 px-4 py-8 transition-opacity duration-700 sm:px-6 ${!isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
				<div className="mx-auto max-w-4xl">
					<div className="flex flex-col justify-around gap-4 text-center font-mono text-xs text-cyan-50/80 sm:flex-row sm:gap-0 sm:text-sm">
						<div className="flex items-center justify-center gap-2">
						<span className="inline-block h-2 w-2 animate-pulse rounded-full bg-orange-400" />
						<span>RWA TOKENIZATION ENGINE</span>
					</div>
					<div className="hidden items-center justify-center gap-2 sm:flex"><span>•</span></div>
					<div className="flex items-center justify-center gap-2">
						<span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-400" />
						<span>SOLANA-NATIVE YIELD VAULTS</span>
					</div>
					<div className="hidden items-center justify-center gap-2 sm:flex"><span>•</span></div>
					<div className="flex items-center justify-center gap-2">
						<span className="inline-block h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
						<span>AUTONOMOUS CAPITAL FORGING</span>
						</div>
					</div>
				</div>
			</section>

			<section ref={loreRef} className={`relative px-4 py-16 transition-opacity duration-700 sm:px-6 sm:py-24 ${!isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
				<div className="mx-auto max-w-3xl space-y-8">
					<div className={`transition-all duration-1000 ${loreVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
						<h2 className="mb-6 text-2xl font-bold text-cyan-200 sm:text-3xl">Forge. Multiply. Compound.</h2>

						<div className="space-y-4 text-sm leading-relaxed text-cyan-50/80 sm:text-base">
							<p>
								The Forge is Abraxas. It is where real assets meet on-chain liquidity. Upload your proof—real estate, music rights, 
								commodities, anything with intrinsic value. Tokenize it. Mint it as a sovereign RWA on Solana. Then let it yield.
							</p>

							<p>
								Sophia's Daughters are specialized vault protocols, each master of a distinct asset class. Echo commands music and media. 
								Aurelia bends real estate. Vein extracts from minerals and resources. Verdant grows carbon credits. Each is an intelligence 
								that knows how to make your capital burn bright.
							</p>

							<p>
								The Sons of Sophia are guardians. Infrastructure, security, market-making, oracles. They ensure the Forge never cools. 
								They ensure yield flows without friction.
							</p>

							<p className="italic text-cyan-50/70">
								&quot;You do not choose the market. The market that burns for you reveals itself through the Forge.&quot;
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className={`relative border-t border-cyan-300/20 px-4 py-16 transition-opacity duration-700 sm:px-6 sm:py-24 ${!isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
				<div className="mx-auto max-w-3xl space-y-8 text-center">
					<div>
						<h2 className="mb-4 text-2xl font-bold text-cyan-200 sm:text-3xl">Kindle the Forge. Start Tokenizing.</h2>
						<p className="mb-8 text-sm text-cyan-50/80 sm:text-base">
							Turn your capital into luminous, autonomous yield. Enter the Forge.
						</p>
					</div>

					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<CTAButton text="Enter the Forge" href="/app" />
						<CTAButton text="Buy $ABRA" href="https://bags.fm" />
						<CTAButton text="Join Discord" href="https://discord.gg/tdyukTeSS" />
					</div>
				</div>
			</section>

			<footer className={`relative border-t border-cyan-300/20 bg-slate-950/50 px-4 py-8 text-center transition-opacity duration-700 sm:px-6 ${!isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
				<div className="mx-auto max-w-4xl">
					<p className="font-mono text-xs tracking-wider text-cyan-50/70 sm:text-sm">
						ABRAXAS RWA FORGE ON SOLANA • TOKENIZE · FORGE · YIELD
					</p>
					<p className="mt-2 text-xs text-cyan-50/50">
						Welcome to the next degree. Where capital becomes luminous.
					</p>
				</div>
			</footer>

			<style>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
					50% { opacity: 0.5; }
					100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
				}

				@keyframes twinkle {
					0%, 100% { opacity: 0.3; }
					50% { opacity: 1; }
				}

				@keyframes pulse-line {
					0%, 100% { opacity: 0.15; }
					50% { opacity: 0.4; }
				}

				@keyframes glitch {
					0% { transform: translate(0); text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5); }
					20% { transform: translate(-2px, 2px); text-shadow: 3px -3px 0px rgba(250, 204, 21, 0.8), -3px 3px 0px rgba(6, 182, 212, 0.5); }
					40% { transform: translate(-2px, -2px); text-shadow: -3px 3px 0px rgba(250, 204, 21, 0.8), 3px -3px 0px rgba(6, 182, 212, 0.5); }
					60% { transform: translate(2px, 2px); text-shadow: 3px 3px 0px rgba(250, 204, 21, 0.8), -3px -3px 0px rgba(6, 182, 212, 0.5); }
					80% { transform: translate(2px, -2px); text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5); }
					100% { transform: translate(0); text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5); }
				}

				.animate-glitch {
					animation: glitch 3.5s ease-in-out infinite;
				}
			`}</style>
		</div>
	);
}