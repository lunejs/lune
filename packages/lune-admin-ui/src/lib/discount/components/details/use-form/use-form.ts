import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';

import { DiscountApplicationMode, type DiscountHandler } from '@/lib/api/types';

import { DiscountDetailsSchema as Schema } from './form-schema';

export const useDiscountDetailsForm = (handler: DiscountHandler, discount: any | null) => {
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

  const onSubmit = (values: FormValues) => {
    console.log({ values });
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
