import type { OptionValuePresetTable } from '@/persistence/entities/option-value-preset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OptionPresetConstants } from './option-preset.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionValuePresetConstants = {
  RedPresetID: TestUtils.generateUUID(),
  BluePresetID: TestUtils.generateUUID(),
  GreenPresetID: TestUtils.generateUUID()
};

export class OptionValuePresetFixtures implements Fixture<OptionValuePresetTable> {
  table: Tables = Tables.OptionValuePreset;

  async build(): Promise<Partial<OptionValuePresetTable>[]> {
    return [
      {
        id: OptionValuePresetConstants.RedPresetID,
        name: 'Red',
        metadata: { hex: '#FF0000' },
        option_preset_id: OptionPresetConstants.ColorPresetID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValuePresetConstants.BluePresetID,
        name: 'Blue',
        metadata: { hex: '#0000FF' },
        option_preset_id: OptionPresetConstants.ColorPresetID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValuePresetConstants.GreenPresetID,
        name: 'Green',
        metadata: { hex: '#00FF00' },
        option_preset_id: OptionPresetConstants.ColorPresetID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
