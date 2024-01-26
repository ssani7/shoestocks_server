import mongoose from 'mongoose';

import { IGenericError } from '../interfaces/errorHandler';

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorStack: IGenericError[] = Object.values(err.errors).map(err => {
    return {
      path: err.path,
      message: err.message,
    };
  });

  return {
    status: 400,
    message: 'Validation Error',
    errorMessages: errorStack,
  };
};
