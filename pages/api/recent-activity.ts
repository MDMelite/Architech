import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const logPath = path.join(process.cwd(), 'team_agents', 'orion', 'dev_log_2025-04-21.md');
  try {
    const content = fs.readFileSync(logPath, 'utf-8');
    const lines = content.trim().split('\n').filter(Boolean);
    const last10 = lines.slice(-10);
    res.status(200).json(last10);
  } catch (e) {
    res.status(200).json([]);
  }
}
