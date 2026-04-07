import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Activity, AlertTriangle, ArrowRightLeft, BarChart3, Brain, TrendingUp, Zap, ChevronDown, CheckCircle, Lock, Gem, DollarSign } from 'lucide-react';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAbraxas } from '../providers/AbraxasProvider';
import { BagsBuyWidget } from '../components/BagsBuyWidget';
import { BagsSwapWidget } from '../components/BagsSwapWidget';
import { BagsCredibilityBanner } from '../components/BagsCredibilityBanner';
import { BagsDashboard } from '../components/BagsDashboard';
import { FiatOffRampWidget } from '../components/FiatOffRampWidget';
import SpendAbra from '../components/SpendAbra';
import { FeatureBadge } from '../components/FeatureBadge';
import { WalletPortfolioWidget } from '../components/WalletPortfolioWidget';
import type { StakeDuration, StakeRecord } from '../lib/types';
import { PublicKey, Transaction } from '@solana/web3.js';
import { createStakeInstruction, fetchStakeRecord, getStakePDA } from '../lib/staking';
import { getProgramId } from '../lib/solana';
import { getJupiterQuote, getJupiterSwapTransaction, executeSwap } from '../lib/jupiter';
import { RuneRealm } from '../components/RuneRealm';

type RWAPair = {
  id: string;
  fromSymbol: string;
  toSymbol: string;
  fromMint: string;
  toMint: string;
  price: number;
  change24h: number;
  volume24h: number;
  category: 'stablecoin' | 'token' | 'nft-collateral' | 'golf' | 'horses';
  chartData: Array<{ time: number; price: number }>;
};

type StakeTier = {
  duration: number;
  multiplier: string;
  label: string;
  description: string;
  highlight?: boolean;
};

type QuickTradePair = {
  id: string;
  label: string;
  inputMint: string;
  outputMint: string;
  inputSymbol: string;
  outputSymbol: string;
  inputDecimals: number;
  outputDecimals: number;
  fallbackPrice: number;
};

const ABRA_SYMBOL = 'ABRA';
const ABRA_TOKEN_CA = import.meta.env.VITE_ABRA_TOKEN_CONTRACT_ADDRESS?.trim() || '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const ABRA_BAGS_MARKET_URL = import.meta.env.VITE_ABRA_TOKEN_BAGS_URL?.trim() || `https://bags.fm/${ABRA_TOKEN_CA}`;
const DEV_STAKE_WALLET = '7xyCkPPMQfEmRzzvpyboHVkWMn6u8BTvhMYuH3MWUjfX';

const STAKE_TIERS: StakeTier[] = [
  {
    duration: 30,
    multiplier: '1.2x',
    label: '30 Days',
    description: 'Quick liquidity with entry-level returns',
  },
  {
    duration: 90,
    multiplier: '1.8x',
    label: '90 Days',
    description: 'Balanced commitment, strong multiplier',
    highlight: true,
  },
  {
    duration: 180,
    multiplier: '2.5x',
    label: '180 Days',
    description: 'Maximum returns for long-term conviction',
  },
];

const RWA_PAIRS: RWAPair[] = [
  {
    id: 'abra-usdc',
    fromSymbol: 'ABRA',
    toSymbol: 'USDC',
    fromMint: '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS',
    toMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
    price: 0.95,
    change24h: 5.2,
    volume24h: 125000,
    category: 'token',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (23 - i) * 60 * 60 * 1000,
      price: 0.88 + Math.random() * 0.1,
    })),
  },
  {
    id: 'lacasa-usdc',
    fromSymbol: 'La Casa NFT',
    toSymbol: 'USDC',
    fromMint: 'LaC4s1Aqz9gKhzUcfzvhFKGPQGfqEr6QxBCPKXLqZo',
    toMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
    price: 2500,
    change24h: -2.1,
    volume24h: 45000,
    category: 'nft-collateral',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (23 - i) * 60 * 60 * 1000,
      price: 2400 + Math.random() * 200,
    })),
  },
  {
    id: 'usdc-solana',
    fromSymbol: 'USDC',
    toSymbol: 'SOL',
    fromMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
    toMint: 'So11111111111111111111111111111111111111112',
    price: 0.024,
    change24h: 3.8,
    volume24h: 850000,
    category: 'stablecoin',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (23 - i) * 60 * 60 * 1000,
      price: 0.022 + Math.random() * 0.005,
    })),
  },
  {
    id: 'golf-usdc',
    fromSymbol: 'Golf PGA Points',
    toSymbol: 'USDC',
    fromMint: '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS',
    toMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
    price: 125.5,
    change24h: 8.2,
    volume24h: 230000,
    category: 'golf',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (23 - i) * 60 * 60 * 1000,
      price: 115 + Math.random() * 25,
    })),
  },
  {
    id: 'horses-usdc',
    fromSymbol: 'Horse Racing PAYOUT',
    toSymbol: 'USDC',
    fromMint: '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS',
    toMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
    price: 3.75,
    change24h: 12.4,
    volume24h: 580000,
    category: 'horses',
    chartData: Array.from({ length: 24 }, (_, i) => ({
      time: Date.now() - (23 - i) * 60 * 60 * 1000,
      price: 2.8 + Math.random() * 2.0,
    })),
  },
];

const KING_RECOMMENDATION = {
  symbol: 'ABRA',
  reason: 'Strong training progress detected. Swap stables into ABRA for equity upside.',
  confidence: 87,
  expectedGain: '+12-15% over 30 days',
};

const RUNE_CONFIG = {
  rune: 'ᛚ',
  runeName: 'Laguz',
  runeEssence: 'Water · Swift Flow',
  agentName: 'FLUX',
  lore: "Laguz flows where force cannot follow. Flux reads the current of every market tide, acquiring ABRA, routing capital through Bags DEX, and executing RWA pair swaps with fluid precision. Capital moves when Flux moves.",
  ctaLabel: 'Begin the Trade',
  coreGlow: '20, 184, 166',
  fireGlow: '34, 211, 238',
  accentClass: 'text-teal-300',
} as const;

