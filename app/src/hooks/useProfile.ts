/**
 * Profile Management Hooks
 * - useUserProfile: Get and manage user profile
 * - useAirdropPoints: Manage airdrop points
 * - useReferrals: Manage referral tracking
 */

import { useCallback, useEffect } from 'react';
import { useAbraxas } from '../providers/AbraxasProvider';
import type { UserProfile, AirdropLeaderboardEntry } from '../lib/types';

/**
 * Hook to manage user profile
 */
export function useUserProfile() {
  const { userProfile, createUserProfile, getProfileByWallet } = useAbraxas();

  const createProfile = useCallback(
    async (username?: string, walletAddress?: string, xData?: { xHandle: string; xUserId: string }) => {
      if (!userProfile) {
        // Use provided walletAddress or generate a default one
        const address = walletAddress || crypto.randomUUID();
        return createUserProfile({
          walletAddress: address,
          username,
          xHandle: xData?.xHandle,
          xUserId: xData?.xUserId,
        });
      }
      return userProfile;
    },
    [userProfile, createUserProfile],
  );

  return {
    profile: userProfile,
    createProfile,
    getProfileByWallet,
  };
}

/**
 * Hook to manage airdrop points
 */
export function useAirdropPoints() {
  const { userProfile, addAirdropPoints, recordReferralAction } = useAbraxas();

  const addPoints = useCallback(
    (actionType: string, amount?: number) => {
      if (userProfile) {
        addAirdropPoints(userProfile.walletAddress, actionType, amount);
      }
    },
    [userProfile, addAirdropPoints],
  );

  const recordShare = useCallback(() => {
    if (userProfile) {
      const pointsAwarded = 10; // Points for sharing ID card
      recordReferralAction(userProfile.walletAddress, 'share', pointsAwarded);
      addPoints('card_share', pointsAwarded);
    }
  }, [userProfile, recordReferralAction, addPoints]);

  const recordSignup = useCallback(() => {
    if (userProfile) {
      const pointsAwarded = 50; // Points for successful signup referral
      recordReferralAction(userProfile.walletAddress, 'signup', pointsAwarded);
    }
  }, [userProfile, recordReferralAction]);

  const recordStakingReferral = useCallback(() => {
    if (userProfile) {
      const pointsAwarded = 150; // Bonus points for staking referral
      recordReferralAction(userProfile.walletAddress, 'staking', pointsAwarded);
    }
  }, [userProfile, recordReferralAction]);

  return {
    currentPoints: userProfile?.airdropPoints.total ?? 0,
    pointsBreakdown: userProfile?.airdropPoints ?? null,
    addPoints,
    recordShare,
    recordSignup,
    recordStakingReferral,
  };
}

/**
 * Hook to manage referrals
 */
export function useReferrals() {
  const {
    userProfile,
    referralRecords,
    recordReferralAction,
    recordSuccessfulReferral,
    refreshLeaderboard,
  } = useAbraxas();

  const recordReferralShare = useCallback(
    (referralCode: string) => {
      if (userProfile) {
        recordReferralAction(userProfile.walletAddress, 'share', 10);
      }
    },
    [userProfile, recordReferralAction],
  );

  const recordNewReferral = useCallback(
    (referralId: string, referreeWallet: string) => {
      recordSuccessfulReferral(referralId, referreeWallet);
      refreshLeaderboard();
    },
    [recordSuccessfulReferral, refreshLeaderboard],
  );

  useEffect(() => {
    refreshLeaderboard();
  }, [referralRecords, refreshLeaderboard]);

  return {
    referralCode: userProfile?.referralCode ?? '',
    referralsSent: userProfile?.referralsSent ?? 0,
    successfulReferrals: userProfile?.successfulReferrals ?? 0,
    referralRecords,
    recordReferralShare,
    recordNewReferral,
  };
}

/**
 * Hook to get airdrop leaderboard
 */
export function useAirdropLeaderboard() {
  const { airdropLeaderboard, refreshLeaderboard } = useAbraxas();

  useEffect(() => {
    refreshLeaderboard();
  }, [refreshLeaderboard]);

  return {
    leaderboard: airdropLeaderboard,
    refresh: refreshLeaderboard,
  };
}
