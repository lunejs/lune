import { useEffect, useState } from 'react';

import { LunePrice } from '@lune/common';
import {
  FormMessage,
  InputGroupAddon,
  InputGroupInput,
  InputGroupRoot,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@lune/ui';

import { useDiscountDetailsFormContext } from '../../use-form/use-form';

export const DiscountValue = ({ argKey }: Props) => {
  const { getValues, setValue: setFormValue } = useDiscountDetailsFormContext();

  const [error, setError] = useState<null | string>(null);
  const [value, setValue] = useState<Value>({
    type: 'percentage',
    value: 0
  });

  useEffect(() => {
    setFormValue('metadata', {
      ...getValues('metadata'),
      [argKey]: value
    });
  }, [value]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <Label>Discount value</Label>
        <Select
          defaultValue={value.type}
          onValueChange={type => setValue({ ...value, type: type as ValueType })}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">Percentage</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="h-3.5" />

        {value.type === 'percentage' ? (
          <InputGroupRoot>
            <InputGroupInput
              onChange={e => {
                const input = Number(e.target.value);

                if (Number.isNaN(input)) {
                  setError('Must be a number');
                  return;
                }

                if (!Number.isInteger(input)) {
                  setError('Must be an integer');
                  return;
                }

                if (input < 0 || input > 100) {
                  setError('Must be between 0 and 100');
                  return;
                }

                setError(null);
                setValue({ ...value, value: Number(input / 100) });
              }}
            />
            <InputGroupAddon align={'inline-end'}>%</InputGroupAddon>
          </InputGroupRoot>
        ) : (
          <InputGroupRoot>
            <InputGroupInput
              onChange={e => {
                const input = LunePrice.parse(e.target.value);

                if (Number.isNaN(input)) {
                  setError('Must be a number');
                  return;
                }

                setValue({ ...value, value: LunePrice.toCent(input) });
              }}
            />
            <InputGroupAddon align={'inline-end'}>$</InputGroupAddon>
          </InputGroupRoot>
        )}
        {error && <FormMessage>{error}</FormMessage>}
      </div>
    </div>
  );
};

type Value = {
  type: ValueType;
  value: number;
};

type ValueType = 'percentage' | 'fixed';

type Props = {
  argKey: string;
};
