import type { CommonCollectionForTranslationFragment, Locale } from '@/lib/api/types';

export const buildCollectionTranslateFormDefaultValues = (
  collection: CommonCollectionForTranslationFragment,
  locale: Locale
) => {
  const translation = collection.translations.find(t => t.locale === locale);

  return {
    name: translation?.name ?? '',
    description: translation?.description ?? ''
  };
};
