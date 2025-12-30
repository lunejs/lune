import { useEffect, useState } from 'react';

import { LunePrice } from '@lunejs/common';
import {
  FormMessage,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@lunejs/ui';

import { useDiscountDetailsFormContext } from '../../use-form/use-form';

export const DiscountValue = ({ argKey }: Props) => {
  const {
    getValues,
    setValue: setFormValue,
    formState: { defaultValues }
  } = useDiscountDetailsFormContext();

  const defaultValue = (defaultValues?.metadata ?? {})[argKey] as Value | undefined;

  const [error, setError] = useState<null | string>(null);
  const [value, setValue] = useState<Value>({
    type: defaultValue?.type ?? 'percentage',
    value: defaultValue?.value ?? 0
  });

  useEffect(() => {
    setFormValue('metadata', {
      ...getValues('metadata'),
      [argKey]: value
    });
  }, [value]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex flex-col gap-2">
        <Label>Discount value</Label>
        <Select
          defaultValue={value.type}
          onValueChange={type =>
            setValue({
              type: type as ValueType,
              value:
                defaultValue?.type === type
                  ? defaultValue?.type === 'percentage'
                    ? defaultValue?.value * 100
                    : defaultValue?.value
                  : 0
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">Percentage</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="hidden sm:block h-3.5" />

        {value.type === 'percentage' ? (
          <InputGroup>
            <InputGroupInput
              key={1}
              defaultValue={
                defaultValue?.type === 'percentage' ? defaultValue?.value * 100 : undefined
              }
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
          </InputGroup>
        ) : (
          <InputGroup>
            <InputGroupInput
              key={2}
              defaultValue={
                defaultValue?.type === 'fixed' ? LunePrice.format(defaultValue?.value) : undefined
              }
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
          </InputGroup>
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
