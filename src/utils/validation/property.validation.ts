import { z } from 'zod';

export const propertySchema = z.object({
  name: z.string(),
  type: z.string(),
  city: z.string(),
  address: z.string(),
  stock: z.number(),
  description: z.string(),
  price: z.number(),
  featured: z.boolean(),
  rating: z.number().optional(),
  facility: z.string().array().optional(),
  photos: z.string().array().optional(),
});
