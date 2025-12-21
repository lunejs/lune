import { CustomFieldDefinitionErrorCode, type CustomFieldDefinitionErrorResult } from '../types';

import { ApiError } from './api-error';
import { GENERIC_ERROR } from './common.errors';

export function getCustomFieldDefinitionError(
  errors: CustomFieldDefinitionErrorResult[]
): ApiError<CustomFieldDefinitionErrorCode> {
  const [error] = errors;

  if (error.code === CustomFieldDefinitionErrorCode.KeyAlreadyExists) {
    return new ApiError('Custom field key already exists', error.code);
  }

  if (error.code === CustomFieldDefinitionErrorCode.InvalidMetadata) {
    return new ApiError('Invalid metadata', error.code);
  }

  return new ApiError(GENERIC_ERROR, error.code);
}
