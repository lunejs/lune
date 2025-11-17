import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, type UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

import type { CommonLocationFragment } from '@/lib/api/types';
import { useUpdateInStorePickupPreferences } from '@/lib/shipments/hooks/use-update-in-store-pickup-preferences';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { inStorePickupSchema as schema } from './form-schema';

export const usePickupInStoreForm = (location: CommonLocationFragment) => {
  const { loading, failure, success } = useLoadingNotification();
  const { updateInStorePickupPreferences } = useUpdateInStorePickupPreferences();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isAvailable: location.inStorePickup.isAvailable,
      instructions: location.inStorePickup.instructions ?? ''
    }
  });

  async function onSubmit(values: FormValues) {
    loading('Saving...');

    const result = await updateInStorePickupPreferences({
      locationId: location.id,
      input: values
    });

    if (!result.isSuccess) {
      failure(result.error);
      return;
    }

    form.reset(values);

    success('Preferences saved');
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

type FormValues = z.infer<typeof schema>;

export const usePickupInStoreFormContext = () =>
  useFormContext<FormValues>() as UseFormReturn<FormValues> & {};
