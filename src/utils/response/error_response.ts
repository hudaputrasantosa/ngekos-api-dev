import { Response } from 'express';

type errorResponseParameter = {
  res: Response;
  status: number;
  message?: string;
  entityMessage?: string;
  error?: Error;
};

type errorResponse = {
  success: boolean;
  message: string;
  error: Error;
};

export const errorResponse = ({
  res,
  status,
  message,
  entityMessage,
  error,
}: errorResponseParameter): Response => {
  message = entityMessage && !message ? STATUS_MESSAGE_MAP[status]?.(entityMessage) : message;

  const err = new Error();
  err.message = message ?? '';

  const payload: errorResponse = {
    success: false,
    message: message ?? '',
    error: error ?? err,
  };

  return res.status(status).json(payload).end();
};
