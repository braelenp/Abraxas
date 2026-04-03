import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import type { WalletContextState } from '@solana/wallet-adapter-react'
import firstSonIdl from '../idl/first_son.json'

export const PROGRAM_ID = new PublicKey(firstSonIdl.address)

export function getProgram(
  connection: Connection,
  wallet: WalletContextState
): Program {
  const provider = new AnchorProvider(
    connection,
    wallet as never,
    { commitment: 'confirmed' }
  )
  return new Program(firstSonIdl as unknown as Idl, provider)
}

export function getUserAccountPda(
  authority: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('user-account'), authority.toBuffer()],
    programId
  )
}

export function getVaultPda(
  authority: PublicKey,
  programId: PublicKey = PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), authority.toBuffer()],
    programId
  )
}
