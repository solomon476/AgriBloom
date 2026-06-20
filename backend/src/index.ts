import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import farmRoutes from './routes/farmRoutes';
import plotRoutes from './routes/plotRoutes';
import cropCycleRoutes from './routes/cropCycleRoutes';
import syncRoutes from './routes/syncRoutes';
import transactionRoutes from './routes/transactionRoutes';
import ocrRoutes from './routes/ocrRoutes';
import voiceRoutes from './routes/voiceRoutes';
import reportRoutes from './routes/reportRoutes';
import mpesaRoutes from './routes/mpesaRoutes';
import africasTalkingRoutes from './routes/africasTalkingRoutes';
import kamisRoutes from './routes/kamisRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/plots', plotRoutes);
app.use('/api/crop-cycles', cropCycleRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/sms', africasTalkingRoutes);
app.use('/api/kamis', kamisRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('AgriBloom Backend API');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
