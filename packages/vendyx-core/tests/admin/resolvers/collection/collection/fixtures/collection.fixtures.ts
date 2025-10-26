import { subMinutes } from 'date-fns';

import type { CollectionTable } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { ShopConstants } from './shop.fixtures';

const TODAY = new Date();

export const CollectionConstants = {
  EllieCollection: crypto.randomUUID(),
  EllieCollectionSlug: crypto.randomUUID(),
  TaylorSwiftCollection: crypto.randomUUID(),
  GamesCollection: crypto.randomUUID(),
  AlesCollection: crypto.randomUUID(),
  WosCollection: crypto.randomUUID(),
  AppleCollection: crypto.randomUUID(),
  JoelCollection: crypto.randomUUID(),
  SpiderManCollection: crypto.randomUUID(),
  BatmanCollection: crypto.randomUUID(),
  WaterCollection: crypto.randomUUID(),
  Lego: crypto.randomUUID(),
  DeletedCollection: crypto.randomUUID(),

  Alaska: crypto.randomUUID(),
  Ales: crypto.randomUUID(),
  Ala: crypto.randomUUID(),

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
        name: 'Ellie'
      },
      {
        created_at: subMinutes(TODAY, 30),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.TaylorSwiftCollection,
        content_type: 'PRODUCTS' as any,
        parent_id: CollectionConstants.ParentCollection1,
        name: 'Taylor'
      },
      {
        created_at: subMinutes(TODAY, 60),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.GamesCollection,
        content_type: 'PRODUCTS' as any,
        parent_id: CollectionConstants.ParentCollection1,
        name: 'Games'
      },
      {
        created_at: subMinutes(TODAY, 90),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.AlesCollection,
        content_type: 'PRODUCTS' as any,
        parent_id: CollectionConstants.ParentCollection1,
        name: 'Ale'
      },
      {
        created_at: subMinutes(TODAY, 120),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.WosCollection,
        content_type: 'PRODUCTS' as any,
        parent_id: CollectionConstants.ParentCollection1,
        name: 'Wos'
      },
      {
        created_at: subMinutes(TODAY, 150),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.AppleCollection,
        content_type: 'PRODUCTS' as any,
        name: 'Apple'
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
        id: CollectionConstants.SpiderManCollection,
        content_type: 'PRODUCTS' as any,
        name: 'Spider man'
      },
      {
        created_at: subMinutes(TODAY, 240),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.BatmanCollection,
        content_type: 'PRODUCTS' as any,
        name: 'Bat man'
      },
      {
        created_at: subMinutes(TODAY, 270),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.WaterCollection,
        content_type: 'PRODUCTS' as any,
        name: 'Water',
        enabled: false
      },
      {
        created_at: subMinutes(TODAY, 300),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.Lego,
        content_type: 'PRODUCTS' as any,
        name: 'Lego',
        enabled: false
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
      },
      {
        created_at: subMinutes(TODAY, 390),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.Alaska,
        content_type: 'PRODUCTS' as any,
        name: 'Alaska'
      },
      {
        created_at: subMinutes(TODAY, 420),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.Ales,
        content_type: 'PRODUCTS' as any,
        name: 'Ales'
      },
      {
        created_at: subMinutes(TODAY, 450),
        shop_id: ShopConstants.ID,
        id: CollectionConstants.Ala,
        content_type: 'PRODUCTS' as any,
        name: 'Ala'
      }
    ];
  }
}
