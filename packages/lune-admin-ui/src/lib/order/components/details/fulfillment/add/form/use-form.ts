import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { notification, useDialogContext } from '@lune/ui';

import { type CommonOrderFragment, DeliveryMethodType } from '@/lib/api/types';
import { useAddFulfillmentToOrder } from '@/lib/order/hooks/use-add-fulfillment-to-order';
import { FormMessages } from '@/shared/forms/form-messages';

export const useAddFulfillmentForm = (order: CommonOrderFragment) => {
  const dialogContext = useDialogContext();

  const { addFulfillmentToOrder } = useAddFulfillmentToOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      carrier: '',
      trackingCode: '',
      orderLines: []
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (!values.orderLines.length) {
      form.setError('root', { message: 'Should select at least one item' });
      return;
    }

    const allLinesHaveValidQuantity = values.orderLines.every(l => l.quantity > 0);

    if (!allLinesHaveValidQuantity) {
      form.setError('root', { message: 'Selected lines should have a valid quantity' });
      return;
    }

    const isShipping = order.deliveryMethod?.type === DeliveryMethodType.Shipping;

    if (isShipping) {
      const isAnyEmpty = !values.carrier || !values.trackingCode;

      if (!values.carrier) form.setError('carrier', { message: FormMessages.required });
      if (!values.trackingCode) form.setError('trackingCode', { message: FormMessages.required });
      if (isAnyEmpty) return;
    }

    const result = await addFulfillmentToOrder(order.id, values);

    if (!result.isSuccess) {
      form.setError('root', { message: result.error });
      return;
    }

    notification.success('Fulfillment created');
    dialogContext.setIsOpen(false);
  };

  return {
    ...form,
    order,
    onSubmit: form.handleSubmit(onSubmit),
    rootError: form.formState.errors.root?.message
  };
};

const schema = z.object({
  orderLines: z.array(z.object({ id: z.uuid(), quantity: z.int() })),
  trackingCode: z.string().optional(),
  carrier: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export const useAddFulfillmentFormContext = () => useFormContext<FormValues>() as Return;

type Return = UseFormReturn<FormValues> & {
  order: CommonOrderFragment;
  rootError: string | undefined;
};
