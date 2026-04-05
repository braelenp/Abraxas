import { clusterApiUrl } from '@solana/web3.js';

// Cadabra Token Configuration (Mainnet)
export const CADABRA_TOKEN_MINT = 'Bq3z2UMzeZSfJ8BjYBLNTprZQoXbFx48W2YxikyNpGmx';
export const MINIMUM_TOKENS_FOR_ACCESS = 1; // Adjust threshold as needed

// RPC Configuration
const customRpc = import.meta.env.VITE_SOLANA_RPC_URL;
export const RPC_ENDPOINT = customRpc || clusterApiUrl('mainnet-beta');

// Cluster
export const CLUSTER = 'mainnet-beta' as const;

export const TOKEN_DECIMALS = 6; // Standard SPL token decimals
