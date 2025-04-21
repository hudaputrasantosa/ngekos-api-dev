import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response/error_response';
import { successResponse } from '@/utils/response/success_response';
import { STATUS_CODE } from '@/utils/enum/status_code';
import { AuthService } from '@/services/auth.service';

const authService = new AuthService();

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<any> => {
  try {
    const payload = req.body;

    const user = await authService.registerUser(payload);

    return successResponse({
      res,
      status: STATUS_CODE.CREATED,
      message: 'create account successfully',
      data: user.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed to update property',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'an error occurred while updating property',
      });
    }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const payload = req.body;
    const userLoged = await authService.login(payload);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: 'login successfully',
      data: userLoged.user,
      cookieToken: userLoged.token,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed to login',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'an error occurred while login account',
      });
    }
  }
};
