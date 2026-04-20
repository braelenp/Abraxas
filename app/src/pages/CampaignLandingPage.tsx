import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUserProfile } from '../hooks/useProfile';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ABRAXAS_PRIMARY_VALUE_PROP, ABRAXAS_SUPPORTING_VALUE_PROP } from '../lib/messaging';

/**
 * ── Campaign Landing Page (Profile Creation) ────────────────────────────────
 * Simple form for profile creation
 * After submission, navigate to whitepaper summary page
 */

function DarkBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-30 bg-slate-950" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 mix-blend-screen [background:linear-gradient(135deg,transparent_0%,rgba(34,211,238,0.2)_30%,transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-30 mix-blend-screen [background:linear-gradient(45deg,transparent_0%,rgba(157,78,221,0.15)_40%,transparent_70%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(ellipse_at_center,rgba(157,78,221,0.08)_0%,transparent_70%)]" />
    </>
  );
}

export function CampaignLandingPage() {
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  const { createProfile } = useUserProfile();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (): boolean => {
    setError('');

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

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError('Username can only contain letters, numbers, hyphens, and underscores');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const newProfile = await createProfile(username, publicKey.toString());
      // Navigate to whitepaper summary page after successful profile creation
      navigate('/whitepaper-summary', { state: { profile: newProfile } });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create profile. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950">
      <DarkBackground />

      <div className="relative z-10 min-h-screen w-full flex flex-col justify-center items-center px-4 py-8">
        {/* Header with back button */}
        <div className="w-full max-w-md mb-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors text-sm font-semibold"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
              Abraxas
            </h1>
          </div>
          <div className="w-6" />
        </div>

        {/* Main Form Container */}
        <div className="w-full max-w-md space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-100">
              Create Your Profile
            </h2>
            <p className="text-sm text-slate-300">
              {ABRAXAS_PRIMARY_VALUE_PROP} {ABRAXAS_SUPPORTING_VALUE_PROP}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-slate-200">
                Choose Your Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., sovereign_one"
                maxLength={20}
                disabled={isLoading || !publicKey}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-cyan-300/30 text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
              />
              <p className="text-xs text-slate-400">3-20 characters, letters/numbers/hyphens/underscores only</p>
            </div>

            {/* Email Input (Optional) */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
                Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isLoading || !publicKey}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-cyan-300/30 text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
              />
              <p className="text-xs text-slate-400">We'll send updates to this email</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/40 border border-red-500/50 rounded-lg p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !publicKey}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-purple-400/60 bg-gradient-to-r from-purple-500/30 to-pink-500/20 text-purple-100 font-bold text-lg hover:from-purple-500/40 hover:to-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_32px_rgba(153,69,255,0.3)] hover:shadow-[0_0_48px_rgba(153,69,255,0.5)]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-300 border-t-purple-600" />
                  Creating Profile...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Create Profile
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="bg-slate-900/40 border border-cyan-300/20 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-cyan-300">✧ Profile Protection</p>
            <p className="text-xs text-slate-300">
              Your profile is protected on Solana blockchain. You maintain complete control and ownership of your identity.
            </p>
          </div>

          {/* Warning if not connected */}
          {!publicKey && (
            <div className="bg-orange-900/40 border border-orange-500/50 rounded-lg p-4 text-center space-y-3">
              <p className="text-sm text-orange-200 font-semibold">
                Wallet Not Connected
              </p>
              <p className="text-xs text-orange-200/80">
                Please connect your Solana wallet to create a profile. Use the wallet button in the top navigation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
