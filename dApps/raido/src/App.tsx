import React, { useState, useEffect } from 'react';
import { RaidhoLoadingScreen } from './components/RaidhoLoadingScreen';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { OpportunityScanner } from './components/OpportunityScanner';
import { FlowSimulator } from './components/FlowSimulator';
import { MarketFlow } from './components/MarketFlow';
import { TidePool } from './components/TidePool';
import { BottomNav } from './components/BottomNav';
import { Menu, X } from 'lucide-react';

type Page = 'landing' | 'dashboard' | 'hunt' | 'flow' | 'market' | 'tidepool';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (section: string) => {
    setCurrentPage(section as Page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleConnectWallet = () => {
    setWalletConnected(!walletConnected);
    // In a real app, integrate with @solana/wallet-adapter-react
  };

  if (loading) {
    return <RaidhoLoadingScreen onComplete={() => setLoading(false)} />;
  }

  // Nav items with runes (like Abraxas)
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', rune: 'ᚲ' },
    { id: 'hunt', label: 'Hunt', rune: 'ᚱ' },
    { id: 'flow', label: 'Flow', rune: 'ᛋ' },
    { id: 'market', label: 'Market', rune: '⇄' },
    { id: 'tidepool', label: 'Tide', rune: '✦' },
  ];

  return (
    <div className="min-h-screen bg-raido-black text-white">
      {/* Mobile menu button - shown only when not on landing */}
      {currentPage !== 'landing' && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 md:hidden z-40 p-2 bg-raido-gold text-raido-black rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && currentPage !== 'landing' && (
        <div className="fixed inset-0 z-30 bg-raido-black bg-opacity-95 md:hidden pt-20">
          <nav className="flex flex-col gap-4 p-6">
            <button
              onClick={() => handleNavigate('landing')}
              className="px-6 py-3 text-left text-raido-gold font-semibold hover:bg-raido-gold hover:bg-opacity-10 rounded-lg transition-colors"
            >
              Home
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as any)}
                className="px-6 py-3 text-left text-raido-gold font-semibold hover:bg-raido-gold hover:bg-opacity-10 rounded-lg transition-colors"
              >
                {item.rune} {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="w-full">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onConnectWallet={handleConnectWallet}
          />
        )}

        {currentPage !== 'landing' && (
          <>
            <header className="sticky top-0 z-40 bg-raido-black bg-opacity-95 backdrop-blur border-b border-raido-gold border-opacity-20 py-4 md:py-6">
              <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                <button
                  onClick={() => handleNavigate('landing')}
                  className="text-2xl md:text-3xl font-bold text-raido-gold text-glow hover:text-raido-gold-light transition-colors"
                >
                  ◆ RAIDO
                </button>
                <nav className="hidden md:flex gap-4 items-center">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id as any)}
                      className={`text-sm font-bold uppercase tracking-wider transition flex items-center gap-1 ${
                        currentPage === item.id
                          ? 'text-raido-gold'
                          : 'text-gray-300 hover:text-raido-gold'
                      }`}
                    >
                      <span>{item.rune}</span>
                      <span className="hidden lg:inline">{item.label}</span>
                    </button>
                  ))}
                </nav>
                <button
                  onClick={handleConnectWallet}
                  className={`px-4 md:px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                    walletConnected
                      ? 'bg-green-500 bg-opacity-20 text-green-400 border border-green-500 border-opacity-50'
                      : 'bg-raido-gold text-raido-black hover:bg-raido-gold-light'
                  }`}
                >
                  {walletConnected ? '✓ Connected' : 'Connect'}
                </button>
              </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 pd:px-8 py-8 pb-32">
              {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
              {currentPage === 'hunt' && <OpportunityScanner onNavigate={handleNavigate} />}
              {currentPage === 'flow' && <FlowSimulator onNavigate={handleNavigate} />}
              {currentPage === 'market' && <MarketFlow />}
              {currentPage === 'tidepool' && <TidePool />}
            </div>

            {/* Bottom Navigation - shown on all dApp pages except landing */}
            {currentPage !== 'landing' && (
              <BottomNav activeTab={currentPage} onNavigate={handleNavigate} />
            )}
          </>
        )}
      </main>

      {/* Footer - shown on all pages except landing */}
      {currentPage !== 'landing' && (
        <footer className="bg-raido-black bg-opacity-50 border-t border-raido-gold border-opacity-20 py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-raido-gold mb-4">Raido</h4>
                <p className="text-sm md:text-base text-gray-400">
                  The Swift Provider — hunting liquidity and multiplying value across Solana.
                </p>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-raido-gold mb-4">Features</h4>
                <ul className="space-y-2 text-sm md:text-base text-gray-400">
                  <li>Opportunity Hunter</li>
                  <li>Flow Simulator</li>
                  <li>Liquidity Dashboard</li>
                  <li>Tide Pool Integration</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-raido-gold mb-4">Network</h4>
                <p className="text-sm md:text-base text-gray-400 mb-2">Solana Mainnet</p>
                <p className="text-xs md:text-sm text-gray-500">
                  Part of the Abraxas ritual family — sovereign DeFi on Solana.
                </p>
              </div>
            </div>

            <div className="border-t border-raido-gold border-opacity-20 pt-8 md:pt-12 text-center">
              <p className="text-xs md:text-sm text-gray-500">
                © 2026 Raido Protocol. The Swift Provider rises. All flows honored. ◆
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
