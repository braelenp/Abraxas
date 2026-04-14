import type { VercelRequest, VercelResponse } from '@vercel/node';
import { speciesAwakeningUsers, getLevelInfo } from '../_lib';

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
    const limit = Math.min(parseInt((req.query.limit as string) || '100'), 1000);

    // Convert to array, calculate levels, and sort
    const leaderboard = Array.from(speciesAwakeningUsers.values())
      .map((user) => {
        const levelInfo = getLevelInfo(user.totalPoints);
        return {
          walletAddress: user.walletAddress,
          totalPoints: user.totalPoints,
          level: levelInfo.currentLevel.level,
          levelName: levelInfo.currentLevel.name,
          whitelistEligible: user.totalPoints >= 1500,
          joinedAt: user.joinedAt,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit)
      .map((entry, index) => ({
        rank: index + 1,
        ...entry,
      }));

    res.status(200).json({
      success: true,
      leaderboard,
      total: speciesAwakeningUsers.size,
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}
