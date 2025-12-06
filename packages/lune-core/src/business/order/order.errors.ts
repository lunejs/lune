import { OrderErrorCode } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { OrderState } from '@/persistence/entities/order';
import { ErrorResult } from '@/utils/error-result';

export abstract class OrderErrorResult extends ErrorResult<OrderErrorCode> {
  constructor(code: OrderErrorCode, message: string, metadata?: any) {
    super('OrderService', code, message, metadata);
  }
}

/**
 * Error thrown when trying to perform an action on an order with an invalid state
 */
export class ForbiddenOrderActionError extends OrderErrorResult {
  constructor(state: OrderState) {
    super(OrderErrorCode.ForbiddenOrderAction, `Forbidden action on order with state ${state}`);
  }
}

/**
 * Error thrown when trying to add a variant to an order with not enough stock
 * or when trying to add a payment to an order with not enough stock
 */
export class NotEnoughStockError extends OrderErrorResult {
  constructor(variantIds: ID[]) {
    super(OrderErrorCode.NotEnoughStock, `Not enough stock for variant(s)`, { variantIds });
  }
}

/**
 * Error thrown when provided quantity is not a positive integer
 */
export class InvalidQuantityError extends OrderErrorResult {
  constructor(quantity: number) {
    super(
      OrderErrorCode.InvalidQuantity,
      `Quantity with value ${quantity} is not a valid quantity`
    );
  }
}

/**
 * Error thrown when provided customer email is not valid
 */
export class InvalidCustomerEmailError extends OrderErrorResult {
  constructor() {
    super(OrderErrorCode.InvalidCustomerEmail, 'Invalid customer email');
  }
}

/**
 * Error thrown when provided shipping method is invalid
 */
export class InvalidShippingMethodError extends OrderErrorResult {
  constructor() {
    super(OrderErrorCode.InvalidShippingMethod, 'Shipping method provided is invalid');
  }
}

/**
 * Error thrown when provided shipping method is invalid
 */
export class MissingShippingAddress extends OrderErrorResult {
  constructor() {
    super(OrderErrorCode.MissingShippingAddress, 'There is no shipping address in the order');
  }
}

/**
 * Error thrown when trying to add a discount code which is not applicable due to validation rules
 */
export class DiscountCodeNotApplicable extends OrderErrorResult {
  constructor() {
    super(OrderErrorCode.DiscountCodeNotApplicable, 'Discount code not applicable');
  }
}

/**
 * Error thrown when the discount handler is not found in lune config
 */
export class DiscountHandlerNotFound extends OrderErrorResult {
  constructor() {
    super(OrderErrorCode.DiscountHandlerNotFound, 'Discount handler not found');
  }
}

/**
 * Error thrown when the payment handler is not found in lune config
 */
export class PaymentHandlerNotFound extends OrderErrorResult {
  constructor() {
    super(OrderErrorCode.PaymentHandlerNotFound, 'Payment handler not found in configuration');
  }
}

/**
 * Error thrown when payment processing fails
 */
export class PaymentFailedError extends OrderErrorResult {
  constructor(message: string) {
    super(OrderErrorCode.PaymentFailed, message);
  }
}
