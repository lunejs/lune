import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection/connection';
import { DeliveryMethodType } from '@/persistence/entities/delivery-method';
import type {
  DeliveryMethodPickup,
  DeliveryMethodPickupTable
} from '@/persistence/entities/delivery-method-pickup';
import type {
  DeliveryMethodShipping,
  DeliveryMethodShippingTable
} from '@/persistence/entities/delivery-method-shipping';
import { DeliveryMethodPickupSerializer } from '@/persistence/serializers/delivery-method-pickup.serializer';
import { DeliveryMethodShippingSerializer } from '@/persistence/serializers/delivery-method-shipping.serializer';
import { Tables } from '@/persistence/tables';

export type DeliveryMethodDetails = DeliveryMethodShipping | DeliveryMethodPickup;

export function createDeliveryMethodDetailsLoader(trx: Transaction) {
  return new DataLoader<string, DeliveryMethodDetails | null>(async keys => {
    const parsed = keys.map(key => {
      const [id, type] = key.split(':');
      return { id, type: type as DeliveryMethodType };
    });

    const shippingIds = parsed.filter(p => p.type === DeliveryMethodType.Shipping).map(p => p.id);
    const pickupIds = parsed.filter(p => p.type === DeliveryMethodType.Pickup).map(p => p.id);

    const shippingRows: DeliveryMethodShippingTable[] =
      shippingIds.length > 0
        ? await trx(Tables.DeliveryMethodShipping).whereIn('delivery_method_id', shippingIds)
        : [];

    const pickupRows: DeliveryMethodPickupTable[] =
      pickupIds.length > 0
        ? await trx(Tables.DeliveryMethodPickup).whereIn('delivery_method_id', pickupIds)
        : [];

    const shippingSerializer = new DeliveryMethodShippingSerializer();
    const pickupSerializer = new DeliveryMethodPickupSerializer();

    const shippingMap = new Map(
      shippingRows.map(r => [
        r.delivery_method_id,
        shippingSerializer.deserialize(r) as DeliveryMethodShipping
      ])
    );

    const pickupMap = new Map(
      pickupRows.map(r => [
        r.delivery_method_id,
        pickupSerializer.deserialize(r) as DeliveryMethodPickup
      ])
    );

    return parsed.map(({ id, type }) => {
      if (type === DeliveryMethodType.Shipping) {
        return shippingMap.get(id) || null;
      } else if (type === DeliveryMethodType.Pickup) {
        return pickupMap.get(id) || null;
      }

      return null;
    });
  });
}
