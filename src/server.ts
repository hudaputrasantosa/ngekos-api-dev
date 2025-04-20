import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

const app: Express = express();
dotenv.config();

interface ErrorWithStatus extends Error {
  status?: number;
}

const connect = async (): Promise<void> => {
  try {
    if (!process.env.DATABASE_MONGO_URL) {
      throw new Error('DATABASE_MONGO_URL is not defined in environment variables');
    }
    await mongoose.connect(process.env.DATABASE_MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error Connection');
    throw error;
  }
};

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Mount all routes
app.use('/', (_req, res) => {
  res.status(200).send('Welcome to page');
});
app.use(router);

// app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction): any => {
//   const errorStatus = err.status ?? 500;
//   const errorMessage = err.message || 'Something went Wrong!';
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//   });
// });

const PORT: number = 8800;

app.listen(PORT, () => {
  connect();
  console.log(`Connected and Running at http://localhost:${PORT}`);
});
