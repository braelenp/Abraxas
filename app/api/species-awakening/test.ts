import type { VercelRequest, VercelResponse } from '@vercel/node';
import { speciesAwakeningTasks } from './_lib';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const tasksList = Array.from(speciesAwakeningTasks.entries());
    const taskCount = speciesAwakeningTasks.size;

    res.status(200).json({
      ok: true,
      tasksMapSize: taskCount,
      tasksList: tasksList.map(([key, task]) => ({
        key,
        id: task.id,
        title: task.title,
        reward: task.reward,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
