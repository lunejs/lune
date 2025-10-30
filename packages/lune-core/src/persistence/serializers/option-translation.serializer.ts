import type { OptionTranslation, OptionTranslationTable } from '../entities/option-translation';

import { Serializer } from './serializer';

export class OptionTranslationSerializer extends Serializer<
  OptionTranslation,
  OptionTranslationTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['name', 'name'],
      ['locale', 'locale'],
      ['option_id', 'optionId']
    ]);
  }
}
