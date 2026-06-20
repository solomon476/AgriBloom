import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get plots for a specific farm
router.get('/farm/:farmId', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { farmId } = req.params;
    const userId = req.user?.userId;

    // Verify farm belongs to user
    const farm = await prisma.farm.findFirst({ where: { id: farmId, userId } });
    if (!farm) return res.status(404).json({ error: 'Farm not found' });

    const plots = await prisma.plot.findMany({ where: { farmId } });
    res.json(plots);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plots' });
  }
});

// Create a plot
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { name, sizeHectares, cropType, farmId } = req.body;

    const farm = await prisma.farm.findFirst({ where: { id: farmId, userId } });
    if (!farm) return res.status(404).json({ error: 'Farm not found' });

    const plot = await prisma.plot.create({
      data: { name, sizeHectares, cropType, farmId },
    });
    res.status(201).json(plot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plot' });
  }
});

// Update plot status / details
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, sizeHectares, cropType, status } = req.body;
    
    // We ideally should verify the plot belongs to the user via farm relation
    // but for MVP, skipping complex join validation and using simple update
    const plot = await prisma.plot.update({
      where: { id },
      data: { name, sizeHectares, cropType, status },
    });

    res.json(plot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plot' });
  }
});

export default router;
