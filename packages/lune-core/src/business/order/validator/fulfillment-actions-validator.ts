import { FulfillmentType } from '@/persistence/entities/fulfillment';

export class FulfillmentActionsValidator {
  canMarkAsShipped(type: FulfillmentType) {
    return type !== FulfillmentType.Shipping;
  }
}
