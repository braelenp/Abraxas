import { clusterApiUrl, PublicKey } from '@solana/web3.js';

const PROGRAM_ID_PLACEHOLDER = 'GBcDay9fAqn6WPCBVRkkar3VXgKS2MRozH3tWcG2SZXm';
const PROGRAM_ID_STORAGE_KEY = 'abraxasProgramId';

export const ABRAXAS_PROGRAM_ID_RAW = (import.meta.env.VITE_ABRAXAS_PROGRAM_ID ?? PROGRAM_ID_PLACEHOLDER).trim();
export const SOLANA_CLUSTER = 'devnet';
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_CLUSTER);

// ── Token Configuration ──────────────────────────────────────────────────────
// ABRA token mint addresses per cluster
// Mainnet: Official production ABRA token
// Devnet: Deploy ABRA token to devnet or configure via env var VITE_ABRA_TOKEN_MINT_DEVNET
const ABRA_TOKEN_MINT_MAINNET = '5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS';
const ABRA_TOKEN_MINT_DEVNET = (import.meta.env.VITE_ABRA_TOKEN_MINT_DEVNET ?? '').trim();

// Use mainnet ABRA by default, or devnet override if configured
export const ABRA_TOKEN_MINT = ABRA_TOKEN_MINT_DEVNET || ABRA_TOKEN_MINT_MAINNET;

// Minimum $ABRA holdings required to access the dApp during hackathon period
export const MINIMUM_ABRA_FOR_ACCESS = 10;

export function getProgramIdRaw(): string {
  if (typeof window !== 'undefined') {
    const override = localStorage.getItem(PROGRAM_ID_STORAGE_KEY)?.trim();
    if (override) {
      return override;
    }
  }

  return ABRAXAS_PROGRAM_ID_RAW;
}

export function setProgramIdOverride(value: string | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!value || value.trim().length === 0) {
    localStorage.removeItem(PROGRAM_ID_STORAGE_KEY);
    return;
  }

  localStorage.setItem(PROGRAM_ID_STORAGE_KEY, value.trim());
}

export function getProgramId(): PublicKey | null {
  try {
    return new PublicKey(getProgramIdRaw());
  } catch {
    return null;
  }
}
