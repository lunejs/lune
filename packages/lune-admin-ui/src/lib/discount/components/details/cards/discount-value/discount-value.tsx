import { useEffect, useState } from 'react';

import {
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

export const DiscountValue = () => {
  const { getValues, setValue: setFormValue } = useDiscountDetailsFormContext();

  const [value, setValue] = useState<Value>({
    type: 'percentage',
    value: 0
  });

  useEffect(() => {
    setFormValue('metadata', {
      ...getValues('metadata'),
      discountValue: value
    });
  }, [value]);

  return (
    <div className="flex items-end gap-4">
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
      {value.type === 'percentage' ? (
        <InputGroupRoot>
          <InputGroupInput onChange={e => setValue({ ...value, value: Number(e.target.value) })} />
          <InputGroupAddon align={'inline-end'}>%</InputGroupAddon>
        </InputGroupRoot>
      ) : (
        <InputGroupRoot>
          <InputGroupInput onChange={e => setValue({ ...value, value: Number(e.target.value) })} />
          <InputGroupAddon align={'inline-end'}>$</InputGroupAddon>
        </InputGroupRoot>
      )}
    </div>
  );
};

type Value = {
  type: ValueType;
  value: number;
};

type ValueType = 'percentage' | 'fixed';
