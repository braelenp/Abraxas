import { useMemo, useState, useEffect, useRef } from 'react';
import { TrendingDown, Star, Sparkles, ChevronLeft, ChevronRight, Send, ArrowRightLeft, LogIn, Plus, DollarSign, Zap } from 'lucide-react';
import { useAbraxas } from '../providers/AbraxasProvider';
import { useWallet } from '@solana/wallet-adapter-react';
import { useLocation } from 'react-router-dom';
import { fetchPolymarketBets, type PolymarketBet, POLYMARKET_CATEGORIES, filterByCategory } from '../lib/polymarket';
import { usePolymarketBets } from '../hooks/usePolymarketBets';
import { getKingAIProbability } from '../lib/polymarket';
import { FeatureBadge } from '../components/FeatureBadge';
import SpendAbra from '../components/SpendAbra';
import { OraclePerformanceWidget } from '../components/OraclePerformanceWidget';
import { useNavigate } from 'react-router-dom';
import { RuneRealm } from '../components/RuneRealm';
import { useUserProfile } from '../hooks/useProfile';
import { WalletLoginModal } from '../components/WalletLoginModal';
import { ProfileCreationModal } from '../components/ProfileCreationModal';

// Token address for transparency & trust with degen crowd
const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';

const RUNE_CONFIG = {
  rune: 'ᛉ',
  runeName: 'Algiz',
  runeEssence: 'Protection · Divine Guardianship',
  agentName: 'WARDEN',
  lore: "Algiz stands as the rune of divine protection, elk antlers raised against all unseen forces. The Warden holds the threshold between chaos and the sovereign order of Abraxas. Live prediction markets, portfolio momentum, and market intelligence all answer to the Warden's watch.",
  ctaLabel: 'Enter the Dashboard',
  coreGlow: '168, 85, 247',
  fireGlow: '234, 88, 12',
  accentClass: 'text-violet-300',
} as const;

