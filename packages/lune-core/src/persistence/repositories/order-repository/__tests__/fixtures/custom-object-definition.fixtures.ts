import type { CustomObjectDefinitionTable } from '@/persistence/entities/custom-object-definition';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const CustomObjectDefinitionConstants = {
  ColorID: TestUtils.generateUUID()
};

export class CustomObjectDefinitionFixtures implements Fixture<CustomObjectDefinitionTable> {
  table: Tables = Tables.CustomObjectDefinition;

  async build(): Promise<Partial<CustomObjectDefinitionTable>[]> {
    return [
      {
        id: CustomObjectDefinitionConstants.ColorID,
        name: 'Color',
        key: 'color',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
