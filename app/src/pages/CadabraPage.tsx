import { MessageCircle, ArrowRight, Zap, Users, Trophy, Upload, Play, Radio, Gamepad2 } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';
import { TikTokFeeSharing } from '../components/TikTokFeeSharing';
import { useAbraBalance } from '../hooks/useAbraBalance';

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

export function CadabraPage() {
	// Token gating for Mirror/Cadabra access
	const { hasMinimum } = useAbraBalance(10);

	const handleEnterMirror = () => {
		if (!hasMinimum) {
			alert('You need at least 10 $ABRA to access the Mirror. Please acquire $ABRA first.');
			return;
		}
		window.open('https://cadabra-eight.vercel.app/', '_blank');
	};

	return (
		<RuneRealm {...RUNE_CONFIG}>
			<section className="space-y-8 py-8">
				{/* WELCOME: Cadabra intro */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="space-y-4">
						<span className="font-mono text-2xl font-bold text-purple-200 tracking-wide">Welcome to the next degree.</span>
						<h2 className="text-xl font-bold text-purple-200 tracking-widest uppercase">Cadabra — The Social Mirror</h2>
						<p className="text-sm leading-relaxed text-slate-300/90">
							The Instagram of the Abraxas ecosystem. Build community, share alpha, tokenize moments, and make DeFi great again. Pulse is the sole gaming clips platform inside Cadabra. Apex Legends is the first installment of the tokenized gaming layer.
						</p>
					</div>
				</div>

				{/* LEGACY COMMUNITY TOOLS - Deprecated */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-l-4 border-slate-600/50 pl-6 space-y-4">
						<h3 className="text-lg font-bold text-slate-400 tracking-wider uppercase">&gt; [LEGACY] OLD COMMUNITY BUILDING TOOLS</h3>
						<div className="space-y-3">
							<div className="rounded-lg border border-purple-300/25 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<Users size={20} className="text-purple-400 flex-shrink-0" />
									<div>
										<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Asset-Centered Communities</h4>
											<p className="text-xs text-slate-400 mt-1">Every RWA class gets a dedicated community. DApp equity holders congregate. Real estate syndicators form networks. Music rights communities build consensus. Gaming guilds coordinate. The Mirror reflects all human intent.</p>
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
										<p className="text-xs text-slate-300">DApp equity. Real estate. Music rights. Gaming rewards. These aren't casino tokens. These are real-world value, now liquid on-chain through Sophia's Family protocols. Communities validate them. Communities explain them. Communities pitch them to each other.</p>
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

				{/* BUY $CADABRA - TOP CTA */}
				<div className="max-w-3xl mx-auto px-4">
					<a
						href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full rounded-lg border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/25 px-6 py-3 text-center text-sm font-bold uppercase tracking-wider text-amber-200 shadow-[0_0_16px_rgba(251,146,60,0.25)] transition hover:shadow-[0_0_24px_rgba(251,146,60,0.4)] hover:border-amber-300/80"
					>
						<Zap className="inline mr-2" size={16} />
						Get $CADABRA
						<ArrowRight className="inline ml-2" size={14} />
					</a>
				</div>

				{/* TIKTOK FEE SHARING CARD */}
				<div className="max-w-3xl mx-auto px-4">
					<TikTokFeeSharing />
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

				{/* GTPC: GLOBAL TRADING POST COLLECTIVE - Coming Soon */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-500/8 via-slate-900/80 to-slate-900/60 p-8">
						<div className="absolute inset-0 opacity-10">
							<div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
						</div>
						<div className="relative z-10 space-y-6">
							<div>
								<h3 className="text-lg font-bold text-red-300 tracking-widest uppercase mb-3">🎮 GTA 6: COMING TO CADABRA</h3>
								<div className="inline-block px-3 py-1 rounded-full border border-red-400/40 bg-red-500/10 mb-3">
									<p className="text-xs font-semibold text-red-300 uppercase tracking-wider">Q4 2026</p>
								</div>
								<p className="text-sm leading-relaxed text-slate-300">
									Grand Theft Auto 6 arrives at Cadabra. In-game assets tokenized as NFTs. Player earnings converted to $CADABRA. Guilds coordinate heists. Reputation scores tied to on-chain trading. Crime becomes commerce. Vice becomes venture capital.
								</p>
							</div>

							<div className="space-y-3">
								<div className="border-l-2 border-red-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">🏎️ In-Game Asset Trading</h4>
									<p className="text-xs text-slate-300">Rare vehicles. Property. Weapons. All tradeable as SPL tokens on Cadabra. Rob a bank. Mint your haul. Sell it to the highest bidder. Your score becomes your stake.</p>
								</div>
								<div className="border-l-2 border-red-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">👥 Guild Heists</h4>
									<p className="text-xs text-slate-300">Organize multiplayer heists through Cadabra. Split winnings on-chain. Guild treasuries earn yield. Criminal enterprises become DAOs. Loyalty is tokenized.</p>
								</div>
								<div className="border-l-2 border-red-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-red-300 mb-1">💰 Reputation Leaderboards</h4>
									<p className="text-xs text-slate-300">Climb the ranks. Build notoriety. Top criminals get sponsorship deals. Your GTA 6 reputation unlocks real financial opportunities. Play-to-earn at scale.</p>
								</div>
							</div>

							<a
								href="https://cadabra-eight.vercel.app/"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-300/40 bg-gradient-to-r from-red-500/20 to-orange-500/15 px-6 py-3 text-sm font-bold uppercase tracking-wider text-red-200 shadow-[0_0_12px_rgba(239,68,68,0.15)] transition hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:border-red-300/60 w-full"
							>
								<Zap size={16} />
								Enter Cadabra
								<ArrowRight size={14} />
							</a>
						</div>
					</div>
				</div>

				{/* BUY $CADABRA - BOTTOM CTA */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="relative overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-slate-900/60 p-8">
						<div className="relative z-10 text-center space-y-4">
							<p className="text-xs font-mono text-amber-300/70 uppercase tracking-widest">&gt; INCOMPLETE_WITHOUT_PARTICIPATION</p>
							<h3 className="text-lg font-bold text-amber-300 tracking-wider uppercase">Own Your Stake in Cadabra</h3>
							<p className="text-sm text-slate-300/80">
								$CADABRA is the token of the Mirror. Hold it. Vote with it. Earn from protocol revenue. The Mirror is community-owned. You become part of the infrastructure.
							</p>
							<a
								href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-400/70 bg-gradient-to-r from-amber-500/40 to-orange-500/35 px-8 py-3 text-sm font-bold uppercase tracking-wider text-amber-100 shadow-[0_0_24px_rgba(251,146,60,0.35)] transition hover:shadow-[0_0_32px_rgba(251,146,60,0.5)] hover:border-amber-300/90 hover:from-amber-500/50 hover:to-orange-500/45"
							>
								<Zap size={18} className="text-orange-400" />
								<span>Get $CADABRA Now</span>
								<ArrowRight size={16} />
							</a>
						</div>
					</div>
				</div>
			</section>
		</RuneRealm>
	);
}
