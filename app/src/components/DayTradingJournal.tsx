import { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, Target, Calendar, BarChart3, Award, Zap, CheckCircle, X, Upload, AlertCircle, Sparkles } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

export interface TradeEntry {
	id: string;
	date: string;
	asset: string;
	entryPrice: number;
	exitPrice: number;
	h1Setup: string;
	m15Entry: string;
	positionSize: number;
	stopLoss: number;
	takeProfit: number;
	pnl: number;
	pnlPercent: number;
	notes: string;
	screenshotUrl?: string;
	strategy: 'MBLB-50' | 'other' | 'mixed';
	marketCondition: 'bullish' | 'bearish' | 'sideways';
	riskRewardRatio: number;
	won: boolean;
	deleted?: boolean;
}

interface PerformanceMetrics {
	totalTrades: number;
	winRate: number;
	wins: number;
	losses: number;
	expectancy: number;
	totalPnL: number;
	averageRR: number;
	maxDD: number;
	runningDD: number;
	monthlyPnL: { [key: string]: number };
	currentStreak: number;
	secondaryWinStreak?: number;
}

interface KingAIFeedback {
	tradeId: string;
	strategyAdherence: number;
	riskManagement: number;
	emotionalFlags: string[];
	suggestions: string[];
	overallScore: number;
	timestamp: string;
}

