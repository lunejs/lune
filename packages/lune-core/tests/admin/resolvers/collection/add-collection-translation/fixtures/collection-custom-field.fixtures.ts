import type { CollectionCustomFieldTable } from '@/persistence/entities/collection-custom-field';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { CollectionConstants } from './collection.fixtures';
import { CustomFieldDefinitionConstants } from './custom-field-definition.fixtures';
import { ShopConstants } from './shop.fixtures';

export const CollectionCustomFieldConstants = {
  // Custom fields sin traducción (para test de add new)
  BannerTextFieldID: TestUtils.generateUUID(),
  BannerTextFieldValue: 'Summer Sale',
  PromotionLabelFieldID: TestUtils.generateUUID(),
  PromotionLabelFieldValue: '50% OFF',

  // Custom fields con traducción existente (para test de update)
  AlreadyTranslatedBannerTextFieldID: TestUtils.generateUUID(),
  AlreadyTranslatedBannerTextFieldValue: 'Winter Collection'
};

export class CollectionCustomFieldFixtures implements Fixture<CollectionCustomFieldTable> {
  table: Tables = Tables.CollectionCustomField;

  async build(): Promise<Partial<CollectionCustomFieldTable>[]> {
    return [
      {
        id: CollectionCustomFieldConstants.BannerTextFieldID,
        value: JSON.stringify(CollectionCustomFieldConstants.BannerTextFieldValue),
        collection_id: CollectionConstants.EllieCollection,
        definition_id: CustomFieldDefinitionConstants.BannerTextID,
        shop_id: ShopConstants.ID
      },
      {
        id: CollectionCustomFieldConstants.PromotionLabelFieldID,
        value: JSON.stringify(CollectionCustomFieldConstants.PromotionLabelFieldValue),
        collection_id: CollectionConstants.EllieCollection,
        definition_id: CustomFieldDefinitionConstants.PromotionLabelID,
        shop_id: ShopConstants.ID
      },
      {
        id: CollectionCustomFieldConstants.AlreadyTranslatedBannerTextFieldID,
        value: JSON.stringify(CollectionCustomFieldConstants.AlreadyTranslatedBannerTextFieldValue),
        collection_id: CollectionConstants.JoelCollection,
        definition_id: CustomFieldDefinitionConstants.BannerTextID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
