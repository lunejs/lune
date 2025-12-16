import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';

import { notification, useDialogContext } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';
import { useMarkOrderAsShipped } from '@/lib/order/hooks/use-mark-order-as-shipped';

import { MarkAsShippedFormSchema } from './form-schema';

export const useMarkAsShippedForm = (order: CommonOrderFragment) => {
  const { setIsOpen } = useDialogContext();
  const { markAsShipped } = useMarkOrderAsShipped();

  const form = useForm<FormValues>({
    resolver: zodResolver(MarkAsShippedFormSchema),
    defaultValues: {
      trackingCode: '',
      carrier: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    const result = await markAsShipped(order.id, values);

    if (!result.isSuccess) {
      form.setError('root', { message: result.error });
      return;
    }

    notification.success('Order marked as sent');
    setIsOpen(false);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof MarkAsShippedFormSchema>;
