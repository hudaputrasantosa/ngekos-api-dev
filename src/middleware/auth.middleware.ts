import { NextFunction, Request, Response } from 'express';
import { loginSchema, registerSchema } from '../utils/validation/auth.validation';
import { z } from 'zod';
import { errorResponse } from '../utils/response/error_response';
import { STATUS_CODE } from '@/utils/enum/status_code';

export const validateRegister = (req: Request, res: Response, next: NextFunction): any => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return errorResponse({
        res,
        status: 400,
        message: errorMessage,
      });
    }
    return errorResponse({
      res,
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: 'Validation error',
    });
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): any => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return errorResponse({
        res,
        status: 400,
        message: errorMessage,
      });
    }
    return errorResponse({
      res,
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: 'Validation error',
    });
  }
};
