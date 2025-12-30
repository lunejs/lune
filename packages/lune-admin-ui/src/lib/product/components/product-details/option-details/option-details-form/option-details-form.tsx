import { type FC, useId } from 'react';
import { Trash2Icon } from 'lucide-react';

import { isFirst, isLast, isTruthy } from '@lunejs/common';
import { Button, Input, Label } from '@lunejs/ui';

import { getEntryColorValue, getEntryDisplayValue } from '@/lib/product/utils/option-values.utils';
import { MultiSelect } from '@/shared/components/multi-select/multi-select';

import { useVariantContext, type VariantContext } from '../../variants/variants.context';

import { useOptionDetailsForm } from './use-option-details-form';

export const OptionDetailsForm: FC<Props> = ({ option }) => {
  const id = useId();

  const { customObjects } = useVariantContext();

  const {
    name,
    setName,
    isOptionNameRepeated,
    values,
    valueRepeated,
    setValues,
    hasNoValues,
    onDone,
    onRemove,
    onCancel
  } = useOptionDetailsForm(option);

  const customObject = customObjects.find(co => co.id === option.customObjectId);
  const customObjectEntries = customObject?.entries.items ?? [];

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>Option name</Label>
        <Input
          id={id}
          defaultValue={name}
          onChange={e => setName(e.target.value)}
          placeholder="Size"
        />
        {isOptionNameRepeated && (
          <p className="text-sm text-red-500">Already exists an option called &quot;{name}&quot;</p>
        )}
      </div>
      {customObject && customObjectEntries.length > 0 ? (
        <MultiSelect
          items={customObjectEntries.map(entry => {
            const displayValue = getEntryDisplayValue(entry, customObject.displayField?.id);
            const colorValue = getEntryColorValue(entry);

            return {
              value: entry.id,
              label: displayValue,
              leading: colorValue ? (
                <div className="h-3 w-3 rounded-xs" style={{ backgroundColor: colorValue }} />
              ) : undefined
            };
          })}
          defaultSelected={values
            .filter(v => v.name)
            .map(v => {
              const entry = customObjectEntries.find(e => e.id === v.customObjectEntryId);

              if (!entry) return;

              const displayValue = getEntryDisplayValue(entry, customObject.displayField?.id);
              const colorValue = getEntryColorValue(entry);

              return {
                label: displayValue,
                value: entry.id,
                leading: colorValue ? (
                  <div className="h-3 w-3 rounded-xs" style={{ backgroundColor: colorValue }} />
                ) : undefined
              };
            })
            .filter(isTruthy)}
          onSelectionChange={items => {
            setValues(
              items.length === 0
                ? [
                    {
                      id: Math.random().toString(),
                      name: ''
                    }
                  ]
                : items.map(i => {
                    const existing = values.find(v => v.customObjectEntryId === i.value);
                    return {
                      id: existing?.id ?? Math.random().toString(),
                      name: i.label,
                      customObjectEntryId: i.value
                    };
                  })
            );
          }}
        />
      ) : (
        <div className="">
          <Label>Values</Label>
          <div className="flex flex-col gap-2 w-full mt-1">
            {values.map((value, i) => {
              const isRepeated = valueRepeated?.id === value.id;

              return (
                <div key={value.id} className="flex items-start gap-2">
                  <div className="flex flex-col gap-1 w-full">
                    <Input
                      aria-label={`option value ${i}`}
                      defaultValue={value.name}
                      placeholder={isFirst(i) ? 'S' : 'Value'}
                      onChange={e => {
                        const content = e.target.value;
                        const isTheLastOption = isLast(i, values);

                        const newState = values.map(v =>
                          v.id === value.id ? { ...v, name: content } : v
                        );

                        if (isTheLastOption && content && !isRepeated) {
                          newState.push({ id: Math.random().toString(), name: '' });
                        }

                        setValues(newState);
                      }}
                    />
                    {isRepeated && (
                      <p className="text-sm text-red-500">
                        Already exists an option value called &quot;
                        {value.name}&quot;
                      </p>
                    )}
                  </div>
                  {!isFirst(i) && (
                    <Button
                      aria-label={`Remove option value "${value.name}"`}
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setValues(values => values.filter(v => v.id !== value.id))}
                    >
                      <Trash2Icon size={16} />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Button type="button" size="sm" variant="destructive" onClick={onRemove}>
          Remove
        </Button>
        <div className="flex items-center gap-2">
          <Button type="button" size="sm" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={Boolean(valueRepeated) || isOptionNameRepeated || hasNoValues || !name}
            type="button"
            size="sm"
            onClick={onDone}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

type Props = {
  option: VariantContext['options'][0];
};
