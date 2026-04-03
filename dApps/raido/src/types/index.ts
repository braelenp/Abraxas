export interface Opportunity {
  id: string;
  name: string;
  description: string;
  liquidityUSD: number;
  volume24h: number;
  apy?: number;
  risk: 'low' | 'medium' | 'high';
  assets: string[];
  timestamp: Date;
}

export interface FlowPath {
  id: string;
  from: string;
  to: string;
  amount: number;
  route: string[];
  expectedReturn: number;
  efficiency: number;
}

export interface SavedFlow {
  id: string;
  name: string;
  description: string;
  paths: FlowPath[];
  status: 'draft' | 'active' | 'completed';
  createdAt: Date;
  executedAt?: Date;
}

export interface DashboardMetrics {
  totalLiquidity: number;
  totalVolume24h: number;
  opportunitiesFound: number;
  activeFlows: number;
  averageAPY: number;
}
