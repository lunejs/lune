import { OrderState } from '@/persistence/entities/order';

export class OrderActionsValidator {
  canAddLine(state: OrderState) {
    return state === OrderState.MODIFYING;
  }

  canUpdateLine(state: OrderState) {
    return state === OrderState.MODIFYING;
  }

  canRemoveLine(state: OrderState) {
    return state === OrderState.MODIFYING;
  }

  canAddCustomer(state: OrderState) {
    return state === OrderState.MODIFYING;
  }

  canAddShippingAddress(state: OrderState) {
    return state === OrderState.MODIFYING;
  }
}
