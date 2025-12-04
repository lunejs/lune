import { DiscountErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

export abstract class DiscountErrorResult extends ErrorResult<DiscountErrorCode> {
  constructor(code: DiscountErrorCode, message: string, metadata?: any) {
    super('DiscountService', code, message, metadata);
  }
}

/**
 * Error thrown when trying to add a discount with the same discount code as other
 */
export class DiscountCodeAlreadyExistsError extends DiscountErrorResult {
  constructor(code: string) {
    super(
      DiscountErrorCode.CodeAlreadyExists,
      `A discount with discount code: ${code} already exists`
    );
  }
}
