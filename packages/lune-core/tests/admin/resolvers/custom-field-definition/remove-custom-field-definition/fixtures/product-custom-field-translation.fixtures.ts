import { Locale } from '@/persistence/entities/locale';
import type { ProductCustomFieldTranslationTable } from '@/persistence/entities/product-custom-field-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductCustomFieldConstants } from './product-custom-field.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductCustomFieldTranslationConstants = {
  TranslationToRemoveID: TestUtils.generateUUID(),
  AnotherTranslationID: TestUtils.generateUUID()
};

export class ProductCustomFieldTranslationFixtures implements Fixture<ProductCustomFieldTranslationTable> {
  table: Tables = Tables.ProductCustomFieldTranslation;

  async build(): Promise<Partial<ProductCustomFieldTranslationTable>[]> {
    return [
      {
        id: ProductCustomFieldTranslationConstants.TranslationToRemoveID,
        value: JSON.stringify('Translation to be removed'),
        locale: Locale.ES,
        field_id: ProductCustomFieldConstants.FieldToRemoveValueID,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductCustomFieldTranslationConstants.AnotherTranslationID,
        value: JSON.stringify('Another translation'),
        locale: Locale.ES,
        field_id: ProductCustomFieldConstants.AnotherFieldValueID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
