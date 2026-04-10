import { Connection, PublicKey } from '@solana/web3.js';

/**
 * Network validation utilities to ensure wallet and RPC are on the correct cluster
 */

const MAINNET_VALIDATOR_ADDRESSES = [
  '11111111111111111111111111111111', // System program (exists on all chains)
];

// Well-known mainnet tokens that only exist on mainnet
const MAINNET_MARKER_TOKENS = [
  'EPjFWaLb3odccccccccccccccccccccccccccPwr2ugEp', // USDC
  'Es9vMFrzaCsRJ7D6BB4NBeauYHS8ubYADQQ4nAmRtbj', // USDT
  '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS', // ABRA (mainnet only)
];

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
    const accountInfo = await connection.getAccountInfo(usdcMint);
    
    // Check if account exists and owner is the Token Program
    if (accountInfo && accountInfo.owner.toString() === 'TokenkegQfeZyiNwAJsyFbPVwwQQYuKPztPQWkeS6t') {
      console.log('[Network] Found USDC token on connection - appears to be mainnet');
      return true;
    }
    return false;
  } catch (error) {
    console.error('[Network] USDC check failed (likely devnet):', error);
    return false;
  }
}

/**
 * Get the current cluster by attempting to fetch known tokens
 */
export async function detectCluster(connection: Connection): Promise<'mainnet' | 'devnet' | 'unknown'> {
  try {
    // Try mainnet USDC
    const usdcMint = new PublicKey('EPjFWaLb3odccccccccccccccccccccccccccPwr2ugEp');
    
    try {
      const accountInfo = await connection.getAccountInfo(usdcMint);
      if (accountInfo && accountInfo.owner.toString() === 'TokenkegQfeZyiNwAJsyFbPVwwQQYuKPztPQWkeS6t') {
        console.log('[Network] Detected cluster: mainnet-beta');
        return 'mainnet';
      }
    } catch {
      // If USDC doesn't exist, we're on devnet
      console.log('[Network] Detected cluster: devnet (USDC not found)');
      return 'devnet';
    }

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
    const cluster = await detectCluster(connection);

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
      return {
        isValid: false,
        cluster: 'unknown',
        message: '⚠️ Unable to detect network. Please check your RPC endpoint.',
      };
    }
  } catch (error) {
    return {
      isValid: false,
      cluster: 'unknown',
      message: `❌ Network validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
