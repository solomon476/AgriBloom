import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all farms for the logged-in user
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const farms = await prisma.farm.findMany({
      where: { userId },
      include: { plots: true },
    });
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farms' });
  }
});

// Create a new farm
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { name, location, sizeHectares } = req.body;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const farm = await prisma.farm.create({
      data: {
        name,
        location,
        sizeHectares,
        userId,
      },
    });
    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create farm' });
  }
});

// Update a farm
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const { name, location, sizeHectares } = req.body;

    const farm = await prisma.farm.updateMany({
      where: { id, userId },
      data: { name, location, sizeHectares },
    });

    if (farm.count === 0) {
      return res.status(404).json({ error: 'Farm not found or unauthorized' });
    }

    res.json({ message: 'Farm updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update farm' });
  }
});

// Delete a farm
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const farm = await prisma.farm.deleteMany({
      where: { id, userId },
    });

    if (farm.count === 0) {
      return res.status(404).json({ error: 'Farm not found or unauthorized' });
    }

    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete farm' });
  }
});

export default router;
