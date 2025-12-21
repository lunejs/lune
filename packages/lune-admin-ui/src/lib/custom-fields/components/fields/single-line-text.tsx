import { useId, useState } from 'react';
import { XIcon } from 'lucide-react';

import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { genUUID } from '@/shared/utils/id.utils';

export const SingleLineTextCustomField = ({ definition, onChange }: Props) => {
  const id = useId();

  const [values, setValues] = useState<Value[]>([new Value('')]);
  const [persistedValue, setPersistedValue] = useState<Value[]>([new Value('')]);

  return (
    <Popover
      onOpenChange={isOpen => {
        if (!isOpen) {
          setPersistedValue(values);
          onChange(values.map(v => v.value));
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
          {values.map(value => {
            const defaultValue = persistedValue.find(v => v.id === value.id);

            return (
              <div key={value.id} className="flex items-center gap-2">
                <Input
                  defaultValue={defaultValue?.value}
                  onChange={e =>
                    setValues(
                      values.map(v => (v.id === value.id ? { ...v, value: e.target.value } : v))
                    )
                  }
                />
                {values.length > 1 && (
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={() => setValues(prev => prev.filter(v => v.id !== value.id))}
                  >
                    <XIcon />
                  </Button>
                )}
              </div>
            );
          })}
          {definition.isList && (
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => setValues(prev => [...prev, new Value('')])}
              className="w-fit"
            >
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

class Value {
  public id: string;

  constructor(public value: string) {
    this.id = genUUID();
  }
}
