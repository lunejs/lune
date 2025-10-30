import type {
  OptionValueTranslation,
  OptionValueTranslationTable
} from '../entities/option-value-translation';

import { Serializer } from './serializer';

export class OptionValueTranslationSerializer extends Serializer<
  OptionValueTranslation,
  OptionValueTranslationTable
> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['name', 'name'],
      ['locale', 'locale'],
      ['option_value_id', 'optionValueId']
    ]);
  }
}
