import { isFirst, isLast } from '@lunejs/common';
import { cn } from '@lunejs/ui';
import { useWatch } from 'react-hook-form';

import { type CommonCollectionForTranslationFragment, CustomFieldType } from '@/lib/api/types';
import { isTranslatable } from '@/lib/custom-fields/utils/custom-field.utils';

import { TranslateFormRowData } from '../../form/translate-form-row-data';
import { TranslateInput } from '../../form/translate-input';
import { TranslateTextarea } from '../../form/translate-textarea';
import { useTranslateCollectionFormContext } from '../use-form/use-translate-collection-form';

export const TranslateCollectionCustomField = ({ collection }: Props) => {
  const form = useTranslateCollectionFormContext();

  const values = useWatch({ defaultValue: form.formState.defaultValues });

  const translatableFields = collection.customFieldEntries.filter(cf =>
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
            {field.definition.type === CustomFieldType.SingleLineText ? (
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
            ) : (
              <TranslateTextarea
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
  collection: CommonCollectionForTranslationFragment;
};
