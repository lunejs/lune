import type { CollectionTranslationTable } from '@/persistence/entities/collection-translation';
import { Locale } from '@/persistence/entities/locale';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';

import { CollectionConstants } from './collection.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CollectionTranslationConstants = {
  ID: TestHelper.generateUUID(),
  Name: 'Joel Collection ES',
  Slug: 'joel-es',
  Description: 'Colección de Joel en español'
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
        collection_id: CollectionConstants.JoelCollection
      }
    ];
  }
}
