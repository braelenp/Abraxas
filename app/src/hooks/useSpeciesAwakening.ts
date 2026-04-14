/**
 * Species Awakening Campaign Hook
 * Manages user progress, tasks, and leaderboard for the airdrop campaign
 */

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import type {
  SpeciesAwakeningUserProgress,
  SpeciesAwakeningTask,
  SpeciesAwakeningLeaderboardEntry,
} from '../lib/types';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export function useSpeciesAwakening() {
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toString();

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

  // Fetch user profile
  const fetchProfile = useCallback(async () => {
    if (!walletAddress) return;

    try {
      setProfileLoading(true);
      setProfileError(null);

      const response = await fetch(
        `${API_BASE}/api/species-awakening/profile/${walletAddress}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data.profile);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setProfileError(message);
      console.error('Fetch profile error:', error);
    } finally {
      setProfileLoading(false);
    }
  }, [walletAddress]);

  // Fetch user's tasks
  const fetchTasks = useCallback(async () => {
    if (!walletAddress) return;

    try {
      setTasksLoading(true);
      setTasksError(null);

      const response = await fetch(
        `${API_BASE}/api/species-awakening/tasks/${walletAddress}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setTasksError(message);
      console.error('Fetch tasks error:', error);
    } finally {
      setTasksLoading(false);
    }
  }, [walletAddress]);

  // Fetch leaderboard
  const fetchLeaderboard = useCallback(async (limit = 100) => {
    try {
      setLeaderboardLoading(true);
      setLeaderboardError(null);

      const response = await fetch(
        `${API_BASE}/api/species-awakening/leaderboard?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      const data = await response.json();
      setLeaderboard(data.leaderboard);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setLeaderboardError(message);
      console.error('Fetch leaderboard error:', error);
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
        const response = await fetch(`${API_BASE}/api/species-awakening/complete-task`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress,
            taskId,
          }),
        });

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
  };
}
