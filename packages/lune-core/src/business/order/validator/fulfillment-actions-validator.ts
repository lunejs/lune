import { FulfillmentType } from '@/persistence/entities/fulfillment';

export class FulfillmentActionsValidator {
  canMarkAsShipped(type: FulfillmentType) {
    return type === FulfillmentType.Shipping;
  }

  canMarkAsDelivered(type: FulfillmentType) {
    return type === FulfillmentType.Shipping;
  }
}
