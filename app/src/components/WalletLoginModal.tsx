/**
 * Wallet Login Modal
 * - Allow users to verify wallet and login to existing profile
 * - Shows profile details if found
 * - Fallback to create profile if not found
 */

import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUserProfile } from '../hooks/useProfile';
import { AbraxasIDCard } from './AbraxasIDCard';
import type { UserProfile } from '../lib/types';

interface WalletLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileLoaded?: (profile: UserProfile) => void;
  onCreateProfile?: () => void;
}

export function WalletLoginModal({
  isOpen,
  onClose,
  onProfileLoaded,
  onCreateProfile,
}: WalletLoginModalProps) {
  const { publicKey } = useWallet();
  const { getProfileByWallet, loadProfileByWallet } = useUserProfile();

  const [isVerifying, setIsVerifying] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'verify' | 'result' | 'notfound'>('verify');

  const handleVerifyWallet = async () => {
    if (!publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simulate a small delay for verification
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load profile and set it as active user profile
      const foundProfile = loadProfileByWallet(publicKey.toString());
      
      if (foundProfile) {
        setProfile(foundProfile);
        setStep('result');
        
        // Auto-trigger callback after showing result
        setTimeout(() => {
          if (onProfileLoaded) {
            onProfileLoaded(foundProfile);
          }
        }, 1500);
      } else {
        setStep('notfound');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to verify wallet. Please try again.'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setProfile(null);
    setError('');
    setStep('verify');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-2xl border border-cyan-500/50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 transition z-10"
          >
            <X size={24} />
          </button>

          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5 bg-repeat rounded-2xl"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.5) 4px)',
            }}
          />

          <div className="relative p-8 space-y-6">
            {step === 'verify' && (
              <>
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-orange-300 bg-clip-text">
                    Verify Your Wallet
                  </h1>
                  <p className="text-slate-400">
                    Sign in to your Abraxas profile
                  </p>
                </div>

                <div className="space-y-4">
                  {publicKey && (
                    <div className="bg-slate-950/50 border border-cyan-500/20 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-2">Connected Wallet</p>
                      <p className="text-sm font-mono text-cyan-300 break-all">
                        {publicKey.toString()}
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleVerifyWallet}
                    disabled={isVerifying || !publicKey}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-lg transition disabled:cursor-not-allowed"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Login'}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    We'll check if you have an existing profile on the Abraxas network
                  </p>
                </div>
              </>
            )}

            {step === 'result' && profile && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-green-500/50 rounded-full" />
                    <CheckCircle
                      size={64}
                      className="relative text-green-400 animate-bounce"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-green-400">
                    Profile Found!
                  </h2>
                  <p className="text-slate-400">
                    Welcome back, {profile.username || 'Initiate'}
                  </p>
                </div>

                {/* Mini ID Card */}
                <div className="scale-75 origin-top">
                  <AbraxasIDCard profile={profile} compact={true} />
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-2">
                  <div className="text-sm text-slate-300">
                    <span className="text-purple-300 font-semibold">{profile.abraxasId}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {profile.airdropPoints.total} Total Airdrop Points
                  </p>
                </div>
              </div>
            )}

            {step === 'notfound' && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-orange-500/50 rounded-full" />
                    <AlertCircle
                      size={64}
                      className="relative text-orange-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-orange-400">
                    No Profile Found
                  </h2>
                  <p className="text-slate-400">
                    This wallet doesn't have an Abraxas profile yet
                  </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm text-slate-300">
                    Ready to join the Sharathon? Create a new profile to get started.
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleClose();
                    if (onCreateProfile) onCreateProfile();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-lg transition"
                >
                  Create New Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
