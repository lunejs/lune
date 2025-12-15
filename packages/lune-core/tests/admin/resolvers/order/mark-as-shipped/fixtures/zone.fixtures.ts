import type { ZoneTable } from '@/persistence/entities/zone';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const ZoneConstants = {
  ID: TestUtils.generateUUID()
};

export class ZoneFixtures implements Fixture<ZoneTable> {
  table: Tables = Tables.Zone;

  async build(): Promise<Partial<ZoneTable>[]> {
    return [
      {
        id: ZoneConstants.ID,
        shop_id: ShopConstants.ID,
        name: 'Default Zone'
      }
    ];
  }
}
