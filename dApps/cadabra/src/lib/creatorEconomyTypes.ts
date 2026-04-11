/**
 * Creator Economy Module Types
 * TikTok Fee Sharing integration for Pulse/Cadabra
 */

export interface TikTokCreator {
  username: string;           // TikTok username (without @)
  walletAddress: string;      // Creator's Solana wallet
  displayName: string;        // Display name
  avatar: string;             // Avatar URL or emoji
  followers: number;          // TikTok followers
  verified: boolean;          // TikTok verified status
  joinedAt: number;           // Timestamp when creator joined
}

export interface CreatorCoin {
  id: string;                 // Unique coin ID
  symbol: string;             // Ticker (e.g., LUNA)
  name: string;               // Full name (e.g., Luna's Creator Coin)
  creatorUsername: string;    // Associated TikTok creator
  mintAddress: string;        // SPL Token mint address
  supply: number;             // Total supply
  decimals: number;           // Token decimals
  launchedAt: number;         // Launch timestamp
  description: string;        // Coin description
  imageUrl: string;           // Coin image/logo
}

export interface FeeShare {
  viewFees: number;           // Royalties from view rewards
  tipFees: number;            // Royalties from tips
  donationFees: number;       // Royalties from donations
  nftSales: number;           // Royalties from NFT/clip sales
  tokenTrades: number;        // Royalties from coin trades
  totalEarned: number;        // Total earned
}

export interface RoyaltySplit {
  creatorShare: number;       // Creator percentage (default 70%)
  holderShare: number;        // Coin holder percentage (20%)
  platformShare: number;      // Abraxas platform (5%)
  bagsShare: number;          // Bags protocol (5%)
}

export interface CreatorMetrics {
  coinAddress: string;
  creator: TikTokCreator;
  coin: CreatorCoin;
  feeShare: FeeShare;
  royaltySplit: RoyaltySplit;
  holders: number;
  marketCap: number;          // Market cap in ABRA
  price: number;              // Current price per token
  volume24h: number;          // 24h trading volume
  lastUpdated: number;        // Last update timestamp
}

export interface TokenizedClip {
  id: string;
  creatorUsername: string;
  clipUrl: string;            // TikTok clip URL
  title: string;
  description: string;
  thumbnail: string;
  nftMinted: boolean;
  nftAddress?: string;        // La Casa NFT address
  views: number;
  likes: number;
  shares: number;
  earnings: number;           // ABRA earned from clip
  earnedAt: number;           // Timestamp
}

export interface CreatorEconomyDashboardData {
  creator: TikTokCreator;
  coins: CreatorCoin[];
  totalEarnings: number;      // Total ABRA earned
  totalClips: number;
  tokenizedClips: TokenizedClip[];
  recentTransactions: CreatorTransaction[];
  analytics: CreatorAnalytics;
}

export interface CreatorTransaction {
  id: string;
  type: 'view_reward' | 'tip' | 'donation' | 'nft_sale' | 'token_trade' | 'claim';
  amount: number;             // Amount in ABRA
  creatorShare: number;       // Creator's share
  description: string;
  timestamp: number;
  transactionHash: string;    // Solana TX hash
}

export interface CreatorAnalytics {
  totalViews: number;         // Aggregate TikTok views
  totalTips: number;          // Aggregate tips received
  totalDonations: number;     // Aggregate donations
  topPerformingClip?: TokenizedClip;
  averageEarningsPerClip: number;
  growthRate24h: number;      // Percentage growth
  totalHolders: number;       // Unique coin holders
}

export interface CreatorCoinLaunchRequest {
  tiktokUsername: string;
  walletAddress: string;
  coinSymbol: string;
  coinName: string;
  description: string;
  imageUrl?: string;
  initialSupply: number;      // In coin units (not decimal-adjusted)
}

export interface FeeShareResult {
  transactionId: string;
  fromAccount: string;
  toAccounts: {
    creator: { address: string; amount: number };
    holders: { address: string; amount: number };
    platform: { address: string; amount: number };
    bags: { address: string; amount: number };
  };
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}
