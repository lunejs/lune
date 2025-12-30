import { useEffect, useMemo } from 'react';

import { LunePrice } from '@lunejs/common';
import {
  Button,
  DialogClose,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@lunejs/ui';

import type { Args, CommonZoneFragment } from '@/lib/api/types';

import { useZoneShippingMethodContext } from '../zone-shipping-method-context';

import { useShippingMethodForm } from './use-shipping-method-form';

export const ShippingMethodForm = ({ methodToUpdate }: Props) => {
  const { handlers } = useZoneShippingMethodContext();

  const { method, setValue, handler, setHandler, isLoading, createShippingMethod } =
    useShippingMethodForm(methodToUpdate);

  const form: Args = useMemo(() => handler.args, [handler]);

  useEffect(() => {
    setValue({ key: 'handlerId', value: handler.code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="handlerId">Type of shipping method</Label>
        <Select
          name="handlerId"
          // Editing handler id for a shipping method is not supported
          disabled={!!methodToUpdate}
          value={handler.code}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onValueChange={value => setHandler(handlers.find(h => h.code === value)!)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {handlers.map(handlers => (
              <SelectItem key={handlers.code} value={handlers.code}>
                {handlers.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          defaultValue={method.name}
          onChange={e => setValue({ key: 'name', value: e.target.value })}
        />
      </div>

      {Object.entries(form).map(([key, arg]) =>
        arg.type === 'price' ? (
          <div key={key} className="flex flex-col gap-2">
            <Label htmlFor={key}>{arg.label}</Label>
            <Input
              name={key}
              placeholder={arg.placeholder}
              defaultValue={
                method.args[key] !== undefined ? LunePrice.format(Number(method.args[key])) : ''
              }
              onChange={e =>
                setValue({
                  key: 'args',
                  value: {
                    ...method.args,
                    [key]: LunePrice.toCent(LunePrice.parse(e.target.value))
                  }
                })
              }
            />
          </div>
        ) : (
          <div key={key} className="flex flex-col gap-2">
            {/* <Label>{arg.label}</Label> */}
            <Input
              type={arg.type}
              defaultValue={method.args[key]}
              onChange={e =>
                setValue({
                  key: 'args',
                  value: { ...method.args, [key]: e.target.value }
                })
              }
            />
          </div>
        )
      )}
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button isLoading={isLoading} onClick={createShippingMethod}>
          Save
        </Button>
      </div>
    </div>
  );
};

type Props = {
  /**
   * Optional prop to make the form update a shipping method instead of creating a new one
   */
  methodToUpdate?: CommonZoneFragment['shippingMethods'][0];
};
