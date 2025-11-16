import type { InStorePickupTable } from '@/persistence/entities/in-store-pickup';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { LocationConstants } from './location.fixtures';
import { ShopConstants } from './shop.fixtures';

export const InStorePickupConstants = {
  ID: crypto.randomUUID(),
  LosAngelesID: crypto.randomUUID(),
  ChicagoID: crypto.randomUUID(),
  SeattleID: crypto.randomUUID(),
  PittsburghID: crypto.randomUUID(),
  JacksonID: crypto.randomUUID()
};

export class InStorePickupFixtures implements Fixture<InStorePickupTable> {
  table: Tables = Tables.InStorePickup;

  async build(): Promise<Partial<InStorePickupTable>[]> {
    return [
      {
        id: InStorePickupConstants.ID,
        instructions: 'bring the receipt to the store and your identification',
        isAvailable: false,
        location_id: LocationConstants.ID,
        shop_id: ShopConstants.ID
      },
      {
        id: InStorePickupConstants.ChicagoID,
        instructions: 'bring the receipt to the store and your identification',
        isAvailable: false,
        location_id: LocationConstants.ChicagoID,
        shop_id: ShopConstants.ID
      },
      {
        id: InStorePickupConstants.JacksonID,
        instructions: 'bring the receipt to the store and your identification',
        isAvailable: false,
        location_id: LocationConstants.JacksonID,
        shop_id: ShopConstants.ID
      },
      {
        id: InStorePickupConstants.LosAngelesID,
        instructions: 'bring the receipt to the store and your identification',
        isAvailable: false,
        location_id: LocationConstants.LosAngelesID,
        shop_id: ShopConstants.ID
      },
      {
        id: InStorePickupConstants.PittsburghID,
        instructions: 'bring the receipt to the store and your identification',
        isAvailable: false,
        location_id: LocationConstants.PittsburghID,
        shop_id: ShopConstants.ID
      },
      {
        id: InStorePickupConstants.SeattleID,
        instructions: 'bring the receipt to the store and your identification',
        isAvailable: false,
        location_id: LocationConstants.SeattleID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
