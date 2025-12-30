import { useEffect, useMemo } from 'react';

import { formatDate, LunePrice } from '@lunejs/common';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@lunejs/ui';

import type {
  Args,
  CommonPaymentHandlerFragment,
  CommonPaymentMethodFragment
} from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { PaymentMethodSubmitButton } from './use-form/submit-button';
import { usePaymentMethodForm } from './use-form/use-form';

export const PaymentDetails = ({ method: defaultMethod, handlers }: Props) => {
  const { method, setValue, handler, setHandler, isLoading, onSave } = usePaymentMethodForm(
    handlers,
    defaultMethod
  );

  const form: Args = useMemo(() => handler.args, [handler]);

  useEffect(() => {
    setValue({ key: 'handlerId', value: handler.code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSave();
      }}
    >
      <SettingsPageLayout
        title={defaultMethod ? defaultMethod.name : 'Add payment method'}
        subtitle={
          defaultMethod
            ? formatDate(new Date(defaultMethod.createdAt))
            : 'Add a payment method to start receiving payments.'
        }
        backUrl="/settings/payments"
        actions={
          <PaymentMethodSubmitButton
            defaultMethod={defaultMethod}
            method={method}
            isLoading={isLoading}
          />
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="handlerId">Type of shipping method</Label>
            <Select
              name="handlerId"
              // Editing handler id for a shipping method is not supported
              disabled={!!defaultMethod}
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
                <Label>{arg.label}</Label>
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
        </div>
      </SettingsPageLayout>
    </form>
  );
};

type Props = {
  method?: CommonPaymentMethodFragment;
  handlers: CommonPaymentHandlerFragment[];
};
