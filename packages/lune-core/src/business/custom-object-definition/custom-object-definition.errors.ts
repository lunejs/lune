import { CustomObjectDefinitionErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

export abstract class CustomObjectDefinitionErrorResult extends ErrorResult<CustomObjectDefinitionErrorCode> {
  constructor(code: CustomObjectDefinitionErrorCode, message: string) {
    super('CustomObjectDefinitionService', code, message);
  }
}

/**
 * Error thrown when slug already exists
 */
export class SlugAlreadyExistsError extends CustomObjectDefinitionErrorResult {
  constructor(slug: string) {
    super(CustomObjectDefinitionErrorCode.SlugAlreadyExists, `slug "${slug}" already exists`);
  }
}
