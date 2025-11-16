import { useState } from 'react';

import { notification, useDialogContext } from '@lune/ui';

import type { CommonShippingHandlersFragment, CommonZoneFragment } from '@/lib/api/types';
import { useCreateShippingMethod } from '@/lib/shipments/hooks/use-create-shipping-method';
import { useUpdateShippingMethod } from '@/lib/shipments/hooks/use-update-shipping-method';

export const useShippingMethodForm = (
  zone: CommonZoneFragment,
  shippingHandlers: CommonShippingHandlersFragment[],
  methodToUpdate?: CommonZoneFragment['shippingMethods'][0]
) => {
  const { setIsOpen } = useDialogContext();

  const { createShippingMethod } = useCreateShippingMethod(zone.id);
  const { updateShippingMethod } = useUpdateShippingMethod(zone.id);

  const isEditing = methodToUpdate;

  const [isLoading, setIsLoading] = useState(false);
  const [handler, setHandler] = useState(shippingHandlers[0]);

  const [method, setMethod] = useState<FormInput>({
    handlerCode: methodToUpdate?.handler.code ?? '',
    name: methodToUpdate?.name ?? '',
    enabled: methodToUpdate?.enabled ?? true,
    args: methodToUpdate?.handler.args ?? {}
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

    setIsLoading(true);

    if (isEditing) {
      const result = await updateShippingMethod({
        id: methodToUpdate.id,
        input: {
          args: method.args,
          enabled: method.enabled,
          name: method.name
        }
      });

      setIsLoading(false);

      if (!result.isSuccess) {
        notification.error(result.error);
      } else {
        setIsOpen(false);
        notification.success('Shipping method updated');
      }
    } else {
      const result = await createShippingMethod({
        input: {
          name: method.name,
          enabled: method.enabled,
          zoneId: zone.id,
          handler: {
            code: handler.code,
            args: method.args
          }
        }
      });

      if (!result.isSuccess) {
        notification.error(result.error);
        setIsLoading(false);
        return;
      }

      setIsOpen(false);
      notification.success('Shipping method created');
    }
  };

  return {
    method,
    setValue,
    handler,
    setHandler,
    createShippingMethod: exec,
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

type FormInput = {
  handlerCode: string;
  name: string;
  enabled: boolean;
  args: Record<string, string>;
};
