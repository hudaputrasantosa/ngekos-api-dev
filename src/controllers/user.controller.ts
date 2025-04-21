import { Request, Response } from 'express';
import { errorResponse } from '../utils/response/error_response';
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
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: error.message,
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
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
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed to update user',
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

export const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: 'get user successfully',
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed to get user',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'an error occurred while get user',
      });
    }
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    // filter added
    const users = await userService.getAllUsers();
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
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed to get user',
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
