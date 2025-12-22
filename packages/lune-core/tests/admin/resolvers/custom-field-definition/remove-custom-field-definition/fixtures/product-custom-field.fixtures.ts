import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductCustomFieldConstants = {
  FieldToRemoveValueID: TestUtils.generateUUID(),
  AnotherFieldValueID: TestUtils.generateUUID()
};

export class ProductCustomFieldFixtures implements Fixture<ProductCustomFieldTable> {
  table: Tables = Tables.ProductCustomField;

  async build(): Promise<Partial<ProductCustomFieldTable>[]> {
    return [
      {
        id: ProductCustomFieldConstants.FieldToRemoveValueID,
        value: JSON.stringify('Value to be removed'),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ToRemoveID,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductCustomFieldConstants.AnotherFieldValueID,
        value: JSON.stringify(123),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.AnotherFieldID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
