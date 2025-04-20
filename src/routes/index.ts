import { Router } from 'express';
import publicRouter from './public.router';
import propertiRouter from './private/property.router';
import userRouter from './private/user.router';

const router = Router();

// PUBLIC ROUTE
router.use(publicRouter);

// PRIVATE ROUTE with middleware
router.use(propertiRouter);
router.use(userRouter);

export default router;
