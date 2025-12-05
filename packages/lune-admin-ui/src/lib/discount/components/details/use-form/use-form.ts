import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import {
  type CommonDiscountFragment,
  DiscountApplicationMode,
  type DiscountHandler
} from '@/lib/api/types';
import { useCreateDiscount } from '@/lib/discount/hooks/use-create-discount';
import { useUpdateDiscount } from '@/lib/discount/hooks/use-update-discount';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { DiscountDetailsSchema as Schema } from './form-schema';

export const useDiscountDetailsForm = (
  handler: DiscountHandler,
  discount: CommonDiscountFragment | null
) => {
  const navigate = useNavigate();

  const { loading, failure, success } = useLoadingNotification();

  const { createDiscount } = useCreateDiscount();
  const { updateDiscount } = useUpdateDiscount();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema) as any,
    defaultValues: {
      applicationMode: discount?.applicationMode ?? DiscountApplicationMode.Code,
      code: discount?.code ?? '',
      enabled: discount?.enabled ?? true,
      startsAt: new Date(discount?.startsAt) ?? new Date(),
      perCustomerLimit: discount?.perCustomerLimit ?? undefined,
      endsAt: discount?.endsAt ?? undefined,
      metadata: discount?.handler.args
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (discount) {
      loading('Saving...');

      const result = await updateDiscount(discount.id, {
        code: values.code,
        enabled: values.enabled,
        startsAt: values.startsAt,
        endsAt: values.endsAt || null,
        perCustomerLimit: values.perCustomerLimit || null,
        handler: {
          code: handler.code,
          args: values.metadata
        }
      });

      if (!result.isSuccess) {
        failure(result.error);
        return;
      }

      success('Discount created');
      form.reset(values);
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
