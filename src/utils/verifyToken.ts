import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from './response/error_response';
import dotenv from 'dotenv';
import { STATUS_CODE } from './enum/status_code';
dotenv.config();

interface JWTPayload {
  id: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.cookies.access_token;

  if (!token) {
    return errorResponse({
      res,
      status: STATUS_CODE.UNAUTHORIZED,
      message: 'You are not authenticated',
    });
  }

  if (!process.env.JWT_SECRET_KEY) {
    return errorResponse({
      res,
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: GLOBAL_ERROR_MESSAGE,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return errorResponse({
        res,
        status: STATUS_CODE.FORBIDDEN,
        message: 'Token invalid or expired',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while verifying token',
      });
    }
  }
};

export const verifyUser = (req: Request, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    if (!req.user) {
      return errorResponse({
        res,
        status: STATUS_CODE.UNAUTHORIZED,
        message: 'You are not authenticated',
      });
    }

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.FORBIDDEN,
        message: 'You are not authorized to perform this action',
      });
    }
  });
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    if (!req.user) {
      return errorResponse({
        res,
        status: STATUS_CODE.UNAUTHORIZED,
        message: 'You are not authenticated',
      });
    }

    if (req.user.isAdmin) {
      next();
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.FORBIDDEN,
        message: 'You are not authorized as admin',
      });
    }
  });
};
