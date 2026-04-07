/**
 * Off-ramp utilities for converting ABRA → USDC → Fiat via Phantom Wallet
 * Uses Phantom's native off-ramp functionality - No API keys needed
 */

export interface OffRampConfig {
  amountUSDC?: number;
  paymentMethod?: 'apple-pay' | 'cash-app';
}

export interface OffRampStatus {
  status: 'pending' | 'success' | 'error';
  message: string;
  transactionId?: string;
  estimatedArrival?: string;
}

// Token addresses
const USDC_TOKEN_CA = 'EPjFWaLb3dScJwNmtppq5g5Lg6ieifqiGFC1t4UM5z1';

/**
 * Estimates fiat amount after USDC conversion
 * Typical off-ramp fee is ~1-2%
 */
export function estimateFiatAmount(usdcAmount: number, feePercentage: number = 1.5): number {
  return usdcAmount * (1 - feePercentage / 100);
}

/**
 * Open Phantom wallet's built-in off-ramp for USDC
 * This uses Phantom's native "Convert to Cash" feature
 */
export function openPhantomOffRamp(usdcAmount: number, paymentMethod: 'apple-pay' | 'cash-app'): void {
  if (typeof window === 'undefined') {
    console.error('Window not available');
    return;
  }

  // Check if Phantom is available
  const phantom = (window as any).phantom?.solana;
  
  if (!phantom) {
    // If Phantom not installed, direct to Phantom website
    window.open('https://phantom.app/', '_blank');
    return;
  }

  // Phantom's off-ramp is accessed through the wallet UI itself
  // We show instructions and the user completes the action in Phantom
  console.log(`Opening Phantom off-ramp for ${usdcAmount} USDC via ${paymentMethod}`);
  
  // In the UI, we'll show instructions:
  // 1. Open Phantom wallet
  // 2. Click on USDC token
  // 3. Tap "Sell" or "Convert to Cash"
  // 4. Select payment method (Apple Pay / Cash App)
  // 5. Complete KYC and transfer
}

/**
 * Check if Phantom wallet is installed and accessible
 */
export function isPhantomAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window as any).phantom?.solana;
}

/**
 * Get Phantom deeplink for off-ramp (if available)
 */
export function getPhantomOffRampDeeplink(usdcAmount: number): string {
  const params = new URLSearchParams({
    token: USDC_TOKEN_CA,
    amount: usdcAmount.toString(),
  });
  
  // Phantom deeplink format (if supported)
  return `phantom://offramp?${params.toString()}`;
}

/**
 * Show Phantom off-ramp instructions modal
 */
export function getPhantomOffRampInstructions(amount: number, method: 'apple-pay' | 'cash-app'): string {
  const fiatAmount = estimateFiatAmount(amount);
  return `
Open your Phantom wallet:
1. Tap the USDC token in your wallet
2. Press "Sell" or "Convert to Cash"
3. Enter amount: $${amount.toFixed(2)}
4. Select payment method: ${method === 'apple-pay' ? 'Apple Pay' : 'Cash App'}
5. Complete identity verification (KYC)
6. Confirm the transaction
7. Funds arrive in 1-2 business days (~$${fiatAmount.toFixed(2)})
  `.trim();
}

/**
 * Simulates off-ramp success for demo purposes
 */
export function simulateOffRampSuccess(amount: number, method: 'apple-pay' | 'cash-app'): OffRampStatus {
  const fiatAmount = estimateFiatAmount(amount);
  return {
    status: 'success',
    message: `$${fiatAmount.toFixed(2)} sent to your ${method === 'apple-pay' ? 'Apple Pay' : 'Cash App'} • Arriving in 1-2 business days`,
    transactionId: `PHANTOM-OFFRAMP-${Date.now()}`,
    estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
  };
}

/**
 * Analytics tracking for off-ramp events
 */
export function trackOffRampEvent(
  eventName: 'started' | 'completed' | 'failed' | 'cancelled',
  data: { amount?: number; method?: string; error?: string }
): void {
  const event = {
    timestamp: new Date().toISOString(),
    provider: 'phantom',
    eventName: `offramp_${eventName}`,
    ...data,
  };

  console.log('[OffRamp Analytics]', event);
}
