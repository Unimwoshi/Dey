// server/src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/trpc';

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // match your Vite dev port
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }));

app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));