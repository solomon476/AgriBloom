import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get crop cycles for a specific plot
router.get('/plot/:plotId', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { plotId } = req.params;
    const cropCycles = await prisma.cropCycle.findMany({ where: { plotId } });
    res.json(cropCycles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crop cycles' });
  }
});

// Create a crop cycle
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { plotId, cropName, plantedDate, expectedHarvest } = req.body;

    const cycle = await prisma.cropCycle.create({
      data: { 
        plotId, 
        cropName, 
        plantedDate: new Date(plantedDate), 
        expectedHarvest: expectedHarvest ? new Date(expectedHarvest) : null 
      },
    });
    res.status(201).json(cycle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create crop cycle' });
  }
});

// Mark harvest or update status
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { actualHarvest, yieldQuantity, yieldUnit, status } = req.body;
    
    const cycle = await prisma.cropCycle.update({
      where: { id },
      data: { 
        actualHarvest: actualHarvest ? new Date(actualHarvest) : undefined,
        yieldQuantity,
        yieldUnit,
        status 
      },
    });

    res.json(cycle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update crop cycle' });
  }
});

export default router;
