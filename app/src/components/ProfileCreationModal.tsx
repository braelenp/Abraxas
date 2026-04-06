/**
 * Profile Creation Modal
 * - Blurred/elevated backdrop
 * - Form for email and username
 * - Real-time ID card preview
 * - Confirmation flow
 */

import { X, Sparkles, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUserProfile } from '../hooks/useProfile';
import { AbraxasIDCard } from './AbraxasIDCard';
import type { UserProfile } from '../lib/types';

interface ProfileCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileCreated?: (profile: UserProfile) => void;
}

export function ProfileCreationModal({
  isOpen,
  onClose,
  onProfileCreated,
}: ProfileCreationModalProps) {
  const { publicKey } = useWallet();
  const { profile, createProfile } = useUserProfile();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [previewProfile, setPreviewProfile] = useState<UserProfile | null>(null);
  const [step, setStep] = useState<'form' | 'preview' | 'confirmation'>('form');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile && isPreview) {
      setPreviewProfile(profile);
    }
  }, [profile, isPreview]);

  const validateForm = (): boolean => {
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!username.trim()) {
      setError('Username is required');
      return false;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }

    if (username.length > 20) {
      setError('Username must be 20 characters or less');
      return false;
    }

    // Check if username contains only valid characters
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError('Username can only contain letters, numbers, hyphens, and underscores');
      return false;
    }

    return true;
  };

  const handleCreateProfile = async () => {
    if (!validateForm() || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      const newProfile = await createProfile(email, username, publicKey.toString());
      setPreviewProfile(newProfile);
      setStep('preview');

      // Automatically move to confirmation after 2 seconds
      setTimeout(() => {
        setStep('confirmation');
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create profile. Please try again.'
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleConfirm = () => {
    if (previewProfile && onProfileCreated) {
      onProfileCreated(previewProfile);
    }
    handleClose();
  };

  const handleClose = () => {
    setEmail('');
    setUsername('');
    setStep('form');
    setError('');
    setPreviewProfile(null);
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
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={24} className="text-purple-400" />
                <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-orange-300 bg-clip-text">
                  Welcome to Abraxas
                </h1>
                <Sparkles size={24} className="text-purple-400" />
              </div>
              <p className="text-slate-400">
                Create your profile to participate in the Sharathon Campaign
              </p>
            </div>

            {/* Content based on step */}
            {step === 'form' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition"
                    disabled={isCreating}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))
                    }
                    placeholder="your-username"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition"
                    disabled={isCreating}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    3-20 characters. Letters, numbers, hyphens, underscores only.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <p className="text-xs text-slate-400 text-center">
                  Your unique Abraxas ID and mystical rune will be assigned upon profile creation.
                </p>

                <button
                  onClick={handleCreateProfile}
                  disabled={isCreating || !email.trim() || !username.trim()}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-lg transition disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Creating Profile...' : 'Create Profile & ID Card'}
                </button>
              </div>
            )}

            {step === 'preview' && previewProfile && (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <Sparkles className="text-purple-400 mb-2 animate-spin" size={24} />
                  <p className="text-slate-400 text-center">
                    Generating your mystical Abraxas signature...
                  </p>
                </div>

                {/* Mini ID Card Preview */}
                <div className="scale-75 origin-top">
                  <AbraxasIDCard profile={previewProfile} compact={true} />
                </div>

                {/* Key Details */}
                <div className="space-y-3 bg-slate-950/50 rounded border border-cyan-500/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{previewProfile.rune}</div>
                    <div>
                      <div className="text-sm font-mono text-purple-300">
                        {previewProfile.abraxasId}
                      </div>
                      <div className="text-xs text-slate-400">
                        @{previewProfile.username}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 italic">
                    "{previewProfile.blessing}"
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-xs border-t border-slate-700 pt-3 mt-3">
                    <div>
                      <div className="text-slate-500">Initial Points</div>
                      <div className="text-lg font-bold text-orange-300">
                        {previewProfile.airdropPoints.profileCreation}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Referral Code</div>
                      <div className="text-lg font-bold font-mono text-cyan-300">
                        {previewProfile.referralCode.slice(0, 4)}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Status</div>
                      <div className="text-lg font-bold text-green-400">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'confirmation' && previewProfile && (
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
                    Profile Created Successfully!
                  </h2>
                  <p className="text-slate-400">
                    Welcome to the Abraxas Sharathon, {previewProfile.username}
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-3">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Your ID Card</div>
                    <div className="text-2xl font-mono font-bold text-purple-300">
                      {previewProfile.abraxasId}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-400 mb-1">Your Rune</div>
                    <div className="text-5xl">{previewProfile.rune}</div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-400 mb-1">Starting Points</div>
                    <div className="text-3xl font-bold text-orange-300">
                      {previewProfile.airdropPoints.profileCreation}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 italic border-t border-purple-500/20 pt-3">
                    "{previewProfile.blessing}"
                  </p>
                </div>

                <div className="bg-slate-950/50 rounded border border-cyan-500/20 p-4 text-left space-y-2 text-sm">
                  <p className="text-slate-300">
                    ✨ Your ID card is ready to share! Earn points by:
                  </p>
                  <ul className="text-slate-400 space-y-1 ml-4">
                    <li>• Sharing your ID with others (+10 pts per share)</li>
                    <li>• Successful referrals signing up (+50 pts)</li>
                    <li>• Successful referrals staking (+150 pts bonus)</li>
                    <li>• Community engagement (+5 pts per action)</li>
                  </ul>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-lg transition"
                >
                  View My Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
