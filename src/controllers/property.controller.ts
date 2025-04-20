import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response/error_response';
import property from '../models/property/property';
import { successResponse } from '@/utils/response/success_response';
import { STATUS_CODE } from '@/utils/enum/status_code';

export const createProperty = async (req: Request, res: Response): Promise<any> => {
  try {
    const newKos = new property(req.body);
    const savedKos = await newKos.save();

    return successResponse({
      res,
      status: STATUS_CODE.CREATED,
      entityMessage: 'property',
      data: savedKos,
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

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const updatedKos = await property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedKos) {
      return errorResponse({
        res,
        status: STATUS_CODE.NOT_FOUND,
        entityMessage: 'property',
      });
    }

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      entityMessage: 'update property',
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

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const deletedKos = await property.findByIdAndDelete(req.params.id);

    if (!deletedKos) {
      return errorResponse({
        res,
        status: STATUS_CODE.BAD_REQUEST,
        message: 'failed delete property',
      });
    }

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      message: `deleted property with id ${req.params.id} Successfully`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: 500,
        message: 'failed delete property',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: 500,
        message: 'an error occurred while delete property',
      });
    }
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const kos = await property.findById(req.params.id);

    if (!kos) {
      return errorResponse({
        res,
        status: STATUS_CODE.NOT_FOUND,
        entityMessage: 'property',
      });
    }

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      entityMessage: 'get propery',
      data: kos,
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
        message: 'an error occurred while get property',
      });
    }
  }
};

export const getAllProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { min, max, limit, ...other } = req.query as IKosQuery;

    const koses = await property
      .find({
        ...other,
        price: {
          $gt: min ? Number(min) - 1 : 1,
          $lt: max ? Number(max) + 1 : 100000000,
        },
      })
      .limit(limit ? Number(limit) : 0);

    return successResponse({
      res,
      status: STATUS_CODE.SUCCESS,
      entityMessage: 'get all property',
      data: koses,
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

export const countByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const cities = (req.query.cities as string).split(',');
    const list = await Promise.all(cities.map((city) => property.countDocuments({ city })));
    res.status(200).json(list);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        res,
        status: 500,
        message: 'failed to count by city of property',
        error,
      });
    } else {
      return errorResponse({
        res,
        status: 500,
        message: 'an error occurred while count property',
      });
    }
  }
};

export const countByType = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const [countPutra, countPutri, countCampuran] = await Promise.all([
      property.countDocuments({ type: 'putra' }),
      property.countDocuments({ type: 'putri' }),
      property.countDocuments({ type: 'campuran' }),
    ]);

    const listType: IKosTypeCount[] = [
      { type: 'putra', count: countPutra },
      { type: 'putri', count: countPutri },
      { type: 'campuran', count: countCampuran },
    ];

    res.status(200).json(listType);
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
        message: 'an error occurred while count property',
      });
    }
  }
};
