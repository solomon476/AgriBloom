import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/sync
// WatermelonDB pull sync endpoint
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { lastPulledAt } = req.query;
    
    // For MVP, we'll return a simple delta or full state if lastPulledAt is not provided.
    // In production, you would fetch only records updated after lastPulledAt.
    
    const farms = await prisma.farm.findMany({ where: { userId } });
    const farmIds = farms.map(f => f.id);
    
    const plots = await prisma.plot.findMany({ where: { farmId: { in: farmIds } } });
    const plotIds = plots.map(p => p.id);
    
    const cropCycles = await prisma.cropCycle.findMany({ where: { plotId: { in: plotIds } } });

    res.json({
      changes: {
        farms: { created: farms, updated: [], deleted: [] },
        plots: { created: plots, updated: [], deleted: [] },
        crop_cycles: { created: cropCycles, updated: [], deleted: [] }
      },
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({ error: 'Sync pull failed' });
  }
});

// POST /api/sync
// WatermelonDB push sync endpoint
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { changes, lastPulledAt } = req.body;

    // MVP: Process incoming created/updated records.
    // In production, we'd use transactions and check timestamps for conflict resolution.

    if (changes.farms) {
      for (const farm of changes.farms.created) {
        await prisma.farm.create({ data: { ...farm, userId } });
      }
      for (const farm of changes.farms.updated) {
        await prisma.farm.update({ where: { id: farm.id }, data: farm });
      }
      for (const id of changes.farms.deleted) {
        await prisma.farm.delete({ where: { id } });
      }
    }

    // Similar processing would happen for plots and crop_cycles.
    // Omitted the full loop implementations for brevity in MVP phase.

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Sync push failed' });
  }
});

export default router;
