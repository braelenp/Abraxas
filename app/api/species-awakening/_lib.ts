/**
 * Species Awakening Campaign Data Store
 * Shared utilities and data for serverless API functions
 */

// In-memory data stores
export const speciesAwakeningUsers = new Map();
export const speciesAwakeningTasks = new Map([
  ['discord-join', { id: 'discord-join', icon: '✧', title: 'Join Discord as Genesis Validator', platform: 'Discord', type: 'daily', reward: 100, link: 'https://discord.gg/EhgEe2MPa', description: 'Join the Discord community and download your Genesis Validator certificate' }],
  ['twitter-follow', { id: 'twitter-follow', icon: '𝕏', title: 'Follow Abraxas on X', platform: 'X', type: 'daily', reward: 50, link: 'https://x.com/abraxasio' }],
  ['twitter-retweet', { id: 'twitter-retweet', icon: '𝕏', title: 'Retweet Species Awakening Post', platform: 'X', type: 'daily', reward: 100, link: 'https://x.com/abraxasio' }],
  ['discord-post', { id: 'discord-post', icon: '💬', title: 'Post About Daughters of Abraxas', platform: 'Discord', type: 'daily', reward: 75, link: 'https://discord.gg/EhgEe2MPa' }],
  ['twitter-rwa', { id: 'twitter-rwa', icon: '𝕏', title: 'Share RWA Explanation (Weekly)', platform: 'X', type: 'weekly', reward: 250, link: 'https://x.com' }],
  ['referral', { id: 'referral', icon: '✨', title: 'Invite 3 Friends (Weekly)', platform: 'Multi', type: 'weekly', reward: 300 }],
]);

const LEVEL_THRESHOLDS = [
  { level: 1, required: 0, name: 'Novice Awakening' },
  { level: 2, required: 100, name: 'Seeker of Truth' },
  { level: 3, required: 250, name: 'Wisdom Keeper' },
  { level: 4, required: 450, name: 'Rune Learner' },
  { level: 5, required: 700, name: 'Protocol Student' },
  { level: 10, required: 2000, name: 'Aether Adept' },
  { level: 15, required: 4000, name: 'Awakening Seeker' },
  { level: 20, required: 7000, name: 'Sovereign Master' },
];

const WHITELIST_THRESHOLD = 1500;

export function getLevelInfo(points: number) {
  const currentLevel = LEVEL_THRESHOLDS
    .slice()
    .reverse()
    .find((t) => points >= t.required) || LEVEL_THRESHOLDS[0];

  const nextLevel = LEVEL_THRESHOLDS
    .find((t) => points < t.required) || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];

  const progressToNext =
    points < nextLevel.required
      ? Math.round(
          ((points - currentLevel.required) / (nextLevel.required - currentLevel.required)) * 100
        )
      : 100;

  return { currentLevel, nextLevel, progressToNext };
}

export function getOrCreateUserProgress(walletAddress: string) {
  if (!speciesAwakeningUsers.has(walletAddress)) {
    speciesAwakeningUsers.set(walletAddress, {
      walletAddress,
      totalPoints: 0,
      completedTasks: [],
      joinedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    });
  }
  return speciesAwakeningUsers.get(walletAddress);
}

export function setUserProgress(walletAddress: string, progress: any) {
  speciesAwakeningUsers.set(walletAddress, progress);
}

export const WHITELIST_POINTS = WHITELIST_THRESHOLD;
