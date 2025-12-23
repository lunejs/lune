import type { CustomFieldDefinitionTable } from '@/persistence/entities/custom-field-definition';
import {
  CustomFieldAppliesTo,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomFieldDefinitionConstants = {
  BannerTextID: TestUtils.generateUUID(),
  BannerTextKey: 'banner_text',
  PromotionLabelID: TestUtils.generateUUID(),
  PromotionLabelKey: 'promotion_label'
};

export class CustomFieldDefinitionFixtures implements Fixture<CustomFieldDefinitionTable> {
  table: Tables = Tables.CustomFieldDefinition;

  async build(): Promise<Partial<CustomFieldDefinitionTable>[]> {
    return [
      {
        id: CustomFieldDefinitionConstants.BannerTextID,
        key: CustomFieldDefinitionConstants.BannerTextKey,
        name: 'Banner Text',
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Collection,
        type: CustomFieldType.SingleLineText,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomFieldDefinitionConstants.PromotionLabelID,
        key: CustomFieldDefinitionConstants.PromotionLabelKey,
        name: 'Promotion Label',
        is_list: false,
        applies_to_entity: CustomFieldAppliesTo.Collection,
        type: CustomFieldType.SingleLineText,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
