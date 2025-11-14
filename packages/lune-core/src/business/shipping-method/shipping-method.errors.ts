import { ShippingMethodErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

abstract class ShippingMethodErrorResult extends ErrorResult<ShippingMethodErrorCode> {
  constructor(code: ShippingMethodErrorCode, message: string, metadata?: any) {
    super('ShippingMethod', code, message, metadata);
  }
}

/**
 * Error thrown when shipping handler is not found in the lune config
 */
export class ShippingHandlerNotFoundError extends ShippingMethodErrorResult {
  constructor(code: string) {
    super(
      ShippingMethodErrorCode.HandlerNotFound,
      `shipping handler with code "${code}" not found`
    );
  }
}
