import './polyfills';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { SolanaProvider } from './providers/SolanaProvider';
import { AbraxasProvider } from './providers/AbraxasProvider';
import { initializeMobileUi, setupTapHaptics } from './lib/mobile';
import i18n from './lib/i18n';
import './styles.css';
import '@solana/wallet-adapter-react-ui/styles.css';

function renderStartupError(error: unknown) {
  const root = document.getElementById('root');
  if (!root) {
    return;
  }

  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  root.innerHTML = `
    <div style="min-height:100vh;padding:24px;background:#020617;color:#e2e8f0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap;">
      <h1 style="margin:0 0 16px;font-size:20px;color:#fda4af;">Abraxas failed to start</h1>
      <div style="padding:16px;border:1px solid #7f1d1d;border-radius:12px;background:#1e293b;">${message}</div>
    </div>
  `;
}

window.addEventListener('error', (event) => {
  renderStartupError(event.error ?? event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  renderStartupError(event.reason);
});

function Bootstrap() {
  React.useEffect(() => {
    void initializeMobileUi();
    const cleanup = setupTapHaptics();

    return cleanup;
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <SolanaProvider>
          <AbraxasProvider>
            <App />
          </AbraxasProvider>
        </SolanaProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

try {
  createRoot(document.getElementById('root')!).render(
    <Bootstrap />
  );
} catch (error) {
  renderStartupError(error);
}
