import type { CustomObjectDefinitionTable } from '@/persistence/entities/custom-object-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomObjectDefinitionConstants = {
  WithDisplayFieldID: TestUtils.generateUUID(),
  WithDisplayFieldKey: 'blog_post',
  WithDisplayFieldName: 'Blog Post',
  WithoutDisplayFieldID: TestUtils.generateUUID(),
  WithoutDisplayFieldKey: 'faq',
  WithoutDisplayFieldName: 'FAQ'
};

export class CustomObjectDefinitionFixtures implements Fixture<CustomObjectDefinitionTable> {
  table = Tables.CustomObjectDefinition;

  async build(): Promise<Partial<CustomObjectDefinitionTable>[]> {
    return [
      {
        id: CustomObjectDefinitionConstants.WithDisplayFieldID,
        name: CustomObjectDefinitionConstants.WithDisplayFieldName,
        key: CustomObjectDefinitionConstants.WithDisplayFieldKey,
        display_field_id: null,
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectDefinitionConstants.WithoutDisplayFieldID,
        name: CustomObjectDefinitionConstants.WithoutDisplayFieldName,
        key: CustomObjectDefinitionConstants.WithoutDisplayFieldKey,
        display_field_id: null,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
