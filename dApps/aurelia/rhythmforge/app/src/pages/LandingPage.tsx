import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <div className="landing-page">
      <div className="landing-aura" />
      <div className="landing-stars" />
      <div className="landing-particles" />
      <div className="landing-vignette" />
      <div className="landing-orbit landing-orbit-one" />
      <div className="landing-orbit landing-orbit-two" />

      <div className="landing-content">
      <h1 className="landing-title" aria-label="Rhythmforge">
        <span>Rhythmforge</span>
        <span aria-hidden="true">Rhythmforge</span>
        <span aria-hidden="true">Rhythmforge</span>
      </h1>
      <p className="landing-subtitle">
        Sovereign by Circuit on Solana
      </p>
      <WalletMultiButton className="landing-wallet-button" style={{ padding: '20px 60px', fontSize: '1.8rem' }} />
      {connected && (
        <>
          <button type="button" className="landing-change-wallet-link" onClick={() => setVisible(true)}>
            Change wallet
          </button>
          <Link to="/songs" className="landing-enter-link">
            Enter Realm →
          </Link>
        </>
      )}
      </div>
    </div>
  );
}