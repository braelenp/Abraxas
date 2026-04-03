// src/types/index.ts

export interface WalletConnection {
  connected: boolean
  address?: string
  balance?: number
}

export interface Asset {
  id: string
  name: string
  symbol: string
  amount: number
  value: number
  riskLevel: 'low' | 'medium' | 'high'
}

export interface Portfolio {
  totalValue: number
  assets: Asset[]
  riskScore: number
  protectionLevel: 'standard' | 'enhanced' | 'maximum'
}

export interface RiskMetric {
  metric: string
  value: number
  threshold: number
  status: 'safe' | 'warning' | 'critical'
}