export function DashboardPage() {
  const { vaults, athleteTokens } = useAbraxas();
  const { bets: polymarketBets, isLoading: isLoadingBets } = usePolymarketBets(3);
  const { connected } = useWallet();
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const [following, setFollowing] = useState<string[]>([]);
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [perpIndex, setPerpIndex] = useState(0);
  const [followingIndex, setFollowingIndex] = useState(0);
  const [predictionTouchStart, setPredictionTouchStart] = useState(0);
  const [perpTouchStart, setPerpTouchStart] = useState(0);
  const [followingTouchStart, setFollowingTouchStart] = useState(0);
  const [betAmounts, setBetAmounts] = useState<Record<string, string>>({});
  const [placingBet, setPlacingBet] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOffRampWidget, setShowOffRampWidget] = useState(false);
  const [showSpendAbra, setShowSpendAbra] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
  const lastPathnameRef = useRef<string>(location.pathname);

  // Reset state ONLY when actually entering the Dashboard page
  useEffect(() => {
    if (lastPathnameRef.current !== location.pathname && location.pathname === '/app/warden') {
      lastPathnameRef.current = location.pathname;
      setFollowing([]);
      setPredictionIndex(0);
      setPerpIndex(0);
      setFollowingIndex(0);
      setBetAmounts({});
      setPlacingBet(null);
      setSelectedCategory(null);
      setShowOffRampWidget(false);
      setShowSpendAbra(false);
    }
  }, [location.pathname]);

  // Filter markets by selected category
  const filteredBets = useMemo(() => filterByCategory(polymarketBets, selectedCategory), [polymarketBets, selectedCategory]);

  const predictions = useMemo(() => filteredBets.map((bet, idx) => ({
    id: bet.id,
    question: bet.question,
    yes: bet.yes,
    no: bet.no,
    category: bet.category,
    kingAI: getKingAIProbability(bet.yesPrice),
  })), [filteredBets]);

  const perps = [
    { symbol: 'BTC', icon: '₿', change: -2.55, leverage: '40x' },
    { symbol: 'ETH', icon: 'Ξ', change: -3.30, leverage: '25x' },
    { symbol: 'HYPE', icon: '◆', change: -4.26, leverage: '15x' },
  ];

  const handlePredictionTouchStart = (e: React.TouchEvent) => setPredictionTouchStart(e.touches[0].clientX);
  const handlePredictionTouchEnd = (e: React.TouchEvent) => {
    const swipeDistance = predictionTouchStart - e.changedTouches[0].clientX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        setPredictionIndex((predictionIndex + 1) % predictions.length);
      } else {
        setPredictionIndex((predictionIndex - 1 + predictions.length) % predictions.length);
      }
    }
  };

  const handlePerpTouchStart = (e: React.TouchEvent) => setPerpTouchStart(e.touches[0].clientX);
  const handlePerpTouchEnd = (e: React.TouchEvent) => {
    const swipeDistance = perpTouchStart - e.changedTouches[0].clientX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        setPerpIndex((perpIndex + 1) % perps.length);
      } else {
        setPerpIndex((perpIndex - 1 + perps.length) % perps.length);
      }
    }
  };

  const handleFollowingTouchStart = (e: React.TouchEvent) => setFollowingTouchStart(e.touches[0].clientX);
  const handleFollowingTouchEnd = (e: React.TouchEvent) => {
    const swipeDistance = followingTouchStart - e.changedTouches[0].clientX;
    if (Math.abs(swipeDistance) > 50 && athleteTokens.length > 0) {
      if (swipeDistance > 0) {
        setFollowingIndex((followingIndex + 1) % athleteTokens.length);
      } else {
        setFollowingIndex((followingIndex - 1 + athleteTokens.length) % athleteTokens.length);
      }
    }
  };

  // Reset prediction index when category changes
  useEffect(() => {
    setPredictionIndex(0);
  }, [selectedCategory]);

  const portfolioStats = useMemo(() => {
    const totalDeposited = vaults.reduce((sum, vault) => sum + vault.depositedAmount, 0);
    const totalValue = vaults.reduce((sum, vault) => sum + vault.vaultValue, 0);
    const totalGains = totalValue - totalDeposited;
    const gainsPct = totalDeposited > 0 ? ((totalGains / totalDeposited) * 100).toFixed(1) : '0';
    return { totalDeposited, totalValue, totalGains, gainsPct };
  }, [vaults]);

  return (
    <RuneRealm {...RUNE_CONFIG}>
    <section className="space-y-4">
      {/* Abraxas Profile Section */}
      {!profile ? (
        <article className="rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-900/30 to-slate-900/75 p-4 backdrop-blur space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-400/80 mb-1">⚡ Abraxas Profile</p>
              <p className="text-sm text-slate-300">Create or login to your Abraxas profile to track airdrop points.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-cyan-400/60 bg-cyan-500/20 text-cyan-200 font-semibold text-sm hover:bg-cyan-500/30 transition-all"
            >
              <LogIn size={16} />
              Login
            </button>
            <button
              onClick={() => setShowCreateProfileModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-purple-400/60 bg-purple-500/20 text-purple-200 font-semibold text-sm hover:bg-purple-500/30 transition-all"
            >
              <Plus size={16} />
              Create Profile
            </button>
          </div>

          <WalletLoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onCreateProfile={() => {
              setShowLoginModal(false);
              setShowCreateProfileModal(true);
            }}
          />

          <ProfileCreationModal
            isOpen={showCreateProfileModal}
            onClose={() => setShowCreateProfileModal(false)}
          />
        </article>
      ) : (
        <article className="rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-900/30 to-slate-900/75 p-4 backdrop-blur">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-400/80 mb-1">👤 {profile.abraxasId}</p>
              <p className="text-sm text-slate-300">@{profile.username || 'Initiate'} • {profile.airdropPoints.total} Points</p>
            </div>
            <div className="text-2xl">{profile.rune}</div>
          </div>
        </article>
      )}

      {/* Main Balance Display */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-5 backdrop-blur">
        <p className="text-xs text-slate-300/80">Total Balance</p>
        <p className="mt-2 text-5xl font-bold text-cyan-50">${portfolioStats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
        <p className={`mt-1 text-sm font-semibold ${portfolioStats.totalGains >= 0 ? 'text-cyan-200' : 'text-orange-300'}`}>
          {portfolioStats.totalGains >= 0 ? '+' : ''} ${Math.abs(portfolioStats.totalGains).toLocaleString('en-US', { maximumFractionDigits: 2 })} ({portfolioStats.gainsPct}%)
        </p>
      </article>

      {/* Token Verification Badge - Trust Builder */}
      <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-400/80 mb-1">ABRA Token Address</p>
            <p className="text-xs text-emerald-200 font-mono break-all leading-tight">{ABRA_TOKEN_CA}</p>
          </div>
        </div>
      </div>

      {/* Oracle Performance Widget */}
      <OraclePerformanceWidget />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => navigate('/app/trade')}
          disabled={!connected}
          className="relative glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur text-center hover:border-cyan-300/40 disabled:opacity-50 transition-all"
        >
          <div className="absolute top-2 right-2">
            <FeatureBadge status="live" size="sm" />
          </div>
          <Plus size={24} className="mx-auto text-cyan-300" />
          <p className="mt-2 text-sm font-medium text-slate-200">Buy ABRA</p>
          <p className="text-xs text-slate-400 mt-1">via Bags.fm</p>
        </button>
        
        <button 
          onClick={() => navigate('/app/trade')}
          disabled={!connected}
          className="relative glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur text-center hover:border-cyan-300/40 disabled:opacity-50 transition-all"
        >
          <div className="absolute top-2 right-2">
            <FeatureBadge status="live" size="sm" />
          </div>
          <ArrowRightLeft size={24} className="mx-auto text-cyan-300" />
          <p className="mt-2 text-sm font-medium text-slate-200">Swap Tokens</p>
          <p className="text-xs text-slate-400 mt-1">ABRA ↔ USDC</p>
        </button>

        <button 
          disabled={true}
          className="relative glow-panel rounded-2xl border border-slate-600/20 bg-slate-900/40 p-4 backdrop-blur text-center opacity-60"
        >
          <div className="absolute top-2 right-2">
            <FeatureBadge status="coming-soon" size="sm" />
          </div>
          <Send size={24} className="mx-auto text-slate-500" />
          <p className="mt-2 text-sm font-medium text-slate-400">Send</p>
          <p className="text-xs text-slate-500 mt-1">Transfer funds</p>
        </button>

        <button 
          disabled={true}
          className="relative glow-panel rounded-2xl border border-slate-600/20 bg-slate-900/40 p-4 backdrop-blur text-center opacity-60"
        >
          <div className="absolute top-2 right-2">
            <FeatureBadge status="coming-soon" size="sm" />
          </div>
          <LogIn size={24} className="mx-auto text-slate-500" />
          <p className="mt-2 text-sm font-medium text-slate-400">Receive</p>
          <p className="text-xs text-slate-500 mt-1">Incoming funds</p>
        </button>

        <button 
          onClick={() => setShowOffRampWidget(true)}
          disabled={!connected}
          className="relative glow-panel rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-4 backdrop-blur text-center hover:border-emerald-300/40 disabled:opacity-50 transition-all"
        >
          <DollarSign size={24} className="mx-auto text-emerald-300" />
          <p className="mt-2 text-sm font-medium text-slate-200">Cash Out</p>
          <p className="text-xs text-slate-400 mt-1">Convert to Fiat</p>
        </button>

        <button 
          onClick={() => setShowSpendAbra(true)}
          disabled={!connected}
          className="relative glow-panel rounded-2xl border border-purple-300/20 bg-slate-900/75 p-4 backdrop-blur text-center hover:border-purple-300/40 disabled:opacity-50 transition-all"
        >
          <div className="absolute top-2 right-2">
            <FeatureBadge status="live" size="sm" />
          </div>
          <Zap size={24} className="mx-auto text-purple-300" />
          <p className="mt-2 text-sm font-medium text-slate-200">Spend ABRA</p>
          <p className="text-xs text-slate-400 mt-1">Direct to wallet</p>
        </button>
      </div>

      {/* Fiat Off-Ramp Widget */}
      {showOffRampWidget && (
        <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Convert ABRA to Cash</h3>
            <button
              onClick={() => setShowOffRampWidget(false)}
              className="text-xs text-white/60 hover:text-white/80 underline"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-white/50 mb-3">Convert your ABRA to USDC and withdraw to your bank account via Ramp or Transak.</p>
        </article>
      )}

      {showSpendAbra && <SpendAbra onClose={() => setShowSpendAbra(false)} />}

      {/* Vaults Section */}
      {vaults.length > 0 && (
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-semibold">Vaults</p>
          </div>
          <div className="space-y-2">
            {vaults.map((vault) => (
              <div key={vault.id} className="flex items-center justify-between rounded-xl bg-slate-950/40 px-3 py-2.5">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-100">{vault.name}</p>
                  <p className="text-xs text-slate-300/70">${vault.depositedAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })} deposited</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-cyan-100">${vault.vaultValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      {/* Tokens Section */}
      {athleteTokens.length > 0 && (
        <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm font-semibold">Athlete Tokens</p>
          </div>
          <div className="space-y-2">
            {athleteTokens.map((token) => (
              <div key={token.symbol} className="flex items-center justify-between rounded-xl bg-slate-950/40 px-3 py-2.5">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-100">{token.symbol}</p>
                  <p className="text-xs text-slate-300/70">{token.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-cyan-100">${token.exposure.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                  <p className={`text-xs font-medium ${token.valueGrowthPct >= 0 ? 'text-cyan-200' : 'text-orange-300'}`}>
                    {token.valueGrowthPct >= 0 ? '+' : ''}{token.valueGrowthPct.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      {/* Predictions Section */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-cyan-200" size={16} />
          <p className="text-sm font-semibold text-cyan-100">Polymarket Bets</p>
          <span className="text-xs text-cyan-300/70 ml-auto">{predictions.length > 0 ? `${predictionIndex + 1} / ${predictions.length}` : 'Loading...'}</span>
        </div>

        {/* Category Filter */}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-cyan-500/25 text-cyan-100 border border-cyan-400/45'
                : 'bg-slate-800/50 text-slate-300 border border-slate-600/30 hover:border-slate-500/50'
            }`}
          >
            All Markets
          </button>
          {POLYMARKET_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/25 text-cyan-100 border border-cyan-400/45'
                  : 'bg-slate-800/50 text-slate-300 border border-slate-600/30 hover:border-slate-500/50'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {isLoadingBets ? (
          <div className="rounded-xl border border-cyan-300/15 bg-slate-950/40 p-8 text-center">
            <p className="text-sm text-slate-300/70">Fetching live markets from Polymarket...</p>
          </div>
        ) : predictions.length === 0 ? (
          <div className="rounded-xl border border-cyan-300/15 bg-slate-950/40 p-8 text-center">
            <p className="text-sm text-slate-300/70">No active markets available</p>
          </div>
        ) : (
          <div
            className="relative cursor-grab active:cursor-grabbing"
            onTouchStart={handlePredictionTouchStart}
            onTouchEnd={handlePredictionTouchEnd}
          >
            <div className="rounded-xl border border-cyan-300/15 bg-slate-950/40 p-4">
            <p className="text-sm font-medium text-slate-100 mb-3">{predictions[predictionIndex].question}</p>
            <div className="flex items-center justify-between mb-4 text-xs text-slate-300">
              <span>Yes: <span className="font-semibold text-cyan-200">{predictions[predictionIndex].yes.toLocaleString()}</span></span>
              <span>No: <span className="font-semibold text-rose-300">{predictions[predictionIndex].no.toLocaleString()}</span></span>
              <span className="font-semibold text-violet-200">King AI: {predictions[predictionIndex].kingAI}%</span>
            </div>
            
            {/* Betting Section */}
            <div className="mb-4 p-3 rounded-lg border border-cyan-300/15 bg-slate-950/20">
              <p className="text-xs font-medium text-slate-300 mb-2">Bet with ABRA</p>
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Amount ABRA"
                  value={betAmounts[predictions[predictionIndex].id] || ''}
                  onChange={(e) => setBetAmounts(prev => ({
                    ...prev,
                    [predictions[predictionIndex].id]: e.target.value
                  }))}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-950 px-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPlacingBet(`${predictions[predictionIndex].id}-yes`)}
                  disabled={!betAmounts[predictions[predictionIndex].id] || placingBet !== null}
                  className="flex-1 rounded-lg bg-cyan-600/80 hover:bg-cyan-600 disabled:opacity-50 px-2 py-1.5 text-xs font-semibold text-white transition"
                >
                  {placingBet === `${predictions[predictionIndex].id}-yes` ? 'Placing...' : 'Bet YES'}
                </button>
                <button
                  onClick={() => setPlacingBet(`${predictions[predictionIndex].id}-no`)}
                  disabled={!betAmounts[predictions[predictionIndex].id] || placingBet !== null}
                  className="flex-1 rounded-lg bg-rose-600/80 hover:bg-rose-600 disabled:opacity-50 px-2 py-1.5 text-xs font-semibold text-white transition"
                >
                  {placingBet === `${predictions[predictionIndex].id}-no` ? 'Placing...' : 'Bet NO'}
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setPredictionIndex((predictionIndex - 1 + predictions.length) % predictions.length)}
                className="rounded-lg border border-slate-600 bg-slate-950/40 p-2 hover:bg-slate-900 transition"
              >
                <ChevronLeft size={16} className="text-slate-300" />
              </button>
              <button
                onClick={() => setPredictionIndex((predictionIndex + 1) % predictions.length)}
                className="rounded-lg border border-slate-600 bg-slate-950/40 p-2 hover:bg-slate-900 transition"
              >
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            </div>
          </div>
        </div>
        )}
      </article>

      {/* Perps Section */}
      <article className="glow-panel rounded-2xl border border-slate-600/20 bg-slate-900/40 p-4 backdrop-blur opacity-60">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="text-slate-500" size={16} />
          <p className="text-sm font-semibold text-slate-400">Market Perps</p>
          <FeatureBadge status="coming-soon" size="sm" />
          <span className="text-xs text-slate-500/70 ml-auto">{perpIndex + 1} / {perps.length}</span>
        </div>
        <div
          className="rounded-xl border border-slate-600/15 bg-slate-950/20 p-6 text-center cursor-grab active:cursor-grabbing pointer-events-none"
          onTouchStart={handlePerpTouchStart}
          onTouchEnd={handlePerpTouchEnd}
        >
          <p className="text-4xl font-bold text-slate-600 mb-2 opacity-50">{perps[perpIndex].icon}</p>
          <p className="text-lg font-semibold text-slate-500 mb-1 opacity-50">{perps[perpIndex].symbol}</p>
          <p className="text-2xl font-bold text-slate-600 mb-2 opacity-50">{perps[perpIndex].change}%</p>
          <p className="text-sm text-slate-500 mb-4 opacity-50">Leverage: <span className="font-semibold text-slate-600">{perps[perpIndex].leverage}</span></p>
          <div className="flex gap-2 justify-center opacity-50">
            <button
              onClick={() => setPerpIndex((perpIndex - 1 + perps.length) % perps.length)}
              disabled
              className="rounded-lg border border-slate-700 bg-slate-950/40 p-2 hover:bg-slate-900 transition"
            >
              <ChevronLeft size={16} className="text-slate-500" />
            </button>
            <button
              onClick={() => setPerpIndex((perpIndex + 1) % perps.length)}
              disabled
              className="rounded-lg border border-slate-700 bg-slate-950/40 p-2 hover:bg-slate-900 transition"
            >
              <ChevronRight size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </article>

      {/* Following Section */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center gap-2 mb-3">
          <Star className="text-amber-200" size={16} />
          <p className="text-sm font-semibold text-cyan-100">Following</p>
          <span className="text-xs text-cyan-300/70 ml-auto">{following.length > 0 ? `${followingIndex + 1} / ${athleteTokens.length}` : 'Add tokens'}</span>
        </div>
        {following.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-slate-300/70 mb-3">Browse and follow tokens to track them</p>
            <button className="rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-300/20 transition">
              Browse tokens
            </button>
          </div>
        ) : (
          <div
            className="rounded-xl border border-cyan-300/15 bg-slate-950/40 p-4 cursor-grab active:cursor-grabbing"
            onTouchStart={handleFollowingTouchStart}
            onTouchEnd={handleFollowingTouchEnd}
          >
            {athleteTokens.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-100">{athleteTokens[followingIndex % athleteTokens.length].symbol}</p>
                    <p className="text-xs text-slate-400">{athleteTokens[followingIndex % athleteTokens.length].name}</p>
                  </div>
                  <button
                    onClick={() => setFollowing(following.filter(t => t !== athleteTokens[followingIndex % athleteTokens.length].symbol))}
                    className="text-amber-200 hover:text-amber-100 transition"
                  >
                    <Star size={16} fill="currentColor" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="font-semibold text-cyan-200">${athleteTokens[followingIndex % athleteTokens.length].exposure.toFixed(2)}</span>
                  <span className={athleteTokens[followingIndex % athleteTokens.length].valueGrowthPct >= 0 ? 'text-cyan-200' : 'text-rose-300'}>
                    {athleteTokens[followingIndex % athleteTokens.length].valueGrowthPct >= 0 ? '+' : ''}{athleteTokens[followingIndex % athleteTokens.length].valueGrowthPct.toFixed(1)}%
                  </span>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setFollowingIndex((followingIndex - 1 + athleteTokens.length) % athleteTokens.length)}
                    className="rounded-lg border border-slate-600 bg-slate-950/40 p-2 hover:bg-slate-900 transition"
                  >
                    <ChevronLeft size={16} className="text-slate-300" />
                  </button>
                  <button
                    onClick={() => setFollowingIndex((followingIndex + 1) % athleteTokens.length)}
                    className="rounded-lg border border-slate-600 bg-slate-950/40 p-2 hover:bg-slate-900 transition"
                  >
                    <ChevronRight size={16} className="text-slate-300" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </article>

      {/* Spend ABRA Modal */}
      {showSpendAbra && <SpendAbra onClose={() => setShowSpendAbra(false)} />}
    </section>
    </RuneRealm>
  );
}
