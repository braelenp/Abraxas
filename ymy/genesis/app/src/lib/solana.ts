import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

export const NETWORK = 'devnet'
export const CONNECTION = new Connection(clusterApiUrl(NETWORK), 'confirmed')

export const PROGRAM_ID = new PublicKey('11111111111111111111111111111111')

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function lamportsToSol(lamports: number): number {
  return lamports / 1e9
}

export function solToLamports(sol: number): number {
  return Math.floor(sol * 1e9)
}

export function formatBalance(lamports: number): string {
  const sol = lamportsToSol(lamports)
  return sol.toFixed(4)
}

export async function getBalance(publicKey: PublicKey): Promise<number> {
  const balance = await CONNECTION.getBalance(publicKey)
  return balance
}
