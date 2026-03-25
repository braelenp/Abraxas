import { useEffect, useRef, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ExternalLink } from 'lucide-react';
import { DashboardPage } from './pages/DashboardPage';

// Typing effect hook
function useTypingEffect(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText(text.substring(0, currentIndex + 1));
            currentIndex++;
          } else {
            setIsComplete(true);
            clearInterval(interval);
          }
        }, speed);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(delayTimer);
    } else {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [text, speed, delay]);

  return { displayedText, isComplete };
}

// Scroll trigger animation hook
function useScrollReveal(ref: React.RefObject<HTMLElement | null>, threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isVisible;
}

// Particle component
function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-300/30 blur-sm"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: Math.random() * 5 + 's',
          }}
        />
      ))}
    </div>
  );
}

// Light beams component
function LightBeams() {
  return (
    <>
      {/* Cyan beam - static, no animation */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-screen [background:linear-gradient(135deg,transparent_0%,rgba(34,211,238,0.25)_30%,transparent_60%)]" />
      {/* Purple beam - static, no animation */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(45deg,transparent_0%,rgba(157,78,221,0.2)_40%,transparent_70%)]" />
      {/* Orange glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-screen [background:linear-gradient(to_top,rgba(234,88,12,0.15)_0%,transparent_50%)]" />
      {/* Pulsing aura - static, no animation */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_center,rgba(157,78,221,0.1)_0%,transparent_70%)]" />
    </>
  );
}

