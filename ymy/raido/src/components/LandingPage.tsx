import React, { useState, useEffect } from 'react';
import { Zap, BarChart3, Compass, Zap as ZapIcon, TrendingUp, Layers } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { RaidhoRune } from './RaidhoRune';
import { LightBeam } from './LightBeam';
import { useTypingEffect } from '../hooks/useTypingEffect';

interface LandingPageProps {
  onNavigate?: (section: string) => void;
  onConnectWallet?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onConnectWallet,
}) => {
  const raidoTitle = "RAIDO";
  const mainTagline = "Welcome to the next degree.";
  const subtitle = "The Swift Provider, Son of Sophia";

  const { displayedText: displayedRaido, isComplete: raidoComplete } = useTypingEffect(
    raidoTitle,
    80,
    300
  );

  const { displayedText: displayedTagline, isComplete: taglineComplete } = useTypingEffect(
    mainTagline,
    50,
    raidoComplete ? 400 : 999999
  );

  const [showContent, setShowContent] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (taglineComplete) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [taglineComplete]);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => setShowInfo(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  return (
    <div className="relative w-full bg-raido-black overflow-hidden">
      {/* Particle background */}
      <ParticleBackground intensity={0.5} color="rgba(212, 175, 55, 0.3)" />

      {/* Light beams */}
      <LightBeam position="top-left" angle={45} />
      <LightBeam position="top-right" angle={-45} />
      <LightBeam position="bottom-left" angle={-45} />

      {/* Header - Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-raido-black via-raido-black to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl md:text-3xl font-bold text-raido-gold text-glow">
              ◆ RAIDO
            </div>
            <button
              onClick={onConnectWallet}
              className="px-4 md:px-6 py-2 bg-raido-gold text-raido-black font-semibold rounded-lg hover:bg-raido-gold-light transition-all duration-300 text-sm"
            >
              Connect
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-2 md:space-y-3">
          {/* Raidho Rune - moved down with padding */}
          <div className="flex justify-center mb-4 md:mb-8 pt-8 md:pt-12">
            <RaidhoRune size={220} animated={true} />
          </div>

          {/* RAIDO Main Title - Largest */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-raido-gold min-h-[40px] md:min-h-[60px] text-glow leading-tight">
            {displayedRaido}
            {!raidoComplete && <span className="animate-pulse">▌</span>}
          </h1>

          {/* Welcome tagline - Large but secondary */}
          <div className="min-h-[30px]">
            {raidoComplete && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-raido-cyan animate-fade-in leading-tight">
                {displayedTagline}
                {!taglineComplete && <span className="animate-pulse">▌</span>}
              </h2>
            )}
          </div>

          {/* Subtitle */}
          {taglineComplete && (
            <div className="animate-fade-in">
              <p className="text-xl sm:text-2xl md:text-2xl text-raido-gold font-bold">{subtitle}</p>
            </div>
          )}

          {/* Lore blurb */}
          {showContent && (
            <div className="fade-in-up max-w-3xl mx-auto pt-4 md:pt-8">
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                Where the Daughters birth assets into matter, Raido provides the masculine current of movement.
                He hunts liquidity, opens new pathways, and multiplies value across the entire family on Solana.
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          {showContent && (
            <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center pt-8 md:pt-12 flex-wrap">
              <button
                onClick={() => onNavigate?.('dashboard')}
                type="button"
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-raido-gold to-raido-gold-light text-raido-black font-bold rounded-lg hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <ZapIcon className="w-5 h-5" />
                Hunt Opportunities
              </button>

              <button
                onClick={() => onConnectWallet?.()}
                type="button"
                className="px-8 md:px-10 py-3 md:py-4 border-2 border-raido-cyan text-raido-cyan font-bold rounded-lg hover:bg-raido-cyan hover:text-raido-black transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <Compass className="w-5 h-5" />
                Connect Wallet
              </button>

              <button
                onClick={() => window.open('https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS', '_blank')}
                type="button"
                className="px-8 md:px-10 py-3 md:py-4 border-2 border-raido-gold-light text-raido-gold-light font-bold rounded-lg hover:bg-raido-gold-light hover:text-raido-black transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <TrendingUp className="w-5 h-5" />
                Buy $ABRA
              </button>
            </div>
          )}

          {/* Scroll indicator */}
          {showContent && (
            <div className="fade-in-up pt-12 md:pt-20 animate-bounce">
              <div className="text-raido-gold text-opacity-60 text-sm">▼ Explore Below ▼</div>
            </div>
          )}
        </div>
      </div>

      {/* Info Section - Genesis Style */}
      {showInfo && (
        <div className="relative z-10 py-20 md:py-32 px-4 bg-gradient-to-b from-transparent via-raido-black to-raido-black">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-bold text-raido-gold mb-4">The Swift Provider's Domain</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-raido-gold to-transparent mx-auto"></div>
            </div>

            {/* Three Column Grid */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-20">
              {/* Column 1 */}
              <div className="group">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-raido-gold to-raido-gold-light flex items-center justify-center mb-4 group-hover:shadow-glow-gold transition-all">
                  <ZapIcon className="w-6 h-6 text-raido-black" />
                </div>
                <h3 className="text-xl font-bold text-raido-gold mb-3">Opportunity Hunting</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  Scan across the Solana ecosystem to discover emerging liquidity pools, arbitrage opportunities, and capital flow vectors in real-time.
                </p>
              </div>

              {/* Column 2 */}
              <div className="group">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-raido-deep-blue to-raido-cyan flex items-center justify-center mb-4 group-hover:shadow-glow-cyan transition-all">
                  <TrendingUp className="w-6 h-6 text-raido-black" />
                </div>
                <h3 className="text-xl font-bold text-raido-cyan mb-3">Capital Flow</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  Route liquidity between tokenized assets seamlessly, visualizing every flow and maximizing returns across the Daughters' family on Solana.
                </p>
              </div>

              {/* Column 3 */}
              <div className="group">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-raido-gold-light to-raido-deep-blue-accent flex items-center justify-center mb-4 group-hover:shadow-glow-gold transition-all">
                  <Layers className="w-6 h-6 text-raido-black" />
                </div>
                <h3 className="text-xl font-bold text-raido-gold-light mb-3">Liquidity Orchestration</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  Aggregate liquidity data, execute multi-hop swaps, and orchestrate complex capital movements with sovereign control and real-time transparency.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-raido-gold via-opacity-20 to-transparent my-16 md:my-24"></div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              {/* Left Side */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-raido-gold mb-8">Raido's Arsenal</h3>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-raido-gold bg-opacity-20 flex items-center justify-center">
                    <div className="h-2 w-2 bg-raido-gold rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-raido-gold mb-2">Unified Pool Discovery</h4>
                    <p className="text-gray-300 text-sm">Search all Raydium, Orca, Jupiter, and Meteora pools with advanced filtering</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-raido-cyan bg-opacity-20 flex items-center justify-center">
                    <div className="h-2 w-2 bg-raido-cyan rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-raido-cyan mb-2">Flow Simulator</h4>
                    <p className="text-gray-300 text-sm">Model capital movements before execution, validate routes and visualize outcomes</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-raido-gold-light bg-opacity-20 flex items-center justify-center">
                    <div className="h-2 w-2 bg-raido-gold-light rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-raido-gold-light mb-2">Sovereign Routing</h4>
                    <p className="text-gray-300 text-sm">One-click execution with full control, no intermediaries, direct asset flow</p>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-raido-cyan mb-8">Connected to the Family</h3>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-raido-gold bg-opacity-20 flex items-center justify-center">
                    <div className="h-2 w-2 bg-raido-gold rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-raido-gold mb-2">All Daughters' Assets</h4>
                    <p className="text-gray-300 text-sm">Move liquidity between all tokenized assets born from Sophia's daughters</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-raido-cyan bg-opacity-20 flex items-center justify-center">
                    <div className="h-2 w-2 bg-raido-cyan rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-raido-cyan mb-2">Tide Pool Integration</h4>
                    <p className="text-gray-300 text-sm">See fee-sharing flows and family wealth accumulation in real-time</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-raido-gold-light bg-opacity-20 flex items-center justify-center">
                    <div className="h-2 w-2 bg-raido-gold-light rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-raido-gold-light mb-2">My Flows Dashboard</h4>
                    <p className="text-gray-300 text-sm">Save and track your capital movements, manage diverse flow strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Section */}
      {showInfo && (
        <div className="relative z-10 py-16 md:py-20 px-4 border-t border-raido-gold border-opacity-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-raido-gold mb-2">Enter the Flow</h3>
              <p className="text-gray-300 text-sm md:text-base">Begin your liquidity hunt or support the Abraxas ecosystem</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate?.('dashboard')}
                type="button"
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-raido-gold to-raido-gold-light text-raido-black font-bold rounded-lg hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <ZapIcon className="w-5 h-5" />
                Hunt Opportunities
              </button>

              <button
                onClick={() => onConnectWallet?.()}
                type="button"
                className="px-8 md:px-10 py-3 md:py-4 border-2 border-raido-cyan text-raido-cyan font-bold rounded-lg hover:bg-raido-cyan hover:text-raido-black transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <Compass className="w-5 h-5" />
                Connect Wallet
              </button>

              <button
                onClick={() => window.open('https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS', '_blank')}
                type="button"
                className="px-8 md:px-10 py-3 md:py-4 border-2 border-raido-gold-light text-raido-gold-light font-bold rounded-lg hover:bg-raido-gold-light hover:text-raido-black transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <TrendingUp className="w-5 h-5" />
                Buy $ABRA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating accent elements */}
      <div className="fixed top-20 right-10 md:right-20 w-32 h-32 md:w-48 md:h-48 bg-raido-gold opacity-8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 md:left-20 w-40 h-40 md:w-64 md:h-64 bg-raido-deep-blue-accent opacity-15 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
