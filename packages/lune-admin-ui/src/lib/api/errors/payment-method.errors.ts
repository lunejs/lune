import { PaymentMethodErrorCode, type PaymentMethodErrorResult } from '../types';

import { GENERIC_ERROR } from './common.errors';

export const getPaymentMethodError = (error?: PaymentMethodErrorResult) => {
  if (!error) return '';

  if (error.code === PaymentMethodErrorCode.HandlerNotFound) {
    return 'Handler method not found';
  }

  return GENERIC_ERROR;
};
