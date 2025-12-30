import { isFirst, isLast } from '@lunejs/common';
import { cn } from '@lunejs/ui';
import { Fragment } from 'react/jsx-runtime';
import { useWatch } from 'react-hook-form';

import { type CommonProductForTranslationFragment, Locale } from '@/lib/api/types';

import { TranslateFormRowData } from '../../form/translate-form-row-data';
import { TranslateInput } from '../../form/translate-input';
import {
  type TranslateProductFormValues,
  useTranslateProductFormContext
} from '../use-form/use-translate-product-form';

export const TranslateOptions = ({ product }: Props) => {
  const form = useTranslateProductFormContext();

  const values = useWatch({ defaultValue: form.formState.defaultValues });

  return product.options.map((option, optionIdx) => {
    const optionValuesToRender = option.values.filter(v => !v.customObjectEntry?.id);

    return (
      <Fragment key={option.id}>
        <TranslateFormRowData
          className={cn(
            isLast(optionIdx, product.options) && !optionValuesToRender.length && 'border-b-0'
          )}
          key={option.id}
          field="Option name"
          reference={option.name}
        >
          <TranslateInput
            label="English"
            onChange={e => {
              const value = e.target.value;
              const translation = option.translations.find(t => t.locale === Locale.En);

              if (!value && !translation) {
                const newOptions = values.options?.filter(o => o?.id !== option.id) ?? [];
                form.setValue('options', newOptions as TranslateProductFormValues['options']);
                return;
              }

              const isPresent = values.options?.find(op => op?.id === option.id);

              const optionsMapped = values.options?.map(o =>
                o?.id === option.id ? { ...o, name: value } : o
              );
              const optionsWithNewOption = [
                ...(values.options ?? []),
                { id: option.id, name: value }
              ];

              form.setValue(
                'options',
                (isPresent
                  ? optionsMapped
                  : optionsWithNewOption) as TranslateProductFormValues['options']
              );
            }}
            defaultValue={
              form.formState.defaultValues?.options?.find(o => o?.id === option.id)?.name ?? ''
            }
          />
        </TranslateFormRowData>

        {optionValuesToRender.map((value, i) => (
          <TranslateFormRowData
            key={value.id}
            className={{
              row: cn(
                !isLast(i, option.values) && 'border-0!',
                isLast(i, option.values) && isLast(optionIdx, product.options) && 'border-0!'
              ),
              referenceCell: cn(!isLast(i, option.values) && 'border-b')
            }}
            field={isFirst(i) ? 'Option Values' : null}
            reference={value.name}
          >
            <TranslateInput
              label="English"
              className={cn(
                !isLast(i, option.values) && 'border-b',
                isLast(i, option.values) &&
                  isLast(optionIdx, product.options) &&
                  'ring-0! lg:[&:has(input:focus-visible)]:ring-primary/50! lg:[&:has(input:focus-visible)]:ring-[1px]!'
              )}
              onChange={e => {
                const query = e.target.value;
                const translation = value.translations.find(t => t.locale === Locale.En);

                if (!query && !translation) {
                  const newOptionValues =
                    values.optionValues?.filter(o => o?.id !== value.id) ?? [];
                  form.setValue(
                    'optionValues',
                    newOptionValues as TranslateProductFormValues['optionValues']
                  );
                  return;
                }

                const isPresent = values.optionValues?.find(op => op?.id === value.id);
                const mappedOptionValues = values.optionValues?.map(opv =>
                  opv?.id === value.id ? { ...opv, name: query } : opv
                );
                const optionValuesWithNew = [
                  ...(values.optionValues ?? []),
                  { id: value.id, name: query }
                ];

                form.setValue(
                  'optionValues',
                  (isPresent
                    ? mappedOptionValues
                    : optionValuesWithNew) as TranslateProductFormValues['optionValues']
                );
              }}
              defaultValue={
                form.formState.defaultValues?.optionValues?.find(opv => opv?.id === value.id)
                  ?.name ?? ''
              }
            />
          </TranslateFormRowData>
        ))}
      </Fragment>
    );
  });
};

type Props = {
  product: CommonProductForTranslationFragment;
};
