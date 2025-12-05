import { DiscountErrorCode, type DiscountErrorResult } from '../types';

import { ApiError } from './api-error';
import { GENERIC_ERROR } from './common.errors';

export function getDiscountError(errors: DiscountErrorResult[]): ApiError<DiscountErrorCode> {
  const [error] = errors;

  if (error.code === DiscountErrorCode.CodeAlreadyExists) {
    return new ApiError('Discount code already exists', error.code);
  }

  return new ApiError(GENERIC_ERROR, error.code);
}
