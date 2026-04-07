/**
 * ABRA Price Fetcher
 * Fetches real-time ABRA price from Jupiter API
 */

const ABRA_TOKEN_CA = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const USDC_TOKEN_CA = 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1';

const PRICE_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cachedPrice: { price: number; timestamp: number } | null = null;

/**
 * Fetch ABRA price in USD from Jupiter API
 * @returns Price of 1 ABRA in USD
 */
export async function fetchAbraPrice(): Promise<number> {
  // Check cache first
  if (cachedPrice && Date.now() - cachedPrice.timestamp < PRICE_CACHE_DURATION) {
    return cachedPrice.price;
  }

  try {
    // Jupiter's price API V4 endpoint
    const response = await fetch(
      `https://price.jup.ag/v4/price?ids=${ABRA_TOKEN_CA}&showExtraInfo=true`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Jupiter API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.data && data.data[ABRA_TOKEN_CA]) {
      const price = data.data[ABRA_TOKEN_CA].price || 0;
      
      // Cache the price
      cachedPrice = { price, timestamp: Date.now() };
      return price;
    }
    
    return 0;
  } catch (error) {
    console.error('Error fetching ABRA price:', error);
    // Fallback to $1 if price fetch fails
    return 1;
  }
}

/**
 * Convert ABRA amount to USD
 * @param abraAmount Amount in ABRA
 * @returns Amount in USD
 */
export async function convertAbraToUsd(abraAmount: number): Promise<number> {
  const price = await fetchAbraPrice();
  return abraAmount * price;
}

/**
 * Format ABRA amount as USD string
 * @param abraAmount Amount in ABRA
 * @returns Formatted USD string (e.g., "$1,234.56")
 */
export async function formatAbraAsUsd(abraAmount: number): Promise<string> {
  const usdAmount = await convertAbraToUsd(abraAmount);
  return `$${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Get cached price without fetching (useful for immediate display)
 * @returns Cached price or 1 if not available
 */
export function getCachedAbraPrice(): number {
  return cachedPrice?.price ?? 1;
}

/**
 * Clear price cache
 */
export function clearPriceCache(): void {
  cachedPrice = null;
}