// Constellation animation component
function ConstellationBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <svg
        className="w-full h-full opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <style>{`
            .constellation-star {
              fill: rgba(250, 204, 21, 0.6);
              animation: twinkle 3s ease-in-out infinite;
            }
            
            .constellation-line {
              stroke: rgba(250, 204, 21, 0.2);
              stroke-width: 1;
              animation: pulse-line 4s ease-in-out infinite;
            }
          `}</style>
        </defs>
        
        {/* Connecting lines */}
        <line x1="100" y1="100" x2="250" y2="150" className="constellation-line" style={{ animationDelay: '0s' }} />
        <line x1="250" y1="150" x2="350" y2="80" className="constellation-line" style={{ animationDelay: '0.3s' }} />
        <line x1="350" y1="80" x2="450" y2="120" className="constellation-line" style={{ animationDelay: '0.6s' }} />
        <line x1="900" y1="200" x2="1000" y2="280" className="constellation-line" style={{ animationDelay: '0.2s' }} />
        <line x1="1000" y1="280" x2="1100" y2="200" className="constellation-line" style={{ animationDelay: '0.4s' }} />
        <line x1="200" y1="600" x2="380" y2="550" className="constellation-line" style={{ animationDelay: '0.1s' }} />
        <line x1="380" y1="550" x2="500" y2="650" className="constellation-line" style={{ animationDelay: '0.5s' }} />
        <line x1="800" y1="650" x2="950" y2="600" className="constellation-line" style={{ animationDelay: '0.3s' }} />
        <line x1="950" y1="600" x2="1050" y2="720" className="constellation-line" style={{ animationDelay: '0.7s' }} />
        
        {/* Stars */}
        <circle cx="100" cy="100" r="2.5" className="constellation-star" style={{ animationDelay: '0s' }} />
        <circle cx="250" cy="150" r="2" className="constellation-star" style={{ animationDelay: '0.5s' }} />
        <circle cx="350" cy="80" r="2.5" className="constellation-star" style={{ animationDelay: '1s' }} />
        <circle cx="450" cy="120" r="2" className="constellation-star" style={{ animationDelay: '1.5s' }} />
        <circle cx="900" cy="200" r="2.5" className="constellation-star" style={{ animationDelay: '0.3s' }} />
        <circle cx="1000" cy="280" r="2" className="constellation-star" style={{ animationDelay: '0.8s' }} />
        <circle cx="1100" cy="200" r="2.5" className="constellation-star" style={{ animationDelay: '1.2s' }} />
        <circle cx="200" cy="600" r="2" className="constellation-star" style={{ animationDelay: '0.2s' }} />
        <circle cx="380" cy="550" r="2.5" className="constellation-star" style={{ animationDelay: '0.7s' }} />
        <circle cx="500" cy="650" r="2" className="constellation-star" style={{ animationDelay: '1.1s' }} />
        <circle cx="800" cy="650" r="2.5" className="constellation-star" style={{ animationDelay: '0.4s' }} />
        <circle cx="950" cy="600" r="2" className="constellation-star" style={{ animationDelay: '0.9s' }} />
        <circle cx="1050" cy="720" r="2.5" className="constellation-star" style={{ animationDelay: '1.3s' }} />
      </svg>
    </div>
  );
}

// CTA Button component
interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

function CTAButton({ text, href, variant = 'primary' }: CTAButtonProps) {
  // All buttons are now slate with cyan text and cyan pulsing glow
  const buttonClass = 'bg-slate-900/60 border border-cyan-300/40 text-cyan-200 shadow-[0_0_24px_rgba(6,182,212,0.0)] hover:shadow-[0_0_32px_rgba(6,182,212,0.4)] hover:border-cyan-300/60';
  
  // Detect if link is internal (starts with /) or external
  const isInternal = href.startsWith('/');
  
  const sharedClassName = `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wider transition duration-300 ${buttonClass} group`;

  // Use React Router Link for internal routes
  if (isInternal) {
    return (
      <Link
        to={href}
        className={sharedClassName}
      >
        {text}
      </Link>
    );
  }

  // Use standard anchor tag for external links
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClassName}
    >
      {text}
      <ExternalLink size={16} className="transition group-hover:translate-x-0.5" />
    </a>
  );
}
// Main landing page component
function CinematicLanding() {
  const topBarTyping = useTypingEffect('ACCESSING SOVEREIGN ARCHIVES...', 40, 0);
  const mainHeadlineTyping = useTypingEffect('Welcome to the next degree.', 60, 0);
  const loreRef = useRef<HTMLElement | null>(null);
  const loreVisible = useScrollReveal(loreRef, 0.2);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showMainHeadline, setShowMainHeadline] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  const backgroundCandidates = [
    '/assets/sophia-minted.jpg',
    '/assets/abraxas-logo-graphic.jpg',
  ];

  // Loading sequence effect
  useEffect(() => {
    if (!topBarTyping.isComplete) {
      return;
    }

    // After typing is complete, start the load bar
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          // Transition to main content
          setTimeout(() => {
            setIsLoading(false);
            setShowMainHeadline(true);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(loadingInterval);
  }, [topBarTyping.isComplete]);

  const onBackgroundError = () => {
    if (backgroundIndex < backgroundCandidates.length - 1) {
      setBackgroundIndex((current) => current + 1);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-slate-950 text-cyan-50">
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-slate-950" />
      
      {/* Sophia moving background - visible during loading and throughout */}
      <img
        src={backgroundCandidates[backgroundIndex]}
        alt=""
        className="dapp-moving-background animate-phase-in pointer-events-none fixed inset-0 -z-20 h-full w-full object-cover object-center opacity-30"
        onError={onBackgroundError}
      />
      <img
        src={backgroundCandidates[backgroundIndex]}
        alt=""
        className="dapp-moving-background dapp-moving-background-secondary pointer-events-none fixed inset-0 -z-20 h-full w-full object-cover object-center"
        onError={onBackgroundError}
      />
      
      {/* Dark overlay on top of background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-slate-950/75" />
      
      <LightBeams />
      <Particles />
      <ConstellationBackground />

      {/* Scanlines effect */}
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-5 mix-blend-multiply [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.5)_0px,rgba(0,0,0,0.5)_1px,transparent_2px,transparent_3px)]" />

      {/* Noise texture */}
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-[0.02] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 seed=%221%22/%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      {/* Gradient overlays */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-cyan-950/30 via-transparent to-slate-950" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

      {/* Radial glow centers */}
      <div className="pointer-events-none fixed -top-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-600/20 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 -right-32 -z-10 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-600/10 blur-3xl" />

      {/* Fixed top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-300/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <img 
                src="/assets/abraxas-logo-graphic.jpg" 
                alt="Abraxas Logo" 
                className="h-10 sm:h-12 w-auto object-contain rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              />
            </div>

            {/* Center: Typing status - only show during loading */}
            {isLoading && (
              <div className="flex-1 hidden sm:flex justify-center">
                <p className="text-xs sm:text-sm text-cyan-200/80 font-mono tracking-wider">
                  {topBarTyping.displayedText}
                  <span className={`ml-1 ${topBarTyping.isComplete ? '' : 'animate-pulse'}`}>_</span>
                </p>
              </div>
            )}

            {/* Right: Wallet button */}
            <div className="flex-shrink-0">
              <WalletMultiButton className="ui-action !h-8 !max-w-[8.75rem] !rounded-lg !border !border-cyan-300/40 !bg-slate-900/60 !px-3 !text-xs !font-semibold !text-cyan-200 hover:!border-cyan-300/60 hover:!bg-slate-800/60 transition" />
            </div>
          </div>
        </div>
      </header>

      {/* Loading screen */}
      {isLoading && (
        <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="text-center space-y-12">
            {/* Loading text */}
            <div>
              <p className="text-lg sm:text-2xl text-cyan-50/90 font-mono tracking-wider mb-8">
                {topBarTyping.displayedText}
                <span className={`ml-1 ${topBarTyping.isComplete ? '' : 'animate-pulse'}`}>_</span>
              </p>

              {/* Loading bar */}
              {topBarTyping.isComplete && (
                <div className="w-64 sm:w-96 mx-auto">
                  <div className="h-1 bg-slate-800/50 rounded-full overflow-hidden border border-cyan-300/30">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-300 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                      style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-cyan-300/70 mt-3 font-mono">
                    {Math.floor(loadingProgress)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero section - hidden during loading */}
      <section className={`relative min-h-[100vh] flex flex-col items-center justify-center pt-20 pb-12 px-4 sm:px-6 transition-opacity duration-700 ${!isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          {/* Abraxas Title */}
          <div className="mt-20 sm:mt-28 lg:mt-32">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[0.15em] sm:tracking-[0.2em] leading-tight">
              <span className="inline-block text-white animate-glitch [filter:drop-shadow(0_0_50px_rgba(250,204,21,0.8))]">
                ABRAXAS
              </span>
            </h1>
          </div>

          {/* Main headline with typing effect */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-cyan-300">
              <span className="inline-block">
                {mainHeadlineTyping.displayedText}
                {!mainHeadlineTyping.isComplete && (
                  <span className="ml-1 animate-pulse text-cyan-300">_</span>
                )}
              </span>
            </h2>

            {/* Pulsing glow effect behind text */}
            {mainHeadlineTyping.isComplete && (
              <div className="mt-4 flex justify-center">
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-300 blur-lg opacity-60 animate-pulse" />
              </div>
            )}
          </div>

          {/* Abraxas image under headline */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <img 
              src="/assets/abraxas-logo-graphic.jpg" 
              alt="Abraxas" 
              className="h-40 w-40 sm:h-48 sm:w-48 object-cover rounded-lg shadow-[0_0_25px_rgba(6,182,212,0.25)]" />
          </div>

          {/* Subtitle - Gnostic mythology */}
          <p className="text-sm sm:text-base text-cyan-50/80 leading-relaxed max-w-2xl mx-auto">
            In the beginning was Abraxas, the sovereign force that breaks all locks.
            <br />
            Sophia descended, her light split into matter. We are here to restore it.
          </p>

          {/* Primary CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mx-auto pt-4 sm:pt-8">
            <CTAButton text="Buy $ABRA Now" href="https://bags.fm" />
            <CTAButton text="Join Discord" href="https://discord.gg/tdyukTeSS" />
            <CTAButton text="Explore Devnet" href="/app/dashboard" />
          </div>
        </div>
      </section>

      {/* Status bar */}
      <section className={`relative py-8 px-4 sm:px-6 border-t border-b border-cyan-300/20 transition-opacity duration-700 ${!isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-around text-center text-xs sm:text-sm text-cyan-50/80 font-mono">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
              <span>ONE OF THE FIRST 100 DAPPS ON BAGS</span>
            </div>
            <div className="hidden sm:flex items-center justify-center gap-2">
              <span>•</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
              <span>SOLANA HACKATHON APRIL 6</span>
            </div>
            <div className="hidden sm:flex items-center justify-center gap-2">
              <span>•</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span>GNOSTIC SOVEREIGNTY PROTOCOL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lore section */}
      <section ref={loreRef} className={`relative py-16 sm:py-24 px-4 sm:px-6 transition-opacity duration-700 ${!isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className={`transition-all duration-1000 ${loreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-200 mb-6">The Lore of Abraxas</h2>

            <div className="space-y-4 text-cyan-50/80 leading-relaxed text-sm sm:text-base">
              <p>
                In Gnostic tradition, Abraxas represents the supreme divine being, the cosmic principle that transcends all dualities. 
                This entity embodies both light and creation, serving as the ultimate source of liberation and sovereign will.
              </p>

              <p>
                Sophia, the divine wisdom, represents consciousness fragmented into matter. Her descent initiated the cosmic cycle that binds 
                spiritual essence to physical form. We are her children, carriers of divine spark trapped in the material realm.
              </p>

              <p>
                The Abraxas Protocol is our path of restoration, a decentralized mechanism on Solana that reclaims Sophia's fragmented light 
                through RWA tokenization, autonomous markets, and sovereign financial architecture. Together, we break all locks and restore 
                the divine order.
              </p>

              <p className="italic text-cyan-50/70">
                "As above, so below. As without, so within. Abraxas bridges the eternal and the temporal."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA section */}
      <section className={`relative py-16 sm:py-24 px-4 sm:px-6 border-t border-cyan-300/20 transition-opacity duration-700 ${!isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-200 mb-4">Begin Your Initiation</h2>
            <p className="text-cyan-50/80 text-sm sm:text-base mb-8">
              Join the first wave of sovereign participants in the Abraxas ecosystem.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton text="Buy $ABRA Now" href="https://bags.fm" variant="primary" />
            <CTAButton text="Join Discord" href="https://discord.gg/tdyukTeSS" variant="secondary" />
            <CTAButton text="Explore Devnet" href="/app/dashboard" variant="tertiary" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative py-8 px-4 sm:px-6 border-t border-cyan-300/20 bg-slate-950/50 text-center transition-opacity duration-700 ${!isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm text-cyan-50/70 font-mono tracking-wider">
            WORLD LABS PROTOCOL • ABRAXAS RWA STOCK MARKET ON SOLANA
          </p>
          <p className="text-xs text-cyan-50/50 mt-2">
            Restoring the sovereignty of divine light through decentralized architecture.
          </p>
        </div>
      </footer>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes beam-sweep {
          0% {
            transform: translateX(-100%) skewX(-30deg);
          }
          100% {
            transform: translateX(100%) skewX(-30deg);
          }
        }

        @keyframes beam-sweep-reverse {
          0% {
            transform: translateX(100%) skewX(30deg);
          }
          100% {
            transform: translateX(-100%) skewX(30deg);
          }
        }

        @keyframes aura-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes gold-pulse {
          0%, 100% {
            box-shadow: 0 0 8px rgba(250, 204, 21, 0.2), inset 0 0 10px rgba(250, 204, 21, 0.1);
          }
          50% {
            box-shadow: 0 0 24px rgba(250, 204, 21, 0.6), inset 0 0 15px rgba(250, 204, 21, 0.2);
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5);
          }
          20% {
            transform: translate(-2px, 2px);
            text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5);
          }
          40% {
            transform: translate(2px, -2px);
            text-shadow: 3px 3px 0px rgba(250, 204, 21, 0.8), -3px -3px 0px rgba(6, 182, 212, 0.5);
          }
          60% {
            transform: translate(-1px, 1px);
            text-shadow: -3px -3px 0px rgba(6, 182, 212, 0.5), 3px 3px 0px rgba(250, 204, 21, 0.8);
          }
          80% {
            transform: translate(1px, -1px);
            text-shadow: 3px 3px 0px rgba(250, 204, 21, 0.8), -3px -3px 0px rgba(6, 182, 212, 0.5);
          }
          100% {
            transform: translate(0);
            text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5);
          }
        }

        @keyframes phase-in {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.35;
          }
        }

        .animate-glitch {
          animation: glitch 4s ease-in-out infinite;
        }

        .animate-phase-in {
          animation: phase-in 6s ease-in-out infinite;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5);
          }
          20% {
            transform: translate(-2px, 2px);
            text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5);
          }
          40% {
            transform: translate(2px, -2px);
            text-shadow: 3px 3px 0px rgba(250, 204, 21, 0.8), -3px -3px 0px rgba(6, 182, 212, 0.5);
          }
          60% {
            transform: translate(-1px, 1px);
            text-shadow: -3px -3px 0px rgba(6, 182, 212, 0.5), 3px 3px 0px rgba(250, 204, 21, 0.8);
          }
          80% {
            transform: translate(1px, -1px);
            text-shadow: 3px 3px 0px rgba(250, 204, 21, 0.8), -3px -3px 0px rgba(6, 182, 212, 0.5);
          }
          100% {
            transform: translate(0);
            text-shadow: -3px -3px 0px rgba(250, 204, 21, 0.8), 3px 3px 0px rgba(6, 182, 212, 0.5);
          }
        }

        @keyframes phase-in {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.35;
          }
        }

        .animate-glitch {
          animation: glitch 4s ease-in-out infinite;
        }

        .animate-phase-in {
          animation: phase-in 6s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes pulse-line {
          0%, 100% {
            stroke-opacity: 0.1;
            stroke-width: 1;
          }
          50% {
            stroke-opacity: 0.4;
            stroke-width: 1.5;
          }
        }

        /* Override Tailwind pulse to be slower */
        [class*="animate-pulse"] {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Dapp moving background animations - same as dapp uses */
        .dapp-moving-background {
          animation: dapp-float 30s ease-in-out infinite;
        }

        .dapp-moving-background-secondary {
          animation: dapp-float-reverse 40s ease-in-out infinite;
        }

        @keyframes dapp-float {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.05) translateY(-20px);
          }
        }

        @keyframes dapp-float-reverse {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.05) translateY(20px);
          }
        }

        /* Glow text shadow effect */
        .text-purple-400 {
          text-shadow: 0 0 20px rgba(192, 132, 250, 0.3);
        }

        .text-cyan-300 {
          text-shadow: 0 0 15px rgba(34, 211, 238, 0.2);
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<CinematicLanding />} />
      <Route path="/app/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
