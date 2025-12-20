import type { OptionPresetTable } from '@/persistence/entities/option-preset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { ShopConstants } from './shop.fixtures';

export const OptionPresetConstants = {
  ColorPresetID: TestUtils.generateUUID()
};

export class OptionPresetFixtures implements Fixture<OptionPresetTable> {
  table: Tables = Tables.OptionPreset;

  async build(): Promise<Partial<OptionPresetTable>[]> {
    return [
      {
        id: OptionPresetConstants.ColorPresetID,
        name: 'Color',
        shop_id: ShopConstants.ID
      }
    ];
  }
}
