import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js';

const JUPITER_API_BASE = 'https://quote-api.jup.ag/v6';

/**
 * Get the Helius RPC endpoint if configured, otherwise use the default.
 * This ensures Jupiter swap transactions use optimized RPC infrastructure.
 * 
 * Configuration via environment variable:
 * - VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
 */
export function getHeliusRpcEndpoint(): string | null {
  const rpcUrl = import.meta.env.VITE_SOLANA_RPC_URL?.trim();
  if (rpcUrl && rpcUrl.includes('helius')) {
    return rpcUrl;
  }
  return null;
}

export interface JupiterQuote {
  inputMint: string;
  outputMint: string;
  inputAmount: string;
  outputAmount: string;
  outAmount: string;
  priceImpactPct: string;
  marketInfos: Array<{
    id: string;
    label: string;
    inputMint: string;
    outputMint: string;
    notEnoughLiquidity: boolean;
    inAmount: string;
    outAmount: string;
    minOutAmount: string;
    priceImpactPct: string;
    lpFee: {
      amount: string;
      mint: string;
      pct: string;
    };
    platformFee: {
      amount: string;
      mint: string;
      pct: string;
    };
  }>;
}

export interface JupiterSwapResponse {
  swapTransaction: string;
  lastValidBlockHeight: number;
  prioritizationFeeLamports: number;
}

/**
 * Fetch a quote from Jupiter API
 */
export async function getJupiterQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps: number = 50, // 0.5% slippage
  decimals: number = 6 // Default to 6 decimals (most Solana tokens)
): Promise<JupiterQuote | null> {
  try {
    const amountInSmallestUnits = Math.floor(amount * 10 ** decimals); // Convert using actual decimals
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount: amountInSmallestUnits.toString(),
      slippageBps: slippageBps.toString(),
      onlyDirectRoutes: 'false',
    });

    console.log('Fetching Jupiter quote with params:', {
      inputMint,
      outputMint,
      amount,
      amountInSmallestUnits,
      slippageBps,
    });

    const url = `${JUPITER_API_BASE}/quote?${params}`;
    console.log('Quote URL:', url);
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Jupiter quote HTTP error:', response.status, response.statusText);
      console.error('Response body:', errorText);
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Unexpected response type:', contentType);
      return null;
    }

    const data = (await response.json()) as JupiterQuote;
    console.log('Jupiter quote received:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch Jupiter quote:', error);
    return null;
  }
}

/**
 * Get a swap transaction from Jupiter
 */
export async function getJupiterSwapTransaction(
  userPublicKey: string,
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps: number = 50
): Promise<JupiterSwapResponse | null> {
  try {
    console.log('Getting Jupiter swap transaction for:', {
      userPublicKey,
      inputMint,
      outputMint,
      amount,
      slippageBps,
    });

    // First get the quote
    const quote = await getJupiterQuote(inputMint, outputMint, amount, slippageBps);
    if (!quote) {
      console.error('Failed to get quote for swap');
      return null;
    }

    console.log('Got quote, requesting swap transaction...');

    // Request swap transaction
    const response = await fetch(`${JUPITER_API_BASE}/swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey,
        wrapAndUnwrapSol: true,
        prioritizationFeeLamports: 'auto',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Jupiter swap error:', response.statusText, errorText);
      return null;
    }

    const data = (await response.json()) as JupiterSwapResponse;
    console.log('Jupiter swap transaction received');
    return data;
  } catch (error) {
    console.error('Failed to get Jupiter swap transaction:', error);
    return null;
  }
}

/**
 * Execute a swap transaction with the wallet's sendTransaction method
 */
export async function executeSwap(
  connection: Connection,
  swapTransaction: string,
  sendTransaction: any // Flexible type to accept wallet adapter's sendTransaction
): Promise<string | null> {
  try {
    const buf = Buffer.from(swapTransaction, 'base64');
    const transaction = VersionedTransaction.deserialize(buf);

    // Call sendTransaction - some adapters require connection, some don't
    let signature: string;
    try {
      signature = await sendTransaction(transaction, connection);
    } catch (e) {
      // Fallback: try without connection parameter
      signature = await sendTransaction(transaction);
    }
    
    console.log(`Swap sent with signature: ${signature}`);

    // Wait for confirmation
    const latestBlockhash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: signature,
    });

    return signature;
  } catch (error) {
    console.error('Failed to execute swap:', error);
    return null;
  }
}

/**
 * Calculate output amount from a quote (in decimal format)
 */
export function calculateOutputAmount(quote: JupiterQuote, decimals: number = 6): number {
  return Number(quote.outAmount) / 10 ** decimals;
}

/**
 * Format price impact percentage
 */
export function formatPriceImpact(quote: JupiterQuote): string {
  const impact = parseFloat(quote.priceImpactPct);
  if (impact > 5) {
    return `${impact.toFixed(2)}% ⚠️`;
  }
  return `${impact.toFixed(2)}%`;
}
