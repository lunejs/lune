import { Locale } from '@/persistence/entities/locale';
import type { ProductCustomFieldTranslationTable } from '@/persistence/entities/product-custom-field-translation';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ProductCustomFieldConstants } from './product-custom-field.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductCustomFieldTranslationConstants = {
  AlreadyTranslatedMaterialID: TestUtils.generateUUID(),
  AlreadyTranslatedMaterialValue: 'Poliéster'
};

export class ProductCustomFieldTranslationFixtures implements Fixture<ProductCustomFieldTranslationTable> {
  table: Tables = Tables.ProductCustomFieldTranslation;

  async build(): Promise<Partial<ProductCustomFieldTranslationTable>[]> {
    return [
      {
        id: ProductCustomFieldTranslationConstants.AlreadyTranslatedMaterialID,
        value: JSON.stringify(
          ProductCustomFieldTranslationConstants.AlreadyTranslatedMaterialValue
        ),
        locale: Locale.EN,
        field_id: ProductCustomFieldConstants.AlreadyTranslatedMaterialFieldID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
