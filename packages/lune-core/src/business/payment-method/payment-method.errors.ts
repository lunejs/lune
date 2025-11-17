import { PaymentMethodErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

abstract class PaymentMethodErrorResult extends ErrorResult<PaymentMethodErrorCode> {
  constructor(code: PaymentMethodErrorCode, message: string, metadata?: any) {
    super('PaymentMethod', code, message, metadata);
  }
}

/**
 * Error thrown when payment handler is not found in the lune config
 */
export class PaymentHandlerNotFoundError extends PaymentMethodErrorResult {
  constructor(code: string) {
    super(PaymentMethodErrorCode.HandlerNotFound, `Payment handler with code "${code}" not found`);
  }
}
