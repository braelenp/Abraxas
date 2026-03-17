import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import idl from '../idl/abraxas.json';
import { getProgramId } from './solana';

export function useAbraxasProgram() {
  const { connection } = useConnection();
  const wallet = useWallet();

  return useMemo(() => {
    const programId = getProgramId();
    if (!programId || !wallet.publicKey) {
      return { program: null, programId };
    }

    const provider = new anchor.AnchorProvider(connection, wallet as unknown as anchor.Wallet, {
      commitment: 'confirmed',
    });

    const program = new anchor.Program(idl as unknown as anchor.Idl, provider);
    return { program, programId };
  }, [connection, wallet]);
}
