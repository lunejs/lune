import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import type { CommonProductFragment } from '@/lib/api/types';
import { buildDefaultValues } from '@/lib/product/utils/product.utils';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { ProductDetailsSchema } from './product-details-schema';
import { useProductDetailsCreate } from './use-product-details-create';
import { useProductDetailsUpdate } from './use-product-details-update';

export const useProductDetailsForm = (product?: CommonProductFragment | null) => {
  const navigate = useNavigate();
  const { loading, success, failure } = useLoadingNotification();

  const { updateProduct } = useProductDetailsUpdate();
  const { createProduct } = useProductDetailsCreate();

  const form = useForm<ProductDetailsFormInput>({
    resolver: zodResolver(ProductDetailsSchema) as any,
    defaultValues: buildDefaultValues(product)
  });

  useEffect(() => {
    form.reset(buildDefaultValues(product));
  }, [product]);

  const onSubmit = async (input: ProductDetailsFormInput) => {
    try {
      if (product) {
        loading('Saving...');
        await updateProduct(product, input);

        success('Product updated!');

        return;
      }

      loading('Saving...');
      const productId = await createProduct(input);
      success('Product created!');

      navigate(`/products/${productId}`);
    } catch {
      failure('An unexpected error occurred');
    }
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form,
    product
  };
};

export type ProductDetailsFormInput = z.infer<typeof ProductDetailsSchema>;

export const useProductDetailsFormContext = (): HookReturn => {
  return useFormContext<ProductDetailsFormInput>() as HookReturn;
};

type HookReturn = UseFormReturn<ProductDetailsFormInput> & {
  product: CommonProductFragment | null;
};
