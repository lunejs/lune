import type { ProductCustomFieldTable } from '@/persistence/entities/product-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants } from './collection.fixtures';
import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const ProductCustomFieldConstants = {
  SingleLineTextID: TestUtils.generateUUID(),
  SingleLineTextValue: 'This is a single line text',
  SingleLineTextTranslatedValue: 'Este es un texto de una línea',
  MultiLineTextValue: 'This is a\nmulti line\ntext',
  UrlValue: 'https://example.com',
  ColorValue: '#FF5733',
  IntegerValue: 42,
  DecimalValue: 3.14159,
  MoneyValue: 99.99,
  DateValue: '2024-01-15',
  BooleanValue: true,
  ImageValue: 'https://example.com/image.jpg',
  IntegerListValue: [1, 2, 3, 4, 5],

  // Reference values point to actual entities
  get ProductReferenceValue() {
    return ProductConstants.ReferencedProductID;
  },
  get CollectionReferenceValue() {
    return CollectionConstants.ReferencedCollectionID;
  },

  // List reference values (for pagination tests)
  get ProductReferenceListValue() {
    return [
      ProductConstants.ReferencedProductID,
      ProductConstants.ReferencedProduct2ID,
      ProductConstants.ReferencedProduct3ID
    ];
  },
  get CollectionReferenceListValue() {
    return [
      CollectionConstants.ReferencedCollectionID,
      CollectionConstants.ReferencedCollection2ID,
      CollectionConstants.ReferencedCollection3ID
    ];
  },

  // Custom Object Reference values
  get CustomObjectReferenceValue() {
    return CustomObjectEntryConstants.ReferencedEntryID;
  },
  get CustomObjectReferenceListValue() {
    return [
      CustomObjectEntryConstants.ReferencedEntryID,
      CustomObjectEntryConstants.ReferencedEntry2ID,
      CustomObjectEntryConstants.ReferencedEntry3ID
    ];
  }
};

export class ProductCustomFieldFixtures implements Fixture<ProductCustomFieldTable> {
  table: Tables = Tables.ProductCustomField;

  async build(): Promise<Partial<ProductCustomFieldTable>[]> {
    return [
      {
        id: ProductCustomFieldConstants.SingleLineTextID,
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.SingleLineTextID,
        value: JSON.stringify(ProductCustomFieldConstants.SingleLineTextValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.MultiLineTextID,
        value: JSON.stringify(ProductCustomFieldConstants.MultiLineTextValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.UrlID,
        value: JSON.stringify(ProductCustomFieldConstants.UrlValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ColorID,
        value: JSON.stringify(ProductCustomFieldConstants.ColorValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.IntegerID,
        value: JSON.stringify(ProductCustomFieldConstants.IntegerValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.DecimalID,
        value: JSON.stringify(ProductCustomFieldConstants.DecimalValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.MoneyID,
        value: JSON.stringify(ProductCustomFieldConstants.MoneyValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.DateID,
        value: JSON.stringify(ProductCustomFieldConstants.DateValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.BooleanID,
        value: JSON.stringify(ProductCustomFieldConstants.BooleanValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ImageID,
        value: JSON.stringify(ProductCustomFieldConstants.ImageValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ProductReferenceID,
        value: JSON.stringify(ProductCustomFieldConstants.ProductReferenceValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CollectionReferenceID,
        value: JSON.stringify(ProductCustomFieldConstants.CollectionReferenceValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.IntegerListID,
        value: JSON.stringify(ProductCustomFieldConstants.IntegerListValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ProductReferenceListID,
        value: JSON.stringify(ProductCustomFieldConstants.ProductReferenceListValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CollectionReferenceListID,
        value: JSON.stringify(ProductCustomFieldConstants.CollectionReferenceListValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CustomObjectReferenceID,
        value: JSON.stringify(ProductCustomFieldConstants.CustomObjectReferenceValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        product_id: ProductConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CustomObjectReferenceListID,
        value: JSON.stringify(ProductCustomFieldConstants.CustomObjectReferenceListValue),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
