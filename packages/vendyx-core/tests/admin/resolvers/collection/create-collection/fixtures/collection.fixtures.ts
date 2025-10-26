import { subMinutes } from 'date-fns';

import type { CollectionTable } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { ShopConstants } from './shop.fixtures';

const TODAY = new Date();

export const CollectionConstants = {
  EllieCollection: crypto.randomUUID(),
  EllieCollectionSlug: 'ellie',
  EllieCollectionName: 'ellie',
  JoelCollection: crypto.randomUUID(),
  MultipleSameName: 'Ale',
  NoMatchingName: 'Elizabeth',

  ParentCollection1: crypto.randomUUID(),
  ParentCollection2: crypto.randomUUID()
};

export class CollectionFixtures implements Fixture<CollectionTable> {
  table: Tables = Tables.Collection;

  async build(): Promise<Partial<CollectionTable>[]> {
    return [
      {
        created_at: TODAY,
        shop_id: ShopConstants.ID,
        id: CollectionConstants.EllieCollection,
        slug: CollectionConstants.EllieCollectionSlug,
        content_type: 'PRODUCTS' as any,
        parent_id: CollectionConstants.ParentCollection1,
        name: CollectionConstants.EllieCollectionName
      },
      {
        created_at: subMinutes(TODAY, 180),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.JoelCollection,
        content_type: 'PRODUCTS' as any,
        name: 'Joel'
      },
      {
        created_at: subMinutes(TODAY, 210),
        shop_id: ShopConstants.ID,
        content_type: 'PRODUCTS' as any,
        name: CollectionConstants.MultipleSameName,
        slug: 'ale'
      },
      {
        created_at: subMinutes(TODAY, 240),
        shop_id: ShopConstants.ID,
        content_type: 'PRODUCTS' as any,
        name: CollectionConstants.MultipleSameName,
        slug: 'ale-1'
      },
      {
        created_at: subMinutes(TODAY, 240),
        shop_id: ShopConstants.ID,
        content_type: 'PRODUCTS' as any,
        name: 'random',
        slug: CollectionConstants.NoMatchingName.toLowerCase()
      },
      {
        created_at: subMinutes(TODAY, 330),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.ParentCollection1,
        content_type: 'COLLECTIONS' as any,
        name: 'Parent 1'
      },
      {
        created_at: subMinutes(TODAY, 360),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.ParentCollection2,
        content_type: 'COLLECTIONS' as any,
        name: 'Parent 2'
      }
    ];
  }
}
