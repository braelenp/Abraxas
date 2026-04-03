/**
 * Mock data generation utilities for Raido
 * Used during development and demo mode
 */

import { Opportunity, FlowPath, SavedFlow } from '../types';

export const generateMockOpportunities = (count = 12): Opportunity[] => {
  const assets = ['SOL', 'USDC', 'USDT', 'JUP', 'ORCA', 'RAYDIUM', 'MARINADE', 'mSOL', 'COPE', 'COPE'];
  const pools = [
    'Raydium Standard AMM',
    'Orca Whirlpool',
    'Meteora DLMM',
    'Magic Eden DEX',
    'Marinade Staking',
    'Jupiter Limit Order',
    'Raydium Fusion',
    'Orca Concentrated',
    'Sanctum Liquid Staking',
    'Hedgehog DEX',
    'Dexlab Concentrated',
    'Serum DEX',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `opp-${i}${Date.now()}`,
    name: pools[i % pools.length],
    description: `${assets[i % assets.length]}/${assets[(i + 1) % assets.length]} pair trading on Solana with high daily volume and liquidity depth`,
    liquidityUSD: Math.random() * 50000000 + 500000,
    volume24h: Math.random() * 25000000 + 100000,
    apy: Math.random() * 150 + 2,
    risk: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
    assets: [assets[i % assets.length], assets[(i + 1) % assets.length]],
    timestamp: new Date(),
  }));
};

export const generateMockFlowPaths = (): FlowPath[] => {
  return [
    {
      id: 'path-1',
      from: 'SOL',
      to: 'USDC',
      amount: 100,
      route: ['Marinade Staking Pool', 'Jupiter Swap', 'Orca Whirlpool'],
      expectedReturn: 125.5,
      efficiency: 92,
    },
    {
      id: 'path-2',
      from: 'USDC',
      to: 'JUP',
      amount: 100,
      route: ['Raydium AMM', 'Orca Concentrated'],
      expectedReturn: 115.2,
      efficiency: 88,
    },
  ];
};

export const generateMockSavedFlows = (): SavedFlow[] => {
  return [
    {
      id: 'flow-1',
      name: 'SOL Multiplier Strategy',
      description: 'Multi-hop route through staking → yield generation and arbitrage',
      paths: [],
      status: 'active',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'flow-2',
      name: 'USDC Arbitrage Path',
      description: 'Cross-pool arbitrage on major stablecoin pairs for safe gains',
      paths: [],
      status: 'completed',
      executedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'flow-3',
      name: 'JUP Accumulation',
      description: 'Gradual accumulation strategy with fee capture',
      paths: [],
      status: 'draft',
      createdAt: new Date(),
    },
  ];
};

export const generateDashboardMetrics = () => {
  return {
    totalLiquidity: Math.random() * 500000000 + 50000000,
    totalVolume24h: Math.random() * 100000000 + 5000000,
    opportunitiesFound: Math.floor(Math.random() * 500) + 50,
    activeFlows: Math.floor(Math.random() * 50) + 5,
    averageAPY: Math.random() * 150 + 5,
  };
};

export const generateRecentActivities = () => {
  const activities = [
    { action: 'Discovered SOL/USDC pair', value: '+$1.2M liquidity' },
    { action: 'Flow executed: Jupiter → Orca', value: '+$45K profit' },
    { action: 'Opened new Raydium position', value: '+$500K capital' },
    { action: 'Closed arbitrage opportunity', value: '+$23K gain' },
    { action: 'Rebalanced USDC holdings', value: '-$120K movement' },
    { action: 'New mSOL opportunity found', value: '+$2.3M liquidity' },
  ];

  return activities.map((activity, i) => ({
    id: i + 1,
    ...activity,
    time: `${Math.floor(Math.random() * 120) + 1} ${Math.random() > 0.5 ? 'min' : 'hour'} ago`,
  }));
};
