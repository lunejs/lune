import type { ID } from '@/persistence/entities/entity';
import type { Order } from '@/persistence/entities/order';
import { OrderState } from '@/persistence/entities/order';

export class OrderActionsValidator {
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
}
