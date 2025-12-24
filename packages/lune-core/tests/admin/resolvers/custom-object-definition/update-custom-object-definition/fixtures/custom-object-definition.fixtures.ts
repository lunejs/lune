import type { CustomObjectDefinitionTable } from '@/persistence/entities/custom-object-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomObjectDefinitionConstants = {
  FirstID: TestUtils.generateUUID(),
  SecondID: TestUtils.generateUUID()
};

export class CustomObjectDefinitionFixtures implements Fixture<CustomObjectDefinitionTable> {
  table = Tables.CustomObjectDefinition;

  async build(): Promise<Partial<CustomObjectDefinitionTable>[]> {
    return [
      {
        id: CustomObjectDefinitionConstants.FirstID,
        name: 'Blog Post',
        key: 'blog_post',
        shop_id: ShopConstants.ID
      },
      {
        id: CustomObjectDefinitionConstants.SecondID,
        name: 'FAQ',
        key: 'faq',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
