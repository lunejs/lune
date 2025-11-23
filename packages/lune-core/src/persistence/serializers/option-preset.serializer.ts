import type { OptionPreset, OptionPresetTable } from '../entities/option-preset';

import { Serializer } from './serializer';

export class OptionPresetSerializer extends Serializer<OptionPreset, OptionPresetTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name']
    ]);
  }
}