export function TradePage() {
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction, connect } = useWallet();
  const { sophiaAgents, recordSophiaTrade } = useAbraxas();
  const location = useLocation();
  const [selectedPair, setSelectedPair] = useState<RWAPair>(RWA_PAIRS[0]);
  const [pairView, setPairView] = useState<'carousel' | 'list'>('carousel');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedSophiaId, setSelectedSophiaId] = useState<string | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('1000');
  const [toAmount, setToAmount] = useState<string>('950');
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [selectedPairId, setSelectedPairId] = useState<string>('abra-usdc');
  const [useAutoTrade, setUseAutoTrade] = useState(false);
  const [circuitWarning, setCircuitWarning] = useState(false);
  const [showTradeSuccess, setShowTradeSuccess] = useState(false);
  const [showOffRampWidget, setShowOffRampWidget] = useState(false);
  const [recentSwapAmount, setRecentSwapAmount] = useState<number>(0);
  const [offRampAmount, setOffRampAmount] = useState<number>(0);
  const [showLiveMarket, setShowLiveMarket] = useState(false);
  const [selectedPairCategory, setSelectedPairCategory] = useState<string | null>(null);
  const [showAllPairs, setShowAllPairs] = useState(false);
  const [showOnboardSection, setShowOnboardSection] = useState(false);
  const [selectedStakeDuration, setSelectedStakeDuration] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [isStaking, setIsStaking] = useState(false);
  const [stakeError, setStakeError] = useState<string | null>(null);
  const [userStakes, setUserStakes] = useState<StakeRecord[]>([]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapError, setSwapError] = useState<string | null>(null);
  const [showSpendAbra, setShowSpendAbra] = useState(false);
  const programId = getProgramId();

  const selectedSophia = useMemo(() => {
    if (!selectedSophiaId) return sophiaAgents[0];
    return sophiaAgents.find((a) => a.id === selectedSophiaId);
  }, [selectedSophiaId, sophiaAgents]);

  // Get unique pair categories for filtering
  const pairCategories = useMemo(() => {
    const unique = Array.from(new Set(RWA_PAIRS.map(p => p.category)));
    return ['all', ...unique];
  }, []);

  // Filter pairs by selected category
  const filteredPairs = useMemo(() => {
    if (!selectedPairCategory) return RWA_PAIRS;
    return RWA_PAIRS.filter(p => p.category === selectedPairCategory);
  }, [selectedPairCategory]);

  // Show limited (3) or all pairs based on toggle
  const displayedPairs = useMemo(() => {
    return showAllPairs ? filteredPairs : filteredPairs.slice(0, 3);
  }, [filteredPairs, showAllPairs]);

  const refreshStakeRecord = useCallback(async () => {
    if (!publicKey || !programId) {
      setUserStakes([]);
      return;
    }
    try {
      const stakeRecord = await fetchStakeRecord(connection, publicKey, programId);
      setUserStakes(stakeRecord ? [stakeRecord] : []);
    } catch (error) {
      console.error('Failed to fetch stake record', error);
      setUserStakes([]);
    }
  }, [programId, publicKey]);

  useEffect(() => {
    if (!connected || !publicKey) {
      setUserStakes([]);
      return;
    }
    void refreshStakeRecord();
  }, [connected, publicKey, refreshStakeRecord]);

  // Reset state when navigating to/from the Trade page to ensure proper page state
  useEffect(() => {
    // Always reset all modal/overlay states to prevent them from blocking navigation
    setShowTradeSuccess(false);
    setShowOffRampWidget(false);
    setShowLiveMarket(false);
    setShowOnboardSection(false);
    setShowSpendAbra(false);
    setSwapError(null);
    setCircuitWarning(false);

    if (location.pathname === '/app/trade') {
      // Additional reset when entering the Trade page
      setPairView('carousel');
    }

    // Cleanup when unmounting or navigating away
    return () => {
      setShowTradeSuccess(false);
      setShowOffRampWidget(false);
      setShowLiveMarket(false);
      setShowOnboardSection(false);
      setShowSpendAbra(false);
      setSwapError(null);
      setCircuitWarning(false);
    };
  }, [location.pathname]);

  const handleQuote = useCallback(async () => {
    if (!fromAmount || isNaN(Number(fromAmount))) return;
    setIsLoadingQuote(true);
    setSwapError(null);
    try {
      // Try to fetch real quote from Jupiter
      const quote = await getJupiterQuote(
        selectedPair.fromMint,
        selectedPair.toMint,
        Number(fromAmount),
        50 // 0.5% slippage
      );

      if (quote) {
        // Use Jupiter quote if available
        const outputAmount = Number(quote.outAmount) / 10 ** 6;
        setToAmount(outputAmount.toFixed(6));

        // Check price impact
        const priceImpact = Math.abs(parseFloat(quote.priceImpactPct));
        if (priceImpact > 5) {
          setCircuitWarning(true);
        } else {
          setCircuitWarning(false);
        }
      } else {
        // Fallback to pair pricing if Jupiter unavailable
        console.log('Jupiter quote unavailable, using pair price');
        const fallbackQuote = Number(fromAmount) * selectedPair.price;
        setToAmount(fallbackQuote.toFixed(6));
      }

      // Check if large amount (circuit protection)
      if (Number(fromAmount) > 50000) {
        setCircuitWarning(true);
      }
    } catch (error) {
      console.error('Quote error:', error);
      // Always fallback to pair pricing on error
      const mockQuote = Number(fromAmount) * selectedPair.price;
      setToAmount(mockQuote.toFixed(6));
    } finally {
      setIsLoadingQuote(false);
    }
  }, [fromAmount, selectedPair]);

  const handleSwap = useCallback(async () => {
    if (!connected || !publicKey || !fromAmount || !selectedSophia || !sendTransaction) {
      setSwapError('Wallet not connected');
      return;
    }

    setIsSwapping(true);
    setSwapError(null);

    try {
      console.log('Starting swap...');
      
      // Try to get swap transaction from Jupiter first
      const swapTxResponse = await getJupiterSwapTransaction(
        publicKey.toString(),
        selectedPair.fromMint,
        selectedPair.toMint,
        Number(fromAmount),
        50 // 0.5% slippage
      );

      // If Jupiter fails, fallback to opening Bags for the swap
      if (!swapTxResponse) {
        console.log('Jupiter API unavailable, opening Bags for swap...');
        const bagsUrl = `https://bags.fm/${selectedPair.fromMint}`;
        window.open(bagsUrl, '_blank', 'noopener,noreferrer');
        
        setSwapError('Opened Bags.fm for swap. Complete the trade there and return here.');
        setIsSwapping(false);
        return;
      }

      // Execute the swap via Jupiter
      const signature = await executeSwap(connection, swapTxResponse.swapTransaction, sendTransaction);

      if (!signature) {
        setSwapError('Swap transaction failed. Please check your balance and try again.');
        setIsSwapping(false);
        return;
      }

      console.log('Swap successful:', signature);

      // Record the trade in Abraxas context for history/analytics
      recordSophiaTrade({
        sophiaAgentId: selectedSophia.id,
        timestamp: new Date().toISOString(),
        fromMint: selectedPair.fromMint,
        toMint: selectedPair.toMint,
        fromSymbol: selectedPair.fromSymbol,
        toSymbol: selectedPair.toSymbol,
        inputAmount: Number(fromAmount),
        outputAmount: Number(toAmount),
        executedPrice: Number(toAmount) / Number(fromAmount),
        entryReason: useAutoTrade ? `Auto-trade via Sophia ${selectedSophia.name}` : `Manual trade - ${selectedPair.fromSymbol} swap`,
        priceAtEntry: Number(toAmount) / Number(fromAmount),
        status: 'executed',
      });

      setShowTradeSuccess(true);
      setRecentSwapAmount(Number(toAmount));
      setShowOffRampWidget(true);
      setTimeout(() => setShowTradeSuccess(false), 3000);
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Swap error:', errorMessage);
      setSwapError(errorMessage || 'Swap failed. Please try again.');
    } finally {
      setIsSwapping(false);
    }
  }, [connected, publicKey, fromAmount, toAmount, selectedPair, selectedSophia, useAutoTrade, sendTransaction, connection, recordSophiaTrade]);

  const handleStake = async () => {
    setIsStaking(true);
    setStakeError(null);
    try {
      if (!connected) {
        await connect();
        setIsStaking(false);
        return;
      }
      if (!publicKey || !sendTransaction || !programId || !stakeAmount || Number(stakeAmount) <= 0 || !selectedStakeDuration) {
        setStakeError('Enter a valid amount.');
        setIsStaking(false);
        return;
      }

      const wholeAmount = Math.floor(Number(stakeAmount));
      if (!Number.isFinite(wholeAmount) || wholeAmount <= 0) {
        setStakeError('Stake amount must be a positive whole number of ABRA.');
        setIsStaking(false);
        return;
      }

      const existingStake = await fetchStakeRecord(connection, publicKey, programId);
      if (existingStake?.isActive) {
        setStakeError('One active stake per wallet currently supported.');
        setIsStaking(false);
        return;
      }

      const [stakePda] = getStakePDA(publicKey, programId);
      const latestBlockhash = await connection.getLatestBlockhash('confirmed');
      const mintAddress = new PublicKey(ABRA_TOKEN_CA);
      const treasuryWallet = new PublicKey(DEV_STAKE_WALLET);
      const {
        ASSOCIATED_TOKEN_PROGRAM_ID,
        createAssociatedTokenAccountInstruction,
        createTransferCheckedInstruction,
        getAssociatedTokenAddressSync,
        getMint,
        TOKEN_PROGRAM_ID,
      } = await import('@solana/spl-token');
      const mintAccount = await getMint(connection, mintAddress, 'confirmed', TOKEN_PROGRAM_ID);
      const sourceTokenAccount = getAssociatedTokenAddressSync(mintAddress, publicKey, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
      const treasuryTokenAccount = getAssociatedTokenAddressSync(mintAddress, treasuryWallet, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
      const tokenAmount = BigInt(wholeAmount) * (10n ** BigInt(mintAccount.decimals));

      if (tokenAmount <= 0n) {
        setStakeError('Stake amount is too low for ABRA settlement.');
        setIsStaking(false);
        return;
      }

      const sourceTokenAccountInfo = await connection.getAccountInfo(sourceTokenAccount, 'confirmed');
      if (!sourceTokenAccountInfo) {
        setStakeError('No ABRA token account found. Buy ABRA first, then stake.');
        setIsStaking(false);
        return;
      }

      const treasuryTokenAccountInfo = await connection.getAccountInfo(treasuryTokenAccount, 'confirmed');
      const instruction = createStakeInstruction(publicKey, wholeAmount, selectedStakeDuration as StakeDuration, programId);
      const tx = new Transaction({
        feePayer: publicKey,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });

      if (!treasuryTokenAccountInfo) {
        tx.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            treasuryTokenAccount,
            treasuryWallet,
            mintAddress,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
          ),
        );
      }

      tx.add(
        createTransferCheckedInstruction(
          sourceTokenAccount,
          mintAddress,
          treasuryTokenAccount,
          publicKey,
          tokenAmount,
          mintAccount.decimals,
          [],
          TOKEN_PROGRAM_ID,
        ),
      ).add(instruction);

      const signature = await sendTransaction(tx, connection, {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      await connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      }, 'confirmed');

      setSelectedStakeDuration(null);
      setStakeAmount('');
      await refreshStakeRecord();
    } catch (e: any) {
      const errorMessage = typeof e?.message === 'string' ? e.message : 'Failed to stake ABRA.';
      setStakeError(errorMessage);
    } finally {
      setIsStaking(false);
    }
  };

  const quickTradePairs: QuickTradePair[] = [
    {
      id: 'abra-usdc',
      label: 'ABRA → USDC',
      inputMint: ABRA_TOKEN_CA,
      outputMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
      inputSymbol: 'ABRA',
      outputSymbol: 'USDC',
      inputDecimals: 6,
      outputDecimals: 6,
      fallbackPrice: 0.95,
    },
    {
      id: 'usdc-abra',
      label: 'USDC → ABRA',
      inputMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
      outputMint: ABRA_TOKEN_CA,
      inputSymbol: 'USDC',
      outputSymbol: 'ABRA',
      inputDecimals: 6,
      outputDecimals: 6,
      fallbackPrice: 1.05,
    },
    {
      id: 'usdc-sol',
      label: 'USDC → SOL',
      inputMint: 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1',
      outputMint: 'So11111111111111111111111111111111111111112',
      inputSymbol: 'USDC',
      outputSymbol: 'SOL',
      inputDecimals: 6,
      outputDecimals: 9,
      fallbackPrice: 0.024,
    },
  ];

  const selectedQuickTradePair = quickTradePairs.find(p => p.id === selectedPairId);
  const quickTradeUsesBagsRoute = Boolean(
    selectedQuickTradePair && (
      selectedQuickTradePair.inputMint === ABRA_TOKEN_CA ||
      selectedQuickTradePair.outputMint === ABRA_TOKEN_CA
    ),
  );
  const quickTradeActionLabel = !selectedQuickTradePair
    ? 'Trade'
    : selectedQuickTradePair.outputSymbol === 'ABRA'
      ? 'Buy ABRA via Bags'
      : selectedQuickTradePair.inputSymbol === 'ABRA'
        ? 'Swap ABRA via Bags'
        : 'Swap In Abraxas';

  const handleQuickTradeQuote = async () => {
    if (!fromAmount || isNaN(Number(fromAmount)) || !selectedQuickTradePair) return;
    setIsLoadingQuote(true);
    setSwapError(null);

    if (quickTradeUsesBagsRoute) {
      const fallbackQuote = Number(fromAmount) * selectedQuickTradePair.fallbackPrice;
      setToAmount(fallbackQuote.toFixed(4));
      setIsLoadingQuote(false);
      return;
    }

    try {
      const quote = await getJupiterQuote(
        selectedQuickTradePair.inputMint,
        selectedQuickTradePair.outputMint,
        Number(fromAmount),
        50,
        selectedQuickTradePair.inputDecimals,
      );

      if (quote) {
        const outputAmount = Number(quote.outAmount) / 10 ** selectedQuickTradePair.outputDecimals;
        setToAmount(outputAmount.toFixed(selectedQuickTradePair.outputDecimals === 9 ? 6 : 4));
        return;
      }

      const fallbackQuote = Number(fromAmount) * selectedQuickTradePair.fallbackPrice;
      setToAmount(fallbackQuote.toFixed(4));
      setSwapError('Live quote unavailable. Showing a fallback estimate.');
    } catch (error) {
      console.error('Quick trade quote error:', error);
      const fallbackQuote = Number(fromAmount) * selectedQuickTradePair.fallbackPrice;
      setToAmount(fallbackQuote.toFixed(4));
      setSwapError('Live quote unavailable. Showing a fallback estimate.');
    } finally {
      setIsLoadingQuote(false);
    }
  };

  const openQuickTradeBagsRoute = useCallback(() => {
    if (!selectedQuickTradePair || typeof window === 'undefined') {
      return;
    }

    const baseUrl = selectedQuickTradePair.outputSymbol === 'ABRA'
      ? `https://bags.fm/${ABRA_TOKEN_CA}`
      : `https://bags.fm/${selectedQuickTradePair.inputMint}/${selectedQuickTradePair.outputMint}`;

    const amountSuffix = fromAmount ? `?amount=${encodeURIComponent(fromAmount)}` : '';
    window.open(`${baseUrl}${amountSuffix}`, '_blank', 'noopener,noreferrer');
  }, [selectedQuickTradePair, fromAmount]);

  const handleQuickTradeSwap = useCallback(async () => {
    if (!connected || !publicKey || !sendTransaction || !selectedQuickTradePair || !fromAmount) {
      setSwapError('Connect your wallet to trade inside Abraxas.');
      return;
    }

    if (quickTradeUsesBagsRoute) {
      openQuickTradeBagsRoute();
      return;
    }

    setIsSwapping(true);
    setSwapError(null);

    try {
      const swapTxResponse = await getJupiterSwapTransaction(
        publicKey.toString(),
        selectedQuickTradePair.inputMint,
        selectedQuickTradePair.outputMint,
        Number(fromAmount),
        50,
      );

      if (!swapTxResponse) {
        setSwapError('In-app routing is temporarily unavailable. Use the optional Bags 0% fee route below.');
        return;
      }

      const signature = await executeSwap(connection, swapTxResponse.swapTransaction, sendTransaction);

      if (!signature) {
        setSwapError('Swap transaction failed. Please check your balance and try again.');
        return;
      }

      if (selectedSophia) {
        recordSophiaTrade({
          sophiaAgentId: selectedSophia.id,
          timestamp: new Date().toISOString(),
          fromMint: selectedQuickTradePair.inputMint,
          toMint: selectedQuickTradePair.outputMint,
          fromSymbol: selectedQuickTradePair.inputSymbol,
          toSymbol: selectedQuickTradePair.outputSymbol,
          inputAmount: Number(fromAmount),
          outputAmount: Number(toAmount || 0),
          executedPrice: Number(toAmount || 0) / Math.max(Number(fromAmount), 1),
          entryReason: `Manual in-app trade - ${selectedQuickTradePair.label}`,
          priceAtEntry: Number(toAmount || 0) / Math.max(Number(fromAmount), 1),
          status: 'executed',
        });
      }

      if (selectedQuickTradePair.outputSymbol === 'ABRA') {
        setRecentSwapAmount(Number(toAmount || 0));
      }

      setShowTradeSuccess(true);
      setTimeout(() => setShowTradeSuccess(false), 3000);
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Trade failed. Please try again.';
      console.error('Quick trade swap error:', errorMessage);
      setSwapError(errorMessage);
    } finally {
      setIsSwapping(false);
    }
  }, [connected, connection, fromAmount, openQuickTradeBagsRoute, publicKey, quickTradeUsesBagsRoute, recordSophiaTrade, selectedQuickTradePair, selectedSophia, sendTransaction, toAmount]);

  const swapFeePercentage = 0.02;
  const estimatedFee = Number(toAmount) * (swapFeePercentage / 100);

  return (
    <RuneRealm {...RUNE_CONFIG}>
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8 space-y-6" style={{ contain: 'layout style' }}>
      {/* Header */}
      <div className="flex-shrink-0 w-full space-y-2 font-mono">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-cyan-400">&gt;</span>
          <h1 className="text-sm font-bold text-cyan-400 tracking-widest uppercase whitespace-nowrap">[RWA_TRADING] CENTER_ACTIVE</h1>
        </div>
        <p className="text-[10px] text-cyan-300/60 uppercase tracking-wider">
          &gt; Trade Real-World Asset pairs on Solana | Zero fees | ABRA_or_DIRECT_TRADE
        </p>
      </div>

      {/* Wallet Portfolio Widget */}
      <WalletPortfolioWidget />

      {/* Wallet Connection Status */}
      {!connected && (
        <div className="flex-shrink-0 w-full rounded-lg border border-orange-400/40 bg-orange-500/15 p-4 space-y-3">
          <div className="flex items-start gap-3 w-full">
            <Zap size={18} className="mt-0.5 text-orange-400 shrink-0 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <p className="font-bold text-orange-400 font-mono text-sm">&gt; [WALLET_NOT_CONNECTED]</p>
              <p className="text-[11px] text-orange-300/80 uppercase tracking-wider">Connect your Solana wallet to execute trades and stake ABRA</p>
              <button
                onClick={() => connect()}
                className="mt-2 px-4 py-2 rounded-lg border border-orange-400/45 bg-orange-500/25 text-orange-100 font-semibold text-xs hover:bg-orange-500/35 transition-all uppercase tracking-wider"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* King AI Recommendation */}
      <div className="flex-shrink-0 w-full rounded-lg border border-cyan-400/30 bg-cyan-500/15 p-4 space-y-3" style={{ contain: 'layout style' }}>
        <div className="flex items-start gap-3 w-full">
          <Brain size={18} className="mt-0.5 text-cyan-400 shrink-0 flex-shrink-0" />
          <div className="space-y-1 flex-1">
            <p className="font-bold text-cyan-400 font-mono text-sm">&gt; [AI_RECOMMENDATION]</p>
            <p className="text-[11px] text-cyan-400/70 uppercase tracking-wider">Training progress strong | Swap stables to ABRA | Equity upside</p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-cyan-400 font-mono">Confidence: 87%</span>
              <span className="text-green-400 font-mono">Projection: +12% | 30d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sophia Agent Selector */}
      {selectedSophia && (
        <div className="flex-shrink-0 w-full rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-900/40 to-slate-900/60 p-3" style={{ contain: 'layout style' }}>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Brain size={18} className="text-violet-300 shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-300 text-sm truncate max-w-[120px] font-mono">{selectedSophia.name}</span>
                  <select
                    value={selectedSophiaId || ''}
                    onChange={(e) => setSelectedSophiaId(e.target.value || null)}
                    className="text-xs bg-slate-800/70 border border-violet-400/20 text-white rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-violet-400"
                  >
                    {sophiaAgents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name} ({agent.performanceScore}/100)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-[10px] text-cyan-300/60 mt-0.5 truncate font-mono uppercase tracking-wider">{selectedSophia.specialty} | {selectedSophia.personality}_STYLE</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-violet-200 bg-violet-400/10 px-2 py-0.5 rounded font-medium">
                    Score: {selectedSophia.performanceScore}/100
                  </span>
                  <span className="text-[11px] text-cyan-200 bg-cyan-400/10 px-2 py-0.5 rounded font-medium">
                    Win: {selectedSophia.winRate.toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-emerald-200 bg-emerald-400/10 px-2 py-0.5 rounded font-medium">
                    Vol: {(selectedSophia.totalVolumeTraded / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Circuit Warning */}
      {circuitWarning && (
        <div className="flex-shrink-0 w-full rounded-lg border border-yellow-400/30 bg-yellow-500/15 p-4 space-y-2" style={{ contain: 'layout style' }}>
          <div className="flex items-start gap-2 w-full">
            <AlertTriangle size={16} className="mt-0.5 text-yellow-400 shrink-0 flex-shrink-0" />
            <div className="text-sm text-yellow-300/80">
              <p className="font-bold text-orange-400 font-mono">&gt; [CIRCUIT_WARNING]</p>
              <p className="text-[11px] text-orange-400/70 uppercase tracking-wider">Large trade detected | May trigger vault rebalancing | Proceed with caution</p>
            </div>
          </div>
        </div>
      )}

      {/* Swap Interface */}
      <div className="space-y-4 flex-shrink-0 min-w-0">
        {/* BAGS Credibility Banner */}
        <BagsCredibilityBanner />

        {/* Bags Integration Dashboard */}
        <BagsDashboard />

        {/* Off-Ramp Button */}
        <button
          onClick={() => setShowOffRampWidget(true)}
          className="w-full rounded-lg border border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-emerald-200 transition-colors flex items-center justify-center gap-2"
        >
          <DollarSign size={16} />
          Cash Out to Fiat
        </button>

        {/* Spend ABRA Button */}
        <button
          onClick={() => setShowSpendAbra(true)}
          className="w-full rounded-lg border border-purple-400/30 bg-purple-500/10 hover:bg-purple-500/20 px-4 py-3 text-sm font-semibold text-purple-200 transition-colors flex items-center justify-center gap-2"
        >
          <Zap size={16} />
          Spend ABRA Direct
        </button>

        <article id="in-app-trade" className="glow-panel rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-4 flex-shrink-0 w-full">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-emerald-200" size={16} />
            <h3 className="text-sm font-bold text-emerald-300 tracking-widest uppercase font-mono">&gt; [TRADE] ABRAXAS_LIVE</h3>
            <FeatureBadge status="live" size="sm" />
          </div>
          <p className="text-[10px] text-emerald-100/70 mb-3 uppercase tracking-wider">
            {quickTradeUsesBagsRoute
              ? 'ABRA routes execute via Bags | Use button to buy or swap ABRA | Live Bags flow'
              : 'RECOMMENDED: All swaps route through Bags DEX (0% fee). This is the optimal path for capital execution.'}
          </p>
          <div className="space-y-3">
            <select
              value={selectedPairId}
              onChange={(e) => {
                setSelectedPairId(e.target.value);
                setToAmount('');
                setSwapError(null);
              }}
              className="w-full rounded-lg border border-emerald-400/30 bg-slate-950/70 px-3 py-2 text-sm font-medium text-slate-100"
            >
              {quickTradePairs.map((pair) => (
                <option key={pair.id} value={pair.id}>
                  {pair.label}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder={`Amount (${selectedQuickTradePair?.inputSymbol ?? 'token'})`}
                  className="w-full rounded-lg border border-slate-600 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 outline-none"
                />
              </div>
              <button
                onClick={handleQuickTradeQuote}
                disabled={!fromAmount || isLoadingQuote || isSwapping}
                className="px-3 py-2 rounded-lg bg-emerald-500/80 text-white font-semibold text-xs hover:bg-emerald-600/90 disabled:opacity-50 transition"
              >
                {isLoadingQuote ? '...' : 'Quote'}
              </button>
            </div>

            {toAmount && (
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-3 py-2">
                <p className="text-[10px] text-cyan-300/60 mb-1 font-mono uppercase tracking-wider">ESTIMATED_OUTPUT</p>
                <p className="text-lg font-bold text-emerald-300">
                  {Number(toAmount).toLocaleString('en-US', { maximumFractionDigits: 6 })} {selectedQuickTradePair?.outputSymbol}
                </p>
              </div>
            )}

            <div className="rounded-lg bg-white/5 p-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <p className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">ROUTE</p>
                <p className="text-cyan-300 font-mono">Bags_Direct</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">FALLBACK</p>
                <p className="text-cyan-300 font-mono">Native_Solana_Network</p>
              </div>
              {swapError && !quickTradeUsesBagsRoute ? (
                <p className="text-amber-400 font-mono text-[11px] uppercase">&gt; {swapError}</p>
              ) : null}
              {quickTradeUsesBagsRoute ? (
                <p className="text-orange-400 font-mono text-[11px] uppercase tracking-wider">ABRA routed via Bags | Opens live Bags execution</p>
              ) : null}
            </div>

            {toAmount && (
              <button
                onClick={connected ? handleQuickTradeSwap : () => connect()}
                disabled={isSwapping || isLoadingQuote}
                className="w-full rounded-lg bg-emerald-500/90 hover:bg-emerald-600 text-white font-semibold py-2 transition text-sm disabled:opacity-50"
              >
                {!connected ? 'Connect Wallet to Trade' : (isSwapping ? 'Processing...' : quickTradeActionLabel)}
              </button>
            )}
          </div>
        </article>

        {/* Buy ABRA Widget */}
        <BagsBuyWidget tokenAddress={ABRA_TOKEN_CA} compact={false} />

        {/* Embedded Swap Widget */}
        <BagsSwapWidget 
          fromMint={selectedPair.fromMint}
          toMint={selectedPair.toMint}
          compact={false}
        />

        {/* Quote info below embedded widget */}
        {toAmount && (
          <div className="glow-panel p-4 space-y-3 flex-shrink-0 w-full min-w-0">
            <div className="space-y-2">
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold font-mono">&gt; ESTIMATED_OUTPUT</p>
              <div className="px-4 py-3 rounded-lg bg-slate-900/50 border border-white/15">
                <p className="text-2xl font-bold text-green-300">{Number(toAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                {estimatedFee > 0 && (
                  <p className="text-xs text-white/50 mt-1">Fee: ~${estimatedFee.toFixed(2)}</p>
                )}
              </div>
            </div>

            {/* Trade Info */}
            <div className="rounded-lg bg-white/5 p-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <p className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">PRICE_IMPACT</p>
                <p className="text-cyan-300 font-mono">0.02%</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">ROUTE</p>
                <p className="text-cyan-300 font-mono">Bags_DEX</p>
              </div>
            </div>
          </div>
        )}

        {/* Fiat Off-Ramp Widget */}
        {showOffRampWidget && (
          <div className="flex-shrink-0 w-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-amber-400 tracking-widest uppercase font-mono">&gt; [OFFRAMP] CASH_CONVERSION</h3>
              <button
                onClick={() => setShowOffRampWidget(false)}
                className="text-xs text-white/60 hover:text-white/80 underline"
              >
                Close
              </button>
            </div>
            <FiatOffRampWidget
              onSuccess={() => setShowOffRampWidget(false)}
              compact={false}
            />
          </div>
        )}

        {/* RWA Pairs */}
        <div className="glow-panel p-4 space-y-3 flex-shrink-0 w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-cyan-400 font-mono tracking-widest uppercase">&gt; [MARKET_PAIRS] RWA_ROUTES</h3>
            <div className="flex gap-2 items-center">
              <button
                className={`px-2 py-1 rounded text-xs font-semibold ${pairView === 'carousel' ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-800/60 text-white/60'}`}
                onClick={() => setPairView('carousel')}
              >
                Cards
              </button>
              <button
                className={`px-2 py-1 rounded text-xs font-semibold ${pairView === 'list' ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-800/60 text-white/60'}`}
                onClick={() => setPairView('list')}
              >
                List
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
            {pairCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedPairCategory(category === 'all' ? null : category);
                  setShowAllPairs(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  (category === 'all' && !selectedPairCategory) || (category !== 'all' && selectedPairCategory === category)
                    ? 'bg-cyan-500/25 text-cyan-100 border border-cyan-400/45'
                    : 'bg-slate-800/50 text-slate-300 border border-slate-600/30 hover:border-slate-500/50'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {pairView === 'carousel' ? (
            <div ref={carouselRef} className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
              {displayedPairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => setSelectedPair(pair)}
                  className={`min-w-[180px] max-w-[200px] snap-center p-4 rounded-lg border transition-all text-left ${
                    selectedPair.id === pair.id
                      ? 'border-cyan-400/50 bg-cyan-500/20 ring-1 ring-cyan-400/30'
                      : 'border-white/15 bg-slate-900/50 hover:border-white/25'
                  }`}
                >
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide truncate">{pair.category}</p>
                  <p className="text-sm font-bold text-white mt-1 truncate">{pair.fromSymbol} &rarr; {pair.toSymbol}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-white/50">${pair.price.toFixed(4)}</p>
                    <p className={`text-xs font-semibold ${pair.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{pair.change24h >= 0 ? '+' : ''}{pair.change24h}%</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {displayedPairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => setSelectedPair(pair)}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    selectedPair.id === pair.id
                      ? 'border-cyan-400/50 bg-cyan-500/20 ring-1 ring-cyan-400/30'
                      : 'border-white/15 bg-slate-900/50 hover:border-white/25'
                  }`}
                >
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide truncate">{pair.category}</p>
                  <p className="text-sm font-bold text-white mt-1 truncate">{pair.fromSymbol} &rarr; {pair.toSymbol}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-white/50">${pair.price.toFixed(4)}</p>
                    <p className={`text-xs font-semibold ${pair.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{pair.change24h >= 0 ? '+' : ''}{pair.change24h}%</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* View More/Less Button */}
          {filteredPairs.length > 3 && (
            <button
              onClick={() => setShowAllPairs(!showAllPairs)}
              className="w-full mt-2 py-2 px-3 rounded-lg border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-200 transition-colors"
            >
              {showAllPairs ? 'Show Less' : `View More (${filteredPairs.length - 3} more)`}
            </button>
          )}
        </div>

        {/* Live Chart */}
        <div className="glow-panel p-4 mt-4 flex-shrink-0 w-full">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-white/60 flex items-center gap-2 flex-shrink-0">
              <BarChart3 size={16} className="text-cyan-400" /> Live Price Chart
              <FeatureBadge status="live" size="sm" />
            </h4>
            <button
              className={`px-3 py-1 rounded text-xs font-semibold transition-all border ${showLiveMarket ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40' : 'bg-slate-800/60 text-white/60 border-white/20 hover:bg-white/5'}`}
              onClick={() => setShowLiveMarket((v) => !v)}
            >
              {showLiveMarket ? 'Hide' : 'Show'} Live Market
            </button>
          </div>
          {showLiveMarket && (
            <div className="w-full h-[600px] rounded-lg overflow-hidden border border-cyan-400/20 bg-black transition-all duration-300">
              <iframe
                title="ABRA Bags Market"
                src={ABRA_BAGS_MARKET_URL}
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
          )}
          <p className="text-xs text-white/30 mt-2">Powered by Bags. Live market embed loads the ABRA token page using mint {ABRA_TOKEN_CA}.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glow-panel p-4 space-y-2">
          <p className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">24h_VOLUME</p>
          <p className="text-2xl font-bold text-cyan-300">${selectedPair.volume24h.toLocaleString()}</p>
          <p className="text-[10px] text-cyan-300/60 font-mono">{selectedPair.fromSymbol}/{selectedPair.toSymbol}</p>
        </div>
        <div className="glow-panel p-4 space-y-2">
          <p className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">LIQUIDITY_SOURCE</p>
          <p className="text-lg font-bold text-amber-200 font-mono">Bags</p>
          <p className="text-[10px] text-cyan-300/60 font-mono">~0% protocol fees</p>
        </div>
      </div>

      {/* Onboarding Section (Collapsible) */}
      <div className="border-t border-white/10 pt-8">
        <button
          onClick={() => setShowOnboardSection(!showOnboardSection)}
          className="w-full flex items-center justify-between p-4 rounded-lg border border-amber-300/25 hover:border-amber-300/40 bg-amber-500/10 hover:bg-amber-500/15 transition-all"
        >
          <h2 className="text-sm font-bold text-amber-400 tracking-widest uppercase flex items-center gap-2 font-mono">
            <span>&gt; [ONBOARD] GET_STARTED</span>
          </h2>
          <ChevronDown size={18} className={`text-amber-300/60 transition-transform ${showOnboardSection ? 'rotate-180' : ''}`} />
        </button>

        {showOnboardSection && (
          <div className="space-y-4 mt-4">
            {/* User Stakes Display */}
            {userStakes.length > 0 && (
              <div className="glow-panel p-4 space-y-3">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 font-mono uppercase tracking-widest">
                  <CheckCircle size={16} className="text-green-400" /> Your ABRA Stakes
                </h3>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="text-white/50 uppercase tracking-wide">Total Staked</p>
                    <p className="text-lg font-bold text-amber-200">{userStakes.reduce((sum, s) => sum + s.abraAmount, 0).toLocaleString()}</p>
                    <p className="text-white/40">ABRA</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 uppercase tracking-wide">Projected Value</p>
                    <p className="text-lg font-bold text-violet-300">
                      {Math.round(
                        userStakes.reduce((sum, s) => sum + s.abraAmount * (s.multiplierBps / 10_000), 0)
                      ).toLocaleString()}
                    </p>
                    <p className="text-white/40">ABRA</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/50 uppercase tracking-wide">Active Stakes</p>
                    <p className="text-lg font-bold text-green-400">{userStakes.filter((s) => s.isActive).length}</p>
                    <p className="text-white/40">Position(s)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Buy ABRA now */}
            <div className="glow-panel p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-300">
                <span className="font-mono font-bold text-orange-400 uppercase tracking-wider">&gt; STEP_01_BUY_ABRA</span>
              </div>
              <p className="text-xs text-white/60">
                Buy ABRA first, then move directly into staking below if you want the early adopter multiplier route.
              </p>
              <div className="rounded-lg border border-amber-300/25 bg-slate-900/50 p-3 space-y-1 text-xs">
                <p className="text-amber-200/75 font-semibold uppercase tracking-wide">ABRA Token Address</p>
                <p className="break-all text-slate-100 font-mono text-[10px]">{ABRA_TOKEN_CA}</p>
              </div>
              <BagsBuyWidget tokenAddress={ABRA_TOKEN_CA} />
            </div>

            {/* Staking */}
            {selectedStakeDuration === null ? (
              <div className="glow-panel p-5 space-y-4">
                <div className="flex items-center gap-2 text-violet-300">
                  <Lock size={16} />
                  <h2 className="text-sm font-bold text-violet-400 tracking-widest uppercase font-mono">STEP_02_STAKE_ABRA</h2>
                </div>
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-mono">
                  Stakes lock for 30/90/180 days | Higher multipliers = Longer periods
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STAKE_TIERS.map((tier) => (
                    <button
                      key={tier.duration}
                      onClick={() => {
                        setSelectedStakeDuration(tier.duration);
                        if (!stakeAmount) setStakeAmount('2500');
                      }}
                      className={`group relative p-4 rounded-lg border transition-all text-left ${
                        tier.highlight
                          ? 'ring-1 ring-violet-400/40 border-violet-400/50'
                          : 'border-white/15 hover:border-white/30'
                      } hover:bg-slate-900/80`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 w-full">
                          <p className="text-sm font-bold text-cyan-300 font-mono">{tier.label}</p>
                          {tier.highlight && (
                            <span className="ml-auto inline-flex items-center gap-0 text-violet-300 font-semibold shrink-0">
                              <Gem size={14} />
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-green-400">{tier.multiplier}</p>
                          <p className="text-xs text-white/50">{tier.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glow-panel p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-violet-300 flex items-center gap-2">
                    <span className="font-mono font-bold text-violet-400 uppercase tracking-wider">CONFIRM_STAKE</span>
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedStakeDuration(null);
                      setStakeAmount('');
                    }}
                    className="text-xs text-white/50 hover:text-white/70 transition-colors"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold font-mono">&gt; ABRA_AMOUNT</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter ABRA amount..."
                      className="flex-1 px-4 py-2 rounded-lg bg-slate-900/50 border border-white/15 text-white placeholder:text-white/30 focus:border-violet-400 focus:ring-1 focus:ring-violet-400/50 outline-none"
                    />
                    <button
                      onClick={() => setStakeAmount('2500')}
                      className="px-3 py-2 text-xs font-semibold text-white/60 hover:text-white transition-colors whitespace-nowrap"
                    >
                      Builder
                    </button>
                  </div>
                </div>

                {stakeAmount && Number(stakeAmount) > 0 && (
                  <div className="rounded-lg border border-green-400/25 bg-green-500/10 p-3 space-y-2">
                    <p className="text-[10px] text-green-400 font-mono uppercase tracking-wider">VALUE_AT_UNLOCK</p>
                    <div className="flex items-baseline justify-between">
                      <p className="text-2xl font-bold text-green-300">
                        {(
                          Number(stakeAmount) *
                          (selectedStakeDuration === 30
                            ? 1.2
                            : selectedStakeDuration === 90
                              ? 1.8
                              : 2.5)
                        ).toFixed(0)}
                      </p>
                      <p className="text-xs text-green-300/70">
                        {selectedStakeDuration === 30
                          ? '1.2x'
                          : selectedStakeDuration === 90
                            ? '1.8x'
                            : '2.5x'}{' '}
                        multiplier
                      </p>
                    </div>
                    <p className="text-[10px] text-green-400/60 font-mono uppercase tracking-wider">Lock {selectedStakeDuration}d | Unlock & claim anytime after</p>
                  </div>
                )}

                <div className="flex gap -2">
                  <button
                    onClick={() => {
                      setSelectedStakeDuration(null);
                      setStakeAmount('');
                    }}
                    className="flex-1 h-10 rounded-lg border border-white/20 bg-transparent text-white font-semibold text-sm hover:bg-white/5 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={connected ? handleStake : () => connect()}
                    disabled={!connected || !stakeAmount || Number(stakeAmount) <= 0 || isStaking}
                    className="flex-1 h-10 rounded-lg border border-green-400/45 bg-green-500/25 text-green-100 font-semibold text-sm hover:bg-green-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {!connected ? 'Connect Wallet' : (isStaking ? 'Submitting...' : 'Stake Live')}
                  </button>
                </div>

                {stakeError && <p className="text-red-400 text-xs">{stakeError}</p>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Devnet Note */}
      <div className="flex-shrink-0 w-full rounded-lg border border-cyan-400/25 bg-cyan-500/10 p-4 space-y-2" style={{ contain: 'layout style' }}>
        <div className="flex items-start gap-2 w-full">
          <TrendingUp size={14} className="mt-0.5 text-cyan-400 shrink-0 flex-shrink-0" />
          <div className="space-y-1 text-xs text-cyan-300/80">
            <p className="font-semibold">Devnet Showcase</p>
            <p>
              This is a unified trading and onboarding hub. Buy ABRA, stake for multipliers, then execute RWA trades with Sophia AI guidance. Mainnet launch coming soon.
            </p>
          </div>
        </div>
      </div>

      {/* Spend ABRA Modal */}
      {showSpendAbra && location.pathname === '/app/trade' && <SpendAbra onClose={() => setShowSpendAbra(false)} />}
    </div>
    </RuneRealm>
  );
}
