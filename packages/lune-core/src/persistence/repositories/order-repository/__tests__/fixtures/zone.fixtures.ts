import type { ZoneTable } from '@/persistence/entities/zone';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const ZoneConstants = {
  LocalID: TestUtils.generateUUID(),
  InternationalID: TestUtils.generateUUID()
};

export class ZoneFixtures implements Fixture<ZoneTable> {
  table = Tables.Zone;

  async build(): Promise<Partial<ZoneTable>[]> {
    return [
      {
        shop_id: ShopConstants.ID,
        id: ZoneConstants.LocalID,
        name: 'Local'
      },
      {
        shop_id: ShopConstants.ID,
        id: ZoneConstants.InternationalID,
        name: 'International'
      }
    ];
  }
}
