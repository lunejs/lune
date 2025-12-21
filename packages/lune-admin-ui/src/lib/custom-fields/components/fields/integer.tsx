import { useId, useState } from 'react';

import { Input, Label, Popover, PopoverContent, PopoverTrigger } from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';

export const IntegerCustomField = ({ definition, onChange }: Props) => {
  const id = useId();

  const [value, setValue] = useState('');
  const [persistedValue, setPersistedValue] = useState('');

  return (
    <Popover
      onOpenChange={isOpen => {
        if (!isOpen) {
          setPersistedValue(value);
          onChange(value === '' ? null : Number(value));
        }
      }}
    >
      <div className="flex items-center gap-4">
        <Label htmlFor={id} className="w-full">
          {definition.name}
        </Label>
        <PopoverTrigger asChild>
          <Input
            type="number"
            id={id}
            value={persistedValue}
            readOnly
            className="w-3/4 shrink-0 text-start"
          />
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-72" align="start">
        <div className="flex flex-col gap-2">
          <Label>{definition.name}</Label>
          <Input
            type="number"
            defaultValue={persistedValue}
            onChange={e => setValue(e.target.value)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

type Props = {
  onChange: (value: number | null) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
