import type { ProductCustomFieldTranslationTable } from '@/persistence/entities/product-custom-field-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductCustomFieldConstants } from './product-custom-field.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductCustomFieldTranslationConstants = {
  Locale: 'es'
};

export class ProductCustomFieldTranslationFixtures implements Fixture<ProductCustomFieldTranslationTable> {
  table: Tables = Tables.ProductCustomFieldTranslation;

  async build(): Promise<Partial<ProductCustomFieldTranslationTable>[]> {
    return [
      {
        id: TestUtils.generateUUID(),
        field_id: ProductCustomFieldConstants.SingleLineTextID,
        locale: ProductCustomFieldTranslationConstants.Locale,
        value: JSON.stringify('Translated value'),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
