import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductCustomFieldConstants = {
  // Custom fields sin traducción (para test de add new)
  MaterialFieldID: TestUtils.generateUUID(),
  MaterialFieldValue: 'Cotton',
  CareInstructionsFieldID: TestUtils.generateUUID(),
  CareInstructionsFieldValue: 'Hand wash only',

  // Custom fields con traducción existente (para test de update)
  AlreadyTranslatedMaterialFieldID: TestUtils.generateUUID(),
  AlreadyTranslatedMaterialFieldValue: 'Polyester'
};

export class ProductCustomFieldFixtures implements Fixture<ProductCustomFieldTable> {
  table: Tables = Tables.ProductCustomField;

  async build(): Promise<Partial<ProductCustomFieldTable>[]> {
    return [
      {
        id: ProductCustomFieldConstants.MaterialFieldID,
        value: JSON.stringify(ProductCustomFieldConstants.MaterialFieldValue),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.MaterialID,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductCustomFieldConstants.CareInstructionsFieldID,
        value: JSON.stringify(ProductCustomFieldConstants.CareInstructionsFieldValue),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CareInstructionsID,
        shop_id: ShopConstants.ID
      },
      {
        id: ProductCustomFieldConstants.AlreadyTranslatedMaterialFieldID,
        value: JSON.stringify(ProductCustomFieldConstants.AlreadyTranslatedMaterialFieldValue),
        product_id: ProductConstants.AlreadyTranslatedID,
        definition_id: CustomFieldDefinitionConstants.MaterialID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
