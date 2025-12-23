import { Locale } from '@/persistence/entities/locale';
import type { CollectionCustomFieldTranslationTable } from '@/persistence/entities/collection-custom-field-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionCustomFieldConstants } from './collection-custom-field.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CollectionCustomFieldTranslationConstants = {
  AlreadyTranslatedBannerTextID: TestUtils.generateUUID(),
  AlreadyTranslatedBannerTextValue: 'Colección de Invierno'
};

export class CollectionCustomFieldTranslationFixtures
  implements Fixture<CollectionCustomFieldTranslationTable>
{
  table: Tables = Tables.CollectionCustomFieldTranslation;

  async build(): Promise<Partial<CollectionCustomFieldTranslationTable>[]> {
    return [
      {
        id: CollectionCustomFieldTranslationConstants.AlreadyTranslatedBannerTextID,
        value: JSON.stringify(
          CollectionCustomFieldTranslationConstants.AlreadyTranslatedBannerTextValue
        ),
        locale: Locale.ES,
        field_id: CollectionCustomFieldConstants.AlreadyTranslatedBannerTextFieldID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
