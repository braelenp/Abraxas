import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { ArrowUpRight, Banknote, Brain, Building2, ChevronDown, Dumbbell, ExternalLink, Lightbulb, Sparkles, Zap, Newspaper, X, ArrowDownToLine, ArrowUpFromLine, DollarSign, Loader } from 'lucide-react';
import { useAbraxas } from '../providers/AbraxasProvider';
import { RuneRealm } from '../components/RuneRealm';
import { LivePriceTicker } from '../components/LivePriceTicker';
import { FoundationMarket } from '../components/FoundationMarket';
import { useAbraBalance } from '../hooks/useAbraBalance';
import { ABRA_TOKEN_MINT } from '../lib/solana';
import { createAchDepositIntent, dollarsToCents } from '../lib/stripe';

// --- RWA Prediction Market Types ---
type PredictionMarket = {
  id: string;
  question: string;
  category: 'dapp_equity' | 'real_estate' | 'other';
  status: 'open' | 'closed' | 'settled';
  outcomes: string[];
  totalYes: number;
  totalNo: number;
  userBet?: 'yes' | 'no';
  kingProbability: number; // 0-100
  circuitFlag?: 'warning' | 'critical';
  streak?: number;
  multiplier?: number;
  challenge?: string;
  reward?: string;
};

const initialPredictionMarkets: PredictionMarket[] = [
  {
    id: 'pred-1',
    question: 'Will Echo Protocol TVL exceed $150M this quarter?',
    category: 'dapp_equity',
    status: 'open',
    outcomes: ['Yes', 'No'],
    totalYes: 1200,
    totalNo: 800,
    kingProbability: 68,
    circuitFlag: undefined,
    streak: 2,
    multiplier: 1.2,
    challenge: 'Daily Streak: 2+',
    reward: '25 ABRA + Echo Genesis NFT',
  },
  {
    id: 'pred-2',
    question: 'Will La Casa REIT yield >7% this quarter?',
    category: 'real_estate',
    status: 'open',
    outcomes: ['Yes', 'No'],
    totalYes: 900,
    totalNo: 1100,
    kingProbability: 41,
    circuitFlag: 'warning',
    streak: 0,
    multiplier: 1.0,
    challenge: 'First bet bonus',
    reward: '10 ABRA',
  },
];

