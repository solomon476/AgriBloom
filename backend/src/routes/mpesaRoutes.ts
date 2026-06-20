import { Router, Request, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import axios from 'axios';

const router = Router();

// M-Pesa STK Push Endpoint (Daraja API)
router.post('/stk-push', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { phoneNumber, amount, accountReference } = req.body;

    if (!phoneNumber || !amount) {
      return res.status(400).json({ error: 'Phone number and amount are required' });
    }

    // In a production app, we would:
    // 1. Generate M-Pesa OAuth token
    // 2. Format phone number to 2547...
    // 3. Generate password from Shortcode + Passkey + Timestamp
    // 4. Send Axios POST to https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest

    /* 
    const mpesaEndpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const response = await axios.post(mpesaEndpoint, {
      BusinessShortCode: "174379",
      Password: "...",
      Timestamp: "...",
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: "174379",
      PhoneNumber: phoneNumber,
      CallBackURL: "https://your-vercel-domain.com/api/mpesa/callback",
      AccountReference: accountReference || "AgriBloom",
      TransactionDesc: "Payment for Farm Expenses"
    }, { headers: { Authorization: `Bearer ${token}` } });
    */

    // MVP Mock Response
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
      success: true,
      message: 'STK Push sent successfully to ' + phoneNumber,
      merchantRequestId: 'MOCK_MERCHANT_REQ_ID_' + Date.now(),
      checkoutRequestId: 'MOCK_CHECKOUT_REQ_ID_' + Date.now(),
    });
  } catch (error) {
    res.status(500).json({ error: 'M-Pesa STK Push failed' });
  }
});

// M-Pesa Callback Webhook
router.post('/callback', async (req: Request, res: Response) => {
  // Safaricom will hit this endpoint when a user enters their PIN
  const payload = req.body;
  console.log('M-Pesa Callback Payload:', JSON.stringify(payload));
  
  // Here we would verify the payload and update the database Transaction status
  
  res.status(200).send('OK');
});

export default router;
