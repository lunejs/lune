import { useWatch } from 'react-hook-form';

import { isFirst, isLast } from '@lunejs/common';
import { cn } from '@lunejs/ui';

import {
  type CommonCustomObjectEntryForTranslationFragment,
  CustomFieldType
} from '@/lib/api/types';
import { isTranslatable } from '@/lib/custom-fields/utils/custom-field.utils';

import { TranslateFormRowData } from '../../form/translate-form-row-data';
import { TranslateInput } from '../../form/translate-input';
import { TranslateTextarea } from '../../form/translate-textarea';
import { useTranslateCustomObjectEntryFormContext } from '../use-form/use-translate-object-entry-form';

export const TranslateCustomObjectValues = ({ entry }: Props) => {
  const form = useTranslateCustomObjectEntryFormContext();

  const values = useWatch({ defaultValue: form.formState.defaultValues });

  const translatableFields = entry.values.filter(cf => isTranslatable(cf.field.type));

  return (
    <>
      {translatableFields.map((field, i) =>
        field.field.isList ? (
          (field.value as string[]).map((value, valueIdx) => (
            <TranslateFormRowData
              key={field.id + valueIdx}
              field={isFirst(valueIdx) ? field.field.name : ''}
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
                key={field.id + valueIdx}
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
            key={field.field.id}
            field={field.field.name}
            reference={field.value}
            className={cn(isLast(i, translatableFields) && 'border-b-0')}
          >
            {field.field.type === CustomFieldType.SingleLineText ? (
              <TranslateInput
                key={field.id}
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
            ) : (
              <TranslateTextarea
                key={field.id}
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
            )}
          </TranslateFormRowData>
        )
      )}
    </>
  );
};

type Props = {
  entry: CommonCustomObjectEntryForTranslationFragment;
};
