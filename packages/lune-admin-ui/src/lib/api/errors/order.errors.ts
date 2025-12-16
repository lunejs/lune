import { OrderErrorCode, type OrderErrorResult } from '../types';

import { ApiError } from './api-error';
import { GENERIC_ERROR } from './common.errors';

export function getOrderError(errors: OrderErrorResult[]): ApiError<OrderErrorCode> {
  const [error] = errors;

  if (error.code === OrderErrorCode.ForbiddenOrderAction) {
    return new ApiError('This action is not allowed for the current order state', error.code);
  }

  return new ApiError(GENERIC_ERROR, error.code);
}
