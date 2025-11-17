import { LocationErrorCode, type LocationErrorResult } from '../types';

import { GENERIC_ERROR } from './common.errors';

export const getLocationError = (error?: LocationErrorResult) => {
  if (!error) return '';

  if (error.code === LocationErrorCode.LocationNameAlreadyExists) {
    return 'Location with that name already exists';
  }

  return GENERIC_ERROR;
};
