import { Response } from 'express';

type successResponseParameter = {
  res: Response;
  status: number;
  message?: string;
  entityMessage?: string;
  data?: any;
  cookieToken?: any;
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
  cookieToken,
}: successResponseParameter): Response => {
  let response: Response = res;
  message = entityMessage && !message ? STATUS_MESSAGE_MAP[status]?.(entityMessage) : message;
  const payload: successResponse = {
    success: true,
    message: message ?? '',
    data: data ?? null,
  };

  if (cookieToken) {
    response = res.cookie('access_token', cookieToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  return response.status(status).json(payload).end();
};
