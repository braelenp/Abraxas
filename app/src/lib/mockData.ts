import type { VaultSummary } from './types';

export const starterVaults: VaultSummary[] = [
  {
    id: 'vault-invoice-01',
    name: 'Invoice Pool Alpha',
    assetType: 'invoice',
    depositedAmount: 1500,
    policy: 'balanced',
    circuitState: 'normal',
  },
  {
    id: 'vault-art-01',
    name: 'Contemporary Art Basket',
    assetType: 'art',
    depositedAmount: 980,
    policy: 'defensive',
    circuitState: 'warning',
  },
];
