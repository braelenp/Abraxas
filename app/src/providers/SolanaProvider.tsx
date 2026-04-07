import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import type { Adapter } from '@solana/wallet-adapter-base';
import { type FC, type ReactNode, useMemo } from 'react';
import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
} from '@solana-mobile/wallet-adapter-mobile';
import { Capacitor } from '@capacitor/core';
import { SOLANA_CLUSTER, SOLANA_RPC_ENDPOINT } from '../lib/solana';

type Props = {
  children: ReactNode;
};

export const SolanaProvider: FC<Props> = ({ children }) => {
  const enableNativeMwa = import.meta.env.VITE_ENABLE_NATIVE_MWA !== 'false';

  const wallets = useMemo(() => {
    // For native builds, prioritize Phantom/Solflare compatibility for partner testing.
    // Keep MWA available to satisfy Solana Mobile integration and Backpack flows.
    if (Capacitor.isNativePlatform()) {
      const nativeWallets: Adapter[] = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

      if (enableNativeMwa) {
        nativeWallets.push(
          new SolanaMobileWalletAdapter({
            addressSelector: createDefaultAddressSelector(),
            appIdentity: {
              name: 'ABRAXAS',
              uri: 'https://abraxas.app',
            },
            authorizationResultCache: createDefaultAuthorizationResultCache(),
            chain: `solana:${SOLANA_CLUSTER}`,
            onWalletNotFound: async () => {
              // Do not block flow; users can still choose Phantom/Solflare from the wallet modal.
              return;
            },
          }),
        );
      }

      return nativeWallets;
    }

    return [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
  }, [enableNativeMwa]);

  return (
    <ConnectionProvider endpoint={SOLANA_RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
