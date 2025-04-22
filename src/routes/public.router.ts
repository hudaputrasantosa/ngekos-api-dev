import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import {
  countByType,
  countPropertyByCity,
  getAllProperty,
  getPropertyById,
} from '../controllers/property.controller.js';
import { validateLogin, validateRegister } from '@/middleware/auth.middleware.js';
const publicRouter = Router();

const v1Router = Router();

// AUTH ROUTE
v1Router.post('/register', validateRegister, register);
v1Router.post('/login', validateLogin, login);

// PROPERTI ROUTE
v1Router.get('/', getAllProperty); //cache
v1Router.get('/find/:id', getPropertyById); // cache
v1Router.get('/countByCity', countPropertyByCity);
v1Router.get('/countByType', countByType);

// Mount all routes
publicRouter.use('/api', v1Router);

export default publicRouter;
