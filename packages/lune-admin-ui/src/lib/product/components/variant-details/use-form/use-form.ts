import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LunePrice } from '@lunejs/common';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';

import type { CommonVariantFragment } from '@/lib/api/types';
import { useUpdateVariant } from '@/lib/product/hooks/use-update-variant';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { buildDefaultVariantForm } from './build-defaults';
import { VariantDetailsSchema } from './form-schema';

export const useVariantDetailsForm = (productId: string, variant: CommonVariantFragment) => {
  const { loading, failure, success } = useLoadingNotification();
  const { updateVariant } = useUpdateVariant(productId);

  const form = useForm({
    resolver: zodResolver(VariantDetailsSchema),
    defaultValues: buildDefaultVariantForm(variant)
  });

  useEffect(() => {
    form.reset(buildDefaultVariantForm(variant));
  }, [variant]);

  const onSubmit = async (values: VariantDetailsFormValues) => {
    loading('Saving...');

    const result = await updateVariant({
      id: variant.id,
      input: {
        salePrice: LunePrice.parse(values.salePrice),
        comparisonPrice: values.comparisonPrice ? LunePrice.parse(values.comparisonPrice) : null,
        stock: values.stock || 0,
        sku: values.sku || null,
        requiresShipping: values.requiresShipping,
        weight: values.requiresShipping ? (values.weight as number) : null,
        dimensions: values.requiresShipping
          ? {
              height: values.height as number,
              length: values.length as number,
              width: values.width as number
            }
          : null
      }
    });

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Saved');
    form.reset(values);
  };

  return {
    ...form,
    variant,
    productId,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

type VariantDetailsFormValues = z.infer<typeof VariantDetailsSchema>;

export const useVariantDetailsFormContext = (): HookReturn => {
  return useFormContext<VariantDetailsFormValues>() as HookReturn;
};

type HookReturn = UseFormReturn<VariantDetailsFormValues> & {
  variant: CommonVariantFragment;
  productId: string;
};
