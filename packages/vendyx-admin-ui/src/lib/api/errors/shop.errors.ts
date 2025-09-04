import { ShopErrorCode, type ShopErrorResult } from '../types';
import { GENERIC_ERROR } from './common.errors';

export const getShopError = (error?: ShopErrorResult) => {
  if (!error) return '';

  if (error.code === ShopErrorCode.EmailAlreadyExists) {
    return 'Email already exists for a shop';
  }

  return GENERIC_ERROR;
};
