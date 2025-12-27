import type { ExecutionContext } from '@/api/shared/context/types';
import type { DeliveryMethod } from '@/persistence/entities/delivery-method';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import type { ID } from '@/persistence/entities/entity';
import type { Order } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';

export class OrderActionsValidator {
  constructor(private readonly ctx: ExecutionContext) {}

  canAddLine(state: OrderState) {
    return state === OrderState.Modifying;
  }

  canUpdateLine(state: OrderState) {
    return state === OrderState.Modifying;
  }

  canRemoveLine(state: OrderState) {
    return state === OrderState.Modifying;
  }

  canModifyDiscounts(state: OrderState) {
    return state === OrderState.Modifying;
  }

  canAddCustomer(state: OrderState) {
    return state === OrderState.Modifying;
  }

  canAddShippingAddress(state: OrderState) {
    return state === OrderState.Modifying;
  }

  canAddShippingFulfillment(order: Order) {
    return !!order.shippingAddress && order.state === OrderState.Modifying;
  }

  canAddInStorePickupFulfillment(state: OrderState) {
    return state === OrderState.Modifying;
  }

  canAddPayment(order: Order, fulfillmentId: ID | undefined) {
    return !!order.customerId && !!fulfillmentId && order.state === OrderState.Modifying;
  }

  canMarkAsProcessing(state: OrderState) {
    return state === OrderState.Placed;
  }

  canMarkAsShipped(
    state: OrderState,
    fulfillment: DeliveryMethod | undefined
  ): fulfillment is DeliveryMethod {
    return (
      fulfillment?.type === DeliveryMethodType.Shipping &&
      [OrderState.Placed, OrderState.Processing].includes(state)
    );
  }

  canMarkAsReadyForPickup(
    state: OrderState,
    fulfillment: DeliveryMethod | undefined
  ): fulfillment is DeliveryMethod {
    return (
      fulfillment?.type === DeliveryMethodType.Pickup &&
      [OrderState.Placed, OrderState.Processing].includes(state)
    );
  }

  canCancel(state: OrderState) {
    return [OrderState.Placed, OrderState.Processing].includes(state);
  }
}
