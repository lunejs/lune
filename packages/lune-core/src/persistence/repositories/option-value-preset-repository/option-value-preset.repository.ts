import type { Transaction } from '@/persistence/connection';
import type {
  OptionValuePreset,
  OptionValuePresetTable
} from '@/persistence/entities/option-value-preset';
import { OptionValuePresetSerializer } from '@/persistence/serializers/option-value-preset.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OptionValuePresetRepository extends Repository<
  OptionValuePreset,
  OptionValuePresetTable
> {
  constructor(trx: Transaction) {
    super(Tables.OptionValuePreset, trx, new OptionValuePresetSerializer());
  }
}
