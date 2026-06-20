import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Endpoint to fetch KAMIS (Kenya Agricultural Market Information System) prices
router.get('/market-prices', requireAuth, async (req: Request, res: Response) => {
  try {
    // For MVP, we mock the KAMIS prices since their API often requires specific access
    // or scraping. In production, we'd fetch from https://kamis.kilimo.go.ke/

    const mockedPrices = [
      { crop: 'Maize (Dry)', priceKES: 3200, unit: '90kg Bag', market: 'Nairobi', trend: 'UP' },
      { crop: 'Beans (Mwitemania)', priceKES: 8500, unit: '90kg Bag', market: 'Nakuru', trend: 'DOWN' },
      { crop: 'Irish Potatoes', priceKES: 2800, unit: '50kg Bag', market: 'Eldoret', trend: 'STABLE' },
      { crop: 'Tomatoes', priceKES: 6500, unit: '64kg Crate', market: 'Mombasa', trend: 'UP' },
      { crop: 'Cabbages', priceKES: 2100, unit: '126kg Bag', market: 'Nairobi', trend: 'DOWN' }
    ];

    res.json({
      success: true,
      data: mockedPrices,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market prices' });
  }
});

export default router;
