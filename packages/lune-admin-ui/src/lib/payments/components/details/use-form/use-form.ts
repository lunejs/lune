import { useState } from 'react';
import { notification } from '@lunejs/ui';
import { useNavigate } from 'react-router';

import type { CommonPaymentHandlerFragment, CommonPaymentMethodFragment } from '@/lib/api/types';
import { useCreatePaymentMethod } from '@/lib/payments/hooks/use-create-payment-method';
import { useUpdatePaymentMethod } from '@/lib/payments/hooks/use-update-payment-method';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const usePaymentMethodForm = (
  handlers: CommonPaymentHandlerFragment[],
  defaultMethod?: CommonPaymentMethodFragment
) => {
  const navigate = useNavigate();

  const { loading, failure, success } = useLoadingNotification();

  const { createPaymentMethod } = useCreatePaymentMethod();
  const { updatePaymentMethod } = useUpdatePaymentMethod();

  const isEditing = defaultMethod;

  const [isLoading, setIsLoading] = useState(false);
  const [handler, setHandler] = useState(handlers[0]);

  const [method, setMethod] = useState<PaymentMethodFormInput>({
    handlerCode: defaultMethod?.handler.code ?? '',
    name: defaultMethod?.name ?? '',
    enabled: defaultMethod?.enabled ?? true,
    args: defaultMethod?.handler.args ?? {}
  });

  const setValue = (input: SetValueInput) => {
    setMethod(prev => {
      return {
        ...prev,
        [input.key]: input.value
      };
    });
  };

  const exec = async () => {
    const isNameEmpty = !method.name;

    const isAnyArgNotFilled =
      Object.values(handler.args).length !== Object.keys(method.args).length;

    const isAnyArgWithEmptyValue = Object.values(method.args).some(arg => arg === '');

    if (isNameEmpty || isAnyArgWithEmptyValue || isAnyArgNotFilled) {
      notification.error('Please fill all the fields');
      return;
    }

    loading('Saving...');
    setIsLoading(true);

    if (isEditing) {
      const result = await updatePaymentMethod({
        id: defaultMethod.id,
        input: {
          args: method.args,
          enabled: method.enabled,
          name: method.name
        }
      });

      setIsLoading(false);

      if (!result.isSuccess) {
        failure(result.error);
        return;
      }

      success('Payment method updated');
    } else {
      const result = await createPaymentMethod({
        input: {
          name: method.name,
          enabled: method.enabled,
          handler: {
            code: handler.code,
            args: method.args
          }
        }
      });

      setIsLoading(false);

      if (!result.isSuccess) {
        failure(result.error);
        return;
      }

      success('Payment method created');
      navigate(`/settings/payments/${result.data.id}`);
    }
  };

  return {
    method,
    setValue,
    handler,
    setHandler,
    onSave: exec,
    isLoading
  };
};

type SetValueInput =
  | {
      key: 'name' | 'description' | 'handlerId';
      value: string;
    }
  | {
      key: 'enabled';
      value: boolean;
    }
  | {
      key: 'args';
      value: any;
    };

export type PaymentMethodFormInput = {
  handlerCode: string;
  name: string;
  enabled: boolean;
  args: Record<string, string>;
};
