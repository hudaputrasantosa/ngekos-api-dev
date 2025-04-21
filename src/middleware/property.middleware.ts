import { STATUS_CODE } from '@/utils/enum/status_code';
import { errorResponse } from '@/utils/response/error_response';
import { propertySchema } from '@/utils/validation/property.validation';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validateCreateUpdateProperty = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    propertySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return errorResponse({
        res,
        status: STATUS_CODE.BAD_REQUEST,
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
