import { CustomObjectDefinitionErrorCode, type CustomObjectDefinitionErrorResult } from '../types';

import { ApiError } from './api-error';
import { GENERIC_ERROR } from './common.errors';

export function getCustomObjectDefinitionError(
  errors: CustomObjectDefinitionErrorResult[]
): ApiError<CustomObjectDefinitionErrorCode> {
  const [error] = errors;

  if (error.code === CustomObjectDefinitionErrorCode.KeyAlreadyExists) {
    return new ApiError('Custom object definition key already exists', error.code);
  }

  return new ApiError(GENERIC_ERROR, error.code);
}
