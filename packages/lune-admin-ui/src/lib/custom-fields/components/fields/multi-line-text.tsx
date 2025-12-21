import { useId, useState } from 'react';

import { Input, Label, Popover, PopoverContent, PopoverTrigger, Textarea } from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

export const MultiLineTextCustomField = ({ definition, onChange }: Props) => {
  const id = useId();

  const [value, setValue] = useState('');
  const [persistedValue, setPersistedValue] = useState('');

  return (
    <Popover
      onOpenChange={isOpen => {
        if (!isOpen) {
          setPersistedValue(value);
          onChange(value);
        }
      }}
    >
      <div className="flex items-center gap-4">
        <Label htmlFor={id} className="w-full">
          {definition.name}
        </Label>
        <PopoverTrigger asChild>
          <Input id={id} value={persistedValue} readOnly className="w-3/4 shrink-0 text-start" />
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-72" align="start">
        <div className="flex flex-col gap-2">
          <Label>{definition.name}</Label>
          <Textarea
            className="w-full"
            defaultValue={persistedValue}
            onChange={e => setValue(e.target.value)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

type Props = {
  onChange: (value: string) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
