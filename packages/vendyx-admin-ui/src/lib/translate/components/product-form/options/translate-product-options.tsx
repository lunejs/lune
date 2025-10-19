import { Fragment } from 'react/jsx-runtime';
import { useWatch } from 'react-hook-form';

import { cn } from '@vendyx/ui';

import { type CommonProductForTranslationFragment, Locale } from '@/lib/api/types';
import { isFirst, isLast } from '@/shared/utils/arrays.utils';

import { TranslateFormCell } from '../../form/translate-form-cell';
import { TranslateFormRow } from '../../form/translate-form-row';
import { TranslateInput } from '../../form/translate-input';
import {
  type TranslateProductFormValues,
  useTranslateProductFormContext
} from '../use-form/use-translate-product-form';

export const TranslateOptions = ({ product }: Props) => {
  const form = useTranslateProductFormContext();

  const values = useWatch({ defaultValue: form.formState.defaultValues });

  return product.options.map(option => (
    <Fragment key={option.id}>
      <TranslateFormRow>
        <TranslateFormCell>Option name</TranslateFormCell>
        <TranslateFormCell isDisabled>{option.name}</TranslateFormCell>
        <TranslateInput
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
      </TranslateFormRow>

      {option.values.map((value, i) => (
        <TranslateFormRow key={value.id} className={cn(!isLast(i, option.values) && 'border-0!')}>
          <TranslateFormCell>{isFirst(i) && 'Option Values'}</TranslateFormCell>
          <TranslateFormCell className={cn(!isLast(i, option.values) && 'border-b')} isDisabled>
            {value.name}
          </TranslateFormCell>
          <TranslateInput
            className={cn(!isLast(i, option.values) && 'border-b')}
            onChange={e => {
              const query = e.target.value;
              const translation = value.translations.find(t => t.locale === Locale.En);

              if (!query && !translation) {
                const newOptionValues = values.optionValues?.filter(o => o?.id !== value.id) ?? [];
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
              form.formState.defaultValues?.optionValues?.find(opv => opv?.id === value.id)?.name ??
              ''
            }
          />
        </TranslateFormRow>
      ))}
    </Fragment>
  ));
};

type Props = {
  product: CommonProductForTranslationFragment;
};
