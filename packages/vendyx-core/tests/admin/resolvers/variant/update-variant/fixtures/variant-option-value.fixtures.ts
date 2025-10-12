import type { VariantOptionValueTable } from '@/persistence/entities/variant-option-value';
import { Tables } from '@/persistence/tables';
import type { Fixture } from '@/tests/utils/fixtures';

import { OptionValueConstants } from './option-value.fixtures';
import { VariantConstants } from './variant.fixtures';

export class VariantOptionValueFixtures implements Fixture<VariantOptionValueTable> {
  table: Tables = Tables.VariantOptionValue;

  async build(): Promise<Partial<VariantOptionValueTable>[]> {
    return [
      {
        variant_id: VariantConstants.ID,
        option_value_id: OptionValueConstants.BlueOptionValueID
      },
      {
        variant_id: VariantConstants.ID,
        option_value_id: OptionValueConstants.LargeOptionValueID
      }
    ];
  }
}
