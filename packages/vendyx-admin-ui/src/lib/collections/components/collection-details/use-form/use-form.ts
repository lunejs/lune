import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type z from 'zod';

import { CollectionContentType, type CommonCollectionFragment } from '@/lib/api/types';
import { useCreateCollection } from '@/lib/collections/hooks/use-create-collection';
import { useUpdateCollection } from '@/lib/collections/hooks/use-update-collection';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { CollectionDetailsFormSchema as schema } from './form-schema';

export const useCollectionDetailsForm = (collection?: CommonCollectionFragment | null) => {
  const navigate = useNavigate();

  const { loading, failure, success } = useLoadingNotification();
  const { createCollection } = useCreateCollection();
  const { updateCollection } = useUpdateCollection();

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
      loading('Saving...');

      const result = await updateCollection(collection.id, {
        name: values.name,
        description: values.description,
        enabled: values.enabled
      });

      if (!result.isSuccess) {
        failure(result.error);
        return;
      }

      form.reset(values);

      success('Collection updated');
      return;
    }

    loading('Saving...');

    const result = await createCollection(values);

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    success('Collection created');
    navigate(`/collections/${result.data.id}`);
  };

  return {
    ...form,
    collection,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

export type CollectionDetailsFormValues = z.infer<typeof schema>;

export const useCollectionDetailsFormContext = () =>
  useFormContext<CollectionDetailsFormValues>() as HookReturn;

type HookReturn = UseFormReturn<CollectionDetailsFormValues> & {
  collection: CommonCollectionFragment | null;
};
