/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';

import config from '../../config/index';
import ApiError from '../../errors/ApiError';
import { handleValidationError } from '../../errors/ValidationError';
import { IGenericError } from '../../interfaces/errorHandler';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  console.error('globalErrorHandler:', error);

  let statusCode = 400;
  let message = 'Something went wrong!';
  let errorMessages: IGenericError[] = [];

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.status;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};
