// Polyfill for Buffer (needed for Solana SPL Token in browser)
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SolanaProvider } from './providers/SolanaProvider';
import { AbraxasProvider } from './providers/AbraxasProvider';
import { initializeMobileUi, setupTapHaptics } from './lib/mobile';
import './styles.css';
import '@solana/wallet-adapter-react-ui/styles.css';

function Bootstrap() {
  React.useEffect(() => {
    void initializeMobileUi();
    const cleanup = setupTapHaptics();

    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <SolanaProvider>
        <AbraxasProvider>
          <App />
        </AbraxasProvider>
      </SolanaProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Bootstrap />
  </React.StrictMode>,
);
