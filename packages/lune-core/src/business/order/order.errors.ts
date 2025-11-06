import { OrderErrorCode } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { OrderState } from '@/persistence/entities/order';
import { ErrorResult } from '@/utils/error-result';

abstract class OrderErrorResult extends ErrorResult<OrderErrorCode> {
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
