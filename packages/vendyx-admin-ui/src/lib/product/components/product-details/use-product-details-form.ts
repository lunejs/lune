import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import { notification } from '@vendyx/ui';

import type { CommonProductFragment } from '@/lib/api/types';
import { FormMessages } from '@/shared/forms/form-messages';

import { useCreateProduct } from '../../hooks/use-create-product';
import { useUpdateProduct } from '../../hooks/use-update-product';

export const useProductDetailsForm = (product?: CommonProductFragment | null) => {
  const navigate = useNavigate();

  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      enabled: product?.enabled ?? true,
      name: product?.name ?? '',
      description: product?.description ?? ''
    }
  });

  const onSubmit = async (input: FormInput) => {
    try {
      if (product) {
        await updateProduct(product.id, {
          name: input.name,
          description: input.description,
          enabled: input.enabled
        });

        form.reset({
          enabled: input.enabled,
          name: input.name,
          description: product.description ?? ''
        });

        notification.success('Product updated');

        return;
      }

      const productId = await createProduct({
        name: input.name,
        description: input.description,
        enabled: input.enabled,
        images: input.images
      });

      navigate(`/products/${productId}`);
    } catch (error) {
      console.error(error);
      notification.error('An unexpected error occurred');
    }
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
  enabled: z.boolean()
});

type FormInput = z.infer<typeof schema>;

export const useProductDetailsFormContext = () => useFormContext<FormInput>();
