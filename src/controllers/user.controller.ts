import { Request, Response } from 'express';
import { errorResponse } from '../utils/response/error_response';
import User from '../models/user/user';
import { STATUS_CODE } from '@/utils/enum/status_code';
import { successResponse } from '@/utils/response/success_response';
import { UserService } from '@/services/user.service';

const userService = new UserService();

export const updateUserById = async (
  req: Request<{ id: string }, {}, IUserUpdate>,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const payload: IUserUpdate = req.body;

    const userUpdated = await userService.updateUserById(id, payload);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: 'success update user',
      data: userUpdated,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: 500,
        message: error.message,
        error,
      });
    } else {
      return errorResponse({
        res,
        status: 500,
        message: 'an error occurred while updating user',
      });
    }
  }
};

export const deleteUserById = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    await userService.deleteUserById(id);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: `delete user with id ${req.params.id} Successfully`,
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

export const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse({
        res,
        status: STATUS_CODE.NOT_FOUND,
        entityMessage: 'property',
      });
    }

    const { password, ...userWithoutPassword } = user.toObject();
    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: 'get user successfully',
      data: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: 500,
        message: 'failed to get user',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: 500,
        message: 'an error occurred while get user',
      });
    }
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find().select('-password');
    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: 'get all user successfully',
      data: users,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: 500,
        message: 'failed to get user',
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
