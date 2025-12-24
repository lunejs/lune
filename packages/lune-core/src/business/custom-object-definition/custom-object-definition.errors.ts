import { CustomObjectDefinitionErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

export abstract class CustomObjectDefinitionErrorResult extends ErrorResult<CustomObjectDefinitionErrorCode> {
  constructor(code: CustomObjectDefinitionErrorCode, message: string) {
    super('CustomObjectDefinitionService', code, message);
  }
}

/**
 * Error thrown when key already exists
 */
export class KeyAlreadyExistsError extends CustomObjectDefinitionErrorResult {
  constructor(key: string) {
    super(CustomObjectDefinitionErrorCode.KeyAlreadyExists, `key "${key}" already exists`);
  }
}
