import { isFirst, isLast } from '@lune/common';
import { cn } from '@lune/ui';

import { type CommonProductForTranslationFragment, CustomFieldType } from '@/lib/api/types';

import { TranslateFormRowData } from '../../form/translate-form-row-data';
import { TranslateInput } from '../../form/translate-input';

export const TranslateProductCustomField = ({ product }: Props) => {
  const translatableFields = product.customFieldEntries.filter(cf =>
    [CustomFieldType.SingleLineText].includes(cf.definition.type)
  );

  return (
    <>
      {translatableFields.map((field, i) =>
        field.definition.isList ? (
          (field.value as string[]).map((value, valueIdx) => (
            <TranslateFormRowData
              key={field.definition.id}
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
                className={cn(
                  !isLast(valueIdx, field.value) && 'border-b',
                  isLast(valueIdx, field.value) &&
                    isLast(i, translatableFields) &&
                    'ring-0! lg:[&:has(input:focus-visible)]:ring-primary/50! lg:[&:has(input:focus-visible)]:ring-[1px]!'
                )}
                label="English"
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
            <TranslateInput label="English" />
          </TranslateFormRowData>
        )
      )}
    </>
  );
};

type Props = {
  product: CommonProductForTranslationFragment;
};
