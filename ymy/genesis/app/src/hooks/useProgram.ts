import { useMemo } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getProgram } from '../lib/program'
import type { Program } from '@coral-xyz/anchor'

export function useProgram(): Program | null {
  const { connection } = useConnection()
  const wallet = useWallet()

  return useMemo(() => {
    if (!wallet.connected || !wallet.publicKey) return null
    try {
      return getProgram(connection, wallet)
    } catch (err) {
      console.error('[useProgram] Failed to initialize program:', err)
      return null
    }
  }, [connection, wallet])
}
