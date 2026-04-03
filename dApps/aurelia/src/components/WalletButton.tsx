import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

export default function WalletButton() {
  const { connected, publicKey } = useWallet()

  return (
    <div className="flex flex-col items-center gap-1">
      <WalletMultiButton />
      {connected && publicKey && (
        <span className="font-mono text-xs text-green-400/70">
          {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)} · devnet
        </span>
      )}
    </div>
  )
}
