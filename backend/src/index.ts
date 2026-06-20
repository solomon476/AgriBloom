import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import farmRoutes from './routes/farmRoutes';
import plotRoutes from './routes/plotRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/plots', plotRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('AgriBloom Backend API');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
