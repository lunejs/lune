import { useEffect, useState } from 'react';

import { LunePrice } from '@lune/common';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem
} from '@lune/ui';

import { FormMessages } from '@/shared/forms/form-messages';

import { useDiscountDetailsFormContext } from '../../use-form/use-form';

export const DiscountOrderRequirements = ({ argKey }: Props) => {
  const {
    setValue: setFormValue,
    getValues,
    formState: { defaultValues }
  } = useDiscountDetailsFormContext();

  const defaultValue = (defaultValues?.metadata ?? {})[argKey] as Value;

  const [error, setError] = useState<null | string>(null);
  const [value, setValue] = useState<Value>(
    defaultValue ?? {
      type: ValueType.None,
      value: 0
    }
  );

  useEffect(() => {
    setFormValue('metadata', {
      ...getValues('metadata'),
      [argKey]: value
    });
  }, [value]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4">
        <RadioGroup
          onValueChange={(type: ValueType) =>
            setValue({
              value:
                defaultValue.type == type
                  ? defaultValue.value
                  : type === ValueType.None
                    ? 0
                    : value.value,
              type
            })
          }
          defaultValue={defaultValue.type}
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
              <>
                <Input
                  defaultValue={
                    defaultValue.type === ValueType.MinimumAmount
                      ? LunePrice.format(defaultValue.value)
                      : undefined
                  }
                  placeholder="$0.00"
                  onChange={e => {
                    const input = LunePrice.parse(e.target.value);

                    if (Number.isNaN(input)) {
                      setError('Must be a number');
                      return;
                    }

                    setValue({ ...value, value: LunePrice.toCent(input) });
                  }}
                />
                {error && <FormMessage>{error}</FormMessage>}
              </>
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
              <>
                <Input
                  defaultValue={
                    defaultValue.type === ValueType.MinimumItems ? defaultValue.value : undefined
                  }
                  placeholder="0"
                  type="number"
                  onChange={e => {
                    const input = Number(e.target.value);

                    if (Number.isNaN(input)) {
                      setError('Must be a number');
                      return;
                    }

                    if (input < 0) {
                      setError(FormMessages.greater(0));
                      return;
                    }

                    setError(null);
                    setValue({ ...value, value: input });
                  }}
                />
                {error && <FormMessage>{error}</FormMessage>}
              </>
            )}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

type Value = {
  type: ValueType;
  value: number;
};

enum ValueType {
  None = 'none',
  MinimumItems = 'minimum_items',
  MinimumAmount = 'minimum_amount'
}

type Props = {
  argKey: string;
};
