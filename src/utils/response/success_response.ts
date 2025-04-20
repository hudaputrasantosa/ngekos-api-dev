import { Response } from 'express';

type successResponseParameter = {
  res: Response;
  status: number;
  message?: string;
  entityMessage?: string;
  data?: any;
};

type successResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const successResponse = ({
  res,
  status,
  message,
  entityMessage,
  data,
}: successResponseParameter): Response => {
  message = entityMessage && !message ? STATUS_MESSAGE_MAP[status]?.(entityMessage) : message;
  const payload: successResponse = {
    success: true,
    message: message ?? '',
    data: data ?? null,
  };

  return res.status(status).json(payload).end();
};
