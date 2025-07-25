import { UserErrorCode, type UserErrorResult } from '../types';
import { GENERIC_ERROR } from './common.errors';

export function getUserError(error?: UserErrorResult) {
  if (!error) return '';

  if (error.code === UserErrorCode.EmailAlreadyExists) {
    return 'Email already exists';
  }

  if (error.code === UserErrorCode.InvalidCredentials) {
    return 'Invalid credentials';
  }

  if (error.code === UserErrorCode.InvalidEmail) {
    return 'Invalid email';
  }

  if (error.code === UserErrorCode.InvalidPassword) {
    return 'Invalid password';
  }

  return GENERIC_ERROR;
}
