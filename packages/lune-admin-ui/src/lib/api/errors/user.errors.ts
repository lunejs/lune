import { UserErrorCode, type UserErrorResult } from '../types';

import { ApiError } from './api-error';
import { GENERIC_ERROR } from './common.errors';

export function getUserError(errors: UserErrorResult[]): ApiError<UserErrorCode> {
  const [error] = errors;

  if (error.code === UserErrorCode.EmailAlreadyExists) {
    return new ApiError('Email already exists', error.code);
  }

  if (error.code === UserErrorCode.InvalidCredentials) {
    return new ApiError('Invalid credentials', error.code);
  }

  if (error.code === UserErrorCode.InvalidEmail) {
    return new ApiError('Invalid email', error.code);
  }

  if (error.code === UserErrorCode.InvalidPassword) {
    return new ApiError('Invalid password', error.code);
  }

  return new ApiError(GENERIC_ERROR, error.code);
}
