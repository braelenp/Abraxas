import { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

interface AcademyWhitelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (discordHandle?: string) => void;
}

type ModalState = 'form' | 'success';

export function AcademyWhitelistModal({ isOpen, onClose, onSuccess }: AcademyWhitelistModalProps) {
  const { publicKey } = useWallet();
  const [state, setModalState] = useState<ModalState>('form');
  const [walletAddress, setWalletAddress] = useState('');
  const [discordHandle, setDiscordHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  const fullText = 'The Academy Awaits';

  // Auto-fill wallet if connected
  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toBase58());
    }
  }, [publicKey]);

  // Typing effect for title
  useEffect(() => {
    if (!isOpen) return;
    
    setDisplayedText('');
    setTypingDone(false);
    let idx = 0;
    let isActive = true;

    const interval = setInterval(() => {
      if (isActive && idx < fullText.length) {
        setDisplayedText(fullText.slice(0, ++idx));
        if (idx === fullText.length) {
          setTypingDone(true);
          clearInterval(interval);
        }
      }
    }, 80);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [isOpen]);

  const handleEnroll = async () => {
    if (!walletAddress.trim()) {
      alert('Please enter your wallet address');
      return;
    }

    setIsSubmitting(true);

    // Simulate enrollment (in production, this would be a backend call)
    try {
      // Store enrollment in localStorage
      const enrollmentData = {
        walletAddress,
        discordHandle: discordHandle.trim() || 'Not provided',
        enrolledAt: new Date().toISOString(),
        status: 'whitelisted',
        bonusPoints: 500,
      };

      localStorage.setItem(`academy_whitelist_${walletAddress}`, JSON.stringify(enrollmentData));

      // Award bonus points by updating profile
      const currentProfile = JSON.parse(localStorage.getItem('abraxas_profile') || '{}');
      const newProfile = {
        ...currentProfile,
        academyWhitelisted: true,
        airdropPoints: (currentProfile.airdropPoints || 0) + 500,
        whitelistEnrolledAt: new Date().toISOString(),
      };
      localStorage.setItem('abraxas_profile', JSON.stringify(newProfile));

      // Show success screen
      setModalState('success');
      
      // Call callback after a delay
      setTimeout(() => {
        onSuccess(discordHandle);
      }, 2000);
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Enrollment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900/95 to-slate-950/95 rounded-2xl border border-purple-400/30 shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
          >
            <X size={20} />
          </button>

          {/* Glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative p-8 space-y-6">
            {state === 'form' ? (
              <>
                {/* Header section */}
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg animate-pulse" />
                      <Sparkles className="w-8 h-8 text-purple-400 relative" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-100 font-mono tracking-wider">
                    {displayedText}
                    {!typingDone && <span className="ml-1 animate-pulse text-purple-300">_</span>}
                  </h2>
                </div>

                {/* Lore section */}
                <div className="rounded-lg border border-purple-400/20 bg-slate-900/50 p-4 space-y-3">
                  <p className="text-xs font-mono uppercase tracking-widest text-purple-300">
                    &gt; [WHITELIST_ENROLLMENT]
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Enroll in the Abraxas Academy whitelist. Be among the first to receive the full curriculum, exclusive modules, bonus airdrop points, and Early Adopter status on your ID card.
                  </p>
                  <div className="pt-2 border-t border-purple-400/10 text-xs text-purple-300/60">
                    <p>✦ +500 Bonus Airdrop Points</p>
                    <p>✦ Early Adopter Badge</p>
                    <p>✦ Exclusive Module Access</p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  {/* Wallet Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder="Your Solana wallet address"
                      className="w-full px-4 py-2.5 bg-slate-800/50 border border-purple-400/20 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:bg-slate-800/70 transition-colors text-sm font-mono"
                    />
                  </div>

                  {/* Discord Handle */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-slate-400">
                      Discord Handle <span className="text-slate-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={discordHandle}
                      onChange={(e) => setDiscordHandle(e.target.value)}
                      placeholder="username#0000"
                      className="w-full px-4 py-2.5 bg-slate-800/50 border border-purple-400/20 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:bg-slate-800/70 transition-colors text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Enroll button */}
                <button
                  onClick={handleEnroll}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-slate-700 disabled:to-slate-600 text-white font-bold uppercase tracking-wider rounded-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                >
                  {isSubmitting ? 'Enrolling...' : 'Enroll Now'}
                </button>

                {/* Disclaimer */}
                <p className="text-xs text-slate-500 text-center leading-relaxed">
                  Your enrollment will grant Academy access and bonus airdrop points immediately.
                </p>
              </>
            ) : (
              <>
                {/* Success state */}
                <div className="text-center space-y-6 py-6">
                  {/* Success icon with animation */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
                      <div className="relative bg-emerald-500/20 p-4 rounded-full border border-emerald-400/50">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                      </div>
                    </div>
                  </div>

                  {/* Success message */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-emerald-300 font-mono tracking-wider">
                      WHITELISTED
                    </h3>
                    <p className="text-sm text-slate-300">
                      Welcome to the Academy
                    </p>
                  </div>

                  {/* Rewards display */}
                  <div className="rounded-lg border border-emerald-400/20 bg-slate-900/50 p-4 space-y-2">
                    <p className="text-xs font-mono uppercase tracking-widest text-emerald-300">
                      &gt; [ENROLLMENT_REWARDS]
                    </p>
                    <div className="space-y-1 text-sm text-slate-300">
                      <p>✦ <span className="text-emerald-300 font-semibold">+500 Airdrop Points</span> awarded</p>
                      <p>✦ <span className="text-emerald-300 font-semibold">Whitelisted Badge</span> added to ID card</p>
                      <p>✦ Academy access <span className="text-emerald-300 font-semibold">unlocked</span></p>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 hover:border-emerald-400/60 text-emerald-300 font-bold uppercase tracking-wider rounded-lg transition-all"
                  >
                    Got It
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
