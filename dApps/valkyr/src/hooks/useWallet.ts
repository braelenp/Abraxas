// src/hooks/useWallet.ts
import { useCallback, useState } from 'react'

export const useWallet = () => {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connect = useCallback(async () => {
    // Wallet connection logic
    console.log('Connecting to Solana wallet...')
    setConnected(true)
  }, [])

  const disconnect = useCallback(async () => {
    setConnected(false)
    setAddress(null)
  }, [])

  return {
    connected,
    address,
    connect,
    disconnect,
  }
}
