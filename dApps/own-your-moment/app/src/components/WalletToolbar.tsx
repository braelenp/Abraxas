import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export default function WalletToolbar() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="flex flex-col items-start gap-3 rounded-[22px] border border-[#f2c230]/30 bg-[linear-gradient(150deg,rgba(34,14,13,0.88),rgba(14,10,10,0.84))] p-4 shadow-[0_0_20px_rgba(235,28,36,0.16)] sm:items-end">
      <div className="sm:text-right">
        <p className="text-xs uppercase tracking-[0.26em] text-white/45">Athlete Wallet</p>
        <p className="mt-1 font-display text-lg uppercase tracking-[0.12em] text-white">
          {connected && publicKey ? shortenAddress(publicKey.toBase58()) : "Not connected"}
        </p>
      </div>
      <WalletMultiButton />
    </div>
  );
}
