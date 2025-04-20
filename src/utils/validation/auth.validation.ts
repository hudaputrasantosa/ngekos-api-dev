import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().nonempty('username is required'),
  email: z.string().email('invalid email format').nonempty('email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32)
    .nonempty('password is required'),
});

export const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(100),
});
