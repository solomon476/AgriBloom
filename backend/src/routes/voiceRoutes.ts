import { Router, Request, Response } from 'express';
import multer from 'multer';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Mock Voice Transcription endpoint
router.post('/transcribe', requireAuth, upload.single('audio'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    // In production, send req.file.buffer to OpenAI Whisper or AWS Transcribe.
    // We mock the parsed intent for the MVP.

    const mockedTranscription = "Bought 2 bags of fertilizer for 4500 shillings for the main corn plot";
    const mockedParsedIntent = {
      action: 'LOG_EXPENSE',
      amount: 4500,
      category: 'FERTILIZER',
      description: mockedTranscription,
      confidence: 0.95
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    res.json({
      success: true,
      transcription: mockedTranscription,
      intent: mockedParsedIntent
    });
  } catch (error) {
    res.status(500).json({ error: 'Voice transcription failed' });
  }
});

export default router;
