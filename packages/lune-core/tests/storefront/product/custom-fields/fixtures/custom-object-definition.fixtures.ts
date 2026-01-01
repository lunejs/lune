import type { CustomObjectDefinitionTable } from '@/persistence/entities/custom-object-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomObjectDefinitionConstants = {
  ID: TestUtils.generateUUID(),
  Key: 'authors',
  Name: 'Authors'
};

export class CustomObjectDefinitionFixtures implements Fixture<CustomObjectDefinitionTable> {
  table: Tables = Tables.CustomObjectDefinition;

  async build(): Promise<Partial<CustomObjectDefinitionTable>[]> {
    return [
      {
        id: CustomObjectDefinitionConstants.ID,
        key: CustomObjectDefinitionConstants.Key,
        name: CustomObjectDefinitionConstants.Name,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
