import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Wallet } from 'lucide-react'

export function WalletButton() {
  const { connected } = useWallet()

  return (
    <div className="relative group">
      <style>{`
        .wallet-adapter-button {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%) !important;
          border: 1px solid rgba(220, 38, 38, 0.3) !important;
          border-radius: 8px !important;
          color: #e2e8f0 !important;
          font-family: 'Space Grotesk', sans-serif !important;
          font-weight: 600 !important;
          padding: 10px 16px !important;
          font-size: 14px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.1) !important;
        }
        .wallet-adapter-button:hover {
          background: linear-gradient(135deg, rgba(45, 50, 70, 0.9) 0%, rgba(25, 35, 55, 1) 100%) !important;
          border-color: rgba(220, 38, 38, 0.6) !important;
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.3) !important;
        }
        .wallet-adapter-button-trigger {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(153, 69, 255, 0.15) 100%) !important;
          border: 1px solid rgba(220, 38, 38, 0.4) !important;
        }
        .wallet-adapter-button-trigger:hover {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(153, 69, 255, 0.25) 100%) !important;
          border-color: rgba(220, 38, 38, 0.6) !important;
        }
      `}</style>
      <WalletMultiButton />
      {connected && (
        <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-slate-900/80 border border-red-400/20 rounded-lg text-xs text-red-300 whitespace-nowrap pointer-events-none">
          <Wallet className="inline w-3 h-3 mr-1" />
          Connected
        </div>
      )}
    </div>
  )
}
