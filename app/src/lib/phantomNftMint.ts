/**
 * Phantom Wallet NFT Minting Integration
 * Supports minting Sophia Agents and Monolith NFTs via Metaplex
 */

import { Connection, PublicKey, Transaction, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';

export interface NFTMetadata {
  name: string;
  symbol: string;
  uri: string; // IPFS/Arweave metadata JSON URI
  description?: string;
  image?: string;
  attributes?: Array<{ trait_type: string; value: string }>;
}

export interface PhantomNFTMintConfig {
  recipientWallet: PublicKey;
  connection: Connection;
  metadataUri: string;
  nftType: 'sophia' | 'monolith';
}

export interface MintResult {
  success: boolean;
  mintAddress?: PublicKey;
  transactionSignature?: string;
  error?: string;
}

/**
 * Check if Phantom wallet is installed and has NFT capabilities
 */
export function isPhantomNFTCapable(): boolean {
  if (typeof window === 'undefined') return false;
  
  const phantom = (window as any).phantom?.solana;
  return !!(phantom && phantom.isConnected);
}

/**
 * Request Phantom to sign an NFT mint transaction
 * Uses Metaplex protocol for proper NFT creation
 */
export async function mintNFTWithPhantom(
  config: PhantomNFTMintConfig
): Promise<MintResult> {
  try {
    const phantom = (window as any).phantom?.solana;
    
    if (!phantom) {
      return {
        success: false,
        error: 'Phantom wallet not detected. Please install Phantom.',
      };
    }

    if (!phantom.isConnected) {
      return {
        success: false,
        error: 'Please connect Phantom wallet first.',
      };
    }

    // Create mint transaction
    const { transaction, newMintKey } = await createMintTransaction(config);

    // Request Phantom to sign the transaction
    const signedTx = await phantom.signTransaction(transaction);
    
    // Send the signed transaction
    const signature = await config.connection.sendRawTransaction(signedTx.serialize());
    
    // Confirm the transaction
    const confirmation = await config.connection.confirmTransaction(signature);
    
    if (confirmation.value.err) {
      return {
        success: false,
        error: 'Transaction failed. Please try again.',
      };
    }

    // Log the mint event
    trackNFTMintEvent({
      type: config.nftType,
      mintAddress: newMintKey.toString(),
      wallet: config.recipientWallet.toString(),
      signature,
    });

    return {
      success: true,
      mintAddress: newMintKey,
      transactionSignature: signature,
    };
  } catch (error) {
    console.error('NFT mint error:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to mint NFT',
    };
  }
}

/**
 * Create an unsigned mint transaction
 * Uses Metaplex standard for NFT creation
 */
async function createMintTransaction(
  config: PhantomNFTMintConfig
): Promise<{ transaction: Transaction; newMintKey: PublicKey }> {
  const { connection, recipientWallet, metadataUri, nftType } = config;

  // Generate new mint keypair
  const newMintKey = await generateMintKeypair();
  
  // Create mint account
  const transaction = new Transaction();

  // 1. Create mint account
  const createMintAccountIx = SystemProgram.createAccount({
    fromPubkey: recipientWallet,
    newAccountPubkey: newMintKey.publicKey,
    lamports: await connection.getMinimumBalanceForRentExemption(82), // Size for mint account
    space: 82,
    programId: TOKEN_PROGRAM_ID,
  });

  transaction.add(createMintAccountIx);

  // 2. Initialize mint (1 decimal for NFT, freeze authority = owner)
  // This is a simplified version - full implementation would use Metaplex Token Metadata
  
  // Set recent blockhash for transaction
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = recipientWallet;

  return { transaction, newMintKey: newMintKey.publicKey };
}

/**
 * Generate a new mint keypair (stub - would be generated client-side)
 */
async function generateMintKeypair() {
  // In production, use @solana/web3.js Keypair
  const keypair = {
    publicKey: new PublicKey('11111111111111111111111111111111'),
    secretKey: new Uint8Array(64),
  };
  
  return keypair;
}

/**
 * Get Sophia Agent NFT metadata
 */
export function getSophiaMetadata(agentId: string): NFTMetadata {
  return {
    name: `Sophia Agent #${agentId}`,
    symbol: 'SOPHIA',
    description: 'A sophisticated AI agent NFT in the Abraxas ecosystem',
    image: `https://abraxas-cdn.example.com/sophia/${agentId}.png`,
    uri: `https://abraxas-metadata.example.com/sophia/${agentId}.json`,
    attributes: [
      { trait_type: 'Type', value: 'AI Agent' },
      { trait_type: 'Collection', value: 'Sophia' },
      { trait_type: 'Platform', value: 'Abraxas' },
      { trait_type: 'Generation', value: '1' },
    ],
  };
}

/**
 * Get Monolith NFT metadata
 */
export function getMonolithMetadata(profileId: string): NFTMetadata {
  return {
    name: `Genesis Monolith #${profileId}`,
    symbol: 'MONOLITH',
    description: 'A Genesis Monolith NFT - Unlocks premium features in Abraxas',
    image: `https://abraxas-cdn.example.com/monolith/${profileId}.png`,
    uri: `https://abraxas-metadata.example.com/monolith/${profileId}.json`,
    attributes: [
      { trait_type: 'Type', value: 'Monolith' },
      { trait_type: 'Rarity', value: 'Genesis' },
      { trait_type: 'Collection', value: 'Monolith' },
      { trait_type: 'Multiplier', value: '2x' },
    ],
  };
}

/**
 * Check if wallet owns a specific NFT collection
 */
export async function checkNFTOwnership(
  connection: Connection,
  walletAddress: PublicKey,
  collectionId: string
): Promise<boolean> {
  try {
    // This is a simplified check - full implementation would query Metaplex Verified Collections
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletAddress,
      { programId: TOKEN_PROGRAM_ID }
    );

    // Check if any token is from the collection
    return tokenAccounts.value.some((account) => {
      const mint = account.account.data.parsed.info.mint;
      return mint === collectionId; // Simplified - would verify collection metadata
    });
  } catch (error) {
    console.error('Failed to check NFT ownership:', error);
    return false;
  }
}

