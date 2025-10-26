import { subMinutes } from 'date-fns';

import type { CollectionTable } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { ShopConstants } from './shop.fixtures';

const TODAY = new Date();

export const CollectionConstants = {
  EllieCollection: crypto.randomUUID(),
  JoelCollection: crypto.randomUUID()
};

export class CollectionFixtures implements Fixture<CollectionTable> {
  table: Tables = Tables.Collection;

  async build(): Promise<Partial<CollectionTable>[]> {
    return [
      {
        created_at: TODAY,
        shop_id: ShopConstants.ID,
        id: CollectionConstants.EllieCollection,
        content_type: 'PRODUCTS' as any
      },
      {
        created_at: subMinutes(TODAY, 180),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.JoelCollection,
        content_type: 'PRODUCTS' as any,
        name: 'Joel'
      }
    ];
  }
}
