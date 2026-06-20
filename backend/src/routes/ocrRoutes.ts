import { Router, Request, Response } from 'express';
import multer from 'multer';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Configure multer for memory storage (for MVP mock)
const upload = multer({ storage: multer.memoryStorage() });

// Mock OCR endpoint for scanning receipts
router.post('/scan-receipt', requireAuth, upload.single('receipt'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No receipt image uploaded' });
    }

    // In a production environment, you would pass req.file.buffer to Google Cloud Vision
    // or AWS Textract to extract data. For the MVP, we simulate a successful extraction.

    const mockedExtractedData = {
      amount: Math.floor(Math.random() * 5000) + 100, // Random amount between 100 and 5100
      date: new Date().toISOString(),
      vendor: 'Agrovet Supplies Ltd.',
      category: 'FERTILIZER',
      confidence: 0.89
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    res.json({
      success: true,
      message: 'Receipt scanned successfully',
      data: mockedExtractedData
    });
  } catch (error) {
    res.status(500).json({ error: 'OCR processing failed' });
  }
});

export default router;
