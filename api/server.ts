import { registerRoutes } from '../server/routes';
import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For Vercel serverless functions
export default async function handler(req: any, res: any) {
  await registerRoutes(app);
  app(req, res);
}
