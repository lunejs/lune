import type { CollectionCustomFieldTable } from '@/persistence/entities/collection-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants } from './collection.fixtures';
import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CollectionCustomFieldConstants = {
  FieldToRemoveValueID: TestUtils.generateUUID(),
  AnotherFieldValueID: TestUtils.generateUUID()
};

export class CollectionCustomFieldFixtures implements Fixture<CollectionCustomFieldTable> {
  table: Tables = Tables.CollectionCustomField;

  async build(): Promise<Partial<CollectionCustomFieldTable>[]> {
    return [
      {
        id: CollectionCustomFieldConstants.FieldToRemoveValueID,
        value: JSON.stringify('Banner Text Value'),
        collection_id: CollectionConstants.TestCollectionID,
        definition_id: CustomFieldDefinitionConstants.CollectionFieldToRemoveID,
        shop_id: ShopConstants.ID
      },
      {
        id: CollectionCustomFieldConstants.AnotherFieldValueID,
        value: JSON.stringify('Another Value'),
        collection_id: CollectionConstants.TestCollectionID,
        definition_id: CustomFieldDefinitionConstants.AnotherCollectionFieldID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
