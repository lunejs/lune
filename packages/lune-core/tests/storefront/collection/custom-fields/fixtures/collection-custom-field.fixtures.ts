import type { CollectionCustomFieldTable } from '@/persistence/entities/collection-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants } from './collection.fixtures';
import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { CustomObjectEntryConstants } from './custom-object-entry.fixtures';
import { ProductConstants } from './product.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CollectionCustomFieldConstants = {
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

  ProductReferenceValue: ProductConstants.ReferencedProductID,
  CollectionReferenceValue: CollectionConstants.ReferencedCollectionID,

  ProductReferenceListValue: [
    ProductConstants.ReferencedProductID,
    ProductConstants.ReferencedProduct2ID,
    ProductConstants.ReferencedProduct3ID
  ],
  CollectionReferenceListValue: [
    CollectionConstants.ReferencedCollectionID,
    CollectionConstants.ReferencedCollection2ID,
    CollectionConstants.ReferencedCollection3ID
  ],

  // Custom Object Reference values
  CustomObjectReferenceValue: CustomObjectEntryConstants.ReferencedEntryID,
  CustomObjectReferenceListValue: [
    CustomObjectEntryConstants.ReferencedEntryID,
    CustomObjectEntryConstants.ReferencedEntry2ID,
    CustomObjectEntryConstants.ReferencedEntry3ID
  ]
};

export class CollectionCustomFieldFixtures implements Fixture<CollectionCustomFieldTable> {
  table: Tables = Tables.CollectionCustomField;

  async build(): Promise<Partial<CollectionCustomFieldTable>[]> {
    return [
      {
        id: CollectionCustomFieldConstants.SingleLineTextID,
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.SingleLineTextID,
        value: JSON.stringify(CollectionCustomFieldConstants.SingleLineTextValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.MultiLineTextID,
        value: JSON.stringify(CollectionCustomFieldConstants.MultiLineTextValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.UrlID,
        value: JSON.stringify(CollectionCustomFieldConstants.UrlValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ColorID,
        value: JSON.stringify(CollectionCustomFieldConstants.ColorValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.IntegerID,
        value: JSON.stringify(CollectionCustomFieldConstants.IntegerValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.DecimalID,
        value: JSON.stringify(CollectionCustomFieldConstants.DecimalValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.MoneyID,
        value: JSON.stringify(CollectionCustomFieldConstants.MoneyValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.DateID,
        value: JSON.stringify(CollectionCustomFieldConstants.DateValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.BooleanID,
        value: JSON.stringify(CollectionCustomFieldConstants.BooleanValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ImageID,
        value: JSON.stringify(CollectionCustomFieldConstants.ImageValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ProductReferenceID,
        value: JSON.stringify(CollectionCustomFieldConstants.ProductReferenceValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CollectionReferenceID,
        value: JSON.stringify(CollectionCustomFieldConstants.CollectionReferenceValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.IntegerListID,
        value: JSON.stringify(CollectionCustomFieldConstants.IntegerListValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.ProductReferenceListID,
        value: JSON.stringify(CollectionCustomFieldConstants.ProductReferenceListValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CollectionReferenceListID,
        value: JSON.stringify(CollectionCustomFieldConstants.CollectionReferenceListValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CustomObjectReferenceID,
        value: JSON.stringify(CollectionCustomFieldConstants.CustomObjectReferenceValue),
        shop_id: ShopConstants.ID
      },
      {
        id: TestUtils.generateUUID(),
        collection_id: CollectionConstants.ID,
        definition_id: CustomFieldDefinitionConstants.CustomObjectReferenceListID,
        value: JSON.stringify(CollectionCustomFieldConstants.CustomObjectReferenceListValue),
        shop_id: ShopConstants.ID
      }
    ];
  }
}
