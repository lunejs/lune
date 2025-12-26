import type { CommonCustomObjectEntryForTranslationFragment, Locale } from '@/lib/api/types';
import { isTranslatable } from '@/lib/custom-fields/utils/custom-field.utils';

export const buildObjectEntryTranslateFormDefaultValues = (
  entry: CommonCustomObjectEntryForTranslationFragment,
  locale: Locale
) => {
  return {
    customFields: entry.values
      .filter(f => isTranslatable(f.field.type))
      .reduce((prev, curr) => {
        const translation = curr.translations.find(t => t.locale === locale);
        return {
          ...prev,
          [curr.id]: curr.field.isList ? (translation?.value ?? []) : translation?.value
        };
      }, {})
  };
};
