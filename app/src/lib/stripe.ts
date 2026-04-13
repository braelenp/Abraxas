/**
 * Stripe Integration for ACH Deposits and Payouts
 * Handles real fiat payment processing through Stripe Financial Connections
 */

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';
const BACKEND_URL = import.meta.env.VITE_STRIPE_BACKEND_URL || 'http://localhost:3001';

export interface StripeDepositResult {
  success: boolean;
  sessionId?: string;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
}

export interface StripePayoutResult {
  success: boolean;
  payoutId?: string;
  bankAccountId?: string;
  error?: string;
}

export interface BankAccountToken {
  token: string;
  bankAccountId: string;
  last4: string;
}

/**
 * Initialize Stripe (lazy loaded when needed)
 */
let stripeInstance: any = null;

export async function initializeStripe() {
  if (stripeInstance) return stripeInstance;
  
  if (!STRIPE_PUBLIC_KEY) {
    throw new Error('Stripe public key is not configured. Set VITE_STRIPE_PUBLIC_KEY in .env');
  }

  const { Stripe } = await import('@stripe/stripe-js');
  stripeInstance = await Stripe(STRIPE_PUBLIC_KEY);
  return stripeInstance;
}

/**
 * Create a Payment Intent for ACH deposit
 * Calls the backend which creates the payment intent and returns the client secret
 */
export async function createAchDepositIntent(
  amountInCents: number,
  walletAddress: string,
  email?: string,
  name?: string
): Promise<StripeDepositResult> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/stripe/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountInCents,
        walletAddress,
        email,
        name,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      clientSecret: data.clientSecret,
      paymentIntentId: data.paymentIntentId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create deposit intent',
    };
  }
}

/**
 * Create a bank account token for future payouts
 * Calls the backend which creates a reusable token
 */
export async function setupBankAccount(
  bankAccountDetails: {
    accountHolderName: string;
    routingNumber: string;
    accountNumber: string;
  },
  walletAddress: string
): Promise<BankAccountToken | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/stripe/create-bank-account-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...bankAccountDetails,
        walletAddress,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to setup bank account:', error);
    return null;
  }
}

/**
 * Initiate a payout to a verified bank account
 * Payouts take 1-2 business days to arrive (standard) or up to 2 hours (instant)
 */
export async function initiateStripePayout(
  amountInCents: number,
  bankAccountToken: string,
  walletAddress: string,
  email?: string
): Promise<StripePayoutResult> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/stripe/create-payout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountInCents,
        bankAccountToken,
        walletAddress,
        email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      payoutId: data.payoutId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to initiate payout',
    };
  }
}

/**
 * Get transaction status
 * Retrieve the status of a payment intent or payout
 */
export async function getTransactionStatus(
  transactionId: string
): Promise<{ success: boolean; transaction?: any; error?: string }> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/transactions/${transactionId}`);

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}`,
      };
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get transaction status',
    };
  }
}


/**
 * Format amount as currency for display
 */
export function formatCurrency(amountInCents: number): string {
  return `$${(amountInCents / 100).toFixed(2)}`;
}

/**
 * Convert dollars to cents for Stripe API
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}
