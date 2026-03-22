/**
 * Off-ramp utilities for converting ABRA → USDC → Fiat
 * Integrates Ramp.network & Transak for seamless fiat conversion
 */

export interface OffRampConfig {
  userEmail?: string;
  userPhone?: string;
  amountUSDC?: number;
  paymentMethod?: 'apple-pay' | 'cash-app' | 'bank-transfer';
}

export interface OffRampStatus {
  status: 'pending' | 'success' | 'error';
  message: string;
  transactionId?: string;
  estimatedArrival?: string;
}

// Ramp.network configuration
const RAMP_API_KEY = import.meta.env.VITE_RAMP_API_KEY || 'sandbox';
const RAMP_HOST_API_KEY = import.meta.env.VITE_RAMP_HOST_API_KEY || 'sandbox';
const RAMP_BASE_URL = 'https://ramp.network';

// Transak configuration
const TRANSAK_API_KEY = import.meta.env.VITE_TRANSAK_API_KEY || 'test';
const TRANSAK_BASE_URL = 'https://transak.com';

/**
 * Generate Ramp.network off-ramp URL for USDC → Fiat conversion
 */
export function generateRampOffRampUrl(config: OffRampConfig): string {
  const params = new URLSearchParams({
    apiKey: RAMP_HOST_API_KEY,
    variant: 'mobile',
    // Payment method
    ...(config.paymentMethod && {
      defaultPaymentMethod: config.paymentMethod === 'apple-pay' ? 'APPLE_PAY' : 'CARD',
    }),
    // Amount
    ...(config.amountUSDC && {
      defaultFiatAmount: config.amountUSDC.toString(),
      defaultFiatCurrency: 'USD',
    }),
    // User info
    ...(config.userEmail && { userEmail: config.userEmail }),
    ...(config.userPhone && { userPhone: config.userPhone }),
    // Asset: USDC on Solana
    assetCode: 'USDC_SOL',
  });

  return `${RAMP_BASE_URL}?${params.toString()}`;
}

/**
 * Generate Transak off-ramp URL for USDC → Fiat conversion
 */
export function generateTransakOffRampUrl(config: OffRampConfig): string {
  const params = new URLSearchParams({
    apiKey: TRANSAK_API_KEY,
    network: 'solana',
    cryptoCurrency: 'USDC',
    isFiat: 'false',
    // Amount
    ...(config.amountUSDC && {
      cryptoAmount: config.amountUSDC.toString(),
    }),
    // User info
    ...(config.userEmail && { email: config.userEmail }),
    // Mode
    mode: 'sell',
  });

  return `${TRANSAK_BASE_URL}/?${params.toString()}`;
}

/**
 * Estimates fiat amount after USDC conversion
 */
export function estimateFiatAmount(usdcAmount: number, feePercentage: number = 1.5): number {
  // Subtract ~1.5% off-ramp fee (typical for most providers)
  return usdcAmount * (1 - feePercentage / 100);
}

/**
 * Opens off-ramp flow in new window/tab
 */
export function openOffRampFlow(url: string, provider: 'ramp' | 'transak'): void {
  if (typeof window === 'undefined') {
    console.error('Window not available');
    return;
  }

  const width = 600;
  const height = 800;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  window.open(
    url,
    `abraxas_offramp_${provider}`,
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
}

/**
 * Simulates off-ramp success flow (for demo/testing)
 */
export function simulateOffRampSuccess(amount: number): OffRampStatus {
  return {
    status: 'success',
    message: `$${estimateFiatAmount(amount).toFixed(2)} sent to your Cash App • Arriving in 1-2 business days`,
    transactionId: `OFFRAMP-${Date.now()}`,
    estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
  };
}

/**
 * Get off-ramp provider URL based on preference
 */
export function getOffRampUrl(config: OffRampConfig, provider: 'ramp' | 'transak' = 'ramp'): string {
  if (provider === 'transak') {
    return generateTransakOffRampUrl(config);
  }
  return generateRampOffRampUrl(config);
}

/**
 * Analytics tracking for off-ramp events
 */
export function trackOffRampEvent(
  eventName: 'started' | 'completed' | 'failed' | 'cancelled',
  data: { amount?: number; provider?: string; error?: string }
): void {
  const event = {
    timestamp: new Date().toISOString(),
    eventName: `offramp_${eventName}`,
    ...data,
  };

  // Log to console (can be replaced with real analytics service)
  console.log('[OffRamp Analytics]', event);

  // TODO: Send to analytics service
  // analytics.track(event);
}
