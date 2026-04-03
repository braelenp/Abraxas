import { PublicKey } from '@solana/web3.js'
import { BN } from '@coral-xyz/anchor'

export interface UserAccount {
  authority: PublicKey
  balance: BN
  tradeCount: BN
  depositCount: BN
  initialized: boolean
  bump: number
}

export interface Vault {
  authority: PublicKey
  totalDeposits: BN
  totalWithdrawals: BN
  bump: number
}

export interface TradeParams {
  amount: BN
  slippage: number
  direction: 'buy' | 'sell'
}

export interface AppState {
  isInitialized: boolean
  userAccount: UserAccount | null
  vault: Vault | null
}

export interface TokenInfo {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

export interface Transaction {
  signature: string
  type: 'trade' | 'deposit' | 'withdraw' | 'initialize'
  amount: number
  timestamp: number
  status: 'confirmed' | 'pending' | 'failed'
}
