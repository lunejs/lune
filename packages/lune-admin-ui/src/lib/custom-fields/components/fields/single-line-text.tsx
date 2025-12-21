import { useId, useState } from 'react';
import { XIcon } from 'lucide-react';

import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { useList } from '@/shared/hooks/use-list';

export const SingleLineTextCustomField = ({ definition, onChange }: Props) => {
  const id = useId();

  const [persistedValue, setPersistedValue] = useState<{ id: string; value: string }[]>([]);

  const { items, append, remove, update } = useList(['']);

  return (
    <Popover
      onOpenChange={isOpen => {
        if (!isOpen) {
          setPersistedValue(items);
          onChange(items.map(v => v.value));
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
  onChange: (value: string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
