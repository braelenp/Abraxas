import { useState, useEffect } from 'react';
import { Music, Zap, Users, TrendingUp, ArrowRight, Sparkles, Gift } from 'lucide-react';

function ParticleEffect() {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{/* Floating particles */}
			{Array.from({ length: 8 }).map((_, i) => (
				<div
					key={i}
					className="absolute w-1 h-1 rounded-full bg-purple-400/60"
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
						animationDelay: `${i * 0.3}s`,
					}}
				/>
			))}
			{/* Glitch scanlines */}
			<div className="absolute inset-0 opacity-5 bg-repeat" style={{
				backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(153, 69, 255, 0.05) 25%, rgba(153, 69, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(153, 69, 255, 0.05) 75%, rgba(153, 69, 255, 0.05) 76%, transparent 77%, transparent)',
				backgroundSize: '50px 4px'
			}} />
		</div>
	);
}

function GlowingConnection() {
	return (
		<div className="absolute inset-0 pointer-events-none">
			{/* Curved glow line connecting logos */}
			<svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(153, 69, 255, 0.6))' }}>
				<path
					d="M 80 50 Q 150 50 220 50"
					stroke="url(#glowGradient)"
					strokeWidth="2"
					fill="none"
					vectorEffect="non-scaling-stroke"
				/>
				{/* Pulsing dots along connection */}
				<circle cx="80" cy="50" r="2" fill="rgba(34, 211, 238, 0.8)">
					<animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" begin="0s" />
				</circle>
				<circle cx="150" cy="50" r="2" fill="rgba(153, 69, 255, 0.8)">
					<animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
				</circle>
				<circle cx="220" cy="50" r="2" fill="rgba(251, 146, 60, 0.8)">
					<animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
				</circle>
				<defs>
					<linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
						<stop offset="50%" stopColor="rgba(153, 69, 255, 0.8)" />
						<stop offset="100%" stopColor="rgba(251, 146, 60, 0.8)" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	);
}

