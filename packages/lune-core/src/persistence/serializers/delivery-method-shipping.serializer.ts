import type {
  DeliveryMethodShipping,
  DeliveryMethodShippingTable
} from '../entities/delivery-method-shipping';

import { Serializer } from './serializer';

export class DeliveryMethodShippingSerializer extends Serializer<
  DeliveryMethodShipping,
  DeliveryMethodShippingTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['method', 'method'],
      ['delivery_method_id', 'deliveryMethodId'],
      ['shipping_method_id', 'shippingMethodId']
    ]);
  }
}
