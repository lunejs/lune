import DataLoader from 'dataloader';

import type { Transaction } from '@/persistence/connection';
import { FulfillmentType } from '@/persistence/entities/fulfillment';
import type {
  InStorePickupFulfillment,
  InStorePickupFulfillmentTable
} from '@/persistence/entities/in-store-pickup-fulfillment';
import type {
  ShippingFulfillment,
  ShippingFulfillmentTable
} from '@/persistence/entities/shipping-fulfillment';
import { InStorePickupFulfillmentSerializer } from '@/persistence/serializers/in-store-pickup-fulfillment.serializer';
import { ShippingFulfillmentSerializer } from '@/persistence/serializers/shipping-fulfillment.serializer';
import { Tables } from '@/persistence/tables';

export type FulfillmentDetails = ShippingFulfillment | InStorePickupFulfillment;

export function createFulfillmentDetailsLoader(trx: Transaction) {
  return new DataLoader<string, FulfillmentDetails | null>(async keys => {
    const parsed = keys.map(key => {
      const [id, type] = key.split(':');
      return { id, type: type as FulfillmentType };
    });

    const shippingIds = parsed.filter(p => p.type === FulfillmentType.SHIPPING).map(p => p.id);
    const pickupIds = parsed.filter(p => p.type === FulfillmentType.IN_STORE_PICKUP).map(p => p.id);

    const shippingRows: ShippingFulfillmentTable[] =
      shippingIds.length > 0
        ? await trx(Tables.ShippingFulfillment).whereIn('fulfillment_id', shippingIds)
        : [];

    const pickupRows: InStorePickupFulfillmentTable[] =
      pickupIds.length > 0
        ? await trx(Tables.InStorePickupFulfillment).whereIn('fulfillment_id', pickupIds)
        : [];

    const shippingSerializer = new ShippingFulfillmentSerializer();
    const pickupSerializer = new InStorePickupFulfillmentSerializer();

    const shippingMap = new Map(
      shippingRows.map(r => [
        r.fulfillment_id,
        shippingSerializer.deserialize(r) as ShippingFulfillment
      ])
    );

    const pickupMap = new Map(
      pickupRows.map(r => [
        r.fulfillment_id,
        pickupSerializer.deserialize(r) as InStorePickupFulfillment
      ])
    );

    return parsed.map(({ id, type }) => {
      if (type === FulfillmentType.SHIPPING) {
        return shippingMap.get(id) || null;
      } else if (type === FulfillmentType.IN_STORE_PICKUP) {
        return pickupMap.get(id) || null;
      }

      return null;
    });
  });
}
