import { CollectionContentType, type CollectionTable } from '@/persistence/entities/collection';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CollectionConstants = {
  ID: TestUtils.generateUUID(),
  Slug: 'collection-with-custom-fields',
  Name: 'Collection with custom fields',

  WithoutFieldsID: TestUtils.generateUUID(),
  WithoutFieldsSlug: 'collection-without-custom-fields',

  // Collections used as references in custom fields
  ReferencedCollectionID: TestUtils.generateUUID(),
  ReferencedCollectionSlug: 'referenced-collection',
  ReferencedCollectionName: 'Referenced Collection',

  ReferencedCollection2ID: TestUtils.generateUUID(),
  ReferencedCollection2Slug: 'referenced-collection-2',
  ReferencedCollection2Name: 'Referenced Collection 2',

  ReferencedCollection3ID: TestUtils.generateUUID(),
  ReferencedCollection3Slug: 'referenced-collection-3',
  ReferencedCollection3Name: 'Referenced Collection 3'
};

export class CollectionFixtures implements Fixture<CollectionTable> {
  table: Tables = Tables.Collection;

  async build(): Promise<Partial<CollectionTable>[]> {
    return [
      {
        id: CollectionConstants.ID,
        slug: CollectionConstants.Slug,
        name: CollectionConstants.Name,
        content_type: CollectionContentType.Products,
        enabled: true,
        order: 0,
        shop_id: ShopConstants.ID
      },
      {
        id: CollectionConstants.WithoutFieldsID,
        slug: CollectionConstants.WithoutFieldsSlug,
        name: 'Collection without custom fields',
        content_type: CollectionContentType.Products,
        enabled: true,
        order: 1,
        shop_id: ShopConstants.ID
      },
      {
        id: CollectionConstants.ReferencedCollectionID,
        slug: CollectionConstants.ReferencedCollectionSlug,
        name: CollectionConstants.ReferencedCollectionName,
        content_type: CollectionContentType.Products,
        enabled: true,
        order: 2,
        shop_id: ShopConstants.ID
      },
      {
        id: CollectionConstants.ReferencedCollection2ID,
        slug: CollectionConstants.ReferencedCollection2Slug,
        name: CollectionConstants.ReferencedCollection2Name,
        content_type: CollectionContentType.Products,
        enabled: true,
        order: 3,
        shop_id: ShopConstants.ID
      },
      {
        id: CollectionConstants.ReferencedCollection3ID,
        slug: CollectionConstants.ReferencedCollection3Slug,
        name: CollectionConstants.ReferencedCollection3Name,
        content_type: CollectionContentType.Products,
        enabled: true,
        order: 4,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
