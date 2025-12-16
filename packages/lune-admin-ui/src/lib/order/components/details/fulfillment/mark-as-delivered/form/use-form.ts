import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';

import { notification, useDialogContext } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';
import { useMarkOrderAsCompleted } from '@/lib/order/hooks/use-mark-order-as-completed';
import { useMarkOrderAsDelivered } from '@/lib/order/hooks/use-mark-order-as-delivered';

import { MarkAsDeliveredFormSchema } from './form-schema';

export const useMarkAsDeliveredForm = (order: CommonOrderFragment) => {
  const { setIsOpen } = useDialogContext();
  const { markAsDelivered, isLoading: isLoadingDelivered } = useMarkOrderAsDelivered();
  const { markAsCompleted, isLoading: isLoadingCompleted } = useMarkOrderAsCompleted();

  const form = useForm<FormValues>({
    resolver: zodResolver(MarkAsDeliveredFormSchema),
    defaultValues: {
      shouldCompleteOrder: false
    }
  });

  const onSubmit = async (values: FormValues) => {
    const { shouldCompleteOrder } = values;

    if (!(await handleDeliver())) return;

    if (shouldCompleteOrder && !(await handleComplete())) return;

    if (shouldCompleteOrder) {
      notification.success('Order marked as delivered and completed');
    } else {
      notification.success('Order marked as delivered');
    }

    setIsOpen(false);
  };

  const handleComplete = async () => {
    const result = await markAsCompleted(order.id);

    if (!result.isSuccess) {
      form.setError('root', { message: result.error });
      return false;
    }

    return true;
  };

  const handleDeliver = async () => {
    const result = await markAsDelivered(order.id);

    if (!result.isSuccess) {
      form.setError('root', { message: result.error });
      return false;
    }

    return true;
  };

  return {
    ...form,
    isLoading: isLoadingDelivered || isLoadingCompleted,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof MarkAsDeliveredFormSchema>;
