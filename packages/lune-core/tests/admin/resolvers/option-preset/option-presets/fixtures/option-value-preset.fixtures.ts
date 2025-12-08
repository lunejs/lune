import type { OptionValuePresetTable } from '@/persistence/entities/option-value-preset';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';
import { TestUtils } from '@/tests/utils/test-utils';

import { OptionPresetConstants } from './option-preset.fixtures';
import { ShopConstants } from './shop.fixtures';

export const OptionValuePresetConstants = {
  RedOptionValueID: TestUtils.generateUUID(),
  GreenOptionValueID: TestUtils.generateUUID(),
  BlueOptionValueID: TestUtils.generateUUID(),
  YellowOptionValueID: TestUtils.generateUUID(),
  SmallOptionValueID: TestUtils.generateUUID(),
  MediumOptionValueID: TestUtils.generateUUID(),
  LargeOptionValueID: TestUtils.generateUUID()
};

export class OptionValuePresetFixtures implements Fixture<OptionValuePresetTable> {
  table: Tables = Tables.OptionValuePreset;

  async build(): Promise<Partial<OptionValuePresetTable>[]> {
    return [
      {
        id: OptionValuePresetConstants.RedOptionValueID,
        name: 'Red',
        option_preset_id: OptionPresetConstants.ColorOptionID,
        shop_id: ShopConstants.ID,
        metadata: { hex: '#fff' }
      },
      {
        id: OptionValuePresetConstants.GreenOptionValueID,
        name: 'Green',
        option_preset_id: OptionPresetConstants.ColorOptionID,
        shop_id: ShopConstants.ID,
        metadata: { hex: '#fff' }
      },
      {
        id: OptionValuePresetConstants.BlueOptionValueID,
        name: 'Blue',
        option_preset_id: OptionPresetConstants.ColorOptionID,
        shop_id: ShopConstants.ID,
        metadata: { hex: '#fff' }
      },
      {
        id: OptionValuePresetConstants.YellowOptionValueID,
        name: 'Yellow',
        option_preset_id: OptionPresetConstants.ColorOptionID,
        shop_id: ShopConstants.ID,
        metadata: { hex: '#fff' }
      },

      {
        id: OptionValuePresetConstants.SmallOptionValueID,
        name: 'Small',
        option_preset_id: OptionPresetConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValuePresetConstants.MediumOptionValueID,
        name: 'Medium',
        option_preset_id: OptionPresetConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValuePresetConstants.LargeOptionValueID,
        name: 'Large',
        option_preset_id: OptionPresetConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
