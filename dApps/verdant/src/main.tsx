import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'
import './index.css'
import App from './App'

const endpoint = clusterApiUrl('devnet')
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Providers = ConnectionProvider as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WalletProv = WalletProvider as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal = WalletModalProvider as any

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers endpoint={endpoint}>
      <WalletProv wallets={wallets} autoConnect>
        <Modal>
          <App />
        </Modal>
      </WalletProv>
    </Providers>
  </React.StrictMode>
)
