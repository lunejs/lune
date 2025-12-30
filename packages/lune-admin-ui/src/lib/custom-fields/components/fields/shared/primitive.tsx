import { type ComponentProps, useId, useState } from 'react';
import { formatDate } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';

import { isTruthy } from '@lunejs/common';
import {
  Button,
  Calendar,
  cn,
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
} from '@lunejs/ui';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { useList } from '@/shared/hooks/use-list';

export const PrimitiveCustomField = ({
  onChange,
  definition,
  placeholder,
  defaultValues,
  inputProps,
  mapOnSave,
  textarea,
  bool,
  date
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
                  : date
                    ? persistedValue
                        .map(v => (v.value ? formatDate(v.value, 'PPP') : ''))
                        .join(', ')
                    : persistedValue.map(v => v.value).join(', ')
            }
            readOnly
            className="w-full shrink-0 text-start dark:group-hover:bg-input/50 group-hover:bg-muted"
          />
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto min-w-72 max-w-lg" align="start">
        <div className="flex flex-col gap-2">
          <Label>{definition.name}</Label>
          {items.map(item => {
            return (
              <div key={item.id} className="flex items-center gap-2">
                {textarea ? (
                  <Textarea
                    placeholder={placeholder}
                    value={item.value}
                    onChange={e => update(item.id, e.target.value)}
                  />
                ) : bool ? (
                  <Select value={item.value} onValueChange={value => update(item.id, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder || 'Select a value'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'true'}>True</SelectItem>
                      <SelectItem value={'false'}>False</SelectItem>
                    </SelectContent>
                  </Select>
                ) : date ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal justify-between flex-1',
                          !item.value && 'text-muted-foreground'
                        )}
                      >
                        {item.value ? (
                          formatDate(new Date(item.value), 'PPP')
                        ) : (
                          <span>{placeholder}</span>
                        )}
                        <CalendarIcon size={16} className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        defaultMonth={item.value ? new Date(item.value) : undefined}
                        selected={item.value ? new Date(item.value) : undefined}
                        onSelect={date => update(item.id, date ? date.toISOString() : '')}
                        className="h-81.25"
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Input
                    {...inputProps}
                    value={item.value}
                    placeholder={placeholder}
                    onChange={e => update(item.id, e.target.value)}
                  />
                )}
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
  onChange: (items: { id: string; value: string }[]) => void;
  placeholder?: string;
  inputProps?: ComponentProps<'input'>;
  defaultValues?: string[];
  textarea?: boolean;
  bool?: boolean;
  date?: boolean;
  mapOnSave?: (items: { id: string; value: string }) => { id: string; value: string };
};
