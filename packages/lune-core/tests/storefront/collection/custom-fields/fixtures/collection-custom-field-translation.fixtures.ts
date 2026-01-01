import type { CollectionCustomFieldTranslationTable } from '@/persistence/entities/collection-custom-field-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionCustomFieldConstants } from './collection-custom-field.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CollectionCustomFieldTranslationConstants = {
  Locale: 'es'
};

export class CollectionCustomFieldTranslationFixtures implements Fixture<CollectionCustomFieldTranslationTable> {
  table: Tables = Tables.CollectionCustomFieldTranslation;

  async build(): Promise<Partial<CollectionCustomFieldTranslationTable>[]> {
    return [
      {
        id: TestUtils.generateUUID(),
        field_id: CollectionCustomFieldConstants.SingleLineTextID,
        locale: CollectionCustomFieldTranslationConstants.Locale,
        value: JSON.stringify('Translated value'),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
