import { useEffect, useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Copy, Check, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useUserProfile } from '../hooks/useProfile';
import { createReferralLink } from '../lib/profileUtils';
import { ProfileCreationModal } from '../components/ProfileCreationModal';
import { WalletLoginModal } from '../components/WalletLoginModal';
import { AbraxasIDCard } from '../components/AbraxasIDCard';
import { AirdropPointsWidget } from '../components/AirdropPointsWidget';
import { AcademyWhitelistModal } from '../components/AcademyWhitelistModal';

// ── Typing Effect Hook ───────────────────────────────────────────────────────
function useTypingEffect(text: string, speed = 40, delay = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      let currentIndex = 0;
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex += 1;
        } else {
          setIsComplete(true);
          if (intervalId) clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [delay, speed, text]);

  return { displayedText, isComplete };
}

// ── Monolith with Orbiting Runes ─────────────────────────────────────────────
function MonolithGateway() {
  const runes = ['ᚲ', 'ᚨ', 'ᛋ', '✦', 'ᛏ', 'ᚦ', 'ᛚ'];
  
  return (
    <div className="relative h-72 w-72 mx-auto mb-2">
      {/* Central Abraxas Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(153,69,255,0.6),inset_0_0_20px_rgba(153,69,255,0.3)]">
          <img
            src="/assets/abraxas-logo-graphic.jpg"
            alt="Abraxas"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Orbiting Runes */}
      {runes.map((rune, index) => {
        const angle = (index / runes.length) * 360;
        const delay = index * 0.15;
        return (
          <div
            key={index}
            className="absolute w-full h-full"
            style={{
              animation: `rotate-orbit 20s linear infinite`,
              animationDelay: `-${delay}s`,
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-purple-400 to-orange-400 filter drop-shadow-[0_0_8px_rgba(153,69,255,0.6)] font-bold">
                {rune}
              </span>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes rotate-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ── Hero Section with Typing ─────────────────────────────────────────────────
function HeroSection() {
  const { displayedText: line1, isComplete: isLine1Done } = useTypingEffect(
    'Welcome to the next degree.',
    50,
    200
  );
  const { displayedText: line2 } = useTypingEffect(
    'AI is not perfect. It is Artificial Human.',
    40,
    2000
  );

  return (
    <div className="relative mb-12 text-center">
      {/* Glitch effect backdrop */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-transparent to-orange-600/10 blur-2xl" />
      </div>

      <MonolithGateway />

      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-orange-400">
            {line1}
          </span>
          <span className={isLine1Done ? 'block' : 'hidden'}>
            <div className="h-1" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
              {line2}
            </span>
          </span>
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed mx-4">
          <span className="text-cyan-300 font-semibold">Web5 Biological Ledger</span> on Solana
        </p>

        <div className="bg-slate-900/50 border border-purple-400/30 rounded-lg p-4 mx-4 text-xs leading-relaxed text-slate-200 backdrop-blur-sm">
          <p className="text-purple-300 font-semibold mb-2">∴ The Next Transmutation ∴</p>
          <p>
            Abraxas captures your sovereign identity through <span className="text-cyan-300">stress inheritance patterns</span> and 
            <span className="text-pink-300"> biological markers</span> verified on-chain. Each profile mints an unforgeable 
            <span className="text-orange-300"> Abraxas ID Card</span> — your key to the airdrop economy and Monolith ownership.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Profile Creation Section ─────────────────────────────────────────────────
function ProfileCreationSection() {
  const { profile } = useUserProfile();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createdProfile, setCreatedProfile] = useState<any>(null);

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
          ∴ Ritual Initiation ∴
        </h2>
        <p className="text-xs text-slate-300 mt-2">Create your Abraxas Profile to begin</p>
      </div>

      {!profile && !createdProfile ? (
        <div className="bg-slate-900/60 border border-cyan-300/30 rounded-xl p-6 backdrop-blur-sm text-center space-y-4">
          <div className="text-4xl mb-4">✧</div>
          <p className="text-sm text-slate-200">
            No profile yet. Generate your Abraxas ID Card and join the Sharathon.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleOpenLoginModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-cyan-400/60 bg-cyan-500/20 text-cyan-200 font-semibold text-sm hover:bg-cyan-500/30 transition-all shadow-[0_0_16px_rgba(34,197,94,0.2)]"
            >
              Login
              <ArrowRight size={16} />
            </button>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-purple-400/60 bg-purple-500/20 text-purple-200 font-semibold text-sm hover:bg-purple-500/30 transition-all shadow-[0_0_16px_rgba(153,69,255,0.2)]"
            >
              Create Profile
              <ArrowRight size={16} />
            </button>
          </div>

          <WalletLoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onProfileLoaded={(profile) => {
              setCreatedProfile(profile);
              setShowLoginModal(false);
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }}
            onCreateProfile={handleOpenCreateModal}
          />

          <ProfileCreationModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onProfileCreated={(profile) => {
              setCreatedProfile(profile);
              setShowCreateModal(false);
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {createdProfile && <AbraxasIDCard profile={createdProfile} compact={true} />}
        </div>
      )}
    </div>
  );
}

// ── Sharathon Section ────────────────────────────────────────────────────────
function SharathanSection() {
  const { profile } = useUserProfile();
  const [copiedLink, setCopiedLink] = useState(false);
  const referralLink = profile ? createReferralLink(profile.abraxasId, profile.rune, profile.referralCode) : null;

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const shareTwitter = () => {
    if (referralLink) {
      const text = `Join me on Abraxas — AI is not perfect. It is Artificial Human. 🔮 Making DeFi great again. ${referralLink}`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
    }
  };

  const shareDiscord = () => {
    if (referralLink) {
      const text = `Check out Abraxas! ${referralLink}`;
      navigator.clipboard.writeText(text);
      alert('Discord share text copied to clipboard');
    }
  };

  if (!profile) {
    return (
      <div className="mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-pink-400">
            ∴ Sharathon Campaign ∴
          </h2>
          <p className="text-xs text-slate-300 mt-2">Create a profile to participate</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-pink-400">
          ∴ Sharathon Campaign ∴
        </h2>
        <p className="text-xs text-slate-300 mt-2">Share & Earn Airdrop Points</p>
      </div>

      <div className="space-y-4">
        {/* Referral Link */}
        <div className="bg-slate-900/60 border border-orange-300/30 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-xs text-slate-300 mb-2 font-semibold uppercase tracking-wider">Your Referral Link</p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={referralLink || ''}
              className="flex-1 bg-slate-950/80 border border-orange-300/20 rounded px-3 py-2 text-xs text-slate-300 truncate"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-2 rounded bg-orange-500/20 border border-orange-400/50 text-orange-300 hover:bg-orange-500/30 transition-all text-xs font-semibold"
            >
              {copiedLink ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={shareTwitter}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 transition-all text-sm font-semibold"
          >
            <ExternalLink size={14} /> Twitter
          </button>
          <button
            onClick={shareDiscord}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/30 transition-all text-sm font-semibold"
          >
            <ExternalLink size={14} /> Discord
          </button>
        </div>

        {/* Points Tracker */}
        <AirdropPointsWidget compact={true} />
      </div>
    </div>
  );
}

// ── Monolith Transmutation Gate (Token-Gated) ────────────────────────────────
function MonolithTransmutationGate() {
  const { publicKey } = useWallet();
  const { profile } = useUserProfile();
  const [hasMonolith, setHasMonolith] = useState(false);
  const [showMintComponent, setShowMintComponent] = useState(false);

  // Placeholder: would check on-chain for Monolith NFT
  const checkMonolithOwnership = async () => {
    // TODO: Implement actual on-chain checking via world-labs or Metaplex
    console.log('Checking Monolith ownership for:', publicKey?.toString());
  };

  const handleMintSuccess = (mintAddress: string) => {
    setHasMonolith(true);
    setShowMintComponent(false);
    console.log('Monolith minted:', mintAddress);
  };

  useEffect(() => {
    if (publicKey) {
      checkMonolithOwnership();
    }
  }, [publicKey]);

  if (!profile) return null;

  // Show mint component if user clicks "Mint Monolith"
  if (showMintComponent) {
    const { PhantomNFTMintComponent } = require('../components/PhantomNFTMintComponent');
    return (
      <div className="mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            ∴ Monolith Transmutation ∴
          </h2>
          <p className="text-xs text-slate-300 mt-2">Genesis NFT Minting</p>
        </div>

        <PhantomNFTMintComponent 
          nftType="monolith"
          onSuccess={handleMintSuccess}
        />

        <button
          onClick={() => setShowMintComponent(false)}
          className="w-full mt-4 px-6 py-2 rounded-lg border border-slate-400/40 bg-slate-800/30 text-slate-400 font-semibold text-sm hover:bg-slate-800/50 transition"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
          ∴ Monolith Transmutation ∴
        </h2>
        <p className="text-xs text-slate-300 mt-2">Genesis Holder Status</p>
      </div>

      <div className="bg-gradient-to-b from-purple-900/40 to-slate-900/60 border border-purple-400/40 rounded-xl p-6 backdrop-blur-sm">
        <div className="text-center space-y-4">
          {hasMonolith ? (
            <>
              <div className="text-4xl">◆</div>
              <h3 className="text-lg font-bold text-purple-300">Genesis Monolith NFT</h3>
              <p className="text-xs text-slate-300">
                You own a Genesis Monolith. Unlock:
              </p>
              <ul className="text-xs text-slate-300 space-y-1 text-left ml-4">
                <li>✓ 2x Airdrop Multiplier</li>
                <li>✓ Early Species Access</li>
                <li>✓ Biological Ledger Mark</li>
              </ul>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-300">
                Hold minimum <span className="text-orange-300 font-semibold">$ABRA</span> to mint your Monolith NFT
              </p>
              <button 
                onClick={() => setShowMintComponent(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-purple-500/60 bg-purple-600/20 text-purple-300 font-semibold text-sm hover:bg-purple-600/30 transition-all shadow-[0_0_16px_rgba(153,69,255,0.2)]"
              >
                Mint Monolith
                <ArrowRight size={16} />
              </button>
              <p className="text-xs text-slate-400 text-center">
                Live now • Mint with Phantom wallet
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Claim Airdrop Section ────────────────────────────────────────────────────
function ClaimAirdropSection() {
  const { profile } = useUserProfile();
  const sharathanEndDate = new Date('2026-05-01');
  const isActive = new Date() < sharathanEndDate;

  if (!profile) return null;

  return (
    <div className="mb-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
          ∴ Airdrop Claim ∴
        </h2>
      </div>

      <div className="bg-slate-900/60 border border-slate-500/30 rounded-xl p-6 backdrop-blur-sm">
        {isActive ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-amber-300 font-semibold">
              🔒 Sharathon in progress
            </p>
            <p className="text-xs text-slate-300">
              Claims unlock after {sharathanEndDate.toLocaleDateString()}
            </p>
            <button disabled className="w-full px-4 py-2.5 rounded-lg border border-slate-500/30 bg-slate-700/30 text-slate-400 font-semibold text-sm cursor-not-allowed opacity-50">
              Claim Airdrop (Disabled)
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-sm text-green-300 font-semibold">
              ✓ Ready to claim
            </p>
            <button className="w-full px-4 py-2.5 rounded-lg border border-green-500/60 bg-green-600/20 text-green-300 font-semibold text-sm hover:bg-green-600/30 transition-all shadow-[0_0_16px_rgba(34,197,94,0.2)]">
              Go to Treasury & Claim
            </button>
            <p className="text-xs text-slate-400">
              Redirects to World Labs Treasury Vault
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Species Showcase ─────────────────────────────────────────────────────────
function SpeciesShowcase() {
  const species = [
    {
      name: 'Nautica',
      rune: '◈',
      color: 'from-blue-500 to-cyan-500',
      description: 'Ocean Protocol Integration',
      link: '/daughters/nautica'
    },
    {
      name: 'Eir',
      rune: '◆',
      color: 'from-purple-500 to-pink-500',
      description: 'Healing & RWA Bonds',
      link: '/daughters/eir'
    },
    {
      name: 'Astra',
      rune: '◉',
      color: 'from-yellow-500 to-orange-500',
      description: 'Stellar Analytics',
      link: '/daughters/astra'
    },
    {
      name: 'Forge Hub',
      rune: 'ᚲ',
      color: 'from-orange-500 to-red-500',
      description: 'Yield Engine',
      link: '/app'
    },
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400">
          ∴ Species & Domains ∴
        </h2>
        <p className="text-xs text-slate-300 mt-2">Meet your digital generations</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {species.map((specie) => (
          <a
            key={specie.name}
            href={specie.link}
            className="group relative overflow-hidden rounded-lg border border-slate-500/30 bg-slate-900/40 hover:border-slate-400/50 transition-all backdrop-blur-sm p-4 text-center"
          >
            <div className={`text-3xl mb-2 bg-gradient-to-r ${specie.color} bg-clip-text text-transparent`}>
              {specie.rune}
            </div>
            <h3 className="text-sm font-bold text-slate-100 mb-1">{specie.name}</h3>
            <p className="text-xs text-slate-400">{specie.description}</p>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white to-transparent transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Discord CTA ──────────────────────────────────────────────────────────────
function DiscordCTA() {
  return (
    <div className="mb-8">
      <div className="relative rounded-xl border border-indigo-400/40 bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-indigo-950/60 p-8 backdrop-blur-sm overflow-hidden">
        {/* Glowing background */}
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 blur-3xl" />
        </div>

        <div className="relative text-center space-y-4">
          <div className="text-4xl">💜</div>
          <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
            Early Adopter Status
          </h3>
          <p className="text-sm text-slate-300">
            Join our Discord community and claim <span className="text-indigo-300 font-semibold">Early Adopter role</span>
          </p>
          <a
            href="https://discord.gg/JmuXbx3MW"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-indigo-400/60 bg-indigo-600/30 text-indigo-200 font-bold text-base hover:bg-indigo-600/40 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            <span>Join Discord</span>
            <ExternalLink size={18} />
          </a>
          <p className="text-xs text-slate-400">
            Instant role · Alpha access · Community DAO
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Campaign Landing Page ───────────────────────────────────────────────
export function CampaignLandingPage() {
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    const scrollToTop = () => {
      // Force scroll on both document and window
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    // Immediate scroll attempt
    scrollToTop();
    
    // Wait for first animation frame
    const rafId1 = requestAnimationFrame(() => {
      scrollToTop();
      
      // Wait for second animation frame
      const rafId2 = requestAnimationFrame(() => {
        scrollToTop();
      });
      
      return () => cancelAnimationFrame(rafId2);
    });

    // Also use setTimeout as fallback with increasing delays
    const timeoutIds = [
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 150),
      setTimeout(scrollToTop, 300),
    ];

    return () => {
      cancelAnimationFrame(rafId1);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-slate-950" ref={topRef}>
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-slate-950" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-slate-900/0 via-slate-950/25 to-slate-950/55" />
      <div className="pointer-events-none fixed -top-28 left-1/2 -z-20 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="pointer-events-none fixed top-44 -right-24 -z-20 h-72 w-72 rounded-full bg-orange-600/5 blur-3xl" />
      
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.07)_0px,rgba(148,163,184,0.07)_1px,transparent_2px,transparent_5px)]" />
      
      {/* Glitch/pulse effect */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(105deg,transparent_20%,rgba(153,69,255,0.15)_50%,transparent_78%)] animate-pulse" />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-2">
          <div className="flex-1">
            <div className="text-4xl md:text-5xl font-black tracking-tighter mb-1">✧ ABRAXAS ✧</div>
            <p className="text-xs text-slate-400 uppercase tracking-widest">The Next Transmutation</p>
          </div>
          <div className="flex-shrink-0">
            <div className="[&>button]:!bg-gradient-to-r [&>button]:!from-purple-600 [&>button]:!to-cyan-600 [&>button]:!border-purple-500 [&>button]:!text-sm">
              <WalletMultiButton />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Profile Creation */}
        <ProfileCreationSection />

        {/* Sharathon */}
        <SharathanSection />

        {/* Monolith Gate */}
        <MonolithTransmutationGate />

        {/* Claim Airdrop */}
        <ClaimAirdropSection />

        {/* Discord CTA */}
        <DiscordCTA />

        {/* Enter DApp Button */}
        <div className="border-t border-slate-700/50 pt-8 pb-12 text-center space-y-4">
          {/* Academy Whitelist Button */}
          <button
            onClick={() => setShowWhitelistModal(true)}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-purple-400/40 bg-gradient-to-r from-purple-500/20 to-purple-400/10 text-purple-200 font-semibold text-sm hover:from-purple-500/30 hover:to-purple-400/20 transition-all shadow-lg shadow-purple-500/10"
          >
            <Sparkles size={16} />
            <span>Join Academy Whitelist</span>
          </button>

          <button
            onClick={() => navigate('/app')}
            className="inline-flex items-center gap-3 px-12 py-4 rounded-xl border border-purple-400/60 bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-purple-200 font-bold text-lg hover:from-purple-600/50 hover:to-pink-600/50 transition-all shadow-[0_0_32px_rgba(153,69,255,0.3)]"
          >
            <span>✧ Start Initiation</span>
            <ArrowRight size={20} />
          </button>
          <p className="text-xs text-slate-400">
            Proceed to the Abraxas Dapp Protocol
          </p>
          <p className="text-xs text-slate-500">
            You will need to hold minimum $ABRA to access all features
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 pt-6 pb-12 text-center text-xs text-slate-400">
          <p>Built on Solana • Powered by World Labs • Verified by Bags DEX</p>
          <p className="mt-2">© 2026 Abraxas Protocol. All transmutations reserved. 🔮</p>
        </div>
      </div>

      {/* Academy Whitelist Modal */}
      <AcademyWhitelistModal
        isOpen={showWhitelistModal}
        onClose={() => setShowWhitelistModal(false)}
        onSuccess={() => setShowWhitelistModal(false)}
      />
    </div>
  );
}
