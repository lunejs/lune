import { useId, useState } from 'react';
import { isTruthy } from '@lunejs/common';
import { Button, Label, Popover, PopoverContent, PopoverTrigger } from '@lunejs/ui';
import { PipetteIcon, XIcon } from 'lucide-react';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { ColorPicker } from '@/shared/components/color-picker/color-picker';
import { useList } from '@/shared/hooks/use-list';

import { CustomFieldPreviewContainer } from './shared/preview/custom-field-preview-container';

export const ColorCustomField = ({ onChange, definition, defaultValues }: Props) => {
  const id = useId();

  const { items, build, append, remove, reset, update } = useList(defaultValues ?? ['']);
  const [persistedValue, setPersistedValue] = useState<{ id: string; value: string }[]>(
    defaultValues?.map(dv => build(dv)) ?? []
  );

  return (
    <Popover
      onOpenChange={isOpen => {
        if (!isOpen) {
          const newValues = items.filter(i => isTruthy(i.value));
          setPersistedValue(newValues);
          reset(newValues);

          if (definition.isList) onChange(newValues.length ? newValues.map(v => v.value) : null);
          else onChange(newValues.map(v => v.value)[0] ?? null);

          // avoid having empty options
          if (!newValues.length) append('');
        }
      }}
    >
      <div className="group grid grid-cols-1 items-center gap-2 md:grid-cols-[25%_1fr] md:gap-4 cursor-default">
        <Label htmlFor={id} className="w-full">
          {definition.name}
        </Label>
        <PopoverTrigger asChild>
          <CustomFieldPreviewContainer className="px-2">
            {persistedValue.map(v => {
              return (
                <div className="w-5 h-5 rounded shrink-0" style={{ backgroundColor: v.value }} />
              );
            })}
          </CustomFieldPreviewContainer>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto min-w-72 max-w-lg" align="start">
        <div className="flex flex-col gap-2">
          <Label>{definition.name}</Label>
          {items.map(item => {
            return (
              <div key={item.id} className="flex items-center gap-2">
                <div
                  className="h-9 w-9 shrink-0 rounded-md"
                  style={{ backgroundColor: item.value || '#000' }}
                />
                <ColorPicker onChange={hex => update(item.id, hex)}>
                  <Button size={'sm'} variant={'outline'}>
                    <PipetteIcon size={16} />
                    Pick color
                  </Button>
                </ColorPicker>
                {items.length > 1 && (
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={() => remove(item.id)}
                    className="shrink-0"
                  >
                    <XIcon />
                  </Button>
                )}
              </div>
            );
          })}
          {definition.isList && (
            <Button variant={'outline'} size={'sm'} onClick={() => append('')} className="w-fit">
              Add item
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

type Props = {
  definition: CommonCustomFieldDefinitionFragment;
  onChange: (items: string | string[] | null) => void;
  defaultValues?: string[];
};
