import { type CommonProductForTranslationFragment, type Locale } from '@/lib/api/types';
import { isTranslatable } from '@/lib/custom-fields/utils/custom-field.utils';

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
    optionValues: buildDefaultOptionValues(product.options, locale),
    customFields: buildDefaultCustomFields(product.customFieldEntries, locale)
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

const buildDefaultCustomFields = (
  fields: CommonProductForTranslationFragment['customFieldEntries'],
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

// const buildDefaultCustomFields = (
//   fields: CommonProductForTranslationFragment['customFieldEntries'],
//   locale: Locale
// ) => {
//   return fields
//     .filter(f => isTranslatable(f.definition.type))
//     .reduce((prev, curr) => {
//       const translation = curr.translations.find(t => t.locale === locale);

//       if (!curr.definition.isList) return { ...prev, [curr.id]: translation?.value };

//       const value = curr.value as unknown[];

//       const defaultValue = value.map((_v, i) => {
//         return translation?.value[i] ?? '';
//       });

//       return { ...prev, [curr.id]: defaultValue };
//     }, {});
// };
