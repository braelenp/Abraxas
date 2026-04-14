import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getOrCreateUserProgress, speciesAwakeningTasks, getLevelInfo, setUserProgress } from '../_lib';

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
    const { walletAddress, taskId } = req.body;

    if (!walletAddress || !taskId) {
      return res.status(400).json({ error: 'Wallet address and task ID required' });
    }

    const task = speciesAwakeningTasks.get(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const progress = getOrCreateUserProgress(walletAddress);

    if (progress.completedTasks.includes(taskId)) {
      return res.status(400).json({ error: 'Task already completed' });
    }

    // Mark task as completed
    progress.completedTasks.push(taskId);
    progress.totalPoints += task.reward;
    progress.lastUpdatedAt = new Date().toISOString();
    
    // Update the user progress
    setUserProgress(walletAddress, progress);

    // Get updated level info
    const levelInfo = getLevelInfo(progress.totalPoints);

    res.status(200).json({
      success: true,
      message: `Task completed! +${task.reward} points`,
      profile: {
        walletAddress: progress.walletAddress,
        totalPoints: progress.totalPoints,
        level: levelInfo.currentLevel.level,
        levelName: levelInfo.currentLevel.name,
        progressToNext: levelInfo.progressToNext,
        whitelistEligible: progress.totalPoints >= 1500,
      },
    });
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ error: 'Failed to complete task' });
  }
}
