import express from 'express';
import { verifyAdmin } from '../../utils/verifyToken.js';
import {
  createProperty,
  deleteProperty,
  getAllProperty,
  getPropertyById,
  updateProperty,
} from '../../controllers/property.controller.js';

const propertiRouter = express.Router();

const v1Router = express.Router();
v1Router.get('/', getAllProperty);
v1Router.get('/find/:id', getPropertyById);
v1Router.post('/', createProperty);
v1Router.put('/:id', updateProperty);
v1Router.delete('/:id', deleteProperty);

// Mount all routes
propertiRouter.use('/api', verifyAdmin, v1Router);

export default propertiRouter;
