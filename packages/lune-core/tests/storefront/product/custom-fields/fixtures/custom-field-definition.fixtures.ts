import {
  CustomFieldAppliesTo,
  type CustomFieldDefinitionTable,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  SingleLineTextID: TestUtils.generateUUID(),
  SingleLineTextKey: 'single_line_text_field',

  MultiLineTextID: TestUtils.generateUUID(),
  MultiLineTextKey: 'multi_line_text_field',

  UrlID: TestUtils.generateUUID(),
  UrlKey: 'url_field',

  ColorID: TestUtils.generateUUID(),
  ColorKey: 'color_field',

  IntegerID: TestUtils.generateUUID(),
  IntegerKey: 'integer_field',

  DecimalID: TestUtils.generateUUID(),
  DecimalKey: 'decimal_field',

  MoneyID: TestUtils.generateUUID(),
  MoneyKey: 'money_field',

  DateID: TestUtils.generateUUID(),
  DateKey: 'date_field',

  BooleanID: TestUtils.generateUUID(),
  BooleanKey: 'boolean_field',

  ImageID: TestUtils.generateUUID(),
  ImageKey: 'image_field',

  ProductReferenceID: TestUtils.generateUUID(),
  ProductReferenceKey: 'product_reference_field',

  CollectionReferenceID: TestUtils.generateUUID(),
  CollectionReferenceKey: 'collection_reference_field',

  // List fields
  IntegerListID: TestUtils.generateUUID(),
  IntegerListKey: 'integer_list_field',

  ProductReferenceListID: TestUtils.generateUUID(),
  ProductReferenceListKey: 'product_reference_list_field',

  CollectionReferenceListID: TestUtils.generateUUID(),
  CollectionReferenceListKey: 'collection_reference_list_field'
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table: Tables = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.SingleLineTextID,
        name: 'Single Line Text',
        key: CustomFieldDefinitionConstants.SingleLineTextKey,
        type: CustomFieldType.SingleLineText,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 0,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.MultiLineTextID,
        name: 'Multi Line Text',
        key: CustomFieldDefinitionConstants.MultiLineTextKey,
        type: CustomFieldType.MultiLineText,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 1,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.UrlID,
        name: 'URL',
        key: CustomFieldDefinitionConstants.UrlKey,
        type: CustomFieldType.Url,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 2,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ColorID,
        name: 'Color',
        key: CustomFieldDefinitionConstants.ColorKey,
        type: CustomFieldType.Color,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 3,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.IntegerID,
        name: 'Integer',
        key: CustomFieldDefinitionConstants.IntegerKey,
        type: CustomFieldType.Integer,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 4,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.DecimalID,
        name: 'Decimal',
        key: CustomFieldDefinitionConstants.DecimalKey,
        type: CustomFieldType.Decimal,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 5,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.MoneyID,
        name: 'Money',
        key: CustomFieldDefinitionConstants.MoneyKey,
        type: CustomFieldType.Money,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 6,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.DateID,
        name: 'Date',
        key: CustomFieldDefinitionConstants.DateKey,
        type: CustomFieldType.Date,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 7,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.BooleanID,
        name: 'Boolean',
        key: CustomFieldDefinitionConstants.BooleanKey,
        type: CustomFieldType.Boolean,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 8,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ImageID,
        name: 'Image',
        key: CustomFieldDefinitionConstants.ImageKey,
        type: CustomFieldType.Image,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 9,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ProductReferenceID,
        name: 'Product Reference',
        key: CustomFieldDefinitionConstants.ProductReferenceKey,
        type: CustomFieldType.ProductReference,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 10,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.CollectionReferenceID,
        name: 'Collection Reference',
        key: CustomFieldDefinitionConstants.CollectionReferenceKey,
        type: CustomFieldType.CollectionReference,
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 11,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.IntegerListID,
        name: 'Integer List',
        key: CustomFieldDefinitionConstants.IntegerListKey,
        type: CustomFieldType.Integer,
        is_list: true,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 12,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.ProductReferenceListID,
        name: 'Product Reference List',
        key: CustomFieldDefinitionConstants.ProductReferenceListKey,
        type: CustomFieldType.ProductReference,
        is_list: true,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 13,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.CollectionReferenceListID,
        name: 'Collection Reference List',
        key: CustomFieldDefinitionConstants.CollectionReferenceListKey,
        type: CustomFieldType.CollectionReference,
        is_list: true,
        applies_to_entity: CustomFieldAppliesTo.Product,
        order: 14,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
