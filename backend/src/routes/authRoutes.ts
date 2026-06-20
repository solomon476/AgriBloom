import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt';

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: role || 'FARMER',
      },
    });

    const token = generateToken(user.id, user.role);
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// In-memory OTP store for MVP (use Redis/Database in production)
const otpStore: Record<string, string> = {};

router.post('/login/otp', async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });

    // Generate a 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    otpStore[phone] = otp;

    const useRealSMS = process.env.AT_API_KEY && process.env.AT_API_KEY !== 'mock';

    if (useRealSMS) {
      const credentials = {
        apiKey: process.env.AT_API_KEY as string,
        username: process.env.AT_USERNAME || 'sandbox',
      };
      const AfricasTalking = require('africastalking')(credentials);
      const sms = AfricasTalking.SMS;

      await sms.send({
        to: [phone],
        message: `Your AgriBloom verification code is: ${otp}`,
        from: 'AgriBloom' // Needs to be registered in production
      });
    } else {
      console.log(`[MOCK SMS] Sent OTP ${otp} to ${phone}`);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

router.post('/login/verify-otp', async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) return res.status(400).json({ error: 'Phone and OTP are required' });

    if (otpStore[phone] !== otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Clear OTP
    delete otpStore[phone];

    // Find or create user based on phone
    let user = await prisma.user.findUnique({ where: { phone } });
    
    if (!user) {
      // Auto-register via phone if they don't exist
      const generatedEmail = `${phone}@agribloom.local`;
      const hashedPassword = await bcrypt.hash(otp, 10);
      user = await prisma.user.create({
        data: {
          phone,
          email: generatedEmail, // mock email as it's required in schema
          password: hashedPassword,
          firstName: 'Farmer',
          lastName: phone,
          role: 'FARMER'
        }
      });
    }

    const token = generateToken(user.id, user.role);
    res.json({ token, user: { id: user.id, phone: user.phone, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
