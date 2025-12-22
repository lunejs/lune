import { useWatch } from 'react-hook-form';

import { isFirst, isLast } from '@lune/common';
import { cn } from '@lune/ui';

import { type CommonProductForTranslationFragment } from '@/lib/api/types';
import { isTranslatable } from '@/lib/custom-fields/utils/custom-field.utils';

import { TranslateFormRowData } from '../../form/translate-form-row-data';
import { TranslateInput } from '../../form/translate-input';
import { useTranslateProductFormContext } from '../use-form/use-translate-product-form';

export const TranslateProductCustomField = ({ product }: Props) => {
  const form = useTranslateProductFormContext();

  const values = useWatch({ defaultValue: form.formState.defaultValues });

  const translatableFields = product.customFieldEntries.filter(cf =>
    isTranslatable(cf.definition.type)
  );

  return (
    <>
      {translatableFields.map((field, i) =>
        field.definition.isList ? (
          (field.value as string[]).map((value, valueIdx) => (
            <TranslateFormRowData
              key={field.definition.id + valueIdx}
              field={isFirst(valueIdx) ? field.definition.name : ''}
              reference={value}
              className={{
                row: cn(
                  !isLast(valueIdx, field.value) && 'border-0!',
                  isLast(valueIdx, field.value) && isLast(i, translatableFields) && 'border-0!'
                ),
                referenceCell: cn(!isLast(valueIdx, field.value) && 'border-b')
              }}
            >
              <TranslateInput
                defaultValue={values.customFields?.[field.id][valueIdx]}
                className={cn(
                  !isLast(valueIdx, field.value) && 'border-b',
                  isLast(valueIdx, field.value) &&
                    isLast(i, translatableFields) &&
                    'ring-0! lg:[&:has(input:focus-visible)]:ring-primary/50! lg:[&:has(input:focus-visible)]:ring-[1px]!'
                )}
                label="English"
                onChange={e => {
                  const value = e.target.value;
                  const currArray = form.getValues('customFields')[field.id];
                  currArray[valueIdx] = value;

                  form.setValue('customFields', {
                    ...form.getValues('customFields'),
                    [field.id]: currArray
                  });
                }}
              />
            </TranslateFormRowData>
          ))
        ) : (
          <TranslateFormRowData
            key={field.definition.id}
            field={field.definition.name}
            reference={field.value}
            className={cn(isLast(i, translatableFields) && 'border-b-0')}
          >
            <TranslateInput
              defaultValue={values.customFields?.[field.id]}
              label="English"
              onChange={e => {
                const value = e.target.value;

                form.setValue('customFields', {
                  ...form.getValues('customFields'),
                  [field.id]: value
                });
              }}
            />
          </TranslateFormRowData>
        )
      )}
    </>
  );
};

type Props = {
  product: CommonProductForTranslationFragment;
};
