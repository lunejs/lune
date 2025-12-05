import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import { DiscountApplicationMode, type DiscountHandler } from '@/lib/api/types';
import { useCreateDiscount } from '@/lib/discount/hooks/use-create-discount';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { DiscountDetailsSchema as Schema } from './form-schema';

export const useDiscountDetailsForm = (handler: DiscountHandler, discount: any | null) => {
  const navigate = useNavigate();

  const { loading, failure, success } = useLoadingNotification();
  const { createDiscount } = useCreateDiscount();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema) as any,
    defaultValues: {
      applicationMode: DiscountApplicationMode.Code,
      code: '',
      enabled: true,
      startsAt: new Date(),
      perCustomerLimit: undefined,
      endsAt: undefined
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (discount) {
      return;
    }

    loading('Saving...');

    const result = await createDiscount({
      applicationMode: values.applicationMode,
      code: values.code,
      enabled: values.enabled,
      startsAt: values.startsAt,
      applicationLevel: handler.applicationLevel,
      handler: {
        code: handler.code,
        args: values.metadata
      },
      endsAt: values.endsAt || null,
      perCustomerLimit: values.perCustomerLimit || null
    });

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Discount created');
    navigate(`/discounts/${result.data.id}`);
  };

  return {
    ...form,
    handler,
    discount,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type FormValues = z.infer<typeof Schema>;

export const useDiscountDetailsFormContext = () =>
  useFormContext() as UseFormReturn<FormValues> & {
    handler: DiscountHandler;
    discount: any | null;
  };
