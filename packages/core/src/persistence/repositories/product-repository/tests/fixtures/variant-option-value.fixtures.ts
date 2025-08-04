import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';
import { VariantOptionValueTable } from '@/persistence/entities/variant-option-value';
import { OptionValueConstants } from './option-value.fixtures';
import { VariantConstants } from './variant.fixtures';

export class VariantOptionValueFixtures implements Fixture<VariantOptionValueTable> {
  table: Tables = Tables.VariantOptionValue;

  async build(): Promise<Partial<VariantOptionValueTable>[]> {
    return [
      {
        variant_id: VariantConstants.RedSmallShirtID,
        option_value_id: OptionValueConstants.RedOptionValueID
      },
      {
        variant_id: VariantConstants.RedSmallShirtID,
        option_value_id: OptionValueConstants.SmallOptionValueID
      },
      {
        variant_id: VariantConstants.GreenSmallShirtID,
        option_value_id: OptionValueConstants.GreenOptionValueID
      },
      {
        variant_id: VariantConstants.GreenSmallShirtID,
        option_value_id: OptionValueConstants.SmallOptionValueID
      },
      {
        variant_id: VariantConstants.BlueSmallShirtID,
        option_value_id: OptionValueConstants.BlueOptionValueID
      },
      {
        variant_id: VariantConstants.BlueSmallShirtID,
        option_value_id: OptionValueConstants.SmallOptionValueID
      },
      {
        variant_id: VariantConstants.RedMediumShirtID,
        option_value_id: OptionValueConstants.RedOptionValueID
      },
      {
        variant_id: VariantConstants.RedMediumShirtID,
        option_value_id: OptionValueConstants.MediumOptionValueID
      },
      {
        variant_id: VariantConstants.GreenMediumShirtID,
        option_value_id: OptionValueConstants.GreenOptionValueID
      },
      {
        variant_id: VariantConstants.GreenMediumShirtID,
        option_value_id: OptionValueConstants.MediumOptionValueID
      },
      {
        variant_id: VariantConstants.BlueMediumShirtID,
        option_value_id: OptionValueConstants.BlueOptionValueID
      },
      {
        variant_id: VariantConstants.BlueMediumShirtID,
        option_value_id: OptionValueConstants.MediumOptionValueID
      },
      {
        variant_id: VariantConstants.RedLargeShirtID,
        option_value_id: OptionValueConstants.RedOptionValueID
      },
      {
        variant_id: VariantConstants.RedLargeShirtID,
        option_value_id: OptionValueConstants.LargeOptionValueID
      },
      {
        variant_id: VariantConstants.GreenLargeShirtID,
        option_value_id: OptionValueConstants.GreenOptionValueID
      },
      {
        variant_id: VariantConstants.GreenLargeShirtID,
        option_value_id: OptionValueConstants.LargeOptionValueID
      },
      {
        variant_id: VariantConstants.BlueLargeShirtID,
        option_value_id: OptionValueConstants.BlueOptionValueID
      },
      {
        variant_id: VariantConstants.BlueLargeShirtID,
        option_value_id: OptionValueConstants.LargeOptionValueID
      },

      // jacket
      {
        variant_id: VariantConstants.CottonRedJacketID,
        option_value_id: OptionValueConstants.CottonOptionValueID
      },
      {
        variant_id: VariantConstants.CottonRedJacketID,
        option_value_id: OptionValueConstants.JackedRedOptionValueID
      },
      {
        variant_id: VariantConstants.PolyesterRedJacketID,
        option_value_id: OptionValueConstants.PolyesterOptionValueID
      },
      {
        variant_id: VariantConstants.PolyesterRedJacketID,
        option_value_id: OptionValueConstants.JackedRedOptionValueID
      },
      {
        variant_id: VariantConstants.LeatherRedJacketID,
        option_value_id: OptionValueConstants.JackedRedOptionValueID
      },
      {
        variant_id: VariantConstants.LeatherRedJacketID,
        option_value_id: OptionValueConstants.WoolOptionValueID
      }
    ];
  }
}
