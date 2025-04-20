import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response/error_response';
import User from '../models/user/user';
import { successResponse } from '@/utils/response/success_response';
import { STATUS_CODE } from '@/utils/enum/status_code';

interface JWTPayload {
  id: string;
  isAdmin: boolean;
}

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    return successResponse({
      res,
      status: STATUS_CODE.CREATED,
      message: 'create account successfully',
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: 500,
        message: 'failed to update property',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: 500,
        message: 'an error occurred while updating property',
      });
    }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return errorResponse({
        res,
        status: STATUS_CODE.NOT_FOUND,
        message: 'password or email is invalid',
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return errorResponse({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        message: 'password or email is invalid',
      });
    }

    if (!process.env.JWT_SECRET_KEY) {
      console.error('JWT secret key is not defined');
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: GLOBAL_ERROR_MESSAGE,
      });
    }

    const payload: JWTPayload = {
      id: user._id.toString(),
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: 500,
        message: 'failed to login',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: 500,
        message: 'an error occurred while login account',
      });
    }
  }
};
