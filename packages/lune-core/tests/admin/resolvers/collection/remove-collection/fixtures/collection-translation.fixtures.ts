import type { CollectionTranslationTable } from '@/persistence/entities/collection-translation';
import { Locale } from '@/persistence/entities/locale';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants } from './collection.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CollectionTranslationConstants = {
  ID: TestUtils.generateUUID(),
  Name: 'Ellie Collection ES',
  Slug: 'ellie-es',
  Description: 'Colección de Ellie en español'
};

export class CollectionTranslationFixtures implements Fixture<CollectionTranslationTable> {
  table: Tables = Tables.CollectionTranslation;

  async build(): Promise<Partial<CollectionTranslationTable>[]> {
    return [
      {
        id: CollectionTranslationConstants.ID,
        shop_id: ShopConstants.ID,
        name: CollectionTranslationConstants.Name,
        slug: CollectionTranslationConstants.Slug,
        locale: Locale.ES,
        description: CollectionTranslationConstants.Description,
        collection_id: CollectionConstants.EllieCollection
      }
    ];
  }
}
