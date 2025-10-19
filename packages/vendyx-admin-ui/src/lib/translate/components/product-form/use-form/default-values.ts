import type { CommonProductForTranslationFragment, Locale } from '@/lib/api/types';

import type { TranslateProductFormValues } from './use-translate-product-form';

export const buildProductTranslateFormDefaultValues = (
  product: CommonProductForTranslationFragment,
  locale: Locale
) => {
  const translation = product.translations.find(t => t.locale === locale);

  return {
    name: translation?.name ?? '',
    description: translation?.description ?? '',
    options: buildDefaultOptions(product.options, locale),
    optionValues: buildDefaultOptionValues(product.options, locale)
  };
};

const buildDefaultOptions = (
  options: CommonProductForTranslationFragment['options'],
  locale: Locale
) => {
  return options
    .map(option => {
      const translation = option.translations.find(t => t.locale === locale);

      return {
        id: option.id,
        name: translation?.name
      } as TranslateProductFormValues['options'][0];
    })
    .filter(o => o.name !== undefined);
};

const buildDefaultOptionValues = (
  options: CommonProductForTranslationFragment['options'],
  locale: Locale
) => {
  return options
    .flatMap(opt => opt.values)
    .map(opv => {
      const translation = opv.translations.find(t => t.locale === locale);

      return {
        id: opv.id,
        name: translation?.name
      } as TranslateProductFormValues['optionValues'][0];
    })
    .filter(o => o.name !== undefined);
};
