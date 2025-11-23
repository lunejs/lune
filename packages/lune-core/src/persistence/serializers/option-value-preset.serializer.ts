import type { OptionValuePreset, OptionValuePresetTable } from '../entities/option-value-preset';

import { Serializer } from './serializer';

export class OptionValuePresetSerializer extends Serializer<
  OptionValuePreset,
  OptionValuePresetTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['metadata', 'metadata'],
      ['option_preset_id', 'optionPresetId']
    ]);
  }
}