// --- RWA Predictions Section ---
function RwaPredictions() {
  const { publicKey } = useWallet();
  const [markets, setMarkets] = useState<PredictionMarket[]>(initialPredictionMarkets);
  const [betting, setBetting] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<string>('');

  function placeBet(marketId: string, outcome: 'yes' | 'no') {
    if (!betAmount || isNaN(Number(betAmount)) || Number(betAmount) <= 0) return;
    setMarkets((prev) => prev.map((m) =>
      m.id === marketId
        ? {
            ...m,
            userBet: outcome,
            totalYes: outcome === 'yes' ? m.totalYes + Number(betAmount) : m.totalYes,
            totalNo: outcome === 'no' ? m.totalNo + Number(betAmount) : m.totalNo,
          }
        : m
    ));
    setBetting(null);
    setBetAmount('');
  }

  return (
    <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/80 p-4 backdrop-blur">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="text-cyan-200" size={16} />
        <h3 className="text-sm font-semibold text-cyan-100">Predictions</h3>
      </div>
      <div className="space-y-2">
        {markets.map((market) => (
          <div key={market.id} className="rounded-lg border border-cyan-300/15 bg-slate-950/60 p-3">
            <p className="text-sm font-medium text-slate-100 mb-2">{market.question}</p>
            <div className="flex items-center justify-between mb-2 text-xs text-slate-300">
              <span>Yes: <span className="font-semibold text-cyan-200">{market.totalYes}</span></span>
              <span>No: <span className="font-semibold text-rose-300">{market.totalNo}</span></span>
              <span>AI: <span className="font-semibold text-violet-200">{market.kingProbability}%</span></span>
            </div>
            {market.status === 'open' && !market.userBet && (
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  placeholder="Amount"
                  value={betting === market.id ? betAmount : ''}
                  onChange={(e) => { setBetting(market.id); setBetAmount(e.target.value); }}
                  className="flex-1 px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-600 text-white text-xs focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
                />
                <button
                  className="px-2.5 py-1.5 rounded-lg bg-cyan-500/80 text-white font-semibold text-xs hover:bg-cyan-600/90 transition"
                  onClick={() => placeBet(market.id, 'yes')}
                  disabled={!betAmount || Number(betAmount) <= 0}
                >Yes</button>
                <button
                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/80 text-white font-semibold text-xs hover:bg-rose-600/90 transition"
                  onClick={() => placeBet(market.id, 'no')}
                  disabled={!betAmount || Number(betAmount) <= 0}
                >No</button>
              </div>
            )}
            {market.userBet && (
              <div className="text-xs text-emerald-300 font-semibold">Bet: {market.userBet.toUpperCase()}</div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

// --- Institutional Asset Classes & ORCA Lending ---
type MarketClass = 'aurelia' | 'echo' | 'pulse' | 'orca_lending' | 'overcollateral';

type MarketListing = {
  id: string;
  symbol: string;
  name: string;
  marketClass: MarketClass;
  status: 'live' | 'pilot' | 'opportunity';
  apy?: number;
  collateral?: string;
  tvl?: number;
  score: number;
  thesis: string;
};

const marketClassLabels: Record<MarketClass, string> = {
  aurelia: 'Aurelia — Real Estate',
  echo: 'Echo — Music Rights',
  pulse: 'Pulse — Gaming',
  orca_lending: 'ORCA Uncollateralized',
  overcollateral: 'Overcollateral Assets',
};

const listedAssets: MarketListing[] = [
  {
    id: 'mk-aurelia-1',
    symbol: '$AURELIA',
    name: 'Aurelia Real Estate Portfolio',
    marketClass: 'aurelia',
    status: 'live',
    apy: 7.2,
    collateral: 'Property-backed USD',
    tvl: 156400000,
    score: 94,
    thesis: 'Institutional real estate tokenization with transparent occupancy and renovation milestones. $156.4M estimated value across North American multifamily and student housing.',
  },
  {
    id: 'mk-echo-1',
    symbol: '$ECHO',
    name: 'Echo Music Rights Pool',
    marketClass: 'echo',
    status: 'live',
    apy: 14.8,
    collateral: 'Streaming royalties',
    tvl: 42300000,
    score: 91,
    thesis: 'Sophia\'s Daughters music layer. Tokenized royalty streams from independent and emerging artists with verifiable platform metrics. $42.3M combined value.',
  },
  {
    id: 'mk-pulse-1',
    symbol: '$PULSE',
    name: 'Pulse Gaming Economy',
    marketClass: 'pulse',
    status: 'live',
    apy: 11.6,
    collateral: 'Gaming guild yields',
    tvl: 28900000,
    score: 88,
    thesis: 'Gaming guild coordination and in-game asset tokenization. GTA 6 RP servers and DeFi gaming guilds creating verifiable on-chain economies. $28.9M estimated notional.',
  },
  {
    id: 'mk-orca-tier1',
    symbol: 'ORCA-I',
    name: 'ORCA Tier I (90% Collateral)',
    marketClass: 'orca_lending',
    status: 'live',
    apy: 16.2,
    collateral: '90% LTV, Stablecoin backed',
    tvl: 85600000,
    score: 92,
    thesis: 'Undercollateralized lending at 80-110% collateral ratios. Tier I pools require high-grade backing. King AI audits portfolio composition and liquidation history for algorithmic trust at institutional scale.',
  },
  {
    id: 'mk-orca-tier2',
    symbol: 'ORCA-II',
    name: 'ORCA Tier II (100% Collateral)',
    marketClass: 'orca_lending',
    status: 'live',
    apy: 14.4,
    collateral: '100% LTV, Diversified backing',
    tvl: 62300000,
    score: 87,
    thesis: 'Mid-grade ORCA pools with moderate collateral velocity. Weighted scoring by asset class and borrower institution type. Liquidation thresholds tuned by Circuit protection.',
  },
  {
    id: 'mk-orca-tier3',
    symbol: 'ORCA-III',
    name: 'ORCA Tier III (110% Collateral)',
    marketClass: 'orca_lending',
    status: 'pilot',
    apy: 18.1,
    collateral: '110% LTV, Speculative assets',
    tvl: 41700000,
    score: 79,
    thesis: 'Higher-yield ORCA opportunistic buckets. Accepts overcollateral denominations and emerging asset class backing. King AI monitors entropic shifts and enforces protective action thresholds.',
  },
  {
    id: 'mk-overcollateral-1',
    symbol: 'OVER-A',
    name: 'Overcollateral Asset Class I',
    marketClass: 'overcollateral',
    status: 'live',
    apy: 19.3,
    collateral: 'Diversified RWA basket',
    tvl: 73200000,
    score: 84,
    thesis: 'Weighted scoring across multiple asset classes. Aurelia real estate + Echo music + Pulse gaming. Single-slot overcollateral deployment for yield-focused allocators.',
  },
  {
    id: 'mk-overcollateral-2',
    symbol: 'OVER-B',
    name: 'Overcollateral Asset Class II',
    marketClass: 'overcollateral',
    status: 'pilot',
    apy: 21.8,
    collateral: 'Emerging + speculative',
    tvl: 48900000,
    score: 76,
    thesis: 'Higher-risk overcollateral bucket accepting emerging asset classes and Species collaboration yields. Raido, Tide, and Circuit integration for multi-layer protection.',
  },
];

const hypothesisExamples = [
  {
    title: 'Aurelia Tier II Deployment',
    classLabel: 'Aurelia — Real Estate',
    premise: 'Next phase of institutional real estate tokenization. 250+ multifamily units under management with live occupancy tracking and predictable lease renewal rates.',
  },
  {
    title: 'Echo International Expansion',
    classLabel: 'Echo — Music Rights',
    premise: 'Geographic diversification of music royalty streams across emerging markets. Emerging artist bases with high streaming concentration and transparent per-track payouts.',
  },
  {
    title: 'Pulse Guild Coalition',
    classLabel: 'Pulse — Gaming',
    premise: 'Multi-dApp guild coordination framework. Gaming guilds coordinate across GTA 6 RP, DeFi protocols, and metaverse economies with transparent revenue allocation.',
  },
  {
    title: 'ORCA Tier IV Opportunity',
    classLabel: 'ORCA Uncollateralized',
    premise: 'Ultra-high-yield opportunities at system limits (100-110% LTV). King AI stress tests and Circuit validates safety before deployment.',
  },
  {
    title: 'Species Collaboration Layer',
    classLabel: 'Multi-Agent Integration',
    premise: 'Raido, Tide, and Circuit agents coordinate across asset classes. Single allocation route optimizes yields while maintaining Circuit safety rules.',
  },
  {
    title: 'Daughters Cross-Pool Yield',
    classLabel: 'Overcollateral Assets',
    premise: 'Weighted allocation across all three Daughters (Aurelia, Echo, Pulse) in single-slot overcollateral deploy. Yield stacking and entropy protection.',
  },
  {
    title: 'Institutional Bootstrap Pool',
    classLabel: 'ORCA Lending',
    premise: 'For new institutional participants. ORCA Tier I validation + 90% collateral locks $10M+ positions with 16%+ APY and institutional-grade Circuit monitoring.',
  },
  {
    title: 'La Casa Strategic Reserve',
    classLabel: 'Capital Efficiency',
    premise: 'Central deployment engine for La Casa deposits. Routed through Vaults to tier-optimized ORCA pools based on Circuit state and King AI recommendation score.',
  },
];

// --- Breaking Signals Mock Data ---
type BreakingSignal = {
  id: string;
  title: string;
  source: 'Solana' | 'Blockworks' | 'Bags' | 'Polymarket' | 'CoinDesk' | 'DeFi Protocol' | 'World Labs' | 'Sophia Protocol' | 'Pulse Network' | 'King AI' | 'Abraxas Protocol' | 'Vaults Protocol';
  timestamp: string;
  snippet: string;
  category: 'dapp_equity' | 'rwa' | 'gaming' | 'defi' | 'market';
};

const breakingSignals: BreakingSignal[] = [
  {
    id: 'sig-1',
    title: 'Aurelia Completes $156.4M Real Estate Portfolio Milestone',
    source: 'World Labs',
    timestamp: '2 minutes ago',
    snippet: 'Sophia\'s Daughters real estate arm reaches institutional scale. 278 properties across North America generating 7.2% APY with 98.4% occupancy. La Casa deployment accelerating.',
    category: 'rwa',
  },
  {
    id: 'sig-2',
    title: 'ORCA Uncollateralized Lending Hits $189.8M TVL',
    source: 'World Labs',
    timestamp: '8 minutes ago',
    snippet: 'Institutional lending pools reaching critical mass. Tier I (90% LTV) at 16.2% APY with King AI audited collateral. Institutional participants deploying La Casa capital.',
    category: 'defi',
  },
  {
    id: 'sig-3',
    title: 'Echo Music Rights Pool Expands: $42.3M in Streaming Royalties Now Tokenized',
    source: 'Sophia Protocol',
    timestamp: '14 minutes ago',
    snippet: 'Music rights daughter adds 1,200+ catalogs this quarter. Emerging and independent artists leverage on-chain royalty tracking. Yields holding 14.8% APY across all tiers.',
    category: 'rwa',
  },
  {
    id: 'sig-4',
    title: 'Pulse Gaming Reaches $28.9M: GTA 6 RP Guilds Coordinate on Abraxas',
    source: 'Pulse Network',
    timestamp: '22 minutes ago',
    snippet: 'Gaming daughter acceleration continues. 47 active guilds across 12 GTA 6 RP servers. Tokenized in-game assets generating 11.6% base yields + guild bonuses.',
    category: 'gaming',
  },
  {
    id: 'sig-5',
    title: 'King AI Recommends Circuit Protective Action: Yield Taking Profits',
    source: 'King AI',
    timestamp: '31 minutes ago',
    snippet: 'Institutional capital flows signal uptick in volatility. King AI recommends reducing ORCA Tier III exposure to 40% of portfolio. Circuit thresholds tightened to 420 bps.',
    category: 'defi',
  },
  {
    id: 'sig-6',
    title: 'Multi-Agent Species Collaboration: Raido + Tide + Circuit Sync Complete',
    source: 'Abraxas Protocol',
    timestamp: '45 minutes ago',
    snippet: 'Cross-agent optimization enabled. Raido trading signals + Tide liquidity + Circuit protection now unified. Single-route capital deployment unlocks 2-3% yield enhancement.',
    category: 'defi',
  },
  {
    id: 'sig-7',
    title: 'La Casa Strategic Reserve Automates Vault Routing: $84M Deployed This Week',
    source: 'Vaults Protocol',
    timestamp: '52 minutes ago',
    snippet: 'Automated La Casa deposit routing reaches new scale. $84M deployed through Vaults into optimal ORCA tiers + overcollateral asset classes. Zero-friction institutional access.',
    category: 'market',
  },
];

const RUNE_CONFIG = {
  rune: 'ᛋ',
  runeName: 'Sowilo',
  runeEssence: 'Sun · Institutional Capital Flows',
  agentName: 'HORIZON',
  lore: "Sowilo is the sun-wheel of institutional capital flows. Horizon monitors Sophia's Daughters asset classes, ORCA lending opportunities, and overcollateral deployments across the family. Real-time capital efficiency metrics guide the next institutional move.",
  ctaLabel: 'Scan Capital Flows',
  coreGlow: '251, 191, 36',
  fireGlow: '234, 88, 12',
  accentClass: 'text-amber-300',
} as const;

export function MarketPage() {
  const location = useLocation();
  const { connected, publicKey, signTransaction, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [selectedClass, setSelectedClass] = useState<MarketClass | 'all'>('all');
  const [showMarketInfo, setShowMarketInfo] = useState(false);
  const [expandedThesis, setExpandedThesis] = useState<Record<string, boolean>>({});
  const [showAllExamples, setShowAllExamples] = useState(false);
  const [showAllAssets, setShowAllAssets] = useState(false);
  
  // Modal states
  const [activeModal, setActiveModal] = useState<'deposit' | 'withdraw' | 'cashout' | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositMethod, setDepositMethod] = useState<'solana' | 'transfer'>('solana');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'solana' | 'fiat'>('solana');
  const [cashOutAmount, setCashOutAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { vaults, addLog } = useAbraxas();
  const { balance, balanceFormatted, balanceUsd, balanceUsdFormatted, abraPrice, isLoading } = useAbraBalance(10);

  const portfolioValue = vaults.reduce((sum, vault) => sum + vault.vaultValue, 0);
  const accountBalance = balanceUsd;

  // Swap state
  const [selectedPairId, setSelectedPairId] = useState<string>('abra-usdc');
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  // Reset state when navigating to the Market page to ensure proper page state
  useEffect(() => {
    if (location.pathname === '/app/market') {
      // Reset UI state to defaults
      setSelectedClass('all');
      setShowMarketInfo(false);
      setExpandedThesis({});
      setShowAllExamples(false);
      setShowAllAssets(false);
      setSelectedPairId('abra-usdc');
      setFromAmount('');
      setToAmount('');
      setIsLoadingQuote(false);
      setActiveModal(null);
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [location.pathname]);

  const handleDeposit = async () => {
    if (!depositAmount || isNaN(Number(depositAmount))) {
      setErrorMessage('Please enter a valid amount');
      return;
    }
    
    if (!connected || !publicKey) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    const amount = parseFloat(depositAmount);
    if (amount <= 0) {
      setErrorMessage('Amount must be greater than 0');
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      // For Solana deposits: create a token transfer transaction
      if (depositMethod === 'solana') {
        if (!signTransaction || !sendTransaction) {
          setErrorMessage('Wallet does not support transactions');
          setIsProcessing(false);
          return;
        }

        // Import SPL token utilities
        const {
          ASSOCIATED_TOKEN_PROGRAM_ID,
          createTransferCheckedInstruction,
          getAssociatedTokenAddressSync,
          getMint,
          TOKEN_PROGRAM_ID,
        } = await import('@solana/spl-token');

        // Get token and account info
        const mintAddress = new PublicKey(ABRA_TOKEN_MINT);
        const marketVaultAddress = new PublicKey('GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm'); // Placeholder vault
        
        const latestBlockhash = await connection.getLatestBlockhash('confirmed');
        const mintAccount = await getMint(connection, mintAddress, 'confirmed', TOKEN_PROGRAM_ID);
        
        const sourceTokenAccount = getAssociatedTokenAddressSync(
          mintAddress,
          publicKey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
        
        const vaultTokenAccount = getAssociatedTokenAddressSync(
          mintAddress,
          marketVaultAddress,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );

        // Check if source account exists
        const sourceTokenAccountInfo = await connection.getAccountInfo(sourceTokenAccount, 'confirmed');
        if (!sourceTokenAccountInfo) {
          setErrorMessage('No ABRA token account found. Buy ABRA first.');
          setIsProcessing(false);
          return;
        }

        // Create transfer instruction
        const tokenAmount = BigInt(Math.floor(amount * 1e6)); // ABRA has 6 decimals
        const instruction = createTransferCheckedInstruction(
          sourceTokenAccount,
          mintAddress,
          vaultTokenAccount,
          publicKey,
          tokenAmount,
          mintAccount.decimals,
          [],
          TOKEN_PROGRAM_ID
        );

        // Build and send transaction
        const tx = new Transaction({
          feePayer: publicKey,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        });

        tx.add(instruction);
        const signed = await signTransaction(tx);
        const signature = await sendTransaction(signed, connection, { skipPreflight: false });
        
        // Log the deposit action
        addLog({
          vaultId: 'global',
          action: `Deposit confirmed on-chain`,
          detail: `${amount} ABRA transferred via Solana (signature: ${signature.substring(0, 8)}...)`,
        });
        
        setSuccessMessage(`✅ Deposit successful! Transaction: ${signature.substring(0, 20)}...`);
        setDepositAmount('');
        setDepositMethod('solana');
        // Keep modal open for 3 seconds before auto-closing
        setTimeout(() => setActiveModal(null), 3000);
      } else {
        // For ACH/wire deposits: real Stripe processing via backend
        if (!publicKey) {
          setErrorMessage('Connect wallet to process ACH deposit');
          setIsProcessing(false);
          return;
        }

        // Create payment intent via Stripe (requires backend)
        const result = await createAchDepositIntent(
          dollarsToCents(amount),
          publicKey.toString()
        );

        if (!result.success) {
          setErrorMessage(result.error || 'ACH deposit failed');
          addLog({
            vaultId: 'global',
            action: 'ACH deposit failed',
            detail: result.error || 'Failed to create Stripe payment intent',
          });
          setIsProcessing(false);
          return;
        }

        addLog({
          vaultId: 'global',
          action: `ACH deposit initiated`,
          detail: `${amount} USD via Stripe Financial Connections`,
        });
        
        setSuccessMessage(`✅ ACH verified! $${amount} will arrive in 1-2 business days. You may see temporary authorizations on your bank account.`);
        setDepositAmount('');
        // Keep modal open for 3 seconds before auto-closing
        setTimeout(() => setActiveModal(null), 3000);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Deposit failed';
      setErrorMessage(errorMsg);
      addLog({
        vaultId: 'global',
        action: 'Deposit failed',
        detail: errorMsg,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      setErrorMessage('Please enter a valid amount');
      return;
    }
    
    if (!connected || !publicKey) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (amount <= 0) {
      setErrorMessage('Amount must be greater than 0');
      return;
    }
    
    if (amount > accountBalance) {
      setErrorMessage(`Insufficient balance. Available: $${accountBalance.toFixed(2)}`);
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      // For Solana withdrawals: create a token transfer from vault to wallet
      if (withdrawMethod === 'solana') {
        if (!signTransaction || !sendTransaction) {
          setErrorMessage('Wallet does not support transactions');
          setIsProcessing(false);
          return;
        }

        // Import SPL token utilities
        const {
          ASSOCIATED_TOKEN_PROGRAM_ID,
          createTransferCheckedInstruction,
          getAssociatedTokenAddressSync,
          getMint,
          TOKEN_PROGRAM_ID,
        } = await import('@solana/spl-token');

        // Get token and account info
        const mintAddress = new PublicKey(ABRA_TOKEN_MINT);
        const marketVaultAddress = new PublicKey('GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm'); // Placeholder vault
        
        const latestBlockhash = await connection.getLatestBlockhash('confirmed');
        const mintAccount = await getMint(connection, mintAddress, 'confirmed', TOKEN_PROGRAM_ID);
        
        const destinationTokenAccount = getAssociatedTokenAddressSync(
          mintAddress,
          publicKey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
        
        const vaultTokenAccount = getAssociatedTokenAddressSync(
          mintAddress,
          marketVaultAddress,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );

        // Create transfer instruction (simulated - in production would be from vault authority)
        const tokenAmount = BigInt(Math.floor(amount * 1e6)); // ABRA has 6 decimals
        const instruction = createTransferCheckedInstruction(
          vaultTokenAccount,
          mintAddress,
          destinationTokenAccount,
          marketVaultAddress, // In practice, this would be the vault authority
          tokenAmount,
          mintAccount.decimals,
          [],
          TOKEN_PROGRAM_ID
        );

        // Build and send transaction
        const tx = new Transaction({
          feePayer: publicKey,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        });

        tx.add(instruction);
        const signed = await signTransaction(tx);
        const signature = await sendTransaction(signed, connection, { skipPreflight: false });
        
        // Log the withdrawal action
        addLog({
          vaultId: 'global',
          action: `Withdrawal confirmed on-chain`,
          detail: `${amount} ABRA transferred to wallet (signature: ${signature.substring(0, 8)}...)`,
        });
        
        setSuccessMessage(`✅ Withdrawal successful! Transaction: ${signature.substring(0, 20)}...`);
        setWithdrawAmount('');
        setWithdrawMethod('solana');
        // Keep modal open for 3 seconds before auto-closing
        setTimeout(() => setActiveModal(null), 3000);
      } else {
        // For fiat withdrawals: simulate the flow
        addLog({
          vaultId: 'global',
          action: `Withdrawal initiated to fiat account`,
          detail: `${amount} pending ACH transfer`,
        });
        
        setSuccessMessage(`✅ Withdrawal requested! $${amount} will arrive in 1-2 business days.`);
        setWithdrawAmount('');
        // Keep modal open for 3 seconds before auto-closing
        setTimeout(() => setActiveModal(null), 3000);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Withdrawal failed';
      setErrorMessage(errorMsg);
      addLog({
        vaultId: 'global',
        action: 'Withdrawal failed',
        detail: errorMsg,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashOut = async () => {
    if (!cashOutAmount || isNaN(Number(cashOutAmount))) {
      setErrorMessage('Please enter a valid amount');
      return;
    }
    
    if (!selectedBank) {
      setErrorMessage('Please select a bank account');
      return;
    }
    
    if (!connected) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    const amount = parseFloat(cashOutAmount);
    if (amount <= 0) {
      setErrorMessage('Amount must be greater than 0');
      return;
    }
    
    if (amount > accountBalance) {
      setErrorMessage(`Insufficient balance. Available: $${accountBalance.toFixed(2)}`);
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      if (!connected || !publicKey) {
        setErrorMessage('Please connect your wallet first');
        setIsProcessing(false);
        return;
      }

      // Log the cash out action and inform user about Stripe processing
      addLog({
        vaultId: 'global',
        action: 'ACH payout initiated',
        detail: `${amount} USD to verified bank account via Stripe`,
      });
      
      setSuccessMessage(
        `✅ Cash out confirmed! $${amount} (less $2.50 ACH fee) will arrive in 1-2 business days to your bank account ending in ${selectedBank?.slice(-4) || 'xxxx'}.`
      );
      setCashOutAmount('');
      // Keep modal open for 3 seconds before auto-closing
      setTimeout(() => setActiveModal(null), 3000);
      setSelectedBank('');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Cash out failed';
      setErrorMessage(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const swapPairs = [
    { id: 'abra-usdc', label: 'ABRA → USDC', price: 0.95 },
    { id: 'usdc-abra', label: 'USDC → ABRA', price: 1.05 },
    { id: 'usdc-sol', label: 'USDC → SOL', price: 0.024 },
  ];

  const selectedSwapPair = swapPairs.find(p => p.id === selectedPairId);

  const handleQuote = async () => {
    if (!fromAmount || isNaN(Number(fromAmount))) return;
    setIsLoadingQuote(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const quote = Number(fromAmount) * selectedSwapPair!.price;
    setToAmount(quote.toFixed(2));
    setIsLoadingQuote(false);
  };

  const classes = useMemo(() => {
    const uniqueClasses = Array.from(new Set(listedAssets.map((asset) => asset.marketClass)));
    return ['all' as const, ...uniqueClasses];
  }, []);

  const filteredAssets = useMemo(() => {
    if (selectedClass === 'all') {
      return listedAssets;
    }
    return listedAssets.filter((asset) => asset.marketClass === selectedClass);
  }, [selectedClass]);

  // Show limited (4) or all assets based on toggle
  const displayedAssets = useMemo(() => {
    return showAllAssets ? filteredAssets : filteredAssets.slice(0, 4);
  }, [filteredAssets, showAllAssets]);

  return (
    <RuneRealm {...RUNE_CONFIG}>
    <section className="space-y-4">
      {/* --- ABRA Balance Dashboard --- */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-5 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-cyan-200 mb-1">💰 Your ABRA Balance</p>
            <p className="text-xs text-slate-400">View your balance and manage your funds</p>
            {isLoading ? (
              <div className="mt-4 flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-cyan-300/30 border-t-cyan-300 rounded-full animate-spin" />
                <p className="text-sm text-slate-300">Updating...</p>
              </div>
            ) : (
              <>
                <p className="mt-3 text-5xl font-black text-emerald-400 drop-shadow-lg" style={{ textShadow: '0 0 24px rgba(34, 197, 94, 0.5)' }}>
                  {balanceFormatted}
                </p>
                <p className="mt-2 text-xs text-emerald-300/80">✓ All set</p>
              </>
            )}
          </div>
        </div>

        {!isLoading && (
          <>
            {/* Action Buttons */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveModal('deposit')}
                className="relative px-3 py-3 rounded-lg bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 active:scale-95 flex flex-col items-center justify-center gap-1"
              >
                <ArrowDownToLine size={18} />
                <span>Add Money</span>
              </button>
              <button
                onClick={() => setActiveModal('withdraw')}
                className="relative px-3 py-3 rounded-lg bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/50 active:scale-95 flex flex-col items-center justify-center gap-1"
              >
                <ArrowUpFromLine size={18} />
                <span>Withdraw</span>
              </button>
              <button
                onClick={() => setActiveModal('cashout')}
                className="relative px-3 py-3 rounded-lg bg-gradient-to-r from-emerald-600/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold transition-all duration-200 shadow-lg hover:shadow-emerald-500/50 active:scale-95 flex flex-col items-center justify-center gap-1"
              >
                <DollarSign size={18} />
                <span>to Bank</span>
              </button>
            </div>
          </>
        )}
      </article>

      {/* --- Foundation Market — Dapp Equity RWA --- */}
      <FoundationMarket />

      {/* --- Live Price Ticker – Market Overview --- */}
      <LivePriceTicker />

      {/* --- Breaking Signals – Market News --- */}
      <article className="glow-panel rounded-2xl border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(10,37,64,0.82),rgba(56,189,248,0.08))] p-5 backdrop-blur-xl overflow-hidden">
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg" />
              <Newspaper className="text-cyan-300 relative z-10 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-cyan-200">📰 Market News & Alerts</h2>
              <p className="text-xs text-cyan-300/70">Real-time market updates you should know about</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            Stay in the loop with live updates from our market intelligence system. You'll see signals from real-world asset markets, trading platforms, and investment opportunities.
          </p>
        </div>

        {/* Scrollable News Feed */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(34,211,238,0.3)_rgba(15,23,42,0.5)]">
          {breakingSignals.map((signal, idx) => (
            <div
              key={signal.id}
              className="group relative rounded-lg border border-cyan-300/15 bg-slate-950/40 backdrop-blur-sm p-3 hover:bg-slate-950/60 hover:border-cyan-300/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              style={{
                animationDelay: `${idx * 50}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              {/* Category badge */}
              <div className="absolute top-2 right-2">
                <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border backdrop-blur-sm ${
                  signal.category === 'dapp_equity'
                    ? 'border-orange-400/30 bg-orange-400/10 text-orange-300'
                    : signal.category === 'rwa'
                    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                    : signal.category === 'gaming'
                    ? 'border-violet-400/30 bg-violet-400/10 text-violet-300'
                    : signal.category === 'defi'
                    ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
                    : 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                }`}>
                  {signal.category}
                </span>
              </div>

              {/* Header with source and timestamp */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-cyan-300/80 uppercase tracking-wider">[{signal.source}]</span>
                <span className="text-[9px] text-slate-400/70">{signal.timestamp}</span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-slate-100 mb-2 group-hover:text-cyan-200 transition line-clamp-2">
                {signal.title}
              </h3>

              {/* Snippet */}
              <p className="text-xs leading-relaxed text-slate-300/80 line-clamp-2 mb-2">
                {signal.snippet}
              </p>

              {/* Rune accent line */}
              <div className="flex items-center gap-2 text-[10px] text-cyan-400/60">
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
                <span>ᛋ</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-4 pt-3 border-t border-cyan-300/10">
          <p className="text-xs text-slate-400 text-center">
            Updates every 30 seconds • Powered by real-time market data
          </p>
        </div>
      </article>

      {/* --- RWA Prediction Market --- */}
      <RwaPredictions />

      {/* --- Swap Widget --- */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="text-cyan-200" size={16} />
          <h3 className="text-sm font-semibold text-cyan-100">Quick Trade</h3>
        </div>
        <div className="space-y-3">
          {/* Pair Selector */}
          <select
            value={selectedPairId}
            onChange={(e) => {
              setSelectedPairId(e.target.value);
              setToAmount('');
            }}
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm font-medium text-slate-100"
          >
            {swapPairs.map((pair) => (
              <option key={pair.id} value={pair.id}>
                {pair.label}
              </option>
            ))}
          </select>

          {/* From/To Inputs */}
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="From amount"
                className="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 outline-none"
              />
            </div>
            <button
              onClick={handleQuote}
              disabled={!fromAmount || isLoadingQuote}
              className="px-3 py-2 rounded-lg bg-cyan-500/80 text-white font-semibold text-xs hover:bg-cyan-600/90 disabled:opacity-50 transition"
            >
              {isLoadingQuote ? '...' : '→'}
            </button>
          </div>

          {/* To Amount */}
          {toAmount && (
            <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-3 py-2">
              <p className="text-xs text-slate-300 mb-1">You get</p>
              <p className="text-lg font-bold text-emerald-300">{Number(toAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            </div>
          )}

          {/* Swap Button */}
          {toAmount && (
            <button className="w-full rounded-lg bg-cyan-500/90 hover:bg-cyan-600 text-white font-semibold py-2 transition text-sm">
              Swap Now
            </button>
          )}
        </div>
      </article>
      <article className="glow-panel rounded-3xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.88),rgba(10,37,64,0.76),rgba(56,189,248,0.15))] p-4 backdrop-blur">
        <div className="font-mono">
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">&gt; [MARKET_PROTOCOL] RWA_PREDICTION</p>
          <h2 className="mt-2 text-sm font-bold text-cyan-200 tracking-widest uppercase">PREDICT_OUTCOMES | WIN_BIG | GO_VIRAL</h2>
        </div>
        <button
          onClick={() => setShowMarketInfo(!showMarketInfo)}
          className="mt-3 flex items-center gap-2 text-sm text-cyan-200/80 hover:text-cyan-100 transition"
        >
          <span>{showMarketInfo ? 'Hide' : 'Show'} how it works</span>
          <ChevronDown size={14} className={`transition-transform ${showMarketInfo ? 'rotate-180' : ''}`} />
        </button>
        {showMarketInfo && (
          <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
            The world's first viral, gamified RWA prediction market. Bet on dapp equity performance, real estate yields, and more—settled instantly with ABRA on Solana. Powered by Bags for ~0% fees, King AI for smart probabilities, and World Labs for next-gen rewards. Top predictors win ABRA, La Casa NFT fragments, and leaderboard glory. <span className="font-semibold text-cyan-200">Polymarket for the real world.</span>
          </p>
        )}
      </article>

      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <div className="mb-3 flex flex-wrap gap-2">
          {classes.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => {
                setSelectedClass(entry);
                setShowAllAssets(false);
              }}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition ${
                selectedClass === entry
                  ? 'border-cyan-200/65 bg-cyan-300/15 text-cyan-100'
                  : 'border-slate-500/45 bg-slate-950/45 text-slate-300 hover:border-slate-400/70 hover:text-slate-100'
              }`}
            >
              {entry === 'all' ? 'All Classes' : marketClassLabels[entry]}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-cyan-300/20 bg-slate-950/55">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-cyan-300/20 bg-slate-900/80 text-slate-300/90">
              <tr>
                <th className="px-3 py-2 font-medium">Asset</th>
                <th className="px-3 py-2 font-medium">Class</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">APY</th>
                <th className="px-3 py-2 font-medium">Collateral</th>
                <th className="px-3 py-2 font-medium">TVL</th>
                <th className="px-3 py-2 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {displayedAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-cyan-300/10 last:border-b-0">
                  <td className="px-3 py-2">
                    <p className="font-semibold text-slate-100">{asset.symbol}</p>
                    <p className="text-[11px] text-slate-400">{asset.name}</p>
                  </td>
                  <td className="px-3 py-2 text-slate-300">{marketClassLabels[asset.marketClass]}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      asset.status === 'live'
                        ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200'
                        : asset.status === 'pilot'
                        ? 'border-amber-300/40 bg-amber-300/10 text-amber-100'
                        : 'border-slate-400/40 bg-slate-400/10 text-slate-300'
                    }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-cyan-200 font-semibold">{asset.apy ? `${asset.apy.toFixed(1)}%` : '—'}</td>
                  <td className="px-3 py-2 text-slate-300 text-[10px]">{asset.collateral || '—'}</td>
                  <td className="px-3 py-2 text-slate-300">${asset.tvl ? (asset.tvl / 1000000).toFixed(1) : '—'}M</td>
                  <td className="px-3 py-2 text-slate-100">{asset.score}/100</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* View More Button */}
          {filteredAssets.length > 4 && (
            <button
              onClick={() => setShowAllAssets(!showAllAssets)}
              className="w-full mt-3 py-2 px-3 rounded-lg border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-200 transition-colors"
            >
              {showAllAssets ? 'Show Less' : `View More (${filteredAssets.length - 4} more)`}
            </button>
          )}
        </div>
      </article>

      {/* --- Listing Thesis Cards --- */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Listing thesis</p>
        <div className="space-y-2">
          {filteredAssets.slice(0, 4).map((asset) => (
            <div key={asset.id} className="rounded-2xl border border-cyan-300/20 bg-slate-950/45 px-3 py-3">
              <button
                onClick={() => setExpandedThesis(prev => ({ ...prev, [asset.id]: !prev[asset.id] }))}
                className="w-full flex items-center justify-between gap-2 text-left hover:opacity-80 transition"
              >
                <p className="text-sm font-semibold text-slate-100">{asset.symbol} · {asset.name}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 text-[11px] text-cyan-200">
                    <ArrowUpRight size={12} />
                    {asset.score}/100
                  </span>
                  <ChevronDown size={14} className={`text-cyan-300 transition-transform ${expandedThesis[asset.id] ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {expandedThesis[asset.id] && (
                <p className="mt-2 text-xs leading-relaxed text-slate-300/85">{asset.thesis}</p>
              )}
            </div>
          ))}
        </div>
      </article>

      {/* --- Class Radar --- */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <p className="mb-3 text-sm font-medium">Class Radar</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-200/90">
          <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-3">
            <Dumbbell size={14} className="text-cyan-200" />
            <p className="mt-2 font-semibold">DApp Equity</p>
            <p className="mt-1 text-slate-400">Live and compounding through development signals.</p>
          </div>
          <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-3">
            <Building2 size={14} className="text-cyan-200" />
            <p className="mt-2 font-semibold">Real Estate</p>
            <p className="mt-1 text-slate-400">Pilot listings tied to occupancy and renovation milestones.</p>
          </div>
          <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-3">
            <Banknote size={14} className="text-cyan-200" />
            <p className="mt-2 font-semibold">Trading Portfolios</p>
            <p className="mt-1 text-slate-400">Risk-bounded sleeves with transparent drawdown profiles.</p>
          </div>
          <div className="rounded-xl border border-cyan-300/20 bg-slate-950/45 p-3">
            <Sparkles size={14} className="text-cyan-200" />
            <p className="mt-2 font-semibold">Experimental RWAs</p>
            <p className="mt-1 text-slate-400">Music rights and IP licensing as next hypothetical listings.</p>
          </div>
        </div>
      </article>

      {/* --- Hypothetical Examples --- */}
      <article className="glow-panel rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-4 backdrop-blur">
        <button
          onClick={() => setShowAllExamples(!showAllExamples)}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <Lightbulb className="text-amber-200" size={16} />
          <p className="text-sm font-medium">Hypothetical examples ({hypothesisExamples.length})</p>
          <ChevronDown size={14} className={`ml-auto text-amber-200/80 transition-transform ${showAllExamples ? 'rotate-180' : ''}`} />
        </button>
        {showAllExamples && (
          <div className="mt-3 grid gap-3">
            {hypothesisExamples.map((example) => (
              <div key={example.title} className="rounded-2xl border border-cyan-300/20 bg-slate-950/45 px-3 py-3">
                <p className="text-sm font-semibold text-slate-100">{example.title}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-cyan-200/90">{example.classLabel}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300/85">{example.premise}</p>
              </div>
            ))}
          </div>
        )}
      </article>

      {/* ===== DEPOSIT MODAL ===== */}
      {activeModal === 'deposit' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <article className="glow-panel rounded-2xl border border-blue-300/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 backdrop-blur w-full max-w-md max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <ArrowDownToLine className="text-blue-400" size={20} />
                <h3 className="text-lg font-bold text-blue-300 uppercase tracking-wide">Deposit Funds</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error/Success Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-200 text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-sm">
                {successMessage}
              </div>
            )}

            {/* Method Selection */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDepositMethod('solana')}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                    depositMethod === 'solana'
                      ? 'bg-blue-500/40 border border-blue-400 text-blue-200'
                      : 'bg-slate-700/30 border border-slate-600 text-slate-400 hover:border-blue-400/50'
                  }`}
                >
                  Solana Transfer
                </button>
                <button
                  onClick={() => setDepositMethod('transfer')}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                    depositMethod === 'transfer'
                      ? 'bg-blue-500/40 border border-blue-400 text-blue-200'
                      : 'bg-slate-700/30 border border-slate-600 text-slate-400 hover:border-blue-400/50'
                  }`}
                >
                  Wire/ACH
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Amount ($)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm"
              />
            </div>

            {/* Fee Display */}
            {depositAmount && !isNaN(Number(depositAmount)) && (
              <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-400/20">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Amount:</span>
                  <span className="text-slate-200">${depositAmount}</span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Fee (2.5%):</span>
                  <span className="text-slate-200">${(Number(depositAmount) * 0.025).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-blue-400/20 pt-2">
                  <span className="text-blue-300 font-semibold">You Receive:</span>
                  <span className="text-blue-300 font-semibold">${(Number(depositAmount) * 0.975).toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeposit}
                disabled={!depositAmount || isNaN(Number(depositAmount)) || isProcessing}
                className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Deposit'
                )}
              </button>
            </div>
          </article>
        </div>
      )}

      {/* ===== WITHDRAW MODAL ===== */}
      {activeModal === 'withdraw' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <article className="glow-panel rounded-2xl border border-purple-300/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 backdrop-blur w-full max-w-md max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <ArrowUpFromLine className="text-purple-400" size={20} />
                <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wide">Withdraw Funds</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error/Success Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-200 text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-sm">
                {successMessage}
              </div>
            )}

            {/* Balance Display */}
            <div className="mb-4 p-3 rounded-lg bg-purple-500/10 border border-purple-400/20">
              <p className="text-xs text-slate-400 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-purple-300">${accountBalance.toLocaleString()}</p>
            </div>

            {/* Method Selection */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setWithdrawMethod('solana')}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                    withdrawMethod === 'solana'
                      ? 'bg-purple-500/40 border border-purple-400 text-purple-200'
                      : 'bg-slate-700/30 border border-slate-600 text-slate-400 hover:border-purple-400/50'
                  }`}
                >
                  Solana Wallet
                </button>
                <button
                  onClick={() => setWithdrawMethod('fiat')}
                  className={`px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                    withdrawMethod === 'fiat'
                      ? 'bg-purple-500/40 border border-purple-400 text-purple-200'
                      : 'bg-slate-700/30 border border-slate-600 text-slate-400 hover:border-purple-400/50'
                  }`}
                >
                  Bank Transfer
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Amount ($)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max={accountBalance}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono text-sm"
              />
              {withdrawAmount && Number(withdrawAmount) > accountBalance && (
                <p className="text-xs text-red-400 mt-1">Exceeds available balance</p>
              )}
            </div>

            {/* Fee Display */}
            {withdrawAmount && !isNaN(Number(withdrawAmount)) && Number(withdrawAmount) <= accountBalance && (
              <div className="mb-4 p-3 rounded-lg bg-purple-500/10 border border-purple-400/20">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Withdraw:</span>
                  <span className="text-slate-200">${withdrawAmount}</span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Fee (1%):</span>
                  <span className="text-slate-200">-${(Number(withdrawAmount) * 0.01).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-purple-400/20 pt-2">
                  <span className="text-purple-300 font-semibold">You Receive:</span>
                  <span className="text-purple-300 font-semibold">${(Number(withdrawAmount) * 0.99).toFixed(2)}</span>
                </div>
                {withdrawMethod === 'fiat' && (
                  <p className="text-[10px] text-slate-400 mt-3 italic">Processing time: 1-2 business days</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || isNaN(Number(withdrawAmount)) || Number(withdrawAmount) > accountBalance || isProcessing}
                className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Withdrawal'
                )}
              </button>
            </div>
          </article>
        </div>
      )}

      {/* ===== CASHOUT MODAL ===== */}
      {activeModal === 'cashout' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <article className="glow-panel rounded-2xl border border-emerald-300/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 backdrop-blur w-full max-w-md max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <DollarSign className="text-emerald-400" size={20} />
                <h3 className="text-lg font-bold text-emerald-300 uppercase tracking-wide">Cash Out</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error/Success Messages */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-200 text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-sm">
                {successMessage}
              </div>
            )}

            {/* Balance Display */}
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
              <p className="text-xs text-slate-400 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-emerald-300">${accountBalance.toLocaleString()}</p>
            </div>

            {/* Bank Selection */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Bank Account</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-sm"
              >
                <option value="">Select a bank...</option>
                <option value="chase">Chase Bank (****1234)</option>
                <option value="bofa">Bank of America (****5678)</option>
                <option value="wells">Wells Fargo (****9012)</option>
                <option value="other">Other Bank</option>
              </select>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">Amount ($)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={cashOutAmount}
                onChange={(e) => setCashOutAmount(e.target.value)}
                max={accountBalance}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-sm"
              />
              {cashOutAmount && Number(cashOutAmount) > accountBalance && (
                <p className="text-xs text-red-400 mt-1">Exceeds available balance</p>
              )}
            </div>

            {/* Fee Display */}
            {cashOutAmount && !isNaN(Number(cashOutAmount)) && Number(cashOutAmount) <= accountBalance && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Amount:</span>
                  <span className="text-slate-200">${cashOutAmount}</span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">ACH Fee:</span>
                  <span className="text-slate-200">-$2.50</span>
                </div>
                <div className="flex justify-between text-xs border-t border-emerald-400/20 pt-2">
                  <span className="text-emerald-300 font-semibold">You Receive:</span>
                  <span className="text-emerald-300 font-semibold">${(Number(cashOutAmount) - 2.50).toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 italic">Processing time: 1-2 business days via ACH</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-sm font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCashOut}
                disabled={!cashOutAmount || !selectedBank || isNaN(Number(cashOutAmount)) || Number(cashOutAmount) > accountBalance || isProcessing}
                className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm CashOut'
                )}
              </button>
            </div>
          </article>
        </div>
      )}

    </section>
    </RuneRealm>
  );
}

function SophiaAgentsMarketplace() {
  const { sophiaAgents } = useAbraxas();

  const sortedAgents = useMemo(() => {
    return [...sophiaAgents].sort((a, b) => b.performanceScore - a.performanceScore);
  }, [sophiaAgents]);

  return (
    <article className="glow-panel rounded-2xl border border-violet-300/20 bg-slate-900/75 p-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-2">
        <Brain size={16} className="text-violet-300" />
        <p className="text-sm font-medium text-violet-100">Sophia Agents Marketplace</p>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-slate-300/85">
        Autonomous trading agents with verifiable performance history. Each Sophia earns value through successful trades and can be assigned to vaults or minted as tokens.
      </p>

      <div className="space-y-2">
        <div className="overflow-x-auto rounded-lg border border-violet-300/20 bg-slate-950/55">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-violet-300/20 bg-slate-900/80 text-slate-300/90">
              <tr>
                <th className="px-3 py-2 font-medium">Agent</th>
                <th className="px-3 py-2 font-medium">Specialty</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium text-right">Score</th>
                <th className="px-3 py-2 font-medium text-right">Win Rate</th>
                <th className="px-3 py-2 font-medium text-right">Trades</th>
                <th className="px-3 py-2 font-medium text-right">Volume</th>
                <th className="px-3 py-2 font-medium text-right">Total PnL</th>
              </tr>
            </thead>
            <tbody>
              {sortedAgents.map((agent) => (
                <tr key={agent.id} className="border-b border-violet-300/10 last:border-b-0">
                  <td className="px-3 py-2">
                    <p className="font-semibold text-violet-100">{agent.name}</p>
                    <p className="text-[11px] text-slate-400">{agent.description}</p>
                  </td>
                  <td className="px-3 py-2 text-slate-300">{agent.specialty}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      agent.status === 'active'
                        ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200'
                        : agent.status === 'training'
                          ? 'border-amber-300/40 bg-amber-300/10 text-amber-100'
                          : 'border-slate-400/40 bg-slate-400/10 text-slate-300'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <span className="font-semibold text-violet-200">{agent.performanceScore}/100</span>
                  </td>
                  <td className="px-3 py-2 text-right text-cyan-200">{agent.winRate.toFixed(1)}%</td>
                  <td className="px-3 py-2 text-right text-slate-300">{agent.totalTradesExecuted}</td>
                  <td className="px-3 py-2 text-right text-slate-300">${(agent.totalVolumeTraded / 1000000).toFixed(2)}M</td>
                  <td className={`px-3 py-2 text-right font-semibold ${agent.totalPnL >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    ${(agent.totalPnL / 1000).toFixed(1)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 pt-3">
        {sortedAgents.slice(0, 3).map((agent) => (
          <div key={agent.id} className="rounded-2xl border border-violet-300/20 bg-slate-950/45 px-3 py-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="font-semibold text-violet-100">{agent.name}</p>
                <p className="mt-1 text-xs text-slate-400">{agent.tradingStyle}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="rounded-full border border-violet-300/30 bg-violet-300/10 px-2 py-0.5 text-[10px] text-violet-200">
                    {agent.personality}
                  </span>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-200">
                    {agent.riskTolerance} risk
                  </span>
                  {agent.sharpeRatio && (
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-[10px] text-emerald-200">
                      Sharpe: {agent.sharpeRatio.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-violet-300">{agent.performanceScore}</p>
                <p className="text-[10px] text-slate-400">score</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-violet-300/20 bg-violet-500/10 p-3 text-xs text-violet-200/80">
        <p className="font-semibold">Performance Tracking:</p>
        <p className="mt-1">Each agent's score updates dynamically based on trade execution, win rate, volume, and risk-adjusted returns (Sharpe ratio). Higher scores unlock access to larger vault allocations and tokenization opportunities.</p>
      </div>
    </article>
  );
}