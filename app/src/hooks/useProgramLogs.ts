import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { getProgramIdRaw } from '../lib/solana';
import { PublicKey } from '@solana/web3.js';

export type ProgramLogLine = {
  id: string;
  signature: string;
  line: string;
  slot: number;
};

export function useProgramLogs() {
  const { connection } = useConnection();
  const [programLogs, setProgramLogs] = useState<ProgramLogLine[]>([]);
  const programIdRaw = getProgramIdRaw();

  useEffect(() => {
    let programId: PublicKey;
    try {
      programId = new PublicKey(programIdRaw);
    } catch {
      setProgramLogs([]);
      return;
    }

    const subscriptionId = connection.onLogs(programId, (logInfo, ctx) => {
      const nextLines = logInfo.logs.map((line) => ({
        id: crypto.randomUUID(),
        signature: logInfo.signature,
        line,
        slot: ctx.slot,
      }));

      setProgramLogs((current) => [...nextLines, ...current].slice(0, 30));
    });

    return () => {
      connection.removeOnLogsListener(subscriptionId).catch(() => undefined);
    };
  }, [connection, programIdRaw]);

  return programLogs;
}
