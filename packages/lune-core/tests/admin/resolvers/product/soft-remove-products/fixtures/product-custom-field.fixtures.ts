import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductCustomFieldConstants = {
  ShirtMaterialID: TestUtils.generateUUID(),
  ShirtMaterialValue: 'Cotton'
};

export class ProductCustomFieldFixtures implements Fixture<ProductCustomFieldTable> {
  table: Tables = Tables.ProductCustomField;

  async build(): Promise<Partial<ProductCustomFieldTable>[]> {
    return [
      {
        id: ProductCustomFieldConstants.ShirtMaterialID,
        value: JSON.stringify(ProductCustomFieldConstants.ShirtMaterialValue),
        product_id: ProductConstants.ShirtID,
        definition_id: CustomFieldDefinitionConstants.MaterialID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
