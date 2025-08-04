import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { TestHelper } from '@/tests/utils/test-helper';
import { ShopConstants } from './shop.fixtures';
import { OptionValueTable } from '@/persistence/entities/option_value';
import { OptionConstants } from './option.fixtures';

export const OptionValueConstants = {
  RedOptionValueID: TestHelper.generateUUID(),
  GreenOptionValueID: TestHelper.generateUUID(),
  BlueOptionValueID: TestHelper.generateUUID(),
  SmallOptionValueID: TestHelper.generateUUID(),
  MediumOptionValueID: TestHelper.generateUUID(),
  LargeOptionValueID: TestHelper.generateUUID(),

  CottonOptionValueID: TestHelper.generateUUID(),
  PolyesterOptionValueID: TestHelper.generateUUID(),
  WoolOptionValueID: TestHelper.generateUUID(),

  JackedRedOptionValueID: TestHelper.generateUUID()
};

export class OptionValueFixtures implements Fixture<OptionValueTable> {
  table: Tables = Tables.OptionValue;

  async build(): Promise<Partial<OptionValueTable>[]> {
    return [
      {
        id: OptionValueConstants.RedOptionValueID,
        name: 'Red',
        option_id: OptionConstants.ColorOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.GreenOptionValueID,
        name: 'Green',
        option_id: OptionConstants.ColorOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.BlueOptionValueID,
        name: 'Blue',
        option_id: OptionConstants.ColorOptionID,
        shop_id: ShopConstants.ID
      },

      {
        id: OptionValueConstants.SmallOptionValueID,
        name: 'Small',
        option_id: OptionConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.MediumOptionValueID,
        name: 'Medium',
        option_id: OptionConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.LargeOptionValueID,
        name: 'Large',
        option_id: OptionConstants.SizeOptionID,
        shop_id: ShopConstants.ID
      },

      {
        id: OptionValueConstants.CottonOptionValueID,
        name: 'Cotton',
        option_id: OptionConstants.MaterialOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.PolyesterOptionValueID,
        name: 'Polyester',
        option_id: OptionConstants.MaterialOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.WoolOptionValueID,
        name: 'Wool',
        option_id: OptionConstants.MaterialOptionID,
        shop_id: ShopConstants.ID
      },
      {
        id: OptionValueConstants.JackedRedOptionValueID,
        name: 'Red',
        option_id: OptionConstants.JacketColorOptionID,
        shop_id: ShopConstants.ID
      }
    ];
  }
}
