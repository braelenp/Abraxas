import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getOrCreateUserProgress, getLevelInfo } from '../_lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { walletAddress } = req.query;

    if (!walletAddress || typeof walletAddress !== 'string') {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    const progress = getOrCreateUserProgress(walletAddress);
    const levelInfo = getLevelInfo(progress.totalPoints);

    res.status(200).json({
      success: true,
      profile: {
        walletAddress: progress.walletAddress,
        totalPoints: progress.totalPoints,
        level: levelInfo.currentLevel.level,
        levelName: levelInfo.currentLevel.name,
        progressToNext: levelInfo.progressToNext,
        nextLevelPoints: levelInfo.nextLevel.required,
        completedTasks: progress.completedTasks,
        whitelistEligible: progress.totalPoints >= 1500,
        joinedAt: progress.joinedAt,
        lastUpdatedAt: progress.lastUpdatedAt,
      },
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}
