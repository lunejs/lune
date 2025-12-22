import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductCustomFieldConstants = {
  BrandFieldID: TestUtils.generateUUID(),
  BrandValue: 'Apple',
  WeightFieldID: TestUtils.generateUUID(),
  WeightValue: 500
};

export class ProductCustomFieldFixtures implements Fixture<ProductCustomFieldTable> {
  table: Tables = Tables.ProductCustomField;

  async build(): Promise<Partial<ProductCustomFieldTable>[]> {
    return [
      {
        id: ProductCustomFieldConstants.BrandFieldID,
        value: JSON.stringify(ProductCustomFieldConstants.BrandValue),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.BrandID,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductCustomFieldConstants.WeightFieldID,
        value: JSON.stringify(ProductCustomFieldConstants.WeightValue),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.WeightID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
