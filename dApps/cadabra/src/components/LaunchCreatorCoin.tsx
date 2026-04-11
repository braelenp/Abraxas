/**
 * Launch Creator Coin Component
 * Allows users to launch a creator coin for any TikTok username
 */

import { useState } from 'react';
import { Music, Sparkles, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import {
  verifyTikTokCreator,
  estimateCreatorEarnings,
  formatFeeDistribution,
  calculateBondingCurvePrice,
} from '../lib/creatorEconomyUtils';

interface LaunchCreatorCoinProps {
  onSuccess?: (coinData: any) => void;
}

export function LaunchCreatorCoin({ onSuccess }: LaunchCreatorCoinProps) {
  const [step, setStep] = useState<'input' | 'verify' | 'configure' | 'launch' | 'success'>('input');
  const [username, setUsername] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinName, setCoinName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [creatorData, setCreatorData] = useState<any>(null);
  const [launchData, setLaunchData] = useState<any>(null);

  const handleVerifyCreator = async () => {
    if (!username.trim()) {
      setError('Please enter a TikTok username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify creator exists
      const creator = await verifyTikTokCreator(username);
      
      if (!creator.found) {
        setError(`Creator @${username} not found on TikTok`);
        setLoading(false);
        return;
      }

      setCreatorData(creator);
      setCoinSymbol(username.substring(0, 4).toUpperCase());
      setCoinName(`${creator.displayName}'s Creator Coin`);
      setStep('configure');
    } catch (err) {
      setError('Failed to verify creator. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunchCoin = async () => {
    if (!coinSymbol.trim() || !coinName.trim()) {
      setError('Please fill in coin details');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate coin launch
      const launchResult = {
        id: `coin_${Date.now()}`,
        symbol: coinSymbol,
        name: coinName,
        creator: creatorData,
        initialSupply: 1000000,
        decimals: 6,
        basePrice: calculateBondingCurvePrice(0, 1000000),
        estimatedMonthlyEarnings: estimateCreatorEarnings(
          creatorData.followers,
          10000
        ),
        feeDistribution: formatFeeDistribution(100), // Example: 100 ABRA
        mintAddress: `mint_${Math.random().toString(36).substr(2, 9)}`,
        launchedAt: Date.now(),
      };

      setLaunchData(launchResult);
      setStep('success');
      onSuccess?.(launchResult);
    } catch (err) {
      setError('Failed to launch coin. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setUsername('');
    setCoinSymbol('');
    setCoinName('');
    setError('');
    setCreatorData(null);
    setLaunchData(null);
  };

  return (
    <div className="relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 0.6; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(153, 69, 255, 0.4); }
          50% { box-shadow: 0 0 30px rgba(153, 69, 255, 0.6); }
        }
      `}</style>

      {/* Main Card */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/12 via-gray-900/80 to-purple-500/8 p-8 backdrop-blur">
        {/* Atmospheric Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-5 bg-repeat pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(153, 69, 255, 0.05) 25%, rgba(153, 69, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(153, 69, 255, 0.05) 75%, rgba(153, 69, 255, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 4px'
          }}
        />

        {/* Header */}
        <div className="relative z-10 space-y-3 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Music size={24} className="text-purple-400" />
            <h3 className="text-xl font-bold text-purple-300 uppercase tracking-wider">
              Launch Creator Coin
            </h3>
          </div>
          <p className="text-sm text-slate-300/80">
            Enter a TikTok username to instantly create a creator coin with automatic fee-sharing.
          </p>
        </div>

        {/* Content Sections */}
        <div className="relative z-10 space-y-6">
          {/* STEP 1: Input */}
          {step === 'input' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-2 block">
                  TikTok Username
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username (without @)"
                    className="flex-1 rounded-lg border border-purple-300/20 bg-slate-950/50 px-4 py-3 text-sm text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:ring-1 focus:ring-purple-400/40"
                    onKeyPress={(e) => e.key === 'Enter' && handleVerifyCreator()}
                  />
                  <button
                    onClick={handleVerifyCreator}
                    disabled={loading || !username.trim()}
                    className="px-6 py-3 rounded-lg border border-purple-400/60 bg-gradient-to-r from-purple-500/40 to-purple-400/30 text-sm font-bold uppercase text-purple-100 hover:border-purple-300/80 hover:shadow-[0_0_24px_rgba(153,69,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {loading ? <Loader size={16} className="animate-spin" /> : 'Verify'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-400/40 bg-red-950/30 p-3 flex gap-2">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-200">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Configure */}
          {step === 'configure' && creatorData && (
            <div className="space-y-4">
              {/* Creator Preview */}
              <div className="rounded-lg border border-purple-300/30 bg-purple-950/40 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-400/20 flex items-center justify-center text-xl">
                    {creatorData.avatar ? '🎵' : '👤'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-purple-200">{creatorData.displayName}</h4>
                    <p className="text-xs text-slate-400">
                      @{creatorData.username} • {(creatorData.followers / 1e6).toFixed(1)}M followers
                      {creatorData.verified && ' ✓'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coin Details */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-2 block">
                    Coin Symbol
                  </label>
                  <input
                    type="text"
                    value={coinSymbol}
                    onChange={(e) => setCoinSymbol(e.target.value.toUpperCase().slice(0, 8))}
                    maxLength={8}
                    className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-4 py-2 text-sm text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-purple-400/60"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Short ticker for the coin</p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-2 block">
                    Coin Name
                  </label>
                  <input
                    type="text"
                    value={coinName}
                    onChange={(e) => setCoinName(e.target.value)}
                    className="w-full rounded-lg border border-purple-300/20 bg-slate-950/50 px-4 py-2 text-sm text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-purple-400/60"
                  />
                </div>
              </div>

              {/* Fee Distribution Info */}
              <div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-3 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">Fee Distribution</h4>
                <div className="space-y-1 text-[10px] divide-y divide-cyan-300/10">
                  <div className="pb-1">Creator Share: <span className="text-purple-300 font-mono float-right">70%</span></div>
                  <div className="py-1">Holder Pool: <span className="text-purple-300 font-mono float-right">20%</span></div>
                  <div className="py-1">Platform (Abraxas): <span className="text-purple-300 font-mono float-right">5%</span></div>
                  <div className="pt-1">Bags Protocol: <span className="text-purple-300 font-mono float-right">5%</span></div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep('input')}
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-600/40 bg-slate-900/50 text-sm font-bold uppercase text-slate-300 hover:border-slate-600/60 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleLaunchCoin}
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-lg border border-purple-400/60 bg-gradient-to-r from-purple-500/40 to-purple-400/30 text-sm font-bold uppercase text-purple-100 hover:border-purple-300/80 hover:shadow-[0_0_24px_rgba(153,69,255,0.4)] disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {loading ? <Loader size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  {loading ? 'Launching...' : 'Launch Coin'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Success */}
          {step === 'success' && launchData && (
            <div className="space-y-4">
              {/* Success Badge */}
              <div className="rounded-lg border border-green-400/40 bg-green-950/30 p-4 flex gap-3">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-200">Creator Coin Launched!</h4>
                  <p className="text-xs text-green-200/70 mt-1">Your coin is now live and ready to receive fee-shares.</p>
                </div>
              </div>

              {/* Launch Details */}
              <div className="rounded-lg border border-purple-300/30 bg-purple-950/40 p-4 space-y-3">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Coin</p>
                  <p className="text-lg font-bold text-purple-200">
                    {launchData.symbol} <span className="text-sm text-slate-400">- {launchData.name}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400 uppercase tracking-wider mb-1">Initial Supply</p>
                    <p className="font-mono text-cyan-300">{(launchData.initialSupply / 1e6).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase tracking-wider mb-1">Starting Price</p>
                    <p className="font-mono text-cyan-300">{launchData.basePrice.toFixed(6)} ABRA</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase tracking-wider mb-1">Mint Address</p>
                    <p className="font-mono text-cyan-300 text-[9px] truncate">{launchData.mintAddress}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase tracking-wider mb-1">Est. Monthly Earnings</p>
                    <p className="font-mono text-green-300">${launchData.estimatedMonthlyEarnings.toFixed(0)}</p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="rounded-lg border border-cyan-300/20 bg-slate-950/50 p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">Next Steps</h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <p>✓ Share your coin with your TikTok audience</p>
                  <p>✓ Monetize views, tips, and donations</p>
                  <p>✓ Upload clips as La Casa NFTs in Forge</p>
                  <p>✓ Track earnings in Creator Dashboard</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full px-4 py-3 rounded-lg border border-purple-400/60 bg-gradient-to-r from-purple-500/40 to-purple-400/30 text-sm font-bold uppercase text-purple-100 hover:border-purple-300/80 hover:shadow-[0_0_24px_rgba(153,69,255,0.4)] transition"
              >
                Launch Another Coin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
