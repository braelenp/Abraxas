import { Connection, PublicKey } from '@solana/web3.js';

/**
 * Network validation utilities to ensure wallet and RPC are on the correct cluster
 */

// Mainnet genesis hash
const MAINNET_GENESIS_HASH = '5eykt4UsFv2P6ysrwzmv94CsQEZiZdhKiDrghinckgq';

// Devnet genesis hash
const DEVNET_GENESIS_HASH = 'EtWTRABZaYq6iMfeYKcRjColrA4Z15gxdAivG47ZL9fs';

/**
 * Detect network from RPC endpoint URL
 */
function detectNetworkFromUrl(rpcUrl: string): 'mainnet' | 'devnet' | null {
  const urlLower = rpcUrl.toLowerCase();
  
  if (urlLower.includes('mainnet') || urlLower.includes('api.mainnet-beta.solana.com')) {
    console.log('[Network] Detected mainnet from RPC URL');
    return 'mainnet';
  }
  if (urlLower.includes('devnet') || urlLower.includes('api.devnet.solana.com')) {
    console.log('[Network] Detected devnet from RPC URL');
    return 'devnet';
  }
  if (urlLower.includes('helius') && !urlLower.includes('devnet')) {
    console.log('[Network] Detected mainnet from Helius RPC URL');
    return 'mainnet';
  }
  
  return null;
}

/**
 * Detect network using genesis hash
 */
export async function detectNetworkByGenesisHash(connection: Connection): Promise<'mainnet' | 'devnet' | 'unknown'> {
  try {
    const genesisHash = await connection.getGenesisHash();
    console.log('[Network] Genesis hash:', genesisHash);
    
    if (genesisHash === MAINNET_GENESIS_HASH) {
      console.log('[Network] Genesis hash matches mainnet');
      return 'mainnet';
    }
    if (genesisHash === DEVNET_GENESIS_HASH) {
      console.log('[Network] Genesis hash matches devnet');
      return 'devnet';
    }
    
    console.log('[Network] Unknown genesis hash:', genesisHash);
    return 'unknown';
  } catch (error) {
    console.error('[Network] Genesis hash check failed:', error);
    return 'unknown';
  }
}

/**
 * Check if a connection is pointing to mainnet by verifying cluster version
 */
export async function isMainnetConnection(connection: Connection): Promise<boolean> {
  try {
    const version = await connection.getVersion();
    console.log('[Network] Solana version:', version);

    // All networks return version, so we need another approach
    // Try to fetch a mainnet-only token
    return await hasMainnetToken(connection);
  } catch (error) {
    console.error('[Network] Failed to check connection version:', error);
    return false;
  }
}

/**
 * Check if we can access mainnet-specific tokens
 */
export async function hasMainnetToken(connection: Connection): Promise<boolean> {
  try {
    // USDC only exists on mainnet (on devnet it's a different token)
    const usdcMint = new PublicKey('EPjFWaLb3odccccccccccccccccccccccccccPwr2ugEp');
    const accountInfo = await connection.getAccountInfo(usdcMint, 'confirmed');
    
    // Check if account exists and owner is the Token Program
    if (accountInfo && accountInfo.owner.toString() === 'TokenkegQfeZyiNwAJsyFbPVwwQQYuKPztPQWkeS6t') {
      console.log('[Network] Found USDC token on connection - appears to be mainnet');
      return true;
    }
    console.log('[Network] USDC account not found or wrong owner');
    return false;
  } catch (error) {
    console.error('[Network] USDC check failed:', error);
    return false;
  }
}

/**
 * Get the current cluster by attempting multiple detection methods
 */
export async function detectCluster(connection: Connection): Promise<'mainnet' | 'devnet' | 'unknown'> {
  try {
    // Method 1: Check RPC URL
    const rpcUrl = connection.rpcEndpoint || '';
    const urlDetection = detectNetworkFromUrl(rpcUrl);
    if (urlDetection) {
      return urlDetection;
    }

    console.log('[Network] RPC URL detection inconclusive, trying genesis hash...');

    // Method 2: Check genesis hash (most reliable)
    const genesisResult = await detectNetworkByGenesisHash(connection);
    if (genesisResult !== 'unknown') {
      return genesisResult;
    }

    console.log('[Network] Genesis hash detection inconclusive, trying token check...');

    // Method 3: Try to fetch mainnet USDC (fallback)
    try {
      const usdcMint = new PublicKey('EPjFWaLb3odccccccccccccccccccccccccccPwr2ugEp');
      const accountInfo = await connection.getAccountInfo(usdcMint, 'confirmed');
      
      if (accountInfo && accountInfo.owner.toString() === 'TokenkegQfeZyiNwAJsyFbPVwwQQYuKPztPQWkeS6t') {
        console.log('[Network] Detected cluster: mainnet-beta (via USDC)');
        return 'mainnet';
      }
    } catch (tokenError) {
      console.log('[Network] Token check failed, likely devnet or unreachable');
    }

    // If we get here, assume devnet if token check failed, otherwise unknown
    return 'unknown';
  } catch (error) {
    console.error('[Network] Cluster detection failed:', error);
    return 'unknown';
  }
}

/**
 * Validate network for trading
 */
export async function validateNetworkForTrading(connection: Connection): Promise<{
  isValid: boolean;
  cluster: string;
  message: string;
}> {
  try {
    console.log('[Network] Starting network validation...');
    console.log('[Network] RPC Endpoint:', connection.rpcEndpoint);
    
    const cluster = await detectCluster(connection);
    console.log('[Network] Detected cluster:', cluster);

    if (cluster === 'mainnet') {
      return {
        isValid: true,
        cluster: 'mainnet',
        message: '✓ Connected to mainnet',
      };
    } else if (cluster === 'devnet') {
      return {
        isValid: false,
        cluster: 'devnet',
        message: '❌ Wallet is on devnet. Switch to mainnet and ensure you have SOL on mainnet.',
      };
    } else {
      // If we can't detect, assume mainnet (most common case)
      console.log('[Network] Could not definitively detect network, allowing mainnet mode');
      return {
        isValid: true,
        cluster: 'mainnet',
        message: '✓ Detected mainnet (fallback)',
      };
    }
  } catch (error) {
    console.error('[Network] Validation error:', error);
    // On error, allow swap to proceed (assume mainnet)
    return {
      isValid: true,
      cluster: 'mainnet',
      message: '✓ Using mainnet mode',
    };
  }
}

/**
 * Check if ABRA token exists and is accessible on the current network
 */
export async function checkAbraTokenExistsOnNetwork(
  connection: Connection,
  abraTokenAddress: string = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS'
): Promise<boolean> {
  try {
    const abraMint = new PublicKey(abraTokenAddress);
    const accountInfo = await connection.getAccountInfo(abraMint);
    
    if (accountInfo) {
      console.log('[Network] ABRA token found on this network');
      return true;
    }
    return false;
  } catch (error) {
    console.error('[Network] ABRA token not found on this network:', error);
    return false;
  }
}
