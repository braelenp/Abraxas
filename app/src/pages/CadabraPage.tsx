import { MessageCircle, ArrowRight } from 'lucide-react';
import { RuneRealm } from '../components/RuneRealm';

const RUNE_CONFIG = {
	rune: '✦',
	runeName: 'Mirror',
	runeEssence: 'Reflection · Collective Wisdom',
	agentName: 'CADABRA',
	lore: 'Cadabra is the social mirror that reflects the collective intelligence of the ecosystem. Alpha flows here. KOL insights crystallize here. Every asset class—athlete equity, RWA, gaming, music—congregates in real-time discussion. The protocol listens. The Mirror remembers. Price discovery begins where community intent manifests.',
	ctaLabel: 'Enter the Mirror',
	coreGlow: '153, 69, 255',
	fireGlow: '168, 85, 247',
	accentClass: 'text-purple-300',
} as const;

export function CadabraPage() {
	return (
		<RuneRealm {...RUNE_CONFIG}>
			<section className="space-y-8 py-8">
				{/* Cadabra Overview */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-l-4 border-purple-400/50 pl-6 space-y-4 font-mono">
						<h2 className="text-lg font-bold text-purple-300 tracking-wider uppercase">&gt; CADABRA_PROTOCOL_ACTIVATED</h2>
						<div className="space-y-3 text-sm text-slate-300/80">
							<p>
								<span className="text-purple-400 font-mono">[ALPHA]</span> <span className="text-purple-400/70 text-[11px] font-mono">Real-time price discovery & market sentiment across every RWA asset class.</span>
							</p>
							<p>
								<span className="text-purple-400 font-mono">[KOL_DEALS]</span> <span className="text-purple-400/70 text-[11px] font-mono">Follow institutional positioning, trader flow, and insider insights on breaking opportunities.</span>
							</p>
							<p>
								<span className="text-purple-400 font-mono">[MEME_TRADING]</span> <span className="text-purple-400/70 text-[11px] font-mono">Catch momentum in emerging asset narratives before protocol adoption.</span>
							</p>
							<p>
								<span className="text-purple-400 font-mono">[COMMUNITY]</span> <span className="text-purple-400/70 text-[11px] font-mono">Join conversations on athlete equity, real estate, music rights, commodities, and DeFi.</span>
							</p>
							<p>
								<span className="text-purple-400 font-mono">[CONSENSUS]</span> <span className="text-purple-400/70 text-[11px] font-mono">Watch where smart capital congregates. The Mirror reflects truth before markets move.</span>
							</p>
						</div>
						<p className="text-xs text-purple-300/70 pt-2 italic uppercase tracking-widest">&gt; ENTER_MIRROR_NAVIGATE_ALPHA</p>
					</div>
				</div>

				{/* Why Cadabra Card */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="relative overflow-hidden rounded-2xl border border-purple-300/30 bg-gradient-to-br from-purple-500/8 via-slate-900/80 to-slate-900/60 p-8">
						<div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-100 transition" />
						<div className="relative z-10 space-y-6">
							<div>
								<h3 className="text-lg font-bold text-purple-300 tracking-widest uppercase mb-3">The Social Mirror</h3>
								<p className="text-sm leading-relaxed text-slate-300">
									Abraxas is the engine. Cadabra is the nervous system. While the protocol compiles yield programs and tokenizes assets, Cadabra captures the most real-time currency of markets: collective human intelligence.
								</p>
							</div>

							<div className="space-y-4">
								<div className="border-l-2 border-purple-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">Alpha Discovery</h4>
									<p className="text-xs text-slate-400">Emerging RWA opportunities surface first in collective discussion. See what institutional traders are positioning into before the move prints on-chain.</p>
								</div>
								<div className="border-l-2 border-purple-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">Community Validation</h4>
									<p className="text-xs text-slate-400">Every asset class has its tribe. Athlete equity communities, real estate syndicators, music rights holders, sports betting enthusiasts—they congregate here to validate thesis and share DD.</p>
								</div>
								<div className="border-l-2 border-purple-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">Price Action Correlation</h4>
									<p className="text-xs text-slate-400">Watch meme cycles, emotional turning points, and conviction reversals across communities. Market structure emerges from coordinated human intent.</p>
								</div>
								<div className="border-l-2 border-purple-400/40 pl-4">
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">KOL Flow Tracking</h4>
									<p className="text-xs text-slate-400">Follow verified institutional players, successful traders, market makers, and protocol stewards as they broadcast positioning and thesis updates.</p>
								</div>
							</div>

							<div className="pt-4">
								<a
									href="https://cadabra-eight.vercel.app/"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-300/40 bg-gradient-to-r from-purple-500/20 to-violet-500/15 px-6 py-3 text-sm font-bold uppercase tracking-wider text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.15)] transition hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-300/60"
								>
									<MessageCircle size={16} />
									Enter the Mirror
									<ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* How It Connects */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="space-y-4">
						<h3 className="text-sm font-bold text-purple-300 tracking-widest uppercase">&gt; CADABRA_x_ABRAXAS_INTEGRATION</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="rounded-lg border border-purple-300/20 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<MessageCircle size={18} className="text-purple-400 flex-shrink-0" />
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Discuss Assets in Real-Time</h4>
								</div>
								<p className="text-xs text-slate-400 leading-relaxed">
									Every RWA minted on Abraxas automatically has a discussion channel on Cadabra. Community coordination flows at the Mirror.
								</p>
							</div>

							<div className="rounded-lg border border-purple-300/20 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<MessageCircle size={18} className="text-purple-400 flex-shrink-0" />
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Verify Authenticity</h4>
								</div>
								<p className="text-xs text-slate-400 leading-relaxed">
									Asset creators, RWA providers, and Sophia vault managers verify on Cadabra to establish trust signals with communities.
								</p>
							</div>

							<div className="rounded-lg border border-purple-300/20 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<MessageCircle size={18} className="text-purple-400 flex-shrink-0" />
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Track Sentiment Flow</h4>
								</div>
								<p className="text-xs text-slate-400 leading-relaxed">
									Cadabra monitors community sentiment across asset classes. Bullish consensus cascades become price action signals.
								</p>
							</div>

							<div className="rounded-lg border border-purple-300/20 bg-slate-900/50 backdrop-blur-sm p-4">
								<div className="flex gap-3 mb-3">
									<MessageCircle size={18} className="text-purple-400 flex-shrink-0" />
									<h4 className="text-xs font-bold uppercase tracking-widest text-purple-200">Discover Daughters & Sons</h4>
								</div>
								<p className="text-xs text-slate-400 leading-relaxed">
									Specialized dApps (Echo, Aurelia, Genesis, Valkyr) announce updates and coordinate with communities on Cadabra first.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Call to Action */}
				<div className="max-w-3xl mx-auto px-4">
					<div className="border-t border-purple-300/20 pt-8">
						<div className="text-center space-y-4">
							<p className="text-xs font-mono text-purple-300/80 uppercase tracking-widest">&gt; [NEXT_STEP] ENTER_THE_MIRROR</p>
							<a
								href="https://cadabra-eight.vercel.app/"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-300/50 bg-gradient-to-r from-purple-500/25 to-violet-500/20 px-8 py-4 text-sm font-bold uppercase tracking-wider text-purple-100 shadow-[0_0_16px_rgba(168,85,247,0.2)] transition hover:shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:border-purple-300/70"
							>
								<MessageCircle size={18} />
								Access Cadabra Now
								<ArrowRight size={16} />
							</a>
							<p className="text-xs text-slate-400/70 italic">
								Join thousands of traders, KOLs, asset creators, and communities discovering alpha on the protocol's social mirror.
							</p>
						</div>
					</div>
				</div>
			</section>
		</RuneRealm>
	);
}
