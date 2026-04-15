/**
 * Species Awakening Campaign Hook
 * Manages user progress, tasks, and leaderboard for the airdrop campaign
 */

import { useCallback, useEffect, useState, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import type {
  SpeciesAwakeningUserProgress,
  SpeciesAwakeningTask,
  SpeciesAwakeningLeaderboardEntry,
} from '../lib/types';

const API_BASE = (() => {
  // For Vercel deployment, always use same origin (same domain)
  // For local development, also use same origin
  // Vercel serverless functions are at /api/...
  if (typeof window !== 'undefined') {
    console.log('[Species Awakening] Using same-origin API at /api/...');
  }
  return '';
})();

export function useSpeciesAwakening() {
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toString();
  const initAttemptRef = useRef(0);

  // Profile state
  const [profile, setProfile] = useState<SpeciesAwakeningUserProgress | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Tasks state
  const [tasks, setTasks] = useState<SpeciesAwakeningTask[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState<string | null>(null);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<SpeciesAwakeningLeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);

  // Fetch user profile with retry logic
  const fetchProfile = useCallback(async () => {
    if (!walletAddress) return;

    try {
      setProfileLoading(true);
      setProfileError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(
        `${API_BASE}/api/species-awakening/profile/${walletAddress}`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setProfile(data.profile);
      setProfileError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch profile';
      setProfileError(message);
      console.error('Fetch profile error:', error);
      // Set a default profile to allow UI to continue
      if (!profile) {
        setProfile({
          walletAddress: walletAddress || '',
          totalPoints: 0,
          level: 1,
          levelName: 'Novice Awakening',
          progressToNext: 0,
          nextLevelPoints: 100,
          completedTasks: [],
          whitelistEligible: false,
          joinedAt: new Date().toISOString(),
          lastUpdatedAt: new Date().toISOString(),
        });
      }
    } finally {
      setProfileLoading(false);
    }
  }, [walletAddress, profile]);

  // Fetch user's tasks
  const fetchTasks = useCallback(async () => {
    if (!walletAddress) {
      console.log('[Species Awakening] fetchTasks: No wallet address');
      return;
    }

    try {
      setTasksLoading(true);
      setTasksError(null);

      const taskUrl = `${API_BASE}/api/species-awakening/tasks/${walletAddress}`;
      console.log('[Species Awakening] Fetching tasks from:', taskUrl);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(taskUrl, { signal: controller.signal });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(`[Species Awakening] API returned ${response.status}`);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[Species Awakening] Tasks fetched:', data.tasks?.length || 0, 'tasks');
      console.log('[Species Awakening] Task data:', JSON.stringify(data, null, 2));
      if (data.tasks && data.tasks.length > 0) {
        console.log('[Species Awakening] First task:', data.tasks[0]);
      }
      
      if (data.tasks && data.tasks.length > 0) {
        setTasks(data.tasks);
      } else {
        console.warn('[Species Awakening] No tasks returned from API, setting fallback tasks');
        // Fallback with hardcoded tasks to test UI
        setTasks([
          { id: 'discord-join', icon: '✧', title: 'Join Discord as Genesis Validator', platform: 'Discord', type: 'daily', reward: 100, link: 'https://discord.gg/EhgEe2MPa', description: 'Join the Discord community', completed: false },
          { id: 'twitter-follow', icon: '𝕏', title: 'Follow Abraxas on X', platform: 'X', type: 'daily', reward: 50, link: 'https://x.com/abraxasio', completed: false },
        ]);
      }
      setTasksError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch tasks';
      console.error('[Species Awakening] fetchTasks error:', message, error);
      setTasksError(message);
      
      // Fallback: set test tasks so we can see if UI works
      console.warn('[Species Awakening] Setting fallback test tasks');
      setTasks([
        { id: 'discord-join', icon: '✧', title: 'Join Discord as Genesis Validator', platform: 'Discord', type: 'daily', reward: 100, link: 'https://discord.gg/EhgEe2MPa', description: 'Join the Discord community', completed: false },
        { id: 'twitter-follow', icon: '𝕏', title: 'Follow Abraxas on X', platform: 'X', type: 'daily', reward: 50, link: 'https://x.com/abraxasio', completed: false },
      ]);
    } finally {
      setTasksLoading(false);
    }
  }, [walletAddress]);

  // Fetch leaderboard
  const fetchLeaderboard = useCallback(async (limit = 100) => {
    try {
      setLeaderboardLoading(true);
      setLeaderboardError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `${API_BASE}/api/species-awakening/leaderboard?limit=${limit}`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
      setLeaderboardError(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch leaderboard';
      setLeaderboardError(message);
      console.error('Fetch leaderboard error:', error);
      setLeaderboard([]);
    } finally {
      setLeaderboardLoading(false);
    }
  }, []);

  // Complete a task
  const completeTask = useCallback(
    async (taskId: string) => {
      if (!walletAddress) {
        setTasksError('Wallet not connected');
        return { success: false, error: 'Wallet not connected' };
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`${API_BASE}/api/species-awakening/complete-task`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress,
            taskId,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to complete task');
        }

        const data = await response.json();

        // Update local profile
        setProfile(data.profile);

        // Refetch tasks to update completion status
        await fetchTasks();

        return { success: true, reward: data.message };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        setTasksError(message);
        return { success: false, error: message };
      }
    },
    [walletAddress, fetchTasks]
  );

  // Load all data on mount and when wallet changes
  useEffect(() => {
    if (walletAddress) {
      initAttemptRef.current = 0;
      fetchProfile();
      fetchTasks();
      fetchLeaderboard();
    }
  }, [walletAddress, fetchProfile, fetchTasks, fetchLeaderboard]);

  return {
    // Profile
    profile,
    profileLoading,
    profileError,
    refreshProfile: fetchProfile,

    // Tasks
    tasks,
    tasksLoading,
    tasksError,
    completeTask,
    refreshTasks: fetchTasks,

    // Leaderboard
    leaderboard,
    leaderboardLoading,
    leaderboardError,
    refreshLeaderboard: fetchLeaderboard,

    // Utility
    isConnected: !!walletAddress,
    walletAddress,
    apiBase: API_BASE,
  };
}