export function TikTokFeeSharing() {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="relative">
			<style>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
					25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
					50% { transform: translateY(-20px) translateX(-5px); opacity: 0.4; }
					75% { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
				}
				@keyframes pulse-glow {
					0%, 100% { box-shadow: 0 0 20px rgba(153, 69, 255, 0.4), inset 0 0 20px rgba(153, 69, 255, 0.1); }
					50% { box-shadow: 0 0 30px rgba(153, 69, 255, 0.6), inset 0 0 30px rgba(153, 69, 255, 0.15); }
				}
				@keyframes shimmer {
					0% { background-position: -1000px 0; }
					100% { background-position: 1000px 0; }
				}
			`}</style>

			{/* Main Card Container */}
			<div className="relative overflow-hidden rounded-2xl border border-purple-300/40 bg-gradient-to-br from-purple-500/12 via-slate-900/80 to-orange-500/8 p-8 backdrop-blur space-y-6">
				{/* Particle effects */}
				<ParticleEffect />

				{/* Atmospheric glow orbs */}
				<div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/3 rounded-full blur-3xl pointer-events-none" />

				{/* HEADER SECTION */}
				<div className="relative z-10 space-y-3">
					<div className="flex items-center justify-between gap-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Music size={24} className="text-purple-400" />
								<h3 className="text-xl sm:text-2xl font-bold text-purple-300 tracking-wider uppercase">TikTok Fee Sharing</h3>
								<span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded-full font-mono font-bold">Powered by Bags</span>
							</div>
							<p className="text-sm text-slate-300/80">
								Launch a coin and automatically share fees with any TikTok creator using only their username. Creators earn royalties natively.
							</p>
						</div>
					</div>
				</div>

				{/* LOGOS WITH GLOWING CONNECTION */}
				<div className="relative z-10 flex items-center justify-center h-24 my-4">
					<div className="relative w-full h-full flex items-center justify-between">
						{/* TikTok Logo Side */}
						<div
							className={`flex flex-col items-center gap-3 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<div className="relative w-16 h-16 flex items-center justify-center rounded-xl border border-cyan-400/60 bg-gradient-to-br from-cyan-500/20 to-blue-500/15 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
								{/* TikTok Icon SVG */}
								<svg className="w-8 h-8 text-cyan-300" viewBox="0 0 24 24" fill="currentColor">
									<path d="M19.59 6.69A4.83 4.83 0 0 0 15.814 2h-4.629a4.83 4.83 0 0 0-3.776 6.69v8.62a4.83 4.83 0 0 0 3.776 6.69h4.629a4.83 4.83 0 0 0 3.776-6.69V6.69z" />
								</svg>
								<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
							</div>
							<span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">TikTok</span>
						</div>

						{/* Glowing Connection */}
						<GlowingConnection />

						{/* Bags Logo Side */}
						<div
							className={`flex flex-col items-center gap-3 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<div className="relative w-16 h-16 flex items-center justify-center rounded-xl border border-orange-400/60 bg-gradient-to-br from-orange-500/20 to-amber-500/15 shadow-[0_0_20px_rgba(251,146,60,0.4)]">
								{/* Bags Icon (stylized bag) */}
								<svg className="w-8 h-8 text-orange-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M7 7h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
									<path d="M9 4v4" />
									<path d="M15 4v4" />
									<circle cx="12" cy="14" r="2" fill="currentColor" />
								</svg>
								<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
							</div>
							<span className="text-xs font-bold text-orange-300 uppercase tracking-wider">Bags</span>
						</div>
					</div>
				</div>

				{/* FEATURES GRID */}
				<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
					{/* Feature 1 */}
					<div className="rounded-lg border border-purple-300/20 bg-slate-950/50 backdrop-blur-sm p-4 hover:border-purple-300/40 transition">
						<div className="flex gap-3 mb-3">
							<Sparkles size={18} className="text-purple-400 flex-shrink-0" />
							<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">One-Click Launch</h4>
						</div>
						<p className="text-xs text-slate-400">Create a coin for any TikTok creator. Enter their username. Coins mint automatically. Fees flow directly to their wallet.</p>
					</div>

					{/* Feature 2 */}
					<div className="rounded-lg border border-purple-300/20 bg-slate-950/50 backdrop-blur-sm p-4 hover:border-purple-300/40 transition">
						<div className="flex gap-3 mb-3">
							<Gift size={18} className="text-purple-400 flex-shrink-0" />
							<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Creator Rewards</h4>
						</div>
						<p className="text-xs text-slate-400">Creators earn native royalties on every trade. No intermediaries. Direct payment to wallet. Full transparency.</p>
					</div>

					{/* Feature 3 */}
					<div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 backdrop-blur-sm p-4 hover:border-cyan-300/40 transition">
						<div className="flex gap-3 mb-3">
							<Users size={18} className="text-cyan-400 flex-shrink-0" />
							<h4 className="text-xs font-bold uppercase tracking-widest text-cyan-200">Audience Integration</h4>
						</div>
						<p className="text-xs text-slate-400">Bring your TikTok audience into Pulse. Share gaming clips. Tokenize moments. Build communities around creators.</p>
					</div>

					{/* Feature 4 */}
					<div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 backdrop-blur-sm p-4 hover:border-cyan-300/40 transition">
						<div className="flex gap-3 mb-3">
							<TrendingUp size={18} className="text-cyan-400 flex-shrink-0" />
							<h4 className="text-xs font-bold uppercase tracking-widest text-cyan-200">Viral Economics</h4>
						</div>
						<p className="text-xs text-slate-400">Coins trade on Solana DEXs. Creators benefit from popularity. Fans become investors. Culture becomes capital.</p>
					</div>
				</div>

				{/* PULSE TIE-IN */}
				<div className="relative z-10 rounded-lg border border-cyan-300/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/60 to-slate-900/50 p-4">
					<div className="flex gap-3 mb-2">
						<Sparkles size={16} className="text-cyan-300 flex-shrink-0" />
						<h4 className="text-xs font-bold uppercase tracking-widest text-cyan-300">→ Next: Bring Audience Into Pulse</h4>
					</div>
					<p className="text-xs text-slate-300/80">
						After launching your TikTok Fee Share coin, invite your audience to Pulse. Upload gaming clips. Host crypto streaming events. Tokenize moments. Your TikTok following becomes your gaming guild.
					</p>
				</div>

				{/* CTA BUTTONS */}
				<div className="relative z-10 flex flex-col sm:flex-row gap-3 pt-4">
					{/* Launch Button */}
					<a
						href="https://bags.fm/tiktok"
						target="_blank"
						rel="noopener noreferrer"
						className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-purple-400/60 bg-gradient-to-r from-purple-500/40 to-purple-400/30 px-6 py-3 text-sm font-bold uppercase tracking-wider text-purple-100 hover:border-purple-300/80 hover:shadow-[0_0_24px_rgba(153,69,255,0.4)] transition group"
					>
						<Music size={16} />
						<span>Launch TikTok Fee Share</span>
						<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
					</a>

					{/* Learn More Button */}
					<a
						href="https://bags.fm/learn/tiktok"
						target="_blank"
						rel="noopener noreferrer"
						className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600/40 bg-slate-900/50 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-300 hover:border-slate-600/60 hover:bg-slate-900/70 transition"
					>
						<Zap size={14} />
						<span>Learn More</span>
					</a>
				</div>
			</div>
		</div>
	);
}
