import type { ComponentProps } from 'react';

import { Button } from '@lunejs/ui';

import type { CommonPaymentMethodFragment } from '@/lib/api/types';

import type { PaymentMethodFormInput } from './use-form';

export const PaymentMethodSubmitButton = ({
  defaultMethod,
  method,
  isLoading,
  ...props
}: Props) => {
  const hasChanged = defaultMethod
    ? JSON.stringify({
        name: method.name,
        enabled: method.enabled,
        handler: { code: method.handlerCode, args: method.args }
      }) !==
      JSON.stringify({
        name: defaultMethod.name,
        enabled: defaultMethod.enabled,
        handler: defaultMethod.handler
      })
    : true;

  const hasRequiredFields = !!method.name;

  return (
    <Button type="submit" disabled={isLoading || !hasChanged || !hasRequiredFields} {...props}>
      Save
    </Button>
  );
};

type Props = ComponentProps<'button'> & {
  defaultMethod: CommonPaymentMethodFragment | undefined;
  method: PaymentMethodFormInput;
  isLoading: boolean;
};
