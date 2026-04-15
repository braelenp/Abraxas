import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getOrCreateUserProgress, speciesAwakeningTasks } from '../_lib';

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
    const tasks = Array.from(speciesAwakeningTasks.values()).map((task) => ({
      ...task,
      completed: progress.completedTasks.includes(task.id),
    }));

    console.log('[Tasks API] Wallet:', walletAddress);
    console.log('[Tasks API] Tasks count:', tasks.length);
    console.log('[Tasks API] Task IDs:', tasks.map((t) => t.id));

    res.status(200).json({
      success: true,
      tasks,
      debug: {
        walletAddress,
        tasksCount: tasks.length,
        taskIds: tasks.map((t) => t.id),
      },
    });
  } catch (error) {
    console.error('Tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}
