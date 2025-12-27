import { FulfillmentType } from '@/persistence/entities/fulfillment';

export class FulfillmentActionsValidator {
  canMarkAsShipped(type: FulfillmentType) {
    return type === FulfillmentType.Shipping;
  }

  canMarkAsDelivered(type: FulfillmentType) {
    return type === FulfillmentType.Shipping;
  }

  canMarkAsReadyForPickup(type: FulfillmentType) {
    return type === FulfillmentType.Pickup;
  }

  canMarkAsPickedUp(type: FulfillmentType) {
    return type === FulfillmentType.Pickup;
  }
}
