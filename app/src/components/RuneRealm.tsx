import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

// ─── Public config shape ──────────────────────────────────────────────────────

export interface RuneConfig {
	/** Elder Futhark Unicode glyph, e.g. 'ᛉ' */
	rune: string;
	/** Rune name, e.g. 'Algiz' */
	runeName: string;
	/** Brief essence note shown below the rune name, e.g. 'Protection · Divine Guardianship' */
	runeEssence: string;
	/** Agent / realm name shown in large type, e.g. 'WARDEN' */
	agentName: string;
	/** Two-to-three sentence gnostic lore blurb */
	lore: string;
	/** CTA button label */
	ctaLabel: string;
	/** RGB triple for the primary core glow, e.g. '168, 85, 247' (purple) */
	coreGlow: string;
	/** RGB triple for the fire / secondary glow, e.g. '234, 88, 12' (orange) */
	fireGlow: string;
	/** Tailwind text-color class for the large agent name, e.g. 'text-violet-300' */
	accentClass: string;
}

interface RuneRealmProps extends RuneConfig {
	/** Called when the CTA button is pressed. Defaults to scrolling to page content. */
	onCta?: () => void;
	/** Page content rendered below the cinematic hero section */
	children?: ReactNode;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Deterministic pseudo-random in [0,1) — avoids render-time Math.random(). */
function seededRand(n: number): number {
	const x = Math.sin(n + 1.618) * 43758.5453;
	return x - Math.floor(x);
}

function useTypingEffect(text: string, charSpeed = 105, startDelay = 650) {
	const [displayed, setDisplayed] = useState('');
	const [done, setDone] = useState(false);

	useEffect(() => {
		setDisplayed('');
		setDone(false);
		let idx = 0;
		let ival: ReturnType<typeof setInterval> | undefined;

		const tval = setTimeout(() => {
			ival = setInterval(() => {
				if (idx < text.length) {
					setDisplayed(text.slice(0, ++idx));
				} else {
					setDone(true);
					clearInterval(ival);
				}
			}, charSpeed);
		}, startDelay);

		return () => {
			clearTimeout(tval);
			clearInterval(ival);
		};
	}, [text, charSpeed, startDelay]);

	return { displayed, done };
}

// ─── Particles ────────────────────────────────────────────────────────────────

function RuneParticles({ coreGlow }: { coreGlow: string }) {
	const pts = useMemo(
		() =>
			Array.from({ length: 18 }, (_, i) => ({
				size: seededRand(i * 5) * 3 + 1,
				left: seededRand(i * 5 + 1) * 100,
				top: seededRand(i * 5 + 2) * 100,
				dur: seededRand(i * 5 + 3) * 14 + 9,
				delay: seededRand(i * 5 + 4) * 7,
			})),
		[],
	);

	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			{pts.map((p, i) => (
				<div
					key={i}
					className="absolute rounded-full"
					style={{
						width: `${p.size}px`,
						height: `${p.size}px`,
						left: `${p.left}%`,
						top: `${p.top}%`,
						background: `rgba(${coreGlow}, 0.75)`,
						boxShadow: `0 0 ${p.size * 4}px rgba(${coreGlow}, 0.5)`,
						animation: `rr-float ${p.dur}s linear ${p.delay}s infinite`,
						opacity: 0,
					}}
				/>
			))}
		</div>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────

export function RuneRealm({
	rune,
	runeName,
	runeEssence,
	agentName,
	lore,
	ctaLabel,
	coreGlow,
	fireGlow,
	accentClass,
	onCta,
	children,
}: RuneRealmProps) {
	const contentRef = useRef<HTMLDivElement | null>(null);
	const [entered, setEntered] = useState(false);
	const typing = useTypingEffect(agentName);

	useEffect(() => {
		const t = setTimeout(() => setEntered(true), 80);
		return () => clearTimeout(t);
	}, []);

	const handleCta = () => {
		if (onCta) {
			onCta();
		} else {
			contentRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div>
			{/* ── Cinematic hero ─────────────────────────────────────────────────── */}
			<section className="relative flex min-h-[72dvh] flex-col items-center justify-center overflow-hidden px-4 py-10 text-center">
				{/* Atmospheric light beams */}
				<div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-35 [background:linear-gradient(135deg,transparent_10%,rgba(34,211,238,0.25)_40%,transparent_68%)]" />
				<div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-20 [background:linear-gradient(225deg,transparent_10%,rgba(157,78,221,0.3)_45%,transparent_72%)]" />
				{/* Per-rune ambient radial glow */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background: `radial-gradient(ellipse at 50% 42%, rgba(${coreGlow},0.14), transparent 62%)`,
					}}
				/>
				<RuneParticles coreGlow={coreGlow} />

				{/* ── Rune glyph with layered halos ──────────────────────────────── */}
				<div
					className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${
						entered ? 'scale-100 opacity-100' : 'scale-[0.65] opacity-0'
					}`}
				>
					{/* Outer atmosphere */}
					<div
						className="absolute rounded-full"
						style={{
							width: 230,
							height: 230,
							background: `radial-gradient(circle, rgba(${coreGlow},0.11), transparent 72%)`,
							animation: 'rr-breathe 3.8s ease-in-out infinite',
						}}
					/>
					{/* Fire ring */}
					<div
						className="absolute rounded-full"
						style={{
							width: 150,
							height: 150,
							background: `radial-gradient(circle, rgba(${fireGlow},0.22), transparent 68%)`,
							animation: 'rr-breathe 3.8s ease-in-out infinite 0.5s',
						}}
					/>
					{/* Core gold flash */}
					<div
						className="absolute rounded-full"
						style={{
							width: 88,
							height: 88,
							background: 'radial-gradient(circle, rgba(253,224,71,0.30), transparent 65%)',
							animation: 'rr-breathe 3.8s ease-in-out infinite 1s',
						}}
					/>
					{/* The rune character */}
					<span
						className="relative z-10 select-none font-black leading-none"
						style={{
							fontSize: '7.5rem',
							color: 'rgba(253, 224, 71, 0.96)',
							textShadow: [
								'0 0 18px rgba(253,224,71,0.9)',
								`0 0 40px rgba(${coreGlow},0.95)`,
								`0 0 80px rgba(${fireGlow},0.55)`,
								'0 0 130px rgba(6,182,212,0.3)',
							].join(', '),
							animation: 'rr-breathe 3.8s ease-in-out infinite',
						}}
					>
						{rune}
					</span>
				</div>

				{/* Agent name + rune label */}
				<div className="mt-9 space-y-1.5">
					<p className="font-mono text-[10px] uppercase tracking-[0.38em] text-cyan-300/60">
						{runeName} · {runeEssence}
					</p>
					<h2 className={`text-[2.25rem] font-black tracking-[0.14em] ${accentClass}`}>
						{typing.displayed}
						{!typing.done && (
							<span className="ml-0.5 animate-pulse text-cyan-200 opacity-75">_</span>
						)}
					</h2>
				</div>

				{/* Lore */}
				<p className="mx-auto mt-5 max-w-[18rem] text-[0.82rem] leading-relaxed text-slate-300/72">
					{lore}
				</p>

				{/* CTA */}
				<button
					type="button"
					onClick={handleCta}
					className="mt-7 inline-flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-slate-900/60 px-7 py-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-cyan-200 transition-all duration-300 hover:border-cyan-300/65 hover:bg-slate-800/75 hover:shadow-[0_0_28px_rgba(6,182,212,0.35)] active:scale-95"
				>
					{ctaLabel}
				</button>

				{/* Scroll cue — only shown when there is page content below */}
				{children != null && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
						<div className="flex flex-col items-center gap-1">
							<div className="h-4 w-px rounded-full bg-cyan-300/70" />
							<div className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
						</div>
					</div>
				)}
			</section>

			{/* ── Functional page content below the hero ─────────────────────────── */}
			{children != null && (
				<div ref={contentRef} className="pt-1">
					{children}
				</div>
			)}

			<style>{`
				@keyframes rr-breathe {
					0%, 100% { transform: scale(1); }
					50%       { transform: scale(1.06); }
				}
				@keyframes rr-float {
					0%   { transform: translateY(0) translateX(0); opacity: 0; }
					8%   { opacity: 0.6; }
					88%  { opacity: 0.15; }
					100% { transform: translateY(-65vh) translateX(25px); opacity: 0; }
				}
			`}</style>
		</div>
	);
}
