import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem
} from '@lune/ui';

import { useDiscountDetailsFormContext } from '../../use-form/use-form';

export const DiscountOrderRequirements = () => {
  const { setValue: setFormValue, getValues } = useDiscountDetailsFormContext();

  const [value, setValue] = useState<Value>({
    type: ValueType.None,
    value: ''
  });

  useEffect(() => {
    setFormValue('metadata', {
      ...getValues('metadata'),
      orderRequirements: value
    });
  }, [value]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4">
        <RadioGroup
          onValueChange={(type: ValueType) => setValue({ ...value, type })}
          defaultValue={ValueType.None}
          className={'flex flex-col gap-4'}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem id={ValueType.None} value={ValueType.None} />
              <Label htmlFor={ValueType.None} className="font-normal">
                There is no requirements
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem id={ValueType.MinimumAmount} value={ValueType.MinimumAmount} />
              <Label htmlFor={ValueType.MinimumAmount} className="font-normal">
                Minimum purchase amount
              </Label>
            </div>
            {value.type === ValueType.MinimumAmount && (
              <Input
                placeholder="$0.00"
                onChange={e => setValue({ ...value, value: e.target.value })}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem id={ValueType.MinimumItems} value={ValueType.MinimumItems} />
              <Label htmlFor={ValueType.MinimumItems} className="font-normal">
                Minimum purchase items
              </Label>
            </div>
            {value.type === ValueType.MinimumItems && (
              <Input
                placeholder="0"
                type="number"
                onChange={e => setValue({ ...value, value: e.target.value })}
              />
            )}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

type Value = {
  type: ValueType;
  value: string;
};

enum ValueType {
  None = 'none',
  MinimumItems = 'minimum_items',
  MinimumAmount = 'minimum_amount'
}
