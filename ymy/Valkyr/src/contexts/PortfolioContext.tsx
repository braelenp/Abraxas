import React, { createContext, useContext, useState } from 'react'

export interface Asset {
  id: string
  name: string
  symbol: string
  balance: number
  value: number
  allocation: number
  performance: number
  trend: 'up' | 'down' | 'neutral'
}

export interface Vault {
  id: string
  name: string
  balance: number
  allocation: string
  yieldCycle: string
  multiSigStatus: 'pending' | 'approved' | 'active'
}

export interface Opportunity {
  id: string
  title: string
  type: 'yield' | 'partnership' | 'investment'
  apy: number
  capital: number
  risk: 'low' | 'medium' | 'high'
  description: string
}

interface PortfolioContextType {
  // Wallet State
  connected: boolean
  walletAddress: string | null
  balance: number
  connect: (address: string, balance: number) => void
  disconnect: () => void

  // Portfolio State
  totalValue: number
  riskLevel: 'low' | 'medium' | 'high'
  status: 'READY' | 'MONITORING' | 'ALERT'
  assets: Asset[]
  vaults: Vault[]
  opportunities: Opportunity[]

  // Actions
  updatePortfolioValue: (value: number) => void
  updateRiskLevel: (level: 'low' | 'medium' | 'high') => void
  updateStatus: (status: 'READY' | 'MONITORING' | 'ALERT') => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [totalValue, setTotalValue] = useState(12500.5)
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [status, setStatus] = useState<'READY' | 'MONITORING' | 'ALERT'>('READY')

  const [assets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Solana',
      symbol: 'SOL',
      balance: 50,
      value: 5000,
      allocation: 40,
      performance: 12.5,
      trend: 'up',
    },
    {
      id: '2',
      name: 'USDC',
      symbol: 'USDC',
      balance: 3500,
      value: 3500,
      allocation: 28,
      performance: 0,
      trend: 'neutral',
    },
    {
      id: '3',
      name: 'Echo',
      symbol: 'ECHO',
      balance: 200,
      value: 2400,
      allocation: 19,
      performance: 8.3,
      trend: 'up',
    },
    {
      id: '4',
      name: 'Legacy',
      symbol: 'LEG',
      balance: 150,
      value: 1600.5,
      allocation: 13,
      performance: -2.1,
      trend: 'down',
    },
  ])

  const [vaults] = useState<Vault[]>([
    {
      id: 'vault1',
      name: 'Cold Storage - Sentinel',
      balance: 8500,
      allocation: '68% SOL, 32% USDC',
      yieldCycle: 'Active - 14 days remaining',
      multiSigStatus: 'approved',
    },
    {
      id: 'vault2',
      name: 'Yield Genesis - Strategic',
      balance: 2500,
      allocation: '50% Echo, 50% Legacy',
      yieldCycle: 'Next cycle starts in 3 days',
      multiSigStatus: 'active',
    },
    {
      id: 'vault3',
      name: 'Defensive Reserve',
      balance: 1500.5,
      allocation: '100% USDC',
      yieldCycle: 'Pending next allocation',
      multiSigStatus: 'pending',
    },
  ])

  const [opportunities] = useState<Opportunity[]>([
    {
      id: 'opp1',
      title: 'Solana Stake Pool - Enhanced Yield',
      type: 'yield',
      apy: 8.5,
      capital: 5000,
      risk: 'low',
      description: 'Earn staking rewards through GenesisDAO validator set',
    },
    {
      id: 'opp2',
      title: 'Echo IP Rights Partnership',
      type: 'partnership',
      apy: 12.0,
      capital: 2400,
      risk: 'medium',
      description: 'Strategic allocation to music IP tokenization',
    },
    {
      id: 'opp3',
      title: 'Legacy NFT Collection Growth',
      type: 'investment',
      apy: 15.5,
      capital: 1600,
      risk: 'high',
      description: 'Emerging athlete equity opportunities',
    },
    {
      id: 'opp4',
      title: 'Cross-Chain Bridge Rewards',
      type: 'yield',
      apy: 6.2,
      capital: 3500,
      risk: 'low',
      description: 'Liquidity provision on Wormhole bridges',
    },
  ])

  const connect = (address: string, bal: number) => {
    setConnected(true)
    setWalletAddress(address)
    setBalance(bal)
  }

  const disconnect = () => {
    setConnected(false)
    setWalletAddress(null)
    setBalance(0)
  }

  const updatePortfolioValue = (value: number) => {
    setTotalValue(value)
  }

  const updateRiskLevel = (level: 'low' | 'medium' | 'high') => {
    setRiskLevel(level)
  }

  const updateStatus = (newStatus: 'READY' | 'MONITORING' | 'ALERT') => {
    setStatus(newStatus)
  }

  return (
    <PortfolioContext.Provider
      value={{
        connected,
        walletAddress,
        balance,
        connect,
        disconnect,
        totalValue,
        riskLevel,
        status,
        assets,
        vaults,
        opportunities,
        updatePortfolioValue,
        updateRiskLevel,
        updateStatus,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider')
  }
  return context
}
