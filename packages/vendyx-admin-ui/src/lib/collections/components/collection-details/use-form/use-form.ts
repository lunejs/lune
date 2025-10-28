import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import { CollectionContentType, type CommonCollectionFragment } from '@/lib/api/types';
import { useCreateCollection } from '@/lib/collections/hooks/use-create-collection';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { CollectionDetailsFormSchema as schema } from './form-schema';

export const useCollectionDetailsForm = (collection?: CommonCollectionFragment | null) => {
  const navigate = useNavigate();

  const { loading, failure, success } = useLoadingNotification();
  const { createCollection } = useCreateCollection();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: collection?.name ?? '',
      description: collection?.description ?? '',
      enabled: collection?.enabled ?? true,
      contentType: collection?.contentType ?? CollectionContentType.Products
    }
  });

  const onSubmit = async (values: CollectionDetailsFormValues) => {
    if (collection) {
      console.log({ values });
      return;
    }

    loading('Saving...');

    const result = await createCollection(values);

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Collections');
    navigate(`/collections/${result.data.id}`);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type CollectionDetailsFormValues = z.infer<typeof schema>;

export const useCollectionDetailsFormContext = () => useFormContext<CollectionDetailsFormValues>();
