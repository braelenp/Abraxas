import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

type Props = {
  className?: string
  compact?: boolean
}

export default function WalletButton({ className = '', compact = false }: Props) {
  return (
    <div className={`wallet-shell ${compact ? 'wallet-shell-compact' : ''} ${className}`.trim()}>
      <WalletMultiButton className="wallet-adapter-trigger" />
    </div>
  )
}
