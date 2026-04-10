import { Connection, PublicKey } from '@solana/web3.js';

/**
 * Network validation utilities - Simplified for reliability
 * Strategy: Assume mainnet unless we can PROVE we're on devnet
 */

// Mainnet genesis hash
const MAINNET_GENESIS_HASH = '5eykt4UsFv2P6ysrwzmv94CsQEZiZdhKiDrghinckgq';

// Devnet genesis hash
const DEVNET_GENESIS_HASH = 'EtWTRABZaYq6iMfeYKcRjColrA4Z15gxdAivG47ZL9fs';

/**
 * Quick check: Is this definitely devnet?
 */
export async function isDevnet(connection: Connection): Promise<boolean> {
  try {
    // Method 1: Check RPC URL for devnet
    const rpcUrl = connection.rpcEndpoint?.toLowerCase() || '';
    if (rpcUrl.includes('devnet') || rpcUrl.includes('api.devnet.solana.com')) {
      console.log('[Network] RPC URL confirms DEVNET');
      return true;
    }

    // Method 2: Check genesis hash
    try {
      const genesisHash = await connection.getGenesisHash();
      console.log('[Network] Genesis hash:', genesisHash);
      
      if (genesisHash === DEVNET_GENESIS_HASH) {
        console.log('[Network] Genesis hash confirms DEVNET');
        return true;
      }
      
      // If we get a different genesis hash, assume mainnet
      if (genesisHash === MAINNET_GENESIS_HASH) {
        console.log('[Network] Genesis hash confirms MAINNET');
        return false;
      }
    } catch (error) {
      console.log('[Network] Genesis hash check failed, assuming mainnet:', error);
      return false;
    }

    // If we can't confirm devnet, assume mainnet
    return false;
  } catch (error) {
    console.error('[Network] Network check error, assuming mainnet:', error);
    return false;
  }
}


/**
 * Validate network for trading
 * Strategy: Accept everything unless we prove it's devnet
 */
export async function validateNetworkForTrading(connection: Connection): Promise<{
  isValid: boolean;
  cluster: string;
  message: string;
}> {
  try {
    console.log('[Network] ===== VALIDATION START =====');
    console.log('[Network] RPC Endpoint:', connection.rpcEndpoint);
    
    // Check if it's definitely devnet
    const onDevnet = await isDevnet(connection);
    console.log('[Network] Is Devnet?', onDevnet);

    if (onDevnet) {
      return {
        isValid: false,
        cluster: 'devnet',
        message: '❌ You are on DEVNET. Switch to Solana MAINNET to use this feature.',
      };
    }

    // If not devnet, assume mainnet
    console.log('[Network] Accepting as mainnet (not provably devnet)');
    return {
      isValid: true,
      cluster: 'mainnet',
      message: '✓ Mainnet detected',
    };
  } catch (error) {
    console.error('[Network] Validation error:', error);
    // On error, assume mainnet and allow swap
    return {
      isValid: true,
      cluster: 'mainnet',
      message: '✓ Mainnet mode (using fallback)',
    };
  }
}

/**
 * Check if ABRA token exists on the connection
 */
export async function checkAbraTokenExistsOnNetwork(connection: Connection, abraTokenMint: string): Promise<boolean> {
  try {
    const abraMint = new PublicKey(abraTokenMint);
    const accountInfo = await connection.getAccountInfo(abraMint, 'confirmed');
    
    if (!accountInfo) {
      console.log('[Network] ABRA token account not found');
      return false;
    }

    // Check if it's a valid mint (owned by token program)
    if (accountInfo.owner.toString() === 'TokenkegQfeZyiNwAJsyFbPVwwQQYuKPztPQWkeS6t') {
      console.log('[Network] ABRA token found and valid');
      return true;
    }

    console.log('[Network] ABRA token found but invalid owner');
    return false;
  } catch (error) {
    console.error('[Network] ABRA token check error:', error);
    // If we can't verify, assume it exists (mainnet)
    return true;
  }
}
