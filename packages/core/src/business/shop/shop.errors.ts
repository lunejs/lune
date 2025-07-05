import { ShopErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

abstract class ShopErrorResult extends ErrorResult<ShopErrorCode> {
  constructor(code: ShopErrorCode, message: string) {
    super('ShopService', code, message);
  }
}

/**
 * Error thrown when the email provided already exists for a shop
 */
export class EmailAlreadyExistsError extends ShopErrorResult {
  constructor() {
    super(ShopErrorCode.EmailAlreadyExists, 'Shop with the provided email already exists');
  }
}
