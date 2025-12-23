import type { CommonCollectionForTranslationFragment, Locale } from '@/lib/api/types';
import { isTranslatable } from '@/lib/custom-fields/utils/custom-field.utils';

export const buildCollectionTranslateFormDefaultValues = (
  collection: CommonCollectionForTranslationFragment,
  locale: Locale
) => {
  const translation = collection.translations.find(t => t.locale === locale);

  return {
    name: translation?.name ?? '',
    description: translation?.description ?? '',
    customFields: buildDefaultCustomFields(collection.customFieldEntries, locale)
  };
};

const buildDefaultCustomFields = (
  fields: CommonCollectionForTranslationFragment['customFieldEntries'],
  locale: Locale
) => {
  return fields
    .filter(f => isTranslatable(f.definition.type))
    .reduce((prev, curr) => {
      const translation = curr.translations.find(t => t.locale === locale);
      return {
        ...prev,
        [curr.id]: curr.definition.isList ? (translation?.value ?? []) : translation?.value
      };
    }, {});
};
