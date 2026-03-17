import { clusterApiUrl, PublicKey } from '@solana/web3.js';

const PROGRAM_ID_PLACEHOLDER = 'YOUR_PROGRAM_ID_HERE';
const PROGRAM_ID_STORAGE_KEY = 'abraxasProgramId';

export const ABRAXAS_PROGRAM_ID_RAW = (import.meta.env.VITE_ABRAXAS_PROGRAM_ID ?? PROGRAM_ID_PLACEHOLDER).trim();
export const SOLANA_CLUSTER = 'devnet';
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_CLUSTER);

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
