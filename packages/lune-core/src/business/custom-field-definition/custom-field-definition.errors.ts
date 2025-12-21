import { CustomFieldDefinitionErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

export abstract class CustomFieldDefinitionErrorResult extends ErrorResult<CustomFieldDefinitionErrorCode> {
  constructor(code: CustomFieldDefinitionErrorCode, message: string) {
    super('OrderService', code, message);
  }
}

/**
 * Error thrown when trying to add a custom field definition with incorrect metadata respecting to its type
 */
export class InvalidMetadataError extends CustomFieldDefinitionErrorResult {
  constructor(message: string) {
    super(CustomFieldDefinitionErrorCode.InvalidMetadata, message);
  }
}

/**
 * Error thrown when key already exists
 */
export class KeyAlreadyExistsError extends CustomFieldDefinitionErrorResult {
  constructor(key: string) {
    super(CustomFieldDefinitionErrorCode.KeyAlreadyExists, `key ${key} already exists`);
  }
}
