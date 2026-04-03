import { useEffect, useState } from 'react';
import { MessageCircle, ArrowRight, Zap, Users, Trophy, Upload, Play, Radio, Gamepad2 } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';

const RUNE_CONFIG = {
	rune: '✦',
	runeName: 'Mirror',
	runeEssence: 'Reflection · Collective Wisdom',
	agentName: 'CADABRA',
	lore: 'The Instagram of the Abraxas ecosystem. Build community, share alpha, tokenize moments, and make DeFi great again. Pulse is the sole gaming clips platform inside Cadabra. Apex Legends is the first installment of the tokenized gaming layer.',
	ctaLabel: 'Enter the Mirror',
	coreGlow: '153, 69, 255',
	fireGlow: '168, 85, 247',
	accentClass: 'text-purple-300',
} as const;

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
		<span className="font-mono text-2xl font-bold text-purple-200 tracking-wide">
			{displayed}
			{!done && <span className="animate-pulse ml-1">∷</span>}
		</span>
	);
}

export function CadabraPage() {
	return (
		<RuneRealm {...RUNE_CONFIG}>
			<section className="space-y-8 py-8">
				{/* WELCOME: Dramatic Typing Reveal */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="space-y-4">
						<TypingReveal text="Welcome to the next degree." delay={200} speed={60} />
						<h2 className="text-xl font-bold text-purple-200 tracking-widest uppercase">Cadabra — The Social Mirror</h2>
						<p className="text-sm leading-relaxed text-slate-300/90">
							The Instagram of the Abraxas ecosystem. Build community, share alpha, tokenize moments, and make DeFi great again. Pulse is the sole gaming clips platform inside Cadabra. Apex Legends is the first installment of the tokenized gaming layer.
						</p>
					</div>
				</div>

				{/* COMMUNITY BUILDING TOOLS */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-l-4 border-purple-400/50 pl-6 space-y-4">
						<h3 className="text-lg font-bold text-purple-300 tracking-wider uppercase">&gt; COMMUNITY BUILDING TOOLS</h3>
						<div className="space-y-3">
							<div className="rounded-lg border border-purple-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<Users size={20} className="text-purple-400 flex-shrink-0" />
									<div>
										<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Asset-Centered Communities</h4>
										<p className="text-xs text-slate-400 mt-1">Every RWA class gets a dedicated community. Athlete equity has its tribe. Real estate syndicators congregate. Music rights holders form networks. Gaming guilds coordinate. The Mirror reflects all human intent.</p>
									</div>
								</div>
							</div>

							<div className="rounded-lg border border-purple-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<MessageCircle size={20} className="text-purple-400 flex-shrink-0" />
									<div>
										<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Real-Time Alpha Discussions</h4>
										<p className="text-xs text-slate-400 mt-1">Price discovery begins where humans congregate. Watch institutional traders position into emerging RWA opportunities. See KOL conviction before it prints on-chain. Meme cycles emerge from community consensus.</p>
									</div>
								</div>
							</div>

							<div className="rounded-lg border border-purple-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<Zap size={20} className="text-purple-400 flex-shrink-0" />
									<div>
										<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Tokenize Your Moments</h4>
										<p className="text-xs text-slate-400 mt-1">Share your thesis. Upload proof-of-concept. Record your winning call. Mint moments into NFTs. Build credibility. Earn yield on narrative. The Mirror rewards truth-tellers and alpha sharers.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* WHAT STARTED DEFI */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-t-2 border-purple-400/30 pt-8">
						<div className="space-y-4 mb-6">
							<h3 className="text-lg font-bold text-purple-300 tracking-wider uppercase">&gt; WHAT STARTED DEFI</h3>
							<p className="text-sm leading-relaxed text-slate-300/80">
								DeFi didn't start with code. It started with humans who believed capital could be permissionless. It started with communities that pooled resources. It started with shared conviction that the old world was broken. 
							</p>
							<p className="text-sm leading-relaxed text-slate-300/80">
								Cadabra returns DeFi to its roots: human coordination. Real-world asset tokenization is reshaping finance, but only if communities believe in it. Only if humans share alpha. Only if conviction flows through networks.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="rounded-lg border border-cyan-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<Radio size={18} className="text-cyan-400 flex-shrink-0" />
									<h4 className="text-xs font-bold uppercase tracking-widest text-cyan-200">Peer-to-Peer Discovery</h4>
								</div>
								<p className="text-xs text-slate-400">No algos. No feed manipulation. Just humans discussing assets. The best opportunities surface through direct conversation, not algorithm.</p>
							</div>

							<div className="rounded-lg border border-cyan-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<Users size={18} className="text-cyan-400 flex-shrink-0" />
									<h4 className="text-xs font-bold uppercase tracking-widest text-cyan-200">Verified Communities</h4>
								</div>
								<p className="text-xs text-slate-400">Communities are verified by track record. Winners have credibility. Losers learn. The Mirror doesn't hide failure—it makes it transparent.</p>
							</div>
						</div>
					</div>
				</div>

				{/* MAKING IT GREAT AGAIN */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="relative overflow-hidden rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-500/8 via-slate-900/80 to-slate-900/60 p-8">
						<div className="relative z-10 space-y-6">
							<div>
								<h3 className="text-lg font-bold text-orange-300 tracking-widest uppercase mb-4">🔥 MAKING DEFI GREAT AGAIN</h3>
								<p className="text-sm leading-relaxed text-slate-300 mb-4">
									DeFi became financial engineering. Yield farming. Liquidity mining. 17-letter-acronym protocols that exist to satisfy token LPs. Cadabra exists to remember what DeFi meant: people coordinating without intermediaries.
								</p>
							</div>

							<div className="space-y-3">
								<div className="border-l-2 border-orange-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-orange-300 mb-1">Real Asset Classes</h4>
									<p className="text-xs text-slate-300">Athlete equity. Real estate. Music rights. Gaming rewards. These aren't casino tokens. These are real-world value, now liquid on-chain. Communities validate them. Communities explain them. Communities pitch them to each other.</p>
								</div>
								<div className="border-l-2 border-orange-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-orange-300 mb-1">Collective Pricing</h4>
									<p className="text-xs text-slate-300">Markets discover truth when all relevant information flows freely. Cadabra is the information commons. Every thought. Every conviction. Every doubt. The price you see on-chain reflects the consensus built here first.</p>
								</div>
								<div className="border-l-2 border-orange-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-orange-300 mb-1">Creator Economy Native</h4>
									<p className="text-xs text-slate-300">Share content. Build reputation. Mint moments. Earn from credibility. The best traders, analysts, and community builders are recognized and rewarded. Your alpha becomes your asset.</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* PULSE: GAMING CLIPS PLATFORM */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-l-4 border-cyan-400/50 pl-6 space-y-4">
						<h3 className="text-lg font-bold text-cyan-300 tracking-wider uppercase">&gt; PULSE: THE GAMING CLIPS PLATFORM</h3>
						<p className="text-sm text-slate-300/80">
							Pulse is the sole gaming clips platform inside Cadabra. No algorithm. No shadow-banning. Direct community curation. Gaming moments become tokens.
						</p>

						<div className="space-y-3">
							<div className="rounded-lg border border-cyan-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<Upload size={20} className="text-cyan-400 flex-shrink-0" />
									<div>
										<h4 className="text-xs font-bold uppercase tracking-widest text-cyan-200">Upload Gaming Moments</h4>
										<p className="text-xs text-slate-400 mt-1">Record your best play. Upload the clip. Mint it. Community votes. Winners get tokenized. Your gaming moment becomes collectible, tradeable, and profitable.</p>
									</div>
								</div>
							</div>

							<div className="rounded-lg border border-cyan-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<Play size={20} className="text-cyan-400 flex-shrink-0" />
									<div>
										<h4 className="text-xs font-bold uppercase tracking-widest text-cyan-200">Community Clips Feed</h4>
										<p className="text-xs text-slate-400 mt-1">Discover the best gaming clips from your favorite games and players. Upvote moments. Build reputation. The feed is powered by community, not algorithms. Authenticity compounds.</p>
									</div>
								</div>
							</div>

							<div className="rounded-lg border border-cyan-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<Gamepad2 size={20} className="text-cyan-400 flex-shrink-0" />
									<div>
										<h4 className="text-xs font-bold uppercase tracking-widest text-cyan-200">Tokenized Rewards</h4>
										<p className="text-xs text-slate-400 mt-1">Popular clips earn rewards. Gaming guilds coordinate on Pulse first. Esports organizations broadcast tournaments. Your gaming skill becomes financial capital.</p>
									</div>
								</div>
							</div>
						</div>

						<a
							href="#pulse"
							className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/40 bg-gradient-to-r from-cyan-500/20 to-blue-500/15 px-6 py-3 text-sm font-bold uppercase tracking-wider text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.15)] transition hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-cyan-300/60 w-full"
						>
							<Play size={16} />
							Explore Pulse Now
							<ArrowRight size={14} />
						</a>
					</div>
				</div>

				{/* APEX LEGENDS REALM */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="relative overflow-hidden rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/8 via-slate-900/80 to-slate-900/60 p-8">
						<div className="relative z-10 space-y-6">
							<div>
								<h3 className="text-lg font-bold text-purple-300 tracking-widest uppercase mb-3">⚔️ APEX LEGENDS: FIRST TOKENIZED GAMING LAYER</h3>
								<p className="text-sm leading-relaxed text-slate-300">
									Apex Legends is the first full installment of Cadabra's tokenized gaming layer. Tournaments. Leaderboards. Rewards. Gaming guilds compete on-chain. Winning becomes financially material.
								</p>
							</div>

							<div className="space-y-3">
								<div className="border-l-2 border-purple-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">🏆 Tournaments & Competitions</h4>
									<p className="text-xs text-slate-300">Organize tournaments on-chain. Entry fees. Prize pools. Winnings paid instantly to wallets. Gaming skill becomes financial opportunity. Communities organize. Players compete. Victory is rewarded.</p>
								</div>
								<div className="border-l-2 border-purple-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">📊 Leaderboards & Rank</h4>
									<p className="text-xs text-slate-300">Official leaderboards track performance across Apex Legends and beyond. Climb ranks. Build reputation. Top players earn sponsorships from gaming guilds and brands. Skill compounds into credibility.</p>
								</div>
								<div className="border-l-2 border-purple-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">💎 Tokenized Rewards</h4>
									<p className="text-xs text-slate-300">Winners earn gaming tokens. Tokens can be staked for perks. Traded for other assets. Redeemed for real-world gear. Gaming becomes a legitimate income stream. Your legend becomes your net worth.</p>
								</div>
								<div className="border-l-2 border-purple-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">🎮 Guild Economy</h4>
									<p className="text-xs text-slate-300">Gaming guilds coordinate on Cadabra. They recruit players. They fund team efforts. They share winnings. They build brands. Esports becomes a DAO. Players become members. Victory becomes shared wealth.</p>
								</div>
							</div>

							<a
								href="https://discord.com/invite/abraxas"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-300/40 bg-gradient-to-r from-purple-500/20 to-violet-500/15 px-6 py-3 text-sm font-bold uppercase tracking-wider text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.15)] transition hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-300/60 w-full"
							>
								<Trophy size={16} />
								Enter Apex Legends Realm
								<ArrowRight size={14} />
							</a>
						</div>
					</div>
				</div>
			</section>
		</RuneRealm>
	);
}
