import type { Transaction } from '@/persistence/connection';
import type { OptionPreset, OptionPresetTable } from '@/persistence/entities/option-preset';
import { OptionPresetSerializer } from '@/persistence/serializers/option-preset.serializer';
import { Tables } from '@/persistence/tables';

import { Repository } from '../repository';

export class OptionPresetRepository extends Repository<OptionPreset, OptionPresetTable> {
  constructor(trx: Transaction) {
    super(Tables.OptionPreset, trx, new OptionPresetSerializer());
  }
}
