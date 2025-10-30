import { type DeepPartial, type UseFormReturn, useWatch } from 'react-hook-form';

import { Button } from '@lune/ui';

import { type CommonProductForTranslationFragment, Locale } from '@/lib/api/types';

import {
  type TranslateProductFormValues,
  useTranslateProductFormContext
} from '../use-form/use-translate-product-form';

// TODO: Refactor
export const TranslateProductFormSubmitButton = ({ product }: Props) => {
  const form = useTranslateProductFormContext();
  const values = useWatch({ defaultValue: form.getValues() });
  const translation = product.translations.find(t => t.locale === Locale.En);

  const optionsHasChanged = getOptionsHasChanged(product, values);
  const optionValuesHasChanged = getOptionValuesHasChanged(form, product, values);
  const generalHasChanged = generalValuesHasChanged(translation, values);

  const isDirty =
    optionsHasChanged || optionValuesHasChanged || generalHasChanged || form.formState.isSubmitting;

  return (
    <Button disabled={!isDirty} className="w-full sm:w-auto">
      Save
    </Button>
  );
};

type Props = {
  product: CommonProductForTranslationFragment;
};

const generalValuesHasChanged = (
  translation: CommonProductForTranslationFragment['translations'][0] | undefined,
  values: DeepPartial<TranslateProductFormValues>
) => {
  return (
    (translation?.name ?? '') !== values.name ||
    (translation?.description ?? '') !== values.description
  );
};

const getOptionValuesHasChanged = (
  form: UseFormReturn<TranslateProductFormValues>,
  product: CommonProductForTranslationFragment,
  values: DeepPartial<TranslateProductFormValues>
) => {
  return (
    form.formState.defaultValues?.optionValues?.length !== values.optionValues?.length ||
    product.options
      .flatMap(op => op.values)
      .flatMap(o => ({
        optionValueId: o.id,
        ...(o.translations.find(t => t.locale === Locale.En) ?? {})
      }))
      .some(t => values.optionValues?.find(op => op?.id === t?.optionValueId)?.name !== t?.name)
  );
};

const getOptionsHasChanged = (
  product: CommonProductForTranslationFragment,
  values: DeepPartial<TranslateProductFormValues>
) => {
  return product.options
    .flatMap(o => ({ optionId: o.id, ...(o.translations.find(t => t.locale === Locale.En) ?? {}) }))
    .some(t => values.options?.find(op => op?.id === t?.optionId)?.name !== t?.name);
};
