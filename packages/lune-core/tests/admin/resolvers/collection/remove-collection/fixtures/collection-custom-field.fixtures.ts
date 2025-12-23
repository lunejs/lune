import type { CollectionCustomFieldTable } from '@/persistence/entities/collection-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants } from './collection.fixtures';
import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CollectionCustomFieldConstants = {
  EllieCollectionBannerTextID: TestUtils.generateUUID(),
  EllieCollectionBannerTextValue: 'Ellie Collection Banner'
};

export class CollectionCustomFieldFixtures implements Fixture<CollectionCustomFieldTable> {
  table: Tables = Tables.CollectionCustomField;

  async build(): Promise<Partial<CollectionCustomFieldTable>[]> {
    return [
      {
        id: CollectionCustomFieldConstants.EllieCollectionBannerTextID,
        value: JSON.stringify(CollectionCustomFieldConstants.EllieCollectionBannerTextValue),
        collection_id: CollectionConstants.EllieCollection,
        definition_id: CustomFieldDefinitionConstants.BannerTextID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
