import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const WalletButton: React.FC = () => {
  return (
    <WalletMultiButton
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        background: 'transparent',
        border: '1px solid rgba(16,185,129,0.4)',
        color: '#6ee7b7',
        borderRadius: '6px',
        padding: '0.45rem 1rem',
        height: 'auto',
        lineHeight: '1.4',
      }}
    />
  )
}

export default WalletButton
