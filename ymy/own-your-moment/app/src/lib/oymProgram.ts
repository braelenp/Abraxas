import { AnchorProvider, BN, type Idl, Program } from "@coral-xyz/anchor";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../idl/ownyourmoment.json";
import { programId } from "./constants";

export type AthleteProfileView = {
  authority: string;
  displayName: string;
  totalCompletedDrills: number;
  currentStreak: number;
  bestStreak: number;
  pendingSkrRewards: number;
  totalSkrClaimed: number;
  lastCheckIn: number;
  createdAt: number;
};

type ProgramWallet = WalletContextState & {
  publicKey: PublicKey;
  signTransaction: NonNullable<WalletContextState["signTransaction"]>;
  signAllTransactions?: WalletContextState["signAllTransactions"];
};

function requireProgramWallet(wallet: WalletContextState): ProgramWallet {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error("Connect a wallet before sending on-chain actions.");
  }

  return wallet as ProgramWallet;
}

function getProvider(connection: Connection, wallet: WalletContextState) {
  const programWallet = requireProgramWallet(wallet);
  const anchorWallet = {
    publicKey: programWallet.publicKey,
    signTransaction: programWallet.signTransaction,
    signAllTransactions:
      programWallet.signAllTransactions ??
      (async <T extends import("@solana/web3.js").Transaction | import("@solana/web3.js").VersionedTransaction>(
        txs: T[],
      ) => Promise.all(txs.map((tx) => programWallet.signTransaction(tx as T) as Promise<T>))),
  };

  return new AnchorProvider(connection, anchorWallet, {
    commitment: "confirmed",
    preflightCommitment: "confirmed",
  });
}

function getProgram(connection: Connection, wallet: WalletContextState) {
  return new Program(idl as Idl, getProvider(connection, wallet));
}

function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "bigint") {
    return Number(value);
  }

  if (value && typeof value === "object" && "toString" in value) {
    return Number(String(value));
  }

  return 0;
}

function toU32Bytes(value: number): Buffer {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0, 0);
  return buffer;
}

export function deriveAthleteProfilePda(authority: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([Buffer.from("athlete"), authority.toBuffer()], programId);
}

function deriveDrillLogPda(athleteProfile: PublicKey, entryIndex: number): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("drill"), athleteProfile.toBuffer(), toU32Bytes(entryIndex)],
    programId,
  );
}

function deriveKingActionPda(athleteProfile: PublicKey, actionIndex: number): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("king-action"), athleteProfile.toBuffer(), toU32Bytes(actionIndex)],
    programId,
  );
}

export async function fetchAthleteProfile(
  connection: Connection,
  wallet: WalletContextState,
): Promise<AthleteProfileView | null> {
  if (!wallet.publicKey) {
    return null;
  }

  const program = getProgram(connection, wallet);
  const [athleteProfile] = deriveAthleteProfilePda(wallet.publicKey);
  const account = await (program.account as any).AthleteProfile.fetchNullable(athleteProfile);

  if (!account) {
    return null;
  }

  return {
    authority: account.authority.toBase58(),
    displayName: account.displayName,
    totalCompletedDrills: toNumber(account.totalCompletedDrills),
    currentStreak: toNumber(account.currentStreak),
    bestStreak: toNumber(account.bestStreak),
    pendingSkrRewards: toNumber(account.pendingSkrRewards),
    totalSkrClaimed: toNumber(account.totalSkrClaimed),
    lastCheckIn: toNumber(account.lastCheckIn),
    createdAt: toNumber(account.createdAt),
  };
}

export async function initializeProfile(
  connection: Connection,
  wallet: WalletContextState,
  displayName: string,
): Promise<string> {
  const program = getProgram(connection, wallet);
  const authority = requireProgramWallet(wallet).publicKey;
  const [athleteProfile] = deriveAthleteProfilePda(authority);

  const tx = await (program.methods as any)
    .initialize_profile(displayName)
    .accounts({
      authority,
      athlete_profile: athleteProfile,
      system_program: SystemProgram.programId,
    })
    .rpc();

  return tx;
}

export async function logDrillCompletion(
  connection: Connection,
  wallet: WalletContextState,
  args: {
    entryIndex: number;
    title: string;
    category: string;
    durationMinutes: number;
    intensity: number;
    rewardAmount: number;
  },
): Promise<string> {
  const program = getProgram(connection, wallet);
  const authority = requireProgramWallet(wallet).publicKey;
  const [athleteProfile] = deriveAthleteProfilePda(authority);
  const [drillLog] = deriveDrillLogPda(athleteProfile, args.entryIndex);

  const tx = await (program.methods as any)
    .log_drill_completion(
      args.entryIndex,
      args.title,
      args.category,
      args.durationMinutes,
      args.intensity,
      new BN(args.rewardAmount),
    )
    .accounts({
      authority,
      athlete_profile: athleteProfile,
      drill_log: drillLog,
      system_program: SystemProgram.programId,
    })
    .rpc();

  return tx;
}

export async function claimSkrRewards(
  connection: Connection,
  wallet: WalletContextState,
  amount: number,
): Promise<string> {
  const program = getProgram(connection, wallet);
  const authority = requireProgramWallet(wallet).publicKey;
  const [athleteProfile] = deriveAthleteProfilePda(authority);

  const tx = await (program.methods as any)
    .claim_skr_rewards(new BN(amount))
    .accounts({
      authority,
      athlete_profile: athleteProfile,
    })
    .rpc();

  return tx;
}

export async function logKingAiAction(
  connection: Connection,
  wallet: WalletContextState,
  args: {
    actionIndex: number;
    actionType: string;
    summary: string;
  },
): Promise<string> {
  const program = getProgram(connection, wallet);
  const authority = requireProgramWallet(wallet).publicKey;
  const [athleteProfile] = deriveAthleteProfilePda(authority);
  const [actionLog] = deriveKingActionPda(athleteProfile, args.actionIndex);

  const tx = await (program.methods as any)
    .log_king_ai_action(args.actionIndex, args.actionType, args.summary)
    .accounts({
      authority,
      athlete_profile: athleteProfile,
      king_ai_action_log: actionLog,
      system_program: SystemProgram.programId,
    })
    .rpc();

  return tx;
}
