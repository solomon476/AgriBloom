import { Router, Request, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import axios from 'axios';

const router = Router();

// Endpoint to send SMS reminders using Africa's Talking
router.post('/sms', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' });
    }

    // In a production app with Africa's Talking keys:
    /*
    const username = process.env.AT_USERNAME || 'sandbox';
    const apiKey = process.env.AT_API_KEY || 'your-api-key';
    
    // We would use the AfricasTalking Node.js SDK or their REST API
    const credentials = { apiKey, username };
    const AfricasTalking = require('africastalking')(credentials);
    const sms = AfricasTalking.SMS;

    const options = {
      to: [phoneNumber],
      message: message,
      from: 'AgriBloom' // Registered alphanumeric sender ID
    };

    const response = await sms.send(options);
    */

    // MVP Mock Response
    await new Promise(resolve => setTimeout(resolve, 800));

    res.json({
      success: true,
      message: `SMS reminder sent successfully to ${phoneNumber}`,
      providerResponse: 'Success'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

export default router;
