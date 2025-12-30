import { zodResolver } from '@hookform/resolvers/zod';
import { notification, useDialogContext } from '@lunejs/ui';
import { useForm } from 'react-hook-form';
import type z from 'zod';

import type { CommonOrderFragment } from '@/lib/api/types';
import { useCancelOrder } from '@/lib/order/hooks/use-cancel-order';

import { CancelOrderFormSchema } from './form-schema';

export const useCancelOrderForm = (order: CommonOrderFragment) => {
  const { setIsOpen } = useDialogContext();
  const { cancelOrder, isLoading } = useCancelOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(CancelOrderFormSchema),
    defaultValues: {
      reason: '',
      shouldRestock: false
    }
  });

  const onSubmit = async (values: FormValues) => {
    const result = await cancelOrder(order.id, values);

    if (!result.isSuccess) {
      form.setError('root', { message: result.error });
      return;
    }

    notification.success('Order canceled successfully');
    setIsOpen(false);
  };

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof CancelOrderFormSchema>;
