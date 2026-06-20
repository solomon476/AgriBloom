import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get Profit & Loss Report for a Farm
router.get('/farm/:farmId/pnl', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { farmId } = req.params;
    const userId = req.user?.userId;

    // Verify farm ownership
    const farm = await prisma.farm.findFirst({ where: { id: farmId, userId } });
    if (!farm) return res.status(404).json({ error: 'Farm not found' });

    const transactions = await prisma.transaction.findMany({
      where: { farmId }
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'INCOME') totalIncome += t.amount;
      if (t.type === 'EXPENSE') totalExpense += t.amount;
    });

    const netProfit = totalIncome - totalExpense;

    res.json({
      farmId,
      totalIncome,
      totalExpense,
      netProfit,
      currency: 'KES',
      transactionCount: transactions.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate P&L report' });
  }
});

// Get Profit & Loss Report for a specific Crop Cycle (Plot)
router.get('/plot/:plotId/pnl', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { plotId } = req.params;
    const userId = req.user?.userId;

    // Verify plot ownership
    const plot = await prisma.plot.findFirst({
      where: { id: plotId, farm: { userId } }
    });

    if (!plot) return res.status(404).json({ error: 'Plot not found' });

    const transactions = await prisma.transaction.findMany({
      where: { plotId }
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'INCOME') totalIncome += t.amount;
      if (t.type === 'EXPENSE') totalExpense += t.amount;
    });

    const netProfit = totalIncome - totalExpense;

    res.json({
      plotId,
      totalIncome,
      totalExpense,
      netProfit,
      currency: 'KES',
      transactionCount: transactions.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate P&L report' });
  }
});

export default router;