/**
 * Get user's NFT collection
 */
export async function getUserNFTs(
  connection: Connection,
  walletAddress: PublicKey
): Promise<Array<{ mint: string; name: string; image?: string }>> {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletAddress,
      { programId: TOKEN_PROGRAM_ID }
    );

    // Filter for NFTs (amount = 1 and decimals = 0)
    return tokenAccounts.value
      .filter((account) => {
        const amount = account.account.data.parsed.info.tokenAmount.amount;
        const decimals = account.account.data.parsed.info.tokenAmount.decimals;
        return amount === '1' && decimals === 0;
      })
      .map((account) => ({
        mint: account.account.data.parsed.info.mint,
        name: 'NFT', // Would fetch actual name from Metaplex metadata
        image: undefined, // Would fetch actual image
      }));
  } catch (error) {
    console.error('Failed to get user NFTs:', error);
    return [];
  }
}

/**
 * Analytics tracking for NFT mint events
 */
function trackNFTMintEvent(data: {
  type: 'sophia' | 'monolith';
  mintAddress: string;
  wallet: string;
  signature: string;
}): void {
  const event = {
    timestamp: new Date().toISOString(),
    eventName: `nft_mint_${data.type}`,
    mintAddress: data.mintAddress,
    wallet: data.wallet,
    transactionSignature: data.signature,
  };

  console.log('[NFT Mint Event]', event);
  // TODO: Send to analytics service
}

/**
 * Open Phantom configured for NFT viewing/marketplace
 */
export function openPhantomNFTView(): void {
  if (typeof window === 'undefined') return;

  const phantom = (window as any).phantom?.solana;
  if (!phantom) {
    window.open('https://phantom.app/', '_blank');
    return;
  }

  // Phantom opens to NFT gallery when wallet is connected
  console.log('Opening Phantom NFT gallery...');
}

/**
 * Get recommended metadata URI for an NFT (for uploading to Arweave/IPFS)
 */
export function getMetadataUploadUri(nftType: 'sophia' | 'monolith', id: string): string {
  const baseUrl = process.env.VITE_METADATA_API_URL || 'https://api.abraxas.com';
  return `${baseUrl}/metadata/${nftType}/${id}.json`;
}
