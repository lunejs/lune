import { type ComponentProps, useId, useState } from 'react';
import { XIcon } from 'lucide-react';

import { isTruthy } from '@lune/common';
import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea
} from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { useList } from '@/shared/hooks/use-list';

export const PrimitiveCustomField = ({
  onChange,
  definition,
  defaultValues,
  inputProps,
  mapOnSave,
  textarea,
  bool
}: Props) => {
  const id = useId();

  const { items, build, append, remove, reset, update } = useList(defaultValues ?? ['']);
  const [persistedValue, setPersistedValue] = useState<{ id: string; value: string }[]>(
    defaultValues?.map(dv => build(dv)) ?? []
  );

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
      <div className="group grid grid-cols-1 items-center gap-2 md:grid-cols-[25%_1fr] md:gap-4 cursor-default">
        <Label htmlFor={id} className="w-full">
          {definition.name}
        </Label>
        <PopoverTrigger asChild>
          <Input
            id={id}
            value={
              textarea
                ? persistedValue
                    .map(v => v.value)
                    .join(', ')
                    .replaceAll('\n', ' ')
                : bool
                  ? persistedValue
                      .map(
                        v => `${v.value.charAt(0).toUpperCase()}${v.value.slice(1, v.value.length)}`
                      )
                      .join(', ')
                      .replaceAll('\n', ' ')
                  : persistedValue.map(v => v.value).join(', ')
            }
            readOnly
            className="w-full shrink-0 text-start dark:group-hover:bg-input/50 group-hover:bg-muted"
          />
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-72" align="start">
        <div className="flex flex-col gap-2">
          <Label>{definition.name}</Label>
          {items.map(item => {
            return (
              <div key={item.id} className="flex items-center gap-2">
                {textarea ? (
                  <Textarea value={item.value} onChange={e => update(item.id, e.target.value)} />
                ) : bool ? (
                  <Select value={item.value} onValueChange={value => update(item.id, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'true'}>True</SelectItem>
                      <SelectItem value={'false'}>False</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    {...inputProps}
                    value={item.value}
                    onChange={e => update(item.id, e.target.value)}
                  />
                )}
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
  defaultValues?: string[];
  textarea?: boolean;
  bool?: boolean;
  mapOnSave?: (items: { id: string; value: string }) => { id: string; value: string };
};
