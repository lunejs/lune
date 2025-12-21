import { type ComponentProps, useId, useState } from 'react';
import { XIcon } from 'lucide-react';

import { isTruthy } from '@lune/common';
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { useList } from '@/shared/hooks/use-list';

export const PrimitiveCustomField = ({ onChange, definition, inputProps, mapOnSave }: Props) => {
  const id = useId();

  const [persistedValue, setPersistedValue] = useState<{ id: string; value: string }[]>([]);
  const { items, append, remove, reset, update } = useList(['']);

  return (
    <Popover
      onOpenChange={isOpen => {
        if (!isOpen) {
          const newValues = mapOnSave
            ? items.filter(i => isTruthy(i.value)).map(mapOnSave)
            : items.filter(i => isTruthy(i.value));

          setPersistedValue(newValues);
          onChange(newValues);
          reset(newValues);

          // avoid having empty options
          if (!newValues.length) append('');
        }
      }}
    >
      <div className="flex items-center gap-4">
        <Label htmlFor={id} className="w-full">
          {definition.name}
        </Label>
        <PopoverTrigger asChild>
          <Input
            id={id}
            value={persistedValue.map(v => v.value).join(', ')}
            readOnly
            className="w-3/4 shrink-0 text-start"
          />
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-72" align="start">
        <div className="flex flex-col gap-2">
          <Label>{definition.name}</Label>
          {items.map(item => {
            const defaultValue = persistedValue.find(v => v.id === item.id);

            return (
              <div key={item.id} className="flex items-center gap-2">
                <Input
                  {...inputProps}
                  defaultValue={defaultValue?.value}
                  onChange={e => update(item.id, e.target.value)}
                />
                {items.length > 1 && (
                  <Button variant={'ghost'} size={'icon'} onClick={() => remove(item.id)}>
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
  onChange: (items: { id: string; value: string }[]) => void;
  inputProps?: ComponentProps<'input'>;
  mapOnSave?: (items: { id: string; value: string }) => { id: string; value: string };
};
