import React, { useEffect, useState } from 'react';
import { RaidhoRune } from './RaidhoRune';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 3000,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, duration / 10);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const loadingStages = [
    'Initializing Raido Protocol...',
    'Scanning Solana ecosystem...',
    'Loading liquidity pools...',
    'Connecting to Tide...',
    'Standing by for Swift Provider...',
  ];

  const currentStage = Math.floor((progress / 100) * loadingStages.length);

  return (
    <div className="fixed inset-0 z-50 bg-raido-black flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-raido-gold opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-raido-deep-blue-accent opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center space-y-8 md:space-y-12 px-4">
        {/* Rune with pulse */}
        <div className="flex justify-center">
          <RaidhoRune size={150} animated={true} />
        </div>

        {/* Loading text with fade in/out */}
        <div className="h-16 md:h-20 flex items-center justify-center">
          <p className="text-lg md:text-2xl text-raido-gold text-glow animate-pulse">
            {loadingStages[Math.min(currentStage, loadingStages.length - 1)]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 mx-auto">
          <div className="relative h-2 md:h-3 bg-raido-deep-blue-accent bg-opacity-40 rounded-full overflow-hidden border border-raido-gold border-opacity-20">
            <div
              className="h-full bg-gradient-to-r from-raido-gold to-raido-gold-light transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-xs md:text-sm text-raido-gold mt-3 md:mt-4 opacity-60">
            {Math.floor(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Status indicator */}
        <div className="text-sm md:text-base text-gray-400 space-y-2">
          <p>Raido is awakening...</p>
          <p className="text-xs md:text-sm opacity-60">The Swift Provider rises</p>
        </div>
      </div>
    </div>
  );
};