export function DayTradingJournal() {
	const { publicKey } = useWallet();
	const [trades, setTrades] = useState<TradeEntry[]>([]);
	const [showForm, setShowForm] = useState(false);
	const [selectedTrade, setSelectedTrade] = useState<TradeEntry | null>(null);
	const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
	const [kingAIFeedback, setKingAIFeedback] = useState<KingAIFeedback | null>(null);
	const [showKingAI, setShowKingAI] = useState(false);
	const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
	const [screenshotPreview, setScreenshotPreview] = useState<string>('');

	// Form state
	const [formData, setFormData] = useState<{
		asset: string;
		entryPrice: string;
		exitPrice: string;
		h1Setup: string;
		m15Entry: string;
		positionSize: string;
		stopLoss: string;
		takeProfit: string;
		notes: string;
		marketCondition: 'bullish' | 'bearish' | 'sideways';
	}>({
		asset: '',
		entryPrice: '',
		exitPrice: '',
		h1Setup: '',
		m15Entry: '',
		positionSize: '',
		stopLoss: '',
		takeProfit: '',
		notes: '',
		marketCondition: 'bullish',
	});

	// Load trades from localStorage
	useEffect(() => {
		if (!publicKey) return;
		const key = `trading_journal_${publicKey.toString()}`;
		const stored = localStorage.getItem(key);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setTrades(parsed.filter((t: TradeEntry) => !t.deleted));
			} catch (e) {
				console.error('Failed to parse trading journal:', e);
			}
		}
	}, [publicKey]);

	// Calculate metrics whenever trades change
	useEffect(() => {
		const newMetrics = calculateMetrics(trades);
		setMetrics(newMetrics);
	}, [trades]);

	// Save trades to localStorage
	useEffect(() => {
		if (!publicKey) return;
		const key = `trading_journal_${publicKey.toString()}`;
		localStorage.setItem(key, JSON.stringify(trades));

		// Update Abraxas profile with streak achievements
		const profile = localStorage.getItem('abraxas_profile');
		if (profile) {
			try {
				const parsed = JSON.parse(profile);
				if (metrics) {
					parsed.journalStreak = metrics.currentStreak;
					parsed.totalTrades = metrics.totalTrades;
					parsed.tradingWinRate = metrics.winRate;

					// Award points based on streak milestones
					const streakBonusPoints = Math.floor(metrics.currentStreak / 5) * 10;
					if (streakBonusPoints > 0) {
						parsed.airdropPoints = (parsed.airdropPoints || 0) + Math.min(streakBonusPoints, 50);
					}
				}
				localStorage.setItem('abraxas_profile', JSON.stringify(parsed));
			} catch (e) {
				console.error('Failed to update profile:', e);
			}
		}
	}, [trades, metrics, publicKey]);

	function calculateMetrics(tradeList: TradeEntry[]): PerformanceMetrics {
		if (tradeList.length === 0) {
			return {
				totalTrades: 0,
				winRate: 0,
				wins: 0,
				losses: 0,
				expectancy: 0,
				totalPnL: 0,
				averageRR: 0,
				maxDD: 0,
				runningDD: 0,
				monthlyPnL: {},
				currentStreak: 0,
			};
		}

		const wins = tradeList.filter((t) => t.won).length;
		const losses = tradeList.filter((t) => !t.won).length;
		const totalPnL = tradeList.reduce((sum, t) => sum + t.pnl, 0);
		const totalRisk = tradeList.reduce((sum, t) => {
			const risk = t.positionSize * (t.entryPrice - t.stopLoss);
			return sum + Math.abs(risk);
		}, 0);
		const avgWin = wins > 0 ? tradeList.filter((t) => t.won).reduce((sum, t) => sum + t.pnl, 0) / wins : 0;
		const avgLoss = losses > 0 ? tradeList.filter((t) => !t.won).reduce((sum, t) => sum + t.pnl, 0) / losses : 0;
		const expectancy = wins > 0 ? (avgWin * wins - Math.abs(avgLoss) * losses) / tradeList.length : 0;

		// Calculate average R:R
		const rrRatios = tradeList.map((t) => t.riskRewardRatio || 0);
		const averageRR = rrRatios.length > 0 ? rrRatios.reduce((a, b) => a + b, 0) / rrRatios.length : 0;

		// Calculate max drawdown
		let runningPnL = 0;
		let maxPnL = 0;
		let maxDD = 0;
		let runningDD = 0;

		tradeList.forEach((t) => {
			runningPnL += t.pnl;
			if (runningPnL > maxPnL) {
				maxPnL = runningPnL;
				runningDD = 0;
			} else {
				runningDD = Math.abs(runningPnL - maxPnL);
				if (runningDD > maxDD) {
					maxDD = runningDD;
				}
			}
		});

		// Calculate monthly P&L
		const monthlyPnL: { [key: string]: number } = {};
		tradeList.forEach((t) => {
			const month = t.date.substring(0, 7);
			monthlyPnL[month] = (monthlyPnL[month] || 0) + t.pnl;
		});

		// Calculate current streak
		let currentStreak = 0;
		const sortedTrades = [...tradeList].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		for (const trade of sortedTrades) {
			if (trade.won) {
				currentStreak++;
			} else {
				break;
			}
		}

		return {
			totalTrades: tradeList.length,
			winRate: (wins / tradeList.length) * 100,
			wins,
			losses,
			expectancy,
			totalPnL,
			averageRR,
			maxDD,
			runningDD,
			monthlyPnL,
			currentStreak,
		};
	}

	function detachStrategyMatch(entry: number, exit: number, entryPrice: number, setupDescription: string): string {
		// MBLB/50 bounce detection logic
		const priceMove = ((exit - entry) / entry) * 100;
		const isBounce = Math.abs(priceMove) < 10;
		const mentionsMBLB = setupDescription?.toLowerCase().includes('mblb') || setupDescription?.toLowerCase().includes('50');
		const mentions50MA = setupDescription?.toLowerCase().includes('50 ma') || setupDescription?.toLowerCase().includes('50ma');

		if ((mentionsMBLB || mentions50MA) && isBounce) {
			return 'MBLB-50';
		}
		return 'other';
	}

	function handleScreenshotChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			setScreenshotFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setScreenshotPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}

	function handleSubmitTrade() {
		if (!formData.asset || !formData.entryPrice || !formData.exitPrice) {
			alert('Please fill in asset, entry price, and exit price');
			return;
		}

		const entry = parseFloat(formData.entryPrice);
		const exit = parseFloat(formData.exitPrice);
		const posSize = parseFloat(formData.positionSize) || 1;
		const sl = parseFloat(formData.stopLoss) || entry * 0.95;
		const tp = parseFloat(formData.takeProfit) || entry * 1.05;

		const pnl = (exit - entry) * posSize;
		const pnlPercent = ((exit - entry) / entry) * 100;
		const Won = exit > entry;
		const rr = Math.abs((tp - entry) / (entry - sl)) || 1;

		const strategy = detachStrategyMatch(entry, exit, entry, formData.h1Setup);

		const newTrade: TradeEntry = {
			id: Date.now().toString(),
			date: new Date().toISOString().split('T')[0],
			asset: formData.asset,
			entryPrice: entry,
			exitPrice: exit,
			h1Setup: formData.h1Setup,
			m15Entry: formData.m15Entry,
			positionSize: posSize,
			stopLoss: sl,
			takeProfit: tp,
			pnl,
			pnlPercent,
			notes: formData.notes,
			screenshotUrl: screenshotPreview,
			strategy: strategy as TradeEntry['strategy'],
			marketCondition: formData.marketCondition,
			riskRewardRatio: rr,
			won: Won,
		};

		setTrades([...trades, newTrade]);
		setFormData({
			asset: '',
			entryPrice: '',
			exitPrice: '',
			h1Setup: '',
			m15Entry: '',
			positionSize: '',
			stopLoss: '',
			takeProfit: '',
			notes: '',
			marketCondition: 'bullish',
		});
		setScreenshotFile(null);
		setScreenshotPreview('');
		setShowForm(false);
	}

	function generateKingAIFeedback(trade: TradeEntry): KingAIFeedback {
		const emotionalFlags: string[] = [];
		const suggestions: string[] = [];
		let strategyScore = 50;
		let riskScore = 50;

		// Strategy adherence
		if (trade.strategy === 'MBLB-50') {
			strategyScore += 25;
			suggestions.push('✓ Trade matches MBLB/50 bounce rules');
		} else {
			suggestions.push('Consider using MBLB/50 setup for better consistency');
		}

		// Risk management
		if (trade.riskRewardRatio >= 2) {
			riskScore += 25;
			suggestions.push('✓ Excellent risk/reward ratio (≥2.0)');
		} else if (trade.riskRewardRatio >= 1) {
			riskScore += 15;
			suggestions.push('Risk/reward ratio could be improved (target 2.0+)');
		} else {
			suggestions.push('⚠️ Risk/reward ratio below 1.0 - revisit strategy');
		}

		// Position sizing
		if (trade.positionSize <= 2) {
			riskScore += 10;
		} else {
			emotionalFlags.push('Large position size - potential overconfidence');
			suggestions.push('Consider reducing position size for better risk management');
		}

		// Trade outcome vs strategy
		if (!trade.won && trade.strategy !== 'MBLB-50') {
			emotionalFlags.push('Losing trade outside core strategy');
			suggestions.push('Focus on MBLB/50 setups to improve win rate');
		}

		if (trade.pnl < -10 && !trade.won) {
			emotionalFlags.push('Large loss - potential emotional reaction');
			suggestions.push('Review stop-loss discipline after this trade');
		}

		const overallScore = (strategyScore + riskScore) / 2;

		return {
			tradeId: trade.id,
			strategyAdherence: strategyScore,
			riskManagement: riskScore,
			emotionalFlags,
			suggestions,
			overallScore,
			timestamp: new Date().toISOString(),
		};
	}

	function handleGetOracleAnalysis(trade: TradeEntry) {
		const feedback = generateKingAIFeedback(trade);
		setKingAIFeedback(feedback);
		setShowKingAI(true);
	}

	function deleteTrade(tradeId: string) {
		setTrades(trades.filter((t) => t.id !== tradeId));
	}

	const sortedTrades = [...trades].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const currentMonth = new Date().toISOString().substring(0, 7);
	const monthlyPnL = metrics?.monthlyPnL[currentMonth] || 0;

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-1">
					<h3 className="text-lg font-bold text-purple-300 tracking-wider uppercase">📊 Trading Journal</h3>
					<p className="text-xs text-slate-400">Log and analyze every trade with King AI insights</p>
				</div>
				<button
					onClick={() => setShowForm(!showForm)}
					className="inline-flex items-center gap-2 rounded-lg border border-purple-400/40 bg-gradient-to-r from-purple-500/20 to-purple-400/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-purple-200 hover:border-purple-400/60 transition"
				>
					<Plus size={14} />
					Log Trade
				</button>
			</div>

			{/* Performance Metrics */}
			{metrics && metrics.totalTrades > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					<div className="rounded-lg border border-purple-300/20 bg-slate-900/50 p-3">
						<div className="text-[11px] font-mono text-purple-300/70 uppercase tracking-widest mb-1">[WIN_RATE]</div>
						<div className="text-lg font-bold text-purple-200">{metrics.winRate.toFixed(1)}%</div>
						<div className="text-xs text-slate-500 mt-0.5">
							{metrics.wins}W / {metrics.losses}L
						</div>
					</div>

					<div className="rounded-lg border border-cyan-300/20 bg-slate-900/50 p-3">
						<div className="text-[11px] font-mono text-cyan-300/70 uppercase tracking-widest mb-1">[R:R_RATIO]</div>
						<div className="text-lg font-bold text-cyan-200">{metrics.averageRR.toFixed(2)}</div>
						<div className="text-xs text-slate-500 mt-0.5">avg reward:risk</div>
					</div>

					<div className="rounded-lg border border-orange-300/20 bg-slate-900/50 p-3">
						<div className="text-[11px] font-mono text-orange-300/70 uppercase tracking-widest mb-1">[MONTHLY_PNL]</div>
						<div className={`text-lg font-bold ${monthlyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
							${monthlyPnL.toFixed(2)}
						</div>
						<div className="text-xs text-slate-500 mt-0.5">{currentMonth}</div>
					</div>

					<div className="rounded-lg border border-amber-300/20 bg-slate-900/50 p-3">
						<div className="text-[11px] font-mono text-amber-300/70 uppercase tracking-widest mb-1">[STREAK]</div>
						<div className="text-lg font-bold text-amber-300">{metrics.currentStreak}</div>
						<div className="text-xs text-slate-500 mt-0.5">wins in a row</div>
					</div>
				</div>
			)}

			{/* Trade Entry Form */}
			{showForm && (
				<div className="rounded-2xl border border-purple-300/25 bg-gradient-to-br from-purple-500/10 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur space-y-4">
					<div className="flex items-center justify-between mb-3">
						<h4 className="font-mono text-sm font-bold text-purple-300 uppercase tracking-wider">LOG_NEW_TRADE</h4>
						<button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-300 transition">
							<X size={18} />
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label className="text-xs font-mono uppercase text-slate-400 block mb-1">Asset</label>
							<input
								type="text"
								value={formData.asset}
								onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
								placeholder="BTC, ETH, etc."
								className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition"
							/>
						</div>

						<div>
							<label className="text-xs font-mono uppercase text-slate-400 block mb-1">Entry Price</label>
							<input
								type="number"
								value={formData.entryPrice}
								onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
								placeholder="0.00"
								step="0.01"
								className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition"
							/>
						</div>

						<div>
							<label className="text-xs font-mono uppercase text-slate-400 block mb-1">Exit Price</label>
							<input
								type="number"
								value={formData.exitPrice}
								onChange={(e) => setFormData({ ...formData, exitPrice: e.target.value })}
								placeholder="0.00"
								step="0.01"
								className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition"
							/>
						</div>

						<div>
							<label className="text-xs font-mono uppercase text-slate-400 block mb-1">Position Size</label>
							<input
								type="number"
								value={formData.positionSize}
								onChange={(e) => setFormData({ ...formData, positionSize: e.target.value })}
								placeholder="1.0"
								step="0.1"
								className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition"
							/>
						</div>

						<div>
							<label className="text-xs font-mono uppercase text-slate-400 block mb-1">Stop Loss</label>
							<input
								type="number"
								value={formData.stopLoss}
								onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
								placeholder="0.00"
								step="0.01"
								className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition"
							/>
						</div>

						<div>
							<label className="text-xs font-mono uppercase text-slate-400 block mb-1">Take Profit</label>
							<input
								type="number"
								value={formData.takeProfit}
								onChange={(e) => setFormData({ ...formData, takeProfit: e.target.value })}
								placeholder="0.00"
								step="0.01"
								className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label className="text-xs font-mono uppercase text-slate-400 block mb-1">H1 Setup Description</label>
							<input
								type="text"
								value={formData.h1Setup}
								onChange={(e) => setFormData({ ...formData, h1Setup: e.target.value })}
								placeholder="e.g., MBLB breakdown on H1"
								className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition"
							/>
						</div>

						<div>
							<label className="text-xs font-mono uppercase text-slate-400 block mb-1">M15 Entry Conditions</label>
							<input
								type="text"
								value={formData.m15Entry}
								onChange={(e) => setFormData({ ...formData, m15Entry: e.target.value })}
								placeholder="e.g., 5 EMA crossover"
								className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition"
							/>
						</div>
					</div>

					<div>
						<label className="text-xs font-mono uppercase text-slate-400 block mb-1">Market Condition</label>
						<select
							value={formData.marketCondition}
							onChange={(e) => {
								const value = e.target.value as 'bullish' | 'bearish' | 'sideways';
								setFormData({ ...formData, marketCondition: value });
							}}
							className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 focus:border-purple-300/50 focus:outline-none transition"
						>
							<option value="bullish">📈 Bullish</option>
							<option value="bearish">📉 Bearish</option>
							<option value="sideways">➡️ Sideways</option>
						</select>
					</div>

					<div>
						<label className="text-xs font-mono uppercase text-slate-400 block mb-1">Trade Notes</label>
						<textarea
							value={formData.notes}
							onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
							placeholder="Reflections, emotional state, decisions made..."
							className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-300/50 focus:outline-none transition resize-none h-20"
						/>
					</div>

					<div>
						<label className="text-xs font-mono uppercase text-slate-400 block mb-2 flex items-center gap-1.5">
							<Upload size={13} /> Screenshots (optional)
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleScreenshotChange}
							className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-3 py-2 text-xs text-slate-400 file:mr-3 file:px-2 file:py-1 file:rounded file:border-0 file:bg-purple-500/20 file:text-purple-300 file:cursor-pointer hover:file:bg-purple-500/30 transition"
						/>
						{screenshotPreview && (
							<img src={screenshotPreview} alt="Preview" className="mt-2 h-20 rounded-lg border border-purple-300/20 object-cover" />
						)}
					</div>

					<div className="flex gap-2 pt-2">
						<button
							onClick={handleSubmitTrade}
							className="flex-1 rounded-lg border border-purple-400/50 bg-gradient-to-r from-purple-500/30 to-purple-400/20 px-4 py-2 text-sm font-bold uppercase tracking-wider text-purple-200 hover:border-purple-400/70 transition"
						>
							<CheckCircle className="inline mr-2" size={14} />
							Submit Trade
						</button>
						<button
							onClick={() => setShowForm(false)}
							className="flex-1 rounded-lg border border-slate-600/30 bg-slate-900/50 px-4 py-2 text-sm font-bold uppercase tracking-wider text-slate-400 hover:border-slate-600/50 transition"
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* King AI Feedback Modal */}
			{showKingAI && kingAIFeedback && (
				<div className="rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-slate-900/60 p-5 backdrop-blur space-y-4">
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-2">
							<Sparkles size={16} className="text-cyan-400" />
							<h4 className="font-mono text-sm font-bold text-cyan-300 uppercase tracking-wider">KING_AI_ORACLE_ANALYSIS</h4>
						</div>
						<button onClick={() => setShowKingAI(false)} className="text-slate-400 hover:text-slate-300 transition">
							<X size={18} />
						</button>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-3">
							<div className="text-[11px] font-mono text-cyan-300/70 uppercase tracking-widest mb-1">Strategy Adherence</div>
							<div className="text-lg font-bold text-cyan-200">{kingAIFeedback.strategyAdherence}%</div>
						</div>
						<div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-3">
							<div className="text-[11px] font-mono text-cyan-300/70 uppercase tracking-widest mb-1">Risk Management</div>
							<div className="text-lg font-bold text-cyan-200">{kingAIFeedback.riskManagement}%</div>
						</div>
					</div>

					{kingAIFeedback.emotionalFlags.length > 0 && (
						<div className="rounded-lg border border-amber-300/20 bg-amber-900/20 p-3">
							<div className="text-xs font-mono text-amber-300/80 uppercase tracking-wider font-bold mb-2">⚠️ Emotional Flags</div>
							<div className="space-y-1">
								{kingAIFeedback.emotionalFlags.map((flag, i) => (
									<div key={i} className="text-sm text-amber-200/80">
										• {flag}
									</div>
								))}
							</div>
						</div>
					)}

					<div className="rounded-lg border border-purple-300/20 bg-purple-900/20 p-3">
						<div className="text-xs font-mono text-purple-300/80 uppercase tracking-wider font-bold mb-2">💡 Suggestions</div>
						<div className="space-y-1">
							{kingAIFeedback.suggestions.map((suggestion, i) => (
								<div key={i} className="text-sm text-purple-200/80">
									• {suggestion}
								</div>
							))}
						</div>
					</div>

					<div className="text-xs text-slate-500 text-center">Analysis timestamp: {new Date(kingAIFeedback.timestamp).toLocaleString()}</div>
				</div>
			)}

			{/* Recent Trades */}
			{trades.length > 0 && (
				<div className="space-y-3">
					<h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Trades ({trades.length})</h4>
					<div className="space-y-2">
						{sortedTrades.slice(0, 10).map((trade) => (
							<div key={trade.id} className="rounded-lg border border-slate-700/30 bg-slate-900/40 p-3 hover:border-slate-700/50 transition">
								<div className="flex items-start justify-between gap-3">
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<span className="font-bold text-sm text-slate-200">{trade.asset}</span>
											<span className={`text-xs font-mono px-2 py-0.5 rounded ${trade.won ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
												{trade.won ? 'WIN' : 'LOSS'}
											</span>
											{trade.strategy === 'MBLB-50' && <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">MBLB-50</span>}
										</div>
										<div className="text-xs text-slate-400 mb-2">
											{trade.date} • Entry: ${trade.entryPrice.toFixed(2)} → Exit: ${trade.exitPrice.toFixed(2)}
										</div>
										{trade.notes && <div className="text-xs text-slate-500 italic mb-1">{trade.notes.substring(0, 60)}...</div>}
										<div className="flex gap-2 items-center">
											<button
												onClick={() => handleGetOracleAnalysis(trade)}
												className="text-xs px-2 py-1 rounded border border-cyan-300/30 bg-cyan-500/10 text-cyan-300 hover:border-cyan-300/50 transition"
											>
												<Sparkles size={11} className="inline mr-1" />
												Oracle Analysis
											</button>
											<button
												onClick={() => deleteTrade(trade.id)}
												className="text-xs px-2 py-1 rounded border border-red-300/30 bg-red-500/10 text-red-300 hover:border-red-300/50 transition"
											>
												Delete
											</button>
										</div>
									</div>
									<div className="text-right shrink-0">
										<div className={`text-sm font-bold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
											${trade.pnl.toFixed(2)}
										</div>
										<div className={`text-xs font-mono ${trade.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
											{trade.pnlPercent > 0 ? '+' : ''}
											{trade.pnlPercent.toFixed(2)}%
										</div>
										<div className="text-xs text-slate-500 mt-0.5">R:R {trade.riskRewardRatio.toFixed(2)}</div>
									</div>
								</div>
								{trade.screenshotUrl && (
									<img src={trade.screenshotUrl} alt="Trade screenshot" className="mt-2 h-16 rounded-lg border border-slate-700/50 object-cover" />
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Empty State */}
			{trades.length === 0 && !showForm && (
				<div className="rounded-lg border border-slate-700/30 bg-slate-900/40 p-8 text-center">
					<BarChart3 size={32} className="mx-auto text-slate-600 mb-3" />
					<p className="text-sm text-slate-400">No trades logged yet.</p>
					<p className="text-xs text-slate-500 mt-1">Start tracking your trades to unlock King AI insights and performance analytics.</p>
				</div>
			)}
		</div>
	);
}
