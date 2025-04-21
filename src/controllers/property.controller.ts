import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response/error_response';
import { successResponse } from '@/utils/response/success_response';
import { STATUS_CODE } from '@/utils/enum/status_code';
import { PropertyService } from '@/services/property.service';

const propertyService = new PropertyService();

export const createProperty = async (req: Request, res: Response): Promise<any> => {
  try {
    const payload = req.body;

    const propertyCreated = await propertyService.create(payload);

    return successResponse({
      res,
      status: STATUS_CODE.CREATED,
      entityMessage: 'property',
      data: propertyCreated,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed create property',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while creating property',
      });
    }
  }
};

export const updateProperty = async (req: Request, res: Response): Promise<any> => {
  try {
    const payload = req.body;
    const { id } = req.params;

    const propertyUpdated = await propertyService.update(id, payload);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      entityMessage: 'update property',
      data: propertyUpdated,
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

export const deleteProperty = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    await propertyService.delete(id);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: `deleted property with id ${req.params.id} Successfully`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed delete property',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'an error occurred while delete property',
      });
    }
  }
};

export const getPropertyById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const property = await propertyService.findById(id);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      entityMessage: 'get propery',
      data: property,
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
        message: 'an error occurred while get property',
      });
    }
  }
};

export const getAllProperty = async (req: Request, res: Response): Promise<any> => {
  try {
    const queryParams = req.query as IPropertyQuery;

    const properties = await propertyService.findAll(queryParams);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      entityMessage: 'get all property',
      data: properties,
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

export const countPropertyByCity = async (req: Request, res: Response): Promise<any> => {
  try {
    const cities: string[] = (req.query.cities as string).split(',');

    const list = await propertyService.countPropertyByCity(cities);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: 'count propert by city successfully',
      data: list,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed to count by city of property',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'an error occurred while count property',
      });
    }
  }
};

export const countByType = async (req: Request, res: Response): Promise<any> => {
  try {
    const list = await propertyService.countPropertyByType();

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: 'count property by type successfully',
      data: list,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'failed to count property',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'an error occurred while count property',
      });
    }
  }
};
