import { ShippingMethodErrorCode, type ShippingMethodErrorResult } from '../types';

import { GENERIC_ERROR } from './common.errors';

export const getShippingMethodError = (error?: ShippingMethodErrorResult) => {
  if (!error) return '';

  if (error.code === ShippingMethodErrorCode.HandlerNotFound) {
    return 'Handler method not found';
  }

  return GENERIC_ERROR;
};
